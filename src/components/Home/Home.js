import React from 'react';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Typography, IconButton, useTheme, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  FaLinkedinIn,
  FaGithubAlt,
  FaFilePdf,
  FaPaperPlane,
} from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import scrollIntoView from 'scroll-into-view';
import Portrait from '../Portrait/Portrait';
import cvPdf from '../../assets/documents/MarshHunnDaniel_EuroCV.pdf';
import BackgroundMap from '../BackgroundMap/BackgroundMap';


const useStyles = makeStyles((theme) => ({
  '@keyframes fadeInHome': theme.animations.fadeIn(),
  homeWrapper: {
    animation: '$fadeInHome 1000ms ease',
  },
  homeContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    marginTop: 40,
    height: 'calc(100vh - 70px)',
    padding: '20px 150px 20px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    boxShadow:
      'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      marginTop: 50,
      flexDirection: 'column',
      padding: 20,
    },
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-start',
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
      top: '53%',
    },
    [theme.breakpoints.up('lg')]: {
      position: 'absolute',
      right: '10vw',
      top: 'unset',
    },
  },
  exploreBtn: {
    position: 'absolute',
    bottom: 50,
    left: '50%',
    animation: '$pulseExplore 2s infinite',
    boxShadow: '0 0 0 0 rgba(99, 160, 0, .5)',
  },
  hashAnchor: {
    position: 'absolute',
    top: -70,
  },
  '@keyframes pulseExplore': theme.animations.pulse('translateX(-50%)'),
}));

function Home() {
  const classes = useStyles();
  const theme = useTheme();
  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'));
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
            {isXsDown && (
              <IconButton
                title="Write e-mail"
                href="mailto:danji_ma90@hotmail.com"
                className={classes.iconBtn}
              >
                <FaPaperPlane size={25} />
              </IconButton>
            )}
          </div>
        </div>
        {!isXsDown && (
          <Button
            title="Write e-mail"
            href="mailto:danji_ma90@hotmail.com"
            className={classes.contactBtn}
          >
            <FaPaperPlane size={18} style={{ marginRight: 10 }} />
            <strong>Contact me</strong>
          </Button>
        )}
        <IconButton
          title="Explore"
          onClick={() =>  scrollIntoView(
            document.getElementById('about'),
            {
              time: 1000,
              align: {
                top: 0,
              },
            }
          )}
          className={`${classes.exploreBtn} ${classes.iconBtn}`}
        >
          <IoIosArrowDown size={50} />
        </IconButton>
      </div>
    </div>
  );
}

export default Home;
