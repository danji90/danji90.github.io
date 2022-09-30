import React from 'react';
import { useSelector } from 'react-redux';
import { IconButton, makeStyles } from '@material-ui/core';
import {easeOut, easeIn} from 'ol/easing';
import { Add, Remove } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    mapBtnWrapper: {
      position: 'absolute',
      zIndex: 999,
      display: 'flex',
      flexDirection: 'column',
      bottom: 25,
      right: 10,
      gap: 10,
    },
    mapBtn: {
      zIndex: 1,
      backgroundColor: 'white',
      boxShadow: ' 0 1px 4px rgb(0 0 0 / 30%)',
      '&:hover': {
        backgroundColor: 'white',
      }
    },
  }));

function MapButtons() {
    const classes = useStyles();
    const map = useSelector((state) => state.map);

  return (
    <div className={classes.mapBtnWrapper}>
      <IconButton
        classes={{ root: classes.mapBtn }}
        title="Zoom in" 
        onClick={() => {
          map.getView().animate({
            zoom: map.getView().getZoom() + 0.5,
            duration: 300,
            easing: easeIn,
          },
          {
            zoom: map.getView().getZoom() + 1,
            duration: 300,
            easing: easeOut,
          })
        }}
      >
        <Add />
      </IconButton>
      <IconButton
        classes={{ root: classes.mapBtn }}
        title="Zoom out" 
        onClick={() => {
          map.getView().animate({
            zoom: map.getView().getZoom() - 0.5,
            duration: 300,
            easing: easeIn,
          },
          {
            zoom: map.getView().getZoom() - 1,
            duration: 300,
            easing: easeOut,
          })
        }}
      >
        <Remove />
      </IconButton>
    </div>
  )
}

export default MapButtons