import React from 'react';
import { connect } from 'react-redux';
import { Input, Icon } from 'antd';

import * as Actions from '../actions';
import { VENUES_LIST } from '../api';

const { Search } = Input;

const SearchBar = ({ fetchData }) => {
  const onSearch = value => value && fetchData(value, VENUES_LIST);

  return (
    <Search
      placeholder="input search text"
      onSearch={onSearch}
      enterButton={<Icon type="rocket" />}
    />
  );
};

const mapDispatchToProps = dispatch => ({
  fetchData: (keyword, venues) => (dispatch(Actions.fetchData(keyword, venues))),
});

export default connect(null, mapDispatchToProps)(SearchBar);
