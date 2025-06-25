import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedDateRange, setSelectedDateRange] = useState('30d');

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Mock KPI data
  const kpiData = [
    {
      id: 1,
      title: "Total Ad Spend",
      value: "$2.4M",
      change: "+12.5%",
      trend: "up",
      icon: "DollarSign",
      description: "Last 30 days"
    },
    {
      id: 2,
      title: "Active Brands",
      value: "847",
      change: "+8.2%",
      trend: "up",
      icon: "Building2",
      description: "Tracked brands"
    },
    {
      id: 3,
      title: "Avg. Daily Spend",
      value: "$82K",
      change: "-3.1%",
      trend: "down",
      icon: "TrendingUp",
      description: "Per brand average"
    },
    {
      id: 4,
      title: "Growth Rate",
      value: "15.8%",
      change: "+2.4%",
      trend: "up",
      icon: "BarChart3",
      description: "Month over month"
    }
  ];

  // Mock spend trends data
  const spendTrendsData = [
    { month: 'Jan', spend: 1800000, brands: 720 },
    { month: 'Feb', spend: 1950000, brands: 745 },
    { month: 'Mar', spend: 2100000, brands: 780 },
    { month: 'Apr', spend: 2250000, brands: 810 },
    { month: 'May', spend: 2400000, brands: 847 },
    { month: 'Jun', spend: 2200000, brands: 835 }
  ];

  // Mock top brands data
  const topBrandsData = [
    {
      id: 1,
      name: "Allbirds",
      logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop&crop=center",
      spend: "$145K",
      growth: "+23.5%",
      trend: "up",
      category: "Footwear"
    },
    {
      id: 2,
      name: "Gymshark",
      logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=center",
      spend: "$132K",
      growth: "+18.2%",
      trend: "up",
      category: "Fitness Apparel"
    },
    {
      id: 3,
      name: "MVMT Watches",
      logo: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop&crop=center",
      spend: "$128K",
      growth: "+15.7%",
      trend: "up",
      category: "Accessories"
    },
    {
      id: 4,
      name: "Bombas",
      logo: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=100&h=100&fit=crop&crop=center",
      spend: "$119K",
      growth: "-2.1%",
      trend: "down",
      category: "Apparel"
    },
    {
      id: 5,
      name: "Warby Parker",
      logo: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=100&h=100&fit=crop&crop=center",
      spend: "$115K",
      growth: "+9.8%",
      trend: "up",
      category: "Eyewear"
    }
  ];

  // Mock recent activities
  const recentActivities = [
    {
      id: 1,
      type: "alert",
      title: "High spend detected",
      description: "Allbirds exceeded daily spend threshold",
      time: "2 minutes ago",
      icon: "AlertTriangle",
      color: "text-warning"
    },
    {
      id: 2,
      type: "discovery",
      title: "New brand discovered",
      description: "Outdoor Voices started advertising",
      time: "15 minutes ago",
      icon: "Search",
      color: "text-accent"
    },
    {
      id: 3,
      type: "growth",
      title: "Growth milestone",
      description: "Gymshark reached 20% growth rate",
      time: "1 hour ago",
      icon: "TrendingUp",
      color: "text-success"
    },
    {
      id: 4,
      type: "report",
      title: "Weekly report ready",
      description: "Competitive analysis report generated",
      time: "2 hours ago",
      icon: "FileText",
      color: "text-primary"
    }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-md p-3 elevation-md">
          <p className="font-medium text-text-primary mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-sm text-accent">
              Spend: {formatCurrency(payload[0].value)}
            </p>
            <p className="text-sm text-primary">
              Brands: {payload[1]?.value || 0}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header onSidebarToggle={handleSidebarToggle} sidebarCollapsed={sidebarCollapsed} />
        <Sidebar collapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />
        
        <main className={`pt-16 nav-transition ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
          <div className="p-6">
            <div className="animate-pulse">
              <div className="h-8 bg-border rounded mb-6 w-48"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-surface border border-border rounded-lg p-6">
                    <div className="h-4 bg-border rounded mb-4 w-24"></div>
                    <div className="h-8 bg-border rounded mb-2 w-20"></div>
                    <div className="h-3 bg-border rounded w-16"></div>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-surface border border-border rounded-lg p-6">
                  <div className="h-6 bg-border rounded mb-4 w-32"></div>
                  <div className="h-64 bg-border rounded"></div>
                </div>
                <div className="bg-surface border border-border rounded-lg p-6">
                  <div className="h-6 bg-border rounded mb-4 w-24"></div>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-border rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-border rounded mb-2 w-20"></div>
                          <div className="h-3 bg-border rounded w-16"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onSidebarToggle={handleSidebarToggle} sidebarCollapsed={sidebarCollapsed} />
      <Sidebar collapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />
      
      <main className={`pt-16 nav-transition ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
        <div className="p-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">Dashboard</h1>
              <p className="text-text-secondary">
                Monitor ad spend intelligence and track brand performance across platforms
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="px-3 py-2 bg-surface border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              
              <Link
                to="/brand-discovery"
                className="inline-flex items-center px-4 py-2 bg-accent text-white font-medium rounded-md hover:bg-accent/90 nav-transition touch-target"
              >
                <Icon name="Search" size={18} className="mr-2" />
                Discover Brands
              </Link>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiData.map((kpi) => (
              <div key={kpi.id} className="bg-surface border border-border rounded-lg p-6 elevation-sm hover:elevation-md nav-transition">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    kpi.trend === 'up' ? 'bg-accent/10' : 'bg-error/10'
                  }`}>
                    <Icon 
                      name={kpi.icon} 
                      size={24} 
                      className={kpi.trend === 'up' ? 'text-accent' : 'text-error'} 
                    />
                  </div>
                  <div className={`flex items-center space-x-1 text-sm font-medium ${
                    kpi.trend === 'up' ? 'text-accent' : 'text-error'
                  }`}>
                    <Icon 
                      name={kpi.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                      size={16} 
                    />
                    <span>{kpi.change}</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-text-primary mb-1">
                    {kpi.value}
                  </h3>
                  <p className="text-text-secondary text-sm font-medium mb-1">
                    {kpi.title}
                  </p>
                  <p className="text-text-secondary text-xs">
                    {kpi.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Spend Trends Chart */}
            <div className="lg:col-span-2 bg-surface border border-border rounded-lg p-6 elevation-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-text-primary mb-1">
                    Ad Spend Trends
                  </h2>
                  <p className="text-text-secondary text-sm">
                    Monthly advertising spend across all tracked brands
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-3 h-3 bg-accent rounded-full"></div>
                    <span className="text-text-secondary">Ad Spend</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="text-text-secondary">Active Brands</span>
                  </div>
                </div>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={spendTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis 
                      dataKey="month" 
                      stroke="var(--color-text-secondary)"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="var(--color-text-secondary)"
                      fontSize={12}
                      tickFormatter={(value) => formatCurrency(value)}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="spend" 
                      stroke="var(--color-accent)" 
                      strokeWidth={3}
                      dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, stroke: 'var(--color-accent)', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Brands */}
            <div className="bg-surface border border-border rounded-lg p-6 elevation-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-text-primary mb-1">
                    Top Brands
                  </h2>
                  <p className="text-text-secondary text-sm">
                    Highest spending brands this month
                  </p>
                </div>
                
                <Link
                  to="/brand-discovery"
                  className="text-accent hover:text-primary nav-transition text-sm font-medium"
                >
                  View All
                </Link>
              </div>
              
              <div className="space-y-4">
                {topBrandsData.map((brand, index) => (
                  <Link
                    key={brand.id}
                    to={`/brand-profile?brand=${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-background nav-transition group"
                  >
                    <div className="relative">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-background">
                        <Image
                          src={brand.logo}
                          alt={`${brand.name} logo`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -top-1 -left-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-medium">
                        {index + 1}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-text-primary truncate group-hover:text-accent nav-transition">
                          {brand.name}
                        </h3>
                        <div className={`flex items-center space-x-1 text-xs font-medium ${
                          brand.trend === 'up' ? 'text-accent' : 'text-error'
                        }`}>
                          <Icon 
                            name={brand.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                            size={12} 
                          />
                          <span>{brand.growth}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">
                          {brand.category}
                        </span>
                        <span className="font-semibold text-text-primary">
                          {brand.spend}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <div className="bg-surface border border-border rounded-lg p-6 elevation-sm">
              <h2 className="text-xl font-semibold text-text-primary mb-4">
                Quick Actions
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <Link
                  to="/brand-discovery"
                  className="flex flex-col items-center p-4 rounded-lg border border-border hover:border-accent hover:bg-accent/5 nav-transition group touch-target"
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-accent/20 nav-transition">
                    <Icon name="Search" size={24} className="text-accent" />
                  </div>
                  <span className="font-medium text-text-primary text-center">
                    Discover Brands
                  </span>
                </Link>
                
                <Link
                  to="/alert-center"
                  className="flex flex-col items-center p-4 rounded-lg border border-border hover:border-warning hover:bg-warning/5 nav-transition group touch-target"
                >
                  <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-warning/20 nav-transition">
                    <Icon name="Bell" size={24} className="text-warning" />
                  </div>
                  <span className="font-medium text-text-primary text-center">
                    Create Alert
                  </span>
                </Link>
                
                <Link
                  to="/analytics-hub"
                  className="flex flex-col items-center p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 nav-transition group touch-target"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/20 nav-transition">
                    <Icon name="BarChart3" size={24} className="text-primary" />
                  </div>
                  <span className="font-medium text-text-primary text-center">
                    View Analytics
                  </span>
                </Link>
                
                <button className="flex flex-col items-center p-4 rounded-lg border border-border hover:border-success hover:bg-success/5 nav-transition group touch-target">
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-success/20 nav-transition">
                    <Icon name="Download" size={24} className="text-success" />
                  </div>
                  <span className="font-medium text-text-primary text-center">
                    Export Data
                  </span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-surface border border-border rounded-lg p-6 elevation-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-text-primary">
                  Recent Activity
                </h2>
                <Link
                  to="/alert-center"
                  className="text-accent hover:text-primary nav-transition text-sm font-medium"
                >
                  View All
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-background nav-transition">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      activity.type === 'alert' ? 'bg-warning/10' :
                      activity.type === 'discovery' ? 'bg-accent/10' :
                      activity.type === 'growth' ? 'bg-success/10' : 'bg-primary/10'
                    }`}>
                      <Icon 
                        name={activity.icon} 
                        size={16} 
                        className={activity.color}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-text-primary mb-1">
                        {activity.title}
                      </h3>
                      <p className="text-sm text-text-secondary mb-1">
                        {activity.description}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;