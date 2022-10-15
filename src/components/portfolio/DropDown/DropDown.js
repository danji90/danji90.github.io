import React from 'react';
import { useSelector } from 'react-redux';
import { List, ListItem, Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  dropdownListItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
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
  const xpOpen = useSelector((state) => state.portfolio.xpOpen);

  return (
    <Collapse in={xpOpen} timeout="auto" unmountOnExit>
      <List>
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
              className={classes.dropdownListItem}
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
