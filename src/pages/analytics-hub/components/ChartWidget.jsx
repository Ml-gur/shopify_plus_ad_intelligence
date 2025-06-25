import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import LineChart from './charts/LineChart';
import BarChart from './charts/BarChart';
import PieChart from './charts/PieChart';
import HeatmapChart from './charts/HeatmapChart';

const ChartWidget = ({ widget, data, onRemove, onResize, onConfigUpdate }) => {
  const [showConfig, setShowConfig] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const renderChart = () => {
    const chartProps = {
      data: data.data,
      config: widget.config,
      height: isFullscreen ? 500 : 300
    };

    switch (widget.type) {
      case 'line':
        return <LineChart {...chartProps} />;
      case 'bar':
        return <BarChart {...chartProps} />;
      case 'pie':
        return <PieChart {...chartProps} />;
      case 'heatmap':
        return <HeatmapChart {...chartProps} />;
      default:
        return (
          <div className="h-64 flex items-center justify-center text-text-secondary">
            <Icon name="BarChart3" size={48} />
          </div>
        );
    }
  };

  const handleConfigChange = (key, value) => {
    onConfigUpdate({ [key]: value });
  };

  const sizeOptions = [
    { value: 'small', label: 'Small', icon: 'Square' },
    { value: 'medium', label: 'Medium', icon: 'RectangleHorizontal' },
    { value: 'large', label: 'Large', icon: 'RectangleWide' },
    { value: 'full', label: 'Full Width', icon: 'Maximize' }
  ];

  return (
    <>
      <div className={`bg-surface border border-border rounded-lg elevation-sm data-transition ${isFullscreen ? 'fixed inset-4 z-1100' : ''}`}>
        {/* Widget Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <h3 className="font-semibold text-text-primary">{widget.title}</h3>
            {data.metrics && Object.keys(data.metrics).length > 0 && (
              <div className="flex items-center space-x-2">
                {Object.entries(data.metrics).slice(0, 2).map(([key, value]) => (
                  <span key={key} className="text-xs bg-background px-2 py-1 rounded-full text-text-secondary">
                    {key}: {typeof value === 'number' ? value.toLocaleString() : value}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowConfig(!showConfig)}
              className="p-1 rounded hover:bg-background nav-transition"
              title="Chart Settings"
            >
              <Icon name="Settings" size={16} />
            </button>
            
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1 rounded hover:bg-background nav-transition"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              <Icon name={isFullscreen ? "Minimize" : "Maximize"} size={16} />
            </button>
            
            <button
              onClick={onRemove}
              className="p-1 rounded hover:bg-background text-error nav-transition"
              title="Remove Widget"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>

        {/* Configuration Panel */}
        {showConfig && (
          <div className="p-4 border-b border-border bg-background">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Size Control */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Widget Size
                </label>
                <div className="flex space-x-1">
                  {sizeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => onResize(option.value)}
                      className={`p-2 rounded border nav-transition ${
                        widget.size === option.value
                          ? 'border-accent bg-accent/10 text-accent' :'border-border hover:bg-surface'
                      }`}
                      title={option.label}
                    >
                      <Icon name={option.icon} size={16} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart Options */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Chart Options
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={widget.config.showTooltip}
                      onChange={(e) => handleConfigChange('showTooltip', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-text-secondary">Show Tooltips</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={widget.config.showLegend}
                      onChange={(e) => handleConfigChange('showLegend', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-text-secondary">Show Legend</span>
                  </label>
                  {(widget.type === 'line' || widget.type === 'heatmap') && (
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={widget.config.enableZoom}
                        onChange={(e) => handleConfigChange('enableZoom', e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm text-text-secondary">Enable Zoom</span>
                    </label>
                  )}
                </div>
              </div>

              {/* Export Options */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Export
                </label>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-xs bg-surface border border-border rounded hover:bg-background nav-transition">
                    PNG
                  </button>
                  <button className="px-3 py-1 text-xs bg-surface border border-border rounded hover:bg-background nav-transition">
                    CSV
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chart Content */}
        <div className="p-4">
          {renderChart()}
        </div>
      </div>

      {/* Fullscreen Overlay */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-1000" onClick={() => setIsFullscreen(false)} />
      )}
    </>
  );
};

export default ChartWidget;