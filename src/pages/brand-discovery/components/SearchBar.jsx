import React, { useState, useRef, useEffect } from 'react';
import Icon from 'components/AppIcon';

const SearchBar = ({ value, onChange, placeholder = "Search brands..." }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);

  // Mock search suggestions
  const mockSuggestions = [
    { type: 'brand', text: 'Allbirds', category: 'Sustainable Fashion' },
    { type: 'brand', text: 'Gymshark', category: 'Athletic Apparel' },
    { type: 'brand', text: 'Warby Parker', category: 'Eyewear' },
    { type: 'industry', text: 'Beauty & Cosmetics', category: 'Industry' },
    { type: 'industry', text: 'Athletic Apparel', category: 'Industry' },
    { type: 'keyword', text: 'sustainable fashion', category: 'Keyword' },
    { type: 'keyword', text: 'direct-to-consumer', category: 'Keyword' }
  ];

  useEffect(() => {
    if (value.length >= 2) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.text.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 6));
      setShowSuggestions(true);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [value]);

  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    if (value.length >= 2) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    // Delay hiding suggestions to allow clicking
    setTimeout(() => {
      setShowSuggestions(false);
    }, 150);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    onChange(suggestion.text);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'brand':
        return 'Building2';
      case 'industry':
        return 'Tag';
      case 'keyword':
        return 'Hash';
      default:
        return 'Search';
    }
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className={`
        relative transition-all duration-200
        ${isFocused ? 'transform scale-[1.02]' : ''}
      `}>
        <Icon
          name="Search"
          size={20}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary"
        />
        
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className={`
            w-full pl-12 pr-12 py-4 bg-surface border-2 rounded-lg
            focus:outline-none nav-transition text-lg
            ${isFocused 
              ? 'border-accent shadow-lg' 
              : 'border-border hover:border-border-hover'
            }
          `}
        />
        
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary nav-transition touch-target"
          >
            <Icon name="X" size={18} />
          </button>
        )}
      </div>

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-lg elevation-lg z-1100 max-h-80 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`
                w-full px-4 py-3 text-left hover:bg-background nav-transition
                ${index === selectedIndex ? 'bg-background' : ''}
                ${index === 0 ? 'rounded-t-lg' : ''}
                ${index === suggestions.length - 1 ? 'rounded-b-lg' : 'border-b border-border'}
              `}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent/10 rounded-md flex items-center justify-center">
                  <Icon 
                    name={getSuggestionIcon(suggestion.type)} 
                    size={16} 
                    className="text-accent" 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-text-primary truncate">
                    {suggestion.text}
                  </p>
                  <p className="text-sm text-text-secondary truncate">
                    {suggestion.category}
                  </p>
                </div>
                <Icon name="ArrowUpRight" size={14} className="text-text-secondary" />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Search Tips */}
      {isFocused && value.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-lg elevation-lg z-1100 p-4">
          <h4 className="font-medium text-text-primary mb-3">Search Tips</h4>
          <div className="space-y-2 text-sm text-text-secondary">
            <div className="flex items-center space-x-2">
              <Icon name="Building2" size={14} />
              <span>Search by brand name (e.g., "Nike", "Allbirds")</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Tag" size={14} />
              <span>Filter by industry (e.g., "Fashion", "Beauty")</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Hash" size={14} />
              <span>Use keywords (e.g., "sustainable", "D2C")</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;