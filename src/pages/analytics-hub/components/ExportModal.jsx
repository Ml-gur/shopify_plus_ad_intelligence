import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ExportModal = ({ isOpen, onClose, chartWidgets }) => {
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [selectedCharts, setSelectedCharts] = useState([]);
  const [includeData, setIncludeData] = useState(true);
  const [includeMetrics, setIncludeMetrics] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const exportFormats = [
    {
      value: 'pdf',
      label: 'PDF Report',
      description: 'Complete report with charts and analysis',
      icon: 'FileText',
      size: '~2-5 MB'
    },
    {
      value: 'png',
      label: 'PNG Images',
      description: 'High-resolution chart images',
      icon: 'Image',
      size: '~500KB each'
    },
    {
      value: 'csv',
      label: 'CSV Data',
      description: 'Raw data in spreadsheet format',
      icon: 'Table',
      size: '~50-200 KB'
    },
    {
      value: 'json',
      label: 'JSON Data',
      description: 'Structured data for developers',
      icon: 'Code',
      size: '~100-500 KB'
    }
  ];

  const handleChartToggle = (chartId) => {
    if (selectedCharts.includes(chartId)) {
      setSelectedCharts(selectedCharts.filter(id => id !== chartId));
    } else {
      setSelectedCharts([...selectedCharts, chartId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedCharts.length === chartWidgets.length) {
      setSelectedCharts([]);
    } else {
      setSelectedCharts(chartWidgets.map(widget => widget.id));
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create mock download
    const fileName = `analytics-export-${Date.now()}.${selectedFormat}`;
    const blob = new Blob(['Mock export data'], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setIsExporting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-1100 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto elevation-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text-primary">Export Analytics</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-background nav-transition"
            disabled={isExporting}
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Export Format */}
          <div>
            <h3 className="font-medium text-text-primary mb-4">Export Format</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {exportFormats.map((format) => (
                <label
                  key={format.value}
                  className={`
                    flex items-start p-4 border rounded-lg cursor-pointer nav-transition
                    ${selectedFormat === format.value
                      ? 'border-accent bg-accent/5' :'border-border hover:bg-background'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="format"
                    value={format.value}
                    checked={selectedFormat === format.value}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                    className="mt-1 mr-3"
                  />
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <Icon name={format.icon} size={16} className="mr-2 text-accent" />
                      <span className="font-medium text-text-primary">{format.label}</span>
                    </div>
                    <p className="text-sm text-text-secondary mb-1">{format.description}</p>
                    <span className="text-xs text-text-secondary">{format.size}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Chart Selection */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-text-primary">Select Charts</h3>
              <button
                onClick={handleSelectAll}
                className="text-sm text-accent hover:text-primary nav-transition"
              >
                {selectedCharts.length === chartWidgets.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {chartWidgets.map((widget) => (
                <label
                  key={widget.id}
                  className="flex items-center p-3 border border-border rounded-md hover:bg-background nav-transition cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedCharts.includes(widget.id)}
                    onChange={() => handleChartToggle(widget.id)}
                    className="mr-3"
                  />
                  <div className="flex items-center flex-1">
                    <div className="w-8 h-8 bg-accent/10 rounded-md flex items-center justify-center mr-3">
                      <Icon 
                        name={
                          widget.type === 'line' ? 'TrendingUp' :
                          widget.type === 'bar' ? 'BarChart3' :
                          widget.type === 'pie' ? 'PieChart' : 'Grid3X3'
                        } 
                        size={16} 
                        className="text-accent" 
                      />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{widget.title}</p>
                      <p className="text-sm text-text-secondary capitalize">{widget.type} Chart</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Export Options */}
          <div>
            <h3 className="font-medium text-text-primary mb-4">Export Options</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeData}
                  onChange={(e) => setIncludeData(e.target.checked)}
                  className="mr-3"
                />
                <div>
                  <span className="text-sm font-medium text-text-primary">Include Raw Data</span>
                  <p className="text-xs text-text-secondary">Export underlying data tables with charts</p>
                </div>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeMetrics}
                  onChange={(e) => setIncludeMetrics(e.target.checked)}
                  className="mr-3"
                />
                <div>
                  <span className="text-sm font-medium text-text-primary">Include Key Metrics</span>
                  <p className="text-xs text-text-secondary">Add summary statistics and insights</p>
                </div>
              </label>
            </div>
          </div>

          {/* Export Summary */}
          <div className="bg-background p-4 rounded-lg">
            <h4 className="font-medium text-text-primary mb-2">Export Summary</h4>
            <div className="space-y-1 text-sm text-text-secondary">
              <p>Format: {exportFormats.find(f => f.value === selectedFormat)?.label}</p>
              <p>Charts: {selectedCharts.length} of {chartWidgets.length} selected</p>
              <p>Options: {[includeData && 'Raw Data', includeMetrics && 'Key Metrics'].filter(Boolean).join(', ') || 'None'}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-text-secondary">
            {selectedCharts.length === 0 && 'Please select at least one chart to export'}
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-background border border-border rounded-md hover:bg-surface nav-transition touch-target"
              disabled={isExporting}
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={selectedCharts.length === 0 || isExporting}
              className="flex items-center px-6 py-2 bg-accent text-white rounded-md hover:bg-accent/90 nav-transition touch-target disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Exporting...
                </>
              ) : (
                <>
                  <Icon name="Download" size={16} className="mr-2" />
                  Export
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;