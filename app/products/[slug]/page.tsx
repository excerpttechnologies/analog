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
  Sparkles,
  CheckCircle,
  Battery,
  Radio,
  Layers,
  Mail,
  TrendingUp,
  Clock,
  Thermometer,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Requirement-based products only
const productsData: Record<string, any> = {
  // Boost Converter
  "boost-converter": {
    id: "boost-converter",
    name: "Boost Converter",
    fullName: "Synchronous Boost Converter",
    category: "Switching Regulators",
    description:
      "Compact boost converter for efficient voltage regulation in battery-operated portable electronics",
    longDescription: [
      "Compact Boost converter device for efficient voltage regulation in portable electronics.",
      " Optimized for stable performance in space-constrained applications.",
      "Used in consumer gadgets and IoT devices for reliable power delivery",
    ],
    specs: [
      { label: "Input Voltage", value: "2.5V - 5.5V" },
      { label: "Output Voltage", value: "Up to 12V" },
      { label: "Switching Frequency", value: "1.2MHz" },
      { label: "Peak Efficiency", value: "95%" },
      { label: "Quiescent Current", value: "25µA" },
      { label: "Output Current", value: "Up to 2A" },
      { label: "Package", value: "WLCSP-9, QFN-12" },
      { label: "Operating Temp", value: "-40°C to +85°C" },
    ],
    applications: [
      "Portable Consumer Devices",

      "Battery-Powered IoT Sensors",
      "Handheld Instruments",

      "USB Power Banks",

      "Mobile POS",
      "Industrial Metering Instruments",
    ],
    features: [
      "Synchronous rectification for high efficiency",

      "Adjustable soft-start",
      "Over-current and over-voltage protection",
      "Thermal shutdown protection",
      "Low quiescent current ",
      "Power good indicator",
    ],
    image: "/images/boost.jfif",
    icon: Zap,
    gradient: "from-blue-500 to-cyan-500",
    lightGradient: "from-blue-50 to-cyan-50",
    color: "blue",
    advantages: [
      { label: "VIN Range", value: "0.8V - 5.0V", icon: TrendingUp },
      { label: "Switching Current", value: "5A", icon: Battery },
      // { label: "Switching Frequency", value: "1.2MHz", icon: Clock },
      { label: "Temp Range", value: "-40°C to +125°C", icon: Thermometer },
    ],
  },

  // Buck Regulator
  "buck-regulator": {
    id: "buck-regulator",
    name: "Buck Regulator",
    fullName: "High Vin Synchronous Buck Regulator",
    category: "Switching Regulators",
    description:
      "High input voltage tolerant buck regulator for computing, networking and general electronics",
    longDescription: [
      "Highly integrated buck regulator designed to simplify power conversion in modern electronic systems.",
      "Reduces component count and streamlines PCB design.",
      "Delivers efficient and stable voltage regulation across a wide input range.",
      "Ideal for computing (DPA systems), networking equipment, and general-purpose electronics. ",
      "Optimized for high performance, reliability, and compact system integration.",
      " Supports energy-efficient power management in embedded and industrial applications.",
    ],
    specs: [
      { label: "Input Voltage", value: "4.5V - 40V" },
      { label: "Output Current", value: "Up to 3A" },
      // { label: "Switching Frequency", value: "300kHz - 2.2MHz" },
      { label: "Peak Efficiency", value: "92%" },
      { label: "Quiescent Current", value: "40µA" },
      { label: "Package", value: "QFN-16, SOP-8" },
      { label: "Operating Temp", value: "-40°C to +125°C" },
    ],
    applications: [
      "Networking Equipment",
      "Industrial Automation",
      "Telecom Infrastructure",
      "Consumer Electronics",
      "Automotive Infotainment",
      "Distributed Power Systems",
    ],
    features: [
      "Wide input voltage range",
      "Adjustable switching frequency",
      "Peak current mode control",
      "Power-good flag output",
      "Programmable soft-start",
      "Cycle-by-cycle current limiting",
      "Frequency foldback protection",
      "Thermal shutdown with auto-recovery",
    ],
    image: "/images/buck.jfif",
    icon: Battery,
    gradient: "from-purple-500 to-pink-500",
    lightGradient: "from-purple-50 to-pink-50",
    color: "purple",
    advantages: [
      { label: "Vin Range", value: "4.5V-17V", icon: TrendingUp },
      { label: "Iout", value: "7A MAX", icon: Battery },
      // { label: "Fsw", value: "Up to 2.2MHz", icon: Clock },
      { label: "Temp Range", value: "-40°C to +125°C", icon: Thermometer },
    ],
  },

  // LDO Regulator
  "ldo-regulator": {
    id: "ldo-regulator",
    name: "LDO Regulator",
    fullName: "Ultra-Low Dropout Linear Regulator",
    category: "Linear Regulators",
    description:
      "Ultra low dropout regulator with high input voltage tolerance for consumer and embedded systems",
    longDescription: [
      "A versatile linear regulator device intended for dependable power control in everyday electronic products.",
      "Focuses on ease of use and broad compatibility across applications.",
      " Suitable for consumer electronics and embedded system designs.",
    ],
    specs: [
      { label: "Input Voltage", value: "2.7V - 20V" },
      { label: "Output Current", value: "Up to 1.5A" },
      { label: "Dropout Voltage", value: "200mV @ 1A" },
      { label: "Output Noise", value: "30µVrms" },
      { label: "Quiescent Current", value: "65µA" },
      { label: "PSRR", value: "70dB @ 1kHz" },
      { label: "Package", value: "SOT-223, DFN-8" },
    ],
    applications: [
      "Automotive ECUs and Infotainment",
      "ADAS Cameras",
      "Industrial Control Units ",
      "Portable Battery and Powered Systems",
      "Telematics and Connectivity Modules",
      "Body Electronics and Control Modules",
    ],
    features: [
      "Ultra-low dropout voltage ",
      "High Output Voltage Accuracy",
      "Current limiting protection",
      "Thermal shutdown protection",
      "Compatible with Low ESR cermaic capactors",
      "Power Good Indicator",
    ],
    image: "/images/ldo.jfif",
    icon: Shield,
    gradient: "from-emerald-500 to-teal-500",
    lightGradient: "from-emerald-50 to-teal-50",
    color: "emerald",
    advantages: [
      { label: "VIN Range", value: "4V to 40V", icon: TrendingUp },
      { label: "Drop-out Voltage ", value: "300mV ", icon: Battery },
      { label: "Load Current", value: "300mA Max", icon: Clock },
      { label: "Temperature Range", value: "-40C to +125C", icon: Thermometer },
    ],
  },

  // LED Driver
  "led-driver": {
    id: "led-driver",
    name: "LED Driver",
    fullName: "Linear LED Driver",
    category: "Lighting Solutions",
    description:
      "High input voltage linear LED driver for commercial, industrial and decorative lighting with low BOM",
    longDescription: [
      "A dedicated linear LED driver solution for lighting applications focusing on ease-of-use and very low BOM count.",
      "Provides consistent illumination control for energy-efficient lighting designs.",
      "Ideal for commercial, industrial, and decorative lighting systems.",
    ],
    specs: [
      { label: "Input Voltage", value: "6V - 60V" },
      { label: "Output Current", value: "Up to 350mA/ch" },
      { label: "Current Accuracy", value: "±3%" },
      { label: "Dimming", value: "PWM up to 5kHz" },
      { label: "Dropout Voltage", value: "1.5V" },
      { label: "Package", value: "SOT-89-5, SOP-8" },
      { label: "Channels", value: "1, 3, 4 options" },
    ],
    applications: [
      "Architectural Lighting",
      "Commercial Signage",
      "Automotive Interior Lighting",
      "Display Backlighting",
      "Emergency Lighting",
      "Industrial Illumination",
    ],
    features: [
      "Wide input voltage range",
      "No external inductors required",
      "PWM dimming capability",
      "Over Temperature Protection",
    ],
    image: "/images/led.jfif",
    icon: Radio,
    gradient: "from-cyan-500 to-blue-500",
    lightGradient: "from-cyan-50 to-blue-50",
    color: "cyan",
    advantages: [
      { label: "Vin Range", value: "2.5V-55V", icon: TrendingUp },
      { label: "Iout", value: "180mA", icon: Battery },
      { label: "Dimming", value: "2KHz PWM", icon: Clock },
      { label: "LED Accuracy", value: "±3.5%", icon: Thermometer },
    ],
  },

  // Ideal Diode Controller
  "ideal-diode-controller": {
    id: "ideal-diode-controller",
    name: "Ideal Diode Controller",
    fullName: "Ideal Diode Controller with Reverse Protection",
    category: "Protection & Control",
    description:
      "Robust power handling for battery management systems used in computing, automotive and industrial",
    longDescription: [
      "Designed to deliver robust power handling for Battery Management Systems (BMS).",
      "Improves system reliability through efficient load management.",
      "Suitable for computing infrastructure, automotive, and industrial equipment applications.",
    ],
    specs: [
      { label: "Input Voltage", value: "4V - 65V" },
      { label: "Reverse Detection", value: "100ns" },
      { label: "Forward Drop", value: "20mV @ 10A" },
      { label: "Gate Drive", value: "12V" },
      { label: "Quiescent Current", value: "500µA" },
      { label: "Package", value: "SOT-23-6, SOIC-8" },
      { label: "Enable Pin", value: "Yes" },
    ],
    applications: [
      "Battery Management Systems",
      "Automotive infotainment Systems",
      "ADAS Cameras",
      "Power Trains ",
      "Lightning Systems",
    ],
    features: [
      "Wide operating voltage range ",
      "Low forward voltage drop",
      "Enable pin for control",
      "Low quiescent current",
    ],
    image: "/images/ideal.jfif",
    icon: Shield,
    gradient: "from-lime-500 to-emerald-500",
    lightGradient: "from-lime-50 to-emerald-50",
    color: "lime",
    advantages: [
      { label: "Voltage Range", value: "3.5V to 60V", icon: TrendingUp },

      { label: "Low IQ ", value: "100µA", icon: Thermometer },
      {
        label: "Temperature Range ",
        value: "-40C to +125C",
        icon: Thermometer,
      },
    ],
  },

  // Load Switch
  "load-switch": {
    id: "load-switch",
    name: "Load Switch",
    fullName: "Single N-Channel Load Switch",
    category: "Protection & Control",
    description:
      "Single N-Channel load switch for controlled power distribution in USB-powered and portable devices",
    longDescription: [
      "A protection-oriented device that helps safeguard electronic systems during operation.",
      "Enables controlled power distribution and improved system safety.",
      "Commonly implemented in USB-powered and portable device applications.",
    ],
    specs: [
      { label: "Input Voltage", value: "0.8V - 5.5V" },
      { label: "Continuous Current", value: "2A" },
      { label: "RDS(on)", value: "25mΩ @ 5V" },
      { label: "Quiescent Current", value: "1µA" },
      { label: "Slew Rate", value: "Adjustable" },
      { label: "Package", value: "WLCSP-4, SOT-23-5" },
      { label: "Output Discharge", value: "200Ω" },
    ],
    applications: [
      "Consumer Electronics",
      "Multi Rail Systems and Power Sequencing",
      "Battery-Powered Devices",
      "Telecom Systems & Switches",
      "SSD ",
      "Setup Boxes ",
    ],
    features: [
      "Integrated N-channel MOSFET",
      "Low RDS(on) ",
      "Slew rate control for inrush limiting",
      "Output Discharge Resistor",
      "Power Good Indicator",
      "Programmamble Start-up and Discharge Rate",
    ],
    image: "/images/load.jfif",
    icon: Microchip,
    gradient: "from-violet-500 to-indigo-500",
    lightGradient: "from-violet-50 to-indigo-50",
    color: "violet",
    advantages: [
      { label: "VIN Range ", value: "2V to 5V ", icon: TrendingUp },
      { label: "RDS(on)", value: "25mΩ", icon: TrendingUp },
      { label: "Iout", value: "3A", icon: Clock },
    ],
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
            className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-8"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 shadow-sm mb-6">
                  <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
                    {product.category}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                  {product.fullName}
                </h1>

                <p className="text-lg text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-16 -mt-12">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1  gap-12">
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
                  <ul
                    style={{
                      listStyle: "dot",
                      paddingLeft: "1.5rem",
                    }}
                    className="text-slate-600 flex flex-col gap-y-1   font-bold leading-relaxed"
                  >
                    {product?.longDescription?.map(
                      (desc: string, i: number) => (
                        <li
                          key={Math.random()}
                          className="flex items-center justify-start gap-x-2"
                        >
                          <span className="text-3xl font-bold flex justify-center items-center -mt-4 ">
                            .
                          </span>{" "}
                          {desc}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>

              {/* Right Column - Technical Specs */}
              {/* <div ref={specsRef}>
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
              </div> */}
            </div>

            {/* Advantages / Key Metrics Section */}
            {product.advantages && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Key Advantages
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {product.advantages.map((adv: any, idx: number) => {
                    const AdvIcon = adv.icon;
                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl bg-gradient-to-r ${product.lightGradient} border border-slate-200 shadow-sm text-center`}
                      >
                        {/* <AdvIcon
                          className={`w-8 h-8 text-${product.color}-600 mx-auto mb-2`}
                        /> */}
                        <div className="text-xs text-slate-500 font-bold mt-1">
                          {adv.label}
                        </div>
                        <div className="text-xl font-bold text-slate-900">
                          {adv.value}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

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
                    <span className="text-slate-700 font-semibold">{app}</span>
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
                    className="flex items-center gap-3 p-3 rounded-xl shadow bg-slate-50 border border-slate-100"
                  >
                    <div
                      className={`w-8 h-8 rounded-lg  ${product.gradient} flex items-center justify-center`}
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    </div>
                    <span className="text-slate-700 font-semibold">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirement-aligned CTA Section */}
            <div className="mt-16 pt-12 border-t border-slate-200">
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Need More Information?
                </h3>
                <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                  Contact our team to learn more.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Contact Team
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    Learn More
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
