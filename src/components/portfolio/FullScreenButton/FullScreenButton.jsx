import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullScreen from 'ol/control/FullScreen';
import MapButton from '../MapButton';
import { MapContext } from '../MapContextProvider/MapContextProvider';

const isFullScreenCapable = (element) => {
  if (!element) return false;
  return (
    element.requestFullscreen ||
    element.msRequestFullscreen ||
    element.mozRequestFullScreen ||
    element.webkitExitFullscreen
  );
};

function FullScreenButton({ elementRef }) {
  const { map, isFullScreen, setIsFullScreen } = useContext(MapContext);
  const [modalFullScreen, setUseModalFullScreen] = useState(false);
  const [error, setError] = useState(null);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      const element = elementRef.current;
      if (element) {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
        } else {
          // eslint-disable-next-line no-console
          console.error("Can't use full screen on this platform");
        }
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      // iOS Safari
      document.webkitExitFullscreen();
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

  if (!isFullScreenCapable(elementRef.current)) return null;

  return (
    <MapButton onClick={toggleFullScreen} title="Toggle Fullscreen">
      {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
    </MapButton>
  );
}

FullScreenButton.propTypes = {
  elementRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    .isRequired,
};

export default FullScreenButton;
