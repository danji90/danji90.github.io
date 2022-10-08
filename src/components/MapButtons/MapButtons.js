import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IconButton, makeStyles } from '@material-ui/core';
import { easeOut, easeIn } from 'ol/easing';
import { Add, Remove } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  mapBtnWrapper: {
    position: 'absolute',
    zIndex: 999,
    display: 'flex',
    flexDirection: 'column',
    bottom: 25,
    right: 5,
    gap: 10,
  },
  mapBtn: {
    zIndex: 1,
    backgroundColor: 'white',
    boxShadow: ' 0 1px 4px rgb(0 0 0 / 30%)',
    '&:hover': {
      backgroundColor: 'white',
    },
  },
}));

function MapButtons() {
  const classes = useStyles();
  const map = useSelector((state) => state.map);
  const [zoom, setZoom] = useState(map.getView().getZoom());

  const zoomIn = useCallback(() => {
    const currentZoom = map.getView().getZoom();
    const zoomStep = currentZoom + 1 > 21 ? Math.abs(currentZoom - 21) : 1;
    map.getView().animate(
      {
        zoom: currentZoom + zoomStep / 2,
        duration: 300,
        easing: easeIn,
      },
      {
        zoom: currentZoom + zoomStep,
        duration: 300,
        easing: easeOut,
      },
    );
  }, [map]);

  const zoomOut = useCallback(() => {
    const currentZoom = map.getView().getZoom();
    const zoomStep = currentZoom - 1 < 2 ? currentZoom - 2 : 1;
    map.getView().animate(
      {
        zoom: currentZoom - zoomStep / 2,
        duration: 300,
        easing: easeIn,
      },
      {
        zoom: currentZoom - zoomStep,
        duration: 300,
        easing: easeOut,
      },
    );
  }, [map]);

  useEffect(() => {
    const onZoomChange = () => setZoom(map.getView().getZoom());
    map.getView().on('change:resolution', onZoomChange);
    return () => map.getView().un('change:resolution', onZoomChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (zoom !== map.getView().getZoom()) {
      setZoom(map.getView().getZoom());
    }
  }, [map, zoom]);

  return (
    <div className={classes.mapBtnWrapper}>
      <IconButton
        classes={{ root: classes.mapBtn }}
        title="Zoom in"
        disabled={zoom >= 21}
        onClick={zoomIn}
      >
        <Add />
      </IconButton>
      <IconButton
        classes={{ root: classes.mapBtn }}
        title="Zoom out"
        disabled={map.getView().getZoom() <= 2}
        onClick={zoomOut}
      >
        <Remove />
      </IconButton>
    </div>
  );
}

export default MapButtons;
