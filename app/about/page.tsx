// "use client";

// import { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   Mail,
//   Phone,
//   MapPin,
//   Sparkles,
//   Send,
//   CheckCircle,
//   Globe,
//   ArrowRight,
//   User,
//   Building,
//   MessageSquare,
//   Target,
//   Cpu,
//   Lightbulb,
//   Users,
//   Award,
//   Zap,
//   Shield,
//   Briefcase,
//   Heart,
//   Eye,
//   Navigation,
// } from "lucide-react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { Navbar } from "@/components/layout/Navbar";
// import { Footer } from "@/components/layout/Footer";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// // Product Categories
// const productCategories = [
//   {
//     name: "Boost Converter",
//     description:
//       "Compact boost converter for battery-operated portable electronics",
//     icon: Zap,
//   },
//   {
//     name: "Buck Regulator",
//     description:
//       "High input voltage tolerant buck regulator for computing & networking",
//     icon: Shield,
//   },
//   {
//     name: "LDO Regulator",
//     description:
//       "Ultra low dropout regulator for consumer and embedded systems",
//     icon: Cpu,
//   },
//   {
//     name: "LED Driver",
//     description: "High input voltage linear LED driver for commercial lighting",
//     icon: Lightbulb,
//   },
//   {
//     name: "Ideal Diode Controller",
//     description: "Robust power handling for battery management systems",
//     icon: Shield,
//   },
//   {
//     name: "Load Switch",
//     description: "Single N-Channel load switch for USB-powered devices",
//     icon: Zap,
//   },
// ];

// export default function AboutPage() {
//   const heroRef = useRef<HTMLDivElement>(null);
//   const aboutRef = useRef<HTMLDivElement>(null);
//   const missionRef = useRef<HTMLDivElement>(null);
//   const visionRef = useRef<HTMLDivElement>(null);
//   const innovationRef = useRef<HTMLDivElement>(null);
//   const productsRef = useRef<HTMLDivElement>(null);
//   const contactRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.fromTo(
//         heroRef.current,
//         { opacity: 0, y: 30 },
//         { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
//       );

//       const sections = [
//         aboutRef,
//         missionRef,
//         visionRef,
//         innovationRef,
//         productsRef,
//         contactRef,
//       ];
//       sections.forEach((ref, index) => {
//         gsap.fromTo(
//           ref.current,
//           { opacity: 0, y: 40 },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.4,
//             scrollTrigger: {
//               trigger: ref.current,
//               start: "top 90%",
//               toggleActions: "play none none reverse",
//             },
//           },
//         );
//       });
//     });

//     return () => ctx.revert();
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <main className="bg-white">
//         {/* Hero Section */}
//         <section className="relative py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white">
//           <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
//             <div ref={heroRef} className="text-center max-w-3xl mx-auto">
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 mb-6">
//                 <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
//                 <span className="text-xs font-medium text-cyan-700">
//                   About Us
//                 </span>
//               </div>
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
//                 Powering India's Semiconductor Future
//               </h1>
//               <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
//                 A fabless semiconductor company focused on high-performance
//                 power management solutions, aligned with India's Semiconductor
//                 Mission
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* About Company Section */}
//         <section
//           ref={aboutRef}
//           className="py-20 bg-white opacity-0 translate-y-8 transition-all duration-700"
//         >
//           <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
//             <div className="grid md:grid-cols-2 gap-12 items-center">
//               <div>
//                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 mb-4">
//                   <Briefcase className="w-3.5 h-3.5 text-cyan-600" />
//                   <span className="text-xs font-medium text-cyan-700">
//                     Company Overview
//                   </span>
//                 </div>
//                 <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
//                   About AnalogChips
//                 </h2>
//                 <p className="text-slate-600 leading-relaxed mb-4">
//                   We are a fabless semiconductor company focused on designing
//                   high-performance power management solutions for modern
//                   electronic systems. Our portfolio addresses the growing demand
//                   for efficient, compact, and reliable power delivery across a
//                   wide range of applications.
//                 </p>
//                 <p className="text-slate-600 leading-relaxed">
//                   Our headquarters in Bengaluru, India, houses our core design
//                   and engineering teams, enabling us to deliver cutting-edge
//                   analog power management ICs that contribute to India's
//                   semiconductor self-reliance.
//                 </p>
//               </div>
//               <div className="relative rounded-2xl overflow-hidden shadow-xl">
//                 <Image
//                   src="/images/about-analog.jfif"
//                   alt="AnalogChips Office"
//                   width={600}
//                   height={400}
//                   className="object-cover w-full h-auto"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 to-blue-600/10" />
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Mission & Vision */}
//         <section className="py-20 bg-slate-50">
//           <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
//             <div className="grid md:grid-cols-2 gap-8">
//               {/* Mission */}
//               <div
//                 ref={missionRef}
//                 className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 opacity-0 translate-y-8 transition-all duration-700"
//               >
//                 <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mb-5">
//                   <Target className="w-7 h-7 text-white" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-slate-900 mb-3">
//                   Our Mission
//                 </h3>
//                 <p className="text-slate-600 leading-relaxed">
//                   Enrich India's Semiconductor Mission's (ISM) objective by
//                   successfully deploying Indian-owned Analog IPs for domestic
//                   and overseas markets — driving a self-reliant semiconductor
//                   ecosystem.
//                 </p>
//               </div>

//               {/* Vision */}
//               <div
//                 ref={visionRef}
//                 className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 opacity-0 translate-y-8 transition-all duration-700"
//               >
//                 <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mb-5">
//                   <Eye className="w-7 h-7 text-white" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-slate-900 mb-3">
//                   Our Vision
//                 </h3>
//                 <p className="text-slate-600 leading-relaxed">
//                   "Make in India" by "Design in India" — building world-class
//                   analog power management ICs through Indian engineering talent,
//                   serving both domestic and global markets.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Semiconductor Innovation */}
//         <section
//           ref={innovationRef}
//           className="py-20 bg-white opacity-0 translate-y-8 transition-all duration-700"
//         >
//           <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
//             <div className="text-center mb-12">
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 mb-4">
//                 <Lightbulb className="w-3.5 h-3.5 text-cyan-600" />
//                 <span className="text-xs font-medium text-cyan-700">
//                   Innovation
//                 </span>
//               </div>
//               <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
//                 Semiconductor Innovation
//               </h2>
//               <p className="text-lg text-slate-600 max-w-2xl mx-auto">
//                 Driving technological advancement in analog and mixed-signal
//                 design
//               </p>
//             </div>

//             <div className="grid md:grid-cols-2 gap-8">
//               <div className="rounded-2xl overflow-hidden shadow-lg">
//                 <Image
//                   src="/images/semiconductor.jpg"
//                   alt="Semiconductor innovation"
//                   width={600}
//                   height={400}
//                   className="object-cover w-full h-auto"
//                 />
//               </div>
//               <div className="flex flex-col justify-center">
//                 <p className="text-slate-600 leading-relaxed mb-4">
//                   We provide a focused portfolio of power devices designed for
//                   modern electronic systems. Our commitment to innovation
//                   ensures that we stay at the forefront of semiconductor
//                   technology.
//                 </p>
//                 <div className="flex flex-wrap gap-2 mt-4">
//                   {[
//                     "Advanced Process Nodes",
//                     "High-Efficiency Design",
//                     "Low-Power Solutions",
//                     "Automotive-Grade Quality",
//                   ].map((item) => (
//                     <span
//                       key={item}
//                       className="px-3 py-1 rounded-full bg-slate-100 text-sm text-slate-600"
//                     >
//                       {item}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Product Categories */}
//         {/* <section
//           ref={productsRef}
//           className="py-20 bg-slate-50 opacity-0 translate-y-8 transition-all duration-700"
//         >
//           <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
//             <div className="text-center mb-12">
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 mb-4">
//                 <Cpu className="w-3.5 h-3.5 text-cyan-600" />
//                 <span className="text-xs font-medium text-cyan-700">
//                   Product Portfolio
//                 </span>
//               </div>
//               <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
//                 Power Management Solutions
//               </h2>
//               <p className="text-lg text-slate-600 max-w-2xl mx-auto">
//                 Comprehensive portfolio of analog power management ICs
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {productCategories.map((product, idx) => {
//                 const Icon = product.icon;
//                 return (
//                   <div
//                     key={idx}
//                     className="group bg-white rounded-xl p-6 border border-slate-200 hover:border-cyan-300 hover:shadow-lg transition-all duration-300"
//                   >
//                     <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-50 to-blue-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
//                       <Icon className="w-6 h-6 text-cyan-600" />
//                     </div>
//                     <h3 className="text-lg font-bold text-slate-900 mb-2">
//                       {product.name}
//                     </h3>
//                     <p className="text-sm text-slate-500">
//                       {product.description}
//                     </p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </section> */}

//         {/* India Semiconductor Mission Section */}
//         <section className="py-20 bg-gradient-to-r from-cyan-600 to-blue-600">
//           <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
//             <div className="grid md:grid-cols-2 gap-8 items-center">
//               <div>
//                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 mb-4">
//                   <Globe className="w-3.5 h-3.5 text-white" />
//                   <span className="text-xs font-medium text-white">
//                     National Initiative
//                   </span>
//                 </div>
//                 <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//                   Make in India / Design in India
//                 </h2>
//                 <p className="text-cyan-100 leading-relaxed mb-4">
//                   Aligned with the India Semiconductor Mission (ISM), we are
//                   committed to building indigenous semiconductor IP and
//                   contributing to India's journey toward self-reliance in
//                   electronics manufacturing.
//                 </p>
//                 <div className="flex gap-4 mt-6">
//                   <div className="text-center">
//                     <p className="text-2xl font-bold text-white">
//                       Make in India
//                     </p>
//                     <p className="text-xs text-cyan-200">Manufacturing Focus</p>
//                   </div>
//                   <div className="text-center">
//                     <p className="text-2xl font-bold text-white">
//                       Design in India
//                     </p>
//                     <p className="text-xs text-cyan-200">Innovation Hub</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
//                 <h3 className="text-xl font-bold text-white mb-4">
//                   India Semiconductor Mission
//                 </h3>
//                 <p className="text-cyan-100 leading-relaxed mb-4">
//                   As part of ISM's vision to establish India as a global hub for
//                   electronics manufacturing and design, we are developing
//                   world-class analog IP solutions that serve both domestic and
//                   international markets.
//                 </p>
//                 <div className="flex items-center gap-2 text-cyan-200">
//                   <CheckCircle className="w-4 h-4" />
//                   <span className="text-sm">
//                     Contributing to Atmanirbhar Bharat
//                   </span>
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
import {
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Send,
  CheckCircle,
  Globe,
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
  Briefcase,
  Heart,
  Eye,
  Navigation,
  Microchip,
  Radio,
  Wifi,
  Thermometer,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Focus Areas
const focusAreas = [
  {
    name: "Power Management ICs (PMICs)",
    icon: Zap,
    description: "Efficient power conversion and management solutions",
  },
  {
    name: "Load Switches & Protection Devices",
    icon: Shield,
    description: "Reliable power distribution and system protection",
  },
  {
    name: "Data Converters",
    icon: Microchip,
    description: "Precision analog-to-digital and digital-to-analog conversion",
  },
  {
    name: "Sensors & Interface Circuits",
    icon: Radio,
    description: "Smart sensing and communication interfaces",
  },
  {
    name: "Signal Conditioning Solutions",
    icon: Thermometer,
    description: "Amplification and filtering for accurate signal processing",
  },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      );

      const sections = [aboutRef, missionRef, visionRef, focusRef, contactRef];
      sections.forEach((ref) => {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Hero Section */}

        {/* Company Overview Section */}
        <section
          ref={aboutRef}
          className="py-20 bg-white opacity-0 translate-y-8 transition-all duration-700"
        >
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 mb-4">
                  <Building className="w-3.5 h-3.5 text-cyan-600" />
                  <span className="text-xs font-medium text-cyan-700">
                    About Us
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  AnalogChips Technology Pvt Ltd (ACT)
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    AnalogChips Technology Pvt Ltd (ACT) is a Bangalore-based
                    fabless semiconductor company specializing in Analog &
                    Mixed-Signal Products and IP solutions including Power
                    Management, Data Converters, Sensors & Interface circuits
                    for industrial, consumer, automotive, defense, and space
                    applications.
                  </p>
                  <p>
                    Founded in 2026 by industry professionals and startup
                    entrepreneurs, ACT brings together over 120 years of
                    combined experience in analog design and semiconductor
                    product development. Our team has a proven track record of
                    delivering silicon-proven IPs and products across multiple
                    technology nodes, consistently achieving high success rate
                    of first-pass silicon. These IPs and products are
                    successfully deployed in the market by the end customers.
                  </p>
                  <p>
                    The team has experience across process technologies ranging
                    from 350nm to advanced 3nm nodes, working with leading
                    foundries including TSMC, Global Foundries, TowerJazz,
                    Dongbu, TI, Intel and other priority foundries.
                  </p>
                  <p>
                    For end-to-end product realization, ACT has established
                    strategic partnerships across the semiconductor ecosystem,
                    including foundry, assembly, packaging, testing and
                    qualification providers.
                  </p>
                  <p>
                    ACT is committed to contributing to India's growing
                    semiconductor ecosystem, supporting the broader objectives
                    of the India Semiconductor Mission (ISM).
                  </p>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/about-analog.jfif"
                  alt="AnalogChips Technology"
                  width={600}
                  height={500}
                  className="object-cover w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 to-blue-600/10" />
              </div>
            </div>
          </div>
        </section>

        {/* Focus Areas Section */}
        <section
          ref={focusRef}
          className="py-20 bg-white opacity-0 translate-y-8 transition-all duration-700"
        >
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 mb-4">
                <Target className="w-3.5 h-3.5 text-cyan-600" />
                <span className="text-xs font-medium text-cyan-700">
                  Core Competencies
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Our Focus Areas
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Specialized in analog and mixed-signal semiconductor solutions
                for diverse applications
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {focusAreas.map((area, idx) => {
                const Icon = area.icon;
                return (
                  <div
                    key={idx}
                    className="group bg-white rounded-xl p-6 border border-slate-200 hover:border-cyan-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-50 to-blue-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-cyan-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {area.name}
                    </h3>
                    <p className="text-sm text-slate-500">{area.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
