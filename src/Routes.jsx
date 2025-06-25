import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

// Page imports
import Login from "pages/login";
import Dashboard from "pages/dashboard";
import BrandDiscovery from "pages/brand-discovery";
import BrandProfile from "pages/brand-profile";
import AnalyticsHub from "pages/analytics-hub";
import AlertCenter from "pages/alert-center";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/brand-discovery" element={<BrandDiscovery />} />
          <Route path="/brand-profile" element={<BrandProfile />} />
          <Route path="/analytics-hub" element={<AnalyticsHub />} />
          <Route path="/alert-center" element={<AlertCenter />} />
          <Route path="/" element={<Login />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;