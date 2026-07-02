import { ImageWithFallback } from './figma/ImageWithFallback';
import { Header } from './Header';
import { Footer } from './Footer';
import { Mail } from 'lucide-react';

type KontakPageProps = {
  onNavigate: (page: string) => void;
};

export function KontakPage({ onNavigate }: KontakPageProps) {
  const handleNavigate = (page: string) => {
    onNavigate(page);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Full Screen */}
      <section id="contact-hero" className="relative overflow-hidden">
        {/* Full Screen Background Image with Parallax Effect - Starts from absolute browser top */}
        <div 
          className="absolute top-0 left-0 w-full h-screen z-0"
          style={{
            backgroundImage: 'url("/Latar%20Belakang%20Kontak%20Section%20Atas.png")',
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
          <Header currentPage="kontak" onNavigate={handleNavigate} />
        </div>

        {/* Content Container */}
        <div className="relative z-10 h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left Content */}
              <div className="flex flex-col justify-center p-6 md:p-12 lg:p-16">
                {/* Title */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Kontak
                </h2>

                {/* Subtitle */}
                <h3 className="text-2xl md:text-3xl text-amber-100 mb-4">
                  Hubungi PT Santoso Jaya Tembakau
                </h3>

                {/* Description */}
                <p className="text-lg md:text-xl text-amber-50 mb-8 leading-relaxed">
                  Kami siap melayani Anda dengan informasi produk, kerjasama bisnis, dan pertanyaan lainnya dengan respon yang cepat.
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

      {/* Map Section */}
      <section id="contact-maps" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Two Google Maps Cards with Contact Info */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* Location 1 - PT Santoso Jaya Tembakau */}
            <div className="flex flex-col gap-6">
              <div className="w-full h-96 bg-gray-100 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31636.71603767986!2d112.69621221083983!3d-7.619564799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7db000334d243%3A0x5d0ee65bfaf9067e!2sPT.%20Santoso%20Jaya%20Tembakau!5e0!3m2!1sid!2sid!4v1766383096692!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi 1 - PT Santoso Jaya Tembakau"
                />
              </div>

              {/* Contact Info for PT - Clean Layout */}
              <div className="px-2">
                <h4 className="text-xl font-bold text-gray-900 mb-4">PT. Santoso Jaya Tembakau</h4>
                <div className="flex flex-col gap-3">
                  <a 
                    href="https://wa.me/6285336688356" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-colors group"
                  >
                    <div className="w-8 h-8 flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-green-600">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </div>
                    <span className="text-lg text-gray-700 font-medium group-hover:underline">+62 853 3668 8356</span>
                  </a>
                  <a 
                    href="mailto:info@santosojayatembakau.com" 
                    className="flex items-center gap-3 text-gray-700 hover:text-amber-600 transition-colors group"
                  >
                    <div className="w-8 h-8 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-amber-600" />
                    </div>
                    <span className="text-lg text-gray-700 font-medium group-hover:underline">info@santosojayatembakau.com</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Location 2 - PT Santoso Jaya Tembakau */}
            <div className="flex flex-col gap-6">
              <div className="w-full h-96 bg-gray-100 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31636.304200812312!2d112.7374162!3d-7.6251382!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7dbc4fd38bfbf%3A0xc968162e0ef220a5!2sCV.%20Santoso%20Jaya%20Tembakau!5e0!3m2!1sid!2sid!4v1766383054995!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi 2 - PT Santoso Jaya Tembakau"
                />
              </div>

              {/* Contact Info for PT - Clean Layout */}
              <div className="px-2">
                <h4 className="text-xl font-bold text-gray-900 mb-4">PT. Santoso Jaya Tembakau</h4>
                <div className="flex flex-col gap-3">
                  <a 
                    href="https://wa.me/628123106221" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-colors group"
                  >
                    <div className="w-8 h-8 flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-green-600">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </div>
                    <span className="text-lg text-gray-700 font-medium group-hover:underline">+62 812 3106 221</span>
                  </a>
                  <a 
                    href="mailto:santosojayatembakau@gmail.com" 
                    className="flex items-center gap-3 text-gray-700 hover:text-amber-600 transition-colors group"
                  >
                    <div className="w-8 h-8 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-amber-600" />
                    </div>
                    <span className="text-lg text-gray-700 font-medium group-hover:underline">santosojayatembakau@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
