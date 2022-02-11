/* eslint-disable no-return-assign */
import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { FiPlus, FiMinus } from 'react-icons/fi';
import {
  AppBar,
  Tabs,
  Tab,
  List,
  ListItem,
  Hidden,
  SwipeableDrawer,
  Button,
  Popper,
  Paper,
  MenuList,
  MenuItem,
  Slide,
  useTheme,
  useMediaQuery,
  useScrollTrigger,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { Menu as MenuBtn, Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import scrollIntoView from 'scroll-into-view';
import { setMenuOpen, setXpOpen } from '../../model/actions';

import Portrait from '../Portrait/Portrait';
import DropDown from '../DropDown/DropDown';

const useStyles = makeStyles((theme) => ({
  navWrapper: {
    position: 'sticky',
    top: 0,
    zIndex: 900,
  },
  appBar: {
    backgroundColor: '#282c34',
    height: 70,
    alignItems: 'center',
  },
  tabs: {
    color: 'white',
    width: '80%',
    margin: 'auto',
    overflow: 'visible',
  },
  tabsFixed: {
    overflow: 'visible !important',
  },
  tabLabel: {
    display: 'flex',
    alignItems: 'center',
  },
  collapse: {
    position: 'fixed',
    width: '100%',
    top: 48,
    height: 0,
    overflow: 'hidden',
    borderBottom: '1px solid #35353520',
    zIndex: 1000,
  },
  open: {
    height: '100vh',
    boxShadow: '0px 10px 15px #35353520',
  },
  list: {
    width: '80vw',
    maxWidth: 400,
    '& .active': {
      fontWeight: 'bold',
    },
  },
  listItem: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: 18,
  },
  closeMenuBtn: {
    position: 'fixed',
    left: 10,
    top: 10,
    color: 'white',
    zIndex: 1400,
    [theme.breakpoints.up('sm')]: {
      position: 'fixed',
      left: 10,
    },
  },
  openMenuBtn: {
    padding: 20,
    color: 'white',
  },
  dropdownListItem: {
    height: '100%',
    width: '100%',
  },
  experienceDropdown: {
    backgroundColor: '#282c34',
    width: '100%',
  },
  experienceItem: {
    fontSize: '1rem',
    justifyContent: 'center',
    margin: 'auto',
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover': {
      color: 'rgba(255, 255, 255, 1)',
    },
    padding: '20px 0',
  },
  portraitWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 0',
  },
  experienceButton: {
    width: '100%',
    height: 72,
    fontSize: 18,
    backgroundColor: 'white',
    color: '#565656',
    position: 'relative',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      borderRadius: 0,
    },
  },
  expandIcon: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-40%)',
    right: 5,
    padding: 20,
  },
}));

const HideOnScroll = (props) => {
  const { children } = props;
  const [homeVisible, setHomeVisible] = useState(false);
  const theme = useTheme();
  const isTabletDown = useMediaQuery(theme.breakpoints.down('md'));
  const trigger = useScrollTrigger({
    target: window,
  });
  const homeContainer = document.getElementById('home-container');
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]) {
        setHomeVisible(entries[0].isIntersecting);
      }
    },
    {
      rootMargin: '70px',
    },
  );

  useEffect(() => {
    if (homeContainer) {
      observer.observe(homeContainer);
    }
  }, [homeContainer, observer]);

  return !isTabletDown ? (
    <>{children}</>
  ) : (
    <Slide appear={false} direction="down" in={homeVisible || !trigger}>
      {children}
    </Slide>
  );
};

HideOnScroll.propTypes = {
  children: PropTypes.node.isRequired,
};

const ExperienceMenu = ({ tabs, onItemClick, anchor }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const xpOpen = useSelector((state) => state.xpOpen);
  if (!anchor) {
    return null;
  }
  return (
    <Popper
      open={xpOpen}
      anchorEl={anchor}
      id="menu-list-grow"
      style={{ zIndex: 9999, width: anchor.offsetWidth }}
    >
      <Paper
        onMouseLeave={(evt) => {
          const movingTo = evt.relatedTarget?.tagName;
          if (movingTo === 'SPAN') return;
          dispatch(setXpOpen(false));
        }}
      >
        <MenuList className={classes.experienceDropdown}>
          {tabs.map((tab) => (
            <MenuItem
              className={classes.experienceItem}
              key={tab.id}
              onClick={() => onItemClick(tab)}
            >
              {tab.name}
            </MenuItem>
          ))}
        </MenuList>
      </Paper>
    </Popper>
  );
};

ExperienceMenu.propTypes = {
  tabs: PropTypes.array.isRequired,
  onItemClick: PropTypes.func.isRequired,
  anchor: PropTypes.object,
};

ExperienceMenu.defaultProps = {
  anchor: null,
};

const scrollToSection = (sectionId, callback) => {
  const targetElement = document.getElementById(sectionId);
  const callbackFunc =
    typeof callback === 'function'
      ? callback
      : () => (window.location.hash = sectionId);
  scrollIntoView(
    targetElement,
    {
      time: 1000,
      align:
        sectionId !== 'home'
          ? {
              top: 0,
            }
          : undefined,
    },
    callbackFunc,
  );
};

const NavBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'));
  const [value, setValue] = useState('home');
  const sections = useSelector((state) => state.sections);
  const xpOpen = useSelector((state) => state.xpOpen);
  const menuOpen = useSelector((state) => state.menuOpen);
  const [xpTabNode, setXpTabNode] = useState(null);

  const onItemClick = useCallback(
    (section) => {
      if (section.id === 'experience') {
        dispatch(setXpOpen(!xpOpen));
        setValue(section.id);
      } else {
        dispatch(setXpOpen(false));
        dispatch(setMenuOpen(false));
        scrollToSection(section.id);
      }
    },
    [dispatch, xpOpen],
  );

  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = 'home';
    }
  }, []);

  return (
    <HideOnScroll>
      <div className={classes.navWrapper}>
        <AppBar
          className={classes.appBar}
          color="transparent"
          position="static"
        >
          <Hidden mdUp>
            {!menuOpen && (
              <IconButton
                onClick={() => dispatch(setMenuOpen(!menuOpen))}
                className={classes.openMenuBtn}
              >
                <MenuBtn />
              </IconButton>
            )}
          </Hidden>
          <Hidden smDown>
            <Tabs
              TabIndicatorProps={{ style: { backgroundColor: '#63a000' } }}
              className={classes.tabs}
              classes={{ fixed: classes.tabsFixed }}
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              variant="fullWidth"
            >
              {sections
                .filter((sect) => sect.tab)
                .map((sect) => {
                  return (
                    <Tab
                      ref={(elt) =>
                        sect.id === 'experience' && setXpTabNode(elt)}
                      key={sect.id}
                      onClick={(evt) => onItemClick(sect)}
                      value={sect.id}
                      label={(
                        <span className={classes.tabLabel}>
                          {sect.name}
                          {sect.id === 'experience' &&
                            (xpOpen ? (
                              <IoMdArrowDropup style={{ padding: 5 }} />
                            ) : (
                              <IoMdArrowDropdown style={{ padding: 5 }} />
                            ))}
                        </span>
                      )}
                      className={classes.tab}
                      onMouseEnter={(evt) => {
                        setValue(sect.id);
                        if (!isMdDown) {
                          if (sect.id !== 'experience') return;
                          dispatch(setXpOpen(true));
                        }
                      }}
                      onMouseLeave={(evt) => {
                        if (!isMdDown) {
                          const movingTo = evt.relatedTarget?.tagName;
                          if (movingTo === 'SPAN' || movingTo === 'UL') return;
                          dispatch(setXpOpen(false));
                        }
                      }}
                      aria-owns={xpOpen ? 'menu-list-grow' : undefined}
                      aria-haspopup="true"
                    />
                  );
                })}
            </Tabs>
            <ExperienceMenu
              tabs={sections.filter(
                (item) => item.nav === 'experience' && item.id !== 'experience',
              )}
              onItemClick={onItemClick}
              open={xpOpen}
              anchor={xpTabNode}
            />
          </Hidden>
        </AppBar>

        <Hidden mdUp>
          {menuOpen && (
            <IconButton
              className={classes.closeMenuBtn}
              onClick={() => {
                dispatch(setXpOpen(false));
                dispatch(setMenuOpen(false));
              }}
            >
              <Close />
            </IconButton>
          )}
          <SwipeableDrawer
            open={menuOpen}
            onClose={() => {
              dispatch(setXpOpen(false));
              dispatch(setMenuOpen(false));
            }}
            onOpen={() => dispatch(setMenuOpen(true))}
            anchor="right"
          >
            <div className={classes.portraitWrapper}>
              <Portrait size={isXsDown ? 100 : 150} />
            </div>
            <List className={classes.list}>
              {sections
                .filter((sect) => sect.tab)
                .map((sect, idx, arr) => {
                  return (
                    <ListItem
                      key={sect.id}
                      href={`#${sect.id}`}
                      value={sect.id}
                      title={sect.name}
                      active={(value === sect.id).toString()}
                      button={sect.id !== 'experience'}
                      divider={idx + 1 !== arr.length}
                      onClick={() => onItemClick(sect)}
                      style={{ padding: sect.id !== 'experience' ? 25 : 0 }}
                      className={classes.listItem}
                    >
                      {sect.id !== 'experience' ? (
                        sect.name
                      ) : (
                        <div key={sect.id} className={classes.dropdownListItem}>
                          <Button
                            key={sect.id}
                            title={sect.name}
                            className={classes.experienceButton}
                            onClick={() => onItemClick(sect)}
                          >
                            {sect.name}
                            <div className={classes.expandIcon}>
                              {xpOpen ? (
                                <FiMinus size={25} />
                              ) : (
                                <FiPlus size={25} />
                              )}
                            </div>
                          </Button>
                          <DropDown
                            items={sections.filter(
                              (sec) => sec.nav === 'experience' && !sec.tab,
                            )}
                            onItemClick={onItemClick}
                          />
                        </div>
                      )}
                    </ListItem>
                  );
                })}
            </List>
          </SwipeableDrawer>
        </Hidden>
      </div>
    </HideOnScroll>
  );
};

export default NavBar;
