import React from 'react';
import {
  InputNumber,
  Divider,
} from 'antd';

const YearFilter = ({
  year,
  onYearChange,
}) => (
  <React.Fragment>
    <Divider orientation="left">
      Year
    </Divider>
    <InputNumber
      min={0}
      max={new Date().getFullYear()}
      defaultValue={year}
      onChange={onYearChange}
    />
  </React.Fragment>
);

export default YearFilter;
