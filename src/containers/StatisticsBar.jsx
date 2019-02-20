import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Alert,
  Spin,
  Button,
  Modal,
  Empty,
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

  if (isLoading) {
    return (<Spin size="large" tip="Loading..." />);
  }

  const statisticsData = getStatisticsData(items, { venues, year });

  if (!statisticsData || !statisticsData.length) {
    return (<Empty />);
  }

  console.log(statisticsData);

  return (
    <div>
      ant
    </div>
  );
};

class StatisticsBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      visible: false,
    };

    this.showStatistics = this.showStatistics.bind(this);
    this.handleExport = this.handleExport.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  showStatistics() {
    this.setState({
      visible: true,
    });
  }

  handleExport() {
    this.setState({ loading: true });

    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }

  handleClose() {
    this.setState({
      visible: false,
    });
  }

  render() {
    const { visible, loading } = this.state;

    return (
      <div>
        <Button type="primary" onClick={this.showStatistics}>
          Open Statistics Bar
        </Button>
        <Modal
          visible={visible}
          title="Statistics"
          onOk={this.handleExport}
          onCancel={this.handleClose}
          footer={[
            <Button key="back" onClick={this.handleClose}>
              Close
            </Button>,
            <Button key="export" type="primary" loading={loading} onClick={this.handleExport}>
              Export
            </Button>,
          ]}
        >
          <StatisticsModal {...this.props} />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.data,
  ...state.filter,
});

export default connect(mapStateToProps)(StatisticsBar);
