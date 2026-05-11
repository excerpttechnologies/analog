"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Linkedin,
  Mail,
  ChevronDown,
  X,
  Award,
  Zap,
  Shield,
  Users,
  Globe,
  Clock,
  Target,
  Heart,
  Cpu,
  Sparkles,
  Briefcase,
  Calendar,
  MapPin,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Menu,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Send,
  Plus,
  Minus,
  Star,
  Code,
  Layout,
  Smartphone,
  Server,
  Cloud,
  Database,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Layers,
  Microchip,
  Radio,
  Wifi,
  Bluetooth,
  Github,
  Figma,
  LinkedinIcon,
  MailIcon,
  PhoneCall,
  MapPinIcon,
  Building,
  Users as UsersIcon,
  UserPlus,
  LogIn,
  ExternalLink,
  Menu as MenuIcon,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Types
interface Leader {
  id: number;
  name: string;
  role: string;
  tagline: string;
  image: string;
  bio: string;
  experience: string;
  projects: number;
  clients: number;
  expertise: string[];
  achievements: string[];
  social: {
    linkedin: string;
    email: string;
  };
  milestones: { year: string; title: string }[];
}

interface Stat {
  label: string;
  value: number;
  icon: any;
  suffix?: string;
}

interface ValueCard {
  title: string;
  description: string;
  icon: any;
}

// Leadership Data
const leaders: Leader[] = [
  {
    id: 1,
    name: "Gautam Kumar Singh",
    role: "Chief Executive Officer",
    tagline: "Driving innovation in semiconductor architecture.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    bio: "Gautam brings over 20 years of semiconductor industry experience, having led multiple successful product launches and strategic initiatives at leading tech companies. His vision focuses on pushing the boundaries of analog and mixed-signal design.",
    experience: "20+ Years",
    projects: 50,
    clients: 100,
    expertise: [
      "Semiconductor Strategy",
      "Product Leadership",
      "Business Development",
      "Innovation Management",
    ],
    achievements: [
      "Fortune 500 Leadership",
      "20+ Patents",
      "Industry Innovation Award",
    ],
    social: {
      linkedin: "#",
      email: "gautam@analogcore.com",
    },
    milestones: [
      { year: "2003", title: "Started career in semiconductor industry" },
      { year: "2010", title: "Led first successful product launch" },
      { year: "2018", title: "Founded AnalogCore" },
      { year: "2024", title: "Expanded to global markets" },
    ],
  },
  {
    id: 2,
    name: "Prasun Bhattacharya",
    role: "Chief Technology Officer",
    tagline: "Building scalable high-speed interconnect solutions.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    bio: "Prasun is an expert in high-speed serial interfaces and analog design, with a PhD in Electrical Engineering and over 15 years of experience in developing cutting-edge silicon IP solutions.",
    experience: "15+ Years",
    projects: 40,
    clients: 80,
    expertise: [
      "SERDES",
      "PLL Design",
      "High-Speed Interfaces",
      "System Architecture",
    ],
    achievements: ["IEEE Fellow", "30+ Publications", "Keynote Speaker"],
    social: {
      linkedin: "#",
      email: "prasun@analogcore.com",
    },
    milestones: [
      { year: "2008", title: "PhD in Electrical Engineering" },
      { year: "2015", title: "Led SERDES development team" },
      { year: "2020", title: "Promoted to CTO" },
      { year: "2024", title: "Launched 112G SERDES IP" },
    ],
  },
  {
    id: 3,
    name: "Abhra Bagchi",
    role: "Chief Technologist",
    tagline: "Advancing next-generation analog IP development.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "Abhra specializes in analog and mixed-signal circuit design, with a focus on low-power and high-precision applications. His technical leadership has driven innovation across multiple product lines.",
    experience: "12+ Years",
    projects: 35,
    clients: 60,
    expertise: [
      "Analog Design",
      "Mixed-Signal",
      "Low-Power Design",
      "Precision Circuits",
    ],
    achievements: [
      "Analog Design Expert",
      "15+ Patents",
      "Technical Committee Member",
    ],
    social: {
      linkedin: "#",
      email: "abhra@analogcore.com",
    },
    milestones: [
      { year: "2011", title: "Started analog design career" },
      { year: "2016", title: "Led analog IP development" },
      { year: "2021", title: "Became Chief Technologist" },
      { year: "2024", title: "Launched precision analog portfolio" },
    ],
  },
  {
    id: 4,
    name: "Shabaaz N Syed",
    role: "Director, Custom Layout",
    tagline: "Leading precision layout engineering excellence.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    bio: "Shabaaz leads the custom layout team with over a decade of experience in physical design and verification, ensuring highest quality standards for all silicon implementations.",
    experience: "10+ Years",
    projects: 30,
    clients: 50,
    expertise: ["Custom Layout", "Physical Design", "DFM", "Verification"],
    achievements: [
      "Layout Design Expert",
      "10+ Tapeouts",
      "Quality Excellence Award",
    ],
    social: {
      linkedin: "#",
      email: "shabaaz@analogcore.com",
    },
    milestones: [
      { year: "2013", title: "Started layout engineering career" },
      { year: "2017", title: "Led custom layout team" },
      { year: "2022", title: "Promoted to Director" },
      { year: "2024", title: "Delivered 50+ successful tapeouts" },
    ],
  },
];

// Values Data
const values: ValueCard[] = [
  {
    title: "Innovation First",
    description:
      "Pushing boundaries of semiconductor technology through continuous R&D and breakthrough solutions.",
    icon: Sparkles,
  },
  {
    title: "Precision Engineering",
    description:
      "Delivering highest quality designs with meticulous attention to detail and rigorous verification.",
    icon: Target,
  },
  {
    title: "Customer Focus",
    description:
      "Partnering with clients to understand needs and deliver tailored solutions that exceed expectations.",
    icon: Users,
  },
  {
    title: "Technical Excellence",
    description:
      "Maintaining highest standards of engineering expertise and continuous learning.",
    icon: Award,
  },
];

// Stats Data
const stats: Stat[] = [
  { label: "IP Solutions", value: 50, icon: Cpu, suffix: "+" },
  { label: "Global Clients", value: 100, icon: Globe, suffix: "+" },
  { label: "Industry Experience", value: 20, icon: Clock, suffix: "+ Years" },
  { label: "Countries Served", value: 15, icon: MapPin, suffix: "+" },
];

// Technologies for marquee
const technologies = [
  "SERDES",
  "PLL",
  "RF",
  "Analog IP",
  "ASIC",
  "SoC",
  "Verification",
  "ADC",
  "DAC",
  "PMIC",
  "Clock Generation",
  "High-Speed Interfaces",
];

// Leadership Card Component
function LeadershipCard({
  leader,
  index,
  onExpand,
}: {
  leader: Leader;
  index: number;
  onExpand: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: "back.out(0.4)",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
  }, [index]);

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative cursor-pointer"
      onClick={onExpand}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
      <Card className="relative bg-white border-slate-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 group-hover:border-orange-200">
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={leader.image}
            alt={leader.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

          {/* Social Links Overlay */}
          <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <a
              href={leader.social.linkedin}
              className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-orange-500 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Linkedin className="w-4 h-4 text-white" />
            </a>
            <a
              href={`mailto:${leader.social.email}`}
              className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-orange-500 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Mail className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-1">
            {leader.name}
          </h3>
          <p className="text-sm text-orange-600 font-semibold mb-2">
            {leader.role}
          </p>
          <p className="text-sm text-slate-500 mb-4">{leader.tagline}</p>

          {/* Expertise Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {leader.expertise.slice(0, 2).map((exp, idx) => (
              <span
                key={idx}
                className="px-2 py-1 rounded-md bg-slate-100 text-xs text-slate-600"
              >
                {exp}
              </span>
            ))}
            {leader.expertise.length > 2 && (
              <span className="px-2 py-1 rounded-md bg-slate-100 text-xs text-slate-600">
                +{leader.expertise.length - 2}
              </span>
            )}
          </div>

          {/* Expand Button */}
          <button className="flex items-center gap-2 text-orange-600 font-medium text-sm group-hover:gap-3 transition-all duration-300">
            View Profile
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </Card>
    </motion.div>
  );
}

// Expanded Leader Modal
function LeaderModal({
  leader,
  onClose,
}: {
  leader: Leader | null;
  onClose: () => void;
}) {
  if (!leader) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors z-10"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>

          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Left Column - Image */}
            <div>
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Social Links */}
              <div className="flex gap-3 justify-center mt-6">
                <a
                  href={leader.social.linkedin}
                  className="p-3 rounded-xl bg-slate-100 hover:bg-orange-100 transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-slate-600 hover:text-orange-600" />
                </a>
                <a
                  href={`mailto:${leader.social.email}`}
                  className="p-3 rounded-xl bg-slate-100 hover:bg-orange-100 transition-colors"
                >
                  <Mail className="w-5 h-5 text-slate-600 hover:text-orange-600" />
                </a>
              </div>
            </div>

            {/* Right Column - Details */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                {leader.name}
              </h2>
              <p className="text-orange-600 font-semibold text-lg mb-2">
                {leader.role}
              </p>
              <p className="text-slate-500 mb-6">{leader.tagline}</p>

              <div className="bg-slate-50 rounded-xl p-4 mb-6">
                <p className="text-slate-700 leading-relaxed">{leader.bio}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900">
                    {leader.experience}
                  </p>
                  <p className="text-xs text-slate-500">Experience</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900">
                    {leader.projects}+
                  </p>
                  <p className="text-xs text-slate-500">Projects</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900">
                    {leader.clients}+
                  </p>
                  <p className="text-xs text-slate-500">Clients</p>
                </div>
              </div>

              {/* Expertise */}
              <div className="mb-6">
                <h4 className="font-semibold text-slate-900 mb-3">
                  Core Expertise
                </h4>
                <div className="flex flex-wrap gap-2">
                  {leader.expertise.map((exp, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-orange-50 text-orange-700 text-sm font-medium"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Milestones */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">
                  Career Milestones
                </h4>
                <div className="space-y-3">
                  {leader.milestones.map((milestone, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-orange-500 mt-2" />
                      <div>
                        <span className="text-sm font-semibold text-orange-600">
                          {milestone.year}
                        </span>
                        <p className="text-sm text-slate-600">
                          {milestone.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Value Card Component
function ValueCardComponent({
  value,
  index,
}: {
  value: ValueCard;
  index: number;
}) {
  const Icon = value.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
  }, [index]);

  return (
    <motion.div ref={cardRef} whileHover={{ y: -5 }} className="group relative">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
      <Card className="relative bg-white border-slate-200 rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 group-hover:border-orange-200">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-8 h-8 text-orange-600" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">{value.title}</h3>
        <p className="text-sm text-slate-600">{value.description}</p>
      </Card>
    </motion.div>
  );
}

// Animated Counter Component
function AnimatedCounter({
  value,
  suffix = "",
  label,
  icon: Icon,
}: {
  value: number;
  suffix?: string;
  label: string;
  icon: any;
}) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const duration = 2000;
          const increment = value / (duration / 16);

          const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);

          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={counterRef} className="text-center group">
      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-8 h-8 text-orange-600" />
      </div>
      <p className="text-4xl font-bold text-slate-900 mb-1">
        {count}
        {suffix}
      </p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
}

// Main Page Component
export default function LeadershipPage() {
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero title animation
      gsap.fromTo(
        ".hero-title",
        { opacity: 0, y: 50, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 30, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          delay: 0.4,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        ".hero-badge",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: 0.6,
          ease: "back.out(0.4)",
        },
      );

      // Floating particles animation
      gsap.to(".floating-particle", {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.1,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      <main className="bg-white overflow-x-hidden">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
        >
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-3xl" />
            </div>

            {/* Grid Pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0v30h30M0 30h30v30' stroke='%2300ffff' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
                backgroundSize: "30px 30px",
              }}
            />

            {/* Floating Particles */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="floating-particle absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>

          <motion.div
            style={{ opacity, scale }}
            className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-center relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-semibold text-white">
                Executive Leadership
              </span>
            </motion.div>

            <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Leadership
            </h1>

            <p className="hero-subtitle text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Meet the visionary leaders driving innovation in semiconductor and
              analog technology.
            </p>
          </motion.div>
        </section>

        {/* Introduction Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                Our executive management team brings decades of expertise in
                semiconductor IC development and product innovation, combining
                technical excellence with strategic vision to deliver
                world-class solutions across diverse industries.
              </p>
              <div className="w-20 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mt-8" />
            </motion.div>
          </div>
        </section>

        {/* Leadership Grid Section */}
        <section className="py-20 bg-gradient-to-b from-white to-slate-50">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {leaders.map((leader, index) => (
                <LeadershipCard
                  key={leader.id}
                  leader={leader}
                  index={index}
                  onExpand={() => setSelectedLeader(leader)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Company Values Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Principles that guide our decisions and define our culture
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <ValueCardComponent key={index} value={value} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Achievement Stats Section */}
        <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    label={stat.label}
                    icon={stat.icon}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Marquee */}
        <section className="py-8 bg-slate-100 overflow-hidden">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-transparent to-slate-100 z-10" />
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="flex gap-8 whitespace-nowrap py-4"
            >
              {[...technologies, ...technologies].map((tech, i) => (
                <span
                  key={i}
                  className="text-slate-600 font-medium px-4 py-2 bg-white rounded-full shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Culture & Vision Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                      alt="Team collaboration"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-200">
                  <Sparkles className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-semibold text-orange-600">
                    Our Vision
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                  Shaping the Future of Semiconductor Technology
                </h2>

                <p className="text-lg text-slate-600 leading-relaxed">
                  At AnalogCore, we're committed to pushing the boundaries of
                  what's possible in analog and mixed-signal design. Our team of
                  passionate engineers and innovators works tirelessly to
                  develop solutions that power the next generation of
                  technology.
                </p>

                <div className="pt-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        Mission Statement
                      </h4>
                      <p className="text-slate-600">
                        To deliver world-class semiconductor IP solutions that
                        enable our customers to innovate and succeed.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        Innovation Philosophy
                      </h4>
                      <p className="text-slate-600">
                        Continuous investment in R&D and pushing the boundaries
                        of analog design.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Leader Modal */}
      <LeaderModal
        leader={selectedLeader}
        onClose={() => setSelectedLeader(null)}
      />
    </>
  );
}
