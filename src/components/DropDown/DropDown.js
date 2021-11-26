import React from 'react';
import { useSelector } from 'react-redux';
import { List, ListItem, Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  list: {
    padding: 0,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
  onItemClick: PropTypes.func,
};

const defaultProps = {
  items: [],
  onItemClick: () => {},
};

function DropDown({ items, onItemClick }) {
  const classes = useStyles();
  const xpOpen = useSelector((state) => state.xpOpen);

  return (
    <Collapse in={xpOpen} timeout="auto" unmountOnExit>
      <List className={classes.list}>
        {items.map((item) => {
          return (
            <ListItem
              key={item.id}
              href={`#${item.id}`}
              value={item.id}
              title={item.name}
              button
              onClick={(evt) => {
                evt.stopPropagation();
                return onItemClick(item);
              }}
              className={classes.listItem}
            >
              {item.name}
            </ListItem>
          );
        })}
      </List>
    </Collapse>
  );
}

DropDown.propTypes = propTypes;
DropDown.defaultProps = defaultProps;

export default DropDown;
