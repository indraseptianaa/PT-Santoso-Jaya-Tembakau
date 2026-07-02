import { Building2, Mail, Phone, MapPin, Users, Handshake, TrendingUp, Shield, Clock, Globe, ArrowRight } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BusinessToBusinessProps {
  onNavigate: (page: string) => void;
}

export function BusinessToBusiness({ onNavigate }: BusinessToBusinessProps) {
  // B2B Services Data
  const b2bServices = [
    {
      id: 1,
      title: 'Rokok (SKT & SKM)',
      description: 'Sigaret Kretek Tangan & Mesin berkualitas premium'
    },
    {
      id: 2,
      title: 'Tembakau TSC',
      description: 'Tembakau Siap Campur dengan proses steam terbaik'
    },
    {
      id: 3,
      title: 'Tembakau TSG',
      description: 'Tembakau Siap Giling dengan flavor dan chaos premium'
    },
    {
      id: 4,
      title: 'Partnership Program',
      description: 'Program kemitraan jangka panjang dengan benefit eksklusif'
    },
    {
      id: 5,
      title: 'Custom Solutions',
      description: 'Solusi produk khusus sesuai kebutuhan bisnis Anda'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Business Partnership PT. Niaga Nusa Abadi */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Full Screen Background Image with Parallax Effect */}
        <div 
          className="absolute top-0 left-0 w-full h-screen z-0"
          style={{
            backgroundImage: 'url("https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Manajmen%20NNA.jpg?raw=true")',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        >
        </div>

        {/* Gradient Overlay from Left (Orange/Amber) */}
        <div className="absolute top-0 left-0 w-full h-screen bg-gradient-to-r from-orange-500 from-0% via-amber-500/90 via-10% via-amber-400/60 via-18% to-transparent to-25% z-[1]"></div>

        {/* Header Navigation Overlay */}
        <div className="absolute top-0 left-0 w-full z-20">
          <Header 
            currentPage="b2b" 
            onNavigate={onNavigate}
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left Content */}
              <div className="flex flex-col justify-center p-6 md:p-12 lg:p-16">
                {/* Logo */}
                <div className="mb-8">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 inline-block">
                    <img 
                      src="https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Logo%20PT.NNA.png?raw=true" 
                      alt="Logo PT. Niaga Nusa Abadi" 
                      className="h-16 md:h-20 object-contain"
                    />
                  </div>
                </div>

                {/* Subtitle */}
                <h3 className="text-2xl md:text-3xl text-white font-bold mb-4">
                  PT. Niaga Nusa Abadi
                </h3>

                {/* Description */}
                <p className="text-lg md:text-xl text-amber-50 leading-relaxed">
                  PT Niaga Nusa Abadi merupakan perusahaan yang bergerak di bidang penjualan, distribusi dan pemasaran. Berdiri sejak tahun 2012
                </p>
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

      {/* Call to Action Section - Centered with Logo */}
      <section className="py-0 px-0 relative min-h-[600px] overflow-hidden mt-8">
        {/* Solid Background Color */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-500"></div>

        {/* Content Container - Centered */}
        <div className="relative h-full flex items-center justify-center px-4 py-16 md:py-20">
          <div className="max-w-4xl w-full text-center">
            {/* Logo with White Card */}
            <div className="mb-12 flex justify-center">
              <div className="bg-white rounded-2xl shadow-xl p-6 inline-block">
                <img 
                  src="https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Logo%20PT%20Santoso.png?raw=true"
                  alt="PT Santoso Jaya Tembakau"
                  className="h-20 md:h-24"
                />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Mulai Bermitra Dengan Kami
            </h2>

            {/* Description */}
            <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed">
              Hubungi tim kemitraan kami untuk mendiskusikan kebutuhan dan penawaran khusus untuk bisnis Anda
            </p>

            {/* CTA Button */}
            <button
              onClick={() => {
                onNavigate('kontak');
                // Scroll to maps section after navigation with longer delay
                setTimeout(() => {
                  const mapsSection = document.getElementById('contact-maps');
                  if (mapsSection) {
                    mapsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 300);
              }}
              className="inline-block px-12 py-4 bg-white text-orange-600 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg"
            >
              Hubungi Sekarang
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}