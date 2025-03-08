import React, { useCallback, useEffect, useState, useContext } from 'react';
import { Button, IconButton } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { easeOut, easeIn } from 'ol/easing';
import { Add, Remove } from '@mui/icons-material';
import { MapContext } from '../MapContextProvider/MapContextProvider';
import MapButton from '../MapButton';

const useStyles = makeStyles(() => ({
  mapBtnWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  zoomOutBtn: {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  zoomBtn: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
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
      <MapButton
        title="Zoom in"
        disabled={zoom >= getView().getMaxZoom()}
        onClick={zoomIn}
        size="large"
        className={classes.zoomBtn}
      >
        <Add />
      </MapButton>
      <MapButton
        title="Zoom out"
        disabled={zoom <= getView().getMinZoom()}
        onClick={zoomOut}
        size="large"
        className={classes.zoomOutBtn}
      >
        <Remove />
      </MapButton>
    </div>
  );
}

export default MapButtons;
