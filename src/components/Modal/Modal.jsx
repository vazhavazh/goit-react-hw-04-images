import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Overlay, ModalContent, ModalImg } from './ModalStyled';

export const Modal = ({ onModalClose, largeImg }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        onModalClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onModalClose]);

  const closeModalBackdrop = e => {
    if (e.target === e.currentTarget) {
      onModalClose();
    }
  };

  return (
    <div>
      <Overlay onClick={closeModalBackdrop}>
        <ModalContent>
          <ModalImg src={largeImg} alt="large image" />
        </ModalContent>
      </Overlay>
    </div>
  );
};

Modal.propTypes = {
  largeImg: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired,
};
