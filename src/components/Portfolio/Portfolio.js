import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../Navbar/Navbar';
import Home from '../Home/Home';
import AboutMe from '../AboutMe/AboutMe';
import BasicInfo from '../BasicInfo/BasicInfo';
import Education from '../Education/Education';
import LifeMap from '../LifeMap/LifeMap';
import Projects from '../Projects/Projects';
import Work from '../Work/Work';
import GHCalendar from '../GHCalendar/GHCalendar';
import Skills from '../Skills/Skills';
import Languages from '../Languages/Languages';
import Articles from '../Articles/Articles';
import Footer from '../Footer/Footer';
import PhotoGallery from '../PhotoGallery/PhotoGallery';
import Credits from '../Credits/Credits';

const useStyles = makeStyles((theme) => {
  return {
    app: {
      backgroundColor: '#e7e5da',
      display: 'flex',
      margin: 'auto',
      justifyContent: 'center',
    },
    appContent: {
      width: '60vw',
      maxWidth: 960,
      [theme.breakpoints.up('lg')]: {
        maxWidth: 1360,
      },
      [theme.breakpoints.down('lg')]: {
        width: '75vw',
      },
      [theme.breakpoints.down('sm')]: {
        width: '90vw',
      },
    },
    columns: {
      [theme.breakpoints.up('md')]: {
        display: 'flex',
        justifyContent: 'center',
        columnCount: 3,
        columnGap: '3%',
        width: '100%',
        zIndex: 0,
      },
    },
    primaryColumn: {
      [theme.breakpoints.up('md')]: {
        width: '70%',
      },
    },
    secondaryColumn: {
      [theme.breakpoints.up('md')]: {
        width: '30%',
        minWidth: 300,
      },
    },
    fullWidth: {
      flexGrow: 1,
    },
  };
});

const Portfolio = () => {
  const classes = useStyles();
  const { sections } = useSelector((state) => state);
  return (
    <>
      <Navbar />
      <div>
        <Home section={sections.find((section) => section.id === 'home')} />
        <div className={classes.app}>
          <div className={classes.appContent}>
            <div className={classes.columns}>
              <div className={classes.primaryColumn}>
                <AboutMe
                  section={sections.find((section) => section.id === 'about')}
                />
                <PhotoGallery />
              </div>
              <div className={classes.secondaryColumn}>
                <BasicInfo />
                <Languages />
              </div>
            </div>
            <div className={classes.fullWidth}>
              <LifeMap
                section={sections.find((section) => section.id === 'lifeMap')}
              />
            </div>
            <div className={classes.columns}>
              <div className={classes.primaryColumn}>
                <Projects
                  section={sections.find(
                    (section) => section.id === 'projects',
                  )}
                />
                <Work
                  section={sections.find((section) => section.id === 'work')}
                />
                <GHCalendar />
              </div>
              <div className={classes.secondaryColumn}>
                <Education
                  section={sections.find(
                    (section) => section.id === 'education',
                  )}
                />
                <Skills />
                <Articles />
                <Credits />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Portfolio;
