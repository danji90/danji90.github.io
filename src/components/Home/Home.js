import React from 'react';
import { useSelector } from 'react-redux';
// import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  FaLinkedinIn,
  FaGithubAlt,
  FaFilePdf,
  FaPaperPlane,
} from 'react-icons/fa';
import Portrait from '../Portrait/Portrait';
import cvPdf from '../../assets/documents/MarshHunnDaniel_EuroCV.pdf';
import BackgroundMap from '../BackgroundMap/BackgroundMap';

const HOME_HEIGHT = 400;
const useStyles = makeStyles((theme) => ({
  '@keyframes fadeInHome': theme.animations.fadeIn(),
  homeWrapper: {
    position: 'relative',
    animation: '$fadeInHome 1000ms ease',
  },
  homeContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 40,
    minHeight: HOME_HEIGHT,
    padding: '20px 150px 20px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    boxShadow:
      'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
    [theme.breakpoints.down('xs')]: {
      padding: 20,
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      marginTop: 50,
      flexDirection: 'column',
      padding: 20,
    },
  },
  generalContainer: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  linksContainer: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  iconBtn: {
    margin: '0 10px 0 0',
    color: 'white',
    backgroundColor: '#63a000',
    transition: 'opacity 300ms',
    '&:hover': {
      backgroundColor: '#63a000',
      opacity: 0.8,
    },
    [theme.breakpoints.down('sm')]: {
      margin: 8,
    },
  },
  contactBtn: {
    margin: 20,
    padding: 12,
    fontSize: 18,
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      right: 'calc(50% - 350px)',
      top: 268,
    },
    [theme.breakpoints.up('lg')]: {
      position: 'absolute',
      right: '10vw',
      top: 'unset',
    },
  },
  hashAnchor: {
    position: 'absolute',
    top: -70,
  },
}));

function Home() {
  const classes = useStyles();
  const section = useSelector((state) => state.sections).find(
    (sect) => sect.id === 'home',
  );

  return (
    <div className={classes.homeWrapper}>
      <div className={classes.hashAnchor} id={section.id} />
      <BackgroundMap />
      <div className={classes.homeContainer}>
        <Portrait />
        <div className={classes.generalContainer}>
          <Typography variant="h1">Daniel Marsh-Hunn</Typography>
          <Typography variant="h2">
            GI Researcher & Spatial Web Developer
          </Typography>
          <div className={classes.linksContainer}>
            <IconButton
              href="https://www.linkedin.com/in/daniel-marsh-hunn-44097959/"
              title="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.iconBtn}
            >
              <FaLinkedinIn size={25} />
            </IconButton>
            <IconButton
              href="https://github.com/danji90"
              title="Github"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.iconBtn}
            >
              <FaGithubAlt size={25} />
            </IconButton>
            <IconButton
              href={cvPdf}
              download
              title="Download CV"
              className={classes.iconBtn}
            >
              <FaFilePdf size={25} />
            </IconButton>
          </div>
        </div>
        <Button
          title="Write e-mail"
          href="mailto:danji_ma90@hotmail.com"
          className={classes.contactBtn}
        >
          <FaPaperPlane size={18} style={{ marginRight: 10 }} />
          <strong>Contact me</strong>
        </Button>
      </div>
    </div>
  );
}

export default Home;
