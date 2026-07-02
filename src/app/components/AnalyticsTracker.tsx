// Analytics Tracker Component
import { useEffect } from 'react';
import { initAnalytics, trackPageView } from '../utils/analytics';

export function AnalyticsTracker() {
  useEffect(() => {
    // Initialize analytics on mount
    initAnalytics();

    // Track page changes
    const handleRouteChange = () => {
      const currentPage = window.location.pathname;
      trackPageView(currentPage);
    };

    // Listen for popstate (browser back/forward)
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // This component doesn't render anything
  return null;
}
