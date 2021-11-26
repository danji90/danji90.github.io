import React from 'react';
import { makeStyles } from '@material-ui/core';
import portrait from '../../assets/images/daniel1.jpg';

const useStyles = makeStyles((theme) => ({
  portraitContainer: {
    margin: 10,
    border: '4px solid #565656',
    borderRadius: '50%',
    overflow: 'hidden',
    maxWidth: 200,
    maxHeight: 200,
    [theme.breakpoints.up('md')]: {
      maxWidth: 250,
      maxHeight: 250,
      marginRight: 20,
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: 300,
      maxHeight: 300,
      marginRight: 30,
    },
  },
  portraitImg: {
    width: '100%',
    height: '100%',
  },
}));

function Portrait() {
  const classes = useStyles();
  return (
    <div className={classes.portraitContainer}>
      <img src={portrait} alt="error" className={classes.portraitImg} />
    </div>
  );
}

export default Portrait;
