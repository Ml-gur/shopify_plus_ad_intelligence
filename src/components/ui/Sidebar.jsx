import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Sidebar = ({ collapsed, onToggle }) => {
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'Overview and key metrics'
    },
    {
      label: 'Brand Discovery',
      path: '/brand-discovery',
      icon: 'Search',
      tooltip: 'Find and analyze competitors'
    },
    {
      label: 'Brand Profile',
      path: '/brand-profile',
      icon: 'Building2',
      tooltip: 'Detailed brand analysis'
    },
    {
      label: 'Analytics Hub',
      path: '/analytics-hub',
      icon: 'BarChart3',
      tooltip: 'Advanced data visualization'
    },
    {
      label: 'Alert Center',
      path: '/alert-center',
      icon: 'Bell',
      tooltip: 'Notifications and alerts',
      badge: 3
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {!collapsed && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-900"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-16 left-0 h-[calc(100vh-4rem)] bg-surface border-r border-border z-900
          nav-transition lg:fixed
          ${collapsed ? '-translate-x-full lg:translate-x-0 lg:w-16' : 'translate-x-0 w-60 lg:w-60'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Navigation Items */}
          <nav className="flex-1 px-3 py-6 space-y-2">
            {navigationItems.map((item) => {
              const active = isActive(item.path);
              
              return (
                <div key={item.path} className="relative group">
                  <Link
                    to={item.path}
                    className={`
                      flex items-center px-3 py-3 rounded-md nav-transition touch-target
                      ${active 
                        ? 'bg-accent text-white' :'text-text-primary hover:bg-background hover:text-accent'
                      }
                      ${collapsed ? 'lg:justify-center' : 'justify-start'}
                    `}
                    onClick={() => {
                      if (window.innerWidth < 1024) {
                        onToggle();
                      }
                    }}
                  >
                    <div className="relative flex items-center">
                      <Icon 
                        name={item.icon} 
                        size={20} 
                        className={collapsed ? '' : 'mr-3'}
                      />
                      {item.badge && (
                        <span className={`
                          absolute -top-1 -right-1 w-4 h-4 bg-error text-white text-xs 
                          rounded-full flex items-center justify-center font-medium
                          ${collapsed ? 'lg:block' : 'hidden'}
                        `}>
                          {item.badge > 9 ? '9+' : item.badge}
                        </span>
                      )}
                    </div>
                    
                    <span className={`
                      font-medium truncate
                      ${collapsed ? 'lg:hidden' : 'block'}
                    `}>
                      {item.label}
                    </span>
                    
                    {item.badge && !collapsed && (
                      <span className="ml-auto w-5 h-5 bg-error text-white text-xs rounded-full flex items-center justify-center font-medium">
                        {item.badge > 9 ? '9+' : item.badge}
                      </span>
                    )}
                  </Link>

                  {/* Tooltip for collapsed state */}
                  {collapsed && (
                    <div className="
                      absolute left-full top-1/2 transform -translate-y-1/2 ml-2
                      px-3 py-2 bg-text-primary text-white text-sm rounded-md
                      opacity-0 invisible group-hover:opacity-100 group-hover:visible
                      nav-transition pointer-events-none whitespace-nowrap z-1100
                      hidden lg:block
                    ">
                      {item.tooltip}
                      <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-text-primary" />
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Collapse Toggle (Desktop Only) */}
          <div className="hidden lg:block p-3 border-t border-border">
            <button
              onClick={onToggle}
              className={`
                w-full flex items-center px-3 py-2 rounded-md
                text-text-secondary hover:text-text-primary hover:bg-background
                nav-transition touch-target
                ${collapsed ? 'justify-center' : 'justify-start'}
              `}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <Icon 
                name={collapsed ? 'ChevronRight' : 'ChevronLeft'} 
                size={18}
                className={collapsed ? '' : 'mr-3'}
              />
              {!collapsed && (
                <span className="text-sm font-medium">Collapse</span>
              )}
            </button>
          </div>

          {/* User Section (when expanded) */}
          {!collapsed && (
            <div className="p-3 border-t border-border">
              <div className="flex items-center px-3 py-2 rounded-md bg-background">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-medium">JD</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    John Doe
                  </p>
                  <p className="text-xs text-text-secondary truncate">
                    Marketing Manager
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;