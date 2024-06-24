import React from 'react';
import { formatPercentage, formatCurrency } from '../utils/formatNumber'

export const formatPercentageV2 = (number: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number) + '%';
};

const NumberFormatter: React.FC<{ number: number }> = ({ number }) => {
  return <div>{formatCurrency(number)}</div>;
};


const PercentageFormatter: React.FC<{ number: number }> = ({ number }) => {
  return <div className='pr-1'>{formatPercentage(number)}</div>;
};

const PercentageFormatterV2: React.FC<{ number: number }> = ({ number }) => {
  return <div className='pr-1'>{formatPercentageV2(number)}</div>;
};

export {PercentageFormatter, PercentageFormatterV2, NumberFormatter };