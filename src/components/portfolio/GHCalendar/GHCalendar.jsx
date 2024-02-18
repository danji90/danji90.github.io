import React from 'react';
import ReactGitHubCalendar from 'react-github-calendar';
import ReactTooltip from 'react-tooltip';
import makeStyles from '@mui/styles/makeStyles';

import Container from '../Container/Container';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    height: 250,
  },
  overflowWrapper: {
    width: 'inherit',
    overflowX: 'auto',
    margin: '10px 0',
    [theme.breakpoints.down('lg')]: {
      display: 'flex',
      flexDirection: 'row-reverse',
      overflowX: 'auto',
      overflowY: 'hidden',
      height: 150,
    },
    ...theme.styles.scrollBarThin,
  },
  calendarWrapper: {
    paddingTop: 15,
    [theme.breakpoints.down('lg')]: {
      minWidth: 800,
    },
    '& .react-activity-calendar': {
      '& footer': {
        position: 'absolute',
        left: 30,
        top: 205,
        width: 'calc(100% - 60px)',
        display: 'flex',
        justifyContent: 'space-between',
      },
    },
  },
}));

function GHCalendar() {
  const classes = useStyles();
  return (
    <Container title="My Github" id="github" className={classes.container}>
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
