import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';

import BrandCard from './components/BrandCard';
import FilterPanel from './components/FilterPanel';
import SearchBar from './components/SearchBar';
import FilterChips from './components/FilterChips';
import SortOptions from './components/SortOptions';

const BrandDiscovery = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [displayedBrands, setDisplayedBrands] = useState(12);
  const [sortBy, setSortBy] = useState('spend');
  const [filters, setFilters] = useState({
    industries: [],
    spendRange: { min: 0, max: 1000000 },
    growthRate: { min: -100, max: 500 },
    platforms: [],
    geography: [],
    campaignTypes: []
  });

  // Mock brand data
  const mockBrands = [
    {
      id: 1,
      name: "Allbirds",
      logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop&crop=center",
      industry: "Sustainable Fashion",
      monthlySpend: 245000,
      growthRate: 23.5,
      platforms: ["Facebook", "Google", "TikTok"],
      geography: ["US", "CA", "UK"],
      campaignTypes: ["Brand Awareness", "Conversion"],
      description: "Sustainable footwear and apparel brand focusing on eco-friendly materials",
      isWatched: false,
      lastUpdated: "2024-01-15"
    },
    {
      id: 2,
      name: "Gymshark",
      logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=center",
      industry: "Athletic Apparel",
      monthlySpend: 890000,
      growthRate: 45.2,
      platforms: ["Facebook", "Instagram", "YouTube"],
      geography: ["US", "UK", "AU"],
      campaignTypes: ["Influencer", "Performance"],
      description: "Fitness apparel and accessories brand with strong social media presence",
      isWatched: true,
      lastUpdated: "2024-01-14"
    },
    {
      id: 3,
      name: "Warby Parker",
      logo: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=100&h=100&fit=crop&crop=center",
      industry: "Eyewear",
      monthlySpend: 567000,
      growthRate: 18.7,
      platforms: ["Google", "Facebook", "Pinterest"],
      geography: ["US", "CA"],
      campaignTypes: ["Brand Awareness", "Retargeting"],
      description: "Direct-to-consumer eyewear brand disrupting traditional retail",
      isWatched: false,
      lastUpdated: "2024-01-13"
    },
    {
      id: 4,
      name: "Glossier",
      logo: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&h=100&fit=crop&crop=center",
      industry: "Beauty & Cosmetics",
      monthlySpend: 432000,
      growthRate: 31.4,
      platforms: ["Instagram", "TikTok", "Pinterest"],
      geography: ["US", "UK", "CA"],
      campaignTypes: ["Influencer", "UGC"],
      description: "Beauty brand built on social media with cult following",
      isWatched: true,
      lastUpdated: "2024-01-12"
    },
    {
      id: 5,
      name: "Casper",
      logo: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop&crop=center",
      industry: "Home & Living",
      monthlySpend: 678000,
      growthRate: 12.3,
      platforms: ["Google", "Facebook", "YouTube"],
      geography: ["US", "CA", "UK"],
      campaignTypes: ["Performance", "Brand Awareness"],
      description: "Sleep technology company revolutionizing mattress industry",
      isWatched: false,
      lastUpdated: "2024-01-11"
    },
    {
      id: 6,
      name: "Bombas",
      logo: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=100&h=100&fit=crop&crop=center",
      industry: "Apparel",
      monthlySpend: 234000,
      growthRate: 28.9,
      platforms: ["Facebook", "Google", "Instagram"],
      geography: ["US"],
      campaignTypes: ["Social Impact", "Performance"],
      description: "Sock company with social mission - one purchased, one donated",
      isWatched: false,
      lastUpdated: "2024-01-10"
    },
    {
      id: 7,
      name: "Ritual",
      logo: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=100&h=100&fit=crop&crop=center",
      industry: "Health & Wellness",
      monthlySpend: 345000,
      growthRate: 19.6,
      platforms: ["Facebook", "Google", "Pinterest"],
      geography: ["US", "CA"],
      campaignTypes: ["Education", "Performance"],
      description: "Vitamin and supplement brand focused on transparency",
      isWatched: true,
      lastUpdated: "2024-01-09"
    },
    {
      id: 8,
      name: "Away",
      logo: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop&crop=center",
      industry: "Travel & Luggage",
      monthlySpend: 456000,
      growthRate: 15.2,
      platforms: ["Instagram", "Facebook", "Google"],
      geography: ["US", "UK", "AU"],
      campaignTypes: ["Lifestyle", "Performance"],
      description: "Modern luggage brand with built-in technology features",
      isWatched: false,
      lastUpdated: "2024-01-08"
    },
    {
      id: 9,
      name: "Outdoor Voices",
      logo: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=100&h=100&fit=crop&crop=center",
      industry: "Athletic Apparel",
      monthlySpend: 189000,
      growthRate: 22.1,
      platforms: ["Instagram", "TikTok", "Facebook"],
      geography: ["US"],
      campaignTypes: ["Community", "Lifestyle"],
      description: "Activewear brand promoting recreational fitness culture",
      isWatched: false,
      lastUpdated: "2024-01-07"
    },
    {
      id: 10,
      name: "Patagonia",
      logo: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=100&h=100&fit=crop&crop=center",
      industry: "Outdoor Gear",
      monthlySpend: 567000,
      growthRate: 8.4,
      platforms: ["Google", "YouTube", "Facebook"],
      geography: ["US", "CA", "EU"],
      campaignTypes: ["Environmental", "Brand Awareness"],
      description: "Outdoor clothing company with strong environmental mission",
      isWatched: true,
      lastUpdated: "2024-01-06"
    },
    {
      id: 11,
      name: "Mejuri",
      logo: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&h=100&fit=crop&crop=center",
      industry: "Jewelry",
      monthlySpend: 298000,
      growthRate: 35.7,
      platforms: ["Instagram", "Pinterest", "Facebook"],
      geography: ["US", "CA", "UK"],
      campaignTypes: ["Lifestyle", "Influencer"],
      description: "Fine jewelry brand making luxury accessible for everyday wear",
      isWatched: false,
      lastUpdated: "2024-01-05"
    },
    {
      id: 12,
      name: "Brooklinen",
      logo: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop&crop=center",
      industry: "Home & Living",
      monthlySpend: 234000,
      growthRate: 16.8,
      platforms: ["Facebook", "Google", "Pinterest"],
      geography: ["US", "CA"],
      campaignTypes: ["Lifestyle", "Performance"],
      description: "Luxury bedding and home essentials at accessible prices",
      isWatched: false,
      lastUpdated: "2024-01-04"
    }
  ];

  // Filter and sort brands
  const filteredAndSortedBrands = useMemo(() => {
    let filtered = mockBrands.filter(brand => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!brand.name.toLowerCase().includes(query) && 
            !brand.industry.toLowerCase().includes(query) &&
            !brand.description.toLowerCase().includes(query)) {
          return false;
        }
      }

      // Industry filter
      if (filters.industries.length > 0 && !filters.industries.includes(brand.industry)) {
        return false;
      }

      // Spend range filter
      if (brand.monthlySpend < filters.spendRange.min || brand.monthlySpend > filters.spendRange.max) {
        return false;
      }

      // Growth rate filter
      if (brand.growthRate < filters.growthRate.min || brand.growthRate > filters.growthRate.max) {
        return false;
      }

      // Platform filter
      if (filters.platforms.length > 0 && !filters.platforms.some(platform => brand.platforms.includes(platform))) {
        return false;
      }

      // Geography filter
      if (filters.geography.length > 0 && !filters.geography.some(geo => brand.geography.includes(geo))) {
        return false;
      }

      return true;
    });

    // Sort brands
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'spend':
          return b.monthlySpend - a.monthlySpend;
        case 'growth':
          return b.growthRate - a.growthRate;
        case 'alphabetical':
          return a.name.localeCompare(b.name);
        case 'recent':
          return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        default:
          return 0;
      }
    });

    return filtered;
  }, [mockBrands, searchQuery, filters, sortBy]);

  const visibleBrands = filteredAndSortedBrands.slice(0, displayedBrands);

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      setSearchParams({ q: query });
    } else {
      setSearchParams({});
    }
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Handle load more
  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setDisplayedBrands(prev => Math.min(prev + 12, filteredAndSortedBrands.length));
      setLoadingMore(false);
    }, 500);
  };

  // Handle brand card click
  const handleBrandClick = (brandId) => {
    navigate(`/brand-profile?id=${brandId}`);
  };

  // Handle watchlist toggle
  const handleWatchlistToggle = (brandId) => {
    // In real app, this would update the backend
    console.log('Toggle watchlist for brand:', brandId);
  };

  // Get active filter count
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.industries.length > 0) count++;
    if (filters.spendRange.min > 0 || filters.spendRange.max < 1000000) count++;
    if (filters.growthRate.min > -100 || filters.growthRate.max < 500) count++;
    if (filters.platforms.length > 0) count++;
    if (filters.geography.length > 0) count++;
    return count;
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      industries: [],
      spendRange: { min: 0, max: 1000000 },
      growthRate: { min: -100, max: 500 },
      platforms: [],
      geography: [],
      campaignTypes: []
    });
  };

  // Scroll to top when filters change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [filters, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        sidebarCollapsed={sidebarCollapsed}
      />
      
      <Sidebar 
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <main className={`
        pt-16 min-h-screen data-transition
        ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}
      `}>
        <div className="p-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  Brand Discovery
                </h1>
                <p className="text-text-secondary">
                  Discover and analyze Shopify Plus brands for competitive intelligence
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilterPanel(true)}
                  className="flex items-center px-4 py-2 bg-surface border border-border rounded-md hover:bg-background nav-transition touch-target"
                >
                  <Icon name="Filter" size={18} className="mr-2" />
                  Filters
                  {getActiveFilterCount() > 0 && (
                    <span className="ml-2 px-2 py-1 bg-accent text-white text-xs rounded-full">
                      {getActiveFilterCount()}
                    </span>
                  )}
                </button>
                
                <button className="flex items-center px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 nav-transition touch-target">
                  <Icon name="Download" size={18} className="mr-2" />
                  Export
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <SearchBar 
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search brands, industries, or keywords..."
            />
          </div>

          {/* Filter Chips */}
          <FilterChips 
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearAll={clearAllFilters}
            activeCount={getActiveFilterCount()}
          />

          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <p className="text-text-secondary">
                {filteredAndSortedBrands.length} brands found
                {searchQuery && (
                  <span className="ml-1">
                    for "{searchQuery}"
                  </span>
                )}
              </p>
              
              {searchQuery && (
                <button
                  onClick={() => handleSearch('')}
                  className="text-accent hover:text-primary nav-transition"
                >
                  Clear search
                </button>
              )}
            </div>

            <SortOptions 
              value={sortBy}
              onChange={setSortBy}
            />
          </div>

          {/* Brand Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="bg-surface border border-border rounded-lg p-6 animate-pulse">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-background rounded-lg" />
                    <div className="flex-1">
                      <div className="h-4 bg-background rounded mb-2" />
                      <div className="h-3 bg-background rounded w-2/3" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 bg-background rounded" />
                    <div className="h-3 bg-background rounded w-3/4" />
                    <div className="flex space-x-2">
                      <div className="h-6 bg-background rounded w-16" />
                      <div className="h-6 bg-background rounded w-16" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredAndSortedBrands.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {visibleBrands.map((brand) => (
                  <BrandCard
                    key={brand.id}
                    brand={brand}
                    onClick={() => handleBrandClick(brand.id)}
                    onWatchlistToggle={() => handleWatchlistToggle(brand.id)}
                  />
                ))}
              </div>

              {/* Load More */}
              {displayedBrands < filteredAndSortedBrands.length && (
                <div className="text-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="px-8 py-3 bg-surface border border-border rounded-md hover:bg-background nav-transition touch-target disabled:opacity-50"
                  >
                    {loadingMore ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                        <span>Loading more brands...</span>
                      </div>
                    ) : (
                      `Load More (${filteredAndSortedBrands.length - displayedBrands} remaining)`
                    )}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-background rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Search" size={48} className="text-text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                No brands found
              </h3>
              <p className="text-text-secondary mb-6 max-w-md mx-auto">
                {searchQuery 
                  ? `No brands match your search for "${searchQuery}". Try adjusting your search terms or filters.`
                  : "No brands match your current filters. Try adjusting your criteria."
                }
              </p>
              <div className="flex items-center justify-center space-x-4">
                {searchQuery && (
                  <button
                    onClick={() => handleSearch('')}
                    className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 nav-transition touch-target"
                  >
                    Clear Search
                  </button>
                )}
                {getActiveFilterCount() > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="px-4 py-2 bg-surface border border-border rounded-md hover:bg-background nav-transition touch-target"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Filter Panel */}
      <FilterPanel
        isOpen={showFilterPanel}
        onClose={() => setShowFilterPanel(false)}
        filters={filters}
        onFiltersChange={handleFilterChange}
        brandsData={mockBrands}
      />
    </div>
  );
};

export default BrandDiscovery;