// HR Dashboard Component for PT Santoso Jaya Tembakau
// Complete HR management system with jobs, applications, users, and profile
import { useState, useEffect } from 'react';
import { useJobs } from '../contexts/JobsContext';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  FileText, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Download,
  Calendar,
  MapPin,
  DollarSign,
  Building,
  UserCheck,
  UserX,
  LogOut,
  Save,
  X,
  Menu,
  ChevronLeft,
  User,
  Settings,
  Shield,
  Smartphone,
  Copy,
  Check,
  AlertTriangle,
  ArrowLeft,
  Mail,
  Phone,
  GraduationCap,
  Award,
  Loader2,
  UserCircle,
  Briefcase as BriefcaseIcon,
  Send
} from 'lucide-react';

type HRDashboardProps = {
  onLogout: () => void;
};

type JobPosting = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  postedDate: string;
  deadline: string;
  status: 'active' | 'closed';
  applicantsCount: number;
};

type Application = {
  id: string;
  jobId: string;
  jobTitle: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  appliedDate: string;
  status: 'pending' | 'reviewed' | 'interview' | 'accepted' | 'rejected';
  resume: string;
  coverLetter: string;
  address: string;
  education: string;
  experience: string;
};

type RegisteredUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  registeredDate: string;
  applicationsCount: number;
  status: 'active' | 'inactive';
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

export function HRDashboard({ onLogout }: HRDashboardProps) {
  // Use Jobs Context for real-time sync
  const { jobPostings, addJob, updateJob, deleteJob } = useJobs();
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'jobs' | 'applications' | 'users' | 'team' | 'profile' | 'edit-job' | 'application-detail' | 'add-job' | 'team-detail' | 'add-team' | 'edit-team'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  // Filter states for each section
  const [jobFilterStatus, setJobFilterStatus] = useState<string>('all'); // all, active, closed
  const [jobFilterDepartment, setJobFilterDepartment] = useState<string>('all'); // all, produksi, sales, etc
  const [jobFilterType, setJobFilterType] = useState<string>('all'); // all, full-time, part-time, etc
  const [jobSearchQuery, setJobSearchQuery] = useState('');
  
  const [applicationFilterStatus, setApplicationFilterStatus] = useState<string>('all'); // all, pending, reviewed, interview, accepted, rejected
  const [applicationFilterJob, setApplicationFilterJob] = useState<string>('all'); // all, job title
  const [applicationSearchQuery, setApplicationSearchQuery] = useState('');
  
  const [userFilterStatus, setUserFilterStatus] = useState<string>('all'); // all, active, inactive
  const [userSearchQuery, setUserSearchQuery] = useState('');
  
  const [teamFilterDepartment, setTeamFilterDepartment] = useState<string>('all'); // all, departments
  const [teamFilterStatus, setTeamFilterStatus] = useState<string>('all'); // all, active, inactive
  const [teamSearchQuery, setTeamSearchQuery] = useState('');
  
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingJobId, setDeletingJobId] = useState<string | null>(null);
  
  // Status update button clicked states
  const [clickedStatusButton, setClickedStatusButton] = useState<{[key: string]: string | null}>({});
  
  // 2FA States
  const [is2FAEnabled, setIs2FAEnabled] = useState(() => {
    const saved = localStorage.getItem('user_2fa_hr@santosojayatembakau.com');
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
  const [qrCodeUrl] = useState('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/PT%20Santoso%20Jaya:hr@santosojayatembakau.com?secret=HRJB2WY3DPEH3K3P&issuer=PT%20Santoso%20Jaya');
  const [secretKey] = useState('HRJB2WY3DPEH3K3P');

  // HR Profile
  const [hrProfile, setHrProfile] = useState({
    name: 'HR Admin',
    email: 'hr@santosojayatembakau.com',
    phone: '081234567899',
    department: 'Human Resources',
    position: 'HR Manager'
  });

  // Jobs are now managed by JobsContext - no local state needed

  // Mock data - Lamaran
  const [applications, setApplications] = useState<Application[]>([
    {
      id: '1',
      jobId: '1',
      jobTitle: 'Supervisor Produksi',
      applicantName: 'Indra Septiana',
      applicantEmail: 'indra@santosojayatembakau.com',
      applicantPhone: '081234567890',
      appliedDate: '2025-01-15',
      status: 'pending',
      resume: 'resume_indra.pdf',
      coverLetter: 'Saya tertarik dengan posisi Supervisor Produksi di PT Santoso Jaya Tembakau. Dengan pengalaman saya di industri manufaktur selama 5 tahun, saya yakin dapat memberikan kontribusi yang signifikan untuk perusahaan.',
      address: 'Jl. Merdeka No. 123, Kudus, Jawa Tengah',
      education: 'S1 Teknik Industri - Universitas Diponegoro (2015-2019)',
      experience: '5 tahun sebagai Assistant Supervisor di PT Djarum'
    },
    {
      id: '2',
      jobId: '1',
      jobTitle: 'Supervisor Produksi',
      applicantName: 'Budi Santoso',
      applicantEmail: 'budi@example.com',
      applicantPhone: '081234567891',
      appliedDate: '2025-01-16',
      status: 'reviewed',
      resume: 'resume_budi.pdf',
      coverLetter: 'Dengan pengalaman saya di bidang manufaktur, saya siap mengambil tantangan baru.',
      address: 'Jl. Pemuda No. 45, Kudus, Jawa Tengah',
      education: 'S1 Manajemen Industri - Universitas Sebelas Maret (2014-2018)',
      experience: '6 tahun sebagai Production Supervisor di PT Gudang Garam'
    },
    {
      id: '3',
      jobId: '2',
      jobTitle: 'Quality Control Staff',
      applicantName: 'Siti Aminah',
      applicantEmail: 'siti@example.com',
      applicantPhone: '081234567892',
      appliedDate: '2025-01-17',
      status: 'interview',
      resume: 'resume_siti.pdf',
      coverLetter: 'Saya memiliki pengalaman di QC selama 3 tahun dengan sertifikasi ISO 9001.',
      address: 'Jl. Gatot Subroto No. 78, Kudus, Jawa Tengah',
      education: 'D3 Teknik Kimia - Politeknik Negeri Semarang (2017-2020)',
      experience: '3 tahun sebagai QC Staff di PT Sampoerna'
    },
    {
      id: '4',
      jobId: '2',
      jobTitle: 'Quality Control Staff',
      applicantName: 'Ahmad Fauzi',
      applicantEmail: 'ahmad@example.com',
      applicantPhone: '081234567893',
      appliedDate: '2025-01-18',
      status: 'accepted',
      resume: 'resume_ahmad.pdf',
      coverLetter: 'Saya sangat antusias untuk bergabung dengan tim QC PT Santoso Jaya Tembakau.',
      address: 'Jl. Sudirman No. 90, Kudus, Jawa Tengah',
      education: 'S1 Farmasi - Universitas Gadjah Mada (2016-2020)',
      experience: '2 tahun sebagai Quality Analyst di PT Bentoel'
    },
    {
      id: '5',
      jobId: '3',
      jobTitle: 'Staff Accounting',
      applicantName: 'Dewi Lestari',
      applicantEmail: 'dewi@example.com',
      applicantPhone: '081234567894',
      appliedDate: '2025-01-19',
      status: 'rejected',
      resume: 'resume_dewi.pdf',
      coverLetter: 'Dengan latar belakang akuntansi dan perpajakan, saya siap membantu perusahaan.',
      address: 'Jl. Ahmad Yani No. 56, Kudus, Jawa Tengah',
      education: 'S1 Akuntansi - Universitas Brawijaya (2017-2021)',
      experience: '2 tahun sebagai Staff Accounting di PT Nojorono'
    }
  ]);

  // Mock data - Registered Users
  const [registeredUsers] = useState<RegisteredUser[]>([
    {
      id: '1',
      name: 'Indra Septiana',
      email: 'indra@santosojayatembakau.com',
      phone: '081234567890',
      registeredDate: '2025-01-10',
      applicationsCount: 2,
      status: 'active'
    },
    {
      id: '2',
      name: 'Budi Santoso',
      email: 'budi@example.com',
      phone: '081234567891',
      registeredDate: '2025-01-12',
      applicationsCount: 1,
      status: 'active'
    },
    {
      id: '3',
      name: 'Siti Aminah',
      email: 'siti@example.com',
      phone: '081234567892',
      registeredDate: '2025-01-13',
      applicationsCount: 3,
      status: 'active'
    },
    {
      id: '4',
      name: 'Ahmad Fauzi',
      email: 'ahmad@example.com',
      phone: '081234567893',
      registeredDate: '2025-01-14',
      applicationsCount: 1,
      status: 'active'
    },
    {
      id: '5',
      name: 'Dewi Lestari',
      email: 'dewi@example.com',
      phone: '081234567894',
      registeredDate: '2025-01-15',
      applicationsCount: 2,
      status: 'active'
    }
  ]);

  // Mock data - Employees / Team
  const [employees, setEmployees] = useState<Employee[]>([
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

  const [newEmployee, setNewEmployee] = useState<Partial<Employee>>({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    joinDate: new Date().toISOString().split('T')[0],
    address: '',
    education: '',
    skills: [],
    jobDescription: '',
    responsibilities: [],
    status: 'active'
  });

  const [newSkill, setNewSkill] = useState('');
  const [newResponsibility, setNewResponsibility] = useState('');

  // Pending Profile Changes State - stored in localStorage
  const [pendingChanges, setPendingChanges] = useState<PendingProfileChange[]>(() => {
    const saved = localStorage.getItem('pending_profile_changes');
    return saved ? JSON.parse(saved) : [];
  });

  // Save pending changes to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('pending_profile_changes', JSON.stringify(pendingChanges));
  }, [pendingChanges]);

  // New Job Form State
  const [newJob, setNewJob] = useState<Partial<JobPosting>>({
    title: '',
    department: '',
    location: 'Kudus, Jawa Tengah',
    type: 'Full-time',
    salary: 'Negotiable',
    description: '',
    requirements: [],
    responsibilities: [],
    deadline: '',
    status: 'active'
  });

  // Statistics
  const stats = {
    totalJobs: jobPostings.filter(j => j.status === 'active').length,
    totalApplications: applications.length,
    pendingApplications: applications.filter(a => a.status === 'pending').length,
    acceptedApplications: applications.filter(a => a.status === 'accepted').length,
    totalUsers: registeredUsers.length
  };

  const handleUpdateApplicationStatus = (applicationId: string, newStatus: Application['status']) => {
    setApplications(prev => prev.map(app => 
      app.id === applicationId ? { ...app, status: newStatus } : app
    ));
    
    // Track which button was clicked
    setClickedStatusButton(prev => ({
      ...prev,
      [applicationId]: newStatus
    }));
    
    // Clear the checkmark after 2 seconds
    setTimeout(() => {
      setClickedStatusButton(prev => ({
        ...prev,
        [applicationId]: null
      }));
    }, 2000);
  };

  const handleDeleteJob = (jobId: string) => {
    setDeletingJobId(jobId);
    setTimeout(() => {
      deleteJob(jobId);
      setDeletingJobId(null);
    }, 1000);
  };

  const handleAddJob = () => {
    const job: JobPosting = {
      id: (jobPostings.length + 1).toString(),
      title: newJob.title || '',
      department: newJob.department || '',
      location: newJob.location || 'Kudus, Jawa Tengah',
      type: newJob.type || 'Full-time',
      salary: 'Negotiable',
      description: newJob.description || '',
      requirements: newJob.requirements || [],
      responsibilities: newJob.responsibilities || [],
      postedDate: new Date().toISOString().split('T')[0],
      deadline: newJob.deadline || '',
      status: 'active',
      applicantsCount: 0
    };
    
    addJob(job);
    setActiveTab('jobs');
    setNewJob({
      title: '',
      department: '',
      location: 'Kudus, Jawa Tengah',
      type: 'Full-time',
      salary: 'Negotiable',
      description: '',
      requirements: [],
      responsibilities: [],
      deadline: '',
      status: 'active'
    });
  };

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.phone) {
      alert('Nama, Email, dan No. Telepon wajib diisi!');
      return;
    }

    const employee: Employee = {
      id: (employees.length + 1).toString(),
      name: newEmployee.name || '',
      email: newEmployee.email || '',
      phone: newEmployee.phone || '',
      position: newEmployee.position || '',
      department: newEmployee.department || '',
      joinDate: newEmployee.joinDate || new Date().toISOString().split('T')[0],
      photo: `https://ui-avatars.com/api/?name=${encodeURIComponent(newEmployee.name || '')}&background=f59e0b&color=fff&size=200`,
      status: newEmployee.status || 'active',
      address: newEmployee.address || '',
      education: newEmployee.education || '',
      skills: newEmployee.skills || [],
      jobDescription: newEmployee.jobDescription || '',
      responsibilities: newEmployee.responsibilities || []
    };
    
    setEmployees(prev => [...prev, employee]);
    setActiveTab('team');
    
    // Reset form
    setNewEmployee({
      name: '',
      email: '',
      phone: '',
      position: '',
      department: '',
      joinDate: new Date().toISOString().split('T')[0],
      address: '',
      education: '',
      skills: [],
      jobDescription: '',
      responsibilities: [],
      status: 'active'
    });
    setNewSkill('');
    setNewResponsibility('');
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !newEmployee.skills?.includes(newSkill.trim())) {
      setNewEmployee(prev => ({
        ...prev,
        skills: [...(prev.skills || []), newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setNewEmployee(prev => ({
      ...prev,
      skills: (prev.skills || []).filter(skill => skill !== skillToRemove)
    }));
  };

  const handleAddResponsibility = () => {
    if (newResponsibility.trim() && !newEmployee.responsibilities?.includes(newResponsibility.trim())) {
      setNewEmployee(prev => ({
        ...prev,
        responsibilities: [...(prev.responsibilities || []), newResponsibility.trim()]
      }));
      setNewResponsibility('');
    }
  };

  const handleRemoveResponsibility = (responsibilityToRemove: string) => {
    setNewEmployee(prev => ({
      ...prev,
      responsibilities: (prev.responsibilities || []).filter(resp => resp !== responsibilityToRemove)
    }));
  };

  const handleEditJob = () => {
    if (selectedJob) {
      updateJob(selectedJob.id, selectedJob);
      setActiveTab('jobs');
      setSelectedJob(null);
    }
  };

  // Download resume function - Direct download without alert
  const handleDownloadResume = (fileName: string) => {
    // Create a dummy PDF blob for demo purposes
    const dummyContent = `CV/Resume - ${fileName}\n\nIni adalah file demo untuk ${fileName}.\nDi production, file asli akan didownload dari server.`;
    const blob = new Blob([dummyContent], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    
    // Create temporary link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    // In production environment with real file URL:
    // fetch(fileUrl)
    //   .then(response => response.blob())
    //   .then(blob => {
    //     const url = window.URL.createObjectURL(blob);
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.download = fileName;
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    //     window.URL.revokeObjectURL(url);
    //   });
  };

  // Filter functions
  const getFilteredJobs = () => {
    return jobPostings.filter(job => {
      // Filter by status
      if (jobFilterStatus !== 'all' && job.status !== jobFilterStatus) return false;
      
      // Filter by department
      if (jobFilterDepartment !== 'all' && job.department.toLowerCase() !== jobFilterDepartment.toLowerCase()) return false;
      
      // Filter by type
      if (jobFilterType !== 'all' && job.type !== jobFilterType) return false;
      
      // Search query
      if (jobSearchQuery && !job.title.toLowerCase().includes(jobSearchQuery.toLowerCase()) && 
          !job.department.toLowerCase().includes(jobSearchQuery.toLowerCase()) &&
          !job.location.toLowerCase().includes(jobSearchQuery.toLowerCase())) return false;
      
      return true;
    });
  };

  const getFilteredApplications = () => {
    return applications.filter(app => {
      // Filter by status
      if (applicationFilterStatus !== 'all' && app.status !== applicationFilterStatus) return false;
      
      // Filter by job
      if (applicationFilterJob !== 'all' && app.jobTitle !== applicationFilterJob) return false;
      
      // Search query
      if (applicationSearchQuery && 
          !app.applicantName.toLowerCase().includes(applicationSearchQuery.toLowerCase()) &&
          !app.applicantEmail.toLowerCase().includes(applicationSearchQuery.toLowerCase()) &&
          !app.jobTitle.toLowerCase().includes(applicationSearchQuery.toLowerCase())) return false;
      
      return true;
    });
  };

  const getFilteredUsers = () => {
    return registeredUsers.filter(user => {
      // Filter by status
      if (userFilterStatus !== 'all' && user.status !== userFilterStatus) return false;
      
      // Search query
      if (userSearchQuery && 
          !user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) &&
          !user.email.toLowerCase().includes(userSearchQuery.toLowerCase()) &&
          !user.phone.includes(userSearchQuery)) return false;
      
      return true;
    });
  };

  const getStatusBadge = (status: Application['status']) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      reviewed: 'bg-blue-100 text-blue-800 border-blue-300',
      interview: 'bg-purple-100 text-purple-800 border-purple-300',
      accepted: 'bg-green-100 text-green-800 border-green-300',
      rejected: 'bg-red-100 text-red-800 border-red-300'
    };
    
    const labels = {
      pending: 'Menunggu',
      reviewed: 'Ditinjau',
      interview: 'Interview',
      accepted: 'Diterima',
      rejected: 'Ditolak'
    };
    
    return (
      <span className={`inline-block px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border whitespace-nowrap ${badges[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const handleSaveProfile = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleEnable2FA = () => {
    setShow2FASetup(true);
    setShowQRCode(true);
    const codes = [];
    for (let i = 0; i < 8; i++) {
      const code = Math.random().toString(36).substring(2, 10).toUpperCase();
      codes.push(code);
    }
    setBackupCodes(codes);
  };

  const handleVerify2FA = () => {
    if (verificationCode.length === 6) {
      setIsVerifying2FA(true);
      setTimeout(() => {
        setIsVerifying2FA(false);
        setIs2FAEnabled(true);
        setShow2FASetup(false);
        setVerificationCode('');
        setShowQRCode(true);
        localStorage.setItem('user_2fa_hr@santosojayatembakau.com', 'enabled');
        // Show success message
        setShow2FASuccess(true);
        setTimeout(() => {
          setShow2FASuccess(false);
        }, 2000);
      }, 800);
    }
  };

  const handleDisable2FA = () => {
    setIs2FAEnabled(false);
    setShow2FASetup(false);
    setBackupCodes([]);
    setCopiedBackupCodes(false);
    setCopiedSecretKey(false);
    setVerificationCode('');
    setShowQRCode(true);
    localStorage.removeItem('user_2fa_hr@santosojayatembakau.com');
    // Show success message
    setShow2FASuccess(true);
    setTimeout(() => {
      setShow2FASuccess(false);
    }, 2000);
  };

  const handleCopyBackupCodes = () => {
    const codesText = backupCodes.join('\n');
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
    setShowQRCode(true);
  };

  return (
    <div className="h-screen bg-white lg:flex relative overflow-hidden">
      {/* Mobile Overlay Background */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <div className={`
        bg-white text-gray-800 flex flex-col border-r border-gray-200 shadow-lg transition-all duration-300 h-screen
        lg:relative lg:translate-x-0
        fixed inset-y-0 left-0 z-40
        ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0 lg:w-16'}
      `}>
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
                <h3 className="text-sm font-semibold truncate text-gray-900">{hrProfile.name}</h3>
                <p className="text-xs text-gray-600 truncate">{hrProfile.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className={`flex-1 px-2 space-y-1 ${sidebarOpen ? 'py-4' : 'py-16'}`}>
          <button
            onClick={() => {
              setActiveTab('dashboard');
              if (window.innerWidth < 1024) setSidebarOpen(false);
            }}
            className={`w-full flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-3 rounded-lg transition-colors text-left ${
              activeTab === 'dashboard'
                ? 'bg-amber-600 text-white'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
            title={!sidebarOpen ? 'Dashboard' : ''}
          >
            <LayoutDashboard size={18} />
            {sidebarOpen && <span className="text-sm">Dashboard</span>}
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
            <Briefcase size={18} />
            {sidebarOpen && <span className="text-sm">Lowongan Pekerjaan</span>}
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
            title={!sidebarOpen ? 'Lamaran' : ''}
          >
            <FileText size={18} />
            {sidebarOpen && <span className="text-sm">Lamaran</span>}
          </button>

          <button
            onClick={() => {
              setActiveTab('users');
              if (window.innerWidth < 1024) setSidebarOpen(false);
            }}
            className={`w-full flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-3 rounded-lg transition-colors text-left ${
              activeTab === 'users'
                ? 'bg-amber-600 text-white'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
            title={!sidebarOpen ? 'Pengguna' : ''}
          >
            <Users size={18} />
            {sidebarOpen && <span className="text-sm">Pengguna</span>}
          </button>

          <button
            onClick={() => {
              setActiveTab('team');
              if (window.innerWidth < 1024) setSidebarOpen(false);
            }}
            className={`w-full flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-3 rounded-lg transition-colors text-left ${
              activeTab === 'team'
                ? 'bg-amber-600 text-white'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
            title={!sidebarOpen ? 'Team SJT' : ''}
          >
            <UserCircle size={18} />
            {sidebarOpen && <span className="text-sm">Team SJT</span>}
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
        <div className={`border-t border-gray-200 ${sidebarOpen ? 'p-4' : 'p-2'}`}>
          <button
            onClick={onLogout}
            className={`w-full flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors text-gray-700`}
            title={!sidebarOpen ? 'Logout' : ''}
          >
            <LogOut size={18} />
            {sidebarOpen && <span className="text-sm">Logout</span>}
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
          <h1 className="text-xl font-bold">HR Dashboard</h1>
          <div className="w-10"></div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8">
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Welcome Header */}
                <div className="px-4 lg:px-0">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Selamat Datang, {hrProfile.name}! 👋
                  </h2>
                  <p className="text-gray-600">Berikut adalah ringkasan aktivitas HR hari ini.</p>
                </div>

                {/* Stats Cards with Gradient */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 lg:px-0">
                  {/* Total Jobs */}
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl lg:rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-blue-100 text-sm mb-1">Lowongan Aktif</p>
                        <p className="text-4xl font-bold">{stats.totalJobs}</p>
                      </div>
                      <div className="bg-white/20 p-3 rounded-lg">
                        <Briefcase className="text-white" size={24} />
                      </div>
                    </div>
                    <p className="text-blue-100 text-sm">Dibuka untuk pelamar</p>
                  </div>

                  {/* Pending Applications */}
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl lg:rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-green-100 text-sm mb-1">Menunggu Review</p>
                        <p className="text-4xl font-bold">{stats.pendingApplications}</p>
                      </div>
                      <div className="bg-white/20 p-3 rounded-lg">
                        <Clock className="text-white" size={24} />
                      </div>
                    </div>
                    <p className="text-green-100 text-sm">Perlu segera ditinjau</p>
                  </div>

                  {/* Accepted Applications */}
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl lg:rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-purple-100 text-sm mb-1">Diterima</p>
                        <p className="text-4xl font-bold">{stats.acceptedApplications}</p>
                      </div>
                      <div className="bg-white/20 p-3 rounded-lg">
                        <CheckCircle className="text-white" size={24} />
                      </div>
                    </div>
                    <p className="text-purple-100 text-sm">Selamat! 🎉</p>
                  </div>

                  {/* Total Users */}
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl lg:rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-orange-100 text-sm mb-1">Total Pengguna</p>
                        <p className="text-4xl font-bold">{stats.totalUsers}</p>
                      </div>
                      <div className="bg-white/20 p-3 rounded-lg">
                        <Users className="text-white" size={24} />
                      </div>
                    </div>
                    <p className="text-orange-100 text-sm">Terdaftar di sistem</p>
                  </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 lg:px-0">
                  {/* Left: Recent Activity */}
                  <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl lg:rounded-2xl border border-gray-200 p-6 shadow-sm">
                      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        🔔 Aktivitas Terbaru
                      </h3>
                      <div className="space-y-3">
                        {applications.slice(0, 3).map((app) => (
                          <div key={app.id} className={`p-4 rounded-xl border-2 ${
                            app.status === 'pending' ? 'bg-blue-50 border-blue-200' :
                            app.status === 'interview' ? 'bg-orange-50 border-orange-200' :
                            app.status === 'accepted' ? 'bg-green-50 border-green-200' :
                            'bg-gray-50 border-gray-200'
                          }`}>
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-lg ${
                                app.status === 'pending' ? 'bg-blue-100' :
                                app.status === 'interview' ? 'bg-orange-100' :
                                app.status === 'accepted' ? 'bg-green-100' :
                                'bg-gray-100'
                              }`}>
                                {app.status === 'pending' ? <Clock className="text-blue-600" size={20} /> :
                                 app.status === 'interview' ? <UserCheck className="text-orange-600" size={20} /> :
                                 app.status === 'accepted' ? <CheckCircle className="text-green-600" size={20} /> :
                                 <FileText className="text-gray-600" size={20} />}
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900 text-sm">{app.applicantName}</p>
                                <p className="text-xs text-gray-600 mt-0.5">{app.jobTitle}</p>
                                <p className="text-xs text-gray-500 mt-1">{app.appliedDate}</p>
                              </div>
                              {getStatusBadge(app.status)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Quick Actions */}
                  <div>
                    <div className="bg-white rounded-xl lg:rounded-2xl border border-gray-200 p-6 shadow-sm">
                      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        Tindakan Cepat
                      </h3>
                      <div className="space-y-3">
                        <button
                          onClick={() => setActiveTab('jobs')}
                          className="w-full bg-gradient-to-r from-orange-600 to-orange-700 text-white py-4 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                        >
                          <Briefcase size={20} />
                          Kelola Lowongan
                        </button>
                        <button
                          onClick={() => setActiveTab('applications')}
                          className="w-full bg-gradient-to-r from-orange-600 to-orange-700 text-white py-4 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                        >
                          <FileText size={20} />
                          Review Lamaran
                        </button>
                        <button
                          onClick={() => setActiveTab('users')}
                          className="w-full bg-gradient-to-r from-orange-600 to-orange-700 text-white py-4 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                        >
                          <Users size={20} />
                          Lihat Pengguna
                        </button>
                      </div>
                    </div>

                    {/* Stats Summary */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl lg:rounded-2xl border border-gray-200 p-6 shadow-sm mt-4">
                      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        Ringkasan
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Total Lamaran</span>
                          <span className="font-bold text-gray-900">{stats.totalApplications}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Menunggu</span>
                          <span className="font-bold text-gray-900">{stats.pendingApplications}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Diterima</span>
                          <span className="font-bold text-green-600">{stats.acceptedApplications}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Jobs Tab */}
            {activeTab === 'jobs' && (
              <div className="space-y-6 px-4 lg:px-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-1">Lowongan Pekerjaan</h2>
                    <p className="text-gray-600">Kelola semua lowongan pekerjaan</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('add-job')}
                    className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    <Plus size={20} />
                    Tambah Lowongan
                  </button>
                </div>

                {/* Filter Section */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {/* Search */}
                  <div className="flex-1 min-w-[150px]">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="text"
                        value={jobSearchQuery}
                        onChange={(e) => setJobSearchQuery(e.target.value)}
                        placeholder="Cari..."
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm"
                      />
                    </div>
                  </div>
                  
                  {/* Filter by Status */}
                  <select
                    value={jobFilterStatus}
                    onChange={(e) => setJobFilterStatus(e.target.value)}
                    className="px-2.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-xs sm:text-sm bg-white"
                  >
                    <option value="all">Status</option>
                    <option value="active">Aktif</option>
                    <option value="closed">Ditutup</option>
                  </select>

                  {/* Filter by Department */}
                  <select
                    value={jobFilterDepartment}
                    onChange={(e) => setJobFilterDepartment(e.target.value)}
                    className="px-2.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-xs sm:text-sm bg-white"
                  >
                    <option value="all">Dept</option>
                    <option value="produksi">Produksi</option>
                    <option value="sales">Sales</option>
                    <option value="keuangan">Keuangan</option>
                    <option value="hr">HR</option>
                    <option value="it">IT</option>
                    <option value="quality control">QC</option>
                  </select>

                  {/* Filter by Type */}
                  <select
                    value={jobFilterType}
                    onChange={(e) => setJobFilterType(e.target.value)}
                    className="px-2.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-xs sm:text-sm bg-white"
                  >
                    <option value="all">Tipe</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>

                  {/* Clear Filters */}
                  <button
                    onClick={() => {
                      setJobSearchQuery('');
                      setJobFilterStatus('all');
                      setJobFilterDepartment('all');
                      setJobFilterType('all');
                    }}
                    className="px-3 py-2 text-xs sm:text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1.5"
                  >
                    <X size={14} />
                    <span className="hidden sm:inline">Reset</span>
                  </button>
                </div>
                
                {/* Results Count */}
                <div className="mb-4">
                  <p className="text-xs sm:text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">{getFilteredJobs().length}</span> dari <span className="font-semibold text-gray-900">{jobPostings.length}</span> lowongan
                  </p>
                </div>

                <div className="space-y-4">
                  {getFilteredJobs().length === 0 ? (
                    <div className="bg-white border border-gray-200 rounded-lg lg:rounded-xl p-12 text-center">
                      <Briefcase className="mx-auto text-gray-400 mb-4" size={48} />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak Ada Lowongan Ditemukan</h3>
                      <p className="text-gray-600 mb-4">Tidak ada lowongan yang sesuai dengan filter yang dipilih.</p>
                      <button
                        onClick={() => {
                          setJobSearchQuery('');
                          setJobFilterStatus('all');
                          setJobFilterDepartment('all');
                          setJobFilterType('all');
                        }}
                        className="px-4 py-2 text-sm text-amber-600 border border-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
                      >
                        Reset Filter
                      </button>
                    </div>
                  ) : (
                    getFilteredJobs().map((job) => (
                    <div key={job.id} className="bg-white border border-gray-200 rounded-lg lg:rounded-xl p-6 hover:border-amber-300 transition-colors shadow-sm relative">
                      {deletingJobId === job.id && (
                        <div className="absolute inset-0 bg-white/90 rounded-lg lg:rounded-xl flex items-center justify-center z-10">
                          <div className="flex items-center gap-2 text-red-600">
                            <Loader2 className="animate-spin" size={24} />
                            <span className="font-semibold text-lg">Menghapus...</span>
                          </div>
                        </div>
                      )}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              job.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {job.status === 'active' ? '✓ Aktif' : '✕ Ditutup'}
                            </span>
                          </div>
                          <p className="text-gray-600">{job.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                        <span className="flex items-center gap-2">
                          <MapPin size={16} className="text-amber-600" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-2">
                          <Users size={16} className="text-amber-600" />
                          {job.applicantsCount} Pelamar
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-4">{job.description}</p>
                      <div className="flex gap-3 pt-4 border-t border-gray-200">
                        <button
                          onClick={() => {
                            setSelectedJob(job);
                            setActiveTab('edit-job');
                          }}
                          className="flex-1 sm:flex-none px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                        >
                          <Edit size={18} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteJob(job.id)}
                          disabled={deletingJobId === job.id}
                          className="flex-1 sm:flex-none px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          <Trash2 size={18} />
                          Hapus
                        </button>
                      </div>
                    </div>
                  )))}
                </div>
              </div>
            )}

            {/* Edit Job Page */}
            {activeTab === 'edit-job' && selectedJob && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-1">Edit Lowongan</h2>
                  <p className="text-gray-600">Perbarui informasi lowongan pekerjaan</p>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Judul Posisi</label>
                      <input
                        type="text"
                        value={selectedJob.title}
                        onChange={(e) => setSelectedJob({ ...selectedJob, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Departemen</label>
                        <input
                          type="text"
                          value={selectedJob.department}
                          onChange={(e) => setSelectedJob({ ...selectedJob, department: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
                        <input
                          type="text"
                          value={selectedJob.location}
                          onChange={(e) => setSelectedJob({ ...selectedJob, location: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Pekerjaan</label>
                      <textarea
                        value={selectedJob.description}
                        onChange={(e) => setSelectedJob({ ...selectedJob, description: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none text-sm"
                        placeholder="Jelaskan deskripsi pekerjaan secara umum..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tanggung Jawab</label>
                      <textarea
                        value={selectedJob.responsibilities?.join('\n') || ''}
                        onChange={(e) => setSelectedJob({ ...selectedJob, responsibilities: e.target.value.split('\n').filter(r => r.trim()) })}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none text-sm"
                        placeholder="Masukkan setiap tanggung jawab di baris baru&#10;Contoh:&#10;Mengawasi proses produksi harian&#10;Memastikan kualitas produk sesuai standar&#10;Mengelola tim produksi"
                      />
                      <p className="text-xs text-gray-500 mt-1">Pisahkan setiap tanggung jawab dengan enter/baris baru</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Kualifikasi yang Dibutuhkan</label>
                      <textarea
                        value={selectedJob.requirements?.join('\n') || ''}
                        onChange={(e) => setSelectedJob({ ...selectedJob, requirements: e.target.value.split('\n').filter(r => r.trim()) })}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none text-sm"
                        placeholder="Masukkan setiap kualifikasi di baris baru&#10;Contoh:&#10;Minimal S1 Teknik Industri&#10;Pengalaman 3-5 tahun&#10;Mampu memimpin tim"
                      />
                      <p className="text-xs text-gray-500 mt-1">Pisahkan setiap kualifikasi dengan enter/baris baru</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Pekerjaan</label>
                        <select
                          value={selectedJob.type}
                          onChange={(e) => setSelectedJob({ ...selectedJob, type: e.target.value as any })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm bg-white"
                        >
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Contract">Contract</option>
                          <option value="Internship">Internship</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                        <input
                          type="date"
                          value={selectedJob.deadline}
                          onChange={(e) => setSelectedJob({ ...selectedJob, deadline: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm"
                        />
                      </div>
                    </div>

                    {/* Status Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Status</label>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <label className="flex items-center gap-3 px-4 py-3 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 flex-1"
                          style={{
                            borderColor: selectedJob.status === 'active' ? '#f59e0b' : '#e5e7eb',
                            backgroundColor: selectedJob.status === 'active' ? '#fffbeb' : 'white'
                          }}
                        >
                          <input
                            type="radio"
                            name="editJobStatus"
                            value="active"
                            checked={selectedJob.status === 'active'}
                            onChange={(e) => setSelectedJob({ ...selectedJob, status: e.target.value as any })}
                            className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                          />
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900">Aktif</div>
                            <div className="text-xs text-gray-600">Lowongan dapat dilihat pelamar</div>
                          </div>
                        </label>
                        
                        <label className="flex items-center gap-3 px-4 py-3 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 flex-1"
                          style={{
                            borderColor: selectedJob.status === 'closed' ? '#ef4444' : '#e5e7eb',
                            backgroundColor: selectedJob.status === 'closed' ? '#fef2f2' : 'white'
                          }}
                        >
                          <input
                            type="radio"
                            name="editJobStatus"
                            value="closed"
                            checked={selectedJob.status === 'closed'}
                            onChange={(e) => setSelectedJob({ ...selectedJob, status: e.target.value as any })}
                            className="w-4 h-4 text-red-600 focus:ring-red-500"
                          />
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900">Ditutup</div>
                            <div className="text-xs text-gray-600">Lowongan tidak tampil di publik</div>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() => {
                          setActiveTab('jobs');
                          setSelectedJob(null);
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handleEditJob}
                        className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium"
                      >
                        Simpan Perubahan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Applications Tab */}
            {activeTab === 'applications' && (
              <div className="space-y-6 px-4 lg:px-0">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-1">Lamaran</h2>
                  <p className="text-gray-600">Tinjau dan kelola semua lamaran</p>
                </div>

                {/* Filter Section */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {/* Search */}
                  <div className="flex-1 min-w-[150px]">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="text"
                        value={applicationSearchQuery}
                        onChange={(e) => setApplicationSearchQuery(e.target.value)}
                        placeholder="Cari..."
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm"
                      />
                    </div>
                  </div>

                  {/* Filter by Status */}
                  <select
                    value={applicationFilterStatus}
                    onChange={(e) => setApplicationFilterStatus(e.target.value)}
                    className="px-2.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-xs sm:text-sm bg-white"
                  >
                    <option value="all">Status</option>
                    <option value="pending">Menunggu</option>
                    <option value="reviewed">Ditinjau</option>
                    <option value="interview">Interview</option>
                    <option value="accepted">Diterima</option>
                    <option value="rejected">Ditolak</option>
                  </select>

                  {/* Filter by Job */}
                  <select
                    value={applicationFilterJob}
                    onChange={(e) => setApplicationFilterJob(e.target.value)}
                    className="px-2.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-xs sm:text-sm bg-white max-w-[120px] sm:max-w-none"
                  >
                    <option value="all">Posisi</option>
                    {Array.from(new Set(applications.map(app => app.jobTitle))).map(jobTitle => (
                      <option key={jobTitle} value={jobTitle}>{jobTitle}</option>
                    ))}
                  </select>

                  {/* Clear Filters */}
                  <button
                    onClick={() => {
                      setApplicationSearchQuery('');
                      setApplicationFilterStatus('all');
                      setApplicationFilterJob('all');
                    }}
                    className="px-3 py-2 text-xs sm:text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1.5"
                  >
                    <X size={14} />
                    <span className="hidden sm:inline">Reset</span>
                  </button>
                </div>
                
                {/* Results Count with Status Breakdown */}
                <div className="mb-4 flex flex-wrap items-center gap-3 sm:gap-4">
                  <p className="text-xs sm:text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">{getFilteredApplications().length}</span> dari <span className="font-semibold text-gray-900">{applications.length}</span> lamaran
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 text-xs">
                    <span className="px-2 py-0.5 sm:py-1 bg-yellow-100 text-yellow-800 rounded-full font-medium">
                      {applications.filter(a => a.status === 'pending').length}
                    </span>
                    <span className="px-2 py-0.5 sm:py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                      {applications.filter(a => a.status === 'reviewed').length}
                    </span>
                    <span className="px-2 py-0.5 sm:py-1 bg-purple-100 text-purple-800 rounded-full font-medium">
                      {applications.filter(a => a.status === 'interview').length}
                    </span>
                    <span className="px-2 py-0.5 sm:py-1 bg-green-100 text-green-800 rounded-full font-medium">
                      {applications.filter(a => a.status === 'accepted').length}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {getFilteredApplications().length === 0 ? (
                    <div className="bg-white border border-gray-200 rounded-lg lg:rounded-xl p-12 text-center">
                      <FileText className="mx-auto text-gray-400 mb-4" size={48} />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak Ada Lamaran Ditemukan</h3>
                      <p className="text-gray-600 mb-4">Tidak ada lamaran yang sesuai dengan filter yang dipilih.</p>
                      <button
                        onClick={() => {
                          setApplicationSearchQuery('');
                          setApplicationFilterStatus('all');
                          setApplicationFilterJob('all');
                        }}
                        className="px-4 py-2 text-sm text-amber-600 border border-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
                      >
                        Reset Filter
                      </button>
                    </div>
                  ) : (
                    getFilteredApplications().map((app) => (
                    <div key={app.id} className="bg-white border border-gray-200 rounded-lg lg:rounded-xl p-6 hover:border-amber-300 transition-colors shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-gray-900 mb-1 break-words">{app.applicantName}</h3>
                          <p className="text-gray-600 break-words">{app.applicantEmail}</p>
                        </div>
                        <div className="flex-shrink-0">
                          {getStatusBadge(app.status)}
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                        <span className="flex items-center gap-2">
                          <Briefcase size={16} className="text-amber-600" />
                          {app.jobTitle}
                        </span>
                        <span className="flex items-center gap-2">
                          <Clock size={16} className="text-amber-600" />
                          {app.appliedDate}
                        </span>
                      </div>
                      <div className="pt-4 border-t border-gray-200">
                        <button
                          onClick={() => {
                            setSelectedApplication(app);
                            setActiveTab('application-detail');
                          }}
                          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                        >
                          <FileText size={18} />
                          Lihat Detail
                        </button>
                      </div>
                    </div>
                  )))}
                </div>
              </div>
            )}

            {/* Application Detail Page */}
            {activeTab === 'application-detail' && selectedApplication && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      setActiveTab('applications');
                      setSelectedApplication(null);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-1">Detail Lamaran</h2>
                    <p className="text-gray-600">Informasi lengkap pelamar</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column - Applicant Info */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Personal Information */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Informasi Pribadi</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="bg-amber-100 p-2 rounded-lg">
                            <User className="text-amber-600" size={18} />
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Nama Lengkap</p>
                            <p className="font-medium text-gray-900">{selectedApplication.applicantName}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <Mail className="text-blue-600" size={18} />
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Email</p>
                            <p className="font-medium text-gray-900">{selectedApplication.applicantEmail}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="bg-green-100 p-2 rounded-lg">
                            <Phone className="text-green-600" size={18} />
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Telepon</p>
                            <p className="font-medium text-gray-900">{selectedApplication.applicantPhone}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="bg-purple-100 p-2 rounded-lg">
                            <MapPin className="text-purple-600" size={18} />
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Alamat</p>
                            <p className="font-medium text-gray-900">{selectedApplication.address}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Education & Experience */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Pendidikan & Pengalaman</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="bg-indigo-100 p-2 rounded-lg">
                            <GraduationCap className="text-indigo-600" size={18} />
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 mb-1">Pendidikan</p>
                            <p className="font-medium text-gray-900">{selectedApplication.education}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="bg-orange-100 p-2 rounded-lg">
                            <Award className="text-orange-600" size={18} />
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 mb-1">Pengalaman</p>
                            <p className="font-medium text-gray-900">{selectedApplication.experience}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cover Letter */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <h3 className="font-semibold text-gray-900 mb-3">Cover Letter</h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {selectedApplication.coverLetter}
                      </p>
                    </div>

                    {/* Resume/CV */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <h3 className="font-semibold text-gray-900 mb-3">Dokumen</h3>
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <FileText className="text-amber-600 flex-shrink-0" size={24} />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{selectedApplication.resume}</p>
                          <p className="text-xs text-gray-600">Resume/CV</p>
                        </div>
                        <button 
                          onClick={() => handleDownloadResume(selectedApplication.resume)}
                          className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm flex-shrink-0"
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Actions */}
                  <div className="space-y-6">
                    {/* Job Info */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <h3 className="font-semibold text-gray-900 mb-3">Informasi Lamaran</h3>
                      <div className="space-y-3 text-sm">
                        <div>
                          <p className="text-gray-600 mb-1">Posisi</p>
                          <p className="font-semibold text-gray-900">{selectedApplication.jobTitle}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1">Tanggal Melamar</p>
                          <p className="text-gray-900">{selectedApplication.appliedDate}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1">Status Saat Ini</p>
                          {getStatusBadge(selectedApplication.status)}
                        </div>
                      </div>
                    </div>

                    {/* Status Actions */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Update Status</h3>
                      <div className="space-y-2">
                        <button
                          onClick={() => handleUpdateApplicationStatus(selectedApplication.id, 'reviewed')}
                          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                        >
                          {clickedStatusButton[selectedApplication.id] === 'reviewed' && (
                            <CheckCircle size={18} className="animate-in zoom-in" />
                          )}
                          Tandai Ditinjau
                        </button>
                        <button
                          onClick={() => handleUpdateApplicationStatus(selectedApplication.id, 'interview')}
                          className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                        >
                          {clickedStatusButton[selectedApplication.id] === 'interview' && (
                            <CheckCircle size={18} className="animate-in zoom-in" />
                          )}
                          Undang Interview
                        </button>
                        <button
                          onClick={() => handleUpdateApplicationStatus(selectedApplication.id, 'accepted')}
                          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                        >
                          {clickedStatusButton[selectedApplication.id] === 'accepted' && (
                            <CheckCircle size={18} className="animate-in zoom-in" />
                          )}
                          Terima Pelamar
                        </button>
                        <button
                          onClick={() => handleUpdateApplicationStatus(selectedApplication.id, 'rejected')}
                          className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                        >
                          {clickedStatusButton[selectedApplication.id] === 'rejected' && (
                            <CheckCircle size={18} className="animate-in zoom-in" />
                          )}
                          Tolak Pelamar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="space-y-6 px-4 lg:px-0">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-1">Pengguna</h2>
                  <p className="text-gray-600">Lihat semua pengguna terdaftar</p>
                </div>

                {/* Filter Section */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {/* Search */}
                  <div className="flex-1 min-w-[150px]">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="text"
                        value={userSearchQuery}
                        onChange={(e) => setUserSearchQuery(e.target.value)}
                        placeholder="Cari..."
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm"
                      />
                    </div>
                  </div>

                  {/* Filter by Status */}
                  <select
                    value={userFilterStatus}
                    onChange={(e) => setUserFilterStatus(e.target.value)}
                    className="px-2.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-xs sm:text-sm bg-white"
                  >
                    <option value="all">Status</option>
                    <option value="active">Aktif</option>
                    <option value="inactive">Tidak Aktif</option>
                  </select>

                  {/* Clear Filters */}
                  <button
                    onClick={() => {
                      setUserSearchQuery('');
                      setUserFilterStatus('all');
                    }}
                    className="px-3 py-2 text-xs sm:text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1.5"
                  >
                    <X size={14} />
                    <span className="hidden sm:inline">Reset</span>
                  </button>
                </div>
                
                {/* Results Count with Status Breakdown */}
                <div className="mb-4 flex flex-wrap items-center gap-3 sm:gap-4">
                  <p className="text-xs sm:text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">{getFilteredUsers().length}</span> dari <span className="font-semibold text-gray-900">{registeredUsers.length}</span> pengguna
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 text-xs">
                    <span className="px-2 py-0.5 sm:py-1 bg-green-100 text-green-800 rounded-full font-medium">
                      {registeredUsers.filter(u => u.status === 'active').length} Aktif
                    </span>
                    <span className="px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-800 rounded-full font-medium">
                      {registeredUsers.filter(u => u.status === 'inactive').length} Tidak Aktif
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {getFilteredUsers().length === 0 ? (
                    <div className="bg-white border border-gray-200 rounded-lg lg:rounded-xl p-12 text-center">
                      <Users className="mx-auto text-gray-400 mb-4" size={48} />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak Ada Pengguna Ditemukan</h3>
                      <p className="text-gray-600 mb-4">Tidak ada pengguna yang sesuai dengan filter yang dipilih.</p>
                      <button
                        onClick={() => {
                          setUserSearchQuery('');
                          setUserFilterStatus('all');
                        }}
                        className="px-4 py-2 text-sm text-amber-600 border border-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
                      >
                        Reset Filter
                      </button>
                    </div>
                  ) : (
                    getFilteredUsers().map((user) => (
                    <div key={user.id} className="bg-white border border-gray-200 rounded-lg lg:rounded-xl p-6 hover:border-amber-300 transition-colors shadow-sm">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h3>
                          <p className="text-gray-600">{user.email}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.status === 'active' ? '✓ Aktif' : '✕ Tidak Aktif'}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone size={16} className="text-amber-600" />
                          <span>{user.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock size={16} className="text-amber-600" />
                          <span>Terdaftar: {user.registeredDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <FileText size={16} className="text-amber-600" />
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                            {user.applicationsCount} Lamaran
                          </span>
                        </div>
                      </div>
                    </div>
                  )))}
                </div>
              </div>
            )}

            {/* Team Tab */}
            {activeTab === 'team' && (
              <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-1">Team SJT</h2>
                    <p className="text-gray-600">Kelola data karyawan PT Santoso Jaya Tembakau</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('add-team')}
                    className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    <Plus size={20} />
                    Tambah Karyawan
                  </button>
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

                          {/* Actions */}
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setSelectedEmployee(employee);
                                setActiveTab('team-detail');
                              }}
                              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold flex items-center justify-center gap-2"
                            >
                              <Eye size={16} />
                              Detail
                            </button>
                            <button
                              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <Edit size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Empty State */}
                {employees.filter(emp => {
                  const matchSearch = teamSearchQuery === '' || 
                    emp.name.toLowerCase().includes(teamSearchQuery.toLowerCase()) ||
                    emp.email.toLowerCase().includes(teamSearchQuery.toLowerCase()) ||
                    emp.position.toLowerCase().includes(teamSearchQuery.toLowerCase());
                  const matchDept = teamFilterDepartment === 'all' || emp.department === teamFilterDepartment;
                  const matchStatus = teamFilterStatus === 'all' || emp.status === teamFilterStatus;
                  return matchSearch && matchDept && matchStatus;
                }).length === 0 && (
                  <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
                    <UserCircle className="mx-auto text-gray-400 mb-4" size={48} />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak Ada Karyawan Ditemukan</h3>
                    <p className="text-gray-600 mb-4">Tidak ada karyawan yang sesuai dengan filter yang dipilih.</p>
                    <button
                      onClick={() => {
                        setTeamSearchQuery('');
                        setTeamFilterDepartment('all');
                        setTeamFilterStatus('all');
                      }}
                      className="px-4 py-2 text-sm text-amber-600 border border-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
                    >
                      Reset Filter
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Team Detail Page */}
            {activeTab === 'team-detail' && selectedEmployee && (
              <div className="space-y-6">
                {/* Header with Back Button */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setActiveTab('team')}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-1">Detail Karyawan</h2>
                    <p className="text-gray-600">Informasi lengkap karyawan</p>
                  </div>
                </div>

                {/* Profile Card */}
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
                          <BriefcaseIcon className="text-amber-600 mt-0.5 flex-shrink-0" size={18} />
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
                    <div className="mt-8 pt-6 border-t border-gray-200 flex gap-3">
                      <button
                        onClick={() => setActiveTab('team')}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                      >
                        Kembali
                      </button>
                      <button 
                        onClick={() => {
                          setNewEmployee(selectedEmployee);
                          setActiveTab('edit-team');
                        }}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2"
                      >
                        <Edit size={18} />
                        Edit Profil
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Edit Team Page */}
            {activeTab === 'edit-team' && newEmployee && (
              <div className="space-y-6">
                {/* Header with Back Button */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setActiveTab('team-detail')}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-1">Edit Profil Karyawan</h2>
                    <p className="text-gray-600">Perubahan memerlukan persetujuan dari karyawan</p>
                  </div>
                </div>

                {/* Edit Form */}
                <div className="bg-white rounded-xl border border-gray-200 p-8">
                  <div className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4 text-lg">Informasi Pribadi</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                          <input
                            type="text"
                            value={newEmployee.name}
                            onChange={(e) => setNewEmployee(prev => ({...prev, name: e.target.value}))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <input
                            type="email"
                            value={newEmployee.email}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Telepon</label>
                          <input
                            type="tel"
                            value={newEmployee.phone}
                            onChange={(e) => setNewEmployee(prev => ({...prev, phone: e.target.value}))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                          <select
                            value={newEmployee.status}
                            onChange={(e) => setNewEmployee(prev => ({...prev, status: e.target.value as 'active' | 'inactive'}))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                          >
                            <option value="active">Aktif</option>
                            <option value="inactive">Tidak Aktif</option>
                          </select>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                          <textarea
                            value={newEmployee.address}
                            onChange={(e) => setNewEmployee(prev => ({...prev, address: e.target.value}))}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Employment Information */}
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-4 text-lg">Informasi Pekerjaan</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Posisi</label>
                          <input
                            type="text"
                            value={newEmployee.position}
                            onChange={(e) => setNewEmployee(prev => ({...prev, position: e.target.value}))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Departemen</label>
                          <select
                            value={newEmployee.department}
                            onChange={(e) => setNewEmployee(prev => ({...prev, department: e.target.value}))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                          >
                            <option value="">Pilih Departemen</option>
                            <option value="IT & Design">IT & Design</option>
                            <option value="Produksi">Produksi</option>
                            <option value="Sales & Marketing">Sales & Marketing</option>
                            <option value="Human Resources">Human Resources</option>
                            <option value="Finance">Finance</option>
                            <option value="Quality Assurance">Quality Assurance</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Bergabung</label>
                          <input
                            type="date"
                            value={newEmployee.joinDate}
                            onChange={(e) => setNewEmployee(prev => ({...prev, joinDate: e.target.value}))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Education */}
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-4 text-lg">Pendidikan</h3>
                      <textarea
                        value={newEmployee.education}
                        onChange={(e) => setNewEmployee(prev => ({...prev, education: e.target.value}))}
                        rows={2}
                        placeholder="Contoh: S1 Desain Komunikasi Visual - Institut Seni Indonesia (2019-2023)"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                      />
                    </div>

                    {/* Job Description */}
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-4 text-lg">Deskripsi Pekerjaan</h3>
                      <textarea
                        value={newEmployee.jobDescription}
                        onChange={(e) => setNewEmployee(prev => ({...prev, jobDescription: e.target.value}))}
                        rows={3}
                        placeholder="Jelaskan peran dan tanggung jawab utama..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                      />
                    </div>

                    {/* Warning Message */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
                      <AlertTriangle className="text-amber-600 flex-shrink-0" size={20} />
                      <div>
                        <p className="font-semibold text-amber-900 mb-1">Perubahan Memerlukan Persetujuan</p>
                        <p className="text-sm text-amber-700">
                          Setelah Anda submit perubahan ini, notifikasi akan dikirim ke{' '}
                          <span className="font-semibold">{newEmployee.name}</span> ({newEmployee.email}). 
                          Perubahan hanya akan diterapkan setelah karyawan menyetujui perubahan tersebut.
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() => setActiveTab('team-detail')}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                      >
                        Batal
                      </button>
                      <button
                        onClick={() => {
                          // Create pending change request
                          const pendingChange: PendingProfileChange = {
                            id: Date.now().toString(),
                            employeeId: newEmployee.id!,
                            employeeEmail: newEmployee.email!,
                            employeeName: newEmployee.name!,
                            changes: newEmployee,
                            requestedBy: 'HR Admin',
                            requestDate: new Date().toISOString(),
                            status: 'pending'
                          };
                          
                          setPendingChanges(prev => [...prev, pendingChange]);
                          
                          // Show success message
                          alert(`✅ Permintaan perubahan telah dikirim ke ${newEmployee.name}!\n\nKaryawan akan menerima notifikasi untuk menyetujui atau menolak perubahan ini.`);
                          
                          setActiveTab('team-detail');
                        }}
                        className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold flex items-center gap-2"
                      >
                        <Send size={18} />
                        Kirim Permintaan Perubahan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6 px-4 lg:px-0">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-1">Profil Saya</h2>
                  <p className="text-gray-600">Kelola informasi profil dan keamanan akun Anda</p>
                </div>

                {/* Profile Content - Full Width */}
                <div className="space-y-6">
                  {/* Profile Photo */}
                  <div className="bg-white rounded-lg lg:rounded-xl border border-gray-200 p-6 shadow-sm">
                      <h3 className="font-semibold text-gray-900 mb-4">Foto Profil</h3>
                      <div className="flex items-center gap-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {profileImage ? (
                            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            <User className="text-white" size={40} />
                          )}
                        </div>
                        <div>
                          <input
                            type="file"
                            id="profileImage"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                          <label
                            htmlFor="profileImage"
                            className="inline-block px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                          >
                            Ubah Foto
                          </label>
                          <p className="text-xs text-gray-600 mt-2">JPG, PNG maksimal 5MB</p>
                        </div>
                      </div>
                    </div>

                    {/* Personal Information */}
                    <div className="bg-white rounded-lg lg:rounded-xl border border-gray-200 p-6 shadow-sm">
                      <h3 className="font-semibold text-gray-900 mb-4">Informasi Pribadi</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                          <input
                            type="text"
                            value={hrProfile.name}
                            onChange={(e) => setHrProfile({ ...hrProfile, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <input
                            type="email"
                            value={hrProfile.email}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Telepon</label>
                          <input
                            type="tel"
                            value={hrProfile.phone}
                            onChange={(e) => setHrProfile({ ...hrProfile, phone: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Departemen</label>
                          <input
                            type="text"
                            value={hrProfile.department}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Posisi</label>
                          <input
                            type="text"
                            value={hrProfile.position}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 text-sm"
                          />
                        </div>
                      </div>
                    </div>

                  {/* 2FA Security - Full Width with Embedded Setup */}
                  <div className="bg-white border border-gray-200 rounded-lg lg:rounded-xl p-6 shadow-sm relative">
                    {/* Success message removed - no animation overlay */}
                    
                    {/* Header with Toggle */}
                    <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${is2FAEnabled ? 'bg-green-100' : 'bg-gray-100'}`}>
                          <Shield className={`${is2FAEnabled ? 'text-green-600' : 'text-gray-400'}`} size={24} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-gray-800">Autentikasi Dua Faktor (2FA)</h4>
                            {is2FAEnabled && (
                              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
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
                      <div className="mt-6 space-y-6">
                        {/* QR Code Section or Manual Setup */}
                        {showQRCode ? (
                          <div className="space-y-4">
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
                              <div className="bg-white p-5 rounded-lg border-2 border-amber-300 shadow-lg">
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
                          <div className="space-y-4">
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
                                      <Check size={18} className="text-green-600" />
                                      <span className="text-sm font-semibold">Tersalin!</span>
                                    </>
                                  ) : (
                                    <Copy size={18} className="text-gray-600" />
                                  )}
                                </button>
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
                              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                <CheckCircle className="text-green-600" size={24} />
                              </div>
                            )}
                          </div>
                          <button
                            onClick={handleVerify2FA}
                            disabled={verificationCode.length !== 6 || isVerifying2FA || show2FASuccess}
                            className={`
                              mt-4 w-full px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2
                              ${verificationCode.length === 6 && !isVerifying2FA && !show2FASuccess
                                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:shadow-lg'
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
                          
                          {/* Verification Process Indicator - removed */}
                        </div>

                        {/* Backup Codes */}
                        {backupCodes.length > 0 && verificationCode.length === 6 && !isVerifying2FA && !show2FASuccess && (
                          <div className="pt-4 border-t border-gray-200">
                            <div className="flex items-start gap-3 mb-4">
                              <AlertTriangle className="text-amber-600 flex-shrink-0 mt-1" size={20} />
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
                                  : 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:shadow-lg'
                                }
                              `}
                            >
                              {copiedBackupCodes ? (
                                <>
                                  <Check size={18} />
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

                  {/* Save Button - Positioned Below 2FA Section */}
                  <div className="mt-6">
                    <button
                      onClick={handleSaveProfile}
                      disabled={isSaving}
                      className="w-full bg-gradient-to-r from-orange-600 to-orange-700 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50"
                    >
                      {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Add Job Page */}
            {activeTab === 'add-job' && (
              <div className="space-y-6">
                {/* Header with Back Button */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setActiveTab('jobs')}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-1">Tambah Lowongan Baru</h2>
                    <p className="text-gray-600">Buat lowongan pekerjaan baru</p>
                  </div>
                </div>

                {/* Form */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 lg:p-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Judul Posisi *</label>
                      <input
                        type="text"
                        value={newJob.title}
                        onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                        placeholder="e.g. Supervisor Produksi"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Departemen</label>
                        <input
                          type="text"
                          value={newJob.department}
                          onChange={(e) => setNewJob({ ...newJob, department: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                          placeholder="e.g. Produksi"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Lokasi</label>
                        <input
                          type="text"
                          value={newJob.location}
                          onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                          placeholder="e.g. Kudus, Jawa Tengah"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi Pekerjaan</label>
                      <textarea
                        value={newJob.description}
                        onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none"
                        placeholder="Jelaskan deskripsi pekerjaan secara umum..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tanggung Jawab</label>
                      <textarea
                        value={newJob.responsibilities?.join('\n') || ''}
                        onChange={(e) => setNewJob({ ...newJob, responsibilities: e.target.value.split('\n').filter(r => r.trim()) })}
                        rows={5}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none"
                        placeholder="Masukkan setiap tanggung jawab di baris baru&#10;Contoh:&#10;Mengawasi proses produksi harian&#10;Memastikan kualitas produk sesuai standar&#10;Mengelola tim produksi"
                      />
                      <p className="text-xs text-gray-500 mt-2">💡 Pisahkan setiap tanggung jawab dengan enter/baris baru</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Kualifikasi yang Dibutuhkan</label>
                      <textarea
                        value={newJob.requirements?.join('\n') || ''}
                        onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value.split('\n').filter(r => r.trim()) })}
                        rows={5}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none"
                        placeholder="Masukkan setiap kualifikasi di baris baru&#10;Contoh:&#10;Minimal S1 Teknik Industri&#10;Pengalaman 3-5 tahun&#10;Mampu memimpin tim"
                      />
                      <p className="text-xs text-gray-500 mt-2">💡 Pisahkan setiap kualifikasi dengan enter/baris baru</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tipe Pekerjaan</label>
                        <select
                          value={newJob.type}
                          onChange={(e) => setNewJob({ ...newJob, type: e.target.value as any })}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none bg-white"
                        >
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Contract">Contract</option>
                          <option value="Internship">Internship</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
                        <input
                          type="date"
                          value={newJob.deadline}
                          onChange={(e) => setNewJob({ ...newJob, deadline: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>

                    {/* Status Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Status</label>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <label className="flex items-center gap-3 px-4 py-3 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 flex-1"
                          style={{
                            borderColor: newJob.status === 'active' ? '#f59e0b' : '#e5e7eb',
                            backgroundColor: newJob.status === 'active' ? '#fffbeb' : 'white'
                          }}
                        >
                          <input
                            type="radio"
                            name="jobStatus"
                            value="active"
                            checked={newJob.status === 'active'}
                            onChange={(e) => setNewJob({ ...newJob, status: e.target.value as any })}
                            className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                          />
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900">Aktif</div>
                            <div className="text-xs text-gray-600">Lowongan dapat dilihat pelamar</div>
                          </div>
                        </label>
                        
                        <label className="flex items-center gap-3 px-4 py-3 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 flex-1"
                          style={{
                            borderColor: newJob.status === 'closed' ? '#ef4444' : '#e5e7eb',
                            backgroundColor: newJob.status === 'closed' ? '#fef2f2' : 'white'
                          }}
                        >
                          <input
                            type="radio"
                            name="jobStatus"
                            value="closed"
                            checked={newJob.status === 'closed'}
                            onChange={(e) => setNewJob({ ...newJob, status: e.target.value as any })}
                            className="w-4 h-4 text-red-600 focus:ring-red-500"
                          />
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900">Ditutup</div>
                            <div className="text-xs text-gray-600">Lowongan tidak tampil di publik</div>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                      <button
                        onClick={() => setActiveTab('jobs')}
                        className="sm:flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handleAddJob}
                        className="sm:flex-1 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold"
                      >
                        Simpan Lowongan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Add Team/Employee Page */}
            {activeTab === 'add-team' && (
              <div className="space-y-6">
                {/* Header with Back Button */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setActiveTab('team')}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-1">Tambah Karyawan Baru</h2>
                    <p className="text-gray-600">Tambahkan karyawan baru ke dalam sistem</p>
                  </div>
                </div>

                {/* Form */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 lg:p-8">
                  <div className="space-y-6">
                    {/* Personal Information Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <UserCircle size={20} className="text-orange-600" />
                        Informasi Personal
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap *</label>
                          <input
                            type="text"
                            value={newEmployee.name || ''}
                            onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                            placeholder="e.g. Ahmad Hidayat"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                            <input
                              type="email"
                              value={newEmployee.email || ''}
                              onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                              placeholder="e.g. ahmad@santosojayatembakau.com"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">No. Telepon *</label>
                            <input
                              type="tel"
                              value={newEmployee.phone || ''}
                              onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                              placeholder="e.g. 081234567890"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
                          <textarea
                            value={newEmployee.address || ''}
                            onChange={(e) => setNewEmployee({ ...newEmployee, address: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
                            rows={3}
                            placeholder="Alamat lengkap karyawan"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Pendidikan</label>
                          <input
                            type="text"
                            value={newEmployee.education || ''}
                            onChange={(e) => setNewEmployee({ ...newEmployee, education: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                            placeholder="e.g. S1 Teknik Industri - Universitas Diponegoro"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Employment Information Section */}
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <BriefcaseIcon size={20} className="text-orange-600" />
                        Informasi Pekerjaan
                      </h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Posisi/Jabatan</label>
                            <input
                              type="text"
                              value={newEmployee.position || ''}
                              onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                              placeholder="e.g. Supervisor Produksi"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Departemen</label>
                            <select
                              value={newEmployee.department || ''}
                              onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                            >
                              <option value="">Pilih Departemen</option>
                              <option value="Produksi">Produksi</option>
                              <option value="Sales & Marketing">Sales & Marketing</option>
                              <option value="Human Resources">Human Resources</option>
                              <option value="Finance">Finance</option>
                              <option value="Quality Assurance">Quality Assurance</option>
                              <option value="IT & Design">IT & Design</option>
                              <option value="Logistics">Logistics</option>
                              <option value="Administration">Administration</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Bergabung</label>
                            <input
                              type="date"
                              value={newEmployee.joinDate || ''}
                              onChange={(e) => setNewEmployee({ ...newEmployee, joinDate: e.target.value })}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                            <select
                              value={newEmployee.status || 'active'}
                              onChange={(e) => setNewEmployee({ ...newEmployee, status: e.target.value as 'active' | 'inactive' })}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                            >
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi Pekerjaan</label>
                          <textarea
                            value={newEmployee.jobDescription || ''}
                            onChange={(e) => setNewEmployee({ ...newEmployee, jobDescription: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
                            rows={4}
                            placeholder="Deskripsi pekerjaan dan tanggung jawab karyawan"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Skills Section */}
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Award size={20} className="text-orange-600" />
                        Keahlian (Skills)
                      </h3>
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddSkill();
                              }
                            }}
                            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                            placeholder="Tambah keahlian (tekan Enter)"
                          />
                          <button
                            type="button"
                            onClick={handleAddSkill}
                            className="px-4 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                          >
                            <Plus size={20} />
                          </button>
                        </div>
                        {newEmployee.skills && newEmployee.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {newEmployee.skills.map((skill, index) => (
                              <div
                                key={index}
                                className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1.5 rounded-lg text-sm"
                              >
                                <span>{skill}</span>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveSkill(skill)}
                                  className="hover:text-orange-900 transition-colors"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Responsibilities Section */}
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Tanggung Jawab</h3>
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newResponsibility}
                            onChange={(e) => setNewResponsibility(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddResponsibility();
                              }
                            }}
                            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                            placeholder="Tambah tanggung jawab (tekan Enter)"
                          />
                          <button
                            type="button"
                            onClick={handleAddResponsibility}
                            className="px-4 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                          >
                            <Plus size={20} />
                          </button>
                        </div>
                        {newEmployee.responsibilities && newEmployee.responsibilities.length > 0 && (
                          <ul className="space-y-2">
                            {newEmployee.responsibilities.map((resp, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg group hover:bg-gray-100 transition-colors"
                              >
                                <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                                <span className="flex-1 text-sm text-gray-700">{resp}</span>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveResponsibility(resp)}
                                  className="opacity-0 group-hover:opacity-100 text-red-600 hover:text-red-700 transition-all"
                                >
                                  <X size={16} />
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                      <button
                        onClick={() => {
                          setActiveTab('team');
                          setNewEmployee({
                            name: '',
                            email: '',
                            phone: '',
                            position: '',
                            department: '',
                            joinDate: new Date().toISOString().split('T')[0],
                            address: '',
                            education: '',
                            skills: [],
                            jobDescription: '',
                            responsibilities: [],
                            status: 'active'
                          });
                          setNewSkill('');
                          setNewResponsibility('');
                        }}
                        className="sm:flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handleAddEmployee}
                        className="sm:flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold"
                      >
                        Simpan Karyawan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
