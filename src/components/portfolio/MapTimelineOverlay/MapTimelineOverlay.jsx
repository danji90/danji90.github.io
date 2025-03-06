import React, { useContext, useEffect, useRef, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Button } from '@mui/material';
import { Close } from '@mui/icons-material';
import scrollIntoView from 'scroll-into-view';
import { MapContext } from '../MapContextProvider/MapContextProvider';
import mapData from '../../../assets/data/mapFeatures.json';

import getIconSource from '../../utils/getIconSource';

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
    if (selectedFeature) {
      itemRefs.current[selectedFeature.ol_uid]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selectedFeature]);

  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          position: 'absolute',
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          overflow: 'hidden',
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
      <List sx={{ marginTop: 4, overflow: 'auto' }}>
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
              <ListItem key={feat.getId()} disablePadding>
                <ListItemButton
                  sx={{ gap: 2 }}
                  ref={(el) => {
                    itemRefs.current = {
                      ...(itemRefs.current || {}),
                      [feat.ol_uid]: el,
                    };
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      textAlign: 'start',
                      height: '100%',
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
                    {/* <Box sx={{ width: 10, flex: 1, backgroundColor: 'red' }}>
                      Bla
                    </Box> */}
                  </Box>
                  <ListItemText primary={title} secondary={description} />
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
    </Drawer>
  );
}
