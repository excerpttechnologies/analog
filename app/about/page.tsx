'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Shield, Award, Users, Globe, Target, Rocket, 
  Sparkles, TrendingUp, Zap, Cpu, ArrowRight,
  Clock, BadgeCheck, Heart, Lightbulb
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const milestones = [
  { year: '2004', title: 'Founded', description: 'SmartScope Technologies established with a vision to revolutionize semiconductor industry', icon: Rocket, color: 'blue' },
  { year: '2008', title: 'First Product', description: 'Launched flagship SERDES IP, gaining first 50 enterprise clients', icon: Shield, color: 'emerald' },
  { year: '2012', title: 'Market Leader', description: 'Reached 500+ enterprise clients across 20 countries worldwide', icon: TrendingUp, color: 'purple' },
  { year: '2018', title: 'AI Innovation', description: 'Introduced AI-enhanced analog systems, reducing power consumption by 40%', icon: Sparkles, color: 'orange' },
  { year: '2022', title: 'Global Expansion', description: 'Opened offices in 15 countries with 500+ employees globally', icon: Globe, color: 'cyan' },
  { year: '2024', title: 'Next Generation', description: 'Released next-gen semiconductor platform with 3nm technology', icon: Zap, color: 'pink' },
];

const teamMembers = [
  {
    name: 'Dr. Sarah Chen',
    role: 'CEO & Founder',
    bio: 'Former Intel Fellow with 25+ years in semiconductor design',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  },
  {
    name: 'Michael Rodriguez',
    role: 'CTO',
    bio: 'Expert in analog signal processing and AI integration',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  },
  {
    name: 'Dr. Emily Watson',
    role: 'Head of R&D',
    bio: 'PhD in Electrical Engineering from MIT',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
  },
  {
    name: 'James Kim',
    role: 'VP of Engineering',
    bio: '20+ years in semiconductor manufacturing',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
];

const values = [
  { icon: Target, title: 'Innovation First', description: 'Constantly pushing boundaries of what\'s possible' },
  { icon: Shield, title: 'Quality Assured', description: 'Zero-defect commitment in every product' },
  { icon: Users, title: 'Customer Focus', description: 'Partnering for long-term success' },
  { icon: Heart, title: 'Integrity', description: 'Ethical practices and transparency' },
];

export default function AboutPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<(HTMLDivElement | null)[]>([]);
  const teamRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(heroRef.current,
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Mission cards animation
      const missionCards = missionRef.current?.querySelectorAll('.mission-card');
      if (missionCards) {
        gsap.fromTo(missionCards,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'back.out(0.4)',
            scrollTrigger: {
              trigger: missionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Timeline animations
      timelineRefs.current.forEach((item, index) => {
        if (!item) return;
        
        gsap.fromTo(item,
          { opacity: 0, x: index % 2 === 0 ? -50 : 50, scale: 0.9 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'back.out(0.3)',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Stats counter animation
      const statNumbers = statsRef.current?.querySelectorAll('.stat-number');
      if (statNumbers) {
        statNumbers.forEach((stat) => {
          const target = parseInt(stat.getAttribute('data-target') || '0');
          ScrollTrigger.create({
            trigger: statsRef.current,
            start: 'top 80%',
            onEnter: () => {
              gsap.to(stat, {
                innerHTML: target,
                duration: 2,
                snap: { innerHTML: 1 },
                ease: 'power2.out',
                onUpdate: function() {
                  stat.textContent = Math.floor(Number(stat.innerHTML)).toString();
                },
              });
            },
            once: true,
          });
        });
      }

      // Values animations
      valuesRef.current.forEach((value, index) => {
        if (!value) return;
        
        gsap.fromTo(value,
          { opacity: 0, y: 30, rotateY: 30 },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'back.out(0.4)',
            scrollTrigger: {
              trigger: value,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Team animations
      teamRefs.current.forEach((member, index) => {
        if (!member) return;
        
        gsap.fromTo(member,
          { opacity: 0, scale: 0.8, y: 50 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.7,
            delay: index * 0.12,
            ease: 'back.out(0.4)',
            scrollTrigger: {
              trigger: member,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
    <Navbar />
    <main ref={sectionRef} className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-200/20 rounded-full blur-3xl" />
          
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgb(14, 165, 233) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div ref={heroRef} className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-center py-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 shadow-sm mb-6">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
              Our Story
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
            About SmartScope
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We&apos;re pioneering the future of semiconductor technology with innovative solutions for signal processing, 
            data conversion, and AI-enhanced analog systems.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section ref={missionRef} className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="mission-card group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              <Card className="relative h-full p-8 bg-white border-slate-200 hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">Our Mission</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  To advance semiconductor innovation through cutting-edge research, 
                  design excellence, and customer-centric solutions that drive 
                  technological progress across industries.
                </p>
                <p className="text-slate-500">
                  We believe in the power of precision electronics to transform how 
                  the world processes, analyzes, and acts on information.
                </p>
              </Card>
            </div>

            {/* Vision Card */}
            <div className="mission-card group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              <Card className="relative h-full p-8 bg-white border-slate-200 hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-6">
                  <Lightbulb className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">Our Vision</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  To become the global leader in semiconductor IP and analog technologies, 
                  recognized for innovation, reliability, and enabling the next generation 
                  of intelligent systems.
                </p>
                <p className="text-slate-500">
                  By combining advanced research with practical engineering excellence, 
                  we create solutions that power the future.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 shadow-sm mb-4">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
                Our Journey
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Company Timeline</h2>
            <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
              Two decades of innovation and excellence in semiconductor technology
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-cyan-400 to-purple-400 hidden md:block" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                return (
                  <div
                    key={milestone.year}
                    ref={(el) => { timelineRefs.current[index] = el; }}
                    className="relative"
                  >
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                      <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                        <div className="group relative">
                          <div className={`absolute inset-0 bg-gradient-to-r ${
                            index % 2 === 0 ? 'from-blue-500 to-cyan-500' : 'from-purple-500 to-pink-500'
                          } rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                          <Card className="relative p-6 bg-white border-slate-200 hover:shadow-xl transition-all duration-500 group-hover:-translate-x-2">
                            <div className="flex items-start gap-4">
                              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${
                                index % 2 === 0 ? 'from-blue-500 to-cyan-500' : 'from-purple-500 to-pink-500'
                              } flex items-center justify-center flex-shrink-0`}>
                                <Icon className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2 flex-wrap">
                                  <h4 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                    {milestone.year}
                                  </h4>
                                  <span className="px-2 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                                    Milestone
                                  </span>
                                </div>
                                <h5 className="text-xl font-semibold text-slate-900 mb-2">{milestone.title}</h5>
                                <p className="text-slate-600">{milestone.description}</p>
                              </div>
                            </div>
                          </Card>
                        </div>
                      </div>

                      {/* Timeline dot */}
                      <div className="hidden md:flex justify-center">
                        <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${
                          index % 2 === 0 ? 'from-blue-500 to-cyan-500' : 'from-purple-500 to-pink-500'
                        } border-4 border-white shadow-lg`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 500, suffix: '+', label: 'Enterprise Clients', icon: Users, gradient: 'from-blue-500 to-cyan-500' },
              { value: 20, suffix: '+', label: 'Years Industry', icon: Award, gradient: 'from-emerald-500 to-teal-500' },
              { value: 45, suffix: '+', label: 'Patent Portfolio', icon: Shield, gradient: 'from-purple-500 to-pink-500' },
              { value: 15, suffix: '', label: 'Global Offices', icon: Globe, gradient: 'from-orange-500 to-red-500' },
            ].map((stat, idx) => {
              const StatIcon = stat.icon;
              return (
                <div key={idx} className="text-center group">
                  <div className="flex justify-center mb-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                      <StatIcon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2">
                    <span className="stat-number" data-target={stat.value}>0</span>
                    <span>{stat.suffix}</span>
                  </div>
                  <p className="text-slate-600 font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 shadow-sm mb-4">
              <Heart className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
                Our Values
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">What Drives Us</h2>
            <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
              Core principles that guide our decisions and define our culture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => {
              const ValueIcon = value.icon;
              return (
                <div
                  key={idx}
                  ref={(el) => { valuesRef.current[idx] = el; }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                  <Card className="relative p-6 text-center bg-white border-slate-200 hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <ValueIcon className="w-8 h-8 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{value.title}</h3>
                    <p className="text-sm text-slate-600">{value.description}</p>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 shadow-sm mb-4">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
                Leadership
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Meet Our Team</h2>
            <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
              Passionate experts driving innovation in semiconductor technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                ref={(el) => { teamRefs.current[idx] = el; }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                <Card className="relative overflow-hidden bg-white border-slate-200 hover:shadow-xl transition-all duration-500 group-hover:-translate-y-3">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{member.name}</h3>
                    <p className="text-sm font-semibold text-blue-600 mb-2">{member.role}</p>
                    <p className="text-sm text-slate-600">{member.bio}</p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-blue-600 to-cyan-500">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Join Us in Shaping the Future
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Be part of our journey to revolutionize semiconductor technology
          </p>
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-blue-600 font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
          >
            View Open Positions
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </main>
    <Footer/>
    </>
  );
}