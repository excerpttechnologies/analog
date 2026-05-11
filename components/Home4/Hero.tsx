"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  ArrowRight,
  ChevronDown,
  Rocket,
  Infinity,
  Database,
  Cloud,
  Users,
  Clock,
  CheckCircle,
  Star,
  TrendingUp,
  Zap,
  Shield,
  Award,
} from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const heroContent = {
    badge: "✨ NEW RELEASE",
    title: "Build Amazing Digital Products",
    highlight: "10x Faster",
    description:
      "The ultimate platform for creators and developers. Build, deploy, and scale your applications with unprecedented speed and efficiency.",
    primaryCta: "Get Started Free",
    secondaryCta: "View Demo",
  };

  const features = [
    { icon: Zap, text: "Lightning Fast", color: "bg-orange-500" },
    { icon: Shield, text: "Secure by Default", color: "bg-emerald-500" },
    { icon: Award, text: "Award Winning", color: "bg-purple-500" },
    { icon: TrendingUp, text: "High Performance", color: "bg-blue-500" },
  ];

  const testimonials = [
    { name: "Sarah Johnson", role: "CTO at TechCorp", rating: 5, image: "/avatar1.jpg" },
    { name: "Michael Chen", role: "Lead Developer", rating: 5, image: "/avatar2.jpg" },
  ];

  const stats = [
    { value: "50K+", label: "Active Users", icon: Users, change: "+180%" },
    { value: "99.99%", label: "Uptime SLA", icon: Cloud, change: "Guaranteed" },
    { value: "24/7", label: "Support", icon: Clock, change: "Real-time" },
  ];

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(badgeRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, ease: "back.out" });
      tl.fromTo(titleRef.current?.querySelectorAll(".word"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" }, "-=0.3");
      tl.fromTo(descriptionRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.6 }, "-=0.2");
      tl.fromTo(ctaRef.current?.querySelectorAll("button"), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1 }, "-=0.2");
      tl.fromTo(imageRef.current, { opacity: 0, scale: 0.8, x: 100 }, { opacity: 1, scale: 1, x: 0, duration: 1, ease: "back.out(0.5)" }, "-=0.5");
      
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, y: 50, rotationX: 15 }, { opacity: 1, y: 0, rotationX: 0, duration: 0.6, delay: 0.8 + i * 0.1, scrollTrigger: { trigger: card, start: "top bottom" } });
      });

      gsap.to(imageRef.current, { y: -20, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const titleWords = heroContent.title.split(" ");

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column - Content */}
          <div ref={contentRef} className="space-y-8">
            {/* Badge */}
            <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-full border border-purple-200/50 mt-5">
              <Rocket className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {heroContent.badge}
              </span>
            </div>

            {/* Title */}
            <h1 ref={titleRef} className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              {titleWords.map((word, i) => (
                <span key={i} className="word inline-block mr-3 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  {word}
                </span>
              ))}
              <span className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {heroContent.highlight}
              </span>
            </h1>

            {/* Description */}
            <p ref={descriptionRef} className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-lg">
              {heroContent.description}
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
              <button className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2">
                {heroContent.primaryCta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white border-2 border-slate-200 rounded-xl font-semibold text-slate-700 hover:border-purple-300 hover:bg-purple-50 transition-all flex items-center justify-center gap-2">
                <Play className="w-4 h-4" />
                {heroContent.secondaryCta}
              </button>
            </div>

            {/* Feature Badges */}
            <div className="flex flex-wrap gap-3 pt-4">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-slate-200 shadow-sm">
                    <div className={`w-2 h-2 rounded-full ${feature.color} animate-pulse`} />
                    <Icon className="w-4 h-4 text-slate-600" />
                    <span className="text-sm font-medium text-slate-700">{feature.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <Icon className="w-5 h-5 text-purple-600 mb-2" />
                    <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                    <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                    <div className="text-xs text-green-600 mt-1">{stat.change}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Enhanced Image Design */}
          <div ref={imageRef} className="relative">
            
            {/* Main Hero Image Card */}
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-white z-10" />
              
              {/* Main Image Placeholder - Replace with actual image */}
              <div className="relative h-[400px] md:h-[500px] bg-gradient-to-br from-white to-gray-100 flex items-center justify-center">
                <div className="text-center text-white z-20">
                  <img src="https://assets.justinmind.com/wp-content/uploads/2020/02/dashboard-design-example-hcare.png"/>
                </div>
                
                {/* Decorative Circles */}
                <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse" />
                <div className="absolute bottom-10 right-10 w-60 h-60 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000" />
              </div>

              {/* Floating Elements on Image */}
              <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg z-20">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-semibold">4.9/5 Rating</span>
                </div>
              </div>

              <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg z-20">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-semibold">Trusted by 500+</span>
                </div>
              </div>
            </div>

            {/* Floating Feature Cards */}
            <div className="absolute -left-8 top-1/4 bg-white rounded-2xl shadow-xl p-4 hidden lg:block z-30 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-bold">99.99% Uptime</div>
                  <div className="text-xs text-slate-500">Guaranteed SLA</div>
                </div>
              </div>
            </div>

            <div className="absolute -right-8 bottom-1/4 bg-white rounded-2xl shadow-xl p-4 hidden lg:block z-30 animate-float animation-delay-2000">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm font-bold">10x Faster</div>
                  <div className="text-xs text-slate-500">Performance Boost</div>
                </div>
              </div>
            </div>

            {/* Testimonial Cards */}
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                ref={(el) => { cardsRef.current[idx] = el; }}
                className={`absolute ${idx === 0 ? '-bottom-16 -right-4' : '-top-16 -left-4'} bg-white rounded-2xl shadow-xl p-4 w-64 hidden lg:block z-20`}
                style={{ animationDelay: `${idx * 1000}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-xs text-slate-500">{testimonial.role}</div>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Animated Pulse Ring */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-full rounded-full border-2 border-purple-400/30 animate-ping" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group">
        <span className="text-xs text-slate-400 font-mono tracking-wider">SCROLL TO EXPLORE</span>
        <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-purple-500 transition-colors animate-bounce" />
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

const Play = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5 3l14 9-14 9V3z" />
  </svg>
);

export default HeroSection;