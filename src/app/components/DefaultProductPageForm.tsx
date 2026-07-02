import React, { useState, useEffect } from 'react';
import { Save, X, Plus, Trash2, LayoutGrid, Package, Edit3, ChevronDown } from 'lucide-react';

interface FilterCategory {
  name: string;
  label: string;
  color: string;
  type?: 'single' | 'dropdown';
  children?: { name: string; label: string; color: string }[];
}

interface DefaultProductPageData {
  title: string;
  description: string;
  status: 'published' | 'draft';
  pageViews: number;
  hasFilters?: boolean;
  filterCategories?: FilterCategory[];
}

interface DefaultProductPageFormProps {
  type: 'rokok' | 'tsc' | 'tsg';
  data: DefaultProductPageData;
  onSave: (data: DefaultProductPageData) => void;
  onCancel: () => void;
  onClose?: () => void; // Optional callback for final close
}

export function DefaultProductPageForm({ type, data, onSave, onCancel, onClose }: DefaultProductPageFormProps) {
  const [formData, setFormData] = useState<DefaultProductPageData>(data);
  const [autoDetectedFilters, setAutoDetectedFilters] = useState(false);

  // Check if filters were auto-detected
  useEffect(() => {
    if (formData.hasFilters && formData.filterCategories && formData.filterCategories.length > 0) {
      // Check if any filter has default colors (indicating auto-detection)
      const hasDefaultColors = formData.filterCategories.some(f => 
        ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#ef4444'].includes(f.color)
      );
      setAutoDetectedFilters(hasDefaultColors);
    }
  }, [formData.hasFilters, formData.filterCategories]);

  // Realtime update - save changes immediately
  useEffect(() => {
    onSave(formData);
    
    // Dispatch custom event for App.tsx to listen
    window.dispatchEvent(new CustomEvent('defaultPagesUpdated'));
  }, [formData]);

  const handleSubmit = () => {
    if (!formData.title) {
      alert('Title is required');
      return;
    }
    onCancel(); // Just close the form since data is already saved
    if (onClose) onClose(); // Call the optional close callback
  };

  const getDefaultTitle = () => {
    if (type === 'rokok') return 'Rokok Products';
    if (type === 'tsc') return 'Tembakau TSC (Tembakau Siap Campur)';
    return 'Tembakau TSG (Tembakau Siap Giling)';
  };

  const getDefaultDescription = () => {
    if (type === 'rokok') return 'Kelola produk rokok SKM dan SKT';
    if (type === 'tsc') return 'Kelola produk Tembakau Siap Campur';
    return 'Kelola produk Tembakau Siap Giling';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Edit {getDefaultTitle()}</h3>
          <p className="text-sm text-gray-600 mt-1">Customize page title, description, and visibility</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Page Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder={getDefaultTitle()}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">Display name in navigation</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder={getDefaultDescription()}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        {/* Enable Filters Option */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.hasFilters || false}
              onChange={(e) => setFormData({ ...formData, hasFilters: e.target.checked, filterCategories: e.target.checked ? (formData.filterCategories || []) : [] })}
              className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-2 focus:ring-orange-500"
            />
            <div>
              <span className="block text-sm font-semibold text-gray-700">Enable Product Filters</span>
              <span className="block text-xs text-gray-500">Add filtering options to categorize products (e.g., SKM, SKT)</span>
            </div>
          </label>
        </div>

        {/* Filter Categories Section - Only show when hasFilters is enabled */}
        {formData.hasFilters && (
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-bold text-gray-900 text-lg">Filter Categories</h4>
                <p className="text-sm text-gray-600 mt-1">Define filter buttons for this product page</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newCategory = {
                    name: 'category-' + Date.now(),
                    label: '',
                    color: '#f97316'
                  };
                  setFormData({
                    ...formData,
                    filterCategories: [...(formData.filterCategories || []), newCategory]
                  });
                }}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors shadow-md"
              >
                <Plus size={18} />
                Add Filter
              </button>
            </div>

            <div className="space-y-3">
              {formData.filterCategories && formData.filterCategories.length > 0 ? (
                formData.filterCategories.map((category, index) => (
                  <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-5 space-y-4">
                    {/* Main Filter Row */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 border-2 border-orange-300 flex-shrink-0">
                        <Edit3 size={16} className="text-orange-600" />
                      </div>
                      
                      {/* Filter Type Selector */}
                      <div className="w-32">
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Filter Type
                        </label>
                        <select
                          value={category.type || 'single'}
                          onChange={(e) => {
                            const updated = [...(formData.filterCategories || [])];
                            updated[index] = { 
                              ...updated[index], 
                              type: e.target.value as 'single' | 'dropdown',
                              children: e.target.value === 'dropdown' ? (updated[index].children || []) : undefined
                            };
                            setFormData({ ...formData, filterCategories: updated });
                          }}
                          className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm bg-white"
                        >
                          <option value="single">Single</option>
                          <option value="dropdown">Dropdown</option>
                        </select>
                      </div>

                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Filter Name (ID) <span className="text-orange-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={category.name}
                            onChange={(e) => {
                              const updated = [...(formData.filterCategories || [])];
                              updated[index] = { ...updated[index], name: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') };
                              setFormData({ ...formData, filterCategories: updated });
                            }}
                            placeholder="e.g., skm"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm hover:border-orange-300 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Display Label <span className="text-orange-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={category.label}
                            onChange={(e) => {
                              const updated = [...(formData.filterCategories || [])];
                              updated[index] = { ...updated[index], label: e.target.value };
                              setFormData({ ...formData, filterCategories: updated });
                            }}
                            placeholder="e.g., SKM"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm hover:border-orange-300 transition-colors"
                          />
                        </div>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => {
                          const filterLabel = category.label || category.name || 'this filter';
                          if (window.confirm(`Are you sure you want to delete "${filterLabel}"?\n\nThis action cannot be undone. Products using this filter will lose their category assignment.`)) {
                            const updated = formData.filterCategories?.filter((_, i) => i !== index);
                            setFormData({ ...formData, filterCategories: updated });
                          }
                        }}
                        className="p-3 bg-red-100 hover:bg-red-600 text-red-600 hover:text-white rounded-lg transition-all flex-shrink-0 group/delete"
                        title="Delete this filter"
                      >
                        <Trash2 size={18} className="group-hover/delete:scale-110 transition-transform" />
                      </button>
                    </div>

                    {/* Dropdown Children Section */}
                    {category.type === 'dropdown' && (
                      <div className="ml-14 pl-6 border-l-4 border-orange-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-semibold text-gray-800 text-sm">Dropdown Options</h5>
                            <p className="text-xs text-gray-600">Add sub-filters for this dropdown menu</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...(formData.filterCategories || [])];
                              const newChild = {
                                name: 'option-' + Date.now(),
                                label: '',
                                color: category.color
                              };
                              updated[index] = {
                                ...updated[index],
                                children: [...(updated[index].children || []), newChild]
                              };
                              setFormData({ ...formData, filterCategories: updated });
                            }}
                            className="flex items-center gap-1 px-3 py-1.5 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-lg text-xs font-semibold transition-colors"
                          >
                            <Plus size={14} />
                            Add Option
                          </button>
                        </div>

                        {category.children && category.children.length > 0 ? (
                          category.children.map((child, childIndex) => (
                            <div key={childIndex} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                              <div className="flex-1 grid grid-cols-2 gap-2">
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">Name (ID)</label>
                                  <input
                                    type="text"
                                    value={child.name}
                                    onChange={(e) => {
                                      const updated = [...(formData.filterCategories || [])];
                                      const updatedChildren = [...(updated[index].children || [])];
                                      updatedChildren[childIndex] = { 
                                        ...updatedChildren[childIndex], 
                                        name: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') 
                                      };
                                      updated[index] = { ...updated[index], children: updatedChildren };
                                      setFormData({ ...formData, filterCategories: updated });
                                    }}
                                    placeholder="e.g., domestik"
                                    className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">Label</label>
                                  <input
                                    type="text"
                                    value={child.label}
                                    onChange={(e) => {
                                      const updated = [...(formData.filterCategories || [])];
                                      const updatedChildren = [...(updated[index].children || [])];
                                      updatedChildren[childIndex] = { ...updatedChildren[childIndex], label: e.target.value };
                                      updated[index] = { ...updated[index], children: updatedChildren };
                                      setFormData({ ...formData, filterCategories: updated });
                                    }}
                                    placeholder="e.g., Domestik"
                                    className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                  />
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...(formData.filterCategories || [])];
                                  const updatedChildren = updated[index].children?.filter((_, i) => i !== childIndex);
                                  updated[index] = { ...updated[index], children: updatedChildren };
                                  setFormData({ ...formData, filterCategories: updated });
                                }}
                                className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded transition-colors"
                                title="Remove option"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                            <p className="text-xs text-gray-500">No dropdown options yet. Click "Add Option" to create.</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <p className="text-gray-600 font-medium">No filters yet</p>
                  <p className="text-sm text-gray-500 mt-1">Click "Add Filter" to create filter categories</p>
                </div>
              )}
            </div>

            {/* Live Preview Section */}
            {formData.filterCategories && formData.filterCategories.length > 0 && (
              <div className="mt-6 pt-6 border-t-2 border-gray-200">
                <div className="mb-4">
                  <h5 className="font-bold text-gray-900 mb-1">Live Preview</h5>
                  <p className="text-xs text-gray-600">This is how filter buttons will appear on your product page</p>
                </div>
                
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 border-2 border-gray-200">
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {/* "SEMUA PRODUK" button */}
                    <button 
                      type="button"
                      className="group relative px-8 py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden bg-gradient-to-r from-amber-600 to-amber-700 text-white scale-105"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 opacity-100"></div>
                      
                      <div className="absolute inset-0 rounded-xl border-2 border-amber-500"></div>
                      
                      <div className="relative z-10 flex items-center gap-2">
                        <LayoutGrid size={16} className="text-amber-100" />
                        <span className="font-semibold tracking-wide text-sm whitespace-nowrap">SEMUA PRODUK</span>
                      </div>
                      
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%]"></div>
                    </button>
                    
                    {/* Custom filter buttons */}
                    {formData.filterCategories.map((filterCat, idx) => {
                      return (
                        <button 
                          key={idx}
                          type="button"
                          className="group relative px-8 py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:scale-105"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 opacity-100"></div>
                          
                          <div className="absolute inset-0 rounded-xl border-2 border-amber-500"></div>
                          
                          <div className="relative z-10 flex items-center gap-2">
                            <LayoutGrid size={16} className="text-amber-100" />
                            <span className="font-semibold tracking-wide text-sm whitespace-nowrap uppercase">
                              {filterCat.label || 'Label'}
                            </span>
                          </div>
                          
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%]"></div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs text-amber-800">
                <strong>Tip:</strong> Filter Name will be used to match products. When adding/editing products, you'll select which filter category they belong to.
              </p>
            </div>
          </div>
        )}

        {/* Page Views Display */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-blue-900 mb-1">Page Statistics</h4>
              <p className="text-sm text-blue-700">Total visits to this product page</p>
            </div>
            <div className="text-3xl font-bold text-blue-600">{formData.pageViews}</div>
          </div>
        </div>

        {/* Publish/Draft Status */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-gray-900 text-lg mb-1">Page Status</h4>
              <p className="text-sm text-gray-600">Control page visibility on your website</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, status: 'draft' })}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  formData.status === 'draft'
                    ? 'bg-gray-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Draft
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, status: 'published' })}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  formData.status === 'published'
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Published
              </button>
            </div>
          </div>
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-800">
              {formData.status === 'published' 
                ? 'This page will be visible on your website and appear in navigation.'
                : 'This page is hidden from your website. Only you can see it in CMS.'}
            </p>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
          >
            <Save size={18} />
            Update Page
          </button>
          <button
            onClick={onCancel}
            className="flex items-center gap-2 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
          >
            <X size={18} />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}