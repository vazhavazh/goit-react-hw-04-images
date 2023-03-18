import PropTypes from 'prop-types';

import { Gallery } from './ImageGalleryStyled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ toggleModal, onClickImage }) => {
  return (
    <Gallery>
      <ImageGalleryItem onClickImage={onClickImage} toggleModal={toggleModal} />
    </Gallery>
  );
};

ImageGallery.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  onClickImage: PropTypes.func.isRequired,
};
