'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MapPin, 
  Briefcase, 
  ArrowRight, 
  Sparkles,
  Rocket,
  Target,
  Globe,
  Heart,
  Coffee,
  Users,
  Award,
  Clock,
  ChevronDown,
  Search,
  Filter,
  X
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const jobs = [
  {
    id: 1,
    title: 'Senior Analog Circuit Designer',
    department: 'Design Engineering',
    location: 'San Jose, CA',
    type: 'Full-time',
    level: 'Senior',
    experience: '8+ years',
    description: 'Design next-generation analog circuits for signal processing applications including ADCs, DACs, and PLLs.',
    responsibilities: [
      'Design and optimize high-performance analog circuits',
      'Lead design reviews and mentor junior engineers',
      'Collaborate with layout and verification teams',
      'Drive innovation in circuit architecture'
    ],
    requirements: [
      'MSEE/PhD with 8+ years of industry experience',
      'Expertise in Cadence Virtuoso and analog design flow',
      'Strong understanding of device physics',
      'Experience with high-speed SerDes is a plus'
    ],
    icon: '🔌',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    title: 'Digital Design Engineer',
    department: 'Design Engineering',
    location: 'San Jose, CA',
    type: 'Full-time',
    level: 'Mid-Level',
    experience: '3-5 years',
    description: 'Develop digital signal processing IP and RTL design for semiconductor products.',
    responsibilities: [
      'RTL design and verification using SystemVerilog',
      'Synthesis and timing closure',
      'Power optimization and DFT integration',
      'Documentation and design reviews'
    ],
    requirements: [
      'BSEE/MSEE with 3+ years of experience',
      'Strong Verilog/SystemVerilog skills',
      'Experience with FPGA prototyping',
      'Knowledge of DSP concepts'
    ],
    icon: '💻',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 3,
    title: 'ML/AI Software Engineer',
    department: 'Software',
    location: 'Remote',
    type: 'Full-time',
    level: 'Mid-Level',
    experience: '3-5 years',
    description: 'Build machine learning solutions for hardware acceleration and optimization.',
    responsibilities: [
      'Develop ML models for analog design automation',
      'Implement inference engines for edge AI',
      'Optimize algorithms for hardware acceleration',
      'Collaborate with hardware teams'
    ],
    requirements: [
      'MS/PhD in CS/EE or equivalent experience',
      'Strong Python and TensorFlow/PyTorch skills',
      'Experience with CUDA/OpenCL',
      'Knowledge of digital design fundamentals'
    ],
    icon: '🤖',
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    id: 4,
    title: 'RF Systems Engineer',
    department: 'Engineering',
    location: 'Munich, Germany',
    type: 'Full-time',
    level: 'Senior',
    experience: '7+ years',
    description: 'Design and optimize RF/wireless systems for communication applications.',
    responsibilities: [
      'RF system architecture and specification',
      'Link budget analysis and simulation',
      'Test and characterization of RF circuits',
      'Collaboration with cross-functional teams'
    ],
    requirements: [
      'MSEE/PhD with RF focus',
      'Experience with ADS/HFSS',
      'Knowledge of 5G/WiFi standards',
      'Lab measurement expertise'
    ],
    icon: '📡',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    id: 5,
    title: 'Product Manager',
    department: 'Product',
    location: 'San Jose, CA',
    type: 'Full-time',
    level: 'Mid-Level',
    experience: '5+ years',
    description: 'Lead product strategy and roadmap for semiconductor IP portfolio.',
    responsibilities: [
      'Define product requirements and roadmap',
      'Market analysis and competitive research',
      'Work with engineering and sales teams',
      'Customer presentations and support'
    ],
    requirements: [
      'BS/MS in EE or related field',
      'Experience in semiconductor industry',
      'Strong communication and leadership skills',
      'MBA is a plus'
    ],
    icon: '📊',
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    id: 6,
    title: 'Technical Sales Engineer',
    department: 'Sales',
    location: 'Multiple Locations',
    type: 'Full-time',
    level: 'Mid-Level',
    experience: '4+ years',
    description: 'Support enterprise customers with technical solutions and implementations.',
    responsibilities: [
      'Technical presentations and demos',
      'Customer requirements analysis',
      'Proposal development and support',
      'Product feedback to engineering'
    ],
    requirements: [
      'BS in EE/CS or equivalent',
      'Technical background in semiconductors',
      'Excellent communication skills',
      'Willingness to travel'
    ],
    icon: '🎯',
    gradient: 'from-rose-500 to-pink-500'
  },
];

const benefits = [
  { icon: Heart, title: 'Health & Wellness', desc: 'Comprehensive medical, dental, and vision coverage' },
  { icon: Award, title: 'Learning & Development', desc: '$5,000 annual education stipend' },
  { icon: Coffee, title: 'Work-Life Balance', desc: 'Flexible hours and remote work options' },
  { icon: Users, title: 'Collaborative Culture', desc: 'Team events and innovation workshops' },
  { icon: Rocket, title: 'Stock Options', desc: 'Equity packages for all employees' },
  { icon: Globe, title: 'Global Mobility', desc: 'Opportunity to work abroad' },
];

const departments = ['All', 'Design Engineering', 'Software', 'Engineering', 'Product', 'Sales'];
const locations = ['All', 'San Jose, CA', 'Munich, Germany', 'Remote', 'Multiple Locations'];
const levels = ['All', 'Entry Level', 'Mid-Level', 'Senior'];

export default function CareersPage() {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<(HTMLDivElement | null)[]>([]);
  const jobsRef = useRef<(HTMLDivElement | null)[]>([]);

  const filteredJobs = jobs.filter(job => {
    const matchesDepartment = selectedDepartment === 'All' || job.department === selectedDepartment;
    const matchesLocation = selectedLocation === 'All' || job.location === selectedLocation;
    const matchesLevel = selectedLevel === 'All' || job.level === selectedLevel;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDepartment && matchesLocation && matchesLevel && matchesSearch;
  });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(heroRef.current,
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out',
        }
      );

      // Benefits staggered animation
      benefitsRef.current.forEach((benefit, index) => {
        if (!benefit) return;
        
        gsap.fromTo(benefit,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'back.out(0.4)',
            scrollTrigger: {
              trigger: benefit,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Jobs staggered animation
      jobsRef.current.forEach((job, index) => {
        if (!job) return;
        
        gsap.fromTo(job,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            delay: index * 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: job,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredJobs]);

  const toggleJobExpand = (jobId: number) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  return (
    <>
    <Navbar/>
    <main ref={sectionRef} className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-200/20 rounded-full blur-3xl" />
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgb(14, 165, 233) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div ref={heroRef} className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-center py-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 shadow-sm mb-6">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
              Join Our Team
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
            Shape the Future of
            <br />
            Semiconductor Technology
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Join a team of passionate innovators building the next generation of semiconductor solutions
            that power the world's most advanced technologies.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '500+', label: 'Employees', icon: Users },
              { value: '20+', label: 'Countries', icon: Globe },
              { value: '99%', label: 'Retention Rate', icon: Heart },
              { value: '4.8★', label: 'Glassdoor Rating', icon: Award },
            ].map((stat, idx) => {
              const StatIcon = stat.icon;
              return (
                <div key={idx} className="text-center p-6 rounded-2xl bg-white shadow-sm border border-slate-200">
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center">
                      <StatIcon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Join SmartScope?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We offer competitive compensation, comprehensive benefits, and a culture that fosters innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  ref={(el) => { benefitsRef.current[idx] = el; }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                  <Card className="relative p-6 bg-white border-slate-200 hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h3>
                    <p className="text-sm text-slate-600">{benefit.desc}</p>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Open Positions</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Find your perfect role and help us shape the future of technology
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors mb-4"
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white rounded-xl border border-slate-200 mb-6">
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">Department</label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">Level</label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Job title or keyword"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {filteredJobs.map((job, index) => (
              <div
                key={job.id}
                ref={(el) => { jobsRef.current[index] = el; }}
                className="group"
              >
                <Card className={`bg-white border-slate-200 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden ${expandedJob === job.id ? 'shadow-xl' : ''}`}>
                  <div
                    className="p-6"
                    onClick={() => toggleJobExpand(job.id)}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                      <div className="md:col-span-6">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{job.icon}</span>
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-700 group-hover:bg-clip-text transition-all duration-300">
                            {job.title}
                          </h3>
                        </div>
                        <p className="text-slate-600 text-sm mb-2">{job.description}</p>
                        <div className="flex flex-wrap gap-2">
                          <span className={`px-2 py-1 rounded-md text-xs font-medium bg-gradient-to-r ${job.gradient} text-white`}>
                            {job.level}
                          </span>
                          <span className="px-2 py-1 rounded-md bg-slate-100 text-xs font-medium text-slate-600">
                            {job.experience}
                          </span>
                        </div>
                      </div>

                      <div className="md:col-span-3">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Briefcase className="w-4 h-4" />
                            {job.department}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-3 flex justify-end">
                        <ArrowRight className={`w-5 h-5 text-blue-600 transition-transform duration-300 ${expandedJob === job.id ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedJob === job.id && (
                    <div className="border-t border-slate-100 p-6 bg-slate-50/50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-3">Responsibilities</h4>
                          <ul className="space-y-2">
                            {job.responsibilities.map((resp, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                <span className="text-blue-500 mt-0.5">•</span>
                                {resp}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-3">Requirements</h4>
                          <ul className="space-y-2">
                            {job.requirements.map((req, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                <span className="text-blue-500 mt-0.5">•</span>
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="mt-6 flex justify-end">
                        <Button className={`bg-gradient-to-r ${job.gradient} text-white hover:opacity-90`}>
                          Apply Now
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No positions found</h3>
              <p className="text-slate-600">Try adjusting your filters or check back later for new opportunities</p>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-3">Don't see a perfect fit?</h3>
              <p className="text-slate-300 mb-6">Send us your resume and we'll keep you in mind for future opportunities</p>
              <Button className="bg-white text-slate-900 hover:bg-slate-100 font-semibold">
                Send Application
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 shadow-sm mb-6">
                <Heart className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
                  Our Culture
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                A Place Where Innovation Thrives
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                At SmartScope, we believe that great ideas can come from anyone, anywhere. 
                We foster an inclusive environment where diverse perspectives are valued and 
                creativity is encouraged.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-slate-700">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <span>Quarterly innovation hackathons</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <span>20% time for personal projects</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <span>Cross-functional collaboration</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <span>Continuous learning & development</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-3xl opacity-30" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                    alt="Team collaboration"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer/>
    </>
  );
}