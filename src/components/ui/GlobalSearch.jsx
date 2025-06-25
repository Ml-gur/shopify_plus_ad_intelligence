import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const GlobalSearch = ({ className = '', placeholder = "Search brands, competitors, campaigns..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Mock search results - in real app, this would come from API
  const mockResults = [
    {
      id: 1,
      type: 'brand',
      title: 'Nike',
      subtitle: 'Athletic Apparel & Footwear',
      category: 'Brand',
      path: '/brand-profile?brand=nike'
    },
    {
      id: 2,
      type: 'brand',
      title: 'Adidas',
      subtitle: 'Sports & Lifestyle Brand',
      category: 'Brand',
      path: '/brand-profile?brand=adidas'
    },
    {
      id: 3,
      type: 'campaign',
      title: 'Summer Sale Campaign',
      subtitle: 'Nike - Running Shoes',
      category: 'Campaign',
      path: '/analytics-hub?campaign=summer-sale'
    },
    {
      id: 4,
      type: 'competitor',
      title: 'Under Armour',
      subtitle: 'Athletic Performance Brand',
      category: 'Competitor',
      path: '/brand-discovery?competitor=under-armour'
    }
  ];

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const handleSearch = async () => {
      if (searchValue.trim().length < 2) {
        setSearchResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        const filtered = mockResults.filter(item =>
          item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(searchValue.toLowerCase())
        );
        setSearchResults(filtered);
        setIsLoading(false);
        setSelectedIndex(-1);
      }, 300);
    };

    const debounceTimer = setTimeout(handleSearch, 200);
    return () => clearTimeout(debounceTimer);
  }, [searchValue]);

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    if (!isOpen) setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputBlur = () => {
    // Delay closing to allow clicking on results
    setTimeout(() => setIsOpen(false), 150);
  };

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && searchResults[selectedIndex]) {
          handleResultClick(searchResults[selectedIndex]);
        } else if (searchValue.trim()) {
          handleSearch();
        }
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleResultClick = (result) => {
    navigate(result.path);
    setSearchValue('');
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleSearch = () => {
    if (searchValue.trim()) {
      navigate(`/brand-discovery?q=${encodeURIComponent(searchValue)}`);
      setIsOpen(false);
    }
  };

  const getResultIcon = (type) => {
    switch (type) {
      case 'brand':
        return 'Building2';
      case 'campaign':
        return 'Target';
      case 'competitor':
        return 'Users';
      default:
        return 'Search';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Icon
          name="Search"
          size={18}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
        />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className="w-full pl-10 pr-10 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent nav-transition"
          autoComplete="off"
        />
        
        {searchValue && (
          <button
            type="button"
            onClick={() => {
              setSearchValue('');
              setSearchResults([]);
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary nav-transition"
          >
            <Icon name="X" size={16} />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (searchValue.length >= 2 || searchResults.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-md elevation-lg z-1100 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                <span className="text-text-secondary">Searching...</span>
              </div>
            </div>
          ) : searchResults.length > 0 ? (
            <>
              {searchResults.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className={`
                    w-full px-4 py-3 text-left hover:bg-background nav-transition
                    ${index === selectedIndex ? 'bg-background' : ''}
                    ${index === 0 ? 'rounded-t-md' : ''}
                    ${index === searchResults.length - 1 ? 'rounded-b-md' : 'border-b border-border'}
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-md flex items-center justify-center">
                      <Icon 
                        name={getResultIcon(result.type)} 
                        size={16} 
                        className="text-accent" 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-text-primary truncate">
                          {result.title}
                        </p>
                        <span className="text-xs text-text-secondary bg-background px-2 py-1 rounded-full ml-2">
                          {result.category}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary truncate">
                        {result.subtitle}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
              
              {searchValue.trim() && (
                <button
                  onClick={handleSearch}
                  className="w-full px-4 py-3 text-left border-t border-border hover:bg-background nav-transition"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center">
                      <Icon name="Search" size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">
                        Search for "{searchValue}"
                      </p>
                      <p className="text-sm text-text-secondary">
                        View all results in Brand Discovery
                      </p>
                    </div>
                  </div>
                </button>
              )}
            </>
          ) : searchValue.length >= 2 ? (
            <div className="p-4 text-center">
              <Icon name="Search" size={24} className="text-text-secondary mx-auto mb-2" />
              <p className="text-text-secondary">No results found for "{searchValue}"</p>
              <button
                onClick={handleSearch}
                className="mt-2 text-accent hover:text-primary nav-transition"
              >
                Search in Brand Discovery
              </button>
            </div>
          ) : (
            <div className="p-4 text-center">
              <Icon name="Search" size={24} className="text-text-secondary mx-auto mb-2" />
              <p className="text-text-secondary">Start typing to search brands, campaigns, and competitors</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;