import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = ({ onSidebarToggle, sidebarCollapsed }) => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      console.log('Search:', searchValue);
    }
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const notifications = [
    { id: 1, title: 'New competitor detected', time: '2 min ago', type: 'info' },
    { id: 2, title: 'Spend threshold exceeded', time: '5 min ago', type: 'warning' },
    { id: 3, title: 'Campaign performance alert', time: '10 min ago', type: 'error' },
  ];

  const unreadCount = notifications.length;

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-surface border-b border-border z-1000">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section - Logo and Sidebar Toggle */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onSidebarToggle}
            className="lg:hidden p-2 rounded-md hover:bg-background nav-transition touch-target"
            aria-label="Toggle sidebar"
          >
            <Icon name="Menu" size={20} />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-xl font-semibold text-primary hidden sm:block">
              AdIntel Pro
            </span>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-2xl mx-8 hidden md:block">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className={`relative transition-all duration-200 ${searchFocused ? 'transform scale-105' : ''}`}>
              <Icon
                name="Search"
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
              />
              <input
                type="text"
                placeholder="Search brands, competitors, campaigns..."
                value={searchValue}
                onChange={handleSearchChange}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent nav-transition"
              />
              {searchValue && (
                <button
                  type="button"
                  onClick={() => setSearchValue('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary nav-transition"
                >
                  <Icon name="X" size={16} />
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right Section - Actions and User */}
        <div className="flex items-center space-x-4">
          {/* Mobile Search */}
          <button className="md:hidden p-2 rounded-md hover:bg-background nav-transition touch-target">
            <Icon name="Search" size={20} />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-md hover:bg-background nav-transition touch-target"
              aria-label="Notifications"
            >
              <Icon name="Bell" size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-surface border border-border rounded-md elevation-lg z-1100">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-text-primary">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-4 border-b border-border last:border-b-0 hover:bg-background nav-transition cursor-pointer"
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === 'error' ? 'bg-error' :
                          notification.type === 'warning' ? 'bg-warning' : 'bg-accent'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-text-primary">
                            {notification.title}
                          </p>
                          <p className="text-xs text-text-secondary mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-border">
                  <button className="w-full text-sm text-accent hover:text-primary nav-transition">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-background nav-transition touch-target"
            >
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">JD</span>
              </div>
              <Icon name="ChevronDown" size={16} className="text-text-secondary" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-md elevation-lg z-1100">
                <div className="p-4 border-b border-border">
                  <p className="font-medium text-text-primary">John Doe</p>
                  <p className="text-sm text-text-secondary">john@company.com</p>
                </div>
                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-background nav-transition">
                    Profile Settings
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-background nav-transition">
                    Account Preferences
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-background nav-transition">
                    Billing & Usage
                  </button>
                  <hr className="my-2 border-border" />
                  <button className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-background nav-transition">
                    Help & Support
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-error hover:bg-background nav-transition">
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      <div className="md:hidden px-6 py-3 border-t border-border bg-surface">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Icon
            name="Search"
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
          />
          <input
            type="text"
            placeholder="Search brands, competitors..."
            value={searchValue}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          />
        </form>
      </div>
    </header>
  );
};

export default Header;