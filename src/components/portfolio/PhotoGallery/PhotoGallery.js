import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import Container from '../Container/Container';

import bolzano from '../../../assets/images/bolzano.jpg';
import desierto from '../../../assets/images/desierto.jpg';
import freiburg1 from '../../../assets/images/freiburg1.jpeg';

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
  return (
    <Container title="Photos">
      <ImageGallery
        items={images}
        defaultImage={desierto}
        showBullets
        showIndex
        lazyLoad
        showPlayButton={false}
      />
    </Container>
  );
}

export default PhotoGallery;
