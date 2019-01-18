import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';

const Result = ({ error, isLoading, data }) => {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Venue',
      dataIndex: 'venue',
      key: 'venue',
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'Url',
      dataIndex: 'url',
      key: 'url',
      render: url => (
        <a href={url}>
          {url}
        </a>
      ),
    },
  ];

  if (error) {
    return (
      <h2>
        Data Error
      </h2>
    );
  }

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={isLoading}
      pagination={{
        defaultPageSize: 30,
        hideOnSinglePage: true,
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        showQuickJumper: true,
        showSizeChanger: true,
      }}
    />
  );
};

const mapStateToProps = state => ({
  ...state.dataReducer,
});

export default connect(mapStateToProps)(Result);
