import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BrandProfile = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('6months');
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [searchParams] = useSearchParams();
  const brandId = searchParams.get('brand') || 'nike';

  // Mock brand data
  const brandData = {
    nike: {
      id: 'nike',
      name: 'Nike',
      logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop&crop=center',
      website: 'nike.com',
      industry: ['Athletic Apparel', 'Footwear', 'Sports Equipment'],
      description: `Nike, Inc. is an American multinational corporation that is engaged in the design, development, manufacturing, and worldwide marketing and sales of footwear, apparel, equipment, accessories, and services.

The company is headquartered near Beaverton, Oregon, in the Portland metropolitan area. It is the world's largest supplier of athletic shoes and apparel and a major manufacturer of sports equipment.`,
      monthlySpend: 2450000,
      growthRate: 15.3,
      marketPosition: 2,
      totalSpend: 29400000,
      avgCPC: 1.24,
      impressions: 145000000,
      clicks: 8900000,
      conversions: 234000
    }
  };

  const currentBrand = brandData[brandId] || brandData.nike;

  // Mock spend trends data
  const spendTrendsData = [
    { month: 'Jan', spend: 1800000, facebook: 720000, google: 900000, tiktok: 180000 },
    { month: 'Feb', spend: 2100000, facebook: 840000, google: 1050000, tiktok: 210000 },
    { month: 'Mar', spend: 2300000, facebook: 920000, google: 1150000, tiktok: 230000 },
    { month: 'Apr', spend: 2450000, facebook: 980000, google: 1225000, tiktok: 245000 },
    { month: 'May', spend: 2200000, facebook: 880000, google: 1100000, tiktok: 220000 },
    { month: 'Jun', spend: 2650000, facebook: 1060000, google: 1325000, tiktok: 265000 }
  ];

  // Mock platform breakdown data
  const platformData = [
    { name: 'Google Ads', value: 1325000, color: '#4285F4' },
    { name: 'Facebook', value: 1060000, color: '#1877F2' },
    { name: 'TikTok', value: 265000, color: '#000000' }
  ];

  // Mock campaigns data
  const campaignsData = [
    {
      id: 1,
      name: 'Summer Running Collection',
      platform: 'Facebook',
      spend: 145000,
      impressions: 2400000,
      clicks: 48000,
      ctr: 2.0,
      status: 'Active',
      creative: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=200&fit=crop',
      message: `Get ready to conquer your summer runs with Nike's latest collection. Lightweight, breathable, and designed for performance.

Shop now and save 20% on select running shoes and apparel.`
    },
    {
      id: 2,
      name: 'Air Max Lifestyle Campaign',
      platform: 'Google',spend: 198000,impressions: 1800000,clicks: 36000,ctr: 2.0,status: 'Active',creative: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=200&fit=crop',
      message: `Step into comfort and style with the iconic Air Max collection. Classic design meets modern innovation.

Available in new colorways. Free shipping on orders over $75.`
    }
  ];

  // Mock competitors data
  const competitorsData = [
    {
      id: 1,
      name: 'Adidas',
      logo: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=60&h=60&fit=crop',
      monthlySpend: 2100000,
      growthRate: 12.8,
      marketShare: 18.5,
      similarity: 92
    },
    {
      id: 2,
      name: 'Under Armour',
      logo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=60&h=60&fit=crop',
      monthlySpend: 890000,
      growthRate: 8.4,
      marketShare: 7.2,
      similarity: 78
    },
    {
      id: 3,
      name: 'Puma',
      logo: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=60&h=60&fit=crop',
      monthlySpend: 1200000,
      growthRate: -2.1,
      marketShare: 9.8,
      similarity: 85
    }
  ];

  // Mock alerts data
  const alertsData = [
    {
      id: 1,
      type: 'spend_threshold',
      title: 'Monthly Spend Threshold',
      description: 'Alert when monthly spend exceeds $3M',
      threshold: 3000000,
      enabled: true
    },
    {
      id: 2,
      type: 'growth_rate',
      title: 'Growth Rate Alert',
      description: 'Alert when growth rate drops below 10%',
      threshold: 10,
      enabled: false
    },
    {
      id: 3,
      type: 'competitor_activity',
      title: 'Competitor Activity',
      description: 'Alert when competitors increase spend by 20%+',
      threshold: 20,
      enabled: true
    }
  ];

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard', isActive: false },
    { label: 'Brand Discovery', path: '/brand-discovery', isActive: false },
    { label: currentBrand.name, path: `/brand-profile?brand=${brandId}`, isActive: true }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleWatchlistToggle = () => {
    setIsWatchlisted(!isWatchlisted);
  };

  const handleExportData = () => {
    // Simulate data export
    const exportData = {
      brand: currentBrand.name,
      exportDate: new Date().toISOString(),
      data: {
        monthlySpend: currentBrand.monthlySpend,
        growthRate: currentBrand.growthRate,
        spendTrends: spendTrendsData,
        campaigns: campaignsData
      }
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentBrand.name.toLowerCase()}-profile-data.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSidebarToggle={handleSidebarToggle} sidebarCollapsed={sidebarCollapsed} />
      <Sidebar collapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />
      
      <main className={`pt-16 nav-transition ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
        <div className="p-6">
          <Breadcrumb customItems={breadcrumbItems} />
          
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="xl:col-span-3 space-y-6">
              {/* Brand Header */}
              <div className="bg-surface border border-border rounded-lg p-6 elevation-sm">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-background flex-shrink-0">
                      <Image
                        src={currentBrand.logo}
                        alt={`${currentBrand.name} logo`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h1 className="text-2xl font-bold text-text-primary mb-2">
                        {currentBrand.name}
                      </h1>
                      <a
                        href={`https://${currentBrand.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-primary nav-transition inline-flex items-center mb-3"
                      >
                        <Icon name="ExternalLink" size={16} className="mr-1" />
                        {currentBrand.website}
                      </a>
                      <div className="flex flex-wrap gap-2">
                        {currentBrand.industry.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Key Metrics Cards */}
                  <div className="grid grid-cols-3 gap-4 lg:min-w-0 lg:flex-shrink-0">
                    <div className="text-center p-4 bg-background rounded-lg">
                      <div className="text-2xl font-bold text-text-primary">
                        {formatCurrency(currentBrand.monthlySpend)}
                      </div>
                      <div className="text-sm text-text-secondary">Monthly Spend</div>
                    </div>
                    <div className="text-center p-4 bg-background rounded-lg">
                      <div className="text-2xl font-bold text-accent">
                        +{currentBrand.growthRate}%
                      </div>
                      <div className="text-sm text-text-secondary">Growth Rate</div>
                    </div>
                    <div className="text-center p-4 bg-background rounded-lg">
                      <div className="text-2xl font-bold text-text-primary">
                        #{currentBrand.marketPosition}
                      </div>
                      <div className="text-sm text-text-secondary">Market Rank</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs Navigation */}
              <div className="bg-surface border border-border rounded-lg overflow-hidden">
                <div className="border-b border-border">
                  <nav className="flex space-x-8 px-6">
                    {[
                      { id: 'overview', label: 'Overview', icon: 'BarChart3' },
                      { id: 'campaigns', label: 'Campaigns', icon: 'Target' },
                      { id: 'competitors', label: 'Competitors', icon: 'Users' },
                      { id: 'alerts', label: 'Alerts', icon: 'Bell' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                          flex items-center space-x-2 py-4 border-b-2 nav-transition touch-target
                          ${activeTab === tab.id
                            ? 'border-accent text-accent' :'border-transparent text-text-secondary hover:text-text-primary'
                          }
                        `}
                      >
                        <Icon name={tab.icon} size={18} />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      {/* Date Range Selector */}
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-text-primary">
                          Spend Trends & Analytics
                        </h3>
                        <select
                          value={dateRange}
                          onChange={(e) => setDateRange(e.target.value)}
                          className="px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                        >
                          <option value="3months">Last 3 Months</option>
                          <option value="6months">Last 6 Months</option>
                          <option value="12months">Last 12 Months</option>
                        </select>
                      </div>

                      {/* Spend Trends Chart */}
                      <div className="bg-background rounded-lg p-4">
                        <h4 className="text-md font-medium text-text-primary mb-4">
                          Monthly Ad Spend Trends
                        </h4>
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={spendTrendsData}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                              <XAxis dataKey="month" stroke="#4a5568" />
                              <YAxis 
                                stroke="#4a5568"
                                tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                              />
                              <Tooltip
                                formatter={(value, name) => [formatCurrency(value), name]}
                                labelStyle={{ color: '#1a202c' }}
                                contentStyle={{
                                  backgroundColor: '#ffffff',
                                  border: '1px solid #e2e8f0',
                                  borderRadius: '6px'
                                }}
                              />
                              <Legend />
                              <Line
                                type="monotone"
                                dataKey="spend"
                                stroke="#38a169"
                                strokeWidth={3}
                                dot={{ fill: '#38a169', strokeWidth: 2, r: 4 }}
                                name="Total Spend"
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Platform Breakdown */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-background rounded-lg p-4">
                          <h4 className="text-md font-medium text-text-primary mb-4">
                            Platform Breakdown
                          </h4>
                          <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={platformData}
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={80}
                                  dataKey="value"
                                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                  {platformData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                                </Pie>
                                <Tooltip formatter={(value) => formatCurrency(value)} />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        <div className="bg-background rounded-lg p-4">
                          <h4 className="text-md font-medium text-text-primary mb-4">
                            Performance Metrics
                          </h4>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-text-secondary">Total Impressions</span>
                              <span className="font-semibold text-text-primary">
                                {formatNumber(currentBrand.impressions)}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-text-secondary">Total Clicks</span>
                              <span className="font-semibold text-text-primary">
                                {formatNumber(currentBrand.clicks)}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-text-secondary">Conversions</span>
                              <span className="font-semibold text-text-primary">
                                {formatNumber(currentBrand.conversions)}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-text-secondary">Avg. CPC</span>
                              <span className="font-semibold text-text-primary">
                                ${currentBrand.avgCPC}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'campaigns' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-text-primary">
                        Active Campaigns
                      </h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {campaignsData.map((campaign) => (
                          <div key={campaign.id} className="bg-background rounded-lg p-4 border border-border">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h4 className="font-semibold text-text-primary mb-1">
                                  {campaign.name}
                                </h4>
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm text-text-secondary">
                                    {campaign.platform}
                                  </span>
                                  <span className={`
                                    px-2 py-1 text-xs rounded-full
                                    ${campaign.status === 'Active' ?'bg-accent/10 text-accent' :'bg-text-secondary/10 text-text-secondary'
                                    }
                                  `}>
                                    {campaign.status}
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold text-text-primary">
                                  {formatCurrency(campaign.spend)}
                                </div>
                                <div className="text-sm text-text-secondary">Spend</div>
                              </div>
                            </div>
                            
                            <div className="mb-4 rounded-lg overflow-hidden">
                              <Image
                                src={campaign.creative}
                                alt={`${campaign.name} creative`}
                                className="w-full h-32 object-cover"
                              />
                            </div>
                            
                            <div className="mb-4">
                              <p className="text-sm text-text-secondary whitespace-pre-line">
                                {campaign.message}
                              </p>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4 text-center">
                              <div>
                                <div className="font-semibold text-text-primary">
                                  {formatNumber(campaign.impressions)}
                                </div>
                                <div className="text-xs text-text-secondary">Impressions</div>
                              </div>
                              <div>
                                <div className="font-semibold text-text-primary">
                                  {formatNumber(campaign.clicks)}
                                </div>
                                <div className="text-xs text-text-secondary">Clicks</div>
                              </div>
                              <div>
                                <div className="font-semibold text-text-primary">
                                  {campaign.ctr}%
                                </div>
                                <div className="text-xs text-text-secondary">CTR</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'competitors' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-text-primary">
                        Similar Brands & Competitors
                      </h3>
                      <div className="space-y-4">
                        {competitorsData.map((competitor) => (
                          <div key={competitor.id} className="bg-background rounded-lg p-4 border border-border">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface">
                                  <Image
                                    src={competitor.logo}
                                    alt={`${competitor.name} logo`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-text-primary">
                                    {competitor.name}
                                  </h4>
                                  <div className="text-sm text-text-secondary">
                                    {competitor.similarity}% similarity
                                  </div>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-3 gap-6 text-center">
                                <div>
                                  <div className="font-semibold text-text-primary">
                                    {formatCurrency(competitor.monthlySpend)}
                                  </div>
                                  <div className="text-xs text-text-secondary">Monthly Spend</div>
                                </div>
                                <div>
                                  <div className={`font-semibold ${
                                    competitor.growthRate > 0 ? 'text-accent' : 'text-error'
                                  }`}>
                                    {competitor.growthRate > 0 ? '+' : ''}{competitor.growthRate}%
                                  </div>
                                  <div className="text-xs text-text-secondary">Growth</div>
                                </div>
                                <div>
                                  <div className="font-semibold text-text-primary">
                                    {competitor.marketShare}%
                                  </div>
                                  <div className="text-xs text-text-secondary">Market Share</div>
                                </div>
                              </div>
                              
                              <Link
                                to={`/brand-profile?brand=${competitor.name.toLowerCase()}`}
                                className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 nav-transition touch-target"
                              >
                                View Profile
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'alerts' && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-text-primary">
                          Alert Configuration
                        </h3>
                        <button className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 nav-transition touch-target">
                          Add New Alert
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        {alertsData.map((alert) => (
                          <div key={alert.id} className="bg-background rounded-lg p-4 border border-border">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h4 className="font-semibold text-text-primary mb-1">
                                  {alert.title}
                                </h4>
                                <p className="text-sm text-text-secondary mb-2">
                                  {alert.description}
                                </p>
                                <div className="text-sm text-text-secondary">
                                  Threshold: {alert.type === 'spend_threshold' 
                                    ? formatCurrency(alert.threshold)
                                    : `${alert.threshold}%`
                                  }
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-4">
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={alert.enabled}
                                    onChange={() => {
                                      // Handle alert toggle
                                      console.log(`Toggle alert ${alert.id}`);
                                    }}
                                    className="sr-only peer"
                                  />
                                  <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                                </label>
                                
                                <button className="p-2 text-text-secondary hover:text-text-primary nav-transition">
                                  <Icon name="Settings" size={18} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="xl:col-span-1 space-y-6">
              {/* Action Buttons */}
              <div className="bg-surface border border-border rounded-lg p-4 elevation-sm">
                <h3 className="font-semibold text-text-primary mb-4">Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={handleWatchlistToggle}
                    className={`
                      w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-md nav-transition touch-target
                      ${isWatchlisted
                        ? 'bg-accent text-white hover:bg-accent/90' :'bg-background text-text-primary hover:bg-border'
                      }
                    `}
                  >
                    <Icon name={isWatchlisted ? 'Heart' : 'HeartOff'} size={18} />
                    <span>{isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}</span>
                  </button>
                  
                  <button
                    onClick={handleExportData}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-background text-text-primary rounded-md hover:bg-border nav-transition touch-target"
                  >
                    <Icon name="Download" size={18} />
                    <span>Export Data</span>
                  </button>
                  
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-background text-text-primary rounded-md hover:bg-border nav-transition touch-target">
                    <Icon name="Share" size={18} />
                    <span>Share Insights</span>
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-surface border border-border rounded-lg p-4 elevation-sm">
                <h3 className="font-semibold text-text-primary mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Total Annual Spend</span>
                    <span className="font-semibold text-text-primary">
                      {formatCurrency(currentBrand.totalSpend)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Avg. Monthly Growth</span>
                    <span className="font-semibold text-accent">
                      +{currentBrand.growthRate}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Industry Rank</span>
                    <span className="font-semibold text-text-primary">
                      #{currentBrand.marketPosition} of 50
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Conversion Rate</span>
                    <span className="font-semibold text-text-primary">
                      {((currentBrand.conversions / currentBrand.clicks) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Brand Description */}
              <div className="bg-surface border border-border rounded-lg p-4 elevation-sm">
                <h3 className="font-semibold text-text-primary mb-4">About {currentBrand.name}</h3>
                <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
                  {currentBrand.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BrandProfile;