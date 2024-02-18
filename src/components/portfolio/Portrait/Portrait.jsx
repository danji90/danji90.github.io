import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
// import portrait from '../../../assets/images/daniel1.jpg';
import portrait2 from '../../../assets/images/daniel3.jpeg';

const useStyles = makeStyles((theme) => ({
  portraitContainer: {
    margin: 10,
    border: '4px solid #565656',
    borderRadius: '50%',
    overflow: 'hidden',
    width: (props) => props.size,
    height: (props) => props.size,
    [theme.breakpoints.up('md')]: {
      maxWidth: 250,
      maxHeight: 250,
      marginRight: 20,
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: 300,
      maxHeight: 300,
      marginRight: 30,
    },
  },
  portraitImg: {
    width: '100%',
    height: '100%',
  },
}));

function Portrait({ size }) {
  const classes = useStyles({ size });
  return (
    <div className={classes.portraitContainer}>
      <img src={portrait2} alt="error" className={classes.portraitImg} />
    </div>
  );
}

Portrait.defaultProps = {
  size: 200,
};

Portrait.propTypes = {
  size: PropTypes.number,
};

export default Portrait;
