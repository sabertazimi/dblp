import React from 'react';
import { connect } from 'react-redux';
import {
  InputNumber,
  Checkbox,
  Divider,
  Row,
  Col,
} from 'antd';

import * as Actions from '../actions';
import { VENUES_LIST } from '../api';

const Filter = ({
  venues,
  filterVenue,
  year,
  filterYear,
}) => {
  const onYearChange = value => filterYear(value);
  const onVenuesChange = checkedValues => filterVenue(checkedValues);

  return (
    <div>
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
                  {venue}
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
