import React from 'react';
import { makeStyles } from '@material-ui/core';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import bolzano from '../../../assets/images/bolzano.jpg';
import desierto from '../../../assets/images/desierto.jpg';
import freiburg1 from '../../../assets/images/freiburg1.jpeg';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: 'white',
    margin: '20px 0',
    padding: '10px 30px 20px',
    boxShadow:
      'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
    [theme.breakpoints.down('xs')]: {
      padding: '10px 30px 20px',
    },
  },
}));

const images = [
  {
    original: bolzano,
    thumbnail: bolzano,
    description: 'Bolzano - Bozen',
  },
  {
    original: desierto,
    thumbnail: desierto,
    description: 'Desierto de las Palmas, Castellón',
  },
  {
    original: freiburg1,
    thumbnail: freiburg1,
    description: 'Freiburg im Breisgau',
  },
];

function PhotoGallery() {
  const classes = useStyles();

  return (
    // Using <Container /> component will break image gallery fullScreen mode
    <div className={classes.container}>
      <ImageGallery
        items={images}
        defaultImage={desierto}
        showBullets
        showIndex
        lazyLoad
        showPlayButton={false}
      />
    </div>
  );
}

export default PhotoGallery;
