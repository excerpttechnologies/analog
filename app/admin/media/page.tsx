'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Upload, 
  Trash2, 
  Copy, 
  Image as ImageIcon, 
  FileText, 
  File,
  X,
  Search,
  Filter,
  Grid3x3,
  List,
  Download,
  Eye,
  FolderOpen,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  ZoomIn,
  Calendar,
  HardDrive,
  LayoutGrid,
  ListOrdered,
  FolderPlus,
  RefreshCw,
  MoreVertical
} from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const initialMedia = [
  {
    id: 1,
    name: 'serdes-diagram.png',
    size: '2.4 MB',
    type: 'image',
    format: 'PNG',
    dimensions: '1920x1080',
    date: '2024-01-10',
    url: '/media/serdes-diagram.png',
    thumbnail: 'https://images.unsplash.com/photo-1581092335871-5d4a5d9d6f8c?w=400&h=300&fit=crop',
    category: 'diagrams'
  },
  {
    id: 2,
    name: 'analog-circuit.pdf',
    size: '5.1 MB',
    type: 'pdf',
    format: 'PDF',
    pages: 24,
    date: '2024-01-08',
    url: '/media/analog-circuit.pdf',
    thumbnail: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400&h=300&fit=crop',
    category: 'documents'
  },
  {
    id: 3,
    name: 'product-showcase.jpg',
    size: '3.8 MB',
    type: 'image',
    format: 'JPEG',
    dimensions: '3840x2160',
    date: '2024-01-05',
    url: '/media/product-showcase.jpg',
    thumbnail: 'https://images.unsplash.com/photo-1581092335871-5d4a5d9d6f8c?w=400&h=300&fit=crop',
    category: 'products'
  },
  {
    id: 4,
    name: 'datasheet-2024.pdf',
    size: '7.2 MB',
    type: 'pdf',
    format: 'PDF',
    pages: 48,
    date: '2023-12-28',
    url: '/media/datasheet-2024.pdf',
    thumbnail: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400&h=300&fit=crop',
    category: 'documents'
  },
  {
    id: 5,
    name: 'team-photo.jpg',
    size: '4.2 MB',
    type: 'image',
    format: 'JPEG',
    dimensions: '4920x3280',
    date: '2023-12-20',
    url: '/media/team-photo.jpg',
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
    category: 'team'
  },
  {
    id: 6,
    name: 'presentation.pptx',
    size: '6.8 MB',
    type: 'presentation',
    format: 'PPTX',
    slides: 32,
    date: '2023-12-15',
    url: '/media/presentation.pptx',
    thumbnail: 'https://images.unsplash.com/photo-1581092335871-5d4a5d9d6f8c?w=400&h=300&fit=crop',
    category: 'presentations'
  },
];

const categories = ['All', 'images', 'documents', 'diagrams', 'products', 'team', 'presentations'];

export default function AdminMediaPage() {
  const [media, setMedia] = useState(initialMedia);
  const [filteredMedia, setFilteredMedia] = useState(initialMedia);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [uploadingFiles, setUploadingFiles] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);
  const [showPreview, setShowPreview] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 9;

  useEffect(() => {
    let filtered = media;
    
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    setFilteredMedia(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, media]);

  useEffect(() => {
    // GSAP animation for media items
    const items = document.querySelectorAll('.media-item');
    items.forEach((item, index) => {
      gsap.fromTo(item,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          delay: index * 0.05,
          ease: 'back.out(0.4)',
          scrollTrigger: {
            trigger: item,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, [filteredMedia, currentPage, viewMode]);

  const totalPages = Math.ceil(filteredMedia.length / itemsPerPage);
  const paginatedMedia = filteredMedia.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    await uploadFiles(files);
  }, []);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      await uploadFiles(files);
    }
  }, []);

  const uploadFiles = async (files: File[]) => {
    for (const file of files) {
      const fileId = `${file.name}-${Date.now()}`;
      setUploadingFiles(prev => [...prev, fileId]);
      
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setUploadProgress(prev => ({ ...prev, [fileId]: progress }));
      }
      
      // Add file to media list
      const newFile = {
        id: Date.now() + Math.random(),
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: file.type.split('/')[0],
        format: file.name.split('.').pop()?.toUpperCase() || 'FILE',
        date: new Date().toISOString().split('T')[0],
        url: URL.createObjectURL(file),
        thumbnail: file.type.startsWith('image') ? URL.createObjectURL(file) : '/api/placeholder/400/300',
        category: 'uploads',
      };
      
      setMedia(prev => [newFile, ...prev]);
      setUploadingFiles(prev => prev.filter(id => id !== fileId));
      setUploadProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[fileId];
        return newProgress;
      });
    }
  };

  const handleDelete = (id: number) => {
    const element = document.getElementById(`media-item-${id}`);
    if (element) {
      gsap.to(element, {
        opacity: 0,
        x: -50,
        scale: 0.8,
        duration: 0.3,
        onComplete: () => {
          setMedia((prev) => prev.filter((m) => m.id !== id));
          setSelectedFiles(prev => prev.filter(fid => fid !== id));
        },
      });
    } else {
      setMedia((prev) => prev.filter((m) => m.id !== id));
      setSelectedFiles(prev => prev.filter(fid => fid !== id));
    }
  };

  const handleBulkDelete = () => {
    selectedFiles.forEach(id => {
      const element = document.getElementById(`media-item-${id}`);
      if (element) {
        gsap.to(element, {
          opacity: 0,
          x: -50,
          scale: 0.8,
          duration: 0.3,
        });
      }
    });
    
    setTimeout(() => {
      setMedia((prev) => prev.filter((m) => !selectedFiles.includes(m.id)));
      setSelectedFiles([]);
    }, 300);
  };

  const handleCopyUrl = (url: string, id: number) => {
    navigator.clipboard.writeText(url);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const toggleSelectFile = (id: number) => {
    setSelectedFiles(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedFiles.length === paginatedMedia.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(paginatedMedia.map(f => f.id));
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="w-8 h-8 text-blue-500" />;
      case 'pdf':
        return <FileText className="w-8 h-8 text-red-500" />;
      default:
        return <File className="w-8 h-8 text-slate-500" />;
    }
  };

  const totalSize = media.reduce((sum, file) => {
    const size = parseFloat(file.size);
    return sum + (isNaN(size) ? 0 : size);
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Media Library
          </h1>
          <p className="text-slate-500 mt-1">Manage images, PDFs, and other media files</p>
        </div>
        <div className="flex gap-3">
          <div className="flex rounded-lg border border-slate-200 bg-white p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-slate-500'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-slate-500'}`}
            >
              <ListOrdered className="w-4 h-4" />
            </button>
          </div>
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload File
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Files', value: media.length, icon: File, color: 'blue' },
          { label: 'Images', value: media.filter(f => f.type === 'image').length, icon: ImageIcon, color: 'green' },
          { label: 'Documents', value: media.filter(f => f.type === 'pdf' || f.type === 'presentation').length, icon: FileText, color: 'orange' },
          { label: 'Total Size', value: `${totalSize.toFixed(1)} MB`, icon: HardDrive, color: 'purple' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="bg-white border-slate-200 p-4 hover:shadow-lg transition-all duration-300">
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
            </motion.div>
          );
        })}
      </div>

      {/* Drag & Drop Upload Area */}
      <motion.div
        ref={dropZoneRef}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        animate={{
          scale: isDragging ? 1.02 : 1,
          backgroundColor: isDragging ? 'rgba(59, 130, 246, 0.05)' : 'rgba(255, 255, 255, 0)',
        }}
        transition={{ duration: 0.2 }}
        className={`border-2 border-dashed rounded-2xl p-8 transition-all duration-300 cursor-pointer ${
          isDragging
            ? 'border-blue-500 bg-blue-50/50'
            : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50/50'
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          accept="image/*,application/pdf,.ppt,.pptx"
        />
        
        <div className="text-center">
          <motion.div
            animate={{ y: isDragging ? -5 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Upload className={`w-12 h-12 mx-auto mb-4 ${isDragging ? 'text-blue-500' : 'text-slate-400'}`} />
          </motion.div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            {isDragging ? 'Drop files here' : 'Drag and drop files here'}
          </h3>
          <p className="text-slate-500 mb-4">or click to browse your files</p>
          <p className="text-xs text-slate-400">Supports: Images, PDF, PPT (Max 50MB)</p>
        </div>
      </motion.div>

      {/* Upload Progress */}
      <AnimatePresence>
        {uploadingFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-2"
          >
            {uploadingFiles.map(fileId => (
              <Card key={fileId} className="bg-white border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Uploading...</span>
                      <span className="text-slate-500">{uploadProgress[fileId] || 0}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress[fileId] || 0}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Bulk Actions Bar */}
      <AnimatePresence>
        {selectedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="bg-white rounded-lg border border-slate-200 shadow-lg p-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-slate-700">
                {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleBulkDelete}
                variant="destructive"
                size="sm"
                className="bg-red-500 hover:bg-red-600"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
              <Button
                onClick={() => setSelectedFiles([])}
                variant="outline"
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Media Grid/List View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {paginatedMedia.map((file, idx) => (
              <motion.div
                key={file.id}
                id={`media-item-${file.id}`}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                whileHover={{ y: -5 }}
                className="media-item group relative"
              >
                <Card className="bg-white border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
                  {/* Checkbox */}
                  <div className="absolute top-3 left-3 z-10">
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(file.id)}
                      onChange={() => toggleSelectFile(file.id)}
                      className="w-4 h-4 rounded border-slate-300 bg-white/90 backdrop-blur-sm"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>

                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                    <img
                      src={file.thumbnail}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                      <button
                        onClick={() => setShowPreview(file)}
                        className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                      >
                        <Eye className="w-5 h-5 text-white" />
                      </button>
                      <button
                        onClick={() => handleCopyUrl(file.url, file.id)}
                        className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                      >
                        <Copy className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>

                  {/* File Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-slate-900 truncate flex-1">{file.name}</h3>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">{file.size}</span>
                      <span className="text-slate-400">{file.date}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
                      <div className="flex-1">
                        <span className="text-xs text-slate-400">{file.format}</span>
                      </div>
                      <button
                        onClick={() => handleDelete(file.id)}
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Copied Indicator */}
                  <AnimatePresence>
                    {copied === file.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-3 py-1 rounded-full text-xs shadow-lg"
                      >
                        Copied!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <Card className="bg-white border-slate-200 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 w-10">
                    <input
                      type="checkbox"
                      checked={selectedFiles.length === paginatedMedia.length && paginatedMedia.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded border-slate-300"
                    />
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Preview</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Size</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {paginatedMedia.map((file, idx) => (
                    <motion.tr
                      key={file.id}
                      id={`media-item-${file.id}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2, delay: idx * 0.03 }}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={selectedFiles.includes(file.id)}
                          onChange={() => toggleSelectFile(file.id)}
                          className="rounded border-slate-300"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                          {getFileIcon(file.type)}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-medium text-slate-900 truncate max-w-xs">{file.name}</p>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded-full bg-slate-100 text-xs text-slate-600">
                          {file.format}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{file.size}</td>
                      <td className="py-3 px-4 text-slate-500">{file.date}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setShowPreview(file)}
                            className="p-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                            title="Preview"
                          >
                            <Eye className="w-4 h-4 text-blue-500" />
                          </button>
                          <button
                            onClick={() => handleCopyUrl(file.url, file.id)}
                            className="p-1.5 rounded-lg hover:bg-green-50 transition-colors"
                            title="Copy URL"
                          >
                            <Copy className="w-4 h-4 text-green-500" />
                          </button>
                          <button
                            onClick={() => handleDelete(file.id)}
                            className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 bg-white rounded-lg border border-slate-200">
          <p className="text-sm text-slate-500">
            Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredMedia.length)} of {filteredMedia.length}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 rounded-lg transition-colors ${
                    currentPage === pageNum
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
                      : 'hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
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

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setShowPreview(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-200">
                <div>
                  <h3 className="font-semibold text-slate-900">{showPreview.name}</h3>
                  <p className="text-sm text-slate-500">{showPreview.size} • {showPreview.format}</p>
                </div>
                <button
                  onClick={() => setShowPreview(null)}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              <div className="p-6 flex items-center justify-center bg-slate-100 min-h-[400px]">
                {showPreview.type === 'image' ? (
                  <img
                    src={showPreview.thumbnail}
                    alt={showPreview.name}
                    className="max-w-full max-h-[60vh] object-contain rounded-lg"
                  />
                ) : (
                  <div className="text-center">
                    <FileText className="w-20 h-20 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">Preview not available for this file type</p>
                    <Button className="mt-4 bg-gradient-to-r from-blue-600 to-cyan-500">
                      <Download className="w-4 h-4 mr-2" />
                      Download File
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}