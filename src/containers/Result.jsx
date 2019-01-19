import React from 'react';
import { connect } from 'react-redux';
import { Table, Alert } from 'antd';

import { getFilteredData } from '../api';

const Result = ({
  error,
  isLoading,
  items,
  venues,
  year,
}) => {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => (
        a.title.localeCompare(b.title)
        || a.venue.localeCompare(b.venue)
        || b.year.localeCompare(a.year)
        || a.url.localeCompare(b.url)
      ),
    },
    {
      title: 'Venue',
      dataIndex: 'venue',
      key: 'venue',
      sorter: (a, b) => (
        a.venue.localeCompare(b.venue)
        || b.year.localeCompare(a.year)
        || a.title.localeCompare(b.title)
        || a.url.localeCompare(b.url)
      ),
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
      sorter: (a, b) => (
        b.year.localeCompare(a.year)
        || a.venue.localeCompare(b.venue)
        || a.title.localeCompare(b.title)
        || a.url.localeCompare(b.url)
      ),
    },
    {
      title: 'Url',
      dataIndex: 'url',
      key: 'url',
      render: url => (
        <a href={url} target="_blank" rel="noopener noreferrer nofollow">
          {url}
        </a>
      ),
      sorter: (a, b) => (
        a.url.localeCompare(b.url)
        || a.venue.localeCompare(b.venue)
        || b.year.localeCompare(a.year)
        || a.title.localeCompare(b.title)
      ),
    },
  ];

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

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      loading={isLoading}
      pagination={{
        defaultPageSize: 40,
        hideOnSinglePage: true,
        pageSizeOptions: ['20', '40', '60', '80', '100'],
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        showQuickJumper: true,
        showSizeChanger: true,
      }}
    />
  );
};

const mapStateToProps = state => ({
  ...state.data,
  ...state.filter,
});

export default connect(mapStateToProps)(Result);
