import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullScreen from 'ol/control/FullScreen';
import MapButton from '../MapButton';
import { MapContext } from '../MapContextProvider/MapContextProvider';

const useStyles = makeStyles(() => {
  return {
    fullScreenBtn: {
      position: 'absolute',
      top: 15,
      right: 5,
      zIndex: 1,
    },
  };
});

function FullScreenButton({ elementRef }) {
  const classes = useStyles();
  const { map, isFullScreen, setIsFullScreen } = useContext(MapContext);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      if (elementRef.current) {
        elementRef.current.requestFullscreen();
      }
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
      map.updateSize();
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () =>
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

  return (
    <MapButton
      className={classes.fullScreenBtn}
      onClick={toggleFullScreen}
      title="Toggle Fullscreen"
    >
      {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
    </MapButton>
  );
}

FullScreenButton.propTypes = {
  elementRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    .isRequired,
};

export default FullScreenButton;
