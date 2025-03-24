import React, { useEffect, useState, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullScreen from 'ol/control/FullScreen';
import { Modal } from '@mui/material';
import { createPortal } from 'react-dom';
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
  const {
    map,
    isFullScreen,
    setIsFullScreen,
    fullScreenElement,
    setFullScreenElement,
  } = useContext(MapContext);

  const toggleFullScreen = () => {
    const element = elementRef.current;
    if (!isFullScreenCapable(element)) {
      setIsFullScreen(!isFullScreen);
    } else if (!document.fullscreenElement) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  };

  useEffect(() => {
    const abortCtrl = new AbortController();
    const { signal } = abortCtrl;
    const handleFullScreenChange = () => {
      setFullScreenElement(document.fullscreenElement);
      map.updateSize();
    };
    document.addEventListener('fullscreenchange', handleFullScreenChange, {
      signal,
    });
    document.addEventListener(
      'keydown',
      (evt) => {
        if (evt.which === 27) {
          setIsFullScreen(false);
        }
      },
      {
        signal,
      },
    );
    handleFullScreenChange();
    return () => {
      abortCtrl.abort();
    };
  }, [isFullScreen]);

  return (
    <MapButton onClick={toggleFullScreen} title="Toggle Fullscreen">
      {isFullScreen || fullScreenElement ? (
        <FullscreenExitIcon />
      ) : (
        <FullscreenIcon />
      )}
    </MapButton>
  );
}

FullScreenButton.propTypes = {
  elementRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    .isRequired,
};

export default FullScreenButton;
