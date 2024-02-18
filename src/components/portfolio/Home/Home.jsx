import React from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { Typography, IconButton, useTheme, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { FaLinkedinIn, FaGithubAlt, FaFilePdf } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';
import scrollIntoView from 'scroll-into-view';
import Portrait from '../Portrait/Portrait';
import cvPdf from '../../../assets/documents/MarshHunnDaniel_EuroCV.pdf';
import BackgroundMap from '../BackgroundMap/BackgroundMap';

const useStyles = makeStyles((theme) => ({
  '@keyframes fadeInHome': theme.animations.fadeIn(),
  homeWrapper: {
    position: 'relative',
    animation: '$fadeInHome 1000ms ease',
  },
  outerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    boxShadow:
      'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
  },
  homeContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexBasis: '10%',
    flexGrow: 9,
    padding: '20px 150px 20px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      padding: 20,
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-start',
      padding: 20,
    },
  },
  generalContainer: {
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },
  linksContainer: {
    [theme.breakpoints.down('md')]: {
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
    [theme.breakpoints.down('md')]: {
      margin: 8,
    },
  },
  contactBtn: {
    margin: 20,
    padding: 12,
    fontSize: 18,
    [theme.breakpoints.up('sm')]: {
      margin: '20px 0',
    },
    [theme.breakpoints.up('lg')]: {
      position: 'absolute',
      right: '5vw',
      top: '35%',
    },
  },
  exploreWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 0 85px',
    flexBasis: '10%',
    flexGrow: 1,
  },
  exploreBtn: {
    animation: '$pulseExplore 2s infinite',
    boxShadow: '0 0 0 0 rgba(99, 160, 0, .5)',
    backgroundColor: 'white',
    border: `4px solid ${theme.palette.primary.main}`,
    '&:hover': {
      backgroundColor: 'white',
      opacity: 1,
    },
  },
  hashAnchor: {
    position: 'absolute',
    top: -70,
  },
  '@keyframes pulseExplore': theme.animations.pulse(),
}));

function Home() {
  const classes = useStyles();
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('lg'));
  const isXsDown = useMediaQuery(theme.breakpoints.down('sm'));
  const section = useSelector((state) => state.portfolio.sections).find(
    (sect) => sect.id === 'home',
  );

  return (
    <div className={classes.homeWrapper} id={`${section.id}-container`}>
      <div className={classes.hashAnchor} id={section.id} />
      <BackgroundMap />
      <div className={classes.outerContainer}>
        <div className={classes.homeContainer}>
          <Portrait size={isMdDown ? 200 : 300} />
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
                size="large"
              >
                <FaLinkedinIn size={25} />
              </IconButton>
              <IconButton
                href="https://github.com/danji90"
                title="Github"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.iconBtn}
                size="large"
              >
                <FaGithubAlt size={25} />
              </IconButton>
              <IconButton
                href={cvPdf}
                download
                title="Download CV"
                className={classes.iconBtn}
                size="large"
              >
                <FaFilePdf size={25} />
              </IconButton>
              {isXsDown && (
                <IconButton
                  title="Write e-mail"
                  href="mailto:danji_ma90@hotmail.com"
                  className={classes.iconBtn}
                  size="large"
                >
                  <MdEmail size={25} />
                </IconButton>
              )}
            </div>
            {!isXsDown && (
              <Button
                title="Write e-mail"
                href="mailto:danji_ma90@hotmail.com"
                className={classes.contactBtn}
              >
                <MdEmail size={18} style={{ marginRight: 10 }} />
                <strong>Contact me</strong>
              </Button>
            )}
          </div>
        </div>
        <div className={classes.exploreWrapper}>
          <IconButton
            title="Explore"
            onClick={() =>
              scrollIntoView(document.getElementById('about'), {
                time: 1000,
                align: {
                  top: 0,
                },
              })
            }
            className={classes.exploreBtn}
            size="large"
          >
            <IoIosArrowDown size={50} color={theme.palette.primary.main} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Home;
