/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Typography, Link, List, ListItem, Divider } from '@material-ui/core';
import { MdTaskAlt } from 'react-icons/md';
import parseHtml from 'html-react-parser';
import { makeStyles } from '@material-ui/core/styles';

import Container from '../Container/Container';

const useStyles = makeStyles((theme) => ({
  entry: {
    margin: '30px 0',
  },
  title: {
    margin: '8px 0',
  },
  listItem: {
    display: 'flex',
    alignItems: 'start',
    padding: '5px 0 5px 20px',
    '& a': theme.styles?.link,
  },
  icon: {
    color: theme.palette.text.primary,
    paddingRight: 10,
    height: 20,
    minWidth: 20,
    marginTop: 4,
  },
}));

const Work = ({ section }) => {
  const work = useSelector((state) => state.workItems);
  const classes = useStyles();

  return (
    <Container title="Work" id={section.id}>
      {work.map((item, idx, arr) => {
        return (
          <React.Fragment key={item.id}>
            <div className={classes.entry}>
              <div className={classes.title}>
                <Typography color="textPrimary" variant="h3" display="inline">
                  {`${item.position} - `}
                </Typography>
                <Link
                  href={item.facility.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Typography variant="h4" display="inline">
                    {item.facility.name}
                  </Typography>
                </Link>
                <Typography display="inline">{` (${item.time})`}</Typography>
              </div>
              <Typography paragraph>{item.description}</Typography>
              {item.list && (
                <>
                  {item.list.header && (
                    <Typography>{item.list.header}</Typography>
                  )}
                  <List>
                    {item.list.items.map((listItem, i) => {
                      return (
                        <ListItem key={i} className={classes.listItem}>
                          <MdTaskAlt className={classes.icon} />
                          <Typography>{parseHtml(listItem)}</Typography>
                        </ListItem>
                      );
                    })}
                  </List>
                </>
              )}
            </div>
            {idx + 1 !== arr.length && <Divider />}
          </React.Fragment>
        );
      })}
    </Container>
  );
};

Work.propTypes = {
  section: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

Work.defaultProps = {
  section: {},
};

export default Work;
