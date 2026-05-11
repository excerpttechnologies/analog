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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

// Slider content array
const sliderContent = [
  {
    id: 1,
    title: "Premium Analog & Digital Solutions",
    subtitle:
      "Cutting-edge semiconductor technology for signal processing, data conversion, and AI-enhanced analog systems.",
    badge: "Next Generation Semiconductors",
    ctaText: "Explore Products",
    ctaLink: "/products",
    secondaryCta: "Request Demo",
    image:
      "https://img.freepik.com/free-photo/future-visions-business-technology-concept_23-2151893412.jpg?semt=ais_hybrid&w=740&q=80",
    gradient: "from-blue-600 to-cyan-500",
    stats: [
      { value: "500+", label: "Enterprise Clients", icon: Shield },
      { value: "20+", label: "Years Industry", icon: Cpu },
      { value: "99.9%", label: "Uptime SLA", icon: CircuitBoard },
    ],
  },
  {
    id: 2,
    title: "AI-Enhanced Analog Systems",
    subtitle:
      "Revolutionary AI-powered analog processing that adapts in real-time, reducing power consumption by 40% while increasing performance.",
    badge: "AI Integration",
    ctaText: "Learn More",
    ctaLink: "/ai-solutions",
    secondaryCta: "Watch Demo",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=600&fit=crop",
    gradient: "from-purple-600 to-pink-500",
    stats: [
      { value: "40%", label: "Power Reduction", icon: Shield },
      { value: "2x", label: "Performance", icon: Cpu },
      { value: "24/7", label: "AI Support", icon: CircuitBoard },
    ],
  },
  {
    id: 3,
    title: "High-Performance Data Conversion",
    subtitle:
      "Industry-leading ADC/DAC solutions with 16-bit resolution at 10 GSPS, setting new standards for precision and speed.",
    badge: "Data Conversion",
    ctaText: "View Specs",
    ctaLink: "/products/data-conversion",
    secondaryCta: "Contact Sales",
    image:
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&h=600&fit=crop",
    gradient: "from-emerald-600 to-teal-500",
    stats: [
      { value: "16-bit", label: "Resolution", icon: Shield },
      { value: "10 GSPS", label: "Sample Rate", icon: Cpu },
      { value: "0.1%", label: "INL Max", icon: CircuitBoard },
    ],
  },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const currentSlide = sliderContent[activeIndex];

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [activeIndex]);

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

  // GSAP animations on slide change
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        onComplete: () => setIsAnimating(false),
      });

      // Animate text elements
      const directionMultiplier = direction === "next" ? 30 : -30;

      timeline
        .fromTo(
          ".hero-title",
          { opacity: 0, y: directionMultiplier, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            filter: "blur(0px)",
            ease: "power2.out",
          },
        )
        .fromTo(
          ".hero-subtitle",
          { opacity: 0, y: directionMultiplier * 0.7, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            filter: "blur(0px)",
            ease: "power2.out",
          },
          "-=0.4",
        )
        .fromTo(
          ".hero-badge",
          { opacity: 0, x: directionMultiplier * 0.5, scale: 0.9 },
          { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: "back.out(0.4)" },
          "-=0.5",
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.3",
        )
        .fromTo(
          ".hero-stats .stat-item",
          { opacity: 0, y: 15, stagger: 0.1 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" },
          "-=0.2",
        );
    }, containerRef);

    return () => ctx.revert();
  }, [activeIndex, direction]);

  // Initial load animation
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline();

      timeline
        .fromTo(
          ".hero-image-wrapper",
          { opacity: 0, scale: 0.9, rotate: -5 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 1.2,
            ease: "back.out(0.3)",
          },
        )
        .fromTo(
          ".hero-title",
          { opacity: 0, y: 50, filter: "blur(12px)" },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            filter: "blur(0px)",
            ease: "power3.out",
          },
        )
        .fromTo(
          ".hero-subtitle",
          { opacity: 0, y: 30, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            filter: "blur(0px)",
            ease: "power3.out",
          },
          "-=0.5",
        )
        .fromTo(
          ".hero-badge",
          { opacity: 0, x: -30, scale: 0.8 },
          { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: "back.out(0.5)" },
          "-=0.6",
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
      className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/25 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-200/10 rounded-full blur-3xl" />

        {/* Simple grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(14, 165, 233) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="relative z-10">
            {/* Badge */}
            <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200/50 shadow-sm mb-4 mt-2 backdrop-blur-sm">
              <Zap className="w-4 h-4 text-blue-600 animate-pulse" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
                {currentSlide.badge}
              </span>
            </div>

            {/* Title with gradient text */}
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-[1.2] tracking-tight">
              <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-cyan-700 bg-clip-text text-transparent">
                {currentSlide.title}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle text-lg md:text-xl text-slate-600 mb-8 max-w-lg leading-relaxed">
              {currentSlide.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className={`bg-gradient-to-r ${currentSlide.gradient} hover:opacity-90 text-white font-semibold py-6 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 group`}
              >
                <Link href={currentSlide.ctaLink}>
                  {currentSlide.ctaText}
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-slate-100 py-6 px-8 font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <Link href="/contact">{currentSlide.secondaryCta}</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="hero-stats mt-10 flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
              {currentSlide.stats.map((stat, idx) => {
                const IconComponent = stat.icon;
                return (
                  <div key={idx} className="stat-item flex items-center gap-3">
                    <IconComponent className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-bold text-xl text-slate-800">
                        {stat.value}
                      </p>
                      <p className="text-slate-500 text-xs">{stat.label}</p>
                    </div>
                    {idx < currentSlide.stats.length - 1 && (
                      <div className="h-8 w-px bg-slate-200 hidden sm:block" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side - Image Slider */}
          <div className="hero-illustration relative">
            <div className="hero-image-wrapper relative w-full aspect-square max-w-md lg:max-w-full mx-auto">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 via-cyan-400/20 to-purple-400/20 rounded-3xl blur-2xl -z-10" />

              {/* Main Image Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20 backdrop-blur-sm bg-white/10">
                <img
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  className="w-full h-full object-cover transition-all duration-700"
                  style={{ aspectRatio: "1/1" }}
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                {/* Floating tech icons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <Cpu className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <CircuitBoard className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110 group"
                disabled={isAnimating}
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 text-slate-700 group-hover:text-blue-600" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110 group"
                disabled={isAnimating}
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 text-slate-700 group-hover:text-blue-600" />
              </button>

              {/* Slide Indicators */}
              <div className="slider-dots absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {sliderContent.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (isAnimating || idx === activeIndex) return;
                      setDirection(idx > activeIndex ? "next" : "prev");
                      setIsAnimating(true);
                      setActiveIndex(idx);
                    }}
                    className={`dot w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === activeIndex
                        ? `w-8 bg-gradient-to-r ${currentSlide.gradient}`
                        : "bg-slate-300 hover:bg-slate-400"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
