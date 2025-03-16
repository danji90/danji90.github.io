import React, {
  useContext,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  useState,
} from 'react';
import withStyles from '@mui/styles/withStyles';
import {
  Hidden,
  Link,
  Typography,
  Slider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BasicMap from 'react-spatial/components/BasicMap';
import BaseLayerSwitcher from 'react-spatial/components/BaseLayerSwitcher';
import Copyright from 'react-spatial/components/Copyright';
import MultiPoint from 'ol/geom/MultiPoint';
import VectorSource from 'ol/source/Vector';
import AnimatedCluster from 'ol-ext/layer/AnimatedCluster';
import Style from 'ol/style/Style';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Icon from 'ol/style/Icon';
import Text from 'ol/style/Text';
import Map from 'ol/Map';
import Cluster from 'ol/source/Cluster';
import GeoJSON from 'ol/format/GeoJSON';
import 'react-spatial/themes/default/index.scss';
import { format, max } from 'date-fns';

import { unByKey } from 'ol/Observable';
import Stroke from 'ol/style/Stroke';
import Container from '../Container';
import LayerMenu from '../LayerMenu/LayerMenu';
import FullExtent from '../FullExtentButton/FullExtentButton';
import ZoomButtons from '../ZoomButtons/ZoomButtons';
import MapScrollOverlay from '../MapScrollOverlay';
import {
  initialTimeSpan,
  MapContext,
} from '../MapContextProvider/MapContextProvider';
import FullScreenButton from '../FullScreenButton/FullScreenButton';
import MapTimelineOverlay from '../MapTimelineOverlay';

import aerial from './aerial.png';
import osm from './osm.png';
import topo from './topo.png';

import getIconSource from '../../utils/getIconSource';
import { DRAWER_WIDTH } from '../MapTimelineOverlay/MapTimelineOverlay';
import unselectAllFeatures from '../../utils/unselectAllFeatures';

const styleCache = {};
const getStyle = (feature) => {
  const size = feature.get('features')?.length;
  const type = feature.get('features')?.[0].get('type');
  const isSelected = feature.get('features')?.[0].get('selected');

  let style =
    styleCache[size === 1 ? `${type}${isSelected ? '-selected' : ''}` : size];
  if (!style) {
    const color =
      // eslint-disable-next-line no-nested-ternary
      size > 25 ? '248, 128, 0' : size > 8 ? '248, 192, 0' : '128, 192, 64';
    const radius = 12;
    if (size > 1) {
      style = [
        new Style({
          image: new CircleStyle({
            scale: 1 / 4,
            radius: radius + 4,
            fill: new Fill({
              color: `rgba(${color},0.3)`,
            }),
          }),
        }),
        new Style({
          image: new CircleStyle({
            scale: 1 / 4,
            radius,
            fill: new Fill({
              color: `rgba(${color},0.6)`,
            }),
          }),
          text: new Text({
            font: '50px sans-serif',
            scale: 1 / 4,
            text: size.toString(),
            offsetY: 1,
            fill: new Fill({
              color: '#000',
            }),
          }),
        }),
      ];
      styleCache[size] = style;
    } else {
      const src = getIconSource(type);
      style = new Style({
        image: new Icon({
          scale: 1 / 5,
          imgSize: [144, 144],
          src,
        }),
      });
      if (isSelected) {
        style = [
          new Style({
            image: new CircleStyle({
              radius: 20,
              stroke: new Stroke({
                width: 4,
                color: '#63a000',
              }),
              fill: new Fill({
                color: 'rgba(255, 255, 255,1)',
              }),
            }),
          }),
          style,
        ];
      }
      styleCache[`${type}${isSelected ? '-selected' : ''}`] = style;
    }
  }
  return style;
};

export const clusterSource = new Cluster({
  distance: 40,
  source: new VectorSource(),
});

export const clusterLayer = new AnimatedCluster({
  name: 'Cluster',
  source: clusterSource,
  visible: true,
  zIndex: 99999,
  style: (features, resolution) => getStyle(features, resolution, clusterLayer),
});

const useStyles = makeStyles((theme) => {
  return {
    fullScreenModal: {
      // For iOS we need to fall back to a custom full screen modal
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100% !important',
      width: '100%',
      zIndex: 1000,
      padding: 0,
      border: 0,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'white',
    },
    lifemap: {
      height: '100vh',
      [theme.breakpoints.down('sm')]: {
        '& h2': {
          marginLeft: 30,
        },
      },
    },
    contentWrapper: {
      display: 'flex',
      flexDirection: 'column',
      height: '95%',
      backgroundColor: 'white',
    },
    mapContainer: {
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      height: '100%',
      transition: 'width 0.3s',
      [theme.breakpoints.down('sm')]: {
        height: '90vh',
      },
      '& .rs-copyright': {
        position: 'absolute',
        right: 5,
        bottom: 5,
        fontSize: 14,
        '& a': theme.styles.link,
      },
      '& .rs-popup-header': {
        backgroundColor: '#282c34 !important',
        color: theme.palette.text.light,
      },
      '& .rs-popup-body': {
        padding: '10px 10px 0 !important',
      },
    },
    map: {
      width: '100%',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
    },
    baselayerSwitcherWrapper: {
      position: 'absolute',
      bottom: (props) =>
        props.selectedFeature && props.isTabletDown ? '50%' : 5,
      transition: 'bottom 0.2s',
      left: 5,
    },
    popup: {
      maxHeight: 200,
      minWidth: 320,
      overflowY: 'auto',
      margin: '-10px -10px 0 -10px',
      padding: 10,
      ...theme.styles.scrollBarThin,
    },
    timeSlider: {
      padding: '10px 0',
      boxShadow: (props) =>
        props.selectedFeature && props.isTabletDown
          ? '0 -4px 10px rgba(0, 0, 0, 0.1)'
          : undefined,
      [theme.breakpoints.down('sm')]: {
        '& h3': {
          marginLeft: 30,
        },
      },
    },
    sliderWrapper: {
      padding: '0 20px',
    },
    topRightBtns: {
      position: 'absolute',
      right: 0,
      transition: 'right 0.2s',
      top: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      padding: '15px 5px',
      gap: 10,
    },
  };
});

const layerImages = {
  streets: osm,
  aerial,
  topo,
};

const useUpdateFeatures = () => {
  const {
    baselayers,
    map,
    selectedFeature,
    setSelectedFeature,
    timeSpan,
    setTimeSpan,
    showResidence,
    showWork,
    showEducation,
    work,
    education,
    residence,
    isFullScreen,
  } = useContext(MapContext);
  const [mapFeatures, setMapFeatures] = useState([]);

  useEffect(() => {
    clusterSource
      .getSource()
      .getFeatures()
      .forEach((feature) => {
        feature.set('selected', false);
      });
    if (selectedFeature) {
      selectedFeature.set('selected', true);
      const clusterFeature = clusterSource.getFeatures().find((feature) => {
        const clusterFeats = feature.get('features');
        return (
          clusterFeats?.length > 1 && clusterFeats?.includes(selectedFeature)
        );
      });
      const isNotInView = !selectedFeature
        .getGeometry()
        .intersectsExtent(map.getView().calculateExtent(map.getSize()));

      if (clusterFeature || isNotInView) {
        map.getView().fit(selectedFeature.getGeometry(), {
          padding: [100, 100, 100, 100],
          duration: 300,
          maxZoom: 16,
        });
      }
    }
  }, [selectedFeature]);

  useEffect(() => {
    if (!map.getLayers().getArray().includes(clusterLayer)) {
      map.addLayer(clusterLayer);
    }
    function updateFeatures() {
      let newFeatures = [];
      if (showEducation) {
        newFeatures = newFeatures.concat(education);
      }
      if (showWork) {
        newFeatures = newFeatures.concat(work);
      }
      if (showResidence) {
        newFeatures = newFeatures.concat(residence);
      }

      const timeFiltered = newFeatures.filter((feature) => {
        let display = false;
        const timeStamps = feature.get('timestamp');
        const isCurrent = feature.get('current');
        timeStamps.forEach((timestamp) => {
          const startOfDay = new Date();
          startOfDay.setUTCHours(0, 0, 0, 0);
          const featureDates = {
            start: Date.parse(timestamp[0]),
            end: isCurrent ? startOfDay.getTime() : Date.parse(timestamp[1]),
          };
          const inputDates = {
            start: timeSpan[0],
            end: timeSpan[1],
          };

          if (!display) {
            display =
              featureDates.start <= inputDates.end &&
              inputDates.start <= featureDates.end;
          }
        });
        return display;
      });
      if (!timeFiltered.some((feat) => feat === selectedFeature)) {
        unselectAllFeatures(clusterSource.getSource().getFeatures());
        setSelectedFeature(null);
      }
      clusterSource.getSource().clear();
      clusterSource.getSource().addFeatures(timeFiltered);
      setMapFeatures(timeFiltered);
    }
    updateFeatures();
    const targetListener = map.on('change:target', updateFeatures);
    return () => {
      unByKey(targetListener);
    };
  }, [map, showResidence, showWork, showEducation, timeSpan, isFullScreen]);

  return mapFeatures;
};

function LifeMapContent() {
  const {
    baselayers,
    map,
    selectedFeature,
    setSelectedFeature,
    timeSpan,
    setTimeSpan,
    showResidence,
    showWork,
    showEducation,
    work,
    education,
    residence,
    layersOpen,
    isFullScreen: isFullScreenIOS,
    fullScreenElement,
  } = useContext(MapContext);
  const theme = useTheme();
  const isTabletDown = useMediaQuery(theme.breakpoints.down('lg'));
  const classes = useStyles({ selectedFeature, isTabletDown });
  const containerRef = useRef(null);
  const currentFeatures = useUpdateFeatures();

  useEffect(() => {
    const listener = map.on('change:size', () => console.log('size changed'));
    return () => {
      unByKey(listener);
    };
  }, [map, isFullScreenIOS, fullScreenElement, selectedFeature]);

  return (
    <div
      className={
        !isFullScreenIOS ? classes.contentWrapper : classes.fullScreenModal // For iOS fullscreen
      }
      ref={containerRef}
    >
      <div className={classes.mapContainer}>
        <div style={{ position: 'relative', flexGrow: 1, height: '100%' }}>
          <BasicMap
            className={`rs-map ${classes.map}`}
            zoom={map?.getView()?.getZoom() ?? 2}
            center={map?.getView()?.getCenter()}
            viewOptions={{
              minZoom: 2.3,
              maxZoom: 21,
            }}
            layers={baselayers}
            map={map}
            onFeaturesClick={(features) => {
              if (!features || !features.length) {
                setSelectedFeature(null);
                return;
              }
              const clusteredFeatures = features[0].get('features');
              if (clusteredFeatures?.length > 1) {
                const coordinates = clusteredFeatures.map((feature) =>
                  feature.getGeometry().getCoordinates(),
                );
                const combinedGeom = new MultiPoint(coordinates);
                map.getView().fit(combinedGeom, {
                  padding: [100, 100, 100, 100],
                  duration: 300,
                  callback: () => setSelectedFeature(null),
                });
                return;
              }
              const feature = features[0].get('features')[0];
              feature.set('selected', true);
              setSelectedFeature(features[0].get('features')[0]);
            }}
            onFeaturesHover={(features) => {
              if (features.length) {
                document.body.style.cursor = 'pointer';
              } else {
                document.body.style.cursor = 'auto';
              }
            }}
          />
          {!isFullScreenIOS && !fullScreenElement && <MapScrollOverlay />}
          <LayerMenu />
          <div className={classes.topRightBtns}>
            <ZoomButtons />
            <FullScreenButton elementRef={containerRef} />
            <FullExtent featureSource={clusterSource} />
          </div>
          <Copyright map={map} />
          <div className={classes.baselayerSwitcherWrapper}>
            <Hidden mdDown>
              <BaseLayerSwitcher
                map={map}
                layers={baselayers}
                layerImages={layerImages}
              />
            </Hidden>
          </div>
        </div>
        <MapTimelineOverlay features={currentFeatures} />
      </div>
      <div className={classes.timeSlider}>
        <Typography variant="h3" align="center">
          {`${format(timeSpan[0], 'dd.MM.yyyy')} - ${format(
            timeSpan[1],
            'dd.MM.yyyy',
          )}`}
        </Typography>
        <div className={classes.sliderWrapper}>
          <Slider
            min={initialTimeSpan[0]}
            max={initialTimeSpan[1]}
            onChange={(evt, value) => setTimeSpan(value)}
            value={timeSpan}
          />
        </div>
      </div>
    </div>
  );
}
function LifeMap({ section }) {
  const classes = useStyles();
  const { isFullScreen: isFullScreenIOS } = useContext(MapContext);
  const containerRef = useRef(null);

  return (
    <>
      {isFullScreenIOS && <LifeMapContent />} {/** iOS full screen modal */}
      <Container
        title="Life map"
        className={classes.lifemap}
        id={section.id}
        fullWidthOnMobile
      >
        {!isFullScreenIOS && <LifeMapContent />}
      </Container>
    </>
  );
}

LifeMap.propTypes = {
  section: PropTypes.object.isRequired,
};

export default LifeMap;
