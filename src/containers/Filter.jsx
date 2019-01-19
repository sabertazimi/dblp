import React from 'react';
import { connect } from 'react-redux';
import {
  InputNumber,
  Checkbox,
  Divider,
  Row,
  Col,
  Icon,
  Menu,
} from 'antd';

import * as Actions from '../actions';
import { VENUES_LIST, getVenueTitle } from '../api';

const Filter = ({
  venues,
  filterVenue,
  year,
  filterYear,
  collapsed,
}) => {
  const onYearChange = value => filterYear(value);
  const onVenuesChange = checkedValues => filterVenue(checkedValues);

  if (collapsed) {
    return (
      <Menu mode="inline">
        <Menu.Item key="1">
          <Icon type="clock-circle" />
          <span>
            Year
          </span>
        </Menu.Item>
        {
          [...Array(9).keys()].map(number => (
            <Menu.Item key={number + 2}>
              <Icon type="ellipsis" />
              <span>
                { `Venue ${number + 1}` }
              </span>
            </Menu.Item>
          ))
        }
        <Menu.Item key="11">
          <Icon type="ellipsis" />
          <span>
            Venue 10
          </span>
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
      <Divider orientation="left">
        Year
      </Divider>
      <InputNumber
        min={0}
        max={new Date().getFullYear()}
        defaultValue={year}
        onChange={onYearChange}
      />
      <Divider orientation="left">
        Venues
      </Divider>
      <Checkbox.Group
        style={{
          width: '100%',
        }}
        defaultValue={venues}
        onChange={onVenuesChange}
      >
        <Row type="flex" justify="center" align="middle">
          {
            VENUES_LIST.map(venue => (
              <Col span={24} key={venue}>
                <Checkbox
                  value={venue}
                >
                  { getVenueTitle(venue) }
                </Checkbox>
              </Col>
            ))
          }
        </Row>
      </Checkbox.Group>
    </div>
  );
};

const mapStateToProps = state => ({
  ...state.filter,
});

const mapDispatchToProps = dispatch => ({
  filterVenue: venues => (dispatch(Actions.filterVenue(venues))),
  filterYear: year => (dispatch(Actions.filterYear(year))),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filter);
