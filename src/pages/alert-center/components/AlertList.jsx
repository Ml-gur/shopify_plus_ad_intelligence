import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AlertList = ({ onAlertSelect, onAlertDismiss, onBulkAction }) => {
  const [selectedAlerts, setSelectedAlerts] = useState([]);
  const [sortBy, setSortBy] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const mockAlerts = [
    {
      id: 1,
      priority: 'high',
      brand: 'Nike',
      type: 'Spend Threshold',
      message: 'Monthly ad spend exceeded $500K threshold',
      timestamp: new Date(Date.now() - 300000),
      isRead: false,
      details: `Nike's advertising spend has exceeded the configured threshold of $500,000 for this month. Current spend: $547,230.
      
This represents a 15.2% increase from last month's spending pattern. The majority of the increase is attributed to Facebook Ads (45%) and Google Ads (35%).`
    },
    {
      id: 2,
      priority: 'medium',
      brand: 'Adidas',
      type: 'New Competitor',
      message: 'New competitor detected in athletic footwear category',
      timestamp: new Date(Date.now() - 1800000),
      isRead: false,
      details: `A new competitor "Athletic Pro" has been detected with significant ad spend in the athletic footwear category.
      
Initial analysis shows $125,000 in monthly spend across Facebook and Instagram, targeting similar demographics to Adidas campaigns.`
    },
    {
      id: 3,
      priority: 'low',
      brand: 'Under Armour',
      type: 'Campaign Launch',
      message: 'New campaign launched: "Performance Plus Collection"',
      timestamp: new Date(Date.now() - 3600000),
      isRead: true,
      details: `Under Armour has launched a new campaign "Performance Plus Collection" with an estimated budget of $200,000.
      
The campaign is running across Facebook, Instagram, and Google Ads, targeting fitness enthusiasts aged 25-45.`
    },
    {
      id: 4,
      priority: 'high',
      brand: 'Puma',
      type: 'Growth Rate',
      message: 'Ad spend growth rate exceeded 25% threshold',
      timestamp: new Date(Date.now() - 7200000),
      isRead: true,
      details: `Puma's advertising spend has shown a 32% growth rate over the past 30 days, exceeding the configured 25% threshold.
      
This growth is primarily driven by increased investment in TikTok advertising (65% increase) and YouTube campaigns (28% increase).`
    },
    {
      id: 5,
      priority: 'medium',brand: 'New Balance',type: 'Spend Threshold',message: 'Weekly spend approaching threshold limit',
      timestamp: new Date(Date.now() - 10800000),
      isRead: false,
      details: `New Balance is approaching their weekly spend threshold of $75,000. Current spend: $68,450 (91% of threshold).
      
At current spending rate, the threshold will be exceeded within 24 hours. Consider adjusting alert thresholds or monitoring frequency.`
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error bg-error/10 border-error/20';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'low':
        return 'text-accent bg-accent/10 border-accent/20';
      default:
        return 'text-text-secondary bg-background border-border';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'AlertCircle';
      case 'low':
        return 'Info';
      default:
        return 'Bell';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedAlerts(mockAlerts.map(alert => alert.id));
    } else {
      setSelectedAlerts([]);
    }
  };

  const handleSelectAlert = (alertId, checked) => {
    if (checked) {
      setSelectedAlerts([...selectedAlerts, alertId]);
    } else {
      setSelectedAlerts(selectedAlerts.filter(id => id !== alertId));
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const sortedAlerts = [...mockAlerts].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    if (sortBy === 'timestamp') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const totalPages = Math.ceil(sortedAlerts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAlerts = sortedAlerts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-surface border border-border rounded-lg elevation-sm">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold text-text-primary mb-4 sm:mb-0">
            Active Alerts ({mockAlerts.length})
          </h2>
          
          {selectedAlerts.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-text-secondary">
                {selectedAlerts.length} selected
              </span>
              <button
                onClick={() => onBulkAction('dismissed', selectedAlerts)}
                className="px-3 py-1 text-sm bg-background border border-border rounded hover:bg-border-hover nav-transition"
              >
                Dismiss All
              </button>
              <button
                onClick={() => onBulkAction('marked as read', selectedAlerts)}
                className="px-3 py-1 text-sm bg-accent text-white rounded hover:bg-accent/90 nav-transition"
              >
                Mark as Read
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-background border-b border-border">
            <tr>
              <th className="w-12 px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedAlerts.length === mockAlerts.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-border focus:ring-accent"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                <button
                  onClick={() => handleSort('priority')}
                  className="flex items-center space-x-1 hover:text-text-primary nav-transition"
                >
                  <span>Priority</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                <button
                  onClick={() => handleSort('brand')}
                  className="flex items-center space-x-1 hover:text-text-primary nav-transition"
                >
                  <span>Brand</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Alert Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Message
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                <button
                  onClick={() => handleSort('timestamp')}
                  className="flex items-center space-x-1 hover:text-text-primary nav-transition"
                >
                  <span>Time</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedAlerts.map((alert) => (
              <tr
                key={alert.id}
                className={`hover:bg-background nav-transition cursor-pointer ${
                  !alert.isRead ? 'bg-accent/5' : ''
                }`}
                onClick={() => onAlertSelect(alert)}
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedAlerts.includes(alert.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleSelectAlert(alert.id, e.target.checked);
                    }}
                    className="rounded border-border focus:ring-accent"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <span className={`
                      inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border
                      ${getPriorityColor(alert.priority)}
                    `}>
                      <Icon name={getPriorityIcon(alert.priority)} size={12} className="mr-1" />
                      {alert.priority.charAt(0).toUpperCase() + alert.priority.slice(1)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <Icon name="Building2" size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-text-primary">{alert.brand}</div>
                      {!alert.isRead && (
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-text-secondary">{alert.type}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-text-primary max-w-xs truncate">
                    {alert.message}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-text-secondary">
                    {formatTimestamp(alert.timestamp)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAlertSelect(alert);
                      }}
                      className="text-accent hover:text-primary nav-transition"
                      title="View Details"
                    >
                      <Icon name="Eye" size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAlertDismiss(alert.id);
                      }}
                      className="text-text-secondary hover:text-error nav-transition"
                      title="Dismiss"
                    >
                      <Icon name="X" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-text-secondary">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedAlerts.length)} of {sortedAlerts.length} alerts
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border border-border rounded hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed nav-transition"
              >
                Previous
              </button>
              <span className="text-sm text-text-secondary">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border border-border rounded hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed nav-transition"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertList;