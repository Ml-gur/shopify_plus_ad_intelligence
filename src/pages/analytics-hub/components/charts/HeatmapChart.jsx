import React, { useState } from 'react';

const HeatmapChart = ({ data, config, height = 300 }) => {
  const [hoveredCell, setHoveredCell] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Get all spend values to calculate color intensity
  const allValues = data.flatMap(month => 
    Object.keys(month).filter(key => key.startsWith('week')).map(key => month[key])
  );
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);

  const getColorIntensity = (value) => {
    const normalized = (value - minValue) / (maxValue - minValue);
    return normalized;
  };

  const getColorClass = (intensity) => {
    if (intensity >= 0.8) return 'bg-accent';
    if (intensity >= 0.6) return 'bg-accent/80';
    if (intensity >= 0.4) return 'bg-accent/60';
    if (intensity >= 0.2) return 'bg-accent/40';
    return 'bg-accent/20';
  };

  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

  const handleCellHover = (monthIndex, weekIndex, value) => {
    setHoveredCell({
      month: data[monthIndex].month,
      week: weeks[weekIndex],
      value: value
    });
  };

  const handleZoom = (direction) => {
    if (config.enableZoom) {
      setZoomLevel(prev => {
        const newLevel = direction === 'in' ? prev * 1.2 : prev / 1.2;
        return Math.max(0.5, Math.min(2, newLevel));
      });
    }
  };

  return (
    <div className="relative" style={{ height }}>
      {/* Zoom Controls */}
      {config.enableZoom && (
        <div className="absolute top-2 right-2 z-10 flex space-x-1">
          <button
            onClick={() => handleZoom('in')}
            className="w-8 h-8 bg-background border border-border rounded flex items-center justify-center hover:bg-surface nav-transition"
            title="Zoom In"
          >
            <span className="text-sm font-bold">+</span>
          </button>
          <button
            onClick={() => handleZoom('out')}
            className="w-8 h-8 bg-background border border-border rounded flex items-center justify-center hover:bg-surface nav-transition"
            title="Zoom Out"
          >
            <span className="text-sm font-bold">−</span>
          </button>
        </div>
      )}

      {/* Heatmap Grid */}
      <div className="h-full overflow-auto">
        <div 
          className="min-w-full"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
        >
          {/* Header */}
          <div className="grid grid-cols-5 gap-1 mb-2">
            <div className="text-sm font-medium text-text-primary p-2"></div>
            {weeks.map((week) => (
              <div key={week} className="text-sm font-medium text-text-primary text-center p-2">
                {week}
              </div>
            ))}
          </div>

          {/* Heatmap Rows */}
          <div className="space-y-1">
            {data.map((monthData, monthIndex) => (
              <div key={monthData.month} className="grid grid-cols-5 gap-1">
                <div className="text-sm font-medium text-text-primary p-2 flex items-center">
                  {monthData.month}
                </div>
                {weeks.map((week, weekIndex) => {
                  const weekKey = `week${weekIndex + 1}`;
                  const value = monthData[weekKey];
                  const intensity = getColorIntensity(value);
                  
                  return (
                    <div
                      key={weekKey}
                      className={`
                        relative p-3 rounded cursor-pointer nav-transition
                        ${getColorClass(intensity)}
                        hover:ring-2 hover:ring-accent hover:ring-opacity-50
                      `}
                      onMouseEnter={() => handleCellHover(monthIndex, weekIndex, value)}
                      onMouseLeave={() => setHoveredCell(null)}
                    >
                      <div className="text-center">
                        <div className="text-xs font-medium text-white">
                          {formatCurrency(value)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {config.showTooltip && hoveredCell && (
        <div className="absolute bottom-4 left-4 bg-surface border border-border rounded-lg p-3 elevation-md z-20">
          <div className="space-y-1">
            <p className="font-medium text-text-primary">
              {hoveredCell.month} - {hoveredCell.week}
            </p>
            <p className="text-sm text-text-secondary">
              Ad Spend: <span className="font-medium text-text-primary">
                {formatCurrency(hoveredCell.value)}
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Legend */}
      {config.showLegend && (
        <div className="absolute bottom-4 right-4 bg-surface border border-border rounded-lg p-3 elevation-md">
          <div className="text-xs font-medium text-text-primary mb-2">Spend Intensity</div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-text-secondary">Low</span>
            <div className="flex space-x-1">
              {[0.2, 0.4, 0.6, 0.8, 1.0].map((intensity, index) => (
                <div
                  key={index}
                  className={`w-4 h-4 rounded ${getColorClass(intensity)}`}
                />
              ))}
            </div>
            <span className="text-xs text-text-secondary">High</span>
          </div>
          <div className="flex justify-between mt-1 text-xs text-text-secondary">
            <span>{formatCurrency(minValue)}</span>
            <span>{formatCurrency(maxValue)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeatmapChart;