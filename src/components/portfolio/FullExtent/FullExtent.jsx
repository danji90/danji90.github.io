import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import Cluster from 'ol/source/Cluster';
import { unByKey } from 'ol/Observable';

const useStyles = makeStyles(() => {
  return {
    fullExtenBtn: {
      position: 'absolute',
      top: 15,
      right: 5,
      zIndex: 1,
      backgroundColor: 'white',
      padding: 10,
      boxShadow: ' 0 1px 4px rgb(0 0 0 / 30%)',
      '&:hover': {
        backgroundColor: 'white',
      },
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
  const map = useSelector((state) => state.portfolio.map);
  const classes = useStyles();
  const [disabled] = useSetDisabled(featureSource);

  return (
    <IconButton
      title="Zoom on features"
      onClick={(evt) => {
        onClick(evt);
        map.getView().fit(featureSource.getExtent(), {
          padding: [50, 50, 50, 50],
          duration: 300,
        });
      }}
      disabled={disabled}
      classes={{ root: classes.fullExtenBtn }}
      size="large"
    >
      <ZoomInMapIcon />
    </IconButton>
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
