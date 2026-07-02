import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

type TembakauProduct = {
  name: string;
  baseImage: string;
};

export function TembakauTSGPreview() {
  const initialProducts: TembakauProduct[] = [
    {
      name: 'TSG BOLD',
      baseImage: '/PRODUK%20TEMBAKAU%20TSG/TSG%20BOLD.png',
    },
    {
      name: 'TSG KRETEK',
      baseImage: '/PRODUK%20TEMBAKAU%20TSG/TSG%20KRETEK.png',
    },
    {
      name: 'TSG MILD',
      baseImage: '/PRODUK%20TEMBAKAU%20TSG/TSG%20MILD.png',
    },
    {
      name: 'TSG PUTIHAN',
      baseImage: '/PRODUK%20TEMBAKAU%20TSG/TSG%20PUTIHAN.png',
    },
    {
      name: 'TSG REGULER',
      baseImage: '/PRODUK%20TEMBAKAU%20TSG/TSG%20REGULER.png',
    },
    {
      name: 'TSG UPON REQUEST',
      baseImage: '/PRODUK%20TEMBAKAU%20TSG/TSG%20UPON%20REQUEST.png',
    },
    {
      name: 'TSG BOLD',
      baseImage: '/PRODUK%20TEMBAKAU%20TSG/TSG%20BOLD.png',
    },
    {
      name: 'TSG KRETEK',
      baseImage: '/PRODUK%20TEMBAKAU%20TSG/TSG%20KRETEK.png',
    },
    {
      name: 'TSG MILD',
      baseImage: '/PRODUK%20TEMBAKAU%20TSG/TSG%20MILD.png',
    },
    {
      name: 'TSG PUTIHAN',
      baseImage: '/PRODUK%20TEMBAKAU%20TSG/TSG%20PUTIHAN.png',
    },
    {
      name: 'TSG REGULER',
      baseImage: '/PRODUK%20TEMBAKAU%20TSG/TSG%20REGULER.png',
    },
    {
      name: 'TSG UPON REQUEST',
      baseImage: '/PRODUK%20TEMBAKAU%20TSG/TSG%20UPON%20REQUEST.png',
    },
  ];

  const [products] = useState<TembakauProduct[]>(initialProducts);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getDisplayedProducts = () => {
    const displayCount = isMobile ? 3 : 5; // 3 untuk mobile, 5 untuk desktop
    const displayed = [];
    const centerIndex = Math.floor(displayCount / 2);
    
    for (let i = 0; i < displayCount; i++) {
      const productIndex = (currentIndex - centerIndex + i + products.length) % products.length;
      displayed.push({
        product: products[productIndex],
        originalIndex: productIndex,
        displayIndex: i
      });
    }
    
    return displayed;
  };

  const getScaleForIndex = (displayIndex: number, isMobile: boolean) => {
    const centerIndex = isMobile ? 1 : 2; // Center berbeda untuk mobile vs desktop
    const distance = Math.abs(displayIndex - centerIndex);
    
    if (isMobile) {
      if (distance === 0) return 'scale-110';
      return 'scale-75';
    } else {
      if (distance === 0) return 'scale-110';
      if (distance === 1) return 'scale-85';
      return 'scale-65';
    }
  };

  const getZIndexForIndex = (displayIndex: number, isMobile: boolean) => {
    const centerIndex = isMobile ? 1 : 2;
    const distance = Math.abs(displayIndex - centerIndex);
    return 50 - distance * 10;
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % products.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const displayedProducts = getDisplayedProducts();

  return (
    <div className="w-full overflow-hidden">
      <div className="flex items-center justify-center gap-1 transition-all duration-300 min-h-[100px]">
        {displayedProducts.map(({ product, displayIndex }) => (
          <div
            key={`${product.name}-${displayIndex}`}
            className="flex-shrink-0 group"
            onMouseEnter={() => setHoveredIndex(displayIndex)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="w-20 h-20 flex items-center justify-center relative">
              {product.baseImage ? (
                <ImageWithFallback
                  src={product.baseImage}
                  alt={product.name}
                  className={`w-full h-full object-contain drop-shadow-lg relative z-10 transition-all duration-300 ${
                    hoveredIndex === null || hoveredIndex === displayIndex ? 'opacity-100' : 'opacity-50'
                  } ${getScaleForIndex(displayIndex, isMobile)}`}
                  style={{ zIndex: getZIndexForIndex(displayIndex, isMobile) }}
                />
              ) : (
                <div className={`w-full h-full flex items-center justify-center transition-all duration-300 ${
                  hoveredIndex === null || hoveredIndex === displayIndex ? 'opacity-100' : 'opacity-50'
                } ${getScaleForIndex(displayIndex, isMobile)}`}>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-1 bg-amber-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-10 h-2 bg-black/50 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-center gap-3 mt-3">
        <button
          className="group relative bg-gradient-to-br from-amber-700 to-amber-800 text-white p-2 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg hover:scale-105 disabled:hover:scale-100"
          onClick={handlePrevious}
          disabled={isAnimating}
          aria-label="Previous products"
        >
          <ChevronLeft size={14} className="relative z-10" />
        </button>
        
        <button
          className="group relative bg-gradient-to-br from-amber-700 to-amber-800 text-white p-2 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg hover:scale-105 disabled:hover:scale-100"
          onClick={handleNext}
          disabled={isAnimating}
          aria-label="Next products"
        >
          <ChevronRight size={14} className="relative z-10" />
        </button>
      </div>
    </div>
  );
}

