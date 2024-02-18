import React from 'react';
import { Typography, Icon, Link } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { FaGithubAlt } from 'react-icons/fa';

const useStyles = makeStyles(() => ({
  footer: {
    backgroundColor: '#282c34',
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  footerText: {
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    padding: '10px 10px 15px',
  },
}));

function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Typography className={classes.footerText}>
        {`Designed by `}
        <Link
          className={classes.link}
          href="https://github.com/danji90"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon className={classes.icon}>
            <FaGithubAlt />
          </Icon>
          Daniel Marsh-Hunn
        </Link>
      </Typography>
    </footer>
  );
}

export default Footer;
