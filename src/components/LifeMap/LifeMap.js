import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Hidden, Link, Typography, Slider } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LayerService from 'react-spatial/LayerService';
import BasicMap from 'react-spatial/components/BasicMap';
import BaseLayerSwitcher from 'react-spatial/components/BaseLayerSwitcher';
import Copyright from 'react-spatial/components/Copyright';
import Popup from 'react-spatial/components/Popup';
import MultiPoint from 'ol/geom/MultiPoint';
import VectorSource from 'ol/source/Vector';
import { platformModifierKeyOnly } from 'ol/events/condition';
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
import { isMobile } from 'react-device-detect';

import Container from '../Container/Container';
import LayerMenu from '../LayerMenu/LayerMenu';
import FullExtent from '../FullExtent/FullExtent';
import {
  setShowEducation,
  setShowWork,
  setShowResidence,
} from '../../model/actions';

import eduIcon from '../../assets/images/edu.png';
import workIcon from '../../assets/images/work.png';
import residenceIcon from '../../assets/images/residence.png';
import aerial from './aerial.png';
import osm from './osm.png';
import topo from './topo.png';

const styles = (theme) => {
  return {
    lifemap: {
      height: '100vh',
      [theme.breakpoints.down('xs')]: {
        '& h2': {
          marginLeft: 30,
        },
      },
    },
    contentWrapper: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    mapContainer: {
      position: 'relative',
      flexBasis: '10vh',
      flexGrow: 8,
      overflow: 'hidden',
      [theme.breakpoints.down('xs')]: {
        height: '90vh',
      },
      '& .rs-copyright': {
        position: 'absolute',
        right: 5,
        bottom: 5,
        fontSize: 14,
        '& a': theme.styles?.link,
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
      scrollbarWidth: 'thin',
      scrollbarColor: 'rgba(40, 44, 52, 0.5) #f5f5f5',
      '&::-webkit-scrollbar': {
        width: '0.4em',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: '#f5f5f5',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(40, 44, 52, 0.5)',
      },
    },
    timeSlider: {
      flexBasis: '10vh',
      flexGrow: 1,
      padding: '10px 0',
      [theme.breakpoints.down('xs')]: {
        '& h3': {
          marginLeft: 30,
        },
      },
    },
    sliderWrapper: {
      padding: '0 20px',
    },
    scrollOverlay: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 20,
      color: 'black',
      opacity: 0,
      pointerEvents: 'none',
    },
    showOverlay: {
      opacity: 1,
      pointerEvents: 'auto',
    }
  };
};

const SCROLL_LISTENER_TYPES = ['scroll', 'mousescroll', 'wheel', 'touchmove']

const propTypes = {
  section: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  // mui
  classes: PropTypes.object.isRequired,
  // mapStateToProps
  map: PropTypes.instanceOf(Map),
  showResidence: PropTypes.bool,
  showWork: PropTypes.bool,
  showEducation: PropTypes.bool,
  layerService: PropTypes.instanceOf(LayerService),
};

const defaultProps = {
  section: {},
  // mapStateToProps
  map: null,
  showResidence: false,
  showWork: false,
  showEducation: false,
  layerService: new LayerService(),
};

const mapData = require('../../data/mapFeatures.json');

const styleCache = {};

const getStyle = (feature, resolution) => {
  const size = feature.get('features').length;
  let style = styleCache[size];
  if (!style) {
    const color =
      // eslint-disable-next-line no-nested-ternary
      size > 25 ? '248, 128, 0' : size > 8 ? '248, 192, 0' : '128, 192, 64';
    const radius = 50;
    if (size > 1) {
      style = [
        new Style({
          image: new CircleStyle({
            scale: 1 / 4,
            radius: radius + 15,
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
      if (feature.get('features')[0].get('type') === 'work') {
        src = workIcon;
      }
      if (feature.get('features')[0].get('type') === 'residence') {
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

const layerImages = {
  streets: osm,
  aerial,
  topo,
};

const initialTimeSpan = [Date.parse('1990-09-13T00:00:00.000Z'), Date.now()];

class LifeMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFeature: undefined,
      timeSpan: initialTimeSpan,
      mapBlocked: false,
      listenersAdded: false,
    };
    this.education = new GeoJSON({
      featureProjection: 'EPSG:3857',
    }).readFeatures(mapData.education);

    this.work = new GeoJSON({ featureProjection: 'EPSG:3857' }).readFeatures(
      mapData.work,
    );

    this.residence = new GeoJSON({
      featureProjection: 'EPSG:3857',
    }).readFeatures(mapData.residence);

    this.onFeatureClick = this.onFeatureClick.bind(this);
    this.toggleBlockMap = this.toggleBlockMap.bind(this);
    this.scrollRef = React.createRef();
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    const { map } = this.props;
    // Cluster Source
    this.clusterSource = new Cluster({
      distance: 40,
      source: new VectorSource(),
    });
    // Animated cluster layer
    this.clusterLayer = new AnimatedCluster({
      name: 'Cluster',
      source: this.clusterSource,
      style: (features, resolution) =>
        getStyle(features, resolution, this.clusterLayer),
    });
    this.updateFeatures();
    this.setState({ clusterSource: this.clusterSource });
    map.addLayer(this.clusterLayer);
  }

  componentDidUpdate(prevProps, prevState) {
    const { timeSpan, listenersAdded } = this.state;
    const { showWork, showEducation, showResidence, map } = this.props;

    if (!listenersAdded && map.getTarget() && this.scrollRef.current) {
      this.addScrollListeners()
    }
    if (
      prevProps.showEducation !== showEducation ||
      prevProps.showWork !== showWork ||
      prevProps.showResidence !== showResidence ||
      prevState.timeSpan !== timeSpan
    ) {
      this.updateFeatures();
    }
  }

  componentWillUnmount() {
    this.removeScrollListeners();
  }

  onFeatureClick(features) {
    const { map } = this.props;
    if (!features || !features.length) {
      this.setState({ selectedFeature: undefined });
      return;
    }

    const clusteredFeatures = features[0].get('features');
    if (clusteredFeatures?.length > 1) {
      this.setState({ selectedFeature: undefined });
      const coordinates = clusteredFeatures.map((feature) =>
        feature.getGeometry().getCoordinates(),
      );
      const combinedGeom = new MultiPoint(coordinates);
      map
        .getView()
        .fit(combinedGeom, { padding: [100, 100, 100, 100], duration: 300 });
      return;
    }
    this.setState({ selectedFeature: features[0].get('features')[0] });
  }

  addScrollListeners() {
    const { map } = this.props;
    SCROLL_LISTENER_TYPES.forEach((type) => {
      this.scrollRef.current.addEventListener(type, this.toggleBlockMap);
      map.getTarget().addEventListener(type, this.toggleBlockMap);
    });
    this.setState({ listenersAdded: true })
  }

  removeScrollListeners() {
    const { map } = this.props;
    SCROLL_LISTENER_TYPES.forEach((type) => {
      this.scrollRef.current.removeEventListener(type, this.toggleBlockMap);
      map.getTarget().removeEventListener(type, this.toggleBlockMap);
    });
    this.setState({ listenersAdded: false })
  }

  updateFeatures() {
    const { timeSpan } = this.state;
    const { showWork, showEducation, showResidence } = this.props;
    this.clusterSource.getSource().clear();
    let newFeatures = [];
    if (showWork) {
      newFeatures = [...newFeatures, ...this.work];
    }
    if (showEducation) {
      newFeatures = [...newFeatures, ...this.education];
    }
    if (showResidence) {
      newFeatures = [...newFeatures, ...this.residence];
    }
    const timeFiltered = newFeatures.filter((feature) => {
      let display = false;
      const timeStamps = feature.get('timestamp');
      timeStamps.forEach((timestamp) => {
        if (!display) {
          display =
            (Date.parse(timestamp[0]) >= timeSpan[0] &&
              Date.parse(timestamp[1]) <= timeSpan[1]) ||
            (Date.parse(timestamp[0]) <= timeSpan[0] &&
              Date.parse(timestamp[1]) >= timeSpan[1]);
        }
      });
      return display;
    });
    this.setState({ selectedFeature: undefined });
    this.clusterSource.getSource().addFeatures(timeFiltered);
  }

  toggleBlockMap(evt) {
    console.log('evt: ', evt.type);
    if (isMobile) {
      if ((evt.type === ('touchmove') && evt.touches.length > 1)) {
        evt.preventDefault();
        evt.stopPropagation();
        this.setState({ mapBlocked: false });
        return;
      }
    }

    if (platformModifierKeyOnly({ originalEvent: evt })) {
      evt.preventDefault();
      evt.stopPropagation();
      this.setState({ mapBlocked: false })
      return;
    }
    this.setState({ mapBlocked: true })
  }

  render() {
    const { selectedFeature, timeSpan, clusterSource, mapBlocked } = this.state;
    const { map, section, layerService, classes } = this.props;
    const baseLayers = layerService.getBaseLayers();
    return (
      <Container
        title="Life map"
        className={classes.lifemap}
        id={section.id}
        fullWidthOnMobile
      >
        <div className={classes.contentWrapper}>
          <div className={classes.mapContainer}>
            <LayerMenu baseLayers={baseLayers} />
            <FullExtent
              featureSource={clusterSource}
              onClick={() => this.setState({ selectedFeature: null })}
            />
            <BasicMap
              className={`rs-map ${classes.map}`}
              zoom={2}
              viewOptions={{
                minZoom: 2,
              }}
              layers={baseLayers}
              map={map}
              onFeaturesClick={this.onFeatureClick}
              onFeaturesHover={(features) => {
                if (features.length) {
                  document.body.style.cursor = 'pointer';
                } else {
                  document.body.style.cursor = 'auto';
                }
              }}
              ref={this.mapRef}
            />
            {selectedFeature && (
              <Popup
                map={map}
                header={selectedFeature.get('city')}
                feature={selectedFeature}
                onCloseClick={() =>
                  this.setState({ selectedFeature: undefined })}
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
              <Hidden smDown>
                <BaseLayerSwitcher
                  map={map}
                  layers={baseLayers}
                  layerImages={layerImages}
                />
              </Hidden>
            </div>
            <div
              ref={this.scrollRef}
              className={`${classes.scrollOverlay}${mapBlocked ? ` ${classes.showOverlay}` : ''}`}
            >
              {isMobile ? 'Use two fingers to navigate map' : 'Use Ctrl + scroll to zoom'}
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
                onChange={(evt, value) => this.setState({ timeSpan: value })}
                value={timeSpan}
              />
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

LifeMap.propTypes = propTypes;
LifeMap.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  map: state.map,
  showResidence: state.showResidence,
  showWork: state.showWork,
  showEducation: state.showEducation,
  layerService: state.layerService,
});

const mapDispatchToProps = {
  dispatchSetShowEducation: setShowEducation,
  dispatchSetShowWork: setShowWork,
  dispatchSetShowResidence: setShowResidence,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(LifeMap));
