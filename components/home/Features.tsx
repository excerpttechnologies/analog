'use client';

import { useEffect, useRef, useState } from 'react';
import { Zap, Cpu, TrendingUp, Shield, Sparkles, Rocket, Globe, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    icon: Zap,
    title: 'High Performance',
    description: 'Industry-leading speed and efficiency for demanding applications with up to 5x performance boost',
    gradient: 'from-yellow-500 to-orange-500',
    bgGradient: 'from-yellow-50 to-orange-50',
    stats: '5x Faster',
    metric: '2.5 GHz',
  },
  {
    icon: Cpu,
    title: 'Advanced Architecture',
    description: 'State-of-the-art semiconductor design and fabrication using 3nm process technology',
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50',
    stats: '3nm Process',
    metric: '100B Transistors',
  },
  {
    icon: TrendingUp,
    title: 'Scalable Solutions',
    description: 'From embedded systems to enterprise-grade deployments with seamless integration',
    gradient: 'from-emerald-500 to-teal-500',
    bgGradient: 'from-emerald-50 to-teal-50',
    stats: '100% Scalable',
    metric: 'Edge to Cloud',
  },
  {
    icon: Shield,
    title: 'Enterprise Reliability',
    description: '99.999% uptime SLA with enterprise-grade security and 24/7 global support',
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50',
    stats: '99.999% Uptime',
    metric: '24/7 Support',
  },
];

// Fixed particle positions - deterministic values to avoid hydration mismatch
const particlePositions = [
  { top: '15%', left: '10%', delay: 0, duration: 5 },
  { top: '25%', left: '85%', delay: 1, duration: 7 },
  { top: '45%', left: '20%', delay: 2, duration: 6 },
  { top: '60%', left: '75%', delay: 0.5, duration: 8 },
  { top: '75%', left: '15%', delay: 1.5, duration: 5.5 },
  { top: '85%', left: '90%', delay: 2.5, duration: 7.5 },
  { top: '10%', left: '45%', delay: 0.8, duration: 6.5 },
  { top: '35%', left: '60%', delay: 1.2, duration: 5.8 },
  { top: '55%', left: '40%', delay: 1.8, duration: 7.2 },
  { top: '70%', left: '30%', delay: 2.2, duration: 6.3 },
  { top: '20%', left: '70%', delay: 0.3, duration: 8.5 },
  { top: '40%', left: '50%', delay: 1.7, duration: 5.2 },
  { top: '65%', left: '55%', delay: 0.9, duration: 7.8 },
  { top: '80%', left: '25%', delay: 2.1, duration: 6.7 },
  { top: '5%', left: '95%', delay: 1.4, duration: 5.9 },
  { top: '95%', left: '5%', delay: 2.8, duration: 7.4 },
  { top: '50%', left: '80%', delay: 0.6, duration: 6.1 },
  { top: '30%', left: '35%', delay: 1.9, duration: 8.2 },
  { top: '50%', left: '65%', delay: 0.4, duration: 5.4 },
  { top: '70%', left: '10%', delay: 2.3, duration: 7.1 },
];

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  // Handle mounting to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Smooth scroll animations
  useEffect(() => {
    if (!sectionRef.current || !mounted) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { 
          opacity: 0, 
          y: 50,
          filter: 'blur(10px)',
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          scale: 1,
          duration: 1.2,
          ease: 'back.out(0.4)',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards staggered animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        gsap.fromTo(card,
          { 
            opacity: 0, 
            y: 100,
            rotationX: 15,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'back.out(0.4)',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  // Hover animations (without glow/light effect)
  const handleCardHover = (index: number, isEnter: boolean) => {
    setHoveredCard(isEnter ? index : null);
    
    const card = cardsRef.current[index];
    if (!card) return;

    if (isEnter) {
      gsap.to(card.querySelector('.icon-wrapper'), {
        scale: 1.05,
        rotate: 0,
        duration: 0.4,
        ease: 'back.out(0.3)',
      });
      gsap.to(card.querySelector('.stats-badge'), {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: 'back.out(0.3)',
      });
      gsap.to(card, {
        y: -5,
        duration: 0.3,
        ease: 'power2.out',
      });
    } else {
      gsap.to(card.querySelector('.icon-wrapper'), {
        scale: 1,
        rotate: 0,
        duration: 0.3,
        ease: 'back.out(0.3)',
      });
      gsap.to(card.querySelector('.stats-badge'), {
        y: 10,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.out',
      });
      gsap.to(card, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgb(56, 189, 248) 1px, transparent 1px), linear-gradient(90deg, rgb(56, 189, 248) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Floating Particles - No random values, using fixed positions */}
        {mounted && (
          <div className="absolute inset-0 overflow-hidden">
            {particlePositions.map((pos, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
                style={{
                  top: pos.top,
                  left: pos.left,
                  animation: `float ${pos.duration}s infinite ease-in-out`,
                  animationDelay: `${pos.delay}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-sm mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
              Core Capabilities
            </span>
          </div>
          
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Why Choose SmartScope
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Experience the future of semiconductor technology with our cutting-edge solutions
            designed for performance, scalability, and reliability.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isHovered = hoveredCard === index;
            
            return (
              <div
                key={index}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group relative"
                onMouseEnter={() => handleCardHover(index, true)}
                onMouseLeave={() => handleCardHover(index, false)}
              >
                {/* Main Card - No glow effect */}
                <div className="relative h-full bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden">
                  {/* Background Gradient on Hover - Subtle, no light effect */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />
                  
                  {/* Icon Section */}
                  <div className="relative mb-6">
                    <div className="icon-wrapper w-16 h-16 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border border-white/20 group-hover:border-white/40 transition-all duration-300">
                      <Icon className={`w-8 h-8 transition-all duration-300 ${isHovered ? 'scale-105' : ''}`} style={{ 
                        color: isHovered ? '#22d3ee' : '#94a3b8',
                      }} />
                    </div>
                    
                    {/* Stats Badge */}
                    <div className="stats-badge absolute -top-2 -right-2 px-2 py-1 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 transform translate-y-2 transition-all duration-300">
                      <span className="text-xs font-bold text-white">{feature.stats}</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  
                  {/* Metric Display */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <span className="text-xs text-slate-400">Peak Performance</span>
                    <span className="text-sm font-semibold text-cyan-400">{feature.metric}</span>
                  </div>
                  
                  {/* Underline Animation - Subtle */}
                  <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${feature.gradient} transition-all duration-300 ${isHovered ? 'w-full' : 'w-0'}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Globe, label: 'Global Presence', value: '50+ Countries' },
              { icon: Award, label: 'Industry Awards', value: '25+ Awards' },
              { icon: Rocket, label: 'Happy Clients', value: '500+ Clients' },
              { icon: Shield, label: 'Security Certified', value: 'ISO 27001' },
            ].map((item, idx) => {
              const ItemIcon = item.icon;
              return (
                <div key={idx} className="text-center group">
                  <div className="flex justify-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all duration-300">
                      <ItemIcon className="w-5 h-5 text-cyan-400" />
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mb-1">{item.label}</p>
                  <p className="text-sm font-semibold text-white">{item.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(0px) translateX(20px); }
          75% { transform: translateY(20px) translateX(10px); }
        }
      `}</style>
    </section>
  );
}