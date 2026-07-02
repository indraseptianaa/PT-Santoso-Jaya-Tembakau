import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Edit2, X, Image as ImageIcon, FileText, Layout, Package, Users, MessageSquare, ArrowLeft, Video, Type, MousePointer } from 'lucide-react';
import { RokokProductSection, TembakauSection, CustomProductPageSection } from './ProductSections';
import { addActivity } from '../utils/analytics';
import { CustomProductPageForm } from './CustomProductPageForm';
import { DefaultProductPageForm } from './DefaultProductPageForm';

interface LandingPageContent {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  videoUrl: string;
  backgroundImage: string;
  // Products Section
  productsTitle: string;
  productsSubtitle: string;
  // Why Choose Us Section
  whyChooseUsImage: string;
  // CTA Section
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButtonText: string;
  ctaBackgroundImage: string;
}

interface AboutContent {
  title: string;
  description: string;
  mission: string;
  vision: string;
  values: string[];
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  gradient: string;
}

interface Product {
  id: string;
  name: string;
  productName: string;
  description: string;
  baseImage: string;
  additionalImage?: string;
  category: 'mesin' | 'tangan';
  market: 'domestik' | 'internasional';
  isi: string;
  jenis: string;
  kemasan: string;
  filter: string;
  kadar: string;
  bahan: string;
  produksi: string;
  minOrder?: string;
  filterCategory?: string;
  specifications?: { [key: string]: string };
}

interface TembakauProduct {
  id: string;
  name: string;
  productName: string;
  description: string;
  baseImage: string;
  jenis: string;
  berat: string;
  kemasan: string;
  kualitas: string;
  minimalOrder: string;
  specifications?: { [key: string]: string };
  filterCategory?: string;
}

interface CustomProductPage {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  hasFilters: boolean;
  filterCategories?: { name: string; label: string; color: string }[];
  products: CustomProduct[];
  status: 'published' | 'draft';
  pageViews: number;
}

interface CustomProduct {
  id: string;
  name: string;
  baseImage: string;
  hoverImage?: string;
  description: string;
  productName: string;
  specifications: { [key: string]: string };
  videoUrls?: string[];
  category?: string;
}

type CMSSection = 'landing' | 'about' | 'blog' | 'products';
type LandingSubSection = 'overview' | 'hero' | 'products' | 'whychoose' | 'cta';

interface CMSPanelProps {
  activeSection: CMSSection;
}

export function CMSPanel({ activeSection }: CMSPanelProps) {
  const [landingSubSection, setLandingSubSection] = useState<LandingSubSection>('overview');
  
  const [landingContent, setLandingContent] = useState<LandingPageContent>({
    heroTitle: 'PT. Santoso Jaya Tembakau',
    heroSubtitle: 'Kualitas Terbaik dari Tembakau Indonesia',
    heroDescription: 'Produsen rokok berkualitas tinggi dengan tradisi dan inovasi',
    videoUrl: 'https://www.youtube.com/embed/B1sOXFuWyug?si=h1v4a_5C-trPLIDG',
    backgroundImage: '',
    productsTitle: 'Produk Kami',
    productsSubtitle: 'Berbagai pilihan produk berkualitas tinggi',
    whyChooseUsImage: 'https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Landing%20Page%20Section%20Siapa%20Kami.png?raw=true',
    ctaTitle: 'Bergabunglah Bersama Kami',
    ctaSubtitle: 'Mari menjadi bagian dari keluarga besar PT. Santoso Jaya Tembakau',
    ctaButtonText: 'Lihat Lowongan',
    ctaBackgroundImage: 'https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Landing%20Page%20Section%20Join%20Us.png?raw=true'
  });

  const [aboutContent, setAboutContent] = useState<AboutContent>({
    title: 'Tentang PT. Santoso Jaya Tembakau',
    description: 'Perusahaan produsen rokok terpercaya di Indonesia dengan pengalaman puluhan tahun.',
    mission: 'Menghasilkan produk rokok berkualitas tinggi yang memenuhi standar internasional.',
    vision: 'Menjadi produsen rokok terkemuka di Indonesia dan Asia Tenggara.',
    values: ['Kualitas', 'Inovasi', 'Integritas', 'Kepuasan Pelanggan'],
  });

  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [tembakauTSC, setTembakauTSC] = useState<TembakauProduct[]>([]);
  const [tembakauTSG, setTembakauTSG] = useState<TembakauProduct[]>([]);
  const [customProductPages, setCustomProductPages] = useState<CustomProductPage[]>([]);
  
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingTembakauTSC, setEditingTembakauTSC] = useState<TembakauProduct | null>(null);
  const [editingTembakauTSG, setEditingTembakauTSG] = useState<TembakauProduct | null>(null);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showTSCForm, setShowTSCForm] = useState(false);
  const [showTSGForm, setShowTSGForm] = useState(false);
  const [editingCustomPage, setEditingCustomPage] = useState<CustomProductPage | null>(null);
  const [editingCustomPageForPageSettings, setEditingCustomPageForPageSettings] = useState<CustomProductPage | null>(null);
  const [selectedProductCategory, setSelectedProductCategory] = useState<'overview' | 'rokok' | 'tsc' | 'tsg' | string>('overview');
  
  // Default Product Pages State
  const [defaultPages, setDefaultPages] = useState({
    rokok: {
      title: 'Rokok Products',
      description: 'Kelola produk rokok SKM dan SKT',
      status: 'published' as 'published' | 'draft',
      pageViews: 0,
      hasFilters: false,
      filterCategories: [] as { name: string; label: string; color: string }[]
    },
    tsc: {
      title: 'Tembakau TSC (Tembakau Siap Campur)',
      description: 'Kelola produk Tembakau Siap Campur',
      status: 'published' as 'published' | 'draft',
      pageViews: 0,
      hasFilters: false,
      filterCategories: [] as { name: string; label: string; color: string }[]
    },
    tsg: {
      title: 'Tembakau TSG (Tembakau Siap Giling)',
      description: 'Kelola produk Tembakau Siap Giling',
      status: 'published' as 'published' | 'draft',
      pageViews: 0,
      hasFilters: false,
      filterCategories: [] as { name: string; label: string; color: string }[]
    }
  });
  const [editingDefaultPageType, setEditingDefaultPageType] = useState<'rokok' | 'tsc' | 'tsg' | null>(null);

  // Load content from localStorage on mount
  useEffect(() => {
    const savedLanding = localStorage.getItem('cms_landing');
    const savedAbout = localStorage.getItem('cms_about');
    const savedBlogs = localStorage.getItem('cms_blogs');
    const savedProducts = localStorage.getItem('cms_products');
    const savedTSC = localStorage.getItem('cms_tembakau_tsc');
    const savedTSG = localStorage.getItem('cms_tembakau_tsg');
    const savedCustomPages = localStorage.getItem('cms_custom_product_pages');
    const savedDefaultPages = localStorage.getItem('cms_default_product_pages');

    if (savedLanding) setLandingContent(JSON.parse(savedLanding));
    if (savedAbout) setAboutContent(JSON.parse(savedAbout));
    if (savedBlogs) setBlogs(JSON.parse(savedBlogs));
    
    // Migrate products with backgroundImage field
    if (savedProducts) {
      const parsedProducts = JSON.parse(savedProducts);
      
      // Background image mapping for existing products
      const backgroundImageMap: { [key: string]: string } = {
        '358 16 Batang': 'https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Design%20Produk/Latar%20Belakang%20WEB%20358.jpg?raw=true',
        'Sosrobahu Premium 16 Batang': 'https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Design%20Produk/Latar%20belakang%20web%20sosrobahu%20premium.jpg?raw=true',
        'Bahamas 12 Batang': 'https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Design%20Produk/Latar%20belakang%20web%20bahamas%2012%20batang.jpg?raw=true',
        'Sosrobahu Santos 12 Batang': 'https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Design%20Produk/Latar%20belakang%20web%20sosrobahu%20santos%2012%20batang.jpg?raw=true',
        'Santos 12 Batang': 'https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Design%20Produk/Latar%20belakang%20web%20santos%2012%20batang.jpg?raw=true',
        'Krisdayanti 12 Batang': 'https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Design%20Produk/Latar%20belakang%20web%20krisdayanti%2012%20batang.jpg?raw=true',
        'Murai 12 Batang': 'https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Design%20Produk/Latar%20belakang%20web%20murai%2012%20batang.jpg?raw=true',
        'Murai': 'https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Design%20Produk/Latar%20belakang%20web%20murai%2016%20batang.jpg?raw=true',
      };
      
      // Migrate products by adding backgroundImage and videoUrls if not exists
      const migratedProducts = parsedProducts.map((product: any) => {
        const updates: any = {};
        
        // Add backgroundImage if not exists
        if (!product.backgroundImage && backgroundImageMap[product.name]) {
          updates.backgroundImage = backgroundImageMap[product.name];
        }
        
        // Add videoUrls array if not exists
        if (!product.videoUrls) {
          updates.videoUrls = [];
        }
        
        // Return product with updates
        return Object.keys(updates).length > 0 
          ? { ...product, ...updates }
          : product;
      });
      
      setProducts(migratedProducts);
      
      // Save migrated data back to localStorage
      localStorage.setItem('cms_products', JSON.stringify(migratedProducts));
    }
    
    // Migrate TSC products
    if (savedTSC) {
      const parsedTSC = JSON.parse(savedTSC);
      const migratedTSC = parsedTSC.map((product: any) => {
        if (!product.videoUrls) {
          return { ...product, videoUrls: [] };
        }
        return product;
      });
      setTembakauTSC(migratedTSC);
      localStorage.setItem('cms_tembakau_tsc', JSON.stringify(migratedTSC));
    }
    
    // Migrate TSG products
    if (savedTSG) {
      const parsedTSG = JSON.parse(savedTSG);
      const migratedTSG = parsedTSG.map((product: any) => {
        if (!product.videoUrls) {
          return { ...product, videoUrls: [] };
        }
        return product;
      });
      setTembakauTSG(migratedTSG);
      localStorage.setItem('cms_tembakau_tsg', JSON.stringify(migratedTSG));
    }
    if (savedCustomPages) setCustomProductPages(JSON.parse(savedCustomPages));
    if (savedDefaultPages) setDefaultPages(JSON.parse(savedDefaultPages));
  }, []);

  const saveLandingContent = () => {
    localStorage.setItem('cms_landing', JSON.stringify(landingContent));
    
    // Add activity tracking
    addActivity({
      id: Date.now().toString(),
      type: 'update',
      message: 'Landing page content diperbarui',
      timestamp: Date.now(),
    });
  };

  const saveAboutContent = () => {
    localStorage.setItem('cms_about', JSON.stringify(aboutContent));
    
    // Add activity tracking
    addActivity({
      id: Date.now().toString(),
      type: 'update',
      message: 'Halaman Tentang Kami diperbarui',
      timestamp: Date.now(),
    });
  };

  const saveBlog = (blog: BlogPost) => {
    let updatedBlogs;
    const isEditing = editingBlog;
    if (isEditing) {
      updatedBlogs = blogs.map(b => b.id === blog.id ? blog : b);
    } else {
      updatedBlogs = [...blogs, { ...blog, id: Date.now().toString() }];
    }
    setBlogs(updatedBlogs);
    localStorage.setItem('cms_blogs', JSON.stringify(updatedBlogs));
    
    // Add activity tracking
    addActivity({
      id: Date.now().toString(),
      type: 'blog',
      message: isEditing ? `Blog "${blog.title}" diperbarui` : `Blog baru "${blog.title}" ditambahkan`,
      timestamp: Date.now(),
    });
    
    setShowBlogForm(false);
    setEditingBlog(null);
  };

  const deleteBlog = (id: string) => {
    if (confirm('Are you sure you want to delete this blog?')) {
      const blogToDelete = blogs.find(b => b.id === id);
      const updatedBlogs = blogs.filter(b => b.id !== id);
      setBlogs(updatedBlogs);
      localStorage.setItem('cms_blogs', JSON.stringify(updatedBlogs));
      
      // Add activity tracking
      if (blogToDelete) {
        addActivity({
          id: Date.now().toString(),
          type: 'blog',
          message: `Blog "${blogToDelete.title}" dihapus`,
          timestamp: Date.now(),
        });
      }
    }
  };

  const saveProduct = (product: Product) => {
    console.log('CMSPanel - saveProduct called with:', product);
    console.log('CMSPanel - videoUrls:', product.videoUrls);
    
    let updatedProducts;
    const isEditing = editingProduct;
    if (isEditing) {
      updatedProducts = products.map(p => p.id === product.id ? product : p);
    } else {
      updatedProducts = [...products, { ...product, id: Date.now().toString() }];
    }
    setProducts(updatedProducts);
    localStorage.setItem('cms_products', JSON.stringify(updatedProducts));
    
    console.log('CMSPanel - Saved to localStorage:', updatedProducts);
    
    // Add activity tracking
    addActivity({
      id: Date.now().toString(),
      type: 'product',
      message: isEditing ? `Produk Rokok "${product.name}" diperbarui` : `Produk Rokok baru "${product.name}" ditambahkan`,
      timestamp: Date.now(),
    });
    
    // Trigger custom event to notify App.tsx to reload products
    window.dispatchEvent(new Event('productsUpdated'));
    
    setShowProductForm(false);
    setEditingProduct(null);
  };

  const deleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const productToDelete = products.find(p => p.id === id);
      const updatedProducts = products.filter(p => p.id !== id);
      setProducts(updatedProducts);
      localStorage.setItem('cms_products', JSON.stringify(updatedProducts));
      
      // Add activity tracking
      if (productToDelete) {
        addActivity({
          id: Date.now().toString(),
          type: 'product',
          message: `Produk Rokok "${productToDelete.name}" dihapus`,
          timestamp: Date.now(),
        });
      }
    }
  };

  const saveTembakauTSC = (product: TembakauProduct) => {
    let updatedProducts;
    const isEditing = editingTembakauTSC;
    if (isEditing) {
      updatedProducts = tembakauTSC.map(p => p.id === product.id ? product : p);
    } else {
      updatedProducts = [...tembakauTSC, { ...product, id: Date.now().toString() }];
    }
    setTembakauTSC(updatedProducts);
    localStorage.setItem('cms_tembakau_tsc', JSON.stringify(updatedProducts));
    
    // Add activity tracking
    addActivity({
      id: Date.now().toString(),
      type: 'product',
      message: isEditing ? `Produk TSC "${product.name}" diperbarui` : `Produk TSC baru "${product.name}" ditambahkan`,
      timestamp: Date.now(),
    });
    
    // Trigger custom event to notify App.tsx to reload products
    window.dispatchEvent(new Event('productsUpdated'));
    
    setShowTSCForm(false);
    setEditingTembakauTSC(null);
  };

  const deleteTembakauTSC = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const productToDelete = tembakauTSC.find(p => p.id === id);
      const updatedProducts = tembakauTSC.filter(p => p.id !== id);
      setTembakauTSC(updatedProducts);
      localStorage.setItem('cms_tembakau_tsc', JSON.stringify(updatedProducts));
      
      // Add activity tracking
      if (productToDelete) {
        addActivity({
          id: Date.now().toString(),
          type: 'product',
          message: `Produk TSC "${productToDelete.name}" dihapus`,
          timestamp: Date.now(),
        });
      }
    }
  };

  const saveTembakauTSG = (product: TembakauProduct) => {
    let updatedProducts;
    const isEditing = editingTembakauTSG;
    if (isEditing) {
      updatedProducts = tembakauTSG.map(p => p.id === product.id ? product : p);
    } else {
      updatedProducts = [...tembakauTSG, { ...product, id: Date.now().toString() }];
    }
    setTembakauTSG(updatedProducts);
    localStorage.setItem('cms_tembakau_tsg', JSON.stringify(updatedProducts));
    
    // Add activity tracking
    addActivity({
      id: Date.now().toString(),
      type: 'product',
      message: isEditing ? `Produk TSG "${product.name}" diperbarui` : `Produk TSG baru "${product.name}" ditambahkan`,
      timestamp: Date.now(),
    });
    
    // Trigger custom event to notify App.tsx to reload products
    window.dispatchEvent(new Event('productsUpdated'));
    
    setShowTSGForm(false);
    setEditingTembakauTSG(null);
  };

  const deleteTembakauTSG = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const productToDelete = tembakauTSG.find(p => p.id === id);
      const updatedProducts = tembakauTSG.filter(p => p.id !== id);
      setTembakauTSG(updatedProducts);
      localStorage.setItem('cms_tembakau_tsg', JSON.stringify(updatedProducts));
      
      // Add activity tracking
      if (productToDelete) {
        addActivity({
          id: Date.now().toString(),
          type: 'product',
          message: `Produk TSG "${productToDelete.name}" dihapus`,
          timestamp: Date.now(),
        });
      }
    }
  };

  const saveCustomProductPage = (page: CustomProductPage) => {
    let updatedPages;
    const isEditing = editingCustomPage;
    if (isEditing) {
      updatedPages = customProductPages.map(p => p.id === page.id ? page : p);
    } else {
      updatedPages = [...customProductPages, { ...page, id: Date.now().toString(), products: [] }];
    }
    setCustomProductPages(updatedPages);
    localStorage.setItem('cms_custom_product_pages', JSON.stringify(updatedPages));
    
    // Add activity tracking
    addActivity({
      id: Date.now().toString(),
      type: 'product',
      message: isEditing ? `Product page \"${page.title}\" diperbarui` : `Product page baru \"${page.title}\" ditambahkan`,
      timestamp: Date.now(),
    });
    
    // Dispatch custom event to notify header of new page
    window.dispatchEvent(new CustomEvent('customProductPagesUpdated', { detail: updatedPages }));
    
    setSelectedProductCategory('overview');
    setEditingCustomPage(null);
  };

  const deleteCustomProductPage = (id: string) => {
    if (confirm('Are you sure you want to delete this product page?')) {
      const pageToDelete = customProductPages.find(p => p.id === id);
      const updatedPages = customProductPages.filter(p => p.id !== id);
      setCustomProductPages(updatedPages);
      localStorage.setItem('cms_custom_product_pages', JSON.stringify(updatedPages));
      
      // Add activity tracking
      if (pageToDelete) {
        addActivity({
          id: Date.now().toString(),
          type: 'product',
          message: `Product page \"${pageToDelete.title}\" dihapus`,
          timestamp: Date.now(),
        });
      }
      
      // Dispatch custom event to notify header
      window.dispatchEvent(new CustomEvent('customProductPagesUpdated', { detail: updatedPages }));
    }
  };

  // Save Default Product Page (Rokok, TSC, TSG)
  const saveDefaultProductPage = (type: 'rokok' | 'tsc' | 'tsg', data: { title: string; description: string; status: 'published' | 'draft'; pageViews: number; hasFilters?: boolean; filterCategories?: { name: string; label: string; color: string }[] }) => {
    const updatedPages = {
      ...defaultPages,
      [type]: data
    };
    setDefaultPages(updatedPages);
    localStorage.setItem('cms_default_product_pages', JSON.stringify(updatedPages));
    
    // Realtime save - no activity tracking to avoid spam
    // Activity is tracked only on explicit close/update action
  };

  // Auto-populate filters from existing products
  const autoPopulateFiltersForRokok = () => {
    const currentFilters = defaultPages.rokok.filterCategories || [];
    
    // If filters already exist, don't override
    if (currentFilters.length > 0) {
      return;
    }

    // Extract unique categories and markets from products
    const categories = new Set<string>();
    const markets = new Set<string>();
    
    products.forEach(product => {
      if (product.category) categories.add(product.category);
      if (product.market) markets.add(product.market);
    });

    const newFilters: { name: string; label: string; color: string; type?: 'single' | 'dropdown'; children?: { name: string; label: string; color: string }[] }[] = [];
    
    // Add category filters (SKM/SKT) as single filters
    if (categories.has('mesin')) {
      newFilters.push({ name: 'skm', label: 'SKM', color: '#3b82f6', type: 'single' }); // blue
    }
    if (categories.has('tangan')) {
      newFilters.push({ name: 'skt', label: 'SKT', color: '#8b5cf6', type: 'single' }); // purple
    }
    
    // Add market filters as dropdown if both exist
    if (markets.size > 0) {
      const marketChildren: { name: string; label: string; color: string }[] = [];
      
      if (markets.has('domestik')) {
        marketChildren.push({ name: 'domestik', label: 'Domestik', color: '#10b981' }); // green
      }
      if (markets.has('internasional')) {
        marketChildren.push({ name: 'internasional', label: 'Internasional', color: '#f59e0b' }); // amber
      }

      if (marketChildren.length > 0) {
        newFilters.push({
          name: 'market',
          label: 'SEMUA MARKET',
          color: '#6366f1', // indigo
          type: 'dropdown',
          children: marketChildren
        });
      }
    }

    // Update default pages with auto-populated filters
    if (newFilters.length > 0) {
      const updatedPages = {
        ...defaultPages,
        rokok: {
          ...defaultPages.rokok,
          hasFilters: true,
          filterCategories: newFilters
        }
      };
      setDefaultPages(updatedPages);
      localStorage.setItem('cms_default_product_pages', JSON.stringify(updatedPages));
    }
  };

  // Auto-populate filters for TSC
  const autoPopulateFiltersForTSC = () => {
    const currentFilters = defaultPages.tsc.filterCategories || [];
    
    if (currentFilters.length > 0) {
      return;
    }

    // Extract unique jenis and kualitas from TSC products
    const jenisSet = new Set<string>();
    
    tembakauTSC.forEach(product => {
      if (product.jenis) jenisSet.add(product.jenis);
    });

    const newFilters: { name: string; label: string; color: string }[] = [];
    const colorPalette = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];
    let colorIndex = 0;
    
    // Add jenis filters
    jenisSet.forEach(jenis => {
      newFilters.push({ 
        name: jenis.toLowerCase().replace(/[^a-z0-9]+/g, '-'), 
        label: jenis, 
        color: colorPalette[colorIndex % colorPalette.length] 
      });
      colorIndex++;
    });

    if (newFilters.length > 0) {
      const updatedPages = {
        ...defaultPages,
        tsc: {
          ...defaultPages.tsc,
          hasFilters: true,
          filterCategories: newFilters
        }
      };
      setDefaultPages(updatedPages);
      localStorage.setItem('cms_default_product_pages', JSON.stringify(updatedPages));
    }
  };

  // Auto-populate filters for TSG
  const autoPopulateFiltersForTSG = () => {
    const currentFilters = defaultPages.tsg.filterCategories || [];
    
    if (currentFilters.length > 0) {
      return;
    }

    // Extract unique jenis and kualitas from TSG products
    const jenisSet = new Set<string>();
    
    tembakauTSG.forEach(product => {
      if (product.jenis) jenisSet.add(product.jenis);
    });

    const newFilters: { name: string; label: string; color: string }[] = [];
    const colorPalette = ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];
    let colorIndex = 0;
    
    // Add jenis filters
    jenisSet.forEach(jenis => {
      newFilters.push({ 
        name: jenis.toLowerCase().replace(/[^a-z0-9]+/g, '-'), 
        label: jenis, 
        color: colorPalette[colorIndex % colorPalette.length] 
      });
      colorIndex++;
    });

    if (newFilters.length > 0) {
      const updatedPages = {
        ...defaultPages,
        tsg: {
          ...defaultPages.tsg,
          hasFilters: true,
          filterCategories: newFilters
        }
      };
      setDefaultPages(updatedPages);
      localStorage.setItem('cms_default_product_pages', JSON.stringify(updatedPages));
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
      {activeSection === 'landing' && (
        <>
          {landingSubSection === 'overview' ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Landing Page Management</h2>
                <p className="text-sm text-gray-600">Kelola seluruh konten halaman beranda</p>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Layout size={32} className="opacity-80" />
                  </div>
                  <h3 className="text-3xl font-bold mb-1">4</h3>
                  <p className="text-sm opacity-90">Total Sections</p>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Video size={32} className="opacity-80" />
                  </div>
                  <h3 className="text-3xl font-bold mb-1">1</h3>
                  <p className="text-sm opacity-90">Video Background</p>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Package size={32} className="opacity-80" />
                  </div>
                  <h3 className="text-3xl font-bold mb-1">3</h3>
                  <p className="text-sm opacity-90">Product Categories</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <MousePointer size={32} className="opacity-80" />
                  </div>
                  <h3 className="text-3xl font-bold mb-1">Active</h3>
                  <p className="text-sm opacity-90">Status</p>
                </div>
              </div>

              {/* Section Management Cards */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Kelola Section</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Hero Section Card */}
                  <button
                    onClick={() => setLandingSubSection('hero')}
                    className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-orange-500 hover:shadow-lg transition-all duration-200 text-left group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Video size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-gray-900 mb-1">Hero Section</h4>
                        <p className="text-sm text-gray-600 mb-2">Kelola video background, judul, subtitle, dan deskripsi utama</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded">Video</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">Text</span>
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Products Section Card */}
                  <button
                    onClick={() => setLandingSubSection('products')}
                    className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-orange-500 hover:shadow-lg transition-all duration-200 text-left group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Package size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-gray-900 mb-1">Products Section</h4>
                        <p className="text-sm text-gray-600 mb-2">Kelola judul dan subtitle section produk</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded">Products</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">Text</span>
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Why Choose Us Section Card */}
                  <button
                    onClick={() => setLandingSubSection('whychoose')}
                    className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-orange-500 hover:shadow-lg transition-all duration-200 text-left group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Users size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-gray-900 mb-1">Why Choose Us Section</h4>
                        <p className="text-sm text-gray-600 mb-2">Kelola gambar dan konten section "Siapa Kami"</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">Image</span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">Parallax</span>
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* CTA Section Card */}
                  <button
                    onClick={() => setLandingSubSection('cta')}
                    className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-orange-500 hover:shadow-lg transition-all duration-200 text-left group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <MessageSquare size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-gray-900 mb-1">CTA Section</h4>
                        <p className="text-sm text-gray-600 mb-2">Kelola section call-to-action "Bergabunglah Bersama Kami"</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">CTA</span>
                          <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded">Button</span>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Back Button */}
              <button
                onClick={() => setLandingSubSection('overview')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 group"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Kembali ke Overview</span>
              </button>

              {/* Hero Section Editor */}
              {landingSubSection === 'hero' && (
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">Hero Section</h2>
                    <p className="text-sm text-gray-600">Kelola video background dan konten hero section</p>
                  </div>
                  
                  <div className="space-y-4 bg-white p-6 rounded-lg border border-gray-200">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Hero Title</label>
                      <input
                        type="text"
                        value={landingContent.heroTitle}
                        onChange={(e) => setLandingContent({ ...landingContent, heroTitle: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Hero Subtitle</label>
                      <input
                        type="text"
                        value={landingContent.heroSubtitle}
                        onChange={(e) => setLandingContent({ ...landingContent, heroSubtitle: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Hero Description</label>
                      <textarea
                        value={landingContent.heroDescription}
                        onChange={(e) => setLandingContent({ ...landingContent, heroDescription: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Video URL (YouTube Embed ID)</label>
                      <input
                        type="text"
                        value={landingContent.videoUrl}
                        onChange={(e) => setLandingContent({ ...landingContent, videoUrl: e.target.value })}
                        placeholder="B1sOXFuWyug"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-1">Masukkan ID video YouTube saja (contoh: B1sOXFuWyug)</p>
                    </div>

                    <button
                      onClick={saveLandingContent}
                      className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
                    >
                      <Save size={20} />
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {/* Products Section Editor */}
              {landingSubSection === 'products' && (
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">Products Section</h2>
                    <p className="text-sm text-gray-600">Kelola judul dan subtitle section produk</p>
                  </div>
                  
                  <div className="space-y-4 bg-white p-6 rounded-lg border border-gray-200">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Products Title</label>
                      <input
                        type="text"
                        value={landingContent.productsTitle}
                        onChange={(e) => setLandingContent({ ...landingContent, productsTitle: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Products Subtitle</label>
                      <input
                        type="text"
                        value={landingContent.productsSubtitle}
                        onChange={(e) => setLandingContent({ ...landingContent, productsSubtitle: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <button
                      onClick={saveLandingContent}
                      className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
                    >
                      <Save size={20} />
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {/* Why Choose Us Section Editor */}
              {landingSubSection === 'whychoose' && (
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">Why Choose Us Section</h2>
                    <p className="text-sm text-gray-600">Kelola gambar section "Siapa Kami"</p>
                  </div>
                  
                  <div className="space-y-4 bg-white p-6 rounded-lg border border-gray-200">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Background Image URL</label>
                      <input
                        type="text"
                        value={landingContent.whyChooseUsImage}
                        onChange={(e) => setLandingContent({ ...landingContent, whyChooseUsImage: e.target.value })}
                        placeholder="https://..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-1">URL gambar dengan parallax effect</p>
                    </div>

                    {landingContent.whyChooseUsImage && (
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <img 
                          src={landingContent.whyChooseUsImage} 
                          alt="Preview" 
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    )}

                    <button
                      onClick={saveLandingContent}
                      className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
                    >
                      <Save size={20} />
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {/* CTA Section Editor */}
              {landingSubSection === 'cta' && (
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">CTA Section</h2>
                    <p className="text-sm text-gray-600">Kelola section call-to-action</p>
                  </div>
                  
                  <div className="space-y-4 bg-white p-6 rounded-lg border border-gray-200">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">CTA Title</label>
                      <input
                        type="text"
                        value={landingContent.ctaTitle}
                        onChange={(e) => setLandingContent({ ...landingContent, ctaTitle: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">CTA Subtitle</label>
                      <input
                        type="text"
                        value={landingContent.ctaSubtitle}
                        onChange={(e) => setLandingContent({ ...landingContent, ctaSubtitle: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Button Text</label>
                      <input
                        type="text"
                        value={landingContent.ctaButtonText}
                        onChange={(e) => setLandingContent({ ...landingContent, ctaButtonText: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Background Image URL</label>
                      <input
                        type="text"
                        value={landingContent.ctaBackgroundImage}
                        onChange={(e) => setLandingContent({ ...landingContent, ctaBackgroundImage: e.target.value })}
                        placeholder="https://..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    {landingContent.ctaBackgroundImage && (
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <img 
                          src={landingContent.ctaBackgroundImage} 
                          alt="Preview" 
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    )}

                    <button
                      onClick={saveLandingContent}
                      className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
                    >
                      <Save size={20} />
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}

      {activeSection === 'about' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Tentang Kami Management</h2>
            <p className="text-sm text-gray-600">Kelola konten halaman tentang kami</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <FileText size={32} className="opacity-80" />
              </div>
              <h3 className="text-3xl font-bold mb-1">5</h3>
              <p className="text-sm opacity-90">Content Fields</p>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Users size={32} className="opacity-80" />
              </div>
              <h3 className="text-3xl font-bold mb-1">{aboutContent.values.length}</h3>
              <p className="text-sm opacity-90">Company Values</p>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Type size={32} className="opacity-80" />
              </div>
              <h3 className="text-3xl font-bold mb-1">{aboutContent.description.length}</h3>
              <p className="text-sm opacity-90">Characters</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <MousePointer size={32} className="opacity-80" />
              </div>
              <h3 className="text-3xl font-bold mb-1">Active</h3>
              <p className="text-sm opacity-90">Status</p>
            </div>
          </div>
          
          <div className="space-y-4 bg-white p-6 rounded-lg border border-gray-200">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={aboutContent.title}
                onChange={(e) => setAboutContent({ ...aboutContent, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                value={aboutContent.description}
                onChange={(e) => setAboutContent({ ...aboutContent, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Mission</label>
              <textarea
                value={aboutContent.mission}
                onChange={(e) => setAboutContent({ ...aboutContent, mission: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Vision</label>
              <textarea
                value={aboutContent.vision}
                onChange={(e) => setAboutContent({ ...aboutContent, vision: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Values (comma separated)</label>
              <input
                type="text"
                value={aboutContent.values.join(', ')}
                onChange={(e) => setAboutContent({ ...aboutContent, values: e.target.value.split(',').map(v => v.trim()) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={saveAboutContent}
              className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
            >
              <Save size={20} />
              Save Changes
            </button>
          </div>
        </div>
      )}

      {activeSection === 'blog' && (
        <div className="space-y-6">
          {!showBlogForm && (
            <>
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <FileText size={32} className="opacity-80" />
                  </div>
                  <h3 className="text-3xl font-bold mb-1">{blogs.length}</h3>
                  <p className="text-sm opacity-90">Total Blog Posts</p>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Type size={32} className="opacity-80" />
                  </div>
                  <h3 className="text-3xl font-bold mb-1">{new Set(blogs.map(b => b.category)).size}</h3>
                  <p className="text-sm opacity-90">Categories</p>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Users size={32} className="opacity-80" />
                  </div>
                  <h3 className="text-3xl font-bold mb-1">{new Set(blogs.map(b => b.author)).size}</h3>
                  <p className="text-sm opacity-90">Authors</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <MousePointer size={32} className="opacity-80" />
                  </div>
                  <h3 className="text-3xl font-bold mb-1">Active</h3>
                  <p className="text-sm opacity-90">Status</p>
                </div>
              </div>
            </>
          )}

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">Blog Management</h2>
              <p className="text-sm text-gray-600">Kelola artikel blog</p>
            </div>
            {!showBlogForm && (
              <button
                onClick={() => {
                  setEditingBlog(null);
                  setShowBlogForm(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
              >
                <Plus size={20} />
                New Blog
              </button>
            )}
          </div>

          {showBlogForm ? (
            <BlogForm
              blog={editingBlog}
              onSave={saveBlog}
              onCancel={() => {
                setShowBlogForm(false);
                setEditingBlog(null);
              }}
            />
          ) : (
            <>
              {blogs.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
                  <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-bold text-gray-700 mb-2">Belum Ada Blog Post</h3>
                  <p className="text-gray-500 mb-6">Mulai membuat blog post pertama Anda</p>
                  <button
                    onClick={() => {
                      setEditingBlog(null);
                      setShowBlogForm(true);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors mx-auto"
                  >
                    <Plus size={20} />
                    Buat Blog Post
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {blogs.map((blog) => (
                    <div key={blog.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                      <div className={`w-full h-32 bg-gradient-to-br ${blog.gradient} rounded-lg mb-3`}></div>
                      <h3 className="font-bold text-lg text-gray-800 mb-2">{blog.title}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{blog.excerpt}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded">{blog.category}</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">{blog.author}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingBlog(blog);
                            setShowBlogForm(true);
                          }}
                          className="flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
                        >
                          <Edit2 size={14} />
                          Edit
                        </button>
                        <button
                          onClick={() => deleteBlog(blog.id)}
                          className="flex items-center gap-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {activeSection === 'products' && (
        <div className="space-y-6">
          {selectedProductCategory === 'overview' ? (
            <>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Product Management</h2>
                <p className="text-sm text-gray-600">
                  Kelola seluruh produk Rokok, TSC, TSG
                  {customProductPages.length > 0 && (
                    <>, {customProductPages.map(p => p.title).join(', ')}</>
                  )}
                </p>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Package size={32} className="opacity-80" />
                  </div>
                  <h3 className="text-3xl font-bold mb-1">
                    {products.length + tembakauTSC.length + tembakauTSG.length + customProductPages.reduce((sum, page) => sum + page.products.length, 0)}
                  </h3>
                  <p className="text-sm opacity-90">Total Produk</p>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Layout size={32} className="opacity-80" />
                  </div>
                  <h3 className="text-3xl font-bold mb-1">
                    {Object.values(defaultPages).filter(p => p.status === 'published').length + 
                     customProductPages.filter(p => p.status === 'published').length}
                  </h3>
                  <p className="text-sm opacity-90">Dipublish</p>
                </div>

                <div className="bg-gradient-to-br from-gray-500 to-gray-600 text-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <FileText size={32} className="opacity-80" />
                  </div>
                  <h3 className="text-3xl font-bold mb-1">
                    {Object.values(defaultPages).filter(p => p.status === 'draft').length + 
                     customProductPages.filter(p => p.status === 'draft').length}
                  </h3>
                  <p className="text-sm opacity-90">Draft</p>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <MousePointer size={32} className="opacity-80" />
                  </div>
                  <h3 className="text-3xl font-bold mb-1">
                    {Object.values(defaultPages).reduce((sum, p) => sum + (p.pageViews || 0), 0) +
                     customProductPages.reduce((sum, page) => sum + (page.pageViews || 0), 0)}
                  </h3>
                  <p className="text-sm opacity-90">Total Kunjungan Page</p>
                </div>
              </div>

              {/* Section Management Cards */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Kelola Produk</h3>
                  <button
                    onClick={() => {
                      setEditingCustomPage(null);
                      setSelectedProductCategory('new-page');
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-lg hover:from-orange-600 hover:to-amber-700 transition-all shadow-md hover:shadow-lg"
                  >
                    <Plus size={20} />
                    <span className="font-semibold">New Product Page</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Rokok Section Card */}
                  <div className="relative bg-white border-2 border-gray-200 hover:border-blue-500 rounded-xl p-6 text-left transition-all hover:shadow-lg group">
                    <button
                      onClick={() => {
                        setSelectedProductCategory('rokok');
                        setEditingProduct(null);
                        setShowProductForm(false);
                      }}
                      className="w-full text-left"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                          <Package className="text-blue-600 group-hover:text-white transition-colors" size={24} />
                        </div>
                        <span className="text-gray-400 group-hover:text-blue-500 transition-colors">→</span>
                      </div>
                      <h4 className="font-bold text-lg text-gray-900 mb-2">Rokok Products</h4>
                      <p className="text-sm text-gray-600 mb-3">Kelola produk rokok SKM dan SKT</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Total: {products.length} products</span>
                        {defaultPages.rokok.status === 'draft' && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-semibold">
                            DRAFT
                          </span>
                        )}
                      </div>
                    </button>
                    
                    {/* Delete All Products Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Apakah Anda yakin ingin menghapus semua ${products.length} produk rokok?`)) {
                          setProducts([]);
                          localStorage.setItem('cms_products', JSON.stringify([]));
                          addActivity({
                            id: Date.now().toString(),
                            type: 'product',
                            message: 'Semua produk Rokok dihapus',
                            timestamp: Date.now(),
                          });
                        }
                      }}
                      className="absolute top-4 right-4 p-2 bg-red-100 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200"
                      title="Hapus semua produk rokok"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* TSC Section Card */}
                  <div className="relative bg-white border-2 border-gray-200 hover:border-green-500 rounded-xl p-6 text-left transition-all hover:shadow-lg group">
                    <button
                      onClick={() => {
                        setSelectedProductCategory('tsc');
                        setEditingTembakauTSC(null);
                        setShowTSCForm(false);
                      }}
                      className="w-full text-left"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-500 transition-colors">
                          <Package className="text-green-600 group-hover:text-white transition-colors" size={24} />
                        </div>
                        <span className="text-gray-400 group-hover:text-green-500 transition-colors">→</span>
                      </div>
                      <h4 className="font-bold text-lg text-gray-900 mb-2">Tembakau TSC</h4>
                      <p className="text-sm text-gray-600 mb-3">Kelola produk Tembakau Siap Campur</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Total: {tembakauTSC.length} products</span>
                        {defaultPages.tsc.status === 'draft' && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-semibold">
                            DRAFT
                          </span>
                        )}
                      </div>
                    </button>
                    
                    {/* Delete All Products Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Apakah Anda yakin ingin menghapus semua ${tembakauTSC.length} produk TSC?`)) {
                          setTembakauTSC([]);
                          localStorage.setItem('cms_tembakau_tsc', JSON.stringify([]));
                          addActivity({
                            id: Date.now().toString(),
                            type: 'product',
                            message: 'Semua produk TSC dihapus',
                            timestamp: Date.now(),
                          });
                        }
                      }}
                      className="absolute top-4 right-4 p-2 bg-red-100 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200"
                      title="Hapus semua produk TSC"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* TSG Section Card */}
                  <div className="relative bg-white border-2 border-gray-200 hover:border-purple-500 rounded-xl p-6 text-left transition-all hover:shadow-lg group">
                    <button
                      onClick={() => {
                        setSelectedProductCategory('tsg');
                        setEditingTembakauTSG(null);
                        setShowTSGForm(false);
                      }}
                      className="w-full text-left"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-500 transition-colors">
                          <Package className="text-purple-600 group-hover:text-white transition-colors" size={24} />
                        </div>
                        <span className="text-gray-400 group-hover:text-purple-500 transition-colors">→</span>
                      </div>
                      <h4 className="font-bold text-lg text-gray-900 mb-2">Tembakau TSG</h4>
                      <p className="text-sm text-gray-600 mb-3">Kelola produk Tembakau Siap Giling</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Total: {tembakauTSG.length} products</span>
                        {defaultPages.tsg.status === 'draft' && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-semibold">
                            DRAFT
                          </span>
                        )}
                      </div>
                    </button>
                    
                    {/* Delete All Products Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Apakah Anda yakin ingin menghapus semua ${tembakauTSG.length} produk TSG?`)) {
                          setTembakauTSG([]);
                          localStorage.setItem('cms_tembakau_tsg', JSON.stringify([]));
                          addActivity({
                            id: Date.now().toString(),
                            type: 'product',
                            message: 'Semua produk TSG dihapus',
                            timestamp: Date.now(),
                          });
                        }
                      }}
                      className="absolute top-4 right-4 p-2 bg-red-100 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200"
                      title="Hapus semua produk TSG"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Custom Product Pages */}
                  {customProductPages.map((page) => (
                    <div key={page.id} className="relative bg-white border-2 border-gray-200 hover:border-amber-500 rounded-xl p-6 text-left transition-all hover:shadow-lg group">
                      <button
                        onClick={() => setSelectedProductCategory(page.slug)}
                        className="w-full text-left"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className={`w-12 h-12 bg-${page.color}-100 rounded-lg flex items-center justify-center group-hover:bg-${page.color}-500 transition-colors`} style={{
                            backgroundColor: `${page.color}20`,
                          }}>
                            <Package className={`text-${page.color}-600 group-hover:text-white transition-colors`} size={24} style={{
                              color: page.color
                            }} />
                          </div>
                          <span className="text-gray-400 group-hover:text-amber-500 transition-colors">→</span>
                        </div>
                        <h4 className="font-bold text-lg text-gray-900 mb-2">{page.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{page.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Total: {page.products.length} products</span>
                          {page.status === 'draft' && (
                            <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-semibold">
                              DRAFT
                            </span>
                          )}
                        </div>
                      </button>
                      
                      {/* Delete Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteCustomProductPage(page.id);
                        }}
                        className="absolute top-4 right-4 p-2 bg-red-100 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : selectedProductCategory === 'rokok' ? (
            editingDefaultPageType === 'rokok' ? (
              <div className="space-y-6">
                <DefaultProductPageForm
                  type="rokok"
                  data={defaultPages.rokok}
                  onSave={(data) => saveDefaultProductPage('rokok', data)}
                  onCancel={() => setEditingDefaultPageType(null)}
                  onClose={() => {
                    addActivity({
                      id: Date.now().toString(),
                      type: 'update',
                      message: `Product page "${defaultPages.rokok.title}" berhasil diperbarui`,
                      timestamp: Date.now(),
                    });
                    setEditingDefaultPageType(null);
                  }}
                />
              </div>
            ) : (
              <RokokProductSection
                products={products}
                editingProduct={editingProduct}
                showProductForm={showProductForm}
                onBack={() => setSelectedProductCategory('overview')}
                onAdd={() => {
                  setEditingProduct(null);
                  setShowProductForm(true);
                }}
                onEdit={(product) => {
                  setEditingProduct(product);
                  setShowProductForm(true);
                }}
                onDelete={deleteProduct}
                onSave={saveProduct}
                onCancel={() => {
                  setShowProductForm(false);
                  setEditingProduct(null);
                }}
                onEditPage={() => {
                  autoPopulateFiltersForRokok();
                  setEditingDefaultPageType('rokok');
                }}
                filterCategories={defaultPages.rokok.filterCategories}
              />
            )
          ) : selectedProductCategory === 'tsc' ? (
            editingDefaultPageType === 'tsc' ? (
              <div className="space-y-6">
                <DefaultProductPageForm
                  type="tsc"
                  data={defaultPages.tsc}
                  onSave={(data) => saveDefaultProductPage('tsc', data)}
                  onCancel={() => setEditingDefaultPageType(null)}
                  onClose={() => {
                    addActivity({
                      id: Date.now().toString(),
                      type: 'update',
                      message: `Product page "${defaultPages.tsc.title}" berhasil diperbarui`,
                      timestamp: Date.now(),
                    });
                    setEditingDefaultPageType(null);
                  }}
                />
              </div>
            ) : (
              <TembakauSection
                products={tembakauTSC}
                editingProduct={editingTembakauTSC}
                showForm={showTSCForm}
                title="Tembakau TSC (Tembakau Siap Campur)"
                description="Kelola produk Tembakau Siap Campur"
                type="tsc"
                onBack={() => setSelectedProductCategory('overview')}
                onAdd={() => {
                  setEditingTembakauTSC(null);
                  setShowTSCForm(true);
                }}
                onEdit={(product) => {
                  setEditingTembakauTSC(product);
                  setShowTSCForm(true);
                }}
                onDelete={deleteTembakauTSC}
                onSave={saveTembakauTSC}
                onCancel={() => {
                  setShowTSCForm(false);
                  setEditingTembakauTSC(null);
                }}
                onEditPage={() => {
                  autoPopulateFiltersForTSC();
                  setEditingDefaultPageType('tsc');
                }}
                filterCategories={defaultPages.tsc.filterCategories}
              />
            )
          ) : selectedProductCategory === 'tsg' ? (
            editingDefaultPageType === 'tsg' ? (
              <div className="space-y-6">
                <DefaultProductPageForm
                  type="tsg"
                  data={defaultPages.tsg}
                  onSave={(data) => saveDefaultProductPage('tsg', data)}
                  onCancel={() => setEditingDefaultPageType(null)}
                  onClose={() => {
                    addActivity({
                      id: Date.now().toString(),
                      type: 'update',
                      message: `Product page "${defaultPages.tsg.title}" berhasil diperbarui`,
                      timestamp: Date.now(),
                    });
                    setEditingDefaultPageType(null);
                  }}
                />
              </div>
            ) : (
              <TembakauSection
                products={tembakauTSG}
                editingProduct={editingTembakauTSG}
                showForm={showTSGForm}
                title="Tembakau TSG (Tembakau Siap Giling)"
                description="Kelola produk Tembakau Siap Giling"
                type="tsg"
                onBack={() => setSelectedProductCategory('overview')}
                onAdd={() => {
                  setEditingTembakauTSG(null);
                  setShowTSGForm(true);
                }}
                onEdit={(product) => {
                  setEditingTembakauTSG(product);
                  setShowTSGForm(true);
                }}
                onDelete={deleteTembakauTSG}
                onSave={saveTembakauTSG}
                onCancel={() => {
                  setShowTSGForm(false);
                  setEditingTembakauTSG(null);
                }}
                onEditPage={() => {
                  autoPopulateFiltersForTSG();
                  setEditingDefaultPageType('tsg');
                }}
              />
            )
          ) : selectedProductCategory === 'new-page' ? (
            // Full Page: New Product Page Form
            <div className="bg-white rounded-xl shadow-sm">
              <CustomProductPageForm
                page={editingCustomPage}
                onSave={saveCustomProductPage}
                onCancel={() => {
                  setSelectedProductCategory('overview');
                  setEditingCustomPage(null);
                }}
              />
            </div>
          ) : (
            (() => {
              const currentPage = customProductPages.find(p => p.slug === selectedProductCategory);
              
              // If editing page settings, show edit form
              if (editingCustomPageForPageSettings && currentPage && currentPage.slug === selectedProductCategory) {
                return (
                  <div className="space-y-6">
                    <CustomProductPageForm
                      page={editingCustomPageForPageSettings}
                      onSave={(updatedPage) => {
                        const updatedPages = customProductPages.map(p => 
                          p.id === updatedPage.id ? updatedPage : p
                        );
                        setCustomProductPages(updatedPages);
                        localStorage.setItem('cms_custom_product_pages', JSON.stringify(updatedPages));
                        window.dispatchEvent(new CustomEvent('customProductPagesUpdated', { detail: updatedPages }));
                      
                      }}
                      onCancel={() => {
                        setEditingCustomPageForPageSettings(null);
                      }}
                      onClose={() => {
                        addActivity({
                          id: Date.now().toString(),
                          type: 'update',
                          message: `Product page \"${editingCustomPageForPageSettings.title}\" berhasil diperbarui`,
                          timestamp: Date.now(),
                        });
                        setEditingCustomPageForPageSettings(null);
                      }}
                    />
                  </div>
                );
              }
              
              return currentPage ? (
                <CustomProductPageSection
                  page={currentPage}
                  onBack={() => setSelectedProductCategory('overview')}
                  onUpdate={(updatedPage) => {
                    const updatedPages = customProductPages.map(p => 
                      p.id === updatedPage.id ? updatedPage : p
                    );
                    setCustomProductPages(updatedPages);
                    localStorage.setItem('cms_custom_product_pages', JSON.stringify(updatedPages));
                    window.dispatchEvent(new CustomEvent('customProductPagesUpdated', { detail: updatedPages }));
                  }}
                  onEditPage={() => {
                    if (currentPage) {
                      setEditingCustomPageForPageSettings(currentPage);
                    }
                  }}
                />
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">Page not found</p>
                  <button
                    onClick={() => setSelectedProductCategory('overview')}
                    className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg"
                  >
                    Back to Overview
                  </button>
                </div>
              );
            })()
          )}
        </div>
      )}
    </div>
  );
}

// Blog Form Component
function BlogForm({ blog, onSave, onCancel }: { blog: BlogPost | null; onSave: (blog: BlogPost) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState<BlogPost>(
    blog || {
      id: '',
      title: '',
      excerpt: '',
      content: '',
      author: 'Admin',
      date: new Date().toISOString().split('T')[0],
      category: 'Berita',
      image: '',
      gradient: 'from-orange-500 to-amber-600',
    }
  );

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{blog ? 'Edit Blog' : 'New Blog'}</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Excerpt</label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Author</label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
          <input
            type="text"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Gradient</label>
          <select
            value={formData.gradient}
            onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="from-orange-500 to-amber-600">Orange to Amber</option>
            <option value="from-amber-500 to-yellow-500">Amber to Yellow</option>
            <option value="from-yellow-400 to-lime-500">Yellow to Lime</option>
            <option value="from-lime-500 to-green-500">Lime to Green</option>
            <option value="from-green-500 to-emerald-600">Green to Emerald</option>
            <option value="from-emerald-500 to-teal-500">Emerald to Teal</option>
            <option value="from-teal-500 to-cyan-600">Teal to Cyan</option>
            <option value="from-cyan-500 to-blue-500">Cyan to Blue</option>
          </select>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onSave(formData)}
            className="flex items-center gap-2 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors"
          >
            <Save size={18} />
            Save
          </button>
          <button
            onClick={onCancel}
            className="flex items-center gap-2 px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
          >
            <X size={18} />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// Product Form Component
export function ProductForm({ product, onSave, onCancel, filterCategories }: { product: Product | null; onSave: (product: Product) => void; onCancel: () => void; filterCategories?: { name: string; label: string; color: string }[] }) {
  // Migrate old product data to specifications
  const migrateProduct = (prod: Product | null): Product => {
    if (!prod) {
      return {
        id: '',
        name: '',
        productName: '',
        description: '',
        baseImage: '',
        additionalImage: '',
        category: '',
        market: '',
        isi: '',
        jenis: '',
        kemasan: '',
        filter: '',
        kadar: '',
        bahan: '',
        produksi: '',
        minOrder: '',
        filterCategory: '',
        specifications: {},
      };
    }

    // Migrate old fields to specifications
    const specs = { ...(prod.specifications || {}) };
    
    if (prod.category && !specs['Category']) {
      specs['Category'] = prod.category === 'mesin' ? 'Mesin (SKM)' : prod.category === 'tangan' ? 'Tangan (SKT)' : prod.category;
    }
    if (prod.market && !specs['Market']) {
      specs['Market'] = prod.market === 'domestik' ? 'Domestik' : prod.market === 'internasional' ? 'Internasional' : prod.market;
    }
    if (prod.jenis && !specs['Jenis']) {
      specs['Jenis'] = prod.jenis;
    }
    if (prod.isi && !specs['Isi']) {
      specs['Isi'] = prod.isi;
    }
    if (prod.kemasan && !specs['Kemasan']) {
      specs['Kemasan'] = prod.kemasan;
    }
    if (prod.filter && !specs['Filter']) {
      specs['Filter'] = prod.filter;
    }
    if (prod.kadar && !specs['Kadar']) {
      specs['Kadar'] = prod.kadar;
    }
    if (prod.bahan && !specs['Bahan']) {
      specs['Bahan'] = prod.bahan;
    }
    if (prod.produksi && !specs['Produksi']) {
      specs['Produksi'] = prod.produksi;
    }
    if (prod.minOrder && !specs['Min Order']) {
      specs['Min Order'] = prod.minOrder;
    }

    return {
      ...prod,
      specifications: specs,
    };
  };

  const [formData, setFormData] = useState<Product>(migrateProduct(product));

  const [specKey, setSpecKey] = useState('');
  const [specValue, setSpecValue] = useState('');

  const addSpecification = () => {
    if (specKey && specValue) {
      setFormData({
        ...formData,
        specifications: {
          ...(formData.specifications || {}),
          [specKey]: specValue
        }
      });
      setSpecKey('');
      setSpecValue('');
    }
  };

  const removeSpecification = (key: string) => {
    const { [key]: removed, ...rest } = formData.specifications || {};
    setFormData({ ...formData, specifications: rest });
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{product ? 'Edit Product' : 'New Product'}</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Name (ID)</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name (Display)</label>
            <input
              type="text"
              value={formData.productName}
              onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as 'mesin' | 'tangan' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="mesin">Mesin (SKM)</option>
              <option value="tangan">Tangan (SKT)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Market</label>
            <select
              value={formData.market}
              onChange={(e) => setFormData({ ...formData, market: e.target.value as 'domestik' | 'internasional' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="domestik">Domestik</option>
              <option value="internasional">Internasional</option>
            </select>
          </div>
        </div>

        {/* Filter Category Selection - Only show if filters are enabled */}
        {filterCategories && filterCategories.length > 0 && (
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
              <label className="block text-base font-bold text-gray-900">
                Filter Category
              </label>
            </div>
            <p className="text-sm text-gray-600 mb-5">Pilih filter button mana yang akan menampilkan produk ini</p>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, filterCategory: '' })}
                className={`px-5 py-4 rounded-xl border-2 transition-all duration-200 font-semibold text-sm shadow-sm hover:shadow-md ${
                  formData.filterCategory === '' || !formData.filterCategory
                    ? 'border-amber-500 bg-gradient-to-br from-amber-100 to-amber-200 text-amber-900 shadow-md'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                    formData.filterCategory === '' || !formData.filterCategory 
                      ? 'bg-amber-500 border-amber-600 shadow-lg shadow-amber-300' 
                      : 'border-gray-400'
                  }`}></div>
                  <span>All Products (No Filter)</span>
                </div>
              </button>
              {filterCategories.map((cat: any) => {
                // Single Filter
                if (!cat.type || cat.type === 'single') {
                  return (
                    <button
                      key={cat.name}
                      type="button"
                      onClick={() => setFormData({ ...formData, filterCategory: cat.name })}
                      className={`px-5 py-4 rounded-xl border-2 transition-all duration-200 font-semibold text-sm shadow-sm hover:shadow-md ${
                        formData.filterCategory === cat.name
                          ? 'shadow-md'
                          : 'border-gray-300 bg-white hover:border-gray-400'
                      }`}
                      style={{
                        borderColor: formData.filterCategory === cat.name ? cat.color : undefined,
                        background: formData.filterCategory === cat.name 
                          ? `linear-gradient(to bottom right, ${cat.color}15, ${cat.color}25)` 
                          : undefined,
                        color: formData.filterCategory === cat.name ? cat.color : '#374151'
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className={`w-5 h-5 rounded-full border-2 transition-all duration-200`}
                          style={{
                            backgroundColor: formData.filterCategory === cat.name ? cat.color : 'transparent',
                            borderColor: formData.filterCategory === cat.name ? cat.color : '#9ca3af',
                            boxShadow: formData.filterCategory === cat.name ? `0 4px 14px ${cat.color}50` : 'none'
                          }}
                        ></div>
                        <span>{cat.label}</span>
                      </div>
                    </button>
                  );
                }
                
                // Dropdown Filter
                if (cat.type === 'dropdown') {
                  return (
                    <div key={cat.name} className="col-span-2 space-y-3">
                      <div className="bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-gray-300 rounded-xl px-5 py-3 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full border-2 shadow-md"
                            style={{ 
                              backgroundColor: cat.color, 
                              borderColor: cat.color,
                              boxShadow: `0 2px 8px ${cat.color}40`
                            }}
                          ></div>
                          <span className="text-sm font-bold text-gray-800 uppercase tracking-wide">{cat.label}</span>
                          <div className="ml-auto text-xs text-gray-500 font-medium">Select one:</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pl-6">
                        {cat.children?.map((child: any) => (
                          <button
                            key={child.name}
                            type="button"
                            onClick={() => setFormData({ ...formData, filterCategory: child.name })}
                            className={`px-5 py-4 rounded-xl border-2 transition-all duration-200 font-semibold text-sm shadow-sm hover:shadow-md ${
                              formData.filterCategory === child.name
                                ? 'shadow-md'
                                : 'border-gray-300 bg-white hover:border-gray-400'
                            }`}
                            style={{
                              borderColor: formData.filterCategory === child.name ? child.color : undefined,
                              background: formData.filterCategory === child.name 
                                ? `linear-gradient(to bottom right, ${child.color}15, ${child.color}25)` 
                                : undefined,
                              color: formData.filterCategory === child.name ? child.color : '#374151'
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <div 
                                className={`w-5 h-5 rounded-full border-2 transition-all duration-200`}
                                style={{
                                  backgroundColor: formData.filterCategory === child.name ? child.color : 'transparent',
                                  borderColor: formData.filterCategory === child.name ? child.color : '#9ca3af',
                                  boxShadow: formData.filterCategory === child.name ? `0 4px 14px ${child.color}50` : 'none'
                                }}
                              ></div>
                              <span>{child.label}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                }
                
                return null;
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Jenis</label>
            <input
              type="text"
              value={formData.jenis}
              onChange={(e) => setFormData({ ...formData, jenis: e.target.value })}
              placeholder="Rokok, TSC, TSG"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Isi</label>
            <input
              type="text"
              value={formData.isi}
              onChange={(e) => setFormData({ ...formData, isi: e.target.value })}
              placeholder="12 batang"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Kemasan</label>
            <input
              type="text"
              value={formData.kemasan}
              onChange={(e) => setFormData({ ...formData, kemasan: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Filter</label>
            <input
              type="text"
              value={formData.filter}
              onChange={(e) => setFormData({ ...formData, filter: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Kadar</label>
            <input
              type="text"
              value={formData.kadar}
              onChange={(e) => setFormData({ ...formData, kadar: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Bahan</label>
            <input
              type="text"
              value={formData.bahan}
              onChange={(e) => setFormData({ ...formData, bahan: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Produksi</label>
            <input
              type="text"
              value={formData.produksi}
              onChange={(e) => setFormData({ ...formData, produksi: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Min Order (optional)</label>
          <input
            type="text"
            value={formData.minOrder || ''}
            onChange={(e) => setFormData({ ...formData, minOrder: e.target.value })}
            placeholder="1 Bal = 10 Slof"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Base Image URL</label>
          <input
            type="text"
            value={formData.baseImage}
            onChange={(e) => setFormData({ ...formData, baseImage: e.target.value })}
            placeholder="https://..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Image URL (optional)</label>
          <input
            type="text"
            value={formData.additionalImage || ''}
            onChange={(e) => setFormData({ ...formData, additionalImage: e.target.value })}
            placeholder="https://..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        {/* Specifications */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Specifications</h4>
          
          {formData.specifications && Object.entries(formData.specifications).length > 0 && (
            <div className="mb-3 space-y-2">
              {Object.entries(formData.specifications).map(([key, value]: [string, any]) => (
                <div key={key} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                  <span className="text-sm">
                    <span className="font-medium capitalize">{key}:</span> {value}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeSpecification(key)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <input
              type="text"
              value={specKey}
              onChange={(e) => setSpecKey(e.target.value)}
              placeholder="Key (e.g., Berat)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              value={specValue}
              onChange={(e) => setSpecValue(e.target.value)}
              placeholder="Value (e.g., 1 Kg)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="button"
              onClick={addSpecification}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onSave(formData)}
            className="flex items-center gap-2 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors"
          >
            <Save size={18} />
            Save
          </button>
          <button
            onClick={onCancel}
            className="flex items-center gap-2 px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
          >
            <X size={18} />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
