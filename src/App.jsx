import React, { Component } from 'react';
import { Row, Col, Layout, BackTop, Tooltip } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { Responsive } from './components';
import { SearchBar, StatisticsBar, Result, Filter } from './containers';
import './index.css';

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
        <Header
          className="header"
          style={{
            position: 'relative',
          }}
        >
          <Responsive maxWidth={1079}>
            <SearchBar
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: '#000',
                paddingLeft: '5px',
                paddingRight: '5px',
              }}
            />
          </Responsive>
          <Responsive minWidth={1080}>
            <Row type="flex" gutter={16} align="middle" justify="center">
              <Col
                span={16}
                style={{
                  position: 'relative',
                }}
              >
                <SearchBar
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: '#000',
                  }}
                />
              </Col>
              <Col>
                <StatisticsBar />
              </Col>
              <Col>
                <a
                  href="https://github.com/sabertazimi/dblp"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'block',
                    fontSize: '1.75rem',
                    color: '#fff',
                  }}
                >
                  <Tooltip title="Get Source Code">
                    <GithubOutlined />
                  </Tooltip>
                </a>
              </Col>
            </Row>
          </Responsive>
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
