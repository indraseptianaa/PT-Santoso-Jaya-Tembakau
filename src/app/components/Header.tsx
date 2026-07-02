// Header Component with Navigation
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Search } from 'lucide-react';

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

type HeaderProps = {
  currentPage: string;
  onNavigate: (page: string) => void;
  onNavigateToLogin?: () => void;
  onNavigateToSignup?: () => void;
};

export function Header({ currentPage, onNavigate, onNavigateToLogin, onNavigateToSignup }: HeaderProps) {
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isKarirDropdownOpen, setIsKarirDropdownOpen] = useState(false);
  const [isB2BDropdownOpen, setIsB2BDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

    window.addEventListener('customProductPagesUpdated', handleCustomPagesUpdate);
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('customProductPagesUpdated', handleCustomPagesUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Auto-open dropdowns based on current page
  useEffect(() => {
    // Auto-open PRODUK dropdown when on product pages
    if (currentPage === 'rokok' || currentPage === 'tembakau-tsc' || currentPage === 'tembakau-tsg' || customProductPages.some(p => p.slug === currentPage)) {
      setIsProductDropdownOpen(true);
      setIsKarirDropdownOpen(false);
      setIsB2BDropdownOpen(false);
    }
    // Auto-open KARIR dropdown when on karir page
    else if (currentPage === 'karir') {
      setIsKarirDropdownOpen(true);
      setIsProductDropdownOpen(false);
      setIsB2BDropdownOpen(false);
    }
    // Auto-open B2B dropdown when on b2b page
    else if (currentPage === 'b2b') {
      setIsB2BDropdownOpen(true);
      setIsProductDropdownOpen(false);
      setIsKarirDropdownOpen(false);
    }
    // Close all dropdowns on other pages
    else {
      setIsProductDropdownOpen(false);
      setIsKarirDropdownOpen(false);
      setIsB2BDropdownOpen(false);
    }
  }, [currentPage, customProductPages]);

  const handleProductClick = (page: string) => {
    onNavigate(page as any);
    setIsProductDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="relative z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Custom Header - Same as Beranda */}
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
              <div 
                className="bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-white/40 shadow-lg cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => onNavigate('landing')}
              >
                <img
                  src="/Logo%20PT%20Santoso.png"
                  alt="PT Santoso Jaya Tembakau"
                  className="h-16 w-auto drop-shadow-lg"
                  onError={(e) => {
                    console.error('Failed to load logo');
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>

            {/* Desktop Navigation Menu */}
            <nav className="hidden md:flex items-center gap-3">{/* 12px spacing for professional look */}
              {/* Other menu items - hide when any dropdown is open */}
              <div 
                className={`overflow-hidden transition-all duration-700 ease-in-out flex items-center gap-3 ${ 
                  !isProductDropdownOpen && !isKarirDropdownOpen && !isB2BDropdownOpen ? 'max-w-[800px] opacity-100' : 'max-w-0 opacity-0'
                }`}
              >
                <button 
                  onClick={() => onNavigate('landing')}
                  className={`font-semibold tracking-wide hover:text-amber-300 transition-all duration-300 relative group cursor-pointer select-none whitespace-nowrap ${
                    currentPage === 'rokok' || currentPage === 'tembakau-tsc' || currentPage === 'tembakau-tsg' ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  BERANDA
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-amber-300 transition-all duration-300 ${
                    currentPage === 'landing' ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </button>

                <button 
                  onClick={() => onNavigate('tentang-kami')}
                  className={`font-semibold tracking-wide hover:text-amber-300 transition-all duration-300 relative group cursor-pointer select-none whitespace-nowrap ${
                    currentPage === 'rokok' || currentPage === 'tembakau-tsc' || currentPage === 'tembakau-tsg' ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  TENTANG KAMI
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-amber-300 transition-all duration-300 ${
                    currentPage === 'tentang-kami' ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </button>

                <button 
                  onClick={() => onNavigate('kontak')}
                  className={`font-semibold tracking-wide hover:text-amber-300 transition-all duration-300 relative group cursor-pointer select-none whitespace-nowrap ${
                    currentPage === 'rokok' || currentPage === 'tembakau-tsc' || currentPage === 'tembakau-tsg' ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  KONTAK
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-amber-300 transition-all duration-300 ${
                    currentPage === 'kontak' ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </button>

                <button 
                  onClick={() => onNavigate('blog')}
                  className={`font-semibold tracking-wide hover:text-amber-300 transition-all duration-300 relative group cursor-pointer select-none whitespace-nowrap ${
                    currentPage === 'rokok' || currentPage === 'tembakau-tsc' || currentPage === 'tembakau-tsg' ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  BLOG
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-amber-300 transition-all duration-300 ${
                    currentPage === 'blog' ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
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
                      // If already on karir page, toggle dropdown instead of navigating
                      if (currentPage === 'karir') {
                        setIsKarirDropdownOpen(!isKarirDropdownOpen);
                        setIsProductDropdownOpen(false);
                        setIsB2BDropdownOpen(false);
                      } else {
                        onNavigate('karir');
                      }
                    }}
                    className={`font-semibold tracking-wide hover:text-amber-300 transition-all duration-300 cursor-pointer select-none relative group whitespace-nowrap ${
                      currentPage === 'rokok' || currentPage === 'tembakau-tsc' || currentPage === 'tembakau-tsg' ? 'text-gray-900' : 'text-white'
                    }`}
                  >
                    KARIR
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-amber-300 transition-all duration-300 ${
                      currentPage === 'karir' ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsKarirDropdownOpen(!isKarirDropdownOpen);
                      setIsProductDropdownOpen(false);
                      setIsB2BDropdownOpen(false);
                    }}
                    className={`hover:text-amber-300 transition-all duration-300 cursor-pointer ${
                      currentPage === 'rokok' || currentPage === 'tembakau-tsc' || currentPage === 'tembakau-tsg' ? 'text-gray-900' : 'text-white'
                    }`}
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
                    className={`font-semibold tracking-wide transition-all duration-300 relative group cursor-pointer select-none whitespace-nowrap hover:text-amber-300 ${
                      currentPage === 'rokok' || currentPage === 'tembakau-tsc' || currentPage === 'tembakau-tsg' ? 'text-gray-900' : 'text-white'
                    }`}
                  >
                    LOGIN
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-300 group-hover:w-full transition-all duration-300"></span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigateToSignup && onNavigateToSignup();
                      setIsKarirDropdownOpen(false);
                    }}
                    className={`font-semibold tracking-wide transition-all duration-300 relative group cursor-pointer select-none whitespace-nowrap hover:text-amber-300 ${
                      currentPage === 'rokok' || currentPage === 'tembakau-tsc' || currentPage === 'tembakau-tsg' ? 'text-gray-900' : 'text-white'
                    }`}
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
                  onClick={() => {
                    onNavigate('b2b');
                    setIsProductDropdownOpen(false);
                    setIsKarirDropdownOpen(false);
                    setIsB2BDropdownOpen(false);
                  }}
                  className={`font-semibold tracking-wide hover:text-amber-300 transition-all duration-300 cursor-pointer select-none relative group whitespace-nowrap ${
                    currentPage === 'rokok' || currentPage === 'tembakau-tsc' || currentPage === 'tembakau-tsg' ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  KEMITRAAN
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-amber-300 transition-all duration-300 ${
                    currentPage === 'b2b' ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </button>
              </div>
              
              {/* PRODUK Button - hide when KARIR or B2B dropdown is open */}
              <div 
                className={`overflow-hidden transition-all duration-700 ease-in-out ${
                  !isKarirDropdownOpen && !isB2BDropdownOpen ? 'max-w-[200px] opacity-100' : 'max-w-0 opacity-0'
                }`}
              >
                <button 
                  className={`font-semibold tracking-wide hover:text-amber-300 transition-all duration-300 flex items-center gap-1 cursor-pointer select-none relative group whitespace-nowrap ${
                    currentPage === 'rokok' || currentPage === 'tembakau-tsc' || currentPage === 'tembakau-tsg' ? 'text-gray-900' : 'text-white'
                  }`}
                  onClick={() => {
                    setIsProductDropdownOpen(!isProductDropdownOpen);
                    setIsKarirDropdownOpen(false);
                    setIsB2BDropdownOpen(false);
                  }}
                >
                  PRODUK
                  <ChevronDown size={14} className={`transition-transform duration-300 ${isProductDropdownOpen ? 'rotate-180' : ''}`} />
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-amber-300 transition-all duration-300 ${
                    currentPage === 'rokok' || currentPage === 'tembakau-tsc' || currentPage === 'tembakau-tsg' ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
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
                      className={`font-semibold tracking-wide transition-all duration-300 relative group cursor-pointer select-none whitespace-nowrap hover:text-amber-300 ${
                        currentPage === 'rokok' || currentPage === 'tembakau-tsc' || currentPage === 'tembakau-tsg' ? 'text-gray-900' : 'text-white'
                      }`}
                    >
                      ROKOK
                      <span className={`absolute -bottom-1 left-0 h-0.5 bg-amber-300 transition-all duration-300 ${
                        currentPage === 'rokok' ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}></span>
                    </button>
                  )}

                  {/* TSC - Only show if published */}
                  {defaultPages.tsc.status === 'published' && (
                    <button
                      onClick={() => handleProductClick('tembakau-tsc')}
                      className={`font-semibold tracking-wide transition-all duration-300 relative group cursor-pointer select-none whitespace-nowrap hover:text-amber-300 ${
                        currentPage === 'rokok' || currentPage === 'tembakau-tsc' || currentPage === 'tembakau-tsg' ? 'text-gray-900' : 'text-white'
                      }`}
                    >
                      TSC
                      <span className={`absolute -bottom-1 left-0 h-0.5 bg-amber-300 transition-all duration-300 ${
                        currentPage === 'tembakau-tsc' ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}></span>
                    </button>
                  )}

                  {/* TSG - Only show if published */}
                  {defaultPages.tsg.status === 'published' && (
                    <button
                      onClick={() => handleProductClick('tembakau-tsg')}
                      className={`font-semibold tracking-wide transition-all duration-300 relative group cursor-pointer select-none whitespace-nowrap hover:text-amber-300 ${
                        currentPage === 'rokok' || currentPage === 'tembakau-tsc' || currentPage === 'tembakau-tsg' ? 'text-gray-900' : 'text-white'
                      }`}
                    >
                      TSG
                      <span className={`absolute -bottom-1 left-0 h-0.5 bg-amber-300 transition-all duration-300 ${
                        currentPage === 'tembakau-tsg' ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}></span>
                    </button>
                  )}

                  {/* Custom Product Pages - Only published */}
                  {customProductPages.map((page) => (
                    <button
                      key={page.id}
                      onClick={() => handleProductClick(page.slug)}
                      className={`font-semibold tracking-wide transition-all duration-300 relative group cursor-pointer select-none whitespace-nowrap text-white hover:text-amber-300 ${
                        currentPage === page.slug ? 'text-amber-300' : ''
                      }`}
                    >
                      {page.title.toUpperCase()}
                      <span className={`absolute -bottom-1 left-0 h-0.5 bg-amber-300 transition-all duration-300 ${
                        currentPage === page.slug ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}></span>
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
                className={`p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm transition-all duration-300 cursor-pointer ${
                  currentPage === 'rokok' || currentPage === 'tembakau-tsc' || currentPage === 'tembakau-tsg' ? 'text-gray-900' : 'text-white'
                }`}
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
                  <span className={`font-semibold tracking-wide ${
                    currentPage === 'rokok' || currentPage === 'tembakau-tsc' || currentPage === 'tembakau-tsg' ? 'text-gray-900' : 'text-white'
                  }`}>
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
                className={`px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm transition-all duration-300 cursor-pointer font-semibold ${
                  currentPage === 'rokok' || currentPage === 'tembakau-tsc' || currentPage === 'tembakau-tsg' ? 'text-gray-900' : 'text-white'
                }`}
                title={language === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
              >
                {language === 'id' ? 'ID' : 'EN'}
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-2 hover:text-amber-300 transition-colors ${
                currentPage === 'rokok' || currentPage === 'tembakau-tsc' || currentPage === 'tembakau-tsg' ? 'text-gray-900' : 'text-white'
              }`}
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
                    onNavigate('landing');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left font-semibold text-sm tracking-wide py-2 ${
                    currentPage === 'rokok' || currentPage === 'tembakau-tsc' || currentPage === 'tembakau-tsg' ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  BERANDA
                </button>

                <div>
                  <button
                    onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
                    className={`flex items-center justify-between w-full text-left font-semibold text-sm tracking-wide py-2 ${
                      currentPage === 'rokok' || currentPage === 'tembakau-tsc' || currentPage === 'tembakau-tsg' ? 'text-gray-900' : 'text-white'
                    }`}
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
                          className={`text-left font-medium text-sm py-2 ${
                            currentPage === 'rokok' || currentPage === 'tembakau-tsc' || currentPage === 'tembakau-tsg' ? 'text-gray-900' : 'text-white/80'
                          }`}
                        >
                          Rokok
                        </button>
                      )}
                      
                      {/* TSC - Only show if published */}
                      {defaultPages.tsc.status === 'published' && (
                        <button
                          onClick={() => handleProductClick('tembakau-tsc')}
                          className={`text-left font-medium text-sm py-2 ${
                            currentPage === 'rokok' || currentPage === 'tembakau-tsc' || currentPage === 'tembakau-tsg' ? 'text-gray-900' : 'text-white/80'
                          }`}
                        >
                          Tembakau TSC
                        </button>
                      )}
                      
                      {/* TSG - Only show if published */}
                      {defaultPages.tsg.status === 'published' && (
                        <button
                          onClick={() => handleProductClick('tembakau-tsg')}
                          className={`text-left font-medium text-sm py-2 ${
                            currentPage === 'rokok' || currentPage === 'tembakau-tsc' || currentPage === 'tembakau-tsg' ? 'text-gray-900' : 'text-white/80'
                          }`}
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
                  className={`text-left font-semibold text-sm tracking-wide py-2 ${
                    currentPage === 'rokok' || currentPage === 'tembakau-tsc' || currentPage === 'tembakau-tsg' ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  TENTANG KAMI
                </button>

                <div>
                  <div className="flex items-center justify-between w-full">
                    <button
                      onClick={() => {
                        // Navigate to karir page and open dropdown
                        onNavigate('karir');
                        setIsKarirDropdownOpen(true);
                        setIsProductDropdownOpen(false);
                        setIsB2BDropdownOpen(false);
                      }}
                      className={`text-left font-semibold text-sm tracking-wide py-2 flex-1 ${
                        currentPage === 'rokok' || currentPage === 'tembakau-tsc' || currentPage === 'tembakau-tsg' ? 'text-gray-900' : 'text-white'
                      }`}
                    >
                      KARIR
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsKarirDropdownOpen(!isKarirDropdownOpen);
                        setIsProductDropdownOpen(false);
                        setIsB2BDropdownOpen(false);
                      }}
                      className={`text-left font-semibold text-sm tracking-wide py-2 ${
                        currentPage === 'rokok' || currentPage === 'tembakau-tsc' || currentPage === 'tembakau-tsg' ? 'text-gray-900' : 'text-white'
                      }`}
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          isKarirDropdownOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>
                  {isKarirDropdownOpen && (
                    <div className="ml-4 mt-2 flex flex-col gap-2">
                      <button
                        onClick={() => {
                          onNavigateToLogin && onNavigateToLogin();
                          setIsKarirDropdownOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`text-left font-medium text-sm py-2 ${
                          currentPage === 'rokok' || currentPage === 'tembakau-tsc' || currentPage === 'tembakau-tsg' ? 'text-gray-900' : 'text-white/80'
                        }`}
                      >
                        Login
                      </button>
                      <button
                        onClick={() => {
                          onNavigateToSignup && onNavigateToSignup();
                          setIsKarirDropdownOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`text-left font-medium text-sm py-2 ${
                          currentPage === 'rokok' || currentPage === 'tembakau-tsc' || currentPage === 'tembakau-tsg' ? 'text-gray-900' : 'text-white/80'
                        }`}
                      >
                        Sign Up
                      </button>
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => {
                    onNavigate('kontak');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left font-semibold text-sm tracking-wide py-2 ${
                    currentPage === 'rokok' || currentPage === 'tembakau-tsc' || currentPage === 'tembakau-tsg' ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  KONTAK
                </button>

                <button 
                  onClick={() => {
                    onNavigate('blog');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left font-semibold text-sm tracking-wide py-2 ${
                    currentPage === 'rokok' || currentPage === 'tembakau-tsc' || currentPage === 'tembakau-tsg' ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  BLOG
                </button>

                <button
                  onClick={() => {
                    onNavigate('b2b');
                    setIsB2BDropdownOpen(false);
                    setIsProductDropdownOpen(false);
                    setIsKarirDropdownOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left font-semibold text-sm tracking-wide py-2 ${
                    currentPage === 'rokok' || currentPage === 'tembakau-tsc' || currentPage === 'tembakau-tsg' ? 'text-gray-900' : 'text-white'
                  }`}
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
                    className={`text-left font-semibold text-sm tracking-wide py-2 ${
                      currentPage === 'rokok' || currentPage === 'tembakau-tsc' || currentPage === 'tembakau-tsg' ? 'text-gray-900' : 'text-white'
                    }`}
                  >
                    <Search size={16} />
                  </button>
                </div>

                <div className="relative group">
                  <button
                    onClick={() => setIsLanguageExpanded(!isLanguageExpanded)}
                    className={`text-left font-semibold text-sm tracking-wide py-2 ${
                      currentPage === 'rokok' || currentPage === 'tembakau-tsc' || currentPage === 'tembakau-tsg' ? 'text-gray-900' : 'text-white'
                    }`}
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
    </header>
  );
}
