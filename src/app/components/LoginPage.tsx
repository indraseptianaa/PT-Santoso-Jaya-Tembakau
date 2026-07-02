import { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, AlertCircle, Shield, X } from 'lucide-react';
import * as OTPAuth from 'otpauth';

// Employee Account Data
type EmployeeAccount = {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  position: string;
  department: string;
  joinDate: string;
  photo: string;
  status: 'active' | 'inactive';
  address: string;
  education: string;
  skills: string[];
  jobDescription: string;
  responsibilities: string[];
  systemRole?: string; // Role untuk sistem yang dikelola
};

// Database akun karyawan
const EMPLOYEE_ACCOUNTS: EmployeeAccount[] = [
  {
    id: '1',
    name: 'Indra Septiana',
    email: 'indra@santosojayatembakau.com',
    password: 'sandi123',
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
    ],
    systemRole: 'Website Manager - Mengelola semua sistem website (landing page, akun, produk, tentang kami, karir, kontak, dll)'
  },
  {
    id: '2',
    name: 'Yohanes',
    email: 'yohanes@santosojayatembakau.com',
    password: 'sandi123',
    phone: '081234567891',
    position: 'TBD',
    department: 'TBD',
    joinDate: '2024-01-15',
    photo: 'https://ui-avatars.com/api/?name=Yohanes&background=3b82f6&color=fff&size=200',
    status: 'active',
    address: 'TBD',
    education: 'TBD',
    skills: [],
    jobDescription: 'TBD - Sistem akan dikonfigurasi sesuai kebutuhan',
    responsibilities: ['TBD - Akan ditentukan kemudian'],
    systemRole: 'TBD - Sistem khusus akan ditambahkan'
  },
  {
    id: '3',
    name: 'Eko',
    email: 'eko@santosojayatembakau.com',
    password: 'sandi123',
    phone: '081234567892',
    position: 'TBD',
    department: 'TBD',
    joinDate: '2024-01-15',
    photo: 'https://ui-avatars.com/api/?name=Eko&background=10b981&color=fff&size=200',
    status: 'active',
    address: 'TBD',
    education: 'TBD',
    skills: [],
    jobDescription: 'TBD - Sistem akan dikonfigurasi sesuai kebutuhan',
    responsibilities: ['TBD - Akan ditentukan kemudian'],
    systemRole: 'TBD - Sistem khusus akan ditambahkan'
  },
  {
    id: '4',
    name: 'Kurniawan',
    email: 'kurniawan@santosojayatembakau.com',
    password: 'sandi123',
    phone: '081234567893',
    position: 'TBD',
    department: 'TBD',
    joinDate: '2024-01-15',
    photo: 'https://ui-avatars.com/api/?name=Kurniawan&background=8b5cf6&color=fff&size=200',
    status: 'active',
    address: 'TBD',
    education: 'TBD',
    skills: [],
    jobDescription: 'TBD - Sistem akan dikonfigurasi sesuai kebutuhan',
    responsibilities: ['TBD - Akan ditentukan kemudian'],
    systemRole: 'TBD - Sistem khusus akan ditambahkan'
  },
  {
    id: '5',
    name: 'Yanto',
    email: 'yanto@santosojayatembakau.com',
    password: 'sandi123',
    phone: '081234567894',
    position: 'TBD',
    department: 'TBD',
    joinDate: '2024-01-15',
    photo: 'https://ui-avatars.com/api/?name=Yanto&background=ef4444&color=fff&size=200',
    status: 'active',
    address: 'TBD',
    education: 'TBD',
    skills: [],
    jobDescription: 'TBD - Sistem akan dikonfigurasi sesuai kebutuhan',
    responsibilities: ['TBD - Akan ditentukan kemudian'],
    systemRole: 'TBD - Sistem khusus akan ditambahkan'
  },
  {
    id: '6',
    name: 'Bayu',
    email: 'bayu@santosojayatembakau.com',
    password: 'sandi123',
    phone: '081234567895',
    position: 'TBD',
    department: 'TBD',
    joinDate: '2024-01-15',
    photo: 'https://ui-avatars.com/api/?name=Bayu&background=f59e0b&color=fff&size=200',
    status: 'active',
    address: 'TBD',
    education: 'TBD',
    skills: [],
    jobDescription: 'TBD - Sistem akan dikonfigurasi sesuai kebutuhan',
    responsibilities: ['TBD - Akan ditentukan kemudian'],
    systemRole: 'TBD - Sistem khusus akan ditambahkan'
  },
  {
    id: '7',
    name: 'Nurdin',
    email: 'nurdin@santosojayatembakau.com',
    password: 'sandi123',
    phone: '081234567896',
    position: 'TBD',
    department: 'TBD',
    joinDate: '2024-01-15',
    photo: 'https://ui-avatars.com/api/?name=Nurdin&background=06b6d4&color=fff&size=200',
    status: 'active',
    address: 'TBD',
    education: 'TBD',
    skills: [],
    jobDescription: 'TBD - Sistem akan dikonfigurasi sesuai kebutuhan',
    responsibilities: ['TBD - Akan ditentukan kemudian'],
    systemRole: 'TBD - Sistem khusus akan ditambahkan'
  },
  {
    id: '8',
    name: 'Nanda',
    email: 'nanda@santosojayatembakau.com',
    password: 'sandi123',
    phone: '081234567897',
    position: 'TBD',
    department: 'TBD',
    joinDate: '2024-01-15',
    photo: 'https://ui-avatars.com/api/?name=Nanda&background=ec4899&color=fff&size=200',
    status: 'active',
    address: 'TBD',
    education: 'TBD',
    skills: [],
    jobDescription: 'TBD - Sistem akan dikonfigurasi sesuai kebutuhan',
    responsibilities: ['TBD - Akan ditentukan kemudian'],
    systemRole: 'TBD - Sistem khusus akan ditambahkan'
  },
  {
    id: '9',
    name: 'Evi',
    email: 'evi@santosojayatembakau.com',
    password: 'sandi123',
    phone: '081234567898',
    position: 'TBD',
    department: 'TBD',
    joinDate: '2024-01-15',
    photo: 'https://ui-avatars.com/api/?name=Evi&background=14b8a6&color=fff&size=200',
    status: 'active',
    address: 'TBD',
    education: 'TBD',
    skills: [],
    jobDescription: 'TBD - Sistem akan dikonfigurasi sesuai kebutuhan',
    responsibilities: ['TBD - Akan ditentukan kemudian'],
    systemRole: 'TBD - Sistem khusus akan ditambahkan'
  },
  {
    id: '10',
    name: 'B2B Partner',
    email: 'bisnis@santosojayatembakau.com',
    password: 'sandi123',
    phone: '081234567899',
    position: 'Business Partner',
    department: 'B2B Sales',
    joinDate: '2024-01-01',
    photo: 'https://ui-avatars.com/api/?name=B2B+Partner&background=f97316&color=fff&size=200',
    status: 'active',
    address: 'Jakarta, Indonesia',
    education: 'Business Management',
    skills: ['B2B Sales', 'Procurement', 'Supply Chain Management'],
    jobDescription: 'Mitra bisnis dengan akses ke platform B2B Marketplace untuk pemesanan produk tembakau dan rokok dalam jumlah besar',
    responsibilities: ['Akses katalog produk B2B', 'Manajemen pesanan', 'Tracking pengiriman', 'Penawaran khusus B2B'],
    systemRole: 'B2B Marketplace User'
  }
];

type LoginPageProps = {
  onLoginSuccess: (profile: { name: string; email: string; phone: string; address: string; education: string; experience: string }) => void;
  onNavigateToSignup: () => void;
  onBack: () => void;
  onHRLoginSuccess: () => void;
  onAdminLoginSuccess: () => void;
  onEmployeeLoginSuccess: (profile: {
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
  }) => void;
  onB2BLoginSuccess?: (email: string) => void;
  context?: 'karir' | 'b2b'; // Context untuk menentukan konten left side
};

export function LoginPage({ onLoginSuccess, onNavigateToSignup, onBack, onHRLoginSuccess, onAdminLoginSuccess, onEmployeeLoginSuccess, onB2BLoginSuccess, context = 'karir' }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  
  // View States - track which view is active
  const [currentView, setCurrentView] = useState<'login' | '2fa' | 'forgot'>('login');
  
  // 2FA States
  const [twoFACode, setTwoFACode] = useState('');
  const [twoFAError, setTwoFAError] = useState('');
  const [isVerifying2FA, setIsVerifying2FA] = useState(false);
  const [pendingLoginData, setPendingLoginData] = useState<{email: string, name: string, phone: string} | null>(null);
  
  // Forgot Password States
  const [forgotStep, setForgotStep] = useState<'email' | '2fa' | 'code' | 'reset'>('email');
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgot2FACode, setForgot2FACode] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [forgotError, setForgotError] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  // Helper function to generate simple TOTP-like code based on time
  const generateTOTPCode = () => {
    const now = Math.floor(Date.now() / 30000); // 30 second window
    const code = ((now % 900000) + 100000).toString(); // 6 digit code
    return code;
  };

  // Validate 2FA code using the same secret from Settings
  const validate2FACode = (inputCode: string, email: string): boolean => {
    try {
      // Get the secret from localStorage (same as Settings)
      let secret = localStorage.getItem(`user_2fa_secret_${email}`);
      
      // If no secret exists, use the FIXED secret key from Settings
      if (!secret) {
        // Use the same hardcoded secret as in KarirDashboard Settings
        secret = 'JBSWY3DPEHPK3PXP';
        localStorage.setItem(`user_2fa_secret_${email}`, secret);
        console.log('Using fixed 2FA secret from Settings:', secret);
      }

      console.log('Validating with secret:', secret);

      // Create TOTP instance with the same settings as Settings
      const totp = new OTPAuth.TOTP({
        issuer: 'Santoso Jaya Tembakau',
        label: email,
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: secret
      });

      // Generate current valid token for debugging
      const currentToken = totp.generate();
      console.log('Current valid token:', currentToken);
      console.log('Input token:', inputCode);
      
      // Also check previous time window for tolerance (±30 seconds)
      const delta = totp.validate({ token: inputCode, window: 1 });
      console.log('Validation delta:', delta);
      
      return delta !== null;
    } catch (error) {
      console.error('2FA validation error:', error);
      return false;
    }
  };

  // Validasi email real-time
  const validateEmail = (emailValue: string) => {
    if (!emailValue.trim()) {
      return 'Email harus diisi!';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      return 'Format email tidak valid!';
    }
    return '';
  };

  // Validasi password real-time
  const validatePassword = (passwordValue: string) => {
    if (!passwordValue) {
      return 'Password harus diisi!';
    }
    return '';
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (emailTouched) {
      setEmailError(validateEmail(value));
    }
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
    setEmailError(validateEmail(email));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (passwordTouched) {
      setPasswordError(validatePassword(value));
    }
  };

  const handlePasswordBlur = () => {
    setPasswordTouched(true);
    setPasswordError(validatePassword(password));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setEmailTouched(true);
    setPasswordTouched(true);

    // Validasi email
    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      return;
    }

    // Validasi password
    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    // Validasi credentials
    const employeeAccount = EMPLOYEE_ACCOUNTS.find(account => account.email === email && account.password === password);
    if (employeeAccount) {
      // Check if B2B account
      if (employeeAccount.email === 'bisnis@santosojayatembakau.com') {
        // B2B Account - Direct to B2B Marketplace (no 2FA for B2B)
        if (onB2BLoginSuccess) {
          onB2BLoginSuccess(email);
        }
      } else {
        // Regular Employee Account
        const user2FAStatus = localStorage.getItem('user_2fa_' + email);
        if (user2FAStatus === 'enabled') {
          // Show 2FA view
          setPendingLoginData({
            email: email,
            name: employeeAccount.name,
            phone: employeeAccount.phone
          });
          setCurrentView('2fa');
        } else {
          // Direct login to Employee Dashboard (including admin)
          onEmployeeLoginSuccess({
            id: employeeAccount.id,
            name: employeeAccount.name,
            email: email,
            phone: employeeAccount.phone,
            position: employeeAccount.position,
            department: employeeAccount.department,
            joinDate: employeeAccount.joinDate,
            photo: employeeAccount.photo,
            status: employeeAccount.status,
            address: employeeAccount.address,
            education: employeeAccount.education,
            skills: employeeAccount.skills,
            jobDescription: employeeAccount.jobDescription,
            responsibilities: employeeAccount.responsibilities
          });
        }
      }
    } else if (email === 'pelamar@santosojayatembakau.com' && password === 'sandi123') {
      // Applicant Account - Pelamar (user yang apply job)
      const user2FAStatus = localStorage.getItem('user_2fa_' + email);
      if (user2FAStatus === 'enabled') {
        // Show 2FA view
        setPendingLoginData({
          email: email,
          name: 'Pelamar Test',
          phone: '+62 812-9999-9999'
        });
        setCurrentView('2fa');
      } else {
        // Direct login to Applicant Dashboard (KarirDashboard)
        onLoginSuccess({
          name: 'Pelamar Test',
          email: email,
          phone: '+62 812-9999-9999',
          address: 'Jl. Raya Kudus, No. 456, Kudus, Jawa Tengah',
          education: 'S1 Teknik Industri, Universitas Diponegoro',
          experience: '2 tahun pengalaman di bidang manufaktur'
        });
      }
    } else if (email === 'hr@santosojayatembakau.com' && password === 'sandi123') {
      // HR Account - Direct login to HR Dashboard (no 2FA for HR)
      onHRLoginSuccess();
    } else {
      setError('Email atau kata sandi salah. Silakan coba lagi.');
    }
  };

  const handleVerify2FA = () => {
    if (twoFACode.length !== 6) {
      setTwoFAError('Kode harus 6 digit!');
      return;
    }

    setIsVerifying2FA(true);
    setTwoFAError('');

    // Validate 2FA code with real TOTP validation
    setTimeout(() => {
      if (!validate2FACode(twoFACode, pendingLoginData?.email || '')) {
        setIsVerifying2FA(false);
        setTwoFAError('Kode verifikasi salah atau sudah kadaluarsa!');
        return;
      }

      setIsVerifying2FA(false);
      if (pendingLoginData) {
        setCurrentView('login');
        setTwoFACode('');
        
        // Check which account type
        const employeeAccount = EMPLOYEE_ACCOUNTS.find(acc => acc.email === pendingLoginData.email);
        if (employeeAccount) {
          // All employees (including admin) go to Employee Dashboard
          onEmployeeLoginSuccess({
            id: employeeAccount.id,
            name: employeeAccount.name,
            email: pendingLoginData.email,
            phone: employeeAccount.phone,
            position: employeeAccount.position,
            department: employeeAccount.department,
            joinDate: employeeAccount.joinDate,
            photo: employeeAccount.photo,
            status: employeeAccount.status,
            address: employeeAccount.address,
            education: employeeAccount.education,
            skills: employeeAccount.skills,
            jobDescription: employeeAccount.jobDescription,
            responsibilities: employeeAccount.responsibilities
          });
        } else {
          // Applicant login
          onLoginSuccess({
            name: pendingLoginData.name,
            email: pendingLoginData.email,
            phone: pendingLoginData.phone,
            address: 'Jl. Raya Kudus, No. 456, Kudus, Jawa Tengah',
            education: 'S1 Teknik Industri, Universitas Diponegoro',
            experience: '2 tahun pengalaman di bidang manufaktur'
          });
        }
      }
    }, 800);
  };

  const handleForgotPassword = () => {
    setCurrentView('forgot');
    setForgotStep('email');
    setForgotEmail('');
    setForgot2FACode('');
    setResetCode('');
    setNewPassword('');
    setConfirmPassword('');
    setForgotError('');
    setResetSuccess(false);
  };

  const handleSendResetCode = () => {
    if (!forgotEmail.trim()) {
      setForgotError('Email harus diisi!');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(forgotEmail)) {
      setForgotError('Format email tidak valid!');
      return;
    }

    // Check if email exists in registered accounts
    const isEmployeeEmail = EMPLOYEE_ACCOUNTS.some(acc => acc.email === forgotEmail);
    if (!isEmployeeEmail && forgotEmail !== 'pelamar@santosojayatembakau.com') {
      setForgotError('Email tidak terdaftar!');
      return;
    }

    // Check if user has 2FA enabled
    const user2FAStatus = localStorage.getItem('user_2fa_' + forgotEmail);
    setForgotError('');
    
    if (user2FAStatus === 'enabled') {
      // If 2FA is enabled, go to 2FA verification first
      setForgotStep('2fa');
    } else {
      // If no 2FA, go straight to code verification
      setForgotStep('code');
    }
  };

  const handleVerifyForgot2FA = () => {
    if (forgot2FACode.length !== 6) {
      setForgotError('Kode harus 6 digit!');
      return;
    }

    // Validate 2FA code
    if (!validate2FACode(forgot2FACode, forgotEmail)) {
      setForgotError('Kode verifikasi salah atau sudah kadaluarsa!');
      return;
    }

    setForgotError('');
    setForgotStep('reset');
  };

  const handleVerifyResetCode = () => {
    if (resetCode.length !== 6) {
      setForgotError('Kode harus 6 digit!');
      return;
    }

    // Mock verify code - accept any 6 digit
    setForgotError('');
    setForgotStep('reset');
  };

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      setForgotError('Semua field harus diisi!');
      return;
    }
    if (newPassword.length < 6) {
      setForgotError('Password minimal 6 karakter!');
      return;
    }
    if (newPassword !== confirmPassword) {
      setForgotError('Password tidak cocok!');
      return;
    }

    // Mock reset password
    setForgotError('');
    setResetSuccess(true);
    setTimeout(() => {
      setCurrentView('login');
      setResetSuccess(false);
      setForgotStep('email');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image Section */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={context === 'b2b' 
              ? "https://images.unsplash.com/photo-1521737711867-e3b97375f902?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhhbmRzaGFrZXxlbnwxfHx8fDE3MzQ1MDAwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080"
              : "https://images.unsplash.com/photo-1762341116197-fb94a4f37173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG9mZmljZSUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjYwNzQzNjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
            }
            alt={context === 'b2b' ? "B2B Business" : "Karir Background"}
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 to-orange-900/30"></div>
        
        {/* Content - Conditional based on context */}
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="mb-8">
            {context === 'b2b' ? (
              <>
                <h1 className="text-6xl mb-6 drop-shadow-2xl">
                  Akses Platform<br />B2B Marketplace
                </h1>
                <p className="text-2xl opacity-90 leading-relaxed drop-shadow-lg">
                  Kelola pesanan, akses katalog produk eksklusif, dan dapatkan penawaran terbaik untuk bisnis Anda
                </p>
              </>
            ) : (
              <>
                <h1 className="text-6xl mb-6 drop-shadow-2xl">
                  Bangun Karir<br />Impian Anda
                </h1>
                <p className="text-2xl opacity-90 leading-relaxed drop-shadow-lg">
                  Bergabunglah dengan Santoso Jaya Tembakau dan kembangkan potensi Anda bersama tim profesional
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col bg-white relative overflow-hidden">
        {/* Login Form */}
        <div className={`flex-1 flex items-center justify-center px-8 py-12 transition-all duration-500 ${
          currentView !== 'login' ? 'opacity-0 pointer-events-none absolute' : 'opacity-100'
        }`}>
          <div className="w-full max-w-md">
            <div className="text-center mb-10">
              <h2 className="text-4xl mb-4 text-gray-900">Login</h2>
              <p className="text-gray-600 text-lg">
                Masuk ke Karir Santoso Jaya Tembakau
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border-2 border-red-500 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                  <AlertCircle size={18} />
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 ${emailError ? 'text-red-500' : 'text-gray-400'}`} size={20} />
                  <input
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                    className={`w-full pl-12 pr-4 py-4 bg-white text-gray-900 border-2 ${
                      emailError ? 'border-red-500' : 'border-gray-300'
                    } rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all text-base placeholder:text-gray-400`}
                    placeholder="email@example.com"
                  />
                </div>
                {emailError && (
                  <div className="text-red-500 text-sm mt-2 flex items-center gap-2">
                    <AlertCircle size={16} />
                    {emailError}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 ${passwordError ? 'text-red-500' : 'text-gray-400'}`} size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={handlePasswordBlur}
                    className={`w-full pl-12 pr-12 py-4 bg-white text-gray-900 border-2 ${
                      passwordError ? 'border-red-500' : 'border-gray-300'
                    } rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all text-base placeholder:text-gray-400`}
                    placeholder="Masukkan password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {passwordError && (
                  <div className="text-red-500 text-sm mt-2 flex items-center gap-2">
                    <AlertCircle size={16} />
                    {passwordError}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-amber-600 bg-white border-gray-300 rounded focus:ring-amber-500"
                  />
                  <span className="text-gray-600">Ingat saya</span>
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-amber-600 hover:text-amber-700 font-semibold"
                >
                  Lupa password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 text-lg font-semibold"
              >
                Login
              </button>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">atau</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-600">
                  Belum punya akun?{' '}
                  <button
                    type="button"
                    onClick={onNavigateToSignup}
                    className="text-amber-600 font-semibold hover:text-amber-700 hover:underline"
                  >
                    Daftar Sekarang
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* 2FA Verification Form */}
        <div className={`flex-1 flex items-center justify-center px-8 py-12 transition-all duration-500 ${
          currentView === '2fa' ? 'opacity-100' : 'opacity-0 pointer-events-none absolute'
        }`}>
          <div className="w-full max-w-md">
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Shield className="text-white" size={40} />
              </div>
              <h2 className="text-4xl mb-4 text-gray-900">Verifikasi 2FA</h2>
              <p className="text-gray-600 text-lg">
                Masukkan kode 6 digit dari aplikasi<br />authenticator Anda
              </p>
            </div>

            <div className="space-y-6">
              {twoFAError && (
                <div className="bg-red-50 border-2 border-red-500 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                  <AlertCircle size={18} />
                  {twoFAError}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 text-center">
                  Kode Verifikasi
                </label>
                <input
                  type="text"
                  value={twoFACode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setTwoFACode(value);
                    setTwoFAError('');
                  }}
                  className="w-full px-4 py-5 text-center text-3xl font-mono tracking-[0.5em] border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                  placeholder="000000"
                  maxLength={6}
                  autoFocus
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentView('login');
                    setTwoFACode('');
                    setTwoFAError('');
                    setPendingLoginData(null);
                  }}
                  className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-lg font-semibold"
                  disabled={isVerifying2FA}
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleVerify2FA}
                  disabled={twoFACode.length !== 6 || isVerifying2FA}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
                >
                  {isVerifying2FA ? 'Memverifikasi...' : 'Verifikasi'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Forgot Password Form */}
        <div className={`flex-1 flex items-center justify-center px-8 py-12 transition-all duration-500 ${
          currentView === 'forgot' ? 'opacity-100' : 'opacity-0 pointer-events-none absolute'
        }`}>
          <div className="w-full max-w-md">
            {!resetSuccess ? (
              <>
                <div className="text-center mb-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <Lock className="text-white" size={40} />
                  </div>
                  <h2 className="text-4xl mb-4 text-gray-900">
                    {forgotStep === 'email' && 'Lupa Password'}
                    {forgotStep === '2fa' && 'Verifikasi 2FA'}
                    {forgotStep === 'code' && 'Verifikasi Kode'}
                    {forgotStep === 'reset' && 'Reset Password'}
                  </h2>
                  <p className="text-gray-600 text-lg">
                    {forgotStep === 'email' && 'Masukkan email Anda untuk menerima kode verifikasi'}
                    {forgotStep === '2fa' && 'Masukkan kode 6 digit dari aplikasi authenticator Anda'}
                    {forgotStep === 'code' && 'Masukkan kode 6 digit yang dikirim ke email Anda'}
                    {forgotStep === 'reset' && 'Masukkan password baru Anda'}
                  </p>
                </div>

                <div className="space-y-6">
                  {forgotError && (
                    <div className="bg-red-50 border-2 border-red-500 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                      <AlertCircle size={18} />
                      {forgotError}
                    </div>
                  )}

                  {/* Step 1: Email */}
                  {forgotStep === 'email' && (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="email"
                            value={forgotEmail}
                            onChange={(e) => {
                              setForgotEmail(e.target.value);
                              setForgotError('');
                            }}
                            className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-base"
                            placeholder="email@example.com"
                            autoFocus
                          />
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setCurrentView('login')}
                          className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-lg font-semibold"
                        >
                          Kembali
                        </button>
                        <button
                          onClick={handleSendResetCode}
                          className="flex-1 px-6 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl hover:shadow-xl transition-all duration-300 text-lg font-semibold"
                        >
                          Kirim Kode
                        </button>
                      </div>
                    </>
                  )}

                  {/* Step 2: 2FA Verification */}
                  {forgotStep === '2fa' && (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3 text-center">
                          Kode Verifikasi
                        </label>
                        <input
                          type="text"
                          value={forgot2FACode}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                            setForgot2FACode(value);
                            setForgotError('');
                          }}
                          className="w-full px-4 py-5 text-center text-3xl font-mono tracking-[0.5em] border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                          placeholder="000000"
                          maxLength={6}
                          autoFocus
                        />
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setForgotStep('email')}
                          className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-lg font-semibold"
                        >
                          Kembali
                        </button>
                        <button
                          onClick={handleVerifyForgot2FA}
                          disabled={forgot2FACode.length !== 6}
                          className="flex-1 px-6 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
                        >
                          Verifikasi
                        </button>
                      </div>
                    </>
                  )}

                  {/* Step 3: Verification Code */}
                  {forgotStep === 'code' && (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3 text-center">
                          Kode Verifikasi
                        </label>
                        <input
                          type="text"
                          value={resetCode}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                            setResetCode(value);
                            setForgotError('');
                          }}
                          className="w-full px-4 py-5 text-center text-3xl font-mono tracking-[0.5em] border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                          placeholder="000000"
                          maxLength={6}
                          autoFocus
                        />
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setForgotStep('email')}
                          className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-lg font-semibold"
                        >
                          Kembali
                        </button>
                        <button
                          onClick={handleVerifyResetCode}
                          disabled={resetCode.length !== 6}
                          className="flex-1 px-6 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
                        >
                          Verifikasi
                        </button>
                      </div>
                    </>
                  )}

                  {/* Step 4: Reset Password */}
                  {forgotStep === 'reset' && (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Password Baru
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => {
                              setNewPassword(e.target.value);
                              setForgotError('');
                            }}
                            className="w-full pl-12 pr-12 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-base"
                            placeholder="Minimal 6 karakter"
                            autoFocus
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Konfirmasi Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => {
                              setConfirmPassword(e.target.value);
                              setForgotError('');
                            }}
                            className="w-full pl-12 pr-12 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-base"
                            placeholder="Ulangi password baru"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={handleResetPassword}
                        className="w-full px-6 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl hover:shadow-xl transition-all duration-300 text-lg font-semibold"
                      >
                        Reset Password
                      </button>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-4xl mb-4 text-gray-900">Berhasil!</h2>
                <p className="text-gray-600 text-lg">
                  Password Anda telah berhasil direset.<br />Silakan login dengan password baru.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}