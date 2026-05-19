"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  Shield,
  Zap,
  Target,
  Globe,
  Sparkles,
  TrendingUp,
  Cpu,
  Microscope,
  Binary,
  Clock,
  Award,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const cards = [
  {
    id: 1,
    title: "Company Intro",
    subtitle: "Who We Are",
    description:
      "AnalogChips is a leading innovator in analog and mixed-signal semiconductor solutions, delivering precision, reliability, and performance for mission-critical applications.",
    longDescription:
      "Founded in 2015 by a team of analog design veterans from Texas Instruments, Analog Devices, and Maxim Integrated, AnalogChips has grown into a trusted partner for automotive, industrial, medical, and communications industries worldwide. Our headquarters in Austin, Texas, houses state-of-the-art design centers and characterization labs, enabling us to deliver cutting-edge analog solutions that push the boundaries of what's possible.",
    icon: Award,
    image:
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&h=600&fit=crop",
    gradient: "from-blue-500 to-cyan-500",
    lightGradient: "from-blue-50 to-cyan-50",
    stats: "Founded 2015",
    metric: "200+ Employees",
    layout: "left",
    color: "blue",
  },
  {
    id: 2,
    title: "Our Mission",
    subtitle: "Why We Exist",
    description:
      "To empower engineers with precision analog solutions that bridge the gap between physical and digital worlds, enabling smarter, more efficient systems.",
    longDescription:
      "We believe that exceptional analog design is the foundation of all great electronic systems. Our mission is to provide engineers with high-performance amplifiers, data converters, power management ICs, and interface solutions that deliver unmatched accuracy, low power consumption, and robust reliability. From sensor interfaces to signal conditioning chains, we're committed to making analog design simpler, faster, and more innovative for our customers worldwide.",
    icon: Target,
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    gradient: "from-emerald-500 to-teal-500",
    lightGradient: "from-emerald-50 to-teal-50",
    stats: "100M+ Units",
    metric: "99.8% Reliability",
    layout: "right",
    color: "emerald",
  },
  {
    id: 3,
    title: "Semiconductor Expertise",
    subtitle: "Deep Technical Mastery",
    description:
      "Specializing in high-precision analog, mixed-signal, and power management ICs from 180nm to 40nm process nodes.",
    longDescription:
      "Our engineering team brings over 200 years of combined analog design experience, with proven expertise in data converters (ADCs/DACs), operational amplifiers, comparators, voltage references, power management ICs, and interface products. We maintain strategic partnerships with leading foundries including TSMC, TowerJazz, and X-FAB, allowing us to optimize each design for the ideal process technology. Our rigorous characterization and qualification processes ensure every chip meets automotive-grade (AEC-Q100) and industrial reliability standards.",
    icon: Microscope,
    image:
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=600&fit=crop",
    gradient: "from-purple-500 to-pink-500",
    lightGradient: "from-purple-50 to-pink-50",
    stats: "50+ Design Wins",
    metric: "200+ Years Exp",
    layout: "left",
    color: "purple",
  },
  {
    id: 4,
    title: "Years Experience",
    subtitle: "Proven Track Record",
    description:
      "Nearly a decade of analog innovation with leadership team averaging 25+ years in semiconductor industry.",
    longDescription:
      "Since our founding in 2015, we've successfully launched over 200 distinct analog products, serving more than 500 customers across 40 countries. Our executive team brings experience from industry giants, having collectively led over 1,000 successful tape-outs throughout their careers. This deep domain knowledge allows us to anticipate market needs, avoid common pitfalls, and deliver first-pass silicon success for complex analog designs. Our cumulative industry experience exceeds 500 years across the organization.",
    icon: Clock,
    image:
      "https://img.magnific.com/free-photo/businessman-big-office_53876-144319.jpg?semt=ais_hybrid&w=740&q=80",
    gradient: "from-orange-500 to-red-500",
    lightGradient: "from-orange-50 to-red-50",
    stats: "9+ Years",
    metric: "500+ Years",
    layout: "right",
    color: "orange",
  },
  {
    id: 5,
    title: "AI + Analog Solutions",
    subtitle: "Future-Ready Technology",
    description:
      "Integrating intelligent algorithms with precision analog to create self-calibrating, adaptive, and predictive analog systems.",
    longDescription:
      "The future of analog is intelligent. We're pioneering the integration of on-chip machine learning capabilities that enable our analog ICs to self-calibrate in real-time, compensate for temperature and aging effects, and even predict failure modes before they occur. Our AI-enhanced data converters achieve unprecedented linearity through digital correction algorithms, while our smart power management ICs learn system load patterns to optimize efficiency dynamically. This fusion of analog expertise with artificial intelligence is creating a new generation of 'cognitive analog' solutions that adapt, learn, and perform better over time.",
    icon: Binary,
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=600&fit=crop",
    gradient: "from-indigo-500 to-violet-500",
    lightGradient: "from-indigo-50 to-violet-50",
    stats: "15 AI Patents",
    metric: "40% Efficiency",
    layout: "left",
    color: "indigo",
  },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !pinContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Create animations for each card
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const isLastCard = index === cardsRef.current.length - 1;

        // Pin each card
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          end: isLastCard ? "bottom top" : "+=100%",
          pin: true,
          pinSpacing: false,
          scrub: 1,
          id: `pin-${index}`,
        });

        // Animate content when card is active
        ScrollTrigger.create({
          trigger: card,
          start: "top 80%",
          end: "top 20%",
          scrub: 0.8,
          onUpdate: (self) => {
            const progress = self.progress;

            // Animate image
            const imageEl = card.querySelector(".card-image");
            if (imageEl) {
              gsap.set(imageEl, {
                scale: 0.7 + progress * 0.3,
                opacity: 0.5 + progress * 0.5,
                rotateY: (1 - progress) * 15,
              });
            }

            // Animate title
            const titleEl = card.querySelector(".card-title");
            if (titleEl) {
              gsap.set(titleEl, {
                x: (1 - progress) * 50,
                opacity: progress,
              });
            }

            // Animate description
            const descEl = card.querySelector(".card-desc");
            if (descEl) {
              gsap.set(descEl, {
                x: (1 - progress) * 30,
                opacity: progress,
              });
            }

            // Animate stats
            const statsEl = card.querySelectorAll(".card-stat");
            statsEl.forEach((stat, i) => {
              gsap.set(stat, {
                x: (1 - progress) * 20,
                opacity: progress,
                delay: i * 0.1,
              });
            });
          },
        });

        // For last card - scale down effect
        if (isLastCard) {
          ScrollTrigger.create({
            trigger: card,
            start: "top 50%",
            end: "bottom 20%",
            scrub: 1.5,
            onUpdate: (self) => {
              const progress = self.progress;
              const scale = 1 - progress * 0.15;
              const opacity = 1 - progress * 0.3;

              gsap.set(card, {
                scale: Math.max(0.85, scale),
                opacity: Math.max(1, opacity),
                transformOrigin: "center center",
              });
            },
          });
        }
      });
    }, sectionRef);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative font-['Instrument_Sans',sans-serif] bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden"
    >
      {/* White Theme Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-100/30 rounded-full blur-3xl" />

        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(14, 165, 233) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Section Header - White Theme */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 shadow-sm mb-4">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
              Our Journey
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
              About AnalogChips
            </span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mt-2">
            Precision analog solutions powering the future of electronics
          </p>
        </div>
      </div>

      {/* Pin Container */}
      <div ref={pinContainerRef} className="relative bg-white">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={card.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="relative min-h-screen w-full bg-white"
            >
              <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 w-full min-h-screen flex items-center">
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full ${
                    card.layout === "right" ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image Section */}
                  <div
                    className={`relative ${card.layout === "right" ? "lg:order-2" : "lg:order-1"}`}
                  >
                    <div className="card-image relative rounded-2xl overflow-hidden shadow-xl">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          className="object-cover"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${card.gradient} mix-blend-multiply opacity-20`}
                        />
                      </div>

                      {/* Floating Badge */}
                      <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-white shadow-lg z-10">
                        <span className="text-xs font-bold text-slate-800">
                          {card.stats}
                        </span>
                      </div>

                      {/* Decorative border */}
                      <div
                        className={`absolute inset-0 rounded-2xl border-2 border-${card.color}-200 opacity-40 pointer-events-none`}
                      />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div
                    className={`${card.layout === "right" ? "lg:order-1" : "lg:order-2"}`}
                  >
                    <div className="space-y-5">
                      {/* Icon and Badge */}
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-r ${card.gradient} flex items-center justify-center shadow-md`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
                          <span className="text-xs font-semibold text-slate-600">
                            {card.subtitle}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="card-title text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                        {card.title}
                      </h3>

                      {/* Description */}
                      <p className="card-desc text-base md:text-lg text-slate-600 leading-relaxed">
                        {card.description}
                      </p>

                      {/* Long Description */}
                      <p className="text-sm md:text-base text-slate-500 leading-relaxed">
                        {card.longDescription}
                      </p>

                      {/* Stats Cards - White Theme */}
                      <div className="grid grid-cols-2 gap-3 pt-3">
                        <div className="card-stat p-3 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105">
                          <p className="text-xl md:text-2xl font-bold text-slate-900">
                            {card.stats}
                          </p>
                          <p className="text-xs text-slate-500">
                            {card.id === 1 && "Industry Recognition"}
                            {card.id === 2 && "Global Impact"}
                            {card.id === 3 && "Technical Achievement"}
                            {card.id === 4 && "Team Excellence"}
                            {card.id === 5 && "Innovation Milestone"}
                          </p>
                        </div>
                        <div className="card-stat p-3 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105">
                          <p className="text-xl md:text-2xl font-bold text-slate-900">
                            {card.metric}
                          </p>
                          <p className="text-xs text-slate-500">
                            {card.id === 1 && "Team Size"}
                            {card.id === 2 && "Quality Standard"}
                            {card.id === 3 && "Industry Heritage"}
                            {card.id === 4 && "Combined Expertise"}
                            {card.id === 5 && "Power Savings"}
                          </p>
                        </div>
                      </div>

                      {/* Progress Indicator */}
                      <div className="flex items-center gap-2 pt-3">
                        <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${card.gradient} rounded-full transition-all duration-700`}
                            style={{
                              width: `${((index + 1) / cards.length) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs text-slate-500 font-medium">
                          {index + 1}/{cards.length}
                        </span>
                      </div>

                      {/* Scroll Hint */}
                      {index < cards.length - 1 && (
                        <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
                          <TrendingUp className="w-3 h-3" />
                          <span>Scroll to continue journey</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Fade - White Theme */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />
    </section>
  );
}
