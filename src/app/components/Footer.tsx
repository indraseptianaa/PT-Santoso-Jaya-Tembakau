// Footer Component
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, MessageCircle, Video, Youtube } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-orange-500 via-amber-500 to-orange-500 text-white">
      {/* Colorful Top Border */}
      <div className="w-full h-2 flex">
        <div className="flex-1 bg-orange-600"></div>
        <div className="flex-1 bg-orange-500"></div>
        <div className="flex-1 bg-amber-500"></div>
        <div className="flex-1 bg-yellow-400"></div>
        <div className="flex-1 bg-lime-400"></div>
        <div className="flex-1 bg-green-500"></div>
        <div className="flex-1 bg-emerald-500"></div>
        <div className="flex-1 bg-teal-500"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-3 border border-amber-200 inline-block shadow-md">
              <img
                src="https://raw.githubusercontent.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/main/Logo%20PT%20Santoso.png"
                alt="PT Santoso Jaya Tembakau Logo"
                className="h-20 w-auto object-contain"
                onError={(e) => {
                  console.error('Failed to load footer logo');
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <p className="text-white/90 text-sm leading-relaxed">
              PT Santoso Jaya Tembakau adalah produsen tembakau dan rokok berkualitas tinggi yang telah dipercaya selama bertahun-tahun.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <button className="text-white/90 hover:text-white transition-colors text-sm" onClick={() => onNavigate('landing')}>
                  Beranda
                </button>
              </li>
              <li>
                <button className="text-white/90 hover:text-white transition-colors text-sm" onClick={() => onNavigate('rokok')}>
                  Produk
                </button>
              </li>
              <li>
                <button className="text-white/90 hover:text-white transition-colors text-sm" onClick={() => onNavigate('tentang-kami')}>
                  Tentang Kami
                </button>
              </li>
              <li>
                <button className="text-white/90 hover:text-white transition-colors text-sm" onClick={() => onNavigate('kontak')}>
                  Kontak
                </button>
              </li>
              <li>
                <button className="text-white/90 hover:text-white transition-colors text-sm" onClick={() => onNavigate('blog')}>
                  Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Produk Kami</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => onNavigate('rokok')}
                  className="text-white/90 hover:text-white transition-colors text-sm cursor-pointer"
                >
                  Rokok
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('tembakau-tsc')}
                  className="text-white/90 hover:text-white transition-colors text-sm cursor-pointer"
                >
                  Tembakau TSC
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('tembakau-tsg')}
                  className="text-white/90 hover:text-white transition-colors text-sm cursor-pointer"
                >
                  Tembakau TSG
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Pindai untuk Google Map</h3>
            
            {/* QR Maps Image */}
            <div className="mb-4">
              <ImageWithFallback
                src="https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/QR%20Maps%20Footer.png?raw=true"
                alt="Maps Lokasi PT Santoso Jaya Tembakau"
                className="w-48 rounded-lg shadow-lg"
              />
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="font-semibold text-sm mb-3 text-white">Ikuti Kami</h4>
              <div className="flex gap-3">
                <a 
                  href="https://www.facebook.com/share/1Y8241S7zQ/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a 
                  href="https://www.instagram.com/santosojayatembakau?igsh=aW1kcmtzeDlwZXRt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a 
                  href="http://wa.me/+6285336688356"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  aria-label="WhatsApp"
                >
                  {/* WhatsApp Logo */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.tiktok.com/@santosojayatembaka?_r=1&_t=ZS-92JUz3xCyrQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  aria-label="TikTok"
                >
                  {/* TikTok Logo */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                  </svg>
                </a>
                <a 
                  href="https://youtube.com/@santosojayatembakau?si=rBXJDwjM_wHs4bDN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/90 text-sm">
              © {currentYear} PT Santoso Jaya Tembakau. All rights reserved.
            </p>
            <div className="flex gap-6">
              <button className="text-white/90 hover:text-white text-sm transition-colors">
                Privacy Policy
              </button>
              <button className="text-white/90 hover:text-white text-sm transition-colors">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}