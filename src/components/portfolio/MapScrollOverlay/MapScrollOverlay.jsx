import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { DragPan, MouseWheelZoom } from 'ol/interaction';
import { platformModifierKeyOnly } from 'ol/events/condition';
import { useSelector } from 'react-redux';
import { unByKey } from 'ol/Observable';

const useStyles = makeStyles(() => {
  return {
    scrollOverlay: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      padding: 10,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      boxSizing: 'border-box',
      opacity: 0,
      pointerEvents: 'none',
      transition: 'opacity 200ms ease-out',
    },
    showOverlay: {
      opacity: 1,
    },
  };
});

let scrollOverlayTimeout;
let onMoveStartKey;
let onPostRenderKey;
const MOUSE_SCROLL_EVENTS = ['scroll', 'mousescroll', 'wheel'];

export default function MapScrollOverlay() {
  const classes = useStyles();
  const map = useSelector((state) => state.portfolio.map);
  const [showOverlay, setShowOverlay] = useState(false);
  const isMobile = useMemo(
    () => window.matchMedia('only screen and (max-width: 768px)').matches,
    [],
  );

  const handleScrollOverlay = useCallback((show) => {
    if (show) {
      clearTimeout(scrollOverlayTimeout);
      setShowOverlay(true);
      scrollOverlayTimeout = setTimeout(() => {
        setShowOverlay(false);
      }, 1200);
    }
  }, []);

  const onTouchMove = useCallback(
    (evt) => evt.touches.length < 2 && isMobile && handleScrollOverlay(true),
    [handleScrollOverlay, isMobile],
  );

  useEffect(() => {
    const onLoadTargetKey = map.once('change:target', () => {
      const dragPanInteraction = new DragPan({
        condition: () => {
          return isMobile ? dragPanInteraction.getPointerCount() === 2 : true;
        },
        onFocusOnly: true,
      });
      const scrollInts = [
        dragPanInteraction,
        new MouseWheelZoom({
          condition: (evt) => {
            const isScrollEvt = MOUSE_SCROLL_EVENTS.includes(evt.type);
            handleScrollOverlay(isScrollEvt && !platformModifierKeyOnly(evt));
            return platformModifierKeyOnly(evt);
          },
        }),
      ];
      scrollInts.forEach((int) => map.addInteraction(int));
      onMoveStartKey = map.on('movestart', () => setShowOverlay(false));
      onPostRenderKey = map.on('postrender', () => {
        map.getTarget().addEventListener('touchmove', onTouchMove);
      });
    });
    return () => {
      unByKey(onMoveStartKey);
      unByKey(onPostRenderKey);
      unByKey(onLoadTargetKey);
      map.getTarget().removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <div
      className={`${classes.scrollOverlay}${
        showOverlay ? ` ${classes.showOverlay}` : ''
      }`}
    >
      <Typography variant="h6" style={{ color: 'white' }}>
        {isMobile
          ? 'Use two fingers to navigate the map'
          : 'Use CTRL + scroll to zoom'}
      </Typography>
    </div>
  );
}
