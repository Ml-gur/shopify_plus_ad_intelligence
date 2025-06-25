import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AlertHistory = () => {
  const [dateRange, setDateRange] = useState('30');
  const [alertType, setAlertType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);

  const mockHistoryAlerts = [
    {
      id: 1,
      priority: 'high',
      brand: 'Nike',
      type: 'Spend Threshold',
      message: 'Monthly ad spend exceeded $450K threshold',
      timestamp: new Date(Date.now() - 86400000 * 2),
      resolvedAt: new Date(Date.now() - 86400000 * 1),
      status: 'resolved',
      action: 'Threshold adjusted to $550K'
    },
    {
      id: 2,
      priority: 'medium',
      brand: 'Adidas',
      type: 'Campaign Launch',
      message: 'New campaign "Summer Collection 2024" detected',
      timestamp: new Date(Date.now() - 86400000 * 3),
      resolvedAt: new Date(Date.now() - 86400000 * 3),
      status: 'acknowledged',
      action: 'Added to monitoring list'
    },
    {
      id: 3,
      priority: 'low',
      brand: 'Puma',
      type: 'Growth Rate',
      message: 'Ad spend growth rate reached 18% over 30 days',
      timestamp: new Date(Date.now() - 86400000 * 5),
      resolvedAt: new Date(Date.now() - 86400000 * 4),
      status: 'resolved',
      action: 'Growth pattern documented'
    },
    {
      id: 4,
      priority: 'high',
      brand: 'Under Armour',
      type: 'New Competitor',
      message: 'Competitor "FitGear Pro" detected with $200K spend',
      timestamp: new Date(Date.now() - 86400000 * 7),
      resolvedAt: new Date(Date.now() - 86400000 * 6),
      status: 'resolved',
      action: 'Competitor profile created'
    },
    {
      id: 5,
      priority: 'medium',
      brand: 'New Balance',
      type: 'Spend Threshold',
      message: 'Weekly spend exceeded $80K threshold',
      timestamp: new Date(Date.now() - 86400000 * 10),
      resolvedAt: new Date(Date.now() - 86400000 * 9),
      status: 'dismissed',
      action: 'Alert dismissed as expected seasonal increase'
    },
    {
      id: 6,
      priority: 'low',
      brand: 'Reebok',
      type: 'Campaign Launch',
      message: 'Campaign "CrossFit Championship" launched',
      timestamp: new Date(Date.now() - 86400000 * 12),
      resolvedAt: new Date(Date.now() - 86400000 * 11),
      status: 'acknowledged',
      action: 'Campaign added to tracking'
    },
    {
      id: 7,
      priority: 'high',
      brand: 'Nike',
      type: 'Growth Rate',
      message: 'TikTok ad spend increased by 45% in 7 days',
      timestamp: new Date(Date.now() - 86400000 * 14),
      resolvedAt: new Date(Date.now() - 86400000 * 13),
      status: 'resolved',
      action: 'TikTok strategy analysis completed'
    },
    {
      id: 8,
      priority: 'medium',
      brand: 'Adidas',
      type: 'Spend Threshold',
      message: 'Instagram ad spend approaching monthly limit',
      timestamp: new Date(Date.now() - 86400000 * 16),
      resolvedAt: new Date(Date.now() - 86400000 * 15),
      status: 'resolved',
      action: 'Threshold increased for Q4 campaign'
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved':
        return 'text-success bg-success/10 border-success/20';
      case 'acknowledged':
        return 'text-accent bg-accent/10 border-accent/20';
      case 'dismissed':
        return 'text-text-secondary bg-background border-border';
      default:
        return 'text-text-secondary bg-background border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'resolved':
        return 'CheckCircle';
      case 'acknowledged':
        return 'Eye';
      case 'dismissed':
        return 'X';
      default:
        return 'Clock';
    }
  };

  const filteredAlerts = mockHistoryAlerts.filter(alert => {
    const daysDiff = Math.floor((Date.now() - alert.timestamp) / (1000 * 60 * 60 * 24));
    const withinDateRange = daysDiff <= parseInt(dateRange);
    const matchesType = alertType === 'all' || alert.type.toLowerCase().includes(alertType.toLowerCase());
    
    return withinDateRange && matchesType;
  });

  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAlerts = filteredAlerts.slice(startIndex, startIndex + itemsPerPage);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-surface border border-border rounded-lg elevation-sm">
      {/* Header with Filters */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-2">Alert History</h2>
            <p className="text-text-secondary">
              View and analyze resolved alerts and notifications
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-text-primary">Date Range:</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="365">Last year</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-text-primary">Type:</label>
              <select
                value={alertType}
                onChange={(e) => setAlertType(e.target.value)}
                className="px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="spend">Spend Threshold</option>
                <option value="competitor">New Competitor</option>
                <option value="campaign">Campaign Launch</option>
                <option value="growth">Growth Rate</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="p-6 border-b border-border">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-success">
              {filteredAlerts.filter(a => a.status === 'resolved').length}
            </div>
            <div className="text-sm text-text-secondary">Resolved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">
              {filteredAlerts.filter(a => a.status === 'acknowledged').length}
            </div>
            <div className="text-sm text-text-secondary">Acknowledged</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-text-secondary">
              {filteredAlerts.filter(a => a.status === 'dismissed').length}
            </div>
            <div className="text-sm text-text-secondary">Dismissed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary">
              {filteredAlerts.length}
            </div>
            <div className="text-sm text-text-secondary">Total</div>
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-background border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Brand
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Message
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Resolved
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedAlerts.map((alert) => (
              <tr key={alert.id} className="hover:bg-background nav-transition">
                <td className="px-6 py-4">
                  <span className={`
                    inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border
                    ${getPriorityColor(alert.priority)}
                  `}>
                    {alert.priority.charAt(0).toUpperCase() + alert.priority.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <Icon name="Building2" size={16} className="text-primary" />
                    </div>
                    <div className="font-medium text-text-primary">{alert.brand}</div>
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
                    {formatDate(alert.timestamp)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-text-secondary">
                    {formatDate(alert.resolvedAt)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`
                    inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border
                    ${getStatusColor(alert.status)}
                  `}>
                    <Icon name={getStatusIcon(alert.status)} size={12} className="mr-1" />
                    {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-text-secondary max-w-xs truncate">
                    {alert.action}
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
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAlerts.length)} of {filteredAlerts.length} alerts
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

      {/* Empty State */}
      {filteredAlerts.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Clock" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No Alert History</h3>
          <p className="text-text-secondary">
            No alerts found for the selected date range and type filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default AlertHistory;