'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Trash2, 
  Edit, 
  Plus, 
  Search, 
  Filter,
  X,
  MapPin,
  Briefcase,
  Clock,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Eye,
  ChevronLeft,
  ChevronRight,
  Download,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Award,
  Zap,
  Save,
  Send
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const initialJobs = [
  {
    id: 1,
    title: 'Senior Analog Circuit Designer',
    department: 'Design Engineering',
    location: 'San Jose, CA',
    type: 'Full-time',
    level: 'Senior',
    applications: 12,
    status: 'Open',
    date: '2024-01-10',
    salary: '$150k - $200k',
    experience: '8+ years',
    description: 'Design next-generation analog circuits for signal processing applications.',
    requirements: ['MSEE/PhD', '8+ years experience', 'Cadence Virtuoso'],
    applicants: [
      { name: 'John Smith', email: 'john@example.com', date: '2024-01-15', status: 'pending' },
      { name: 'Sarah Chen', email: 'sarah@example.com', date: '2024-01-14', status: 'reviewed' },
      { name: 'Mike Johnson', email: 'mike@example.com', date: '2024-01-13', status: 'interview' },
    ]
  },
  {
    id: 2,
    title: 'Digital Design Engineer',
    department: 'Design Engineering',
    location: 'San Jose, CA',
    type: 'Full-time',
    level: 'Mid-Level',
    applications: 8,
    status: 'Open',
    date: '2024-01-05',
    salary: '$120k - $160k',
    experience: '3-5 years',
    description: 'Develop digital signal processing IP and RTL design.',
    requirements: ['BSEE/MSEE', '3-5 years experience', 'SystemVerilog'],
    applicants: [
      { name: 'Emily Watson', email: 'emily@example.com', date: '2024-01-12', status: 'pending' },
      { name: 'David Kim', email: 'david@example.com', date: '2024-01-11', status: 'reviewed' },
    ]
  },
  {
    id: 3,
    title: 'RF Systems Engineer',
    department: 'Engineering',
    location: 'Munich, Germany',
    type: 'Full-time',
    level: 'Senior',
    applications: 5,
    status: 'Closed',
    date: '2023-12-20',
    salary: '€120k - €160k',
    experience: '7+ years',
    description: 'Design and optimize RF/wireless systems for communication applications.',
    requirements: ['MSEE/PhD', '7+ years experience', 'ADS/HFSS'],
    applicants: [
      { name: 'Hans Mueller', email: 'hans@example.com', date: '2023-12-28', status: 'hired' },
    ]
  },
  {
    id: 4,
    title: 'ML/AI Software Engineer',
    department: 'Software',
    location: 'Remote',
    type: 'Full-time',
    level: 'Mid-Level',
    applications: 15,
    status: 'Open',
    date: '2024-01-08',
    salary: '$130k - $170k',
    experience: '3-5 years',
    description: 'Build machine learning solutions for hardware acceleration.',
    requirements: ['MS/PhD', '3-5 years experience', 'Python/TensorFlow'],
    applicants: [
      { name: 'Alex Chen', email: 'alex@example.com', date: '2024-01-16', status: 'pending' },
      { name: 'Maria Garcia', email: 'maria@example.com', date: '2024-01-15', status: 'reviewed' },
      { name: 'James Wilson', email: 'james@example.com', date: '2024-01-14', status: 'interview' },
    ]
  },
];

const departments = ['All', 'Design Engineering', 'Engineering', 'Software', 'Product', 'Sales'];
const locations = ['All', 'San Jose, CA', 'Munich, Germany', 'Remote'];
const levels = ['All', 'Entry Level', 'Mid-Level', 'Senior', 'Lead'];
const statuses = ['All', 'Open', 'Closed', 'On Hold'];

export default function AdminCareersPage() {
  const [jobs, setJobs] = useState(initialJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJobs, setSelectedJobs] = useState<number[]>([]);
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState<any>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<number | null>(null);
  const [showApplicantsModal, setShowApplicantsModal] = useState(false);
  const [selectedJobForApplicants, setSelectedJobForApplicants] = useState<any>(null);

  const tableRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLTableRowElement | null)[]>([]);
  const itemsPerPage = 5;

  const [formData, setFormData] = useState({
    title: '',
    department: 'Design Engineering',
    location: 'San Jose, CA',
    type: 'Full-time',
    level: 'Mid-Level',
    salary: '',
    experience: '',
    description: '',
    requirements: '',
  });

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
  }, [jobs, currentPage, searchTerm, selectedDepartment, selectedLocation, selectedLevel, selectedStatus]);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || job.department === selectedDepartment;
    const matchesLocation = selectedLocation === 'All' || job.location === selectedLocation;
    const matchesLevel = selectedLevel === 'All' || job.level === selectedLevel;
    const matchesStatus = selectedStatus === 'All' || job.status === selectedStatus;
    return matchesSearch && matchesDepartment && matchesLocation && matchesLevel && matchesStatus;
  });

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const stats = {
    open: jobs.filter(j => j.status === 'Open').length,
    closed: jobs.filter(j => j.status === 'Closed').length,
    totalApplications: jobs.reduce((sum, j) => sum + j.applications, 0),
    avgApplications: Math.round(jobs.reduce((sum, j) => sum + j.applications, 0) / jobs.length),
  };

  const handleDelete = (id: number) => {
    setJobToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (jobToDelete) {
      gsap.to(`#job-row-${jobToDelete}`, {
        opacity: 0,
        x: -50,
        duration: 0.3,
        onComplete: () => {
          setJobs(prev => prev.filter(j => j.id !== jobToDelete));
          setShowDeleteConfirm(false);
          setJobToDelete(null);
        },
      });
    }
  };

  const handleEdit = (job: any) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      level: job.level,
      salary: job.salary,
      experience: job.experience,
      description: job.description,
      requirements: job.requirements.join(', '),
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingJob) {
      setJobs(prev =>
        prev.map(j =>
          j.id === editingJob.id
            ? {
                ...j,
                title: formData.title,
                department: formData.department,
                location: formData.location,
                type: formData.type,
                level: formData.level,
                salary: formData.salary,
                experience: formData.experience,
                description: formData.description,
                requirements: formData.requirements.split(',').map(r => r.trim()),
              }
            : j
        )
      );
    } else {
      const newJob = {
        id: Math.max(...jobs.map(j => j.id), 0) + 1,
        title: formData.title,
        department: formData.department,
        location: formData.location,
        type: formData.type,
        level: formData.level,
        applications: 0,
        status: 'Open',
        date: new Date().toISOString().split('T')[0],
        salary: formData.salary,
        experience: formData.experience,
        description: formData.description,
        requirements: formData.requirements.split(',').map(r => r.trim()),
        applicants: [],
      };
      setJobs(prev => [newJob, ...prev]);
    }
    
    setFormData({ title: '', department: 'Design Engineering', location: 'San Jose, CA', type: 'Full-time', level: 'Mid-Level', salary: '', experience: '', description: '', requirements: '' });
    setEditingJob(null);
    setShowModal(false);
  };

  const toggleSelectJob = (id: number) => {
    setSelectedJobs(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedJobs.length === paginatedJobs.length) {
      setSelectedJobs([]);
    } else {
      setSelectedJobs(paginatedJobs.map(j => j.id));
    }
  };

  const handleBulkDelete = () => {
    selectedJobs.forEach(id => {
      gsap.to(`#job-row-${id}`, {
        opacity: 0,
        x: -50,
        duration: 0.3,
      });
    });
    setTimeout(() => {
      setJobs(prev => prev.filter(j => !selectedJobs.includes(j.id)));
      setSelectedJobs([]);
    }, 300);
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setJobs(prev =>
      prev.map(j =>
        j.id === id ? { ...j, status: newStatus } : j
      )
    );
  };

  const viewApplicants = (job: any) => {
    setSelectedJobForApplicants(job);
    setShowApplicantsModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Closed':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      case 'On Hold':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getApplicantStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 text-yellow-700';
      case 'reviewed':
        return 'bg-blue-50 text-blue-700';
      case 'interview':
        return 'bg-purple-50 text-purple-700';
      case 'hired':
        return 'bg-green-50 text-green-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const exportToCSV = () => {
    const data = filteredJobs.map(j => ({
      Title: j.title,
      Department: j.department,
      Location: j.location,
      Type: j.type,
      Level: j.level,
      Status: j.status,
      Applications: j.applications,
      Date: j.date,
      Salary: j.salary,
      Experience: j.experience,
    }));
    const csv = [Object.keys(data[0]).join(','), ...data.map(row => Object.values(row).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'jobs.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Career Listings
          </h1>
          <p className="text-slate-500 mt-1">Manage job postings and track applications</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={exportToCSV}
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
            Post Job
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Open Positions', value: stats.open, icon: Briefcase, color: 'blue', change: '+2 this week' },
          { label: 'Total Applications', value: stats.totalApplications, icon: Users, color: 'green', change: '+12 this week' },
          { label: 'Closed Positions', value: stats.closed, icon: CheckCircle, color: 'gray', change: 'This year' },
          { label: 'Avg. per Position', value: stats.avgApplications, icon: TrendingUp, color: 'purple', change: 'Applications' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className="bg-white border-slate-200 p-4 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                  <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`w-10 h-10 rounded-xl bg-${stat.color}-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-5 h-5 text-${stat.color}-600`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search jobs by title or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="px-4 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="px-4 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {locations.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="px-4 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {levels.map(level => (
            <option key={level} value={level}>{level}</option>
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
        {selectedJobs.length > 0 && (
          <Button
            onClick={handleBulkDelete}
            variant="destructive"
            className="bg-red-500 hover:bg-red-600"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete ({selectedJobs.length})
          </Button>
        )}
      </div>

      {/* Jobs Table */}
      <Card className="bg-white border-slate-200 shadow-xl overflow-hidden">
        <div ref={tableRef} className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-4 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedJobs.length === paginatedJobs.length && paginatedJobs.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-slate-300"
                  />
                </th>
                <th className="text-left py-4 px-4 font-semibold text-slate-700">Position</th>
                <th className="text-left py-4 px-4 font-semibold text-slate-700">Department</th>
                <th className="text-left py-4 px-4 font-semibold text-slate-700">Location</th>
                <th className="text-left py-4 px-4 font-semibold text-slate-700">Level</th>
                <th className="text-left py-4 px-4 font-semibold text-slate-700">Applications</th>
                <th className="text-left py-4 px-4 font-semibold text-slate-700">Status</th>
                <th className="text-left py-4 px-4 font-semibold text-slate-700">Posted</th>
                <th className="text-left py-4 px-4 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedJobs.map((job, idx) => (
                <tr
                  key={job.id}
                  id={`job-row-${job.id}`}
                  ref={(el) => { rowsRef.current[idx] = el; }}
                  className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="py-4 px-4">
                    <input
                      type="checkbox"
                      checked={selectedJobs.includes(job.id)}
                      onChange={() => toggleSelectJob(job.id)}
                      className="rounded border-slate-300"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-semibold text-slate-900">{job.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{job.type}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-600">{job.department}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1 text-slate-600">
                      <MapPin className="w-3 h-3" />
                      {job.location}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                      <Award className="w-3 h-3" />
                      {job.level}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => viewApplicants(job)}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <Users className="w-4 h-4" />
                      {job.applications}
                    </button>
                  </td>
                  <td className="py-4 px-4">
                    <select
                      value={job.status}
                      onChange={(e) => handleStatusChange(job.id, e.target.value)}
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(job.status)} focus:outline-none`}
                    >
                      <option value="Open">Open</option>
                      <option value="Closed">Closed</option>
                      <option value="On Hold">On Hold</option>
                    </select>
                  </td>
                  <td className="py-4 px-4 text-slate-500">{job.date}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEdit(job)}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-slate-500" />
                      </button>
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                      <button
                        onClick={() => viewApplicants(job)}
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Applicants"
                      >
                        <Eye className="w-4 h-4 text-blue-500" />
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
              Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredJobs.length)} of {filteredJobs.length}
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
              Are you sure you want to delete this job posting? This action cannot be undone.
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

      {/* Applicants Modal */}
      {showApplicantsModal && selectedJobForApplicants && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-white w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Applicants</h2>
                  <p className="text-slate-500 mt-1">{selectedJobForApplicants.title}</p>
                </div>
                <button
                  onClick={() => setShowApplicantsModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
            </div>
            <div className="overflow-y-auto max-h-[60vh]">
              {selectedJobForApplicants.applicants.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {selectedJobForApplicants.applicants.map((applicant: any, idx: number) => (
                    <div key={idx} className="p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-slate-900">{applicant.name}</p>
                          <p className="text-sm text-slate-500">{applicant.email}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            <span className="text-xs text-slate-500">{applicant.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getApplicantStatusColor(applicant.status)}`}>
                            {applicant.status}
                          </span>
                          <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
                            <Mail className="w-4 h-4 text-blue-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">No applicants yet</p>
                </div>
              )}
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
                {editingJob ? 'Edit Job Posting' : 'Post New Job'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingJob(null);
                  setFormData({ title: '', department: 'Design Engineering', location: 'San Jose, CA', type: 'Full-time', level: 'Mid-Level', salary: '', experience: '', description: '', requirements: '' });
                }}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Job Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Senior Analog Circuit Designer"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Design Engineering</option>
                    <option>Engineering</option>
                    <option>Software</option>
                    <option>Product</option>
                    <option>Sales</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>San Jose, CA</option>
                    <option>Munich, Germany</option>
                    <option>Remote</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Employment Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Experience Level</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Entry Level</option>
                    <option>Mid-Level</option>
                    <option>Senior</option>
                    <option>Lead</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Salary Range</label>
                  <input
                    type="text"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    placeholder="e.g., $120k - $160k"
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Experience Required</label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="e.g., 5+ years"
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Job description..."
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Requirements (comma separated)</label>
                <textarea
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  placeholder="e.g., MSEE/PhD, 5+ years experience, Cadence Virtuoso"
                  rows={2}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingJob ? 'Update Job' : 'Post Job'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowModal(false);
                    setEditingJob(null);
                    setFormData({ title: '', department: 'Design Engineering', location: 'San Jose, CA', type: 'Full-time', level: 'Mid-Level', salary: '', experience: '', description: '', requirements: '' });
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