import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
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
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { Menu as MenuBtn, Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import scrollIntoView from 'scroll-into-view';
import { setMenuOpen, setXpOpen } from '../../model/actions';

import Portrait from '../Portrait/Portrait';
import DropDown from '../DropDown/DropDown';

const useStyles = makeStyles((theme) => ({
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
    padding: 0,
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
    height: 20,
    left: 6,
    top: 25,
    color: 'white',
    zIndex: 1400,
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
    margin: 'auto',
  },
}));

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

let scrollTimeout;
let hashTimeout;

const scrollToSection = (sectionId) => {
  const targetElement = document.getElementById(sectionId);
  scrollIntoView(targetElement, {
    time: 1000,
    align: {
      top: 0,
    },
  });
};

const NavBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [value, setValue] = useState('home');
  const [hash, setHash] = useState();
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
        setHash(section.id);
      }
    },
    [dispatch, xpOpen],
  );
  const scrollListener = useCallback(() => {
    clearTimeout(scrollTimeout);
    clearTimeout(hashTimeout);
    scrollTimeout = setTimeout(() => {
      window.location.hash = hash;
      document.removeEventListener('scroll', scrollListener);
    }, 100);
  }, [hash]);

  useEffect(() => {
    scrollToSection(window.location.hash?.split('#')[1]);
    setHash(window.location.hash?.split('#')[1]);
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', scrollListener);
    // In case hash should be changed but no scrolling is triggered
    clearTimeout(hashTimeout);
    hashTimeout = setTimeout(() => {
      window.location.hash = hash;
    }, 100);
    scrollToSection(hash);
  }, [hash, scrollListener]);

  return (
    <>
      <AppBar className={classes.appBar} color="transparent">
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
                    ref={(elt) => sect.id === 'experience' && setXpTabNode(elt)}
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
                      if (!isTablet) {
                        if (sect.id !== 'experience') return;
                        dispatch(setXpOpen(true));
                      }
                    }}
                    onMouseLeave={(evt) => {
                      if (!isTablet) {
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
            <Portrait size={150} />
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
                          style={{
                            width: '100%',
                            height: 72,
                            fontSize: 18,
                            backgroundColor: 'white',
                            color: '#565656',
                          }}
                          onClick={() => onItemClick(sect)}
                        >
                          {sect.name}
                          {xpOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
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
    </>
  );
};

export default NavBar;
