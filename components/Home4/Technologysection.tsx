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
  Brain,
  Cloud,
  Battery,
  ChevronRight,
  Hexagon,
  TrendingUp,
  CheckCircle2,
  Activity,
  Radio,
  Waves,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const TechnologySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [selectedTech, setSelectedTech] = useState<number | null>(0);
  const [rotationAngle, setRotationAngle] = useState(0);

  const technologies = [
    {
      id: 1,
      name: "Neural Processing",
      icon: Brain,
      description: "Advanced AI acceleration with 50 TOPS/W performance",
      color: "#8b5cf6",
      bgColor: "from-purple-600 to-indigo-600",
      features: ["50 TOPS/W", "Sparse Computing", "Tensor Cores"],
      metric: "98%",
      metricLabel: "Efficiency",
    },
    {
      id: 2,
      name: "Quantum Security",
      icon: Shield,
      description: "Post-quantum cryptography and hardware security",
      color: "#3b82f6",
      bgColor: "from-blue-600 to-cyan-600",
      features: ["Quantum Safe", "Hardware Root", "Zero Trust"],
      metric: "100%",
      metricLabel: "Coverage",
    },
    {
      id: 3,
      name: "Edge Computing",
      icon: Cloud,
      description: "Distributed processing with sub-ms latency",
      color: "#10b981",
      bgColor: "from-emerald-600 to-teal-600",
      features: ["<1ms Latency", "Edge AI", "Federated Learning"],
      metric: "99.99%",
      metricLabel: "Uptime",
    },
    {
      id: 4,
      name: "3nm Process",
      icon: Cpu,
      description: "Industry-leading semiconductor fabrication",
      color: "#f59e0b",
      bgColor: "from-amber-600 to-orange-600",
      features: ["3nm Node", "GAAFET", "3D Stacking"],
      metric: "95%",
      metricLabel: "Yield",
    },
    {
      id: 5,
      name: "RF Beamforming",
      icon: Radio,
      description: "Advanced phased array antenna control",
      color: "#ec4899",
      bgColor: "from-pink-600 to-rose-600",
      features: ["5G/6G Ready", "Phased Array", "mmWave"],
      metric: "128",
      metricLabel: "Elements",
    },
    {
      id: 6,
      name: "Power Management",
      icon: Battery,
      description: "Intelligent power delivery and management",
      color: "#14b8a6",
      bgColor: "from-teal-600 to-cyan-600",
      features: ["90%+ Efficiency", "PMIC", "Dynamic Scaling"],
      metric: "40%",
      metricLabel: "Less Power",
    },
  ];

  const industryLogos = [
    "AUTOMOTIVE", "AEROSPACE", "TELECOM", "MEDICAL", "INDUSTRIAL", "CONSUMER"
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Main container animation
      gsap.fromTo(
        ".tech-container",
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );

      // Staggered card animations
      gsap.fromTo(
        ".tech-card",
        { opacity: 0, x: -50, rotationY: -30 },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(0.4)",
          scrollTrigger: {
            trigger: ".tech-grid",
            start: "top 80%",
          },
        }
      );

      // Marquee animation
      gsap.to(marqueeRef.current, {
        x: "-100%",
        duration: 20,
        repeat: -1,
        ease: "linear",
        modifiers: {
          x: (x) => parseFloat(x) % (marqueeRef.current?.scrollWidth! / 2),
        },
      });

      // Hexagon pulse animation
      gsap.to(".hex-pulse", {
        scale: 1.2,
        opacity: 0,
        duration: 2,
        repeat: -1,
        ease: "power2.out",
        stagger: 0.2,
      });
    }, sectionRef);

    // Auto-rotate selected technology
    const interval = setInterval(() => {
      setSelectedTech((prev) => (prev + 1) % technologies.length);
      setRotationAngle((prev) => prev + 60);
    }, 4000);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, []);

  const getHexagonPoints = (size: number) => {
    const angles = [0, 60, 120, 180, 240, 300];
    return angles.map(angle => {
      const radian = (angle * Math.PI) / 180;
      return `${Math.cos(radian) * size},${Math.sin(radian) * size}`;
    }).join(" ");
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30"
    >
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl" />
        
        {/* Hexagon Grid Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons" x="0" y="0" width="80" height="140" patternUnits="userSpaceOnUse">
              <path d="M40 0 L80 23.09 L80 69.28 L40 92.38 L0 69.28 L0 23.09 Z" fill="none" stroke="#8b5cf6" strokeWidth="1" />
              <path d="M40 140 L80 116.91 L80 70.72 L40 47.62 L0 70.72 L0 116.91 Z" fill="none" stroke="#8b5cf6" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      <div className="tech-container container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* Header with Circular Animation */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 shadow-sm mb-6">
            <Activity className="w-4 h-4 text-purple-600 animate-pulse" />
            <span className="text-sm font-bold bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-transparent">
              INNOVATION HUB
            </span>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 via-purple-800 to-slate-900 bg-clip-text text-transparent">
              Technology
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Excellence
            </span>
          </h2>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Pioneering next-generation semiconductor solutions that power the
            future of computing, connectivity, and intelligence
          </p>
        </div>

        {/* Main Content - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left Side - Interactive Circular Display */}
          <div className="relative flex items-center justify-center min-h-[500px]">
            {/* Rotating Outer Ring */}
            <div 
              className="absolute w-[380px] h-[380px] rounded-full border-2 border-purple-200/50"
              style={{ transform: `rotate(${rotationAngle}deg)`, transition: 'transform 1s ease-out' }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-purple-500 shadow-lg" />
            </div>

            {/* Middle Ring */}
            <div className="absolute w-[300px] h-[300px] rounded-full border border-purple-300/30">
              {technologies.map((tech, idx) => {
                const angle = (idx / technologies.length) * 360;
                const radian = (angle * Math.PI) / 180;
                const radius = 150;
                const x = Math.cos(radian) * radius;
                const y = Math.sin(radian) * radius;
                const Icon = tech.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedTech(idx)}
                    className={`absolute left-1/2 top-1/2 transition-all duration-500 hover:scale-125`}
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                  >
                    <div className={`p-3 rounded-2xl transition-all duration-300 ${
                      selectedTech === idx 
                        ? `bg-gradient-to-r ${tech.bgColor} shadow-xl scale-110 ring-2 ring-white`
                        : 'bg-white shadow-md hover:shadow-xl'
                    }`}>
                      <Icon className={`w-6 h-6 ${selectedTech === idx ? 'text-white' : `text-${tech.color}`}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Center Display */}
            <div className="absolute w-[200px] h-[200px] rounded-full bg-gradient-to-r from-purple-600 to-pink-600 shadow-2xl flex flex-col items-center justify-center text-white">
              {selectedTech !== null && (
                <div className="text-center animate-fade-in">
                  <div className="text-4xl font-bold mb-1">{technologies[selectedTech].metric}</div>
                  <div className="text-xs uppercase tracking-wider opacity-80">{technologies[selectedTech].metricLabel}</div>
                </div>
              )}
            </div>

            {/* Pulse Rings */}
            <div className="absolute w-[250px] h-[250px] rounded-full border-2 border-purple-400/30 animate-ping" style={{ animationDuration: '3s' }} />
            <div className="absolute w-[350px] h-[350px] rounded-full border border-purple-400/20 animate-pulse" style={{ animationDuration: '4s' }} />
          </div>

          {/* Right Side - Selected Tech Details */}
          <div className="flex flex-col justify-center">
            {selectedTech !== null && (
              <div className="animate-slide-in-right">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${technologies[selectedTech].bgColor} bg-opacity-10 mb-4`}>
                  <div className={`w-2 h-2 rounded-full bg-${technologies[selectedTech].color}`} />
                  <span className="text-xs font-semibold uppercase tracking-wider">Featured Technology</span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                  {technologies[selectedTech].name}
                </h3>

                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  {technologies[selectedTech].description}
                </p>

                <div className="space-y-3 mb-8">
                  {technologies[selectedTech].features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <span className="text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Learn More
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Technology Cards Grid */}
        
        {/* Marquee Industry Logos */}
        <div className="relative overflow-hidden py-4">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
          
          <div ref={marqueeRef} className="flex gap-12 whitespace-nowrap">
            {[...industryLogos, ...industryLogos].map((industry, idx) => (
              <div key={idx} className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-sm border border-slate-200">
                <Award className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-semibold text-slate-600 tracking-wider">{industry}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        {/* <div className="text-center pt-8">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <button className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 flex items-center gap-3">
              <Rocket className="w-5 h-5" />
              <span>Explore Technology Stack</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="px-8 py-4 bg-white border-2 border-purple-200 text-purple-700 font-semibold rounded-2xl hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 hover:scale-105 flex items-center gap-3">
              <Globe className="w-5 h-5" />
              <span>Schedule Consultation</span>
            </button>
          </div>
        </div> */}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.5s ease-out;
        }
      `}</style>
    </section>
  );
};

export default TechnologySection;