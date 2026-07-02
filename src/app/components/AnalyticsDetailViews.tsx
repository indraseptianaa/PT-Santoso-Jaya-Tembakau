import React, { useState } from 'react';
import { ArrowLeft, Globe, Activity, BarChart3, Monitor, Chrome, Smartphone, Search } from 'lucide-react';

// Visitors Detail View
export function VisitorsDetailView({ data, onBack }: { data: any[]; onBack: () => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Ensure data is always an array and has valid structure
  const safeData = Array.isArray(data) ? data : [];
  
  const filteredData = safeData.filter(item =>
    item?.country?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">Pengunjung Berdasarkan Negara</h2>
          <p className="text-gray-600">Detail lengkap pengunjung dari seluruh negara</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari negara..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6">
          <Globe className="mb-2 opacity-80" size={32} />
          <h3 className="text-3xl font-bold mb-1">{safeData.length}</h3>
          <p className="text-sm opacity-90">Total Negara</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6">
          <Activity className="mb-2 opacity-80" size={32} />
          <h3 className="text-3xl font-bold mb-1">{safeData.reduce((sum, country) => sum + (country?.visitors || 0), 0)}</h3>
          <p className="text-sm opacity-90">Total Pengunjung</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6">
          <BarChart3 className="mb-2 opacity-80" size={32} />
          <h3 className="text-3xl font-bold mb-1">
            {safeData.length > 0 ? Math.round(safeData.reduce((sum, country) => sum + (country?.visitors || 0), 0) / safeData.length) : 0}
          </h3>
          <p className="text-sm opacity-90">Rata-rata / Negara</p>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">No</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Negara</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase">Pengunjung</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase">Persentase</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.length > 0 ? (
                filteredData.map((country, index) => {
                  const colors = ['blue', 'green', 'purple', 'orange', 'pink', 'yellow', 'red', 'indigo'];
                  const color = colors[index % colors.length];
                  return (
                    <tr key={country.country} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full bg-${color}-100 flex items-center justify-center text-sm`}>
                            {country?.flag || '🌍'}
                          </div>
                          <span className="text-sm font-medium text-gray-900">{country?.country || 'Unknown'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-sm font-semibold text-gray-900">{(country?.visitors || 0).toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-${color}-100 text-${color}-700`}>
                          {(country?.percentage || 0).toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div className={`bg-${color}-500 h-2 rounded-full`} style={{ width: `${country?.percentage || 0}%` }}></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    Tidak ada data yang cocok dengan pencarian Anda
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Activities Detail View
export function ActivitiesDetailView({ data, onBack }: { data: any[]; onBack: () => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredData = data
    .filter(item => {
      const matchSearch = item.message.toLowerCase().includes(searchQuery.toLowerCase());
      const matchType = filterType === 'all' || item.type === filterType;
      return matchSearch && matchType;
    });

  const getTimeAgo = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Baru saja';
    if (minutes < 60) return `${minutes} menit yang lalu`;
    if (hours < 24) return `${hours} jam yang lalu`;
    return `${days} hari yang lalu`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">Aktivitas Terkini</h2>
          <p className="text-gray-600">Log aktivitas lengkap dari sistem</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari aktivitas..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Semua Tipe</option>
            <option value="visitor">Pengunjung</option>
            <option value="blog">Blog</option>
            <option value="product">Produk</option>
            <option value="update">Update</option>
          </select>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-4">
          <p className="text-sm opacity-90 mb-1">Pengunjung</p>
          <p className="text-2xl font-bold">{data.filter(a => a.type === 'visitor').length}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-4">
          <p className="text-sm opacity-90 mb-1">Blog</p>
          <p className="text-2xl font-bold">{data.filter(a => a.type === 'blog').length}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-4">
          <p className="text-sm opacity-90 mb-1">Produk</p>
          <p className="text-2xl font-bold">{data.filter(a => a.type === 'product').length}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-4">
          <p className="text-sm opacity-90 mb-1">Update</p>
          <p className="text-2xl font-bold">{data.filter(a => a.type === 'update').length}</p>
        </div>
      </div>

      {/* Activities List */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="space-y-3">
          {filteredData.length > 0 ? (
            filteredData.map((activity) => {
              const colors: { [key: string]: string } = {
                visitor: 'green',
                blog: 'blue',
                product: 'orange',
                update: 'purple',
              };
              const color = colors[activity.type] || 'gray';
              const timeAgo = getTimeAgo(activity.timestamp);

              return (
                <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className={`w-3 h-3 bg-${color}-500 rounded-full mt-2 flex-shrink-0`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 font-medium">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{timeAgo}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-${color}-100 text-${color}-700 flex-shrink-0`}>
                    {activity.type}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Activity size={48} className="mx-auto mb-2 opacity-20" />
              <p className="text-sm">Tidak ada aktivitas yang cocok</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Pages Detail View
export function PagesDetailView({ data, onBack }: { data: any[]; onBack: () => void }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = data.filter(item =>
    item.page.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">Halaman Populer</h2>
          <p className="text-gray-600">Detail kunjungan untuk setiap halaman</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari halaman..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6">
          <BarChart3 className="mb-2 opacity-80" size={32} />
          <h3 className="text-3xl font-bold mb-1">{data.length}</h3>
          <p className="text-sm opacity-90">Total Halaman</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6">
          <Activity className="mb-2 opacity-80" size={32} />
          <h3 className="text-3xl font-bold mb-1">{data.reduce((sum, page) => sum + page.views, 0).toLocaleString()}</h3>
          <p className="text-sm opacity-90">Total Views</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6">
          <Globe className="mb-2 opacity-80" size={32} />
          <h3 className="text-3xl font-bold mb-1">
            {data.length > 0 ? Math.round(data.reduce((sum, page) => sum + page.views, 0) / data.length).toLocaleString() : 0}
          </h3>
          <p className="text-sm opacity-90">Rata-rata Views</p>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">No</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Halaman</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase">Total Views</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Popularitas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.length > 0 ? (
                filteredData.map((page, index) => {
                  const colors = ['orange', 'blue', 'green', 'purple', 'pink', 'yellow'];
                  const color = colors[index % colors.length];
                  const maxViews = Math.max(...data.map(p => p.views));
                  const percentage = (page.views / maxViews) * 100;

                  return (
                    <tr key={page.page} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-gray-900">{page.page}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-sm font-semibold text-gray-900">{page.views.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div className={`bg-${color}-500 h-2 rounded-full`} style={{ width: `${percentage}%` }}></div>
                          </div>
                          <span className="text-xs text-gray-600 w-12 text-right">{percentage.toFixed(0)}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    Tidak ada data yang cocok dengan pencarian Anda
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Browser Detail View
export function BrowserDetailView({ 
  browserData, 
  deviceData, 
  onBack 
}: { 
  browserData: any[]; 
  deviceData: any[]; 
  onBack: () => void 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Ensure data is always an array
  const safeBrowserData = Array.isArray(browserData) ? browserData : [];
  const safeDeviceData = Array.isArray(deviceData) ? deviceData : [];
  
  // Combine browser and device data for unified search
  const combinedData = [
    ...safeBrowserData.map(b => ({ ...b, category: 'browser' })),
    ...safeDeviceData.map(d => ({ ...d, category: 'device', name: d.type }))
  ];
  
  const filteredData = combinedData.filter(item =>
    item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalCount = safeBrowserData.reduce((sum, b) => sum + (b?.count || 0), 0) + 
                     safeDeviceData.reduce((sum, d) => sum + (d?.count || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">Browser & Device Statistics</h2>
          <p className="text-gray-600">Detail lengkap penggunaan browser dan perangkat</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari browser atau device..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6">
          <Monitor className="mb-2 opacity-80" size={32} />
          <h3 className="text-3xl font-bold mb-1">{safeBrowserData.length + safeDeviceData.length}</h3>
          <p className="text-sm opacity-90">Total Tipe</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6">
          <Activity className="mb-2 opacity-80" size={32} />
          <h3 className="text-3xl font-bold mb-1">{totalCount}</h3>
          <p className="text-sm opacity-90">Total Pengunjung</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6">
          <BarChart3 className="mb-2 opacity-80" size={32} />
          <h3 className="text-3xl font-bold mb-1">
            {combinedData.length > 0 ? Math.round(totalCount / combinedData.length) : 0}
          </h3>
          <p className="text-sm opacity-90">Rata-rata / Tipe</p>
        </div>
      </div>

      {/* Browser Stats Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-bold text-gray-900">Browser Statistics</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">No</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Browser</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase">Pengunjung</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase">Persentase</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {safeBrowserData.length > 0 ? (
                safeBrowserData
                  .filter(browser => !searchQuery || browser?.name?.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((browser, index) => {
                    const iconMap: { [key: string]: any } = {
                      Chrome: Chrome,
                      Safari: Monitor,
                      Firefox: Chrome,
                      Edge: Chrome,
                    };
                    const Icon = iconMap[browser?.name] || Chrome;
                    const colorMap: { [key: string]: string } = {
                      Chrome: 'blue',
                      Safari: 'orange',
                      Firefox: 'red',
                      Edge: 'cyan',
                    };
                    const color = colorMap[browser?.name] || 'gray';

                    return (
                      <tr key={browser?.name || index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full bg-${color}-100 flex items-center justify-center`}>
                              <Icon size={16} className={`text-${color}-600`} />
                            </div>
                            <span className="text-sm font-medium text-gray-900">{browser?.name || 'Unknown'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-sm font-semibold text-gray-900">{(browser?.count || 0).toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-${color}-100 text-${color}-700`}>
                            {(browser?.percentage || 0).toFixed(1)}%
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div className={`bg-${color}-500 h-2 rounded-full`} style={{ width: `${browser?.percentage || 0}%` }}></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    Belum ada data browser
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Device Stats Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-bold text-gray-900">Device Statistics</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">No</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Device</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase">Perangkat</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase">Persentase</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {safeDeviceData.length > 0 ? (
                safeDeviceData
                  .filter(device => !searchQuery || device?.type?.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((device, index) => {
                    const iconMap: { [key: string]: any } = {
                      mobile: Smartphone,
                      tablet: Monitor,
                      desktop: Monitor,
                    };
                    const Icon = iconMap[device?.type] || Monitor;
                    const colorMap: { [key: string]: string } = {
                      mobile: 'green',
                      tablet: 'yellow',
                      desktop: 'purple',
                    };
                    const color = colorMap[device?.type] || 'gray';
                    const label = device?.type ? device.type.charAt(0).toUpperCase() + device.type.slice(1) : 'Unknown';

                    return (
                      <tr key={device?.type || index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full bg-${color}-100 flex items-center justify-center`}>
                              <Icon size={16} className={`text-${color}-600`} />
                            </div>
                            <span className="text-sm font-medium text-gray-900">{label}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-sm font-semibold text-gray-900">{(device?.count || 0).toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-${color}-100 text-${color}-700`}>
                            {(device?.percentage || 0).toFixed(1)}%
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div className={`bg-${color}-500 h-2 rounded-full`} style={{ width: `${device?.percentage || 0}%` }}></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    Belum ada data device
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}