import { Briefcase, User, ArrowRight, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Header } from './Header';
import { Footer } from './Footer';
import { useState, useEffect } from 'react';
import { useJobs } from '../contexts/JobsContext';

type KarirPageProps = {
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
  onNavigate?: (page: 'landing' | 'rokok' | 'tembakau-tsc' | 'tembakau-tsg' | 'karir' | 'karir-dashboard') => void;
};

export function KarirPage({ onNavigateToLogin, onNavigateToSignup, onNavigate }: KarirPageProps) {
  // Use Jobs Context for real-time sync with HR Dashboard
  const { getActiveJobs } = useJobs();
  const activeJobs = getActiveJobs();
  // State for warning modal
  const [showWarningModal, setShowWarningModal] = useState(true);

  // Default navigation handler if not provided
  const handleNavigate = onNavigate || ((page) => {
    console.log('Navigate to:', page);
  });

  // Prevent scroll when modal is open
  useEffect(() => {
    if (showWarningModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showWarningModal]);

  const closeModal = () => {
    setShowWarningModal(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Warning Modal Pop-up */}
      {showWarningModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fadeIn">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl shadow-2xl max-w-2xl w-full mx-auto animate-slideUp">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 group"
              aria-label="Close modal"
            >
              <X size={24} className="text-white group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Content */}
            <div className="p-8 md:p-12 text-center">
              {/* Logo with White Card */}
              <div className="mb-8 flex justify-center">
                <div className="bg-white rounded-2xl shadow-xl p-6 inline-block">
                  <img 
                    src="/Logo%20PT%20Santoso.png"
                    alt="PT Santoso Jaya Tembakau"
                    className="h-16 md:h-20"
                  />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Waspada Penipuan Rekrutmen
              </h2>

              {/* Warning Text 1 */}
              <p className="text-base md:text-lg text-white mb-4 leading-relaxed">
                Email resmi PT Santoso Jaya Tembakau selalu menggunakan email dengan domain @santosojayatembakau.com
              </p>

              {/* Warning Text 2 */}
              <p className="text-sm md:text-base text-white/90 mb-8 leading-relaxed">
                PT Santoso Jaya Tembakau tidak pernah meminta kandidat untuk menghubungi agen perjalanan atau melakukan pembayaran apa pun pada tahap mana pun dalam proses rekrutmen.
              </p>

              {/* Buttons */}
              <div className="flex flex-col items-center gap-3 max-w-md mx-auto">
                <button
                  onClick={closeModal}
                  className="w-full bg-white text-gray-900 px-10 py-3 rounded-full font-semibold text-base transition-all duration-300 hover:bg-gray-100 hover:shadow-xl hover:scale-105"
                >
                  OK, Saya Mengerti
                </button>
                <button
                  onClick={() => {
                    closeModal();
                    onNavigateToLogin();
                  }}
                  className="w-full px-10 py-3 border-2 border-white text-white rounded-full font-semibold text-base transition-all duration-300 hover:bg-white hover:text-gray-900"
                >
                  Kunjungi situs web karir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section - Full Screen like Landing Page Video */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Full Screen Background Image with Parallax Effect - Starts from absolute browser top */}
        <div 
          className="absolute top-0 left-0 w-full h-screen z-0"
          style={{
            backgroundImage: 'url("/BG%20Karir.png")',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        >
        </div>

        {/* Gradient Overlay from Left (Brown/Amber) */}
        <div className="absolute top-0 left-0 w-full h-screen bg-gradient-to-r from-orange-500 from-0% via-amber-500/90 via-10% via-amber-400/60 via-18% to-transparent to-25% z-[1]"></div>

        {/* Header Navigation Overlay - Same as Landing Page */}
        <div className="absolute top-0 left-0 w-full z-20">
          <Header 
            currentPage="karir" 
            onNavigate={handleNavigate}
            onNavigateToLogin={onNavigateToLogin}
            onNavigateToSignup={onNavigateToSignup}
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left Content */}
              <div className="flex flex-col justify-center p-6 md:p-12 lg:p-16">
                {/* Title */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Karir
                </h2>

                {/* Subtitle */}
                <h3 className="text-2xl md:text-3xl text-amber-100 mb-4">
                  Bergabunglah dengan PT Santoso Jaya Tembakau
                </h3>

                {/* Description */}
                <p className="text-lg md:text-xl text-amber-50 mb-8 leading-relaxed">
                  Bangun karir Anda bersama perusahaan tembakau terkemuka di Indonesia dengan lingkungan kerja profesional dan peluang pengembangan yang luas
                </p>

                {/* Right side - empty for image to show through */}
                <div></div>
              </div>

              {/* Right side - empty for image to show through */}
              <div></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Job Listings Section */}
      <section className="py-0 px-0 relative min-h-[800px] overflow-hidden mt-20">
        {/* Background Image - Full Section */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="/Gambar%20sebelah%20kanan%20di%20section%20Posisi%20Terbuka%20di%20PT%20Santoso%20Jaya%20Tembakau.jpeg"
            alt="Career Opportunities"
            className="w-full h-full object-contain object-right"
          />
        </div>

        {/* Gradient Overlay from Right */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/30 via-black/20 via-35% to-white/95 to-65%"></div>

        {/* Content Grid */}
        <div className="relative z-10 grid md:grid-cols-[65%_35%] gap-0 min-h-[800px]">
          {/* Left Content - Job Listings (65%) */}
          <div className="flex flex-col justify-center py-16 px-8 md:px-12 lg:px-16 bg-white/95">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Posisi Terbuka di PT Santoso Jaya Tembakau
              </h2>
              <p className="text-gray-600">
                {activeJobs.length} lowongan yang tersedia
              </p>
            </div>

            {/* Job Cards */}
            <div className="space-y-4">
              {activeJobs.map((job) => (
                <button
                  key={job.id}
                  onClick={onNavigateToLogin}
                  className="group w-full relative overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                >
                  {/* Main Card Container */}
                  <div className="relative flex items-center">
                    {/* Card Content - With clip path for diagonal cut */}
                    <div
                      className="flex-1 bg-white/60 backdrop-blur-md border-2 border-gray-200 p-6 transition-all duration-300 group-hover:border-amber-500 group-hover:bg-white/80"
                      style={{
                        clipPath: 'polygon(0 0, calc(100% - 80px) 0, 100% 50%, calc(100% - 80px) 100%, 0 100%)'
                      }}
                    >
                      <div className="pr-24 text-left">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {job.title}
                        </h3>
                        <p className="text-gray-600">
                          Location: {job.location}
                        </p>
                      </div>
                    </div>

                    {/* Arrow Section - Absolute positioned */}
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center transition-all duration-300 group-hover:from-amber-500 group-hover:to-orange-500">
                      <ArrowRight size={28} className="text-white" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right side - Image shows through (35%) */}
          <div></div>
        </div>
      </section>

      {/* Why Join Us Section - Similar to "Siapa Kami" */}
      {/* Section 2: Budaya Kerja Positif */}
      <section className="py-0 px-0 relative h-[600px] overflow-hidden mt-20">
        {/* Background Image with Parallax Effect */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("/BG%20Budaya%20Kerja%20Positif.png")',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        >
        </div>

        {/* Dark Overlay on Right Side */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/60 to-transparent"></div>

        {/* Content Container */}
        <div className="relative h-full flex items-center justify-end px-4 md:px-8 lg:px-16">
          {/* Text Content Box - Updated to match "Bergabung Bersama Kami" style */}
          <div className="max-w-xl bg-gradient-to-br from-amber-500 to-orange-500 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase tracking-wide">
              Budaya Kerja Positif
            </h2>
            <p className="text-base md:text-lg text-white/90 leading-relaxed">
              Lingkungan kerja yang mendukung, kolaboratif, dan menghargai kontribusi setiap individu. Kami percaya bahwa budaya kerja yang positif adalah kunci kesuksesan bersama.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section - Similar to "Bergabung Bersama Kami" */}
      <section className="py-0 px-0 relative min-h-[600px] overflow-hidden mt-20">
        {/* Solid Background Color */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-500"></div>

        {/* Content Container - Centered */}
        <div className="relative h-full flex items-center justify-center px-4 py-16 md:py-20">
          <div className="max-w-4xl w-full text-center">
            {/* Logo with White Card */}
            <div className="mb-12 flex justify-center">
              <div className="bg-white rounded-2xl shadow-xl p-6 inline-block">
                <img 
                  src="/Logo%20PT%20Santoso.png"
                  alt="PT Santoso Jaya Tembakau"
                  className="h-20 md:h-24"
                />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
              Waspada Penipuan Rekrutmen
            </h2>

            {/* Warning Text 1 */}
            <p className="text-lg md:text-xl text-white mb-6 leading-relaxed max-w-3xl mx-auto">
              Email resmi PT Santoso Jaya Tembakau selalu menggunakan email dengan domain @santosojayatembakau.com
            </p>

            {/* Warning Text 2 */}
            <p className="text-base md:text-lg text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto">
              PT Santoso Jaya Tembakau tidak pernah meminta kandidat untuk menghubungi agen perjalanan atau melakukan pembayaran apa pun pada tahap mana pun dalam proses rekrutmen.
            </p>

            {/* Buttons */}
            <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
              <button
                onClick={onNavigateToLogin}
                className="w-full bg-white text-gray-900 px-12 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-100 hover:shadow-xl"
              >
                OK
              </button>
              <button
                onClick={onNavigateToLogin}
                className="w-full px-12 py-4 border-2 border-white text-white rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-gray-900"
              >
                Kunjungi situs web karir
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
