import React, { useState } from 'react';
import { Save, Plus, Trash2, Edit2, X, Package, ArrowLeft, Video, Settings, ChevronDown } from 'lucide-react';
import { RokokProductForm } from './RokokProductForm';
import { TembakauProductForm } from './TembakauProductForm';

// Rokok Product Section Component
export function RokokProductSection({ 
  products, 
  editingProduct, 
  showProductForm, 
  onBack, 
  onAdd, 
  onEdit, 
  onDelete, 
  onSave, 
  onCancel,
  onEditPage,
  filterCategories
}: { 
  products: any[]; 
  editingProduct: any; 
  showProductForm: boolean; 
  onBack: () => void; 
  onAdd: () => void; 
  onEdit: (product: any) => void; 
  onDelete: (id: string) => void; 
  onSave: (product: any) => void; 
  onCancel: () => void;
  onEditPage?: () => void;
  filterCategories?: { name: string; label: string; color: string; type?: 'single' | 'dropdown'; children?: { name: string; label: string; color: string }[] }[];
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Rokok Products</h2>
            <p className="text-sm text-gray-600">Kelola produk rokok SKM dan SKT</p>
          </div>
        </div>
        {!showProductForm && (
          <div className="flex items-center gap-3">
            {onEditPage && (
              <button
                onClick={onEditPage}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
              >
                <Settings size={20} />
                Edit Page
              </button>
            )}
            <button
              onClick={onAdd}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
            >
              <Plus size={20} />
              New Product
            </button>
          </div>
        )}
      </div>

      {showProductForm ? (
        <RokokProductForm
          product={editingProduct}
          onSave={onSave}
          onCancel={onCancel}
          filterCategories={filterCategories}
        />
      ) : (
        <>
          {products.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
              <Package size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">Belum Ada Produk</h3>
              <p className="text-gray-500 mb-6">Mulai menambahkan produk rokok pertama Anda</p>
              <button
                onClick={onAdd}
                className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors mx-auto"
              >
                <Plus size={20} />
                Tambah Produk
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => {
                // Prioritize baseImageLeft, fallback to baseImageRight, then baseImage
                const displayImage = product.baseImageLeft || product.baseImageRight || product.baseImage;
                
                return (
                <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow group">
                  {displayImage && (
                    <div className="w-full h-40 bg-gray-100 rounded-lg mb-3 overflow-hidden relative">
                      <img 
                        src={displayImage} 
                        alt={product.productName} 
                        className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0" 
                      />
                      {product.hoverImage && (
                        <img 
                          src={product.hoverImage} 
                          alt={`${product.productName} hover`} 
                          className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                        />
                      )}
                      {/* Video Badge */}
                      {product.videoUrls && product.videoUrls.length > 0 && (
                        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md shadow-lg flex items-center gap-1 text-xs font-semibold">
                          <Video size={14} />
                          {product.videoUrls.length}
                        </div>
                      )}
                    </div>
                  )}
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{product.productName}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                  {product.specifications && Object.entries(product.specifications).length > 0 ? (
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 flex-wrap">
                      {Object.entries(product.specifications).slice(0, 2).map(([key, value]: [string, any]) => (
                        <span key={key} className="px-2 py-1 bg-amber-100 text-amber-700 rounded">
                          {value}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 flex-wrap">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">{product.category === 'mesin' ? 'SKM' : 'SKT'}</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded">{product.market}</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">{product.jenis}</span>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
                    >
                      <Edit2 size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      className="flex items-center gap-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              )})}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Tembakau Section Component (TSC & TSG)
export function TembakauSection({ 
  products, 
  editingProduct, 
  showForm, 
  title, 
  description, 
  type,
  onBack, 
  onAdd, 
  onEdit, 
  onDelete, 
  onSave, 
  onCancel,
  onEditPage,
  filterCategories
}: { 
  products: any[]; 
  editingProduct: any; 
  showForm: boolean; 
  title: string;
  description: string;
  type: 'tsc' | 'tsg';
  onBack: () => void; 
  onAdd: () => void; 
  onEdit: (product: any) => void; 
  onDelete: (id: string) => void; 
  onSave: (product: any) => void; 
  onCancel: () => void;
  onEditPage?: () => void;
  filterCategories?: { name: string; label: string; color: string; type?: 'single' | 'dropdown'; children?: { name: string; label: string; color: string }[] }[];
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{title}</h2>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        {!showForm && (
          <div className="flex items-center gap-3">
            {onEditPage && (
              <button
                onClick={onEditPage}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
              >
                <Settings size={20} />
                Edit Page
              </button>
            )}
            <button
              onClick={onAdd}
              className={`flex items-center gap-2 px-4 py-2 ${type === 'tsc' ? 'bg-green-500 hover:bg-green-600' : 'bg-purple-500 hover:bg-purple-600'} text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg`}
            >
              <Plus size={20} />
              New Product
            </button>
          </div>
        )}
      </div>

      {showForm ? (
        <TembakauProductForm
          product={editingProduct}
          onSave={onSave}
          onCancel={onCancel}
          type={type}
          filterCategories={filterCategories}
        />
      ) : (
        <>
          {products.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
              <Package size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">Belum Ada Produk</h3>
              <p className="text-gray-500 mb-6">Mulai menambahkan produk {type.toUpperCase()} pertama Anda</p>
              <button
                onClick={onAdd}
                className={`flex items-center gap-2 px-6 py-3 ${type === 'tsc' ? 'bg-green-500 hover:bg-green-600' : 'bg-purple-500 hover:bg-purple-600'} text-white rounded-lg font-semibold transition-colors mx-auto`}
              >
                <Plus size={20} />
                Tambah Produk
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product, index) => (
                <div key={product.id || `${type}-product-${index}-${product.productName || index}`} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow group">
                  {product.baseImage && (
                    <div className="w-full h-40 bg-gray-100 rounded-lg mb-3 overflow-hidden relative">
                      <img 
                        src={product.baseImage} 
                        alt={product.productName} 
                        className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0" 
                      />
                      {product.hoverImage && (
                        <img 
                          src={product.hoverImage} 
                          alt={`${product.productName} hover`} 
                          className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                        />
                      )}
                      {/* Video Badge */}
                      {product.videoUrls && product.videoUrls.length > 0 && (
                        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md shadow-lg flex items-center gap-1 text-xs font-semibold">
                          <Video size={14} />
                          {product.videoUrls.length}
                        </div>
                      )}
                    </div>
                  )}
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{product.productName}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                  {product.specifications && Object.entries(product.specifications).length > 0 ? (
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 flex-wrap">
                      {Object.entries(product.specifications).slice(0, 2).map(([key, value]: [string, any]) => (
                        <span key={key} className="px-2 py-1 bg-amber-100 text-amber-700 rounded">
                          {value}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 flex-wrap">
                      <span className={`px-2 py-1 ${type === 'tsc' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'} rounded`}>{product.jenis}</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">{product.kualitas}</span>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
                    >
                      <Edit2 size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
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
  );
}

// Custom Product Page Section Component
export function CustomProductPageSection({
  page,
  onBack,
  onUpdate,
  onEditPage
}: {
  page: any;
  onBack: () => void;
  onUpdate: (updatedPage: any) => void;
  onEditPage?: () => void;
}) {
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showProductForm, setShowProductForm] = useState(false);

  const handleSaveProduct = (product: any) => {
    const updatedProducts = editingProduct
      ? page.products.map((p: any) => p.id === product.id ? product : p)
      : [...page.products, { ...product, id: Date.now().toString() }];
    
    onUpdate({ ...page, products: updatedProducts });
    setShowProductForm(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      const updatedProducts = page.products.filter((p: any) => p.id !== productId);
      onUpdate({ ...page, products: updatedProducts });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{page.title}</h2>
            <p className="text-sm text-gray-600">{page.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {onEditPage && (
            <button
              onClick={onEditPage}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
            >
              <Settings size={20} />
              Edit Page
            </button>
          )}
          {!showProductForm && (
            <button
              onClick={() => {
                setEditingProduct(null);
                setShowProductForm(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
            >
              <Plus size={20} />
              New Product
            </button>
          )}
        </div>
      </div>

      {showProductForm ? (
        <CustomProductForm
          product={editingProduct}
          page={page}
          onSave={handleSaveProduct}
          onCancel={() => {
            setShowProductForm(false);
            setEditingProduct(null);
          }}
        />
      ) : (
        <>
          {page.products.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
              <Package size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">Belum Ada Produk</h3>
              <p className="text-gray-500 mb-6">Mulai menambahkan produk pertama untuk {page.title}</p>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setShowProductForm(true);
                }}
                className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors mx-auto"
              >
                <Plus size={20} />
                Tambah Produk
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {page.products.map((product: any) => (
                <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow group">
                  {product.baseImage && (
                    <div className="w-full h-40 bg-gray-100 rounded-lg mb-3 overflow-hidden relative">
                      <img 
                        src={product.baseImage} 
                        alt={product.productName} 
                        className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0" 
                      />
                      {product.hoverImage && (
                        <img 
                          src={product.hoverImage} 
                          alt={`${product.productName} hover`} 
                          className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                        />
                      )}
                      {/* Video Badge */}
                      {product.videoUrls && product.videoUrls.length > 0 && (
                        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md shadow-lg flex items-center gap-1 text-xs font-semibold">
                          <Video size={14} />
                          {product.videoUrls.length}
                        </div>
                      )}
                    </div>
                  )}
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{product.productName}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                  {product.specifications && (
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 flex-wrap">
                      {Object.entries(product.specifications).slice(0, 2).map(([key, value]: [string, any]) => (
                        <span key={key} className="px-2 py-1 bg-amber-100 text-amber-700 rounded">
                          {value}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingProduct(product);
                        setShowProductForm(true);
                      }}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
                    >
                      <Edit2 size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
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
  );
}

// Custom Product Form Component
function CustomProductForm({
  product,
  page,
  onSave,
  onCancel
}: {
  product: any | null;
  page: any;
  onSave: (product: any) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState(
    product || {
      id: '',
      name: '',
      productName: '',
      description: '',
      baseImage: '',
      hoverImage: '',
      specifications: {},
      videoUrls: [],
      category: ''
    }
  );

  const [specKey, setSpecKey] = useState('');
  const [specValue, setSpecValue] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [expandedDropdowns, setExpandedDropdowns] = useState<{ [key: string]: boolean }>({});

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
          ...formData.specifications,
          [specKey]: specValue
        }
      });
      setSpecKey('');
      setSpecValue('');
    }
  };

  const removeSpecification = (key: string) => {
    const { [key]: removed, ...rest } = formData.specifications;
    setFormData({ ...formData, specifications: rest });
  };

  const addVideo = () => {
    if (videoUrl) {
      setFormData({
        ...formData,
        videoUrls: [...formData.videoUrls, videoUrl]
      });
      setVideoUrl('');
    }
  };

  const removeVideo = (index: number) => {
    setFormData({
      ...formData,
      videoUrls: formData.videoUrls.filter((_: any, i: number) => i !== index)
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        {product ? 'Edit Product' : 'Add New Product'}
      </h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Product identifier"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              value={formData.productName}
              onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
              placeholder="Display name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Product description..."
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        {/* Category Selection - Only show if page has filters */}
        {page.hasFilters && page.filterCategories && page.filterCategories.length > 0 && (
          <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Filter Category <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-600 mb-3">Select which filter button will show this product</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, category: '' })}
                className={`px-4 py-3 rounded-lg border-2 transition-all font-semibold text-sm ${
                  formData.category === ''
                    ? 'border-amber-500 bg-amber-100 text-amber-900'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full border-2 ${formData.category === '' ? 'bg-amber-500 border-amber-600' : 'border-gray-400'}`}></div>
                  <span>All Products (No Filter)</span>
                </div>
              </button>
              {page.filterCategories.map((cat: any) => {
                // Single Filter
                if (!cat.type || cat.type === 'single') {
                  return (
                    <button
                      key={cat.name}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat.name })}
                      className={`px-4 py-3 rounded-lg border-2 transition-all font-semibold text-sm ${
                        formData.category === cat.name
                          ? 'bg-opacity-20'
                          : 'border-gray-300 bg-white hover:border-gray-400'
                      }`}
                      style={{
                        borderColor: formData.category === cat.name ? cat.color : undefined,
                        backgroundColor: formData.category === cat.name ? `${cat.color}20` : undefined,
                        color: formData.category === cat.name ? cat.color : undefined
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div 
                          className={`w-4 h-4 rounded-full border-2`}
                          style={{
                            backgroundColor: formData.category === cat.name ? cat.color : 'transparent',
                            borderColor: formData.category === cat.name ? cat.color : '#9ca3af'
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
                        className="w-full bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-300 rounded-lg px-4 py-2 mb-2 hover:from-gray-100 hover:to-gray-200 transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full border-2"
                            style={{ backgroundColor: cat.color, borderColor: cat.color }}
                          ></div>
                          <span className="text-sm font-bold text-gray-700">{cat.label}</span>
                          <ChevronDown 
                            size={16} 
                            className={`ml-auto text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                          />
                        </div>
                      </button>
                      {isExpanded && (
                        <div className="grid grid-cols-2 gap-3 pl-4 mb-2">
                          {cat.children?.map((child: any) => (
                            <button
                              key={child.name}
                              type="button"
                              onClick={() => setFormData({ ...formData, category: child.name })}
                              className={`px-4 py-3 rounded-lg border-2 transition-all font-semibold text-sm ${
                                formData.category === child.name
                                  ? 'bg-opacity-20'
                                  : 'border-gray-300 bg-white hover:border-gray-400'
                              }`}
                              style={{
                                borderColor: formData.category === child.name ? child.color : undefined,
                                backgroundColor: formData.category === child.name ? `${child.color}20` : undefined,
                                color: formData.category === child.name ? child.color : undefined
                              }}
                            >
                              <div className="flex items-center gap-2">
                                <div 
                                  className={`w-4 h-4 rounded-full border-2`}
                                  style={{
                                    backgroundColor: formData.category === child.name ? child.color : 'transparent',
                                    borderColor: formData.category === child.name ? child.color : '#9ca3af'
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
          </div>
        )}

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
            <label className="block text-sm font-semibold text-gray-700 mb-2">Hover Image URL (Optional)</label>
            <input
              type="text"
              value={formData.hoverImage}
              onChange={(e) => setFormData({ ...formData, hoverImage: e.target.value })}
              placeholder="https://..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Specifications */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Specifications</h4>
          
          {Object.entries(formData.specifications).length > 0 && (
            <div className="mb-3 space-y-2">
              {Object.entries(formData.specifications).map(([key, value]: [string, any]) => (
                <div key={key} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                  <span className="text-sm">
                    <span className="font-medium capitalize">{key}:</span> {value}
                  </span>
                  <button
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
              onClick={addSpecification}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Video URLs */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Video URLs (YouTube)</h4>
          
          {formData.videoUrls.length > 0 && (
            <div className="mb-3 space-y-2">
              {formData.videoUrls.map((url: string, index: number) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                  <div className="flex items-center gap-2">
                    <Video size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-700 truncate max-w-md">{url}</span>
                  </div>
                  <button
                    onClick={() => removeVideo(index)}
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
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500"
            />
            <button
              onClick={addVideo}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
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