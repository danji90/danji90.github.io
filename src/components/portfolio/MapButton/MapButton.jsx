import React, { forwardRef } from 'react';
import { IconButton } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  mapBtn: {
    width: 50,
    height: 50,
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    boxShadow: ' 0 1px 4px rgb(0 0 0 / 30%)',
    '&:hover': {
      backgroundColor: 'white',
    },
  },
}));

function MapButton({ children = null, className = '', ...props }, ref) {
  const classes = useStyles();
  return (
    <IconButton
      ref={ref}
      className={className}
      classes={{ root: classes.mapBtn }}
      {...props}
    >
      {children}
    </IconButton>
  );
}

MapButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default forwardRef(MapButton);
