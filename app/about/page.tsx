"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Send,
  Clock,
  CheckCircle,
  Globe,
  Linkedin,
  Twitter,
  Facebook,
  ArrowRight,
  User,
  Building,
  MessageSquare,
  Target,
  Cpu,
  Lightbulb,
  Users,
  Award,
  Zap,
  Shield,
  TrendingUp,
  Briefcase,
  Heart,
  Eye,
  Github,
  Youtube,
  Navigation,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Trusted Clients / Partners with proper image URLs
const trustedClients = [
  {
    name: "Tesla",
    category: "Automotive",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png",
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
  },
  {
    name: "Bosch",
    category: "Automotive",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Bosch_logo.svg",
    color: "from-blue-600 to-blue-700",
    bgColor: "bg-blue-50",
  },
  {
    name: "Siemens",
    category: "Industrial",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Siemens_logo.svg",
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50",
  },
  {
    name: "Amazon Web Services",
    category: "IoT",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    color: "from-orange-500 to-amber-600",
    bgColor: "bg-orange-50",
  },
  {
    name: "Microsoft",
    category: "IoT",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
  },
  {
    name: "Samsung",
    category: "Consumer",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
    color: "from-blue-700 to-cyan-600",
    bgColor: "bg-blue-50",
  },
  {
    name: "General Electric",
    category: "Industrial",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f7/General_Electric_logo.svg",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    name: "Honeywell",
    category: "Industrial",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Honeywell_logo.svg",
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
  },
  {
    name: "Texas Instruments",
    category: "Semiconductor",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Texas_Instruments_logo.svg",
    color: "from-yellow-600 to-amber-600",
    bgColor: "bg-yellow-50",
  },
  {
    name: "Infineon",
    category: "Semiconductor",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Infineon_Logo.svg",
    color: "from-green-600 to-emerald-600",
    bgColor: "bg-green-50",
  },
  {
    name: "STMicroelectronics",
    category: "Semiconductor",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6b/STMicroelectronics_logo.svg",
    color: "from-blue-600 to-cyan-600",
    bgColor: "bg-blue-50",
  },
  {
    name: "NXP Semiconductors",
    category: "Semiconductor",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/8e/NXP_Semiconductors_logo.svg",
    color: "from-purple-600 to-pink-600",
    bgColor: "bg-purple-50",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const expertiseRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const clientsRef = useRef<HTMLDivElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  const filteredClients =
    activeCategory === "All"
      ? trustedClients
      : trustedClients.filter((client) => client.category === activeCategory);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
        },
      );

      // About section animations
      gsap.fromTo(
        aboutRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        missionRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: missionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        expertiseRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: expertiseRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        storyRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          scrollTrigger: {
            trigger: storyRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Clients section animation
      gsap.fromTo(
        clientsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: clientsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Form and info animations
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: -30, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "back.out(0.4)",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        infoRef.current,
        { opacity: 0, x: 30, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.5,
          ease: "back.out(0.4)",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Map animation
      gsap.fromTo(
        mapRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          scrollTrigger: {
            trigger: mapRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // CTA animation
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      <main
        ref={sectionRef}
        className="bg-gradient-to-b from-slate-50 via-white to-slate-50"
      >
        {/* About Company Section with Images */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            {/* Section Header */}
            <div ref={aboutRef} className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 mb-4">
                <Briefcase className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-semibold text-indigo-700">
                  About Company
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Powering the Future of Analog Innovation
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                AnalogChips is a premier provider of high-performance analog and
                mixed-signal semiconductor solutions
              </p>
            </div>

            {/* Hero Image */}
            <div className="mb-12 rounded-2xl overflow-hidden shadow-xl">
              <div className="relative h-96 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&h=500&fit=crop"
                  alt="AnalogChips Office"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20" />
              </div>
            </div>

            {/* Mission & Expertise Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Mission */}
              <div ref={missionRef} className="group">
                <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-2xl" />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                      <Target className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-3">
                      Our Mission
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      To empower engineers with precision analog solutions that
                      bridge the gap between physical and digital worlds,
                      enabling smarter, more efficient systems across
                      automotive, industrial, and consumer electronics.
                    </p>
                  </div>
                </div>
              </div>

              {/* Expertise */}
              <div ref={expertiseRef} className="group">
                <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-2xl" />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                      <Cpu className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-3">
                      Semiconductor Expertise
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      Specializing in high-precision analog, mixed-signal, and
                      power management ICs with proven expertise in data
                      converters, operational amplifiers, and custom ASIC
                      solutions for mission-critical applications.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Story & Innovation with Images */}
            <div
              ref={storyRef}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div className="bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=300&fit=crop"
                    alt="Team collaboration"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">
                      Our Story
                    </h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Founded in 2015 by a team of analog design veterans from
                    Texas Instruments and Analog Devices, AnalogChips has grown
                    into a trusted partner for automotive, industrial, medical,
                    and communications industries worldwide.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    Our headquarters in Bengaluru, India, houses
                    state-of-the-art design centers and characterization labs,
                    enabling us to deliver cutting-edge analog solutions that
                    push the boundaries of what's possible.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src="https://www.gasworld.com/wp-content/files/gwml/semiconductor_494012.jpg"
                    alt="Semiconductor innovation"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">
                      Semiconductor Innovation
                    </h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    We're pioneering the integration of on-chip machine learning
                    capabilities that enable our analog ICs to self-calibrate in
                    real-time, compensate for temperature and aging effects.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "AI-Enhanced ADC",
                      "Smart Power ICs",
                      "Adaptive Filters",
                      "Self-Calibrating",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-slate-100 text-sm text-slate-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Company Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  label: "Years of Excellence",
                  value: "9+",
                  icon: Award,
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  label: "Expert Engineers",
                  value: "200+",
                  icon: Users,
                  color: "from-purple-500 to-pink-500",
                },
                {
                  label: "Global Patents",
                  value: "50+",
                  icon: Shield,
                  color: "from-emerald-500 to-teal-500",
                },
                {
                  label: "Countries Served",
                  value: "40+",
                  icon: Globe,
                  color: "from-orange-500 to-red-500",
                },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className="text-center p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mx-auto mb-3`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-slate-800">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-500">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Trusted By / Clients Section */}
        <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <div ref={clientsRef} className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 shadow-sm mb-4">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
                  Trusted By Industry Leaders
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Our Valued Partners & Clients
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Join the ranks of innovative companies that rely on our analog
                semiconductor solutions
              </p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {[
                "All",
                "Automotive",
                "Industrial",
                "IoT",
                "Consumer",
                "Semiconductor",
              ].map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md"
                      : "bg-white border border-slate-200 text-slate-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Client Logos Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-12">
              {filteredClients.map((client, idx) => (
                <div
                  key={idx}
                  className="client-logo group relative animate-in fade-in duration-500"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${client.color} rounded-xl blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                  />
                  <div
                    className={`relative ${client.bgColor} rounded-xl p-4 border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
                  >
                    <div className="h-12 flex items-center justify-center">
                      <div className="relative w-16 h-8">
                        <div className="text-xs font-semibold text-slate-700 text-center">
                          {client.name}
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-2">
                      <span className="text-xs text-slate-400">
                        {client.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white text-center">
              <div className="max-w-2xl mx-auto">
                <div className="text-4xl mb-3">"</div>
                <p className="text-lg md:text-xl leading-relaxed mb-4">
                  AnalogChips has been an invaluable partner in our EV
                  development. Their precision analog solutions have
                  significantly improved our battery management system's
                  performance and reliability.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold">Sarah Chen</div>
                    <div className="text-sm text-blue-100">
                      Engineering Director, Tesla
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section with Map */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div ref={formRef}>
                <Card className="bg-white border-slate-200 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                  <div className="p-6 md:p-8">
                    <div className="mb-6">
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                        Send us a Message
                      </h2>
                      <p className="text-slate-600">
                        Fill out the form below and we'll get back to you within
                        24 hours
                      </p>
                    </div>

                    {submitted && (
                      <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 animate-in slide-in-from-top-2">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <p className="text-green-700 font-medium">
                            Thank you! We'll get back to you soon.
                          </p>
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Full Name *
                          </label>
                          <div
                            className={`relative transition-all duration-300 ${
                              focusedField === "name" ? "scale-[1.02]" : ""
                            }`}
                          >
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              onFocus={() => setFocusedField("name")}
                              onBlur={() => setFocusedField(null)}
                              placeholder="John Doe"
                              className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Email *
                          </label>
                          <div
                            className={`relative transition-all duration-300 ${
                              focusedField === "email" ? "scale-[1.02]" : ""
                            }`}
                          >
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              onFocus={() => setFocusedField("email")}
                              onBlur={() => setFocusedField(null)}
                              placeholder="john@company.com"
                              className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Phone
                          </label>
                          <div
                            className={`relative transition-all duration-300 ${
                              focusedField === "phone" ? "scale-[1.02]" : ""
                            }`}
                          >
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              onFocus={() => setFocusedField("phone")}
                              onBlur={() => setFocusedField(null)}
                              placeholder="+91 XXXXX XXXXX"
                              className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Company
                          </label>
                          <div
                            className={`relative transition-all duration-300 ${
                              focusedField === "company" ? "scale-[1.02]" : ""
                            }`}
                          >
                            <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              onFocus={() => setFocusedField("company")}
                              onBlur={() => setFocusedField(null)}
                              placeholder="Your Company"
                              className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Message *
                        </label>
                        <div
                          className={`relative transition-all duration-300 ${
                            focusedField === "message" ? "scale-[1.02]" : ""
                          }`}
                        >
                          <MessageSquare className="absolute left-3 top-4 w-4 h-4 text-slate-400" />
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            onFocus={() => setFocusedField("message")}
                            onBlur={() => setFocusedField(null)}
                            placeholder="Tell us about your project or inquiry..."
                            rows={5}
                            className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                            required
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 group"
                      >
                        <span className="flex items-center justify-center gap-2">
                          Send Message
                          <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </span>
                      </Button>
                    </form>
                  </div>
                </Card>
              </div>

              {/* Contact Info & Map */}
              <div>
                {/* Address Card */}
                <div ref={infoRef} className="mb-6">
                  <Card className="bg-white border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Building className="w-5 h-5 text-blue-600" />
                        Our Office
                      </h3>

                      <div className="space-y-4">
                        <div className="flex items-start gap-3 group">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                            <MapPin className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-500 mb-1">
                              Address
                            </p>
                            <p className="text-slate-800 font-medium leading-relaxed">
                              No. 197, 7th A Main,
                              <br />
                              Kalyan HBCS, Hampinagar,
                              <br />
                              Bengaluru – 560104,
                              <br />
                              Karnataka, India
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 group">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                            <Phone className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-500 mb-1">Phone</p>
                            <a
                              href="tel:+91XXXXXXXXX"
                              className="text-slate-800 font-medium hover:text-blue-600 transition-colors"
                            >
                              +91 XXXXX XXXXX
                            </a>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 group">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                            <Mail className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-500 mb-1">Email</p>
                            <a
                              href="mailto:sales@analog-chips.com"
                              className="text-slate-800 font-medium hover:text-blue-600 transition-colors break-all"
                            >
                              sales@analog-chips.com
                            </a>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 group">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                            <Globe className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-500 mb-1">
                              Website
                            </p>
                            <a
                              href="https://www.analog-chips.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-800 font-medium hover:text-blue-600 transition-colors"
                            >
                              www.analog-chips.com
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Map Card */}
                <div ref={mapRef}>
                  <Card className="bg-white border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Navigation className="w-5 h-5 text-blue-600" />
                        Find Us Here
                      </h3>
                      <div className="relative w-full h-64 md:h-72 rounded-xl overflow-hidden bg-slate-100">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.876789456789!2d77.556789!3d12.978789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae167c5b5b5b5b%3A0x5b5b5b5b5b5b5b5b!2sHampinagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                          title="AnalogChips Office Location"
                        />
                      </div>
                      <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Mon-Fri: 9:00 AM - 6:00 PM IST
                        </span>
                        <button
                          onClick={() =>
                            window.open(
                              "https://maps.google.com/?q=Hampinagar+Bengaluru",
                              "_blank",
                            )
                          }
                          className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                        >
                          Get Directions
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Response Time Card */}
                <Card className="bg-white border-slate-200 shadow-xl mt-6">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      Response Time
                    </h3>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">
                          Fast Response
                        </p>
                        <p className="text-sm text-slate-600">
                          Within 24 hours on business days
                        </p>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs font-medium text-green-700">
                        Available for immediate inquiries
                      </span>
                    </div>
                  </div>
                </Card>

                {/* Social Links */}
                <div className="mt-6 flex gap-3">
                  {[
                    { icon: Linkedin, href: "#", color: "bg-blue-600" },
                    { icon: Twitter, href: "#", color: "bg-sky-500" },
                    { icon: Facebook, href: "#", color: "bg-blue-700" },
                    { icon: Github, href: "#", color: "bg-gray-800" },
                    { icon: Youtube, href: "#", color: "bg-red-600" },
                  ].map((social, idx) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={idx}
                        href={social.href}
                        className={`w-10 h-10 rounded-xl ${social.color} flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <div ref={ctaRef}>
              <Card className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 overflow-hidden relative group">
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                <div className="relative p-8 md:p-12 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                    <Zap className="w-4 h-4 text-white" />
                    <span className="text-sm font-semibold text-white">
                      Let's Collaborate
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                    Ready to Innovate Together?
                  </h2>

                  <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
                    Whether you need custom analog IP, semiconductor solutions,
                    or technical consultation, our team of experts is ready to
                    help bring your vision to life.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() =>
                        document
                          .querySelector("form")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="px-8 py-3 rounded-xl bg-white text-blue-600 font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 group"
                    >
                      Get In Touch
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </button>
                    <button
                      onClick={() =>
                        (window.location.href = "mailto:sales@analog-chips.com")
                      }
                      className="px-8 py-3 rounded-xl bg-white/20 backdrop-blur-sm text-white font-semibold border border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Email Us Directly
                    </button>
                  </div>

                  <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-blue-100">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      <span>ISO Certified</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4" />
                      <span>Industry Expertise</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span>Trusted Partner</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Quick Response Indicator */}
        <section className="py-8">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-green-50 border border-green-200 shadow-sm">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-green-700">
                  🚀 Quick Response | Average reply time: 4 hours
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
