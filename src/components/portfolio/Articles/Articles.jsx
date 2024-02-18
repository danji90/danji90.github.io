import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import DescriptionIcon from '@mui/icons-material/Description';
import { Link, Typography } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

import Container from '../Container/Container';

const useStyles = makeStyles(() => ({
  article: {
    display: 'grid',
    gridTemplateColumns: '15% 85%',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
}));

function Articles() {
  const classes = useStyles();
  const articles = useSelector((state) => state.portfolio.articles);
  const sorted = useMemo(() => articles.reverse(), [articles]);
  return (
    <Container title="Articles">
      {sorted.map((item) => {
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
}

export default Articles;
