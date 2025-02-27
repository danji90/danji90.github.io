import React, { useContext, useEffect, useCallback } from 'react';
import withStyles from '@mui/styles/withStyles';
import { Hidden, Link, Typography, Slider } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BasicMap from 'react-spatial/components/BasicMap';
import BaseLayerSwitcher from 'react-spatial/components/BaseLayerSwitcher';
import Copyright from 'react-spatial/components/Copyright';
import Popup from 'react-spatial/components/Popup';
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
import { format } from 'date-fns';

import Container from '../Container';
import LayerMenu from '../LayerMenu/LayerMenu';
import FullExtent from '../FullExtent/FullExtent';
import MapButtons from '../MapButtons/MapButtons';
import MapScrollOverlay from '../MapScrollOverlay';

import eduIcon from '../../../assets/images/edu.png';
import workIcon from '../../../assets/images/work.png';
import residenceIcon from '../../../assets/images/residence.png';
import aerial from './aerial.png';
import osm from './osm.png';
import topo from './topo.png';
import mapData from '../../../assets/data/mapFeatures.json';
import {
  initialTimeSpan,
  MapContext,
} from '../../MapContextProvider/MapContextProvider';

const styleCache = {};
const getStyle = (feature) => {
  const size = feature.get('features')?.length;
  let style = styleCache[size];
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
    } else {
      let src = eduIcon;
      if (feature.get('features')?.[0].get('type') === 'work') {
        src = workIcon;
      }
      if (feature.get('features')?.[0].get('type') === 'residence') {
        src = residenceIcon;
      }
      style = new Style({
        image: new Icon({
          scale: 1 / 4,
          imgSize: [144, 144],
          src,
        }),
      });
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
  style: (features, resolution) => getStyle(features, resolution, clusterLayer),
});

const useStyles = makeStyles((theme) => {
  return {
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
    },
    mapContainer: {
      position: 'relative',
      flexGrow: 8,
      overflow: 'hidden',
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
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
    },
    baselayerSwitcherWrapper: {
      position: 'absolute',
      bottom: 5,
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
      [theme.breakpoints.down('sm')]: {
        '& h3': {
          marginLeft: 30,
        },
      },
    },
    sliderWrapper: {
      padding: '0 20px',
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
    layersOpen,
  } = useContext(MapContext);

  useEffect(() => {
    if (!map.getLayers().getArray().includes(clusterLayer)) {
      map.addLayer(clusterLayer);
    }

    clusterSource.getSource().clear();
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
    clusterSource.getSource().addFeatures(timeFiltered);
  }, [map, showResidence, showWork, showEducation, timeSpan]);
};

function LifeMap2({ section }) {
  const classes = useStyles();
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
  } = useContext(MapContext);
  useUpdateFeatures();

  return (
    <Container
      title="Life map"
      className={classes.lifemap}
      id={section.id}
      fullWidthOnMobile
    >
      <div className={classes.contentWrapper}>
        <div className={classes.mapContainer}>
          <MapScrollOverlay />
          <LayerMenu />
          <FullExtent
            featureSource={clusterSource}
            onClick={() => setSelectedFeature(null)}
          />
          <MapButtons />
          <BasicMap
            className={`rs-map ${classes.map}`}
            zoom={2}
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
                setSelectedFeature(null);
                const coordinates = clusteredFeatures.map((feature) =>
                  feature.getGeometry().getCoordinates(),
                );
                const combinedGeom = new MultiPoint(coordinates);
                map.getView().fit(combinedGeom, {
                  padding: [100, 100, 100, 100],
                  duration: 300,
                });
                return;
              }
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
          {selectedFeature && (
            <Popup
              map={map}
              header={selectedFeature.get('city')}
              feature={selectedFeature}
              onCloseClick={() => setSelectedFeature(null)}
              panIntoView
            >
              <div className={classes.popup}>
                {selectedFeature.get('title') && (
                  <>
                    <Typography variant="body1">
                      {selectedFeature.get('title')}
                    </Typography>
                    <br />
                  </>
                )}
                {selectedFeature.get('link') &&
                  selectedFeature.get('facility') && (
                    <>
                      <Link
                        href={`${selectedFeature.get('link')}`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {selectedFeature.get('facility')}
                      </Link>
                      <br />
                      <br />
                    </>
                  )}
                <Typography variant="body2">
                  {selectedFeature.get('description')}
                </Typography>
              </div>
            </Popup>
          )}
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
    </Container>
  );
}

LifeMap2.propTypes = {
  section: PropTypes.object.isRequired,
};

export default LifeMap2;
