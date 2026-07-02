import { useState, useRef, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MessageCircle, ChevronLeft, ChevronRight, Play, Pause, LayoutGrid, Package, ChevronDown } from 'lucide-react';

type CustomProduct = {
  id: string;
  name: string;
  baseImage: string;
  hoverImage?: string;
  description: string;
  productName: string;
  specifications: { [key: string]: string };
  videoUrls?: string[];
  category?: string; // Filter category
};

type CustomProductPage = {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  hasFilters: boolean;
  filterCategories?: { 
    name: string; 
    label: string; 
    color: string; 
    type?: 'single' | 'dropdown'; 
    children?: { name: string; label: string; color: string }[] 
  }[];
  products: CustomProduct[];
  status?: 'published' | 'draft';
};

type CustomProductPageProps = {
  slug: string;
  onBack: () => void;
};

export function CustomProductPage({ slug, onBack }: CustomProductPageProps) {
  const [pageData, setPageData] = useState<CustomProductPage | null>(null);
  const [products, setProducts] = useState<CustomProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<CustomProduct | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [playingStates, setPlayingStates] = useState<Record<number, boolean>>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null); // Track which dropdown is open

  // Load page data from localStorage and listen for updates
  useEffect(() => {
    const loadPageData = () => {
      const saved = localStorage.getItem('cms_custom_product_pages');
      if (saved) {
        const pages: CustomProductPage[] = JSON.parse(saved);
        const page = pages.find(p => p.slug === slug);
        if (page) {
          // Check if page is published, if draft redirect or show error
          if (page.status === 'draft') {
            setPageData(null);
            setProducts([]);
            return;
          }
          setPageData(page);
          setProducts(page.products || []);
        }
      }
    };

    loadPageData();

    // Listen for realtime updates from CMS
    const handleCustomPagesUpdate = (event: any) => {
      const pages: CustomProductPage[] = event.detail || [];
      const page = pages.find(p => p.slug === slug);
      if (page) {
        // Check if page is published
        if (page.status === 'draft') {
          setPageData(null);
          setProducts([]);
          return;
        }
        setPageData(page);
        setProducts(page.products || []);
      }
    };

    window.addEventListener('customProductPagesUpdated', handleCustomPagesUpdate);
    return () => window.removeEventListener('customProductPagesUpdated', handleCustomPagesUpdate);
  }, [slug]);

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  // Reset video index when product changes
  useEffect(() => {
    setCurrentVideoIndex(0);
    setPlayingStates({});
  }, [selectedProduct]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close dropdown if clicking outside
      const target = event.target as HTMLElement;
      if (!target.closest('.relative')) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [openDropdown]);

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?\s]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Toggle play/pause for specific video
  const togglePlayPause = (videoIndex: number) => {
    setPlayingStates(prev => ({
      ...prev,
      [videoIndex]: !prev[videoIndex]
    }));
  };

  // Display only 10 products from the list
  const MAX_DISPLAY = 10;
  const displayedProducts = filteredProducts.slice(0, MAX_DISPLAY);

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setProducts(prev => {
      const newProducts = [...prev];
      const firstProduct = newProducts.shift()!;
      newProducts.push(firstProduct);
      return newProducts;
    });

    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setProducts(prev => {
      const newProducts = [...prev];
      const lastProduct = newProducts.pop()!;
      newProducts.unshift(lastProduct);
      return newProducts;
    });

    setTimeout(() => setIsAnimating(false), 300);
  };

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-12 bg-white rounded-xl shadow-lg max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
            <Package size={40} className="text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Halaman Tidak Tersedia</h2>
          <p className="text-gray-600 mb-6">Halaman produk ini sedang dalam mode draft dan tidak dapat diakses saat ini.</p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-colors"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  if (selectedProduct) {
    // Get current product index
    const currentProductIndex = products.findIndex(p => p.id === selectedProduct?.id);
    
    // Functions to navigate to prev/next product
    const goToPreviousProduct = () => {
      if (currentProductIndex > 0) {
        setSelectedProduct(products[currentProductIndex - 1]);
      } else {
        // Loop to last product
        setSelectedProduct(products[products.length - 1]);
      }
    };
    
    const goToNextProduct = () => {
      if (currentProductIndex < products.length - 1) {
        setSelectedProduct(products[currentProductIndex + 1]);
      } else {
        // Loop to first product
        setSelectedProduct(products[0]);
      }
    };
    
    return (
      <div className="min-h-screen bg-white flex items-center justify-center overflow-hidden">
        <section className="w-full min-h-screen py-12 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col items-center justify-center gap-8">
                <div className="relative w-full max-w-md h-[500px] flex items-center justify-center">
                  {selectedProduct.baseImage ? (
                    <ImageWithFallback
                      src={selectedProduct.baseImage}
                      alt={selectedProduct.name}
                      className="w-full h-full object-contain drop-shadow-2xl"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                          <svg className="w-16 h-16 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-amber-600 font-medium">Gambar Produk</p>
                        <p className="text-sm text-gray-500 mt-1">Akan ditambahkan</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 h-8 bg-black/30 rounded-full blur-2xl"></div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold text-orange-600 mb-4">{selectedProduct.productName}</h1>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <div className="group relative px-6 py-3 rounded-xl shadow-lg overflow-hidden bg-gradient-to-r from-orange-600 to-orange-700 text-white">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-100"></div>
                      <div className="absolute inset-0 rounded-xl border-2 border-orange-500"></div>
                      <div className="relative z-10 flex items-center gap-2">
                        <svg className="w-4 h-4 text-orange-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        <span className="font-semibold tracking-wide text-sm">{pageData.title.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold text-orange-600 mb-3">Deskripsi Produk</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-amber-200">
                  <h3 className="text-xl font-semibold text-orange-600 mb-4">Informasi Produk</h3>
                  <div className="space-y-3">
                    <div className="flex items-start justify-between py-2 border-b border-amber-100">
                      <span className="text-gray-600 font-medium">Nama Produk :</span>
                      <span className="text-orange-600 font-semibold text-right">{selectedProduct.productName}</span>
                    </div>
                    {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                      <div key={key} className="flex items-start justify-between py-2 border-b border-amber-100">
                        <span className="text-gray-600 font-medium capitalize">{key} :</span>
                        <span className="text-orange-600 font-semibold text-right">{value}</span>
                      </div>
                    ))}
                    <div className="flex items-start justify-between py-2">
                      <span className="text-gray-600 font-medium">Hubungi Kami :</span>
                      <a
                        href={`https://wa.me/6285336688356?text=${encodeURIComponent(`Halo, saya ingin bertanya tentang produk ${selectedProduct.productName} PT. Santoso Jaya Tembakau\n\nNama: ...\nAsal: ...\nKebutuhan: ...`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
                        aria-label="Contact via WhatsApp"
                      >
                        <MessageCircle size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                        <span className="font-semibold text-sm">WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Section - Display multiple videos if available */}
            {selectedProduct.videoUrls && selectedProduct.videoUrls.length > 0 && (
              <div className="mt-16">
                <h3 className="text-2xl font-bold text-amber-900 mb-6 text-center">Video Produk</h3>
                <div className={`grid gap-6 ${selectedProduct.videoUrls.length === 1 ? 'grid-cols-1 max-w-4xl mx-auto' : 'grid-cols-1 md:grid-cols-2'}`}>
                  {selectedProduct.videoUrls.map((videoUrl, index) => {
                    const videoId = getYouTubeVideoId(videoUrl);
                    if (!videoId) return null;

                    const isPlaying = playingStates[index] !== false;

                    return (
                      <div key={index} className="relative rounded-2xl overflow-hidden shadow-2xl group">
                        {/* YouTube Video */}
                        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                          <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src={`https://www.youtube.com/embed/${videoId}?${isPlaying ? 'autoplay=1&' : ''}mute=1&loop=1&controls=0&showinfo=0&modestbranding=1&playlist=${videoId}&enablejsapi=1&hd=1&vq=hd1080`}
                            title={`Video ${selectedProduct.productName} ${index + 1}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                          />
                        </div>

                        {/* Play/Pause Button Overlay */}
                        <div className="absolute bottom-4 right-4 z-10">
                          <button
                            onClick={() => togglePlayPause(index)}
                            className="group/btn relative bg-white/20 backdrop-blur-md border border-white/30 p-3 rounded-full hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
                            aria-label={isPlaying ? "Pause video" : "Play video"}
                          >
                            {isPlaying ? (
                              <Pause size={20} className="text-white" />
                            ) : (
                              <Play size={20} className="text-white" />
                            )}
                          </button>
                        </div>

                        {/* Video Number Badge */}
                        {selectedProduct.videoUrls.length > 1 && (
                          <div className="absolute top-4 left-4 z-10">
                            <div className="bg-amber-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                              Video {index + 1}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Navigation Buttons - Centered below product info */}
            <div className="flex items-center justify-center gap-6 mt-12">
              <button
                onClick={goToPreviousProduct}
                className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
                aria-label="Produk Sebelumnya"
              >
                <ChevronLeft size={20} />
                <span className="font-semibold">Sebelumnya</span>
              </button>
              
              <button
                onClick={goToNextProduct}
                className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
                aria-label="Produk Selanjutnya"
              >
                <span className="font-semibold">Selanjutnya</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center overflow-hidden">
      <section className="w-full py-8 px-4">
        <div className="max-w-full mx-auto">
          <div className="flex items-center justify-center gap-2 transition-all duration-300 min-h-[280px]">
            {displayedProducts.length > 0 ? (
              displayedProducts.map((product, index) => (
                <div
                  key={`${product.id}-${index}`}
                  className={`flex-shrink-0 group cursor-pointer transition-opacity duration-500 ${
                    hoveredIndex === null || hoveredIndex === index ? 'opacity-100' : 'opacity-50'
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="w-52 h-72 flex items-center justify-center relative overflow-visible">
                    {/* Gambar Produk Asli - Fade out saat hover */}
                    {product.baseImage ? (
                      <ImageWithFallback
                        src={product.baseImage}
                        alt={product.name}
                        className={`w-full h-full object-contain drop-shadow-xl absolute inset-0 transition-all duration-500 ${
                          hoveredIndex === index ? 'opacity-0' : 'opacity-100'
                        }`}
                      />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center absolute inset-0 transition-all duration-500 ${
                        hoveredIndex === index ? 'opacity-0' : 'opacity-100'
                      }`}>
                        <div className="text-center">
                          <div className="w-24 h-24 mx-auto mb-2 bg-amber-100 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <p className="text-sm text-amber-600 font-medium">Placeholder</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Gambar Hover - Fade in saat hover, menggantikan posisi produk asli */}
                    {product.hoverImage && (
                      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                        hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <ImageWithFallback
                          src={product.hoverImage}
                          alt={product.name}
                          className="w-full h-full object-contain drop-shadow-xl"
                        />
                      </div>
                    )}
                    
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-black/70 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center w-full h-72">
                <p className="text-orange-600 font-bold text-xl tracking-wider">PRODUK TIDAK TERSEDIA</p>
              </div>
            )}
          </div>

          {/* Carousel Navigation Buttons - Always visible like Rokok page */}
          <div className="flex flex-col items-center gap-6 mt-12">
            <div className="flex items-center justify-center gap-8">
              <button
                className="group relative bg-gradient-to-br from-amber-800 to-amber-900 text-white p-4 rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgb(120,53,15,0.4)] hover:scale-110 disabled:hover:scale-100 border border-amber-700/50 hover:border-amber-600"
                onClick={handlePrevious}
                disabled={isAnimating || displayedProducts.length === 0}
                aria-label="Previous products"
              >
                <ChevronLeft size={20} className="relative z-10" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12"></div>
              </button>
              
              <button
                className="group relative bg-gradient-to-br from-amber-800 to-amber-900 text-white p-4 rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgb(120,53,15,0.4)] hover:scale-110 disabled:hover:scale-100 border border-amber-700/50 hover:border-amber-600"
                onClick={handleNext}
                disabled={isAnimating || displayedProducts.length === 0}
                aria-label="Next products"
              >
                <ChevronRight size={20} className="relative z-10" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12"></div>
              </button>
            </div>
            
            {/* Filter Buttons - Show only if hasFilters is enabled */}
            {pageData.hasFilters && pageData.filterCategories && pageData.filterCategories.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className={`group relative px-4 md:px-8 py-3 md:py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden ${
                    selectedCategory === null
                      ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white scale-105'
                      : 'bg-white text-orange-600 hover:scale-105'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 transition-opacity duration-300 ${
                    selectedCategory === null ? 'opacity-100' : 'opacity-0 group-hover:opacity-10'
                  }`}></div>
                  
                  <div className={`absolute inset-0 rounded-xl border-2 transition-colors duration-300 ${
                    selectedCategory === null 
                      ? 'border-amber-500' 
                      : 'border-amber-200 group-hover:border-amber-400'
                  }`}></div>
                  
                  <div className="relative z-10 flex items-center gap-2">
                    <LayoutGrid size={16} className={selectedCategory === null ? 'text-amber-100' : 'text-amber-700'} />
                    <span className="font-semibold tracking-wide text-xs md:text-sm whitespace-nowrap">SEMUA PRODUK</span>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%]"></div>
                </button>
                
                {pageData.filterCategories.map((filterCat) => {
                  // Convert hex color to RGB for gradient
                  const hexToRgb = (hex: string) => {
                    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                    return result ? {
                      r: parseInt(result[1], 16),
                      g: parseInt(result[2], 16),
                      b: parseInt(result[3], 16)
                    } : { r: 249, g: 115, b: 22 }; // Default orange
                  };
                  
                  const rgb = hexToRgb(filterCat.color);
                  
                  // If filter is dropdown type
                  if (filterCat.type === 'dropdown' && filterCat.children && filterCat.children.length > 0) {
                    const isDropdownOpen = openDropdown === filterCat.name;
                    const hasActiveChild = filterCat.children.some(child => selectedCategory === child.name);
                    const isActive = hasActiveChild;
                    
                    return (
                      <div key={filterCat.name} className="relative">
                        <button 
                          onClick={() => setOpenDropdown(isDropdownOpen ? null : filterCat.name)}
                          className={`group relative px-4 md:px-8 py-3 md:py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden ${
                            isActive
                              ? 'text-white scale-105'
                              : 'bg-white hover:scale-105'
                          }`}
                          style={{
                            background: isActive 
                              ? `linear-gradient(to right, rgb(${rgb.r}, ${rgb.g}, ${rgb.b}), rgb(${Math.max(0, rgb.r - 30)}, ${Math.max(0, rgb.g - 30)}, ${Math.max(0, rgb.b - 30)}))`
                              : 'white',
                            color: isActive ? 'white' : filterCat.color
                          }}
                        >
                          <div 
                            className={`absolute inset-0 transition-opacity duration-300 ${
                              isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-10'
                            }`}
                            style={{
                              background: `linear-gradient(to right, rgb(${rgb.r}, ${rgb.g}, ${rgb.b}), rgb(${Math.max(0, rgb.r - 30)}, ${Math.max(0, rgb.g - 30)}, ${Math.max(0, rgb.b - 30)}))`
                            }}
                          ></div>
                          
                          <div 
                            className={`absolute inset-0 rounded-xl border-2 transition-colors duration-300`}
                            style={{
                              borderColor: isActive 
                                ? `rgb(${Math.min(255, rgb.r + 30)}, ${Math.min(255, rgb.g + 30)}, ${Math.min(255, rgb.b + 30)})`
                                : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`
                            }}
                          ></div>
                          
                          <div className="relative z-10 flex items-center gap-2">
                            <Package 
                              size={16} 
                              style={{
                                color: isActive ? 'rgba(255, 255, 255, 0.8)' : filterCat.color
                              }}
                            />
                            <span className="font-semibold tracking-wide text-xs md:text-sm whitespace-nowrap uppercase">{filterCat.label}</span>
                            <ChevronDown 
                              size={16} 
                              className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                              style={{
                                color: isActive ? 'rgba(255, 255, 255, 0.8)' : filterCat.color
                              }}
                            />
                          </div>
                          
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%]"></div>
                        </button>
                        
                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                          <div className="absolute top-full mt-3 left-0 min-w-[240px] bg-white rounded-xl shadow-2xl border-2 overflow-hidden z-50"
                            style={{
                              borderColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)`
                            }}
                          >
                            {filterCat.children.map((child, idx) => {
                              const childRgb = hexToRgb(child.color);
                              const isChildActive = selectedCategory === child.name;
                              
                              return (
                                <button
                                  key={child.name}
                                  onClick={() => {
                                    setSelectedCategory(isChildActive ? null : child.name);
                                    setOpenDropdown(null);
                                  }}
                                  className={`w-full px-5 py-3.5 text-left transition-all duration-200 flex items-center gap-3 group ${
                                    idx !== filterCat.children.length - 1 ? 'border-b border-gray-100' : ''
                                  }`}
                                  style={{
                                    backgroundColor: isChildActive 
                                      ? `rgba(${childRgb.r}, ${childRgb.g}, ${childRgb.b}, 0.12)` 
                                      : 'white',
                                  }}
                                  onMouseEnter={(e) => {
                                    if (!isChildActive) {
                                      e.currentTarget.style.backgroundColor = `rgba(${childRgb.r}, ${childRgb.g}, ${childRgb.b}, 0.06)`;
                                    }
                                  }}
                                  onMouseLeave={(e) => {
                                    if (!isChildActive) {
                                      e.currentTarget.style.backgroundColor = 'white';
                                    }
                                  }}
                                >
                                  <div 
                                    className={`w-4 h-4 rounded-full flex-shrink-0 transition-all duration-200 ${
                                      isChildActive ? 'ring-2 ring-offset-2' : ''
                                    }`}
                                    style={{
                                      backgroundColor: child.color,
                                      ringColor: child.color
                                    }}
                                  />
                                  <span 
                                    className="font-semibold text-sm uppercase tracking-wide flex-1"
                                    style={{
                                      color: isChildActive ? child.color : '#4B5563'
                                    }}
                                  >
                                    {child.label}
                                  </span>
                                  {isChildActive && (
                                    <svg 
                                      className="w-5 h-5 ml-auto transition-transform duration-200 group-hover:scale-110" 
                                      fill="currentColor" 
                                      viewBox="0 0 20 20"
                                      style={{ color: child.color }}
                                    >
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }
                  
                  // If filter is single type (default)
                  const isActive = selectedCategory === filterCat.name;
                  
                  return (
                    <button 
                      key={filterCat.name}
                      onClick={() => setSelectedCategory(selectedCategory === filterCat.name ? null : filterCat.name)}
                      className={`group relative px-4 md:px-8 py-3 md:py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden ${
                        isActive
                          ? 'text-white scale-105'
                          : 'bg-white hover:scale-105'
                      }`}
                      style={{
                        background: isActive 
                          ? `linear-gradient(to right, rgb(${rgb.r}, ${rgb.g}, ${rgb.b}), rgb(${Math.max(0, rgb.r - 30)}, ${Math.max(0, rgb.g - 30)}, ${Math.max(0, rgb.b - 30)}))`
                          : 'white',
                        color: isActive ? 'white' : filterCat.color
                      }}
                    >
                      <div 
                        className={`absolute inset-0 transition-opacity duration-300 ${
                          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-10'
                        }`}
                        style={{
                          background: `linear-gradient(to right, rgb(${rgb.r}, ${rgb.g}, ${rgb.b}), rgb(${Math.max(0, rgb.r - 30)}, ${Math.max(0, rgb.g - 30)}, ${Math.max(0, rgb.b - 30)}))`
                        }}
                      ></div>
                      
                      <div 
                        className={`absolute inset-0 rounded-xl border-2 transition-colors duration-300`}
                        style={{
                          borderColor: isActive 
                            ? `rgb(${Math.min(255, rgb.r + 30)}, ${Math.min(255, rgb.g + 30)}, ${Math.min(255, rgb.b + 30)})`
                            : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`
                        }}
                      ></div>
                      
                      <div className="relative z-10 flex items-center gap-2">
                        <Package 
                          size={16} 
                          style={{
                            color: isActive ? 'rgba(255, 255, 255, 0.8)' : filterCat.color
                          }}
                        />
                        <span className="font-semibold tracking-wide text-xs md:text-sm whitespace-nowrap uppercase">{filterCat.label}</span>
                      </div>
                      
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%]"></div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Page Description - Display below filter buttons like TSC/TSG pages */}
          <div className="text-center mt-8">
            <h2 className="text-3xl font-bold text-amber-900 mb-2">{pageData.title}</h2>
            <p className="text-gray-600">{pageData.description}</p>
          </div>
        </div>
      </section>
    </div>
  );
}