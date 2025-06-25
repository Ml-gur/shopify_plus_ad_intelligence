import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ChartPresets = ({ isOpen, onClose, presets, onLoadPreset }) => {
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPresetName, setNewPresetName] = useState('');
  const [newPresetDescription, setNewPresetDescription] = useState('');

  const handleLoadPreset = (preset) => {
    onLoadPreset(preset);
    onClose();
  };

  const handleCreatePreset = () => {
    // In a real app, this would save to backend
    console.log('Creating preset:', { name: newPresetName, description: newPresetDescription });
    setShowCreateModal(false);
    setNewPresetName('');
    setNewPresetDescription('');
  };

  const getPresetIcon = (presetId) => {
    switch (presetId) {
      case 'quarterly-review':
        return 'Calendar';
      case 'competitive-analysis':
        return 'Users';
      case 'platform-performance':
        return 'Smartphone';
      default:
        return 'Bookmark';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-1100 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto elevation-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text-primary">Chart Presets</h2>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 nav-transition touch-target"
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Create Preset
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-background nav-transition"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Preset Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {presets.map((preset) => (
              <div
                key={preset.id}
                className={`
                  border rounded-lg p-6 cursor-pointer nav-transition
                  ${selectedPreset?.id === preset.id
                    ? 'border-accent bg-accent/5' :'border-border hover:border-accent/50 hover:bg-background'
                  }
                `}
                onClick={() => setSelectedPreset(preset)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name={getPresetIcon(preset.id)} size={24} className="text-accent" />
                  </div>
                  <div className="flex space-x-1">
                    <button className="p-1 rounded hover:bg-background nav-transition">
                      <Icon name="Edit" size={14} className="text-text-secondary" />
                    </button>
                    <button className="p-1 rounded hover:bg-background nav-transition">
                      <Icon name="Trash2" size={14} className="text-error" />
                    </button>
                  </div>
                </div>

                <h3 className="font-semibold text-text-primary mb-2">{preset.name}</h3>
                <p className="text-sm text-text-secondary mb-4">{preset.description}</p>

                <div className="space-y-3">
                  {/* Widget Count */}
                  <div className="flex items-center text-sm text-text-secondary">
                    <Icon name="BarChart3" size={14} className="mr-2" />
                    <span>{preset.widgets.length} charts</span>
                  </div>

                  {/* Filters */}
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-background px-2 py-1 rounded-full text-text-secondary">
                      {preset.filters.dateRange}
                    </span>
                    <span className="text-xs bg-background px-2 py-1 rounded-full text-text-secondary">
                      {preset.filters.industry === 'all' ? 'All Industries' : preset.filters.industry}
                    </span>
                    <span className="text-xs bg-background px-2 py-1 rounded-full text-text-secondary">
                      {preset.filters.platforms.length} platforms
                    </span>
                  </div>

                  {/* Load Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLoadPreset(preset);
                    }}
                    className="w-full mt-4 px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 nav-transition touch-target"
                  >
                    Load Preset
                  </button>
                </div>
              </div>
            ))}

            {/* Create New Preset Card */}
            <div
              onClick={() => setShowCreateModal(true)}
              className="border-2 border-dashed border-border rounded-lg p-6 cursor-pointer hover:border-accent hover:bg-accent/5 nav-transition flex flex-col items-center justify-center text-center"
            >
              <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                <Icon name="Plus" size={24} className="text-text-secondary" />
              </div>
              <h3 className="font-medium text-text-primary mb-2">Create New Preset</h3>
              <p className="text-sm text-text-secondary">Save your current dashboard configuration</p>
            </div>
          </div>
        </div>

        {/* Create Preset Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-1200 flex items-center justify-center p-4">
            <div className="bg-surface rounded-lg max-w-md w-full elevation-lg">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h3 className="text-lg font-semibold text-text-primary">Create New Preset</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 rounded-md hover:bg-background nav-transition"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Preset Name
                  </label>
                  <input
                    type="text"
                    value={newPresetName}
                    onChange={(e) => setNewPresetName(e.target.value)}
                    placeholder="Enter preset name"
                    className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Description
                  </label>
                  <textarea
                    value={newPresetDescription}
                    onChange={(e) => setNewPresetDescription(e.target.value)}
                    placeholder="Describe what this preset is used for"
                    rows={3}
                    className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                  />
                </div>

                <div className="bg-background p-4 rounded-lg">
                  <h4 className="font-medium text-text-primary mb-2">Current Configuration</h4>
                  <div className="space-y-1 text-sm text-text-secondary">
                    <p>Charts: 4 widgets selected</p>
                    <p>Date Range: Last 30 Days</p>
                    <p>Industry: All Industries</p>
                    <p>Platforms: All Platforms</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-background border border-border rounded-md hover:bg-surface nav-transition touch-target"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePreset}
                  disabled={!newPresetName.trim()}
                  className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 nav-transition touch-target disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Preset
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartPresets;