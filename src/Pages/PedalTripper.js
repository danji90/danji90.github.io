import React from 'react';
import { makeStyles } from '@material-ui/core';
import BikeMap from '../components/pedaltripper/BikeMap';

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
  };
});

const PedalTripper = () => {
  const classes = useStyles();
  return (
    <div className={classes.mapContainer}>
      <BikeMap className />
    </div>
  );
};

export default PedalTripper;
