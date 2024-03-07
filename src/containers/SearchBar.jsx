import React from 'react'
import { connect } from 'react-redux'
import { Input } from 'antd'

import * as Actions from '../actions'

const { Search } = Input

const SearchBar = ({ fetchData, style }) => {
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

const mapDispatchToProps = dispatch => ({
  fetchData: keyword => dispatch(Actions.fetchData(keyword)),
})

export default connect(null, mapDispatchToProps)(SearchBar)
