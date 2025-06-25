import React from 'react';
import Icon from 'components/AppIcon';

const ChartToolbar = ({
  selectedDateRange,
  onDateRangeChange,
  selectedIndustry,
  onIndustryChange,
  selectedPlatforms,
  onPlatformsChange,
  onAddWidget,
  isLoading
}) => {
  const dateRangeOptions = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const industryOptions = [
    { value: 'all', label: 'All Industries' },
    { value: 'fashion', label: 'Fashion & Apparel' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'beauty', label: 'Beauty & Cosmetics' },
    { value: 'home', label: 'Home & Garden' },
    { value: 'sports', label: 'Sports & Fitness' }
  ];

  const platformOptions = [
    { value: 'all', label: 'All Platforms' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'google', label: 'Google' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'youtube', label: 'YouTube' }
  ];

  const chartTypes = [
    { type: 'line', label: 'Line Chart', icon: 'TrendingUp' },
    { type: 'bar', label: 'Bar Chart', icon: 'BarChart3' },
    { type: 'pie', label: 'Pie Chart', icon: 'PieChart' },
    { type: 'heatmap', label: 'Heatmap', icon: 'Grid3X3' }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-6 elevation-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Section - Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          {/* Date Range */}
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={18} className="text-text-secondary" />
            <select
              value={selectedDateRange}
              onChange={(e) => onDateRangeChange(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent nav-transition"
              disabled={isLoading}
            >
              {dateRangeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Industry Filter */}
          <div className="flex items-center space-x-2">
            <Icon name="Building2" size={18} className="text-text-secondary" />
            <select
              value={selectedIndustry}
              onChange={(e) => onIndustryChange(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent nav-transition"
              disabled={isLoading}
            >
              {industryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Platform Filter */}
          <div className="flex items-center space-x-2">
            <Icon name="Smartphone" size={18} className="text-text-secondary" />
            <select
              value={selectedPlatforms[0]}
              onChange={(e) => onPlatformsChange([e.target.value])}
              className="px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent nav-transition"
              disabled={isLoading}
            >
              {platformOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Section - Add Widget */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary hidden sm:block">Add Chart:</span>
          <div className="flex space-x-2">
            {chartTypes.map((chart) => (
              <button
                key={chart.type}
                onClick={() => onAddWidget(chart.type)}
                className="flex items-center px-3 py-2 bg-background border border-border rounded-md hover:bg-surface hover:border-accent nav-transition touch-target"
                title={chart.label}
                disabled={isLoading}
              >
                <Icon name={chart.icon} size={16} className="mr-2 sm:mr-0" />
                <span className="sm:hidden">{chart.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="mt-4 flex items-center justify-center py-2">
          <div className="flex items-center space-x-2 text-text-secondary">
            <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            <span className="text-sm">Updating charts...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartToolbar;