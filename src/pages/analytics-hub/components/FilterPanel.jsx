import React from 'react';
import Icon from 'components/AppIcon';

const FilterPanel = ({
  isOpen,
  onClose,
  selectedIndustry,
  onIndustryChange,
  selectedPlatforms,
  onPlatformsChange,
  spendThreshold,
  onSpendThresholdChange,
  selectedDateRange,
  onDateRangeChange
}) => {
  const industries = [
    { value: 'all', label: 'All Industries', count: 1250 },
    { value: 'fashion', label: 'Fashion & Apparel', count: 320 },
    { value: 'electronics', label: 'Electronics', count: 280 },
    { value: 'beauty', label: 'Beauty & Cosmetics', count: 195 },
    { value: 'home', label: 'Home & Garden', count: 165 },
    { value: 'sports', label: 'Sports & Fitness', count: 145 },
    { value: 'automotive', label: 'Automotive', count: 85 },
    { value: 'food', label: 'Food & Beverage', count: 60 }
  ];

  const platforms = [
    { value: 'facebook', label: 'Facebook', icon: 'Facebook', active: true },
    { value: 'google', label: 'Google Ads', icon: 'Search', active: true },
    { value: 'tiktok', label: 'TikTok', icon: 'Music', active: true },
    { value: 'instagram', label: 'Instagram', icon: 'Instagram', active: true },
    { value: 'youtube', label: 'YouTube', icon: 'Youtube', active: false },
    { value: 'twitter', label: 'Twitter', icon: 'Twitter', active: false },
    { value: 'pinterest', label: 'Pinterest', icon: 'Image', active: false },
    { value: 'snapchat', label: 'Snapchat', icon: 'Camera', active: false }
  ];

  const geographies = [
    { value: 'global', label: 'Global', count: 1250 },
    { value: 'north-america', label: 'North America', count: 485 },
    { value: 'europe', label: 'Europe', count: 380 },
    { value: 'asia-pacific', label: 'Asia Pacific', count: 285 },
    { value: 'latin-america', label: 'Latin America', count: 100 }
  ];

  const handlePlatformToggle = (platform) => {
    if (selectedPlatforms.includes(platform)) {
      onPlatformsChange(selectedPlatforms.filter(p => p !== platform));
    } else {
      onPlatformsChange([...selectedPlatforms, platform]);
    }
  };

  const handleSpendChange = (type, value) => {
    onSpendThresholdChange({
      ...spendThreshold,
      [type]: parseInt(value) || 0
    });
  };

  const resetFilters = () => {
    onIndustryChange('all');
    onPlatformsChange(['all']);
    onSpendThresholdChange({ min: 0, max: 1000000 });
    onDateRangeChange('30d');
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-1000"
          onClick={onClose}
        />
      )}

      {/* Filter Panel */}
      <div className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] w-80 bg-surface border-r border-border z-1100
        transform nav-transition overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-text-primary">Advanced Filters</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-background nav-transition"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Date Range */}
          <div className="mb-6">
            <h3 className="font-medium text-text-primary mb-3">Date Range</h3>
            <div className="space-y-2">
              {[
                { value: '7d', label: 'Last 7 Days' },
                { value: '30d', label: 'Last 30 Days' },
                { value: '90d', label: 'Last 90 Days' },
                { value: '1y', label: 'Last Year' }
              ].map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="dateRange"
                    value={option.value}
                    checked={selectedDateRange === option.value}
                    onChange={(e) => onDateRangeChange(e.target.value)}
                    className="mr-3"
                  />
                  <span className="text-sm text-text-secondary">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Spend Threshold */}
          <div className="mb-6">
            <h3 className="font-medium text-text-primary mb-3">Spend Threshold</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-text-secondary mb-1">Minimum Spend ($)</label>
                <input
                  type="number"
                  value={spendThreshold.min}
                  onChange={(e) => handleSpendChange('min', e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1">Maximum Spend ($)</label>
                <input
                  type="number"
                  value={spendThreshold.max}
                  onChange={(e) => handleSpendChange('max', e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="1000000"
                />
              </div>
            </div>
          </div>

          {/* Industries */}
          <div className="mb-6">
            <h3 className="font-medium text-text-primary mb-3">Industry</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {industries.map((industry) => (
                <label key={industry.value} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="industry"
                      value={industry.value}
                      checked={selectedIndustry === industry.value}
                      onChange={(e) => onIndustryChange(e.target.value)}
                      className="mr-3"
                    />
                    <span className="text-sm text-text-secondary">{industry.label}</span>
                  </div>
                  <span className="text-xs text-text-secondary bg-background px-2 py-1 rounded-full">
                    {industry.count}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Platforms */}
          <div className="mb-6">
            <h3 className="font-medium text-text-primary mb-3">Platforms</h3>
            <div className="space-y-2">
              {platforms.map((platform) => (
                <label key={platform.value} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedPlatforms.includes(platform.value)}
                      onChange={() => handlePlatformToggle(platform.value)}
                      className="mr-3"
                    />
                    <Icon name={platform.icon} size={16} className="mr-2 text-text-secondary" />
                    <span className="text-sm text-text-secondary">{platform.label}</span>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${platform.active ? 'bg-accent' : 'bg-text-secondary'}`} />
                </label>
              ))}
            </div>
          </div>

          {/* Geography */}
          <div className="mb-6">
            <h3 className="font-medium text-text-primary mb-3">Geography</h3>
            <div className="space-y-2">
              {geographies.map((geo) => (
                <label key={geo.value} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-3"
                    />
                    <span className="text-sm text-text-secondary">{geo.label}</span>
                  </div>
                  <span className="text-xs text-text-secondary bg-background px-2 py-1 rounded-full">
                    {geo.count}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-6 border-t border-border">
            <button
              onClick={resetFilters}
              className="flex-1 px-4 py-2 bg-background border border-border rounded-md hover:bg-surface nav-transition touch-target"
            >
              Reset
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 nav-transition touch-target"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;