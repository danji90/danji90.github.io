import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import OSM from 'ol/source/OSM';
import { defaults } from 'ol/interaction';
import { Layer } from 'mobility-toolbox-js/ol';
import mapData from '../../../assets/data/mapFeatures.json';

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
  const [isFullScreen, setIsFullScreen] = useState(null);
  const [fullScreenElement, setFullScreenElement] = useState(null);
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
      isFullScreen,
      setIsFullScreen,
      fullScreenElement,
      setFullScreenElement,
    }),
    [
      layersOpen,
      showWork,
      showEducation,
      showResidence,
      selectedFeature,
      isFullScreen,
      fullScreenElement,
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
