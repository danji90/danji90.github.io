import React from 'react';
import { FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { Typography, List, ListItem, Link } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import Container from '../Container/Container';

const useStyles = makeStyles((theme) => ({
  listItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 0px',
  },
  icon: {
    color: theme.palette.text.primary,
    paddingRight: 10,
    height: 15,
    minWidth: 15,
  },
  multiLine: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

function BasicInfo() {
  const classes = useStyles();
  return (
    <Container title="Contact">
      <div className="basic-info-content">
        <List>
          {/* <ListItem
            key="date.of.birth"
            title="Date of birth"
            className={classes.listItem}
          >
            <FaBirthdayCake className={classes.icon} />
            <Typography variant="body2">13.09.1990</Typography>
          </ListItem> */}
          {/* <ListItem
            key="address"
            title="Address"
            className={classes.listItem}
            style={{ alignItems: 'unset' }}
          >
            <FaHome className={classes.icon} style={{ marginTop: 5 }} />
            <div className={classes.multiLine}>
              <Typography variant="body2">Merzhauser 10</Typography>
              <Typography variant="body2">
                79100 Freiburg im Breisgau
                {' '}
              </Typography>
              <Typography variant="body2">Germany</Typography>
            </div>
          </ListItem> */}
          <ListItem key="phone" title="Phone" className={classes.listItem}>
            <FaPhone className={classes.icon} style={{ marginTop: -18 }} />
            <div className={classes.multiLine}>
              <Typography variant="body2">+49 163 664 3351</Typography>
              <Typography variant="body2">+39 320 010 3173</Typography>
            </div>
          </ListItem>
          <ListItem key="mail" title="e-mail" className={classes.listItem}>
            <MdEmail className={classes.icon} />
            <Link href="mailto:danji_ma90@hotmail.com">
              danji_ma90@hotmail.com
            </Link>
          </ListItem>
        </List>
      </div>
    </Container>
  );
}

export default BasicInfo;
