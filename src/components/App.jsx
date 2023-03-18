import { useState, useEffect, createContext } from 'react';

import { ProgressBar } from 'react-loader-spinner';
import { GetImages } from '../api/GetImages';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './SearchBar/SearchBar';
import { Modal } from './Modal/Modal';
import { ButtonLoadMore } from './ButtonLoadMore/ButtonLoadMore';

import { Span, MainContainer, Preloader } from './AppStyled';

export const ImagesContext = createContext();



export const App = () => {
  const [images, setImages] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('idle');
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [largeImg, setLargeImg] = useState('');
  const [hasMoreImages, setHasMoreImages] = useState(false);
  const [hasImages, setHasImages] = useState(false);

  const handleSubmit = str => {
    setSearchQuery(str);
    setImages([]);
    setHasImages(false);
  };

  useEffect(() => {
    const handleGetImages = async () => {
      setStatus('loading');
      setHasImages(true);
      setHasMoreImages(true);
      try {
        const res = await GetImages(searchQuery, currentPage);
        if (res.data.hits.length === 0) {
          setHasImages(false);
          setHasMoreImages(false);
        }
        setImages(prevImages => [...prevImages, ...res.data.hits]);
        setStatus('success');
      } catch (error) {

        setStatus('error');
      }
    };
    if (currentPage === 1) {
      handleGetImages();
    } else {
      handleGetImages();
    }
  }, [searchQuery, currentPage]);

  const loadMore = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
  };

  const toggleModal = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  const setImg = largeImg => {
    setLargeImg(largeImg);
  };

  return (
    <ImagesContext.Provider value={{ images, setImages }}>
      {status === 'loading' && (
        <MainContainer>
          <SearchBar onSubmit={handleSubmit} />
          <Preloader>
            <ProgressBar
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#e15b64', '#ff3300', '#f3f86a', '#3f51b5', '#849b87']}
            />
          </Preloader>
        </MainContainer>
      )}

      {(status === 'success' || status === 'idle') && (
        <MainContainer>
          <SearchBar onSubmit={handleSubmit} />
          {hasImages ? (
            <ImageGallery
              images={images}
              onClickImage={setImg}
              toggleModal={toggleModal}
            />
          ) : (
            <Span>
              I'm sorry, but I have never encountered anything like this before{' '}
            </Span>
          )}
          {isOpen && <Modal onModalClose={toggleModal} largeImg={largeImg} />}
          {hasMoreImages && !isOpen && <ButtonLoadMore onClick={loadMore} />}
          {!hasMoreImages && hasImages && (
            <Span>Sorry, but there are no more images available...</Span>
          )}
        </MainContainer>
      )}
    </ImagesContext.Provider>
  );
};
