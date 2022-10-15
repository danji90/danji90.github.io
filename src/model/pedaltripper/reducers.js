import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import { defaults as defaultInteractions } from 'ol/interaction';
import XYZ from 'ol/source/XYZ';
import { Layer } from 'mobility-toolbox-js/ol';

const interactions = defaultInteractions({
  altShiftDragRotate: false,
  pinchRotate: false,
});

const baseLayers = [
  new Layer({
    olLayer: new TileLayer({
      source: new XYZ({
        url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}.png',
      }),
    }),
    name: 'gray',
    visible: false,
    isBaseLayer: true,
    properties: {
      radioGroup: 'baseLayer',
    },
  }),
  new Layer({
    olLayer: new TileLayer({
      source: new XYZ({
        url: 'https://{a-c}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
      }),
    }),
    name: 'cyclomap',
    visible: false,
    isBaseLayer: true,
    properties: {
      radioGroup: 'baseLayer',
    },
  }),
  new Layer({
    olLayer: new TileLayer({
      source: new XYZ({
        url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
      }),
    }),
    name: 'osm hot',
    visible: true,
    isBaseLayer: true,
    properties: {
      radioGroup: 'baseLayer',
    },
  }),
];

const initialState = {
  map: new Map({ interactions, controls: [] }),
  baseLayers,
};

export default function app(state = initialState, action) {
  switch (action.type) {
    default:
      return {
        ...state,
      };
  }
}
