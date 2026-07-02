// Employee Dashboard - untuk karyawan yang sudah diterima
import { useState, useEffect } from 'react';
import { User, Users, Bell, LogOut, Menu, X, ChevronLeft, Shield, Smartphone, Copy, Check, AlertTriangle, Eye, Calendar, Phone, Mail, GraduationCap, Award, Building, FileText, CheckCircle, MapPin, Search, UserCircle, UserCheck, TrendingUp, Globe, MousePointer, Clock, BarChart3, Activity, Monitor, Chrome } from 'lucide-react';
import { ProfileChangeNotification } from './ProfileChangeNotification';
import { CMSPanel } from './CMSPanel';
import { getAnalyticsStats, getBrowserStats, getActivities } from '../utils/analytics';
import { VisitorsDetailView, ActivitiesDetailView, PagesDetailView, BrowserDetailView } from './AnalyticsDetailViews';

type EmployeeProfile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  joinDate: string;
  photo?: string;
  status: 'active' | 'inactive';
  address: string;
  education: string;
  skills: string[];
  jobDescription: string;
  responsibilities: string[];
};

type Employee = {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  joinDate: string;
  photo?: string;
  status: 'active' | 'inactive';
  address: string;
  education: string;
  skills: string[];
  jobDescription: string;
  responsibilities: string[];
};

type PendingProfileChange = {
  id: string;
  employeeId: string;
  employeeEmail: string;
  employeeName: string;
  changes: Partial<Employee>;
  requestedBy: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
};

type EmployeeDashboardProps = {
  onLogout: () => void;
  employeeProfile: EmployeeProfile;
};

export function EmployeeDashboard({ onLogout, employeeProfile }: EmployeeDashboardProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'profile' | 'team' | 'team-detail' | 'notifications' | 'cms'>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [activeCMSSection, setActiveCMSSection] = useState<'landing' | 'about' | 'blog' | 'products'>('landing');
  
  // Team Filter States
  const [teamSearchQuery, setTeamSearchQuery] = useState('');
  const [teamFilterDepartment, setTeamFilterDepartment] = useState('all');
  const [teamFilterStatus, setTeamFilterStatus] = useState('all');
  
  // 2FA States
  const [is2FAEnabled, setIs2FAEnabled] = useState(() => {
    const saved = localStorage.getItem('user_2fa_' + employeeProfile.email);
    return saved === 'enabled';
  });
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [showQRCode, setShowQRCode] = useState(true);
  const [verificationCode, setVerificationCode] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [copiedBackupCodes, setCopiedBackupCodes] = useState(false);
  const [copiedSecretKey, setCopiedSecretKey] = useState(false);
  const [isVerifying2FA, setIsVerifying2FA] = useState(false);
  const [qrCodeUrl] = useState(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/PT%20Santoso%20Jaya:${employeeProfile.email}?secret=JBSWY3DPEHPK3PXP&issuer=PT%20Santoso%20Jaya`);
  const [secretKey] = useState('JBSWY3DPEHPK3PXP');

  // Pending Profile Changes
  const [pendingChanges, setPendingChanges] = useState<PendingProfileChange[]>(() => {
    const saved = localStorage.getItem('pending_profile_changes');
    return saved ? JSON.parse(saved) : [];
  });

  const myPendingChanges = pendingChanges.filter(
    change => change.employeeEmail === employeeProfile.email && change.status === 'pending'
  );

  // Analytics States
  const [analyticsStats, setAnalyticsStats] = useState({
    totalVisitors: 0,
    activeUsers: 0,
    totalPageViews: 0,
    avgDuration: '0s',
    visitorsByCountry: [] as any[],
    popularPages: [] as any[],
  });
  const [browserStats, setBrowserStats] = useState({
    browserStats: [] as any[],
    deviceStats: [] as any[],
  });
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [detailView, setDetailView] = useState<'none' | 'visitors' | 'activities' | 'pages' | 'browser'>('none');

  // Load analytics data
  useEffect(() => {
    const loadAnalytics = () => {
      const stats = getAnalyticsStats();
      const browsers = getBrowserStats();
      const activities = getActivities();
      
      setAnalyticsStats(stats);
      setBrowserStats(browsers);
      setRecentActivities(activities);
    };

    loadAnalytics();
    
    // Refresh every 5 seconds
    const interval = setInterval(loadAnalytics, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Sync with localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('pending_profile_changes');
      if (saved) {
        setPendingChanges(JSON.parse(saved));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    
    // Check every 2 seconds
    const interval = setInterval(() => {
      const saved = localStorage.getItem('pending_profile_changes');
      if (saved) {
        setPendingChanges(JSON.parse(saved));
      }
    }, 2000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Team Data
  const [employees] = useState<Employee[]>([
    {
      id: '1',
      name: 'Indra Septiana',
      email: 'indra@santosojayatembakau.com',
      phone: '081234567890',
      position: 'Design Manager & Website Manager',
      department: 'IT & Design',
      joinDate: '2023-06-15',
      photo: 'https://ui-avatars.com/api/?name=Indra+Septiana&background=f59e0b&color=fff&size=200',
      status: 'active',
      address: 'Jl. Sunan Kudus No. 123, Kudus, Jawa Tengah',
      education: 'S1 Desain Komunikasi Visual - Institut Seni Indonesia (2019-2023)',
      skills: ['UI/UX Design', 'Web Development', 'Graphic Design', 'Figma', 'React', 'Tailwind CSS'],
      jobDescription: 'Memimpin tim desain dan web development untuk menciptakan pengalaman digital yang menarik dan efektif. Bertanggung jawab atas strategi visual brand PT Santoso Jaya Tembakau dan pengelolaan website perusahaan.',
      responsibilities: [
        'Merancang dan mengembangkan website perusahaan dengan teknologi modern (React, Tailwind CSS)',
        'Membuat konsep desain visual untuk kampanye marketing dan branding produk',
        'Mengelola tim desain grafis dan memastikan konsistensi brand identity',
        'Berkolaborasi dengan departemen marketing untuk strategi digital',
        'Melakukan user research dan testing untuk meningkatkan user experience',
        'Maintenance dan update berkala untuk website dan sistem digital'
      ]
    }
  ]);

  // Handle approve/reject changes
  const handleApproveChange = (changeId: string) => {
    const change = pendingChanges.find(c => c.id === changeId);
    if (!change) return;

    // Update the change status
    const updatedChanges = pendingChanges.map(c =>
      c.id === changeId ? { ...c, status: 'approved' as const } : c
    );
    
    setPendingChanges(updatedChanges);
    localStorage.setItem('pending_profile_changes', JSON.stringify(updatedChanges));
    
    alert('✅ Perubahan profil telah disetujui!\n\nProfil Anda telah diperbarui sesuai dengan perubahan yang diajukan.');
  };

  const handleRejectChange = (changeId: string) => {
    const updatedChanges = pendingChanges.map(c =>
      c.id === changeId ? { ...c, status: 'rejected' as const } : c
    );
    
    setPendingChanges(updatedChanges);
    localStorage.setItem('pending_profile_changes', JSON.stringify(updatedChanges));
    
    alert('❌ Perubahan profil telah ditolak.\n\nPerubahan tidak akan diterapkan pada profil Anda.');
  };

  // 2FA Functions
  const handleEnable2FA = () => {
    setShow2FASetup(true);
    setShowQRCode(true);
    setVerificationCode('');
    const codes = Array.from({ length: 10 }, () => 
      Math.random().toString(36).substring(2, 10).toUpperCase()
    );
    setBackupCodes(codes);
  };

  const handleDisable2FA = () => {
    if (window.confirm('Apakah Anda yakin ingin menonaktifkan Autentikasi Dua Faktor?\n\nAkun Anda akan menjadi kurang aman.')) {
      setIs2FAEnabled(false);
      localStorage.removeItem('user_2fa_' + employeeProfile.email);
      alert('🔓 Autentikasi Dua Faktor telah dinonaktifkan.');
    }
  };

  const handleVerify2FA = () => {
    if (verificationCode.length !== 6) {
      alert('Kode verifikasi harus 6 digit!');
      return;
    }

    setIsVerifying2FA(true);
    
    setTimeout(() => {
      setIsVerifying2FA(false);
      setIs2FAEnabled(true);
      localStorage.setItem('user_2fa_' + employeeProfile.email, 'enabled');
      setShow2FASetup(false);
      setVerificationCode('');
      alert('✅ Autentikasi Dua Faktor telah diaktifkan!\n\nAkun Anda sekarang lebih aman.');
    }, 1500);
  };

  const copyBackupCodesToClipboard = () => {
    const codesText = backupCodes.join('\n');
    navigator.clipboard.writeText(codesText);
    setCopiedBackupCodes(true);
    setTimeout(() => setCopiedBackupCodes(false), 2000);
  };

  const copySecretKeyToClipboard = () => {
    navigator.clipboard.writeText(secretKey);
    setCopiedSecretKey(true);
    setTimeout(() => setCopiedSecretKey(false), 2000);
  };

  // Helper function to format time ago
  const getTimeAgo = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Baru saja';
    if (minutes < 60) return `${minutes} menit yang lalu`;
    if (hours < 24) return `${hours} jam yang lalu`;
    return `${days} hari yang lalu`;
  };

  return (
    <div className="h-screen bg-white lg:flex relative overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <div
        className={`
          bg-white text-gray-800 flex flex-col border-r border-gray-200 shadow-lg transition-all duration-300 h-screen
          lg:relative lg:translate-x-0
          fixed inset-y-0 left-0 z-40
          ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0 lg:w-16'}
        `}
      >
          {/* Toggle Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute top-4 right-4 z-20 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors shadow-sm"
          >
            <ChevronLeft className={`text-gray-600 transition-transform duration-300 ${!sidebarOpen ? 'rotate-180' : ''}`} size={18} />
          </button>

          {/* Profile Section - Only show when sidebar is open */}
          {sidebarOpen && (
            <div className="p-4 border-b border-gray-200 mt-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {employeeProfile.photo ? (
                    <img src={employeeProfile.photo} alt={employeeProfile.name} className="w-full h-full object-cover" />
                  ) : (
                    <User size={20} className="text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold truncate text-gray-900">{employeeProfile.name}</h3>
                  <p className="text-xs text-gray-600 truncate">{employeeProfile.position}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className={`flex-1 px-2 space-y-1 ${sidebarOpen ? 'py-4' : 'py-16'}`}>
            <button
              onClick={() => {
                setActiveTab('dashboard');
                if (window.innerWidth < 1024) setSidebarOpen(false);
              }}
              className={`w-full flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-3 rounded-lg transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-amber-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
              title={!sidebarOpen ? 'Dashboard' : ''}
            >
              <User size={18} />
              {sidebarOpen && <span className="text-sm">Dashboard</span>}
            </button>

            <button
              onClick={() => {
                setActiveTab('profile');
                if (window.innerWidth < 1024) setSidebarOpen(false);
              }}
              className={`w-full flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-3 rounded-lg transition-colors ${
                activeTab === 'profile'
                  ? 'bg-amber-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
              title={!sidebarOpen ? 'Profil Saya' : ''}
            >
              <User size={18} />
              {sidebarOpen && <span className="text-sm">Profil Saya</span>}
            </button>

            <button
              onClick={() => {
                setActiveTab('team');
                if (window.innerWidth < 1024) setSidebarOpen(false);
              }}
              className={`w-full flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-3 rounded-lg transition-colors relative ${
                activeTab === 'team' || activeTab === 'team-detail'
                  ? 'bg-amber-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
              title={!sidebarOpen ? 'Team SJT' : ''}
            >
              <Users size={18} />
              {sidebarOpen && <span className="text-sm">Team SJT</span>}
            </button>

            <button
              onClick={() => {
                setActiveTab('notifications');
                if (window.innerWidth < 1024) setSidebarOpen(false);
              }}
              className={`w-full flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-3 rounded-lg transition-colors relative ${
                activeTab === 'notifications'
                  ? 'bg-amber-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
              title={!sidebarOpen ? 'Notifikasi' : ''}
            >
              <Bell size={18} />
              {sidebarOpen && <span className="text-sm">Notifikasi</span>}
              {myPendingChanges.length > 0 && (
                <span className={`absolute ${sidebarOpen ? 'right-4' : 'top-1 right-1'} bg-red-500 text-white text-xs font-bold rounded-full ${sidebarOpen ? 'w-5 h-5' : 'w-4 h-4'} flex items-center justify-center`}>
                  {sidebarOpen ? myPendingChanges.length : ''}
                </span>
              )}
            </button>

            {/* CMS Menu - Only for indra@santosojayatembakau.com */}
            {employeeProfile.email === 'indra@santosojayatembakau.com' && (
              <>
                <button
                  onClick={() => {
                    setActiveTab('cms');
                    setActiveCMSSection('landing');
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-3 rounded-lg transition-colors ${
                    activeTab === 'cms' && activeCMSSection === 'landing'
                      ? 'bg-amber-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  title={!sidebarOpen ? 'Landing Page' : ''}
                >
                  <FileText size={18} />
                  {sidebarOpen && <span className="text-sm">Landing Page</span>}
                </button>

                <button
                  onClick={() => {
                    setActiveTab('cms');
                    setActiveCMSSection('about');
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-3 rounded-lg transition-colors ${
                    activeTab === 'cms' && activeCMSSection === 'about'
                      ? 'bg-amber-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  title={!sidebarOpen ? 'Tentang Kami' : ''}
                >
                  <FileText size={18} />
                  {sidebarOpen && <span className="text-sm">Tentang Kami</span>}
                </button>

                <button
                  onClick={() => {
                    setActiveTab('cms');
                    setActiveCMSSection('blog');
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-3 rounded-lg transition-colors ${
                    activeTab === 'cms' && activeCMSSection === 'blog'
                      ? 'bg-amber-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  title={!sidebarOpen ? 'Blog' : ''}
                >
                  <FileText size={18} />
                  {sidebarOpen && <span className="text-sm">Blog</span>}
                </button>

                <button
                  onClick={() => {
                    setActiveTab('cms');
                    setActiveCMSSection('products');
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-3 rounded-lg transition-colors ${
                    activeTab === 'cms' && activeCMSSection === 'products'
                      ? 'bg-amber-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  title={!sidebarOpen ? 'Produk' : ''}
                >
                  <FileText size={18} />
                  {sidebarOpen && <span className="text-sm">Produk</span>}
                </button>
              </>
            )}
          </nav>

          {/* Logout */}
          <div className={`border-t border-gray-200 ${sidebarOpen ? 'p-4' : 'p-2'}`}>
            <button
              onClick={onLogout}
              className={`w-full flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors`}
              title={!sidebarOpen ? 'Keluar' : ''}
            >
              <LogOut size={18} />
              {sidebarOpen && <span className="text-sm font-medium">Keluar</span>}
            </button>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col h-screen bg-gray-50">
          {/* Mobile Header */}
          <div className="lg:hidden bg-white text-gray-900 p-4 flex items-center justify-between sticky top-0 z-20 shadow-sm border-b border-gray-200">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold">Employee Dashboard</h1>
            <div className="w-10"></div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 lg:p-8">
              {/* Dashboard Tab */}
              {activeTab === 'dashboard' && (
            <>
              {detailView === 'none' ? (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-1">Dashboard</h2>
                    <p className="text-gray-600">Selamat datang, {employeeProfile.name}!</p>
                  </div>

              {/* Notification Alert */}
              {myPendingChanges.length > 0 && (
                <div className="bg-amber-50 border-2 border-amber-400 rounded-xl p-4 flex items-start gap-3">
                  <AlertTriangle className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
                  <div className="flex-1">
                    <p className="font-semibold text-amber-900">
                      Anda memiliki {myPendingChanges.length} permintaan perubahan profil
                    </p>
                    <p className="text-sm text-amber-700 mt-1">
                      HR Admin telah mengajukan perubahan pada profil Anda. Tinjau dan setujui perubahan tersebut.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium text-sm"
                  >
                    Lihat Sekarang
                  </button>
                </div>
              )}

              {/* Quick Stats - Admin Dashboard for indra@santosojayatembakau.com */}
              {employeeProfile.email === 'indra@santosojayatembakau.com' ? (
                <>
                  {/* Website Analytics Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-xl p-6 shadow-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Eye size={32} className="opacity-80" />
                        <TrendingUp size={20} className="opacity-60" />
                      </div>
                      <h3 className="text-3xl font-bold mb-1">{analyticsStats.totalVisitors.toLocaleString()}</h3>
                      <p className="text-sm opacity-90">Total Kunjungan</p>
                      <p className="text-xs opacity-75 mt-1">Real-time data</p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Activity size={32} className="opacity-80" />
                        <TrendingUp size={20} className="opacity-60" />
                      </div>
                      <h3 className="text-3xl font-bold mb-1">{analyticsStats.activeUsers.toLocaleString()}</h3>
                      <p className="text-sm opacity-90">Active Users (24h)</p>
                      <p className="text-xs opacity-75 mt-1">Last 24 hours</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl p-6 shadow-lg">
                      <div className="flex items-center justify-between mb-2">
                        <FileText size={32} className="opacity-80" />
                        <TrendingUp size={20} className="opacity-60" />
                      </div>
                      <h3 className="text-3xl font-bold mb-1">{analyticsStats.totalPageViews.toLocaleString()}</h3>
                      <p className="text-sm opacity-90">Page Views</p>
                      <p className="text-xs opacity-75 mt-1">All time</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Clock size={32} className="opacity-80" />
                      </div>
                      <h3 className="text-3xl font-bold mb-1">{analyticsStats.avgDuration}</h3>
                      <p className="text-sm opacity-90">Avg. Session</p>
                      <p className="text-xs opacity-75 mt-1">Average duration</p>
                    </div>
                  </div>

                  {/* Visitor by Country & Recent Activity */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Visitor by Country */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-lg text-gray-900">Pengunjung Berdasarkan Negara</h3>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setDetailView('visitors')}
                            className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                          >
                            <Eye size={14} />
                            Detail
                          </button>
                          <Globe className="text-gray-400" size={20} />
                        </div>
                      </div>
                      <div className="space-y-3">
                        {analyticsStats.visitorsByCountry.length > 0 ? (
                          analyticsStats.visitorsByCountry.slice(0, 5).map((country, index) => {
                            const colors = ['orange', 'blue', 'green', 'purple', 'pink'];
                            const color = colors[index % colors.length];
                            return (
                              <div key={country.country} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className={`w-8 h-8 rounded-full bg-${color}-100 flex items-center justify-center text-sm`}>
                                    {country.flag}
                                  </div>
                                  <span className="text-gray-700">{country.country}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="w-32 bg-gray-200 rounded-full h-2">
                                    <div className={`bg-${color}-500 h-2 rounded-full`} style={{ width: `${country.percentage}%` }}></div>
                                  </div>
                                  <span className="text-sm font-semibold text-gray-900 w-12 text-right">
                                    {country.percentage.toFixed(0)}%
                                  </span>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <Globe size={48} className="mx-auto mb-2 opacity-20" />
                            <p className="text-sm">Belum ada data pengunjung</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-lg text-gray-900">Aktivitas Terkini</h3>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setDetailView('activities')}
                            className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                          >
                            <Eye size={14} />
                            Detail
                          </button>
                          <Activity className="text-gray-400" size={20} />
                        </div>
                      </div>
                      <div className="space-y-3">
                        {recentActivities.length > 0 ? (
                          recentActivities.slice(0, 5).map((activity) => {
                            const colors = {
                              visitor: 'green',
                              blog: 'blue',
                              product: 'orange',
                              update: 'purple',
                            };
                            const color = colors[activity.type] || 'gray';
                            const timeAgo = getTimeAgo(activity.timestamp);
                            
                            return (
                              <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                <div className={`w-2 h-2 bg-${color}-500 rounded-full mt-2`}></div>
                                <div className="flex-1">
                                  <p className="text-sm text-gray-900 font-medium">{activity.message}</p>
                                  <p className="text-xs text-gray-500">{timeAgo}</p>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <Activity size={48} className="mx-auto mb-2 opacity-20" />
                            <p className="text-sm">Belum ada aktivitas</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Popular Pages & Browser Stats */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Popular Pages */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-lg text-gray-900">Halaman Populer</h3>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setDetailView('pages')}
                            className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                          >
                            <Eye size={14} />
                            Detail
                          </button>
                          <BarChart3 className="text-gray-400" size={20} />
                        </div>
                      </div>
                      <div className="space-y-3">
                        {analyticsStats.popularPages.length > 0 ? (
                          analyticsStats.popularPages.map((page, index) => {
                            const colors = ['orange', 'blue', 'green', 'purple', 'pink'];
                            const color = colors[index % colors.length];
                            return (
                              <div key={page.page} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                  <FileText size={16} className={`text-${color}-500`} />
                                  <span className="text-sm text-gray-900">{page.page}</span>
                                </div>
                                <span className="text-sm font-semibold text-gray-900">{page.views.toLocaleString()} views</span>
                              </div>
                            );
                          })
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <BarChart3 size={48} className="mx-auto mb-2 opacity-20" />
                            <p className="text-sm">Belum ada data halaman</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Browser & Device Stats */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-lg text-gray-900">Browser & Device</h3>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setDetailView('browser')}
                            className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                          >
                            <Eye size={14} />
                            Detail
                          </button>
                          <Monitor className="text-gray-400" size={20} />
                        </div>
                      </div>
                      <div className="space-y-3">
                        {/* Browser Stats */}
                        {browserStats.browserStats.length > 0 ? (
                          browserStats.browserStats.map((browser) => {
                            const iconMap: { [key: string]: any } = {
                              Chrome: Chrome,
                              Safari: Monitor,
                              Firefox: Chrome,
                              Edge: Chrome,
                            };
                            const Icon = iconMap[browser.name] || Chrome;
                            const colorMap: { [key: string]: string } = {
                              Chrome: 'blue',
                              Safari: 'orange',
                              Firefox: 'red',
                              Edge: 'cyan',
                            };
                            const color = colorMap[browser.name] || 'gray';
                            
                            return (
                              <div key={browser.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <Icon size={20} className={`text-${color}-500`} />
                                  <span className="text-gray-700">{browser.name}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="w-24 bg-gray-200 rounded-full h-2">
                                    <div className={`bg-${color}-500 h-2 rounded-full`} style={{ width: `${browser.percentage}%` }}></div>
                                  </div>
                                  <span className="text-sm font-semibold text-gray-900 w-12 text-right">{browser.percentage.toFixed(0)}%</span>
                                </div>
                              </div>
                            );
                          })
                        ) : null}
                        
                        {/* Device Stats */}
                        {browserStats.deviceStats.length > 0 ? (
                          browserStats.deviceStats.map((device) => {
                            const iconMap: { [key: string]: any } = {
                              mobile: Smartphone,
                              tablet: Monitor,
                              desktop: Monitor,
                            };
                            const Icon = iconMap[device.type] || Monitor;
                            const colorMap: { [key: string]: string } = {
                              mobile: 'green',
                              tablet: 'yellow',
                              desktop: 'purple',
                            };
                            const color = colorMap[device.type] || 'gray';
                            const label = device.type.charAt(0).toUpperCase() + device.type.slice(1);
                            
                            return (
                              <div key={device.type} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <Icon size={20} className={`text-${color}-500`} />
                                  <span className="text-gray-700">{label}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="w-24 bg-gray-200 rounded-full h-2">
                                    <div className={`bg-${color}-500 h-2 rounded-full`} style={{ width: `${device.percentage}%` }}></div>
                                  </div>
                                  <span className="text-sm font-semibold text-gray-900 w-12 text-right">{device.percentage.toFixed(0)}%</span>
                                </div>
                              </div>
                            );
                          })
                        ) : null}
                        
                        {browserStats.browserStats.length === 0 && browserStats.deviceStats.length === 0 && (
                          <div className="text-center py-8 text-gray-500">
                            <Monitor size={48} className="mx-auto mb-2 opacity-20" />
                            <p className="text-sm">Belum ada data browser & device</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* Regular Employee Stats */
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <User className="text-blue-600" size={24} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status Karyawan</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {employeeProfile.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Calendar className="text-green-600" size={24} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Bergabung Sejak</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {new Date(employeeProfile.joinDate).getFullYear()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Users className="text-purple-600" size={24} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Team</p>
                        <p className="text-2xl font-bold text-gray-900">{employees.length}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Employee Info Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4 text-lg">Informasi Saya</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Mail className="text-amber-600 mt-0.5" size={18} />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Email</p>
                      <p className="text-gray-900">{employeeProfile.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="text-amber-600 mt-0.5" size={18} />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Telepon</p>
                      <p className="text-gray-900">{employeeProfile.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Building className="text-amber-600 mt-0.5" size={18} />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Departemen</p>
                      <p className="text-gray-900">{employeeProfile.department}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="text-amber-600 mt-0.5" size={18} />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Lokasi</p>
                      <p className="text-gray-900">{employeeProfile.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : detailView === 'visitors' ? (
            <VisitorsDetailView
              data={analyticsStats.visitorsByCountry}
              onBack={() => setDetailView('none')}
            />
          ) : detailView === 'activities' ? (
            <ActivitiesDetailView
              data={recentActivities}
              onBack={() => setDetailView('none')}
            />
          ) : detailView === 'pages' ? (
            <PagesDetailView
              data={analyticsStats.popularPages}
              onBack={() => setDetailView('none')}
            />
          ) : detailView === 'browser' ? (
            <BrowserDetailView
              browserData={browserStats.browserStats}
              deviceData={browserStats.deviceStats}
              onBack={() => setDetailView('none')}
            />
          ) : null}
          </>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-1">Profil Saya</h2>
                <p className="text-gray-600">Informasi lengkap profil karyawan</p>
              </div>

              {/* Profile Card */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {/* Header Banner */}
                <div className="relative h-40 bg-gradient-to-br from-amber-400 to-orange-500">
                  <div className="absolute -bottom-16 left-8">
                    <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
                      <img 
                        src={employeeProfile.photo} 
                        alt={employeeProfile.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                      employeeProfile.status === 'active' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-500 text-white'
                    }`}>
                      {employeeProfile.status === 'active' ? '✓ Aktif' : '✕ Tidak Aktif'}
                    </span>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="pt-20 pb-8 px-8">
                  <div className="mb-6">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{employeeProfile.name}</h3>
                    <p className="text-xl font-semibold text-amber-600 mb-1">{employeeProfile.position}</p>
                    <p className="text-gray-600">{employeeProfile.department}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contact Information */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Informasi Kontak</h4>
                      <div className="flex items-start gap-3">
                        <Mail className="text-amber-600 mt-0.5 flex-shrink-0" size={18} />
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Email</p>
                          <p className="text-gray-900">{employeeProfile.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="text-amber-600 mt-0.5 flex-shrink-0" size={18} />
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Telepon</p>
                          <p className="text-gray-900">{employeeProfile.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="text-amber-600 mt-0.5 flex-shrink-0" size={18} />
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Alamat</p>
                          <p className="text-gray-900">{employeeProfile.address}</p>
                        </div>
                      </div>
                    </div>

                    {/* Employment Information */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Informasi Pekerjaan</h4>
                      <div className="flex items-start gap-3">
                        <User className="text-amber-600 mt-0.5 flex-shrink-0" size={18} />
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Posisi</p>
                          <p className="text-gray-900">{employeeProfile.position}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Building className="text-amber-600 mt-0.5 flex-shrink-0" size={18} />
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Departemen</p>
                          <p className="text-gray-900">{employeeProfile.department}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Calendar className="text-amber-600 mt-0.5 flex-shrink-0" size={18} />
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Tanggal Bergabung</p>
                          <p className="text-gray-900">{new Date(employeeProfile.joinDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Education */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <GraduationCap className="text-amber-600" size={18} />
                      Pendidikan
                    </h4>
                    <p className="text-gray-900">{employeeProfile.education}</p>
                  </div>

                  {/* Skills */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Award className="text-amber-600" size={18} />
                      Keahlian
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {employeeProfile.skills.map((skill, idx) => (
                        <span key={idx} className="px-3 py-2 bg-amber-50 text-amber-700 rounded-lg text-sm font-medium border border-amber-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <FileText className="text-amber-600" size={18} />
                      Deskripsi Pekerjaan
                    </h4>
                    <p className="text-gray-700 leading-relaxed">{employeeProfile.jobDescription}</p>
                  </div>

                  {/* Responsibilities */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <CheckCircle className="text-amber-600" size={18} />
                      Tanggung Jawab
                    </h4>
                    <ul className="space-y-3">
                      {employeeProfile.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="mt-1 flex-shrink-0">
                            <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                              <span className="text-xs font-bold text-amber-600">{idx + 1}</span>
                            </div>
                          </div>
                          <p className="text-gray-700 leading-relaxed flex-1">{resp}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* 2FA Settings */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="text-blue-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">Autentikasi Dua Faktor (2FA)</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Tingkatkan keamanan akun Anda dengan mengaktifkan autentikasi dua faktor menggunakan aplikasi authenticator.
                    </p>
                    <div className="flex items-center gap-3">
                      {is2FAEnabled ? (
                        <>
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-2">
                            <Check size={16} />
                            2FA Aktif
                          </span>
                          <button
                            onClick={handleDisable2FA}
                            className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
                          >
                            Nonaktifkan 2FA
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                            2FA Tidak Aktif
                          </span>
                          <button
                            onClick={handleEnable2FA}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                          >
                            Aktifkan 2FA
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2FA Setup Modal */}
                {show2FASetup && (
                  <div className="border-t border-gray-200 pt-6">
                    {showQRCode ? (
                      <div className="space-y-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-900 mb-2">Langkah 1: Scan QR Code</h4>
                          <p className="text-sm text-blue-700 mb-4">
                            Scan QR code ini menggunakan aplikasi authenticator Anda (Google Authenticator, Authy, dll)
                          </p>
                          <div className="bg-white p-4 rounded-lg inline-block">
                            <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />
                          </div>
                        </div>

                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                          <h4 className="font-semibold text-amber-900 mb-2">Atau Masukkan Kode Manual</h4>
                          <p className="text-sm text-amber-700 mb-2">
                            Jika tidak bisa scan QR code, masukkan kode ini secara manual:
                          </p>
                          <div className="flex items-center gap-2">
                            <code className="bg-white px-3 py-2 rounded border border-amber-300 font-mono text-sm">
                              {secretKey}
                            </code>
                            <button
                              onClick={copySecretKeyToClipboard}
                              className="p-2 hover:bg-amber-100 rounded transition-colors"
                            >
                              {copiedSecretKey ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => setShowQRCode(false)}
                          className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                          Lanjut ke Verifikasi
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-900 mb-2">Langkah 2: Verifikasi</h4>
                          <p className="text-sm text-blue-700 mb-4">
                            Masukkan 6 digit kode dari aplikasi authenticator Anda
                          </p>
                          <input
                            type="text"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            placeholder="000000"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-2xl font-mono tracking-widest"
                            maxLength={6}
                          />
                        </div>

                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                          <h4 className="font-semibold text-amber-900 mb-2">Backup Codes</h4>
                          <p className="text-sm text-amber-700 mb-3">
                            Simpan backup codes ini di tempat yang aman. Anda dapat menggunakannya jika kehilangan akses ke authenticator.
                          </p>
                          <div className="bg-white rounded-lg p-3 mb-3 max-h-40 overflow-y-auto">
                            <div className="grid grid-cols-2 gap-2">
                              {backupCodes.map((code, idx) => (
                                <code key={idx} className="text-sm font-mono">{code}</code>
                              ))}
                            </div>
                          </div>
                          <button
                            onClick={copyBackupCodesToClipboard}
                            className="w-full px-4 py-2 border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors font-medium flex items-center justify-center gap-2"
                          >
                            {copiedBackupCodes ? (
                              <>
                                <Check size={18} />
                                Tersalin!
                              </>
                            ) : (
                              <>
                                <Copy size={18} />
                                Salin Semua Codes
                              </>
                            )}
                          </button>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => {
                              setShowQRCode(true);
                              setVerificationCode('');
                            }}
                            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                          >
                            Kembali
                          </button>
                          <button
                            onClick={handleVerify2FA}
                            disabled={verificationCode.length !== 6 || isVerifying2FA}
                            className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            {isVerifying2FA ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                Memverifikasi...
                              </>
                            ) : (
                              <>
                                <Check size={18} />
                                Aktifkan 2FA
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Team Tab */}
          {activeTab === 'team' && (
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-1">Team SJT</h2>
                <p className="text-gray-600">Daftar karyawan PT Santoso Jaya Tembakau</p>
              </div>

              {/* Filter Section */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {/* Search */}
                <div className="flex-1 min-w-[150px]">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      value={teamSearchQuery}
                      onChange={(e) => setTeamSearchQuery(e.target.value)}
                      placeholder="Cari nama, email, posisi..."
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Filter by Department */}
                <select
                  value={teamFilterDepartment}
                  onChange={(e) => setTeamFilterDepartment(e.target.value)}
                  className="px-2.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-xs sm:text-sm bg-white"
                >
                  <option value="all">Semua Departemen</option>
                  <option value="IT & Design">IT & Design</option>
                  <option value="Produksi">Produksi</option>
                  <option value="Sales & Marketing">Sales & Marketing</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Finance">Finance</option>
                  <option value="Quality Assurance">Quality Assurance</option>
                </select>

                {/* Filter by Status */}
                <select
                  value={teamFilterStatus}
                  onChange={(e) => setTeamFilterStatus(e.target.value)}
                  className="px-2.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-xs sm:text-sm bg-white"
                >
                  <option value="all">Semua Status</option>
                  <option value="active">Aktif</option>
                  <option value="inactive">Tidak Aktif</option>
                </select>

                {/* Clear Filters */}
                <button
                  onClick={() => {
                    setTeamSearchQuery('');
                    setTeamFilterDepartment('all');
                    setTeamFilterStatus('all');
                  }}
                  className="px-3 py-2 text-xs sm:text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1.5"
                >
                  <X size={14} />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600 rounded-lg">
                      <UserCircle className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-blue-700 font-medium">Total Karyawan</p>
                      <p className="text-2xl font-bold text-blue-900">{employees.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-600 rounded-lg">
                      <UserCheck className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-green-700 font-medium">Aktif</p>
                      <p className="text-2xl font-bold text-green-900">{employees.filter(e => e.status === 'active').length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-600 rounded-lg">
                      <Building className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-amber-700 font-medium">Departemen</p>
                      <p className="text-2xl font-bold text-amber-900">{new Set(employees.map(e => e.department)).size}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-600 rounded-lg">
                      <Award className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-purple-700 font-medium">Posisi</p>
                      <p className="text-2xl font-bold text-purple-900">{new Set(employees.map(e => e.position)).size}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Employee Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {employees
                  .filter(emp => {
                    const matchSearch = teamSearchQuery === '' || 
                      emp.name.toLowerCase().includes(teamSearchQuery.toLowerCase()) ||
                      emp.email.toLowerCase().includes(teamSearchQuery.toLowerCase()) ||
                      emp.position.toLowerCase().includes(teamSearchQuery.toLowerCase());
                    const matchDept = teamFilterDepartment === 'all' || emp.department === teamFilterDepartment;
                    const matchStatus = teamFilterStatus === 'all' || emp.status === teamFilterStatus;
                    return matchSearch && matchDept && matchStatus;
                  })
                  .map((employee) => (
                    <div 
                      key={employee.id} 
                      className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-amber-300"
                    >
                      {/* Card Header with Photo */}
                      <div className="relative h-32 bg-gradient-to-br from-amber-400 to-orange-500">
                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                          <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-white">
                            <img 
                              src={employee.photo} 
                              alt={employee.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            employee.status === 'active' 
                              ? 'bg-green-500 text-white' 
                              : 'bg-gray-500 text-white'
                          }`}>
                            {employee.status === 'active' ? '✓ Aktif' : '✕ Tidak Aktif'}
                          </span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="pt-14 pb-6 px-6">
                        <div className="text-center mb-4">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{employee.name}</h3>
                          <p className="text-sm font-semibold text-amber-600 mb-1">{employee.position}</p>
                          <p className="text-xs text-gray-500">{employee.department}</p>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail size={14} className="text-amber-600 flex-shrink-0" />
                            <span className="truncate">{employee.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone size={14} className="text-amber-600 flex-shrink-0" />
                            <span>{employee.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar size={14} className="text-amber-600 flex-shrink-0" />
                            <span>Bergabung: {new Date(employee.joinDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-gray-700 mb-2">Skills:</p>
                          <div className="flex flex-wrap gap-1">
                            {employee.skills.slice(0, 3).map((skill, idx) => (
                              <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                {skill}
                              </span>
                            ))}
                            {employee.skills.length > 3 && (
                              <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded text-xs font-semibold">
                                +{employee.skills.length - 3}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Action Button */}
                        <button
                          onClick={() => {
                            setSelectedEmployee(employee);
                            setActiveTab('team-detail');
                          }}
                          className="w-full px-4 py-2.5 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium text-sm flex items-center justify-center gap-2"
                        >
                          <Eye size={16} />
                          Lihat Detail
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Team Detail Tab */}
          {activeTab === 'team-detail' && selectedEmployee && (
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-1">Detail Karyawan</h2>
                <p className="text-gray-600">Informasi lengkap karyawan</p>
              </div>

              {/* Profile Card - Same as HR Dashboard but read-only */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {/* Header Banner */}
                <div className="relative h-40 bg-gradient-to-br from-amber-400 to-orange-500">
                  <div className="absolute -bottom-16 left-8">
                    <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
                      <img 
                        src={selectedEmployee.photo} 
                        alt={selectedEmployee.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                      selectedEmployee.status === 'active' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-500 text-white'
                    }`}>
                      {selectedEmployee.status === 'active' ? '✓ Aktif' : '✕ Tidak Aktif'}
                    </span>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="pt-20 pb-8 px-8">
                  <div className="mb-6">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{selectedEmployee.name}</h3>
                    <p className="text-xl font-semibold text-amber-600 mb-1">{selectedEmployee.position}</p>
                    <p className="text-gray-600">{selectedEmployee.department}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contact Information */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Informasi Kontak</h4>
                      <div className="flex items-start gap-3">
                        <Mail className="text-amber-600 mt-0.5 flex-shrink-0" size={18} />
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Email</p>
                          <p className="text-gray-900">{selectedEmployee.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="text-amber-600 mt-0.5 flex-shrink-0" size={18} />
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Telepon</p>
                          <p className="text-gray-900">{selectedEmployee.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="text-amber-600 mt-0.5 flex-shrink-0" size={18} />
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Alamat</p>
                          <p className="text-gray-900">{selectedEmployee.address}</p>
                        </div>
                      </div>
                    </div>

                    {/* Employment Information */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Informasi Pekerjaan</h4>
                      <div className="flex items-start gap-3">
                        <User className="text-amber-600 mt-0.5 flex-shrink-0" size={18} />
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Posisi</p>
                          <p className="text-gray-900">{selectedEmployee.position}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Building className="text-amber-600 mt-0.5 flex-shrink-0" size={18} />
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Departemen</p>
                          <p className="text-gray-900">{selectedEmployee.department}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Calendar className="text-amber-600 mt-0.5 flex-shrink-0" size={18} />
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Tanggal Bergabung</p>
                          <p className="text-gray-900">{new Date(selectedEmployee.joinDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Education */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <GraduationCap className="text-amber-600" size={18} />
                      Pendidikan
                    </h4>
                    <p className="text-gray-900">{selectedEmployee.education}</p>
                  </div>

                  {/* Skills */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Award className="text-amber-600" size={18} />
                      Keahlian
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedEmployee.skills.map((skill, idx) => (
                        <span key={idx} className="px-3 py-2 bg-amber-50 text-amber-700 rounded-lg text-sm font-medium border border-amber-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <FileText className="text-amber-600" size={18} />
                      Deskripsi Pekerjaan
                    </h4>
                    <p className="text-gray-700 leading-relaxed">{selectedEmployee.jobDescription}</p>
                  </div>

                  {/* Responsibilities */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <CheckCircle className="text-amber-600" size={18} />
                      Tanggung Jawab
                    </h4>
                    <ul className="space-y-3">
                      {selectedEmployee.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="mt-1 flex-shrink-0">
                            <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                              <span className="text-xs font-bold text-amber-600">{idx + 1}</span>
                            </div>
                          </div>
                          <p className="text-gray-700 leading-relaxed flex-1">{resp}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setActiveTab('team')}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Kembali
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-1">Notifikasi</h2>
                <p className="text-gray-600">Permintaan perubahan profil dari HR Admin</p>
              </div>

              {myPendingChanges.length > 0 ? (
                <ProfileChangeNotification
                  pendingChanges={myPendingChanges}
                  onApprove={handleApproveChange}
                  onReject={handleRejectChange}
                />
              ) : (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                  <Bell className="mx-auto text-gray-400 mb-4" size={48} />
                  <h3 className="font-semibold text-gray-900 mb-2">Tidak Ada Notifikasi</h3>
                  <p className="text-gray-600">Anda tidak memiliki permintaan perubahan profil yang menunggu persetujuan.</p>
                </div>
              )}
            </div>
          )}

          {/* CMS Tab - Only for indra@santosojayatembakau.com */}
          {activeTab === 'cms' && employeeProfile.email === 'indra@santosojayatembakau.com' && (
            <div className="h-[calc(100vh-100px)]">
              <CMSPanel activeSection={activeCMSSection} />
            </div>
          )}
            </div>
          </div>
        </div>
      </div>
    );
  }
