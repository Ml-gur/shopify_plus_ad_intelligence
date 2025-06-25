import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SortOptions = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: 'spend', label: 'Monthly Spend', icon: 'DollarSign' },
    { value: 'growth', label: 'Growth Rate', icon: 'TrendingUp' },
    { value: 'alphabetical', label: 'Alphabetical', icon: 'SortAsc' },
    { value: 'recent', label: 'Recently Updated', icon: 'Clock' }
  ];

  const currentOption = sortOptions.find(option => option.value === value);

  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2 bg-surface border border-border rounded-md hover:bg-background nav-transition touch-target"
      >
        <Icon name={currentOption?.icon || 'SortDesc'} size={16} className="mr-2" />
        <span className="mr-2">Sort by: {currentOption?.label}</span>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`nav-transition ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-1000"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-md elevation-lg z-1100">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className={`
                  w-full px-4 py-3 text-left hover:bg-background nav-transition
                  ${value === option.value ? 'bg-accent/10 text-accent' : 'text-text-primary'}
                  ${option === sortOptions[0] ? 'rounded-t-md' : ''}
                  ${option === sortOptions[sortOptions.length - 1] ? 'rounded-b-md' : 'border-b border-border'}
                `}
              >
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={option.icon} 
                    size={16} 
                    className={value === option.value ? 'text-accent' : 'text-text-secondary'}
                  />
                  <span className="font-medium">{option.label}</span>
                  {value === option.value && (
                    <Icon name="Check" size={16} className="ml-auto text-accent" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SortOptions;