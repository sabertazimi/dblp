import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';

import * as Actions from '../actions';

const { Search } = Input;

const SearchBar = ({ fetchData }) => {
  const onSearch = value => fetchData(value, 'ISCA');

  return (
    <Search
      placeholder="input search text"
      onSearch={onSearch}
      enterButton
    />
  );
};

const mapDispatchToProps = dispatch => ({
  fetchData: (keyword, venue) => (dispatch(Actions.fetchData(keyword, venue))),
});

export default connect(null, mapDispatchToProps)(SearchBar);
