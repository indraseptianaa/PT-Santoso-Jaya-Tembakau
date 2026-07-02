# 📊 Activity Tracking System - PT Santoso Jaya Tembakau

## Overview
Sistem pelacakan aktivitas real-time yang terintegrasi dengan CMS Panel untuk monitoring seluruh aktivitas website.

## 🔍 Tipe Aktivitas

### 1. **Visitor** (`type: 'visitor'`)
- **Sumber**: Otomatis dari `trackVisitor()` di `analytics.ts`
- **Trigger**: Pengunjung baru terdeteksi (sekali per hari)
- **Contoh**: `"Pengunjung baru dari Jakarta, Indonesia"`
- **Implementasi**: ✅ Sudah aktif

### 2. **Blog** (`type: 'blog'`)
- **Sumber**: CMS Panel - Blog Management
- **Trigger**: 
  - Create blog baru
  - Update blog existing
  - Delete blog
- **Contoh**: 
  - `"Blog baru 'Sejarah Tembakau' ditambahkan"`
  - `"Blog 'Proses Produksi' diperbarui"`
  - `"Blog 'Quality Control' dihapus"`
- **Implementasi**: ✅ Sudah aktif di `CMSPanel.tsx`

### 3. **Product** (`type: 'product'`)
- **Sumber**: CMS Panel - Product Management
- **Trigger**:
  - Create produk baru (Rokok/TSC/TSG)
  - Update produk existing
  - Delete produk
- **Contoh**:
  - `"Produk Rokok baru 'Signature Mild' ditambahkan"`
  - `"Produk TSC 'Premium Virginia' diperbarui"`
  - `"Produk TSG 'Blend Special' dihapus"`
- **Implementasi**: ✅ Sudah aktif di `CMSPanel.tsx`

### 4. **Update** (`type: 'update'`)
- **Sumber**: CMS Panel - Content Management
- **Trigger**:
  - Update Landing Page content
  - Update About Page content
  - System configuration changes
- **Contoh**:
  - `"Landing page content diperbarui"`
  - `"Halaman Tentang Kami diperbarui"`
- **Implementasi**: ✅ Sudah aktif di `CMSPanel.tsx`

## 📍 Lokasi Implementasi

### File Utama
- **`/src/app/utils/analytics.ts`**: Core tracking functions
- **`/src/app/components/CMSPanel.tsx`**: CMS activity tracking
- **`/src/app/components/AnalyticsDetailViews.tsx`**: Activity display UI

### Fungsi Tracking di CMSPanel

```typescript
// Landing Page
saveLandingContent() → addActivity({ type: 'update', message: 'Landing page...' })

// About Page
saveAboutContent() → addActivity({ type: 'update', message: 'Halaman Tentang...' })

// Blog Management
saveBlog() → addActivity({ type: 'blog', message: 'Blog baru/diperbarui...' })
deleteBlog() → addActivity({ type: 'blog', message: 'Blog dihapus...' })

// Rokok Products
saveProduct() → addActivity({ type: 'product', message: 'Produk Rokok...' })
deleteProduct() → addActivity({ type: 'product', message: 'Produk Rokok dihapus...' })

// TSC Products
saveTembakauTSC() → addActivity({ type: 'product', message: 'Produk TSC...' })
deleteTembakauTSC() → addActivity({ type: 'product', message: 'Produk TSC dihapus...' })

// TSG Products
saveTembakauTSG() → addActivity({ type: 'product', message: 'Produk TSG...' })
deleteTembakauTSG() → addActivity({ type: 'product', message: 'Produk TSG dihapus...' })
```

## 🎯 Usage Example

```typescript
import { addActivity } from '../utils/analytics';

// Menambahkan aktivitas manual
addActivity({
  id: Date.now().toString(),
  type: 'update',
  message: 'Profile settings diperbarui',
  timestamp: Date.now(),
});
```

## 📊 Dashboard Analytics

### Detail View Features
1. **Search & Filter**: Cari aktivitas berdasarkan keyword dan filter by type
2. **Statistics Cards**: 
   - Total aktivitas per tipe (Pengunjung, Blog, Produk, Update)
3. **Time Display**: "Baru saja", "5 menit yang lalu", "2 jam yang lalu"
4. **Color Coding**:
   - 🟢 Visitor (green)
   - 🔵 Blog (blue)
   - 🟠 Product (orange)
   - 🟣 Update (purple)

## 🔧 Data Storage
- **LocalStorage Key**: `analytics_activities`
- **Format**: JSON Array of Activity objects
- **Retention**: Last 20 activities (auto-trimmed)

## ✨ Demo Data
Sistem otomatis generate 8 demo activities pada first load untuk menampilkan contoh data.

## 🚀 Future Enhancements
- [ ] Activity export ke CSV/PDF
- [ ] Advanced filtering (date range, multiple types)
- [ ] Activity notifications (real-time alerts)
- [ ] User-specific activity tracking
- [ ] Activity analytics & insights
