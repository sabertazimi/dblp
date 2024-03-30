import React from 'react'
import { connect } from 'react-redux'
import { Input } from 'antd'

import * as Actions from '../actions'

const { Search } = Input

function SearchBarComponent({ fetchData, style }) {
  const onSearch = value => value && fetchData(value)

  return (
    <Search
      allowClear
      style={style}
      enterButton
      placeholder="Search paper here ..."
      onSearch={onSearch}
    />
  )
}

function mapDispatchToProps(dispatch) {
  return {
    fetchData: keyword => dispatch(Actions.fetchData(keyword)),
  }
}

const SearchBar = connect(null, mapDispatchToProps)(SearchBarComponent)
export default SearchBar
