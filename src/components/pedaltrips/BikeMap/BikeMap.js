import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, Hidden } from '@material-ui/core';
import BaseLayerSwitcher from 'react-spatial/components/BaseLayerSwitcher';
import BasicMap from 'react-spatial/components/BasicMap';

const useStyles = makeStyles(() => {
  return {
    mapContainer: {
      width: '100vh',
      height: '100vh',
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
  };
});

export default function BikeMap() {
  const classes = useStyles();
  const { map, baseLayers } = useSelector((state) => state.pedaltrips);
  return (
    <>
      <BasicMap
        className={`rs-map ${classes.map}`}
        center={[704443.6526761843, 5948635.256536721]}
        zoom={4}
        viewOptions={{
          minZoom: 2.3,
          maxZoom: 21,
        }}
        layers={baseLayers}
        map={map}
        //   onFeaturesClick={this.onFeatureClick}
        onFeaturesHover={(features) => {
          if (features.length) {
            document.body.style.cursor = 'pointer';
          } else {
            document.body.style.cursor = 'auto';
          }
        }}
      />
      <div className={classes.baselayerSwitcherWrapper}>
        <Hidden smDown>
          <BaseLayerSwitcher
            map={map}
            layers={baseLayers}
            // layerImages={layerImages}
          />
        </Hidden>
      </div>
    </>
  );
}
