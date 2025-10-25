import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface BarChartData {
  name: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: BarChartData[];
  title?: string;
  className?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  showGrid?: boolean;
  barColor?: string;
}

const BarChart: React.FC<BarChartProps> = ({ 
  data, 
  title, 
  className = '',
  xAxisLabel,
  yAxisLabel,
  showGrid = true,
  barColor = '#3B82F6'
}) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900">{label}</p>
          <p className="text-sm text-gray-600">
            {yAxisLabel || '数值'}: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">{title}</h3>
      )}
      
      <ResponsiveContainer width="100%" height={300}>
        <RechartsBarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />}
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12, fill: '#6B7280' }}
            axisLine={{ stroke: '#D1D5DB' }}
            tickLine={{ stroke: '#D1D5DB' }}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#6B7280' }}
            axisLine={{ stroke: '#D1D5DB' }}
            tickLine={{ stroke: '#D1D5DB' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="value" 
            fill={barColor}
            radius={[4, 4, 0, 0]}
            maxBarSize={60}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
      
      {/* 数据统计 */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        {data.map((item, index) => (
          <div key={index} className="text-center p-2 bg-gray-50 rounded">
            <div className="font-medium text-gray-900">{item.value}</div>
            <div className="text-gray-600 text-xs mt-1">{item.name}</div>
          </div>
        ))}
      </div>
      
      {/* 轴标签 */}
      {(xAxisLabel || yAxisLabel) && (
        <div className="mt-4 flex justify-between text-xs text-gray-500">
          {xAxisLabel && <span>{xAxisLabel}</span>}
          {yAxisLabel && <span>{yAxisLabel}</span>}
        </div>
      )}
    </div>
  );
};

export default BarChart;