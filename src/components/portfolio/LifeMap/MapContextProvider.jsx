import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import OSM from 'ol/source/OSM';
import MultiPoint from 'ol/geom/MultiPoint';
import VectorSource from 'ol/source/Vector';
import AnimatedCluster from 'ol-ext/layer/AnimatedCluster';
import Style from 'ol/style/Style';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Icon from 'ol/style/Icon';
import Text from 'ol/style/Text';
import Cluster from 'ol/source/Cluster';
import { defaults } from 'ol/interaction';
import { Layer } from 'mobility-toolbox-js/ol';
import aerial from './aerial.png';
import osm from './osm.png';
import topo from './topo.png';
import mapData from '../../../assets/data/mapFeatures.json';

import eduIcon from '../../../assets/images/edu.png';
import workIcon from '../../../assets/images/work.png';
import residenceIcon from '../../../assets/images/residence.png';

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

const mapBoxKey =
  'pk.eyJ1IjoiZGFuamk5MCIsImEiOiJjazA2azNrbzMwMjM3M2VsdmQxaXYyMG9sIn0.bFXyO9IWGsCT2j2o0yXoOw';

const baselayers = [
  new Layer({
    olLayer: new TileLayer({
      source: new OSM(),
    }),
    name: 'Streets',
    key: 'streets',
    visible: true,
    properties: {
      radioGroup: 'baseLayer',
      isBaseLayer: true,
    },
  }),
  new Layer({
    olLayer: new TileLayer({
      source: new XYZ({
        url: `https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=${mapBoxKey}`,
      }),
    }),
    name: 'Aerial',
    key: 'aerial',
    visible: false,
    isBaseLayer: true,
    properties: {
      radioGroup: 'baseLayer',
      isBaseLayer: true,
    },
  }),
  new Layer({
    olLayer: new TileLayer({
      source: new OSM({
        url: 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png',
      }),
    }),
    name: 'Relief',
    key: 'topo',
    visible: false,
    isBaseLayer: true,
    properties: {
      radioGroup: 'baseLayer',
      isBaseLayer: true,
    },
  }),
];

const map = new Map({
  controls: [],
  interactions: defaults({
    altShiftDragRotate: false,
    pinchRotate: false,
    dragPan: false,
    mouseWheelZoom: false,
  }),
});

export const initialTimeSpan = [
  Date.parse('1990-09-13T00:00:00.000Z'),
  Date.now(),
];

const education = new GeoJSON({
  featureProjection: 'EPSG:3857',
}).readFeatures(mapData.education);

const work = new GeoJSON({
  featureProjection: 'EPSG:3857',
}).readFeatures(mapData.work);

const residence = new GeoJSON({
  featureProjection: 'EPSG:3857',
}).readFeatures(mapData.residence);

export const MapContext = React.createContext(null);

function MapContextProvider({ children }) {
  const [layersOpen, setLayersOpen] = useState(false);
  const [showWork, setShowWork] = useState(true);
  const [showEducation, setShowEducation] = useState(true);
  const [showResidence, setShowResidence] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [timeSpan, setTimeSpan] = useState([
    Date.parse('1990-09-13T00:00:00.000Z'),
    Date.now(),
  ]);

  const contextValue = useMemo(
    () => ({
      map,
      baselayers,
      education,
      work,
      residence,
      layersOpen,
      setLayersOpen,
      showWork,
      setShowWork,
      showEducation,
      setShowEducation,
      showResidence,
      setShowResidence,
      selectedFeature,
      setSelectedFeature,
      timeSpan,
      setTimeSpan,
    }),
    [
      layersOpen,
      showWork,
      showEducation,
      showResidence,
      selectedFeature,
      timeSpan,
    ],
  );

  if (!contextValue.map || !contextValue.baselayers) {
    return null;
  }

  return (
    <MapContext.Provider value={contextValue}>{children}</MapContext.Provider>
  );
}

MapContextProvider.defaultProps = {
  children: null,
};

MapContextProvider.propTypes = {
  children: PropTypes.node,
};

export default MapContextProvider;
