import React from 'react';
import {
  Alert,
  Empty,
  Table,
} from 'antd';

import { getStatisticsData } from '../api';

const StatisticsModal = ({
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

  const statisticsData = getStatisticsData(items, { venues, year });

  if (!statisticsData || !statisticsData.length) {
    return (<Empty />);
  }

  const columns = [
    {
      title: 'Venue',
      dataIndex: 'venue',
      key: 'venue',
      sorter: (a, b) => (a.venue.localeCompare(b.venue)),
    },
    {
      title: 'Count',
      dataIndex: 'count',
      key: 'count',
      sorter: (a, b) => (
        a.count - b.count
        || a.venue.localeCompare(b.venue)
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={statisticsData}
      loading={isLoading}
      pagination={{
        defaultPageSize: 40,
        hideOnSinglePage: true,
        pageSizeOptions: ['20', '40', '60', '80', '100'],
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        showQuickJumper: true,
        showSizeChanger: true,
      }}
      size="small"
    />
  );
};

export default StatisticsModal;
