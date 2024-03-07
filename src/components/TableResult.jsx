import React from 'react'
import { Table } from 'antd'

const TableResult = ({ isLoading, dataSource }) => {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) =>
        a.title.localeCompare(b.title) ||
        b.citations - a.citations ||
        b.year.localeCompare(a.year) ||
        a.venue.localeCompare(b.venue) ||
        a.url.localeCompare(b.url),
    },
    {
      title: 'Venue',
      dataIndex: 'venue',
      key: 'venue',
      sorter: (a, b) =>
        a.venue.localeCompare(b.venue) ||
        b.citations - a.citations ||
        b.year.localeCompare(a.year) ||
        a.title.localeCompare(b.title) ||
        a.url.localeCompare(b.url),
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
      sorter: (a, b) =>
        b.year.localeCompare(a.year) ||
        b.citations - a.citations ||
        a.venue.localeCompare(b.venue) ||
        a.title.localeCompare(b.title) ||
        a.url.localeCompare(b.url),
    },
    {
      title: 'Citations',
      dataIndex: 'citations',
      key: 'citations',
      sorter: (a, b) =>
        b.citations - a.citations ||
        b.year.localeCompare(a.year) ||
        a.venue.localeCompare(b.venue) ||
        a.title.localeCompare(b.title) ||
        a.url.localeCompare(b.url),
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
      sorter: (a, b) =>
        a.url.localeCompare(b.url) ||
        b.citations - a.citations ||
        b.year.localeCompare(a.year) ||
        a.venue.localeCompare(b.venue) ||
        a.title.localeCompare(b.title),
    },
  ]

  return (
    <Table
      rowKey={item => item.title}
      columns={columns}
      dataSource={dataSource}
      loading={isLoading}
      pagination={{
        defaultPageSize: 40,
        hideOnSinglePage: true,
        pageSizeOptions: ['20', '40', '60', '80', '100'],
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} items`,
        showQuickJumper: true,
        showSizeChanger: true,
      }}
    />
  )
}

export default TableResult
