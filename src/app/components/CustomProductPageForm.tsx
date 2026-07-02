import React, { useState, useEffect } from 'react';
import { Save, X, Image as ImageIcon, Plus, Trash2, Edit3, LayoutGrid, Package, ChevronDown } from 'lucide-react';

interface FilterCategory {
  name: string;
  label: string;
  color: string;
  type?: 'single' | 'dropdown';
  children?: { name: string; label: string; color: string }[];
}

interface CustomProductPage {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  hasFilters: boolean;
  filterCategories?: FilterCategory[];
  products: CustomProduct[];
  status: 'published' | 'draft';
  pageViews: number;
}

interface CustomProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  specifications: { [key: string]: string };
}

interface CustomProductPageFormProps {
  page: CustomProductPage | null;
  onSave: (page: CustomProductPage) => void;
  onCancel: () => void;
  onClose?: () => void; // Optional callback for final close
}

export function CustomProductPageForm({ page, onSave, onCancel, onClose }: CustomProductPageFormProps) {
  const [formData, setFormData] = useState<Omit<CustomProductPage, 'id' | 'products'>>(({
    slug: page?.slug || '',
    title: page?.title || '',
    description: page?.description || '',
    icon: page?.icon || 'package',
    color: page?.color || '#f97316',
    hasFilters: page?.hasFilters || false,
    filterCategories: page?.filterCategories || [],
    status: page?.status || 'draft',
    pageViews: page?.pageViews || 0,
  }));

  // Realtime update - save changes immediately
  useEffect(() => {
    if (page) {
      // Only update if editing existing page
      onSave({
        ...formData,
        id: page.id,
        products: page.products,
      });
    }
  }, [formData]);

  const handleSubmit = () => {
    if (!formData.slug || !formData.title) {
      alert('Please fill in all required fields');
      return;
    }

    // Create slug if not exists
    const slug = formData.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    onSave({
      ...formData,
      slug,
      id: page?.id || '',
      products: page?.products || [],
    });
    
    if (onClose) {
      onClose(); // Call onClose if provided (for editing existing pages)
    } else {
      onCancel(); // Otherwise just close form (for creating new pages)
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">{page ? 'Edit Product Page' : 'New Product Page'}</h3>
          <p className="text-sm text-gray-600 mt-1">{page ? 'Customize page settings, filters, and visibility' : 'Create a new product category page with optional filters'}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Page Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Premium Cigars"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Display name in navigation</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              URL Slug <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
              placeholder="e.g., premium-cigars"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">URL path (lowercase, no spaces)</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Brief description of this product category"
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Theme Color</label>
            <input
              type="color"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              className="w-full h-12 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Brand color for this category</p>
          </div>

          <div className="flex items-center">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.hasFilters}
                onChange={(e) => setFormData({ ...formData, hasFilters: e.target.checked })}
                className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-2 focus:ring-orange-500"
              />
              <div>
                <span className="block text-sm font-semibold text-gray-700">Enable Filters</span>
                <span className="block text-xs text-gray-500">Add filtering options like Rokok page</span>
              </div>
            </label>
          </div>
        </div>

        {/* Filter Categories Section - Only show when hasFilters is enabled */}
        {formData.hasFilters && (
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-bold text-gray-900 text-lg">Filter Categories</h4>
                <p className="text-sm text-gray-600 mt-1">Define filter buttons for this product page (e.g., SKM, SKT)</p>
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

                      <div className="flex-1 grid grid-cols-3 gap-3">
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
                            placeholder="e.g., premium"
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
                            placeholder="e.g., Premium"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm hover:border-orange-300 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Color <span className="text-orange-500">*</span>
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={category.color}
                              onChange={(e) => {
                                const updated = [...(formData.filterCategories || [])];
                                updated[index] = { ...updated[index], color: e.target.value };
                                setFormData({ ...formData, filterCategories: updated });
                              }}
                              className="w-16 h-10 px-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent cursor-pointer"
                            />
                            <div 
                              className="flex-1 h-10 rounded-lg border-2 border-gray-300"
                              style={{ backgroundColor: category.color }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => {
                          const filterLabel = category.label || category.name || 'this filter';
                          if (window.confirm(`Are you sure you want to delete "${filterLabel}"?\\n\\nThis action cannot be undone.`)) {
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
                              <div className="flex-1 grid grid-cols-3 gap-2">
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
                                    placeholder="e.g., option-1"
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
                                    placeholder="e.g., Option 1"
                                    className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">Color</label>
                                  <div className="flex items-center gap-1">
                                    <input
                                      type="color"
                                      value={child.color}
                                      onChange={(e) => {
                                        const updated = [...(formData.filterCategories || [])];
                                        const updatedChildren = [...(updated[index].children || [])];
                                        updatedChildren[childIndex] = { ...updatedChildren[childIndex], color: e.target.value };
                                        updated[index] = { ...updated[index], children: updatedChildren };
                                        setFormData({ ...formData, filterCategories: updated });
                                      }}
                                      className="w-12 h-8 px-1 border border-gray-300 rounded cursor-pointer"
                                    />
                                    <div 
                                      className="flex-1 h-8 rounded border border-gray-300"
                                      style={{ backgroundColor: child.color }}
                                    ></div>
                                  </div>
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

            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs text-amber-800">
                <strong>Tip:</strong> Filter Name will be used to match products. When adding products, you'll select which filter category they belong to.
              </p>
            </div>
          </div>
        )}

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
            <ImageIcon size={18} />
            Next Steps
          </h4>
          <p className="text-sm text-amber-800">
            After creating this page, you'll be able to add products to it from the product management section. 
            The page will automatically appear in your website navigation.
          </p>
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
            {page ? 'Update Page' : 'Create Page'}
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