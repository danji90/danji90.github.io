import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import {
  Button,
  Icon,
  SwipeableDrawer,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Close, ChevronLeft } from '@mui/icons-material';
import scrollIntoView from 'scroll-into-view';
import { Feature } from 'ol';
import PropTypes from 'prop-types';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { min } from 'date-fns';
import mapData from '../../../assets/data/mapFeatures.json';
import { MapContext } from '../MapContextProvider/MapContextProvider';

import getIconSource from '../../utils/getIconSource';
import MapButton from '../MapButton';
import unselectAllFeatures from '../../utils/unselectAllFeatures';

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export const DRAWER_WIDTH = 300;

function TimeLine({ features }) {
  const theme = useTheme();
  const isTabletDown = useMediaQuery(theme.breakpoints.down('lg'));
  const {
    work,
    education,
    residence,
    baselayers,
    map,
    selectedFeature,
    setSelectedFeature,
    timeSpan,
    setTimeSpan,
    showResidence,
    showWork,
    showEducation,
    layersOpen,
    isFullScreen: isFullScreenIOS,
    fullScreenElement,
  } = useContext(MapContext);
  // const [open, setOpen] = useState(false);
  const itemRefs = useRef(null);
  const [hoverItem, setHoverItem] = useState(null);

  const handleMouseMove = (event, id) => {
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - left) / width) * 100;
    const y = ((event.clientY - top) / height) * 100;
    event.currentTarget.style.setProperty('--x', `${x}%`);
    event.currentTarget.style.setProperty('--y', `${y}%`);
  };

  useEffect(() => {
    if (selectedFeature && itemRefs?.current?.[selectedFeature.ol_uid]) {
      itemRefs.current[selectedFeature.ol_uid]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selectedFeature, itemRefs?.current, features]);

  return (
    <Box
      sx={{
        overflow: 'auto',
        height: 'calc(100% - 30px)',
        minWidth: DRAWER_WIDTH,
      }}
    >
      {features
        ?.filter((feat) => {
          const type = feat.get('type');
          if (type === 'work') {
            return showWork;
          }
          if (type === 'residence') {
            return showResidence;
          }
          if (type === 'education') {
            return showEducation;
          }
          return false;
        })
        .sort((a, b) => {
          const timestampA = Array.isArray(a.get('timestamp')[0])
            ? a.get('timestamp')[0][0]
            : a.get('timestamp')[0];
          const timestampB = Array.isArray(b.get('timestamp')[0])
            ? b.get('timestamp')[0][0]
            : b.get('timestamp')[0];
          return new Date(timestampA) - new Date(timestampB);
        })
        .map((feat) => {
          const { type, city, description, title } = feat.getProperties();
          const selected = feat.ol_uid === selectedFeature?.ol_uid;

          return (
            <MuiAccordion
              disableGutters
              square
              elevation={0}
              ref={(el) => {
                itemRefs.current = {
                  ...(itemRefs.current || {}),
                  [feat.ol_uid]: el,
                };
              }}
              expanded={selected}
              onChange={() => setSelectedFeature(feat)}
              onMouseMove={(evt) => handleMouseMove(evt, feat.ol_uid)}
              onMouseEnter={() => setHoverItem(feat.ol_uid)}
              onMouseLeave={() => setHoverItem(null)}
              sx={{
                //       borderImage:
                //         mousePos.id === feat.ol_uid
                //           ? `radial-gradient(circle at ${mousePos.x} ${mousePos.y},
                // rgba(255, 0, 0, 1) 0%,
                // rgba(255, 0, 0, 0) 50%) 1`
                //           : 'none',
                // border: 'none',
                '&::before': {
                  display: 'none',
                },
              }}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
                expandIcon={null}
                sx={{
                  padding: 0,
                  backgroundColor: 'white',
                  '& .MuiAccordionSummary-content': {
                    minHeight: 100,
                    display: 'flex',
                    gap: 2,
                    marginY: 0,
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  <Box
                    sx={{
                      width: 10,
                      height: '100%',
                      position: 'absolute',
                      left: 19,
                      top: 0,
                      background: selected
                        ? `linear-gradient(180deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.main} 20%, ${theme.palette.primary.main} 100%)`
                        : theme.palette.text.primary,
                      zIndex: 1,
                    }}
                  />
                  <Box
                    sx={() => {
                      const currentColor = selected
                        ? theme.palette.primary.main
                        : theme.palette.text.primary;
                      return {
                        zIndex: 2,
                        margin: '5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 30,
                        height: 30,
                        padding: 0.5,
                        borderRadius: '50%',
                        transition: 'background 0.1s ease-out',
                        background:
                          !selected && hoverItem === feat.ol_uid
                            ? `radial-gradient(circle at var(--x, 50%) var(--y, 50%), ${theme.palette.primary.main} 30%, ${theme.palette.text.primary} 70%)`
                            : currentColor,
                      };
                    }}
                  >
                    <img
                      src={getIconSource(type)}
                      alt={type}
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: 'white',
                        padding: 2,
                      }}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    sx={{
                      padding: '10px 0 5px',
                      fontWeight: 'bold',
                      lineHeight: 1.2,
                    }}
                  >
                    {title}
                  </Typography>
                  <Typography variant="caption">{city}</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  borderTop: 0,
                  // background: selected
                  //   ? 'linear-gradient(180deg, rgba(255,255,255,1) 85%, rgba(0,0,0,0.06206232492997199) 100%)'
                  //   : 'rgba(0,0,0,0.06206232492997199) 100%)',
                }}
              >
                <Typography
                  sx={{
                    position: 'relative',
                    zIndex: 50,
                    padding: '0 5px 35px 11px',
                    '&:before': {
                      content: '""',
                      width: 10,
                      height: 'calc(100% + 32px)',
                      position: 'absolute',
                      top: -16,
                      left: 11,
                      background: `linear-gradient(180deg, ${theme.palette.primary.main} 90%, ${theme.palette.text.primary} 100%)`,
                      zIndex: -2,
                    },
                    '&:after': {
                      content: '""',
                      width: 'calc(100% + 10px)',
                      height: 'calc(100% - 25px) ',
                      position: 'absolute',
                      top: -10,
                      left: -4,
                      backgroundColor: 'white',
                      zIndex: -1,
                      border: `2px solid ${theme.palette.primary.main}`,
                      borderRadius: 4,
                    },
                  }}
                >
                  {description}
                </Typography>
              </AccordionDetails>
            </MuiAccordion>
          );
        })}
    </Box>
  );
}

TimeLine.propTypes = {
  features: PropTypes.arrayOf(PropTypes.instanceOf(Feature)),
};

export default function MapTimelineOverlay({ features }) {
  const theme = useTheme();
  const { setSelectedFeature, selectedFeature } = useContext(MapContext);
  const isTabletDown = useMediaQuery(theme.breakpoints.down('lg'));

  const styles = useMemo(() => {
    const desktop = {
      width: selectedFeature ? DRAWER_WIDTH : 0,
      transition: 'width 0.3s ease-in-out',
      right: 0,
      top: 0,
      height: '100%',
    };
    const mobile = {
      width: '100%',
      height: selectedFeature ? '50%' : 0,
      bottom: 0,
      left: 0,
      transition: 'height 0.3s ease-in-out',
    };
    return isTabletDown ? mobile : desktop;
  }, [isTabletDown, selectedFeature]);
  // const [open, setOpen] = useState(false);

  return (
    <div>
      {/* <MapButton
        sx={{
          position: 'absolute',
          top: 'calc(50% - 20px)',
          right: -25,
          zIndex: 10,
          '& svg': {
            marginLeft: -2,
          },
        }}
        onClick={() => setOpen(true)}
      >
        <ChevronLeft />
      </MapButton> */}
      <Box
        sx={{
          backgroundColor: 'white',
          position: 'absolute',
          zIndex: 1600,
          overflowX: 'hidden',
          boxShadow: '-10px 0px 8px -5px rgba(0, 0, 0, 0.3)',
          ...styles,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            height: 30,
            width: '100%',
            backgroundColor: theme.palette.text.primary,
          }}
        >
          <IconButton
            size="small"
            onClick={() => {
              setSelectedFeature(null);
              // setOpen(false);
            }}
          >
            <Close sx={{ width: 20, height: 20, color: 'white' }} />
          </IconButton>
        </Box>
        <TimeLine features={features} />
      </Box>
    </div>
  );
}

MapTimelineOverlay.propTypes = {
  features: PropTypes.arrayOf(PropTypes.instanceOf(Feature)),
};
