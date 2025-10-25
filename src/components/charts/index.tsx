import React from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ComposedChart,
  Area,
  AreaChart
} from 'recharts';

// 颜色配置
export const CHART_COLORS = {
  primary: '#3B82F6',
  secondary: '#10B981',
  accent: '#F59E0B',
  danger: '#EF4444',
  purple: '#8B5CF6',
  pink: '#EC4899',
  indigo: '#6366F1',
  teal: '#14B8A6'
};

export const COLOR_PALETTE = [
  CHART_COLORS.primary,
  CHART_COLORS.secondary,
  CHART_COLORS.accent,
  CHART_COLORS.danger,
  CHART_COLORS.purple,
  CHART_COLORS.pink,
  CHART_COLORS.indigo,
  CHART_COLORS.teal
];

// 自定义Tooltip组件
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
            {entry.unit || ''}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// 环形进度图
interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  label?: string;
  showPercentage?: boolean;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  color = CHART_COLORS.primary,
  backgroundColor = '#E5E7EB',
  label,
  showPercentage = true
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = (value / max) * 100;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showPercentage && (
          <span className="text-2xl font-bold" style={{ color }}>
            {Math.round(percentage)}
          </span>
        )}
        {label && (
          <span className="text-xs text-gray-600 mt-1 text-center">{label}</span>
        )}
      </div>
    </div>
  );
};

// 增强型雷达图
interface EnhancedRadarChartProps {
  data: Array<{
    name: string;
    value: number;
    fullMark?: number;
  }>;
  height?: number;
  colors?: string[];
  showGrid?: boolean;
  showLabels?: boolean;
}

export const EnhancedRadarChart: React.FC<EnhancedRadarChartProps> = ({
  data,
  height = 300,
  colors = [CHART_COLORS.primary],
  showGrid = true,
  showLabels = true
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data}>
        {showGrid && <PolarGrid gridType="polygon" />}
        <PolarAngleAxis 
          dataKey="name" 
          tick={{ fontSize: 12, fill: '#6B7280' }}
          className="text-xs"
        />
        <PolarRadiusAxis 
          angle={90} 
          domain={[0, 100]} 
          tick={{ fontSize: 10, fill: '#9CA3AF' }}
          tickCount={6}
        />
        <Radar
          name="评分"
          dataKey="value"
          stroke={colors[0]}
          fill={colors[0]}
          fillOpacity={0.3}
          strokeWidth={2}
          dot={{ fill: colors[0], strokeWidth: 2, r: 4 }}
        />
        <Tooltip content={<CustomTooltip />} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

// 渐变柱状图
interface GradientBarChartProps {
  data: Array<{
    name: string;
    value: number;
    color?: string;
  }>;
  height?: number;
  showGrid?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

export const GradientBarChart: React.FC<GradientBarChartProps> = ({
  data,
  height = 300,
  showGrid = true,
  orientation = 'vertical'
}) => {
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        layout={orientation === 'horizontal' ? 'horizontal' : 'vertical'}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={CHART_COLORS.primary} stopOpacity={1} />
            <stop offset="100%" stopColor={CHART_COLORS.primary} stopOpacity={0.6} />
          </linearGradient>
        </defs>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />}
        {orientation === 'vertical' ? (
          <>
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              axisLine={{ stroke: '#D1D5DB' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              axisLine={{ stroke: '#D1D5DB' }}
            />
          </>
        ) : (
          <>
            <XAxis 
              type="number" 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              axisLine={{ stroke: '#D1D5DB' }}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              axisLine={{ stroke: '#D1D5DB' }}
            />
          </>
        )}
        <Tooltip content={<CustomTooltip />} />
        <Bar 
          dataKey="value" 
          fill={`url(#${gradientId})`}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

// 环形饼图
interface DonutChartProps {
  data: Array<{
    name: string;
    value: number;
    color?: string;
  }>;
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  showLabels?: boolean;
  centerContent?: React.ReactNode;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  height = 300,
  innerRadius = 60,
  outerRadius = 100,
  showLabels = true,
  centerContent
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const renderLabel = ({ name, value }: any) => {
    const percentage = ((value / total) * 100).toFixed(1);
    return showLabels ? `${name}: ${percentage}%` : '';
  };

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderLabel}
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            fill="#8884d8"
            dataKey="value"
            stroke="#fff"
            strokeWidth={2}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color || COLOR_PALETTE[index % COLOR_PALETTE.length]} 
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      {centerContent && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {centerContent}
        </div>
      )}
    </div>
  );
};

// 多维度对比图
interface MultiDimensionComparisonProps {
  data: Array<{
    category: string;
    user: number;
    average: number;
    ideal: number;
  }>;
  height?: number;
}

export const MultiDimensionComparison: React.FC<MultiDimensionComparisonProps> = ({
  data,
  height = 300
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis 
          dataKey="category" 
          tick={{ fontSize: 12, fill: '#6B7280' }}
          axisLine={{ stroke: '#D1D5DB' }}
        />
        <YAxis 
          tick={{ fontSize: 12, fill: '#6B7280' }}
          axisLine={{ stroke: '#D1D5DB' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="user" fill={CHART_COLORS.primary} name="用户得分" />
        <Line 
          type="monotone" 
          dataKey="average" 
          stroke={CHART_COLORS.secondary} 
          strokeWidth={2}
          name="平均水平"
          dot={{ fill: CHART_COLORS.secondary, r: 4 }}
        />
        <Line 
          type="monotone" 
          dataKey="ideal" 
          stroke={CHART_COLORS.accent} 
          strokeWidth={2}
          strokeDasharray="5 5"
          name="理想标准"
          dot={{ fill: CHART_COLORS.accent, r: 4 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

// 趋势面积图
interface TrendAreaChartProps {
  data: Array<{
    name: string;
    value: number;
    trend?: number;
  }>;
  height?: number;
  showTrend?: boolean;
}

export const TrendAreaChart: React.FC<TrendAreaChartProps> = ({
  data,
  height = 300,
  showTrend = true
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={CHART_COLORS.primary} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 12, fill: '#6B7280' }}
          axisLine={{ stroke: '#D1D5DB' }}
        />
        <YAxis 
          tick={{ fontSize: 12, fill: '#6B7280' }}
          axisLine={{ stroke: '#D1D5DB' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area 
          type="monotone" 
          dataKey="value" 
          stroke={CHART_COLORS.primary}
          fillOpacity={1} 
          fill="url(#colorValue)" 
        />
        {showTrend && (
          <Line 
            type="monotone" 
            dataKey="trend" 
            stroke={CHART_COLORS.accent}
            strokeWidth={2}
            dot={{ fill: CHART_COLORS.accent, r: 3 }}
          />
        )}
      </AreaChart>
    </ResponsiveContainer>
  );
};

// 评分卡片组件
interface ScoreCardProps {
  title: string;
  score: number;
  maxScore?: number;
  description?: string;
  color?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: number;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({
  title,
  score,
  maxScore = 100,
  description,
  color = CHART_COLORS.primary,
  icon,
  trend,
  trendValue
}) => {
  const percentage = (score / maxScore) * 100;
  
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return '↗';
      case 'down': return '↘';
      default: return '→';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {icon && <div style={{ color }}>{icon}</div>}
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        {trend && trendValue && (
          <div className={`flex items-center text-sm ${getTrendColor()}`}>
            <span className="mr-1">{getTrendIcon()}</span>
            <span>{trendValue}%</span>
          </div>
        )}
      </div>
      
      <div className="mb-4">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold" style={{ color }}>
            {score}
          </span>
          <span className="text-lg text-gray-500">/ {maxScore}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="h-2 rounded-full transition-all duration-1000 ease-out"
            style={{ 
              width: `${percentage}%`,
              backgroundColor: color
            }}
          />
        </div>
      </div>
      
      {description && (
        <p className="text-sm text-gray-600">{description}</p>
      )}
    </div>
  );
};