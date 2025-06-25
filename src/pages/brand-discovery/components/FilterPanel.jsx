import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const FilterPanel = ({ isOpen, onClose, filters, onFiltersChange, brandsData }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // Extract unique values from brands data
  const availableIndustries = [...new Set(brandsData.map(brand => brand.industry))].sort();
  const availablePlatforms = [...new Set(brandsData.flatMap(brand => brand.platforms))].sort();
  const availableGeography = [...new Set(brandsData.flatMap(brand => brand.geography))].sort();
  const availableCampaignTypes = [...new Set(brandsData.flatMap(brand => brand.campaignTypes))].sort();

  const handleIndustryToggle = (industry) => {
    const newIndustries = localFilters.industries.includes(industry)
      ? localFilters.industries.filter(i => i !== industry)
      : [...localFilters.industries, industry];
    
    setLocalFilters({
      ...localFilters,
      industries: newIndustries
    });
  };

  const handlePlatformToggle = (platform) => {
    const newPlatforms = localFilters.platforms.includes(platform)
      ? localFilters.platforms.filter(p => p !== platform)
      : [...localFilters.platforms, platform];
    
    setLocalFilters({
      ...localFilters,
      platforms: newPlatforms
    });
  };

  const handleGeographyToggle = (geo) => {
    const newGeography = localFilters.geography.includes(geo)
      ? localFilters.geography.filter(g => g !== geo)
      : [...localFilters.geography, geo];
    
    setLocalFilters({
      ...localFilters,
      geography: newGeography
    });
  };

  const handleCampaignTypeToggle = (type) => {
    const newTypes = localFilters.campaignTypes.includes(type)
      ? localFilters.campaignTypes.filter(t => t !== type)
      : [...localFilters.campaignTypes, type];
    
    setLocalFilters({
      ...localFilters,
      campaignTypes: newTypes
    });
  };

  const handleSpendRangeChange = (field, value) => {
    setLocalFilters({
      ...localFilters,
      spendRange: {
        ...localFilters.spendRange,
        [field]: parseInt(value)
      }
    });
  };

  const handleGrowthRateChange = (field, value) => {
    setLocalFilters({
      ...localFilters,
      growthRate: {
        ...localFilters.growthRate,
        [field]: parseInt(value)
      }
    });
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleResetFilters = () => {
    const resetFilters = {
      industries: [],
      spendRange: { min: 0, max: 1000000 },
      growthRate: { min: -100, max: 500 },
      platforms: [],
      geography: [],
      campaignTypes: []
    };
    setLocalFilters(resetFilters);
  };

  const formatSpendValue = (value) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value}`;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-1200"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-surface border-l border-border z-1300 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-surface border-b border-border p-6 z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text-primary">
              Advanced Filters
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-background nav-transition touch-target"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Industries */}
          <div>
            <h3 className="font-medium text-text-primary mb-4">Industries</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {availableIndustries.map((industry) => (
                <label
                  key={industry}
                  className="flex items-center space-x-3 cursor-pointer hover:bg-background p-2 rounded-md nav-transition"
                >
                  <input
                    type="checkbox"
                    checked={localFilters.industries.includes(industry)}
                    onChange={() => handleIndustryToggle(industry)}
                    className="w-4 h-4 text-accent border-border rounded focus:ring-accent focus:ring-2"
                  />
                  <span className="text-text-primary">{industry}</span>
                  <span className="ml-auto text-xs text-text-secondary">
                    {brandsData.filter(brand => brand.industry === industry).length}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Spend Range */}
          <div>
            <h3 className="font-medium text-text-primary mb-4">Monthly Spend Range</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label className="block text-sm text-text-secondary mb-1">Min</label>
                  <input
                    type="number"
                    value={localFilters.spendRange.min}
                    onChange={(e) => handleSpendRangeChange('min', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    min="0"
                    max="1000000"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-text-secondary mb-1">Max</label>
                  <input
                    type="number"
                    value={localFilters.spendRange.max}
                    onChange={(e) => handleSpendRangeChange('max', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    min="0"
                    max="1000000"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-text-secondary">
                <span>{formatSpendValue(localFilters.spendRange.min)}</span>
                <span>{formatSpendValue(localFilters.spendRange.max)}</span>
              </div>
            </div>
          </div>

          {/* Growth Rate */}
          <div>
            <h3 className="font-medium text-text-primary mb-4">Growth Rate (%)</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label className="block text-sm text-text-secondary mb-1">Min %</label>
                  <input
                    type="number"
                    value={localFilters.growthRate.min}
                    onChange={(e) => handleGrowthRateChange('min', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    min="-100"
                    max="500"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-text-secondary mb-1">Max %</label>
                  <input
                    type="number"
                    value={localFilters.growthRate.max}
                    onChange={(e) => handleGrowthRateChange('max', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    min="-100"
                    max="500"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-text-secondary">
                <span>{localFilters.growthRate.min}%</span>
                <span>{localFilters.growthRate.max}%</span>
              </div>
            </div>
          </div>

          {/* Platforms */}
          <div>
            <h3 className="font-medium text-text-primary mb-4">Advertising Platforms</h3>
            <div className="grid grid-cols-2 gap-2">
              {availablePlatforms.map((platform) => (
                <label
                  key={platform}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-background p-2 rounded-md nav-transition"
                >
                  <input
                    type="checkbox"
                    checked={localFilters.platforms.includes(platform)}
                    onChange={() => handlePlatformToggle(platform)}
                    className="w-4 h-4 text-accent border-border rounded focus:ring-accent focus:ring-2"
                  />
                  <span className="text-sm text-text-primary">{platform}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Geography */}
          <div>
            <h3 className="font-medium text-text-primary mb-4">Geographic Markets</h3>
            <div className="grid grid-cols-3 gap-2">
              {availableGeography.map((geo) => (
                <label
                  key={geo}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-background p-2 rounded-md nav-transition"
                >
                  <input
                    type="checkbox"
                    checked={localFilters.geography.includes(geo)}
                    onChange={() => handleGeographyToggle(geo)}
                    className="w-4 h-4 text-accent border-border rounded focus:ring-accent focus:ring-2"
                  />
                  <span className="text-sm text-text-primary">{geo}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Campaign Types */}
          <div>
            <h3 className="font-medium text-text-primary mb-4">Campaign Types</h3>
            <div className="space-y-2">
              {availableCampaignTypes.map((type) => (
                <label
                  key={type}
                  className="flex items-center space-x-3 cursor-pointer hover:bg-background p-2 rounded-md nav-transition"
                >
                  <input
                    type="checkbox"
                    checked={localFilters.campaignTypes.includes(type)}
                    onChange={() => handleCampaignTypeToggle(type)}
                    className="w-4 h-4 text-accent border-border rounded focus:ring-accent focus:ring-2"
                  />
                  <span className="text-text-primary">{type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-surface border-t border-border p-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleResetFilters}
              className="flex-1 px-4 py-2 bg-background border border-border rounded-md hover:bg-surface nav-transition touch-target"
            >
              Reset All
            </button>
            <button
              onClick={handleApplyFilters}
              className="flex-1 px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 nav-transition touch-target"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;