import React from 'react';
import { Layout } from 'antd';

import { SearchBar, Result, Filter } from './containers';

import './index.scss';

const { Header, Content, Sider } = Layout;

const App = () => (
  <Layout>
    <Header className="header">
      <SearchBar />
    </Header>
    <Layout>
      <Sider
        width={200}
        style={{
          background: '#fff',
          padding: '24px',
        }}
      >
        <Filter />
      </Sider>
      <Layout
        style={{
          padding: '0 24px 24px',
        }}
      >
        <Content
          style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Result />
        </Content>
      </Layout>
    </Layout>
  </Layout>
);

export default App;
