import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AlertConfiguration = ({ selectedAlert, onUpdate, fullWidth = false }) => {
  const [configurations, setConfigurations] = useState({
    spendThreshold: {
      enabled: true,
      amount: 500000,
      frequency: 'daily',
      brands: ['Nike', 'Adidas', 'Puma']
    },
    competitorDetection: {
      enabled: true,
      categories: ['Athletic Footwear', 'Sportswear', 'Fitness Equipment'],
      minSpend: 50000
    },
    campaignLaunches: {
      enabled: false,
      brands: ['All Monitored Brands'],
      minBudget: 25000
    },
    growthRate: {
      enabled: true,
      threshold: 25,
      period: '30 days',
      brands: ['Nike', 'Adidas', 'Under Armour']
    },
    notifications: {
      email: true,
      inApp: true,
      frequency: 'immediate'
    }
  });

  const [activeSection, setActiveSection] = useState('thresholds');

  const handleToggle = (section, field) => {
    setConfigurations(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: !prev[section][field]
      }
    }));
    onUpdate && onUpdate(section, { [field]: !configurations[section][field] });
  };

  const handleInputChange = (section, field, value) => {
    setConfigurations(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = (section) => {
    onUpdate && onUpdate(section, configurations[section]);
  };

  const sections = [
    { id: 'thresholds', label: 'Spend Thresholds', icon: 'DollarSign' },
    { id: 'competitors', label: 'Competitor Alerts', icon: 'Users' },
    { id: 'campaigns', label: 'Campaign Tracking', icon: 'Target' },
    { id: 'growth', label: 'Growth Monitoring', icon: 'TrendingUp' },
    { id: 'notifications', label: 'Notification Settings', icon: 'Bell' }
  ];

  return (
    <div className={`bg-surface border border-border rounded-lg elevation-sm ${fullWidth ? 'w-full' : ''}`}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-text-primary">
            {selectedAlert ? 'Alert Details' : 'Alert Configuration'}
          </h2>
          {selectedAlert && (
            <button
              onClick={() => onUpdate && onUpdate(selectedAlert.id, { isRead: true })}
              className="text-accent hover:text-primary nav-transition"
            >
              <Icon name="Check" size={16} />
            </button>
          )}
        </div>
      </div>

      {selectedAlert ? (
        /* Alert Details View */
        <div className="p-6">
          <div className="space-y-6">
            {/* Alert Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${selectedAlert.priority === 'high' ? 'bg-error/10 text-error' :
                    selectedAlert.priority === 'medium'? 'bg-warning/10 text-warning' : 'bg-accent/10 text-accent'}
                `}>
                  <Icon 
                    name={selectedAlert.priority === 'high' ? 'AlertTriangle' : 
                          selectedAlert.priority === 'medium' ? 'AlertCircle' : 'Info'} 
                    size={20} 
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">{selectedAlert.brand}</h3>
                  <p className="text-sm text-text-secondary">{selectedAlert.type}</p>
                </div>
              </div>
              <span className="text-sm text-text-secondary">
                {new Date(selectedAlert.timestamp).toLocaleString()}
              </span>
            </div>

            {/* Alert Message */}
            <div className="bg-background p-4 rounded-md">
              <h4 className="font-medium text-text-primary mb-2">Alert Message</h4>
              <p className="text-text-secondary">{selectedAlert.message}</p>
            </div>

            {/* Alert Details */}
            <div className="bg-background p-4 rounded-md">
              <h4 className="font-medium text-text-primary mb-2">Details</h4>
              <div className="text-text-secondary whitespace-pre-line">
                {selectedAlert.details}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3 pt-4 border-t border-border">
              <button
                onClick={() => onUpdate && onUpdate(selectedAlert.id, { isRead: true })}
                className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 nav-transition"
              >
                Mark as Read
              </button>
              <button
                onClick={() => onUpdate && onUpdate(selectedAlert.id, { dismissed: true })}
                className="px-4 py-2 bg-background border border-border text-text-primary rounded-md hover:bg-border-hover nav-transition"
              >
                Dismiss
              </button>
              <button className="px-4 py-2 bg-background border border-border text-text-primary rounded-md hover:bg-border-hover nav-transition">
                Edit Threshold
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Configuration View */
        <div>
          {/* Section Navigation */}
          {fullWidth && (
            <div className="px-6 py-4 border-b border-border">
              <div className="flex flex-wrap gap-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`
                      flex items-center px-3 py-2 rounded-md text-sm font-medium nav-transition
                      ${activeSection === section.id
                        ? 'bg-accent text-white' :'bg-background text-text-secondary hover:text-text-primary hover:bg-border-hover'
                      }
                    `}
                  >
                    <Icon name={section.icon} size={16} className="mr-2" />
                    {section.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-6 space-y-6">
            {/* Spend Thresholds */}
            {(!fullWidth || activeSection === 'thresholds') && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-text-primary">Spend Thresholds</h3>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={configurations.spendThreshold.enabled}
                      onChange={() => handleToggle('spendThreshold', 'enabled')}
                      className="rounded border-border focus:ring-accent"
                    />
                    <span className="text-sm text-text-secondary">Enabled</span>
                  </label>
                </div>

                {configurations.spendThreshold.enabled && (
                  <div className="space-y-4 pl-4 border-l-2 border-accent/20">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Threshold Amount ($)
                      </label>
                      <input
                        type="number"
                        value={configurations.spendThreshold.amount}
                        onChange={(e) => handleInputChange('spendThreshold', 'amount', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Check Frequency
                      </label>
                      <select
                        value={configurations.spendThreshold.frequency}
                        onChange={(e) => handleInputChange('spendThreshold', 'frequency', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      >
                        <option value="realtime">Real-time</option>
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                      </select>
                    </div>

                    <button
                      onClick={() => handleSave('spendThreshold')}
                      className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 nav-transition"
                    >
                      Save Threshold Settings
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Competitor Detection */}
            {(!fullWidth || activeSection === 'competitors') && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-text-primary">Competitor Detection</h3>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={configurations.competitorDetection.enabled}
                      onChange={() => handleToggle('competitorDetection', 'enabled')}
                      className="rounded border-border focus:ring-accent"
                    />
                    <span className="text-sm text-text-secondary">Enabled</span>
                  </label>
                </div>

                {configurations.competitorDetection.enabled && (
                  <div className="space-y-4 pl-4 border-l-2 border-accent/20">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Minimum Spend for Detection ($)
                      </label>
                      <input
                        type="number"
                        value={configurations.competitorDetection.minSpend}
                        onChange={(e) => handleInputChange('competitorDetection', 'minSpend', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Categories to Monitor
                      </label>
                      <div className="space-y-2">
                        {configurations.competitorDetection.categories.map((category, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked
                              className="rounded border-border focus:ring-accent"
                            />
                            <span className="text-sm text-text-secondary">{category}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleSave('competitorDetection')}
                      className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 nav-transition"
                    >
                      Save Detection Settings
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Growth Rate Monitoring */}
            {(!fullWidth || activeSection === 'growth') && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-text-primary">Growth Rate Monitoring</h3>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={configurations.growthRate.enabled}
                      onChange={() => handleToggle('growthRate', 'enabled')}
                      className="rounded border-border focus:ring-accent"
                    />
                    <span className="text-sm text-text-secondary">Enabled</span>
                  </label>
                </div>

                {configurations.growthRate.enabled && (
                  <div className="space-y-4 pl-4 border-l-2 border-accent/20">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Growth Threshold (%)
                      </label>
                      <input
                        type="number"
                        value={configurations.growthRate.threshold}
                        onChange={(e) => handleInputChange('growthRate', 'threshold', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Monitoring Period
                      </label>
                      <select
                        value={configurations.growthRate.period}
                        onChange={(e) => handleInputChange('growthRate', 'period', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      >
                        <option value="7 days">7 days</option>
                        <option value="30 days">30 days</option>
                        <option value="90 days">90 days</option>
                      </select>
                    </div>

                    <button
                      onClick={() => handleSave('growthRate')}
                      className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 nav-transition"
                    >
                      Save Growth Settings
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Notification Preferences */}
            {(!fullWidth || activeSection === 'notifications') && (
              <div className="space-y-4">
                <h3 className="font-semibold text-text-primary">Notification Preferences</h3>
                
                <div className="space-y-4 pl-4 border-l-2 border-accent/20">
                  <div className="flex items-center justify-between">
                    <span className="text-text-primary">Email Notifications</span>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={configurations.notifications.email}
                        onChange={() => handleToggle('notifications', 'email')}
                        className="rounded border-border focus:ring-accent"
                      />
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-text-primary">In-App Notifications</span>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={configurations.notifications.inApp}
                        onChange={() => handleToggle('notifications', 'inApp')}
                        className="rounded border-border focus:ring-accent"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Notification Frequency
                    </label>
                    <select
                      value={configurations.notifications.frequency}
                      onChange={(e) => handleInputChange('notifications', 'frequency', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    >
                      <option value="immediate">Immediate</option>
                      <option value="hourly">Hourly Digest</option>
                      <option value="daily">Daily Digest</option>
                      <option value="weekly">Weekly Summary</option>
                    </select>
                  </div>

                  <button
                    onClick={() => handleSave('notifications')}
                    className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 nav-transition"
                  >
                    Save Notification Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertConfiguration;