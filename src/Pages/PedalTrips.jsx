import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import BikeMap from '../components/pedaltrips/BikeMap';

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

function PedalTrips() {
  const classes = useStyles();
  return (
    <div className={classes.mapContainer}>
      <BikeMap className />
    </div>
  );
}

export default PedalTrips;
