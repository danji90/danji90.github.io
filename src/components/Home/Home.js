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

const useStyles = makeStyles((theme) => ({
  homeContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 40,
    minHeight: 400,
    padding: '20px 150px 20px',
    backgroundColor: 'white',
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
}));

function Home(props) {
  const classes = useStyles();
  const section = useSelector((state) => state.sections).find(
    (sect) => sect.id === 'home',
  );

  return (
    <div className={classes.homeContainer} id={section.id}>
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
  );
}

export default Home;
