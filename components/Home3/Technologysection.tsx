"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  Sparkles,
  ArrowRight,
  Cpu,
  Zap,
  Shield,
  Globe,
  Award,
  Rocket,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface TechFeature {
  id: string;
  label: string;
  description: string;
  icon?: React.ReactNode;
}

interface TechnologySectionProps {
  title: string;
  subtitle: string;
  description: string;
  features: TechFeature[];
  ctaText?: string;
  onCtaClick?: () => void;
}

export const TechnologySection: React.FC<TechnologySectionProps> = ({
  title,
  subtitle,
  description,
  features,
  ctaText = "Explore Technology",
  onCtaClick,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate header
      gsap.fromTo(
        headerRef.current?.querySelectorAll(".animate-header"),
        { opacity: 0, y: 50, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Logo entrance animation
      gsap.fromTo(
        svgRef.current,
        { opacity: 0, scale: 0.5, rotation: -180 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          delay: 0.3,
          ease: "back.out(0.5)",
          scrollTrigger: {
            trigger: svgRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Rotating circles animation
      gsap.to(".outer-circle", {
        rotation: 360,
        duration: 25,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
      });

      gsap.to(".inner-circle", {
        rotation: -360,
        duration: 20,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
      });

      gsap.to(".mid-circle", {
        rotation: 180,
        duration: 15,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
      });

      // Label animations
      gsap.fromTo(
        ".tech-label-item",
        { opacity: 0, scale: 0, rotation: -90 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.5,
          ease: "back.out(0.6)",
          scrollTrigger: {
            trigger: labelsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Pulsing animation for labels
      gsap.to(".tech-label-pulse", {
        scale: 1.15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.15,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [features]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-32 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-100/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-100/20 rounded-full blur-3xl" />

        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(14, 165, 233) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div ref={headerRef}>
            <div className="animate-header inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200/50 shadow-sm mb-6">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
                {subtitle}
              </span>
            </div>

            <h2 className="animate-header text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                {title}
              </span>
            </h2>

            <p className="animate-header text-lg md:text-xl text-slate-600 leading-relaxed mb-8">
              {description}
            </p>

            <button
              onClick={onCtaClick}
              className="animate-header group px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
              type="button"
            >
              {ctaText}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Features List */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.slice(0, 4).map((feature, idx) => (
                <div key={feature.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-blue-600">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {feature.label}
                    </p>
                    <p className="text-xs text-slate-500">
                      {feature.description.substring(0, 60)}...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Animated SVG with Circular Labels */}
          <div className="relative flex items-center justify-center py-12">
            <div className="relative w-full max-w-md mx-auto">
              {/* Main SVG Logo */}
              <svg
                ref={svgRef}
                viewBox="0 0 400 400"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="techGradient1"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                  <linearGradient
                    id="techGradient2"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Rotating Circles */}
                <circle
                  className="outer-circle"
                  cx="200"
                  cy="200"
                  r="160"
                  fill="none"
                  stroke="url(#techGradient1)"
                  strokeWidth="1.5"
                  strokeDasharray="8 8"
                  opacity="0.4"
                />
                <circle
                  className="mid-circle"
                  cx="200"
                  cy="200"
                  r="120"
                  fill="none"
                  stroke="url(#techGradient2)"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                  opacity="0.3"
                />
                <circle
                  className="inner-circle"
                  cx="200"
                  cy="200"
                  r="80"
                  fill="none"
                  stroke="url(#techGradient1)"
                  strokeWidth="2"
                  opacity="0.5"
                />

                {/* Center Core */}
                <circle
                  cx="200"
                  cy="200"
                  r="50"
                  fill="url(#techGradient1)"
                  filter="url(#glow)"
                />
                <circle cx="200" cy="200" r="35" fill="white" opacity="0.95" />

                {/* Center Icon - SmartScope Symbol */}
                <g transform="translate(200, 200)">
                  <path
                    d="M -25 -15 Q -15 -25 0 -20 Q 15 -25 25 -15 Q 30 0 25 15 Q 15 25 0 20 Q -15 25 -25 15 Q -30 0 -25 -15 Z"
                    fill="url(#techGradient1)"
                  />
                  <circle cx="0" cy="0" r="8" fill="white" />
                  <line
                    x1="-12"
                    y1="-8"
                    x2="12"
                    y2="-8"
                    stroke="url(#techGradient1)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="-12"
                    y1="0"
                    x2="12"
                    y2="0"
                    stroke="url(#techGradient1)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="-12"
                    y1="8"
                    x2="12"
                    y2="8"
                    stroke="url(#techGradient1)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </g>

                {/* Orbiting Dots */}
                {[...Array(8)].map((_, i) => {
                  const angle = (i / 8) * Math.PI * 2;
                  const radius = 140;
                  const x = 200 + Math.cos(angle) * radius;
                  const y = 200 + Math.sin(angle) * radius;
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#3b82f6"
                      opacity="0.6"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from={`0 200 200`}
                        to={`360 200 200`}
                        dur={`${15 + i * 2}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  );
                })}
              </svg>

              {/* Floating Labels Around the Circle */}
              <div
                ref={labelsRef}
                className="absolute inset-0 pointer-events-none"
              >
                {features.map((feature, index) => {
                  const total = features.length;
                  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
                  const radius = 190;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;

                  return (
                    <div
                      key={feature.id}
                      className="tech-label-item absolute pointer-events-auto"
                      style={{
                        transform: `translate(calc(50% + ${x}px), calc(50% + ${y}px))`,
                        left: "50%",
                        top: "50%",
                      }}
                      onMouseEnter={() => setHoveredFeature(index)}
                      onMouseLeave={() => setHoveredFeature(null)}
                    >
                      <div
                        className={`tech-label-pulse transition-all duration-300 ${hoveredFeature === index ? "scale-110" : ""}`}
                      >
                        <div className="flex flex-col items-center text-center">
                          <div
                            className={`w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-2 shadow-lg transition-all duration-300 ${hoveredFeature === index ? "shadow-blue-400/50" : ""}`}
                          >
                            <span className="text-white font-bold text-xs">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                          </div>
                          <div
                            className={`bg-white/90 backdrop-blur-md border rounded-xl px-3 py-2 shadow-md transition-all duration-300 max-w-[140px] ${
                              hoveredFeature === index
                                ? "border-blue-300 shadow-lg scale-105 bg-white"
                                : "border-slate-200"
                            }`}
                          >
                            <p
                              className={`text-xs font-semibold ${hoveredFeature === index ? "text-blue-600" : "text-slate-700"}`}
                            >
                              {feature.label}
                            </p>
                            {hoveredFeature === index && (
                              <p className="text-[10px] text-slate-500 mt-0.5">
                                {feature.description.substring(0, 40)}...
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Default export with example features
export const defaultFeatures: TechFeature[] = [
  {
    id: "1",
    label: "3nm Process",
    description: "Industry-leading semiconductor fabrication technology",
  },
  {
    id: "2",
    label: "AI Accelerator",
    description: "Dedicated neural processing units for AI workloads",
  },
  {
    id: "3",
    label: "Quantum Ready",
    description: "Future-proof architecture for quantum integration",
  },
  {
    id: "4",
    label: "Edge Computing",
    description: "Distributed processing at the edge",
  },
  {
    id: "5",
    label: "Zero Trust Security",
    description: "Hardware-level encryption and protection",
  },
  { id: "6", label: "Low Power", description: "40% less energy consumption" },
  { id: "7", label: "High Bandwidth", description: "Up to 112G PAM4 SerDes" },
  {
    id: "8",
    label: "Global Support",
    description: "24/7 enterprise-grade assistance",
  },
];

export default TechnologySection;
