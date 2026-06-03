// "use client";

// import { useEffect, useRef } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   Cpu,
//   Zap,
//   Shield,
//   Target,
//   Heart,
//   Eye,
//   Award,
//   Briefcase,
//   CheckCircle,
//   ArrowRight,
//   Mail,
//   Linkedin,
//   Sparkles,
//   Layers,
//   Radio,
//   Wifi,
//   Activity,
//   Microchip,
//   Bluetooth,
//   Users,
//   Globe,
//   Clock,
// } from "lucide-react";
// import { Navbar } from "@/components/layout/Navbar";
// import { Footer } from "@/components/layout/Footer";

// // Semiconductor Expertise Data
// const expertiseAreas = [
//   {
//     name: "Analog IC Design",
//     icon: Microchip,
//     description: "High-performance analog circuit design",
//   },
//   {
//     name: "Mixed-Signal",
//     icon: Radio,
//     description: "Integrated analog/digital solutions",
//   },
//   { name: "SERDES", icon: Wifi, description: "High-speed serial interfaces" },
//   {
//     name: "PLL Design",
//     icon: Activity,
//     description: "Clock generation & synchronization",
//   },
//   { name: "ASIC/SoC", icon: Layers, description: "Custom silicon solutions" },
//   {
//     name: "Verification",
//     icon: Shield,
//     description: "Comprehensive design verification",
//   },
//   {
//     name: "Power Management",
//     icon: Zap,
//     description: "Efficient power solutions",
//   },
//   {
//     name: "RF Design",
//     icon: Bluetooth,
//     description: "Wireless communication systems",
//   },
// ];

// // Company Values
// const companyValues = [
//   {
//     title: "Innovation First",
//     description: "Continuous R&D and breakthrough solutions",
//     icon: Sparkles,
//   },
//   {
//     title: "Precision Engineering",
//     description: "Meticulous attention to detail",
//     icon: Target,
//   },
//   {
//     title: "Customer Focus",
//     description: "Tailored solutions that exceed expectations",
//     icon: Users,
//   },
//   {
//     title: "Technical Excellence",
//     description: "Highest standards of engineering",
//     icon: Award,
//   },
// ];

// export default function LeadershipPage() {
//   const sectionsRef = useRef<(HTMLElement | null)[]>([]);

//   useEffect(() => {
//     // Simple fade-in animation for sections
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("opacity-100", "translate-y-0");
//             entry.target.classList.remove("opacity-0", "translate-y-8");
//           }
//         });
//       },
//       { threshold: 0.1, rootMargin: "50px" },
//     );

//     sectionsRef.current.forEach((section) => {
//       if (section) observer.observe(section);
//     });

//     return () => observer.disconnect();
//   }, []);

//   const addToRefs = (el: HTMLElement | null, index: number) => {
//     if (el) sectionsRef.current[index] = el;
//   };

//   return (
//     <>
//       <Navbar />
//       <main className="bg-white">
//         {/* Hero Section */}
//         <section className="relative py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white">
//           <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
//             <div className="text-center max-w-3xl mx-auto">
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 mb-6">
//                 <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
//                 <span className="text-xs font-medium text-cyan-700">
//                   Leadership
//                 </span>
//               </div>
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
//                 Executive Leadership
//               </h1>
//               <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
//                 Visionary leaders driving innovation in analog and mixed-signal
//                 semiconductor technology
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Founder/CEO Section */}
//         <section
//           ref={(el) => addToRefs(el, 0)}
//           className="py-20 opacity-0 translate-y-8 transition-all duration-700 ease-out"
//         >
//           <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
//             <div className="grid md:grid-cols-2 gap-12 items-center">
//               {/* Founder Image */}
//               <div className="relative">
//                 <div className="relative aspect-square max-w-md mx-auto md:mx-0 rounded-2xl overflow-hidden shadow-xl">
//                   <Image
//                     src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=500&fit=crop"
//                     alt="Founder & CEO"
//                     width={500}
//                     height={500}
//                     className="object-cover"
//                   />
//                 </div>
//               </div>

//               {/* Founder Info */}
//               <div>
//                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 mb-4">
//                   <Briefcase className="w-3.5 h-3.5 text-cyan-600" />
//                   <span className="text-xs font-medium text-cyan-700">
//                     Founder & CEO
//                   </span>
//                 </div>
//                 <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
//                   Gautam Kumar Singh
//                 </h2>
//                 <p className="text-cyan-600 font-medium mb-4">
//                   Chief Executive Officer
//                 </p>
//                 <p className="text-slate-600 leading-relaxed mb-6">
//                   With over 20 years of semiconductor industry experience,
//                   Gautam leads AnalogCore's strategic vision and growth. His
//                   expertise spans product leadership, business development, and
//                   innovation management across Fortune 500 companies.
//                 </p>

//                 <div className="flex gap-4 mb-6">
//                   <div>
//                     <p className="text-2xl font-bold text-slate-900">20+</p>
//                     <p className="text-xs text-slate-500">Years Experience</p>
//                   </div>
//                   <div>
//                     <p className="text-2xl font-bold text-slate-900">50+</p>
//                     <p className="text-xs text-slate-500">Products Launched</p>
//                   </div>
//                   <div>
//                     <p className="text-2xl font-bold text-slate-900">20+</p>
//                     <p className="text-xs text-slate-500">Patents</p>
//                   </div>
//                 </div>

//                 <div className="flex gap-3">
//                   <a
//                     href="https://linkedin.com/in/gautam-kumar-singh"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="p-2 rounded-lg bg-slate-100 hover:bg-cyan-50 transition-colors"
//                   >
//                     <Linkedin className="w-4 h-4 text-slate-600" />
//                   </a>
//                   <a
//                     href="mailto:gautam@analogcore.com"
//                     className="p-2 rounded-lg bg-slate-100 hover:bg-cyan-50 transition-colors"
//                   >
//                     <Mail className="w-4 h-4 text-slate-600" />
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Company Introduction */}
//         <section
//           ref={(el) => addToRefs(el, 1)}
//           className="py-20 bg-slate-50 opacity-0 translate-y-8 transition-all duration-700 ease-out"
//         >
//           <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl text-center">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 mb-4">
//               <Users className="w-3.5 h-3.5 text-cyan-600" />
//               <span className="text-xs font-medium text-cyan-700">
//                 Company Overview
//               </span>
//             </div>
//             <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
//               Engineering Tomorrow's Semiconductor Solutions
//             </h2>
//             <p className="text-lg text-slate-600 leading-relaxed">
//               AnalogCore Technologies is a leading provider of analog and
//               mixed-signal semiconductor IP, delivering innovative solutions for
//               automotive, industrial, consumer, and communications applications.
//               Our team combines deep technical expertise with a commitment to
//               quality and customer success.
//             </p>
//           </div>
//         </section>

//         {/* Semiconductor Expertise Section */}
//         <section
//           ref={(el) => addToRefs(el, 2)}
//           className="py-20 opacity-0 translate-y-8 transition-all duration-700 ease-out"
//         >
//           <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
//             <div className="text-center mb-12">
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 mb-4">
//                 <Cpu className="w-3.5 h-3.5 text-cyan-600" />
//                 <span className="text-xs font-medium text-cyan-700">
//                   Core Competencies
//                 </span>
//               </div>
//               <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
//                 Semiconductor Expertise
//               </h2>
//               <p className="text-lg text-slate-600 max-w-2xl mx-auto">
//                 Deep technical capabilities across the semiconductor ecosystem
//               </p>
//             </div>

//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {expertiseAreas.map((area, idx) => {
//                 const Icon = area.icon;
//                 return (
//                   <div
//                     key={idx}
//                     className="group p-4 text-center rounded-xl border border-slate-200 bg-white hover:border-cyan-300 hover:shadow-md transition-all duration-300"
//                   >
//                     <div className="w-12 h-12 rounded-lg bg-cyan-50 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
//                       <Icon className="w-6 h-6 text-cyan-600" />
//                     </div>
//                     <h3 className="font-semibold text-slate-900 mb-1">
//                       {area.name}
//                     </h3>
//                     <p className="text-xs text-slate-500">{area.description}</p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </section>

//         {/* Innovation Focus & Technical Excellence */}
//         <section
//           ref={(el) => addToRefs(el, 3)}
//           className="py-20 bg-slate-50 opacity-0 translate-y-8 transition-all duration-700 ease-out"
//         >
//           <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
//             <div className="grid md:grid-cols-2 gap-12">
//               {/* Innovation Focus */}
//               <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
//                 <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center mb-6">
//                   <Sparkles className="w-7 h-7 text-cyan-600" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-slate-900 mb-4">
//                   Innovation Focus
//                 </h3>
//                 <p className="text-slate-600 leading-relaxed mb-6">
//                   We continuously invest in R&D to push the boundaries of analog
//                   and mixed-signal design, developing cutting-edge IP solutions
//                   that enable next-generation electronic systems.
//                 </p>
//                 <ul className="space-y-3">
//                   {[
//                     "Advanced process nodes (3nm, 5nm, 7nm)",
//                     "High-speed interface development",
//                     "Low-power design methodologies",
//                     "Automotive-grade solutions",
//                   ].map((item, idx) => (
//                     <li
//                       key={idx}
//                       className="flex items-center gap-2 text-sm text-slate-600"
//                     >
//                       <CheckCircle className="w-4 h-4 text-cyan-500" />
//                       {item}
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Technical Excellence */}
//               <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
//                 <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center mb-6">
//                   <Award className="w-7 h-7 text-cyan-600" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-slate-900 mb-4">
//                   Technical Excellence
//                 </h3>
//                 <p className="text-slate-600 leading-relaxed mb-6">
//                   Our commitment to quality and precision ensures every IP
//                   solution meets the highest standards of performance,
//                   reliability, and manufacturability.
//                 </p>
//                 <ul className="space-y-3">
//                   {[
//                     "Rigorous verification methodology",
//                     "ISO 9001 certified processes",
//                     "AEC-Q100 qualified designs",
//                     "24/7 technical support",
//                   ].map((item, idx) => (
//                     <li
//                       key={idx}
//                       className="flex items-center gap-2 text-sm text-slate-600"
//                     >
//                       <CheckCircle className="w-4 h-4 text-cyan-500" />
//                       {item}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Vision & Mission */}
//         <section
//           ref={(el) => addToRefs(el, 4)}
//           className="py-20 opacity-0 translate-y-8 transition-all duration-700 ease-out"
//         >
//           <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
//             <div className="grid md:grid-cols-2 gap-12">
//               <div className="text-center md:text-left">
//                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 mb-4">
//                   <Eye className="w-3.5 h-3.5 text-cyan-600" />
//                   <span className="text-xs font-medium text-cyan-700">
//                     Vision
//                   </span>
//                 </div>
//                 <h3 className="text-2xl font-bold text-slate-900 mb-4">
//                   Our Vision
//                 </h3>
//                 <p className="text-slate-600 leading-relaxed">
//                   To be the world's leading provider of innovative analog and
//                   mixed-signal semiconductor IP, enabling our customers to
//                   create breakthrough products that transform industries and
//                   improve lives.
//                 </p>
//               </div>

//               <div className="text-center md:text-left">
//                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 mb-4">
//                   <Target className="w-3.5 h-3.5 text-cyan-600" />
//                   <span className="text-xs font-medium text-cyan-700">
//                     Mission
//                   </span>
//                 </div>
//                 <h3 className="text-2xl font-bold text-slate-900 mb-4">
//                   Our Mission
//                 </h3>
//                 <p className="text-slate-600 leading-relaxed">
//                   To deliver world-class semiconductor IP solutions through
//                   continuous innovation, technical excellence, and unwavering
//                   commitment to quality, enabling our customers to succeed in
//                   the rapidly evolving electronics landscape.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Core Values */}
//         <section
//           ref={(el) => addToRefs(el, 5)}
//           className="py-20 bg-slate-50 opacity-0 translate-y-8 transition-all duration-700 ease-out"
//         >
//           <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
//             <div className="text-center mb-12">
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 mb-4">
//                 <Heart className="w-3.5 h-3.5 text-cyan-600" />
//                 <span className="text-xs font-medium text-cyan-700">
//                   Our Principles
//                 </span>
//               </div>
//               <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
//                 Core Values
//               </h2>
//               <p className="text-lg text-slate-600 max-w-2xl mx-auto">
//                 Principles that guide our decisions and define our culture
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {companyValues.map((value, idx) => {
//                 const Icon = value.icon;
//                 return (
//                   <div
//                     key={idx}
//                     className="text-center p-6 rounded-xl bg-white border border-slate-200 hover:border-cyan-300 hover:shadow-md transition-all duration-300"
//                   >
//                     <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center mx-auto mb-4">
//                       <Icon className="w-7 h-7 text-cyan-600" />
//                     </div>
//                     <h3 className="font-semibold text-slate-900 mb-2">
//                       {value.title}
//                     </h3>
//                     <p className="text-sm text-slate-500">
//                       {value.description}
//                     </p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </section>

//         {/* Industry Experience Summary */}
//         <section
//           ref={(el) => addToRefs(el, 6)}
//           className="py-20 opacity-0 translate-y-8 transition-all duration-700 ease-out"
//         >
//           <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
//             <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12">
//               <div className="grid md:grid-cols-2 gap-8 items-center">
//                 <div>
//                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-4">
//                     <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
//                     <span className="text-xs font-medium text-cyan-400">
//                       Industry Experience
//                     </span>
//                   </div>
//                   <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
//                     50+ Years Combined Leadership Experience
//                   </h3>
//                   <p className="text-slate-300 leading-relaxed">
//                     Our leadership team brings decades of semiconductor industry
//                     expertise, driving innovation and delivering excellence
//                     across global markets.
//                   </p>
//                 </div>
//                 <div className="grid grid-cols-3 gap-4">
//                   <div className="text-center">
//                     <p className="text-3xl font-bold text-cyan-400">100+</p>
//                     <p className="text-xs text-slate-400">Tapeouts</p>
//                   </div>
//                   <div className="text-center">
//                     <p className="text-3xl font-bold text-cyan-400">200+</p>
//                     <p className="text-xs text-slate-400">Patents</p>
//                   </div>
//                   <div className="text-center">
//                     <p className="text-3xl font-bold text-cyan-400">15+</p>
//                     <p className="text-xs text-slate-400">Countries</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="py-20">
//           <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl text-center">
//             <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
//               Ready to Innovate Together?
//             </h2>
//             <p className="text-slate-600 mb-8">
//               Contact our leadership team to discuss how we can help bring your
//               semiconductor vision to life
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link
//                 href="/contact"
//                 className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-600 text-white font-medium hover:bg-cyan-700 transition-colors"
//               >
//                 Contact Our Team
//                 <ArrowRight className="w-4 h-4" />
//               </Link>
//               <Link
//                 href="/products"
//                 className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium hover:border-cyan-300 hover:text-cyan-600 transition-colors"
//               >
//                 Explore Solutions
//               </Link>
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
import {
  Cpu,
  Zap,
  Shield,
  Target,
  Heart,
  Eye,
  Award,
  Briefcase,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Layers,
  Radio,
  Wifi,
  Activity,
  Microchip,
  Bluetooth,
  Users,
  Building,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Semiconductor Expertise Data - Generic company content
const expertiseAreas = [
  {
    name: "Analog IC Design",
    icon: Microchip,
    description: "High-performance analog circuit design",
  },
  {
    name: "Mixed-Signal",
    icon: Radio,
    description: "Integrated analog/digital solutions",
  },
  { name: "SERDES", icon: Wifi, description: "High-speed serial interfaces" },
  {
    name: "PLL Design",
    icon: Activity,
    description: "Clock generation & synchronization",
  },
  { name: "ASIC/SoC", icon: Layers, description: "Custom silicon solutions" },
  {
    name: "Verification",
    icon: Shield,
    description: "Comprehensive design verification",
  },
  {
    name: "Power Management",
    icon: Zap,
    description: "Efficient power solutions",
  },
  {
    name: "RF Design",
    icon: Bluetooth,
    description: "Wireless communication systems",
  },
];

// Company Values - Generic semiconductor values
const companyValues = [
  {
    title: "Innovation First",
    description: "Continuous R&D and breakthrough solutions",
    icon: Sparkles,
  },
  {
    title: "Precision Engineering",
    description: "Meticulous attention to detail",
    icon: Target,
  },
  {
    title: "Customer Focus",
    description: "Tailored solutions that exceed expectations",
    icon: Users,
  },
  {
    title: "Technical Excellence",
    description: "Highest standards of engineering",
    icon: Award,
  },
];

export default function LeadershipPage() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    // Simple fade-in animation for sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" },
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el: HTMLElement | null, index: number) => {
    if (el) sectionsRef.current[index] = el;
  };

  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                <span className="text-xs font-medium text-cyan-700">
                  Leadership
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                Leadership Team
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                Leadership information will be updated soon.
              </p>
            </div>
          </div>
        </section>

        {/* Leadership Team Placeholder Section - Replaces fake executive profile */}
        <section
          ref={(el) => addToRefs(el, 0)}
          className="py-8 opacity-0 translate-y-8 transition-all duration-700 ease-out"
        >
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 mb-4">
                <Users className="w-3.5 h-3.5 text-cyan-600" />
                <span className="text-xs font-medium text-cyan-700">
                  Executive Team
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Coming Soon
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Detailed leadership profiles are currently being finalized and
                will be published soon.
              </p>
            </div>

            {/* Professional Placeholder Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Placeholder Image */}
                  <div className="relative h-64 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full bg-white shadow-md flex items-center justify-center">
                      <Building className="w-14 h-14 text-slate-400" />
                    </div>
                  </div>

                  {/* Placeholder Content */}
                  <div className="p-6 text-center">
                    <div className="h-5 w-32 bg-slate-200 rounded mx-auto mb-2 animate-pulse" />
                    <div className="h-4 w-24 bg-slate-100 rounded mx-auto mb-4 animate-pulse" />
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-slate-100 rounded animate-pulse" />
                      <div className="h-3 w-3/4 bg-slate-100 rounded mx-auto animate-pulse" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
