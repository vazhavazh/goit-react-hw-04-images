import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Header,
  Form,
  SearchInput,
  ButtonSearch,
  Span,
} from './SearchBarStyled';

export const SearchBar = ({ onSubmit }) => {
  const [searchString, setSearchString] = useState('');

  const handleChangeInput = e => {
    setSearchString(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!searchString) {
      alert(`Please write something...`);
      return;
    }
    onSubmit(searchString);
    setSearchString('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <SearchInput
          onChange={handleChangeInput}
          value={searchString}
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <ButtonSearch type="submit">
          <Span>Search</Span>
        </ButtonSearch>
      </Form>
    </Header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
