// "use client";

// import { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   ArrowRight,
//   Cpu,
//   Zap,
//   Shield,
//   Microchip,
//   Target,
//   Sparkles,
//   Filter,
//   Search,
//   TrendingUp,
//   Award,
//   Clock,
//   Battery,
//   Radio,
//   GitBranch,
//   Layers,
//   Wifi,
//   Gauge,
//   Plug,
//   Leaf,
// } from "lucide-react";
// import { Card } from "@/components/ui/card";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { Navbar } from "@/components/layout/Navbar";
// import { Footer } from "@/components/layout/Footer";
// import { ProcessTimelineSection } from "@/components/home/ProcessTimelineSection";

// // Register ScrollTrigger
// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// // Updated product data based on the provided semiconductor products
// const products = [
//   {
//     id: "buck-regulator",
//     name: "Buck Regulator",
//     fullName: "Buck Regulator for Distributed Power Supply Applications",
//     category: "Switching Regulators",
//     description:
//       "Highly integrated high-input-voltage buck regulator designed to simplify power conversion with excellent transient response and low standby power consumption.",
//     longDescription:
//       "A highly integrated high-input-voltage buck regulator designed to simplify power conversion with excellent transient response and low standby power consumption. Ideal for distributed power supply applications requiring efficient voltage step-down conversion.",
//     specs: [
//       "Vin: 4.5V to 17V",
//       "Iout: 7A Max",
//       "1.2MHz Switching",
//       "-40°C to +125°C",
//       "High Efficiency",
//     ],
//     applications: [
//       "Computing Systems",
//       "Networking Equipment",
//       "Industrial Automation",
//       "Consumer Electronics",
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
//   },
//   {
//     id: "boost-converter",
//     name: "Boost Converter",
//     fullName: "Synchronous Boost Converter",
//     category: "Switching Regulators",
//     description:
//       "A highly integrated DC-DC boost converter combining high efficiency, low power consumption, and reliable operation for portable and industrial systems.",
//     longDescription:
//       "A highly integrated DC-DC boost converter combining high efficiency, low power consumption, and reliable operation for portable and industrial systems. Features integrated power MOSFETs and low quiescent current for improved battery life.",
//     specs: [
//       "Vin: 0.8V to 5V",
//       "Switching Current: 5A Max",
//       "1.2MHz Switching",
//       "-40°C to +125°C",
//       "Low Quiescent Current",
//     ],
//     applications: [
//       "Portable Electronics",
//       "Battery-Powered Devices",
//       "IoT and Connected Systems",
//       "Industrial Monitoring Equipment",
//       "USB Power Solutions",
//       "Energy Storage Systems",
//     ],
//     features: [
//       "Wide Input Voltage Support",
//       "High Efficiency with Integrated MOSFETs",
//       "Fast Dynamic Response",
//       "Low Quiescent Current",
//       "Integrated Protection Features",
//       "Compact Solution",
//     ],
//     image: "/images/boost.jfif",
//     icon: Battery,
//     gradient: "from-blue-500 to-cyan-500",
//     lightGradient: "from-blue-50 to-cyan-50",
//     color: "blue",
//   },
//   {
//     id: "ldo-regulator",
//     name: "LDO Regulator",
//     fullName: "Ultra Low Drop Out Voltage Regulator",
//     category: "Linear Regulators",
//     description:
//       "Low dropout linear regulator designed to provide stable and efficient power delivery for always-on systems, industrial electronics and battery-powered applications.",
//     longDescription:
//       "Low dropout linear regulator designed to provide stable and efficient power delivery, making it ideal for always-on systems, industrial electronics and battery-powered applications. Features wide input voltage capability and fast load response.",
//     specs: [
//       "Vin: 4V to 40V",
//       "Dropout: 300mV",
//       "Load Current: 300mA",
//       "-40°C to +125°C",
//       "Stable Output",
//     ],
//     applications: [
//       "Industrial Automation",
//       "Communication Modules",
//       "Embedded Processing",
//       "Smart Metering",
//       "Sensor Equipment",
//       "Battery-Powered Systems",
//     ],
//     features: [
//       "Wide Input Voltage Capability",
//       "Optimized for Always-On Applications",
//       "Low Dropout Architecture",
//       "Stable Output Regulation",
//       "Fast Load Response",
//       "Integrated Protection Features",
//       "Compact Solution",
//     ],
//     image: "/images/ldo.jfif",
//     icon: Radio,
//     gradient: "from-purple-500 to-pink-500",
//     lightGradient: "from-purple-50 to-pink-50",
//     color: "purple",
//   },
//   {
//     id: "led-driver",
//     name: "LED Driver",
//     fullName: "Linear LED Driver",
//     category: "Lighting Solutions",
//     description:
//       "A compact linear LED driver providing accurate current regulation, simplified design, and cost-effective solutions across automotive, industrial and consumer applications.",
//     longDescription:
//       "A compact linear LED driver providing accurate current regulation, simplified design, and cost-effective solutions across automotive, industrial and consumer applications. Features PWM dimming support and uniform LED brightness across supply variations.",
//     specs: [
//       "Vin: 2.5V to 55V",
//       "Iout: 180mA",
//       "PWM Dimming: 2KHz",
//       "-40°C to +125°C",
//       "Accurate Regulation",
//     ],
//     applications: [
//       "Industrial Indicators",
//       "Building Lighting",
//       "Smart Home Lighting",
//       "Consumer Electronics",
//       "Signage Displays",
//       "Portable Lighting",
//       "Smart City Infrastructure",
//     ],
//     features: [
//       "Uniform LED Brightness",
//       "Compact Solution Footprint",
//       "Minimal Design Complexity",
//       "Integrated Protection Functions",
//       "PWM Dimming Support",
//       "Easy Integration",
//     ],
//     image: "/images/led.jfif",
//     icon: Layers,
//     gradient: "from-orange-500 to-amber-500",
//     lightGradient: "from-orange-50 to-amber-50",
//     color: "orange",
//   },
//   {
//     id: "load-switch",
//     name: "Load Switch",
//     fullName: "Single N-Channel Load Switch",
//     category: "Protection & Control",
//     description:
//       "Single Channel High-side load switch with low RDS(ON) and integrated protection features for controlled power distribution.",
//     longDescription:
//       "Single Channel High-side load switch with low RDS(ON) and integrated protection features for controlled power distribution. Features programmable soft start, discharge rate control, and power good indicator for reliable system operation.",
//     specs: [
//       "Vin: 2V to 5V",
//       "RDS(ON): 25mΩ",
//       "Iout: 3A",
//       "-40°C to +125°C",
//       "Low Quiescent Current",
//     ],
//     applications: [
//       "Power Distribution Subsystems",
//       "Networking Equipment",
//       "Battery-Powered Equipment",
//       "Computing Platforms",
//       "Industrial Automation",
//       "IoT and Edge Devices",
//       "Embedded Processing",
//     ],
//     features: [
//       "Integrated N-Channel MOSFET",
//       "Low RDS(ON)",
//       "Low Quiescent Current",
//       "Programmable Soft Start",
//       "Programmable Discharge Rate",
//       "Power Good Indicator",
//     ],
//     image: "/images/load.jfif",
//     icon: Gauge,
//     gradient: "from-indigo-500 to-purple-500",
//     lightGradient: "from-indigo-50 to-purple-50",
//     color: "indigo",
//   },
//   {
//     id: "ideal-diode-controller",
//     name: "Ideal Diode Controller",
//     fullName: "Ideal Diode Controller with Reverse Protection",
//     category: "Protection & Control",
//     description:
//       "An ideal diode controller designed for efficient power-path management, minimizing power loss while protecting against reverse current conditions.",
//     longDescription:
//       "An ideal diode controller designed for efficient power-path management, minimizing power loss while protecting against reverse current conditions. Features reverse current protection, reduced power dissipation, and supports redundant power architectures.",
//     specs: [
//       "Vin: 3.5V to 60V",
//       "Low IQ: 100uA",
//       "Ultra-Low Forward Drop",
//       "-40°C to +125°C",
//       "Reverse Protection",
//     ],
//     applications: [
//       "Battery Management Systems (BMS)",
//       "Computing Platforms",
//       "Networking Equipment",
//       "Telecom Infrastructure",
//       "Industrial Automation",
//       "Power Distribution Modules",
//       "Redundant Power Supplies",
//       "Advanced Control Systems",
//     ],
//     features: [
//       "Reverse Current Protection",
//       "Reduced Power Dissipation",
//       "Supports Redundant Architectures",
//       "Improved System Reliability",
//       "Compact Implementation",
//       "Simplified Integration",
//     ],
//     image: "/images/ideal.jfif",
//     icon: Plug,
//     gradient: "from-red-500 to-rose-500",
//     lightGradient: "from-red-50 to-rose-50",
//     color: "red",
//   },
// ];

// // Categories based on the new products
// const categories = [
//   "All",
//   "Switching Regulators",
//   "Linear Regulators",
//   "Lighting Solutions",
//   "Protection & Control",
// ];

// export default function ProductsPage() {
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [hoveredCard, setHoveredCard] = useState<number | null>(null);
//   const sectionRef = useRef<HTMLElement>(null);
//   const heroRef = useRef<HTMLDivElement>(null);
//   const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

//   const filteredProducts = products.filter((product) => {
//     const matchesCategory =
//       activeCategory === "All" || product.category === activeCategory;
//     const matchesSearch =
//       product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.fullName.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

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

//       cardsRef.current.forEach((card, index) => {
//         if (!card) return;

//         gsap.fromTo(
//           card,
//           { opacity: 0, y: 50, scale: 0.9 },
//           {
//             opacity: 1,
//             y: 0,
//             scale: 1,
//             duration: 0.6,
//             delay: index * 0.05,
//             ease: "back.out(0.4)",
//           },
//         );
//       });
//     }, sectionRef);

//     return () => ctx.revert();
//   }, [activeCategory, searchTerm]);

//   const handleCardHover = (index: number, isEnter: boolean) => {
//     setHoveredCard(isEnter ? index : null);
//   };

//   return (
//     <>
//       <Navbar />
//       <main
//         ref={sectionRef}
//         className="bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen"
//       >
//         {/* Hero Section */}
//         <section className="relative min-h-[20vh] flex items-center justify-center overflow-hidden">
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
//             className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-center py-16"
//           >
//             <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
//               Products
//             </h1>
//           </div>
//         </section>

//         {/* Products Section */}
//         <section className="py-10">
//           <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
//             {/* Filters */}
//             <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
//               <div className="flex flex-wrap gap-3">
//                 {categories.map((cat) => (
//                   <button
//                     key={cat}
//                     onClick={() => setActiveCategory(cat)}
//                     className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
//                       activeCategory === cat
//                         ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25"
//                         : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
//                     }`}
//                   >
//                     {cat}
//                   </button>
//                 ))}
//               </div>

//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
//                 />
//               </div>
//             </div>

//             {/* Products Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredProducts.map((product, index) => {
//                 const Icon = product.icon;
//                 const isHovered = hoveredCard === index;

//                 return (
//                   <Link
//                     key={product.id}
//                     href={`/products/${product.id}`}
//                     ref={(el) => {
//                       if (el) cardsRef.current[index] = el as HTMLDivElement;
//                     }}
//                     className="group relative block"
//                     onMouseEnter={() => handleCardHover(index, true)}
//                     onMouseLeave={() => handleCardHover(index, false)}
//                   >
//                     <div
//                       className={`absolute inset-0 bg-gradient-to-r ${product.gradient} rounded-xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
//                     />

//                     <Card className="relative overflow-hidden bg-white border-slate-200 hover:shadow-xl transition-all duration-500 h-full flex flex-col group-hover:-translate-y-2 cursor-pointer">
//                       <div className="relative h-48 overflow-hidden">
//                         <Image
//                           src={product.image}
//                           alt={product.name}
//                           fill
//                           className="object-cover transition-transform duration-500 group-hover:scale-110"
//                         />
//                         <div
//                           className={`absolute inset-0 bg-gradient-to-r ${product.gradient} mix-blend-multiply opacity-40`}
//                         />

//                         <div className="absolute top-4 left-4">
//                           <div
//                             className={`px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-sm shadow-lg`}
//                           >
//                             <span className="text-xs font-bold text-slate-800">
//                               {product.category}
//                             </span>
//                           </div>
//                         </div>

//                         <div
//                           className={`absolute bottom-4 right-4 w-12 h-12 rounded-xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg transition-all duration-300 ${isHovered ? "scale-110" : ""}`}
//                         >
//                           <Icon
//                             className={`w-6 h-6 transition-colors duration-300`}
//                             style={{
//                               color: isHovered ? `#0ea5e9` : "#475569",
//                             }}
//                           />
//                         </div>
//                       </div>

//                       <div className="p-6 flex-1">
//                         <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-700 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
//                           {product.name}
//                         </h3>
//                         <p className="text-slate-500 text-xs mb-3">
//                           {product.fullName}
//                         </p>
//                         <p className="text-slate-600 text-sm leading-relaxed mb-4">
//                           {product.description}
//                         </p>

//                         <div className="flex flex-wrap gap-2 mb-6">
//                           {product.specs.slice(0, 4).map((spec, idx) => (
//                             <span
//                               key={idx}
//                               className="px-2 py-1 rounded-md bg-slate-100 text-xs font-medium text-slate-600"
//                             >
//                               {spec}
//                             </span>
//                           ))}
//                         </div>

//                         <div
//                           className={`inline-flex items-center gap-2 font-semibold transition-all duration-300 ${
//                             isHovered ? `text-blue-600 gap-3` : "text-slate-700"
//                           }`}
//                         >
//                           Learn More
//                           <ArrowRight
//                             className={`w-4 h-4 transition-all duration-300 ${isHovered ? "translate-x-1" : ""}`}
//                           />
//                         </div>
//                       </div>

//                       <div
//                         className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
//                       >
//                         <div
//                           className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${product.gradient} opacity-20`}
//                         />
//                       </div>
//                     </Card>
//                   </Link>
//                 );
//               })}
//             </div>

//             {filteredProducts.length === 0 && (
//               <div className="text-center py-20">
//                 <div className="text-6xl mb-4">🔍</div>
//                 <h3 className="text-2xl font-bold text-slate-900 mb-2">
//                   No products found
//                 </h3>
//                 <p className="text-slate-600">
//                   Try adjusting your search or filter criteria
//                 </p>
//               </div>
//             )}
//             <br />
//             <ProcessTimelineSection />

//             {/* /////notice */}
//             {/* <div className="p-5 mt-3 bg-yellow-100 border border-yellow-500 rounded-2xl">
//               <h3 className="font-bold">Product Development Notice</h3>
//               <p className="text-xs my-0.5">
//                 The products presented on this page represent our current
//                 development roadmap.
//               </p>
//               <p className="text-xs">
//                 Final specifications, features and availability may change
//                 during the product development cycle. Please contact us for the
//                 latest product status.{" "}
//               </p>
//             </div> */}

//             {/* Requirement-aligned CTA Section */}
//             <div className="mt-20 pt-10 border-t border-slate-200">
//               <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-center">
//                 <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
//                   Need More Information?
//                 </h3>
//                 <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
//                   Contact our team to learn more about our semiconductor and
//                   power management solutions.
//                 </p>
//                 <Link
//                   href="/contact"
//                   className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
//                 >
//                   Contact Team
//                   <ArrowRight className="w-4 h-4" />
//                 </Link>
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

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Battery,
  Radio,
  Layers,
  Gauge,
  Plug,
  Search,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import gsap from "gsap";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Product data
const products = [
  {
    id: "buck-regulator",
    name: "Buck Regulator",
    fullName: "Buck Regulator for Distributed Power Supply Applications",
    category: "Switching Regulators",
    description:
      "Highly integrated high-input-voltage buck regulator designed to simplify power conversion with excellent transient response and low standby power consumption.",
    longDescription:
      "A highly integrated high-input-voltage buck regulator designed to simplify power conversion with excellent transient response and low standby power consumption. Ideal for distributed power supply applications requiring efficient voltage step-down conversion.",
    specs: [
      "Vin: 4.5V to 17V",
      "Iout: 7A Max",
      "1.2MHz Switching",
      "-40°C to +125°C",
      "High Efficiency",
    ],
    applications: [
      "Computing Systems",
      "Networking Equipment",
      "Industrial Automation",
      "Consumer Electronics",
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
    color: "emerald",
  },
  {
    id: "boost-converter",
    name: "Boost Converter",
    fullName: "Synchronous Boost Converter",
    category: "Switching Regulators",
    description:
      "A highly integrated DC-DC boost converter combining high efficiency, low power consumption, and reliable operation for portable and industrial systems.",
    longDescription:
      "A highly integrated DC-DC boost converter combining high efficiency, low power consumption, and reliable operation for portable and industrial systems. Features integrated power MOSFETs and low quiescent current for improved battery life.",
    specs: [
      "Vin: 0.8V to 5V",
      "Switching Current: 5A Max",
      "1.2MHz Switching",
      "-40°C to +125°C",
      "Low Quiescent Current",
    ],
    applications: [
      "Portable Electronics",
      "Battery-Powered Devices",
      "IoT and Connected Systems",
      "Industrial Monitoring Equipment",
      "USB Power Solutions",
      "Energy Storage Systems",
    ],
    features: [
      "Wide Input Voltage Support",
      "High Efficiency with Integrated MOSFETs",
      "Fast Dynamic Response",
      "Low Quiescent Current",
      "Integrated Protection Features",
      "Compact Solution",
    ],
    image: "/images/boost.jfif",
    icon: Battery,
    gradient: "from-blue-500 to-cyan-500",
    color: "blue",
  },
  {
    id: "ldo-regulator",
    name: "LDO Regulator",
    fullName: "Ultra Low Drop Out Voltage Regulator",
    category: "Linear Regulators",
    description:
      "Low dropout linear regulator designed to provide stable and efficient power delivery for always-on systems, industrial electronics and battery-powered applications.",
    longDescription:
      "Low dropout linear regulator designed to provide stable and efficient power delivery, making it ideal for always-on systems, industrial electronics and battery-powered applications. Features wide input voltage capability and fast load response.",
    specs: [
      "Vin: 4V to 40V",
      "Dropout: 300mV",
      "Load Current: 300mA",
      "-40°C to +125°C",
      "Stable Output",
    ],
    applications: [
      "Industrial Automation",
      "Communication Modules",
      "Embedded Processing",
      "Smart Metering",
      "Sensor Equipment",
      "Battery-Powered Systems",
    ],
    features: [
      "Wide Input Voltage Capability",
      "Optimized for Always-On Applications",
      "Low Dropout Architecture",
      "Stable Output Regulation",
      "Fast Load Response",
      "Integrated Protection Features",
      "Compact Solution",
    ],
    image: "/images/ldo.jfif",
    icon: Radio,
    gradient: "from-purple-500 to-pink-500",
    color: "purple",
  },
  {
    id: "led-driver",
    name: "LED Driver",
    fullName: "Linear LED Driver",
    category: "Lighting Solutions",
    description:
      "A compact linear LED driver providing accurate current regulation, simplified design, and cost-effective solutions across automotive, industrial and consumer applications.",
    longDescription:
      "A compact linear LED driver providing accurate current regulation, simplified design, and cost-effective solutions across automotive, industrial and consumer applications. Features PWM dimming support and uniform LED brightness across supply variations.",
    specs: [
      "Vin: 2.5V to 55V",
      "Iout: 180mA",
      "PWM Dimming: 2KHz",
      "-40°C to +125°C",
      "Accurate Regulation",
    ],
    applications: [
      "Industrial Indicators",
      "Building Lighting",
      "Smart Home Lighting",
      "Consumer Electronics",
      "Signage Displays",
      "Portable Lighting",
      "Smart City Infrastructure",
    ],
    features: [
      "Uniform LED Brightness",
      "Compact Solution Footprint",
      "Minimal Design Complexity",
      "Integrated Protection Functions",
      "PWM Dimming Support",
      "Easy Integration",
    ],
    image: "/images/led.jfif",
    icon: Layers,
    gradient: "from-orange-500 to-amber-500",
    color: "orange",
  },
  {
    id: "load-switch",
    name: "Load Switch",
    fullName: "Single N-Channel Load Switch",
    category: "Protection & Control",
    description:
      "Single Channel High-side load switch with low RDS(ON) and integrated protection features for controlled power distribution.",
    longDescription:
      "Single Channel High-side load switch with low RDS(ON) and integrated protection features for controlled power distribution. Features programmable soft start, discharge rate control, and power good indicator for reliable system operation.",
    specs: [
      "Vin: 2V to 5V",
      "RDS(ON): 25mΩ",
      "Iout: 3A",
      "-40°C to +125°C",
      "Low Quiescent Current",
    ],
    applications: [
      "Power Distribution Subsystems",
      "Networking Equipment",
      "Battery-Powered Equipment",
      "Computing Platforms",
      "Industrial Automation",
      "IoT and Edge Devices",
      "Embedded Processing",
    ],
    features: [
      "Integrated N-Channel MOSFET",
      "Low RDS(ON)",
      "Low Quiescent Current",
      "Programmable Soft Start",
      "Programmable Discharge Rate",
      "Power Good Indicator",
    ],
    image: "/images/load.jfif",
    icon: Gauge,
    gradient: "from-indigo-500 to-purple-500",
    color: "indigo",
  },
  {
    id: "ideal-diode-controller",
    name: "Ideal Diode Controller",
    fullName: "Ideal Diode Controller with Reverse Protection",
    category: "Protection & Control",
    description:
      "An ideal diode controller designed for efficient power-path management, minimizing power loss while protecting against reverse current conditions.",
    longDescription:
      "An ideal diode controller designed for efficient power-path management, minimizing power loss while protecting against reverse current conditions. Features reverse current protection, reduced power dissipation, and supports redundant power architectures.",
    specs: [
      "Vin: 3.5V to 60V",
      "Low IQ: 100uA",
      "Ultra-Low Forward Drop",
      "-40°C to +125°C",
      "Reverse Protection",
    ],
    applications: [
      "Battery Management Systems (BMS)",
      "Computing Platforms",
      "Networking Equipment",
      "Telecom Infrastructure",
      "Industrial Automation",
      "Power Distribution Modules",
      "Redundant Power Supplies",
      "Advanced Control Systems",
    ],
    features: [
      "Reverse Current Protection",
      "Reduced Power Dissipation",
      "Supports Redundant Architectures",
      "Improved System Reliability",
      "Compact Implementation",
      "Simplified Integration",
    ],
    image: "/images/ideal.jfif",
    icon: Plug,
    gradient: "from-red-500 to-rose-500",
    color: "red",
  },
];

const categories = [
  "All",
  "Switching Regulators",
  "Linear Regulators",
  "Lighting Solutions",
  "Protection & Control",
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: index * 0.05,
            ease: "power2.out",
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory, searchTerm]);

  const handleCardHover = (index: number, isEnter: boolean) => {
    setHoveredCard(isEnter ? index : null);
  };

  return (
    <>
      <Navbar />
      <main ref={sectionRef} className="bg-white min-h-screen">
        {/* Hero Section - Smaller height */}
        <section className="relative bg-gradient-to-br from-[#0F2747] via-[#1a3a5e] to-[#0F2747] overflow-hidden">
          {/* Geometric Abstract Background Shapes */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#3B5F8A]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#3B5F8A]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3B5F8A]/5 rounded-full blur-3xl" />

            {/* Grid Pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />

            {/* Circuit Lines Decoration */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.05]">
              <line
                x1="10%"
                y1="20%"
                x2="30%"
                y2="40%"
                stroke="white"
                strokeWidth="1"
              />
              <line
                x1="30%"
                y1="40%"
                x2="50%"
                y2="35%"
                stroke="white"
                strokeWidth="1"
              />
              <line
                x1="50%"
                y1="35%"
                x2="70%"
                y2="50%"
                stroke="white"
                strokeWidth="1"
              />
              <line
                x1="70%"
                y1="50%"
                x2="90%"
                y2="30%"
                stroke="white"
                strokeWidth="1"
              />
              <circle cx="10%" cy="20%" r="3" fill="white" opacity="0.3" />
              <circle cx="30%" cy="40%" r="3" fill="white" opacity="0.3" />
              <circle cx="50%" cy="35%" r="3" fill="white" opacity="0.3" />
              <circle cx="70%" cy="50%" r="3" fill="white" opacity="0.3" />
              <circle cx="90%" cy="30%" r="3" fill="white" opacity="0.3" />
            </svg>
          </div>

          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl relative z-10">
            <div className="py-12  text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Products
              </h1>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-10">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            {/* Filters */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeCategory === cat
                        ? "bg-slate-900 text-white shadow-lg"
                        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => {
                const Icon = product.icon;
                const isHovered = hoveredCard === index;

                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    ref={(el) => {
                      if (el) cardsRef.current[index] = el as HTMLDivElement;
                    }}
                    className="group block"
                    onMouseEnter={() => handleCardHover(index, true)}
                    onMouseLeave={() => handleCardHover(index, false)}
                  >
                    <Card className="overflow-hidden bg-white border border-slate-200 hover:shadow-xl transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
                      {/* Image Section */}
                      <div className="relative h-48 overflow-hidden bg-slate-100">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent`}
                        />

                        {/* Category Badge */}
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 rounded-md bg-white/90 backdrop-blur-sm text-xs font-medium text-slate-700 shadow-sm">
                            {product.category}
                          </span>
                        </div>

                        {/* Icon */}
                        <div className="absolute bottom-3 right-3 p-2 rounded-lg bg-white/90 backdrop-blur-sm shadow-sm">
                          <Icon className="w-5 h-5 text-slate-700" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="text-lg font-bold text-slate-900 mb-0.5">
                          {product.name}
                        </h3>
                        <p className="text-slate-500 text-xs mb-2">
                          {product.fullName}
                        </p>
                        <p className="text-slate-600 text-sm leading-relaxed mb-3 flex-1">
                          {product.description}
                        </p>

                        {/* Specs */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {product.specs.slice(0, 4).map((spec, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded bg-slate-100 text-xs text-slate-600"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>

                        {/* Learn More */}
                        <div
                          className={`inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${
                            isHovered ? "text-blue-600" : "text-slate-700"
                          }`}
                        >
                          Learn More
                          <ArrowRight
                            className={`w-4 h-4 transition-transform duration-300 ${
                              isHovered ? "translate-x-1" : ""
                            }`}
                          />
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-2xl mb-2">🔍</p>
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  No products found
                </h3>
                <p className="text-slate-600 text-sm">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
