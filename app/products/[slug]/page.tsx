"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import {
  ArrowRight,
  Cpu,
  Zap,
  Shield,
  Microchip,
  Target,
  Sparkles,
  CheckCircle,
  Battery,
  Radio,
  GitBranch,
  Layers,
  Wifi,
  Home,
  Briefcase,
  Mail,
  Phone,
  MapPin,
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

// Product data - Supporting multiple slug variations
const productsData: Record<string, any> = {
  // PMIC
  pmic: {
    id: "pmic",
    name: "PMIC",
    fullName: "Power Management ICs",
    category: "Power Management",
    description:
      "High-efficiency power management ICs with integrated protection for automotive and industrial applications.",
    longDescription:
      "Our PMIC portfolio includes buck/boost converters, LDO regulators, battery management systems, and power sequencing solutions. Designed for automotive (AEC-Q100) and industrial grade applications with 92% peak efficiency. The devices feature wide input voltage ranges, high output current capabilities, and comprehensive protection features including over-voltage, over-current, short-circuit, and thermal shutdown protection.",
    specs: [
      { label: "Efficiency", value: "92% Peak" },
      { label: "Input Voltage", value: "2.7V - 40V" },
      { label: "Output Current", value: "Up to 10A" },
      { label: "Switching Frequency", value: "500kHz - 2MHz" },
      { label: "Protection", value: "OVP, OCP, SCP, Thermal" },
      { label: "Qualification", value: "AEC-Q100" },
    ],
    applications: [
      "Electric Vehicle Power Management",
      "Industrial Automation Systems",
      "Consumer Electronics",
      "Telecom Infrastructure",
      "Medical Devices",
      "Renewable Energy Systems",
    ],
    features: [
      "High-efficiency synchronous buck/boost converters",
      "Low-dropout (LDO) regulators with ultra-low noise",
      "Battery management and charging solutions",
      "Power sequencing and voltage monitoring",
      "I2C/PMBus interface for digital control",
      "Wide temperature range: -40°C to 125°C",
    ],
    image:
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=600&fit=crop",
    icon: Battery,
    gradient: "from-blue-500 to-cyan-500",
    lightGradient: "from-blue-50 to-cyan-50",
    color: "blue",
  },

  // ADC/DAC
  "adc-dac": {
    id: "adc-dac",
    name: "ADC/DAC",
    fullName: "Data Converters",
    category: "Data Conversion",
    description:
      "Precision analog-to-digital and digital-to-analog converters for high-fidelity signal processing.",
    longDescription:
      "Industry-leading ADC/DAC solutions with 16-bit resolution at 10 GSPS, setting new standards for precision and speed in data conversion applications. Our data converters feature ultra-low noise, high linearity, and low power consumption, making them ideal for demanding applications in communications, test and measurement, and defense systems.",
    specs: [
      { label: "Resolution", value: "16-bit" },
      { label: "Sample Rate", value: "10 GSPS" },
      { label: "SNR", value: "78dBFS" },
      { label: "INL", value: "<0.1%" },
      { label: "Power", value: "1.5W" },
      { label: "Interface", value: "JESD204B/C" },
    ],
    applications: [
      "Wireless Communications (5G/6G)",
      "Test & Measurement Equipment",
      "Radar & Electronic Warfare",
      "Medical Imaging",
      "Software Defined Radio",
      "Satellite Communications",
    ],
    features: [
      "16-bit resolution with <0.1% INL",
      "10 GSPS sampling rate",
      "SNR: 78dBFS, SFDR: 85dBc",
      "Low power consumption: 1.5W",
      "JESD204B/C high-speed serial interface",
      "Digital down-conversion (DDC) options",
    ],
    image:
      "https://images.unsplash.com/photo-1581092335871-4d6e2e1b0a5a?w=800&h=600&fit=crop",
    icon: Radio,
    gradient: "from-emerald-500 to-teal-500",
    lightGradient: "from-emerald-50 to-teal-50",
    color: "emerald",
  },

  // SERDES
  serdes: {
    id: "serdes",
    name: "SERDES",
    fullName: "Serializer/Deserializer",
    category: "Connectivity",
    description:
      "High-speed serial interface solutions for data communication and video transmission.",
    longDescription:
      "Multi-protocol SERDES IP supporting 3.125 Gbps data rates for high-bandwidth video, networking, and inter-chip communication with low EMI and cable equalization. Our SERDES solutions feature spread spectrum clocking, adaptive equalization, and low power consumption.",
    specs: [
      { label: "Data Rate", value: "3.125 Gbps" },
      { label: "Protocols", value: "Multi-Protocol" },
      { label: "SSC Support", value: "Yes" },
      { label: "Cable EQ", value: "Adaptive" },
      { label: "Power", value: "<100mW" },
      { label: "BER", value: "<1e-12" },
    ],
    applications: [
      "Automotive Camera Systems",
      "Infotainment & Display",
      "Industrial Networking",
      "Video Transmission",
      "High-speed Backplanes",
      "FPGA/ASIC Interfaces",
    ],
    features: [
      "Data rate: 3.125 Gbps per lane",
      "Supports multiple protocols (LVDS, MIPI, HDMI)",
      "Spread Spectrum Clocking (SSC)",
      "Adaptive cable equalization",
      "Low EMI emission",
      "Built-in self-test (BIST)",
    ],
    image:
      "https://images.unsplash.com/photo-1581092335871-5d4a5d9d6f8c?w=800&h=600&fit=crop",
    icon: GitBranch,
    gradient: "from-purple-500 to-pink-500",
    lightGradient: "from-purple-50 to-pink-50",
    color: "purple",
  },

  // Embedded Systems (supports multiple slug variations)
  "embedded-systems": {
    id: "embedded-systems",
    name: "Embedded Systems",
    fullName: "Embedded Processors",
    category: "Embedded",
    description:
      "ARM Cortex-M based embedded processors with integrated analog peripherals.",
    longDescription:
      "ARM Cortex-M based embedded processors with integrated analog peripherals for industrial control and edge AI applications. Our embedded solutions feature TrustZone security, DSP extensions, and ultra-low power operation, making them ideal for IoT gateways, industrial controllers, and smart sensors.",
    specs: [
      { label: "Core", value: "Cortex-M4/M7" },
      { label: "Frequency", value: "200MHz" },
      { label: "Flash", value: "2MB" },
      { label: "RAM", value: "512KB" },
      { label: "Security", value: "TrustZone" },
      { label: "Power", value: "<100µA/MHz" },
    ],
    applications: [
      "Industrial Control Systems",
      "Edge Computing Devices",
      "IoT Gateways",
      "Smart Sensors",
      "Motor Control",
      "Building Automation",
    ],
    features: [
      "ARM Cortex-M4/M7 core with FPU",
      "Operating frequency up to 200MHz",
      "Flash memory: 2MB, RAM: 512KB",
      "TrustZone security architecture",
      "DSP extensions and SIMD instructions",
      "Ultra-low power: <100µA/MHz",
    ],
    image:
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=600&fit=crop",
    icon: Layers,
    gradient: "from-orange-500 to-red-500",
    lightGradient: "from-orange-50 to-red-50",
    color: "orange",
  },
  embedded: {
    id: "embedded-systems",
    name: "Embedded Systems",
    fullName: "Embedded Processors",
    category: "Embedded",
    description:
      "ARM Cortex-M based embedded processors with integrated analog peripherals.",
    longDescription:
      "ARM Cortex-M based embedded processors with integrated analog peripherals for industrial control and edge AI applications. Our embedded solutions feature TrustZone security, DSP extensions, and ultra-low power operation, making them ideal for IoT gateways, industrial controllers, and smart sensors.",
    specs: [
      { label: "Core", value: "Cortex-M4/M7" },
      { label: "Frequency", value: "200MHz" },
      { label: "Flash", value: "2MB" },
      { label: "RAM", value: "512KB" },
      { label: "Security", value: "TrustZone" },
      { label: "Power", value: "<100µA/MHz" },
    ],
    applications: [
      "Industrial Control Systems",
      "Edge Computing Devices",
      "IoT Gateways",
      "Smart Sensors",
      "Motor Control",
      "Building Automation",
    ],
    features: [
      "ARM Cortex-M4/M7 core with FPU",
      "Operating frequency up to 200MHz",
      "Flash memory: 2MB, RAM: 512KB",
      "TrustZone security architecture",
      "DSP extensions and SIMD instructions",
      "Ultra-low power: <100µA/MHz",
    ],
    image:
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=600&fit=crop",
    icon: Layers,
    gradient: "from-orange-500 to-red-500",
    lightGradient: "from-orange-50 to-red-50",
    color: "orange",
  },

  // RF Solutions
  "rf-solutions": {
    id: "rf-solutions",
    name: "RF Solutions",
    fullName: "RF Front End & Beamformers",
    category: "RF & Wireless",
    description:
      "Advanced RF front-end modules and beamforming solutions for wireless communications.",
    longDescription:
      "Advanced RF front-end modules and beamforming solutions for 5G, radar, and satellite communications. Our RF solutions feature integrated LNAs, PAs, phase shifters, and beamforming networks, providing complete front-end solutions for phased array systems.",
    specs: [
      { label: "Frequency", value: "6-18 GHz" },
      { label: "Channels", value: "32" },
      { label: "Beamforming", value: "Analog/Digital" },
      { label: "NF", value: "<3dB" },
      { label: "Output Power", value: "+30dBm" },
      { label: "Control", value: "SPI" },
    ],
    applications: [
      "5G Infrastructure",
      "Phased Array Radar",
      "Satellite Communications",
      "Defense & Aerospace",
      "Electronic Warfare",
      "Wireless Backhaul",
    ],
    features: [
      "Frequency range: 6-18 GHz coverage",
      "32-channel beamforming capability",
      "Integrated LNA and power amplifier",
      "6-bit phase and amplitude control",
      "SPI digital interface for control",
      "Low noise figure: <3dB",
    ],
    image:
      "https://images.unsplash.com/photo-1581092335871-4d6e2e1b0a5a?w=800&h=600&fit=crop",
    icon: Wifi,
    gradient: "from-indigo-500 to-purple-500",
    lightGradient: "from-indigo-50 to-purple-50",
    color: "indigo",
  },
  rf: {
    id: "rf-solutions",
    name: "RF Solutions",
    fullName: "RF Front End & Beamformers",
    category: "RF & Wireless",
    description:
      "Advanced RF front-end modules and beamforming solutions for wireless communications.",
    longDescription:
      "Advanced RF front-end modules and beamforming solutions for 5G, radar, and satellite communications. Our RF solutions feature integrated LNAs, PAs, phase shifters, and beamforming networks, providing complete front-end solutions for phased array systems.",
    specs: [
      { label: "Frequency", value: "6-18 GHz" },
      { label: "Channels", value: "32" },
      { label: "Beamforming", value: "Analog/Digital" },
      { label: "NF", value: "<3dB" },
      { label: "Output Power", value: "+30dBm" },
      { label: "Control", value: "SPI" },
    ],
    applications: [
      "5G Infrastructure",
      "Phased Array Radar",
      "Satellite Communications",
      "Defense & Aerospace",
      "Electronic Warfare",
      "Wireless Backhaul",
    ],
    features: [
      "Frequency range: 6-18 GHz coverage",
      "32-channel beamforming capability",
      "Integrated LNA and power amplifier",
      "6-bit phase and amplitude control",
      "SPI digital interface for control",
      "Low noise figure: <3dB",
    ],
    image:
      "https://images.unsplash.com/photo-1581092335871-4d6e2e1b0a5a?w=800&h=600&fit=crop",
    icon: Wifi,
    gradient: "from-indigo-500 to-purple-500",
    lightGradient: "from-indigo-50 to-purple-50",
    color: "indigo",
  },
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = productsData[slug];

  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  if (!product) {
    notFound();
  }

  const Icon = product.icon;

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
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

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        specsRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: specsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        featuresRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresRef.current,
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
        className="bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen"
      >
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-200/20 rounded-full blur-3xl" />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgb(14, 165, 233) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          <div
            ref={heroRef}
            className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-16"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 shadow-sm mb-6">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
                    {product.category}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                  {product.fullName}
                </h1>

                <p className="text-lg text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="flex-shrink-0">
                <div
                  className={`w-32 h-32 rounded-2xl bg-gradient-to-r ${product.gradient} flex items-center justify-center shadow-xl`}
                >
                  <Icon className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Image & Description */}
              <div ref={contentRef}>
                <div className="relative h-80 rounded-2xl overflow-hidden mb-6 shadow-xl">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${product.gradient} mix-blend-multiply opacity-30`}
                  />
                </div>
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 leading-relaxed">
                    {product.longDescription}
                  </p>
                </div>
              </div>

              {/* Right Column - Technical Specs */}
              <div ref={specsRef}>
                <Card className="bg-white border-slate-200 shadow-md overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-blue-600" />
                      Technical Specifications
                    </h2>
                    <div className="space-y-3">
                      {product.specs.map((spec: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0"
                        >
                          <span className="text-sm font-medium text-slate-600">
                            {spec.label}
                          </span>
                          <span className="text-sm font-semibold text-slate-900">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Applications Section */}
            <div ref={featuresRef} className="mt-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Key Applications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.applications.map((app: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700">{app}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Key Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-r ${product.gradient} flex items-center justify-center`}
                    >
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-16 pt-12 border-t border-slate-200">
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Interested in {product.name} Solutions?
                </h3>
                <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                  Contact our sales team for pricing, samples, and technical
                  support
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Request Quote
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    Contact Sales
                    <Mail className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
