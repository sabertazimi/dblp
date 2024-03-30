import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'antd'

import { ListResult, Responsive, TableResult } from '../components'

import { getFilteredData } from '../api'

function ResultComponent({ error, isLoading, items, venues, year }) {
  if (error) {
    return (
      <Alert
        message="Error"
        description="Bad request - please retry."
        type="error"
        showIcon
      />
    )
  }

  const dataSource = getFilteredData(items, { venues, year })
  const sortedDataSource = dataSource.sort(
    (a, b) =>
      b.year.localeCompare(a.year)
      || a.venue.localeCompare(b.venue)
      || a.title.localeCompare(b.title)
      || a.url.localeCompare(b.url),
  )

  return (
    <>
      <Responsive maxWidth={1079}>
        <ListResult isLoading={isLoading} dataSource={sortedDataSource} />
      </Responsive>
      <Responsive minWidth={1080}>
        <TableResult isLoading={isLoading} dataSource={dataSource} />
      </Responsive>
    </>
  )
}

function mapStateToProps(state) {
  return {
    ...state.data,
    ...state.filter,
  }
}

const Result = connect(mapStateToProps)(ResultComponent)
export default Result
