import React, { useState, useEffect } from 'react';

import Icon from 'components/AppIcon';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Breadcrumb from 'components/ui/Breadcrumb';
import AlertList from './components/AlertList';
import AlertConfiguration from './components/AlertConfiguration';
import AlertHistory from './components/AlertHistory';

const AlertCenter = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('active');
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const showNotification = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleAlertUpdate = (alertId, updates) => {
    showNotification('Alert configuration updated successfully');
  };

  const handleAlertDismiss = (alertId) => {
    showNotification('Alert dismissed successfully');
  };

  const handleBulkAction = (action, alertIds) => {
    showNotification(`${alertIds.length} alerts ${action} successfully`);
  };

  const tabs = [
    { id: 'active', label: 'Active Alerts', icon: 'Bell' },
    { id: 'configuration', label: 'Configuration', icon: 'Settings' },
    { id: 'history', label: 'History', icon: 'Clock' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header onSidebarToggle={handleSidebarToggle} sidebarCollapsed={sidebarCollapsed} />
      <Sidebar collapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />
      
      <main className={`pt-16 nav-transition ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
        <div className="p-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">Alert Center</h1>
                <p className="text-text-secondary">
                  Monitor advertising intelligence and configure notification thresholds
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                <button className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 nav-transition touch-target">
                  <Icon name="Plus" size={16} className="mr-2" />
                  New Alert
                </button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-border">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center py-4 px-1 border-b-2 font-medium text-sm nav-transition
                      ${activeTab === tab.id
                        ? 'border-accent text-accent' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border-hover'
                      }
                    `}
                  >
                    <Icon name={tab.icon} size={16} className="mr-2" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'active' && (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                  <AlertList
                    onAlertSelect={setSelectedAlert}
                    onAlertDismiss={handleAlertDismiss}
                    onBulkAction={handleBulkAction}
                  />
                </div>
                <div className="xl:col-span-1">
                  <AlertConfiguration
                    selectedAlert={selectedAlert}
                    onUpdate={handleAlertUpdate}
                  />
                </div>
              </div>
            )}

            {activeTab === 'configuration' && (
              <AlertConfiguration
                selectedAlert={null}
                onUpdate={handleAlertUpdate}
                fullWidth={true}
              />
            )}

            {activeTab === 'history' && (
              <AlertHistory />
            )}
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-1100">
          <div className={`
            px-6 py-4 rounded-md elevation-lg flex items-center space-x-3
            ${toastType === 'success' ? 'bg-success text-white' : 'bg-error text-white'}
          `}>
            <Icon 
              name={toastType === 'success' ? 'CheckCircle' : 'AlertCircle'} 
              size={20} 
            />
            <span className="font-medium">{toastMessage}</span>
            <button
              onClick={() => setShowToast(false)}
              className="ml-4 hover:opacity-80 nav-transition"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertCenter;