import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  title: PropTypes.string,
  id: PropTypes.string,
  styles: PropTypes.object,
  // eslint-disable-next-line react/no-unused-prop-types
  fullWidthOnMobile: PropTypes.bool,
  className: PropTypes.string,
};

const defaultProps = {
  title: undefined,
  id: undefined,
  styles: undefined,
  fullWidthOnMobile: false,
  className: undefined,
};

const useStyles = makeStyles((theme) => ({
  container: (props) => ({
    backgroundColor: 'white',
    margin: '20px 0',
    padding: '10px 30px 20px',
    [theme.breakpoints.down('xs')]: {
      padding: props.fullWidthOnMobile ? '10px 0 20px' : '10px 30px 20px',
    },
  }),
  hashAnchor: {
    position: 'absolute',
    top: -70,
  },
}));

function Container(props) {
  const { children, title, id, styles, className } = props;
  const classes = useStyles(props);
  return (
    <div style={{ position: 'relative' }}>
      <div className={classes.hashAnchor} id={id} />
      <div className={`${classes.container} ${className}`} style={styles}>
        <Typography variant="h2">{title}</Typography>
        {children}
      </div>
    </div>
  );
}

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;
