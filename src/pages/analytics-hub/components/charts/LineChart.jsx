import React, { useState, useRef, useEffect } from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LineChart = ({ data, config, height = 300 }) => {
  const [zoomDomain, setZoomDomain] = useState(null);
  const chartRef = useRef(null);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="bg-surface border border-border rounded-lg p-3 elevation-md">
        <p className="font-medium text-text-primary mb-2">
          {formatDate(label)}
        </p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between space-x-4">
            <div className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-text-secondary capitalize">
                {entry.dataKey}
              </span>
            </div>
            <span className="font-medium text-text-primary">
              {formatCurrency(entry.value)}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const handleZoom = (domain) => {
    if (config.enableZoom) {
      setZoomDomain(domain);
    }
  };

  const resetZoom = () => {
    setZoomDomain(null);
  };

  const lineColors = ['#38a169', '#1f77b4', '#ff7f0e', '#d62728', '#9467bd'];

  return (
    <div className="relative">
      {config.enableZoom && zoomDomain && (
        <button
          onClick={resetZoom}
          className="absolute top-2 right-2 z-10 px-3 py-1 bg-background border border-border rounded text-xs hover:bg-surface nav-transition"
        >
          Reset Zoom
        </button>
      )}
      
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart
          ref={chartRef}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          onMouseDown={config.enableZoom ? (e) => {
            if (e && e.activeLabel) {
              const startIndex = data.findIndex(item => item.date === e.activeLabel);
              // Simple zoom implementation - in real app would be more sophisticated
            }
          } : undefined}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            stroke="var(--color-text-secondary)"
            fontSize={12}
            domain={zoomDomain}
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
              iconType="line"
            />
          )}
          
          {/* Dynamic lines based on data keys */}
          {data.length > 0 && Object.keys(data[0])
            .filter(key => key !== 'date' && key !== 'total')
            .map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={lineColors[index % lineColors.length]}
                strokeWidth={2}
                dot={{ fill: lineColors[index % lineColors.length], strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: lineColors[index % lineColors.length], strokeWidth: 2 }}
                connectNulls={false}
              />
            ))}
          
          {/* Total line if exists */}
          {data.length > 0 && data[0].total && (
            <Line
              type="monotone"
              dataKey="total"
              stroke="var(--color-primary)"
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, stroke: 'var(--color-primary)', strokeWidth: 2 }}
            />
          )}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;