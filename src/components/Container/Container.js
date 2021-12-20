/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function elementInViewport2(el) {
  let top = el.offsetTop;
  let left = el.offsetLeft;
  const width = el.offsetWidth;
  const height = el.offsetHeight;

  while (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top < window.pageYOffset + window.innerHeight &&
    left < window.pageXOffset + window.innerWidth &&
    top + height > window.pageYOffset &&
    left + width > window.pageXOffset
  );
}

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
  containerWrapper: {
    position: 'relative',
    opacity: 0,
    transform: 'scale(0)',
    transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
    willChange: 'opacity',
  },
  container: (props) => ({
    backgroundColor: 'white',
    margin: '20px 0',
    padding: '10px 30px 20px',
    boxShadow:
      'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
    [theme.breakpoints.down('xs')]: {
      padding: props.fullWidthOnMobile ? '10px 0 20px' : '10px 30px 20px',
    },
  }),
  visible: {
    opacity: 1,
    transform: 'scale(1)',
  },
  hashAnchor: {
    position: 'absolute',
    top: -70,
  },
}));

function Container(props) {
  const { children, title, id, styles, className } = props;
  const [isVisible, setVisible] = useState(false);
  const classes = useStyles(props);
  const domRef = useRef();
  const handleScroll = useCallback(() => {
    if (domRef.current && elementInViewport2(domRef.current)) {
      setVisible(true);
    }
  }, [setVisible, domRef]);

  useEffect(() => {
    handleScroll();
    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isVisible) {
      document.removeEventListener('scroll', handleScroll);
    }
  }, [isVisible]);

  return (
    <div
      className={`${classes.containerWrapper} ${
        isVisible ? classes.visible : ''
      }`}
      ref={domRef}
    >
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
