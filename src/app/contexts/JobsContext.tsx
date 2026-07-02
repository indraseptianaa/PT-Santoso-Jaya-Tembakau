// Jobs Context for Real-time Synchronization
// Provides shared state between HR Dashboard and Public Career Page
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  postedDate: string;
  deadline: string;
  status: 'active' | 'closed';
  applicantsCount: number;
}

interface JobsContextType {
  jobPostings: JobPosting[];
  addJob: (job: JobPosting) => void;
  updateJob: (id: string, updatedJob: JobPosting) => void;
  deleteJob: (id: string) => void;
  getActiveJobs: () => JobPosting[];
}

const JobsContext = createContext<JobsContextType | undefined>(undefined);

// Initial job data - 5 lowongan
const initialJobs: JobPosting[] = [
  {
    id: '1',
    title: 'Supervisor Produksi',
    department: 'Produksi',
    location: 'Kudus, Jawa Tengah',
    type: 'Full-time',
    salary: 'Rp 8.000.000 - Rp 12.000.000',
    description: 'Mengawasi dan mengelola proses produksi rokok dengan standar kualitas tinggi. Bertanggung jawab atas efisiensi produksi dan pengembangan tim.',
    requirements: [
      'Minimal S1 Teknik Industri/Manajemen',
      'Pengalaman 3-5 tahun di industri manufaktur',
      'Memahami sistem manajemen produksi',
      'Kemampuan leadership yang baik',
      'Bersedia bekerja shift'
    ],
    responsibilities: [
      'Mengawasi proses produksi harian',
      'Memastikan target produksi tercapai',
      'Mengelola dan mengembangkan tim produksi',
      'Melakukan quality control',
      'Membuat laporan produksi'
    ],
    postedDate: '2025-01-10',
    deadline: '2025-02-10',
    status: 'active',
    applicantsCount: 15
  },
  {
    id: '2',
    title: 'Quality Control Staff',
    department: 'Quality Assurance',
    location: 'Kudus, Jawa Tengah',
    type: 'Full-time',
    salary: 'Rp 5.000.000 - Rp 7.000.000',
    description: 'Melakukan inspeksi dan pengendalian kualitas produk rokok sesuai standar perusahaan dan regulasi yang berlaku.',
    requirements: [
      'Minimal D3 Teknik/Farmasi',
      'Pengalaman 1-2 tahun di QC',
      'Teliti dan detail oriented',
      'Memahami standar ISO',
      'Mampu mengoperasikan alat ukur QC'
    ],
    responsibilities: [
      'Melakukan inspeksi produk',
      'Membuat laporan quality control',
      'Melakukan sampling produk',
      'Koordinasi dengan tim produksi',
      'Memastikan kepatuhan terhadap standar mutu'
    ],
    postedDate: '2025-01-15',
    deadline: '2025-02-15',
    status: 'active',
    applicantsCount: 23
  },
  {
    id: '3',
    title: 'Staff Accounting',
    department: 'Finance',
    location: 'Kudus, Jawa Tengah',
    type: 'Full-time',
    salary: 'Rp 6.000.000 - Rp 9.000.000',
    description: 'Mengelola pembukuan dan laporan keuangan perusahaan dengan akurat dan tepat waktu sesuai standar akuntansi yang berlaku.',
    requirements: [
      'Minimal S1 Akuntansi',
      'Pengalaman 2-3 tahun',
      'Menguasai software akuntansi',
      'Memahami perpajakan',
      'Teliti dan bertanggung jawab'
    ],
    responsibilities: [
      'Membuat laporan keuangan',
      'Mengelola pembukuan',
      'Koordinasi dengan auditor',
      'Mengelola pajak perusahaan',
      'Membuat rekonsiliasi bank'
    ],
    postedDate: '2025-01-05',
    deadline: '2025-02-05',
    status: 'active',
    applicantsCount: 18
  },
  {
    id: '4',
    title: 'Sales Executive',
    department: 'Sales & Marketing',
    location: 'Jakarta, DKI Jakarta',
    type: 'Full-time',
    salary: 'Rp 7.000.000 - Rp 10.000.000 + Komisi',
    description: 'Mengelola dan mengembangkan area penjualan untuk mencapai target sales yang telah ditetapkan. Membangun hubungan baik dengan distributor dan retail.',
    requirements: [
      'Minimal D3 semua jurusan',
      'Pengalaman 2-4 tahun di bidang sales',
      'Memiliki networking yang luas',
      'Kemampuan komunikasi dan negosiasi yang baik',
      'Memiliki SIM A dan kendaraan pribadi'
    ],
    responsibilities: [
      'Mengelola dan mengembangkan area sales',
      'Mencapai target penjualan',
      'Membina hubungan dengan distributor',
      'Melakukan monitoring pasar',
      'Membuat laporan penjualan'
    ],
    postedDate: '2025-01-12',
    deadline: '2025-02-12',
    status: 'active',
    applicantsCount: 31
  },
  {
    id: '5',
    title: 'HR Generalist',
    department: 'Human Resources',
    location: 'Kudus, Jawa Tengah',
    type: 'Full-time',
    salary: 'Rp 6.500.000 - Rp 9.500.000',
    description: 'Mengelola berbagai aspek human resources termasuk rekrutmen, pelatihan, administrasi karyawan, dan employee relations.',
    requirements: [
      'Minimal S1 Psikologi/Manajemen SDM',
      'Pengalaman 2-3 tahun di bidang HR',
      'Memahami peraturan ketenagakerjaan',
      'Kemampuan komunikasi yang baik',
      'Familiar dengan HRIS'
    ],
    responsibilities: [
      'Mengelola proses rekrutmen',
      'Mengurus administrasi karyawan',
      'Mengelola program pelatihan',
      'Menangani employee relations',
      'Membuat laporan HR'
    ],
    postedDate: '2025-01-08',
    deadline: '2025-02-08',
    status: 'active',
    applicantsCount: 27
  }
];

const STORAGE_KEY = 'pt_santoso_jobs_v2'; // Changed to v2 to force fresh data
const STORAGE_VERSION_KEY = 'pt_santoso_jobs_version';
const CURRENT_VERSION = '2.0';

export function JobsProvider({ children }: { children: ReactNode }) {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>(() => {
    // Load from localStorage on init
    if (typeof window !== 'undefined') {
      const version = localStorage.getItem(STORAGE_VERSION_KEY);
      const stored = localStorage.getItem(STORAGE_KEY);
      
      // If version doesn't match, clear old data and use initial jobs
      if (version !== CURRENT_VERSION || !stored) {
        localStorage.setItem(STORAGE_VERSION_KEY, CURRENT_VERSION);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialJobs));
        return initialJobs;
      }
      
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          // Validate that we have exactly 5 jobs with unique IDs
          if (Array.isArray(parsed) && parsed.length >= 5) {
            return parsed;
          }
        } catch (e) {
          console.error('Failed to parse stored jobs:', e);
        }
      }
    }
    return initialJobs;
  });

  // Sync to localStorage whenever jobs change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(jobPostings));
      
      // Dispatch custom event for cross-tab/cross-component sync
      window.dispatchEvent(new CustomEvent('jobsUpdated', { 
        detail: jobPostings 
      }));
    }
  }, [jobPostings]);

  // Listen for changes from other tabs/components
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const newJobs = JSON.parse(e.newValue);
          setJobPostings(newJobs);
        } catch (err) {
          console.error('Failed to parse storage event:', err);
        }
      }
    };

    const handleJobsUpdated = (e: Event) => {
      const customEvent = e as CustomEvent<JobPosting[]>;
      if (customEvent.detail) {
        setJobPostings(customEvent.detail);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('jobsUpdated', handleJobsUpdated);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('jobsUpdated', handleJobsUpdated);
    };
  }, []);

  const addJob = (job: JobPosting) => {
    setJobPostings(prev => [...prev, job]);
  };

  const updateJob = (id: string, updatedJob: JobPosting) => {
    setJobPostings(prev => 
      prev.map(job => job.id === id ? updatedJob : job)
    );
  };

  const deleteJob = (id: string) => {
    setJobPostings(prev => prev.filter(job => job.id !== id));
  };

  const getActiveJobs = () => {
    return jobPostings.filter(job => job.status === 'active');
  };

  return (
    <JobsContext.Provider value={{ 
      jobPostings, 
      addJob, 
      updateJob, 
      deleteJob,
      getActiveJobs 
    }}>
      {children}
    </JobsContext.Provider>
  );
}

export function useJobs() {
  const context = useContext(JobsContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobsProvider');
  }
  return context;
}