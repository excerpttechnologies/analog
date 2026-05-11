'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  Search, 
  Filter,
  X,
  Calendar,
  User,
  Tag,
  Clock,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Copy,
  Share2,
  MoreVertical,
  Image as ImageIcon,
  Save,
  Send
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const initialBlogs = [
  {
    id: 1,
    title: 'The Future of Analog Design with AI Enhancement',
    author: 'Dr. Sarah Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop',
    status: 'Published',
    views: 2458,
    likes: 342,
    comments: 28,
    date: '2024-01-15',
    category: 'Technology',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&h=150&fit=crop',
    excerpt: 'Exploring how machine learning is revolutionizing analog circuit design and optimization...'
  },
  {
    id: 2,
    title: 'SERDES Technology Evolution: From 56G to 112G',
    author: 'John Rodriguez',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop',
    status: 'Published',
    views: 1847,
    likes: 234,
    comments: 15,
    date: '2024-01-10',
    category: 'Silicon IP',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1581092335871-5d4a5d9d6f8c?w=200&h=150&fit=crop',
    excerpt: 'A comprehensive look at the evolution of serial deserializer technology...'
  },
  {
    id: 3,
    title: 'Signal Integrity Best Practices in High-Speed Systems',
    author: 'Emily Watson',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop',
    status: 'Draft',
    views: 0,
    likes: 0,
    comments: 0,
    date: '2024-01-05',
    category: 'Engineering',
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=200&h=150&fit=crop',
    excerpt: 'Best practices for maintaining signal integrity in next-generation applications...'
  },
  {
    id: 4,
    title: 'PLL Design Best Practices for Low Jitter Applications',
    author: 'Michael Park',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop',
    status: 'Published',
    views: 1256,
    likes: 189,
    comments: 12,
    date: '2023-12-28',
    category: 'Design Guide',
    readTime: '12 min',
    image: 'https://images.unsplash.com/photo-1581092335871-5d4a5d9d6f8c?w=200&h=150&fit=crop',
    excerpt: 'Deep dive into phase-locked loop design principles for achieving sub-picosecond jitter...'
  },
  {
    id: 5,
    title: 'Power Efficiency Trends in Modern Semiconductors',
    author: 'Lisa Thompson',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop',
    status: 'Draft',
    views: 0,
    likes: 0,
    comments: 0,
    date: '2023-12-20',
    category: 'Industry Analysis',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1581092335871-5d4a5d9d6f8c?w=200&h=150&fit=crop',
    excerpt: 'How semiconductor manufacturers are achieving unprecedented power efficiency...'
  },
];

const categories = ['All', 'Technology', 'Silicon IP', 'Engineering', 'Design Guide', 'Industry Analysis'];
const statuses = ['All', 'Published', 'Draft', 'Archived'];

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBlogs, setSelectedBlogs] = useState<number[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: 'Technology',
    excerpt: '',
    content: '',
    readTime: '',
  });

  const tableRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLTableRowElement | null)[]>([]);
  const itemsPerPage = 5;

  useEffect(() => {
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
  }, [blogs, currentPage, searchTerm, selectedCategory, selectedStatus]);

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          blog.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || blog.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id: number) => {
    setBlogToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (blogToDelete) {
      gsap.to(`#blog-row-${blogToDelete}`, {
        opacity: 0,
        x: -50,
        duration: 0.3,
        onComplete: () => {
          setBlogs(prev => prev.filter(b => b.id !== blogToDelete));
          setShowDeleteConfirm(false);
          setBlogToDelete(null);
        },
      });
    }
  };

  const handleEdit = (blog: any) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      author: blog.author,
      category: blog.category,
      excerpt: blog.excerpt,
      content: blog.content || '',
      readTime: blog.readTime,
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingBlog) {
      setBlogs(prev =>
        prev.map(b =>
          b.id === editingBlog.id
            ? {
                ...b,
                title: formData.title,
                author: formData.author,
                category: formData.category,
                excerpt: formData.excerpt,
                readTime: formData.readTime,
              }
            : b
        )
      );
    } else {
      const newBlog = {
        id: Math.max(...blogs.map(b => b.id), 0) + 1,
        title: formData.title,
        author: formData.author,
        authorAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.author)}&background=0ea5e9&color=fff`,
        status: 'Draft',
        views: 0,
        likes: 0,
        comments: 0,
        date: new Date().toISOString().split('T')[0],
        category: formData.category,
        readTime: formData.readTime || '5 min',
        image: 'https://images.unsplash.com/photo-1581092335871-5d4a5d9d6f8c?w=200&h=150&fit=crop',
        excerpt: formData.excerpt,
      };
      setBlogs(prev => [newBlog, ...prev]);
    }
    
    setFormData({ title: '', author: '', category: 'Technology', excerpt: '', content: '', readTime: '' });
    setEditingBlog(null);
    setShowModal(false);
  };

  const toggleSelectBlog = (id: number) => {
    setSelectedBlogs(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedBlogs.length === paginatedBlogs.length) {
      setSelectedBlogs([]);
    } else {
      setSelectedBlogs(paginatedBlogs.map(b => b.id));
    }
  };

  const handleBulkDelete = () => {
    selectedBlogs.forEach(id => {
      gsap.to(`#blog-row-${id}`, {
        opacity: 0,
        x: -50,
        duration: 0.3,
      });
    });
    setTimeout(() => {
      setBlogs(prev => prev.filter(b => !selectedBlogs.includes(b.id)));
      setSelectedBlogs([]);
    }, 300);
  };

  const handlePublish = (id: number) => {
    setBlogs(prev =>
      prev.map(b =>
        b.id === id ? { ...b, status: 'Published' } : b
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Draft':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Blog Posts
          </h1>
          <p className="text-slate-500 mt-1">Manage your blog content and articles</p>
        </div>
        <Button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Article
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Articles', value: blogs.length, icon: FileText, color: 'blue' },
          { label: 'Published', value: blogs.filter(b => b.status === 'Published').length, icon: CheckCircle, color: 'green' },
          { label: 'Total Views', value: blogs.reduce((sum, b) => sum + b.views, 0).toLocaleString(), icon: Eye, color: 'purple' },
          { label: 'Avg. Read Time', value: '8 min', icon: Clock, color: 'orange' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className="bg-white border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-10 h-10 rounded-xl bg-${stat.color}-100 flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 text-${stat.color}-600`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles..."
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
        {selectedBlogs.length > 0 && (
          <Button
            onClick={handleBulkDelete}
            variant="destructive"
            className="bg-red-500 hover:bg-red-600"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete ({selectedBlogs.length})
          </Button>
        )}
      </div>

      {/* Blog Table */}
      <Card className="bg-white border-slate-200 shadow-xl overflow-hidden">
        <div ref={tableRef} className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-4 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedBlogs.length === paginatedBlogs.length && paginatedBlogs.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-slate-300"
                  />
                </th>
                <th className="text-left py-4 px-4 font-semibold text-slate-700">Article</th>
                <th className="text-left py-4 px-4 font-semibold text-slate-700">Author</th>
                <th className="text-left py-4 px-4 font-semibold text-slate-700">Category</th>
                <th className="text-left py-4 px-4 font-semibold text-slate-700">Status</th>
                <th className="text-left py-4 px-4 font-semibold text-slate-700">Views</th>
                <th className="text-left py-4 px-4 font-semibold text-slate-700">Date</th>
                <th className="text-left py-4 px-4 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBlogs.map((blog, idx) => (
                <tr
                  key={blog.id}
                  id={`blog-row-${blog.id}`}
                  ref={(el) => { rowsRef.current[idx] = el; }}
                  className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="py-4 px-4">
                    <input
                      type="checkbox"
                      checked={selectedBlogs.includes(blog.id)}
                      onChange={() => toggleSelectBlog(blog.id)}
                      className="rounded border-slate-300"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {blog.image ? (
                          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 line-clamp-1">{blog.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span className="text-xs text-slate-500">{blog.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <img src={blog.authorAvatar} alt={blog.author} className="w-6 h-6 rounded-full" />
                      <span className="text-slate-600">{blog.author}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                      <Tag className="w-3 h-3" />
                      {blog.category}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full border ${getStatusColor(blog.status)} text-xs font-medium`}>
                      {blog.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1 text-slate-600">
                      <Eye className="w-4 h-4" />
                      {blog.views.toLocaleString()}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-500">{blog.date}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-slate-500" />
                      </button>
                      {blog.status === 'Draft' && (
                        <button
                          onClick={() => handlePublish(blog.id)}
                          className="p-2 hover:bg-green-50 rounded-lg transition-colors"
                          title="Publish"
                        >
                          <Send className="w-4 h-4 text-green-500" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200">
            <p className="text-sm text-slate-500">
              Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredBlogs.length)} of {filteredBlogs.length}
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
              Are you sure you want to delete this article? This action cannot be undone.
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
          <Card className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                {editingBlog ? 'Edit Article' : 'Create New Article'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingBlog(null);
                  setFormData({ title: '', author: '', category: 'Technology', excerpt: '', content: '', readTime: '' });
                }}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter article title"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Author *</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Author name"
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    <option>Technology</option>
                    <option>Silicon IP</option>
                    <option>Engineering</option>
                    <option>Design Guide</option>
                    <option>Industry Analysis</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Read Time</label>
                <input
                  type="text"
                  value={formData.readTime}
                  onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                  placeholder="e.g., 5 min"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Excerpt *</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief description of the article..."
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingBlog ? 'Update Article' : 'Save as Draft'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowModal(false);
                    setEditingBlog(null);
                    setFormData({ title: '', author: '', category: 'Technology', excerpt: '', content: '', readTime: '' });
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

// Import missing icon
import { FileText } from 'lucide-react';