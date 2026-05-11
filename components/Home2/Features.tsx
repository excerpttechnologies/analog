"use client";

import { useEffect, useRef, useState } from "react";
import {
  Zap,
  Cpu,
  Shield,
  Globe,
  Battery,
  Cloud,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  Infinity,
  Gauge,
  Radio,
  Lock,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    icon: Zap,
    title: "Lightning Speed",
    description: "5x faster processing with 3nm architecture",
    gradient: "from-blue-50 to-indigo-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    color: "blue",
    metric: "2.5 GHz",
    badge: "NEW",
  },
  {
    icon: Cpu,
    title: "Neural Compute",
    description: "AI-optimized cores for machine learning",
    gradient: "from-purple-50 to-pink-50",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    color: "purple",
    metric: "100B Transistors",
    badge: "AI",
  },
  {
    icon: Shield,
    title: "Quantum Security",
    description: "Hardware-level encryption with zero-trust architecture",
    gradient: "from-emerald-50 to-teal-50",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    color: "emerald",
    metric: "ISO 27001",
    badge: "SECURE",
  },
  {
    icon: Globe,
    title: "Global Mesh",
    description: "50+ edge locations with <10ms latency",
    gradient: "from-cyan-50 to-blue-50",
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
    color: "cyan",
    metric: "Global",
    badge: "24/7",
  },
  {
    icon: Battery,
    title: "Eco Power",
    description: "40% less energy, 100% renewable compatible",
    gradient: "from-lime-50 to-emerald-50",
    iconBg: "bg-lime-100",
    iconColor: "text-lime-600",
    color: "lime",
    metric: "Green",
    badge: "ECO",
  },
  {
    icon: Cloud,
    title: "Hybrid Cloud",
    description: "Seamless edge-to-cloud deployment",
    gradient: "from-violet-50 to-indigo-50",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    color: "violet",
    metric: "Any Scale",
    badge: "FLEX",
  },
];

const stats = [
  { value: "500+", label: "Enterprise Clients", change: "+28%", icon: Users },
  { value: "50+", label: "Global Patents", change: "+12", icon: Award },
  {
    value: "99.999%",
    label: "Uptime SLA",
    change: "5-9's",
    icon: CheckCircle2,
  },
  { value: "40%", label: "Energy Saved", change: "-40%", icon: Battery },
];

const testimonials = [
  {
    text: "The performance gains were immediate. SmartScope's technology is a game-changer.",
    author: "Michael Chen",
    role: "CTO, TechVision",
  },
  {
    text: "Best-in-class support and reliability. Our infrastructure has never been more stable.",
    author: "Sarah Johnson",
    role: "VP Engineering, DataCore",
  },
];

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [visibleStats, setVisibleStats] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate feature cards with staggered scale
      const cards = document.querySelectorAll(".feature-card-new");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // Animate stats
      gsap.fromTo(
        ".stat-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".stats-wrapper",
            start: "top 85%",
            onEnter: () => setVisibleStats(true),
          },
        },
      );

      // Animate testimonials
      gsap.fromTo(
        ".testimonial-card",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".testimonials-wrapper",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Floating decoration animation
      gsap.to(".float-decoration", {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-white"
    >
      {/* Minimal Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-blue-50/50 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-t from-purple-50/50 to-transparent rounded-full blur-3xl" />

        {/* Thin Grid Lines */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
        {/* Header - Minimal & Clean */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 mb-4">
            <Sparkles className="w-3 h-3 text-slate-600" />
            <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">
              Capabilities
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Engineered for
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-500">
              Peak Performance
            </span>
          </h2>

          <p className="text-slate-500 max-w-2xl mx-auto">
            Discover the technology powering the next generation of
            semiconductor solutions.
          </p>
        </div>

        {/* Masonry Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={idx}
                className="feature-card-new group cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className={`relative bg-white rounded-xl p-6 transition-all duration-400 border ${
                    isHovered
                      ? `border-${feature.color}-200 shadow-lg -translate-y-1`
                      : "border-slate-100 shadow-sm"
                  }`}
                >
                  {/* Top Row */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${feature.iconBg} flex items-center justify-center transition-all duration-300 ${isHovered ? "scale-110" : ""}`}
                    >
                      <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                    </div>
                    {feature.badge && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-${feature.color}-100 text-${feature.color}-600 uppercase tracking-wider`}
                      >
                        {feature.badge}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-slate-800 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-slate-500 text-sm mb-3">
                    {feature.description}
                  </p>

                  {/* Metric */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                    <span className="text-xs text-slate-400">Performance</span>
                    <span
                      className={`text-sm font-mono font-semibold text-${feature.color}-600`}
                    >
                      {feature.metric}
                    </span>
                  </div>

                  {/* Hover Arrow */}
                  <div
                    className={`absolute bottom-4 right-4 transition-all duration-300 ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"}`}
                  >
                    <ArrowRight
                      className={`w-4 h-4 text-${feature.color}-500`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Row */}
        <div className="stats-wrapper grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="stat-card text-center p-5 rounded-xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-md transition-all duration-300"
              >
                <div className="flex justify-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
                    <Icon className="w-5 h-5 text-slate-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-800">
                  {visibleStats ? stat.value : "0"}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
                <span className="inline-block mt-1 text-[10px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                  {stat.change}
                </span>
              </div>
            );
          })}
        </div>

        {/* Testimonials Row */}
        <div className="testimonials-wrapper grid md:grid-cols-2 gap-6 mb-16">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="testimonial-card p-6 rounded-xl bg-slate-50/50 border border-slate-100"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-amber-400 fill-amber-400"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-600 text-sm italic mb-4">
                "{testimonial.text}"
              </p>
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {testimonial.author}
                </p>
                <p className="text-xs text-slate-400">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Simple CTA */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3">
            <button className="px-6 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-slate-800 transition-all duration-300 hover:scale-105 shadow-sm">
              Explore Technology
            </button>
            <button className="px-6 py-2.5 border border-slate-200 text-slate-600 text-sm font-medium rounded-full hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 flex items-center gap-1 group">
              Contact Sales
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Floating Decorations */}
        <div className="absolute top-20 right-20 float-decoration opacity-30 pointer-events-none hidden lg:block">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
        </div>
        <div className="absolute bottom-40 left-10 float-decoration opacity-30 pointer-events-none hidden lg:block">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
        </div>
        <div className="absolute top-1/2 right-10 float-decoration opacity-20 pointer-events-none hidden lg:block">
          <div className="w-1 h-1 rounded-full bg-emerald-400" />
        </div>
      </div>
    </section>
  );
}
