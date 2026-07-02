import { useState, useRef, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MessageCircle, Cigarette, LayoutGrid, ChevronLeft, ChevronRight, Play, Pause, ArrowLeft, ChevronDown } from 'lucide-react';

type TembakauProduct = {
  name: string;
  baseImage: string;
  hoverImage?: string;
  description: string;
  productName: string;
  jenis: string;
  berat: string;
  kemasan: string;
  kualitas: string;
  asal: string;
  produksi: string;
  distribusi: string;
  minimalOrder?: string;
  category: 'tangan' | 'mesin';
  filterCategory?: string;
  videoUrls?: string[]; // Array of YouTube video URLs
  backgroundImage?: string; // Optional background image URL
};

type TembakauPageProps = {
  products: TembakauProduct[];
  title: string;
  description: string;
  filterCategories?: {
    name: string;
    label: string;
    color: string;
    type?: 'single' | 'dropdown';
    children?: { name: string; label: string; color: string }[];
  }[];
};

export function TembakauPage({ products: initialProducts, title, description, filterCategories }: TembakauPageProps) {
  const [selectedFilterCategory, setSelectedFilterCategory] = useState<string | null>(null);
  const [expandedDropdowns, setExpandedDropdowns] = useState<{ [key: string]: boolean }>({});
  const [selectedProduct, setSelectedProduct] = useState<TembakauProduct | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [playingStates, setPlayingStates] = useState<Record<number, boolean>>({});
  
  // Filter products based on selected filter category - compute on each render
  const filteredProducts = initialProducts.filter(p => {
    if (selectedFilterCategory === null) {
      return true; // Show all products
    }
    return p.filterCategory === selectedFilterCategory;
  });
  
  const [products, setProducts] = useState<TembakauProduct[]>(filteredProducts);
  
  // Update products when filter changes
  useEffect(() => {
    setProducts(filteredProducts);
  }, [selectedFilterCategory, initialProducts]);
  
  // Reset video index when product changes
  useEffect(() => {
    setCurrentVideoIndex(0);
    setPlayingStates({});
  }, [selectedProduct]);

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
  const displayedProducts = products.slice(0, MAX_DISPLAY);

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

  // Debug: log products to verify data
  console.log('TembakauPage - Products:', products);
  console.log('TembakauPage - Title:', title);
  console.log('TembakauPage - Displayed Products (10 max):', displayedProducts);

  if (selectedProduct) {
    // Get current product index
    const currentProductIndex = initialProducts.findIndex(p => p.name === selectedProduct?.name);
    
    // Functions to navigate to prev/next product
    const goToPreviousProduct = () => {
      if (currentProductIndex > 0) {
        setSelectedProduct(initialProducts[currentProductIndex - 1]);
      } else {
        // Loop to last product
        setSelectedProduct(initialProducts[initialProducts.length - 1]);
      }
    };
    
    const goToNextProduct = () => {
      if (currentProductIndex < initialProducts.length - 1) {
        setSelectedProduct(initialProducts[currentProductIndex + 1]);
      } else {
        // Loop to first product
        setSelectedProduct(initialProducts[0]);
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
                  <h1 className="text-4xl font-bold text-amber-900 mb-4">{selectedProduct.productName}</h1>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <div className="group relative px-6 py-3 rounded-xl shadow-lg overflow-hidden bg-gradient-to-r from-green-600 to-green-700 text-white">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 opacity-100"></div>
                      <div className="absolute inset-0 rounded-xl border-2 border-green-500"></div>
                      <div className="relative z-10 flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        <span className="font-semibold tracking-wide text-sm">TEMBAKAU BERKUALITAS</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold text-amber-900 mb-3">Deskripsi Produk</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-amber-200">
                  <h3 className="text-xl font-semibold text-amber-900 mb-4">Informasi Produk</h3>
                  <div className="space-y-3">
                    <div className="flex items-start justify-between py-2 border-b border-amber-100">
                      <span className="text-gray-600 font-medium">Nama Produk :</span>
                      <span className="text-amber-900 font-semibold text-right">{selectedProduct.productName}</span>
                    </div>
                    <div className="flex items-start justify-between py-2 border-b border-amber-100">
                      <span className="text-gray-600 font-medium">Jenis :</span>
                      <span className="text-amber-900 font-semibold text-right">{selectedProduct.jenis}</span>
                    </div>
                    <div className="flex items-start justify-between py-2 border-b border-amber-100">
                      <span className="text-gray-600 font-medium">Berat :</span>
                      <span className="text-amber-900 font-semibold text-right">{selectedProduct.berat}</span>
                    </div>
                    <div className="flex items-start justify-between py-2 border-b border-amber-100">
                      <span className="text-gray-600 font-medium">Kemasan :</span>
                      <span className="text-amber-900 font-semibold text-right">{selectedProduct.kemasan}</span>
                    </div>
                    <div className="flex items-start justify-between py-2 border-b border-amber-100">
                      <span className="text-gray-600 font-medium">Kualitas :</span>
                      <span className="text-amber-900 font-semibold text-right">{selectedProduct.kualitas}</span>
                    </div>
                    <div className="flex items-start justify-between py-2 border-b border-amber-100">
                      <span className="text-gray-600 font-medium">Minimal Order :</span>
                      <span className="text-amber-900 font-semibold text-right">{selectedProduct.minimalOrder}</span>
                    </div>
                    <div className="flex items-start justify-between py-2 border-b border-amber-100">
                      <span className="text-gray-600 font-medium">Produksi :</span>
                      <span className="text-amber-900 font-semibold text-right">{selectedProduct.produksi}</span>
                    </div>
                    <div className="flex items-start justify-between py-2">
                      <span className="text-gray-600 font-medium">Distribusi :</span>
                      <a
                        href={`https://wa.me/6285336688356?text=${encodeURIComponent(`Halo, saya ingin bertanya tentang produk ${selectedProduct.jenis} ${selectedProduct.name} PT. Santoso Jaya Tembakau\\n\\nNama: ...\\nAsal: ...\\nKebutuhan: ...`)}`}
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

                    const isPlaying = playingStates[index] !== false; // Default to playing (true)

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

            {/* Background Image Section - Display if available */}
            {selectedProduct.backgroundImage && (
              <div className="mt-16 flex justify-center">
                <div className="w-full max-w-4xl">
                  <ImageWithFallback
                    src={selectedProduct.backgroundImage}
                    alt={`Latar Belakang ${selectedProduct.name}`}
                    className="w-full h-auto object-cover rounded-xl shadow-lg"
                  />
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
                  key={`${product.name}-${index}`}
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
                    
                    {/* Gambar Tembakau Rajang - Fade in saat hover, menggantikan posisi produk asli */}
                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                      hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <ImageWithFallback
                        src={product.hoverImage || "/Tembakau%20Rajang.png"}
                        alt={product.hoverImage ? product.name : "Tembakau Rajang"}
                        className="w-full h-full object-contain drop-shadow-xl"
                      />
                    </div>
                    
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-black/70 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center w-full h-72">
                <p className="text-amber-900 font-bold text-xl tracking-wider">PRODUK TIDAK TERSEDIA</p>
              </div>
            )}
          </div>
          
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
            
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
              {/* All Products Button */}
              <button 
                onClick={() => setSelectedFilterCategory(null)}
                className={`group relative px-4 md:px-8 py-3 md:py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden ${
                  selectedFilterCategory === null
                    ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white scale-105'
                    : 'bg-white text-orange-600 hover:scale-105'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 transition-opacity duration-300 ${
                  selectedFilterCategory === null ? 'opacity-100' : 'opacity-0 group-hover:opacity-10'
                }`}></div>
                
                <div className={`absolute inset-0 rounded-xl border-2 transition-colors duration-300 ${
                  selectedFilterCategory === null 
                    ? 'border-amber-500' 
                    : 'border-amber-200 group-hover:border-amber-400'
                }`}></div>
                
                <div className="relative z-10 flex items-center gap-2">
                  <LayoutGrid size={16} className={selectedFilterCategory === null ? 'text-amber-100' : 'text-amber-700'} />
                  <span className="font-semibold tracking-wide text-xs md:text-sm whitespace-nowrap">SEMUA PRODUK</span>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%]"></div>
              </button>
              
              {/* Dynamic Filter Categories from CMS */}
              {filterCategories && filterCategories.map((cat: any) => {
                // Single Filter Button
                if (!cat.type || cat.type === 'single') {
                  const isSelected = selectedFilterCategory === cat.name;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedFilterCategory(isSelected ? null : cat.name)}
                      className={`group relative px-4 md:px-8 py-3 md:py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden ${
                        isSelected ? 'text-white scale-105' : 'bg-white hover:scale-105'
                      }`}
                      style={{
                        background: isSelected ? `linear-gradient(to right, ${cat.color}, ${cat.color}dd)` : undefined,
                        color: !isSelected ? cat.color : undefined
                      }}
                    >
                      <div 
                        className={`absolute inset-0 transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-10'}`}
                        style={{ background: `linear-gradient(to right, ${cat.color}, ${cat.color}dd)` }}
                      ></div>
                      
                      <div 
                        className={`absolute inset-0 rounded-xl border-2 transition-colors duration-300`}
                        style={{
                          borderColor: isSelected ? cat.color : '#fed7aa',
                        }}
                      ></div>
                      
                      <div className="relative z-10 flex items-center gap-2">
                        <Cigarette size={16} style={{ color: isSelected ? '#fef3c7' : cat.color }} />
                        <span className="font-semibold tracking-wide text-xs md:text-sm whitespace-nowrap">{cat.label}</span>
                      </div>
                      
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%]"></div>
                    </button>
                  );
                }
                
                // Dropdown Filter
                if (cat.type === 'dropdown') {
                  const isExpanded = expandedDropdowns[cat.name] || false;
                  const selectedChild = cat.children?.find((child: any) => child.name === selectedFilterCategory);
                  
                  return (
                    <div key={cat.name} className="relative w-full md:w-auto">
                      <button
                        onClick={() => setExpandedDropdowns({ ...expandedDropdowns, [cat.name]: !isExpanded })}
                        className="w-full md:w-auto flex items-center gap-3 px-4 md:px-5 py-3 md:py-3.5 bg-white border-2 rounded-xl hover:border-slate-400 transition-all duration-200 md:min-w-[200px]"
                        style={{ borderColor: cat.color }}
                      >
                        <div 
                          className="w-4 h-4 rounded-full border-2 shadow-md"
                          style={{ 
                            backgroundColor: cat.color, 
                            borderColor: cat.color,
                            boxShadow: `0 2px 8px ${cat.color}40`
                          }}
                        ></div>
                        <span className="text-sm font-bold text-gray-800 uppercase tracking-wide flex-1 text-left">
                          {selectedChild ? selectedChild.label : cat.label}
                        </span>
                        <ChevronDown 
                          size={16} 
                          className={`text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {isExpanded && (
                        <div className="absolute top-full left-0 w-full bg-white border-2 border-gray-200 rounded-b-xl shadow-xl mt-1 overflow-hidden z-50">
                          {cat.children?.map((child: any) => {
                            const isChildSelected = selectedFilterCategory === child.name;
                            return (
                              <button
                                key={child.name}
                                onClick={() => {
                                  setSelectedFilterCategory(child.name);
                                  setExpandedDropdowns({ ...expandedDropdowns, [cat.name]: false });
                                }}
                                className={`w-full px-5 py-3 text-left transition-all duration-150 ${
                                  isChildSelected 
                                    ? 'text-white font-semibold' 
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                                style={{
                                  backgroundColor: isChildSelected ? child.color : undefined
                                }}
                              >
                                {child.label.toUpperCase()}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }
                
                return null;
              })}
            </div>
          </div>

          <div className="text-center mt-8">
            <h2 className="text-3xl font-bold text-amber-900 mb-2">{title}</h2>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
