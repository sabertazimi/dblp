import React from 'react';
import {
  Checkbox,
  Divider,
  Row,
  Col,
} from 'antd';

import { VENUES_LIST, getVenueTitle } from '../api';

const Filter = ({
  venues,
  indeterminate,
  checkAll,
  onVenuesChange,
  onCheckAllChange,
}) => (
  <React.Fragment>
    <Divider orientation="left">
      Venues
    </Divider>
    <Checkbox
      indeterminate={indeterminate}
      onChange={onCheckAllChange}
      checked={checkAll}
      style={
        checkAll ? {
          color: '#1890ff',
        } : {
          color: 'rgba(0, 0, 0, 0.65)',
        }
      }
    >
      <b>
        Check All
      </b>
    </Checkbox>
    <Checkbox.Group
      style={{
        width: '100%',
      }}
      value={venues}
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
  </React.Fragment>
);

export default Filter;
