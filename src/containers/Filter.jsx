import React from 'react';
import { connect } from 'react-redux';
import { Checkbox, Row, Col } from 'antd';

import * as Actions from '../actions';
import { VENUES_LIST } from '../api';

const Filter = ({ venues, filter }) => {
  const onChange = checkedValues => filter(checkedValues);

  return (
    <Checkbox.Group
      style={{
        width: '100%',
      }}
      defaultValue={venues}
      onChange={onChange}
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
  );
};

const mapStateToProps = state => ({
  venues: state.venues,
});

const mapDispatchToProps = dispatch => ({
  filter: venues => (dispatch(Actions.filter(venues))),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filter);
