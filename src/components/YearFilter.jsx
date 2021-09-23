import React from 'react';
import { InputNumber, Divider } from 'antd';

const YearFilter = ({ year, onYearChange }) => (
  <>
    <Divider orientation="left">Year</Divider>
    <InputNumber
      min={0}
      max={new Date().getFullYear()}
      defaultValue={year}
      onChange={onYearChange}
    />
  </>
);

export default YearFilter;
