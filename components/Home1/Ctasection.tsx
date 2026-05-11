"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Rocket,
  Zap,
  Shield,
  TrendingUp,
  CheckCircle,
  Star,
  Briefcase,
  Clock,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const centerContentRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate left card
      gsap.fromTo(
        leftCardRef.current,
        {
          x: -100,
          opacity: 0,
          rotationY: -30,
        },
        {
          x: 0,
          opacity: 1,
          rotationY: 0,
          duration: 1,
          ease: "back.out(0.6)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Animate right card
      gsap.fromTo(
        rightCardRef.current,
        {
          x: 100,
          opacity: 0,
          rotationY: 30,
        },
        {
          x: 0,
          opacity: 1,
          rotationY: 0,
          duration: 1,
          ease: "back.out(0.6)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Animate center content
      gsap.fromTo(
        centerContentRef.current,
        {
          scale: 0.8,
          opacity: 0,
          y: 50,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Floating elements animation
      floatingElementsRef.current.forEach((element, index) => {
        if (!element) return;

        gsap.to(element, {
          y: "random(-30, 30)",
          x: "random(-30, 30)",
          rotation: "random(-15, 15)",
          duration: "random(3, 6)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.3,
        });
      });

      // Parallax background effect
      gsap.to(".bg-gradient-layer-1", {
        y: 100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".bg-gradient-layer-2", {
        y: -80,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-950"
    >
      {/* Animated Background Layers */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-gradient-layer-1 absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl" />
        <div className="bg-gradient-layer-2 absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />

        {/* Animated Grid Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Floating Particles */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              floatingElementsRef.current[i] = el;
            }}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Three Column Layout */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8 items-center">
          {/* Left Card - Feature Highlight */}
          <div
            ref={leftCardRef}
            className={`relative backdrop-blur-xl bg-white/10 rounded-2xl p-6 border transition-all duration-500 cursor-pointer
              ${hoveredCard === "left" ? "border-cyan-400 bg-white/15 scale-105" : "border-white/20"}`}
            onMouseEnter={() => setHoveredCard("left")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute top-4 right-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="mb-4">
              <div className="text-4xl font-bold text-white mb-1">500+</div>
              <div className="text-sm text-cyan-300 font-semibold">
                ENTERPRISE
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              Trusted Worldwide
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Industry leaders across tech, finance, and healthcare rely on
              SmartScope for mission-critical solutions.
            </p>

            <div className="mt-4 flex items-center gap-2 text-cyan-300 text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>97% renewal rate</span>
            </div>
          </div>

          {/* Center Content - Main CTA */}
          <div ref={centerContentRef} className="text-center relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-2xl rounded-full" />

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
              <span className="text-sm font-semibold text-white tracking-wide">
                ⚡ Limited Slots Available
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to{" "}
              <span className="relative inline-block">
                Accelerate?
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="10"
                  viewBox="0 0 300 10"
                  fill="none"
                >
                  <path
                    d="M1 5C100 9 200 9 299 5"
                    stroke="url(#lineGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <defs>
                    <linearGradient
                      id="lineGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="50%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h2>

            {/* Description */}
            <p className="text-base md:text-lg text-white/80 mb-8 max-w-md mx-auto leading-relaxed">
              Join forward-thinking companies using SmartScope to drive
              innovation and achieve breakthrough results.
            </p>

            {/* Main CTA Button */}
            <div className="relative inline-block group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-300" />
              <button className="relative px-8 py-4 rounded-full bg-white text-purple-900 font-bold text-lg shadow-2xl flex items-center gap-3 group-hover:scale-105 transition-all duration-300">
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Trust Badge */}
            <div className="mt-6 flex items-center justify-center gap-4 text-xs text-white/60">
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>14-day trial</span>
              </div>
            </div>
          </div>

          {/* Right Card - Feature Highlight */}
          <div
            ref={rightCardRef}
            className={`relative backdrop-blur-xl bg-white/10 rounded-2xl p-6 border transition-all duration-500 cursor-pointer
              ${hoveredCard === "right" ? "border-purple-400 bg-white/15 scale-105" : "border-white/20"}`}
            onMouseEnter={() => setHoveredCard("right")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute top-4 right-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="mb-4">
              <div className="text-4xl font-bold text-white mb-1">2x</div>
              <div className="text-sm text-purple-300 font-semibold">
                FASTER DEPLOYMENT
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              Rapid Integration
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Get up and running in days, not months. Our APIs and SDKs make
              integration seamless and efficient.
            </p>

            <div className="mt-4 flex items-center gap-2 text-purple-300 text-sm">
              <Zap className="w-4 h-4" />
              <span>Deploy in 48 hours</span>
            </div>
          </div>
        </div>

        {/* Bottom Benefits Row */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Shield, text: "Enterprise Security", color: "cyan" },
              { icon: TrendingUp, text: "99.99% Uptime SLA", color: "blue" },
              { icon: Briefcase, text: "Dedicated Support", color: "purple" },
              { icon: CheckCircle, text: "ISO 27001 Certified", color: "pink" },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center justify-center gap-2 text-white/60 text-xs md:text-sm"
                >
                  <Icon className={`w-4 h-4 text-${item.color}-400`} />
                  <span>{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Decorative Corner Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-cyan-500/30 rounded-tl-3xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-purple-500/30 rounded-br-3xl" />

      {/* Inline Animation Styles */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(5deg);
          }
          75% {
            transform: translateY(10px) rotate(-5deg);
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      {/* Add dynamic hover effect styles */}
      <style jsx>{`
        .group:hover .button-icon {
          transform: translateX(4px);
        }
      `}</style>
    </section>
  );
}
