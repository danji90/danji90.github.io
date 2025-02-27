import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Checkbox,
  ClickAwayListener,
  FormControlLabel as MuiFormControlLabel,
  Hidden,
  RadioGroup,
  Radio,
  Divider,
  IconButton,
  Paper,
  Fade,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import { Layers } from '@mui/icons-material';

import { MapContext } from '../LifeMap/MapContextProvider';

const useStyles = makeStyles(() => {
  return {
    layerMenuWrapper: {
      position: 'absolute',
      top: 15,
      left: 5,
      zIndex: 1,
    },
    layerMenu: {
      backgroundColor: 'white',
      padding: 5,
      borderRadius: 'inherit',
    },
    layersButton: {
      backgroundColor: 'white',
      boxShadow: ' 0 1px 4px rgb(0 0 0 / 30%)',
      padding: 12,
    },
    disabled: { pointerEvents: 'none', opacity: '0.4' },
    paper: {
      position: 'absolute',
      top: 0,
      width: 'max-content',
    },
  };
});

const FormControlLabel = withStyles({
  root: { display: 'block' },
})(MuiFormControlLabel);

let layerMenuTimout;

function LayerMenu() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {
    baselayers,
    showResidence,
    showEducation,
    showWork,
    layersOpen,
    setShowEducation,
    setShowResidence,
    setShowWork,
    setLayersOpen,
  } = useContext(MapContext);
  const [disabled, setDisabled] = useState(true);
  const ref = useRef();
  const currentBaseLayer = baselayers.find((baselayer) => baselayer.visible);
  const [value, setValue] = useState(currentBaseLayer?.name);

  const handleChange = (event) => {
    const layer = baselayers.find((l) => event.target.value === l.name);
    baselayers.forEach((l) => {
      // eslint-disable-next-line no-param-reassign
      l.visible = l.name === layer.name;
    });
    setValue(layer.name);
  };

  const handleMenuOpen = () => {
    setLayersOpen(true);
    setDisabled(false);
  };

  const handleMenuClose = () => {
    setLayersOpen(false);
    setDisabled(true);
  };

  return (
    <div className={classes.layerMenuWrapper}>
      <IconButton
        onClick={handleMenuOpen}
        onMouseEnter={handleMenuOpen}
        classes={{ root: classes.layersButton }}
        style={{ backgroundColor: 'white' }}
        size="large"
      >
        <Layers />
      </IconButton>
      <ClickAwayListener
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart"
        onClickAway={() => {
          if (layersOpen) {
            handleMenuClose();
          }
        }}
      >
        <Fade in={layersOpen}>
          <Paper elevation={3} classes={{ root: classes.paper }} ref={ref}>
            <div
              className={`${classes.layerMenu} ${
                disabled ? classes.disabled : ''
              }`}
              onMouseLeave={handleMenuClose}
            >
              <Hidden mdUp>
                <RadioGroup value={value} onChange={handleChange}>
                  {baselayers.map((baselayer) => {
                    return (
                      <MuiFormControlLabel
                        value={baselayer.name}
                        control={<Radio color="primary" />}
                        label={baselayer.name}
                        key={baselayer.key}
                      />
                    );
                  })}
                </RadioGroup>
                <Divider />
              </Hidden>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={showEducation}
                    onChange={() => setShowEducation(!showEducation)}
                  />
                }
                label="Education"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={showWork}
                    onChange={() => setShowWork(!showWork)}
                  />
                }
                label="Work"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={showResidence}
                    onChange={() => setShowResidence(!showResidence)}
                  />
                }
                label="Residence"
              />
            </div>
          </Paper>
        </Fade>
      </ClickAwayListener>
    </div>
  );
}

export default LayerMenu;
