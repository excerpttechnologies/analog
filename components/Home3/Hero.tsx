"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  ArrowRight,
  Sparkles,
  ChevronDown,
  Zap,
  Cpu,
  Shield,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  learnMoreText: string;
  onCtaClick?: () => void;
  onLearnMoreClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  description,
  ctaText,
  learnMoreText,
  onCtaClick,
  onLearnMoreClick,
}) => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [activeIcon, setActiveIcon] = useState(0);

  const floatingIcons = [
    { icon: Zap, color: "blue", delay: 0 },
    { icon: Cpu, color: "purple", delay: 1 },
    { icon: Shield, color: "emerald", delay: 2 },
    { icon: Sparkles, color: "amber", delay: 3 },
  ];

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Timeline for hero animations
      const tl = gsap.timeline();

      // Animate subtitle
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(0.4)" },
        0,
      );

      // Animate title
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 50, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
        },
        0.1,
      );

      // Animate description
      tl.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        0.3,
      );

      // Animate buttons
      tl.fromTo(
        buttonContainerRef.current?.querySelectorAll("button"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.15,
          ease: "back.out(0.4)",
        },
        0.5,
      );

      // Animate image container
      tl.fromTo(
        imageContainerRef.current,
        { opacity: 0, scale: 0.8, rotation: -10 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "back.out(0.5)",
        },
        0.2,
      );

      // Floating animation for image
      gsap.to(imageContainerRef.current, {
        y: -15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Rotating circles animation
      gsap.to(".rotate-circle-1", {
        rotation: 360,
        duration: 25,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
      });

      gsap.to(".rotate-circle-2", {
        rotation: -360,
        duration: 20,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
      });

      gsap.to(".rotate-circle-3", {
        rotation: 180,
        duration: 15,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
      });

      // Pulse animation for floating icons
      floatingIcons.forEach((_, idx) => {
        gsap.to(`.floating-icon-${idx}`, {
          y: -20,
          x: idx % 2 === 0 ? 15 : -15,
          duration: 3 + idx,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: idx * 0.5,
        });
      });

      // Scroll indicator animation
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, heroRef);

    // Rotate active icon
    const interval = setInterval(() => {
      setActiveIcon((prev) => (prev + 1) % floatingIcons.length);
    }, 2000);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100"
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

        {/* Floating Icons */}
        {floatingIcons.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`floating-icon-${idx} absolute opacity-10 hidden lg:block`}
              style={{
                top: `${15 + idx * 15}%`,
                left: idx % 2 === 0 ? "5%" : "auto",
                right: idx % 2 === 1 ? "5%" : "auto",
              }}
            >
              <Icon size={40 + idx * 10} className={`text-${item.color}-400`} />
            </div>
          );
        })}
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col space-y-5">
            {/* Subtitle tag */}
            <div
              ref={subtitleRef}
              className="inline-flex items-center gap-2 w-fit"
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              {/* <span className="text-sm mt-4 md:text-base font-semibold text-blue-600 uppercase tracking-wider">
                {subtitle}
              </span> */}
              <div className="flex gap-1 ml-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-blue-300 rounded-full" />
                ))}
              </div>
            </div>

            {/* Main Title */}
            <h1
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
            >
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                {title}
              </span>
            </h1>

            {/* Description */}
            <p
              ref={descriptionRef}
              className="text-base md:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-lg"
            >
              {description}
            </p>

            {/* CTA Buttons */}
            <div
              ref={buttonContainerRef}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <button
                onClick={onCtaClick}
                className="group px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                type="button"
              >
                {ctaText}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={onLearnMoreClick}
                className="group px-6 py-3 border-2 border-slate-200 bg-white text-slate-700 font-semibold rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2"
                type="button"
              >
                {learnMoreText}
                <Sparkles className="w-4 h-4 transition-transform group-hover:scale-110" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-6">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-[10px] font-bold ring-2 ring-white"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-slate-500">
                  Trusted by 500+ companies
                </span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-amber-400 fill-amber-400"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
                <span className="text-xs text-slate-500 ml-1">
                  4.9/5 rating
                </span>
              </div>
            </div>
          </div>

          {/* Right Image Container - Animated SVG */}
          <div
            ref={imageContainerRef}
            className="relative h-[400px] md:h-[500px] flex items-center justify-center"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Animated circles background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rotate-circle-1 absolute w-80 h-80 border-2 border-blue-200/50 rounded-full" />
                <div className="rotate-circle-2 absolute w-64 h-64 border border-purple-200/50 rounded-full" />
                <div className="rotate-circle-3 absolute w-48 h-48 border-2 border-cyan-200/30 rounded-full" />
              </div>

              {/* Main SVG Graphic */}
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full relative z-10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="heroGradient1"
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
                    id="heroGradient2"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                  <filter id="heroGlow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Outer decorative rings */}
                <circle
                  cx="200"
                  cy="200"
                  r="160"
                  fill="none"
                  stroke="url(#heroGradient1)"
                  strokeWidth="1.5"
                  strokeDasharray="10 15"
                  opacity="0.4"
                />
                <circle
                  cx="200"
                  cy="200"
                  r="130"
                  fill="none"
                  stroke="url(#heroGradient2)"
                  strokeWidth="1"
                  strokeDasharray="5 10"
                  opacity="0.3"
                />

                {/* Center Core */}
                <circle
                  cx="200"
                  cy="200"
                  r="80"
                  fill="url(#heroGradient1)"
                  opacity="0.1"
                />
                <circle
                  cx="200"
                  cy="200"
                  r="60"
                  fill="url(#heroGradient1)"
                  opacity="0.2"
                  filter="url(#heroGlow)"
                />
                <circle cx="200" cy="200" r="40" fill="url(#heroGradient1)" />

                {/* Center Icon */}
                <g transform="translate(200, 200)">
                  {/* Central chip/circuit icon */}
                  <rect
                    x="-25"
                    y="-25"
                    width="50"
                    height="50"
                    rx="8"
                    fill="white"
                    opacity="0.95"
                  />
                  <rect
                    x="-15"
                    y="-15"
                    width="30"
                    height="30"
                    rx="4"
                    fill="url(#heroGradient1)"
                  />
                  <circle cx="0" cy="0" r="6" fill="white" />

                  {/* Circuit lines */}
                  <line
                    x1="-25"
                    y1="-10"
                    x2="-15"
                    y2="-10"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="15"
                    y1="-10"
                    x2="25"
                    y2="-10"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="-25"
                    y1="10"
                    x2="-15"
                    y2="10"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="15"
                    y1="10"
                    x2="25"
                    y2="10"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="-10"
                    y1="-25"
                    x2="-10"
                    y2="-15"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="10"
                    y1="-25"
                    x2="10"
                    y2="-15"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="-10"
                    y1="15"
                    x2="-10"
                    y2="25"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="10"
                    y1="15"
                    x2="10"
                    y2="25"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </g>

                {/* Orbiting dots */}
                {[...Array(6)].map((_, i) => {
                  const angle = (i / 6) * Math.PI * 2;
                  const radius = 110;
                  const x = 200 + Math.cos(angle) * radius;
                  const y = 200 + Math.sin(angle) * radius;
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="6"
                      fill="#3b82f6"
                      opacity="0.6"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from={`0 200 200`}
                        to={`360 200 200`}
                        dur={`${12 + i * 2}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  );
                })}
              </svg>

              {/* Animated Pulse Ring */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="w-full h-full rounded-full border-2 border-blue-400/30 animate-ping"
                  style={{ animationDuration: "3s" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() =>
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
        }
      >
        <span className="text-xs text-slate-400 font-mono">SCROLL</span>
        <ChevronDown className="w-4 h-4 text-slate-400" />
      </div>
    </section>
  );
};

export default HeroSection;
