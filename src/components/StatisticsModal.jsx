import React from 'react';
import { Alert, Empty, List } from 'antd';

import { getStatisticsData } from '../api';

const StatisticsModal = ({ error, isLoading, items, venues, year }) => {
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
    return <Empty />;
  }

  const sortedData = statisticsData.sort(
    (a, b) => b.count - a.count || a.venue.localeCompare(b.venue)
  );

  return (
    <List
      dataSource={sortedData}
      loading={isLoading}
      renderItem={item => (
        <List.Item key={item.venue}>
          <List.Item.Meta description={item.venue} />
          {item.count}
        </List.Item>
      )}
    />
  );
};

export default StatisticsModal;
