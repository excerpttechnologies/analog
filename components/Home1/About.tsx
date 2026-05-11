"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Shield,
  Zap,
  Target,
  Globe,
  Sparkles,
  ChevronRight,
  Cpu,
  Award,
  Leaf,
  ThumbsUp,
  Users,
  Rocket,
  CheckCircle,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Updated card data with new structure
const features = [
  {
    id: 1,
    title: "Next-Gen Architecture",
    description:
      "Revolutionary chip design that pushes the boundaries of analog and digital signal processing.",
    detailedText:
      "Our proprietary architecture delivers 10x efficiency gains through AI-optimized circuits and quantum-inspired algorithms.",
    icon: Zap,
    image:
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=600&fit=crop",
    gradient: "from-indigo-500 to-purple-600",
    stat: "10x",
    statLabel: "Performance Boost",
    color: "indigo",
  },
  {
    id: 2,
    title: "Zero-Compromise Quality",
    description:
      "Rigorous testing ensures every chip meets the highest reliability standards.",
    detailedText:
      "ISO 9001:2024 certified facilities with automated testing at every stage, achieving 99.999% yield rates.",
    icon: Shield,
    image:
      "https://images.unsplash.com/photo-1581092335871-4d07d2d2b8c2?w=800&h=600&fit=crop",
    gradient: "from-emerald-500 to-teal-600",
    stat: "5-Sigma",
    statLabel: "Reliability",
    color: "emerald",
  },
  {
    id: 3,
    title: "Borderless Innovation",
    description:
      "Global network delivering cutting-edge solutions across 50+ countries.",
    detailedText:
      "Design centers and sales offices worldwide ensure real-time collaboration and rapid deployment.",
    icon: Globe,
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop",
    gradient: "from-rose-500 to-orange-500",
    stat: "24/7",
    statLabel: "Global Support",
    color: "rose",
  },
  {
    id: 4,
    title: "Eco-Conscious Engineering",
    description:
      "Sustainable manufacturing for a greener semiconductor future.",
    detailedText:
      "40% reduction in carbon footprint through innovative processes and power-efficient designs.",
    icon: Leaf,
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop",
    gradient: "from-cyan-500 to-blue-600",
    stat: "40%",
    statLabel: "Less Energy",
    color: "cyan",
  },
];

const milestones = [
  {
    year: "2010",
    title: "Founded",
    description: "Started with a vision to revolutionize semiconductors",
    icon: Rocket,
  },
  {
    year: "2015",
    title: "First Patent",
    description: "Breakthrough in signal processing technology",
    icon: Award,
  },
  {
    year: "2020",
    title: "Global Expansion",
    description: "Offices opened across 3 continents",
    icon: Globe,
  },
  {
    year: "2024",
    title: "Carbon Neutral",
    description: "Achieved sustainability milestone",
    icon: Leaf,
  },
];

const values = [
  {
    title: "Innovation First",
    description: "Constantly pushing technological boundaries",
    icon: Zap,
  },
  {
    title: "Quality Obsession",
    description: "Zero defects is our only standard",
    icon: CheckCircle,
  },
  {
    title: "Customer Success",
    description: "Your growth is our mission",
    icon: ThumbsUp,
  },
  {
    title: "Global Collaboration",
    description: "One team, worldwide impact",
    icon: Users,
  },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Hero animation
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll(".hero-animate"),
          {
            y: 40,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Animate features on scroll
      featuresRef.current.forEach((feature, index) => {
        if (!feature) return;

        ScrollTrigger.create({
          trigger: feature,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.fromTo(
              feature,
              {
                x: index % 2 === 0 ? -60 : 60,
                opacity: 0,
                scale: 0.95,
              },
              {
                x: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "back.out(0.4)",
              },
            );
          },
        });
      });

      // Stats counter animation
      if (statsRef.current) {
        const counters = statsRef.current.querySelectorAll(".stat-number");
        ScrollTrigger.create({
          trigger: statsRef.current,
          start: "top 80%",
          onEnter: () => {
            counters.forEach((counter) => {
              const target = parseInt(
                counter.getAttribute("data-target") || "0",
              );
              const element = counter as HTMLElement;
              let current = 0;
              const increment = target / 50;
              const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                  element.textContent = target.toString();
                  clearInterval(timer);
                } else {
                  element.textContent = Math.floor(current).toString();
                }
              }, 30);
            });
          },
          once: true,
        });
      }

      // Parallax effect for decorative elements
      gsap.to(".parallax-1", {
        y: 100,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
      gsap.to(".parallax-2", {
        y: -80,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative bg-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="parallax-1 absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-100/30 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-20 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl" />
        </div>
        <div className="parallax-2 absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-emerald-100/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-rose-100/20 rounded-full blur-3xl" />
        </div>

        {/* Dot Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgb(0, 0, 0) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-4"
      >
        <div className="max-w-6xl mx-auto text-center">
          <div className="hero-animate inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-200 mb-6">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-700">
              The Future of Semiconductors
            </span>
          </div>
          <h1 className="hero-animate text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 via-indigo-800 to-slate-900 bg-clip-text text-transparent">
              SmartScope
            </span>
          </h1>
          <p className="hero-animate text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-8">
            Redefining what's possible in analog and digital signal processing
            through relentless innovation
          </p>
          <div className="hero-animate flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group px-8 py-3 bg-slate-900 text-white rounded-full font-semibold hover:bg-indigo-600 transition-all duration-300 hover:scale-105 shadow-lg">
              Explore Technology
              <ChevronRight className="inline w-4 h-4 ml-1 group-hover:translate-x-1 transition" />
            </button>
            <button className="px-8 py-3 border-2 border-slate-200 text-slate-700 rounded-full font-semibold hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-slate-400 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Features Grid - Card Style */}
      <div className="relative py-20 md:py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
              Core Capabilities
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Engineering Excellence
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Discover the pillars that make SmartScope a leader in
              semiconductor innovation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.id}
                  ref={(el) => {
                    featuresRef.current[idx] = el;
                  }}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition duration-700`}
                  />

                  <div className="p-6 md:p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-right">
                        <span className="text-2xl md:text-3xl font-bold text-slate-800">
                          {feature.stat}
                        </span>
                        <p className="text-xs text-slate-500">
                          {feature.statLabel}
                        </p>
                      </div>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-500 mb-3">{feature.description}</p>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {feature.detailedText}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm font-medium">Learn more</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats Banner */}
      <div
        ref={statsRef}
        className="relative bg-gradient-to-r from-indigo-600 to-purple-600 py-16 my-8"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='M0 0l20 20L0 40zm40 0L20 20l20 20z'/%3E%3C/g%3E%3C/svg%3E\")",
          }}
        ></div>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div
                className="stat-number text-4xl md:text-5xl font-bold text-white"
                data-target="15"
              >
                0
              </div>
              <p className="text-indigo-100 mt-2">Years of Excellence</p>
            </div>
            <div>
              <div
                className="stat-number text-4xl md:text-5xl font-bold text-white"
                data-target="500"
              >
                0
              </div>
              <p className="text-indigo-100 mt-2">Global Clients</p>
            </div>
            <div>
              <div
                className="stat-number text-4xl md:text-5xl font-bold text-white"
                data-target="200"
              >
                0
              </div>
              <p className="text-indigo-100 mt-2">R&D Experts</p>
            </div>
            <div>
              <div
                className="stat-number text-4xl md:text-5xl font-bold text-white"
                data-target="40"
              >
                0
              </div>
              <p className="text-indigo-100 mt-2">Carbon Reduction %</p>
            </div>
          </div>
        </div>
      </div>

      {/* Milestones Timeline */}
      <div className="py-20 md:py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
              Key Milestones
            </h2>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-indigo-200 via-purple-200 to-emerald-200 hidden md:block" />

            <div className="space-y-12 md:space-y-0">
              {milestones.map((milestone, idx) => {
                const Icon = milestone.icon;
                const isLeft = idx % 2 === 0;
                return (
                  <div
                    key={idx}
                    className={`relative flex flex-col md:flex-row ${isLeft ? "md:justify-start" : "md:justify-end"} items-center`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-indigo-500 rounded-full hidden md:block" />

                    <div
                      className={`md:w-5/12 ${isLeft ? "md:pr-12" : "md:pl-12"} text-center md:text-left mb-4 md:mb-0`}
                    >
                      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-slate-100">
                        <div className="flex items-center gap-3 mb-3 justify-center md:justify-start">
                          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-indigo-600" />
                          </div>
                          <span className="text-2xl font-bold text-indigo-600">
                            {milestone.year}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-slate-500">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="relative bg-slate-50 py-20 md:py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-rose-600 font-semibold text-sm uppercase tracking-wider">
              Our DNA
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
              Core Values
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto mt-2">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div key={idx} className="text-center group">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white shadow-md flex items-center justify-center group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Icon className="w-10 h-10 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-slate-500 text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />

            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">
              Ready to Transform Your Technology?
            </h3>
            <p className="text-slate-300 max-w-2xl mx-auto mb-8 relative z-10">
              Join the industry leaders who trust SmartScope for next-generation
              semiconductor solutions
            </p>
            <button className="relative z-10 px-8 py-3 bg-white text-slate-900 rounded-full font-semibold hover:bg-indigo-50 transition-all duration-300 hover:scale-105 shadow-lg">
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
