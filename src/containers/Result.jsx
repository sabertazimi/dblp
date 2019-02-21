import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'antd';

import {
  Responsive,
  ListResult,
  TableResult,
} from '../components';

import { getFilteredData } from '../api';

const Result = ({
  error,
  isLoading,
  items,
  venues,
  year,
}) => {
  if (error) {
    return (
      <Alert
        message="Error"
        description="Bad request - please retry."
        type="error"
        showIcon
      />
    );
  }

  const dataSource = getFilteredData(items, { venues, year });
  const sortedDataSource = dataSource.sort((a, b) => (
    b.year.localeCompare(a.year)
      || a.venue.localeCompare(b.venue)
      || a.title.localeCompare(b.title)
      || a.url.localeCompare(b.url)
  ));

  return (
    <React.Fragment>
      <Responsive maxWidth={1079}>
        <ListResult isLoading={isLoading} dataSource={sortedDataSource} />
      </Responsive>
      <Responsive minWidth={1080}>
        <TableResult isLoading={isLoading} dataSource={dataSource} />
      </Responsive>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  ...state.data,
  ...state.filter,
});

export default connect(mapStateToProps)(Result);
