import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { GiExpand } from 'react-icons/gi';
import Cluster from 'ol/source/Cluster';
import { unByKey } from 'ol/Observable';

const useStyles = makeStyles((theme) => {
  return {
    fullExtenBtn: {
      position: 'absolute',
      top: 15,
      right: 5,
      zIndex: 1,
      backgroundColor: 'white',
      boxShadow: ' 0 1px 4px rgb(0 0 0 / 30%)',
      '&:hover': {
        backgroundColor: 'white',
      },
    },
  };
});

function FullExtent({ featureSource, onClick }) {
  const map = useSelector((state) => state.portfolio.map);
  const [disabled, setDisabled] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const onSourceChange = () =>
      setDisabled(featureSource?.getFeatures().length === 0);
    unByKey(onSourceChange);
    if (featureSource) {
      featureSource.on('change', onSourceChange);
    }
    return () => unByKey(onSourceChange);
  }, [featureSource]);

  return (
    <IconButton
      title="Full extent"
      onClick={(evt) => {
        onClick(evt);
        map.getView().fit(featureSource.getExtent(), {
          padding: [50, 50, 50, 50],
          duration: 300,
        });
      }}
      disabled={disabled}
      classes={{ root: classes.fullExtenBtn }}
    >
      <GiExpand />
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
