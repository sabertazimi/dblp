import React, { Component } from 'react';
import {
  Row,
  Col,
  Layout,
  BackTop,
} from 'antd';

import { Responsive } from './components';

import {
  SearchBar,
  StatisticsBar,
  Result,
  Filter,
} from './containers';

import './index.scss';

const { Header, Content, Sider } = Layout;
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
    this.onCollapse = this.onCollapse.bind(this);
  }

  onCollapse(collapsed) {
    this.setState({ collapsed });
  }

  render() {
    const { collapsed } = this.state;

    return (
      <Layout>
        <Header className="header">
          <Row gutter={16}>
            <Col span={20}>
              <SearchBar />
            </Col>
            <Col>
              <Responsive minWidth={1080}>
                <StatisticsBar />
              </Responsive>
            </Col>
          </Row>
        </Header>
        <Layout>
          <Sider
            width={200}
            style={{
              background: '#fff',
            }}
            breakpoint="md"
            collapsible
            collapsed={collapsed}
            onCollapse={this.onCollapse}
          >
            <Filter collapsed={collapsed} />
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
              <BackTop
                style={{
                  right: '1em',
                  bottom: '1em',
                }}
              />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
