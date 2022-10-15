import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Typography,
  LinearProgress,
  makeStyles,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Container from '../Container/Container';

const useStyles = makeStyles(() => ({
  accordion: {
    position: 'relative',
    border: 0,
    boxShadow: 'none',
    '&::before': {
      height: 0,
    },
  },
  accordionSummary: {
    padding: 0,
  },
  expandIcon: {
    position: 'absolute',
    right: 0,
    top: 6,
  },
  skillWrapper: {
    width: '100%',
  },
  skillbar: {
    height: 10,
  },
}));

function Skills() {
  const classes = useStyles();
  const skills = useSelector((state) => state.portfolio.skills);

  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Container title="Skills" id="skills">
      <Typography>
        During my academic and professional career I acquired a variety of
        technical skills. My BSc taught me the basics of models, simulations and
        got me started in GIS, Remote Sensing, database design and SQL. My
        database skills were furthered in my subsequent job at EURAC research,
        where I also started programming in Python and javaScript and working on
        Linux. Finally, I consolidated these skills during my MSc and acquired
        several others, including R, NoSQL, HTML and CSS. At geOps - Spatial Web
        I gained good practical expreience using an array of mostly frontend web
        technologies, achieving senior developer status. My skills and the
        corresponding skill levels are listed below:
      </Typography>
      {skills.map((item) => {
        return (
          <Accordion
            square
            key={item.id}
            expanded={expanded === item.id}
            onChange={handleChange(item.id)}
            classes={{
              root: classes.accordion,
            }}
          >
            <AccordionSummary
              aria-controls={`${item.id}-content`}
              id={`${item.id}-header`}
              classes={{
                root: classes.accordionSummary,
                expandIcon: classes.expandIcon,
              }}
              expandIcon={<ExpandMoreIcon />}
            >
              <div className={classes.skillWrapper} key={item.id}>
                <Typography color="textPrimary" variant="h3">
                  {item.name}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={item.progress}
                  classes={{
                    root: classes.skillbar,
                  }}
                />
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item.description}</Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Container>
  );
}

export default Skills;
