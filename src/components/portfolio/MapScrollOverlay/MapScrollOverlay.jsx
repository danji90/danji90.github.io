import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useContext,
} from 'react';
import { Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { DragPan, MouseWheelZoom } from 'ol/interaction';
import { platformModifierKeyOnly } from 'ol/events/condition';
import { unByKey } from 'ol/Observable';
import { useSelector } from 'react-redux';
import { MapContext } from '../MapContextProvider/MapContextProvider';

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
  const { map } = useContext(MapContext);
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
    const zoomPanInts = map
      .getInteractions()
      .getArray()
      .filter((interaction) => {
        return (
          (interaction instanceof DragPan ||
            interaction instanceof MouseWheelZoom) &&
          !interaction.getProperties().overlay
        );
      });

    zoomPanInts.forEach((interaction) => {
      interaction.setActive(false);
    });
    return () => {
      zoomPanInts.forEach((interaction) => {
        interaction.setActive(true);
      });
    };
  }, []);

  useEffect(() => {
    const dragPanInteraction = new DragPan({
      condition: () =>
        isMobile ? dragPanInteraction.getPointerCount() === 2 : true,
      onFocusOnly: true,
    });
    const mouseWheelZoomInteraction = new MouseWheelZoom({
      condition: (evt) => {
        const isScrollEvt = MOUSE_SCROLL_EVENTS.includes(evt.type);
        handleScrollOverlay(isScrollEvt && !platformModifierKeyOnly(evt));
        return platformModifierKeyOnly(evt);
      },
    });
    dragPanInteraction.setProperties({ overlay: true });
    mouseWheelZoomInteraction.setProperties({ overlay: true });
    const scrollInts = [dragPanInteraction, mouseWheelZoomInteraction];
    scrollInts.forEach((int) => map.addInteraction(int));
    onMoveStartKey = map.on('movestart', () => setShowOverlay(false));
    onPostRenderKey = map.on('postrender', () => {
      map.getTarget().addEventListener('touchmove', onTouchMove);
    });
    return () => {
      unByKey([onMoveStartKey, onPostRenderKey]);
      scrollInts.forEach((int) => map.removeInteraction(int));
      map.getTarget()?.removeEventListener('touchmove', onTouchMove);
    };
  }, [isMobile, map, onTouchMove]);

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
