// "use client";

// import { useEffect, useRef, useState } from "react";
// import Link from "next/link";
// import {
//   ArrowRight,
//   ChevronLeft,
//   ChevronRight,
//   Shield,
//   Cpu,
//   CircuitBoard,
//   Sparkles,
//   Zap,
//   Microchip,
//   Server,
//   Layers,
//   Activity,
//   Gauge,
//   Signal,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import gsap from "gsap";

// // Slider content array - Enterprise Semiconductor Focus
// const sliderContent = [
//   {
//     id: 1,
//     title: "Analog & Mixed-Signal Solutions",
//     subtitle:
//       "Precision analog and mixed-signal semiconductors for mission-critical applications in automotive, industrial, and communications infrastructure.",
//     badge: "Analog Excellence Since 2015",
//     gradient: "from-blue-600 to-cyan-500",
//     gradientLight: "from-blue-500 to-cyan-400",
//     stats: [
//       { value: "16-bit", label: "ADC Resolution", icon: Gauge },
//       { value: "10 GSPS", label: "Sample Rate", icon: Activity },
//       { value: "AEC-Q100", label: "Qualified", icon: Shield },
//     ],
//     features: ["Precision Analog", "Industrial Grade", "Low Noise"],
//   },
//   {
//     id: 2,
//     title: "Power Management ICs",
//     subtitle:
//       "High-efficiency PMIC solutions delivering 92% peak efficiency with integrated protection for automotive and industrial power domains.",
//     badge: "Power Management Excellence",
//     gradient: "from-emerald-600 to-teal-500",
//     gradientLight: "from-emerald-500 to-teal-400",
//     stats: [
//       { value: "92%", label: "Peak Efficiency", icon: Zap },
//       { value: "40V", label: "Input Range", icon: Shield },
//       { value: "10A", label: "Output Current", icon: Cpu },
//     ],
//     features: ["Buck/Boost", "LDO Regulators", "Battery Management"],
//   },
//   {
//     id: 3,
//     title: "High-Speed SERDES & Connectivity",
//     subtitle:
//       "Multi-protocol SERDES IP supporting 3.125 Gbps data rates for high-bandwidth video, networking, and inter-chip communication.",
//     badge: "Connectivity Solutions",
//     gradient: "from-purple-600 to-pink-500",
//     gradientLight: "from-purple-500 to-pink-400",
//     stats: [
//       { value: "3.125 Gbps", label: "Data Rate", icon: Signal },
//       { value: "Multi-Protocol", label: "SERDES", icon: Server },
//       { value: "Low EMI", label: "SSC Support", icon: Shield },
//     ],
//     features: ["Multi-Protocol", "Signal Integrity", "Low Power"],
//   },
//   {
//     id: 4,
//     title: "Embedded Edge Computing Systems",
//     subtitle:
//       "ARM Cortex-M based embedded processors with integrated analog peripherals for industrial control and edge AI applications.",
//     badge: "Edge Computing",
//     gradient: "from-orange-600 to-red-500",
//     gradientLight: "from-orange-500 to-red-400",
//     stats: [
//       { value: "Cortex-M", label: "Processor Core", icon: Cpu },
//       { value: "2 TOPS", label: "AI Acceleration", icon: Microchip },
//       { value: "TrustZone", label: "Security", icon: Shield },
//     ],
//     features: ["ARM Cortex-M", "DSP Extensions", "Ultra-Low Power"],
//   },
// ];

// export function Hero() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const contentRef = useRef<HTMLDivElement>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [direction, setDirection] = useState<"next" | "prev">("next");
//   const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

//   const currentSlide = sliderContent[activeIndex];

//   // Auto-slide functionality
//   const startAutoSlide = () => {
//     if (autoSlideRef.current) clearInterval(autoSlideRef.current);
//     autoSlideRef.current = setInterval(() => {
//       if (!isAnimating) {
//         handleNext();
//       }
//     }, 7000);
//   };

//   const stopAutoSlide = () => {
//     if (autoSlideRef.current) {
//       clearInterval(autoSlideRef.current);
//       autoSlideRef.current = null;
//     }
//   };

//   useEffect(() => {
//     startAutoSlide();
//     return () => stopAutoSlide();
//   }, [activeIndex, isAnimating]);

//   // Ensure video plays
//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current
//         .play()
//         .catch((e) => console.log("Video autoplay failed:", e));
//     }
//   }, []);

//   const handlePrev = () => {
//     if (isAnimating) return;
//     setDirection("prev");
//     setIsAnimating(true);
//     setActiveIndex((prev) =>
//       prev === 0 ? sliderContent.length - 1 : prev - 1,
//     );
//   };

//   const handleNext = () => {
//     if (isAnimating) return;
//     setDirection("next");
//     setIsAnimating(true);
//     setActiveIndex((prev) =>
//       prev === sliderContent.length - 1 ? 0 : prev + 1,
//     );
//   };

//   const goToSlide = (index: number) => {
//     if (isAnimating || index === activeIndex) return;
//     setDirection(index > activeIndex ? "next" : "prev");
//     setIsAnimating(true);
//     setActiveIndex(index);
//   };

//   // GSAP animations for content
//   useEffect(() => {
//     if (!contentRef.current) return;

//     const ctx = gsap.context(() => {
//       const timeline = gsap.timeline({
//         onComplete: () => setIsAnimating(false),
//       });

//       const directionValue = direction === "next" ? 30 : -30;

//       // Animate content elements
//       timeline
//         .to(".content-wrapper > *", {
//           opacity: 0,
//           y: -directionValue,
//           stagger: 0.05,
//           duration: 0.25,
//           ease: "power2.in",
//         })
//         .set(".content-wrapper", { clearProps: "all" })
//         .fromTo(
//           ".hero-badge",
//           { opacity: 0, y: directionValue, scale: 0.9 },
//           {
//             opacity: 1,
//             y: 0,
//             scale: 1,
//             duration: 0.5,
//             ease: "back.out(0.4)",
//           },
//           "-=0.1",
//         )
//         .fromTo(
//           ".hero-title",
//           { opacity: 0, y: directionValue, filter: "blur(8px)" },
//           {
//             opacity: 1,
//             y: 0,
//             filter: "blur(0px)",
//             duration: 0.6,
//             ease: "power3.out",
//           },
//           "-=0.35",
//         )
//         .fromTo(
//           ".hero-subtitle",
//           { opacity: 0, y: directionValue * 0.7, filter: "blur(4px)" },
//           {
//             opacity: 1,
//             y: 0,
//             filter: "blur(0px)",
//             duration: 0.5,
//             ease: "power3.out",
//           },
//           "-=0.4",
//         )
//         .fromTo(
//           ".feature-tag",
//           { opacity: 0, scale: 0.8, stagger: 0.05 },
//           {
//             opacity: 1,
//             scale: 1,
//             duration: 0.35,
//             stagger: 0.05,
//             ease: "back.out(0.3)",
//           },
//           "-=0.3",
//         )
//         .fromTo(
//           ".hero-cta",
//           { opacity: 0, y: 20 },
//           { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
//           "-=0.25",
//         );
//     }, contentRef);

//     return () => ctx.revert();
//   }, [activeIndex, direction]);

//   // Initial load animation
//   useEffect(() => {
//     if (!containerRef.current) return;

//     const ctx = gsap.context(() => {
//       const timeline = gsap.timeline();

//       timeline
//         .fromTo(
//           ".video-overlay",
//           { opacity: 0 },
//           { opacity: 1, duration: 1, ease: "power2.out" },
//         )
//         .fromTo(
//           ".hero-badge",
//           { opacity: 0, y: -30, scale: 0.8 },
//           { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(0.5)" },
//           "-=0.3",
//         )
//         .fromTo(
//           ".hero-title",
//           { opacity: 0, y: 50, filter: "blur(12px)" },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.7,
//             filter: "blur(0px)",
//             ease: "power3.out",
//           },
//           "-=0.4",
//         )
//         .fromTo(
//           ".hero-subtitle",
//           { opacity: 0, y: 30, filter: "blur(8px)" },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.6,
//             filter: "blur(0px)",
//             ease: "power3.out",
//           },
//           "-=0.5",
//         )
//         .fromTo(
//           ".feature-tag",
//           { opacity: 0, scale: 0.8, stagger: 0.05 },
//           {
//             opacity: 1,
//             scale: 1,
//             duration: 0.4,
//             stagger: 0.05,
//             ease: "back.out(0.3)",
//           },
//           "-=0.4",
//         )
//         .fromTo(
//           ".hero-cta",
//           { opacity: 0, y: 20 },
//           { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
//           "-=0.3",
//         )

//         .fromTo(
//           ".slider-dots .dot",
//           { opacity: 0, scale: 0 },
//           {
//             opacity: 1,
//             scale: 1,
//             duration: 0.4,
//             stagger: 0.05,
//             ease: "back.out(0.6)",
//           },
//           "-=0.1",
//         );
//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={containerRef}
//       onMouseEnter={stopAutoSlide}
//       onMouseLeave={startAutoSlide}
//       className="relative min-h-screen font-['Inter',sans-serif] flex items-center justify-center overflow-hidden"
//     >
//       {/* Background Video - Analog Semiconductor Theme */}
//       <video
//         ref={videoRef}
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="absolute inset-0 w-full h-full object-cover"
//       >
//         <source src="/videos/analog.mp4" type="video/mp4" />
//       </video>

//       {/* Dark Gradient Overlay - Enterprise Grade */}
//       <div className="video-overlay absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/90 via-[#0F172A]/80 to-[#020617]/20" />

//       {/* Circuit Pattern Overlay */}
//       <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0v30h30M0 30h30v30' stroke='%2300ffff' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
//             backgroundSize: "40px 40px",
//           }}
//         />
//       </div>

//       {/* Animated particles - Semiconductor Electron Flow */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(30)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-0.5 h-0.5 bg-cyan-400/40 rounded-full"
//             style={{
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               animation: `float-particle ${3 + Math.random() * 4}s infinite ease-in-out`,
//               animationDelay: `${Math.random() * 5}s`,
//             }}
//           />
//         ))}
//       </div>

//       {/* Main Content */}
//       <div
//         ref={contentRef}
//         className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-16 md:py-24"
//       >
//         <div className="content-wrapper max-w-3xl relative z-20">
//           {/* Badge - Corporate Style */}
//           <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-lg mb-6">
//             <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
//             <span className="text-xs font-semibold text-cyan-300 tracking-wider uppercase">
//               {currentSlide.badge}
//             </span>
//           </div>

//           {/* Title - Bold Enterprise Typography */}
//           <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-[1.2] tracking-tight">
//             {currentSlide.title}
//           </h1>

//           {/* Subtitle - Technical Description */}
//           <p className="hero-subtitle text-base md:text-lg text-gray-300 mb-6 max-w-2xl leading-relaxed">
//             {currentSlide.subtitle}
//           </p>

//           {/* Feature Tags - Technical Capabilities */}
//           <div className="flex flex-wrap gap-2 mb-8">
//             {currentSlide.features.map((feature, idx) => (
//               <span
//                 key={idx}
//                 className="feature-tag px-3 py-1 text-xs font-mono font-medium rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
//               >
//                 {feature}
//               </span>
//             ))}
//           </div>

//           {/* CTA Buttons - Only Products and Contact */}
//           <div className="hero-cta flex flex-col sm:flex-row gap-4">
//             <Button
//               asChild
//               className={`bg-gradient-to-r ${currentSlide.gradient} hover:opacity-90 text-white font-semibold py-6 px-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 group text-sm tracking-wide`}
//             >
//               <Link href="/products">
//                 Explore Products
//                 <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
//               </Link>
//             </Button>
//             <Button
//               asChild
//               variant="outline"
//               className="border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white py-6 px-8 font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-sm tracking-wide"
//             >
//               <Link href="/contact">
//                 Contact Sales
//                 <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
//               </Link>
//             </Button>
//           </div>

//           {/* Technical Stats - Engineering Metrics */}
//           {/* Technical Stats - Engineering Metrics */}
//           <div className="hero-stats relative z-20 mt-12 flex flex-wrap gap-6 sm:gap-8">
//             {currentSlide.stats.map((stat, idx) => {
//               const IconComponent = stat.icon;

//               return (
//                 <div key={idx} className="stat-item flex items-center gap-3">
//                   <div
//                     className={`w-10 h-10 rounded-lg bg-gradient-to-br ${currentSlide.gradientLight} flex items-center justify-center`}
//                   >
//                     <IconComponent className="w-5 h-5 text-cyan-400" />
//                   </div>

//                   <div>
//                     <p className="font-bold text-xl text-white font-mono tracking-tight">
//                       {stat.value}
//                     </p>

//                     <p className="text-gray-400 text-xs uppercase tracking-wider">
//                       {stat.label}
//                     </p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* Navigation Buttons */}
//       <button
//         onClick={handlePrev}
//         className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-cyan-500/20 transition-all duration-300 hover:scale-110 group z-20"
//         disabled={isAnimating}
//         aria-label="Previous slide"
//       >
//         <ChevronLeft className="w-5 h-5 text-white group-hover:text-cyan-300" />
//       </button>
//       <button
//         onClick={handleNext}
//         className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-cyan-500/20 transition-all duration-300 hover:scale-110 group z-20"
//         disabled={isAnimating}
//         aria-label="Next slide"
//       >
//         <ChevronRight className="w-5 h-5 text-white group-hover:text-cyan-300" />
//       </button>

//       {/* Slide Indicators - Corporate Style */}
//       <div className="slider-dots absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3">
//         {sliderContent.map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => goToSlide(idx)}
//             className="group relative"
//             aria-label={`Go to slide ${idx + 1}`}
//           >
//             <div
//               className={`dot h-1 rounded-full transition-all duration-500 ${
//                 idx === activeIndex
//                   ? `w-8 md:w-12 bg-gradient-to-r ${currentSlide.gradient}`
//                   : "w-2 bg-white/30 group-hover:bg-white/50 group-hover:w-3"
//               }`}
//             />
//           </button>
//         ))}
//       </div>

//       {/* Slide Counter */}
//       <div className="absolute bottom-8 right-4 md:right-8 text-xs text-gray-400 font-mono">
//         {String(activeIndex + 1).padStart(2, "0")} /{" "}
//         {String(sliderContent.length).padStart(2, "0")}
//       </div>

//       {/* Scroll Indicator */}
//       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-50">
//         <span className="text-xs text-gray-400 uppercase tracking-wider">
//           Scroll
//         </span>
//         <div className="w-4 h-6 border border-white/20 rounded-full flex justify-center">
//           <div className="w-0.5 h-1.5 bg-cyan-400/50 rounded-full mt-1 animate-bounce" />
//         </div>
//       </div>

//       {/* CSS Animations */}
//       <style jsx>{`
//         @keyframes float-particle {
//           0%,
//           100% {
//             transform: translateY(0px) translateX(0px);
//             opacity: 0;
//           }
//           25% {
//             transform: translateY(-40px) translateX(20px);
//             opacity: 0.6;
//           }
//           50% {
//             transform: translateY(0px) translateX(40px);
//             opacity: 0.8;
//           }
//           75% {
//             transform: translateY(40px) translateX(20px);
//             opacity: 0.6;
//           }
//         }
//       `}</style>
//     </section>
//   );
// }

// "use client";

// import { useEffect, useRef, useState } from "react";
// import Link from "next/link";
// import {
//   ArrowRight,
//   ChevronLeft,
//   ChevronRight,
//   Shield,
//   Cpu,
//   Gauge,
//   Activity,
//   Signal,
//   Server,
//   Zap,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import gsap from "gsap";

// const sliderContent = [
//   {
//     id: 1,
//     title: "Analog & Mixed-Signal Solutions",
//     subtitle:
//       "Precision analog and mixed-signal semiconductors for mission-critical applications in automotive, industrial, and communications infrastructure.",
//     badge: "Analog Excellence Since 2015",
//     gradient: "from-blue-600 to-cyan-500",
//     iconBg: "bg-cyan-500/20 border border-cyan-500/40",
//     iconColor: "text-cyan-400",
//     badgeColor: "text-cyan-300 border-cyan-500/30 bg-cyan-500/10",
//     dotColor: "bg-cyan-400",
//     labelColor: "text-cyan-400",
//     statBorder: "border-cyan-500/20 hover:border-cyan-400/50",
//     stats: [
//       { value: "16-bit", label: "ADC Resolution", icon: Gauge },
//       { value: "10 GSPS", label: "Sample Rate", icon: Activity },
//       { value: "AEC-Q100", label: "Qualified", icon: Shield },
//     ],
//     features: ["Precision Analog", "Industrial Grade", "Low Noise"],
//     featureStyle: "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30",
//   },
//   {
//     id: 2,
//     title: "Power Management ICs",
//     subtitle:
//       "High-efficiency PMIC solutions delivering 92% peak efficiency with integrated protection for automotive and industrial power domains.",
//     badge: "Power Management Excellence",
//     gradient: "from-emerald-600 to-teal-500",
//     iconBg: "bg-emerald-500/20 border border-emerald-500/40",
//     iconColor: "text-emerald-400",
//     badgeColor: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
//     dotColor: "bg-emerald-400",
//     labelColor: "text-emerald-400",
//     statBorder: "border-emerald-500/20 hover:border-emerald-400/50",
//     stats: [
//       { value: "92%", label: "Peak Efficiency", icon: Zap },
//       { value: "40V", label: "Input Range", icon: Shield },
//       { value: "10A", label: "Output Current", icon: Cpu },
//     ],
//     features: ["Buck/Boost", "LDO Regulators", "Battery Management"],
//     featureStyle:
//       "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30",
//   },
//   {
//     id: 3,
//     title: "High-Speed SERDES & Connectivity",
//     subtitle:
//       "Multi-protocol SERDES IP supporting 3.125 Gbps data rates for high-bandwidth video, networking, and inter-chip communication.",
//     badge: "Connectivity Solutions",
//     gradient: "from-purple-600 to-pink-500",
//     iconBg: "bg-purple-500/20 border border-purple-500/40",
//     iconColor: "text-purple-400",
//     badgeColor: "text-purple-300 border-purple-500/30 bg-purple-500/10",
//     dotColor: "bg-purple-400",
//     labelColor: "text-purple-400",
//     statBorder: "border-purple-500/20 hover:border-purple-400/50",
//     stats: [
//       { value: "3.125 Gbps", label: "Data Rate", icon: Signal },
//       { value: "Multi-Protocol", label: "SERDES", icon: Server },
//       { value: "Low EMI", label: "SSC Support", icon: Shield },
//     ],
//     features: ["Multi-Protocol", "Signal Integrity", "Low Power"],
//     featureStyle:
//       "bg-purple-500/10 text-purple-300 border border-purple-500/30",
//   },
//   {
//     id: 4,
//     title: "Embedded Edge Computing Systems",
//     subtitle:
//       "ARM Cortex-M based embedded processors with integrated analog peripherals for industrial control and edge AI applications.",
//     badge: "Edge Computing",
//     gradient: "from-orange-600 to-red-500",
//     iconBg: "bg-orange-500/20 border border-orange-500/40",
//     iconColor: "text-orange-400",
//     badgeColor: "text-orange-300 border-orange-500/30 bg-orange-500/10",
//     dotColor: "bg-orange-400",
//     labelColor: "text-orange-400",
//     statBorder: "border-orange-500/20 hover:border-orange-400/50",
//     stats: [
//       { value: "Cortex-M", label: "Processor Core", icon: Cpu },
//       { value: "2 TOPS", label: "AI Acceleration", icon: Cpu },
//       { value: "TrustZone", label: "Security", icon: Shield },
//     ],
//     features: ["ARM Cortex-M", "DSP Extensions", "Ultra-Low Power"],
//     featureStyle:
//       "bg-orange-500/10 text-orange-300 border border-orange-500/30",
//   },
// ];

// export function Hero() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const contentRef = useRef<HTMLDivElement>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [direction, setDirection] = useState<"next" | "prev">("next");
//   const [videoError, setVideoError] = useState(false);
//   const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

//   const currentSlide = sliderContent[activeIndex];

//   // Auto-slide
//   const startAutoSlide = () => {
//     if (autoSlideRef.current) clearInterval(autoSlideRef.current);
//     autoSlideRef.current = setInterval(() => {
//       if (!isAnimating) handleNext();
//     }, 7000);
//   };
//   const stopAutoSlide = () => {
//     if (autoSlideRef.current) {
//       clearInterval(autoSlideRef.current);
//       autoSlideRef.current = null;
//     }
//   };
//   useEffect(() => {
//     startAutoSlide();
//     return () => stopAutoSlide();
//   }, [activeIndex, isAnimating]);

//   // Force video play
//   useEffect(() => {
//     const v = videoRef.current;
//     if (!v) return;
//     v.muted = true;
//     v.play().catch(() => setVideoError(true));
//   }, []);

//   const handlePrev = () => {
//     if (isAnimating) return;
//     setDirection("prev");
//     setIsAnimating(true);
//     setActiveIndex((p) => (p === 0 ? sliderContent.length - 1 : p - 1));
//   };
//   const handleNext = () => {
//     if (isAnimating) return;
//     setDirection("next");
//     setIsAnimating(true);
//     setActiveIndex((p) => (p === sliderContent.length - 1 ? 0 : p + 1));
//   };
//   const goToSlide = (index: number) => {
//     if (isAnimating || index === activeIndex) return;
//     setDirection(index > activeIndex ? "next" : "prev");
//     setIsAnimating(true);
//     setActiveIndex(index);
//   };

//   // Slide change GSAP
//   useEffect(() => {
//     if (!contentRef.current) return;
//     const ctx = gsap.context(() => {
//       const tl = gsap.timeline({ onComplete: () => setIsAnimating(false) });
//       const d = direction === "next" ? 30 : -30;

//       tl.to(
//         [
//           ".hero-badge",
//           ".hero-title",
//           ".hero-subtitle",
//           ".feature-tag",
//           ".hero-cta",
//           ".stat-item",
//         ],
//         {
//           opacity: 0,
//           y: -d,
//           stagger: 0.04,
//           duration: 0.22,
//           ease: "power2.in",
//         },
//       )
//         .fromTo(
//           ".hero-badge",
//           { opacity: 0, y: d, scale: 0.9 },
//           { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(0.4)" },
//           "-=0.05",
//         )
//         .fromTo(
//           ".hero-title",
//           { opacity: 0, y: d, filter: "blur(8px)" },
//           {
//             opacity: 1,
//             y: 0,
//             filter: "blur(0px)",
//             duration: 0.55,
//             ease: "power3.out",
//           },
//           "-=0.3",
//         )
//         .fromTo(
//           ".hero-subtitle",
//           { opacity: 0, y: d * 0.7, filter: "blur(4px)" },
//           {
//             opacity: 1,
//             y: 0,
//             filter: "blur(0px)",
//             duration: 0.45,
//             ease: "power3.out",
//           },
//           "-=0.35",
//         )
//         .fromTo(
//           ".feature-tag",
//           { opacity: 0, scale: 0.8 },
//           {
//             opacity: 1,
//             scale: 1,
//             duration: 0.3,
//             stagger: 0.05,
//             ease: "back.out(0.3)",
//           },
//           "-=0.25",
//         )
//         .fromTo(
//           ".hero-cta",
//           { opacity: 0, y: 20 },
//           { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
//           "-=0.2",
//         )
//         .fromTo(
//           ".stat-item",
//           { opacity: 0, y: 20, scale: 0.92 },
//           {
//             opacity: 1,
//             y: 0,
//             scale: 1,
//             duration: 0.4,
//             stagger: 0.07,
//             ease: "back.out(0.3)",
//           },
//           "-=0.2",
//         );
//     }, contentRef);
//     return () => ctx.revert();
//   }, [activeIndex, direction]);

//   // Initial load GSAP
//   useEffect(() => {
//     if (!containerRef.current) return;
//     const ctx = gsap.context(() => {
//       const tl = gsap.timeline();
//       tl.fromTo(
//         ".hero-badge",
//         { opacity: 0, y: -30, scale: 0.8 },
//         { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(0.5)" },
//         0.4,
//       )
//         .fromTo(
//           ".hero-title",
//           { opacity: 0, y: 50, filter: "blur(12px)" },
//           {
//             opacity: 1,
//             y: 0,
//             filter: "blur(0px)",
//             duration: 0.7,
//             ease: "power3.out",
//           },
//           "-=0.4",
//         )
//         .fromTo(
//           ".hero-subtitle",
//           { opacity: 0, y: 30, filter: "blur(8px)" },
//           {
//             opacity: 1,
//             y: 0,
//             filter: "blur(0px)",
//             duration: 0.6,
//             ease: "power3.out",
//           },
//           "-=0.45",
//         )
//         .fromTo(
//           ".feature-tag",
//           { opacity: 0, scale: 0.8 },
//           {
//             opacity: 1,
//             scale: 1,
//             duration: 0.4,
//             stagger: 0.05,
//             ease: "back.out(0.3)",
//           },
//           "-=0.35",
//         )
//         .fromTo(
//           ".hero-cta",
//           { opacity: 0, y: 20 },
//           { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
//           "-=0.25",
//         )
//         .fromTo(
//           ".stat-item",
//           { opacity: 0, y: 30, scale: 0.85 },
//           {
//             opacity: 1,
//             y: 0,
//             scale: 1,
//             duration: 0.5,
//             stagger: 0.1,
//             ease: "back.out(0.4)",
//           },
//           "-=0.2",
//         )
//         .fromTo(
//           ".dot",
//           { opacity: 0, scale: 0 },
//           {
//             opacity: 1,
//             scale: 1,
//             duration: 0.4,
//             stagger: 0.05,
//             ease: "back.out(0.6)",
//           },
//           "-=0.1",
//         );
//     }, containerRef);
//     return () => ctx.revert();
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       className="relative w-full min-h-screen bg-gray-950 overflow-hidden"
//     >
//       {/* ── Background Video ── */}
//       {!videoError && (
//         <video
//           ref={videoRef}
//           autoPlay
//           loop
//           muted
//           playsInline
//           onError={() => setVideoError(true)}
//           className="absolute inset-0 w-full h-full object-cover opacity-40 z-0"
//         >
//           <source src="/videos/analog.mp4" type="video/mp4" />
//         </video>
//       )}

//       {/* ── CSS Fallback Background (always rendered under video) ── */}
//       <div className="absolute inset-0 z-0 overflow-hidden">
//         {/* Animated grid */}
//         <div
//           className="absolute inset-0 opacity-[0.07]"
//           style={{
//             backgroundImage:
//               "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
//             backgroundSize: "48px 48px",
//             animation: "gridScroll 20s linear infinite",
//           }}
//         />
//         {/* Floating orbs */}
//         <div className="absolute -top-48 -left-32 w-[600px] h-[600px] rounded-full bg-cyan-500 opacity-10 blur-[100px] animate-[orbFloat1_18s_ease-in-out_infinite]" />
//         <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-blue-600 opacity-10 blur-[80px] animate-[orbFloat2_14s_ease-in-out_infinite]" />
//       </div>

//       {/* ── Gradient Overlays ── */}
//       {/* Strong bottom overlay so content sits on solid dark */}
//       <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-gray-950/30 z-[1]" />
//       {/* Left-side darker zone so left-aligned text pops */}
//       <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 via-gray-950/20 to-transparent z-[1]" />

//       {/* ── Main Content ── */}
//       <div
//         ref={contentRef}
//         className="relative z-10 w-full min-h-screen flex items-center"
//       >
//         <div className="container mx-auto px-6 md:px-10 lg:px-16 max-w-7xl">
//           {/* Left-aligned content block */}
//           <div className="flex flex-col items-start max-w-3xl py-24 md:py-28">
//             {/* Badge */}
//             <div
//               className={`hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm mb-6 ${currentSlide.badgeColor}`}
//             >
//               <span
//                 className={`w-1.5 h-1.5 rounded-full animate-pulse ${currentSlide.dotColor}`}
//               />
//               <span className="text-xs font-semibold tracking-widest uppercase">
//                 {currentSlide.badge}
//               </span>
//             </div>

//             {/* Title */}
//             <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-5 leading-[1.1] tracking-tight text-left">
//               {currentSlide.title}
//             </h1>

//             {/* Subtitle */}
//             <p className="hero-subtitle text-base md:text-lg text-gray-300 mb-5 max-w-2xl leading-relaxed text-left">
//               {currentSlide.subtitle}
//             </p>

//             {/* Feature Tags */}
//             <div className="flex mt-3 flex-wrap gap-2 mb-5 justify-start">
//               {currentSlide.features.map((feature, idx) => (
//                 <span
//                   key={idx}
//                   className={`feature-tag px-3 py-1 text-xs font-mono font-semibold rounded-md ${currentSlide.featureStyle}`}
//                 >
//                   {feature}
//                 </span>
//               ))}
//             </div>

//             {/* CTA Buttons */}
//             <div className="hero-cta flex flex-col sm:flex-row gap-3 mb-8 w-full">
//               <Button
//                 asChild
//                 className={`bg-gradient-to-r ${currentSlide.gradient} hover:opacity-90 text-white font-semibold py-6 px-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 group text-sm tracking-wide `}
//               >
//                 <Link href="/products">
//                   Explore Products
//                   <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
//                 </Link>
//               </Button>
//               <Button
//                 asChild
//                 variant="outline"
//                 className="border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white py-6 px-8 font-semibold rounded-lg transition-all duration-300 text-sm tracking-wide group"
//               >
//                 <Link href="/contact">
//                   Contact Sales
//                   <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
//                 </Link>
//               </Button>
//             </div>

//             {/* ── Stats Grid ── */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
//               {currentSlide.stats.map((stat, idx) => {
//                 const Icon = stat.icon;
//                 return (
//                   <div
//                     key={idx}
//                     className={`stat-item flex items-center gap-4 rounded-xl p-3 bg-gray-900/80 border backdrop-blur-md transition-all duration-300 ${currentSlide.statBorder}`}
//                   >
//                     {/* Icon */}
//                     <div
//                       className={`w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center ${currentSlide.iconBg}`}
//                     >
//                       <Icon className={`w-5 h-5 ${currentSlide.iconColor}`} />
//                     </div>
//                     {/* Text */}
//                     <div className="flex flex-col items-start">
//                       <p className="font-bold text-lg font-mono tracking-tight text-white leading-none mb-1">
//                         {stat.value}
//                       </p>
//                       <p
//                         className={`text-xs font-semibold uppercase tracking-widest ${currentSlide.labelColor}`}
//                       >
//                         {stat.label}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── Nav Prev ── */}
//       <button
//         onClick={handlePrev}
//         disabled={isAnimating}
//         aria-label="Previous slide"
//         className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:scale-110 transition-all duration-300 group"
//       >
//         <ChevronLeft className="w-5 h-5" />
//       </button>

//       {/* ── Nav Next ── */}
//       <button
//         onClick={handleNext}
//         disabled={isAnimating}
//         aria-label="Next slide"
//         className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:scale-110 transition-all duration-300 group"
//       >
//         <ChevronRight className="w-5 h-5" />
//       </button>

//       {/* ── Slide Dots ── */}
//       <div className="slider-dots absolute bottom-6 left-6 md:left-10 lg:left-16 flex gap-2 z-30">
//         {sliderContent.map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => goToSlide(idx)}
//             aria-label={`Go to slide ${idx + 1}`}
//           >
//             <div
//               className={`dot h-1 rounded-full transition-all duration-500 ${
//                 idx === activeIndex
//                   ? `${currentSlide.dotColor} w-10`
//                   : "bg-white/30 w-2 hover:bg-white/60"
//               }`}
//             />
//           </button>
//         ))}
//       </div>

//       {/* ── Slide Counter ── */}
//       <div className="absolute bottom-5 right-4 md:right-8 text-xs text-gray-500 font-mono z-30 select-none">
//         {String(activeIndex + 1).padStart(2, "0")} /{" "}
//         {String(sliderContent.length).padStart(2, "0")}
//       </div>

//       {/* ── Keyframe Styles ── */}
//       <style jsx>{`
//         @keyframes gridScroll {
//           0% {
//             background-position: 0 0;
//           }
//           100% {
//             background-position: 48px 48px;
//           }
//         }
//         @keyframes orbFloat1 {
//           0%,
//           100% {
//             transform: translate(0, 0) scale(1);
//           }
//           33% {
//             transform: translate(60px, 40px) scale(1.05);
//           }
//           66% {
//             transform: translate(-30px, 80px) scale(0.95);
//           }
//         }
//         @keyframes orbFloat2 {
//           0%,
//           100% {
//             transform: translate(0, 0) scale(1);
//           }
//           50% {
//             transform: translate(-80px, -60px) scale(1.1);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useRef, useState } from "react";
// import Link from "next/link";
// import {
//   ArrowRight,
//   Shield,
//   Cpu,
//   Gauge,
//   Activity,
//   Signal,
//   Server,
//   Zap,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import gsap from "gsap";

// const sliderContent = [
//   {
//     id: 1,
//     title: "Analog & Mixed-Signal Solutions",
//     subtitle:
//       "Precision analog and mixed-signal semiconductors for mission-critical applications in automotive, industrial, and communications infrastructure.",
//     badge: "Analog Excellence Since 2015",
//     gradient: "from-blue-600 to-cyan-500",
//     iconBg: "bg-cyan-500/20 border border-cyan-500/40",
//     iconColor: "text-cyan-400",
//     badgeColor: "text-cyan-300 border-cyan-500/30 bg-cyan-500/10",
//     dotColor: "bg-cyan-400",
//     labelColor: "text-cyan-400",
//     statBorder: "border-cyan-500/20 hover:border-cyan-400/50",
//     stats: [
//       { value: "16-bit", label: "ADC Resolution", icon: Gauge },
//       { value: "10 GSPS", label: "Sample Rate", icon: Activity },
//       { value: "AEC-Q100", label: "Qualified", icon: Shield },
//     ],
//     features: ["Precision Analog", "Industrial Grade", "Low Noise"],
//     featureStyle: "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30",
//   },
//   {
//     id: 2,
//     title: "Power Management ICs",
//     subtitle:
//       "High-efficiency PMIC solutions delivering 92% peak efficiency with integrated protection for automotive and industrial power domains.",
//     badge: "Power Management Excellence",
//     gradient: "from-emerald-600 to-teal-500",
//     iconBg: "bg-emerald-500/20 border border-emerald-500/40",
//     iconColor: "text-emerald-400",
//     badgeColor: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
//     dotColor: "bg-emerald-400",
//     labelColor: "text-emerald-400",
//     statBorder: "border-emerald-500/20 hover:border-emerald-400/50",
//     stats: [
//       { value: "92%", label: "Peak Efficiency", icon: Zap },
//       { value: "40V", label: "Input Range", icon: Shield },
//       { value: "10A", label: "Output Current", icon: Cpu },
//     ],
//     features: ["Buck/Boost", "LDO Regulators", "Battery Management"],
//     featureStyle:
//       "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30",
//   },
//   {
//     id: 3,
//     title: "High-Speed SERDES & Connectivity",
//     subtitle:
//       "Multi-protocol SERDES IP supporting 3.125 Gbps data rates for high-bandwidth video, networking, and inter-chip communication.",
//     badge: "Connectivity Solutions",
//     gradient: "from-purple-600 to-pink-500",
//     iconBg: "bg-purple-500/20 border border-purple-500/40",
//     iconColor: "text-purple-400",
//     badgeColor: "text-purple-300 border-purple-500/30 bg-purple-500/10",
//     dotColor: "bg-purple-400",
//     labelColor: "text-purple-400",
//     statBorder: "border-purple-500/20 hover:border-purple-400/50",
//     stats: [
//       { value: "3.125 Gbps", label: "Data Rate", icon: Signal },
//       { value: "Multi-Protocol", label: "SERDES", icon: Server },
//       { value: "Low EMI", label: "SSC Support", icon: Shield },
//     ],
//     features: ["Multi-Protocol", "Signal Integrity", "Low Power"],
//     featureStyle:
//       "bg-purple-500/10 text-purple-300 border border-purple-500/30",
//   },
//   {
//     id: 4,
//     title: "Embedded Edge Computing Systems",
//     subtitle:
//       "ARM Cortex-M based embedded processors with integrated analog peripherals for industrial control and edge AI applications.",
//     badge: "Edge Computing",
//     gradient: "from-orange-600 to-red-500",
//     iconBg: "bg-orange-500/20 border border-orange-500/40",
//     iconColor: "text-orange-400",
//     badgeColor: "text-orange-300 border-orange-500/30 bg-orange-500/10",
//     dotColor: "bg-orange-400",
//     labelColor: "text-orange-400",
//     statBorder: "border-orange-500/20 hover:border-orange-400/50",
//     stats: [
//       { value: "Cortex-M", label: "Processor Core", icon: Cpu },
//       { value: "2 TOPS", label: "AI Acceleration", icon: Cpu },
//       { value: "TrustZone", label: "Security", icon: Shield },
//     ],
//     features: ["ARM Cortex-M", "DSP Extensions", "Ultra-Low Power"],
//     featureStyle:
//       "bg-orange-500/10 text-orange-300 border border-orange-500/30",
//   },
// ];

// export function Hero() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const contentRef = useRef<HTMLDivElement>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [direction, setDirection] = useState<"next" | "prev">("next");
//   const [videoError, setVideoError] = useState(false);
//   const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

//   const currentSlide = sliderContent[activeIndex];

//   // Auto-slide
//   const startAutoSlide = () => {
//     if (autoSlideRef.current) clearInterval(autoSlideRef.current);
//     autoSlideRef.current = setInterval(() => {
//       if (!isAnimating) handleNext();
//     }, 7000);
//   };
//   const stopAutoSlide = () => {
//     if (autoSlideRef.current) {
//       clearInterval(autoSlideRef.current);
//       autoSlideRef.current = null;
//     }
//   };
//   useEffect(() => {
//     startAutoSlide();
//     return () => stopAutoSlide();
//   }, [activeIndex, isAnimating]);

//   // Force video play
//   useEffect(() => {
//     const v = videoRef.current;
//     if (!v) return;
//     v.muted = true;
//     v.play().catch(() => setVideoError(true));
//   }, []);

//   const handleNext = () => {
//     if (isAnimating) return;
//     setDirection("next");
//     setIsAnimating(true);
//     setActiveIndex((prev) =>
//       prev === sliderContent.length - 1 ? 0 : prev + 1,
//     );
//   };

//   const goToSlide = (index: number) => {
//     if (isAnimating || index === activeIndex) return;
//     setDirection(index > activeIndex ? "next" : "prev");
//     setIsAnimating(true);
//     setActiveIndex(index);
//   };

//   // Slide change GSAP
//   useEffect(() => {
//     if (!contentRef.current) return;
//     const ctx = gsap.context(() => {
//       const tl = gsap.timeline({ onComplete: () => setIsAnimating(false) });
//       const d = direction === "next" ? 30 : -30;

//       tl.to(
//         [
//           ".hero-badge",
//           ".hero-title",
//           ".hero-subtitle",
//           ".feature-tag",
//           ".hero-cta",
//           ".stat-item",
//         ],
//         {
//           opacity: 0,
//           y: -d,
//           stagger: 0.04,
//           duration: 0.22,
//           ease: "power2.in",
//         },
//       )
//         .fromTo(
//           ".hero-badge",
//           { opacity: 0, y: d, scale: 0.9 },
//           { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(0.4)" },
//           "-=0.05",
//         )
//         .fromTo(
//           ".hero-title",
//           { opacity: 0, y: d, filter: "blur(8px)" },
//           {
//             opacity: 1,
//             y: 0,
//             filter: "blur(0px)",
//             duration: 0.55,
//             ease: "power3.out",
//           },
//           "-=0.3",
//         )
//         .fromTo(
//           ".hero-subtitle",
//           { opacity: 0, y: d * 0.7, filter: "blur(4px)" },
//           {
//             opacity: 1,
//             y: 0,
//             filter: "blur(0px)",
//             duration: 0.45,
//             ease: "power3.out",
//           },
//           "-=0.35",
//         )
//         .fromTo(
//           ".feature-tag",
//           { opacity: 0, scale: 0.8 },
//           {
//             opacity: 1,
//             scale: 1,
//             duration: 0.3,
//             stagger: 0.05,
//             ease: "back.out(0.3)",
//           },
//           "-=0.25",
//         )
//         .fromTo(
//           ".hero-cta",
//           { opacity: 0, y: 20 },
//           { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
//           "-=0.2",
//         )
//         .fromTo(
//           ".stat-item",
//           { opacity: 0, y: 20, scale: 0.92 },
//           {
//             opacity: 1,
//             y: 0,
//             scale: 1,
//             duration: 0.4,
//             stagger: 0.07,
//             ease: "back.out(0.3)",
//           },
//           "-=0.2",
//         );
//     }, contentRef);
//     return () => ctx.revert();
//   }, [activeIndex, direction]);

//   // Initial load GSAP
//   useEffect(() => {
//     if (!containerRef.current) return;
//     const ctx = gsap.context(() => {
//       const tl = gsap.timeline();
//       tl.fromTo(
//         ".hero-badge",
//         { opacity: 0, y: -30, scale: 0.8 },
//         { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(0.5)" },
//         0.4,
//       )
//         .fromTo(
//           ".hero-title",
//           { opacity: 0, y: 50, filter: "blur(12px)" },
//           {
//             opacity: 1,
//             y: 0,
//             filter: "blur(0px)",
//             duration: 0.7,
//             ease: "power3.out",
//           },
//           "-=0.4",
//         )
//         .fromTo(
//           ".hero-subtitle",
//           { opacity: 0, y: 30, filter: "blur(8px)" },
//           {
//             opacity: 1,
//             y: 0,
//             filter: "blur(0px)",
//             duration: 0.6,
//             ease: "power3.out",
//           },
//           "-=0.45",
//         )
//         .fromTo(
//           ".feature-tag",
//           { opacity: 0, scale: 0.8 },
//           {
//             opacity: 1,
//             scale: 1,
//             duration: 0.4,
//             stagger: 0.05,
//             ease: "back.out(0.3)",
//           },
//           "-=0.35",
//         )
//         .fromTo(
//           ".hero-cta",
//           { opacity: 0, y: 20 },
//           { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
//           "-=0.25",
//         )
//         .fromTo(
//           ".stat-item",
//           { opacity: 0, y: 30, scale: 0.85 },
//           {
//             opacity: 1,
//             y: 0,
//             scale: 1,
//             duration: 0.5,
//             stagger: 0.1,
//             ease: "back.out(0.4)",
//           },
//           "-=0.2",
//         )
//         .fromTo(
//           ".dot",
//           { opacity: 0, scale: 0 },
//           {
//             opacity: 1,
//             scale: 1,
//             duration: 0.4,
//             stagger: 0.05,
//             ease: "back.out(0.6)",
//           },
//           "-=0.1",
//         );
//     }, containerRef);
//     return () => ctx.revert();
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       className="relative w-full min-h-screen bg-gray-950 overflow-hidden"
//     >
//       {/* ── Background Video ── */}
//       {!videoError && (
//         <video
//           ref={videoRef}
//           autoPlay
//           loop
//           muted
//           playsInline
//           onError={() => setVideoError(true)}
//           className="absolute inset-0 w-full h-full object-cover opacity-40 z-0"
//         >
//           <source src="/videos/analog.mp4" type="video/mp4" />
//         </video>
//       )}

//       {/* ── CSS Fallback Background (always rendered under video) ── */}
//       <div className="absolute inset-0 z-0 overflow-hidden">
//         {/* Animated grid */}
//         <div
//           className="absolute inset-0 opacity-[0.07]"
//           style={{
//             backgroundImage:
//               "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
//             backgroundSize: "48px 48px",
//             animation: "gridScroll 20s linear infinite",
//           }}
//         />
//         {/* Floating orbs */}
//         <div className="absolute -top-48 -left-32 w-[600px] h-[600px] rounded-full bg-cyan-500 opacity-10 blur-[100px] animate-[orbFloat1_18s_ease-in-out_infinite]" />
//         <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-blue-600 opacity-10 blur-[80px] animate-[orbFloat2_14s_ease-in-out_infinite]" />
//       </div>

//       {/* ── Gradient Overlays ── */}
//       {/* Strong bottom overlay so content sits on solid dark */}
//       <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-gray-950/30 z-[1]" />
//       {/* Left-side darker zone so left-aligned text pops */}
//       <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 via-gray-950/20 to-transparent z-[1]" />

//       {/* ── Main Content ── */}
//       <div
//         ref={contentRef}
//         className="relative z-10 w-full min-h-screen flex items-center"
//       >
//         <div className="container mx-auto px-6 md:px-10 lg:px-16 max-w-7xl">
//           {/* Left-aligned content block */}
//           <div className="flex flex-col items-start max-w-3xl py-24 md:py-28">
//             {/* Badge */}
//             <div
//               className={`hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm mb-6 ${currentSlide.badgeColor}`}
//             >
//               <span
//                 className={`w-1.5 h-1.5 rounded-full animate-pulse ${currentSlide.dotColor}`}
//               />
//               <span className="text-xs font-semibold tracking-widest uppercase">
//                 {currentSlide.badge}
//               </span>
//             </div>

//             {/* Title */}
//             <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-5 leading-[1.1] tracking-tight text-left">
//               {currentSlide.title}
//             </h1>

//             {/* Subtitle */}
//             <p className="hero-subtitle text-base md:text-lg text-gray-300 mb-5 max-w-2xl leading-relaxed text-left">
//               {currentSlide.subtitle}
//             </p>

//             {/* Feature Tags */}
//             <div className="flex mt-3 flex-wrap gap-2 mb-5 justify-start">
//               {currentSlide.features.map((feature, idx) => (
//                 <span
//                   key={idx}
//                   className={`feature-tag px-3 py-1 text-xs font-mono font-semibold rounded-md ${currentSlide.featureStyle}`}
//                 >
//                   {feature}
//                 </span>
//               ))}
//             </div>

//             {/* CTA Buttons */}
//             <div className="hero-cta flex flex-col sm:flex-row gap-3 mb-8 w-full">
//               <Button
//                 asChild
//                 className={`bg-gradient-to-r ${currentSlide.gradient} hover:opacity-90 text-white font-semibold py-6 px-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 group text-sm tracking-wide`}
//               >
//                 <Link href="/products">
//                   Explore Products
//                   <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
//                 </Link>
//               </Button>
//               <Button
//                 asChild
//                 variant="outline"
//                 className="border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white py-6 px-8 font-semibold rounded-lg transition-all duration-300 text-sm tracking-wide group"
//               >
//                 <Link href="/contact">
//                   Contact Sales
//                   <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
//                 </Link>
//               </Button>
//             </div>

//             {/* ── Stats Grid ── */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
//               {currentSlide.stats.map((stat, idx) => {
//                 const Icon = stat.icon;
//                 return (
//                   <div
//                     key={idx}
//                     className={`stat-item flex items-center gap-4 rounded-xl p-3 bg-gray-900/80 border backdrop-blur-md transition-all duration-300 ${currentSlide.statBorder}`}
//                   >
//                     {/* Icon */}
//                     <div
//                       className={`w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center ${currentSlide.iconBg}`}
//                     >
//                       <Icon className={`w-5 h-5 ${currentSlide.iconColor}`} />
//                     </div>
//                     {/* Text */}
//                     <div className="flex flex-col items-start">
//                       <p className="font-bold text-lg font-mono tracking-tight text-white leading-none mb-1">
//                         {stat.value}
//                       </p>
//                       <p
//                         className={`text-xs font-semibold uppercase tracking-widest ${currentSlide.labelColor}`}
//                       >
//                         {stat.label}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── Slide Dots (Only navigation element remaining) ── */}
//       <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
//         {sliderContent.map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => goToSlide(idx)}
//             aria-label={`Go to slide ${idx + 1}`}
//             className="focus:outline-none"
//           >
//             <div
//               className={`dot h-1 rounded-full transition-all duration-500 ${
//                 idx === activeIndex
//                   ? `${currentSlide.dotColor} w-10`
//                   : "bg-white/30 w-2 hover:bg-white/60"
//               }`}
//             />
//           </button>
//         ))}
//       </div>

//       {/* ── Slide Counter ── */}
//       <div className="absolute bottom-5 right-4 md:right-8 text-xs text-gray-500 font-mono z-30 select-none">
//         {String(activeIndex + 1).padStart(2, "0")} /{" "}
//         {String(sliderContent.length).padStart(2, "0")}
//       </div>

//       {/* ── Keyframe Styles ── */}
//       <style jsx>{`
//         @keyframes gridScroll {
//           0% {
//             background-position: 0 0;
//           }
//           100% {
//             background-position: 48px 48px;
//           }
//         }
//         @keyframes orbFloat1 {
//           0%,
//           100% {
//             transform: translate(0, 0) scale(1);
//           }
//           33% {
//             transform: translate(60px, 40px) scale(1.05);
//           }
//           66% {
//             transform: translate(-30px, 80px) scale(0.95);
//           }
//         }
//         @keyframes orbFloat2 {
//           0%,
//           100% {
//             transform: translate(0, 0) scale(1);
//           }
//           50% {
//             transform: translate(-80px, -60px) scale(1.1);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

//////////////////////////

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  ChevronLeft,
  ChevronRight,
  Shield,
  Cpu,
  CircuitBoard,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

// Slider content array with background images
const sliderContent = [
  {
    id: 1,
    title: "Design in India. Power the World.",
    subtitle:
      "A fabless semiconductor company designing high-performance power management solutions for modern electronic systems — built on India's semiconductor mission.",
    badge: "Make in India · Design in India",
    ctaText: "Explore Products",
    ctaLink: "/products",
    secondaryCta: "Contact Us",
    backgroundImage:
      "https://png.pngtree.com/thumb_back/fh260/background/20230722/pngtree-symbolic-code-fragment-illuminates-computer-screen-embodying-coding-and-programming-3d-image_3785571.jpg",
    // backgroundImage: "/images/banner.png",
    gradient: "from-blue-600 to-cyan-500",
    gradientLight: "from-blue-500 to-cyan-400",
    stats: [
      { value: "ISM", label: "Mission Aligned", icon: Shield },
      { value: "India", label: "Owned Analog IPs", icon: Cpu },
      { value: "Global", label: "Market Ready", icon: CircuitBoard },
    ],
    features: ["Power Management", "Analog ICs", "Domestic & Overseas"],
  },
  {
    id: 2,
    title: "High-Performance Power Management ICs",
    subtitle:
      "Our portfolio addresses the growing demand for efficient, compact, and reliable power delivery across a wide range of applications.",
    badge: "Boost · Buck · LDO · LED Drivers",
    ctaText: "View Products",
    ctaLink: "/products",
    secondaryCta: "Contact Us",
    backgroundImage:
      "https://media.istockphoto.com/id/1752904635/photo/digital-battery-hologram-on-future-tech-background-innovations-and-efficiency-of-power-supply.jpg?s=612x612&w=0&k=20&c=6kJaASlCqmN0ikGBmImFuXkmpFqcgvEreSA3M3qZM8s=",
    gradient: "from-emerald-600 to-teal-500",
    gradientLight: "from-emerald-500 to-teal-400",
    stats: [
      { value: "Boost", label: "Converter", icon: Shield },
      { value: "LDO", label: "Regulators", icon: Cpu },
      { value: "LED", label: "Drivers", icon: CircuitBoard },
    ],
    features: ["Voltage Conversion", "Linear Regulators", "Lighting Solutions"],
  },
  {
    id: 3,
    title: "Powering IoT, Automotive & Industrial",
    subtitle:
      "From consumer gadgets and IoT devices to computing infrastructure and automotive systems — our ICs deliver reliable power where it matters most.",
    badge: "Protection & Control Solutions",
    ctaText: "View Products",
    ctaLink: "/products",
    secondaryCta: "Contact Us",
    backgroundImage:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920&auto=format&fit=crop",
    gradient: "from-purple-600 to-pink-500",
    gradientLight: "from-purple-500 to-pink-400",
    stats: [
      { value: "IoT", label: "& Embedded", icon: Shield },
      { value: "Auto", label: "& Industrial", icon: Cpu },
      { value: "Smart", label: "Lighting", icon: CircuitBoard },
    ],
    features: ["Diode Controllers", "Load Switches", "Battery Management"],
  },
  {
    id: 4,
    title: "Enriching India's Semiconductor Mission",
    subtitle:
      "Deploying Indian-owned Analog IPs for domestic and overseas markets — contributing to a self-reliant semiconductor ecosystem.",
    badge: "India Semiconductor Mission",
    ctaText: "About Us",
    ctaLink: "/about",
    secondaryCta: "Contact Us",
    backgroundImage:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1600&auto=format&fit=crop",
    gradient: "from-orange-600 to-red-500",
    gradientLight: "from-orange-500 to-red-400",
    stats: [
      { value: "ISM", label: "Objective Aligned", icon: Shield },
      { value: "Indian", label: "Analog IPs", icon: Cpu },
      { value: "Export", label: "Ready", icon: CircuitBoard },
    ],
    features: ["Fabless Design", "Indian Owned IPs", "Global Deployment"],
  },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

  const currentSlide = sliderContent[activeIndex];
  const nextSlide = sliderContent[(activeIndex + 1) % sliderContent.length];

  // Auto-slide functionality
  const startAutoSlide = () => {
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    autoSlideRef.current = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 6000);
  };

  const stopAutoSlide = () => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
      autoSlideRef.current = null;
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [activeIndex, isAnimating]);

  const handlePrev = () => {
    if (isAnimating) return;
    setDirection("prev");
    setIsAnimating(true);
    setActiveIndex((prev) =>
      prev === 0 ? sliderContent.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    if (isAnimating) return;
    setDirection("next");
    setIsAnimating(true);
    setActiveIndex((prev) =>
      prev === sliderContent.length - 1 ? 0 : prev + 1,
    );
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    setDirection(index > activeIndex ? "next" : "prev");
    setIsAnimating(true);
    setActiveIndex(index);
  };

  // GSAP animations for background and content
  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        onComplete: () => setIsAnimating(false),
      });

      const directionValue = direction === "next" ? 30 : -30;

      // Animate background image transition
      timeline
        .to(".bg-slider-image", {
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
        })
        .set(".bg-slider-image", {
          backgroundImage: `url(${currentSlide.backgroundImage})`,
        })
        .to(".bg-slider-image", {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        });

      // Animate gradient overlay
      timeline.to(
        ".gradient-overlay",
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        },
        "-=0.5",
      );
      timeline.set(".gradient-overlay", {
        background: `linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%)`,
      });
      timeline.to(
        ".gradient-overlay",
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3",
      );

      // Animate content elements
      timeline
        .to(".content-wrapper > *", {
          opacity: 0,
          y: -directionValue,
          stagger: 0.05,
          duration: 0.25,
          ease: "power2.in",
        })
        .set(".content-wrapper", { clearProps: "all" })
        .fromTo(
          ".hero-badge",
          { opacity: 0, y: directionValue, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "back.out(0.4)",
          },
          "-=0.1",
        )
        .fromTo(
          ".hero-title",
          { opacity: 0, y: directionValue, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.35",
        )
        .fromTo(
          ".hero-subtitle",
          { opacity: 0, y: directionValue * 0.7, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .fromTo(
          ".feature-tag",
          { opacity: 0, scale: 0.8, stagger: 0.05 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.35,
            stagger: 0.05,
            ease: "back.out(0.3)",
          },
          "-=0.3",
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          "-=0.25",
        )
        .fromTo(
          ".hero-stats .stat-item",
          { opacity: 0, y: 15, stagger: 0.08 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.2",
        );
    }, containerRef);

    return () => ctx.revert();
  }, [activeIndex, direction, currentSlide]);

  // Initial load animation
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline();

      timeline
        .fromTo(
          ".bg-slider-image",
          { opacity: 0, scale: 1.1 },
          { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
        )
        .fromTo(
          ".gradient-overlay",
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.8",
        )
        .fromTo(
          ".hero-badge",
          { opacity: 0, y: -30, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(0.5)" },
          "-=0.3",
        )
        .fromTo(
          ".hero-title",
          { opacity: 0, y: 50, filter: "blur(12px)" },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            filter: "blur(0px)",
            ease: "power3.out",
          },
          "-=0.4",
        )
        .fromTo(
          ".hero-subtitle",
          { opacity: 0, y: 30, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            filter: "blur(0px)",
            ease: "power3.out",
          },
          "-=0.5",
        )
        .fromTo(
          ".feature-tag",
          { opacity: 0, scale: 0.8, stagger: 0.05 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.05,
            ease: "back.out(0.3)",
          },
          "-=0.4",
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.3",
        )
        .fromTo(
          ".hero-stats .stat-item",
          { opacity: 0, y: 20, stagger: 0.1 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
          "-=0.2",
        )
        .fromTo(
          ".slider-dots .dot",
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.05,
            ease: "back.out(0.6)",
          },
          "-=0.1",
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Slider Image */}
      <div
        className="bg-slider-image absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url(${currentSlide.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Gradient Overlay */}
      <div className="gradient-overlay absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />

      {/* Animated particles overlay */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float-particle ${3 + Math.random() * 5}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div
        ref={contentRef}
        className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl  py-16 md:py-20"
      >
        <div className="content-wrapper max-w-5xl">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg mb-6">
            <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
            <span className="text-sm font-semibold text-white tracking-wide">
              {currentSlide.badge}
            </span>
          </div>

          {/* Title */}
          <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-5 leading-[1.2] tracking-tight">
            {currentSlide.title}
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-md md:text-xl text-white/80 mb-6 max-w-2xl leading-relaxed">
            {currentSlide.subtitle}
          </p>

          {/* Feature Tags */}
          {/* <div className="flex flex-wrap gap-2 mb-6">
            {currentSlide.features.map((feature, idx) => (
              <span
                key={idx}
                className="feature-tag px-3 py-1 text-xs font-medium rounded-full bg-white/10 backdrop-blur-sm text-white/90 border border-white/20"
              >
                {feature}
              </span>
            ))}
          </div> */}

          {/* CTA Buttons */}
          <div className="hero-cta flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              className={`bg-gradient-to-r ${currentSlide.gradient} hover:opacity-90 text-white font-semibold py-6 px-8 rounded shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 group`}
            >
              <Link href={currentSlide.ctaLink}>
                {currentSlide.ctaText}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white py-6 px-8 font-semibold rounded shadow-sm hover:shadow-md transition-all duration-300"
            >
              <Link href="/contact">{currentSlide.secondaryCta}</Link>
            </Button>
          </div>

          {/* Stats */}
          {/* <div className="hero-stats mt-10 flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
            {currentSlide.stats.map((stat, idx) => {
              const IconComponent = stat.icon;
              return (
                <div key={idx} className="stat-item flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg bg-gradient-to-r ${currentSlide.gradientLight} bg-opacity-20 flex items-center justify-center`}
                  >
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-xl text-white">{stat.value}</p>
                    <p className="text-white/60 text-xs">{stat.label}</p>
                  </div>
                  {idx < currentSlide.stats.length - 1 && (
                    <div className="h-8 w-px bg-white/20 hidden sm:block" />
                  )}
                </div>
              );
            })}
          </div> */}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 group z-20"
        disabled={isAnimating}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 text-white group-hover:text-cyan-300" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 group z-20"
        disabled={isAnimating}
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 text-white group-hover:text-cyan-300" />
      </button>

      {/* Slide Indicators */}
      <div className="slider-dots absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3">
        {sliderContent.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className="group relative"
            aria-label={`Go to slide ${idx + 1}`}
          >
            <div
              className={`dot h-1.5 rounded-full transition-all duration-500 ${
                idx === activeIndex
                  ? `w-8 md:w-10 bg-gradient-to-r ${currentSlide.gradient}`
                  : "w-1.5 bg-white/40 group-hover:bg-white/60 group-hover:w-3"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-4 md:right-8 text-xs text-white/60 font-medium">
        {String(activeIndex + 1).padStart(2, "0")} /{" "}
        {String(sliderContent.length).padStart(2, "0")}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-60">
        <span className="text-xs text-white/60">Scroll</span>
        <div className="w-4 h-6 border border-white/30 rounded-full flex justify-center">
          <div className="w-0.5 h-1.5 bg-white/50 rounded-full mt-1 animate-bounce" />
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float-particle {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          25% {
            transform: translateY(-30px) translateX(15px);
            opacity: 0.5;
          }
          50% {
            transform: translateY(0px) translateX(30px);
            opacity: 0.8;
          }
          75% {
            transform: translateY(30px) translateX(15px);
            opacity: 0.5;
          }
        }
      `}</style>
    </section>
  );
}
