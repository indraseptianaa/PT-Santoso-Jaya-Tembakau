import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

type Product = {
  name: string;
  baseImage: string;
};

export function ProductPreview() {
  const initialProducts: Product[] = [
    {
      name: '358 16 Batang',
      baseImage: '/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/358%2016%20BATANG',
    },
    {
      name: 'Sosrobahu Premium 16 Batang',
      baseImage: '/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/SOSROBAHU%20PREMIUM%2016%20BATANG',
    },
    {
      name: 'Bahamas 12 Batang',
      baseImage: '/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/BAHAMAS%2012%20BATANG',
    },
    {
      name: 'Sosrobahu Santos Filter 12 Batang',
      baseImage: '/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/SOSROBAHU%20SANTOS%20FILTER%2012%20BATANG',
    },
    {
      name: '358 12 Batang',
      baseImage: '/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/358%2012%20BATANG',
    },
    {
      name: 'Bahamas 20 Batang',
      baseImage: '/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/BAHAMAS%2020%20BATANG',
    },
    {
      name: 'Santos Bahamas Filter 12 Batang',
      baseImage: '/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/SANTOS%20BAHAMAS%20FILTER%2012%20BATANG',
    },
    {
      name: 'Kupu Biru 16 Batang',
      baseImage: '/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/KUPU%20BIRU%2016%20BATANG',
    },
    {
      name: 'Sosrobahu Kopi Hitam 12 Batang',
      baseImage: '/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/SOSROBAHU%20KOPI%20HITAM%2012%20BATANG',
    },
    {
      name: 'Sosrobahu 12 Batang',
      baseImage: '/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/SOSROBAHU%2012%20BATANG',
    },
  ];

  const [products] = useState<Product[]>(initialProducts);
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

  const getImageUrl = (baseImage: string, index: number) => {
    const orientation = index < Math.ceil(products.length / 2) ? 'KANAN' : 'KIRI';
    return `${baseImage}%20${orientation}.png`;
  };

  const getDisplayedProducts = () => {
    const displayCount = isMobile ? 5 : 7; // 5 untuk mobile, 7 untuk desktop
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
    const centerIndex = isMobile ? 2 : 3; // Center berbeda untuk mobile vs desktop
    const distance = Math.abs(displayIndex - centerIndex);
    
    if (isMobile) {
      if (distance === 0) return 'scale-125';
      if (distance === 1) return 'scale-90';
      return 'scale-70';
    } else {
      if (distance === 0) return 'scale-110';
      if (distance === 1) return 'scale-90';
      if (distance === 2) return 'scale-75';
      return 'scale-60';
    }
  };

  const getZIndexForIndex = (displayIndex: number, isMobile: boolean) => {
    const centerIndex = isMobile ? 2 : 3;
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
      <div className="flex items-center justify-center gap-0.5 transition-all duration-300 min-h-[100px]">
        {displayedProducts.map(({ product, displayIndex }) => (
          <div
            key={`${product.name}-${displayIndex}`}
            className="flex-shrink-0 group"
            onMouseEnter={() => setHoveredIndex(displayIndex)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="w-14 h-20 flex items-center justify-center relative">
              <ImageWithFallback
                src={getImageUrl(product.baseImage, displayIndex)}
                alt={product.name}
                className={`w-full h-full object-contain drop-shadow-lg relative z-10 transition-all duration-300 ${
                  hoveredIndex === null || hoveredIndex === displayIndex ? 'opacity-100' : 'opacity-50'
                } ${getScaleForIndex(displayIndex, isMobile)}`}
                style={{ zIndex: getZIndexForIndex(displayIndex, isMobile) }}
              />
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
