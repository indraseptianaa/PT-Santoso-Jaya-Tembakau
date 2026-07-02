import { ShoppingCart, Package, TrendingUp, DollarSign, Search, Filter, ChevronDown, ChevronLeft, User, LogOut, Bell, Settings, Clock, CheckCircle, XCircle, LayoutDashboard, FileText, UserCircle, Menu, X, Play, Pause, Volume2, Handshake, Upload, Send, CreditCard, PackageCheck, Truck, Star, Shield, Copy, Check, AlertTriangle, Smartphone, Facebook, Instagram, Youtube, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import React from 'react';

interface B2BMarketplaceDashboardProps {
  userEmail: string;
  onLogout: () => void;
  onBack?: () => void; // Function to go back to Business-to-Business page
}

// Mock Product Data for B2B Marketplace
const marketplaceProducts = [
  {
    id: 1,
    name: '358 16 Batang',
    category: 'Rokok SKT',
    price: 'Rp.....',
    unit: 'per karton',
    stock: '1.250 karton',
    image: '/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/358%2016%20BATANG%20KANAN.png',
    discount: '10%',
    jenis: 'Sigaret Kretek Tangan (SKT)',
    kemasan: 'Hard pack',
    backgroundImage: '/Design%20Produk/Latar%20Belakang%20WEB%20358.jpg',
    videoUrls: [],
  },
  {
    id: 2,
    name: 'Sosrobahu Premium 16 Batang',
    category: 'Rokok SKT',
    price: 'Rp.....',
    unit: 'per karton',
    stock: '890 karton',
    image: '/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/SOSROBAHU%20PREMIUM%2016%20BATANG%20KANAN.png',
    discount: null,
    jenis: 'Sigaret Kretek Tangan (SKT)',
    kemasan: 'Hard pack',
    backgroundImage: '/Design%20Produk/Latar%20belakang%20web%20sosrobahu%20premium.jpg',
    videoUrls: [],
  },
  {
    id: 3,
    name: 'Bahamas 12 Batang',
    category: 'Rokok SKT',
    price: 'Rp.....',
    unit: 'per karton',
    stock: '2.100 karton',
    image: '/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/BAHAMAS%2012%20BATANG%20KANAN.png',
    discount: '5%',
    jenis: 'Sigaret Kretek Tangan (SKT)',
    kemasan: 'Hard pack',
    backgroundImage: '/Design%20Produk/Latar%20Belakang%20WEB%20Bahamas.jpg',
    videoUrls: [],
  },
  {
    id: 4,
    name: 'Sosrobahu Santos Filter 12 Batang',
    category: 'Rokok SKM',
    price: 'Rp.....',
    unit: 'per karton',
    stock: '1.500 karton',
    image: '/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/SOSROBAHU%20SANTOS%20FILTER%2012%20BATANG%20KANAN.png',
    discount: null,
    jenis: 'Sigaret Kretek Mesin (SKM)',
    kemasan: 'Hard pack',
    backgroundImage: '',
    videoUrls: [],
  },
  {
    id: 5,
    name: '358 12 Batang',
    category: 'Rokok SKT',
    price: 'Rp.....',
    unit: 'per karton',
    stock: '1.800 karton',
    image: '/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/358%2012%20BATANG%20KANAN.png',
    discount: '8%',
    jenis: 'Sigaret Kretek Tangan (SKT)',
    kemasan: 'Hard pack',
    backgroundImage: '/Design%20Produk/Latar%20Belakang%20WEB%20358.jpg',
    videoUrls: [],
  },
  {
    id: 6,
    name: 'Bahamas 20 Batang',
    category: 'Rokok SKT',
    price: 'Rp.....',
    unit: 'per karton',
    stock: '950 karton',
    image: '/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/BAHAMAS%2020%20BATANG%20KANAN.png',
    discount: null,
    jenis: 'Sigaret Kretek Tangan (SKT)',
    kemasan: 'Hard pack',
    backgroundImage: '/Design%20Produk/Latar%20Belakang%20WEB%20Bahamas.jpg',
    videoUrls: [],
  },
  {
    id: 7,
    name: 'Santos Bahamas Filter 12 Batang',
    category: 'Rokok SKM',
    price: 'Rp.....',
    unit: 'per karton',
    stock: '1.200 karton',
    image: '/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/SANTOS%20BAHAMAS%20FILTER%2012%20BATANG%20KANAN.png',
    discount: '12%',
    jenis: 'Sigaret Kretek Mesin (SKM)',
    kemasan: 'Hard pack',
    backgroundImage: '',
    videoUrls: [],
  },
  {
    id: 8,
    name: 'Kupu Biru 16 Batang',
    category: 'Rokok SKT',
    price: 'Rp.....',
    unit: 'per karton',
    stock: '1.100 karton',
    image: '/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/KUPU%20BIRU%2016%20BATANG%20KANAN.png',
    discount: '7%',
    jenis: 'Sigaret Kretek Tangan (SKT)',
    kemasan: 'Hard pack',
    backgroundImage: '/Design%20Produk/Latar%20Belakang%20kupu%20biru.jpg',
    videoUrls: [],
  },
  {
    id: 9,
    name: 'Sosrobahu Kopi Hitam 12 Batang',
    category: 'Rokok SKT',
    price: 'Rp.....',
    unit: 'per karton',
    stock: '1.650 karton',
    image: '/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/SOSROBAHU%20KOPI%20HITAM%2012%20BATANG%20KANAN.png',
    discount: null,
    jenis: 'Sigaret Kretek Tangan (SKT)',
    kemasan: 'Hard pack',
    backgroundImage: '/Design%20Produk/latar%20belakang%20sosrobahu%20kopi%20hitam.jpg',
    videoUrls: [],
  },
  {
    id: 10,
    name: 'Sosrobahu 12 Batang',
    category: 'Rokok SKT',
    price: 'Rp.....',
    unit: 'per karton',
    stock: '1.950 karton',
    image: '/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/SOSROBAHU%2012%20BATANG%20KANAN.png',
    discount: '6%',
    jenis: 'Sigaret Kretek Tangan (SKT)',
    kemasan: 'Hard pack',
    backgroundImage: '/Design%20Produk/latar%20belakang%20sosrobahu%20original.jpg',
    videoUrls: [],
  },

  // TEMBAKAU TSC PRODUCTS
  {
    id: 11,
    name: 'EXPANDED DOUBLE CUTTER',
    category: 'Tembakau TSC',
    price: 'Rp.....',
    unit: 'per kg',
    stock: '8.000 kg',
    image: '/Produk%20TSC%20SJT/EXPANDED%20DOUBLE%20CUTTER.png',
    discount: '10%',
    jenis: 'Tembakau Siap Campur (TSC)',
    kemasan: 'Karung/Karton Box',
    backgroundImage: '',
    videoUrls: ['https://www.youtube.com/watch?v=HxA7VSPZ5Jc', 'https://www.youtube.com/watch?v=oSHrdm35O-w'],
  },
  {
    id: 12,
    name: 'EXPANDED SINGLE CUT',
    category: 'Tembakau TSC',
    price: 'Rp.....',
    unit: 'per kg',
    stock: '6.500 kg',
    image: '/Produk%20TSC%20SJT/EXPANDED%20SINGLE%20CUT.png',
    discount: null,
    jenis: 'Tembakau Siap Campur (TSC)',
    kemasan: 'Karung/Karton Box',
    backgroundImage: '',
    videoUrls: ['https://www.youtube.com/watch?v=AkOtAJongoM', 'https://www.youtube.com/watch?v=jtNzX5qD8As'],
  },
  {
    id: 13,
    name: 'FINES KASTURI',
    category: 'Tembakau TSC',
    price: 'Rp.....',
    unit: 'per kg',
    stock: '5.000 kg',
    image: '/Produk%20TSC%20SJT/FINES%20KASTURI.png',
    discount: '15%',
    jenis: 'Tembakau Siap Campur (TSC)',
    kemasan: 'Karung/Karton Box',
    backgroundImage: '',
    videoUrls: ['https://www.youtube.com/watch?v=-GtMh6o1w-w', 'https://www.youtube.com/watch?v=Y0E3Mi0VCvQ'],
  },
  {
    id: 14,
    name: 'FINES PAITON',
    category: 'Tembakau TSC',
    price: 'Rp.....',
    unit: 'per kg',
    stock: '7.200 kg',
    image: '/Produk%20TSC%20SJT/FINES%20PAITON.png',
    discount: null,
    jenis: 'Tembakau Siap Campur (TSC)',
    kemasan: 'Karung/Karton Box',
    backgroundImage: '',
    videoUrls: ['https://www.youtube.com/watch?v=AAeRjUF6djU', 'https://www.youtube.com/watch?v=8NLmH7zwQfg'],
  },
  {
    id: 15,
    name: 'FINES RAJANG MADURA',
    category: 'Tembakau TSC',
    price: 'Rp.....',
    unit: 'per kg',
    stock: '4.800 kg',
    image: '/Produk%20TSC%20SJT/FINES%20RAJANG%20MADURA.png',
    discount: '8%',
    jenis: 'Tembakau Siap Campur (TSC)',
    kemasan: 'Karung/Karton Box',
    backgroundImage: '',
    videoUrls: ['https://www.youtube.com/watch?v=6N_jXonxguQ', 'https://www.youtube.com/watch?v=RAV4PH0vKO4'],
  },
  {
    id: 16,
    name: 'PAITON TRASING',
    category: 'Tembakau TSC',
    price: 'Rp.....',
    unit: 'per kg',
    stock: '9.500 kg',
    image: '/Produk%20TSC%20SJT/PAITON%20TRASING.png',
    discount: null,
    jenis: 'Tembakau Siap Campur (TSC)',
    kemasan: 'Karung/Karton Box',
    backgroundImage: '',
    videoUrls: ['https://www.youtube.com/watch?v=ncvE2QhF87s', 'https://www.youtube.com/watch?v=05WUHgg1m5E'],
  },
  {
    id: 17,
    name: 'PAKPIE',
    category: 'Tembakau TSC',
    price: 'Rp.....',
    unit: 'per kg',
    stock: '5.600 kg',
    image: '/Produk%20TSC%20SJT/PAKPIE.png',
    discount: '12%',
    jenis: 'Tembakau Siap Campur (TSC)',
    kemasan: 'Karung/Karton Box',
    backgroundImage: '',
    videoUrls: ['https://www.youtube.com/watch?v=B8aUfjmhEmA', 'https://www.youtube.com/watch?v=EOwdUUdGSGg'],
  },
  {
    id: 18,
    name: 'REDRY RAJANGLOMBOK',
    category: 'Tembakau TSC',
    price: 'Rp.....',
    unit: 'per kg',
    stock: '4.200 kg',
    image: '/Produk%20TSC%20SJT/REDRY%20RAJANGLOMBOK.png',
    discount: null,
    jenis: 'Tembakau Siap Campur (TSC)',
    kemasan: 'Karung/Karton Box',
    backgroundImage: '',
    videoUrls: ['https://www.youtube.com/watch?v=jPYU8BO5hSs'],
  },
  {
    id: 19,
    name: 'SCRAP KASTURI',
    category: 'Tembakau TSC',
    price: 'Rp.....',
    unit: 'per kg',
    stock: '8.800 kg',
    image: '/Produk%20TSC%20SJT/SCRAP%20KASTURI.png',
    discount: '5%',
    jenis: 'Tembakau Siap Campur (TSC)',
    kemasan: 'Karung/Karton Box',
    backgroundImage: '',
    videoUrls: ['https://www.youtube.com/watch?v=xROtXWOopn0', 'https://www.youtube.com/watch?v=ECHr97tPu6M'],
  },
  {
    id: 20,
    name: 'SCRAP RAJANG PAITON',
    category: 'Tembakau TSC',
    price: 'Rp.....',
    unit: 'per kg',
    stock: '10.500 kg',
    image: '/Produk%20TSC%20SJT/SCRAP%20RAJANG%20PAITON.png',
    discount: null,
    jenis: 'Tembakau Siap Campur (TSC)',
    kemasan: 'Karung/Karton Box',
    backgroundImage: '',
    videoUrls: ['https://www.youtube.com/watch?v=Mal5IxPSMc4', 'https://www.youtube.com/watch?v=dRMe5Ud2C4M'],
  },
  {
    id: 21,
    name: 'TSC BOLD',
    category: 'Tembakau TSC',
    price: 'Rp.....',
    unit: 'per kg',
    stock: '3.500 kg',
    image: '/Produk%20TSC%20SJT/TSC%20BOLD.png',
    discount: '18%',
    jenis: 'Tembakau Siap Campur (TSC)',
    kemasan: 'Karung/Karton Box',
    backgroundImage: '',
    videoUrls: ['https://www.youtube.com/watch?v=Uvs8CWYNDtE', 'https://www.youtube.com/watch?v=WMfu_ZH0hyg'],
  },
  {
    id: 22,
    name: 'TSC KRETEK',
    category: 'Tembakau TSC',
    price: 'Rp.....',
    unit: 'per kg',
    stock: '4.100 kg',
    image: '/Produk%20TSC%20SJT/TSC%20KRETEK.png',
    discount: null,
    jenis: 'Tembakau Siap Campur (TSC)',
    kemasan: 'Karung/Karton Box',
    backgroundImage: '',
    videoUrls: ['https://www.youtube.com/watch?v=7fapUBzv5XI', 'https://www.youtube.com/watch?v=LYVwfHn8ERc'],
  },
  {
    id: 23,
    name: 'TSC MILD',
    category: 'Tembakau TSC',
    price: 'Rp.....',
    unit: 'per kg',
    stock: '5.800 kg',
    image: '/Produk%20TSC%20SJT/TSC%20MILD.png',
    discount: '10%',
    jenis: 'Tembakau Siap Campur (TSC)',
    kemasan: 'Karung/Karton Box',
    backgroundImage: '',
    videoUrls: ['https://www.youtube.com/watch?v=Ah_bEOYHo6o'],
  },
  {
    id: 24,
    name: 'TSC REGULER',
    category: 'Tembakau TSC',
    price: 'Rp.....',
    unit: 'per kg',
    stock: '6.200 kg',
    image: '/Produk%20TSC%20SJT/TSC%20REGULER.png',
    discount: null,
    jenis: 'Tembakau Siap Campur (TSC)',
    kemasan: 'Karung/Karton Box',
    backgroundImage: '',
    videoUrls: ['https://www.youtube.com/watch?v=SWRcXGxQ614', 'https://www.youtube.com/watch?v=FDtgNUj_h6g'],
  },
  {
    id: 25,
    name: 'MATA AYAM YUNAN',
    category: 'Tembakau TSC',
    price: 'Rp.....',
    unit: 'per kg',
    stock: '2.800 kg',
    image: '/Produk%20TSC%20SJT/MATA%20AYAM%20YUNAN.png',
    discount: '20%',
    jenis: 'Tembakau Siap Campur (TSC)',
    kemasan: 'Karung/Karton Box',
    backgroundImage: '',
    videoUrls: [],
  },
  {
    id: 26,
    name: 'MATA AYAM KASTURI',
    category: 'Tembakau TSC',
    price: 'Rp.....',
    unit: 'per kg',
    stock: '3.200 kg',
    image: '/Produk%20TSC%20SJT/MATA%20AYAM%20KASTURI.png',
    discount: null,
    jenis: 'Tembakau Siap Campur (TSC)',
    kemasan: 'Karung/Karton Box',
    backgroundImage: '',
    videoUrls: [],
  },
  {
    id: 27,
    name: 'MATA AYAM MADURA',
    category: 'Tembakau TSC',
    price: 'Rp.....',
    unit: 'per kg',
    stock: '4.500 kg',
    image: '/Produk%20TSC%20SJT/MATA%20AYAM%20MADURA.png',
    discount: '15%',
    jenis: 'Tembakau Siap Campur (TSC)',
    kemasan: 'Karung/Karton Box',
    backgroundImage: '',
    videoUrls: [],
  },
  {
    id: 28,
    name: 'MATA AYAM LOMBOK',
    category: 'Tembakau TSC',
    price: 'Rp.....',
    unit: 'per kg',
    stock: '3.600 kg',
    image: '/Produk%20TSC%20SJT/MATA%20AYAM%20LOMBOK.png',
    discount: null,
    jenis: 'Tembakau Siap Campur (TSC)',
    kemasan: 'Karung/Karton Box',
    backgroundImage: '',
    videoUrls: [],
  },
  {
    id: 29,
    name: 'FINES',
    category: 'Tembakau TSC',
    price: 'Rp.....',
    unit: 'per kg',
    stock: '6.800 kg',
    image: '/Produk%20TSC%20SJT/FINES.png',
    discount: '8%',
    jenis: 'Tembakau Siap Campur (TSC)',
    kemasan: 'Karung/Karton Box',
    backgroundImage: '',
    videoUrls: [],
  },
  {
    id: 30,
    name: 'EXPANDED',
    category: 'Tembakau TSC',
    price: 'Rp.....',
    unit: 'per kg',
    stock: '5.400 kg',
    image: '/Produk%20TSC%20SJT/EXPANDED.png',
    discount: null,
    jenis: 'Tembakau Siap Campur (TSC)',
    kemasan: 'Karung/Karton Box',
    backgroundImage: '',
    videoUrls: [],
  },
  {
    id: 31,
    name: 'UPON REQUEST',
    category: 'Tembakau TSC',
    price: 'Hubungi Kami',
    unit: 'per kg',
    stock: 'Sesuai Permintaan',
    image: '/Produk%20TSC%20SJT/UPON%20REQUEST.png',
    discount: null,
    jenis: 'Tembakau Siap Campur (TSC)',
    kemasan: 'Karung/Karton Box',
    backgroundImage: '',
    videoUrls: [],
  },
  {
    id: 32,
    name: 'UPON REQUEST (Custom)',
    category: 'Tembakau TSC',
    price: 'Hubungi Kami',
    unit: 'per kg',
    stock: 'Sesuai Permintaan',
    image: '/Produk%20TSC%20SJT/UPON%20REQUEST.png',
    discount: null,
    jenis: 'Tembakau Siap Campur (TSC)',
    kemasan: 'Karung/Karton Box',
    backgroundImage: '',
    videoUrls: [],
  },

  // TEMBAKAU TSG PRODUCTS
  {
    id: 33,
    name: 'TSG BOLD',
    category: 'Tembakau TSG',
    price: 'Rp.....',
    unit: 'per kg',
    stock: '2.500 kg',
    image: '/PRODUK%20TEMBAKAU%20TSG/TSG%20BOLD.png',
    discount: '15%',
    jenis: 'Tembakau Siap Giling (TSG)',
    kemasan: 'Karung/Karton Box',
    backgroundImage: '',
    videoUrls: [],
  },
  {
    id: 34,
    name: 'TSG KRETEK',
    category: 'Tembakau TSG',
    price: 'Rp.....',
    unit: 'per kg',
    stock: '3.100 kg',
    image: '/PRODUK%20TEMBAKAU%20TSG/TSG%20KRETEK.png',
    discount: null,
    jenis: 'Tembakau Siap Giling (TSG)',
    kemasan: 'Karung/Karton Box',
    backgroundImage: '',
    videoUrls: [],
  },
  {
    id: 35,
    name: 'TSG MILD',
    category: 'Tembakau TSG',
    price: 'Rp.....',
    unit: 'per kg',
    stock: '4.200 kg',
    image: '/PRODUK%20TEMBAKAU%20TSG/TSG%20MILD.png',
    discount: '10%',
    jenis: 'Tembakau Siap Giling (TSG)',
    kemasan: 'Karung/Karton Box',
    backgroundImage: '',
    videoUrls: [],
  },
  {
    id: 36,
    name: 'TSG PUTIHAN',
    category: 'Tembakau TSG',
    price: 'Rp.....',
    unit: 'per kg',
    stock: '2.800 kg',
    image: '/PRODUK%20TEMBAKAU%20TSG/TSG%20PUTIHAN.png',
    discount: null,
    jenis: 'Tembakau Siap Giling (TSG)',
    kemasan: 'Karung/Karton Box',
    backgroundImage: '',
    videoUrls: [],
  },
  {
    id: 37,
    name: 'TSG REGULER',
    category: 'Tembakau TSG',
    price: 'Rp.....',
    unit: 'per kg',
    stock: '3.500 kg',
    image: '/PRODUK%20TEMBAKAU%20TSG/TSG%20REGULER.png',
    discount: '12%',
    jenis: 'Tembakau Siap Giling (TSG)',
    kemasan: 'Karung/Karton Box',
    backgroundImage: '',
    videoUrls: [],
  },
  {
    id: 38,
    name: 'TSG UPON REQUEST',
    category: 'Tembakau TSG',
    price: 'Hubungi Kami',
    unit: 'per kg',
    stock: 'Sesuai Permintaan',
    image: '/PRODUK%20TEMBAKAU%20TSG/TSG%20UPON%20REQUEST.png',
    discount: null,
    jenis: 'Tembakau Siap Giling (TSG)',
    kemasan: 'Karung/Karton Box',
    backgroundImage: '',
    videoUrls: [],
  },
];

export function B2BMarketplaceDashboard({ userEmail, onLogout, onBack }: B2BMarketplaceDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<Array<{
    product: typeof marketplaceProducts[0];
    quantity: number;
  }>>([]);
  const [activeView, setActiveView] = useState<'dashboard' | 'marketplace' | 'orders' | 'settings' | 'product-detail' | 'cart' | 'notifications' | 'proposals' | 'payment' | 'partnership-detail' | 'farmer-partnership-detail' | 'order-detail'>('marketplace');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<typeof marketplaceProducts[0] | null>(null);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [fullName, setFullName] = useState('');
  const [tempFullName, setTempFullName] = useState('');
  const [profileSaved, setProfileSaved] = useState(false);

  // Proposal form state
  const [proposalType, setProposalType] = useState('Penawaran Produk');
  const [companyName, setCompanyName] = useState('');
  const [productName, setProductName] = useState('');
  const [proposalDescription, setProposalDescription] = useState('');
  const [proposalPrice, setProposalPrice] = useState('');
  const [proposalQuantity, setProposalQuantity] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [proposalNotes, setProposalNotes] = useState('');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [proposalFormError, setProposalFormError] = useState('');
  
  // Sample submitted proposals
  const [proposals, setProposals] = useState([
    {
      id: 1,
      type: 'Penawaran Produk',
      company: 'PT Distributor Jaya',
      productName: 'Tembakau Premium Grade A',
      status: 'Review',
      date: '2024-12-20',
      price: 'Rp 45.000.000',
    },
    {
      id: 2,
      type: 'Kerja Sama',
      company: 'CV Mitra Sukses',
      productName: 'Partnership Distribusi Regional',
      status: 'Approved',
      date: '2024-12-15',
      price: '-',
    },
  ]);

  // Payment state
  const [paymentProof, setPaymentProof] = useState<string | null>(null);
  const [paymentNotes, setPaymentNotes] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderBank, setSenderBank] = useState('');
  const [transferDate, setTransferDate] = useState('');
  const [paymentFormError, setPaymentFormError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [successOrderNumber, setSuccessOrderNumber] = useState('');
  const [successOrderDate, setSuccessOrderDate] = useState('');
  const [successOrderTotal, setSuccessOrderTotal] = useState('');

  // Orders state - Real-time order management
  const [orderHistory, setOrderHistory] = useState([
    {
      id: '#SJT-ORD-2024-001',
      date: '20 Des 2024',
      product: 'Rokok SKT Premium',
      quantity: '50 karton',
      total: 'Rp 22.500.000',
      status: 'Terkirim',
      statusColor: 'green',
      icon: CheckCircle,
      image: '/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/SOSROBAHU%20PREMIUM%2016%20BATANG%20KIRI.png',
      trackingHistory: [
        { status: 'Pesanan Dibuat', date: '15 Des 2024, 10:00', description: 'Pesanan telah dibuat dan menunggu pembayaran', completed: true },
        { status: 'Pembayaran Dikonfirmasi', date: '15 Des 2024, 14:30', description: 'Pembayaran telah diverifikasi', completed: true },
        { status: 'Pesanan Diproses', date: '16 Des 2024, 09:00', description: 'Pesanan sedang disiapkan', completed: true },
        { status: 'Dalam Pengiriman', date: '18 Des 2024, 08:00', description: 'Pesanan sedang dalam perjalanan', completed: true },
        { status: 'Pesanan Terkirim', date: '20 Des 2024, 15:00', description: 'Pesanan telah sampai di tujuan', completed: true },
      ],
      items: [{ name: 'Rokok SKT Premium', quantity: 50, unit: 'karton', price: 'Rp 450.000', subtotal: 'Rp 22.500.000' }],
    },
    {
      id: '#SJT-ORD-2024-002',
      date: '18 Des 2024',
      product: 'Tembakau TSC Grade A',
      quantity: '200 kg',
      total: 'Rp 25.000.000',
      status: 'Diproses',
      statusColor: 'amber',
      icon: Clock,
      image: '/Produk%20TSC%20SJT/EXPANDED%20DOUBLE%20CUTTER.png',
      trackingHistory: [
        { status: 'Pesanan Dibuat', date: '18 Des 2024, 11:00', description: 'Pesanan telah dibuat dan menunggu pembayaran', completed: true },
        { status: 'Pembayaran Dikonfirmasi', date: '18 Des 2024, 16:00', description: 'Pembayaran telah diverifikasi', completed: true },
        { status: 'Pesanan Diproses', date: '19 Des 2024, 08:00', description: 'Pesanan sedang disiapkan', completed: true },
        { status: 'Dalam Pengiriman', date: '-', description: 'Menunggu proses pengiriman', completed: false },
        { status: 'Pesanan Terkirim', date: '-', description: 'Belum dikirim', completed: false },
      ],
      items: [{ name: 'Tembakau TSC Grade A', quantity: 200, unit: 'kg', price: 'Rp 125.000', subtotal: 'Rp 25.000.000' }],
    },
    {
      id: '#SJT-ORD-2024-003',
      date: '15 Des 2024',
      product: 'Rokok SKM International',
      quantity: '30 karton',
      total: 'Rp 15.600.000',
      status: 'Dikirim',
      statusColor: 'blue',
      icon: Truck,
      image: '/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/SOSROBAHU%20INTERNATIONAL%2016%20BATANG%20KANAN.png',
      trackingHistory: [
        { status: 'Pesanan Dibuat', date: '15 Des 2024, 09:30', description: 'Pesanan telah dibuat dan menunggu pembayaran', completed: true },
        { status: 'Pembayaran Dikonfirmasi', date: '15 Des 2024, 13:00', description: 'Pembayaran telah diverifikasi', completed: true },
        { status: 'Pesanan Diproses', date: '16 Des 2024, 10:00', description: 'Pesanan sedang disiapkan', completed: true },
        { status: 'Dalam Pengiriman', date: '17 Des 2024, 07:00', description: 'Pesanan sedang dalam perjalanan', completed: true },
        { status: 'Pesanan Terkirim', date: '-', description: 'Estimasi tiba: 22 Des 2024', completed: false },
      ],
      items: [{ name: 'Rokok SKM International', quantity: 30, unit: 'karton', price: 'Rp 520.000', subtotal: 'Rp 15.600.000' }],
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // Video controls state
  const [videoPlayingStates, setVideoPlayingStates] = useState<Record<number, boolean>>({});
  const [videoMutedStates, setVideoMutedStates] = useState<Record<number, boolean>>({});
  const videoRefs = React.useRef<Record<number, HTMLIFrameElement | null>>({});

  // 2FA States
  const [is2FAEnabled, setIs2FAEnabled] = useState(() => {
    const saved = localStorage.getItem('user_2fa_' + userEmail);
    return saved === 'enabled';
  });
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [show2FASuccess, setShow2FASuccess] = useState(false);
  const [showQRCode, setShowQRCode] = useState(true);
  const [verificationCode, setVerificationCode] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [copiedBackupCodes, setCopiedBackupCodes] = useState(false);
  const [copiedSecretKey, setCopiedSecretKey] = useState(false);
  const [isVerifying2FA, setIsVerifying2FA] = useState(false);
  const [qrCodeUrl] = useState(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/PT%20Santoso%20Jaya:${userEmail}?secret=JBSWY3DPEHPK3PXP&issuer=PT%20Santoso%20Jaya`);
  const [secretKey] = useState('JBSWY3DPEHPK3PXP');

  // Toggle play/pause for a specific video
  const toggleVideoPlayPause = (index: number) => {
    const iframe = videoRefs.current[index];
    if (iframe) {
      const isPlaying = videoPlayingStates[index];
      const message = isPlaying 
        ? '{"event":"command","func":"pauseVideo","args":""}' 
        : '{"event":"command","func":"playVideo","args":""}';
      iframe.contentWindow?.postMessage(message, '*');
      setVideoPlayingStates(prev => ({ ...prev, [index]: !isPlaying }));
    }
  };

  // Toggle mute/unmute for a specific video
  const toggleVideoMute = (index: number) => {
    const iframe = videoRefs.current[index];
    if (iframe) {
      const isMuted = videoMutedStates[index];
      const message = isMuted 
        ? '{"event":"command","func":"unMute","args":""}' 
        : '{"event":"command","func":"mute","args":""}';
      iframe.contentWindow?.postMessage(message, '*');
      setVideoMutedStates(prev => ({ ...prev, [index]: !isMuted }));
    }
  };

  // Initialize temp profile values when entering settings
  React.useEffect(() => {
    if (activeView === 'settings') {
      setTempFullName(fullName);
    }
  }, [activeView, fullName]);

  // Initialize video states when product changes
  React.useEffect(() => {
    if (selectedProduct?.videoUrls) {
      const initialPlayingStates: Record<number, boolean> = {};
      const initialMutedStates: Record<number, boolean> = {};
      
      selectedProduct.videoUrls.forEach((_, index) => {
        initialPlayingStates[index] = true; // Start as playing (autoplay)
        initialMutedStates[index] = true; // Start muted
      });
      
      setVideoPlayingStates(initialPlayingStates);
      setVideoMutedStates(initialMutedStates);
    }
  }, [selectedProduct]);

  const handleAddToCart = () => {
    if (!selectedProduct) return;

    const existingItemIndex = cartItems.findIndex(item => item.product.id === selectedProduct.id);
    
    if (existingItemIndex > -1) {
      // Product already in cart, update quantity
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += orderQuantity;
      setCartItems(updatedCart);
    } else {
      // Add new product to cart
      setCartItems([...cartItems, { product: selectedProduct, quantity: orderQuantity }]);
    }

    // Show notification on button
    setShowCartNotification(true);
    setTimeout(() => {
      setShowCartNotification(false);
      setOrderQuantity(1); // Reset quantity after notification
    }, 2000);
  };

  const handleUpdateCartQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    
    const updatedCart = cartItems.map(item => 
      item.product.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems(cartItems.filter(item => item.product.id !== productId));
  };

  const handleSaveProfile = () => {
    // Save the temporary values to actual profile
    setFullName(tempFullName);
    
    // Show saved state on button
    setProfileSaved(true);
    setTimeout(() => {
      setProfileSaved(false);
    }, 3000);
  };

  const handleCancelProfile = () => {
    // Reset temporary values to saved profile values
    setTempFullName(fullName);
  };

  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalCartPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseInt(item.product.price.replace(/[^0-9]/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  // 2FA Functions
  const handleEnable2FA = () => {
    setShow2FASetup(true);
    setShowQRCode(true);
    setVerificationCode('');
    const codes = Array.from({ length: 10 }, () => 
      Math.random().toString(36).substring(2, 10).toUpperCase()
    );
    setBackupCodes(codes);
  };

  const handleDisable2FA = () => {
    if (window.confirm('Apakah Anda yakin ingin menonaktifkan Autentikasi Dua Faktor?\n\nAkun Anda akan menjadi kurang aman.')) {
      setIs2FAEnabled(false);
      localStorage.removeItem('user_2fa_' + userEmail);
      setShow2FASetup(false);
      setShow2FASuccess(true);
      setTimeout(() => setShow2FASuccess(false), 3000);
    }
  };

  const handleVerify2FA = () => {
    if (verificationCode.length !== 6) {
      alert('Kode verifikasi harus 6 digit!');
      return;
    }

    setIsVerifying2FA(true);
    
    setTimeout(() => {
      setIsVerifying2FA(false);
      setIs2FAEnabled(true);
      localStorage.setItem('user_2fa_' + userEmail, 'enabled');
      setShow2FASetup(false);
      setVerificationCode('');
      setShow2FASuccess(true);
      setTimeout(() => setShow2FASuccess(false), 3000);
    }, 1500);
  };

  const handleCopySecretKey = () => {
    navigator.clipboard.writeText(secretKey);
    setCopiedSecretKey(true);
    setTimeout(() => setCopiedSecretKey(false), 2000);
  };

  const handleCopyBackupCodes = () => {
    const codesText = backupCodes.join('\n');
    navigator.clipboard.writeText(codesText);
    setCopiedBackupCodes(true);
    setTimeout(() => setCopiedBackupCodes(false), 2000);
  };

  const handleQuickAddToCart = (product: typeof marketplaceProducts[0]) => {
    const existingItemIndex = cartItems.findIndex(item => item.product.id === product.id);
    
    if (existingItemIndex > -1) {
      // Product already in cart, update quantity
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1;
      setCartItems(updatedCart);
    } else {
      // Add new product to cart with quantity 1
      setCartItems([...cartItems, { product: product, quantity: 1 }]);
    }
  };

  const handleViewDetail = (product: typeof marketplaceProducts[0]) => {
    setSelectedProduct(product);
    setActiveView('product-detail');
  };

  const handleCloseDetail = () => {
    setSelectedProduct(null);
    setActiveView('marketplace');
  };

  const filteredProducts = marketplaceProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Handle Rokok category - match both SKT and SKM
    let matchesCategory = false;
    if (!selectedCategory) {
      matchesCategory = true;
    } else if (selectedCategory === 'Rokok') {
      matchesCategory = product.category === 'Rokok SKT' || product.category === 'Rokok SKM';
    } else {
      matchesCategory = product.category === selectedCategory;
    }
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Marketplace View - Full Page (No Sidebar) - Landing page setelah login */}
      {activeView === 'marketplace' && (
        <div className="min-h-screen bg-gray-50">
          {/* Top Navigation Bar - White with Transparent Card Wrapper */}
          <header className="relative z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-6">
              <div className="bg-white/95 backdrop-blur-md border border-gray-200 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl p-3 sm:p-4">
                
                {/* Colorful Top Border */}
                <div className="w-full h-1.5 sm:h-2 flex -mt-3 sm:-mt-4 -mx-3 sm:-mx-4 mb-3 sm:mb-4 rounded-t-xl sm:rounded-t-2xl overflow-hidden">
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
                  {/* Logo & Title */}
                  <div className="flex items-center gap-2 sm:gap-4">
                    <div className="bg-gray-50 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-gray-200 shadow-sm">
                      <img 
                        src="/Logo%20PT%20Santoso.png"
                        alt="PT Santoso Jaya Tembakau"
                        className="h-8 sm:h-12 w-auto drop-shadow-lg"
                      />
                    </div>
                    <div className="hidden sm:block">
                      <h1 className="text-xl font-bold text-gray-900 drop-shadow-sm">Business-to-Business</h1>
                      <p className="text-sm text-gray-700">Santoso Jaya Tembakau</p>
                    </div>
                  </div>

                  {/* User Menu & Actions */}
                  <div className="flex items-center gap-2 sm:gap-4">
                    {/* Notifications */}
                    <button 
                      onClick={() => setActiveView('notifications')}
                      className="relative p-2 sm:p-2.5 hover:bg-gray-100 rounded-lg sm:rounded-xl transition-all duration-300"
                    >
                      <Bell size={18} className="sm:hidden text-gray-700" />
                      <Bell size={20} className="hidden sm:block text-gray-700" />
                      {notificationCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-[10px] sm:text-xs rounded-full flex items-center justify-center font-semibold border border-white shadow-lg">
                          {notificationCount}
                        </span>
                      )}
                    </button>

                    {/* Cart */}
                    <button 
                      onClick={() => setActiveView('cart')}
                      className="relative p-2 sm:p-2.5 hover:bg-gray-100 rounded-lg sm:rounded-xl transition-all duration-300"
                    >
                      <ShoppingCart size={18} className="sm:hidden text-gray-700" />
                      <ShoppingCart size={20} className="hidden sm:block text-gray-700" />
                      {getTotalCartItems() > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-[10px] sm:text-xs rounded-full flex items-center justify-center font-semibold border border-white shadow-lg">
                          {getTotalCartItems()}
                        </span>
                      )}
                    </button>

                    {/* User Profile - Clickable to open Dashboard */}
                    <button
                      onClick={() => setActiveView('dashboard')}
                      className="flex items-center gap-2 sm:gap-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg sm:rounded-xl px-2 py-2 sm:px-4 sm:py-2.5 transition-all duration-300"
                    >
                      <User size={16} className="sm:hidden text-gray-700" />
                      <User size={18} className="hidden sm:block text-gray-700" />
                      <span className="text-xs sm:text-sm text-gray-700 font-medium hidden md:inline">{userEmail}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
            {/* Social Media Follow Section */}
            <div className="mb-4 sm:mb-6">
              <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-3">Ikuti Kami</h3>
              <div className="flex gap-3">
                <a 
                  href="https://www.facebook.com/share/1Y8241S7zQ/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-500/20 hover:bg-gray-500/30 text-gray-700 rounded-lg transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a 
                  href="https://www.instagram.com/santosojayatembakau?igsh=aW1kcmtzeDlwZXRt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-500/20 hover:bg-gray-500/30 text-gray-700 rounded-lg transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a 
                  href="http://wa.me/+6285336688356"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-500/20 hover:bg-gray-500/30 text-gray-700 rounded-lg transition-colors"
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
                  className="p-2 bg-gray-500/20 hover:bg-gray-500/30 text-gray-700 rounded-lg transition-colors"
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
                  className="p-2 bg-gray-500/20 hover:bg-gray-500/30 text-gray-700 rounded-lg transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube size={20} />
                </a>
              </div>
            </div>

            {/* Search & Filter Bar */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-3 sm:p-6 mb-4 sm:mb-8">
              <div className="flex flex-col gap-3 sm:gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Cari produk..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                {/* Category Filter - Horizontal scroll on mobile */}
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base whitespace-nowrap transition-all duration-300 ${
                      !selectedCategory
                        ? 'bg-orange-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Semua Produk
                  </button>
                  <button
                    onClick={() => setSelectedCategory('Rokok')}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base whitespace-nowrap transition-all duration-300 ${
                      selectedCategory === 'Rokok'
                        ? 'bg-orange-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Rokok
                  </button>
                  <button
                    onClick={() => setSelectedCategory('Tembakau TSC')}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base whitespace-nowrap transition-all duration-300 ${
                      selectedCategory === 'Tembakau TSC'
                        ? 'bg-orange-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Tembakau TSC
                  </button>
                  <button
                    onClick={() => setSelectedCategory('Tembakau TSG')}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base whitespace-nowrap transition-all duration-300 ${
                      selectedCategory === 'Tembakau TSG'
                        ? 'bg-orange-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Tembakau TSG
                  </button>
                </div>
              </div>
            </div>

            {/* Promotional Banner - Shopee Style Layout with Parallax */}
            <div className="mb-6 sm:mb-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                {/* Left Large Banner - 50% Width with Parallax */}
                <div className="relative h-64 sm:h-[500px] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl">
                  <div 
                    className="absolute inset-0"
                    style={{
                      backgroundImage: 'url("/BG%20Direktur%20di%20B2B%20SJT.png")',
                      backgroundAttachment: 'fixed',
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-transparent"></div>
                  <div className="absolute inset-0 p-5 sm:p-12 flex flex-col justify-between text-white">
                    <div>
                      <p className="text-sm sm:text-xl opacity-90 drop-shadow-md mb-2 sm:mb-3">Direktur</p>
                      <h3 className="font-bold text-2xl sm:text-5xl mb-2 sm:mb-3 drop-shadow-lg">PT Santoso Jaya</h3>
                      <h4 className="font-bold text-xl sm:text-4xl drop-shadow-lg">Tembakau</h4>
                    </div>
                  </div>
                </div>

                {/* Right Side - 2 Stacked Banners with Parallax */}
                <div className="flex flex-col gap-3 sm:gap-6">
                  {/* Top Right Banner */}
                  <div 
                    className="relative h-32 sm:h-60 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl bg-gradient-to-br from-orange-50 to-amber-50 cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                    onClick={() => setActiveView('partnership-detail')}
                  >
                    <div 
                      className="absolute inset-0"
                      style={{
                        backgroundImage: 'url("/Manajmen%20NNA.jpg")',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-transparent"></div>
                    <div className="absolute inset-0 p-4 sm:p-8 flex items-center text-white">
                      <div>
                        <h3 className="font-bold text-base sm:text-2xl mb-1 sm:mb-2 drop-shadow-md">Business Partnership</h3>
                        <p className="text-xs sm:text-base opacity-90 mb-1 sm:mb-2 drop-shadow-md">PT. Niaga Nusa Abadi</p>
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                      <p className="text-xs sm:text-sm text-white opacity-80 drop-shadow-md">Lihat selengkapnya â†’</p>
                    </div>
                    <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4">
                      <img 
                        src="/Logo%20PT.NNA.png" 
                        alt="Logo PT. Niaga Nusa Abadi" 
                        className="w-10 h-10 sm:w-14 sm:h-14 object-contain bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-1.5 sm:p-2"
                      />
                    </div>
                  </div>

                  {/* Bottom Right Banner */}
                  <div 
                    className="relative h-32 sm:h-60 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                    onClick={() => setActiveView('farmer-partnership-detail')}
                  >
                    <div 
                      className="absolute inset-0"
                      style={{
                        backgroundImage: 'url("/Mitra%20Petani.png")',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-transparent"></div>
                    <div className="absolute inset-0 p-4 sm:p-8 flex items-center text-white">
                      <div>
                        <h3 className="font-bold text-lg sm:text-3xl drop-shadow-md">Mitra Petani</h3>
                        <h3 className="font-bold text-lg sm:text-3xl drop-shadow-md">Tembakau</h3>
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                      <p className="text-xs sm:text-sm text-white opacity-80 drop-shadow-md">Lihat selengkapnya â†’</p>
                    </div>
                    <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4">
                      <img 
                        src="/Logo%20PT%20Santoso.png" 
                        alt="Logo PT Santoso Jaya Tembakau" 
                        className="w-10 h-10 sm:w-14 sm:h-14 object-contain bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-1.5 sm:p-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div>
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div>
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-900">Katalog Produk B2B</h2>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">{filteredProducts.length} produk tersedia</p>
                </div>
                <div className="flex gap-2 hidden sm:flex">
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    <Filter size={16} className="inline mr-2" />
                    Filter
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {/* Product Image */}
                    <div className="relative h-40 sm:h-48 overflow-hidden bg-gray-200">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="p-3 sm:p-6">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
                      <div className="flex items-baseline gap-2 mb-3">
                        <p className="text-xl sm:text-2xl font-bold text-orange-600">{product.price}</p>
                        <p className="text-xs sm:text-sm text-gray-500">/ {product.unit}</p>
                      </div>
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <p className="text-xs sm:text-sm text-gray-600">
                          Stok: <span className="font-semibold text-green-600">{product.stock}</span>
                        </p>
                        <p className="text-xs text-gray-500">Min. 1 {product.unit}</p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewDetail(product)}
                          className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium text-sm sm:text-base transition-colors shadow-md hover:shadow-lg"
                        >
                          Lihat Detail
                        </button>
                        <button
                          onClick={() => handleQuickAddToCart(product)}
                          className="px-3 sm:px-4 py-2 sm:py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                          title="Tambah ke Keranjang"
                        >
                          <ShoppingCart size={18} className="sm:hidden" />
                          <ShoppingCart size={20} className="hidden sm:block" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard & Other Views - With Sidebar */}
      {(activeView === 'dashboard' || activeView === 'orders' || activeView === 'settings' || activeView === 'proposals' || activeView === 'order-detail') && (
        <div className="h-screen bg-gray-50 flex overflow-hidden">
          {/* Mobile Overlay Background */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside className={`
            bg-white text-gray-800 flex flex-col border-r border-gray-200 shadow-lg transition-all duration-300 h-screen
            lg:relative lg:translate-x-0
            fixed inset-y-0 left-0 z-40
            ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0 lg:w-16'}
          `}>
            {/* Toggle Button - Same as KarirDashboard */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="absolute top-4 right-4 z-20 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors shadow-sm"
            >
              <ChevronLeft className={`text-gray-600 transition-transform duration-300 ${!sidebarOpen ? 'rotate-180' : ''}`} size={18} />
            </button>

            {/* Profile Section - Only show when sidebar is open */}
            {sidebarOpen && (
              <div className="p-4 border-b border-gray-200 mt-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="text-white" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold truncate text-gray-900">{fullName || 'Akun B2B'}</h3>
                    <p className="text-xs text-gray-600 truncate">{userEmail}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Menu */}
            <nav className={`flex-1 px-2 space-y-1 ${sidebarOpen ? 'py-4' : 'py-16'}`}>
                <button
                  onClick={() => {
                    setActiveView('dashboard');
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-3 rounded-lg transition-colors text-left ${
                    activeView === 'dashboard'
                      ? 'bg-orange-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  title={!sidebarOpen ? 'Dashboard' : ''}
                >
                  <LayoutDashboard size={18} />
                  {sidebarOpen && <span className="text-sm">Dashboard</span>}
                </button>

                <button
                  onClick={() => {
                    setActiveView('orders');
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-3 rounded-lg transition-colors text-left ${
                    activeView === 'orders'
                      ? 'bg-orange-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  title={!sidebarOpen ? 'Riwayat Pesanan' : ''}
                >
                  <FileText size={18} />
                  {sidebarOpen && <span className="text-sm">Riwayat Pesanan</span>}
                </button>

                <button
                  onClick={() => {
                    setActiveView('proposals');
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-3 rounded-lg transition-colors text-left ${
                    activeView === 'proposals'
                      ? 'bg-orange-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  title={!sidebarOpen ? 'Penawaran' : ''}
                >
                  <Handshake size={18} />
                  {sidebarOpen && <span className="text-sm">Penawaran</span>}
                </button>

                <button
                  onClick={() => {
                    setActiveView('settings');
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-3 rounded-lg transition-colors text-left ${
                    activeView === 'settings'
                      ? 'bg-orange-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  title={!sidebarOpen ? 'Profil Saya' : ''}
                >
                  <Settings size={18} />
                  {sidebarOpen && <span className="text-sm">Profil Saya</span>}
                </button>
              </nav>

              {/* Logout Button at Bottom */}
              <div className="mt-auto border-t border-gray-200 pt-4 px-2 pb-4">
                <button
                  onClick={onLogout}
                  className={`w-full flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-3 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors`}
                  title={!sidebarOpen ? 'Logout' : ''}
                >
                  <LogOut size={18} />
                  {sidebarOpen && <span className="text-sm">Logout</span>}
                </button>
              </div>
          </aside>

          {/* Main Content */}
          <div className={`flex-1 h-screen overflow-y-auto transition-all duration-300`}>
            {/* Mobile Header with Hamburger Menu */}
            <div className="lg:hidden sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu className="text-gray-700" size={24} />
              </button>
              <div className="flex-1">
                <h2 className="font-bold text-gray-900">B2B Marketplace</h2>
                <p className="text-xs text-gray-600">Santoso Jaya Tembakau</p>
              </div>
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
                <User className="text-white" size={16} />
              </div>
            </div>

            {/* Content Area */}
            <div className="p-4 lg:p-6">
              {/* Dashboard View - Profile-like with Order Status */}
              {activeView === 'dashboard' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6 px-4 lg:px-0">
                    <button
                      onClick={() => {
                        setActiveView('marketplace');
                        if (window.innerWidth < 1024) setSidebarOpen(false);
                      }}
                      className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Kembali
                    </button>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
                      <p className="text-sm text-gray-600">Selamat datang di dashboard B2B Marketplace</p>
                    </div>
                  </div>
                  
                  {/* Stats Overview */}
                  <div className="px-4 lg:px-0">
                    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
                      {/* Belum Bayar - Orange */}
                      <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-5 shadow-lg text-white relative overflow-hidden">
                        <div className="absolute top-2 right-2">
                          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                            <CreditCard className="text-white" size={20} />
                          </div>
                        </div>
                        <div className="relative pt-1">
                          <p className="text-white text-sm font-medium mb-2">Belum Bayar</p>
                          <p className="text-4xl font-bold mb-1">3</p>
                          <p className="text-white/90 text-xs">Segera bayar</p>
                        </div>
                      </div>

                      {/* Dikemas - Amber */}
                      <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-5 shadow-lg text-white relative overflow-hidden">
                        <div className="absolute top-2 right-2">
                          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                            <PackageCheck className="text-white" size={20} />
                          </div>
                        </div>
                        <div className="relative pt-1">
                          <p className="text-white text-sm font-medium mb-2">Dikemas</p>
                          <p className="text-4xl font-bold mb-1">5</p>
                          <p className="text-white/90 text-xs">Sedang diproses</p>
                        </div>
                      </div>

                      {/* Dikirim - Green */}
                      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 shadow-lg text-white relative overflow-hidden">
                        <div className="absolute top-2 right-2">
                          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                            <Truck className="text-white" size={20} />
                          </div>
                        </div>
                        <div className="relative pt-1">
                          <p className="text-white text-sm font-medium mb-2">Dikirim</p>
                          <p className="text-4xl font-bold mb-1">12</p>
                          <p className="text-white/90 text-xs">Dalam pengiriman</p>
                        </div>
                      </div>

                      {/* Beri Nilai - Blue */}
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 shadow-lg text-white relative overflow-hidden">
                        <div className="absolute top-2 right-2">
                          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                            <Star className="text-white" size={20} />
                          </div>
                        </div>
                        <div className="relative pt-1">
                          <p className="text-white text-sm font-medium mb-2">Beri Nilai</p>
                          <p className="text-4xl font-bold mb-1">8</p>
                          <p className="text-white/90 text-xs">Menunggu ulasan</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Orders Preview */}
                  <div className="px-4 lg:px-0">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="flex items-center gap-2">
                        <Clock className="text-orange-600" size={20} />
                        Pesanan Terbaru
                      </h3>
                      <button
                        onClick={() => setActiveView('orders')}
                        className="text-orange-600 hover:text-orange-700 font-medium text-sm hover:underline">
                        Lihat Semua â†’
                      </button>
                    </div>
                    <div className="space-y-3">
                      {orderHistory.slice(0, 5).map((order) => {
                        const StatusIcon = order.icon;
                        return (
                          <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 bg-${order.statusColor}-100 rounded-full flex items-center justify-center flex-shrink-0`}>
                                <StatusIcon size={18} className={`text-${order.statusColor}-600`} />
                              </div>
                              <div className="min-w-0">
                                <p className="font-semibold text-gray-900 text-sm">{order.id}</p>
                                <p className="text-xs text-gray-600 truncate">{order.product}</p>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0 ml-2">
                              <p className="font-bold text-gray-900 text-sm">{order.total}</p>
                              <p className="text-xs text-gray-500">{order.date}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Orders View */}
              {activeView === 'orders' && (
                <div className="space-y-6">
                  <div className="px-4 lg:px-0">
                    <div className="flex items-center gap-3 mb-2">
                      <button
                        onClick={() => {
                          setActiveView('marketplace');
                          if (window.innerWidth < 1024) setSidebarOpen(false);
                        }}
                        className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        Kembali
                      </button>
                      <h2>Riwayat Pesanan</h2>
                    </div>
                    <p className="text-sm text-gray-600">{orderHistory.length} total pesanan</p>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full bg-white">
                        <thead className="bg-gray-50 border-y border-gray-200">
                          <tr>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Produk</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">No. Pesanan</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tanggal</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Jumlah</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Total</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderHistory.map((order) => {
                            const StatusIcon = order.icon;
                            return (
                              <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="py-4 px-4">
                                  <div className="flex items-center gap-3">
                                    <img 
                                      src={order.image} 
                                      alt={order.product}
                                      className="w-16 h-16 object-contain rounded-lg bg-gray-50 p-1"
                                    />
                                    <span className="text-sm text-gray-900 font-medium">{order.product}</span>
                                  </div>
                                </td>
                                <td className="py-4 px-4 text-sm font-medium text-gray-900">{order.id}</td>
                                <td className="py-4 px-4 text-sm text-gray-600">{order.date}</td>
                                <td className="py-4 px-4 text-sm text-gray-900">{order.quantity}</td>
                                <td className="py-4 px-4 text-sm font-semibold text-gray-900">{order.total}</td>
                                <td className="py-4 px-4">
                                  <span className={`inline-flex items-center gap-1 px-3 py-1 bg-${order.statusColor}-100 text-${order.statusColor}-700 rounded-full text-xs font-semibold`}>
                                    <StatusIcon size={14} />
                                    {order.status}
                                  </span>
                                </td>
                                <td className="py-4 px-4">
                                  <button 
                                    onClick={() => {
                                      setSelectedOrder(order);
                                      setActiveView('order-detail' as any);
                                    }}
                                    className="text-orange-600 hover:text-orange-700 text-sm font-medium hover:bg-orange-50 px-3 py-1 rounded transition-colors"
                                  >
                                    Detail
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                  </div>
                </div>
              )}

              {/* Order Detail View with Tracking */}
              {activeView === 'order-detail' && selectedOrder && (
                <div className="space-y-6 px-4 lg:px-0">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-2">
                    <button
                      onClick={() => {
                        setActiveView('orders');
                        setSelectedOrder(null);
                      }}
                      className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      â† Kembali
                    </button>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Detail Pesanan</h2>
                      <p className="text-sm text-gray-600">{selectedOrder.id}</p>
                    </div>
                  </div>

                  {/* Order Status Tracking */}
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <Package className="text-orange-600" size={24} />
                      Status Pesanan
                    </h3>
                    
                    {/* Timeline */}
                    <div className="relative">
                      {selectedOrder.trackingHistory.map((track: any, index: number) => (
                        <div key={index} className="flex gap-4 pb-8 last:pb-0">
                          {/* Timeline Line */}
                          <div className="relative flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              track.completed 
                                ? 'bg-green-500' 
                                : 'bg-gray-300'
                            }`}>
                              {track.completed ? (
                                <CheckCircle className="text-white" size={20} />
                              ) : (
                                <Clock className="text-white" size={20} />
                              )}
                            </div>
                            {index < selectedOrder.trackingHistory.length - 1 && (
                              <div className={`w-0.5 h-full absolute top-10 ${
                                track.completed ? 'bg-green-500' : 'bg-gray-300'
                              }`}></div>
                            )}
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 pt-1">
                            <h4 className={`font-bold ${track.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                              {track.status}
                            </h4>
                            <p className={`text-sm ${track.completed ? 'text-gray-600' : 'text-gray-400'} mb-1`}>
                              {track.date}
                            </p>
                            <p className={`text-sm ${track.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                              {track.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Information */}
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <FileText className="text-orange-600" size={24} />
                      Informasi Pesanan
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between py-3 border-b border-gray-200">
                        <span className="text-gray-600">No. Pesanan</span>
                        <span className="font-semibold text-gray-900">{selectedOrder.id}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-gray-200">
                        <span className="text-gray-600">Tanggal Pesanan</span>
                        <span className="font-semibold text-gray-900">{selectedOrder.date}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-gray-200">
                        <span className="text-gray-600">Status</span>
                        <span className={`inline-flex items-center gap-1 px-3 py-1 bg-${selectedOrder.statusColor}-100 text-${selectedOrder.statusColor}-700 rounded-full text-xs font-semibold`}>
                          {React.createElement(selectedOrder.icon, { size: 14 })}
                          {selectedOrder.status}
                        </span>
                      </div>
                      <div className="flex justify-between py-3">
                        <span className="text-gray-600">Total Pembayaran</span>
                        <span className="font-bold text-orange-600 text-lg">{selectedOrder.total}</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Package className="text-orange-600" size={24} />
                      Detail Produk
                    </h3>
                    
                    <div className="space-y-4">
                      {selectedOrder.items && selectedOrder.items.map((item: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-4">
                            <img 
                              src={selectedOrder.image} 
                              alt={item.name}
                              className="w-16 h-16 object-contain rounded-lg bg-white p-1"
                            />
                            <div>
                              <h4 className="font-semibold text-gray-900">{item.name}</h4>
                              <p className="text-sm text-gray-600">
                                {item.quantity} {item.unit} Ã— {item.price}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900">{item.subtotal}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Total Summary */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="text-gray-900">{selectedOrder.total}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">PPN (11%)</span>
                          <span className="text-gray-900">Sudah termasuk</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-gray-200">
                          <span className="font-bold text-gray-900">Total</span>
                          <span className="font-bold text-orange-600 text-lg">{selectedOrder.total}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sender Information (if available) */}
                  {selectedOrder.senderInfo && (
                    <div className="bg-white rounded-xl shadow-md p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <User className="text-orange-600" size={24} />
                        Informasi Pengirim
                      </h3>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between py-3 border-b border-gray-200">
                          <span className="text-gray-600">Nama Pengirim</span>
                          <span className="font-semibold text-gray-900">{selectedOrder.senderInfo.name}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-gray-200">
                          <span className="text-gray-600">Bank</span>
                          <span className="font-semibold text-gray-900">{selectedOrder.senderInfo.bank}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-gray-200">
                          <span className="text-gray-600">Tanggal Transfer</span>
                          <span className="font-semibold text-gray-900">{selectedOrder.senderInfo.transferDate}</span>
                        </div>
                        {selectedOrder.senderInfo.notes && (
                          <div className="py-3">
                            <span className="text-gray-600 block mb-2">Catatan</span>
                            <p className="text-gray-900">{selectedOrder.senderInfo.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => window.print()}
                      className="flex-1 px-6 py-3 bg-white border-2 border-orange-600 text-orange-600 rounded-xl font-semibold transition-all duration-300 hover:bg-orange-50 flex items-center justify-center gap-2"
                    >
                      <FileText size={20} />
                      Cetak Invoice
                    </button>
                    <button
                      onClick={() => {
                        alert('Fitur bantuan akan segera tersedia. Silakan hubungi CS kami di WhatsApp: 0812-3456-7890');
                      }}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      <HelpCircle size={20} />
                      Butuh Bantuan?
                    </button>
                  </div>
                </div>
              )}

              {/* Settings View */}
              {activeView === 'settings' && (
                <div className="space-y-6 px-4 lg:px-0">
                  <div className="flex items-center gap-3 mb-6">
                    <button
                      onClick={() => {
                        setActiveView('marketplace');
                        if (window.innerWidth < 1024) setSidebarOpen(false);
                      }}
                      className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Kembali
                    </button>
                    <h2>Profil Saya</h2>
                  </div>
                  
                  {/* Photo Profile Upload */}
                  <div>
                    <h3 className="mb-4 flex items-center gap-2">
                      <User className="text-orange-600" size={20} />
                      Foto Profil
                    </h3>
                    <div className="bg-white border border-gray-200 rounded-lg lg:rounded-xl p-6 shadow-sm">
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        {/* Profile Image Circle */}
                        <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <User size={48} className="text-white" />
                        </div>
                        
                        {/* Upload Info and Button */}
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">Ubah Foto Profil</h4>
                          <p className="text-sm text-gray-600 mb-4">Format: JPG, PNG (Max 2MB). Ukuran rekomendasi: 500x500px</p>
                          <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg">
                            <Upload size={18} />
                            Upload Foto
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Account Information */}
                  <div>
                    <h3 className="mb-4 flex items-center gap-2">
                      <User className="text-orange-600" size={20} />
                      Informasi Akun
                    </h3>
                    <div className="bg-white border border-gray-200 rounded-lg lg:rounded-xl p-6 shadow-sm">
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                          <input
                            type="email"
                            value={userEmail}
                            disabled
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                          <input
                            type="text"
                            value={tempFullName}
                            onChange={(e) => setTempFullName(e.target.value)}
                            placeholder="Masukkan nama lengkap"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Perusahaan</label>
                          <input
                            type="text"
                            defaultValue=""
                            placeholder="Masukkan nama perusahaan"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Nomor Telepon</label>
                          <input
                            type="tel"
                            defaultValue=""
                            placeholder="Masukkan nomor telepon"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Alamat</label>
                          <textarea
                            rows={4}
                            defaultValue=""
                            placeholder="Masukkan alamat lengkap"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Security Settings */}
                  <div>
                    <h3 className="mb-4 flex items-center gap-2">
                      <Settings className="text-amber-600" size={20} />
                      Pengaturan Keamanan
                    </h3>
                    <div className="bg-white border border-gray-200 rounded-lg lg:rounded-xl p-6 shadow-sm">
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Password Lama
                          </label>
                          <input
                            type="password"
                            defaultValue=""
                            placeholder="Masukkan password lama"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Password Baru
                            </label>
                            <input
                              type="password"
                              defaultValue=""
                              placeholder="Masukkan password baru"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Konfirmasi Password Baru
                            </label>
                            <input
                              type="password"
                              defaultValue=""
                              placeholder="Konfirmasi password baru"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2FA Settings */}
                  <div className="bg-white border border-gray-200 rounded-lg lg:rounded-xl p-6 shadow-sm mt-6 relative">
                    {/* Success Animation Overlay - Local to 2FA Section */}
                    {show2FASuccess && (
                      <div className="absolute inset-0 bg-white/95 z-10 rounded-lg lg:rounded-xl flex items-center justify-center backdrop-blur-sm animate-fadeIn">
                        <div className="text-center p-8">
                          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce ${is2FAEnabled ? 'bg-red-100' : 'bg-green-100'}`}>
                            <CheckCircle className={`animate-checkMark ${is2FAEnabled ? 'text-red-600' : 'text-green-600'}`} size={48} strokeWidth={2.5} />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {is2FAEnabled ? '2FA Berhasil Dinonaktifkan! âœ…' : '2FA Berhasil Diaktifkan! âœ…'}
                          </h3>
                          <p className="text-gray-600">
                            {is2FAEnabled 
                              ? 'Autentikasi Dua Faktor telah dinonaktifkan dari akun Anda'
                              : 'Akun Anda sekarang lebih aman dengan Autentikasi Dua Faktor'
                            }
                          </p>
                          <div className="w-full max-w-xs mx-auto mt-4 bg-gray-200 h-1 rounded-full overflow-hidden">
                            <div className={`h-full bg-gradient-to-r animate-progress ${is2FAEnabled ? 'from-red-600 to-red-400' : 'from-green-600 to-emerald-600'}`}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Header with Toggle */}
                    <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${is2FAEnabled ? 'bg-green-100 animate-pulse' : 'bg-gray-100'}`}>
                          <Shield className={`${is2FAEnabled ? 'text-green-600' : 'text-gray-400'}`} size={24} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-gray-800">Autentikasi Dua Faktor (2FA)</h4>
                            {is2FAEnabled && (
                              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full animate-fadeIn">
                                AKTIF
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            {is2FAEnabled 
                              ? 'âœ“ Akun Anda dilindungi dengan 2FA'
                              : 'Tambahkan lapisan keamanan ekstra ke akun Anda'
                            }
                          </p>
                        </div>
                      </div>
                      {/* Toggle Switch */}
                      <button
                        onClick={() => {
                          if (!is2FAEnabled) {
                            handleEnable2FA();
                          } else {
                            handleDisable2FA();
                          }
                        }}
                        className={`
                          relative w-14 h-7 rounded-full transition-colors duration-300
                          ${is2FAEnabled ? 'bg-green-500' : 'bg-gray-300'}
                        `}
                      >
                        <div
                          className={`
                            absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300
                            ${is2FAEnabled ? 'translate-x-7' : 'translate-x-0'}
                          `}
                        />
                      </button>
                    </div>

                    {/* Expanded Setup Content */}
                    {show2FASetup && !show2FASuccess && (
                      <div className="mt-6 space-y-6 animate-fadeIn">
                        {/* QR Code Section (Default) */}
                        {showQRCode ? (
                          <div className="space-y-4 animate-fadeIn">
                            <div className="flex items-center justify-between">
                              <div>
                                <h5 className="font-semibold text-gray-800 flex items-center gap-2">
                                  <Smartphone className="text-amber-600" size={20} />
                                  Scan QR Code
                                </h5>
                                <p className="text-sm text-gray-600 mt-1">
                                  Gunakan aplikasi Google Authenticator untuk memindai kode QR
                                </p>
                              </div>
                              <button
                                onClick={() => setShowQRCode(false)}
                                className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium whitespace-nowrap"
                              >
                                Setup Manual
                              </button>
                            </div>
                            <div className="flex justify-center py-6">
                              <div className="bg-white p-5 rounded-lg border-2 border-amber-300 shadow-lg animate-pulse">
                                <img 
                                  src={qrCodeUrl} 
                                  alt="QR Code" 
                                  className="w-52 h-52"
                                />
                              </div>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                              <p className="text-sm text-blue-800">
                                ðŸ’¡ <strong>Tip:</strong> Pastikan Anda sudah menginstall Google Authenticator di smartphone Anda
                              </p>
                            </div>
                          </div>
                        ) : (
                          /* Setup Manual Section */
                          <div className="space-y-4 animate-fadeIn">
                            <div className="flex items-center justify-between">
                              <div>
                                <h5 className="font-semibold text-gray-800 flex items-center gap-2">
                                  <Settings className="text-amber-600" size={20} />
                                  Setup Manual
                                </h5>
                                <p className="text-sm text-gray-600 mt-1">
                                  Masukkan kode berikut ke aplikasi Google Authenticator
                                </p>
                              </div>
                              <button
                                onClick={() => setShowQRCode(true)}
                                className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium whitespace-nowrap"
                              >
                                Tampilkan QR
                              </button>
                            </div>

                            {/* Steps */}
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                              <h6 className="font-semibold text-gray-800 mb-3 text-sm">Langkah-langkah:</h6>
                              <ol className="space-y-2 text-sm text-gray-700">
                                <li className="flex gap-2">
                                  <span className="font-semibold text-gray-600">1.</span>
                                  <span>Buka aplikasi Google Authenticator</span>
                                </li>
                                <li className="flex gap-2">
                                  <span className="font-semibold text-gray-600">2.</span>
                                  <span>Tap tombol "+" untuk menambahkan akun baru</span>
                                </li>
                                <li className="flex gap-2">
                                  <span className="font-semibold text-gray-600">3.</span>
                                  <span>Pilih "Masukkan kode penyiapan"</span>
                                </li>
                                <li className="flex gap-2">
                                  <span className="font-semibold text-gray-600">4.</span>
                                  <span>Masukkan informasi berikut:</span>
                                </li>
                              </ol>
                            </div>

                            {/* Secret Key */}
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Kode Secret (Key):
                              </label>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={secretKey}
                                  readOnly
                                  className="flex-1 px-4 py-3 bg-amber-50 border-2 border-amber-300 rounded-lg font-mono text-gray-800 font-semibold"
                                />
                                <button
                                  onClick={handleCopySecretKey}
                                  className={`
                                    px-4 py-3 border-2 rounded-lg transition-all duration-300 flex items-center gap-2
                                    ${copiedSecretKey 
                                      ? 'border-green-500 bg-green-50 text-green-600' 
                                      : 'border-gray-300 hover:bg-gray-50 hover:border-amber-500'
                                    }
                                  `}
                                  title="Salin kode"
                                >
                                  {copiedSecretKey ? (
                                    <>
                                      <Check size={18} className="text-green-600 animate-bounce" />
                                      <span className="text-sm font-semibold">Tersalin!</span>
                                    </>
                                  ) : (
                                    <Copy size={18} className="text-gray-600" />
                                  )}
                                </button>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Jenis Kode:
                              </label>
                              <div className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700">
                                Berbasis waktu (Time-based)
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Verification Section */}
                        <div className="pt-4 border-t border-gray-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="text-amber-600" size={20} />
                            <h5 className="font-semibold text-gray-800">Masukkan Kode Verifikasi</h5>
                          </div>
                          <p className="text-sm text-gray-600 mb-4">
                            Masukkan kode 6 digit yang ditampilkan di Google Authenticator
                          </p>
                          <div className="relative">
                            <input
                              type="text"
                              value={verificationCode}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                                setVerificationCode(value);
                              }}
                              placeholder="123456"
                              maxLength={6}
                              className={`
                                w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-center text-2xl font-mono tracking-[0.5em] bg-gray-50 transition-all duration-300
                                ${verificationCode.length === 6 ? 'border-green-500 bg-green-50' : 'border-gray-300'}
                              `}
                            />
                            {verificationCode.length === 6 && !isVerifying2FA && !show2FASuccess && (
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 animate-fadeIn">
                                <CheckCircle className="text-green-600 animate-bounce" size={24} />
                              </div>
                            )}
                          </div>
                          <button
                            onClick={handleVerify2FA}
                            disabled={verificationCode.length !== 6 || isVerifying2FA || show2FASuccess}
                            className={`
                              mt-4 w-full px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2
                              ${verificationCode.length === 6 && !isVerifying2FA && !show2FASuccess
                                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:shadow-lg hover:scale-105'
                                : isVerifying2FA
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              }
                            `}
                          >
                            {isVerifying2FA ? (
                              <>
                                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                                Memverifikasi...
                              </>
                            ) : (
                              <>
                                <Shield size={18} />
                                Verifikasi & Aktifkan
                              </>
                            )}
                          </button>
                          
                          {/* Verification Process Indicator */}
                          {isVerifying2FA && (
                            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg animate-fadeIn">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                <div>
                                  <p className="font-semibold text-blue-900">Sedang Memverifikasi Kode...</p>
                                  <p className="text-sm text-blue-700">Mohon tunggu sebentar</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Backup Codes - Only show after user inputs code */}
                        {backupCodes.length > 0 && verificationCode.length === 6 && !isVerifying2FA && !show2FASuccess && (
                          <div className="pt-4 border-t border-gray-200 animate-slideUp">
                            <div className="flex items-start gap-3 mb-4">
                              <AlertTriangle className="text-amber-600 flex-shrink-0 mt-1 animate-pulse" size={20} />
                              <div>
                                <h5 className="font-semibold text-gray-800 mb-1">Kode Cadangan</h5>
                                <p className="text-sm text-gray-600">
                                  Simpan kode ini dengan aman. Gunakan jika kehilangan akses ke Google Authenticator.
                                </p>
                              </div>
                            </div>
                            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 font-mono text-sm">
                              <div className="grid grid-cols-2 gap-3">
                                {backupCodes.map((code, index) => (
                                  <div key={index} className="text-gray-700 bg-white px-3 py-2 rounded border border-amber-200">
                                    {code}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <button
                              onClick={handleCopyBackupCodes}
                              className={`
                                mt-3 w-full px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300
                                ${copiedBackupCodes
                                  ? 'bg-green-600 text-white border-2 border-green-600'
                                  : 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:shadow-lg hover:scale-105'
                                }
                              `}
                            >
                              {copiedBackupCodes ? (
                                <>
                                  <Check size={18} className="animate-bounce" />
                                  Tersalin!
                                </>
                              ) : (
                                <>
                                  <Copy size={18} />
                                  Salin Semua Kode
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-2">
                    <button 
                      onClick={handleSaveProfile}
                      disabled={profileSaved}
                      className={`flex-1 px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                        profileSaved 
                          ? 'bg-green-600 text-white' 
                          : 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:shadow-lg hover:scale-105'
                      }`}
                    >
                      {profileSaved ? (
                        <>
                          <CheckCircle size={20} />
                          Tersimpan
                        </>
                      ) : (
                        'Simpan Perubahan'
                      )}
                    </button>
                    <button 
                      onClick={handleCancelProfile}
                      className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              )}

              {/* Proposals View */}
              {activeView === 'proposals' && (
                <div className="space-y-6">
                  <div className="px-4 lg:px-0">
                    <div className="flex items-center gap-3 mb-2">
                      <button
                        onClick={() => {
                          setActiveView('marketplace');
                          if (window.innerWidth < 1024) setSidebarOpen(false);
                        }}
                        className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        Kembali
                      </button>
                      <h2>Penawaran Kerjasama</h2>
                    </div>
                    <p className="text-sm text-gray-600">Kelola penawaran bisnis Anda</p>
                  </div>
                  
                  {/* Existing Proposals List */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3 px-4 lg:px-0">
                      <h3 className="flex items-center gap-2">
                        <Handshake className="text-orange-600" size={20} />
                        Daftar Penawaran Saya
                      </h3>
                      <button
                        onClick={() => {
                          // Scroll to form
                          document.getElementById('proposal-form')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:shadow-lg text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                      >
                        + Buat Penawaran Baru
                      </button>
                    </div>
                    <div className="bg-white">
                    
                      <div className="space-y-3 sm:space-y-4 px-4 lg:px-0">
                        {proposals.map((proposal) => (
                          <div key={proposal.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                                  <h4 className="font-bold text-gray-900">{proposal.productName}</h4>
                                  <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                                    proposal.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                    proposal.status === 'Review' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-gray-100 text-gray-700'
                                  }`}>
                                    {proposal.status}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{proposal.company}</p>
                                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
                                  <span className="flex items-center gap-1">
                                    <Package size={14} className="sm:hidden" />
                                    <Package size={16} className="hidden sm:block" />
                                    {proposal.type}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock size={14} className="sm:hidden" />
                                    <Clock size={16} className="hidden sm:block" />
                                    {proposal.date}
                                  </span>
                                  {proposal.price !== '-' && (
                                    <span className="font-semibold text-orange-600">{proposal.price}</span>
                                  )}
                                </div>
                              </div>
                              <button className="px-4 py-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg font-medium transition-colors text-sm whitespace-nowrap">
                                Lihat Detail
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* New Proposal Form */}
                  <div id="proposal-form" className="px-4 lg:px-0">
                    <h3 className="mb-4 flex items-center gap-2">
                      <Send className="text-orange-600" size={20} />
                      Buat Penawaran Baru
                    </h3>
                    <div className="bg-white">
                      <form className="space-y-6">
                      {/* Error Message */}
                      {proposalFormError && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
                          <AlertTriangle size={20} />
                          <span className="text-sm">{proposalFormError}</span>
                        </div>
                      )}

                      {/* Proposal Type */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Jenis Penawaran <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={proposalType}
                          onChange={(e) => setProposalType(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                        >
                          <option>Penawaran Produk</option>
                          <option>Kerja Sama Distribusi</option>
                          <option>Kerja Sama Produksi</option>
                          <option>Lainnya</option>
                        </select>
                      </div>

                      {/* Company Name */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Nama Perusahaan <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => {
                            setCompanyName(e.target.value);
                            if (proposalFormError) setProposalFormError('');
                          }}
                          placeholder="Masukkan nama perusahaan Anda"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                        />
                      </div>

                      {/* Product/Service Name */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Nama Produk/Jasa yang Ditawarkan <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={productName}
                          onChange={(e) => {
                            setProductName(e.target.value);
                            if (proposalFormError) setProposalFormError('');
                          }}
                          placeholder="Contoh: Tembakau Virginia Grade A"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                        />
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Deskripsi Penawaran <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          value={proposalDescription}
                          onChange={(e) => setProposalDescription(e.target.value)}
                          rows={5}
                          placeholder="Jelaskan detail penawaran Anda, spesifikasi produk, keunggulan, dll..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                        />
                      </div>

                      {/* Price and Quantity Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Harga Penawaran (Opsional)
                          </label>
                          <input
                            type="text"
                            value={proposalPrice}
                            onChange={(e) => setProposalPrice(e.target.value)}
                            placeholder="Rp 50.000.000"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Volume/Quantity
                          </label>
                          <input
                            type="text"
                            value={proposalQuantity}
                            onChange={(e) => setProposalQuantity(e.target.value)}
                            placeholder="100 Ton / 1000 Karton"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                          />
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className="bg-orange-50 rounded-lg p-4 sm:p-6 space-y-4">
                        <h3 className="font-bold text-gray-900 mb-4 text-sm sm:text-base">Informasi Kontak</h3>
                        
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Nama Kontak Person <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={contactPerson}
                            onChange={(e) => setContactPerson(e.target.value)}
                            placeholder="Nama lengkap PIC"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-sm sm:text-base"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Email <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              value={contactEmail}
                              onChange={(e) => setContactEmail(e.target.value)}
                              placeholder="email@perusahaan.com"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-sm sm:text-base"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              No. Telepon <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="tel"
                              value={contactPhone}
                              onChange={(e) => setContactPhone(e.target.value)}
                              placeholder="+62 812-3456-7890"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-sm sm:text-base"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Document Upload */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Upload Dokumen Pendukung
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 text-center hover:border-orange-500 transition-colors">
                          <input
                            type="file"
                            id="file-upload"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setUploadedFile(e.target.files[0].name);
                              }
                            }}
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          />
                          <label htmlFor="file-upload" className="cursor-pointer">
                            <div className="flex flex-col items-center gap-3">
                              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center">
                                <Upload size={24} className="sm:hidden text-orange-600" />
                                <Upload size={32} className="hidden sm:block text-orange-600" />
                              </div>
                              {uploadedFile ? (
                                <div className="text-center">
                                  <p className="text-sm font-semibold text-green-600 mb-1">File terupload:</p>
                                  <p className="text-xs sm:text-sm text-gray-700">{uploadedFile}</p>
                                  <p className="text-xs text-gray-500 mt-2">Klik untuk mengganti file</p>
                                </div>
                              ) : (
                                <>
                                  <p className="text-sm sm:text-base font-semibold text-gray-700">
                                    Klik untuk upload atau drag and drop
                                  </p>
                                  <p className="text-xs sm:text-sm text-gray-500">
                                    PDF, DOC, DOCX, JPG, PNG (Max. 10MB)
                                  </p>
                                </>
                              )}
                            </div>
                          </label>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Upload dokumen seperti: Company Profile, Proposal, Katalog Produk, Sertifikat, dll.
                        </p>
                      </div>

                      {/* Additional Notes */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Catatan Tambahan
                        </label>
                        <textarea
                          value={proposalNotes}
                          onChange={(e) => setProposalNotes(e.target.value)}
                          rows={3}
                          placeholder="Informasi tambahan yang perlu kami ketahui..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                        />
                      </div>

                        {/* Submit Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                          <button
                            type="button"
                            onClick={() => {
                              // Handle form submission
                              if (!companyName || !productName || !proposalDescription || !contactPerson || !contactEmail || !contactPhone) {
                                setProposalFormError('Mohon lengkapi semua field yang wajib diisi (*)');
                                // Scroll to top of form to show error
                                document.getElementById('proposal-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                return;
                              }
                              
                              // Clear error if all fields are filled
                              setProposalFormError('');
                              
                              const newProposal = {
                                id: proposals.length + 1,
                                type: proposalType,
                                company: companyName,
                                productName: productName,
                                status: 'Pending',
                                date: new Date().toISOString().split('T')[0],
                                price: proposalPrice || '-',
                              };
                              
                              setProposals([newProposal, ...proposals]);
                              
                              // Reset form
                              setProposalType('Penawaran Produk');
                              setCompanyName('');
                              setProductName('');
                              setProposalDescription('');
                              setProposalPrice('');
                              setProposalQuantity('');
                              setContactPerson('');
                              setContactEmail('');
                              setContactPhone('');
                              setProposalNotes('');
                              setUploadedFile(null);
                              
                              alert('Penawaran berhasil dikirim! Tim kami akan menghubungi Anda segera.');
                            
                            // Scroll to top of proposals list
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="flex-1 px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg sm:rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base"
                        >
                          <Send size={18} className="sm:hidden" />
                          <Send size={20} className="hidden sm:block" />
                          Kirim Penawaran
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            // Reset form
                            setProposalType('Penawaran Produk');
                            setCompanyName('');
                            setProductName('');
                            setProposalDescription('');
                            setProposalPrice('');
                            setProposalQuantity('');
                            setContactPerson('');
                            setContactEmail('');
                            setContactPhone('');
                            setProposalNotes('');
                            setUploadedFile(null);
                          }}
                          className="px-6 py-4 bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-700 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base"
                        >
                          Reset Form
                        </button>
                      </div>
                    </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Partnership Detail View */}
      {activeView === 'partnership-detail' && (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-amber-50/30">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  onClick={() => setActiveView('marketplace')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="text-orange-600" size={24} />
                </button>
                <div className="flex items-center gap-3 sm:gap-4">
                  <img 
                    src="/Logo%20PT.NNA.png" 
                    alt="Logo PT. Niaga Nusa Abadi" 
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain bg-white rounded-lg shadow-md p-2"
                  />
                  <div>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Business Partnership</h1>
                    <p className="text-sm sm:text-base text-orange-600 font-semibold">PT. Niaga Nusa Abadi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
            <div className="space-y-6 sm:space-y-8">
              
              {/* Hero Section */}
              <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
                <div 
                  className="absolute inset-0"
                  style={{
                    backgroundImage: 'url("/Manajmen%20NNA.jpg")',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 flex items-center">
                  <div className="px-6 sm:px-8 lg:px-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg">
                      Mitra Strategis Kami
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-2xl drop-shadow-md">
                      Kerjasama distribusi dan pemasaran produk tembakau berkualitas tinggi
                    </p>
                  </div>
                </div>
              </div>

              {/* About Partnership */}
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <Handshake className="text-orange-600" size={28} />
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Tentang Kerjasama</h3>
                </div>
                <div className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-700 space-y-4">
                  <p className="leading-relaxed">
                    PT. Niaga Nusa Abadi merupakan mitra strategis PT. Santoso Jaya Tembakau dalam distribusi dan pemasaran produk-produk tembakau berkualitas tinggi. Kerjasama ini telah terjalin sejak tahun 2018 dan terus berkembang hingga saat ini.
                  </p>
                  <p className="leading-relaxed">
                    Sebagai distributor resmi, PT. Niaga Nusa Abadi berkomitmen untuk menjangkau pasar yang lebih luas dengan tetap menjaga kualitas dan standar produk yang telah ditetapkan oleh PT. Santoso Jaya Tembakau.
                  </p>
                </div>
              </div>

              {/* Key Benefits */}
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <Star className="text-orange-600" size={28} />
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Keunggulan Kerjasama</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="flex gap-4 p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                        <Truck className="text-white" size={24} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Distribusi Luas</h4>
                      <p className="text-sm text-gray-600">Jangkauan distribusi ke seluruh wilayah Indonesia dengan sistem logistik yang efisien</p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                        <Shield className="text-white" size={24} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Jaminan Kualitas</h4>
                      <p className="text-sm text-gray-600">Produk terjamin keasliannya dengan sertifikasi resmi dan standar kualitas tinggi</p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                        <PackageCheck className="text-white" size={24} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Stok Terjamin</h4>
                      <p className="text-sm text-gray-600">Ketersediaan produk yang konsisten untuk memenuhi kebutuhan pasar</p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                        <TrendingUp className="text-white" size={24} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Pertumbuhan Bersama</h4>
                      <p className="text-sm text-gray-600">Komitmen untuk tumbuh bersama dan mencapai target bisnis yang berkelanjutan</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gradient-to-br from-orange-600 to-amber-600 rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <Smartphone className="text-white" size={28} />
                  <h3 className="text-xl sm:text-2xl font-bold">Informasi Kontak</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Package className="text-white" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-white/80 mb-1">Perusahaan</p>
                        <p className="font-semibold">PT. Niaga Nusa Abadi</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Smartphone className="text-white" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-white/80 mb-1">Telepon</p>
                        <p className="font-semibold">+62 xxx-xxxx-xxxx</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <User className="text-white" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-white/80 mb-1">Hubungi Kami</p>
                        <p className="font-semibold">info@niaganusaabadi.co.id</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Settings className="text-white" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-white/80 mb-1">Bidang Usaha</p>
                        <p className="font-semibold">Distribusi & Pemasaran</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/20">
                  <button 
                    onClick={() => setActiveView('proposals')}
                    className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-orange-600 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                  >
                    <Send size={20} />
                    Ajukan Proposal Kerjasama
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Farmer Partnership Detail View */}
      {activeView === 'farmer-partnership-detail' && (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-emerald-50/30">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  onClick={() => setActiveView('marketplace')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="text-orange-600" size={24} />
                </button>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-lg shadow-md flex items-center justify-center p-2">
                    <img 
                      src="/Logo%20PT%20Santoso.png" 
                      alt="Logo PT Santoso Jaya Tembakau" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Mitra Petani Tembakau</h1>
                    <p className="text-sm sm:text-base text-orange-600 font-semibold">Program Kemitraan Petani</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
            <div className="space-y-6 sm:space-y-8">
              
              {/* Hero Section */}
              <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
                <div 
                  className="absolute inset-0"
                  style={{
                    backgroundImage: 'url("/Mitra%20Petani.png")',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 flex items-center">
                  <div className="px-6 sm:px-8 lg:px-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg">
                      Bersama Membangun Kesejahteraan
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-2xl drop-shadow-md">
                      Program kemitraan dengan petani tembakau lokal untuk hasil terbaik
                    </p>
                  </div>
                </div>
              </div>

              {/* About Farmer Partnership */}
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <Handshake className="text-orange-600" size={28} />
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Tentang Program Kemitraan</h3>
                </div>
                <div className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-700 space-y-4">
                  <p className="leading-relaxed">
                    PT. Santoso Jaya Tembakau berkomitmen untuk membangun kemitraan yang berkelanjutan dengan para petani tembakau lokal. Program ini dirancang untuk meningkatkan kesejahteraan petani sambil memastikan pasokan bahan baku berkualitas tinggi.
                  </p>
                  <p className="leading-relaxed">
                    Melalui program ini, kami memberikan pendampingan teknis, bantuan modal, dan jaminan pembelian hasil panen dengan harga yang adil. Petani mitra kami tersebar di berbagai wilayah penghasil tembakau terbaik di Indonesia.
                  </p>
                </div>
              </div>

              {/* Program Benefits */}
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <Star className="text-orange-600" size={28} />
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Manfaat Program</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="flex gap-4 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                        <DollarSign className="text-white" size={24} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Harga Jual Terjamin</h4>
                      <p className="text-sm text-gray-600">Jaminan pembelian hasil panen dengan harga yang kompetitif dan pembayaran tepat waktu</p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                        <Shield className="text-white" size={24} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Pendampingan Teknis</h4>
                      <p className="text-sm text-gray-600">Bimbingan dari ahli pertanian untuk meningkatkan kualitas dan produktivitas tanaman</p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                        <Package className="text-white" size={24} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Bantuan Modal</h4>
                      <p className="text-sm text-gray-600">Dukungan modal usaha dan sarana produksi untuk meningkatkan hasil panen</p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                        <TrendingUp className="text-white" size={24} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Pengembangan Berkelanjutan</h4>
                      <p className="text-sm text-gray-600">Program pelatihan dan pengembangan kapasitas untuk jangka panjang</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact CTA */}
              <div className="bg-gradient-to-br from-orange-600 to-amber-600 rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10 text-white">
                <div className="text-center max-w-3xl mx-auto">
                  <Package className="text-white mx-auto mb-4" size={48} />
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                    Tertarik Menjadi Mitra Petani Kami?
                  </h3>
                  <p className="text-base sm:text-lg text-white/90 mb-8 leading-relaxed">
                    Bergabunglah dengan ratusan petani mitra yang telah merasakan manfaat dari program kemitraan kami. Mari bersama membangun kesejahteraan dan menghasilkan tembakau berkualitas tinggi.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={() => setActiveView('proposals')}
                      className="px-8 py-4 bg-white hover:bg-gray-50 text-orange-600 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                    >
                      <Send size={20} />
                      Ajukan Proposal Kemitraan
                    </button>
                    <button 
                      className="px-8 py-4 bg-transparent hover:bg-white/10 border-2 border-white text-white rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      <Smartphone size={20} />
                      Hubungi Kami
                    </button>
                  </div>
                  <div className="mt-8 pt-8 border-t border-white/20">
                    <p className="text-sm text-white/80">
                      Info lebih lanjut: <span className="font-semibold">+62 xxxx-xxxx-xxxx</span> | <span className="font-semibold">kemitraan@santosojayatembakau.com</span>
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Product Detail Full Page */}
      {activeView === 'product-detail' && selectedProduct && (
        <div className="min-h-screen bg-white py-8 px-4">
          {/* Product Detail Content */}
          <div className="max-w-6xl mx-auto">
            {/* Header with back button and cart - now integrated into page */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={handleCloseDetail}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-700" />
                <span className="text-sm font-medium text-gray-700">Kembali ke Katalog</span>
              </button>
              {/* Cart Icon */}
              <button 
                onClick={() => setActiveView('cart')}
                className="relative p-2.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ShoppingCart size={20} className="text-gray-700" />
                {getTotalCartItems() > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold border border-white shadow-lg">
                    {getTotalCartItems()}
                  </span>
                )}
              </button>
            </div>

            {/* Product Detail Grid */}
            <div className="flex flex-col md:grid md:grid-cols-2 gap-12 md:items-start">
                {/* Product Image */}
                <div className="flex flex-col items-center justify-center">
                  <div className="relative w-full max-w-md h-[500px] flex items-center justify-center">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-full object-contain drop-shadow-2xl"
                    />
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 h-8 bg-black/30 rounded-full blur-2xl"></div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                  <div>
                    <h1 className="text-4xl font-bold text-orange-600 mb-4">{selectedProduct.name}</h1>
                    <div className="flex flex-wrap gap-3 mb-6">
                      {/* Category Badge */}
                      <div className="group relative px-6 py-3 rounded-xl shadow-lg overflow-hidden bg-gradient-to-r from-orange-600 to-orange-700 text-white">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-100"></div>
                        <div className="absolute inset-0 rounded-xl border-2 border-orange-500"></div>
                        <div className="relative z-10 flex items-center gap-2">
                          <Package size={16} className="text-orange-100" />
                          <span className="font-semibold tracking-wide text-sm">
                            {(() => {
                              const categoryMap: Record<string, string> = {
                                'Rokok SKT': 'SIGARET KRETEK TANGAN',
                                'Rokok SKM': 'SIGARET KRETEK MESIN',
                                'Tembakau TSC': 'TEMBAKAU SIAP CAMPUR',
                                'Tembakau TSG': 'TEMBAKAU SIAP GILING'
                              };
                              return categoryMap[selectedProduct.category] || selectedProduct.category.toUpperCase();
                            })()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-6">
                    <p className="text-sm text-gray-600 mb-2">Harga B2B</p>
                    <div className="flex items-baseline gap-2 mb-4">
                      <p className="text-5xl font-bold text-orange-600">{selectedProduct.price}</p>
                      <p className="text-xl text-gray-600">/ {selectedProduct.unit}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-orange-200">
                      <div>
                        <p className="text-sm text-gray-600">Stok Tersedia</p>
                        <p className="text-xl font-bold text-green-600">{selectedProduct.stock}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Minimum Order</p>
                        <p className="text-xl font-bold text-blue-600">1 {selectedProduct.unit}</p>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
                    <p className="text-sm text-gray-600 mb-3 font-semibold">Jumlah Pesanan</p>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setOrderQuantity(Math.max(1, orderQuantity - 1))}
                        className="w-12 h-12 flex items-center justify-center bg-white border-2 border-gray-300 hover:border-orange-500 hover:bg-orange-50 rounded-lg text-2xl font-bold text-gray-700 hover:text-orange-600 transition-all duration-300"
                      >
                        âˆ’
                      </button>
                      <input
                        type="number"
                        value={orderQuantity}
                        onChange={(e) => setOrderQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-24 h-12 text-center text-2xl font-bold text-orange-600 bg-white border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                        min="1"
                      />
                      <button
                        onClick={() => setOrderQuantity(orderQuantity + 1)}
                        className="w-12 h-12 flex items-center justify-center bg-white border-2 border-gray-300 hover:border-orange-500 hover:bg-orange-50 rounded-lg text-2xl font-bold text-gray-700 hover:text-orange-600 transition-all duration-300"
                      >
                        +
                      </button>
                      <div className="ml-auto text-right">
                        <p className="text-sm text-gray-600">Subtotal</p>
                        <p className="text-2xl font-bold text-orange-600">
                          Rp {(parseInt(selectedProduct.price.replace(/[^0-9]/g, '')) * orderQuantity).toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => {
                      handleAddToCart();
                    }}
                    disabled={showCartNotification}
                    className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-lg ${
                      showCartNotification
                        ? 'bg-gradient-to-r from-green-500 to-green-600 cursor-default'
                        : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
                    } text-white`}
                  >
                    {showCartNotification ? (
                      <>
                        <CheckCircle size={24} />
                        Berhasil Ditambahkan!
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={24} />
                        Tambah ke Keranjang
                      </>
                    )}
                  </button>

                  {/* Deskripsi Produk */}
                  <div className="prose max-w-none">
                    <h3 className="text-xl font-semibold text-orange-600 mb-3">Deskripsi Produk</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedProduct.name} adalah produk berkualitas tinggi dari PT Santoso Jaya Tembakau. 
                      Produk ini dirancang khusus untuk memenuhi kebutuhan bisnis B2B dengan standar kualitas terbaik.
                    </p>
                  </div>

                  {/* Informasi Produk */}
                  <div className="pt-6 border-t border-amber-200">
                    <h3 className="text-xl font-semibold text-orange-600 mb-4">Informasi Produk</h3>
                    <div className="space-y-3">
                      <div className="flex items-start justify-between py-2 border-b border-amber-100">
                        <span className="text-gray-600 font-medium">Nama Produk :</span>
                        <span className="text-orange-600 font-semibold text-right">{selectedProduct.name}</span>
                      </div>
                      <div className="flex items-start justify-between py-2 border-b border-amber-100">
                        <span className="text-gray-600 font-medium">Kategori :</span>
                        <span className="text-orange-600 font-semibold text-right">{selectedProduct.category}</span>
                      </div>
                      <div className="flex items-start justify-between py-2 border-b border-amber-100">
                        <span className="text-gray-600 font-medium">Jenis :</span>
                        <span className="text-orange-600 font-semibold text-right">{selectedProduct.jenis}</span>
                      </div>
                      <div className="flex items-start justify-between py-2 border-b border-amber-100">
                        <span className="text-gray-600 font-medium">Kemasan :</span>
                        <span className="text-orange-600 font-semibold text-right">{selectedProduct.kemasan}</span>
                      </div>
                      <div className="flex items-start justify-between py-2 border-b border-amber-100">
                        <span className="text-gray-600 font-medium">Harga :</span>
                        <span className="text-orange-600 font-semibold text-right">{selectedProduct.price} / {selectedProduct.unit}</span>
                      </div>
                      <div className="flex items-start justify-between py-2 border-b border-amber-100">
                        <span className="text-gray-600 font-medium">Stok :</span>
                        <span className="text-orange-600 font-semibold text-right">{selectedProduct.stock}</span>
                      </div>
                    </div>
                  </div>

                  {/* Info Pemesanan */}
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <Package size={18} />
                      Informasi Pemesanan
                    </h4>
                    <ul className="text-sm text-blue-800 space-y-2">
                      <li>â€¢ Harga dapat berubah sewaktu-waktu tanpa pemberitahuan</li>
                      <li>â€¢ Minimum order sesuai dengan satuan yang tertera</li>
                      <li>â€¢ Stok tersedia secara real-time</li>
                      <li>â€¢ Untuk pemesanan dalam jumlah besar, silakan hubungi tim sales</li>
                      <li>â€¢ Tersedia diskon khusus untuk pembelian dalam jumlah tertentu</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Gambar Background Besar & Video Section - Full Width */}
              <div className="mt-12 flex flex-col items-center gap-8">
                {/* Display background image if available */}
                {selectedProduct.backgroundImage && (
                  <div className="w-full">
                    <img
                      src={selectedProduct.backgroundImage}
                      alt={`Latar Belakang ${selectedProduct.name}`}
                      className="w-full h-auto object-cover rounded-xl shadow-2xl"
                    />
                  </div>
                )}
                
                {/* Video Section - Display videos if available */}
                {selectedProduct.videoUrls && selectedProduct.videoUrls.length > 0 && (
                  <div className="w-full">
                    <h3 className="text-2xl font-bold text-orange-600 mb-6 text-center">Video Produk</h3>
                    <div className={`grid gap-6 ${selectedProduct.videoUrls.length === 1 ? 'grid-cols-1 max-w-4xl mx-auto' : 'grid-cols-1 md:grid-cols-2'}`}>
                      {selectedProduct.videoUrls.map((videoUrl: string, index: number) => {
                        // Extract YouTube video ID from URL - supports multiple formats
                        const getYouTubeVideoId = (url: string) => {
                          // Remove any whitespace
                          url = url.trim();
                          
                          // Standard YouTube URL: https://www.youtube.com/watch?v=VIDEO_ID
                          let match = url.match(/[?&]v=([^&]+)/);
                          if (match) return match[1];
                          
                          // Short YouTube URL: https://youtu.be/VIDEO_ID
                          match = url.match(/youtu\.be\/([^?]+)/);
                          if (match) return match[1];
                          
                          // YouTube embed URL: https://www.youtube.com/embed/VIDEO_ID
                          match = url.match(/youtube\.com\/embed\/([^?]+)/);
                          if (match) return match[1];
                          
                          // YouTube /v/ URL format
                          match = url.match(/\/v\/([a-zA-Z0-9_-]{11})/);
                          if (match) return match[1];
                          
                          return null;
                        };
                        
                        const videoId = getYouTubeVideoId(videoUrl);
                        
                        return videoId ? (
                          <div key={index} className="relative rounded-2xl overflow-hidden shadow-2xl group/video">
                            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                              <iframe
                                ref={(el) => { videoRefs.current[index] = el; }}
                                className="absolute top-0 left-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&modestbranding=1&playlist=${videoId}&enablejsapi=1&hd=1&vq=hd1080`}
                                title={`Video ${selectedProduct.name} ${index + 1}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                              ></iframe>
                            </div>

                            {/* Video Controls - Bottom Right */}
                            <div className="absolute bottom-4 right-4 z-10 flex gap-2 opacity-0 group-hover/video:opacity-100 transition-opacity duration-300">
                              {/* Play/Pause Button */}
                              <button
                                onClick={() => toggleVideoPlayPause(index)}
                                className="bg-white/20 backdrop-blur-md border border-white/30 p-3 rounded-full hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
                                aria-label={videoPlayingStates[index] === false ? "Play video" : "Pause video"}
                              >
                                {videoPlayingStates[index] === false ? (
                                  <Play size={18} className="text-white" />
                                ) : (
                                  <Pause size={18} className="text-white" />
                                )}
                              </button>

                              {/* Volume Button */}
                              <button
                                onClick={() => toggleVideoMute(index)}
                                className="bg-white/20 backdrop-blur-md border border-white/30 p-3 rounded-full hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
                                aria-label={videoMutedStates[index] ? "Unmute video" : "Mute video"}
                              >
                                <Volume2 size={18} className={`text-white ${videoMutedStates[index] ? 'opacity-50' : 'opacity-100'}`} />
                                {videoMutedStates[index] && (
                                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-0.5 bg-white rotate-45"></div>
                                )}
                              </button>
                            </div>

                            {/* Video Number Badge - Top Left */}
                            {selectedProduct.videoUrls && selectedProduct.videoUrls.length > 1 && (
                              <div className="absolute top-4 left-4 z-10">
                                <div className="bg-orange-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                                  Video {index + 1}
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div key={index} className="bg-red-50 border border-red-200 p-4 rounded-lg">
                            <p className="text-red-600 text-sm">Invalid video URL: {videoUrl}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
      )}

      {/* Cart View */}
      {activeView === 'cart' && (
        <div className="min-h-screen bg-gray-50">
          {/* Cart Content */}
          <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
            {/* Header with Back Button */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => {
                  setActiveView('marketplace');
                  if (window.innerWidth < 1024) setSidebarOpen(false);
                }}
                className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Kembali
              </button>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Keranjang Belanja</h2>
            </div>

            {cartItems.length === 0 ? (
              <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-8 sm:p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <ShoppingCart size={40} className="sm:hidden text-gray-400" />
                    <ShoppingCart size={48} className="hidden sm:block text-gray-400" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Keranjang Kosong</h2>
                  <p className="text-sm sm:text-base text-gray-600 mb-6">Belum ada produk yang ditambahkan ke keranjang</p>
                  <button
                    onClick={() => setActiveView('marketplace')}
                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
                  >
                    Mulai Belanja
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-3 sm:space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg sm:rounded-xl shadow-sm p-3 sm:p-6 hover:shadow-md transition-all duration-300">
                      <div className="flex gap-3 sm:gap-6">
                        {/* Product Image */}
                        <div className="flex-shrink-0 w-20 h-20 sm:w-32 sm:h-32 bg-gray-50 rounded-lg overflow-hidden">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2 sm:mb-3">
                            <div className="flex-1 min-w-0 pr-2">
                              <h3 className="text-sm sm:text-lg font-bold text-gray-900 mb-1 line-clamp-1">{item.product.name}</h3>
                              <p className="text-xs sm:text-sm text-gray-600">{item.product.category}</p>
                            </div>
                            <button
                              onClick={() => handleRemoveFromCart(item.product.id)}
                              className="p-1.5 sm:p-2 hover:bg-red-50 rounded-lg text-red-500 hover:text-red-600 transition-colors flex-shrink-0"
                              aria-label="Hapus dari keranjang"
                            >
                              <X size={18} className="sm:hidden" />
                              <X size={20} className="hidden sm:block" />
                            </button>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 sm:gap-3">
                              <button
                                onClick={() => handleUpdateCartQuantity(item.product.id, item.quantity - 1)}
                                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors text-sm sm:text-base"
                              >
                                âˆ’
                              </button>
                              <span className="w-10 sm:w-12 text-center font-semibold text-gray-900 text-sm sm:text-base">{item.quantity}</span>
                              <button
                                onClick={() => handleUpdateCartQuantity(item.product.id, item.quantity + 1)}
                                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors text-sm sm:text-base"
                              >
                                +
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-left sm:text-right">
                              <p className="text-xs sm:text-sm text-gray-600">Subtotal</p>
                              <p className="text-base sm:text-xl font-bold text-orange-600">
                                Rp {(parseInt(item.product.price.replace(/[^0-9]/g, '')) * item.quantity).toLocaleString('id-ID')}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6 lg:sticky lg:top-24">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Ringkasan Pesanan</h2>
                    
                    <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                      <div className="flex justify-between items-center pb-3 sm:pb-4 border-b border-gray-200">
                        <span className="text-sm sm:text-base text-gray-600">Subtotal ({getTotalCartItems()} item)</span>
                        <span className="font-semibold text-sm sm:text-base text-gray-900">
                          Rp {getTotalCartPrice().toLocaleString('id-ID')}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center pb-3 sm:pb-4 border-b border-gray-200">
                        <span className="text-sm sm:text-base text-gray-600">Biaya Admin</span>
                        <span className="font-semibold text-sm sm:text-base text-gray-900">Rp 0</span>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-base sm:text-lg font-bold text-gray-900">Total</span>
                        <span className="text-xl sm:text-2xl font-bold text-orange-600">
                          Rp {getTotalCartPrice().toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        if (cartItems.length === 0) {
                          alert('Keranjang Anda masih kosong!');
                          return;
                        }
                        setActiveView('payment');
                      }}
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg sm:rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-base sm:text-lg mb-2 sm:mb-3"
                    >
                      Lanjut ke Pembayaran
                    </button>
                    
                    <button
                      onClick={() => setActiveView('marketplace')}
                      className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-700 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base"
                    >
                      Lanjut Belanja
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Payment View */}
      {activeView === 'payment' && (
        <div className="min-h-screen bg-gray-50">
          {/* Payment Content */}
          <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Order Summary with Header */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-md">
              {/* Header Section */}
              <div className="border-b border-gray-200 px-4 sm:px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-4">
                    <button
                      onClick={() => setActiveView('cart')}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ChevronLeft size={20} className="sm:hidden text-gray-700" />
                      <ChevronLeft size={24} className="hidden sm:block text-gray-700" />
                    </button>
                    <div>
                      <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Pembayaran</h1>
                      <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Upload bukti transfer pembayaran Anda</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setActiveView('marketplace');
                      if (window.innerWidth < 1024) setSidebarOpen(false);
                    }}
                    className="px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Kembali
                  </button>
                </div>
              </div>

              {/* Order Summary Content */}
              <div className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Ringkasan Pesanan</h2>
              <div className="space-y-3">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3 flex-1">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{item.product.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">{item.quantity} x Rp {item.product.price.toLocaleString('id-ID')}</p>
                      </div>
                    </div>
                    <div className="text-right ml-2">
                      <p className="font-bold text-gray-900 text-sm sm:text-base">
                        Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t-2 border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm sm:text-base text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900 text-sm sm:text-base">Rp {getTotalCartPrice().toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm sm:text-base text-gray-600">PPN (11%)</span>
                  <span className="font-semibold text-gray-900 text-sm sm:text-base">Rp {(getTotalCartPrice() * 0.11).toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <span className="text-base sm:text-lg font-bold text-gray-900">Total Pembayaran</span>
                  <span className="text-xl sm:text-2xl font-bold text-orange-600">
                    Rp {(getTotalCartPrice() * 1.11).toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
              </div>
            </div>

            {/* Bank Account Information */}
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 text-white">
              <h2 className="text-lg sm:text-xl font-bold mb-4">Informasi Rekening Pembayaran</h2>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base font-medium">Bank</span>
                  <span className="text-base sm:text-lg font-bold">BCA</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base font-medium">No. Rekening</span>
                  <span className="text-base sm:text-lg font-bold tracking-wider">1234567890</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base font-medium">Atas Nama</span>
                  <span className="text-base sm:text-lg font-bold">PT Santoso Jaya Tembakau</span>
                </div>
              </div>
              <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm">
                  âš ï¸ <span className="font-semibold">Penting:</span> Pastikan transfer sesuai dengan nominal total pembayaran dan simpan bukti transfer untuk diupload di bawah ini.
                </p>
              </div>
            </div>

            {/* Payment Proof Upload Form */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Upload Bukti Pembayaran</h2>
              
              {/* Success Message - Shown after payment */}
              {paymentSuccess ? (
                <div className="space-y-4">
                  <div className="p-6 bg-green-50 border-2 border-green-200 rounded-xl">
                    <div className="flex items-start gap-3 mb-4">
                      <CheckCircle size={24} className="text-green-600 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-green-800 mb-3">Pembayaran Berhasil Diupload!</h3>
                        
                        <div className="space-y-2 text-sm text-gray-700">
                          <div className="flex justify-between py-2 border-b border-green-200">
                            <span className="font-medium">No. Pesanan:</span>
                            <span className="font-semibold text-green-700">{successOrderNumber}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-green-200">
                            <span className="font-medium">Tanggal:</span>
                            <span className="font-semibold text-green-700">{successOrderDate}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-green-200">
                            <span className="font-medium">Total:</span>
                            <span className="font-semibold text-green-700">{successOrderTotal}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-700 mt-4 leading-relaxed">
                          Bukti pembayaran Anda sedang dalam proses verifikasi. Kami akan menghubungi Anda dalam 1x24 jam.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        // Clear cart and reset form
                        setCartItems([]);
                        setSenderName('');
                        setSenderBank('');
                        setTransferDate('');
                        setPaymentProof(null);
                        setPaymentNotes('');
                        setPaymentSuccess(false);
                        
                        // Redirect to orders page
                        setActiveView('orders');
                      }}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Lihat Pesanan Saya
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        // Clear cart and reset form
                        setCartItems([]);
                        setSenderName('');
                        setSenderBank('');
                        setTransferDate('');
                        setPaymentProof(null);
                        setPaymentNotes('');
                        setPaymentSuccess(false);
                        
                        // Redirect to marketplace
                        setActiveView('marketplace');
                      }}
                      className="flex-1 px-6 py-3 bg-white hover:bg-gray-50 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold transition-all duration-300"
                    >
                      Belanja Lagi
                    </button>
                  </div>
                </div>
              ) : (
                <form className="space-y-4 sm:space-y-6">
                  {/* Error Message */}
                  {paymentFormError && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
                      <AlertTriangle size={20} />
                      <span className="text-sm">{paymentFormError}</span>
                    </div>
                  )}

                  {/* Sender Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nama Pengirim <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => {
                      setSenderName(e.target.value);
                      if (paymentFormError) setPaymentFormError('');
                    }}
                    placeholder="Nama lengkap/perusahaan yang melakukan transfer"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>

                {/* Sender Bank and Transfer Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Bank Pengirim <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={senderBank}
                      onChange={(e) => {
                        setSenderBank(e.target.value);
                        if (paymentFormError) setPaymentFormError('');
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                    >
                      <option value="">Pilih Bank</option>
                      <option value="BCA">BCA</option>
                      <option value="Mandiri">Mandiri</option>
                      <option value="BNI">BNI</option>
                      <option value="BRI">BRI</option>
                      <option value="CIMB Niaga">CIMB Niaga</option>
                      <option value="Permata">Permata</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tanggal Transfer <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={transferDate}
                      onChange={(e) => {
                        setTransferDate(e.target.value);
                        if (paymentFormError) setPaymentFormError('');
                      }}
                      max={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>
                </div>

                {/* Upload File */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bukti Transfer <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 text-center hover:border-orange-500 transition-colors">
                    <input
                      type="file"
                      id="payment-proof-upload"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setPaymentProof(e.target.files[0].name);
                          if (paymentFormError) setPaymentFormError('');
                        }
                      }}
                      accept=".jpg,.jpeg,.png,.pdf"
                    />
                    <label htmlFor="payment-proof-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center">
                          <Upload size={24} className="sm:hidden text-orange-600" />
                          <Upload size={32} className="hidden sm:block text-orange-600" />
                        </div>
                        {paymentProof ? (
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                              <CheckCircle size={20} className="text-green-600" />
                              <p className="text-sm font-semibold text-green-600">File terupload:</p>
                            </div>
                            <p className="text-sm text-gray-700 font-medium mb-1">{paymentProof}</p>
                            <p className="text-xs text-gray-500">Klik untuk mengganti file</p>
                          </div>
                        ) : (
                          <>
                            <p className="text-sm sm:text-base font-semibold text-gray-700">
                              Klik untuk upload bukti transfer
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500">
                              JPG, PNG, PDF (Max. 5MB)
                            </p>
                          </>
                        )}
                      </div>
                    </label>
                  </div>
                </div>

                {/* Payment Notes */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Catatan (Opsional)
                  </label>
                  <textarea
                    value={paymentNotes}
                    onChange={(e) => setPaymentNotes(e.target.value)}
                    rows={3}
                    placeholder="Tambahkan catatan jika diperlukan..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      // Validate form
                      if (!senderName || !senderBank || !transferDate || !paymentProof) {
                        setPaymentFormError('Mohon lengkapi semua field yang wajib diisi (*)');
                        // Scroll to top of form to show error
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        return;
                      }
                      
                      // Clear error if all fields are filled
                      setPaymentFormError('');
                      
                      // Create order
                      const orderNumber = '#SJT-ORD-' + Date.now();
                      const orderDate = new Date().toLocaleDateString('id-ID');
                      const orderTotal = `Rp ${(getTotalCartPrice() * 1.11).toLocaleString('id-ID')}`;
                      const currentTime = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
                      
                      // Prepare order items from cart
                      const orderItems = cartItems.map(item => ({
                        name: item.product.name,
                        quantity: item.quantity,
                        unit: item.product.unit.replace('per ', ''),
                        price: item.product.price,
                        subtotal: `Rp ${(parseInt(item.product.price.replace(/[^0-9]/g, '')) * item.quantity).toLocaleString('id-ID')}`
                      }));

                      // Get product names for display
                      const productNames = cartItems.map(item => item.product.name).join(', ');
                      const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
                      
                      // Create new order with tracking
                      const newOrder = {
                        id: orderNumber,
                        date: orderDate,
                        product: productNames,
                        quantity: `${totalQuantity} item`,
                        total: orderTotal,
                        status: 'Menunggu Verifikasi',
                        statusColor: 'amber',
                        icon: Clock,
                        image: cartItems[0]?.product.image || '',
                        trackingHistory: [
                          { 
                            status: 'Pesanan Dibuat', 
                            date: `${orderDate}, ${currentTime}`, 
                            description: 'Pesanan telah dibuat dan menunggu verifikasi pembayaran', 
                            completed: true 
                          },
                          { 
                            status: 'Pembayaran Dikonfirmasi', 
                            date: '-', 
                            description: 'Menunggu verifikasi pembayaran dari tim kami', 
                            completed: false 
                          },
                          { 
                            status: 'Pesanan Diproses', 
                            date: '-', 
                            description: 'Pesanan akan diproses setelah pembayaran dikonfirmasi', 
                            completed: false 
                          },
                          { 
                            status: 'Dalam Pengiriman', 
                            date: '-', 
                            description: 'Pesanan akan dikirim setelah diproses', 
                            completed: false 
                          },
                          { 
                            status: 'Pesanan Terkirim', 
                            date: '-', 
                            description: 'Menunggu proses pengiriman', 
                            completed: false 
                          },
                        ],
                        items: orderItems,
                        senderInfo: {
                          name: senderName,
                          bank: senderBank,
                          transferDate: transferDate,
                          notes: paymentNotes
                        }
                      };
                      
                      // Add order to orderHistory (add to beginning of array)
                      setOrderHistory(prevOrders => [newOrder, ...prevOrders]);
                      
                      // Set success state
                      setSuccessOrderNumber(orderNumber);
                      setSuccessOrderDate(orderDate);
                      setSuccessOrderTotal(orderTotal);
                      setPaymentSuccess(true);
                      
                      // Scroll to top to show success message
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg sm:rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <Send size={18} className="sm:hidden" />
                    <Send size={20} className="hidden sm:block" />
                    Konfirmasi Pembayaran
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveView('cart')}
                    className="px-6 py-4 bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-700 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base"
                  >
                    Kembali ke Keranjang
                  </button>
                </div>
              </form>
              )}
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl p-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Bell size={16} className="text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900 mb-1 text-sm sm:text-base">Informasi Penting</h3>
                  <ul className="text-xs sm:text-sm text-blue-800 space-y-1">
                    <li>â€¢ Verifikasi pembayaran membutuhkan waktu 1x24 jam kerja</li>
                    <li>â€¢ Pastikan nominal transfer sesuai dengan total pembayaran</li>
                    <li>â€¢ Simpan bukti transfer hingga pesanan selesai diproses</li>
                    <li>â€¢ Untuk bantuan hubungi CS kami di WhatsApp: 0812-3456-7890</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications View */}
      {activeView === 'notifications' && (
        <div className="min-h-screen bg-gray-50">
          {/* Notifications Content */}
          <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
            {/* Header with Back Button */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => {
                  setActiveView('marketplace');
                  if (window.innerWidth < 1024) setSidebarOpen(false);
                }}
                className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Kembali
              </button>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Notifikasi</h2>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              {/* Notification Item - New Order */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={20} className="text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-sm sm:text-base text-gray-900 truncate">Pesanan Berhasil Diproses</h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0">2 jam lalu</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">
                      Pesanan #ORD-2024-0015 senilai Rp 15.400.000 telah berhasil diproses dan sedang dalam pengiriman.
                    </p>
                    <button 
                      onClick={() => setActiveView('orders')}
                      className="text-xs sm:text-sm text-orange-600 hover:text-orange-700 font-semibold hover:underline"
                    >
                      Lihat Detail Pesanan â†’
                    </button>
                  </div>
                </div>
              </div>

              {/* Notification Item - Promo */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Package size={20} className="text-orange-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-sm sm:text-base text-gray-900 truncate">Promo Spesial B2B</h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0">5 jam lalu</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">
                      Dapatkan diskon hingga 20% untuk pembelian minimal 100 karton produk TSC. Promo berlaku sampai akhir bulan!
                    </p>
                    <button 
                      onClick={() => setActiveView('marketplace')}
                      className="text-xs sm:text-sm text-orange-600 hover:text-orange-700 font-semibold hover:underline"
                    >
                      Lihat Promo â†’
                    </button>
                  </div>
                </div>
              </div>

              {/* Notification Item - Stock Update */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bell size={20} className="text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-sm sm:text-base text-gray-900 truncate">Stok Tersedia Kembali</h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0">1 hari lalu</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">
                      Produk yang Anda tunggu "Rokok Filter Premium" sudah tersedia kembali dengan stok terbatas.
                    </p>
                    <button 
                      onClick={() => setActiveView('marketplace')}
                      className="text-xs sm:text-sm text-orange-600 hover:text-orange-700 font-semibold hover:underline"
                    >
                      Lihat Produk â†’
                    </button>
                  </div>
                </div>
              </div>

              {/* Mark All as Read Button */}
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => setNotificationCount(0)}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base"
                >
                  Tandai Semua Sudah Dibaca
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
