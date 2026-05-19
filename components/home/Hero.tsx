"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Shield,
  Cpu,
  CircuitBoard,
  Sparkles,
  Zap,
  Microchip,
  Server,
  Layers,
  Activity,
  Gauge,
  Signal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

// Slider content array - Enterprise Semiconductor Focus
const sliderContent = [
  {
    id: 1,
    title: "Analog & Mixed-Signal Solutions",
    subtitle:
      "Precision analog and mixed-signal semiconductors for mission-critical applications in automotive, industrial, and communications infrastructure.",
    badge: "Analog Excellence Since 2015",
    gradient: "from-blue-600 to-cyan-500",
    gradientLight: "from-blue-500 to-cyan-400",
    stats: [
      { value: "16-bit", label: "ADC Resolution", icon: Gauge },
      { value: "10 GSPS", label: "Sample Rate", icon: Activity },
      { value: "AEC-Q100", label: "Qualified", icon: Shield },
    ],
    features: ["Precision Analog", "Industrial Grade", "Low Noise"],
  },
  {
    id: 2,
    title: "Power Management ICs",
    subtitle:
      "High-efficiency PMIC solutions delivering 92% peak efficiency with integrated protection for automotive and industrial power domains.",
    badge: "Power Management Excellence",
    gradient: "from-emerald-600 to-teal-500",
    gradientLight: "from-emerald-500 to-teal-400",
    stats: [
      { value: "92%", label: "Peak Efficiency", icon: Zap },
      { value: "40V", label: "Input Range", icon: Shield },
      { value: "10A", label: "Output Current", icon: Cpu },
    ],
    features: ["Buck/Boost", "LDO Regulators", "Battery Management"],
  },
  {
    id: 3,
    title: "High-Speed SERDES & Connectivity",
    subtitle:
      "Multi-protocol SERDES IP supporting 3.125 Gbps data rates for high-bandwidth video, networking, and inter-chip communication.",
    badge: "Connectivity Solutions",
    gradient: "from-purple-600 to-pink-500",
    gradientLight: "from-purple-500 to-pink-400",
    stats: [
      { value: "3.125 Gbps", label: "Data Rate", icon: Signal },
      { value: "Multi-Protocol", label: "SERDES", icon: Server },
      { value: "Low EMI", label: "SSC Support", icon: Shield },
    ],
    features: ["Multi-Protocol", "Signal Integrity", "Low Power"],
  },
  {
    id: 4,
    title: "Embedded Edge Computing Systems",
    subtitle:
      "ARM Cortex-M based embedded processors with integrated analog peripherals for industrial control and edge AI applications.",
    badge: "Edge Computing",
    gradient: "from-orange-600 to-red-500",
    gradientLight: "from-orange-500 to-red-400",
    stats: [
      { value: "Cortex-M", label: "Processor Core", icon: Cpu },
      { value: "2 TOPS", label: "AI Acceleration", icon: Microchip },
      { value: "TrustZone", label: "Security", icon: Shield },
    ],
    features: ["ARM Cortex-M", "DSP Extensions", "Ultra-Low Power"],
  },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

  const currentSlide = sliderContent[activeIndex];

  // Auto-slide functionality
  const startAutoSlide = () => {
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    autoSlideRef.current = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 7000);
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

  // Ensure video plays
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .catch((e) => console.log("Video autoplay failed:", e));
    }
  }, []);

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

  // GSAP animations for content
  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        onComplete: () => setIsAnimating(false),
      });

      const directionValue = direction === "next" ? 30 : -30;

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
    }, contentRef);

    return () => ctx.revert();
  }, [activeIndex, direction]);

  // Initial load animation
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline();

      timeline
        .fromTo(
          ".video-overlay",
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: "power2.out" },
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
      className="relative min-h-screen font-['Inter',sans-serif] flex items-center justify-center overflow-hidden"
    >
      {/* Background Video - Analog Semiconductor Theme */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/analog.mp4" type="video/mp4" />
      </video>

      {/* Dark Gradient Overlay - Enterprise Grade */}
      <div className="video-overlay absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/90 via-[#0F172A]/80 to-[#020617]/90" />

      {/* Circuit Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0v30h30M0 30h30v30' stroke='%2300ffff' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Animated particles - Semiconductor Electron Flow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-cyan-400/40 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float-particle ${3 + Math.random() * 4}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div
        ref={contentRef}
        className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-16 md:py-24"
      >
        <div className="content-wrapper max-w-3xl">
          {/* Badge - Corporate Style */}
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-lg mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-semibold text-cyan-300 tracking-wider uppercase">
              {currentSlide.badge}
            </span>
          </div>

          {/* Title - Bold Enterprise Typography */}
          <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-[1.2] tracking-tight">
            {currentSlide.title}
          </h1>

          {/* Subtitle - Technical Description */}
          <p className="hero-subtitle text-base md:text-lg text-gray-300 mb-6 max-w-2xl leading-relaxed">
            {currentSlide.subtitle}
          </p>

          {/* Feature Tags - Technical Capabilities */}
          <div className="flex flex-wrap gap-2 mb-8">
            {currentSlide.features.map((feature, idx) => (
              <span
                key={idx}
                className="feature-tag px-3 py-1 text-xs font-mono font-medium rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* CTA Buttons - Only Products and Contact */}
          <div className="hero-cta flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              className={`bg-gradient-to-r ${currentSlide.gradient} hover:opacity-90 text-white font-semibold py-6 px-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 group text-sm tracking-wide`}
            >
              <Link href="/products">
                Explore Products
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white py-6 px-8 font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-sm tracking-wide"
            >
              <Link href="/contact">
                Contact Sales
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Technical Stats - Engineering Metrics */}
          <div className="hero-stats mt-12 flex flex-wrap items-center gap-6 sm:gap-8">
            {currentSlide.stats.map((stat, idx) => {
              const IconComponent = stat.icon;
              return (
                <div key={idx} className="stat-item flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${currentSlide.gradientLight} bg-opacity-10 flex items-center justify-center`}
                  >
                    <IconComponent className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-bold text-xl text-white font-mono tracking-tight">
                      {stat.value}
                    </p>
                    <p className="text-gray-400 text-xs uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </div>
                  {idx < currentSlide.stats.length - 1 && (
                    <div className="h-8 w-px bg-white/10 hidden sm:block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-cyan-500/20 transition-all duration-300 hover:scale-110 group z-20"
        disabled={isAnimating}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 text-white group-hover:text-cyan-300" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-cyan-500/20 transition-all duration-300 hover:scale-110 group z-20"
        disabled={isAnimating}
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 text-white group-hover:text-cyan-300" />
      </button>

      {/* Slide Indicators - Corporate Style */}
      <div className="slider-dots absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3">
        {sliderContent.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className="group relative"
            aria-label={`Go to slide ${idx + 1}`}
          >
            <div
              className={`dot h-1 rounded-full transition-all duration-500 ${
                idx === activeIndex
                  ? `w-8 md:w-12 bg-gradient-to-r ${currentSlide.gradient}`
                  : "w-2 bg-white/30 group-hover:bg-white/50 group-hover:w-3"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-4 md:right-8 text-xs text-gray-400 font-mono">
        {String(activeIndex + 1).padStart(2, "0")} /{" "}
        {String(sliderContent.length).padStart(2, "0")}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-50">
        <span className="text-xs text-gray-400 uppercase tracking-wider">
          Scroll
        </span>
        <div className="w-4 h-6 border border-white/20 rounded-full flex justify-center">
          <div className="w-0.5 h-1.5 bg-cyan-400/50 rounded-full mt-1 animate-bounce" />
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
            transform: translateY(-40px) translateX(20px);
            opacity: 0.6;
          }
          50% {
            transform: translateY(0px) translateX(40px);
            opacity: 0.8;
          }
          75% {
            transform: translateY(40px) translateX(20px);
            opacity: 0.6;
          }
        }
      `}</style>
    </section>
  );
}
