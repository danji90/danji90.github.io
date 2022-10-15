import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Checkbox,
  FormControlLabel as MuiFormControlLabel,
  Hidden,
  RadioGroup,
  Radio,
  Divider,
  IconButton,
  Paper,
  Fade,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Layers } from '@material-ui/icons';

import {
  setShowEducation,
  setShowWork,
  setShowResidence,
  setLayersOpen,
} from '../../../model/portfolio/actions';

const useStyles = makeStyles((theme) => {
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
  root: {
    display: 'block',
  },
})(MuiFormControlLabel);

let layerMenuTimout;

const LayerMenu = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const showResidence = useSelector((state) => state.portfolio.showResidence);
  const showEducation = useSelector((state) => state.portfolio.showEducation);
  const showWork = useSelector((state) => state.portfolio.showWork);
  const layersOpen = useSelector((state) => state.portfolio.layersOpen);
  const layerService = useSelector((state) => state.portfolio.layerService);
  const [disabled, setDisabled] = useState(true);
  const ref = useRef();
  const currentBaseLayer = layerService
    .getBaseLayers()
    .find((baselayer) => baselayer.visible);
  const [value, setValue] = useState(currentBaseLayer?.name);

  const handleChange = (event) => {
    const layer = layerService.getLayer(event.target.value);
    layer.setVisible(true);
    setValue(event.target.value);
  };

  const handleMenuOpen = useCallback(() => {
    dispatch(setLayersOpen(true));
  }, [dispatch]);

  const handleMenuClose = useCallback(() => {
    dispatch(setLayersOpen(false));
    setDisabled(true);
  }, [dispatch]);

  const clickAwayListener = useCallback(
    (evt) => {
      if (ref.current !== evt.target && !ref.current?.contains(evt.target)) {
        handleMenuClose();
      }
    },
    [ref, handleMenuClose],
  );

  useEffect(() => {
    clearTimeout(layerMenuTimout);
    if (layersOpen) {
      setTimeout(() => {
        setDisabled(false);
      }, 50);
      document.addEventListener('click', clickAwayListener);
    } else {
      setDisabled(true);
      document.removeEventListener('click', clickAwayListener);
    }
  }, [layersOpen, ref, clickAwayListener]);

  return (
    <div className={classes.layerMenuWrapper}>
      <IconButton
        onClick={handleMenuOpen}
        onMouseEnter={handleMenuOpen}
        classes={{ root: classes.layersButton }}
        style={{ backgroundColor: 'white' }}
      >
        <Layers />
      </IconButton>
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
                {layerService.getBaseLayers().map((baselayer) => {
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
                  onChange={() => dispatch(setShowEducation(!showEducation))}
                />
              }
              label="Education"
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={showWork}
                  onChange={() => dispatch(setShowWork(!showWork))}
                />
              }
              label="Work"
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={showResidence}
                  onChange={() => dispatch(setShowResidence(!showResidence))}
                />
              }
              label="Residence"
            />
          </div>
        </Paper>
      </Fade>
    </div>
  );
};

export default LayerMenu;
