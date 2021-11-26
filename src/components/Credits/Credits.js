import React from 'react';
import { useSelector } from 'react-redux';
import { Link, List, ListItem, makeStyles } from '@material-ui/core';
import { FaExternalLinkAlt } from 'react-icons/fa';
import Container from '../Container/Container';

const useStyles = makeStyles(() => {
  return {
    link: {
      display: 'flex',
      alignItems: 'center',
    },
  };
});

function Credits() {
  const classes = useStyles();
  const credits = useSelector((state) => state.credits);
  return (
    <Container title="Credits">
      <List />
      {credits.map((credit) => (
        <ListItem key={credit.name}>
          <Link
            href={credit.url}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.link}
          >
            <FaExternalLinkAlt style={{ marginRight: 5 }} />
            {credit.name}
          </Link>
        </ListItem>
      ))}
    </Container>
  );
}

export default Credits;
