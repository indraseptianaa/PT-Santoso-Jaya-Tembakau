import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, AlertCircle, Shield, Briefcase } from 'lucide-react';
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
  systemRole?: string;
};

// Database akun karyawan (untuk demo)
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
    id: '11',
    name: 'HR Admin',
    email: 'hr@santosojayatembakau.com',
    password: 'sandi123',
    phone: '081234567800',
    position: 'HR Manager',
    department: 'Human Resources',
    joinDate: '2023-01-01',
    photo: 'https://ui-avatars.com/api/?name=HR+Admin&background=ef4444&color=fff&size=200',
    status: 'active',
    address: 'Kudus, Jawa Tengah',
    education: 'S1 Manajemen SDM',
    skills: ['Recruitment', 'Employee Management', 'HR Analytics', 'Training & Development'],
    jobDescription: 'Mengelola seluruh sistem HR termasuk recruitment, employee management, dan performance evaluation',
    responsibilities: ['Manajemen lowongan pekerjaan', 'Review aplikasi pelamar', 'Manajemen data karyawan', 'Training & Development'],
    systemRole: 'HR Administrator'
  }
];

interface KarirLoginPageProps {
  onLoginSuccess: (name: string, email: string, phone: string) => void;
  onNavigateToSignup: () => void;
  onBack: () => void;
  onHRLoginSuccess?: () => void;
  onEmployeeLoginSuccess?: (employee: {
    id: string;
    name: string;
    email: string;
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
  }) => void;
}

export function KarirLoginPage({ onLoginSuccess, onNavigateToSignup, onBack, onHRLoginSuccess, onEmployeeLoginSuccess }: KarirLoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  
  // View States
  const [currentView, setCurrentView] = useState<'login' | '2fa'>('login');
  
  // 2FA States
  const [twoFACode, setTwoFACode] = useState('');
  const [twoFAError, setTwoFAError] = useState('');
  const [pendingLoginData, setPendingLoginData] = useState<{email: string, name: string, phone: string} | null>(null);

  const validate2FACode = (inputCode: string, email: string): boolean => {
    try {
      let secret = localStorage.getItem(`user_2fa_secret_${email}`);
      
      if (!secret) {
        secret = 'JBSWY3DPEHPK3PXP';
        localStorage.setItem(`user_2fa_secret_${email}`, secret);
      }

      const totp = new OTPAuth.TOTP({
        issuer: 'Santoso Jaya Tembakau',
        label: email,
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: secret
      });

      const delta = totp.validate({ token: inputCode, window: 1 });
      return delta !== null;
    } catch (error) {
      console.error('2FA validation error:', error);
      return false;
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email wajib diisi');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Format email tidak valid');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError('Password wajib diisi');
      return false;
    }
    if (password.length < 6) {
      setPasswordError('Password minimal 6 karakter');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    setEmailTouched(true);
    setPasswordTouched(true);

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    // BLOKIR akun B2B - tidak boleh login di sistem Karir
    if (email === 'bisnis@santosojayatembakau.com') {
      setError('Akun B2B tidak dapat login di sistem Karir. Silakan gunakan halaman B2B Login.');
      return;
    }

    // Cek pelamar@santosojayatembakau.com (Applicant account)
    if (email === 'pelamar@santosojayatembakau.com' && password === 'sandi123') {
      // Direct login untuk applicant - langsung ke KarirDashboard
      onLoginSuccess('Pelamar Test', email, '+62 812-9999-9999');
      return;
    }

    // Cek apakah ada user yang signup
    const savedUsers = JSON.parse(localStorage.getItem('karir_registered_users') || '[]');
    const registeredUser = savedUsers.find((u: any) => u.email === email && u.password === password);

    if (registeredUser) {
      // User yang signup dari Karir - perlu 2FA
      setPendingLoginData({
        email: registeredUser.email,
        name: registeredUser.name,
        phone: registeredUser.phone,
      });
      setCurrentView('2fa');
      return;
    }

    // Cek akun employee
    const employeeAccount = EMPLOYEE_ACCOUNTS.find(
      (acc) => acc.email === email && acc.password === password
    );

    if (employeeAccount) {
      // BLOKIR akun B2B dari EMPLOYEE_ACCOUNTS juga
      if (employeeAccount.email === 'bisnis@santosojayatembakau.com') {
        setError('Akun B2B tidak dapat login di sistem Karir. Silakan gunakan halaman B2B Login.');
        return;
      }
      
      if (onEmployeeLoginSuccess) {
        onEmployeeLoginSuccess(employeeAccount);
      }

      // Cek apakah akun HR Admin
      if (employeeAccount.email === 'hr@santosojayatembakau.com' && onHRLoginSuccess) {
        onHRLoginSuccess();
      }
      return;
    }

    setError('Email atau password salah');
  };

  const handleVerify2FA = () => {
    if (!pendingLoginData) return;

    setTwoFAError('');

    if (!twoFACode || twoFACode.length !== 6) {
      setTwoFAError('Kode 2FA harus 6 digit');
      return;
    }

    const isValid = validate2FACode(twoFACode, pendingLoginData.email);

    if (isValid) {
      onLoginSuccess(pendingLoginData.name, pendingLoginData.email, pendingLoginData.phone);
    } else {
      setTwoFAError('Kode 2FA tidak valid atau sudah kadaluarsa');
    }
  };

  // 2FA View
  if (currentView === '2fa') {
    return (
      <div className="min-h-screen flex">
        {/* Left Side - Branding Karir */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-600 via-orange-500 to-amber-600 p-12 flex-col justify-between relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
                <img 
                  src="/Logo%20PT%20Santoso.png"
                  alt="PT Santoso Jaya Tembakau"
                  className="h-12 w-auto"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white drop-shadow-lg">PT Santoso Jaya Tembakau</h1>
                <p className="text-white/90 text-sm">Portal Karir & Rekrutmen</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                Bergabunglah dengan Tim Kami
              </h2>
              <p className="text-xl text-white/90 leading-relaxed">
                Wujudkan karir impian Anda bersama SANTOSO JAYA TEMBAKAU
              </p>
            </div>
          </div>

          <div className="relative z-10 text-white/80 text-sm">
            <p>Â© 2024 PT Santoso Jaya Tembakau. All rights reserved.</p>
          </div>
        </div>

        {/* Right Side - 2FA Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
          <div className="w-full max-w-md">
            <button
              onClick={() => setCurrentView('login')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Kembali ke Login</span>
            </button>

            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <Shield size={32} className="text-orange-600" />
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifikasi 2FA</h2>
              <p className="text-gray-600">
                Masukkan kode 6 digit dari aplikasi autentikator Anda
              </p>
            </div>

            <div className="mb-6">
              <input
                type="text"
                value={twoFACode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 6) {
                    setTwoFACode(value);
                    setTwoFAError('');
                  }
                }}
                placeholder="000000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-center text-2xl tracking-widest"
                maxLength={6}
              />
              {twoFAError && (
                <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  <span>{twoFAError}</span>
                </div>
              )}
            </div>

            <button
              onClick={handleVerify2FA}
              className="w-full px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Verifikasi
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Login View
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding Karir */}
      <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/Landing%20Page%20Section%20Siapa%20Kami.png)' }}></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
              <img 
                src="/Logo%20PT%20Santoso.png"
                alt="PT Santoso Jaya Tembakau"
                className="h-12 w-auto"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white drop-shadow-lg">PT Santoso Jaya Tembakau</h1>
              <p className="text-white/90 text-sm">Portal Karir & Rekrutmen</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
              Bergabunglah dengan Tim Kami
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Wujudkan karir impian Anda bersama SANTOSO JAYA TEMBAKAU
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-3xl font-bold text-white mb-1">500+</div>
              <div className="text-white/90 text-sm">Karyawan</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-3xl font-bold text-white mb-1">25+</div>
              <div className="text-white/90 text-sm">Tahun Berpengalaman</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-white/80 text-sm">
          <p>Â© 2024 PT Santoso Jaya Tembakau. All rights reserved.</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Masuk Karir</h2>
            <p className="text-gray-600">Akses akun Anda untuk melanjutkan lamaran</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
                <AlertCircle size={20} />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailTouched) validateEmail(e.target.value);
                  }}
                  onBlur={() => {
                    setEmailTouched(true);
                    validateEmail(email);
                  }}
                  placeholder="nama@email.com"
                  className={`w-full pl-10 pr-4 py-3 border ${
                    emailError ? 'border-red-300' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white`}
                />
              </div>
              {emailError && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {emailError}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordTouched) validatePassword(e.target.value);
                  }}
                  onBlur={() => {
                    setPasswordTouched(true);
                    validatePassword(password);
                  }}
                  placeholder="Masukkan password"
                  className={`w-full pl-10 pr-12 py-3 border ${
                    passwordError ? 'border-red-300' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {passwordError && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {passwordError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Masuk
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Belum punya akun?{' '}
              <button
                onClick={onNavigateToSignup}
                className="text-orange-600 hover:text-orange-700 font-semibold"
              >
                Daftar Sekarang
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
