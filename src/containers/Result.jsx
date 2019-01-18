import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';

const Result = ({ error, isLoading, data }) => {
  const columns = [
    {
      Title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      Title: 'Venue',
      dataIndex: 'venue',
      key: 'venue',
    },
    {
      Title: 'Year',
      dataIndex: 'year',
      key: 'year',
    },
    {
      Title: 'Url',
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

  if (isLoading) {
    return (
      <h2>
        Loading ...
      </h2>
    );
  }

  if (data && data.length) {
    return (<Table rowKey="uid" columns={columns} dataSource={data} />);
  }

  return (
    <h2>
      No Data
    </h2>
  );
};

const mapStateToProps = state => ({
  ...state.dataReducer,
});

export default connect(mapStateToProps)(Result);
