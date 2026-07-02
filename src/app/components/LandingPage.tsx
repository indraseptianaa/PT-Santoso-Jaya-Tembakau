// Landing Page Component
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Header } from './Header';
import { useState, useRef, useEffect } from 'react';
import { ProductPreview } from './ProductPreview';
import { TembakauTSCPreview } from './TembakauTSCPreview';
import { TembakauTSGPreview } from './TembakauTSGPreview';
import { ScrollStack, ScrollStackItem } from './ScrollStack';
import { Pause, Play, Volume2, ChevronDown, X, Menu, ArrowRight, ArrowUp, Search } from 'lucide-react';

interface CustomProductPage {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  hasFilters: boolean;
  products: any[];
  status?: 'published' | 'draft';
}

interface DefaultProductPage {
  title: string;
  description: string;
  status: 'published' | 'draft';
  pageViews: number;
  hasFilters?: boolean;
  filterCategories?: any[];
}

type LandingPageProps = {
  onNavigate: (page: string) => void;
  onNavigateToLogin?: () => void;
  onNavigateToSignup?: () => void;
};

export function LandingPage({ onNavigate, onNavigateToLogin, onNavigateToSignup }: LandingPageProps) {
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isKarirDropdownOpen, setIsKarirDropdownOpen] = useState(false);
  const [isB2BDropdownOpen, setIsB2BDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [language, setLanguage] = useState<'id' | 'en'>('id');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLanguageExpanded, setIsLanguageExpanded] = useState(false);
  const [customProductPages, setCustomProductPages] = useState<CustomProductPage[]>([]);
  const [defaultPages, setDefaultPages] = useState<{
    rokok: DefaultProductPage;
    tsc: DefaultProductPage;
    tsg: DefaultProductPage;
  }>({
    rokok: { title: 'Rokok Products', description: '', status: 'published', pageViews: 0 },
    tsc: { title: 'Tembakau TSC', description: '', status: 'published', pageViews: 0 },
    tsg: { title: 'Tembakau TSG', description: '', status: 'published', pageViews: 0 }
  });
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Load custom product pages and default pages from localStorage
  useEffect(() => {
    const loadPages = () => {
      const savedCustom = localStorage.getItem('cms_custom_product_pages');
      if (savedCustom) {
        const pages = JSON.parse(savedCustom);
        // Filter only published pages
        setCustomProductPages(pages.filter((p: CustomProductPage) => p.status === 'published'));
      }

      const savedDefault = localStorage.getItem('cms_default_product_pages');
      if (savedDefault) {
        setDefaultPages(JSON.parse(savedDefault));
      }
    };

    loadPages();

    // Listen for updates from CMS
    const handleCustomPagesUpdate = (event: any) => {
      const pages = event.detail || [];
      // Filter only published pages
      setCustomProductPages(pages.filter((p: CustomProductPage) => p.status === 'published'));
    };

    const handleStorageChange = () => {
      loadPages();
    };

    const handleDefaultPagesUpdate = () => {
      loadPages();
    };

    window.addEventListener('customProductPagesUpdated', handleCustomPagesUpdate);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('defaultPagesUpdated', handleDefaultPagesUpdate);
    
    return () => {
      window.removeEventListener('customProductPagesUpdated', handleCustomPagesUpdate);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('defaultPagesUpdated', handleDefaultPagesUpdate);
    };
  }, []);

  // Load YouTube IFrame API
  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
  }, []);

  const togglePlayPause = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const message = isVideoPlaying ? '{"event":"command","func":"pauseVideo","args":""}' : '{"event":"command","func":"playVideo","args":""}';
      iframe.contentWindow?.postMessage(message, '*');
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleMute = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const message = isMuted ? '{"event":"command","func":"unMute","args":""}' : '{"event":"command","func":"mute","args":""}';
      iframe.contentWindow?.postMessage(message, '*');
      setIsMuted(!isMuted);
    }
  };

  const scrollToProducts = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  const handleProductClick = (page: string) => {
    onNavigate(page);
    setIsProductDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="bg-white">
      {/* Hero Section with Full Screen Video */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Full Screen Video - Behind header, starts from absolute browser top */}
        <div className="absolute top-0 left-0 w-full h-screen z-0">
          <iframe 
            ref={iframeRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh]"
            src="https://www.youtube.com/embed/B1sOXFuWyug?si=h1v4a_5C-trPLIDG&autoplay=1&mute=1&loop=1&playlist=B1sOXFuWyug&controls=0&enablejsapi=1" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
          ></iframe>
        </div>

        {/* Dark Overlay for better text visibility */}
        <div className="absolute top-0 left-0 w-full h-screen bg-black/30 z-[1]"></div>

        {/* Video Controls */}
        <div className="absolute bottom-8 right-8 z-10 flex gap-3">
          <button
            onClick={togglePlayPause}
            className="group relative bg-white/20 backdrop-blur-md border border-white/30 p-4 rounded-full hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
            aria-label={isVideoPlaying ? "Pause video" : "Play video"}
          >
            {isVideoPlaying ? (
              <Pause size={24} className="text-white" />
            ) : (
              <Play size={24} className="text-white" />
            )}
          </button>

          <button
            onClick={toggleMute}
            className="group relative bg-white/20 backdrop-blur-md border border-white/30 p-4 rounded-full hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            <Volume2 size={24} className={`text-white ${isMuted ? 'opacity-50' : 'opacity-100'}`} />
            {isMuted && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-0.5 bg-white rotate-45"></div>
            )}
          </button>
        </div>

        {/* Header Navigation Overlay */}
        <div className="absolute top-0 left-0 w-full z-20">
          <div className="max-w-7xl mx-auto px-6 py-6">
            {/* Transparent Card Container */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-4">
              
              {/* Colorful Top Border */}
              <div className="w-full h-2 flex -mt-4 -mx-4 mb-4 rounded-t-2xl overflow-hidden">
                <div className="flex-1 bg-orange-600"></div>
                <div className="flex-1 bg-orange-500"></div>
                <div className="flex-1 bg-amber-500"></div>
                <div className="flex-1 bg-yellow-400"></div>
                <div className="flex-1 bg-lime-400"></div>
                <div className="flex-1 bg-green-500"></div>
                <div className="flex-1 bg-emerald-500"></div>
                <div className="flex-1 bg-teal-500"></div>
              </div>
              
              <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-white/40 shadow-lg">
                    <img
                      src="/Logo%20PT%20Santoso.png"
                      alt="PT Santoso Jaya Tembakau"
                      className="h-16 w-auto drop-shadow-lg"
                      onError={(e) => {
                        console.error('Failed to load landing page logo');
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </div>

                {/* Desktop Desktop Navigation Menu */}
                <nav className="hidden md:flex items-center gap-3">{/* 12px spacing for professional look */}
                  {/* Other menu items - hide when any dropdown is open */}
                  <div 
                    className={`overflow-hidden transition-all duration-700 ease-in-out flex items-center gap-3 ${ 
                      !isProductDropdownOpen && !isKarirDropdownOpen && !isB2BDropdownOpen ? 'max-w-[800px] opacity-100' : 'max-w-0 opacity-0'
                    }`}
                  >
                    <button 
                      onClick={() => onNavigate('landing')}
                      className="text-white font-semibold tracking-wide hover:text-amber-300 transition-all duration-300 relative group cursor-pointer select-none whitespace-nowrap"
                    >
                      BERANDA
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-300 transition-all duration-300"></span>
                    </button>

                    <button 
                      onClick={() => onNavigate('tentang-kami')}
                      className="text-white font-semibold tracking-wide hover:text-amber-300 transition-all duration-300 relative group cursor-pointer select-none whitespace-nowrap"
                    >
                      TENTANG KAMI
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-300 group-hover:w-full transition-all duration-300"></span>
                    </button>

                    <button 
                      onClick={() => onNavigate('kontak')}
                      className="text-white font-semibold tracking-wide hover:text-amber-300 transition-all duration-300 relative group cursor-pointer select-none whitespace-nowrap"
                    >
                      KONTAK
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-300 group-hover:w-full transition-all duration-300"></span>
                    </button>

                    <button 
                      onClick={() => onNavigate('blog')}
                      className="text-white font-semibold tracking-wide hover:text-amber-300 transition-all duration-300 relative group cursor-pointer select-none whitespace-nowrap"
                    >
                      BLOG
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-300 group-hover:w-full transition-all duration-300"></span>
                    </button>
                  </div>

                  {/* KARIR Button - hide when PRODUK or B2B dropdown is open */}
                  <div 
                    className={`overflow-hidden transition-all duration-700 ease-in-out ${
                      !isProductDropdownOpen && !isB2BDropdownOpen ? 'max-w-[200px] opacity-100' : 'max-w-0 opacity-0'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => {
                          // Landing page always navigates to karir
                          onNavigate('karir');
                        }}
                        className="text-white font-semibold tracking-wide hover:text-amber-300 transition-all duration-300 cursor-pointer select-none relative group whitespace-nowrap"
                      >
                        KARIR
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-300 group-hover:w-full transition-all duration-300"></span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsKarirDropdownOpen(!isKarirDropdownOpen);
                          setIsProductDropdownOpen(false);
                          setIsB2BDropdownOpen(false);
                        }}
                        className="text-white hover:text-amber-300 transition-all duration-300 cursor-pointer"
                      >
                        <ChevronDown size={14} className={`transition-transform duration-300 ${isKarirDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* KARIR Dropdown Items - Inline with smooth slide */}
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-out ${
                      isKarirDropdownOpen ? 'max-w-[800px] opacity-100' : 'max-w-0 opacity-0'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          onNavigateToLogin && onNavigateToLogin();
                          setIsKarirDropdownOpen(false);
                        }}
                        className="font-semibold tracking-wide transition-all duration-300 relative group cursor-pointer select-none whitespace-nowrap text-white hover:text-amber-300"
                      >
                        LOGIN
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-300 group-hover:w-full transition-all duration-300"></span>
                      </button>

                      <button
                        onClick={() => {
                          onNavigateToSignup && onNavigateToSignup();
                          setIsKarirDropdownOpen(false);
                        }}
                        className="font-semibold tracking-wide transition-all duration-300 relative group cursor-pointer select-none whitespace-nowrap text-white hover:text-amber-300"
                      >
                        SIGN UP
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-300 group-hover:w-full transition-all duration-300"></span>
                      </button>
                    </div>
                  </div>

                  {/* B2B Button - hide when PRODUK or KARIR dropdown is open */}
                  <div 
                    className={`overflow-hidden transition-all duration-700 ease-in-out ${
                      !isProductDropdownOpen && !isKarirDropdownOpen ? 'max-w-[200px] opacity-100' : 'max-w-0 opacity-0'
                    }`}
                  >
                    <button 
                      onClick={() => onNavigate('b2b')}
                      className="text-white font-semibold tracking-wide hover:text-amber-300 transition-all duration-300 cursor-pointer select-none relative group whitespace-nowrap"
                    >
                      KEMITRAAN
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-300 group-hover:w-full transition-all duration-300"></span>
                    </button>
                  </div>
                  
                  {/* PRODUK Button - hide when KARIR or B2B dropdown is open */}
                  <div 
                    className={`overflow-hidden transition-all duration-700 ease-in-out ${
                      !isKarirDropdownOpen && !isB2BDropdownOpen ? 'max-w-[200px] opacity-100' : 'max-w-0 opacity-0'
                    }`}
                  >
                    <button 
                      className="text-white font-semibold tracking-wide hover:text-amber-300 transition-all duration-300 flex items-center gap-1 cursor-pointer select-none relative group whitespace-nowrap"
                      onClick={() => {
                        setIsProductDropdownOpen(!isProductDropdownOpen);
                        setIsKarirDropdownOpen(false);
                        setIsB2BDropdownOpen(false);
                      }}
                    >
                      PRODUK
                      <ChevronDown size={14} className={`transition-transform duration-300 ${isProductDropdownOpen ? 'rotate-180' : ''}`} />
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-300 group-hover:w-full transition-all duration-300"></span>
                    </button>
                  </div>

                  {/* Product Buttons - Inline with smooth slide */}
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-out ${
                      isProductDropdownOpen ? 'max-w-[800px] opacity-100' : 'max-w-0 opacity-0'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Rokok - Only show if published */}
                      {defaultPages.rokok.status === 'published' && (
                        <button
                          onClick={() => handleProductClick('rokok')}
                          className="font-semibold tracking-wide transition-all duration-300 relative group cursor-pointer select-none whitespace-nowrap text-white hover:text-amber-300"
                        >
                          ROKOK
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-300 group-hover:w-full transition-all duration-300"></span>
                        </button>
                      )}

                      {/* TSC - Only show if published */}
                      {defaultPages.tsc.status === 'published' && (
                        <button
                          onClick={() => handleProductClick('tembakau-tsc')}
                          className="font-semibold tracking-wide transition-all duration-300 relative group cursor-pointer select-none whitespace-nowrap text-white hover:text-amber-300"
                        >
                          TSC
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-300 group-hover:w-full transition-all duration-300"></span>
                        </button>
                      )}

                      {/* TSG - Only show if published */}
                      {defaultPages.tsg.status === 'published' && (
                        <button
                          onClick={() => handleProductClick('tembakau-tsg')}
                          className="font-semibold tracking-wide transition-all duration-300 relative group cursor-pointer select-none whitespace-nowrap text-white hover:text-amber-300"
                        >
                          TSG
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-300 group-hover:w-full transition-all duration-300"></span>
                        </button>
                      )}

                      {/* Custom Product Pages - Only published */}
                      {customProductPages.map((page) => (
                        <button
                          key={page.id}
                          onClick={() => handleProductClick(page.slug)}
                          className="font-semibold tracking-wide transition-all duration-300 relative group cursor-pointer select-none whitespace-nowrap text-white hover:text-amber-300"
                        >
                          {page.title.toUpperCase()}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-300 group-hover:w-full transition-all duration-300"></span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Search Input Card - Inline with smooth slide */}
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-out ${
                      isSearchOpen ? 'max-w-[200px] opacity-100' : 'max-w-0 opacity-0'
                    }`}
                  >
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg px-4 py-2 border border-amber-300 w-[200px]">
                      <input
                        type="text"
                        placeholder="Cari..."
                        className="w-full max-w-full bg-transparent border-none outline-none text-gray-800 placeholder-gray-500"
                        autoFocus
                        style={{ textOverflow: 'ellipsis' }}
                      />
                    </div>
                  </div>

                  {/* Search Icon Button - Always visible */}
                  <button
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm transition-all duration-300 cursor-pointer"
                    title="Search"
                  >
                    <Search size={18} className={isSearchOpen ? 'text-amber-300' : ''} />
                  </button>

                  {/* Language Text - Inline with smooth slide */}
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-out ${
                      isLanguageExpanded ? 'max-w-[100px] opacity-100' : 'max-w-0 opacity-0'
                    }`}
                  >
                    <div className="whitespace-nowrap">
                      <span className="font-semibold tracking-wide text-white">
                        {language === 'en' ? 'English' : 'Indonesia'}
                      </span>
                    </div>
                  </div>

                  {/* Language Toggle Button - Always visible */}
                  <button
                    onClick={() => {
                      setLanguage(language === 'id' ? 'en' : 'id');
                      setIsLanguageExpanded(true);
                      setTimeout(() => setIsLanguageExpanded(false), 2000);
                    }}
                    className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm transition-all duration-300 cursor-pointer font-semibold"
                    title={language === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
                  >
                    {language === 'id' ? 'ID' : 'EN'}
                  </button>
                </nav>

                {/* Mobile Menu Button */}
                <button
                  className="md:hidden p-2 text-white hover:text-amber-300 transition-colors"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>

              {/* Mobile Navigation */}
              {isMobileMenuOpen && (
                <div className="md:hidden pt-4 mt-4 border-t border-white/20">
                  <div className="flex flex-col gap-4">
                    <button
                      onClick={() => {
                        onNavigate('landing'); // Assuming landing is passed or handled (though props says limited set)
                        // Actually LandingPageProps defined onNavigate as: (page: 'rokok' | 'tembakau-tsc' | 'tembakau-tsg' | 'karir' | 'tentang-kami')
                        // Wait, onNavigate props type definition in LandingPage is restrictive?
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left font-semibold text-sm tracking-wide py-2 text-white"
                    >
                      BERANDA
                    </button>

                    <div>
                      <button
                        onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
                        className="flex items-center justify-between w-full text-left font-semibold text-sm tracking-wide py-2 text-white"
                      >
                        PRODUK
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${
                            isProductDropdownOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isProductDropdownOpen && (
                        <div className="ml-4 mt-2 flex flex-col gap-2">
                          {/* Rokok - Only show if published */}
                          {defaultPages.rokok.status === 'published' && (
                            <button
                              onClick={() => handleProductClick('rokok')}
                              className="text-left font-medium text-sm py-2 text-white/80"
                            >
                              Rokok
                            </button>
                          )}
                          
                          {/* TSC - Only show if published */}
                          {defaultPages.tsc.status === 'published' && (
                            <button
                              onClick={() => handleProductClick('tembakau-tsc')}
                              className="text-left font-medium text-sm py-2 text-white/80"
                            >
                              Tembakau TSC
                            </button>
                          )}
                          
                          {/* TSG - Only show if published */}
                          {defaultPages.tsg.status === 'published' && (
                            <button
                              onClick={() => handleProductClick('tembakau-tsg')}
                              className="text-left font-medium text-sm py-2 text-white/80"
                            >
                              Tembakau TSG
                            </button>
                          )}
                          
                          {/* Custom Product Pages - Only published */}
                          {customProductPages.map((page) => (
                            <button
                              key={page.id}
                              onClick={() => handleProductClick(page.slug)}
                              className="text-left font-medium text-sm py-2 text-white/80"
                            >
                              {page.title}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <button 
                      onClick={() => {
                        onNavigate('tentang-kami');
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left font-semibold text-sm tracking-wide py-2 text-white"
                    >
                      TENTANG KAMI
                    </button>

                    <button 
                      onClick={() => setIsKarirDropdownOpen(!isKarirDropdownOpen)}
                      className="text-left font-semibold text-sm tracking-wide py-2 text-white"
                    >
                      KARIR
                    </button>

                    <button 
                      onClick={() => {
                        onNavigate('kontak');
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left font-semibold text-sm tracking-wide py-2 text-white"
                    >
                      KONTAK
                    </button>

                    <button 
                      onClick={() => {
                        onNavigate('blog');
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left font-semibold text-sm tracking-wide py-2 text-white"
                    >
                      BLOG
                    </button>

                    <button 
                      onClick={() => setIsB2BDropdownOpen(!isB2BDropdownOpen)}
                      className="text-left font-semibold text-sm tracking-wide py-2 text-white"
                    >
                      KEMITRAAN
                    </button>

                    {/* Mobile Search */}
                    <div className="flex items-center gap-2">
                      {/* Search Input Card - Inline with smooth slide */}
                      <div 
                        className={`overflow-hidden transition-all duration-500 ease-out ${
                          isSearchOpen ? 'max-w-[250px] opacity-100' : 'max-w-0 opacity-0'
                        }`}
                      >
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg px-4 py-2 border border-amber-300 w-[250px]">
                          <input
                            type="text"
                            placeholder="Cari..."
                            className="w-full max-w-full bg-transparent border-none outline-none text-gray-800 placeholder-gray-500"
                            autoFocus
                            style={{ textOverflow: 'ellipsis' }}
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        className="text-left font-semibold text-sm tracking-wide py-2 text-white"
                      >
                        <Search size={16} />
                      </button>
                    </div>

                    <div className="relative group">
                      <button
                        onClick={() => setIsLanguageExpanded(!isLanguageExpanded)}
                        className="text-left font-semibold text-sm tracking-wide py-2 text-white"
                      >
                        {language === 'id' ? 'EN' : 'ID'}
                      </button>
                      {isLanguageExpanded && (
                        <div className="absolute right-0 top-full mt-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg px-4 py-2 border border-amber-300 w-[100px]">
                          <button
                            onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
                            className="text-left font-semibold text-sm tracking-wide py-2 text-white"
                          >
                            {language === 'id' ? 'EN' : 'ID'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button 
          onClick={scrollToProducts}
          className="absolute bottom-8 left-8 flex flex-col items-center gap-2 text-white animate-bounce z-10 hover:scale-110 transition-transform cursor-pointer"
        >
          <ChevronDown size={24} />
          <span className="text-xs uppercase tracking-wider">Scroll</span>
        </button>
      </section>

      {/* Products Section */}
      <section className="py-0 px-0 bg-white relative z-10 overflow-hidden">
        <div className="w-full">
          <div className="w-full">
            <ScrollStack 
              useWindowScroll={true} 
              itemDistance={600} 
              itemStackDistance={0} 
              baseScale={1.0} 
              itemScale={0.0} 
              stackPosition="0px" 
              scaleEndPosition="0px"
            >
              {/* Header: Produk Kami */}
              <ScrollStackItem>
                <div className="w-full h-[90vh] min-h-[580px] bg-white flex flex-col items-center justify-center text-center px-6">
                  <h2 className="text-5xl font-bold text-amber-900 mb-4 uppercase tracking-wider">Produk Kami</h2>
                  <p className="text-xl md:text-2xl text-gray-600 max-w-2xl leading-relaxed">
                    Berbagai pilihan produk berkualitas tinggi untuk memenuhi kebutuhan Anda
                  </p>
                </div>
              </ScrollStackItem>

              {/* Rokok */}
              <ScrollStackItem>
                <div className="w-full h-[90vh] min-h-[580px] bg-white border-y-2 border-orange-500/20 shadow-lg p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
                  {/* Colorful Top Accent Border */}
                  <div className="absolute top-0 left-0 w-full h-1.5 flex">
                    <div className="flex-1 bg-orange-600"></div>
                    <div className="flex-1 bg-orange-500"></div>
                    <div className="flex-1 bg-amber-500"></div>
                    <div className="flex-1 bg-yellow-400"></div>
                    <div className="flex-1 bg-lime-400"></div>
                    <div className="flex-1 bg-green-500"></div>
                    <div className="flex-1 bg-emerald-500"></div>
                    <div className="flex-1 bg-teal-500"></div>
                  </div>

                  {/* Left Side: Text and Button */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-1.5 shadow-md border border-amber-200">
                        <img
                          src="/Logo%20PT%20Santoso.png"
                          alt="PT Santoso Logo"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <h3 className="text-3xl font-bold text-amber-900">Rokok</h3>
                    </div>
                    
                    <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed">
                      Sigaret Kretek Tangan (SKT) dan Sigaret Kretek Mesin (SKM) dengan cita rasa khas Indonesia dan menggunakan tembakau pilihan berkualitas tinggi.
                    </p>
                    
                    <button
                      onClick={() => onNavigate('rokok')}
                      className="flex items-center gap-2 text-amber-700 font-bold hover:gap-3 transition-all pt-4 border-t border-gray-100 cursor-pointer hover:text-amber-800"
                    >
                      Lihat Semua Produk
                      <ArrowRight size={18} />
                    </button>
                  </div>
                  
                  {/* Right Side: Product Preview */}
                  <div className="w-full md:w-1/2 h-full flex items-center justify-center">
                    <ProductPreview />
                  </div>
                </div>
              </ScrollStackItem>

              {/* Tembakau TSC */}
              <ScrollStackItem>
                <div className="w-full h-[90vh] min-h-[580px] bg-white border-y-2 border-orange-500/20 shadow-lg p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
                  {/* Colorful Top Accent Border */}
                  <div className="absolute top-0 left-0 w-full h-1.5 flex">
                    <div className="flex-1 bg-orange-600"></div>
                    <div className="flex-1 bg-orange-500"></div>
                    <div className="flex-1 bg-amber-500"></div>
                    <div className="flex-1 bg-yellow-400"></div>
                    <div className="flex-1 bg-lime-400"></div>
                    <div className="flex-1 bg-green-500"></div>
                    <div className="flex-1 bg-emerald-500"></div>
                    <div className="flex-1 bg-teal-500"></div>
                  </div>

                  {/* Left Side: Text and Button */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-1.5 shadow-md border border-amber-200">
                        <img
                          src="/Logo%20PT%20Santoso.png"
                          alt="PT Santoso Logo"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <h3 className="text-3xl font-bold text-amber-900">Tembakau TSC</h3>
                    </div>
                    
                    <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed">
                      Tembakau Siap Campur (TSC) adalah produk tembakau premium hasil proses steam dan pengolahan profesional, siap dicampur untuk industri rokok.
                    </p>
                    
                    <button
                      onClick={() => onNavigate('tembakau-tsc')}
                      className="flex items-center gap-2 text-amber-700 font-bold hover:gap-3 transition-all pt-4 border-t border-gray-100 cursor-pointer hover:text-amber-800"
                    >
                      Lihat Semua Produk
                      <ArrowRight size={18} />
                    </button>
                  </div>
                  
                  {/* Right Side: Product Preview */}
                  <div className="w-full md:w-1/2 h-full flex items-center justify-center">
                    <TembakauTSCPreview />
                  </div>
                </div>
              </ScrollStackItem>

              {/* Tembakau TSG */}
              <ScrollStackItem>
                <div className="w-full h-[90vh] min-h-[580px] bg-white border-y-2 border-orange-500/20 shadow-lg p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
                  {/* Colorful Top Accent Border */}
                  <div className="absolute top-0 left-0 w-full h-1.5 flex">
                    <div className="flex-1 bg-orange-600"></div>
                    <div className="flex-1 bg-orange-500"></div>
                    <div className="flex-1 bg-amber-500"></div>
                    <div className="flex-1 bg-yellow-400"></div>
                    <div className="flex-1 bg-lime-400"></div>
                    <div className="flex-1 bg-green-500"></div>
                    <div className="flex-1 bg-emerald-500"></div>
                    <div className="flex-1 bg-teal-500"></div>
                  </div>

                  {/* Left Side: Text and Button */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-1.5 shadow-md border border-amber-200">
                        <img
                          src="/Logo%20PT%20Santoso.png"
                          alt="PT Santoso Logo"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <h3 className="text-2xl font-bold text-amber-900">Tembakau TSG</h3>
                    </div>
                    
                    <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed">
                      Tembakau Siap Giling (TSG) adalah tembakau olahan berkualitas tinggi dengan saus aroma, cengkeh, dan rempah pilihan yang siap digiling.
                    </p>
                    
                    <button
                      onClick={() => onNavigate('tembakau-tsg')}
                      className="flex items-center gap-2 text-amber-700 font-bold hover:gap-3 transition-all pt-4 border-t border-gray-100 cursor-pointer hover:text-amber-800"
                    >
                      Lihat Semua Produk
                      <ArrowRight size={18} />
                    </button>
                  </div>
                  
                  {/* Right Side: Product Preview */}
                  <div className="w-full md:w-1/2 h-full flex items-center justify-center">
                    <TembakauTSGPreview />
                  </div>
                </div>
              </ScrollStackItem>
            </ScrollStack>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-0 px-0 relative">
        <div className="max-w-full mx-auto">
          {/* Background Image with Parallax Effect */}
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'url("/Landing%20Page%20Section%20Siapa%20Kami.png")',
              backgroundAttachment: 'fixed',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
          >
          </div>

          {/* Gradient Overlay from Left - Fresh Orange/Amber */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 from-0% via-amber-500/90 via-10% via-amber-400/60 via-18% to-transparent to-25% z-[1]"></div>

          {/* Content Grid */}
          <div className="relative z-10 grid md:grid-cols-2 gap-0 min-h-[600px]">
            {/* Left Content */}
            <div className="flex flex-col justify-center p-12 md:p-16 lg:p-24">
              {/* Title */}
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Siapa kami
              </h2>

              {/* Description */}
              <p className="text-lg text-amber-50 mb-8 leading-relaxed">
                Santoso Jaya Tembakau adalah perusahaan terkemuka dalam industri tembakau Indonesia. Dengan pengalaman lebih dari 20 tahun, kami berkomitmen menghasilkan produk berkualitas tinggi dengan standar internasional di seluruh Dunia.
              </p>

              {/* Button */}
              <div>
                <button 
                  onClick={() => onNavigate('tentang-kami')}
                  className="group px-8 py-3 border-2 border-white text-white rounded-full font-semibold transition-all duration-300 hover:bg-white hover:text-orange-600 inline-flex items-center gap-2"
                >
                  Mengeksplorasi
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right side - empty for image to show through */}
            <div></div>
          </div>
        </div>
      </section>

      {/* Colorful Border between Siapa Kami and Bergabung Bersama Kami */}
      <div className="w-full h-2 flex z-10 relative">
        <div className="flex-1 bg-orange-600"></div>
        <div className="flex-1 bg-orange-500"></div>
        <div className="flex-1 bg-amber-500"></div>
        <div className="flex-1 bg-yellow-400"></div>
        <div className="flex-1 bg-lime-400"></div>
        <div className="flex-1 bg-green-500"></div>
        <div className="flex-1 bg-emerald-500"></div>
        <div className="flex-1 bg-teal-500"></div>
      </div>

      {/* CTA Section */}
      <section className="py-0 px-0 relative h-[600px] overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("/Gambar%20landing%20page%20Bergabung%20Bersama%20Kami.png")',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        >
        </div>

        {/* Dark Overlay on Right Side */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-black/30 to-transparent"></div>

        {/* Content Container */}
        <div className="relative h-full flex items-center justify-end px-4 md:px-8 lg:px-16">
          {/* Text Content Box */}
          <div className="max-w-xl bg-gradient-to-r from-orange-500/80 via-amber-500/80 via-75% to-orange-500/60 backdrop-blur-sm p-8 md:p-12 rounded-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase tracking-wide">
              Bergabung Bersama Kami
            </h2>
            <p className="text-base md:text-lg text-white/90 leading-relaxed">
              Sumber daya manusia adalah pilar kesuksesan kami. Salah satu tujuan dalam organisasi ini adalah memastikan keselarasan antara minat dan keterampilan tim kami dengan posisinya masing-masing. Hal ini memungkinkan mereka untuk memaksimalkan pencapaian individu dan kinerja perusahaan.
            </p>
          </div>
        </div>

        {/* Back to Home Button - Bottom Left */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute bottom-8 left-8 flex flex-col items-center gap-2 bg-black/50 backdrop-blur-sm p-4 rounded-full hover:bg-black/70 transition-all duration-300 group"
        >
          <ArrowUp size={24} className="text-white group-hover:translate-y-[-4px] transition-transform" />
          <span className="text-xs text-white uppercase tracking-wider font-medium">Back to Home</span>
        </button>
      </section>
    </div>
  );
}
