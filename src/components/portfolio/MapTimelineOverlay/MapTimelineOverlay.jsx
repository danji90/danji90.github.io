import React, { useContext, useEffect, useRef, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Button, Icon } from '@mui/material';
import { Close } from '@mui/icons-material';
import scrollIntoView from 'scroll-into-view';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { min } from 'date-fns';
import mapData from '../../../assets/data/mapFeatures.json';
import { MapContext } from '../MapContextProvider/MapContextProvider';

import getIconSource from '../../utils/getIconSource';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

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

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  backgroundColor: '#282c34',
  position: 'fixed',
  width: DRAWER_WIDTH,
  zIndex: 1000,
}));

export default function MapTimelineOverlay() {
  // const theme = useTheme();
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
  const [open, setOpen] = useState(false);
  const itemRefs = useRef(null);
  const [, forceRender] = useState(0);

  useEffect(() => {
    forceRender((prev) => prev + 1);
    if (selectedFeature && itemRefs?.current?.[selectedFeature.ol_uid]) {
      itemRefs.current[selectedFeature.ol_uid]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selectedFeature, itemRefs?.current]);

  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          position: 'absolute',
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="right"
      open={!!selectedFeature}
    >
      <DrawerHeader>
        <IconButton size="small" onClick={() => setSelectedFeature(null)}>
          <Close sx={{ width: 20, height: 20, color: 'white' }} />
        </IconButton>
      </DrawerHeader>
      <Box sx={{ overflow: 'auto', marginTop: 4 }}>
        {[...work, ...residence, ...education]
          .filter((feat) => {
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
            const { selected, type, city, description, title } =
              feat.getProperties();

            const iconColor = selected
              ? 'theme.palette.primary.main'
              : 'theme.palette.text.primary';

            return (
              <Accordion
                ref={(el) => {
                  itemRefs.current = {
                    ...(itemRefs.current || {}),
                    [feat.ol_uid]: el,
                  };
                }}
                expanded={selected}
                onChange={() => setSelectedFeature(feat)}
                key={feat.ol_uid}
                sx={{
                  border: 'none',
                }}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                  expandIcon={null}
                  sx={{
                    padding: 0,
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
                      sx={(theme) => ({
                        width: 10,
                        flexGrow: 1,
                        background: selected
                          ? `linear-gradient(180deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.main} 100%)`
                          : theme.palette.text.primary,
                      })}
                    />
                    <Icon
                      sx={(theme) => ({
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
                      })}
                    >
                      <img
                        src={getIconSource(type)}
                        alt={type}
                        style={{ width: 24, height: 24 }}
                      />
                    </Icon>
                    <Box
                      sx={(theme) => ({
                        width: 10,
                        flexGrow: 1,
                        background: selected
                          ? theme.palette.primary.main
                          : theme.palette.text.primary,
                      })}
                    />
                  </Box>
                  <Box>
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
                <AccordionDetails sx={{ borderTop: 0 }}>
                  <Typography
                    sx={(theme) => ({
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
                        background:
                          'linear-gradient(180deg, rgba(99,160,0,1) 90%, rgba(86,86,86,1) 100%)',
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
                    })}
                  >
                    {description}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
      </Box>
      {/* <List sx={{ marginTop: 4, overflow: 'auto' }}>
        {[...work, ...residence, ...education]
          .filter((feat) => {
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
            const { selected, type, city, description, title } =
              feat.getProperties();

            return (
              <ListItem
                key={feat.getId()}
                disablePadding
                sx={{
                  maxHeight: selected ? 'max-content' : 200,
                  overflow: 'hidden',
                  width: '100%',
                }}
              >
                <ListItemButton
                  component="button"
                  sx={{
                    gap: 2,
                    height: selected ? 'auto' : 200,
                  }}
                  ref={(el) => {
                    itemRefs.current = {
                      ...(itemRefs.current || {}),
                      [feat.ol_uid]: el,
                    };
                  }}
                >
                  <ListItemIcon
                    sx={(theme) => ({
                      border: `2px solid ${theme.palette.text.primary}`,
                      borderRadius: '50%',
                      height: 40,
                      minWidth: 40,
                      width: 40,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: selected
                        ? 'rgba(255, 0, 0,0.4)'
                        : 'transparent',
                    })}
                  >
                    <img
                      src={getIconSource(type)}
                      alt={type}
                      style={{ width: 24, height: 24 }}
                    />
                  </ListItemIcon>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      flexGrow: 1,
                    }}
                  >
                    <Typography variant="h6">{title}</Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        whiteSpace: 'nowrap',
                        '-webkit-line-clamp': 3,
                        '-webkit-box-orient': 'vertical',
                        display: '-webkit-box',
                        overflow: 'hidden',
                      }}
                    >
                      {description}
                    </Typography>
                  </div>
                </ListItemButton>
              </ListItem>
            );
          })}
      </List> */}
    </Drawer>
  );
}
