// Main App Component - PT Santoso Jaya Tembakau Website
// Complete website system with navigation and routing
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import React, { useState } from "react";
import { JobsProvider } from "./contexts/JobsContext";
import {
  ChevronLeft,
  ChevronRight,
  Cigarette,
  LayoutGrid,
  Globe,
  ArrowLeft,
  MessageCircle,
  ChevronDown,
  Play,
  Pause,
  Volume2,
  Building2,
} from "lucide-react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { LandingPage } from "./components/LandingPage";
import { TembakauPage } from "./components/TembakauPage";
import { KarirPage } from "./components/KarirPage";
import { KarirDashboard } from "./components/KarirDashboard";
import { EmployeeDashboard } from "./components/EmployeeDashboard";
import { HRDashboard } from "./components/HRDashboard";
import { KarirLoginPage } from "./components/KarirLoginPage";
import { KarirSignupPage } from "./components/KarirSignupPage";
import { TentangKamiPage } from "./components/TentangKamiPage";
import { KontakPage } from "./components/KontakPage";
import { BlogPage } from "./components/BlogPage";
import { ArticleDetailPage } from "./components/ArticleDetailPage";
import { AnalyticsTracker } from "./components/AnalyticsTracker";
import { CustomProductPage } from "./components/CustomProductPage";
import { BusinessToBusiness } from "./components/BusinessToBusiness";
import { B2BMarketplaceDashboard } from "./components/B2BMarketplaceDashboard";

type Page = string;

type Product = {
  name: string;
  baseImage: string;
  baseImageLeft?: string;
  baseImageRight?: string;
  hoverImage?: string;
  category: "tangan" | "mesin";
  market: "domestik" | "internasional";
  description: string;
  productName: string;
  isi: string;
  jenis: string;
  kemasan: string;
  filter: string;
  kadar: string;
  bahan: string;
  produksi: string;
  distribusi: string;
  videoUrls?: string[];
  backgroundImage?: string;
  filterCategory?: string;
};

type TembakauProduct = {
  id?: string;
  name: string;
  baseImage: string;
  hoverImage?: string;
  description: string;
  productName: string;
  jenis: string;
  berat: string;
  kemasan: string;
  kualitas: string;
  minimalOrder: string;
  produksi: string;
  distribusi: string;
  category: "tangan" | "mesin";
  videoUrls?: string[]; // Array of YouTube video URLs
  backgroundImage?: string;
};

export default function App() {
  // Initialize app state
  const [currentPage, setCurrentPage] =
    useState<Page>("landing");
  const [selectedArticleId, setSelectedArticleId] =
    useState<number>(1);
  const [isProductDropdownOpen, setIsProductDropdownOpen] =
    useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    education: "",
    experience: "",
  });
  const [employeeProfile, setEmployeeProfile] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    joinDate: "",
    photo: "",
    status: "active" as "active" | "inactive",
    address: "",
    education: "",
    skills: [] as string[],
    jobDescription: "",
    responsibilities: [] as string[],
  });

  const [isB2BLoggedIn, setIsB2BLoggedIn] = useState(false);
  const [b2bUserEmail, setB2BUserEmail] = useState("");
  const [loginContext, setLoginContext] = useState<
    "karir" | "b2b"
  >("karir"); // Track login context
  const [signupContext, setSignupContext] = useState<
    "karir" | "b2b"
  >("karir"); // Track signup context

  // Default product pages state (load from localStorage)
  const [defaultPages, setDefaultPages] = React.useState({
    rokok: {
      title: "Rokok Products",
      description: "",
      status: "published" as "published" | "draft",
      pageViews: 0,
      hasFilters: true,
      filterCategories: [
        {
          name: "skt",
          label: "SKT",
          color: "#f97316",
          type: "single" as "single",
        },
        {
          name: "skm",
          label: "SKM",
          color: "#f97316",
          type: "single" as "single",
        },
        {
          name: "pasar",
          label: "PASAR",
          color: "#f97316",
          type: "dropdown" as "dropdown",
          children: [
            {
              name: "domestik",
              label: "Domestik",
              color: "#f97316",
            },
            {
              name: "internasional",
              label: "Internasional",
              color: "#f97316",
            },
          ],
        },
      ],
    },
    tsc: {
      title: "Tembakau TSC",
      description: "",
      status: "published" as "published" | "draft",
      pageViews: 0,
      filterCategories: [] as any[],
    },
    tsg: {
      title: "Tembakau TSG",
      description: "",
      status: "published" as "published" | "draft",
      pageViews: 0,
      filterCategories: [] as any[],
    },
  });

  // Load default pages from localStorage
  React.useEffect(() => {
    const savedDefault = localStorage.getItem(
      "cms_default_product_pages",
    );
    if (savedDefault) {
      const parsed = JSON.parse(savedDefault);
      // Ensure rokok page always has filters if not already set
      if (!parsed.rokok.hasFilters) {
        parsed.rokok = {
          ...parsed.rokok,
          hasFilters: true,
          filterCategories: [
            {
              name: "skt",
              label: "SKT",
              color: "#f97316",
              type: "single" as "single",
            },
            {
              name: "skm",
              label: "SKM",
              color: "#f97316",
              type: "single" as "single",
            },
            {
              name: "pasar",
              label: "PASAR",
              color: "#f97316",
              type: "dropdown" as "dropdown",
              children: [
                {
                  name: "domestik",
                  label: "Domestik",
                  color: "#f97316",
                },
                {
                  name: "internasional",
                  label: "Internasional",
                  color: "#f97316",
                },
              ],
            },
          ],
        };
        // Save back to localStorage
        localStorage.setItem(
          "cms_default_product_pages",
          JSON.stringify(parsed),
        );
      }
      setDefaultPages(parsed);
    } else {
      // Save initial state to localStorage
      const initialState = {
        rokok: {
          title: "Rokok Products",
          description: "",
          status: "published" as "published" | "draft",
          pageViews: 0,
          hasFilters: true,
          filterCategories: [
            {
              name: "skt",
              label: "SKT",
              color: "#f97316",
              type: "single" as "single",
            },
            {
              name: "skm",
              label: "SKM",
              color: "#f97316",
              type: "single" as "single",
            },
            {
              name: "pasar",
              label: "PASAR",
              color: "#f97316",
              type: "dropdown" as "dropdown",
              children: [
                {
                  name: "domestik",
                  label: "Domestik",
                  color: "#f97316",
                },
                {
                  name: "internasional",
                  label: "Internasional",
                  color: "#f97316",
                },
              ],
            },
          ],
        },
        tsc: {
          title: "Tembakau TSC",
          description: "",
          status: "published" as "published" | "draft",
          pageViews: 0,
          filterCategories: [] as any[],
        },
        tsg: {
          title: "Tembakau TSG",
          description: "",
          status: "published" as "published" | "draft",
          pageViews: 0,
          filterCategories: [] as any[],
        },
      };
      localStorage.setItem(
        "cms_default_product_pages",
        JSON.stringify(initialState),
      );
    }

    // Listen for storage changes
    const handleStorageChange = () => {
      const saved = localStorage.getItem(
        "cms_default_product_pages",
      );
      if (saved) {
        setDefaultPages(JSON.parse(saved));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Custom event for same-window updates
    const handleCustomUpdate = () => {
      const saved = localStorage.getItem(
        "cms_default_product_pages",
      );
      if (saved) {
        setDefaultPages(JSON.parse(saved));
      }
    };

    window.addEventListener(
      "defaultPagesUpdated",
      handleCustomUpdate,
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange,
      );
      window.removeEventListener(
        "defaultPagesUpdated",
        handleCustomUpdate,
      );
    };
  }, []);

  const initialProducts: Product[] = [
    {
      name: "358 16 Batang",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/358%2016%20BATANG%20KIRI.png?raw=true",
      baseImageLeft:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/358%2016%20BATANG%20KIRI.png?raw=true",
      baseImageRight:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/358%2016%20BATANG%20KANAN.png?raw=true",
      category: "tangan",
      market: "domestik",
      description:
        "Sigaret Kretek Tangan berkualitas premium dengan 16 batang per bungkus",
      productName: "358",
      isi: "16 batang / bungkus",
      jenis: "Sigaret Kretek Tangan (SKT)",
      kemasan: "Hard pack",
      filter: "Tanpa filter",
      kadar: "Reguler",
      bahan: "Tembakau pilihan & Rempah Rempah Berkualitas",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
      backgroundImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Design%20Produk/Latar%20Belakang%20WEB%20358.jpg?raw=true",
    },
    {
      name: "Sosrobahu Premium 16 Batang",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/SOSROBAHU%20PREMIUM%2016%20BATANG%20KIRI.png?raw=true",
      baseImageLeft:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/SOSROBAHU%20PREMIUM%2016%20BATANG%20KIRI.png?raw=true",
      baseImageRight:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/SOSROBAHU%20PREMIUM%2016%20BATANG%20KANAN.png?raw=true",
      category: "tangan",
      market: "domestik",
      description:
        "Sosrobahu Premium dengan cita rasa kretek tangan yang khas dan berkualitas tinggi",
      productName: "Sosrobahu Premium",
      isi: "16 batang / bungkus",
      jenis: "Sigaret Kretek Tangan (SKT)",
      kemasan: "Hard pack",
      filter: "Tanpa filter",
      kadar: "Reguler",
      bahan: "Tembakau pilihan & Rempah Rempah Berkualitas",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
      backgroundImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Design%20Produk/Latar%20belakang%20web%20sosrobahu%20premium.jpg?raw=true",
    },
    {
      name: "Bahamas 12 Batang",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/BAHAMAS%2012%20BATANG%20KIRI.png?raw=true",
      baseImageLeft:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/BAHAMAS%2012%20BATANG%20KIRI.png?raw=true",
      baseImageRight:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/BAHAMAS%2012%20BATANG%20KANAN.png?raw=true",
      category: "tangan",
      market: "domestik",
      description:
        "Sigaret Kretek Tangan dengan karakteristik unik dalam kemasan 12 batang",
      productName: "Bahamas",
      isi: "12 batang / bungkus",
      jenis: "Sigaret Kretek Tangan (SKT)",
      kemasan: "Hard pack",
      filter: "Tanpa filter",
      kadar: "High Flavour",
      bahan: "Tembakau pilihan & Rempah Rempah Berkualitas",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
      backgroundImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Design%20Produk/Latar%20Belakang%20WEB%20Bahamas.jpg?raw=true",
    },
    {
      name: "Sosrobahu Santos Filter 12 Batang",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/SOSROBAHU%20SANTOS%20FILTER%2012%20BATANG%20KIRI.png?raw=true",
      baseImageLeft:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/SOSROBAHU%20SANTOS%20FILTER%2012%20BATANG%20KIRI.png?raw=true",
      baseImageRight:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/SOSROBAHU%20SANTOS%20FILTER%2012%20BATANG%20KANAN.png?raw=true",
      category: "mesin",
      market: "domestik",
      description:
        "Sigaret Kretek Mesin dengan filter untuk pengalaman merokok yang lebih halus",
      productName: "Sosrobahu Santos Filter",
      isi: "12 batang / bungkus",
      jenis: "Sigaret Kretek Mesin (SKM)",
      kemasan: "Hard pack",
      filter: "Dengan filter",
      kadar: "Reguler",
      bahan: "Tembakau pilihan & Rempah Rempah Berkualitas",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
    },
    {
      name: "358 12 Batang",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/358%2012%20BATANG%20KIRI.png?raw=true",
      baseImageLeft:
        "https://raw.githubusercontent.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/refs/heads/main/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/358%2012%20BATANG%20KANAN.png",
      baseImageRight:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/358%2012%20BATANG%20KANAN.png?raw=true",
      category: "tangan",
      market: "domestik",
      description:
        "Sigaret Kretek Tangan 358 dalam kemasan praktis 12 batang",
      productName: "358",
      isi: "12 batang / bungkus",
      jenis: "Sigaret Kretek Tangan (SKT)",
      kemasan: "Hard pack",
      filter: "Tanpa filter",
      kadar: "Reguler",
      bahan: "Tembakau pilihan & Rempah Rempah Berkualitas",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
    },
    {
      name: "Bahamas 20 Batang",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/BAHAMAS%2020%20BATANG%20KIRI.png?raw=true",
      baseImageLeft:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/BAHAMAS%2020%20BATANG%20KIRI.png?raw=true",
      baseImageRight:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/BAHAMAS%2020%20BATANG%20KANAN.png?raw=true",
      category: "tangan",
      market: "domestik",
      description:
        "Bahamas dalam kemasan ekonomis 20 batang untuk kepuasan lebih lama",
      productName: "Bahamas",
      isi: "20 batang / bungkus",
      jenis: "Sigaret Kretek Tangan (SKT)",
      kemasan: "Hard pack",
      filter: "Tanpa filter",
      kadar: "High Flavour",
      bahan: "Tembakau pilihan & Rempah Rempah Berkualitas",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
    },
    {
      name: "Santos Bahamas Filter 12 Batang",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/SANTOS%20BAHAMAS%20FILTER%2012%20BATANG%20KIRI.png?raw=true",
      baseImageLeft:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/SANTOS%20BAHAMAS%20FILTER%2012%20BATANG%20KIRI.png?raw=true",
      baseImageRight:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/SANTOS%20BAHAMAS%20FILTER%2012%20BATANG%20KANAN.png?raw=true",
      category: "mesin",
      market: "internasional",
      description:
        "Produk premium untuk pasar internasional dengan standar kualitas tinggi",
      productName: "Santos Bahamas Filter",
      isi: "12 batang / bungkus",
      jenis: "Sigaret Kretek Mesin (SKM)",
      kemasan: "Hard pack",
      filter: "Dengan filter",
      kadar: "Reguler",
      bahan: "Tembakau pilihan & Rempah Rempah Berkualitas",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
    },
    {
      name: "Kupu Biru 16 Batang",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/KUPU%20BIRU%2016%20BATANG%20KIRI.png?raw=true",
      baseImageLeft:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/KUPU%20BIRU%2016%20BATANG%20KIRI.png?raw=true",
      baseImageRight:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/KUPU%20BIRU%2016%20BATANG%20KANAN.png?raw=true",
      category: "tangan",
      market: "domestik",
      description:
        "Sigaret Kretek Tangan dengan karakter rasa yang berbeda dan ikonik",
      productName: "Kupu Biru",
      isi: "16 batang / bungkus",
      jenis: "Sigaret Kretek Tangan (SKT)",
      kemasan: "Hard pack",
      filter: "Tanpa filter",
      kadar: "Khas Aroma Blueberry",
      bahan: "Tembakau pilihan & Rempah Rempah Berkualitas",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
      backgroundImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Design%20Produk/Latar%20Belakang%20kupu%20biru.jpg?raw=true",
    },
    {
      name: "Sosrobahu Kopi Hitam 12 Batang",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/SOSROBAHU%20KOPI%20HITAM%2012%20BATANG%20KIRI.png?raw=true",
      baseImageLeft:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/SOSROBAHU%20KOPI%20HITAM%2012%20BATANG%20KIRI.png?raw=true",
      baseImageRight:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/SOSROBAHU%20KOPI%20HITAM%2012%20BATANG%20KANAN.png?raw=true",
      category: "tangan",
      market: "domestik",
      description:
        "Perpaduan unik rasa kretek dengan aroma kopi hitam yang khas",
      productName: "Sosrobahu Kopi Hitam",
      isi: "12 batang / bungkus",
      jenis: "Sigaret Kretek Tangan (SKT)",
      kemasan: "Hard pack",
      filter: "Tanpa filter",
      kadar: "Khas Cita Rasa Tembakau Kopi Hitam",
      bahan: "Tembakau pilihan & Rempah Rempah Berkualitas",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
      backgroundImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Design%20Produk/latar%20belakang%20sosrobahu%20kopi%20hitam.jpg?raw=true",
    },
    {
      name: "Sosrobahu 12 Batang",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/SOSROBAHU%2012%20BATANG%20KIRI.png?raw=true",
      baseImageLeft:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/SOSROBAHU%2012%20BATANG%20KIRI.png?raw=true",
      baseImageRight:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/3D%20PRODUK%20ROKOK%20LANDING%20PAGE%20KANAN%20DAN%20KIRI/SOSROBAHU%2012%20BATANG%20KANAN.png?raw=true",
      category: "tangan",
      market: "domestik",
      description:
        "Sosrobahu klasik dengan cita rasa kretek tangan yang autentik",
      productName: "Sosrobahu",
      isi: "12 batang / bungkus",
      jenis: "Sigaret Kretek Tangan (SKT)",
      kemasan: "Hard pack",
      filter: "Tanpa filter",
      kadar: "Reguler",
      bahan: "Tembakau pilihan & Rempah Rempah Berkualitas",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
      backgroundImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Design%20Produk/latar%20belakang%20sosrobahu%20original.jpg?raw=true",
    },
  ];

  // Data produk Tembakau TSC
  const initialTembakauTSCProducts: TembakauProduct[] = [
    {
      name: "EXPANDED DOUBLE CUTTER",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Produk%20TSC%20SJT/EXPANDED%20DOUBLE%20CUTTER.png?raw=true",
      description:
        "Tembakau Siap Campur EXPANDED DOUBLE CUTTER berkualitas tinggi untuk produksi rokok premium dengan tekstur khusus hasil proses double cutting",
      productName: "EXPANDED DOUBLE CUTTER",
      jenis: "Tembakau Siap Campur (TSC)",
      berat: "Sesuai permintaan",
      kemasan: "Karung/Karton Box",
      kualitas: "Standar Industri",
      minimalOrder: "1 Tons",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
      category: "tangan",
      videoUrls: [
        "https://www.youtube.com/watch?v=HxA7VSPZ5Jc",
        "https://www.youtube.com/watch?v=oSHrdm35O-w",
      ],
    },
    {
      name: "EXPANDED SINGLE CUT",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Produk%20TSC%20SJT/EXPANDED%20SINGLE%20CUT.png?raw=true",
      description:
        "Tembakau Siap Campur EXPANDED SINGLE CUT dengan kualitas standar tinggi dan tekstur hasil single cut yang halus",
      productName: "EXPANDED SINGLE CUT",
      jenis: "Tembakau Siap Campur (TSC)",
      berat: "Sesuai permintaan",
      kemasan: "Karung/Karton Box",
      kualitas: "Standar Industri",
      minimalOrder: "1 Tons",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
      category: "tangan",
      videoUrls: [
        "https://www.youtube.com/watch?v=AkOtAJongoM",
        "https://www.youtube.com/watch?v=jtNzX5qD8As",
      ],
    },
    {
      name: "FINES KASTURI",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Produk%20TSC%20SJT/FINES%20KASTURI.png?raw=true",
      description:
        "Tembakau Siap Campur FINES KASTURI dengan kualitas standar industri, aroma khas kasturi yang memikat",
      productName: "FINES KASTURI",
      jenis: "Tembakau Siap Campur (TSC)",
      berat: "Sesuai permintaan",
      kemasan: "Karung/Karton Box",
      kualitas: "Standar Industri",
      minimalOrder: "1 Tons",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
      category: "tangan",
      videoUrls: [
        "https://www.youtube.com/watch?v=-GtMh6o1w-w",
        "https://www.youtube.com/watch?v=Y0E3Mi0VCvQ",
      ],
    },
    {
      name: "FINES PAITON",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Produk%20TSC%20SJT/FINES%20PAITON.png?raw=true",
      description:
        "Tembakau Siap Campur FINES PAITON dengan kualitas standar baik, berasal dari area Paiton yang terkenal",
      productName: "FINES PAITON",
      jenis: "Tembakau Siap Campur (TSC)",
      berat: "Sesuai permintaan",
      kemasan: "Karung/Karton Box",
      kualitas: "Standar Industri",
      minimalOrder: "1 Tons",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
      category: "mesin",
      videoUrls: [
        "https://www.youtube.com/watch?v=AAeRjUF6djU",
        "https://www.youtube.com/watch?v=8NLmH7zwQfg",
      ],
    },
    {
      name: "FINES RAJANG MADURA",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Produk%20TSC%20SJT/FINES%20RAJANG%20MADURA.png?raw=true",
      description:
        "Tembakau Siap Campur FINES RAJANG MADURA untuk keperluan industri, khas dari daerah Madura",
      productName: "FINES RAJANG MADURA",
      jenis: "Tembakau Siap Campur (TSC)",
      berat: "Sesuai permintaan",
      kemasan: "Karung/Karton Box",
      kualitas: "Standar Industri",
      minimalOrder: "1 Tons",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
      category: "mesin",
      videoUrls: [
        "https://www.youtube.com/watch?v=6N_jXonxguQ",
        "https://www.youtube.com/watch?v=RAV4PH0vKO4",
      ],
    },
    {
      name: "PAITON TRASING",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Produk%20TSC%20SJT/PAITON%20TRASING.png?raw=true",
      description:
        "Tembakau Siap Campur PAITON TRASING untuk keperluan industri standar, hasil pilihan terbaik dari Paiton",
      productName: "PAITON TRASING",
      jenis: "Tembakau Siap Campur (TSC)",
      berat: "Sesuai permintaan",
      kemasan: "Karung/Karton Box",
      kualitas: "Standar Industri",
      minimalOrder: "1 Tons",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
      category: "mesin",
      videoUrls: [
        "https://www.youtube.com/watch?v=ncvE2QhF87s",
        "https://www.youtube.com/watch?v=05WUHgg1m5E",
      ],
    },
    {
      name: "PAKPIE",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Produk%20TSC%20SJT/PAKPIE.png?raw=true",
      description:
        "Tembakau Siap Campur PAKPIE dengan kualitas terbaik untuk campuran rokok premium",
      productName: "PAKPIE",
      jenis: "Tembakau Siap Campur (TSC)",
      berat: "Sesuai permintaan",
      kemasan: "Karung/Karton Box",
      kualitas: "Standar Industri",
      minimalOrder: "1 Tons",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
      category: "tangan",
      videoUrls: [
        "https://www.youtube.com/watch?v=B8aUfjmhEmA",
        "https://www.youtube.com/watch?v=EOwdUUdGSGg",
      ],
    },
    {
      name: "REDRY RAJANGLOMBOK",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Produk%20TSC%20SJT/REDRY%20RAJANGLOMBOK.png?raw=true",
      description:
        "Tembakau Siap Campur REDRY RAJANGLOMBOK dengan karakteristik unggul hasil proses redry berkualitas tinggi",
      productName: "REDRY RAJANGLOMBOK",
      jenis: "Tembakau Siap Campur (TSC)",
      berat: "Sesuai permintaan",
      kemasan: "Karung/Karton Box",
      kualitas: "Standar Industri",
      minimalOrder: "1 Tons",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
      category: "tangan",
      videoUrls: [
        "https://www.youtube.com/watch?v=jPYU8BO5hSs",
      ],
    },
    {
      name: "SCRAP KASTURI",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Produk%20TSC%20SJT/SCRAP%20KASTURI.png?raw=true",
      description:
        "Tembakau Siap Campur SCRAP KASTURI untuk produksi rokok berkualitas dengan aroma kasturi yang khas",
      productName: "SCRAP KASTURI",
      jenis: "Tembakau Siap Campur (TSC)",
      berat: "Sesuai permintaan",
      kemasan: "Karung/Karton Box",
      kualitas: "Standar Industri",
      minimalOrder: "1 Tons",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
      category: "mesin",
      videoUrls: [
        "https://www.youtube.com/watch?v=xROtXWOopn0",
        "https://www.youtube.com/watch?v=ECHr97tPu6M",
      ],
    },
    {
      name: "SCRAP RAJANG PAITON",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Produk%20TSC%20SJT/SCRAP%20RAJANG%20PAITON.png?raw=true",
      description:
        "Tembakau Siap Campur SCRAP RAJANG PAITON untuk produksi rokok standar, berasal dari area Paiton",
      productName: "SCRAP RAJANG PAITON",
      jenis: "Tembakau Siap Campur (TSC)",
      berat: "Sesuai permintaan",
      kemasan: "Karung/Karton Box",
      kualitas: "Standar Industri",
      minimalOrder: "1 Tons",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
      category: "mesin",
      videoUrls: [
        "https://www.youtube.com/watch?v=Mal5IxPSMc4",
        "https://www.youtube.com/watch?v=dRMe5Ud2C4M",
      ],
    },
    {
      name: "TSC BOLD",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Produk%20TSC%20SJT/TSC%20BOLD.png?raw=true",
      description:
        "Tembakau Siap Campur TSC BOLD dengan kualitas export untuk pasar internasional, rasa yang kuat dan berani",
      productName: "TSC BOLD",
      jenis: "Tembakau Siap Campur (TSC)",
      berat: "Sesuai permintaan",
      kemasan: "Karung/Karton Box",
      kualitas: "Standar Industri",
      minimalOrder: "1 Tons",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
      category: "tangan",
      videoUrls: [
        "https://www.youtube.com/watch?v=Uvs8CWYNDtE",
        "https://www.youtube.com/watch?v=WMfu_ZH0hyg",
      ],
    },
    {
      name: "TSC KRETEK",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Produk%20TSC%20SJT/TSC%20KRETEK.png?raw=true",
      description:
        "Tembakau Siap Campur TSC KRETEK untuk campuran rokok premium dengan aroma kretek yang khas",
      productName: "TSC KRETEK",
      jenis: "Tembakau Siap Campur (TSC)",
      berat: "Sesuai permintaan",
      kemasan: "Karung/Karton Box",
      kualitas: "Standar Industri",
      minimalOrder: "1 Tons",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
      category: "tangan",
      videoUrls: [
        "https://www.youtube.com/watch?v=7fapUBzv5XI",
        "https://www.youtube.com/watch?v=LYVwfHn8ERc",
      ],
    },
    {
      name: "TSC MILD",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Produk%20TSC%20SJT/TSC%20MILD.png?raw=true",
      description:
        "Tembakau Siap Campur TSC MILD dengan karakteristik tradisional yang lembut dan halus",
      productName: "TSC MILD",
      jenis: "Tembakau Siap Campur (TSC)",
      berat: "Sesuai permintaan",
      kemasan: "Karung/Karton Box",
      kualitas: "Standar Industri",
      minimalOrder: "1 Tons",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
      category: "mesin",
      videoUrls: [
        "https://www.youtube.com/watch?v=Ah_bEOYHo6o",
      ],
    },
    {
      name: "TSC REGULER",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Produk%20TSC%20SJT/TSC%20REGULER.png?raw=true",
      description:
        "Tembakau Siap Campur TSC REGULER dengan kualitas istimewa untuk produksi rokok berkualitas tinggi",
      productName: "TSC REGULER",
      jenis: "Tembakau Siap Campur (TSC)",
      berat: "Sesuai permintaan",
      kemasan: "Karung/Karton Box",
      kualitas: "Standar Industri",
      minimalOrder: "1 Tons",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
      category: "tangan",
      videoUrls: [
        "https://www.youtube.com/watch?v=SWRcXGxQ614",
        "https://www.youtube.com/watch?v=FDtgNUj_h6g",
      ],
    },
    {
      name: "FINES",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Produk%20TSC%20SJT/FINES.png?raw=true",
      description:
        "Tembakau Siap Campur FINES dengan kualitas terbaik untuk campuran rokok premium",
      productName: "FINES",
      jenis: "Tembakau Siap Campur (TSC)",
      berat: "Sesuai permintaan",
      kemasan: "Karung/Karton Box",
      kualitas: "Standar Industri",
      minimalOrder: "1 Tons",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
      category: "tangan",
    },
    {
      name: "EXPANDED",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Produk%20TSC%20SJT/EXPANDED.png?raw=true",
      description:
        "Tembakau Siap Campur EXPANDED berkualitas tinggi untuk produksi rokok premium dengan tekstur expanded yang optimal",
      productName: "EXPANDED",
      jenis: "Tembakau Siap Campur (TSC)",
      berat: "Sesuai permintaan",
      kemasan: "Karung/Karton Box",
      kualitas: "Standar Industri",
      minimalOrder: "1 Tons",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
      category: "tangan",
    },
    {
      name: "MATA AYAM YUNAN",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Produk%20TSC%20SJT/MATA%20AYAM%20YUNAN.png?raw=true",
      description:
        "Tembakau Siap Campur MATA AYAM YUNAN dengan kualitas premium, karakteristik khas dari tembakau Yunan yang terkenal",
      productName: "MATA AYAM YUNAN",
      jenis: "Tembakau Siap Campur (TSC)",
      berat: "Sesuai permintaan",
      kemasan: "Karung/Karton Box",
      kualitas: "Standar Industri",
      minimalOrder: "1 Tons",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
      category: "mesin",
    },
    {
      name: "MATA AYAM KASTURI",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Produk%20TSC%20SJT/MATA%20AYAM%20KASTURI.png?raw=true",
      description:
        "Tembakau Siap Campur MATA AYAM KASTURI berkualitas premium dengan aroma kasturi yang khas dan memikat",
      productName: "MATA AYAM KASTURI",
      jenis: "Tembakau Siap Campur (TSC)",
      berat: "Sesuai permintaan",
      kemasan: "Karung/Karton Box",
      kualitas: "Standar Industri",
      minimalOrder: "1 Tons",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
      category: "tangan",
    },
    {
      name: "MATA AYAM MADURA",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Produk%20TSC%20SJT/MATA%20AYAM%20MADURA.png?raw=true",
      description:
        "Tembakau Siap Campur MATA AYAM MADURA dengan kualitas terbaik, khas dari daerah Madura yang terkenal dengan tembakau berkualitas",
      productName: "MATA AYAM MADURA",
      jenis: "Tembakau Siap Campur (TSC)",
      berat: "Sesuai permintaan",
      kemasan: "Karung/Karton Box",
      kualitas: "Standar Industri",
      minimalOrder: "1 Tons",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
      category: "mesin",
    },
    {
      name: "MATA AYAM LOMBOK",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Produk%20TSC%20SJT/MATA%20AYAM%20LOMBOK.png?raw=true",
      description:
        "Tembakau Siap Campur MATA AYAM LOMBOK berkualitas premium dengan karakteristik unggul dari tembakau Lombok pilihan",
      productName: "MATA AYAM LOMBOK",
      jenis: "Tembakau Siap Campur (TSC)",
      berat: "Sesuai permintaan",
      kemasan: "Karung/Karton Box",
      kualitas: "Standar Industri",
      minimalOrder: "1 Tons",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
      category: "tangan",
    },
    {
      name: "UPON REQUEST",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Produk%20TSC%20SJT/UPON%20REQUEST.png?raw=true",
      description:
        "Tembakau Siap Campur dengan spesifikasi khusus sesuai permintaan pelanggan. Kami dapat menyesuaikan kualitas, jenis, dan karakteristik tembakau sesuai kebutuhan produksi Anda",
      productName: "UPON REQUEST",
      jenis: "Tembakau Siap Campur (TSC)",
      berat: "Sesuai permintaan",
      kemasan: "Karung/Karton Box",
      kualitas: "Standar Industri",
      minimalOrder: "1 Tons",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
      category: "tangan",
    },
    {
      name: "UPON REQUEST 2",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/Produk%20TSC%20SJT/UPON%20REQUEST.png?raw=true",
      description:
        "Tembakau Siap Campur dengan spesifikasi khusus sesuai permintaan pelanggan. Kami dapat menyesuaikan kualitas, jenis, dan karakteristik tembakau sesuai kebutuhan produksi Anda",
      productName: "UPON REQUEST (Custom)",
      jenis: "Tembakau Siap Campur (TSC)",
      berat: "Sesuai permintaan",
      kemasan: "Karung/Karton Box",
      kualitas: "Standar Industri",
      minimalOrder: "1 Tons",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
      category: "mesin",
    },
  ];

  // Data produk Tembakau TSG
  const initialTembakauTSGProducts: TembakauProduct[] = [
    {
      name: "TSG BOLD",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/PRODUK%20TEMBAKAU%20TSG/TSG%20BOLD.png?raw=true",
      hoverImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/PRODUK%20TEMBAKAU%20TSG/BOLD.png?raw=true",
      description:
        "Tembakau Siap Giling (TSG) BOLD adalah produk tembakau berkualitas yang sudah di proses Flavour atau Chaos, cengkeh dan bahan bahan lain yang siap di pakai untuk produksi rokok dengan karakter rasa yang kuat dan berani",
      productName: "TSG BOLD",
      jenis: "Tembakau Siap Giling (TSG)",
      berat: "Sesuai permintaan",
      kemasan: "Karung/Karton Box",
      kualitas: "Standar Industri - Bold Taste",
      minimalOrder: "4 Tons",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
      category: "tangan",
    },
    {
      name: "TSG KRETEK",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/PRODUK%20TEMBAKAU%20TSG/TSG%20KRETEK.png?raw=true",
      hoverImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/PRODUK%20TEMBAKAU%20TSG/KRETEK.png?raw=true",
      description:
        "Tembakau Siap Giling (TSG) KRETEK dengan aroma kretek yang khas, sudah melalui proses lengkap dengan cengkeh dan rempah berkualitas tinggi",
      productName: "TSG KRETEK",
      jenis: "Tembakau Siap Giling (TSG)",
      berat: "Sesuai permintaan",
      kemasan: "Karung/Karton Box",
      kualitas: "Standar Industri - Kretek Taste",
      minimalOrder: "4 Tons",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
      category: "tangan",
    },
    {
      name: "TSG MILD",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/PRODUK%20TEMBAKAU%20TSG/TSG%20MILD.png?raw=true",
      hoverImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/PRODUK%20TEMBAKAU%20TSG/MILD.png?raw=true",
      description:
        "Tembakau Siap Giling (TSG) MILD dengan karakteristik rasa yang lembut dan halus, cocok untuk produksi rokok dengan kadar rendah",
      productName: "TSG MILD",
      jenis: "Tembakau Siap Giling (TSG)",
      berat: "Sesuai permintaan",
      kemasan: "Karung/Karton Box",
      kualitas: "Standar Industri - Mild Taste",
      minimalOrder: "4 Tons",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
      category: "mesin",
    },
    {
      name: "TSG PUTIHAN",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/PRODUK%20TEMBAKAU%20TSG/TSG%20PUTIHAN.png?raw=true",
      hoverImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/PRODUK%20TEMBAKAU%20TSG/PUTIHAN.png?raw=true",
      description:
        "Tembakau Siap Giling (TSG) PUTIHAN dengan kualitas premium, hasil pemilihan tembakau putihan terbaik untuk karakter rokok yang khas",
      productName: "TSG PUTIHAN",
      jenis: "Tembakau Siap Giling (TSG)",
      berat: "Sesuai permintaan",
      kemasan: "Karung/Karton Box",
      kualitas: "Standar Industri - Putihan Taste",
      minimalOrder: "4 Tons",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
      category: "tangan",
    },
    {
      name: "TSG REGULER",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/PRODUK%20TEMBAKAU%20TSG/TSG%20REGULER.png?raw=true",
      hoverImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/PRODUK%20TEMBAKAU%20TSG/REGULER.png?raw=true",
      description:
        "Tembakau Siap Giling (TSG) REGULER dengan kualitas standar terbaik untuk produksi rokok reguler yang berkualitas tinggi",
      productName: "TSG REGULER",
      jenis: "Tembakau Siap Giling (TSG)",
      berat: "Sesuai permintaan",
      kemasan: "Karung/Karton Box",
      kualitas: "Standar Industri - Reguler Taste",
      minimalOrder: "4 Tons",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
      category: "mesin",
    },
    {
      name: "TSG UPON REQUEST",
      baseImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/PRODUK%20TEMBAKAU%20TSG/TSG%20UPON%20REQUEST.png?raw=true",
      hoverImage:
        "https://github.com/indraseptianaa/PT-Santoso-Jaya-Tembakau/blob/main/PRODUK%20TEMBAKAU%20TSG/UPON%20REQUEST.png?raw=true",
      description:
        "Tembakau Siap Giling (TSG) dengan spesifikasi khusus sesuai permintaan pelanggan. Kami dapat menyesuaikan formula, flavour, dan karakteristik sesuai kebutuhan produksi rokok Anda",
      productName: "TSG UPON REQUEST",
      jenis: "Tembakau Siap Giling (TSG)",
      berat: "Sesuai permintaan",
      kemasan: "Karung/Karton Box",
      kualitas: "Standar Industri - Custom Taste",
      minimalOrder: "4 Tons",
      produksi: "PT. Santoso Jaya Tembakau",
      distribusi: "PT. Santoso Jaya Tembakau",
      category: "tangan",
    },
  ];

  const [products, setProducts] =
    useState<Product[]>(initialProducts);
  const [tembakauTSCProducts, setTembakauTSCProducts] =
    useState<TembakauProduct[]>(
      initialTembakauTSCProducts.map((p, index) => ({
        ...p,
        id: p.name || `tsc-${index}`,
      })),
    );
  const [tembakauTSGProducts, setTembakauTSGProducts] =
    useState<TembakauProduct[]>(
      initialTembakauTSGProducts.map((p, index) => ({
        ...p,
        id: p.name || `tsg-${index}`,
      })),
    );
  const [isAnimating, setIsAnimating] = useState(false);

  // Sync products to localStorage for CMS
  React.useEffect(() => {
    // Save rokok products
    const rokokForCMS = products.map((p) => ({
      id: p.name,
      name: p.name,
      productName: p.productName,
      description: p.description,
      baseImage: p.baseImage,
      baseImageLeft: p.baseImageLeft,
      baseImageRight: p.baseImageRight,
      hoverImage: p.hoverImage,
      category: p.category,
      market: p.market,
      isi: p.isi,
      jenis: p.jenis,
      kemasan: p.kemasan,
      filter: p.filter,
      kadar: p.kadar,
      bahan: p.bahan,
      produksi: p.produksi,
      minOrder: p.minOrder,
      videoUrls: p.videoUrls || [],
      specifications: p.specifications || {},
    }));

    // Convert TembakauProduct to format that matches CMS expectations
    const tscForCMS = tembakauTSCProducts.map((p) => ({
      id: p.name,
      name: p.name,
      productName: p.productName,
      description: p.description,
      baseImage: p.baseImage,
      hoverImage: p.hoverImage,
      jenis: p.jenis,
      berat: p.berat,
      kemasan: p.kemasan,
      kualitas: p.kualitas,
      minimalOrder: p.minimalOrder,
      videoUrls: p.videoUrls || [],
      specifications: p.specifications || {},
    }));

    const tsgForCMS = tembakauTSGProducts.map((p) => ({
      id: p.name,
      name: p.name,
      productName: p.productName,
      description: p.description,
      baseImage: p.baseImage,
      hoverImage: p.hoverImage,
      jenis: p.jenis,
      berat: p.berat,
      kemasan: p.kemasan,
      kualitas: p.kualitas,
      minimalOrder: p.minimalOrder,
      videoUrls: p.videoUrls || [],
      specifications: p.specifications || {},
    }));

    localStorage.setItem(
      "cms_products",
      JSON.stringify(rokokForCMS),
    );
    localStorage.setItem(
      "cms_tembakau_tsc",
      JSON.stringify(tscForCMS),
    );
    localStorage.setItem(
      "cms_tembakau_tsg",
      JSON.stringify(tsgForCMS),
    );
  }, [products, tembakauTSCProducts, tembakauTSGProducts]);

  // Load products from localStorage on mount (CMS updates)
  React.useEffect(() => {
    const loadProductsFromCMS = () => {
      // Load Rokok products
      const savedRokokStr =
        localStorage.getItem("cms_products");
      if (savedRokokStr) {
        try {
          const savedRokok = JSON.parse(savedRokokStr);
          console.log(
            "Loading Rokok products from localStorage:",
            savedRokok,
          );

          // Merge CMS data with initial products
          const mergedProducts = initialProducts.map(
            (initialProd) => {
              const cmsProduct = savedRokok.find(
                (p: any) => p.name === initialProd.name,
              );
              if (cmsProduct) {
                return {
                  ...initialProd,
                  ...cmsProduct,
                  videoUrls: cmsProduct.videoUrls || [],
                  specifications:
                    cmsProduct.specifications || {},
                };
              }
              return initialProd;
            },
          );

          // Add any new products from CMS that don't exist in initial
          savedRokok.forEach((cmsProduct: any) => {
            if (
              !initialProducts.find(
                (p) => p.name === cmsProduct.name,
              )
            ) {
              mergedProducts.push(cmsProduct);
            }
          });

          console.log("Merged Rokok products:", mergedProducts);
          setProducts(mergedProducts);
        } catch (e) {
          console.error(
            "Error loading rokok products from localStorage:",
            e,
          );
        }
      }

      // Load TSC products
      const savedTSCStr = localStorage.getItem(
        "cms_tembakau_tsc",
      );
      if (savedTSCStr) {
        try {
          const savedTSC = JSON.parse(savedTSCStr);
          const mergedTSC = initialTembakauTSCProducts.map(
            (initialProd, index) => {
              const cmsProduct = savedTSC.find(
                (p: any) => p.name === initialProd.name,
              );
              if (cmsProduct) {
                return {
                  ...initialProd,
                  ...cmsProduct,
                  id:
                    cmsProduct.id ||
                    initialProd.name ||
                    `tsc-${index}`,
                  videoUrls: cmsProduct.videoUrls || [],
                  specifications:
                    cmsProduct.specifications || {},
                };
              }
              return {
                ...initialProd,
                id: initialProd.name || `tsc-${index}`,
              };
            },
          );

          savedTSC.forEach((cmsProduct: any) => {
            if (
              !initialTembakauTSCProducts.find(
                (p) => p.name === cmsProduct.name,
              )
            ) {
              mergedTSC.push(cmsProduct);
            }
          });

          setTembakauTSCProducts(mergedTSC);
        } catch (e) {
          console.error(
            "Error loading TSC products from localStorage:",
            e,
          );
        }
      }

      // Load TSG products
      const savedTSGStr = localStorage.getItem(
        "cms_tembakau_tsg",
      );
      if (savedTSGStr) {
        try {
          const savedTSG = JSON.parse(savedTSGStr);
          const mergedTSG = initialTembakauTSGProducts.map(
            (initialProd, index) => {
              const cmsProduct = savedTSG.find(
                (p: any) => p.name === initialProd.name,
              );
              if (cmsProduct) {
                return {
                  ...initialProd,
                  ...cmsProduct,
                  id:
                    cmsProduct.id ||
                    initialProd.name ||
                    `tsg-${index}`,
                  videoUrls: cmsProduct.videoUrls || [],
                  specifications:
                    cmsProduct.specifications || {},
                };
              }
              return {
                ...initialProd,
                id: initialProd.name || `tsg-${index}`,
              };
            },
          );

          savedTSG.forEach((cmsProduct: any) => {
            if (
              !initialTembakauTSGProducts.find(
                (p) => p.name === cmsProduct.name,
              )
            ) {
              mergedTSG.push(cmsProduct);
            }
          });

          setTembakauTSGProducts(mergedTSG);
        } catch (e) {
          console.error(
            "Error loading TSG products from localStorage:",
            e,
          );
        }
      }
    };

    loadProductsFromCMS();

    // Listen for storage events (when CMS updates in another tab)
    const handleStorageChange = () => {
      loadProductsFromCMS();
    };

    window.addEventListener("storage", handleStorageChange);

    // Listen for custom event (when CMS updates in same tab)
    window.addEventListener(
      "productsUpdated",
      handleStorageChange,
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange,
      );
      window.removeEventListener(
        "productsUpdated",
        handleStorageChange,
      );
    };
  }, []); // Only run on mount

  const [hoveredIndex, setHoveredIndex] = useState<
    number | null
  >(null);
  const [selectedFilterCategory, setSelectedFilterCategory] =
    useState<string | null>(null);
  const [selectedMarketFilter, setSelectedMarketFilter] =
    useState<string | null>(null);
  const [expandedDropdowns, setExpandedDropdowns] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);
  const [selectedTembakauProduct, setSelectedTembakauProduct] =
    useState<TembakauProduct | null>(null);
  const [currentImageSide, setCurrentImageSide] = useState<
    "left" | "right"
  >("left");

  // Video controls state for Rokok products
  const [videoPlayingStates, setVideoPlayingStates] = useState<
    Record<number, boolean>
  >({});
  const [videoMutedStates, setVideoMutedStates] = useState<
    Record<number, boolean>
  >({});
  const videoRefs = React.useRef<
    Record<number, HTMLIFrameElement | null>
  >({});

  // Toggle play/pause for a specific video
  const toggleVideoPlayPause = (index: number) => {
    const iframe = videoRefs.current[index];
    if (iframe) {
      const isPlaying = videoPlayingStates[index];
      const message = isPlaying
        ? '{"event":"command","func":"pauseVideo","args":""}'
        : '{"event":"command","func":"playVideo","args":""}';
      iframe.contentWindow?.postMessage(message, "*");
      setVideoPlayingStates((prev) => ({
        ...prev,
        [index]: !isPlaying,
      }));
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
      iframe.contentWindow?.postMessage(message, "*");
      setVideoMutedStates((prev) => ({
        ...prev,
        [index]: !isMuted,
      }));
    }
  };

  const mesinProducts = [
    "Sosrobahu Santos Filter 12 Batang",
    "Santos Bahamas Filter 12 Batang",
  ];
  const internasionalProducts = [
    "Santos Bahamas Filter 12 Batang",
  ];

  // Initialize video states when product changes
  React.useEffect(() => {
    if (selectedProduct?.videoUrls) {
      const initialPlayingStates: Record<number, boolean> = {};
      const initialMutedStates: Record<number, boolean> = {};

      selectedProduct.videoUrls.forEach((_, index) => {
        initialPlayingStates[index] = true; // Start playing (autoplay)
        initialMutedStates[index] = true; // Start muted
      });

      setVideoPlayingStates(initialPlayingStates);
      setVideoMutedStates(initialMutedStates);
    }
  }, [selectedProduct]);

  // New filter logic using filterCategory + market combination
  const displayedProducts = products.filter((p) => {
    // Check category filter (SKT/SKM)
    let categoryMatch = true;
    if (selectedFilterCategory === "skt") {
      categoryMatch = p.category === "tangan";
    } else if (selectedFilterCategory === "skm") {
      categoryMatch = p.category === "mesin";
    }
    // If selectedFilterCategory is null, show all categories (categoryMatch = true)

    // Check market filter (DOMESTIK/INTERNASIONAL)
    let marketMatch = true;
    if (selectedMarketFilter === "domestik") {
      marketMatch = p.market === "domestik";
    } else if (selectedMarketFilter === "internasional") {
      marketMatch = p.market === "internasional";
    }
    // If selectedMarketFilter is null, show all markets (marketMatch = true)

    // Product must match BOTH filters (AND logic)
    return categoryMatch && marketMatch;
  });

  const getImageUrl = (
    product: Product,
    index: number,
    totalProducts: number,
  ) => {
    // Jika hanya 1 produk: tampil di tengah pakai gambar KANAN
    if (totalProducts === 1) {
      return (
        product.baseImageRight ||
        product.baseImageLeft ||
        product.baseImage
      );
    }

    // Hitung split point (tengah): bagi 2
    const midPoint = Math.ceil(totalProducts / 2);

    // Produk di KIRI (index 0 sampai midPoint-1) → Pakai baseImageRight (menghadap kanan →)
    // Produk di KANAN (index midPoint sampai end) → Pakai baseImageLeft (menghadap kiri ←)
    if (index < midPoint) {
      return (
        product.baseImageRight ||
        product.baseImageLeft ||
        product.baseImage
      );
    } else {
      return (
        product.baseImageLeft ||
        product.baseImageRight ||
        product.baseImage
      );
    }
  };

  const getCenteredImageUrl = (baseImage: string) => {
    return `${baseImage}%20KANAN.png?raw=true`;
  };

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    setProducts((prev) => {
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

    setProducts((prev) => {
      const newProducts = [...prev];
      const lastProduct = newProducts.pop()!;
      newProducts.unshift(lastProduct);
      return newProducts;
    });

    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleNavigate = (page: Page, articleId?: number) => {
    setCurrentPage(page);
    setSelectedProduct(null);
    // Reset filters when navigating
    setSelectedFilterCategory(null);
    setSelectedMarketFilter(null);
    setExpandedDropdowns({});

    // Set article ID if navigating to article detail
    if (page === "article-detail" && articleId) {
      setSelectedArticleId(articleId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNavigateToLogin = (
    context: "karir" | "b2b" = "karir",
  ) => {
    setLoginContext(context);
    setCurrentPage("login");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigateToSignup = (
    context: "karir" | "b2b" = "karir",
  ) => {
    setSignupContext(context);
    setCurrentPage("signup");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogin = (
    name: string,
    email: string,
    phone: string,
  ) => {
    setIsLoggedIn(true);
    setUserProfile({
      name,
      email,
      phone,
      address: "",
      education: "",
      experience: "",
    });
    setCurrentPage("karir-dashboard");
  };

  const handleEmployeeLogin = (profile: {
    id: string;
    name: string;
    email: string;
    phone: string;
    position: string;
    department: string;
    joinDate: string;
    photo?: string;
    status: "active" | "inactive";
    address: string;
    education: string;
    skills: string[];
    jobDescription: string;
    responsibilities: string[];
  }) => {
    setIsLoggedIn(true);
    setEmployeeProfile(profile);
    setCurrentPage("employee-dashboard");
  };

  const handleB2BLoginSuccess = (email: string) => {
    setIsB2BLoggedIn(true);
    setB2BUserEmail(email);
    setCurrentPage("b2b-dashboard");
  };

  const handleB2BLogout = () => {
    setIsB2BLoggedIn(false);
    setB2BUserEmail("");
    setCurrentPage("b2b");
  };

  // Handle signup success with auto-login (no 2FA for new accounts)
  const handleKarirSignupSuccess = (
    email: string,
    name: string,
  ) => {
    // Get registered user data from localStorage
    const savedUsers = JSON.parse(
      localStorage.getItem("karir_registered_users") || "[]",
    );
    const user = savedUsers.find((u: any) => u.email === email);

    if (user) {
      // Auto-login the user
      setIsLoggedIn(true);
      setUserProfile({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: "",
        education: "",
        experience: "",
      });
      // Directly go to dashboard without 2FA
      setCurrentPage("karir-dashboard");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserProfile({
      name: "",
      email: "",
      phone: "",
      address: "",
      education: "",
      experience: "",
    });
    setEmployeeProfile({
      id: "",
      name: "",
      email: "",
      phone: "",
      position: "",
      department: "",
      joinDate: "",
      photo: "",
      status: "active",
      address: "",
      education: "",
      skills: [],
      jobDescription: "",
      responsibilities: [],
    });
    setCurrentPage("karir");
  };

  // Render function for Rokok page (existing page)
  const renderRokokPage = () => {
    // Check if page is published
    if (defaultPages.rokok.status === "draft") {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-12 bg-white rounded-xl shadow-lg max-w-md">
            <div className="w-20 h-20 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
              <Cigarette size={40} className="text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Halaman Tidak Tersedia
            </h2>
            <p className="text-gray-600 mb-6">
              Halaman produk ini sedang dalam mode draft dan
              tidak dapat diakses saat ini.
            </p>
            <button
              onClick={() => setCurrentPage("landing")}
              className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-colors"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      );
    }

    // Get current product index
    const currentProductIndex = products.findIndex(
      (p) => p.name === selectedProduct?.name,
    );

    // Functions to navigate to prev/next product
    const goToPreviousProduct = () => {
      setIsAnimating(true);
      setCurrentImageSide((prev) =>
        prev === "left" ? "right" : "left",
      );

      setTimeout(() => {
        if (currentProductIndex > 0) {
          setSelectedProduct(products[currentProductIndex - 1]);
        } else {
          // Loop to last product
          setSelectedProduct(products[products.length - 1]);
        }
        setIsAnimating(false);
      }, 150);
    };

    const goToNextProduct = () => {
      setIsAnimating(true);
      setCurrentImageSide((prev) =>
        prev === "left" ? "right" : "left",
      );

      setTimeout(() => {
        if (currentProductIndex < products.length - 1) {
          setSelectedProduct(products[currentProductIndex + 1]);
        } else {
          // Loop to first product
          setSelectedProduct(products[0]);
        }
        setIsAnimating(false);
      }, 150);
    };

    // Prioritize baseImageLeft or baseImageRight based on currentImageSide, fallback to baseImage
    const displayImage = selectedProduct
      ? currentImageSide === "left"
        ? selectedProduct.baseImageLeft ||
          selectedProduct.baseImageRight ||
          selectedProduct.baseImage
        : selectedProduct.baseImageRight ||
          selectedProduct.baseImageLeft ||
          selectedProduct.baseImage
      : "";

    // Debug: Log selected product to check videoUrls
    if (selectedProduct) {
      console.log("Selected Product:", selectedProduct.name);
      console.log("Video URLs:", selectedProduct.videoUrls);
      console.log(
        "Has videos?",
        selectedProduct.videoUrls &&
          selectedProduct.videoUrls.length > 0,
      );
    }

    return (
      <div className="min-h-screen bg-white flex items-center justify-center overflow-hidden">
        {selectedProduct ? (
          <section className="w-full min-h-screen py-12 px-4 bg-white">
            <div className="max-w-6xl mx-auto bg-white">
              <div className="flex flex-col md:grid md:grid-cols-2 gap-12 md:items-center bg-white">
                <div className="flex flex-col items-center justify-center order-1">
                  <div className="relative w-full max-w-md h-[500px] flex items-center justify-center">
                    <ImageWithFallback
                      src={getCenteredImageUrl(displayImage)}
                      alt={selectedProduct.name}
                      className={`w-full h-full object-contain drop-shadow-2xl transition-opacity duration-300 ${isAnimating ? "opacity-0" : "opacity-100"}`}
                    />
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 h-8 bg-black/30 rounded-full blur-2xl"></div>
                  </div>
                </div>

                <div className="space-y-6 order-3 md:order-2">
                  <div>
                    <h1 className="text-4xl font-bold text-orange-600 mb-4">
                      {selectedProduct.productName}
                    </h1>
                    <div className="flex flex-wrap gap-3 mb-6">
                      <div
                        className={`group relative px-6 py-3 rounded-xl shadow-lg overflow-hidden ${
                          selectedProduct.category === "mesin"
                            ? "bg-gradient-to-r from-red-700 to-red-800 text-white"
                            : "bg-gradient-to-r from-amber-600 to-amber-700 text-white"
                        }`}
                      >
                        <div
                          className={`absolute inset-0 ${
                            selectedProduct.category === "mesin"
                              ? "bg-gradient-to-r from-red-700 to-red-800"
                              : "bg-gradient-to-r from-amber-600 to-amber-700"
                          } opacity-100`}
                        ></div>

                        <div
                          className={`absolute inset-0 rounded-xl border-2 ${
                            selectedProduct.category === "mesin"
                              ? "border-red-600"
                              : "border-amber-500"
                          }`}
                        ></div>

                        <div className="relative z-10 flex items-center gap-2">
                          <Cigarette
                            size={16}
                            className={
                              selectedProduct.category ===
                              "mesin"
                                ? "text-red-100"
                                : "text-amber-100"
                            }
                          />
                          <span className="font-semibold tracking-wide text-sm">
                            {selectedProduct.category ===
                            "mesin"
                              ? "SIGARET KRETEK MESIN"
                              : "SIGARET KRETEK TANGAN"}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`group relative px-6 py-3 rounded-xl shadow-lg overflow-hidden ${
                          selectedProduct.market ===
                          "internasional"
                            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                            : "bg-gradient-to-r from-green-600 to-green-700 text-white"
                        }`}
                      >
                        <div
                          className={`absolute inset-0 ${
                            selectedProduct.market ===
                            "internasional"
                              ? "bg-gradient-to-r from-blue-600 to-blue-700"
                              : "bg-gradient-to-r from-green-600 to-green-700"
                          } opacity-100`}
                        ></div>

                        <div
                          className={`absolute inset-0 rounded-xl border-2 ${
                            selectedProduct.market ===
                            "internasional"
                              ? "border-blue-500"
                              : "border-green-500"
                          }`}
                        ></div>

                        <div className="relative z-10 flex items-center gap-2">
                          <Globe
                            size={16}
                            className={
                              selectedProduct.market ===
                              "internasional"
                                ? "text-blue-100"
                                : "text-green-100"
                            }
                          />
                          <span className="font-semibold tracking-wide text-sm">
                            {selectedProduct.market ===
                            "internasional"
                              ? "INTERNASIONAL"
                              : "DOMESTIK"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="prose max-w-none">
                    <h3 className="text-xl font-semibold text-orange-600 mb-3">
                      Deskripsi Produk
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedProduct.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-amber-200">
                    <h3 className="text-xl font-semibold text-orange-600 mb-4">
                      Informasi Produk
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start justify-between py-2 border-b border-amber-100">
                        <span className="text-gray-600 font-medium">
                          Nama Produk :
                        </span>
                        <span className="text-orange-600 font-semibold text-right">
                          {selectedProduct.productName}
                        </span>
                      </div>
                      <div className="flex items-start justify-between py-2 border-b border-amber-100">
                        <span className="text-gray-600 font-medium">
                          Isi :
                        </span>
                        <span className="text-orange-600 font-semibold text-right">
                          {selectedProduct.isi}
                        </span>
                      </div>
                      <div className="flex items-start justify-between py-2 border-b border-amber-100">
                        <span className="text-gray-600 font-medium">
                          Jenis :
                        </span>
                        <span className="text-orange-600 font-semibold text-right">
                          {selectedProduct.jenis}
                        </span>
                      </div>
                      <div className="flex items-start justify-between py-2 border-b border-amber-100">
                        <span className="text-gray-600 font-medium">
                          Kemasan :
                        </span>
                        <span className="text-orange-600 font-semibold text-right">
                          {selectedProduct.kemasan}
                        </span>
                      </div>
                      <div className="flex items-start justify-between py-2 border-b border-amber-100">
                        <span className="text-gray-600 font-medium">
                          Filter :
                        </span>
                        <span className="text-orange-600 font-semibold text-right">
                          {selectedProduct.filter}
                        </span>
                      </div>
                      <div className="flex items-start justify-between py-2 border-b border-amber-100">
                        <span className="text-gray-600 font-medium">
                          Kadar :
                        </span>
                        <span className="text-orange-600 font-semibold text-right">
                          {selectedProduct.kadar}
                        </span>
                      </div>
                      <div className="flex items-start justify-between py-2 border-b border-amber-100">
                        <span className="text-gray-600 font-medium">
                          Bahan :
                        </span>
                        <span className="text-orange-600 font-semibold text-right">
                          {selectedProduct.bahan}
                        </span>
                      </div>
                      <div className="flex items-start justify-between py-2 border-b border-amber-100">
                        <span className="text-gray-600 font-medium">
                          Produksi :
                        </span>
                        <span className="text-orange-600 font-semibold text-right">
                          {selectedProduct.produksi}
                        </span>
                      </div>
                      <div className="flex items-start justify-between py-2">
                        <span className="text-gray-600 font-medium">
                          Distribusi :
                        </span>
                        <button
                          onClick={() => {
                            setSelectedProduct(null);
                            handleNavigate("b2b");
                          }}
                          className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
                          aria-label="Business to Business"
                        >
                          <Building2
                            size={18}
                            className="group-hover:scale-110 transition-transform duration-300"
                          />
                          <span className="font-semibold text-sm">
                            Business to Business
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gambar tambahan - Order 2 on mobile (between product image and info), full width column on desktop */}
                <div className="order-2 md:order-3 md:col-span-2 flex flex-col items-center gap-8">
                  {/* Display background image if available */}
                  {selectedProduct.backgroundImage && (
                    <div className="w-full max-w-4xl">
                      <ImageWithFallback
                        src={selectedProduct.backgroundImage}
                        alt={`Latar Belakang ${selectedProduct.name}`}
                        className="w-full h-auto object-cover rounded-xl shadow-lg"
                      />
                    </div>
                  )}

                  {/* Video Section - Display videos if available */}
                  {selectedProduct.videoUrls &&
                    selectedProduct.videoUrls.length > 0 && (
                      <div className="w-full">
                        <h3 className="text-2xl font-bold text-orange-600 mb-6 text-center">
                          Video Produk
                        </h3>
                        <div
                          className={`grid gap-6 ${selectedProduct.videoUrls.length === 1 ? "grid-cols-1 max-w-4xl mx-auto" : "grid-cols-1 md:grid-cols-2"}`}
                        >
                          {selectedProduct.videoUrls.map(
                            (
                              videoUrl: string,
                              index: number,
                            ) => {
                              // Extract YouTube video ID from URL - supports multiple formats
                              const getYouTubeVideoId = (
                                url: string,
                              ) => {
                                // Remove any whitespace
                                url = url.trim();

                                // Pattern 1: youtu.be/VIDEO_ID
                                let match = url.match(
                                  /youtu\.be\/([a-zA-Z0-9_-]{11})/,
                                );
                                if (match) return match[1];

                                // Pattern 2: youtube.com/watch?v=VIDEO_ID
                                match = url.match(
                                  /[?&]v=([a-zA-Z0-9_-]{11})/,
                                );
                                if (match) return match[1];

                                // Pattern 3: youtube.com/embed/VIDEO_ID
                                match = url.match(
                                  /embed\/([a-zA-Z0-9_-]{11})/,
                                );
                                if (match) return match[1];

                                // Pattern 4: youtube.com/v/VIDEO_ID
                                match = url.match(
                                  /\/v\/([a-zA-Z0-9_-]{11})/,
                                );
                                if (match) return match[1];

                                return null;
                              };

                              const videoId =
                                getYouTubeVideoId(videoUrl);
                              console.log(
                                "Video URL:",
                                videoUrl,
                                "Extracted ID:",
                                videoId,
                              );

                              return videoId ? (
                                <div
                                  key={index}
                                  className="relative rounded-2xl overflow-hidden shadow-2xl group/video"
                                >
                                  <div
                                    className="relative w-full"
                                    style={{
                                      paddingBottom: "56.25%",
                                    }}
                                  >
                                    <iframe
                                      ref={(el) => {
                                        videoRefs.current[
                                          index
                                        ] = el;
                                      }}
                                      className="absolute top-0 left-0 w-full h-full"
                                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&modestbranding=1&playlist=${videoId}&enablejsapi=1&hd=1&vq=hd1080`}
                                      title={`Video ${selectedProduct.productName} ${index + 1}`}
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
                                      onClick={() =>
                                        toggleVideoPlayPause(
                                          index,
                                        )
                                      }
                                      className="bg-white/20 backdrop-blur-md border border-white/30 p-3 rounded-full hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
                                      aria-label={
                                        videoPlayingStates[
                                          index
                                        ] === false
                                          ? "Play video"
                                          : "Pause video"
                                      }
                                    >
                                      {videoPlayingStates[
                                        index
                                      ] === false ? (
                                        <Play
                                          size={18}
                                          className="text-white"
                                        />
                                      ) : (
                                        <Pause
                                          size={18}
                                          className="text-white"
                                        />
                                      )}
                                    </button>

                                    {/* Volume Button */}
                                    <button
                                      onClick={() =>
                                        toggleVideoMute(index)
                                      }
                                      className="bg-white/20 backdrop-blur-md border border-white/30 p-3 rounded-full hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
                                      aria-label={
                                        videoMutedStates[index]
                                          ? "Unmute video"
                                          : "Mute video"
                                      }
                                    >
                                      <Volume2
                                        size={18}
                                        className={`text-white ${videoMutedStates[index] ? "opacity-50" : "opacity-100"}`}
                                      />
                                      {videoMutedStates[
                                        index
                                      ] && (
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-0.5 bg-white rotate-45"></div>
                                      )}
                                    </button>
                                  </div>

                                  {/* Video Number Badge - Top Left */}
                                  {selectedProduct.videoUrls &&
                                    selectedProduct.videoUrls
                                      .length > 1 && (
                                      <div className="absolute top-4 left-4 z-10">
                                        <div className="bg-orange-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                                          Video {index + 1}
                                        </div>
                                      </div>
                                    )}
                                </div>
                              ) : (
                                <div
                                  key={index}
                                  className="bg-red-50 border border-red-200 p-4 rounded-lg"
                                >
                                  <p className="text-red-600 text-sm">
                                    Invalid video URL:{" "}
                                    {videoUrl}
                                  </p>
                                </div>
                              );
                            },
                          )}
                        </div>
                      </div>
                    )}
                </div>
              </div>

              {/* Navigation Buttons - Centered below product info */}
              <div className="flex items-center justify-center gap-6 mt-12">
                <button
                  onClick={goToPreviousProduct}
                  className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
                  aria-label="Produk Sebelumnya"
                >
                  <ChevronLeft size={20} />
                  <span className="font-semibold">
                    Sebelumnya
                  </span>
                </button>

                <button
                  onClick={goToNextProduct}
                  className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
                  aria-label="Produk Selanjutnya"
                >
                  <span className="font-semibold">
                    Selanjutnya
                  </span>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </section>
        ) : (
          <section className="w-full py-8 px-4 bg-white">
            <div className="max-w-full mx-auto bg-white">
              <div className="flex items-center justify-center gap-1 transition-all duration-300 min-h-[160px] bg-white">
                {displayedProducts.length > 0 ? (
                  displayedProducts.map((product, index) => (
                    <div
                      key={`${product.name}-${index}`}
                      className="flex-shrink-0 group cursor-pointer"
                      onMouseEnter={() =>
                        setHoveredIndex(index)
                      }
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => {
                        setSelectedProduct(product);
                        setCurrentImageSide("left");
                      }}
                    >
                      <div className="w-28 h-40 flex items-center justify-center relative">
                        <ImageWithFallback
                          src={getImageUrl(
                            product,
                            index,
                            displayedProducts.length,
                          )}
                          alt={product.name}
                          className={`w-full h-full object-contain drop-shadow-xl relative z-10 transition-all duration-300 ${
                            hoveredIndex === null ||
                            hoveredIndex === index
                              ? "opacity-100"
                              : "opacity-50"
                          }`}
                        />
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-black/70 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center w-full h-40">
                    <p className="text-orange-600 font-bold text-xl tracking-wider">
                      PRODUK TIDAK TERSEDIA
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center gap-6 mt-12 bg-white">
                <div className="flex items-center justify-center gap-8 bg-white">
                  <button
                    className="group relative bg-gradient-to-br from-amber-800 to-amber-900 text-white p-4 rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgb(120,53,15,0.4)] hover:scale-110 disabled:hover:scale-100 border border-amber-700/50 hover:border-amber-600"
                    onClick={handlePrevious}
                    disabled={
                      isAnimating ||
                      displayedProducts.length === 0
                    }
                    aria-label="Previous products"
                  >
                    <ChevronLeft
                      size={20}
                      className="relative z-10"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12"></div>
                  </button>

                  <button
                    className="group relative bg-gradient-to-br from-amber-800 to-amber-900 text-white p-4 rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgb(120,53,15,0.4)] hover:scale-110 disabled:hover:scale-100 border border-amber-700/50 hover:border-amber-600"
                    onClick={handleNext}
                    disabled={
                      isAnimating ||
                      displayedProducts.length === 0
                    }
                    aria-label="Next products"
                  >
                    <ChevronRight
                      size={20}
                      className="relative z-10"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12"></div>
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 bg-white">
                  {/* All Products Button */}
                  <button
                    onClick={() => {
                      setSelectedFilterCategory(null);
                      setSelectedMarketFilter(null);
                    }}
                    className={`group relative px-4 md:px-8 py-3 md:py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden ${
                      selectedFilterCategory === null &&
                      selectedMarketFilter === null
                        ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white scale-105"
                        : "bg-white text-orange-600 hover:scale-105"
                    }`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 transition-opacity duration-300 ${
                        selectedFilterCategory === null &&
                        selectedMarketFilter === null
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-10"
                      }`}
                    ></div>

                    <div
                      className={`absolute inset-0 rounded-xl border-2 transition-colors duration-300 ${
                        selectedFilterCategory === null &&
                        selectedMarketFilter === null
                          ? "border-amber-500"
                          : "border-amber-200 group-hover:border-amber-400"
                      }`}
                    ></div>

                    <div className="relative z-10 flex items-center gap-2">
                      <LayoutGrid
                        size={16}
                        className={
                          selectedFilterCategory === null &&
                          selectedMarketFilter === null
                            ? "text-amber-100"
                            : "text-amber-700"
                        }
                      />
                      <span className="font-semibold tracking-wide text-xs md:text-sm whitespace-nowrap">
                        SEMUA PRODUK
                      </span>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%]"></div>
                  </button>

                  {/* Dynamic Filter Categories from CMS */}
                  {defaultPages.rokok.filterCategories &&
                    defaultPages.rokok.filterCategories.map(
                      (cat: any) => {
                        // Single Filter Button - Same design as SEMUA PRODUK (Amber)
                        if (
                          !cat.type ||
                          cat.type === "single"
                        ) {
                          const isSelected =
                            selectedFilterCategory === cat.name;
                          return (
                            <button
                              key={cat.name}
                              onClick={() =>
                                setSelectedFilterCategory(
                                  isSelected ? null : cat.name,
                                )
                              }
                              className={`group relative px-4 md:px-8 py-3 md:py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden ${
                                isSelected
                                  ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white scale-105"
                                  : "bg-white text-orange-600 hover:scale-105"
                              }`}
                            >
                              <div
                                className={`absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 transition-opacity duration-300 ${
                                  isSelected
                                    ? "opacity-100"
                                    : "opacity-0 group-hover:opacity-10"
                                }`}
                              ></div>

                              <div
                                className={`absolute inset-0 rounded-xl border-2 transition-colors duration-300 ${
                                  isSelected
                                    ? "border-amber-500"
                                    : "border-amber-200 group-hover:border-amber-400"
                                }`}
                              ></div>

                              <div className="relative z-10 flex items-center gap-2">
                                <LayoutGrid
                                  size={16}
                                  className={
                                    isSelected
                                      ? "text-amber-100"
                                      : "text-amber-700"
                                  }
                                />
                                <span className="font-semibold tracking-wide text-xs md:text-sm whitespace-nowrap">
                                  {cat.label}
                                </span>
                              </div>

                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%]"></div>
                            </button>
                          );
                        }

                        // Dropdown Filter - Amber design like SEMUA PRODUK
                        if (cat.type === "dropdown") {
                          const isExpanded =
                            expandedDropdowns[cat.name] ||
                            false;
                          const selectedChild =
                            cat.children?.find(
                              (child: any) =>
                                child.name ===
                                selectedMarketFilter,
                            );

                          return (
                            <div
                              key={cat.name}
                              className="relative w-full md:w-auto"
                            >
                              <button
                                onClick={() =>
                                  setExpandedDropdowns({
                                    ...expandedDropdowns,
                                    [cat.name]: !isExpanded,
                                  })
                                }
                                className={`w-full md:w-auto flex items-center gap-3 px-4 md:px-5 py-3 md:py-3.5 rounded-xl transition-all duration-200 md:min-w-[200px] ${
                                  selectedMarketFilter
                                    ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white border-2 border-amber-500 scale-105 shadow-lg"
                                    : "bg-white border-2 border-amber-200 hover:border-amber-400"
                                }`}
                              >
                                <LayoutGrid
                                  size={16}
                                  className={
                                    selectedMarketFilter
                                      ? "text-amber-100"
                                      : "text-amber-700"
                                  }
                                />
                                <span
                                  className={`flex-1 text-left font-semibold text-xs md:text-sm ${selectedMarketFilter ? "text-white" : "text-orange-600"}`}
                                >
                                  {selectedChild
                                    ? selectedChild.label.toUpperCase()
                                    : cat.label.toUpperCase()}
                                </span>
                                <ChevronDown
                                  size={18}
                                  className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""} ${selectedMarketFilter ? "text-amber-100" : "text-amber-700"}`}
                                />
                              </button>

                              {isExpanded && (
                                <div className="absolute top-full left-0 mt-2 w-full bg-white border-2 border-amber-200 rounded-xl shadow-xl overflow-hidden z-50">
                                  {cat.children?.map(
                                    (child: any) => (
                                      <button
                                        key={child.name}
                                        onClick={() => {
                                          setSelectedMarketFilter(
                                            child.name,
                                          );
                                          setExpandedDropdowns({
                                            ...expandedDropdowns,
                                            [cat.name]: false,
                                          });
                                        }}
                                        className={`w-full px-5 py-3 text-left font-semibold text-sm transition-colors ${
                                          selectedMarketFilter ===
                                          child.name
                                            ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white"
                                            : "text-orange-600 hover:bg-amber-50"
                                        }`}
                                      >
                                        {child.label.toUpperCase()}
                                      </button>
                                    ),
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        }

                        return null;
                      },
                    )}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    );
  };

  return (
    <JobsProvider>
      <div className="min-h-screen bg-white">
        {/* Analytics Tracker - Track all page visits */}
        <AnalyticsTracker />

        {/* Only show Header when NOT on landing page, NOT on karir page, NOT on karir-dashboard, NOT on employee-dashboard, NOT on hr-dashboard, NOT on login, NOT on signup, NOT on tentang-kami, NOT on kontak, NOT on blog, NOT on article-detail, NOT on b2b, NOT on b2b-dashboard, and NOT on nilai pages */}
        {currentPage !== "landing" &&
          currentPage !== "karir" &&
          currentPage !== "karir-dashboard" &&
          currentPage !== "employee-dashboard" &&
          currentPage !== "hr-dashboard" &&
          currentPage !== "login" &&
          currentPage !== "signup" &&
          currentPage !== "tentang-kami" &&
          currentPage !== "kontak" &&
          currentPage !== "blog" &&
          currentPage !== "article-detail" &&
          currentPage !== "b2b" &&
          currentPage !== "b2b-dashboard" &&
          currentPage !== "integritas" &&
          currentPage !== "kualitas" &&
          currentPage !== "inovasi" &&
          currentPage !== "kolaborasi" && (
            <Header
              currentPage={currentPage}
              onNavigate={handleNavigate}
              onNavigateToLogin={() =>
                handleNavigateToLogin("karir")
              }
              onNavigateToSignup={() =>
                handleNavigateToSignup("karir")
              }
            />
          )}

        {currentPage === "landing" && (
          <LandingPage
            onNavigate={handleNavigate}
            onNavigateToLogin={() =>
              handleNavigateToLogin("karir")
            }
            onNavigateToSignup={() =>
              handleNavigateToSignup("karir")
            }
          />
        )}

        {currentPage === "rokok" && renderRokokPage()}

        {currentPage === "tembakau-tsc" &&
          (defaultPages.tsc.status === "draft" ? (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center p-12 bg-white rounded-xl shadow-lg max-w-md">
                <div className="w-20 h-20 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
                  <Cigarette
                    size={40}
                    className="text-amber-600"
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  Halaman Tidak Tersedia
                </h2>
                <p className="text-gray-600 mb-6">
                  Halaman produk ini sedang dalam mode draft dan
                  tidak dapat diakses saat ini.
                </p>
                <button
                  onClick={() => setCurrentPage("landing")}
                  className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Kembali ke Beranda
                </button>
              </div>
            </div>
          ) : (
            <TembakauPage
              products={tembakauTSCProducts}
              title="Tembakau TSC (Tembakau Siap Campur)"
              description="Tembakau Siap Campur (TSC) adalah produk tembakau yang telah melalui proses steam dan siap untuk dicampur dalam produksi."
              filterCategories={
                defaultPages.tsc.filterCategories
              }
            />
          ))}

        {currentPage === "tembakau-tsg" &&
          (defaultPages.tsg.status === "draft" ? (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center p-12 bg-white rounded-xl shadow-lg max-w-md">
                <div className="w-20 h-20 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
                  <Cigarette
                    size={40}
                    className="text-amber-600"
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  Halaman Tidak Tersedia
                </h2>
                <p className="text-gray-600 mb-6">
                  Halaman produk ini sedang dalam mode draft dan
                  tidak dapat diakses saat ini.
                </p>
                <button
                  onClick={() => setCurrentPage("landing")}
                  className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Kembali ke Beranda
                </button>
              </div>
            </div>
          ) : (
            <TembakauPage
              products={tembakauTSGProducts}
              title="Tembakau TSG (Tembakau Siap Giling)"
              description="Tembakau Siap Giling (TSG) adalah produk tembakau berkualitas yang sudah di proses Flavour atau Chaos, cengkeh dan bahan bahan lain yang siap di pakai untuk produksi rokok."
              filterCategories={
                defaultPages.tsg.filterCategories
              }
            />
          ))}

        {currentPage === "karir" && (
          <KarirPage
            onNavigateToLogin={() =>
              handleNavigateToLogin("karir")
            }
            onNavigateToSignup={() =>
              handleNavigateToSignup("karir")
            }
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === "tentang-kami" && (
          <TentangKamiPage
            onNavigate={handleNavigate}
            onNavigateToLogin={() =>
              handleNavigateToLogin("karir")
            }
            onNavigateToSignup={() =>
              handleNavigateToSignup("karir")
            }
          />
        )}

        {currentPage === "kontak" && (
          <KontakPage onNavigate={handleNavigate} />
        )}

        {currentPage === "blog" && (
          <BlogPage onNavigate={handleNavigate} />
        )}

        {currentPage === "b2b" && (
          <BusinessToBusiness onNavigate={handleNavigate} />
        )}

        {currentPage === "article-detail" && (
          <ArticleDetailPage
            articleId={selectedArticleId}
            onNavigate={handleNavigate}
          />
        )}

        {/* Custom Product Pages */}
        {![
          "landing",
          "rokok",
          "tembakau-tsc",
          "tembakau-tsg",
          "karir",
          "karir-dashboard",
          "employee-dashboard",
          "hr-dashboard",
          "login",
          "signup",
          "tentang-kami",
          "kontak",
          "blog",
          "article-detail",
          "b2b",
          "b2b-dashboard",
        ].includes(currentPage) && (
          <CustomProductPage
            slug={currentPage}
            onBack={() => handleNavigate("landing")}
          />
        )}

        {currentPage === "login" &&
          loginContext === "karir" && (
            <KarirLoginPage
              onLoginSuccess={handleLogin}
              onNavigateToSignup={() =>
                handleNavigateToSignup("karir")
              }
              onBack={() => handleNavigate("karir")}
              onHRLoginSuccess={() =>
                setCurrentPage("hr-dashboard")
              }
              onEmployeeLoginSuccess={handleEmployeeLogin}
            />
          )}

        {currentPage === "signup" &&
          signupContext === "karir" && (
            <KarirSignupPage
              onSignupSuccess={handleKarirSignupSuccess}
              onNavigateToLogin={() =>
                handleNavigateToLogin("karir")
              }
              onBack={() => handleNavigate("karir")}
            />
          )}

        {currentPage === "karir-dashboard" && (
          <KarirDashboard
            onLogout={handleLogout}
            userProfile={userProfile}
          />
        )}

        {currentPage === "employee-dashboard" && (
          <EmployeeDashboard
            onLogout={handleLogout}
            employeeProfile={employeeProfile}
          />
        )}

        {currentPage === "hr-dashboard" && (
          <HRDashboard
            onLogout={() => handleNavigate("karir")}
          />
        )}

        {currentPage === "b2b-dashboard" && (
          <B2BMarketplaceDashboard
            userEmail={b2bUserEmail}
            onLogout={handleB2BLogout}
            onBack={() =>
              handleNavigate("business-to-business")
            }
          />
        )}

        {/* Footer only shows on landing page */}
        {currentPage === "landing" && (
          <Footer onNavigate={setCurrentPage} />
        )}
      </div>
    </JobsProvider>
  );
}