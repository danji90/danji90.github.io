import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import Cluster from 'ol/source/Cluster';
import { unByKey } from 'ol/Observable';
import { MapContext } from '../MapContextProvider/MapContextProvider';
import MapButton from '../MapButton';

const useStyles = makeStyles(() => {
  return {
    fullExtenBtn: {
      position: 'absolute',
      top: 75,
      right: 5,
      zIndex: 1,
    },
  };
});

const useSetDisabled = (featureSource) => {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const onSourceChange = () =>
      setDisabled(featureSource?.getFeatures().length === 0);
    unByKey(onSourceChange);
    if (featureSource) {
      featureSource.on('change', onSourceChange);
    }
    return () => unByKey(onSourceChange);
  }, [featureSource]);
  return [disabled, setDisabled];
};

function FullExtent({ featureSource, onClick }) {
  const { map } = useContext(MapContext);
  const classes = useStyles();
  const [disabled] = useSetDisabled(featureSource);

  return (
    <MapButton
      title="Zoom on features"
      className={classes.fullExtenBtn}
      onClick={(evt) => {
        onClick(evt);
        map.getView().fit(featureSource.getExtent(), {
          padding: [50, 50, 50, 50],
          duration: 300,
        });
      }}
      disabled={disabled}
      size="large"
    >
      <ZoomInMapIcon />
    </MapButton>
  );
}

FullExtent.propTypes = {
  featureSource: PropTypes.instanceOf(Cluster),
  onClick: PropTypes.func,
};

FullExtent.defaultProps = {
  featureSource: null,
  onClick: () => {},
};

export default FullExtent;
