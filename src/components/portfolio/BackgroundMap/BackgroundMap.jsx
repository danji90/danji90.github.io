import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';

const sites = [
  {
    id: 'maretsch-gasse',
    center: fromLonLat([11.350735, 46.501792]),
    zoom: 15,
  },
  {
    id: 'south-tyrol',
    center: fromLonLat([11.350735, 46.501792]),
    zoom: 10,
  },
  {
    id: 'italy',
    center: fromLonLat([11.90918, 43.176878]),
    zoom: 6,
  },
  {
    id: 'flyTo-bmouth',
    fly: true,
    center: fromLonLat([-1.793519, 50.727866]),
    zoom: 15,
  },
  {
    id: 'uk',
    center: fromLonLat([-1.793519, 50.727866]),
    zoom: 8,
  },
  {
    id: 'flyTo-gdl',
    fly: true,
    center: fromLonLat([-103.353657, 20.67288]),
    zoom: 12,
  },
  {
    id: 'mexico',
    center: fromLonLat([-103.353657, 20.67288]),
    zoom: 8,
  },
  {
    id: 'flyTo-castellon',
    fly: true,
    center: fromLonLat([-0.039825, 39.986854]),
    zoom: 15,
  },
  {
    id: 'valencia',
    center: fromLonLat([-0.039825, 39.986854]),
    zoom: 8,
  },
  {
    id: 'flyTo-freiburg',
    fly: true,
    center: fromLonLat([7.849695, 47.992561]),
    zoom: 15,
  },
  {
    id: 'baWü',
    center: fromLonLat([7.849695, 47.992561]),
    zoom: 10,
  },
  {
    id: 'bz',
    center: fromLonLat([11.350735, 46.501792]),
    zoom: 13,
  },
];

const useStyles = makeStyles(() => {
  return {
    bgMap: {
      position: 'absolute',
      zIndex: -1,
      pointerEvents: 'none',
      overflow: 'hidden',
    },
  };
});

const bgMap = new Map({
  layers: [
    new TileLayer({
      preload: Infinity,
      source: new OSM({
        crossOrigin: 'anonymous',
      }),
    }),
  ],
  controls: [],
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});

let tripInterval;

const flyTo = (map, site) => {
  const view = map.getView();
  const duration = 2000;
  const zoom = view.getZoom();
  let parts = 2;
  let called = false;
  function callback(complete) {
    parts -= 1;
    if (called) {
      return;
    }
    if (parts === 0 || !complete) {
      called = true;
    }
  }
  view.animate(
    {
      center: site.center,
      duration,
    },
    callback,
  );
  view.animate(
    {
      zoom: zoom - 2,
      duration: duration / 2,
    },
    {
      zoom: site.zoom,
      duration: duration / 2,
    },
    callback,
  );
};

const startWorldTrip = (map) => {
  clearInterval(tripInterval);
  let index = 1;
  const changeSite = () => {
    const nextSite = sites[index];
    if (nextSite.fly) {
      flyTo(map, nextSite);
    } else {
      map.getView().fit(new Point(nextSite.center), {
        duration: 3000,
        maxZoom: nextSite.zoom,
      });
    }
    index = sites[index + 1] ? index + 1 : 0;
  };
  tripInterval = setInterval(changeSite, 7000);
  map.getView();
};

function BackgroundMap({ width, height, className }) {
  const classes = useStyles();
  useEffect(() => {
    bgMap.setTarget('map');
    bgMap.getView().setZoom(sites[0].zoom);
    bgMap.getView().setCenter(sites[0].center);
    startWorldTrip(bgMap);
    return () => clearInterval(tripInterval);
  }, []);
  return (
    <div
      id="map"
      className={`${classes.bgMap} ${className || ''}`}
      style={{ width, height }}
    />
  );
}

BackgroundMap.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

BackgroundMap.defaultProps = {
  width: '100%',
  height: '100%',
  className: undefined,
};

export default BackgroundMap;
