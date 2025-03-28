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

function FullExtent({ featureSource }) {
  const { map, setSelectedFeature } = useContext(MapContext);
  const [disabled] = useSetDisabled(featureSource);

  return (
    <MapButton
      title="Zoom on features"
      onClick={(evt) => {
        map.getView().fit(featureSource.getExtent(), {
          padding: [50, 50, 50, 50],
          duration: 300,
          callback: () => setSelectedFeature(null),
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
};

FullExtent.defaultProps = {
  featureSource: null,
};

export default FullExtent;
