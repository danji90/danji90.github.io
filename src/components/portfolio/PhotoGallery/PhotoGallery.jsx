import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import ImageGallery from 'react-image-gallery';
import { useSelector } from 'react-redux';
import 'react-image-gallery/styles/css/image-gallery.css';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: 'white',
    margin: '20px 0',
    padding: '10px 30px 20px',
    boxShadow:
      'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
    [theme.breakpoints.down('sm')]: {
      padding: '10px 30px 20px',
    },
  },
}));

function PhotoGallery() {
  const classes = useStyles();
  const photos = useSelector((state) => state.portfolio.photos);

  return (
    // Using <Container /> component will break image gallery full screen mode
    <div className={classes.container}>
      <ImageGallery
        items={photos}
        defaultImage={photos[0].original}
        showBullets
        showIndex
        lazyLoad
        showPlayButton={false}
      />
    </div>
  );
}

export default PhotoGallery;
