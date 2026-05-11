'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Eye, 
  Archive, 
  Trash2, 
  Search, 
  Filter,
  X,
  Mail,
  Phone,
  Building,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  Download,
  ChevronLeft,
  ChevronRight,
  Reply,
  Star,
  Flag,
  MoreVertical,
  User,
  MessageSquare,
  TrendingUp
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const initialInquiries = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Inc',
    subject: 'SERDES IP Implementation',
    message: 'We are interested in licensing your SERDES IP for our next-generation data center products. Could you provide more details about pricing and support?',
    status: 'New',
    priority: 'High',
    date: '2024-01-15',
    timeAgo: '2 hours ago',
    replied: false,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop'
  },
  {
    id: 2,
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    phone: '+1 (555) 234-5678',
    company: 'Innovation Labs',
    subject: 'Custom Analog Solution',
    message: 'We need a custom analog front-end for medical imaging applications. Do you offer custom IP development services?',
    status: 'Replied',
    priority: 'Medium',
    date: '2024-01-14',
    timeAgo: '1 day ago',
    replied: true,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+1 (555) 345-6789',
    company: 'Digital Systems',
    subject: 'Datasheet Request',
    message: 'Could you please send me the complete datasheet for your PLL Systems product line?',
    status: 'New',
    priority: 'Low',
    date: '2024-01-13',
    timeAgo: '2 days ago',
    replied: false,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop'
  },
  {
    id: 4,
    name: 'Lisa Wang',
    email: 'lisa@example.com',
    phone: '+1 (555) 456-7890',
    company: 'Global Electronics',
    subject: 'Partnership Inquiry',
    message: 'We are interested in becoming a strategic partner. Please send information about partnership programs.',
    status: 'Resolved',
    priority: 'High',
    date: '2024-01-10',
    timeAgo: '5 days ago',
    replied: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop'
  },
  {
    id: 5,
    name: 'David Kim',
    email: 'david@example.com',
    phone: '+1 (555) 567-8901',
    company: 'AI Solutions Inc',
    subject: 'Technical Support',
    message: 'We are experiencing issues with your ML Accelerator IP integration. Need immediate assistance.',
    status: 'New',
    priority: 'High',
    date: '2024-01-16',
    timeAgo: '1 hour ago',
    replied: false,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop'
  },
  {
    id: 6,
    name: 'Emily Watson',
    email: 'emily@example.com',
    phone: '+1 (555) 678-9012',
    company: 'TechStart',
    subject: 'Pricing Request',
    message: 'We are a startup looking for volume pricing for your Analog IP portfolio.',
    status: 'Replied',
    priority: 'Medium',
    date: '2024-01-12',
    timeAgo: '4 days ago',
    replied: true,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop'
  },
];

const statusColors = {
  New: 'bg-blue-100 text-blue-700 border-blue-200',
  Replied: 'bg-amber-100 text-amber-700 border-amber-200',
  Resolved: 'bg-green-100 text-green-700 border-green-200',
  Archived: 'bg-gray-100 text-gray-700 border-gray-200',
};

const priorityColors = {
  High: 'bg-red-100 text-red-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  Low: 'bg-green-100 text-green-700',
};

const priorityIcons = {
  High: AlertCircle,
  Medium: Flag,
  Low: Star,
};

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [replyingTo, setReplyingTo] = useState<any>(null);

  const inquiriesRef = useRef<(HTMLButtonElement | null)[]>([]);
  const itemsPerPage = 5;

  useEffect(() => {
    inquiriesRef.current.forEach((inquiry, index) => {
      if (!inquiry) return;
      
      gsap.fromTo(inquiry,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          delay: index * 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: inquiry,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, [inquiries, currentPage, searchTerm, selectedStatus, selectedPriority]);

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inquiry.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inquiry.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || inquiry.status === selectedStatus;
    const matchesPriority = selectedPriority === 'All' || inquiry.priority === selectedPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage);
  const paginatedInquiries = filteredInquiries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const selected = inquiries.find((i) => i.id === selectedId);

  const stats = {
    total: inquiries.length,
    new: inquiries.filter(i => i.status === 'New').length,
    replied: inquiries.filter(i => i.status === 'Replied').length,
    resolved: inquiries.filter(i => i.status === 'Resolved').length,
    highPriority: inquiries.filter(i => i.priority === 'High').length,
  };

  const handleDelete = (id: number) => {
    gsap.to(`#inquiry-${id}`, {
      opacity: 0,
      x: -50,
      duration: 0.3,
      onComplete: () => {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
        if (selectedId === id) setSelectedId(null);
      },
    });
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setInquiries((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, status: newStatus } : i
      )
    );
  };

  const handlePriorityChange = (id: number, newPriority: string) => {
    setInquiries((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, priority: newPriority } : i
      )
    );
  };

  const handleReply = (inquiry: any) => {
    setReplyingTo(inquiry);
    setReplyMessage('');
    setShowReplyModal(true);
  };

  const sendReply = () => {
    if (replyingTo && replyMessage) {
      setInquiries((prev) =>
        prev.map((i) =>
          i.id === replyingTo.id
            ? { ...i, status: 'Replied', replied: true }
            : i
        )
      );
      setShowReplyModal(false);
      setReplyMessage('');
      setReplyingTo(null);
      
      // Show success message (in real app, this would send an email)
      alert(`Reply sent to ${replyingTo.name} at ${replyingTo.email}`);
    }
  };

  const exportToCSV = () => {
    const data = filteredInquiries.map(i => ({
      Name: i.name,
      Email: i.email,
      Phone: i.phone,
      Company: i.company,
      Subject: i.subject,
      Status: i.status,
      Priority: i.priority,
      Date: i.date,
    }));
    const csv = [Object.keys(data[0]).join(','), ...data.map(row => Object.values(row).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inquiries.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getTimeAgo = (date: string) => {
    const days = Math.floor((new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Contact Inquiries
          </h1>
          <p className="text-slate-500 mt-1">Manage and respond to customer inquiries</p>
        </div>
        <Button
          onClick={exportToCSV}
          variant="outline"
          className="border-slate-200"
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total', value: stats.total, icon: MessageSquare, color: 'blue' },
          { label: 'New', value: stats.new, icon: AlertCircle, color: 'red' },
          { label: 'Replied', value: stats.replied, icon: Reply, color: 'amber' },
          { label: 'Resolved', value: stats.resolved, icon: CheckCircle, color: 'green' },
          { label: 'High Priority', value: stats.highPriority, icon: Flag, color: 'purple' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className="bg-white border-slate-200 p-4 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-8 h-8 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 text-${stat.color}-600`} />
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
            placeholder="Search by name, company, subject, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Status</option>
          <option value="New">New</option>
          <option value="Replied">Replied</option>
          <option value="Resolved">Resolved</option>
        </select>
        <select
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
          className="px-4 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Priority</option>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inquiries List */}
        <div className="lg:col-span-2">
          <Card className="bg-white border-slate-200 shadow-xl overflow-hidden">
            <div className="p-4 border-b border-slate-200">
              <h2 className="font-semibold text-slate-900">All Inquiries ({filteredInquiries.length})</h2>
            </div>
            <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
              {paginatedInquiries.map((inquiry, idx) => {
                const PriorityIcon = priorityIcons[inquiry.priority as keyof typeof priorityIcons];
                return (
                  <button
                    key={inquiry.id}
                    id={`inquiry-${inquiry.id}`}
                    ref={(el) => { inquiriesRef.current[idx] = el; }}
                    onClick={() => setSelectedId(inquiry.id)}
                    className={`w-full text-left p-4 hover:bg-slate-50 transition-all duration-300 ${
                      selectedId === inquiry.id ? 'bg-blue-50/50 border-l-4 border-l-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <img src={inquiry.avatar} alt={inquiry.name} className="w-10 h-10 rounded-full" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-slate-900">{inquiry.name}</h3>
                            {!inquiry.replied && inquiry.status === 'New' && (
                              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            )}
                          </div>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${priorityColors[inquiry.priority as keyof typeof priorityColors]}`}>
                            <PriorityIcon className="w-3 h-3" />
                            {inquiry.priority}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600">{inquiry.company}</p>
                        <p className="text-sm font-medium text-slate-800 mt-1 truncate">{inquiry.subject}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[inquiry.status as keyof typeof statusColors]}`}>
                            {inquiry.status}
                          </span>
                          <span className="text-xs text-slate-400">{inquiry.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200">
                <p className="text-sm text-slate-500">
                  {filteredInquiries.length} inquiries
                </p>
                <div className="flex gap-1">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-1 rounded hover:bg-slate-100 disabled:opacity-50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-sm text-slate-600 px-2">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-1 rounded hover:bg-slate-100 disabled:opacity-50"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Detail View */}
        <div>
          {selected ? (
            <Card className="bg-white border-slate-200 shadow-xl sticky top-6">
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <img src={selected.avatar} alt={selected.name} className="w-12 h-12 rounded-full" />
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">{selected.name}</h2>
                      <p className="text-sm text-slate-500">{selected.company}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleReply(selected)}
                      className="p-2 rounded-lg hover:bg-blue-50 transition-colors"
                      title="Reply"
                    >
                      <Reply className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(selected.id)}
                      className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-500">Email</p>
                      <a href={`mailto:${selected.email}`} className="text-blue-600 hover:text-blue-700 text-sm">
                        {selected.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-500">Phone</p>
                      <a href={`tel:${selected.phone}`} className="text-slate-900 text-sm">
                        {selected.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Building className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-500">Company</p>
                      <p className="text-slate-900 text-sm">{selected.company}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-500">Received</p>
                      <p className="text-slate-900 text-sm">{selected.date} ({selected.timeAgo})</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-xs text-slate-500 mb-2">Subject</p>
                  <p className="font-medium text-slate-800">{selected.subject}</p>
                </div>

                <div className="mb-6">
                  <p className="text-xs text-slate-500 mb-2">Message</p>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-slate-700 text-sm leading-relaxed">{selected.message}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-slate-500 mb-2">Status</p>
                    <select
                      value={selected.status}
                      onChange={(e) => handleStatusChange(selected.id, e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="New">New</option>
                      <option value="Replied">Replied</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-2">Priority</p>
                    <select
                      value={selected.priority}
                      onChange={(e) => handlePriorityChange(selected.id, e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="High">High Priority</option>
                      <option value="Medium">Medium Priority</option>
                      <option value="Low">Low Priority</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200">
                  <Button
                    onClick={() => handleReply(selected)}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Reply to Inquiry
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="bg-white border-slate-200 shadow-xl text-center py-12">
              <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">Select an inquiry to view details</p>
            </Card>
          )}
        </div>
      </div>

      {/* Reply Modal */}
      {showReplyModal && replyingTo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-white w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Reply to {replyingTo.name}</h2>
                <p className="text-sm text-slate-500 mt-1">{replyingTo.email}</p>
              </div>
              <button
                onClick={() => setShowReplyModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
              <input
                type="text"
                value={`Re: ${replyingTo.subject}`}
                readOnly
                className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-600"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Type your reply here..."
                rows={6}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                onClick={sendReply}
                disabled={!replyMessage.trim()}
                className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 disabled:opacity-50"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Reply
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowReplyModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}