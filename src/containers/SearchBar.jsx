import { Input } from 'antd'
import { connect } from 'react-redux'

import * as Actions from '../actions'

/* eslint-disable no-unused-vars -- used in JSX */
/* eslint-disable unused-imports/no-unused-vars -- used in JSX */
const { Search } = Input
/* eslint-enable no-unused-vars -- reopen */
/* eslint-enable unused-imports/no-unused-vars -- reopen */

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
