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

// // Requirement-based products only
// const products = [
//   {
//     id: "boost-converter",
//     name: "Boost Converter",
//     fullName: "Boost Converter for Battery Operated Systems",
//     category: "Switching Regulators",
//     description:
//       "A compact Boost converter device for efficient voltage regulation in portable electronics.",
//     longDescription:
//       "A compact Boost converter device for efficient voltage regulation in portable electronics. Optimized for stable performance in space-constrained applications. Used in consumer gadgets and IoT devices for reliable power delivery.",
//     specs: [
//       "Battery Operated",
//       "Compact Design",
//       "Stable Performance",
//       "Space-Constrained",
//       "Portable",
//     ],
//     applications: [
//       "Consumer Gadgets",
//       "IoT Devices",
//       "Portable Electronics",
//       "Wearables",
//     ],
//     image: "/images/boost.jfif",
//     icon: Battery,
//     gradient: "from-blue-500 to-cyan-500",
//     lightGradient: "from-blue-50 to-cyan-50",
//     color: "blue",
//     features: [
//       "Efficient voltage regulation for portable use",
//       "Optimized for space-constrained applications",
//       "Reliable power delivery for IoT & consumer gadgets",
//       "Stable performance across operating conditions",
//     ],
//   },
//   {
//     id: "buck-regulator",
//     name: "Buck Regulator",
//     fullName: "High Input Voltage Tolerant Buck Regulator",
//     category: "Switching Regulators",
//     description:
//       "A highly integrated buck regulator aimed at simplifying power conversion in modern electronic systems.",
//     longDescription:
//       "A highly integrated buck regulator aimed at simplifying power conversion in modern electronic systems. Designed to reduce component count and streamline board design. Used in computing (DPA systems), networking, and general-purpose electronic systems.",
//     specs: [
//       "High Input Voltage",
//       "Integrated Design",
//       "Reduced BOM",
//       "Streamlined Board",
//       "High Efficiency",
//     ],
//     applications: [
//       "Computing (DPA Systems)",
//       "Networking",
//       "General-Purpose Electronics",
//       "Industrial Systems",
//     ],
//     image: "/images/buck.jfif",
//     icon: Zap,
//     gradient: "from-emerald-500 to-teal-500",
//     lightGradient: "from-emerald-50 to-teal-50",
//     color: "emerald",
//     features: [
//       "High input voltage tolerance",
//       "Reduced component count for simpler board design",
//       "Suitable for computing and networking systems",
//       "Highly integrated for streamlined power conversion",
//     ],
//   },
//   {
//     id: "ldo-regulator",
//     name: "LDO Regulator",
//     fullName: "Ultra Low Drop Out Regulator with High Input Voltage Tolerance",
//     category: "Linear Regulators",
//     description:
//       "A versatile linear regulator device intended for dependable power control in everyday electronic products.",
//     longDescription:
//       "A versatile linear regulator device intended for dependable power control in everyday electronic products. Focuses on ease of use and broad compatibility across applications. Suitable for consumer electronics and embedded system designs.",
//     specs: [
//       "Ultra Low Dropout",
//       "High Input Voltage",
//       "Broad Compatibility",
//       "Easy to Use",
//       "Versatile",
//     ],
//     applications: [
//       "Consumer Electronics",
//       "Embedded Systems",
//       "Everyday Electronics",
//       "IoT Modules",
//     ],
//     image: "/images/ldo.jfif",
//     icon: Radio,
//     gradient: "from-purple-500 to-pink-500",
//     lightGradient: "from-purple-50 to-pink-50",
//     color: "purple",
//     features: [
//       "Ultra low dropout voltage",
//       "High input voltage tolerance",
//       "Broad application compatibility",
//       "Easy integration into consumer and embedded designs",
//     ],
//   },
//   {
//     id: "led-driver",
//     name: "LED Driver",
//     fullName: "High Input Voltage Tolerant Linear LED Driver",
//     category: "Lighting Solutions",
//     description:
//       "A dedicated linear LED driver solution for lighting applications focusing on ease-of-use and very low BOM count.",
//     longDescription:
//       "A dedicated linear LED driver solution for lighting applications focusing on ease-of-use and very low BOM count. Provides consistent illumination control for energy-efficient lighting designs. Ideal for commercial, industrial, and decorative lighting systems.",
//     specs: [
//       "High Input Voltage",
//       "Linear Driver",
//       "Low BOM Count",
//       "Consistent Illumination",
//       "Energy Efficient",
//     ],
//     applications: [
//       "Commercial Lighting",
//       "Industrial Lighting",
//       "Decorative Lighting",
//       "Smart Lighting",
//     ],
//     image: "/images/led.jfif",
//     icon: Layers,
//     gradient: "from-orange-500 to-amber-500",
//     lightGradient: "from-orange-50 to-amber-50",
//     color: "orange",
//     features: [
//       "Dedicated linear LED driver architecture",
//       "Very low BOM count for cost-effective designs",
//       "Consistent illumination control",
//       "Suitable for commercial, industrial & decorative lighting",
//     ],
//   },
//   {
//     id: "ideal-diode-controller",
//     name: "Ideal Diode Controller",
//     fullName: "High Input Voltage Tolerant Ideal Diode Controller",
//     category: "Protection & Control",
//     description:
//       "Designed to deliver robust power handling for battery management systems (BMS).",
//     longDescription:
//       "Designed to deliver robust power handling for battery management systems (BMS). Enhances system reliability through efficient load management. Used in applications such as computing infrastructure, automotive, and industrial equipment.",
//     specs: [
//       "High Input Voltage",
//       "BMS Compatible",
//       "Efficient Load Mgmt",
//       "Robust Power Handling",
//       "Reliable",
//     ],
//     applications: [
//       "Computing Infrastructure",
//       "Automotive",
//       "Industrial Equipment",
//       "Battery Management Systems",
//     ],
//     image: "/images/ideal.jfif",
//     icon: GitBranch,
//     gradient: "from-red-500 to-rose-500",
//     lightGradient: "from-red-50 to-rose-50",
//     color: "red",
//     features: [
//       "Robust power handling for BMS applications",
//       "Efficient load management for improved reliability",
//       "High input voltage tolerance",
//       "Suitable for automotive and industrial environments",
//     ],
//   },
//   {
//     id: "load-switch",
//     name: "Load Switch",
//     fullName: "Single N-Channel Load Switch",
//     category: "Protection & Control",
//     description:
//       "A protection-oriented device that helps safeguard electronic systems during operation.",
//     longDescription:
//       "A protection-oriented device that helps safeguard electronic systems during operation. Enables controlled power distribution and improved system safety. Commonly implemented in USB-powered and portable device applications.",
//     specs: [
//       "N-Channel MOSFET",
//       "Controlled Power Dist.",
//       "System Protection",
//       "USB Compatible",
//       "Portable Devices",
//     ],
//     applications: [
//       "USB-Powered Devices",
//       "Portable Electronics",
//       "Power Distribution",
//       "System Protection",
//     ],
//     image: "/images/load.jfif",
//     icon: Wifi,
//     gradient: "from-indigo-500 to-purple-500",
//     lightGradient: "from-indigo-50 to-purple-50",
//     color: "indigo",
//     features: [
//       "Single N-Channel architecture for reliable switching",
//       "Controlled power distribution",
//       "Improved system safety and protection",
//       "Ideal for USB-powered and portable applications",
//     ],
//   },
// ];

// // Requirement-based categories only
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
//       product.description.toLowerCase().includes(searchTerm.toLowerCase());
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
//         <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
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
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 shadow-sm mb-6">
//               <Sparkles className="w-4 h-4 text-blue-600" />
//               <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
//                 Our Portfolio
//               </span>
//             </div>

//             <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
//               Products
//             </h1>

//             <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
//               Comprehensive Analog IPs and Products including Power management,
//               Data Converters, Clocking Solutions and Interface Circuits for
//               modern electronic Systems and Solutions.
//             </p>
//           </div>
//         </section>

//         {/* Products Section */}
//         <section className="py-16">
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
//                       <div className="relative b h-48 overflow-hidden">
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
//                         <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-700 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
//                           {product.name}
//                         </h3>
//                         <p className="text-slate-600 text-sm leading-relaxed mb-4">
//                           {product.description}
//                         </p>

//                         <div className="flex flex-wrap gap-2 mb-6">
//                           {product.specs.slice(0, 3).map((spec, idx) => (
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
//             {/* Requirement-aligned CTA Section */}
//             <div className="mt-20 pt-12 border-t border-slate-200">
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
  Cpu,
  Zap,
  Shield,
  Microchip,
  Target,
  Sparkles,
  Filter,
  Search,
  TrendingUp,
  Award,
  Clock,
  Battery,
  Radio,
  GitBranch,
  Layers,
  Wifi,
  Gauge,
  Plug,
  Leaf,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProcessTimelineSection } from "@/components/home/ProcessTimelineSection";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Updated product data based on the provided semiconductor products
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
    lightGradient: "from-emerald-50 to-teal-50",
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
    lightGradient: "from-blue-50 to-cyan-50",
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
    lightGradient: "from-purple-50 to-pink-50",
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
    lightGradient: "from-orange-50 to-amber-50",
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
    lightGradient: "from-indigo-50 to-purple-50",
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
    lightGradient: "from-red-50 to-rose-50",
    color: "red",
  },
];

// Categories based on the new products
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
  const heroRef = useRef<HTMLDivElement>(null);
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

      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.05,
            ease: "back.out(0.4)",
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
      <main
        ref={sectionRef}
        className="bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen"
      >
        {/* Hero Section */}
        <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
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
            className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-center py-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 shadow-sm mb-6">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
                Our Portfolio
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
              Products
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive Analog IPs and Products including Power Management,
              LED Drivers, Load Switches, and Protection Circuits for modern
              electronic Systems and Solutions.
            </p>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            {/* Filters */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                      activeCategory === cat
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25"
                        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
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
                    className="group relative block"
                    onMouseEnter={() => handleCardHover(index, true)}
                    onMouseLeave={() => handleCardHover(index, false)}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${product.gradient} rounded-xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                    />

                    <Card className="relative overflow-hidden bg-white border-slate-200 hover:shadow-xl transition-all duration-500 h-full flex flex-col group-hover:-translate-y-2 cursor-pointer">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${product.gradient} mix-blend-multiply opacity-40`}
                        />

                        <div className="absolute top-4 left-4">
                          <div
                            className={`px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-sm shadow-lg`}
                          >
                            <span className="text-xs font-bold text-slate-800">
                              {product.category}
                            </span>
                          </div>
                        </div>

                        <div
                          className={`absolute bottom-4 right-4 w-12 h-12 rounded-xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg transition-all duration-300 ${isHovered ? "scale-110" : ""}`}
                        >
                          <Icon
                            className={`w-6 h-6 transition-colors duration-300`}
                            style={{
                              color: isHovered ? `#0ea5e9` : "#475569",
                            }}
                          />
                        </div>
                      </div>

                      <div className="p-6 flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-700 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                          {product.name}
                        </h3>
                        <p className="text-slate-500 text-xs mb-3">
                          {product.fullName}
                        </p>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                          {product.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {product.specs.slice(0, 4).map((spec, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 rounded-md bg-slate-100 text-xs font-medium text-slate-600"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>

                        <div
                          className={`inline-flex items-center gap-2 font-semibold transition-all duration-300 ${
                            isHovered ? `text-blue-600 gap-3` : "text-slate-700"
                          }`}
                        >
                          Learn More
                          <ArrowRight
                            className={`w-4 h-4 transition-all duration-300 ${isHovered ? "translate-x-1" : ""}`}
                          />
                        </div>
                      </div>

                      <div
                        className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
                      >
                        <div
                          className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${product.gradient} opacity-20`}
                        />
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  No products found
                </h3>
                <p className="text-slate-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
            <br />
            <ProcessTimelineSection />
            {/* Requirement-aligned CTA Section */}
            <div className="mt-20 pt-12 border-t border-slate-200">
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Need More Information?
                </h3>
                <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                  Contact our team to learn more about our semiconductor and
                  power management solutions.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Contact Team
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
