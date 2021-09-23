import React from 'react';
import { connect } from 'react-redux';
import { Icon, Menu } from 'antd';

import { YearFilter, VenuesFilter } from '../components';

import { VENUES_LIST } from '../api';
import * as Actions from '../actions';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indeterminate: true,
      checkAll: false,
    };
  }

  onYearChange = value => {
    const { filterYear } = this.props;
    filterYear(value);
  };

  onVenuesChange = checkedValues => {
    const { filterVenue } = this.props;
    filterVenue(checkedValues);

    this.setState({
      indeterminate:
        !!checkedValues.length && checkedValues.length < VENUES_LIST.length,
      checkAll: checkedValues.length === VENUES_LIST.length,
    });
  };

  onCheckAllChange = event => {
    const { filterVenue } = this.props;
    filterVenue(event.target.checked ? VENUES_LIST : []);

    this.setState({
      indeterminate: false,
      checkAll: event.target.checked,
    });
  };

  render() {
    const { year, venues, collapsed } = this.props;
    const { indeterminate, checkAll } = this.state;

    if (collapsed) {
      return (
        <Menu mode="inline">
          <Menu.Item key="1">
            <Icon type="clock-circle" />
            <span>Year</span>
          </Menu.Item>
          {[...Array(9).keys()].map(number => (
            <Menu.Item key={number + 2}>
              <Icon type="ellipsis" />
              <span>{`Venue ${number + 1}`}</span>
            </Menu.Item>
          ))}
          <Menu.Item key="11">
            <Icon type="ellipsis" />
            <span>Venue 10</span>
          </Menu.Item>
        </Menu>
      );
    }

    return (
      <div
        style={{
          paddingLeft: '1em',
          paddingBottom: '1em',
        }}
      >
        <YearFilter year={year} onYearChange={this.onYearChange} />
        <VenuesFilter
          venues={venues}
          indeterminate={indeterminate}
          checkAll={checkAll}
          onVenuesChange={this.onVenuesChange}
          onCheckAllChange={this.onCheckAllChange}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.filter,
});

const mapDispatchToProps = dispatch => ({
  filterVenue: venues => dispatch(Actions.filterVenue(venues)),
  filterYear: year => dispatch(Actions.filterYear(year)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
