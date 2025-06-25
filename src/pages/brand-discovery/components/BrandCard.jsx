import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const BrandCard = ({ brand, onClick, onWatchlistToggle }) => {
  const [imageError, setImageError] = useState(false);

  const formatSpend = (amount) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount}`;
  };

  const getGrowthColor = (rate) => {
    if (rate > 20) return 'text-success';
    if (rate > 0) return 'text-warning';
    return 'text-error';
  };

  const getPlatformIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return 'Facebook';
      case 'instagram':
        return 'Instagram';
      case 'google':
        return 'Search';
      case 'tiktok':
        return 'Video';
      case 'youtube':
        return 'Youtube';
      case 'pinterest':
        return 'Image';
      default:
        return 'Globe';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 hover:elevation-md nav-transition cursor-pointer group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4 flex-1" onClick={onClick}>
          <div className="w-12 h-12 bg-background rounded-lg overflow-hidden flex-shrink-0">
            {!imageError ? (
              <Image
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/10">
                <span className="text-primary font-semibold text-sm">
                  {brand.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-text-primary group-hover:text-accent nav-transition truncate">
              {brand.name}
            </h3>
            <p className="text-sm text-text-secondary truncate">
              {brand.industry}
            </p>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onWatchlistToggle(brand.id);
          }}
          className={`p-2 rounded-md nav-transition touch-target ${
            brand.isWatched 
              ? 'text-accent hover:text-accent/80' :'text-text-secondary hover:text-accent'
          }`}
          aria-label={brand.isWatched ? 'Remove from watchlist' : 'Add to watchlist'}
        >
          <Icon 
            name={brand.isWatched ? 'BookmarkCheck' : 'Bookmark'} 
            size={18} 
          />
        </button>
      </div>

      {/* Metrics */}
      <div className="space-y-3 mb-4" onClick={onClick}>
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Monthly Spend</span>
          <span className="font-semibold text-text-primary">
            {formatSpend(brand.monthlySpend)}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Growth Rate</span>
          <div className="flex items-center space-x-1">
            <Icon 
              name={brand.growthRate > 0 ? 'TrendingUp' : 'TrendingDown'} 
              size={14} 
              className={getGrowthColor(brand.growthRate)}
            />
            <span className={`font-semibold ${getGrowthColor(brand.growthRate)}`}>
              {brand.growthRate > 0 ? '+' : ''}{brand.growthRate.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* Platforms */}
      <div className="mb-4" onClick={onClick}>
        <p className="text-sm text-text-secondary mb-2">Active Platforms</p>
        <div className="flex items-center space-x-2">
          {brand.platforms.slice(0, 4).map((platform, index) => (
            <div
              key={index}
              className="w-8 h-8 bg-background rounded-md flex items-center justify-center"
              title={platform}
            >
              <Icon 
                name={getPlatformIcon(platform)} 
                size={14} 
                className="text-text-secondary"
              />
            </div>
          ))}
          {brand.platforms.length > 4 && (
            <div className="w-8 h-8 bg-background rounded-md flex items-center justify-center">
              <span className="text-xs text-text-secondary font-medium">
                +{brand.platforms.length - 4}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="mb-4" onClick={onClick}>
        <p className="text-sm text-text-secondary line-clamp-2">
          {brand.description}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2 pt-4 border-t border-border">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="flex-1 px-3 py-2 bg-accent text-white rounded-md hover:bg-accent/90 nav-transition text-sm font-medium touch-target"
        >
          View Profile
        </button>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            // Handle quick add to comparison
            console.log('Add to comparison:', brand.id);
          }}
          className="px-3 py-2 bg-background border border-border rounded-md hover:bg-surface nav-transition touch-target"
          title="Add to comparison"
        >
          <Icon name="BarChart3" size={16} />
        </button>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            // Handle export brand data
            console.log('Export brand data:', brand.id);
          }}
          className="px-3 py-2 bg-background border border-border rounded-md hover:bg-surface nav-transition touch-target"
          title="Export data"
        >
          <Icon name="Download" size={16} />
        </button>
      </div>

      {/* Last Updated */}
      <div className="mt-3 pt-3 border-t border-border" onClick={onClick}>
        <p className="text-xs text-text-secondary">
          Updated {new Date(brand.lastUpdated).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default BrandCard;