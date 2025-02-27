import React, { useEffect, useRef, useContext } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullScreen from 'ol/control/FullScreen';
import MapButton from '../MapButton';
import { MapContext } from '../MapContextProvider/MapContextProvider';

const useStyles = makeStyles(() => {
  return {
    fullScreenBtn: {
      position: 'absolute',
      top: 85,
      right: 5,
      zIndex: 1,
      '& .ol-control': {
        width: '100%',
        height: '100%',
        padding: 0,
        top: 0,
        right: 'unset',
        left: 0,
        borderRadius: '50%',
        '& button': {
          width: '100%',
          height: '100%',
          padding: 0,
          borderRadius: '50%',
          backgroundColor: 'white',
          boxShadow: '0 1px 4px rgb(0 0 0 / 30%)',
          '&:hover': {
            backgroundColor: 'white',
          },
        },
      },
    },
  };
});

function FullScreenButton() {
  const classes = useStyles();
  const { map } = useContext(MapContext);
  const fullscreenControlRef = useRef(null);

  useEffect(() => {
    if (map && fullscreenControlRef?.current) {
      const fullscreenControl = new FullScreen({
        target: fullscreenControlRef.current,
      });
      map.addControl(fullscreenControl);
    }
  }, [map]);

  return (
    <MapButton className={classes.fullScreenBtn} ref={fullscreenControlRef}>
      <FullscreenIcon />
    </MapButton>
  );
}

export default FullScreenButton;
