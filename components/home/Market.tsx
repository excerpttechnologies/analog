// "use client";

// import { useEffect, useRef, useState, useCallback } from "react";
// import {
//   Car,
//   Shield,
//   Rocket,
//   Home,
//   Building2,
//   Cpu,
//   Zap,
//   Globe,
//   TrendingUp,
//   ArrowUpRight,
//   CheckCircle,
//   MapPin,
//   Briefcase,
//   BarChart3,
//   LineChart as LineChartIcon,
//   ChevronRight,
//   Activity,
//   Lightbulb,
//   Wrench,
// } from "lucide-react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Cell,
//   Area,
//   AreaChart,
// } from "recharts";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// // ─── Data ──────────────────────────────────────────────────────────────────────

// type Tab = "domestic" | "overseas";

// const DOMESTIC = [
//   {
//     name: "Government Organisations",
//     tag: "Indigenisation",
//     icon: Shield,
//     desc: "",
//     longDesc:
//       "Strategic semiconductor partner for Defence and Space Applications under India's indigenisation drive.",
//     accent: "#DC2626",
//     stat: "Indigenisation",
//     items: [],
//   },
//   {
//     name: "Automotive Industries",
//     tag: "OEM & Tier-1",
//     icon: Car,
//     desc: "",
//     longDesc:
//       "Supplying precision analog ICs to India's leading automotive OEMs including EV power management, ADAS sensors, battery monitoring, and in-vehicle networking.",
//     accent: "#2563EB",
//     stat: "OEM & Tier-1",
//     items: [],
//   },
//   {
//     name: "System Level Designers",
//     tag: "Engineering",
//     icon: Cpu,
//     desc: "",
//     longDesc:
//       "Enabling system integrators and engineering services firms with robust analog and mixed-signal ICs for industrial, embedded, and IoT system designs.",
//     accent: "#7C3AED",
//     stat: "Engineering",
//     items: [],
//   },
//   {
//     name: "Home Appliances Manufacturers",
//     tag: "Smart Devices",
//     icon: Home,
//     desc: "Washing Machines, Refrigerators, Microwave Ovens, Fans, etc. — smart motor & power ICs.",
//     longDesc:
//       "Powering India's consumer appliance industry with energy-efficient analog solutions. Our ICs enable intelligent motor control, efficient power management, and sensor integration for washing machines, refrigerators, microwave ovens, fans, and more.",
//     accent: "#059669",
//     stat: "Smart Devices",
//     items: [],
//   },
//   {
//     name: "EV & Lighting Industries",
//     tag: "Energy",
//     icon: Lightbulb,
//     desc: "Electric vehicle charging, battery management, and smart lighting control ICs.",
//     longDesc:
//       "Providing semiconductor solutions for the rapidly growing EV charging infrastructure and smart lighting sectors. Our ICs support efficient power conversion, battery management, and LED driver applications.",
//     accent: "#EA580C",
//     stat: "Energy",
//     items: [],
//   },
//   {
//     name: "Plug-in Replacement",
//     tag: "MNC Analog IPs",
//     icon: Wrench,
//     desc: "Drop-in replacements for many MNC Analog IPs and Devices across domestic designs.",
//     longDesc:
//       "Offering pin-compatible, performance-matched alternatives to MNC analog IPs and devices used in domestic electronic designs. Our plug-in replacements enable seamless migration, supply chain resilience, and cost optimisation.",
//     accent: "#0891B2",
//     stat: "MNC Analog IPs",
//     items: [],
//   },
// ];

// const OVERSEAS = [
//   {
//     name: "Plug-in Replacement for MNC Analog IPs",
//     tag: "Global",
//     icon: Globe,
//     desc: "Drop-in replacements for many MNC Analog IPs and Devices in global markets.",
//     longDesc:
//       "Delivering pin-compatible and performance-matched alternatives to leading MNC analog IPs and devices. Our solutions enable global customers to migrate seamlessly, diversify their supply chain, and reduce component costs without redesign.",
//     accent: "#2563EB",
//     stat: "Global",
//     items: [
//       "Pin-Compatible ICs",
//       "Performance-Matched",
//       "Supply Chain Diversity",
//       "No Redesign Required",
//     ],
//   },
//   {
//     name: "Texas Instruments (TI)",
//     tag: "USA",
//     icon: Cpu,
//     desc: "Compatible alternatives to TI's broad analog and mixed-signal IC portfolio.",
//     longDesc:
//       "Providing drop-in replacements for Texas Instruments' analog, power management, and mixed-signal ICs, ensuring supply chain resilience and competitive pricing for global customers.",
//     accent: "#EA580C",
//     stat: "USA",
//     items: [
//       "Analog ICs",
//       "Power Management",
//       "Mixed-Signal",
//       "Plug-in Replacement",
//     ],
//   },
//   {
//     name: "Analog Devices & Maxim",
//     tag: "USA",
//     icon: Zap,
//     desc: "Precision analog and data conversion IC alternatives for Analog Devices and Maxim.",
//     longDesc:
//       "Offering pin-compatible alternatives to Analog Devices and Maxim precision analog, data conversion, and signal chain ICs, enabling seamless migration and second-source flexibility.",
//     accent: "#DC2626",
//     stat: "USA",
//     items: [
//       "Precision Analog",
//       "Data Conversion",
//       "Signal Chain",
//       "Second Source",
//     ],
//   },
//   {
//     name: "Infineon & MPS",
//     tag: "Germany / USA",
//     icon: Shield,
//     desc: "Power semiconductors and automotive-grade ICs compatible with Infineon and MPS.",
//     longDesc:
//       "Compatible alternatives for Infineon and MPS power management and automotive ICs, providing supply chain resilience and direct drop-in replacements at competitive pricing.",
//     accent: "#059669",
//     stat: "Germany / USA",
//     items: [
//       "Power Semiconductors",
//       "Automotive ICs",
//       "Plug-in Replacement",
//       "Direct Compatible",
//     ],
//   },
//   {
//     name: "Renesas & RichTek",
//     tag: "Japan / Taiwan",
//     icon: Building2,
//     desc: "Microcontroller, embedded processor, and power IC alternatives for Renesas & RichTek.",
//     longDesc:
//       "Compatible alternatives for Renesas and RichTek's microcontroller, embedded processor, and analog IC portfolios, enabling design flexibility and supply chain optimisation.",
//     accent: "#7C3AED",
//     stat: "Japan / Taiwan",
//     items: [
//       "Microcontrollers",
//       "Embedded Processors",
//       "Power ICs",
//       "Drop-in Replacement",
//     ],
//   },
//   {
//     name: "STMicroelectronics",
//     tag: "Switzerland",
//     icon: TrendingUp,
//     desc: "Broad portfolio of industrial and embedded semiconductor alternatives to STMicro.",
//     longDesc:
//       "Pin-compatible alternatives for STMicroelectronics' industrial and embedded semiconductor portfolio, providing reliable second-source options and supply chain diversity for global customers.",
//     accent: "#0891B2",
//     stat: "Switzerland",
//     items: [
//       "Industrial Solutions",
//       "Embedded Systems",
//       "Plug-in Replacement",
//       "Global Support",
//     ],
//   },
// ];

// const GROWTH_DATA = [
//   { year: "2020", domestic: 42, overseas: 38, total: 80 },
//   { year: "2021", domestic: 48, overseas: 42, total: 90 },
//   { year: "2022", domestic: 56, overseas: 48, total: 104 },
//   { year: "2023", domestic: 68, overseas: 58, total: 126 },
//   { year: "2024", domestic: 85, overseas: 72, total: 157 },
// ];

// const INITIATIVES = [
//   { name: "R&D Investment", value: 68, color: "#2563EB" },
//   { name: "Design Centers", value: 45, color: "#7C3AED" },
//   { name: "Customer Support", value: 82, color: "#059669" },
//   { name: "Patent Filings", value: 54, color: "#DC2626" },
//   { name: "Partnerships", value: 71, color: "#EA580C" },
// ];

// const SUMMARY_STATS = [
//   {
//     val: "+96%",
//     label: "Total Revenue Growth",
//     sub: "2020 → 2024",
//     color: "#2563EB",
//   },
//   {
//     val: "68%",
//     label: "R&D Investment",
//     sub: "$34M of $50M",
//     color: "#7C3AED",
//   },
//   {
//     val: "82%",
//     label: "Customer Support",
//     sub: "24/7 Global",
//     color: "#059669",
//   },
//   {
//     val: "15+",
//     label: "Countries Served",
//     sub: "Global Presence",
//     color: "#DC2626",
//   },
// ];

// // ─── Counter hook ──────────────────────────────────────────────────────────────

// function useCountUp(target: number, dur = 1600, go = false) {
//   const [n, setN] = useState(0);
//   useEffect(() => {
//     if (!go) return;
//     let t0: number | null = null;
//     const tick = (ts: number) => {
//       if (!t0) t0 = ts;
//       const p = Math.min((ts - t0) / dur, 1);
//       setN(Math.floor((1 - Math.pow(1 - p, 3)) * target));
//       if (p < 1) requestAnimationFrame(tick);
//     };
//     requestAnimationFrame(tick);
//   }, [target, dur, go]);
//   return n;
// }

// // ─── Market Card ───────────────────────────────────────────────────────────────

// function MarketCard({
//   item,
//   index,
// }: {
//   item: (typeof DOMESTIC)[0];
//   index: number;
// }) {
//   const [open, setOpen] = useState(false);
//   const Icon = item.icon;
//   const bodyRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const el = bodyRef.current;
//     if (!el) return;
//     gsap.to(el, {
//       height: open ? el.scrollHeight : 0,
//       opacity: open ? 1 : 0,
//       duration: 0.4,
//       ease: open ? "power3.out" : "power3.in",
//     });
//   }, [open]);

//   return (
//     <div
//       className="market-card group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 bg-white border border-slate-200 shadow-sm hover:shadow-xl"
//       onClick={() => setOpen((v) => !v)}
//     >
//       {/* Top accent border */}
//       <div
//         className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-400"
//         style={{
//           background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)`,
//           opacity: open ? 1 : 0,
//         }}
//       />

//       {/* Header row */}
//       <div className="flex items-center gap-4 p-5">
//         {/* Icon */}
//         {/* <div
//           className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
//           style={{
//             background: `${item.accent}10`,
//             border: `1px solid ${item.accent}30`,
//           }}
//         >
//           <Icon size={22} color={item.accent} />
//         </div> */}

//         {/* Text */}
//         <div className="flex-1 min-w-0">
//           <div className="flex items-center gap-2 mb-0.5">
//             <span className="text-slate-800 font-bold text-base tracking-tight">
//               {item.name}
//             </span>
//             <span
//               className="text-xs font-bold px-2 py-0.5 rounded-full"
//               style={{
//                 background: `${item.accent}15`,
//                 color: item.accent,
//               }}
//             >
//               {item.tag}
//             </span>
//           </div>
//           <p className="text-xs text-slate-400 leading-relaxed line-clamp-1">
//             {item.desc}
//           </p>
//         </div>

//         {/* Arrow */}
//         <ChevronRight
//           size={16}
//           className="flex-shrink-0 text-slate-300 transition-transform duration-300"
//           style={{
//             transform: open ? "rotate(90deg)" : "rotate(0deg)",
//             color: open ? item.accent : undefined,
//           }}
//         />
//       </div>

//       {/* Expandable body */}
//       <div ref={bodyRef} style={{ height: 0, overflow: "hidden", opacity: 0 }}>
//         <div className="px-5 pb-5 border-t border-slate-100">
//           <p className="text-xs text-slate-500 mt-4 mb-4 leading-relaxed italic">
//             {item.longDesc}
//           </p>
//           <div className="flex flex-wrap gap-2">
//             {item.items.map((it) => (
//               <span
//                 key={it}
//                 className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-700"
//               >
//                 <CheckCircle size={10} color={item.accent} />
//                 {it}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Bottom accent bar */}
//       <div
//         className="absolute bottom-0 left-0 h-[2px] transition-all duration-500"
//         style={{
//           background: item.accent,
//           width: open ? "100%" : "0%",
//         }}
//       />
//     </div>
//   );
// }

// // ─── Custom chart tooltip ──────────────────────────────────────────────────────

// function ChartTip({ active, payload, label }: any) {
//   if (!active || !payload?.length) return null;
//   return (
//     <div className="rounded-xl px-4 py-3 text-sm bg-white shadow-lg border border-slate-200">
//       <p className="font-bold text-slate-800 mb-1">{label}</p>
//       {payload.map((p: any, i: number) => (
//         <p key={i} className="text-xs" style={{ color: p.color }}>
//           {p.name}: <span className="font-bold">${p.value}M</span>
//         </p>
//       ))}
//     </div>
//   );
// }

// function BarTip({ active, payload, label }: any) {
//   if (!active || !payload?.length) return null;
//   return (
//     <div className="rounded-xl px-4 py-3 text-sm bg-white shadow-lg border border-slate-200">
//       <p className="font-bold text-slate-800 mb-1">{label}</p>
//       <p className="text-xs text-slate-600">
//         Progress:{" "}
//         <span className="font-bold text-slate-800">{payload[0]?.value}%</span>
//       </p>
//     </div>
//   );
// }

// // ─── Main Section ──────────────────────────────────────────────────────────────

// export function MarketOpportunitiesSection() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const headerRef = useRef<HTMLDivElement>(null);
//   const chartsRef = useRef<HTMLDivElement>(null);
//   const statsRef = useRef<HTMLDivElement>(null);
//   const [tab, setTab] = useState<Tab>("domestic");
//   const [chartGo, setChartGo] = useState(false);
//   const [statsGo, setStatsGo] = useState(false);

//   const markets = tab === "domestic" ? DOMESTIC : OVERSEAS;

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Header reveal
//       gsap.fromTo(
//         ".mos-title-word",
//         { y: "110%", opacity: 0 },
//         {
//           y: "0%",
//           opacity: 1,
//           duration: 0.9,
//           stagger: 0.1,
//           ease: "expo.out",
//           scrollTrigger: { trigger: headerRef.current, start: "top 88%" },
//         },
//       );
//       gsap.fromTo(
//         ".mos-sub",
//         { opacity: 0, y: 20 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 0.7,
//           delay: 0.5,
//           ease: "power2.out",
//           scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
//         },
//       );

//       // Stats counter
//       ScrollTrigger.create({
//         trigger: statsRef.current,
//         start: "top 85%",
//         once: true,
//         onEnter: () => setStatsGo(true),
//       });

//       // Charts
//       ScrollTrigger.create({
//         trigger: chartsRef.current,
//         start: "top 80%",
//         once: true,
//         onEnter: () => {
//           setChartGo(true);
//           gsap.fromTo(
//             ".mos-chart-card",
//             { opacity: 0, y: 40 },
//             {
//               opacity: 1,
//               y: 0,
//               duration: 0.7,
//               stagger: 0.15,
//               ease: "power3.out",
//             },
//           );
//         },
//       });

//       // Summary stat cards
//       gsap.fromTo(
//         ".mos-summary-card",
//         { opacity: 0, y: 30, scale: 0.95 },
//         {
//           opacity: 1,
//           y: 0,
//           scale: 1,
//           duration: 0.55,
//           stagger: 0.08,
//           ease: "back.out(1.3)",
//           scrollTrigger: { trigger: ".mos-summary-row", start: "top 88%" },
//         },
//       );

//       // Divider draw
//       gsap.fromTo(
//         ".mos-divider",
//         { scaleX: 0 },
//         {
//           scaleX: 1,
//           duration: 1.2,
//           ease: "expo.out",
//           transformOrigin: "left",
//           scrollTrigger: { trigger: ".mos-divider", start: "top 90%" },
//         },
//       );
//     }, sectionRef);
//     return () => ctx.revert();
//   }, []);

//   // Re-animate market cards on tab switch
//   useEffect(() => {
//     gsap.fromTo(
//       ".market-card",
//       { opacity: 0, y: 28, scale: 0.96 },
//       {
//         opacity: 1,
//         y: 0,
//         scale: 1,
//         duration: 0.5,
//         stagger: 0.07,
//         ease: "power4.out",
//       },
//     );
//   }, [tab]);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative py-24 font-['Instrument_Sans',sans-serif] md:py-32 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden"
//     >
//       {/* Background Elements */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-3xl" />
//         <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-100/30 rounded-full blur-3xl" />
//         <div
//           className="absolute inset-0 opacity-[0.02]"
//           style={{
//             backgroundImage: `radial-gradient(circle at 1px 1px, rgb(14, 165, 233) 1px, transparent 1px)`,
//             backgroundSize: "40px 40px",
//           }}
//         />
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
//         {/* ── HEADER ─────────────────────────────────────────────────────── */}
//         <div ref={headerRef} className="mb-10">
//           {/* Eyebrow */}

//           {/* Title */}
//           <h2 className=" overflow-hidden leading-tight">
//             <span className="inline-block overflow-hidden align-bottom mr-4">
//               <span
//                 className="mos-title-word inline-block text-4xl md:text-5xl lg:text-6xl font-bold"
//                 style={{
//                   color: "#0F172A",
//                   letterSpacing: "-0.02em",
//                 }}
//               >
//                 Market
//               </span>
//             </span>
//             <span className="inline-block overflow-hidden align-bottom">
//               <span
//                 className="mos-title-word inline-block text-4xl md:text-5xl lg:text-6xl font-bold"
//                 style={{
//                   color: "#2563EB",
//                   letterSpacing: "-0.02em",
//                 }}
//               >
//                 Opportunities
//               </span>
//             </span>
//           </h2>

//           {/* <p className="mos-sub text-base text-slate-500 max-w-xl leading-relaxed">
//             Serving domestic industries and global semiconductor ecosystems with
//             advanced analog and mixed-signal technologies.
//           </p> */}
//         </div>

//         {/* ── TABS + MARKET CARDS ────────────────────────────────────────── */}
//         <div className="mb-14">
//           {/* Tabs */}

//           {/* Market Opportunity Description */}
//           <div className="mb-8 p-5 rounded-2xl -mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100">
//             {/* <h4 className="text-lg font-semibold text-slate-800 mb-2">
//               Market Opportunity
//             </h4> */}
//             <p className="text-slate-600 text-lg leading-relaxed">
//               The demand for efficient Analog IPs and Products is rapidly
//               increasing due to growth in IoT and connected devices,
//               electrification of automotive systems, expansion of data
//               infrastructure, and need for energy-efficient electronics. Analog
//               ICs are critical enablers in all modern electronic designs.
//             </p>
//           </div>

//           {/* Grid of accordion cards — 2 cols on md+ */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             {markets.map((m: any, i) => (
//               <MarketCard key={`${tab}-${i}`} item={m} index={i} />
//             ))}
//           </div>
//         </div>

//         {/* ── CHARTS ─────────────────────────────────────────────────────── */}

//         {/* ── TARGET MARKETS ──────────────────────────────────────────────── */}
//         <div className="mt-16 pt-8">
//           <h3 className="text-xl font-bold text-slate-800 mb-4">
//             Target Markets
//           </h3>
//           <div className="flex flex-wrap gap-3">
//             {[
//               "Consumer Electronics",
//               "IoT & Embedded Systems",
//               "Computing & Networking",
//               "Automotive Electronics",
//               "Industrial Equipment",
//               "Smart Lighting",
//               "Data Infrastructure",
//             ].map((market) => (
//               <span
//                 key={market}
//                 className="px-4 py-2 rounded-full bg-white border border-slate-200 text-sm text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-all duration-300"
//               >
//                 {market}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Car,
  Shield,
  Rocket,
  Home,
  Building2,
  Cpu,
  Zap,
  Globe,
  TrendingUp,
  ArrowUpRight,
  CheckCircle,
  MapPin,
  Briefcase,
  BarChart3,
  LineChart as LineChartIcon,
  ChevronRight,
  Activity,
  Lightbulb,
  Wrench,
  Network,
  Server,
  Plug,
  Leaf,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Data ──────────────────────────────────────────────────────────────────────

type Tab = "domestic" | "overseas";

const DOMESTIC = [
  {
    name: "Government & Strategic Programs",
    tag: "Indigenisation",
    icon: Shield,
    desc: "",
    longDesc:
      "Strategic semiconductor partner for Defence and Space Applications under India's indigenisation drive.",
    accent: "#DC2626",
    stat: "Indigenisation",
    items: [],
  },
  {
    name: "Computing & Networking Systems",
    tag: "Infrastructure",
    icon: Server,
    desc: "",
    longDesc:
      "Power management, data conversion, sensing, and interface solutions for computing platforms and networking equipment.",
    accent: "#2563EB",
    stat: "Infrastructure",
    items: [],
  },
  {
    name: "Drop-in Replacement",
    tag: "Analog IPs",
    icon: Plug,
    desc: "",
    longDesc:
      "Pin-to-pin compatible replacements for widely used analog semiconductor devices and IPs.",
    accent: "#7C3AED",
    stat: "Analog IPs",
    items: [],
  },
  {
    name: "Consumer & Smart Appliance Manufacturers",
    tag: "Smart Devices",
    icon: Home,
    desc: "",
    longDesc:
      "Power and interface solutions for home appliances, consumer electronics, and connected smart devices.",
    accent: "#059669",
    stat: "Smart Devices",
    items: [],
  },
  {
    name: "Automotive OEMs & Tier-1 Suppliers",
    tag: "Automotive",
    icon: Car,
    desc: "",
    longDesc:
      "Power management, sensing, protection, and interface solutions for next-generation vehicle platforms.",
    accent: "#EA580C",
    stat: "Automotive",
    items: [],
  },
  {
    name: "EV, Energy & Lighting Industry",
    tag: "Energy",
    icon: Leaf,
    desc: "",
    longDesc:
      "Solutions for EV charging, battery management, power conversion, and intelligent lighting applications.",
    accent: "#0891B2",
    stat: "Energy",
    items: [],
  },
];

const OVERSEAS = [
  {
    name: "Plug-in Replacement for MNC Analog IPs",
    tag: "Global",
    icon: Globe,
    desc: "Drop-in replacements for many MNC Analog IPs and Devices in global markets.",
    longDesc:
      "Delivering pin-compatible and performance-matched alternatives to leading MNC analog IPs and devices. Our solutions enable global customers to migrate seamlessly, diversify their supply chain, and reduce component costs without redesign.",
    accent: "#2563EB",
    stat: "Global",
    items: [
      "Pin-Compatible ICs",
      "Performance-Matched",
      "Supply Chain Diversity",
      "No Redesign Required",
    ],
  },
  {
    name: "Texas Instruments (TI)",
    tag: "USA",
    icon: Cpu,
    desc: "Compatible alternatives to TI's broad analog and mixed-signal IC portfolio.",
    longDesc:
      "Providing drop-in replacements for Texas Instruments' analog, power management, and mixed-signal ICs, ensuring supply chain resilience and competitive pricing for global customers.",
    accent: "#EA580C",
    stat: "USA",
    items: [
      "Analog ICs",
      "Power Management",
      "Mixed-Signal",
      "Plug-in Replacement",
    ],
  },
  {
    name: "Analog Devices & Maxim",
    tag: "USA",
    icon: Zap,
    desc: "Precision analog and data conversion IC alternatives for Analog Devices and Maxim.",
    longDesc:
      "Offering pin-compatible alternatives to Analog Devices and Maxim precision analog, data conversion, and signal chain ICs, enabling seamless migration and second-source flexibility.",
    accent: "#DC2626",
    stat: "USA",
    items: [
      "Precision Analog",
      "Data Conversion",
      "Signal Chain",
      "Second Source",
    ],
  },
  {
    name: "Infineon & MPS",
    tag: "Germany / USA",
    icon: Shield,
    desc: "Power semiconductors and automotive-grade ICs compatible with Infineon and MPS.",
    longDesc:
      "Compatible alternatives for Infineon and MPS power management and automotive ICs, providing supply chain resilience and direct drop-in replacements at competitive pricing.",
    accent: "#059669",
    stat: "Germany / USA",
    items: [
      "Power Semiconductors",
      "Automotive ICs",
      "Plug-in Replacement",
      "Direct Compatible",
    ],
  },
  {
    name: "Renesas & RichTek",
    tag: "Japan / Taiwan",
    icon: Building2,
    desc: "Microcontroller, embedded processor, and power IC alternatives for Renesas & RichTek.",
    longDesc:
      "Compatible alternatives for Renesas and RichTek's microcontroller, embedded processor, and analog IC portfolios, enabling design flexibility and supply chain optimisation.",
    accent: "#7C3AED",
    stat: "Japan / Taiwan",
    items: [
      "Microcontrollers",
      "Embedded Processors",
      "Power ICs",
      "Drop-in Replacement",
    ],
  },
  {
    name: "STMicroelectronics",
    tag: "Switzerland",
    icon: TrendingUp,
    desc: "Broad portfolio of industrial and embedded semiconductor alternatives to STMicro.",
    longDesc:
      "Pin-compatible alternatives for STMicroelectronics' industrial and embedded semiconductor portfolio, providing reliable second-source options and supply chain diversity for global customers.",
    accent: "#0891B2",
    stat: "Switzerland",
    items: [
      "Industrial Solutions",
      "Embedded Systems",
      "Plug-in Replacement",
      "Global Support",
    ],
  },
];

// ─── Market Card ───────────────────────────────────────────────────────────────

function MarketCard({
  item,
  index,
}: {
  item: (typeof DOMESTIC)[0];
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const Icon = item.icon;
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    gsap.to(el, {
      height: open ? el.scrollHeight : 0,
      opacity: open ? 1 : 0,
      duration: 0.4,
      ease: open ? "power3.out" : "power3.in",
    });
  }, [open]);

  return (
    <div
      className="market-card group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 bg-white border border-slate-200 shadow-sm hover:shadow-xl"
      onClick={() => setOpen((v) => !v)}
    >
      {/* Top accent border */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-400"
        style={{
          background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)`,
          opacity: open ? 1 : 0,
        }}
      />

      {/* Header row */}
      <div className="flex items-center gap-4 p-5">
        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-slate-800 font-bold text-base tracking-tight">
              {item.name}
            </span>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{
                background: `${item.accent}15`,
                color: item.accent,
              }}
            >
              {item.tag}
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed line-clamp-1">
            {item.desc}
          </p>
        </div>

        {/* Arrow */}
        <ChevronRight
          size={16}
          className="flex-shrink-0 text-slate-300 transition-transform duration-300"
          style={{
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
            color: open ? item.accent : undefined,
          }}
        />
      </div>

      {/* Expandable body */}
      <div ref={bodyRef} style={{ height: 0, overflow: "hidden", opacity: 0 }}>
        <div className="px-5 pb-5 border-t border-slate-100">
          <p className="text-xs text-slate-500 mt-4 mb-4 leading-relaxed italic">
            {item.longDesc}
          </p>
          <div className="flex flex-wrap gap-2">
            {item.items.map((it) => (
              <span
                key={it}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-700"
              >
                <CheckCircle size={10} color={item.accent} />
                {it}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] transition-all duration-500"
        style={{
          background: item.accent,
          width: open ? "100%" : "0%",
        }}
      />
    </div>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────────

export function MarketOpportunitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<Tab>("domestic");

  const markets = tab === "domestic" ? DOMESTIC : OVERSEAS;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        ".mos-title-word",
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 88%" },
        },
      );
      gsap.fromTo(
        ".mos-sub",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.5,
          ease: "power2.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        },
      );

      // Divider draw
      gsap.fromTo(
        ".mos-divider",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "expo.out",
          transformOrigin: "left",
          scrollTrigger: { trigger: ".mos-divider", start: "top 90%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Re-animate market cards on tab switch
  useEffect(() => {
    gsap.fromTo(
      ".market-card",
      { opacity: 0, y: 28, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.07,
        ease: "power4.out",
      },
    );
  }, [tab]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 font-['Instrument_Sans',sans-serif] md:py-32 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-100/30 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(14, 165, 233) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
        {/* ── HEADER ─────────────────────────────────────────────────────── */}
        <div ref={headerRef} className="mb-10">
          {/* Title */}
          <h2 className="overflow-hidden leading-tight">
            <span className="inline-block overflow-hidden align-bottom mr-4">
              <span
                className="mos-title-word inline-block text-4xl md:text-5xl lg:text-6xl font-bold"
                style={{
                  color: "#0F172A",
                  letterSpacing: "-0.02em",
                }}
              >
                Market
              </span>
            </span>
            <span className="inline-block overflow-hidden align-bottom">
              <span
                className="mos-title-word inline-block text-4xl md:text-5xl lg:text-6xl font-bold"
                style={{
                  color: "#2563EB",
                  letterSpacing: "-0.02em",
                }}
              >
                Opportunities
              </span>
            </span>
          </h2>
        </div>

        {/* ── Market Opportunity Description ────────────────────────────────── */}
        <div className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100">
          <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-4">
            The rapid growth of intelligent systems, connectivity and sensing is
            driving increased demand for efficient Analog IPs and semiconductor
            products. Modern electronic products require higher power
            efficiency, improved performance, compact form factors, enhanced
            reliability, and shorter development cycles. These evolving
            requirements continue to create significant opportunities across a
            wide range of applications and industries.
          </p>
          <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-4">
            Meeting these challenges require continuous innovation, design
            optimization and deep analog expertise to overcome the Technology
            challenges of Power, Performance, Area, and Market challenges of
            Cost & Time-to-market.
          </p>
          <p className="text-slate-700 text-base md:text-lg leading-relaxed">
            AnalogChips is focused on addressing these needs through robust
            design methodologies and the development of efficient, scalable, and
            reliable semiconductor products and IP solutions.
          </p>
        </div>

        {/* ── TABS + MARKET CARDS ────────────────────────────────────────── */}
        <div className="mb-14">
          {/* Tabs */}
          <div className="flex gap-2 mb-8 border-b border-slate-200">
            <button
              onClick={() => setTab("domestic")}
              className={`px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                tab === "domestic"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Domestic Markets
            </button>
            {/* <button
              onClick={() => setTab("overseas")}
              className={`px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                tab === "overseas"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Overseas Markets
            </button> */}
          </div>

          {/* Grid of accordion cards — 2 cols on md+ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {markets.map((m: any, i) => (
              <MarketCard key={`${tab}-${i}`} item={m} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
