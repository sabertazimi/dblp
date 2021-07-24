import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';

import * as Actions from '../actions';
import { VENUES_LIST } from '../api';

const { Search } = Input;

const SearchBar = ({ fetchData, style }) => {
  const onSearch = (value) => value && fetchData(value, VENUES_LIST);

  return (
    <Search
      allowClear
      style={style}
      enterButton
      placeholder="input search text"
      onSearch={onSearch}
    />
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchData: (keyword, venues) => (dispatch(Actions.fetchData(keyword, venues))),
});

export default connect(null, mapDispatchToProps)(SearchBar);
