/**
 * Karir Dashboard Component for PT Santoso Jaya Tembakau
 * 
 * Application ID System:
 * - Format: APP-{EMAILPREFIX}-{SEQUENTIAL}
 * - Example: APP-PELAMAR-001, APP-INDRA-002, APP-BUDI-001
 * - Each user has their own unique ID sequence
 * - IDs are stored per user in localStorage
 * - No ID conflicts between different users
 */

import { useState, useEffect } from 'react';
import { User, FileText, Briefcase, Settings, LogOut, Upload, CheckCircle, Clock, XCircle, Bell, Download, MapPin, ArrowRight, X, ChevronLeft, Menu, Trash2, Shield, Smartphone, Copy, Check, AlertTriangle, UserCircle, Users, Eye, Calendar, Phone, Mail, GraduationCap, Award, Building, ArrowLeft, Briefcase as BriefcaseIcon } from 'lucide-react';

type UserProfile = {
  name: string;
  email: string;
  phone: string;
  address: string;
  education: string;
  experience: string;
};

type KarirDashboardProps = {
  onLogout: () => void;
  userProfile: UserProfile;
};

type Application = {
  id: string;
  jobTitle: string;
  department: string;
  appliedDate: string;
  status: 'pending' | 'review' | 'interview' | 'accepted' | 'rejected';
};

type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
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

export function KarirDashboard({ onLogout, userProfile }: KarirDashboardProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'applications' | 'jobs' | 'profile' | 'upload' | 'team' | 'notifications' | 'team-detail'>('dashboard');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [savedDocuments, setSavedDocuments] = useState<Array<{id: string, name: string, uploadDate: string}>>([
    { id: '1', name: 'CV_JohnDoe.pdf', uploadDate: '2025-01-15' },
    { id: '2', name: 'Surat_Lamaran.pdf', uploadDate: '2025-01-15' },
  ]);
  const [isSavingDocument, setIsSavingDocument] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [deletingDocumentId, setDeletingDocumentId] = useState<string | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  
  // Pending Profile Changes - read from localStorage
  const [pendingChanges, setPendingChanges] = useState<PendingProfileChange[]>(() => {
    const saved = localStorage.getItem('pending_profile_changes');
    return saved ? JSON.parse(saved) : [];
  });

  // Get pending changes for current user
  const myPendingChanges = pendingChanges.filter(
    change => change.employeeEmail === userProfile.email && change.status === 'pending'
  );

  // Sync with localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('pending_profile_changes');
      if (saved) {
        setPendingChanges(JSON.parse(saved));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Team Data - read from HRDashboard employees
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
  
  // 2FA States - Check localStorage on mount
  const [is2FAEnabled, setIs2FAEnabled] = useState(() => {
    const saved = localStorage.getItem('user_2fa_' + userProfile.email);
    return saved === 'enabled';
  });
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [showQRCode, setShowQRCode] = useState(true);
  const [verificationCode, setVerificationCode] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [copiedBackupCodes, setCopiedBackupCodes] = useState(false);
  const [copiedSecretKey, setCopiedSecretKey] = useState(false);
  const [isVerifying2FA, setIsVerifying2FA] = useState(false);
  const [show2FASuccess, setShow2FASuccess] = useState(false);
  const [qrCodeUrl] = useState('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/PT%20Santoso%20Jaya:indra@santosojayatembakau.com?secret=JBSWY3DPEHPK3PXP&issuer=PT%20Santoso%20Jaya');
  const [secretKey] = useState('JBSWY3DPEHPK3PXP');

  // Generate unique application ID based on user email
  const generateApplicationId = () => {
    // Get email prefix (before @)
    const emailPrefix = userProfile.email.split('@')[0].toUpperCase().replace(/[^A-Z0-9]/g, '');
    
    // Get all applications for this user
    const userApplicationsKey = `user_applications_${userProfile.email}`;
    const savedApps = localStorage.getItem(userApplicationsKey);
    const userApps = savedApps ? JSON.parse(savedApps) : [];
    
    // Get next sequential number
    const nextSeq = userApps.length + 1;
    const seqStr = nextSeq.toString().padStart(3, '0');
    
    return `APP-${emailPrefix}-${seqStr}`;
  };

  // Load applications from localStorage for current user only
  const [applications, setApplications] = useState<Application[]>(() => {
    const userApplicationsKey = `user_applications_${userProfile.email}`;
    const saved = localStorage.getItem(userApplicationsKey);
    
    if (saved) {
      return JSON.parse(saved);
    }
    
    // Initialize with demo data for demo accounts only
    if (userProfile.email === 'pelamar@santosojayatembakau.com' || userProfile.email === 'indra@santosojayatembakau.com') {
      const emailPrefix = userProfile.email.split('@')[0].toUpperCase().replace(/[^A-Z0-9]/g, '');
      const demoApps = [
        {
          id: `APP-${emailPrefix}-001`,
          jobTitle: 'Supervisor Produksi',
          department: 'Produksi',
          appliedDate: '2025-01-15',
          status: 'review' as const,
        },
        {
          id: `APP-${emailPrefix}-002`,
          jobTitle: 'Quality Control Staff',
          department: 'Quality Assurance',
          appliedDate: '2025-01-10',
          status: 'interview' as const,
        },
        {
          id: `APP-${emailPrefix}-003`,
          jobTitle: 'Sales Marketing Executive',
          department: 'Sales & Marketing',
          appliedDate: '2024-12-20',
          status: 'rejected' as const,
        },
      ];
      
      // Save to localStorage
      localStorage.setItem(userApplicationsKey, JSON.stringify(demoApps));
      return demoApps;
    }
    
    // New users start with empty applications
    return [];
  });

  // Sync applications to localStorage whenever they change
  useEffect(() => {
    const userApplicationsKey = `user_applications_${userProfile.email}`;
    localStorage.setItem(userApplicationsKey, JSON.stringify(applications));
  }, [applications, userProfile.email]);

  const jobs: Job[] = [
    {
      id: '1',
      title: 'Supervisor Produksi',
      department: 'Produksi',
      location: 'Jember, Jawa Timur',
      type: 'Full-time',
      description: 'Mengawasi dan mengelola operasi produksi untuk memastikan kualitas dan efisiensi.',
      requirements: ['S1 Teknik Industri', '3 tahun pengalaman di bidang produksi'],
      responsibilities: ['Mengawasi operasi produksi', 'Mengoptimalkan proses produksi', 'Mengelola tim produksi'],
    },
    {
      id: '2',
      title: 'Quality Control Staff',
      department: 'Quality Assurance',
      location: 'Jember, Jawa Timur',
      type: 'Full-time',
      description: 'Melakukan inspeksi dan pengujian produk untuk memastikan kualitas.',
      requirements: ['S1 Teknik Industri', '2 tahun pengalaman di bidang kualitas'],
      responsibilities: ['Melakukan inspeksi produk', 'Mengidentifikasi dan memperbaiki masalah kualitas', 'Membuat laporan kualitas'],
    },
    {
      id: '3',
      title: 'Sales Marketing Executive',
      department: 'Sales & Marketing',
      location: 'Jember, Jawa Timur',
      type: 'Full-time',
      description: 'Mengembangkan dan menjalankan strategi pemasaran untuk meningkatkan penjualan.',
      requirements: ['S1 Teknik Industri', '2 tahun pengalaman di bidang pemasaran'],
      responsibilities: ['Mengembangkan strategi pemasaran', 'Mengelola hubungan dengan klien', 'Menganalisis data penjualan'],
    },
  ];

  const getStatusBadge = (status: Application['status']) => {
    const statusConfig = {
      pending: { bg: 'bg-gray-100', text: 'text-gray-700', icon: Clock, label: 'Menunggu' },
      review: { bg: 'bg-blue-100', text: 'text-blue-700', icon: FileText, label: 'Dalam Review' },
      interview: { bg: 'bg-amber-100', text: 'text-amber-700', icon: User, label: 'Interview' },
      accepted: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle, label: 'Diterima' },
      rejected: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle, label: 'Ditolak' },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${config.bg} ${config.text}`}>
        <Icon size={16} />
        {config.label}
      </span>
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Handle file upload logic here - no alert, just smooth action
      setSelectedFile(null);
      setIsSavingDocument(true);
      setTimeout(() => {
        setIsSavingDocument(false);
        setSavedDocuments([...savedDocuments, { id: (savedDocuments.length + 1).toString(), name: selectedFile.name, uploadDate: new Date().toISOString().split('T')[0] }]);
      }, 2000);
    }
  };

  const handleApplyJob = () => {
    if (!selectedJob) return;
    
    // Generate unique ID for this application
    const newAppId = generateApplicationId();
    
    // Create new application
    const newApplication: Application = {
      id: newAppId,
      jobTitle: selectedJob.title,
      department: selectedJob.department,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'pending',
    };
    
    // Add to applications list
    setApplications(prev => [...prev, newApplication]);
    
    // Show success animation
    setShowSuccessAnimation(true);
    setTimeout(() => {
      setShowSuccessAnimation(false);
      setSelectedJob(null);
      setActiveTab('applications');
    }, 2000);
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    setIsSaving(true);
    // Simulate save process
    setTimeout(() => {
      setIsSaving(false);
    }, 2000);
  };

  const handleDeleteDocument = (id: string) => {
    setDeletingDocumentId(id);
    setTimeout(() => {
      setSavedDocuments(savedDocuments.filter(doc => doc.id !== id));
      setDeletingDocumentId(null);
    }, 1500);
  };

  const handleDownloadDocument = (fileName: string) => {
    // Create a mock download
    const link = document.createElement('a');
    link.href = '#'; // In real app, this would be the actual file URL
    link.download = fileName;
    
    // Simulate download with a blob (mock PDF content)
    const blob = new Blob(['Mock document content for ' + fileName], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    link.href = url;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL
    window.URL.revokeObjectURL(url);
  };

  const generateBackupCodes = () => {
    const codes = [];
    for (let i = 0; i < 8; i++) {
      const code = Math.random().toString(36).substring(2, 10).toUpperCase();
      codes.push(code);
    }
    return codes;
  };

  const handleEnable2FA = () => {
    setShow2FASetup(true);
    const codes = generateBackupCodes();
    setBackupCodes(codes);
  };

  const handleVerify2FA = () => {
    if (verificationCode.length === 6) {
      setIsVerifying2FA(true);
      setTimeout(() => {
        // Mock verification - accept any 6 digit code - instant enable
        setIsVerifying2FA(false);
        setIs2FAEnabled(true);
        setShow2FASetup(false);
        setVerificationCode('');
        setShowQRCode(true);
        
        // Save 2FA status to localStorage
        localStorage.setItem('user_2fa_' + userProfile.email, 'enabled');
      }, 800); // Quick verification only
    }
  };

  const handleDisable2FA = () => {
    // Instant disable without animation
    setIs2FAEnabled(false);
    setShow2FASetup(false);
    setBackupCodes([]);
    setCopiedBackupCodes(false);
    setCopiedSecretKey(false);
    setVerificationCode('');
    setShowQRCode(true);
    
    // Remove 2FA status from localStorage
    localStorage.removeItem('user_2fa_' + userProfile.email);
  };

  const handleCopyBackupCodes = () => {
    const codesText = backupCodes.join('\n');
    // Use fallback method for clipboard
    const textarea = document.createElement('textarea');
    textarea.value = codesText;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      setCopiedBackupCodes(true);
      setTimeout(() => setCopiedBackupCodes(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
    document.body.removeChild(textarea);
  };

  const handleCopySecretKey = () => {
    // Use fallback method for clipboard
    const textarea = document.createElement('textarea');
    textarea.value = secretKey;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      setCopiedSecretKey(true);
      setTimeout(() => setCopiedSecretKey(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
    document.body.removeChild(textarea);
  };

  const handleCancel2FASetup = () => {
    setShow2FASetup(false);
    setVerificationCode('');
    setBackupCodes([]);
    setCopiedBackupCodes(false);
    setShow2FASuccess(false);
    setShowQRCode(true);
  };

  const handleSaveDocument = () => {
    if (selectedFile) {
      setIsSavingDocument(true);
      setTimeout(() => {
        setSavedDocuments([...savedDocuments, { 
          id: (savedDocuments.length + 1).toString(), 
          name: selectedFile.name, 
          uploadDate: new Date().toISOString().split('T')[0] 
        }]);
        setSelectedFile(null);
        setIsSavingDocument(false);
      }, 2000);
    }
  };

  return (
    <div className="h-screen bg-white lg:flex relative overflow-hidden">
      {/* Success Animation Overlay */}
      {showSuccessAnimation && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl p-8 lg:p-12 max-w-md mx-4 shadow-2xl transform animate-scaleIn">
            <div className="text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <CheckCircle className="text-green-600 animate-checkMark" size={64} strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Lamaran Berhasil Dikirim!
              </h2>
              <p className="text-gray-600 mb-6">
                Terima kasih telah melamar. Kami akan meninjau lamaran Anda dan menghubungi Anda segera.
              </p>
              <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-600 to-orange-600 animate-progress"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Overlay Background */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
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
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="text-white" size={20} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold truncate text-gray-900">{userProfile.name}</h3>
                <p className="text-xs text-gray-600 truncate">{userProfile.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className={`flex-1 px-2 space-y-1 ${sidebarOpen ? 'py-4' : 'py-16'}`}>
          <button
            onClick={() => {
              setActiveTab('dashboard');
              // Close sidebar on mobile after selection
              if (window.innerWidth < 1024) setSidebarOpen(false);
            }}
            className={`w-full flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-3 rounded-lg transition-colors text-left ${
              activeTab === 'dashboard'
                ? 'bg-amber-600 text-white'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
            title={!sidebarOpen ? 'Dashboard' : ''}
          >
            <Briefcase size={18} />
            {sidebarOpen && <span className="text-sm">Dashboard</span>}
          </button>

          <button
            onClick={() => {
              setActiveTab('applications');
              if (window.innerWidth < 1024) setSidebarOpen(false);
            }}
            className={`w-full flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-3 rounded-lg transition-colors text-left ${
              activeTab === 'applications'
                ? 'bg-amber-600 text-white'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
            title={!sidebarOpen ? 'Lamaran Saya' : ''}
          >
            <FileText size={18} />
            {sidebarOpen && <span className="text-sm">Lamaran Saya</span>}
          </button>

          <button
            onClick={() => {
              setActiveTab('jobs');
              if (window.innerWidth < 1024) setSidebarOpen(false);
            }}
            className={`w-full flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-3 rounded-lg transition-colors text-left ${
              activeTab === 'jobs'
                ? 'bg-amber-600 text-white'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
            title={!sidebarOpen ? 'Lowongan Pekerjaan' : ''}
          >
            <FileText size={18} />
            {sidebarOpen && <span className="text-sm">Lowongan Pekerjaan</span>}
          </button>

          <button
            onClick={() => {
              setActiveTab('upload');
              if (window.innerWidth < 1024) setSidebarOpen(false);
            }}
            className={`w-full flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-3 rounded-lg transition-colors text-left ${
              activeTab === 'upload'
                ? 'bg-amber-600 text-white'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
            title={!sidebarOpen ? 'Upload Dokumen' : ''}
          >
            <Upload size={18} />
            {sidebarOpen && <span className="text-sm">Upload Dokumen</span>}
          </button>

          <button
            onClick={() => {
              setActiveTab('profile');
              if (window.innerWidth < 1024) setSidebarOpen(false);
            }}
            className={`w-full flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-3 rounded-lg transition-colors text-left ${
              activeTab === 'profile'
                ? 'bg-amber-600 text-white'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
            title={!sidebarOpen ? 'Profil Saya' : ''}
          >
            <Settings size={18} />
            {sidebarOpen && <span className="text-sm">Profil Saya</span>}
          </button>
        </nav>

        {/* Logout Button */}
        <div className="p-2 border-t border-gray-200">
          <button
            onClick={onLogout}
            className={`w-full flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-3 rounded-lg transition-colors text-left text-red-600 hover:bg-red-50 hover:text-red-700`}
            title={!sidebarOpen ? 'Logout' : ''}
          >
            <LogOut size={18} />
            {sidebarOpen && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white h-screen overflow-y-auto">
        {/* Mobile Header with Hamburger Menu */}
        <div className="lg:hidden sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="text-gray-700" size={24} />
          </button>
          <div className="flex-1">
            <h2 className="font-bold text-gray-900">Dashboard Karir</h2>
            <p className="text-xs text-gray-600">PT Santoso Jaya Tembakau</p>
          </div>
          <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center overflow-hidden">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="text-white" size={16} />
            )}
          </div>
        </div>

        <div className="py-4 lg:p-8">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Welcome Message */}
              <div className="mb-6 px-4 lg:px-0">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Selamat Datang, {userProfile.name}! 👋
                </h1>
                <p className="text-gray-600">
                  Berikut adalah ringkasan aktivitas karir Anda hari ini.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-6">
                {/* Total Lamaran - Blue */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg lg:rounded-xl p-4 lg:p-6 shadow-lg text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-blue-100 text-sm font-medium">Total Lamaran</p>
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <FileText className="text-white" size={20} />
                      </div>
                    </div>
                    <p className="text-3xl font-bold mb-2">{applications.length}</p>
                    <p className="text-blue-100 text-sm">
                      {applications.length > 0 ? '+100% dari bulan lalu' : 'Belum ada lamaran'}
                    </p>
                  </div>
                </div>

                {/* Dalam Proses - Green */}
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg lg:rounded-xl p-4 lg:p-6 shadow-lg text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-green-100 text-sm font-medium">Dalam Proses</p>
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <Clock className="text-white" size={20} />
                      </div>
                    </div>
                    <p className="text-3xl font-bold mb-2">
                      {applications.filter(a => a.status === 'review' || a.status === 'pending').length}
                    </p>
                    <p className="text-green-100 text-sm">
                      Sedang dalam review
                    </p>
                  </div>
                </div>

                {/* Diterima - Purple */}
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg lg:rounded-xl p-4 lg:p-6 shadow-lg text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-purple-100 text-sm font-medium">Diterima</p>
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <CheckCircle className="text-white" size={20} />
                      </div>
                    </div>
                    <p className="text-3xl font-bold mb-2">
                      {applications.filter(a => a.status === 'accepted').length}
                    </p>
                    <p className="text-purple-100 text-sm">
                      Selamat! 🎉
                    </p>
                  </div>
                </div>

                {/* Interview - Orange */}
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg lg:rounded-xl p-4 lg:p-6 shadow-lg text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-orange-100 text-sm font-medium">Interview</p>
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <User className="text-white" size={20} />
                      </div>
                    </div>
                    <p className="text-3xl font-bold mb-2">
                      {applications.filter(a => a.status === 'interview').length}
                    </p>
                    <p className="text-orange-100 text-sm">
                      Siapkan diri Anda
                    </p>
                  </div>
                </div>
              </div>

              {/* Recent Activity & Quick Actions */}
              <div className="grid md:grid-cols-2 gap-4 lg:gap-6 px-4 lg:px-0">
                {/* Recent Activity */}
                <div>
                  <h2 className="mb-4 flex items-center gap-2">
                    <Bell className="text-amber-600" size={20} />
                    Aktivitas Terbaru
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-100 shadow-sm">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Bell className="text-blue-600" size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">Undangan Interview</p>
                        <p className="text-gray-600 text-sm mt-1">
                          Anda diundang untuk interview posisi Quality Control Staff pada 25 Januari 2025
                        </p>
                        <p className="text-blue-600 text-sm mt-2">2 hari yang lalu</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-100 shadow-sm">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="text-green-600" size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">Lamaran Diterima</p>
                        <p className="text-gray-600 text-sm mt-1">
                          Lamaran Anda untuk posisi Supervisor Produksi sedang dalam review
                        </p>
                        <p className="text-green-600 text-sm mt-2">5 hari yang lalu</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h2 className="mb-4 flex items-center gap-2">
                    <ArrowRight className="text-amber-600" size={20} />
                    Tindakan Cepat
                  </h2>
                  <div className="space-y-4">
                    <button
                      onClick={() => setActiveTab('jobs')}
                      className="w-full py-3 rounded-lg transition-all duration-300 bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:shadow-lg hover:scale-105"
                    >
                      Lihat Lowongan Pekerjaan
                    </button>
                    <button
                      onClick={() => setActiveTab('upload')}
                      className="w-full py-3 rounded-lg transition-all duration-300 bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:shadow-lg hover:scale-105"
                    >
                      Upload Dokumen
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Applications Tab */}
          {activeTab === 'applications' && !selectedApplication && (
            <div className="space-y-4 px-4 lg:px-0">
              <h2 className="mb-6">Riwayat Lamaran</h2>
              
              {applications.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-lg lg:rounded-xl p-12 text-center shadow-sm">
                  <FileText className="mx-auto mb-4 text-gray-400" size={48} />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum Ada Lamaran</h3>
                  <p className="text-gray-600 mb-6">Anda belum melamar pekerjaan apapun. Mulai jelajahi lowongan yang tersedia!</p>
                  <button
                    onClick={() => setActiveTab('jobs')}
                    className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    Lihat Lowongan Pekerjaan
                  </button>
                </div>
              ) : (
                applications.map((app) => (
                  <div key={app.id} className="bg-white border border-gray-200 rounded-lg lg:rounded-xl p-6 hover:border-amber-300 transition-colors shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="mb-0">{app.jobTitle}</h3>
                          <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {app.id}
                          </span>
                        </div>
                        <p className="text-gray-600">{app.department}</p>
                      </div>
                      {getStatusBadge(app.status)}
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <span>Tanggal Melamar: {new Date(app.appliedDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <button 
                        onClick={() => setSelectedApplication(app)}
                        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                      >
                        <FileText size={18} />
                        Lihat Detail
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Application Detail Full Page */}
          {activeTab === 'applications' && selectedApplication && (
            <div className="px-4 lg:px-0 space-y-6">
              {/* Application Header */}
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg lg:rounded-xl p-6 lg:p-8 text-white shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{selectedApplication.jobTitle}</h1>
                    <p className="text-amber-100 text-lg">{selectedApplication.department}</p>
                  </div>
                  <div className="bg-white rounded-lg px-4 py-2">
                    {getStatusBadge(selectedApplication.status)}
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold flex items-center gap-2">
                    <Clock size={16} />
                    Tanggal Melamar: {new Date(selectedApplication.appliedDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold flex items-center gap-2">
                    <FileText size={16} />
                    ID: #{selectedApplication.id}
                  </span>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="bg-white border border-gray-200 rounded-lg lg:rounded-xl p-6 shadow-sm">
                <h2 className="mb-6 flex items-center gap-2">
                  <Clock className="text-amber-600" size={20} />
                  Timeline Proses Lamaran
                </h2>
                <div className="space-y-4">
                  {/* Step 1 - Submitted */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="text-green-600" size={20} />
                      </div>
                      <div className="w-0.5 h-full bg-green-200 mt-2"></div>
                    </div>
                    <div className="pb-8 flex-1">
                      <h4 className="font-semibold text-gray-900">Lamaran Diterima</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Lamaran Anda telah berhasil dikirim dan diterima oleh tim HR
                      </p>
                      <p className="text-xs text-green-600 mt-2 font-semibold">
                        {new Date(selectedApplication.appliedDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>

                  {/* Step 2 - Review */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        selectedApplication.status === 'review' || selectedApplication.status === 'interview' || selectedApplication.status === 'accepted'
                          ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <FileText className={selectedApplication.status === 'review' || selectedApplication.status === 'interview' || selectedApplication.status === 'accepted' ? 'text-blue-600' : 'text-gray-400'} size={20} />
                      </div>
                      {(selectedApplication.status === 'review' || selectedApplication.status === 'interview' || selectedApplication.status === 'accepted') && (
                        <div className="w-0.5 h-full bg-blue-200 mt-2"></div>
                      )}
                    </div>
                    <div className="pb-8 flex-1">
                      <h4 className={`font-semibold ${selectedApplication.status === 'review' || selectedApplication.status === 'interview' || selectedApplication.status === 'accepted' ? 'text-gray-900' : 'text-gray-400'}`}>
                        Dalam Review
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {selectedApplication.status === 'review' || selectedApplication.status === 'interview' || selectedApplication.status === 'accepted'
                          ? 'Tim HR sedang meninjau lamaran Anda'
                          : 'Menunggu proses review'}
                      </p>
                      {(selectedApplication.status === 'review' || selectedApplication.status === 'interview' || selectedApplication.status === 'accepted') && (
                        <p className="text-xs text-blue-600 mt-2 font-semibold">
                          {new Date(new Date(selectedApplication.appliedDate).getTime() + 24*60*60*1000).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Step 3 - Interview */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        selectedApplication.status === 'interview' || selectedApplication.status === 'accepted'
                          ? 'bg-amber-100' : 'bg-gray-100'
                      }`}>
                        <User className={selectedApplication.status === 'interview' || selectedApplication.status === 'accepted' ? 'text-amber-600' : 'text-gray-400'} size={20} />
                      </div>
                      {(selectedApplication.status === 'interview' || selectedApplication.status === 'accepted') && (
                        <div className="w-0.5 h-full bg-amber-200 mt-2"></div>
                      )}
                    </div>
                    <div className="pb-8 flex-1">
                      <h4 className={`font-semibold ${selectedApplication.status === 'interview' || selectedApplication.status === 'accepted' ? 'text-gray-900' : 'text-gray-400'}`}>
                        Jadwal Interview
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {selectedApplication.status === 'interview' || selectedApplication.status === 'accepted'
                          ? 'Anda dijadwalkan untuk interview dengan tim HR'
                          : 'Menunggu jadwal interview'}
                      </p>
                      {selectedApplication.status === 'interview' && (
                        <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                          <p className="text-sm font-semibold text-gray-900">📅 25 Januari 2025, 10:00 WIB</p>
                          <p className="text-sm text-gray-600 mt-1">📍 Kantor Pusat PT Santoso Jaya Tembakau</p>
                          <p className="text-sm text-gray-600">👤 Dengan: Tim HR & Manager Departemen</p>
                        </div>
                      )}
                      {(selectedApplication.status === 'interview' || selectedApplication.status === 'accepted') && (
                        <p className="text-xs text-amber-600 mt-2 font-semibold">
                          {new Date(new Date(selectedApplication.appliedDate).getTime() + 5*24*60*60*1000).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Step 4 - Final Decision */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        selectedApplication.status === 'accepted' ? 'bg-green-100' :
                        selectedApplication.status === 'rejected' ? 'bg-red-100' : 'bg-gray-100'
                      }`}>
                        {selectedApplication.status === 'accepted' ? (
                          <CheckCircle className="text-green-600" size={20} />
                        ) : selectedApplication.status === 'rejected' ? (
                          <XCircle className="text-red-600" size={20} />
                        ) : (
                          <Clock className="text-gray-400" size={20} />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${
                        selectedApplication.status === 'accepted' ? 'text-gray-900' :
                        selectedApplication.status === 'rejected' ? 'text-gray-900' : 'text-gray-400'
                      }`}>
                        Keputusan Akhir
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {selectedApplication.status === 'accepted' ? '🎉 Selamat! Anda diterima untuk posisi ini' :
                         selectedApplication.status === 'rejected' ? 'Maaf, lamaran Anda belum berhasil kali ini' :
                         'Menunggu keputusan akhir'}
                      </p>
                      {selectedApplication.status === 'accepted' && (
                        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-sm font-semibold text-gray-900">Langkah Selanjutnya:</p>
                          <p className="text-sm text-gray-600 mt-1">Silakan hubungi HR untuk proses onboarding</p>
                          <p className="text-sm text-gray-600">📞 (0331) 123-4567</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents Submitted */}
              <div className="bg-white border border-gray-200 rounded-lg lg:rounded-xl p-6 shadow-sm">
                <h2 className="mb-4 flex items-center gap-2">
                  <FileText className="text-amber-600" size={20} />
                  Dokumen yang Dilampirkan
                </h2>
                <div className="space-y-3">
                  {savedDocuments.slice(0, 2).map(doc => (
                    <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-3">
                        <FileText className="text-blue-600" size={24} />
                        <div>
                          <p className="font-semibold text-gray-800">{doc.name}</p>
                          <p className="text-sm text-gray-600">Diupload: {new Date(doc.uploadDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDownloadDocument(doc.name)}
                        className="text-amber-600 hover:text-amber-700 p-2 rounded-lg hover:bg-amber-50 transition-colors" 
                        title="Download"
                      >
                        <Download size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white border border-gray-200 rounded-lg lg:rounded-xl p-6 shadow-sm">
                <h2 className="mb-4 flex items-center gap-2">
                  <User className="text-amber-600" size={20} />
                  Informasi Kontak
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Nama Lengkap</p>
                    <p className="font-semibold text-gray-900">{userProfile.name}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <p className="font-semibold text-gray-900">{userProfile.email}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Nomor Telepon</p>
                    <p className="font-semibold text-gray-900">{userProfile.phone}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Pendidikan</p>
                    <p className="font-semibold text-gray-900">{userProfile.education}</p>
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              <div className="bg-white border border-gray-200 rounded-lg lg:rounded-xl p-6 shadow-sm">
                <h2 className="mb-4 flex items-center gap-2">
                  <Bell className="text-amber-600" size={20} />
                  Catatan & Informasi Tambahan
                </h2>
                {selectedApplication.status === 'interview' && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                    <p className="font-semibold text-blue-900 mb-2">💡 Tips untuk Interview:</p>
                    <ul className="text-sm text-blue-800 space-y-1 ml-4 list-disc">
                      <li>Datang 15 menit lebih awal</li>
                      <li>Bawa dokumen asli dan fotokopi</li>
                      <li>Persiapkan pertanyaan tentang perusahaan</li>
                      <li>Berpakaian formal dan rapi</li>
                    </ul>
                  </div>
                )}
                {selectedApplication.status === 'review' && (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="font-semibold text-orange-600 mb-2">⏳ Dalam Proses Review</p>
                    <p className="text-sm text-amber-800">
                      Tim HR sedang meninjau lamaran Anda. Proses review biasanya memakan waktu 3-5 hari kerja. 
                      Kami akan menghubungi Anda melalui email atau telepon jika ada update.
                    </p>
                  </div>
                )}
                {selectedApplication.status === 'pending' && (
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="font-semibold text-gray-900 mb-2">⏳ Menunggu Review</p>
                    <p className="text-sm text-gray-700">
                      Lamaran Anda sedang dalam antrian untuk direview. Mohon bersabar, kami akan segera meninjau lamaran Anda.
                    </p>
                  </div>
                )}
                {selectedApplication.status === 'rejected' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="font-semibold text-red-900 mb-2">💪 Jangan Menyerah!</p>
                    <p className="text-sm text-red-800">
                      Terima kasih atas minat Anda. Meskipun lamaran kali ini belum berhasil, kami mendorong Anda untuk 
                      melamar kembali untuk posisi lain yang sesuai dengan kualifikasi Anda.
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sticky bottom-0 bg-white py-4 border-t border-gray-200 lg:border-0">
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Kembali ke Riwayat Lamaran
                </button>
              </div>
            </div>
          )}

          {/* Jobs Tab */}
          {activeTab === 'jobs' && !selectedJob && (
            <div className="space-y-4 px-4 lg:px-0">
              <h2 className="mb-6">Lowongan Pekerjaan</h2>
              {jobs.map((job) => (
                <div key={job.id} className="bg-white border border-gray-200 rounded-lg lg:rounded-xl p-6 hover:border-amber-300 transition-colors shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="mb-1">{job.title}</h3>
                      <p className="text-gray-600">{job.department}</p>
                    </div>
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="text-amber-600 font-semibold hover:text-amber-700 transition-colors text-sm"
                    >
                      Lihat Detail
                    </button>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <span>Lokasi: {job.location}</span>
                    <span>Tipe: {job.type}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Job Detail Full Page */}
          {activeTab === 'jobs' && selectedJob && (
            <div className="px-4 lg:px-0 space-y-6">
              {/* Job Header */}
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg lg:rounded-xl p-6 lg:p-8 text-white shadow-lg">
                <h1 className="text-3xl font-bold mb-4">{selectedJob.title}</h1>
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold flex items-center gap-2">
                    <Briefcase size={16} />
                    {selectedJob.department}
                  </span>
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold flex items-center gap-2">
                    <Clock size={16} />
                    {selectedJob.type}
                  </span>
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold flex items-center gap-2">
                    <MapPin size={16} />
                    {selectedJob.location}
                  </span>
                </div>
                <button
                  onClick={handleApplyJob}
                  className="bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Lamar Posisi Ini Sekarang
                </button>
              </div>

              {/* Job Description */}
              <div className="bg-white border border-gray-200 rounded-lg lg:rounded-xl p-6 shadow-sm">
                <h2 className="mb-4 flex items-center gap-2">
                  <FileText className="text-amber-600" size={20} />
                  Deskripsi Pekerjaan
                </h2>
                <p className="text-gray-700 leading-relaxed">{selectedJob.description}</p>
              </div>

              {/* Responsibilities */}
              <div className="bg-white border border-gray-200 rounded-lg lg:rounded-xl p-6 shadow-sm">
                <h2 className="mb-4 flex items-center gap-2">
                  <CheckCircle className="text-amber-600" size={20} />
                  Tanggung Jawab
                </h2>
                <ul className="space-y-3">
                  {selectedJob.responsibilities.map((resp, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-semibold text-sm">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="bg-white border border-gray-200 rounded-lg lg:rounded-xl p-6 shadow-sm">
                <h2 className="mb-4 flex items-center gap-2">
                  <User className="text-amber-600" size={20} />
                  Kualifikasi yang Dibutuhkan
                </h2>
                <ul className="space-y-3">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle size={16} />
                      </span>
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sticky bottom-0 bg-white py-4 border-t border-gray-200 lg:border-0">
                <button
                  onClick={handleApplyJob}
                  className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Lamar Posisi Ini
                </button>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="sm:w-auto px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Kembali
                </button>
              </div>
            </div>
          )}

          {/* Upload Tab */}
          {activeTab === 'upload' && (
            <div className="space-y-6 px-4 lg:px-0">
              <h2 className="mb-6">Upload Dokumen</h2>
              
              <div className="bg-white border border-gray-200 rounded-lg lg:rounded-xl p-6 shadow-sm">
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Pilih Dokumen
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-amber-500 transition-colors">
                  <Upload className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-600 mb-2">
                    Drag & drop file atau{' '}
                    <label className="text-amber-600 font-semibold cursor-pointer hover:text-amber-700">
                      browse
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                      />
                    </label>
                  </p>
                  <p className="text-gray-500 text-sm">Format: PDF, DOC, DOCX (Max 5MB)</p>
                </div>

                {selectedFile && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="text-amber-600" size={24} />
                        <div>
                          <p className="font-semibold text-gray-800">{selectedFile.name}</p>
                          <p className="text-sm text-gray-600">
                            {(selectedFile.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedFile(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <XCircle size={24} />
                      </button>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleSaveDocument}
                  disabled={!selectedFile || isSavingDocument}
                  className={`
                    w-full py-3 rounded-lg transition-all duration-300 mt-4 flex items-center gap-2 justify-center min-w-[200px]
                    ${isSavingDocument
                      ? 'bg-green-600 text-white shadow-lg scale-105'
                      : selectedFile
                        ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:shadow-lg hover:scale-105'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  {isSavingDocument ? (
                    <>
                      <CheckCircle className="animate-checkMark" size={20} />
                      <span className="animate-fadeIn">Tersimpan!</span>
                    </>
                  ) : (
                    <span>Simpan Dokumen</span>
                  )}
                </button>

                {showSuccessAnimation && (
                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/80 flex items-center justify-center">
                    <CheckCircle className="text-green-500" size={64} />
                    <p className="text-xl font-bold text-gray-900 mt-4">Upload Berhasil!</p>
                  </div>
                )}
              </div>

              <div>
                <h3 className="mb-4">Dokumen Tersimpan</h3>
                <div className="space-y-3">
                  {savedDocuments.map(doc => (
                    <div key={doc.id} className="bg-white flex items-center justify-between p-4 border border-gray-200 rounded-lg lg:rounded-xl shadow-sm">
                      <div className="flex items-center gap-3">
                        <FileText className="text-blue-600" size={24} />
                        <div>
                          <p className="font-semibold text-gray-800">{doc.name}</p>
                          <p className="text-sm text-gray-600">Diupload: {new Date(doc.uploadDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => handleDownloadDocument(doc.name)}
                          className="text-amber-600 hover:text-amber-700 p-2 rounded-lg hover:bg-amber-50 transition-colors" 
                          title="Download"
                        >
                          <Download size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteDocument(doc.id)}
                          disabled={deletingDocumentId === doc.id}
                          className={`
                            p-2 rounded-lg transition-all duration-300 flex items-center gap-2
                            ${deletingDocumentId === doc.id
                              ? 'bg-red-600 text-white shadow-lg scale-105 px-4'
                              : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                            }
                          `}
                          title="Hapus Dokumen"
                        >
                          <Trash2 size={20} className={deletingDocumentId === doc.id ? 'animate-pulse' : ''} />
                          {deletingDocumentId === doc.id && (
                            <span className="text-sm font-semibold animate-fadeIn">Menghapus...</span>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6 px-4 lg:px-0">
              <h2 className="mb-6">Profil Saya</h2>
              
              {/* Profile Picture Section */}
              <div>
                <h3 className="mb-4 flex items-center gap-2">
                  <User className="text-amber-600" size={20} />
                  Foto Profil
                </h3>
                <div className="bg-white border border-gray-200 rounded-lg lg:rounded-xl p-6 shadow-sm">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    {/* Profile Image Preview */}
                    <div className="relative group">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-amber-500 shadow-lg">
                        {profileImage ? (
                          <img 
                            src={profileImage} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                            <User className="text-white" size={48} />
                          </div>
                        )}
                      </div>
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Upload className="text-white" size={32} />
                      </div>
                    </div>

                    {/* Upload Controls */}
                    <div className="flex-1 text-center md:text-left">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Ubah Foto Profil
                      </h4>
                      <p className="text-gray-600 text-sm mb-4">
                        Format: JPG, PNG (Max 2MB). Ukuran rekomendasi: 500x500px
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <label className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 inline-block">
                          <span className="flex items-center gap-2 justify-center">
                            <Upload size={18} />
                            Upload Foto
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/jpeg,image/png,image/jpg"
                            onChange={handleProfileImageChange}
                          />
                        </label>
                        {profileImage && (
                          <button
                            onClick={() => setProfileImage(null)}
                            className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Hapus Foto
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div>
                <h3 className="mb-4 flex items-center gap-2">
                  <User className="text-amber-600" size={20} />
                  Informasi Pribadi
                </h3>
                <div className="bg-white border border-gray-200 rounded-lg lg:rounded-xl p-6 shadow-sm">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        defaultValue={userProfile.name}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue={userProfile.email}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nomor Telepon
                      </label>
                      <input
                        type="tel"
                        defaultValue={userProfile.phone}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tanggal Lahir
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Alamat
                      </label>
                      <textarea
                        defaultValue={userProfile.address}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Education & Experience */}
              <div>
                <h3 className="mb-4 flex items-center gap-2">
                  <Briefcase className="text-amber-600" size={20} />
                  Pendidikan & Pengalaman
                </h3>
                <div className="bg-white border border-gray-200 rounded-lg lg:rounded-xl p-6 shadow-sm">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Pendidikan Terakhir
                      </label>
                      <input
                        type="text"
                        defaultValue={userProfile.education}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Pengalaman Kerja
                      </label>
                      <input
                        type="text"
                        defaultValue={userProfile.experience}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Keahlian / Skills
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Microsoft Office, Leadership, Komunikasi"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div>
                <h3 className="mb-4 flex items-center gap-2">
                  <Settings className="text-amber-600" size={20} />
                  Pengaturan Keamanan
                </h3>
                <div className="bg-white border border-gray-200 rounded-lg lg:rounded-xl p-6 shadow-sm">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Password Lama
                      </label>
                      <input
                        type="password"
                        placeholder="Masukkan password lama"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Password Baru
                        </label>
                        <input
                          type="password"
                          placeholder="Masukkan password baru"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Konfirmasi Password Baru
                        </label>
                        <input
                          type="password"
                          placeholder="Konfirmasi password baru"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2FA Section */}
                <div className="bg-white border border-gray-200 rounded-lg lg:rounded-xl p-6 shadow-sm mt-6 relative">
                  {/* Success Animation Overlay - Local to 2FA Section */}
                  {show2FASuccess && (
                    <div className="absolute inset-0 bg-white/95 z-10 rounded-lg lg:rounded-xl flex items-center justify-center backdrop-blur-sm animate-fadeIn">
                      <div className="text-center p-8">
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce ${is2FAEnabled ? 'bg-red-100' : 'bg-green-100'}`}>
                          <CheckCircle className={`animate-checkMark ${is2FAEnabled ? 'text-red-600' : 'text-green-600'}`} size={48} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {is2FAEnabled ? '2FA Berhasil Dinonaktifkan! ✅' : '2FA Berhasil Diaktifkan! ✅'}
                        </h3>
                        <p className="text-gray-600">
                          {is2FAEnabled 
                            ? 'Autentikasi Dua Faktor telah dinonaktifkan dari akun Anda'
                            : 'Akun Anda sekarang lebih aman dengan Autentikasi Dua Faktor'
                          }
                        </p>
                        <div className="w-full max-w-xs mx-auto mt-4 bg-gray-200 h-1 rounded-full overflow-hidden">
                          <div className={`h-full bg-gradient-to-r animate-progress ${is2FAEnabled ? 'from-red-600 to-red-400' : 'from-green-600 to-emerald-600'}`}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Header with Toggle */}
                  <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${is2FAEnabled ? 'bg-green-100 animate-pulse' : 'bg-gray-100'}`}>
                        <Shield className={`${is2FAEnabled ? 'text-green-600' : 'text-gray-400'}`} size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-800">Autentikasi Dua Faktor (2FA)</h4>
                          {is2FAEnabled && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full animate-fadeIn">
                              AKTIF
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {is2FAEnabled 
                            ? '✓ Akun Anda dilindungi dengan 2FA'
                            : 'Tambahkan lapisan keamanan ekstra ke akun Anda'
                          }
                        </p>
                      </div>
                    </div>
                    {/* Toggle Switch */}
                    <button
                      onClick={() => {
                        if (!is2FAEnabled) {
                          handleEnable2FA();
                        } else {
                          handleDisable2FA();
                        }
                      }}
                      className={`
                        relative w-14 h-7 rounded-full transition-colors duration-300
                        ${is2FAEnabled ? 'bg-green-500' : 'bg-gray-300'}
                      `}
                    >
                      <div
                        className={`
                          absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300
                          ${is2FAEnabled ? 'translate-x-7' : 'translate-x-0'}
                        `}
                      />
                    </button>
                  </div>

                  {/* Expanded Setup Content */}
                  {show2FASetup && !show2FASuccess && (
                    <div className="mt-6 space-y-6 animate-fadeIn">
                      {/* QR Code Section (Default) */}
                      {showQRCode ? (
                        <div className="space-y-4 animate-fadeIn">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-semibold text-gray-800 flex items-center gap-2">
                                <Smartphone className="text-amber-600" size={20} />
                                Scan QR Code
                              </h5>
                              <p className="text-sm text-gray-600 mt-1">
                                Gunakan aplikasi Google Authenticator untuk memindai kode QR
                              </p>
                            </div>
                            <button
                              onClick={() => setShowQRCode(false)}
                              className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium whitespace-nowrap"
                            >
                              Setup Manual
                            </button>
                          </div>
                          <div className="flex justify-center py-6">
                            <div className="bg-white p-5 rounded-lg border-2 border-amber-300 shadow-lg animate-pulse">
                              <img 
                                src={qrCodeUrl} 
                                alt="QR Code" 
                                className="w-52 h-52"
                              />
                            </div>
                          </div>
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <p className="text-sm text-blue-800">
                              💡 <strong>Tip:</strong> Pastikan Anda sudah menginstall Google Authenticator di smartphone Anda
                            </p>
                          </div>
                        </div>
                      ) : (
                        /* Setup Manual Section */
                        <div className="space-y-4 animate-fadeIn">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-semibold text-gray-800 flex items-center gap-2">
                                <Settings className="text-amber-600" size={20} />
                                Setup Manual
                              </h5>
                              <p className="text-sm text-gray-600 mt-1">
                                Masukkan kode berikut ke aplikasi Google Authenticator
                              </p>
                            </div>
                            <button
                              onClick={() => setShowQRCode(true)}
                              className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium whitespace-nowrap"
                            >
                              Tampilkan QR
                            </button>
                          </div>

                          {/* Steps */}
                          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <h6 className="font-semibold text-gray-800 mb-3 text-sm">Langkah-langkah:</h6>
                            <ol className="space-y-2 text-sm text-gray-700">
                              <li className="flex gap-2">
                                <span className="font-semibold text-gray-600">1.</span>
                                <span>Buka aplikasi Google Authenticator</span>
                              </li>
                              <li className="flex gap-2">
                                <span className="font-semibold text-gray-600">2.</span>
                                <span>Tap tombol "+" untuk menambahkan akun baru</span>
                              </li>
                              <li className="flex gap-2">
                                <span className="font-semibold text-gray-600">3.</span>
                                <span>Pilih "Masukkan kode penyiapan"</span>
                              </li>
                              <li className="flex gap-2">
                                <span className="font-semibold text-gray-600">4.</span>
                                <span>Masukkan informasi berikut:</span>
                              </li>
                            </ol>
                          </div>

                          {/* Secret Key */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Kode Secret (Key):
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={secretKey}
                                readOnly
                                className="flex-1 px-4 py-3 bg-amber-50 border-2 border-amber-300 rounded-lg font-mono text-gray-800 font-semibold"
                              />
                              <button
                                onClick={handleCopySecretKey}
                                className={`
                                  px-4 py-3 border-2 rounded-lg transition-all duration-300 flex items-center gap-2
                                  ${copiedSecretKey 
                                    ? 'border-green-500 bg-green-50 text-green-600' 
                                    : 'border-gray-300 hover:bg-gray-50 hover:border-amber-500'
                                  }
                                `}
                                title="Salin kode"
                              >
                                {copiedSecretKey ? (
                                  <>
                                    <Check size={18} className="text-green-600 animate-bounce" />
                                    <span className="text-sm font-semibold">Tersalin!</span>
                                  </>
                                ) : (
                                  <Copy size={18} className="text-gray-600" />
                                )}
                              </button>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Jenis Kode:
                            </label>
                            <div className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700">
                              Berbasis waktu (Time-based)
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Verification Section */}
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="text-amber-600" size={20} />
                          <h5 className="font-semibold text-gray-800">Masukkan Kode Verifikasi</h5>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          Masukkan kode 6 digit yang ditampilkan di Google Authenticator
                        </p>
                        <div className="relative">
                          <input
                            type="text"
                            value={verificationCode}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                              setVerificationCode(value);
                            }}
                            placeholder="123456"
                            maxLength={6}
                            className={`
                              w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-center text-2xl font-mono tracking-[0.5em] bg-gray-50 transition-all duration-300
                              ${verificationCode.length === 6 ? 'border-green-500 bg-green-50' : 'border-gray-300'}
                            `}
                          />
                          {verificationCode.length === 6 && !isVerifying2FA && !show2FASuccess && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 animate-fadeIn">
                              <CheckCircle className="text-green-600 animate-bounce" size={24} />
                            </div>
                          )}
                        </div>
                        <button
                          onClick={handleVerify2FA}
                          disabled={verificationCode.length !== 6 || isVerifying2FA || show2FASuccess}
                          className={`
                            mt-4 w-full px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2
                            ${verificationCode.length === 6 && !isVerifying2FA && !show2FASuccess
                              ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:shadow-lg hover:scale-105'
                              : isVerifying2FA
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }
                          `}
                        >
                          {isVerifying2FA ? (
                            <>
                              <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                              Memverifikasi...
                            </>
                          ) : (
                            <>
                              <Shield size={18} />
                              Verifikasi & Aktifkan
                            </>
                          )}
                        </button>
                        
                        {/* Verification Process Indicator */}
                        {isVerifying2FA && (
                          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg animate-fadeIn">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                              <div>
                                <p className="font-semibold text-blue-900">Sedang Memverifikasi Kode...</p>
                                <p className="text-sm text-blue-700">Mohon tunggu sebentar</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Backup Codes - Only show after user inputs code */}
                      {backupCodes.length > 0 && verificationCode.length === 6 && !isVerifying2FA && !show2FASuccess && (
                        <div className="pt-4 border-t border-gray-200 animate-slideUp">
                          <div className="flex items-start gap-3 mb-4">
                            <AlertTriangle className="text-amber-600 flex-shrink-0 mt-1 animate-pulse" size={20} />
                            <div>
                              <h5 className="font-semibold text-gray-800 mb-1">Kode Cadangan</h5>
                              <p className="text-sm text-gray-600">
                                Simpan kode ini dengan aman. Gunakan jika kehilangan akses ke Google Authenticator.
                              </p>
                            </div>
                          </div>
                          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 font-mono text-sm">
                            <div className="grid grid-cols-2 gap-3">
                              {backupCodes.map((code, index) => (
                                <div key={index} className="text-gray-700 bg-white px-3 py-2 rounded border border-amber-200">
                                  {code}
                                </div>
                              ))}
                            </div>
                          </div>
                          <button
                            onClick={handleCopyBackupCodes}
                            className={`
                              mt-3 w-full px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300
                              ${copiedBackupCodes
                                ? 'bg-green-600 text-white border-2 border-green-600'
                                : 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:shadow-lg hover:scale-105'
                              }
                            `}
                          >
                            {copiedBackupCodes ? (
                              <>
                                <Check size={18} className="animate-bounce" />
                                Tersalin!
                              </>
                            ) : (
                              <>
                                <Copy size={18} />
                                Salin Semua Kode
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className={`
                    flex-1 px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2
                    ${isSaving
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:shadow-lg hover:scale-105'
                    }
                  `}
                >
                  {isSaving ? (
                    <>
                      <CheckCircle className="animate-checkMark" size={20} />
                      <span className="animate-fadeIn">Tersimpan!</span>
                    </>
                  ) : (
                    <span>Simpan Perubahan</span>
                  )}
                </button>
                <button
                  type="button"
                  className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}