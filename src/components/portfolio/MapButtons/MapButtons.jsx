import React, { useCallback, useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { easeOut, easeIn } from 'ol/easing';
import { Add, Remove } from '@mui/icons-material';
import { MapContext } from '../LifeMap/MapContextProvider';

const useStyles = makeStyles(() => ({
  mapBtnWrapper: {
    display: 'flex',
    position: 'absolute',
    flexDirection: 'column',
    zIndex: 999,
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
  const { map } = useContext(MapContext);
  const getView = useCallback(() => map.getView(), [map]);
  const [zoom, setZoom] = useState(getView().getZoom());

  const zoomIn = useCallback(() => {
    const view = getView();
    const currentZoom = getView().getZoom();
    const zoomStep = currentZoom + 1 > 21 ? Math.abs(currentZoom - 21) : 1;
    view.animate(
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
  }, [getView]);

  const zoomOut = useCallback(() => {
    const currentZoom = getView().getZoom();
    const zoomStep = currentZoom - 1 < 2 ? currentZoom - 2 : 1;
    getView().animate(
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
  }, [getView]);

  useEffect(() => {
    const onZoomChange = () => setZoom(getView().getZoom());
    getView().on('change:resolution', onZoomChange);
    return () => getView().un('change:resolution', onZoomChange);
  }, []);

  useEffect(() => {
    if (zoom !== getView().getZoom()) {
      setZoom(getView().getZoom());
    }
  }, [getView, zoom]);

  return (
    <div className={classes.mapBtnWrapper}>
      <IconButton
        classes={{ root: classes.mapBtn }}
        title="Zoom in"
        disabled={zoom >= getView().getMaxZoom()}
        onClick={zoomIn}
        size="large"
      >
        <Add />
      </IconButton>
      <IconButton
        classes={{ root: classes.mapBtn }}
        title="Zoom out"
        disabled={zoom <= getView().getMinZoom()}
        onClick={zoomOut}
        size="large"
      >
        <Remove />
      </IconButton>
    </div>
  );
}

export default MapButtons;
