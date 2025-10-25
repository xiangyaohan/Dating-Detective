import React from 'react';
import { Radar, RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';

interface RadarChartProps {
  data: Array<{
    subject: string;
    score: number;
    fullMark: number;
  }>;
  title?: string;
  className?: string;
}

const RadarChart: React.FC<RadarChartProps> = ({ data, title, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">{title}</h3>
      )}
      
      <ResponsiveContainer width="100%" height={300}>
        <RechartsRadarChart data={data}>
          <PolarGrid gridType="polygon" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fontSize: 12, fill: '#6B7280' }}
            className="text-sm"
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]} 
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
            tickCount={6}
          />
          <Radar
            name="评分"
            dataKey="score"
            stroke="#3B82F6"
            fill="#3B82F6"
            fillOpacity={0.3}
            strokeWidth={2}
            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
      
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        {data.map((item, index) => (
          <div key={index} className="flex justify-between items-center py-1">
            <span className="text-gray-600">{item.subject}:</span>
            <span className="font-medium text-gray-900">{item.score}/100</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadarChart;