import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import { useInView } from 'react-intersection-observer';

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
  wrapper: {
    position: 'relative',
  },
  content: {
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
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const classes = useStyles(props);
  const { ref, inView } = useInView({
    threshold: isTablet ? 0 : 0.1,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className={classes.wrapper}>
      <div className={classes.hashAnchor} id={id} />
      <div className={`${classes.content} ${inView ? classes.visible : ''}`}>
        <div className={`${classes.container} ${className}`} style={styles}>
          <Typography variant="h2">{title}</Typography>
          {children}
        </div>
      </div>
    </div>
  );
}

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;
