// "use client";

// import { useEffect, useRef } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useParams, notFound } from "next/navigation";
// import {
//   ArrowRight,
//   Cpu,
//   Zap,
//   Shield,
//   Microchip,
//   Sparkles,
//   CheckCircle,
//   Battery,
//   Radio,
//   Layers,
//   Mail,
//   TrendingUp,
//   Clock,
//   Thermometer,
//   Gauge,
//   Plug,
//   Leaf,
// } from "lucide-react";
// import { Card } from "@/components/ui/card";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { Navbar } from "@/components/layout/Navbar";
// import { Footer } from "@/components/layout/Footer";

// // Register ScrollTrigger
// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// // Updated product data based on the provided semiconductor products
// const productsData: Record<string, any> = {
//   // Buck Regulator
//   "buck-regulator": {
//     id: "buck-regulator",
//     name: "Buck Regulator",
//     fullName: "Buck Regulator for Distributed Power Supply Applications",
//     category: "Switching Regulators",
//     description:
//       "Highly integrated high-input-voltage buck regulator designed to simplify power conversion with excellent transient response and low standby power consumption.",
//     longDescription: [
//       "Highly integrated high-input-voltage buck regulator designed to simplify power conversion with excellent transient response and low standby power consumption.",
//       "Ideal for distributed power supply applications requiring efficient voltage step-down conversion.",
//       "Features wide input voltage support, high conversion efficiency, and fast dynamic response.",
//       "Integrated protection features ensure reliable operation across various load conditions.",
//       "Compact solution footprint enables space-constrained designs.",
//     ],
//     specs: [
//       { label: "Input Voltage", value: "4.5V to 17V" },
//       { label: "Output Current", value: "7A Max" },
//       { label: "Switching Frequency", value: "1.2MHz" },
//       { label: "Operating Temp", value: "-40°C to +125°C" },
//       { label: "Efficiency", value: "High Conversion Efficiency" },
//     ],
//     applications: [
//       "Computing Systems",
//       "Networking Equipment",
//       "Industrial Automation",
//       "Consumer Electronics",
//       "Distributed Power Systems",
//     ],
//     features: [
//       "Wide Input Voltage Support",
//       "High Conversion Efficiency",
//       "Fast Dynamic Response",
//       "Compact Solution Footprint",
//       "Integrated Protection Features",
//     ],
//     image: "/images/buck.jfif",
//     icon: Zap,
//     gradient: "from-emerald-500 to-teal-500",
//     lightGradient: "from-emerald-50 to-teal-50",
//     color: "emerald",
//     advantages: [
//       { label: "Vin Range", value: "4.5V-17V", icon: TrendingUp },
//       { label: "Iout", value: "7A Max", icon: Battery },
//       { label: "Switching Freq", value: "1.2MHz", icon: Clock },
//       { label: "Temp Range", value: "-40°C to +125°C", icon: Thermometer },
//     ],
//   },

//   // Boost Converter
//   "boost-converter": {
//     id: "boost-converter",
//     name: "Boost Converter",
//     fullName: "Synchronous Boost Converter",
//     category: "Switching Regulators",
//     description:
//       "A highly integrated DC-DC boost converter combining high efficiency, low power consumption, and reliable operation for portable and industrial systems.",
//     longDescription: [
//       "A highly integrated DC-DC boost converter combining high efficiency, low power consumption, and reliable operation for portable and industrial systems.",
//       "Features integrated power MOSFETs and low quiescent current for improved battery life.",
//       "Wide input voltage support enables operation from various power sources including single-cell batteries.",
//       "Fast dynamic response ensures stable output during load transients.",
//     ],
//     specs: [
//       { label: "Input Voltage", value: "0.8V to 5V" },
//       { label: "Switching Current", value: "5A Max" },
//       { label: "Switching Frequency", value: "1.2MHz" },
//       { label: "Operating Temp", value: "-40°C to +125°C" },
//       { label: "Quiescent Current", value: "Low Quiescent Current" },
//     ],
//     applications: [
//       "Portable Electronics",
//       "Battery-Powered Devices",
//       "IoT and Connected Systems",
//       "Industrial Monitoring Equipment",
//       "USB Power Solutions",
//       "Energy Storage and Backup Systems",
//     ],
//     features: [
//       "Wide Input Voltage Support",
//       "High Conversion Efficiency with Integrated Power MOSFETs",
//       "Fast Dynamic Response",
//       "Low Quiescent Current for Improved Battery Life",
//       "Integrated Protection Features",
//       "Compact Solution with minimal external components",
//     ],
//     image: "/images/boost.jfif",
//     icon: Battery,
//     gradient: "from-blue-500 to-cyan-500",
//     lightGradient: "from-blue-50 to-cyan-50",
//     color: "blue",
//     advantages: [
//       { label: "Vin Range", value: "0.8V-5V", icon: TrendingUp },
//       { label: "Switching Current", value: "5A Max", icon: Battery },
//       { label: "Switching Freq", value: "1.2MHz", icon: Clock },
//       { label: "Temp Range", value: "-40°C to +125°C", icon: Thermometer },
//     ],
//   },

//   // LDO Regulator
//   "ldo-regulator": {
//     id: "ldo-regulator",
//     name: "LDO Regulator",
//     fullName: "Ultra Low Drop Out Voltage Regulator",
//     category: "Linear Regulators",
//     description:
//       "Low dropout linear regulator designed to provide stable and efficient power delivery for always-on systems, industrial electronics and battery-powered applications.",
//     longDescription: [
//       "Low dropout linear regulator designed to provide stable and efficient power delivery, making it ideal for always-on systems, industrial electronics and battery-powered applications.",
//       "Features wide input voltage capability and fast load response.",
//       "Low dropout architecture enables efficient operation even when input voltage is close to output voltage.",
//       "Integrated protection features ensure reliable operation under fault conditions.",
//     ],
//     specs: [
//       { label: "Input Voltage", value: "4V to 40V" },
//       { label: "Dropout Voltage", value: "300mV" },
//       { label: "Load Current", value: "300mA" },
//       { label: "Operating Temp", value: "-40°C to +125°C" },
//       { label: "Output Regulation", value: "Stable Output" },
//     ],
//     applications: [
//       "Industrial Automation Equipment",
//       "Communication and Connectivity Modules",
//       "Embedded Processing Systems",
//       "Smart Metering Solutions",
//       "Sensor and Monitoring Equipment",
//       "Battery-Powered Electronic Systems",
//     ],
//     features: [
//       "Wide Input Voltage Capability",
//       "Optimized for Always-On Applications",
//       "Low Dropout Architecture",
//       "Stable Output Regulation",
//       "Fast Load Response",
//       "Integrated Protection Features",
//       "Compact Solution with Minimal External Components",
//     ],
//     image: "/images/ldo.jfif",
//     icon: Radio,
//     gradient: "from-purple-500 to-pink-500",
//     lightGradient: "from-purple-50 to-pink-50",
//     color: "purple",
//     advantages: [
//       { label: "Vin Range", value: "4V-40V", icon: TrendingUp },
//       { label: "Dropout Voltage", value: "300mV", icon: Battery },
//       { label: "Load Current", value: "300mA Max", icon: Clock },
//       { label: "Temp Range", value: "-40°C to +125°C", icon: Thermometer },
//     ],
//   },

//   // LED Driver
//   "led-driver": {
//     id: "led-driver",
//     name: "LED Driver",
//     fullName: "Linear LED Driver",
//     category: "Lighting Solutions",
//     description:
//       "A compact linear LED driver providing accurate current regulation, simplified design, and cost-effective solutions across automotive, industrial and consumer applications.",
//     longDescription: [
//       "A compact linear LED driver providing accurate current regulation, simplified design, and cost-effective solutions across automotive, industrial and consumer applications.",
//       "Features PWM dimming support and uniform LED brightness across supply variations.",
//       "No external inductors required, enabling compact and cost-effective lighting solutions.",
//       "Easy integration into existing lighting platforms with minimal design complexity.",
//     ],
//     specs: [
//       { label: "Input Voltage", value: "2.5V to 55V" },
//       { label: "Output Current", value: "180mA" },
//       { label: "Dimming", value: "2KHz PWM" },
//       { label: "Operating Temp", value: "-40°C to +125°C" },
//       { label: "Current Accuracy", value: "Accurate Regulation" },
//     ],
//     applications: [
//       "Industrial Indicators",
//       "Building and Architectural Lighting",
//       "Smart Home Lighting Systems",
//       "Consumer Electronics",
//       "Signage and Information Displays",
//       "Portable Lighting Equipment",
//       "Smart City Infrastructure",
//     ],
//     features: [
//       "Uniform LED Brightness across supply variations",
//       "Compact Solution Footprint",
//       "Minimal Design Complexity",
//       "Integrated Protection Functions",
//       "PWM Dimming Support",
//       "Easy Integration into Existing Lighting Platforms",
//     ],
//     image: "/images/led.jfif",
//     icon: Layers,
//     gradient: "from-orange-500 to-amber-500",
//     lightGradient: "from-orange-50 to-amber-50",
//     color: "orange",
//     advantages: [
//       { label: "Vin Range", value: "2.5V-55V", icon: TrendingUp },
//       { label: "Iout", value: "180mA", icon: Battery },
//       { label: "Dimming", value: "2KHz PWM", icon: Clock },
//       { label: "Temp Range", value: "-40°C to +125°C", icon: Thermometer },
//     ],
//   },

//   // Load Switch
//   "load-switch": {
//     id: "load-switch",
//     name: "Load Switch",
//     fullName: "Single N-Channel Load Switch",
//     category: "Protection & Control",
//     description:
//       "Single Channel High-side load switch with low RDS(ON) and integrated protection features for controlled power distribution.",
//     longDescription: [
//       "Single Channel High-side load switch with low RDS(ON) and integrated protection features for controlled power distribution.",
//       "Features programmable soft start, discharge rate control, and power good indicator for reliable system operation.",
//       "Low quiescent current makes it ideal for battery-powered applications.",
//       "Integrated N-channel MOSFET provides efficient power switching with minimal power loss.",
//     ],
//     specs: [
//       { label: "Input Voltage", value: "2V to 5V" },
//       { label: "RDS(ON)", value: "25mΩ" },
//       { label: "Output Current", value: "3A" },
//       { label: "Operating Temp", value: "-40°C to +125°C" },
//       { label: "Quiescent Current", value: "Low Quiescent Current" },
//     ],
//     applications: [
//       "Power Distribution Subsystems",
//       "Networking and Communication Equipment",
//       "Battery-Powered Equipment",
//       "Computing Platforms",
//       "Industrial Automation Systems",
//       "IoT and Edge Devices",
//       "Embedded Processing Systems",
//     ],
//     features: [
//       "Integrated N-channel MOSFET",
//       "Low RDS(ON)",
//       "Low quiescent current",
//       "Programmable soft start",
//       "Programmable discharge rate",
//       "Power Good Indicator",
//     ],
//     image: "/images/load.jfif",
//     icon: Gauge,
//     gradient: "from-indigo-500 to-purple-500",
//     lightGradient: "from-indigo-50 to-purple-50",
//     color: "indigo",
//     advantages: [
//       { label: "Vin Range", value: "2V-5V", icon: TrendingUp },
//       { label: "RDS(ON)", value: "25mΩ", icon: TrendingUp },
//       { label: "Iout", value: "3A", icon: Battery },
//       { label: "Temp Range", value: "-40°C to +125°C", icon: Thermometer },
//     ],
//   },

//   // Ideal Diode Controller
//   "ideal-diode-controller": {
//     id: "ideal-diode-controller",
//     name: "Ideal Diode Controller",
//     fullName: "Ideal Diode Controller with Reverse Protection",
//     category: "Protection & Control",
//     description:
//       "An ideal diode controller designed for efficient power-path management, minimizing power loss while protecting against reverse current conditions.",
//     longDescription: [
//       "An ideal diode controller designed for efficient power-path management, minimizing power loss while protecting against reverse current conditions.",
//       "Features reverse current protection, reduced power dissipation, and supports redundant power architectures.",
//       "Ultra-low forward voltage drop with external MOSFET reduces power loss compared to traditional diodes.",
//       "Ideal for OR-ing applications and battery management systems requiring high reliability.",
//     ],
//     specs: [
//       { label: "Input Voltage", value: "3.5V to 60V" },
//       { label: "Quiescent Current", value: "100µA" },
//       { label: "Forward Drop", value: "Ultra-Low with external MOSFET" },
//       { label: "Operating Temp", value: "-40°C to +125°C" },
//       { label: "Protection", value: "Reverse Current Protection" },
//     ],
//     applications: [
//       "Battery Management Systems (BMS)",
//       "Computing and Server Platforms",
//       "Networking and Telecom Equipment",
//       "Industrial Automation Systems",
//       "Power Distribution Modules",
//       "Communication Infrastructure",
//       "Redundant Power Supply Architectures",
//       "Advanced Electronic Control Systems",
//     ],
//     features: [
//       "Reverse Current Protection",
//       "Reduced Power Dissipation",
//       "Supports Redundant Power Architectures",
//       "Improved System Reliability",
//       "Compact Implementation",
//       "Simplified Integration into Power Architectures",
//     ],
//     image: "/images/ideal.jfif",
//     icon: Plug,
//     gradient: "from-red-500 to-rose-500",
//     lightGradient: "from-red-50 to-rose-50",
//     color: "red",
//     advantages: [
//       { label: "Vin Range", value: "3.5V-60V", icon: TrendingUp },
//       { label: "Low IQ", value: "100µA", icon: Battery },
//       { label: "Forward Drop", value: "Ultra-Low", icon: Clock },
//       { label: "Temp Range", value: "-40°C to +125°C", icon: Thermometer },
//     ],
//   },
// };

// export default function ProductDetailPage() {
//   const params = useParams();
//   const slug = params.slug as string;
//   const product = productsData[slug];

//   const sectionRef = useRef<HTMLElement>(null);
//   const heroRef = useRef<HTMLDivElement>(null);
//   const contentRef = useRef<HTMLDivElement>(null);
//   const specsRef = useRef<HTMLDivElement>(null);
//   const featuresRef = useRef<HTMLDivElement>(null);

//   if (!product) {
//     notFound();
//   }

//   const Icon = product.icon;

//   useEffect(() => {
//     if (!sectionRef.current) return;

//     const ctx = gsap.context(() => {
//       gsap.fromTo(
//         heroRef.current,
//         { opacity: 0, y: 50, filter: "blur(10px)" },
//         {
//           opacity: 1,
//           y: 0,
//           filter: "blur(0px)",
//           duration: 1,
//           ease: "power3.out",
//         },
//       );

//       gsap.fromTo(
//         contentRef.current,
//         { opacity: 0, y: 30 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 0.8,
//           delay: 0.3,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: contentRef.current,
//             start: "top 85%",
//             toggleActions: "play none none reverse",
//           },
//         },
//       );

//       gsap.fromTo(
//         specsRef.current,
//         { opacity: 0, x: -30 },
//         {
//           opacity: 1,
//           x: 0,
//           duration: 0.6,
//           delay: 0.4,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: specsRef.current,
//             start: "top 85%",
//             toggleActions: "play none none reverse",
//           },
//         },
//       );

//       gsap.fromTo(
//         featuresRef.current,
//         { opacity: 0, x: 30 },
//         {
//           opacity: 1,
//           x: 0,
//           duration: 0.6,
//           delay: 0.5,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: featuresRef.current,
//             start: "top 85%",
//             toggleActions: "play none none reverse",
//           },
//         },
//       );
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <main
//         ref={sectionRef}
//         className="bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen"
//       >
//         {/* Hero Section */}
//         <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
//           <div className="absolute inset-0 -z-10">
//             <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
//             <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl" />
//             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-200/20 rounded-full blur-3xl" />
//             <div
//               className="absolute inset-0 opacity-[0.03]"
//               style={{
//                 backgroundImage: `radial-gradient(circle at 1px 1px, rgb(14, 165, 233) 1px, transparent 1px)`,
//                 backgroundSize: "40px 40px",
//               }}
//             />
//           </div>

//           <div
//             ref={heroRef}
//             className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-8"
//           >
//             <div className="flex flex-col md:flex-row gap-8 items-center">
//               <div className="flex-1">
//                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 shadow-sm mb-6">
//                   <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
//                     {product.category}
//                   </span>
//                 </div>

//                 <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
//                   {product.fullName}
//                 </h1>

//                 <p className="text-lg text-slate-600 leading-relaxed">
//                   {product.description}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Main Content */}
//         <section className="pb-16 -mt-12">
//           <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
//             <div className="grid grid-cols-1 gap-12">
//               {/* Left Column - Image & Description */}
//               <div ref={contentRef}>
//                 <div className="relative h-80 rounded-2xl overflow-hidden mb-6 shadow-xl">
//                   <Image
//                     src={product.image}
//                     alt={product.name}
//                     fill
//                     className="object-cover"
//                   />
//                   <div
//                     className={`absolute inset-0 bg-gradient-to-r ${product.gradient} mix-blend-multiply opacity-30`}
//                   />
//                 </div>
//                 <div className="prose prose-slate max-w-none">
//                   <ul
//                     style={{
//                       listStyle: "dot",
//                       paddingLeft: "1.5rem",
//                     }}
//                     className="text-slate-600 flex flex-col gap-y-1 font-bold leading-relaxed"
//                   >
//                     {product?.longDescription?.map(
//                       (desc: string, i: number) => (
//                         <li
//                           key={i}
//                           className="flex items-center justify-start gap-x-2"
//                         >
//                           <span className="text-3xl font-bold flex justify-center items-center -mt-4">
//                             •
//                           </span>
//                           {desc}
//                         </li>
//                       ),
//                     )}
//                   </ul>
//                 </div>
//               </div>
//             </div>

//             {/* Advantages / Key Metrics Section */}
//             {product.advantages && (
//               <div className="mt-12">
//                 <h2 className="text-2xl font-bold text-slate-900 mb-6">
//                   Key Advantages
//                 </h2>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                   {product.advantages.map((adv: any, idx: number) => {
//                     const AdvIcon = adv.icon;
//                     return (
//                       <div
//                         key={idx}
//                         className={`p-4 rounded-xl bg-gradient-to-r ${product.lightGradient} border border-slate-200 shadow-sm text-center`}
//                       >
//                         <div className="text-xs text-slate-500 font-bold mt-1">
//                           {adv.label}
//                         </div>
//                         <div className="text-xl font-bold text-slate-900">
//                           {adv.value}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* Applications Section */}
//             <div ref={featuresRef} className="mt-12">
//               <h2 className="text-2xl font-bold text-slate-900 mb-6">
//                 Key Applications
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {product.applications.map((app: string, idx: number) => (
//                   <div
//                     key={idx}
//                     className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm"
//                   >
//                     <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
//                     <span className="text-slate-700 font-medium">{app}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Features Section */}
//             <div className="mt-12">
//               <h2 className="text-2xl font-bold text-slate-900 mb-6">
//                 Key Features
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {product.features.map((feature: string, idx: number) => (
//                   <div
//                     key={idx}
//                     className="flex items-center gap-3 p-3 rounded-xl shadow bg-slate-50 border border-slate-100"
//                   >
//                     <div
//                       className={`w-8 h-8 rounded-lg bg-gradient-to-r ${product.gradient} flex items-center justify-center`}
//                     >
//                       <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
//                     </div>
//                     <span className="text-slate-700 font-medium">
//                       {feature}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Requirement-aligned CTA Section */}
//             <div className="mt-16 pt-12 border-t border-slate-200">
//               <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-center">
//                 <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
//                   Need More Information?
//                 </h3>
//                 <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
//                   Contact our team to learn more about our semiconductor and
//                   power management solutions.
//                 </p>
//                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                   <Link
//                     href="/contact"
//                     className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
//                   >
//                     Contact Team
//                     <ArrowRight className="w-4 h-4" />
//                   </Link>
//                   <Link
//                     href="/products"
//                     className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300"
//                   >
//                     View All Products
//                     <Mail className="w-4 h-4" />
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </>
//   );
// }

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
  Gauge,
  Plug,
  Leaf,
  Monitor,
  Wifi,
  Factory,
  Smartphone,
  Laptop,
  Server,
  Power,
  Home,
  Car,
  Lightbulb,
  Building,
  Cloud,
  Database,
  Network,
  HardDrive,
  Cctv,
  Fan,
  Watch,
  Headphones,
  Speaker,
  Printer,
  Camera,
  Drone,
  Robot,
  Satellite,
  ShieldCheck,
  Zap as ZapIcon,
  Cpu as CpuIcon,
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

// Updated product data based on the provided semiconductor products
const productsData: Record<string, any> = {
  // Buck Regulator
  "buck-regulator": {
    id: "buck-regulator",
    name: "Buck Regulator",
    fullName: "Buck Regulator for Distributed Power Supply Applications",
    category: "Switching Regulators",
    description:
      "Highly integrated high-input-voltage buck regulator designed to simplify power conversion with excellent transient response and low standby power consumption.",
    specs: [
      { label: "Input Voltage", value: "4.5V to 17V" },
      { label: "Output Current", value: "7A Max" },
      { label: "Switching Frequency", value: "1.2MHz" },
      { label: "Operating Temp", value: "-40°C to +125°C" },
      { label: "Efficiency", value: "High Conversion Efficiency" },
    ],
    applications: [
      { name: "Computing", icon: Monitor },
      { name: "Networking", icon: Wifi },
      { name: "Industrial", icon: Factory },
      { name: "Consumer Electronics", icon: Smartphone },
    ],
    features: [
      "Wide Input Voltage Support",
      "High Conversion Efficiency",
      "Fast Dynamic Response",
      "Compact Solution Footprint",
      "Integrated Protection Features",
    ],
    image: "/images/buck.jfif",
    icon: Zap,
    gradient: "from-emerald-500 to-teal-500",
    lightGradient: "from-emerald-50 to-teal-50",
    color: "emerald",
    advantages: [
      { label: "Vin Range", value: "4.5V-17V", icon: TrendingUp },
      { label: "Iout", value: "7A Max", icon: Battery },
      { label: "Switching Freq", value: "1.2MHz", icon: Clock },
      { label: "Temp Range", value: "-40°C to +125°C", icon: Thermometer },
    ],
  },

  // Boost Converter
  "boost-converter": {
    id: "boost-converter",
    name: "Boost Converter",
    fullName: "Synchronous Boost Converter",
    category: "Switching Regulators",
    description:
      "A highly integrated DC-DC boost converter combining high efficiency, low power consumption, and reliable operation for portable and industrial systems.",
    specs: [
      { label: "Input Voltage", value: "0.8V to 5V" },
      { label: "Switching Current", value: "5A Max" },
      { label: "Switching Frequency", value: "1.2MHz" },
      { label: "Operating Temp", value: "-40°C to +125°C" },
      { label: "Quiescent Current", value: "Low Quiescent Current" },
    ],
    applications: [
      { name: "Portable Electronics", icon: Laptop },
      { name: "Battery-Powered Devices", icon: Battery },
      { name: "IoT and Connected Systems", icon: Wifi },
      { name: "Industrial Monitoring Equipment", icon: Factory },
      { name: "USB Power Solutions", icon: Plug },
      { name: "Energy Storage and Backup Systems", icon: Power },
    ],
    features: [
      "Wide Input Voltage Support",
      "High Conversion Efficiency with Integrated Power MOSFETs",
      "Fast Dynamic Response",
      "Low Quiescent Current for Improved Battery Life",
      "Integrated Protection Features",
      "Compact Solution with minimal external components",
    ],
    image: "/images/boost.jfif",
    icon: Battery,
    gradient: "from-blue-500 to-cyan-500",
    lightGradient: "from-blue-50 to-cyan-50",
    color: "blue",
    advantages: [
      { label: "Vin Range", value: "0.8V-5V", icon: TrendingUp },
      { label: "Switching Current", value: "5A Max", icon: Battery },
      { label: "Switching Freq", value: "1.2MHz", icon: Clock },
      { label: "Temp Range", value: "-40°C to +125°C", icon: Thermometer },
    ],
  },

  // LDO Regulator
  "ldo-regulator": {
    id: "ldo-regulator",
    name: "LDO Regulator",
    fullName: "Ultra Low Drop Out Voltage Regulator",
    category: "Linear Regulators",
    description:
      "Low dropout linear regulator designed to provide stable and efficient power delivery, making it ideal for always-on systems, industrial electronics and battery-powered applications.",
    specs: [
      { label: "Input Voltage", value: "4V to 40V" },
      { label: "Dropout Voltage", value: "300mV" },
      { label: "Load Current", value: "300mA" },
      { label: "Operating Temp", value: "-40°C to +125°C" },
      { label: "Output Regulation", value: "Stable Output" },
    ],
    applications: [
      { name: "Industrial Automation Equipment", icon: Factory },
      { name: "Communication and Connectivity Modules", icon: Wifi },
      { name: "Embedded Processing Systems", icon: Cpu },
      { name: "Smart Metering Solutions", icon: Monitor },
      { name: "Sensor and Monitoring Equipment", icon: Radio },
      { name: "Battery-Powered Electronic Systems", icon: Battery },
    ],
    features: [
      "Wide Input Voltage Capability",
      "Optimized for Always-On Applications",
      "Low Dropout Architecture",
      "Stable Output Regulation",
      "Fast Load Response",
      "Integrated Protection Features",
      "Compact Solution with Minimal External Components",
    ],
    image: "/images/ldo.jfif",
    icon: Radio,
    gradient: "from-purple-500 to-pink-500",
    lightGradient: "from-purple-50 to-pink-50",
    color: "purple",
    advantages: [
      { label: "Vin Range", value: "4V-40V", icon: TrendingUp },
      { label: "Dropout Voltage", value: "300mV", icon: Battery },
      { label: "Load Current", value: "300mA Max", icon: Clock },
      { label: "Temp Range", value: "-40°C to +125°C", icon: Thermometer },
    ],
  },

  // LED Driver
  "led-driver": {
    id: "led-driver",
    name: "LED Driver",
    fullName: "Linear LED Driver",
    category: "Lighting Solutions",
    description:
      "A compact linear LED driver providing accurate current regulation, simplified design, and cost-effective solutions across automotive, industrial and consumer applications.",
    specs: [
      { label: "Input Voltage", value: "2.5V to 55V" },
      { label: "Output Current", value: "180mA" },
      { label: "Dimming", value: "2KHz PWM" },
      { label: "Operating Temp", value: "-40°C to +125°C" },
      { label: "Current Accuracy", value: "Accurate Regulation" },
    ],
    applications: [
      { name: "Industrial Indicators", icon: Factory },
      { name: "Building and Architectural Lighting", icon: Building },
      { name: "Smart Home Lighting Systems", icon: Home },
      { name: "Consumer Electronics", icon: Smartphone },
      { name: "Signage and Information Displays", icon: Monitor },
      { name: "Portable Lighting Equipment", icon: Lightbulb },
      { name: "Smart City Infrastructure", icon: Cloud },
    ],
    features: [
      "Uniform LED Brightness across supply variations",
      "Compact Solution Footprint",
      "Minimal Design Complexity",
      "Integrated Protection Functions",
      "PWM Dimming Support",
      "Easy Integration into Existing Lighting Platforms",
    ],
    image: "/images/led.jfif",
    icon: Layers,
    gradient: "from-orange-500 to-amber-500",
    lightGradient: "from-orange-50 to-amber-50",
    color: "orange",
    advantages: [
      { label: "Vin Range", value: "2.5V-55V", icon: TrendingUp },
      { label: "Iout", value: "180mA", icon: Battery },
      { label: "Dimming", value: "2KHz PWM", icon: Clock },
      { label: "Temp Range", value: "-40°C to +125°C", icon: Thermometer },
    ],
  },

  // Load Switch
  "load-switch": {
    id: "load-switch",
    name: "Load Switch",
    fullName: "Single N-Channel Load Switch",
    category: "Protection & Control",
    description:
      "Single Channel High-side load switch with low RDS(ON) and integrated protection features for controlled power distribution.",
    specs: [
      { label: "Input Voltage", value: "2V to 5V" },
      { label: "RDS(ON)", value: "25mΩ" },
      { label: "Output Current", value: "3A" },
      { label: "Operating Temp", value: "-40°C to +125°C" },
      { label: "Quiescent Current", value: "Low Quiescent Current" },
    ],
    applications: [
      { name: "Power Distribution Subsystems", icon: Power },
      { name: "Networking and Communication Equipment", icon: Wifi },
      { name: "Battery-Powered Equipment", icon: Battery },
      { name: "Computing Platforms", icon: Monitor },
      { name: "Industrial Automation Systems", icon: Factory },
      { name: "IoT and Edge Devices", icon: Radio },
      { name: "Embedded Processing Systems", icon: Cpu },
    ],
    features: [
      "Integrated N-channel MOSFET",
      "Low RDS(ON)",
      "Low quiescent current",
      "Programmable soft start",
      "Programmable discharge rate",
      "Power Good Indicator",
    ],
    image: "/images/load.jfif",
    icon: Gauge,
    gradient: "from-indigo-500 to-purple-500",
    lightGradient: "from-indigo-50 to-purple-50",
    color: "indigo",
    advantages: [
      { label: "Vin Range", value: "2V-5V", icon: TrendingUp },
      { label: "RDS(ON)", value: "25mΩ", icon: TrendingUp },
      { label: "Iout", value: "3A", icon: Battery },
      { label: "Temp Range", value: "-40°C to +125°C", icon: Thermometer },
    ],
  },

  // Ideal Diode Controller
  "ideal-diode-controller": {
    id: "ideal-diode-controller",
    name: "Ideal Diode Controller",
    fullName: "Ideal Diode Controller with Reverse Protection",
    category: "Protection & Control",
    description:
      "An ideal diode controller designed for efficient power-path management, minimizing power loss while protecting against reverse current conditions.",
    specs: [
      { label: "Input Voltage", value: "3.5V to 60V" },
      { label: "Low IQ", value: "100µA" },
      { label: "Forward Drop", value: "Ultra-Low with external MOSFET" },
      { label: "Operating Temp", value: "-40°C to +125°C" },
      { label: "Protection", value: "Reverse Current Protection" },
    ],
    applications: [
      { name: "Battery Management Systems (BMS)", icon: Battery },
      { name: "Computing and Server Platforms", icon: Server },
      { name: "Networking and Telecom Equipment", icon: Wifi },
      { name: "Industrial Automation Systems", icon: Factory },
      { name: "Power Distribution Modules", icon: Power },
      { name: "Communication Infrastructure", icon: Network },
      { name: "Redundant Power Supply Architectures", icon: Database },
      { name: "Advanced Electronic Control Systems", icon: ShieldCheck },
    ],
    features: [
      "Reverse Current Protection",
      "Reduced Power Dissipation",
      "Supports Redundant Power Architectures",
      "Improved System Reliability",
      "Compact Implementation",
      "Simplified Integration into Power Architectures",
    ],
    image: "/images/ideal.jfif",
    icon: Plug,
    gradient: "from-red-500 to-rose-500",
    lightGradient: "from-red-50 to-rose-50",
    color: "red",
    advantages: [
      { label: "Vin Range", value: "3.5V-60V", icon: TrendingUp },
      { label: "Low IQ", value: "100µA", icon: Battery },
      { label: "Forward Drop", value: "Ultra-Low", icon: Clock },
      { label: "Temp Range", value: "-40°C to +125°C", icon: Thermometer },
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
        <section className="relative min-h-[30vh]  flex items-center justify-center overflow-hidden">
          <div
            ref={heroRef}
            className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl "
          >
            <div className="flex flex-col md:flex-row  items-center">
              <div className="flex-1">
                {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 shadow-sm mb-6">
                  <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
                    {product.category}
                  </span>
                </div> */}

                <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
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
        <section className="pb-16 -mt-3">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 gap-12">
              {/* Left Column - Image & Right Column - Target Specifications */}
              <div
                ref={contentRef}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
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

                {/* Right Column - Target Specifications */}
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-4">
                    Target Specifications
                  </h2>
                  {product.advantages && (
                    <div className="grid gap-2.5">
                      {product.advantages.map((adv: any, idx: number) => {
                        const AdvIcon = adv.icon;
                        return (
                          <div
                            key={idx}
                            className={`p-3 rounded-xl bg-gradient-to-r ${product.lightGradient} border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200`}
                          >
                            <div className="flex items-start gap-2">
                              <AdvIcon className="w-4 h-4 text-slate-700 flex-shrink-0 mt-0.5" />
                              <div>
                                <div className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">
                                  {adv.label}
                                </div>
                                <div className="text-sm font-bold text-slate-900">
                                  {adv.value}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Product Development Notice */}
            <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-sm text-amber-800">
                <strong>Product Development Notice:</strong> The products
                presented on this page represent our current development
                roadmap. Final specifications, features and availability may
                change during the product development cycle. Please contact us
                for the latest product status.
              </p>
            </div>

            {/* Applications Section */}
            <div ref={featuresRef} className="mt-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Target Applications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.applications.map((app: any, idx: number) => {
                  const AppIcon = app.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm"
                    >
                      <AppIcon className="w-5 h-5 text-slate-700 flex-shrink-0" />
                      <span className="text-slate-700 font-medium">
                        {app.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Features Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Planned Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl shadow bg-slate-50 border border-slate-100"
                  >
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-r ${product.gradient} flex items-center justify-center`}
                    >
                      <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                    </div>
                    <span className="text-slate-700 font-medium">
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
                  Contact our team to learn more about our semiconductor and
                  power management solutions.
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
                    View All Products
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
