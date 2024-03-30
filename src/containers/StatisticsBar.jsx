import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal } from 'antd'

import { StatisticsModal } from '../components'

class StatisticsBarComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      visible: false,
    }
  }

  showStatistics = () => {
    this.setState({
      visible: true,
    })
  }

  handleExport = () => {
    this.setState({ loading: true })

    setTimeout(() => {
      this.setState({ loading: false, visible: false })
    }, 3000)
  }

  handleClose = () => {
    this.setState({
      visible: false,
    })
  }

  render() {
    const { visible, loading } = this.state

    return (
      <div>
        <Button type="primary" onClick={this.showStatistics}>
          Open Statistics Bar
        </Button>
        <Modal
          open={visible}
          title="Statistics"
          onOk={this.handleExport}
          onCancel={this.handleClose}
          footer={[
            <Button key="back" onClick={this.handleClose}>
              Close
            </Button>,
            <Button
              key="export"
              type="primary"
              loading={loading}
              onClick={this.handleExport}
            >
              Export
            </Button>,
          ]}
        >
          <StatisticsModal {...this.props} />
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.data,
    ...state.filter,
  }
}

const StatisticsBar = connect(mapStateToProps)(StatisticsBarComponent)
export default StatisticsBar
