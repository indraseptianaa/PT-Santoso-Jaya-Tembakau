import { useState } from 'react';
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowLeft, AlertCircle } from 'lucide-react';

type SignupPageProps = {
  onNavigateToLogin: () => void;
  onBack: () => void;
  context?: 'karir' | 'b2b'; // Context untuk menentukan konten left side
};

export function SignupPage({ onNavigateToLogin, onBack, context = 'karir' }: SignupPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  // Error states
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [termsError, setTermsError] = useState('');
  
  // Touch states
  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  // Validations
  const validateName = (value: string) => {
    if (!value.trim()) return 'Nama lengkap harus diisi!';
    if (value.length < 3) return 'Nama minimal 3 karakter!';
    return '';
  };

  const validateEmail = (value: string) => {
    if (!value.trim()) return 'Email harus diisi!';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Format email tidak valid!';
    return '';
  };

  const validatePhone = (value: string) => {
    if (!value.trim()) return 'Nomor telepon harus diisi!';
    if (!/^[0-9]{10,13}$/.test(value)) return 'Nomor telepon tidak valid!';
    return '';
  };

  const validatePassword = (value: string) => {
    if (!value) return 'Password harus diisi!';
    if (value.length < 6) return 'Password minimal 6 karakter!';
    return '';
  };

  const validateConfirmPassword = (value: string) => {
    if (!value) return 'Konfirmasi password harus diisi!';
    if (value !== password) return 'Password tidak cocok!';
    return '';
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (nameTouched) setNameError(validateName(value));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (emailTouched) setEmailError(validateEmail(value));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    if (phoneTouched) setPhoneError(validatePhone(value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (passwordTouched) setPasswordError(validatePassword(value));
    if (confirmPasswordTouched && confirmPassword) {
      setConfirmPasswordError(value !== confirmPassword ? 'Password tidak cocok!' : '');
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (confirmPasswordTouched) setConfirmPasswordError(validateConfirmPassword(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all as touched
    setNameTouched(true);
    setEmailTouched(true);
    setPhoneTouched(true);
    setPasswordTouched(true);
    setConfirmPasswordTouched(true);

    // Validate all fields
    const nameErr = validateName(name);
    const emailErr = validateEmail(email);
    const phoneErr = validatePhone(phone);
    const passwordErr = validatePassword(password);
    const confirmPasswordErr = validateConfirmPassword(confirmPassword);

    setNameError(nameErr);
    setEmailError(emailErr);
    setPhoneError(phoneErr);
    setPasswordError(passwordErr);
    setConfirmPasswordError(confirmPasswordErr);

    if (!agreeTerms) {
      setTermsError('Anda harus menyetujui syarat dan ketentuan!');
      return;
    }

    if (nameErr || emailErr || phoneErr || passwordErr || confirmPasswordErr) {
      return;
    }
    
    // Simulate successful signup - no alert, just smooth navigation
    onNavigateToLogin();
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
                  Daftar Akun<br />B2B Partner
                </h1>
                <p className="text-2xl opacity-90 leading-relaxed drop-shadow-lg">
                  Bergabung dengan mitra bisnis kami dan nikmati akses eksklusif ke platform B2B marketplace terpercaya
                </p>
              </>
            ) : (
              <>
                <h1 className="text-6xl mb-6 drop-shadow-2xl">
                  Mulai Perjalanan<br />Karir Anda
                </h1>
                <p className="text-2xl opacity-90 leading-relaxed drop-shadow-lg">
                  Daftar sekarang dan temukan berbagai peluang karir menarik di PT Santoso Jaya Tembakau
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col bg-white">
        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center px-8 py-12 overflow-y-auto">
          <div className="w-full max-w-md my-8">
            <div className="text-center mb-10">
              <h2 className="text-4xl mb-4 text-gray-900">Buat Akun</h2>
              <p className="text-gray-600 text-lg">
                Daftar untuk mengakses Karir
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <User className={`absolute left-4 top-1/2 -translate-y-1/2 ${nameError ? 'text-red-500' : 'text-gray-400'}`} size={20} />
                  <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    onBlur={() => setNameTouched(true)}
                    className={`w-full pl-12 pr-4 py-4 bg-white text-gray-900 border-2 ${
                      nameError ? 'border-red-500' : 'border-gray-300'
                    } rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all text-base placeholder:text-gray-400`}
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                {nameError && (
                  <div className="text-red-500 text-sm mt-2 flex items-center gap-2">
                    <AlertCircle size={16} />
                    {nameError}
                  </div>
                )}
              </div>

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
                    onBlur={() => setEmailTouched(true)}
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
                  Nomor Telepon
                </label>
                <div className="relative">
                  <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 ${phoneError ? 'text-red-500' : 'text-gray-400'}`} size={20} />
                  <input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    onBlur={() => setPhoneTouched(true)}
                    className={`w-full pl-12 pr-4 py-4 bg-white text-gray-900 border-2 ${
                      phoneError ? 'border-red-500' : 'border-gray-300'
                    } rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all text-base placeholder:text-gray-400`}
                    placeholder="08xxxxxxxxxx"
                  />
                </div>
                {phoneError && (
                  <div className="text-red-500 text-sm mt-2 flex items-center gap-2">
                    <AlertCircle size={16} />
                    {phoneError}
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
                    onBlur={() => setPasswordTouched(true)}
                    className={`w-full pl-12 pr-12 py-4 bg-white text-gray-900 border-2 ${
                      passwordError ? 'border-red-500' : 'border-gray-300'
                    } rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all text-base placeholder:text-gray-400`}
                    placeholder="Minimal 6 karakter"
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

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 ${confirmPasswordError ? 'text-red-500' : 'text-gray-400'}`} size={20} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    onBlur={() => setConfirmPasswordTouched(true)}
                    className={`w-full pl-12 pr-12 py-4 bg-white text-gray-900 border-2 ${
                      confirmPasswordError ? 'border-red-500' : 'border-gray-300'
                    } rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all text-base placeholder:text-gray-400`}
                    placeholder="Ulangi password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {confirmPasswordError && (
                  <div className="text-red-500 text-sm mt-2 flex items-center gap-2">
                    <AlertCircle size={16} />
                    {confirmPasswordError}
                  </div>
                )}
              </div>

              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => {
                    setAgreeTerms(e.target.checked);
                    if (e.target.checked) setTermsError('');
                  }}
                  className="mt-1 w-5 h-5 text-amber-600 bg-white border-gray-300 rounded focus:ring-amber-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  Saya setuju dengan{' '}
                  <button
                    type="button"
                    className="text-amber-600 font-semibold hover:underline hover:text-amber-700"
                  >
                    Syarat dan Ketentuan
                  </button>{' '}
                  yang berlaku
                </label>
              </div>
              {termsError && (
                <div className="text-red-500 text-sm flex items-center gap-2">
                  <AlertCircle size={16} />
                  {termsError}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 text-lg font-semibold mt-6"
              >
                Sign Up
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
                  Sudah punya akun?{' '}
                  <button
                    type="button"
                    onClick={onNavigateToLogin}
                    className="text-amber-600 font-semibold hover:text-amber-700 hover:underline"
                  >
                    Login
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}