import React from 'react';
import Icon from 'components/AppIcon';

const FilterChips = ({ filters, onFilterChange, onClearAll, activeCount }) => {
  const formatSpendRange = (min, max) => {
    const formatAmount = (amount) => {
      if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
      if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
      return `$${amount}`;
    };
    
    if (min === 0 && max === 1000000) return null;
    return `${formatAmount(min)} - ${formatAmount(max)}`;
  };

  const formatGrowthRange = (min, max) => {
    if (min === -100 && max === 500) return null;
    return `${min}% - ${max}%`;
  };

  const removeIndustry = (industry) => {
    onFilterChange({
      ...filters,
      industries: filters.industries.filter(i => i !== industry)
    });
  };

  const removePlatform = (platform) => {
    onFilterChange({
      ...filters,
      platforms: filters.platforms.filter(p => p !== platform)
    });
  };

  const removeGeography = (geo) => {
    onFilterChange({
      ...filters,
      geography: filters.geography.filter(g => g !== geo)
    });
  };

  const resetSpendRange = () => {
    onFilterChange({
      ...filters,
      spendRange: { min: 0, max: 1000000 }
    });
  };

  const resetGrowthRange = () => {
    onFilterChange({
      ...filters,
      growthRate: { min: -100, max: 500 }
    });
  };

  const hasActiveFilters = activeCount > 0;

  if (!hasActiveFilters) {
    return null;
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-text-primary">
          Active Filters ({activeCount})
        </h3>
        <button
          onClick={onClearAll}
          className="text-sm text-accent hover:text-primary nav-transition"
        >
          Clear All
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Industry Chips */}
        {filters.industries.map((industry) => (
          <div
            key={industry}
            className="flex items-center px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
          >
            <Icon name="Tag" size={14} className="mr-1" />
            <span>{industry}</span>
            <button
              onClick={() => removeIndustry(industry)}
              className="ml-2 hover:text-accent/80 nav-transition"
            >
              <Icon name="X" size={12} />
            </button>
          </div>
        ))}

        {/* Platform Chips */}
        {filters.platforms.map((platform) => (
          <div
            key={platform}
            className="flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
          >
            <Icon name="Globe" size={14} className="mr-1" />
            <span>{platform}</span>
            <button
              onClick={() => removePlatform(platform)}
              className="ml-2 hover:text-primary/80 nav-transition"
            >
              <Icon name="X" size={12} />
            </button>
          </div>
        ))}

        {/* Geography Chips */}
        {filters.geography.map((geo) => (
          <div
            key={geo}
            className="flex items-center px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm"
          >
            <Icon name="MapPin" size={14} className="mr-1" />
            <span>{geo}</span>
            <button
              onClick={() => removeGeography(geo)}
              className="ml-2 hover:text-secondary/80 nav-transition"
            >
              <Icon name="X" size={12} />
            </button>
          </div>
        ))}

        {/* Spend Range Chip */}
        {formatSpendRange(filters.spendRange.min, filters.spendRange.max) && (
          <div className="flex items-center px-3 py-1 bg-success/10 text-success rounded-full text-sm">
            <Icon name="DollarSign" size={14} className="mr-1" />
            <span>Spend: {formatSpendRange(filters.spendRange.min, filters.spendRange.max)}</span>
            <button
              onClick={resetSpendRange}
              className="ml-2 hover:text-success/80 nav-transition"
            >
              <Icon name="X" size={12} />
            </button>
          </div>
        )}

        {/* Growth Range Chip */}
        {formatGrowthRange(filters.growthRate.min, filters.growthRate.max) && (
          <div className="flex items-center px-3 py-1 bg-warning/10 text-warning rounded-full text-sm">
            <Icon name="TrendingUp" size={14} className="mr-1" />
            <span>Growth: {formatGrowthRange(filters.growthRate.min, filters.growthRate.max)}</span>
            <button
              onClick={resetGrowthRange}
              className="ml-2 hover:text-warning/80 nav-transition"
            >
              <Icon name="X" size={12} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterChips;