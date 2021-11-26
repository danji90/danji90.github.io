import React from 'react';
import ReactGitHubCalendar from 'react-github-calendar';
import ReactTooltip from 'react-tooltip';
import { makeStyles } from '@material-ui/core/styles';

import Container from '../Container/Container';

const useStyles = makeStyles((theme) => ({
  overflowWrapper: {
    width: 'inherit',
    overflowX: 'auto',
  },
  calendarWrapper: {
    [theme.breakpoints.down('xs')]: {
      width: 800,
    },
  },
}));

function GHCalendar() {
  const classes = useStyles();
  return (
    <Container title="My Github" id="github">
      <div className={classes.overflowWrapper}>
        <div className={classes.calendarWrapper}>
          <ReactGitHubCalendar username="danji90" color="hsl(94, 90%, 35%)">
            <ReactTooltip delayShow={50} html />
          </ReactGitHubCalendar>
        </div>
      </div>
    </Container>
  );
}

export default GHCalendar;
