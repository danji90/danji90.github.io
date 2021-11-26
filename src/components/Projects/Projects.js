/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { FaExternalLinkAlt } from 'react-icons/fa';
import parseHtml from 'html-react-parser';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Link, Divider } from '@material-ui/core';

import Container from '../Container/Container';

const images = require.context('../../assets/images/', true);

const useStyles = makeStyles((theme) => ({
  projectImage: {
    width: '100%',
    '&:hover': {
      opacity: 0.8,
    },
  },
  project: {
    margin: '25px 0',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  projectColumnImage: {
    padding: '10px 20px 0 0',
    width: '30%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  projectColumnInfo: {
    width: '70%',
    [theme.breakpoints.down('sm')]: {
      margin: '10px 0',
      width: '100%',
    },
  },
  projectTools: {
    padding: '10px 0 10px',
  },
  moreLink: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
  },
}));

const propTypes = {
  section: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

const defaultProps = {
  section: {},
};

const renderLatestProject = (projectData, projectsCount, classes) => {
  return (
    <>
      <div key="latest" className={classes.latestProject}>
        <Link underline="none" href={projectData.weblink}>
          <Typography color="textPrimary" variant="h3" align="center">
            {projectData.name}
          </Typography>
        </Link>
        <Link href={projectData.facility.url}>
          <Typography variant="h4" align="center">
            {projectData.facility.name}
          </Typography>
        </Link>
        <br />
        <a href={projectData.webLink} target="_blank">
          <img
            className={classes.projectImage}
            src={images(`./${projectData.images[0].name}`)}
            alt="not found"
          />
        </a>
        {renderProject(projectData, null, projectsCount, classes)}
      </div>
    </>
  );
};

const renderProject = (projectData, index, projectsCount, classes) => {
  return (
    <div key={projectData.id}>
      <div className={classes.project}>
        <div className={classes.projectColumnImage}>
          {projectData.images
            .filter((image) => !image.latest)
            .map((image) => {
              const imageLink = images(`./${image.name}`);
              return (
                <a
                  key={image.name.split('.')}
                  href={projectData.webLink}
                  target="_blank"
                >
                  <img
                    src={imageLink}
                    alt="not found"
                    className={classes.projectImage}
                  />
                </a>
              );
            })}
        </div>
        <div className={classes.projectColumnInfo}>
          {projectData.latest ? null : (
            <>
              <Link underline="none" href={projectData.weblink}>
                <Typography color="textPrimary" variant="h3">
                  {projectData.name}
                </Typography>
              </Link>
              <Link href={projectData.facility.url}>
                <Typography variant="h4">
                  {projectData.facility.name}
                </Typography>
              </Link>
            </>
          )}
          <Typography>{parseHtml(projectData.description)}</Typography>
          <Typography className={classes.projectTools}>
            <strong>Tools used: </strong>
            {projectData.tools.map((tool, idx) => {
              return (
                <span key={tool.name}>
                  {tool.webLink ? (
                    <Link
                      key={tool.name}
                      href={tool.webLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {`${tool.name}`}
                    </Link>
                  ) : (
                    <span>{`${tool.name}`}</span>
                  )}
                  {`${idx + 1 === projectData.tools.length ? '' : ', '}`}
                </span>
              );
            })}
          </Typography>
          <Link
            href={projectData.webLink}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.moreLink}
          >
            <FaExternalLinkAlt style={{ marginRight: 5 }} />
            <Typography>Find out more</Typography>
          </Link>
        </div>
      </div>
      {index + 1 !== projectsCount && <Divider />}
    </div>
  );
};

function Projects(props) {
  const classes = useStyles();
  const projects = useSelector((state) => state.projects);
  const { section } = props;
  return (
    <Container title="Projects" id={section.id}>
      {renderLatestProject(
        projects.find((project) => project.latest),
        projects.length,
        classes,
      )}
      {projects
        .filter((project) => !project.latest)
        .map((project, index, array) =>
          renderProject(project, index, array.length, classes),
        )}
    </Container>
  );
}

Projects.propTypes = propTypes;
Projects.defaultProps = defaultProps;

export default Projects;
