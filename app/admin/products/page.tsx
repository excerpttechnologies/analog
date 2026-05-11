'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Trash2, 
  Edit, 
  Plus, 
  Search, 
  Filter, 
  X,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Download,
  Upload,
  Image as ImageIcon,
  Tag,
  Package,
  TrendingUp
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const initialProducts = [
  {
    id: 1,
    name: 'SERDES IP',
    category: 'Silicon IP',
    status: 'Active',
    date: '2024-01-10',
    price: '$12,000',
    sales: 156,
    image: 'https://images.unsplash.com/photo-1581092335871-5d4a5d9d6f8c?w=100&h=100&fit=crop',
    description: 'High-speed serial deserializer for data communication interfaces'
  },
  {
    id: 2,
    name: 'PLL Systems',
    category: 'Silicon IP',
    status: 'Active',
    date: '2024-01-08',
    price: '$8,500',
    sales: 98,
    image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=100&h=100&fit=crop',
    description: 'Phase-locked loops for clock generation and synchronization'
  },
  {
    id: 3,
    name: 'AI-Enhanced Converters',
    category: 'Technology',
    status: 'Draft',
    date: '2024-01-05',
    price: '$15,000',
    sales: 45,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop',
    description: 'ML-powered ADC/DAC with intelligent signal acquisition'
  },
  {
    id: 4,
    name: 'Analog IP Portfolio',
    category: 'Silicon IP',
    status: 'Active',
    date: '2024-01-03',
    price: '$10,000',
    sales: 234,
    image: 'https://images.unsplash.com/photo-1581092335871-5d4a5d9d6f8c?w=100&h=100&fit=crop',
    description: 'Precision analog circuits for sensor interfacing'
  },
  {
    id: 5,
    name: 'ML Accelerator IP',
    category: 'Technology',
    status: 'Archived',
    date: '2023-12-28',
    price: '$20,000',
    sales: 67,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop',
    description: 'Hardware-accelerated machine learning inference'
  },
];

const statusConfig = {
  Active: { icon: CheckCircle, color: 'green', bg: 'bg-green-50', text: 'text-green-700' },
  Draft: { icon: Clock, color: 'yellow', bg: 'bg-yellow-50', text: 'text-yellow-700' },
  Archived: { icon: AlertCircle, color: 'gray', bg: 'bg-gray-50', text: 'text-gray-700' },
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  
  const tableRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLTableRowElement | null)[]>([]);
  
  const itemsPerPage = 5;

  const [formData, setFormData] = useState({
    name: '',
    category: 'Silicon IP',
    description: '',
    price: '',
    image: '',
  });

  const categories = ['All', 'Silicon IP', 'Technology', 'Service'];
  const statuses = ['All', 'Active', 'Draft', 'Archived'];

  useEffect(() => {
    // Animate table rows
    rowsRef.current.forEach((row, index) => {
      if (!row) return;
      
      gsap.fromTo(row,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          delay: index * 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, [products, currentPage, searchTerm, selectedCategory, selectedStatus]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id: number) => {
    setProductToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      gsap.to(`#product-row-${productToDelete}`, {
        opacity: 0,
        x: -50,
        duration: 0.3,
        onComplete: () => {
          setProducts((prev) => prev.filter((p) => p.id !== productToDelete));
          setShowDeleteConfirm(false);
          setProductToDelete(null);
        },
      });
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      image: product.image,
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: formData.name,
                category: formData.category,
                description: formData.description,
                price: formData.price,
              }
            : p
        )
      );
    } else {
      const newProduct = {
        id: Math.max(...products.map((p) => p.id), 0) + 1,
        name: formData.name,
        category: formData.category,
        status: 'Active',
        date: new Date().toISOString().split('T')[0],
        price: formData.price || '$0',
        sales: 0,
        image: formData.image || 'https://images.unsplash.com/photo-1581092335871-5d4a5d9d6f8c?w=100&h=100&fit=crop',
        description: formData.description,
      };
      setProducts((prev) => [newProduct, ...prev]);
    }
    
    setFormData({ name: '', category: 'Silicon IP', description: '', price: '', image: '' });
    setEditingProduct(null);
    setShowModal(false);
  };

  const toggleSelectProduct = (id: number) => {
    setSelectedProducts(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === paginatedProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(paginatedProducts.map(p => p.id));
    }
  };

  const handleBulkDelete = () => {
    selectedProducts.forEach(id => {
      gsap.to(`#product-row-${id}`, {
        opacity: 0,
        x: -50,
        duration: 0.3,
      });
    });
    setTimeout(() => {
      setProducts(prev => prev.filter(p => !selectedProducts.includes(p.id)));
      setSelectedProducts([]);
    }, 300);
  };

  const exportData = () => {
    const data = filteredProducts.map(p => ({
      Name: p.name,
      Category: p.category,
      Status: p.status,
      Price: p.price,
      Sales: p.sales,
      Date: p.date,
    }));
    const csv = [Object.keys(data[0]).join(','), ...data.map(row => Object.values(row).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Products
          </h1>
          <p className="text-slate-500 mt-1">Manage your product catalog</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={exportData}
            variant="outline"
            className="border-slate-200"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {statuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        {selectedProducts.length > 0 && (
          <Button
            onClick={handleBulkDelete}
            variant="destructive"
            className="bg-red-500 hover:bg-red-600"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete ({selectedProducts.length})
          </Button>
        )}
      </div>

      {/* Products Table */}
      <Card className="bg-white border-slate-200 shadow-xl overflow-hidden">
        <div ref={tableRef} className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-4 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === paginatedProducts.length && paginatedProducts.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-slate-300"
                  />
                </th>
                <th className="text-left py-4 px-4 font-semibold text-slate-700">Product</th>
                <th className="text-left py-4 px-4 font-semibold text-slate-700">Category</th>
                <th className="text-left py-4 px-4 font-semibold text-slate-700">Status</th>
                <th className="text-left py-4 px-4 font-semibold text-slate-700">Price</th>
                <th className="text-left py-4 px-4 font-semibold text-slate-700">Sales</th>
                <th className="text-left py-4 px-4 font-semibold text-slate-700">Date</th>
                <th className="text-left py-4 px-4 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product, idx) => {
                const StatusIcon = statusConfig[product.status as keyof typeof statusConfig]?.icon || CheckCircle;
                const statusStyle = statusConfig[product.status as keyof typeof statusConfig] || statusConfig.Active;
                
                return (
                  <tr
                    key={product.id}
                    id={`product-row-${product.id}`}
                    ref={(el) => { rowsRef.current[idx] = el; }}
                    className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="py-4 px-4">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => toggleSelectProduct(product.id)}
                        className="rounded border-slate-300"
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center overflow-hidden">
                          {product.image ? (
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <Package className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{product.name}</p>
                          <p className="text-xs text-slate-500 line-clamp-1">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                        <Tag className="w-3 h-3" />
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${statusStyle.bg} ${statusStyle.text} text-xs font-medium`}>
                        <StatusIcon className="w-3 h-3" />
                        {product.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-900">{product.price}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-green-500" />
                        <span className="text-slate-600">{product.sales}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-500">{product.date}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4 text-slate-500" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                          <Eye className="w-4 h-4 text-slate-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200">
            <p className="text-sm text-slate-500">
              Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg transition-colors ${
                    currentPage === page
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
                      : 'hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </Card>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-white w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Confirm Delete</h2>
            </div>
            <p className="text-slate-600 mb-6">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button
                onClick={confirmDelete}
                className="flex-1 bg-red-500 hover:bg-red-600"
              >
                Delete
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-white w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingProduct(null);
                  setFormData({ name: '', category: 'Silicon IP', description: '', price: '', image: '' });
                }}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Product Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter product name"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Silicon IP</option>
                  <option>Technology</option>
                  <option>Service</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Price</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="$0"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter product description"
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500"
                >
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowModal(false);
                    setEditingProduct(null);
                    setFormData({ name: '', category: 'Silicon IP', description: '', price: '', image: '' });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}