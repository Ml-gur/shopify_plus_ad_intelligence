import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChart = ({ data, config, height = 300 }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value) => {
    return `${value}%`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    const data = payload[0].payload;

    return (
      <div className="bg-surface border border-border rounded-lg p-4 elevation-md">
        <p className="font-medium text-text-primary mb-3">{label}</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Ad Spend:</span>
            <span className="font-medium text-text-primary">
              {formatCurrency(data.spend)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Market Share:</span>
            <span className="font-medium text-text-primary">
              {formatPercentage(data.percentage)}
            </span>
          </div>
          {data.growth && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Growth:</span>
              <span className={`font-medium ${data.growth > 0 ? 'text-accent' : 'text-error'}`}>
                {data.growth > 0 ? '+' : ''}{formatPercentage(data.growth)}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const CustomLabel = ({ x, y, width, height, value }) => {
    return (
      <text
        x={x + width / 2}
        y={y - 5}
        fill="var(--color-text-secondary)"
        textAnchor="middle"
        fontSize={12}
      >
        {formatPercentage(value)}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis
          dataKey="platform"
          stroke="var(--color-text-secondary)"
          fontSize={12}
        />
        <YAxis
          tickFormatter={formatCurrency}
          stroke="var(--color-text-secondary)"
          fontSize={12}
        />
        {config.showTooltip && <Tooltip content={<CustomTooltip />} />}
        {config.showLegend && (
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
          />
        )}
        
        <Bar
          dataKey="spend"
          fill="var(--color-accent)"
          radius={[4, 4, 0, 0]}
          label={config.showLabels ? <CustomLabel /> : false}
        >
          {/* Gradient fill for bars */}
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={1} />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0.7} />
            </linearGradient>
          </defs>
        </Bar>
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;