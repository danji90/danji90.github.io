import Map from 'ol/Map';
import LayerService from 'react-spatial/LayerService';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import OSM from 'ol/source/OSM';
import { Layer } from 'mobility-toolbox-js/ol';
import {
  SET_MENU_OPEN,
  SET_ACTIVE_SECTION,
  SET_XP_OPEN,
  SET_SHOW_EDUCATION,
  SET_SHOW_RESIDENCE,
  SET_SHOW_WORK,
  SET_LAYERS_OPEN,
} from './actions';

import initialAppState from '../../assets/data/appData';

const mapBoxKey =
  'pk.eyJ1IjoiZGFuamk5MCIsImEiOiJjazA2azNrbzMwMjM3M2VsdmQxaXYyMG9sIn0.bFXyO9IWGsCT2j2o0yXoOw';

const baseLayers = [
  new Layer({
    olLayer: new TileLayer({
      source: new OSM(),
    }),
    name: 'Streets',
    key: 'streets',
    visible: true,
    isBaseLayer: true,
    properties: {
      radioGroup: 'baseLayer',
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
    },
  }),
];

const initialState = {
  activeSection: {
    id: 'home',
    name: 'Home',
    nav: 'home',
    tab: true,
  },
  map: new Map({ controls: [], interactions: [] }),
  showWork: true,
  showEducation: true,
  showResidence: false,
  menuOpen: false,
  xpOpen: false,
  layersOpen: false,
  layerService: new LayerService(baseLayers),
  ...initialAppState,
};

export default function app(state = initialState, action) {
  switch (action.type) {
    case SET_MENU_OPEN:
      return {
        ...state,
        menuOpen: action.data,
      };
    case SET_ACTIVE_SECTION:
      return {
        ...state,
        activeSection: action.data,
      };
    case SET_XP_OPEN:
      return {
        ...state,
        xpOpen: action.data,
      };
    case SET_LAYERS_OPEN:
      return {
        ...state,
        layersOpen: action.data,
      };
    case SET_SHOW_EDUCATION:
      return {
        ...state,
        showEducation: action.data,
      };
    case SET_SHOW_WORK:
      return {
        ...state,
        showWork: action.data,
      };
    case SET_SHOW_RESIDENCE:
      return {
        ...state,
        showResidence: action.data,
      };
    default:
      return {
        ...state,
      };
  }
}
