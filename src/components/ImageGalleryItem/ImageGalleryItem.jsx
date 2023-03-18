import React from 'react';

import { useContext } from 'react';
import { ImagesContext } from '../App';

import PropTypes from 'prop-types';

import { ImageContainer, Image } from './ImageGalleryItemStyled';

export const ImageGalleryItem = ({ onClickImage, toggleModal }) => {
  const { images } = useContext(ImagesContext);

  const handle = e => {
    toggleModal();
    onClickImage(e.currentTarget.dataset.largeImage);
  };

  return (
    <>
      {images.map((image, index) => (
        <ImageContainer
          onClick={handle}
          data-large-image={image.largeImageURL}
          key={index}
        >
          <Image src={image.webformatURL} alt={image.name} key={image.id} />
        </ImageContainer>
      ))}
    </>
  );
};

ImageGalleryItem.propTypes = {
  onClickImage: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
