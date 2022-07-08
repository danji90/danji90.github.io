import React from 'react';
import { useSelector } from 'react-redux';
import DescriptionIcon from '@material-ui/icons/Description';
import { Link, Typography, makeStyles } from '@material-ui/core';

import Container from '../Container/Container';

const useStyles = makeStyles((theme) => ({
  article: {
    display: 'grid',
    gridTemplateColumns: '15% 85%',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
}));

const Articles = () => {
  const classes = useStyles();
  const articles = useSelector((state) => state.articles);
  return (
    <Container title="Articles">
      {articles.reverse().map((item) => {
        return (
          <div className={classes.article} key={item.id}>
            <DescriptionIcon className={classes.icon} />
            <Typography>
              {item.published ? (
                <Link href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.name}
                </Link>
              ) : (
                <Link href={item.url} download>
                  {item.name}
                  {` (unpublished)`}
                </Link>
              )}
            </Typography>
          </div>
        );
      })}
    </Container>
  );
};

export default Articles;
