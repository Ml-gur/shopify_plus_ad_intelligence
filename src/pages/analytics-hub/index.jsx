import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';
import ChartWidget from './components/ChartWidget';
import FilterPanel from './components/FilterPanel';
import ChartToolbar from './components/ChartToolbar';
import ExportModal from './components/ExportModal';
import ChartPresets from './components/ChartPresets';

const AnalyticsHub = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [presetsModalOpen, setPresetsModalOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('30d');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedPlatforms, setSelectedPlatforms] = useState(['all']);
  const [spendThreshold, setSpendThreshold] = useState({ min: 0, max: 1000000 });
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  // Mock chart configurations
  const [chartWidgets, setChartWidgets] = useState([
    {
      id: 'spend-trends',
      type: 'line',
      title: 'Ad Spend Trends',
      size: 'large',
      position: { x: 0, y: 0 },
      config: {
        showTooltip: true,
        showLegend: true,
        enableZoom: true
      }
    },
    {
      id: 'platform-comparison',
      type: 'bar',
      title: 'Platform Spend Comparison',
      size: 'medium',
      position: { x: 1, y: 0 },
      config: {
        showTooltip: true,
        showLegend: true,
        enableZoom: false
      }
    },
    {
      id: 'market-share',
      type: 'pie',
      title: 'Market Share Analysis',
      size: 'medium',
      position: { x: 0, y: 1 },
      config: {
        showTooltip: true,
        showLegend: true,
        enableZoom: false
      }
    },
    {
      id: 'seasonal-patterns',
      type: 'heatmap',
      title: 'Seasonal Spending Patterns',
      size: 'large',
      position: { x: 1, y: 1 },
      config: {
        showTooltip: true,
        showLegend: false,
        enableZoom: true
      }
    }
  ]);

  // Mock data for charts
  const mockChartData = {
    'spend-trends': {
      data: [
        { date: '2024-01-01', facebook: 45000, google: 38000, tiktok: 12000, total: 95000 },
        { date: '2024-01-02', facebook: 48000, google: 41000, tiktok: 15000, total: 104000 },
        { date: '2024-01-03', facebook: 52000, google: 39000, tiktok: 18000, total: 109000 },
        { date: '2024-01-04', facebook: 49000, google: 43000, tiktok: 16000, total: 108000 },
        { date: '2024-01-05', facebook: 55000, google: 45000, tiktok: 20000, total: 120000 },
        { date: '2024-01-06', facebook: 58000, google: 47000, tiktok: 22000, total: 127000 },
        { date: '2024-01-07', facebook: 61000, google: 49000, tiktok: 25000, total: 135000 }
      ],
      metrics: {
        totalSpend: 135000,
        growth: 12.5,
        topPlatform: 'Facebook'
      }
    },
    'platform-comparison': {
      data: [
        { platform: 'Facebook', spend: 61000, percentage: 45.2, growth: 8.5 },
        { platform: 'Google', spend: 49000, percentage: 36.3, growth: 5.2 },
        { platform: 'TikTok', spend: 25000, percentage: 18.5, growth: 25.8 }
      ],
      metrics: {
        totalPlatforms: 3,
        leadingPlatform: 'Facebook',
        fastestGrowing: 'TikTok'
      }
    },
    'market-share': {
      data: [
        { brand: 'Nike', share: 28.5, spend: 385000, color: '#1f77b4' },
        { brand: 'Adidas', share: 22.3, spend: 301000, color: '#ff7f0e' },
        { brand: 'Under Armour', share: 15.8, spend: 213000, color: '#2ca02c' },
        { brand: 'Puma', share: 12.4, spend: 167000, color: '#d62728' },
        { brand: 'Others', share: 21.0, spend: 284000, color: '#9467bd' }
      ],
      metrics: {
        totalBrands: 5,
        marketLeader: 'Nike',
        concentration: 'High'
      }
    },
    'seasonal-patterns': {
      data: [
        { month: 'Jan', week1: 85000, week2: 92000, week3: 88000, week4: 95000 },
        { month: 'Feb', week1: 78000, week2: 85000, week3: 82000, week4: 89000 },
        { month: 'Mar', week1: 95000, week2: 102000, week3: 98000, week4: 105000 },
        { month: 'Apr', week1: 88000, week2: 95000, week3: 92000, week4: 99000 },
        { month: 'May', week1: 102000, week2: 109000, week3: 105000, week4: 112000 },
        { month: 'Jun', week1: 98000, week2: 105000, week3: 102000, week4: 108000 }
      ],
      metrics: {
        peakMonth: 'May',
        lowMonth: 'February',
        seasonality: 'Strong'
      }
    }
  };

  const savedPresets = [
    {
      id: 'quarterly-review',
      name: 'Quarterly Review',
      description: 'Comprehensive quarterly performance analysis',
      widgets: ['spend-trends', 'platform-comparison', 'market-share'],
      filters: {
        dateRange: '90d',
        industry: 'all',
        platforms: ['all']
      }
    },
    {
      id: 'competitive-analysis',
      name: 'Competitive Analysis',
      description: 'Focus on market positioning and competitor insights',
      widgets: ['market-share', 'seasonal-patterns'],
      filters: {
        dateRange: '30d',
        industry: 'fashion',
        platforms: ['facebook', 'google']
      }
    },
    {
      id: 'platform-performance',
      name: 'Platform Performance',
      description: 'Deep dive into platform-specific metrics',
      widgets: ['platform-comparison', 'spend-trends'],
      filters: {
        dateRange: '7d',
        industry: 'all',
        platforms: ['all']
      }
    }
  ];

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [selectedDateRange, selectedIndustry, selectedPlatforms, spendThreshold]);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleAddWidget = (widgetType) => {
    const newWidget = {
      id: `widget-${Date.now()}`,
      type: widgetType,
      title: `New ${widgetType.charAt(0).toUpperCase() + widgetType.slice(1)} Chart`,
      size: 'medium',
      position: { x: 0, y: chartWidgets.length },
      config: {
        showTooltip: true,
        showLegend: true,
        enableZoom: widgetType === 'line' || widgetType === 'heatmap'
      }
    };
    setChartWidgets([...chartWidgets, newWidget]);
  };

  const handleRemoveWidget = (widgetId) => {
    setChartWidgets(chartWidgets.filter(widget => widget.id !== widgetId));
  };

  const handleWidgetResize = (widgetId, newSize) => {
    setChartWidgets(chartWidgets.map(widget =>
      widget.id === widgetId ? { ...widget, size: newSize } : widget
    ));
  };

  const handleWidgetConfigUpdate = (widgetId, newConfig) => {
    setChartWidgets(chartWidgets.map(widget =>
      widget.id === widgetId ? { ...widget, config: { ...widget.config, ...newConfig } } : widget
    ));
  };

  const handlePresetLoad = (preset) => {
    setChartWidgets(chartWidgets.filter(widget => preset.widgets.includes(widget.id)));
    setSelectedDateRange(preset.filters.dateRange);
    setSelectedIndustry(preset.filters.industry);
    setSelectedPlatforms(preset.filters.platforms);
    setPresetsModalOpen(false);
  };

  const getWidgetData = (widgetId) => {
    return mockChartData[widgetId] || { data: [], metrics: {} };
  };

  const getGridClass = (size) => {
    switch (size) {
      case 'small':
        return 'col-span-12 md:col-span-6 lg:col-span-4';
      case 'medium':
        return 'col-span-12 md:col-span-6 lg:col-span-6';
      case 'large':
        return 'col-span-12 lg:col-span-8';
      case 'full':
        return 'col-span-12';
      default:
        return 'col-span-12 md:col-span-6 lg:col-span-6';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSidebarToggle={handleSidebarToggle} sidebarCollapsed={sidebarCollapsed} />
      <Sidebar collapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />
      
      <main className={`pt-16 nav-transition ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
        <div className="p-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">Analytics Hub</h1>
              <p className="text-text-secondary">
                Advanced data visualization and market intelligence dashboard
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <button
                onClick={() => setPresetsModalOpen(true)}
                className="flex items-center px-4 py-2 bg-background border border-border rounded-md hover:bg-surface nav-transition touch-target"
              >
                <Icon name="Bookmark" size={18} className="mr-2" />
                Presets
              </button>
              
              <button
                onClick={() => setFilterPanelOpen(true)}
                className="flex items-center px-4 py-2 bg-background border border-border rounded-md hover:bg-surface nav-transition touch-target"
              >
                <Icon name="Filter" size={18} className="mr-2" />
                Filters
              </button>
              
              <button
                onClick={() => setExportModalOpen(true)}
                className="flex items-center px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 nav-transition touch-target"
              >
                <Icon name="Download" size={18} className="mr-2" />
                Export
              </button>
            </div>
          </div>

          {/* Chart Toolbar */}
          <ChartToolbar
            selectedDateRange={selectedDateRange}
            onDateRangeChange={setSelectedDateRange}
            selectedIndustry={selectedIndustry}
            onIndustryChange={setSelectedIndustry}
            selectedPlatforms={selectedPlatforms}
            onPlatformsChange={setSelectedPlatforms}
            onAddWidget={handleAddWidget}
            isLoading={isLoading}
          />

          {/* Charts Grid */}
          {isLoading ? (
            <div className="grid grid-cols-12 gap-6">
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="col-span-12 md:col-span-6 lg:col-span-6">
                  <div className="bg-surface border border-border rounded-lg p-6 elevation-sm">
                    <div className="animate-pulse">
                      <div className="h-4 bg-background rounded mb-4 w-1/3"></div>
                      <div className="h-64 bg-background rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-6">
              {chartWidgets.map((widget) => (
                <div key={widget.id} className={getGridClass(widget.size)}>
                  <ChartWidget
                    widget={widget}
                    data={getWidgetData(widget.id)}
                    onRemove={() => handleRemoveWidget(widget.id)}
                    onResize={(newSize) => handleWidgetResize(widget.id, newSize)}
                    onConfigUpdate={(newConfig) => handleWidgetConfigUpdate(widget.id, newConfig)}
                  />
                </div>
              ))}
              
              {chartWidgets.length === 0 && (
                <div className="col-span-12">
                  <div className="bg-surface border border-border rounded-lg p-12 text-center elevation-sm">
                    <Icon name="BarChart3" size={48} className="text-text-secondary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      No Charts Added
                    </h3>
                    <p className="text-text-secondary mb-6">
                      Start building your analytics dashboard by adding chart widgets
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                      {['line', 'bar', 'pie', 'heatmap'].map((type) => (
                        <button
                          key={type}
                          onClick={() => handleAddWidget(type)}
                          className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 nav-transition touch-target"
                        >
                          Add {type.charAt(0).toUpperCase() + type.slice(1)} Chart
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Filter Panel */}
      <FilterPanel
        isOpen={filterPanelOpen}
        onClose={() => setFilterPanelOpen(false)}
        selectedIndustry={selectedIndustry}
        onIndustryChange={setSelectedIndustry}
        selectedPlatforms={selectedPlatforms}
        onPlatformsChange={setSelectedPlatforms}
        spendThreshold={spendThreshold}
        onSpendThresholdChange={setSpendThreshold}
        selectedDateRange={selectedDateRange}
        onDateRangeChange={setSelectedDateRange}
      />

      {/* Export Modal */}
      <ExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        chartWidgets={chartWidgets}
      />

      {/* Presets Modal */}
      <ChartPresets
        isOpen={presetsModalOpen}
        onClose={() => setPresetsModalOpen(false)}
        presets={savedPresets}
        onLoadPreset={handlePresetLoad}
      />
    </div>
  );
};

export default AnalyticsHub;