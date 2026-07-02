import React, { useState } from 'react';
import { Save, X, Plus, ChevronDown, Settings, Video } from 'lucide-react';

interface TembakauProduct {
  id: string;
  name: string;
  productName: string;
  description: string;
  baseImage: string;
  hoverImage?: string;
  videoUrls?: string[];
  backgroundImage?: string;
  jenis?: string;
  berat?: string;
  kemasan?: string;
  kualitas?: string;
  minimalOrder?: string;
  produksi?: string;
  distribusi?: string;
  category?: string;
  filterCategory?: string;
  specifications: { [key: string]: string };
}

interface TembakauProductFormProps {
  product: TembakauProduct | null;
  onSave: (product: TembakauProduct) => void;
  onCancel: () => void;
  type?: 'tsc' | 'tsg';
  filterCategories?: { 
    name: string; 
    label: string; 
    color: string;
    type?: 'single' | 'dropdown';
    children?: { name: string; label: string; color: string }[];
  }[];
}

export function TembakauProductForm({ product, onSave, onCancel, type, filterCategories }: TembakauProductFormProps) {
  // Migrate old product data to specifications
  const migrateProduct = (prod: TembakauProduct | null): TembakauProduct => {
    if (!prod) {
      return {
        id: '',
        name: '',
        productName: '',
        description: '',
        baseImage: '',
        hoverImage: '',
        videoUrls: [],
        filterCategory: '',
        specifications: {},
      };
    }

    // Migrate old fields to specifications
    const specs = { ...(prod.specifications || {}) };
    
    if (prod.jenis && !specs['Jenis']) {
      specs['Jenis'] = prod.jenis;
    }
    if (prod.berat && !specs['Berat']) {
      specs['Berat'] = prod.berat;
    }
    if (prod.kemasan && !specs['Kemasan']) {
      specs['Kemasan'] = prod.kemasan;
    }
    if (prod.kualitas && !specs['Kualitas']) {
      specs['Kualitas'] = prod.kualitas;
    }
    if (prod.minimalOrder && !specs['Minimal Order']) {
      specs['Minimal Order'] = prod.minimalOrder;
    }
    if (prod.produksi && !specs['Produksi']) {
      specs['Produksi'] = prod.produksi;
    }
    if (prod.distribusi && !specs['Distribusi']) {
      specs['Distribusi'] = prod.distribusi;
    }
    if (prod.category && !specs['Category']) {
      specs['Category'] = prod.category === 'mesin' ? 'Mesin' : prod.category === 'tangan' ? 'Tangan' : prod.category;
    }

    return {
      ...prod,
      specifications: specs,
    };
  };

  const [formData, setFormData] = useState<TembakauProduct>(migrateProduct(product));
  const [specKey, setSpecKey] = useState('');
  const [specValue, setSpecValue] = useState('');
  const [expandedDropdowns, setExpandedDropdowns] = useState<{ [key: string]: boolean }>({});
  const [videoInput, setVideoInput] = useState('');

  const toggleDropdown = (dropdownName: string) => {
    setExpandedDropdowns(prev => ({
      ...prev,
      [dropdownName]: !prev[dropdownName]
    }));
  };

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

  const addVideoUrl = () => {
    if (videoInput.trim()) {
      const currentVideos = formData.videoUrls || [];
      setFormData({
        ...formData,
        videoUrls: [...currentVideos, videoInput.trim()]
      });
      setVideoInput('');
    }
  };

  const removeVideoUrl = (index: number) => {
    const currentVideos = formData.videoUrls || [];
    setFormData({
      ...formData,
      videoUrls: currentVideos.filter((_, i) => i !== index)
    });
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
              placeholder="product-1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name (Display)</label>
            <input
              type="text"
              value={formData.productName}
              onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
              placeholder="Product Name"
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
            placeholder="Product description..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        {/* Filter Category Selection - Always show with informative message */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
            <label className="block text-base font-bold text-gray-900">
              Filter Category
            </label>
          </div>
          
          {filterCategories && filterCategories.length > 0 ? (
            <>
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
                    const isExpanded = expandedDropdowns[cat.name] || false;
                    return (
                      <div key={cat.name} className="col-span-2">
                        <button
                          type="button"
                          onClick={() => toggleDropdown(cat.name)}
                          className="w-full bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-gray-300 rounded-xl px-5 py-3 shadow-sm hover:from-gray-200 hover:to-gray-300 transition-all"
                        >
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
                            <div className="ml-auto flex items-center gap-2">
                              <span className="text-xs text-gray-500 font-medium">Select one</span>
                              <ChevronDown 
                                size={16} 
                                className={`text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                              />
                            </div>
                          </div>
                        </button>
                        {isExpanded && (
                          <div className="grid grid-cols-2 gap-4 pl-6 mt-3">
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
                        )}
                      </div>
                    );
                  }
                  
                  return null;
                })}
              </div>
            </>
          ) : (
            <div className="bg-white border-2 border-dashed border-orange-300 rounded-lg p-8 text-center">
              <Settings size={40} className="mx-auto text-orange-400 mb-3" />
              <p className="text-sm text-gray-700 font-semibold mb-2">Filter belum dikonfigurasi</p>
              <p className="text-xs text-gray-500 mb-4">
                Untuk mengaktifkan filter, klik tombol <span className="font-semibold text-orange-600">"Edit Page Settings"</span> di bagian atas halaman {type === 'tsc' ? 'Tembakau TSC' : 'Tembakau TSG'}, lalu enable "Has Filters" dan tambahkan filter categories.
              </p>
              <p className="text-xs text-gray-400 italic">
                Produk ini akan ditampilkan di "All Products" secara default
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
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
            <label className="block text-sm font-semibold text-gray-700 mb-2">Hover Image URL (optional)</label>
            <input
              type="text"
              value={formData.hoverImage || ''}
              onChange={(e) => setFormData({ ...formData, hoverImage: e.target.value })}
              placeholder="https://..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Background Image URL (optional)</label>
          <p className="text-xs text-gray-600 mb-2">Gambar latar belakang besar yang ditampilkan di halaman detail produk</p>
          <input
            type="text"
            value={formData.backgroundImage || ''}
            onChange={(e) => setFormData({ ...formData, backgroundImage: e.target.value })}
            placeholder="https://..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        {/* Video URLs */}
        <div className="border-t pt-4">
          <div className="flex items-center gap-2 mb-2">
            <Video size={18} className="text-orange-600" />
            <h4 className="text-sm font-semibold text-gray-700">Video URLs (YouTube)</h4>
          </div>
          <p className="text-xs text-gray-600 mb-3">Tambahkan URL video YouTube untuk ditampilkan di halaman detail produk</p>
          
          {formData.videoUrls && formData.videoUrls.length > 0 && (
            <div className="mb-3 space-y-2">
              {formData.videoUrls.map((url: string, index: number) => (
                <div key={index} className="flex items-center justify-between bg-green-50 border border-green-200 px-3 py-2 rounded-lg">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Video size={16} className="text-green-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700 truncate">
                      <span className="font-semibold text-green-700">Video {index + 1}:</span> {url}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeVideoUrl(index)}
                    className="text-red-500 hover:text-red-700 ml-2 flex-shrink-0"
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
              value={videoInput}
              onChange={(e) => setVideoInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addVideoUrl();
                }
              }}
              placeholder="https://www.youtube.com/watch?v=..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="button"
              onClick={addVideoUrl}
              className="flex items-center gap-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              <Plus size={16} />
              Add
            </button>
          </div>
        </div>

        {/* Specifications */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Specifications</h4>
          <p className="text-xs text-gray-600 mb-3">Add product details like Jenis, Berat, Kemasan, Kualitas, Minimal Order, etc.</p>
          
          {formData.specifications && Object.entries(formData.specifications).length > 0 && (
            <div className="mb-3 space-y-2">
              {Object.entries(formData.specifications).map(([key, value]: [string, any]) => (
                <div key={key} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                  <span className="text-sm">
                    <span className="font-medium">{key}:</span> {value}
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
              placeholder="Key (e.g., Jenis)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              value={specValue}
              onChange={(e) => setSpecValue(e.target.value)}
              placeholder="Value (e.g., Tembakau Siap Campur)"
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