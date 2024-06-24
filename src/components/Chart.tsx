import React from 'react';
import { Bar, Line, Pie, Column } from '@ant-design/charts';

const CustomChart = ({ type, data, config }) => {
  const commonConfig = { data, ...config };

  switch (type) {
    case 'bar':
      return <Bar {...commonConfig} />;
    case 'line':
      return <Line {...commonConfig} />;
    case 'pie':
      return <Pie {...commonConfig} />;
    case 'column':
      return <Column {...commonConfig} />;
    default:
      return <div>Invalid chart type</div>;
  }
};

export default CustomChart;
