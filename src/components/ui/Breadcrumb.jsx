import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();
  
  const routeMap = {
    '/dashboard': 'Dashboard',
    '/brand-discovery': 'Brand Discovery',
    '/brand-profile': 'Brand Profile',
    '/analytics-hub': 'Analytics Hub',
    '/alert-center': 'Alert Center'
  };

  const generateBreadcrumbs = () => {
    if (customItems) {
      return customItems;
    }

    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbs = [];

    // Always start with Dashboard as home
    if (location.pathname !== '/dashboard') {
      breadcrumbs.push({
        label: 'Dashboard',
        path: '/dashboard',
        isActive: false
      });
    }

    // Build breadcrumbs from path segments
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      if (routeMap[currentPath]) {
        breadcrumbs.push({
          label: routeMap[currentPath],
          path: currentPath,
          isActive: isLast
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on dashboard or if only one item
  if (location.pathname === '/dashboard' || breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6" aria-label="Breadcrumb">
      <Icon name="Home" size={16} className="text-text-secondary" />
      
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={crumb.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-text-secondary" />
          )}
          
          {crumb.isActive ? (
            <span className="font-medium text-text-primary">
              {crumb.label}
            </span>
          ) : (
            <Link
              to={crumb.path}
              className="text-text-secondary hover:text-accent nav-transition"
            >
              {crumb.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;