"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowRight,
  Check,
  Download,
  Shield,
  Cpu,
  Zap,
  Clock,
  Award,
  TrendingUp,
  Sparkles,
  Mail,
  Phone,
  FileText,
  User,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Form validation schema
const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
});

type FormData = z.infer<typeof formSchema>;

const productData: Record<string, any> = {
  "serdes-ip": {
    name: "SERDES IP",
    category: "Silicon IP",
    tagline: "High-Speed Serial Deserializer Technology",
    description:
      "Enterprise-grade SERDES IP for ultra-fast data communication interfaces with industry-leading power efficiency.",
    fullDescription:
      "Our SERDES IP delivers exceptional performance for next-generation data centers and high-speed computing applications. With support for multiple protocols and advanced equalization techniques, it ensures reliable data transmission at unprecedented speeds.",
    image:
      "https://images.unsplash.com/photo-1581092335871-5d4a5d9d6f8c?w=1200&h=800&fit=crop",
    icon: Cpu,
    gradient: "from-blue-500 to-cyan-500",
    features: [
      "Up to 112 Gbps data rate per lane",
      "Sub-0.5 mW/Gbps power consumption",
      "Multi-protocol support (PCIe, Ethernet, USB, MIPI)",
      "Integrated eye monitor for signal analysis",
      "Advanced adaptive equalization",
      "Temperature compensated design",
      "Low latency architecture (<10 cycles)",
      "Full duplex support with echo cancellation",
    ],
    specs: {
      "Data Rate": "Up to 112 Gbps",
      "Protocol Support": "PCIe 6.0, 100G Ethernet, USB4, MIPI C/D-PHY",
      "Power Consumption": "< 0.5 mW/Gbps",
      Latency: "< 10 clock cycles",
      "Process Node": "7nm, 5nm, 3nm",
      "Temperature Range": "-40°C to 125°C",
      "Supply Voltage": "0.8V - 1.2V",
      BER: "< 1e-15",
    },
    applications: [
      {
        name: "Data Centers",
        description: "High-speed interconnects for cloud computing",
        icon: Cpu,
      },
      {
        name: "5G Base Stations",
        description: "Front-haul and back-haul communications",
        icon: Zap,
      },
      {
        name: "AI Accelerators",
        description: "High-bandwidth chip-to-chip links",
        icon: TrendingUp,
      },
      {
        name: "Network Switches",
        description: "Terabit Ethernet switching fabric",
        icon: Shield,
      },
    ],
    benefits: [
      "Reduces system power by 40%",
      "Increases bandwidth density by 2x",
      "Simplifies board design with integrated termination",
      "Enables longer channel reach",
    ],
  },
  "rf-beamformers": {
    name: "PLL Systems",
    category: "Silicon IP",
    tagline: "Next-Generation Phase-Locked Loops",
    description:
      "Advanced PLL technology for precision clock generation and synchronization with sub-picosecond jitter.",
    fullDescription:
      "Our PLL Systems deliver exceptional frequency synthesis and clock generation capabilities for demanding applications. With industry-leading jitter performance and wide frequency range, they enable system-level synchronization with unprecedented precision.",
    image:
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1200&h=800&fit=crop",
    icon: Zap,
    gradient: "from-purple-500 to-pink-500",
    features: [
      "Sub-picosecond jitter performance (<0.5ps RMS)",
      "Wide frequency tuning range (100MHz - 10GHz)",
      "Fast lock time < 1μs",
      "Integrated programmable dividers",
      "Low power consumption (<5mW)",
      "Digital control interface (I2C/SPI)",
      "Temperature and process compensation",
      "Multiple output formats (LVDS, CML, HCSL)",
    ],
    specs: {
      "Jitter (RMS)": "< 0.5 ps",
      "Frequency Range": "100 MHz - 10 GHz",
      "Lock Time": "< 1 μs",
      "Power Dissipation": "< 5 mW",
      "Process Node": "7nm, 5nm",
      "Voltage Range": "0.8V - 1.2V",
      "Phase Noise": "-110 dBc/Hz @ 1MHz",
      Spurious: "< -70 dBc",
    },
    applications: [
      {
        name: "Clock Generation",
        description: "System reference clock synthesis",
        icon: Clock,
      },
      {
        name: "Frequency Synthesis",
        description: "Flexible frequency generation",
        icon: TrendingUp,
      },
      {
        name: "Timing Recovery",
        description: "CDR for serial links",
        icon: Zap,
      },
      {
        name: "RF Systems",
        description: "Local oscillator generation",
        icon: Shield,
      },
    ],
    benefits: [
      "Improves system timing margin",
      "Reduces external components",
      "Enables dynamic frequency scaling",
      "Provides fail-safe clock switching",
    ],
  },
};

// Document Download Form Component
function DocumentDownloadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCaptchaChecked, setIsCaptchaChecked] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);
  const inputRefs = useRef<(HTMLDivElement | null)[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    // GSAP stagger animation for form fields
    inputRefs.current.forEach((input, index) => {
      if (!input) return;

      gsap.fromTo(
        input,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          delay: index * 0.1,
          ease: "power2.out",
        },
      );
    });
  }, []);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Form submitted:", data);
    setIsSuccess(true);
    setIsSubmitting(false);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
      reset();
      setIsCaptchaChecked(false);
    }, 3000);
  };

  const handleDownloadPDF = () => {
    // Simulate PDF download
    const link = document.createElement("a");
    link.href = "/docs/FD3R411_Short_Datasheet.pdf";
    link.download = "FD3R411_Short_Datasheet.pdf";
    link.click();
  };

  return (
    <motion.div
      ref={formRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden relative"
    >
      {/* Decorative abstract lines */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none">
          <path
            d="M0,0 L100,0 L100,100"
            stroke="currentColor"
            strokeWidth="1"
            className="text-blue-600"
          />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-32 opacity-10 pointer-events-none transform rotate-180">
        <svg viewBox="0 0 100 100" fill="none">
          <path
            d="M0,0 L100,0 L100,100"
            stroke="currentColor"
            strokeWidth="1"
            className="text-blue-600"
          />
        </svg>
      </div>

      <div className="p-6 md:p-8">
        {/* PDF Download Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Download Data Sheet Briefs
          </h3>
          <motion.div
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownloadPDF}
            className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-orange-200 hover:bg-orange-50/30 cursor-pointer transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-slate-800 group-hover:text-orange-600 transition-colors">
                FD3R411_Short_Datasheet.pdf
              </p>
              <p className="text-sm text-slate-500">Click to download</p>
            </div>
            <Download className="w-5 h-5 text-slate-400 group-hover:text-orange-500 transition-colors" />
          </motion.div>
        </div>

        <div className="h-px bg-slate-200 my-6" />

        {/* Form Section */}
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">
            Get The Documents
          </h3>
          <p className="text-slate-500 mb-6">
            We will send you the documents by email.
          </p>

          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-green-50 border border-green-200 rounded-xl p-6 text-center"
              >
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h4 className="text-lg font-semibold text-green-800 mb-2">
                  Request Sent!
                </h4>
                <p className="text-green-600">
                  We'll send the documents to your email shortly.
                </p>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* Full Name */}
                <div
                  ref={(el) => {
                    inputRefs.current[0] = el;
                  }}
                >
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      {...register("fullName")}
                      type="text"
                      placeholder="John Doe"
                      className={`w-full pl-9 pr-4 py-3 rounded-xl border ${
                        errors.fullName
                          ? "border-red-500 focus:ring-red-500"
                          : "border-slate-200 focus:ring-orange-500"
                      } focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300`}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.fullName && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-xs text-red-500 mt-1 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {errors.fullName.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email */}
                <div
                  ref={(el) => {
                    inputRefs.current[1] = el;
                  }}
                >
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="john@company.com"
                      className={`w-full pl-9 pr-4 py-3 rounded-xl border ${
                        errors.email
                          ? "border-red-500 focus:ring-red-500"
                          : "border-slate-200 focus:ring-orange-500"
                      } focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300`}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-xs text-red-500 mt-1 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {errors.email.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Phone Number */}
                <div
                  ref={(el) => {
                    inputRefs.current[2] = el;
                  }}
                >
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      {...register("phone")}
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className={`w-full pl-9 pr-4 py-3 rounded-xl border ${
                        errors.phone
                          ? "border-red-500 focus:ring-red-500"
                          : "border-slate-200 focus:ring-orange-500"
                      } focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300`}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.phone && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-xs text-red-500 mt-1 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {errors.phone.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* reCAPTCHA Mock */}
                <div className="pt-2">
                  <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setIsCaptchaChecked(!isCaptchaChecked)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                          isCaptchaChecked
                            ? "bg-orange-500 border-orange-500"
                            : "border-slate-400 hover:border-orange-400"
                        }`}
                      >
                        {isCaptchaChecked && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </button>
                      <span className="text-sm text-slate-700">
                        I'm not a robot
                      </span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              g
                            </span>
                          </div>
                          <span className="text-xs text-slate-500">
                            reCAPTCHA
                          </span>
                        </div>
                        <span className="text-xs text-slate-400">
                          Privacy - Terms
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || !isCaptchaChecked}
                  whileHover={
                    !isSubmitting && isCaptchaChecked ? { scale: 1.02 } : {}
                  }
                  whileTap={
                    !isSubmitting && isCaptchaChecked ? { scale: 0.98 } : {}
                  }
                  className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
                    isSubmitting || !isCaptchaChecked
                      ? "bg-slate-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-lg hover:shadow-orange-500/25 hover:-translate-y-0.5"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Contact Us
                      <Send className="w-4 h-4" />
                    </span>
                  )}
                </motion.button>

                <p className="text-xs text-slate-400 text-center mt-4">
                  No spam guaranteed. We respect your privacy.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = productData[slug];

  const [activeTab, setActiveTab] = useState("features");
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<(HTMLDivElement | null)[]>([]);
  const formSectionRef = useRef<HTMLDivElement>(null);

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

      // Form section animation
      gsap.fromTo(
        formSectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formSectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Features staggered animation
      featuresRef.current.forEach((feature, index) => {
        if (!feature) return;

        gsap.fromTo(
          feature,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            delay: index * 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: feature,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Product Not Found
            </h1>
            <p className="text-slate-600 mb-6">
              The product you are looking for does not exist.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold"
            >
              Back to Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const Icon = product.icon;

  return (
    <>
      <Navbar />
      <main
        ref={sectionRef}
        className="bg-gradient-to-b from-slate-50 via-white to-slate-50"
      >
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
            <div
              className={`absolute inset-0 bg-gradient-to-r ${product.gradient} opacity-10`}
            />
          </div>

          <div
            ref={heroRef}
            className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 shadow-sm mb-6">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
                    {product.category}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  {product.name}
                </h1>

                <p className="text-xl md:text-2xl text-slate-600 mb-4">
                  {product.tagline}
                </p>

                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  {product.description}
                </p>

                {/* <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    className={`bg-gradient-to-r ${product.gradient} hover:opacity-90 text-white font-semibold py-6 px-8 rounded-xl shadow-lg`}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Datasheet
                  </Button>
                  <Button
                    variant="outline"
                    className="border-slate-300 py-6 px-8 rounded-xl font-semibold"
                  >
                    Request Demo
                  </Button>
                </div> */}
              </div>

              {/* Right Image */}
              <div className="relative">
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${product.gradient} rounded-2xl blur-3xl opacity-30`}
                />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${product.gradient} mix-blend-multiply opacity-20`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="py-12 sticky top-0 bg-white/95 backdrop-blur-md z-20 border-b border-slate-200">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <div className="flex flex-wrap gap-4 justify-center">
              {["features", "specifications", "applications", "benefits"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 capitalize ${
                      activeTab === tab
                        ? `bg-gradient-to-r ${product.gradient} text-white shadow-lg`
                        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    {tab}
                  </button>
                ),
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        {activeTab === "features" && (
          <section className="py-20">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
                Key Features
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature: string, idx: number) => (
                  <div
                    key={idx}
                    ref={(el) => {
                      featuresRef.current[idx] = el;
                    }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200 hover:shadow-lg transition-all duration-300"
                  >
                    <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-700">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Specifications Section */}
        {activeTab === "specifications" && (
          <section className="py-20">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
                Technical Specifications
              </h2>

              <Card className="bg-white border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <tbody>
                      {Object.entries(product.specs).map(
                        ([key, value], idx) => (
                          <tr
                            key={key}
                            className={`border-b border-slate-100 ${idx % 2 === 0 ? "bg-slate-50/50" : ""}`}
                          >
                            <td className="py-4 px-6 font-semibold text-slate-900 w-1/3">
                              {key}
                            </td>
                            <td className="py-4 px-6 text-slate-600">
                              {value as string}
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Applications Section */}
        {activeTab === "applications" && (
          <section className="py-20">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
                Use Cases & Applications
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {product.applications.map((app: any, idx: number) => {
                  const AppIcon = app.icon;
                  return (
                    <Card
                      key={idx}
                      className="bg-white border-slate-200 text-center p-6 hover:shadow-xl transition-all duration-300 group"
                    >
                      <div
                        className={`w-16 h-16 rounded-xl bg-gradient-to-r ${product.gradient} flex items-center justify-center mx-auto mb-4 shadow-lg transform transition-transform duration-300 group-hover:scale-110`}
                      >
                        <AppIcon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2">
                        {app.name}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {app.description}
                      </p>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Benefits Section */}
        {activeTab === "benefits" && (
          <section className="py-20">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
                Key Benefits
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.benefits.map((benefit: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-6 rounded-xl bg-gradient-to-r from-white to-slate-50 border border-slate-200"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${product.gradient} flex items-center justify-center flex-shrink-0`}
                    >
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-slate-800 font-medium">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Document Download Form Section */}
        <div
          ref={formSectionRef}
          className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl py-20"
        >
          <DocumentDownloadForm />
        </div>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Integrate {product.name}?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Contact our sales team for licensing, custom implementations, and
              technical support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-slate-900 hover:bg-slate-100 font-semibold py-6 px-8 rounded-xl shadow-lg">
                Get a Quote
              </Button>
              <Button className="bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 font-semibold py-6 px-8 rounded-xl">
                Schedule Demo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
