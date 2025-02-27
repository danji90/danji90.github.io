import React from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';
import Navbar from '../components/portfolio/Navbar/Navbar';
import Home from '../components/portfolio/Home/Home';
import AboutMe from '../components/portfolio/AboutMe/AboutMe';
import BasicInfo from '../components/portfolio/BasicInfo/BasicInfo';
import Education from '../components/portfolio/Education/Education';
import LifeMap from '../components/portfolio/LifeMap/LifeMap';
import Projects from '../components/portfolio/Projects/Projects';
import Work from '../components/portfolio/Work/Work';
import GHCalendar from '../components/portfolio/GHCalendar/GHCalendar';
import Skills from '../components/portfolio/Skills/Skills';
import Languages from '../components/portfolio/Languages/Languages';
import Articles from '../components/portfolio/Articles/Articles';
import Footer from '../components/portfolio/Footer/Footer';
import PhotoGallery from '../components/portfolio/PhotoGallery/PhotoGallery';
import Credits from '../components/portfolio/Credits/Credits';
import MapContextProvider from '../components/MapContextProvider/MapContextProvider';

const useStyles = makeStyles((theme) => {
  return {
    appWrapper: {
      position: 'relative',
    },
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
      [theme.breakpoints.down('xl')]: {
        width: '75vw',
      },
      [theme.breakpoints.down('md')]: {
        width: '90vw',
      },
    },
    columns: {
      [theme.breakpoints.up('md')]: {
        display: 'flex',
        justifyContent: 'center',
        columnCount: 3,
        columnGap: 20,
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

function Portfolio() {
  const classes = useStyles();
  const { sections } = useSelector((state) => state.portfolio);

  return (
    <>
      <Home section={sections.find((section) => section.id === 'home')} />
      <div className={classes.appWrapper}>
        <Navbar />
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
              <MapContextProvider>
                <LifeMap
                  section={sections.find((section) => section.id === 'lifeMap')}
                />
              </MapContextProvider>
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
}

export default Portfolio;
