
import React from 'react';
import { List } from 'antd';

const ListResult = ({
  isLoading,
  dataSource,
}) => (
  <List
    itemLayout="vertical"
    dataSource={dataSource}
    loading={isLoading}
    renderItem={item => (
      <List.Item
        key={item.title}
      >
        <List.Item.Meta
          description={`${item.venue} ${item.year}`}
        />
        <a href={item.url} target="_blank" rel="noopener noreferrer nofollow">
          {item.title}
        </a>
      </List.Item>
    )}
  />
);

export default ListResult;
