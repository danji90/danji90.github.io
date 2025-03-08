import React, { useContext, useEffect, useRef, useState } from 'react';
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

function DrawerComponent({ children, ...props }) {
  const theme = useTheme();
  const isTabletDown = useMediaQuery(theme.breakpoints.down('lg'));
  const { setSelectedFeature } = useContext(MapContext);

  if (isTabletDown) {
    return (
      <SwipeableDrawer
        anchor="bottom"
        variant="persistent"
        onClose={() => setSelectedFeature(null)}
        sx={{
          width: '100%',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            borderTop: 'none',
            position: 'absolute',
            width: '100%',
            boxSizing: 'border-box',
            maxHeight: '50%',
          },
        }}
        {...props}
      >
        {children}
      </SwipeableDrawer>
    );
  }
  return (
    <Drawer
      anchor="right"
      variant="persistent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          position: 'absolute',
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
        },
      }}
      {...props}
    >
      {children}
    </Drawer>
  );
}

DrawerComponent.propTypes = {
  children: PropTypes.node,
};

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

  useEffect(() => {
    if (selectedFeature && itemRefs?.current?.[selectedFeature.ol_uid]) {
      itemRefs.current[selectedFeature.ol_uid]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selectedFeature, itemRefs?.current, features]);

  return (
    <Box sx={{ overflow: 'auto', marginTop: 3 }}>
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
              // key={feat.ol_uid}
              sx={{
                border: 'none',
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
                  background: selected
                    ? 'linear-gradient(180deg, rgba(0,0,0,0.06206232492997199) 0%, rgba(255,255,255,1) 15%)'
                    : 'rgba(0,0,0,0.06206232492997199)',
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
                    flexDirection: 'column',
                  }}
                >
                  <Box
                    sx={{
                      width: 10,
                      flexGrow: 1,
                      marginBottom: -0.5,
                      background: selected
                        ? `linear-gradient(180deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.main} 100%)`
                        : theme.palette.text.primary,
                    }}
                  />
                  <Icon
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      border: `4px solid ${
                        selected
                          ? theme.palette.primary.main
                          : theme.palette.text.primary
                      }`,
                    }}
                  >
                    <img
                      src={getIconSource(type)}
                      alt={type}
                      style={{ width: 24, height: 24 }}
                    />
                  </Icon>
                  <Box
                    sx={{
                      width: 10,
                      flexGrow: 1,
                      marginTop: -0.5,
                      background: selected
                        ? theme.palette.primary.main
                        : theme.palette.text.primary,
                    }}
                  />
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
                  background: selected
                    ? 'linear-gradient(180deg, rgba(255,255,255,1) 85%, rgba(0,0,0,0.06206232492997199) 100%)'
                    : 'rgba(0,0,0,0.06206232492997199) 100%)',
                }}
              >
                <Typography
                  sx={{
                    position: 'relative',
                    backgroundColor: 'rgba(255,255,255,0.4)',
                    zIndex: 50,
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
                      width: '100%',
                      height: 'calc(100% + 28px)',
                      position: 'absolute',
                      top: -10,
                      left: 11,
                      background:
                        'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.75) 10%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.75) 90%, rgba(255,255,255,0) 100%)',
                      zIndex: -1,
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
  // const [open, setOpen] = useState(false);

  return (
    <>
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
      <DrawerComponent open={!!selectedFeature}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            backgroundColor: theme.palette.text.primary,
            position: 'fixed',
            width: { xs: '100%', md: 'calc(100% - 60px)', lg: DRAWER_WIDTH },
            // width: '100%',
            zIndex: 1000,
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
      </DrawerComponent>
    </>
  );
}

MapTimelineOverlay.propTypes = {
  features: PropTypes.arrayOf(PropTypes.instanceOf(Feature)),
};
