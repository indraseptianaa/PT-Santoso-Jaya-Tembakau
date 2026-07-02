// Analytics Tracking System
export interface VisitorData {
  id: string;
  timestamp: number;
  country: string;
  city: string;
  ip?: string;
  countryCode: string;
  flag: string;
}

export interface PageView {
  id: string;
  page: string;
  timestamp: number;
  sessionId: string;
}

export interface Session {
  id: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  pageViews: number;
}

export interface Activity {
  id: string;
  type: 'visitor' | 'blog' | 'product' | 'update';
  message: string;
  timestamp: number;
}

export interface BrowserData {
  name: string;
  version: string;
}

export interface DeviceData {
  type: 'mobile' | 'tablet' | 'desktop';
  os: string;
}

// Get visitor's geolocation data
export async function getVisitorLocation(): Promise<VisitorData | null> {
  try {
    // Using ipapi.co for free geolocation (limited to 1000 requests/day)
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    const countryFlags: { [key: string]: string } = {
      'ID': '🇮🇩',
      'MY': '🇲🇾',
      'SG': '🇸🇬',
      'TH': '🇹🇭',
      'PH': '🇵🇭',
      'VN': '🇻🇳',
      'US': '🇺🇸',
      'GB': '🇬🇧',
      'AU': '🇦🇺',
      'JP': '🇯🇵',
      'KR': '🇰🇷',
      'CN': '🇨🇳',
      'IN': '🇮🇳',
      'BR': '🇧🇷',
      'DE': '🇩🇪',
      'FR': '🇫🇷',
      'IT': '🇮🇹',
      'ES': '🇪🇸',
      'NL': '🇳🇱',
      'CA': '🇨🇦',
    };

    return {
      id: Date.now().toString(),
      timestamp: Date.now(),
      country: data.country_name || 'Unknown',
      city: data.city || 'Unknown',
      ip: data.ip,
      countryCode: data.country_code || 'XX',
      flag: countryFlags[data.country_code] || '🌏',
    };
  } catch (error) {
    console.error('Failed to get location:', error);
    // Fallback to default
    return {
      id: Date.now().toString(),
      timestamp: Date.now(),
      country: 'Indonesia',
      city: 'Jakarta',
      countryCode: 'ID',
      flag: '🇮🇩',
    };
  }
}

// Get browser information
export function getBrowserInfo(): BrowserData {
  const ua = navigator.userAgent;
  let browserName = 'Unknown';
  let version = '';

  if (ua.indexOf('Chrome') > -1 && ua.indexOf('Edg') === -1) {
    browserName = 'Chrome';
    version = ua.match(/Chrome\/(\d+)/)?.[1] || '';
  } else if (ua.indexOf('Safari') > -1 && ua.indexOf('Chrome') === -1) {
    browserName = 'Safari';
    version = ua.match(/Version\/(\d+)/)?.[1] || '';
  } else if (ua.indexOf('Firefox') > -1) {
    browserName = 'Firefox';
    version = ua.match(/Firefox\/(\d+)/)?.[1] || '';
  } else if (ua.indexOf('Edg') > -1) {
    browserName = 'Edge';
    version = ua.match(/Edg\/(\d+)/)?.[1] || '';
  }

  return { name: browserName, version };
}

// Get device information
export function getDeviceInfo(): DeviceData {
  const ua = navigator.userAgent;
  let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';
  let os = 'Unknown';

  // Detect OS
  if (ua.indexOf('Win') > -1) os = 'Windows';
  else if (ua.indexOf('Mac') > -1) os = 'MacOS';
  else if (ua.indexOf('Linux') > -1) os = 'Linux';
  else if (ua.indexOf('Android') > -1) os = 'Android';
  else if (ua.indexOf('iOS') > -1 || ua.indexOf('iPhone') > -1 || ua.indexOf('iPad') > -1) os = 'iOS';

  // Detect device type
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    deviceType = 'tablet';
  } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    deviceType = 'mobile';
  }

  return { type: deviceType, os };
}

// Track page view
export function trackPageView(page: string) {
  const sessionId = getSessionId();
  const pageViews = getPageViews();
  
  const newPageView: PageView = {
    id: Date.now().toString(),
    page,
    timestamp: Date.now(),
    sessionId,
  };

  pageViews.push(newPageView);
  localStorage.setItem('analytics_pageviews', JSON.stringify(pageViews));

  // Update session
  updateSession(sessionId);
}

// Get or create session
function getSessionId(): string {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  
  if (!sessionId) {
    sessionId = Date.now().toString();
    sessionStorage.setItem('analytics_session_id', sessionId);
    
    // Create new session
    const sessions = getSessions();
    sessions.push({
      id: sessionId,
      startTime: Date.now(),
      pageViews: 0,
    });
    localStorage.setItem('analytics_sessions', JSON.stringify(sessions));
  }

  return sessionId;
}

// Update session
function updateSession(sessionId: string) {
  const sessions = getSessions();
  const sessionIndex = sessions.findIndex(s => s.id === sessionId);
  
  if (sessionIndex !== -1) {
    sessions[sessionIndex].endTime = Date.now();
    sessions[sessionIndex].duration = sessions[sessionIndex].endTime - sessions[sessionIndex].startTime;
    sessions[sessionIndex].pageViews += 1;
    localStorage.setItem('analytics_sessions', JSON.stringify(sessions));
  }
}

// Track visitor
export async function trackVisitor() {
  const visitors = getVisitors();
  const today = new Date().toDateString();
  
  // Check if already tracked today
  const trackedToday = visitors.some(v => {
    const visitorDate = new Date(v.timestamp).toDateString();
    return visitorDate === today;
  });

  if (!trackedToday) {
    const visitorData = await getVisitorLocation();
    if (visitorData) {
      visitors.push(visitorData);
      localStorage.setItem('analytics_visitors', JSON.stringify(visitors));

      // Add activity
      addActivity({
        id: Date.now().toString(),
        type: 'visitor',
        message: `Pengunjung baru dari ${visitorData.city}, ${visitorData.country}`,
        timestamp: Date.now(),
      });
    }
  }
}

// Add activity
export function addActivity(activity: Activity) {
  const activities = getActivities();
  activities.unshift(activity); // Add to beginning
  
  // Keep only last 20 activities
  if (activities.length > 20) {
    activities.splice(20);
  }
  
  localStorage.setItem('analytics_activities', JSON.stringify(activities));
}

// Get visitors
export function getVisitors(): VisitorData[] {
  const data = localStorage.getItem('analytics_visitors');
  return data ? JSON.parse(data) : [];
}

// Get page views
export function getPageViews(): PageView[] {
  const data = localStorage.getItem('analytics_pageviews');
  return data ? JSON.parse(data) : [];
}

// Get sessions
export function getSessions(): Session[] {
  const data = localStorage.getItem('analytics_sessions');
  return data ? JSON.parse(data) : [];
}

// Get activities
export function getActivities(): Activity[] {
  const data = localStorage.getItem('analytics_activities');
  return data ? JSON.parse(data) : [];
}

// Calculate statistics
export function getAnalyticsStats() {
  const visitors = getVisitors();
  const pageViews = getPageViews();
  const sessions = getSessions();

  // Total visitors
  const totalVisitors = visitors.length;

  // Active users (last 24 hours)
  const last24Hours = Date.now() - (24 * 60 * 60 * 1000);
  const activeUsers = visitors.filter(v => v.timestamp > last24Hours).length;

  // Total page views
  const totalPageViews = pageViews.length;

  // Average session duration
  const completedSessions = sessions.filter(s => s.duration);
  const avgDuration = completedSessions.length > 0
    ? completedSessions.reduce((sum, s) => sum + (s.duration || 0), 0) / completedSessions.length
    : 0;

  // Format duration
  const avgDurationFormatted = formatDuration(avgDuration);

  // Visitor by country
  const countryCount: { [key: string]: { count: number; flag: string; code: string } } = {};
  visitors.forEach(v => {
    if (!countryCount[v.country]) {
      countryCount[v.country] = { count: 0, flag: v.flag, code: v.countryCode };
    }
    countryCount[v.country].count++;
  });

  const visitorsByCountry = Object.entries(countryCount)
    .map(([country, data]) => ({
      country,
      count: data.count,
      percentage: totalVisitors > 0 ? (data.count / totalVisitors) * 100 : 0,
      flag: data.flag,
      code: data.code,
    }))
    .sort((a, b) => b.count - a.count);

  // Popular pages
  const pageCount: { [key: string]: number } = {};
  pageViews.forEach(pv => {
    pageCount[pv.page] = (pageCount[pv.page] || 0) + 1;
  });

  const popularPages = Object.entries(pageCount)
    .map(([page, count]) => ({ page, views: count }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  return {
    totalVisitors,
    activeUsers,
    totalPageViews,
    avgDuration: avgDurationFormatted,
    visitorsByCountry,
    popularPages,
  };
}

// Get browser statistics
export function getBrowserStats() {
  const browsers: { [key: string]: number } = {};
  const devices: { [key: string]: number } = {};
  
  // This would ideally be tracked on each visit, but for demo we'll generate some data
  const storedBrowsers = localStorage.getItem('analytics_browsers');
  const storedDevices = localStorage.getItem('analytics_devices');
  
  if (storedBrowsers) {
    Object.assign(browsers, JSON.parse(storedBrowsers));
  } else {
    // Initialize with current browser
    const currentBrowser = getBrowserInfo();
    browsers[currentBrowser.name] = 1;
  }
  
  if (storedDevices) {
    Object.assign(devices, JSON.parse(storedDevices));
  } else {
    // Initialize with current device
    const currentDevice = getDeviceInfo();
    devices[currentDevice.type] = 1;
  }

  const totalBrowsers = Object.values(browsers).reduce((sum, count) => sum + count, 0);
  const totalDevices = Object.values(devices).reduce((sum, count) => sum + count, 0);

  const browserStats = Object.entries(browsers).map(([name, count]) => ({
    name,
    count,
    percentage: totalBrowsers > 0 ? (count / totalBrowsers) * 100 : 0,
  }));

  const deviceStats = Object.entries(devices).map(([type, count]) => ({
    type,
    count,
    percentage: totalDevices > 0 ? (count / totalDevices) * 100 : 0,
  }));

  return { browserStats, deviceStats };
}

// Track browser and device
export function trackBrowserAndDevice() {
  const browser = getBrowserInfo();
  const device = getDeviceInfo();

  // Update browser stats
  const browsers = JSON.parse(localStorage.getItem('analytics_browsers') || '{}');
  browsers[browser.name] = (browsers[browser.name] || 0) + 1;
  localStorage.setItem('analytics_browsers', JSON.stringify(browsers));

  // Update device stats
  const devices = JSON.parse(localStorage.getItem('analytics_devices') || '{}');
  devices[device.type] = (devices[device.type] || 0) + 1;
  localStorage.setItem('analytics_devices', JSON.stringify(devices));
}

// Format duration
function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  }
  return `${seconds}s`;
}

// Generate demo activities (for initial setup)
export function generateDemoActivities() {
  const activities = getActivities();
  
  // Only generate if there are no activities yet
  if (activities.length === 0) {
    const demoActivities: Activity[] = [
      {
        id: '1',
        type: 'visitor',
        message: 'Pengunjung baru dari Jakarta, Indonesia',
        timestamp: Date.now() - 3600000, // 1 hour ago
      },
      {
        id: '2',
        type: 'blog',
        message: 'Blog baru "Sejarah Tembakau Indonesia" ditambahkan',
        timestamp: Date.now() - 7200000, // 2 hours ago
      },
      {
        id: '3',
        type: 'product',
        message: 'Produk Rokok "Signature Mild" diperbarui',
        timestamp: Date.now() - 10800000, // 3 hours ago
      },
      {
        id: '4',
        type: 'update',
        message: 'Landing page content diperbarui',
        timestamp: Date.now() - 14400000, // 4 hours ago
      },
      {
        id: '5',
        type: 'visitor',
        message: 'Pengunjung baru dari Surabaya, Indonesia',
        timestamp: Date.now() - 18000000, // 5 hours ago
      },
      {
        id: '6',
        type: 'product',
        message: 'Produk TSC baru "Premium Virginia" ditambahkan',
        timestamp: Date.now() - 21600000, // 6 hours ago
      },
      {
        id: '7',
        type: 'blog',
        message: 'Blog "Proses Produksi Rokok Berkualitas" diperbarui',
        timestamp: Date.now() - 25200000, // 7 hours ago
      },
      {
        id: '8',
        type: 'update',
        message: 'Halaman Tentang Kami diperbarui',
        timestamp: Date.now() - 28800000, // 8 hours ago
      },
    ];
    
    localStorage.setItem('analytics_activities', JSON.stringify(demoActivities));
  }
}

// Initialize analytics
export async function initAnalytics() {
  await trackVisitor();
  trackBrowserAndDevice();
  
  // Track current page
  const currentPage = window.location.pathname;
  trackPageView(currentPage);
  
  // Generate demo activities on first load
  generateDemoActivities();
}
