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
  Award,
  Cpu,
  Leaf,
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
    title: "Innovation First",
    subtitle: "Pushing Boundaries",
    description:
      "We pioneer next-generation semiconductor technologies that redefine what's possible in analog and digital signal processing.",
    longDescription:
      "Our R&D team constantly explores new frontiers in chip design, leveraging AI and quantum-inspired algorithms to create solutions that are 10x more efficient than conventional approaches.",
    icon: Zap,
    image:
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=600&fit=crop",
    gradient: "from-blue-500 to-cyan-500",
    lightGradient: "from-blue-50 to-cyan-50",
    stats: "50+ Patents",
    metric: "10x Efficiency",
    layout: "left",
    color: "blue",
  },
  {
    id: 2,
    title: "Quality Assured",
    subtitle: "Zero Defects",
    description:
      "Every chip undergoes rigorous testing and validation to ensure highest reliability and performance standards.",
    longDescription:
      "Our ISO 9001:2024 certified facilities maintain strict quality control measures, with automated testing at every stage of production.",
    icon: Shield,
    image:
      "https://images.unsplash.com/photo-1581092335871-4d07d2d2b8c2?w=800&h=600&fit=crop",
    gradient: "from-emerald-500 to-teal-500",
    lightGradient: "from-emerald-50 to-teal-50",
    stats: "99.999% Yield",
    metric: "ISO Certified",
    layout: "right",
    color: "emerald",
  },
  {
    id: 3,
    title: "Global Reach",
    subtitle: "Worldwide Presence",
    description:
      "Serving customers across 50+ countries with local support and rapid deployment capabilities.",
    longDescription:
      "Our global network of design centers and sales offices ensures we're always close to our customers, providing real-time support and collaboration.",
    icon: Globe,
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop",
    gradient: "from-purple-500 to-pink-500",
    lightGradient: "from-purple-50 to-pink-50",
    stats: "50+ Countries",
    metric: "24/7 Support",
    layout: "left",
    color: "purple",
  },
  {
    id: 4,
    title: "Sustainable Future",
    subtitle: "Green Technology",
    description:
      "Committed to eco-friendly manufacturing and energy-efficient semiconductor solutions.",
    longDescription:
      "We've reduced our carbon footprint by 40% through innovative manufacturing processes and power-efficient chip designs.",
    icon: Target,
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop",
    gradient: "from-orange-500 to-red-500",
    lightGradient: "from-orange-50 to-red-50",
    stats: "40% Less Energy",
    metric: "Carbon Neutral",
    layout: "right",
    color: "orange",
  },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !pinContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current?.querySelectorAll(".animate-header"),
        { opacity: 0, y: 40, filter: "blur(8px)" },
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
          pinSpacing: true,
          scrub: 0.8,
          id: `pin-${index}`,
        });

        // Animate content when card is active
        ScrollTrigger.create({
          trigger: card,
          start: "top 80%",
          end: "top 20%",
          scrub: 0.6,
          onUpdate: (self) => {
            const progress = Math.min(1, Math.max(0, self.progress));

            // Animate image
            const imageWrapper = card.querySelector(".image-wrapper");
            if (imageWrapper) {
              gsap.set(imageWrapper, {
                scale: 0.8 + progress * 0.2,
                opacity: 0.6 + progress * 0.4,
              });
            }

            // Animate content
            const contentBlock = card.querySelector(".content-block");
            if (contentBlock) {
              const xValue = card.classList.contains("layout-left") ? 50 : -50;
              gsap.set(contentBlock, {
                x: (1 - progress) * xValue,
                opacity: progress,
              });
            }
          },
        });

        // Separate animation for text elements
        ScrollTrigger.create({
          trigger: card,
          start: "top 70%",
          end: "top 30%",
          scrub: 0.5,
          onUpdate: (self) => {
            const progress = self.progress;

            // Animate title
            const titleEl = card.querySelector(".card-title");
            if (titleEl) {
              gsap.set(titleEl, {
                y: (1 - progress) * 30,
                opacity: 0.5 + progress * 0.5,
              });
            }

            // Animate description
            const descEl = card.querySelector(".card-desc");
            if (descEl) {
              gsap.set(descEl, {
                y: (1 - progress) * 20,
                opacity: 0.6 + progress * 0.4,
              });
            }

            // Animate stats
            const statItems = card.querySelectorAll(".stat-item");
            statItems.forEach((item, i) => {
              gsap.set(item, {
                y: (1 - progress) * 15,
                opacity: 0.7 + progress * 0.3,
                delay: i * 0.05,
              });
            });
          },
        });

        // For last card - scale down effect
        if (isLastCard) {
          ScrollTrigger.create({
            trigger: card,
            start: "top 40%",
            end: "bottom 10%",
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              const scale = 1 - progress * 0.1;
              const opacity = 1 - progress * 0.2;

              gsap.set(card, {
                scale: Math.max(0.9, scale),
                opacity: Math.max(0.7, opacity),
                transformOrigin: "center center",
              });
            },
          });
        }
      });

      // Floating background animation
      gsap.to(".floating-bg-1", {
        y: 80,
        x: 50,
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".floating-bg-2", {
        y: -60,
        x: -40,
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
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
      className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden"
    >
      {/* White Theme Background */}
      <div className="fixed inset-0 -z-10">
        <div className="floating-bg-1 absolute top-20 left-10 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl" />
        <div className="floating-bg-2 absolute bottom-20 right-10 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-100/20 rounded-full blur-3xl" />

        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(14, 165, 233) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Section Header */}
      <div
        ref={headerRef}
        className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="animate-header inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 shadow-sm mb-4">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
              Our Journey
            </span>
          </div>
          <h2 className="animate-header text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
              About SmartScope
            </span>
          </h2>
          <p className="animate-header text-base md:text-lg text-slate-600 max-w-2xl mt-2">
            Discover how we're revolutionizing the semiconductor industry with
            cutting-edge innovation.
          </p>
        </div>
      </div>

      {/* Pin Container */}
      <div ref={pinContainerRef} className="relative">
        {cards.map((card, index) => {
          const Icon = card.icon;
          const isLeft = card.layout === "left";

          return (
            <div
              key={card.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className={`relative min-h-screen w-full bg-white/30 ${isLeft ? "layout-left" : "layout-right"}`}
            >
              <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-16 w-full min-h-screen flex items-center">
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full`}
                >
                  {/* Image Section */}
                  <div
                    className={`relative ${isLeft ? "lg:order-1" : "lg:order-2"}`}
                  >
                    <div className="image-wrapper relative rounded-2xl overflow-hidden shadow-2xl">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${card.gradient} mix-blend-multiply opacity-20`}
                        />
                      </div>

                      {/* Floating Badge */}
                      <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-sm shadow-lg z-10 border border-slate-100">
                        <span className="text-xs font-bold text-slate-800">
                          {card.stats}
                        </span>
                      </div>

                      {/* Decorative border */}
                      <div
                        className={`absolute inset-0 rounded-2xl border-2 border-${card.color}-200 opacity-40 pointer-events-none`}
                      />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div
                    className={`content-block ${isLeft ? "lg:order-2" : "lg:order-1"}`}
                  >
                    <div className="space-y-6">
                      {/* Icon and Badge */}
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-14 h-14 rounded-xl bg-gradient-to-r ${card.gradient} flex items-center justify-center shadow-md transform transition-transform hover:scale-110 duration-300`}
                        >
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200">
                          <span className="text-xs font-semibold text-slate-600">
                            {card.subtitle}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="card-title text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                        {card.title}
                      </h3>

                      {/* Description */}
                      <p className="card-desc text-base md:text-lg text-slate-600 leading-relaxed">
                        {card.description}
                      </p>

                      {/* Long Description with Quote Style */}
                      <div className="relative pl-4 border-l-4 border-blue-400/50 bg-blue-50/30 p-4 rounded-r-lg">
                        <p className="text-sm md:text-base text-slate-600 leading-relaxed italic">
                          "{card.longDescription}"
                        </p>
                      </div>

                      {/* Stats Cards */}
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="stat-item p-4 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-default">
                          <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                            {card.stats}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            Industry Recognition
                          </p>
                        </div>
                        <div className="stat-item p-4 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-default">
                          <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                            {card.metric}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            Performance Metric
                          </p>
                        </div>
                      </div>

                      {/* Progress Indicator */}
                      <div className="flex items-center gap-3 pt-2">
                        <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${card.gradient} rounded-full transition-all duration-700`}
                            style={{
                              width: `${((index + 1) / cards.length) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs text-slate-500 font-medium font-mono">
                          {String(index + 1).padStart(2, "0")}/{cards.length}
                        </span>
                      </div>

                      {/* Scroll Hint */}
                      {index < cards.length - 1 && (
                        <div className="flex items-center gap-2 text-xs text-slate-400 pt-3 animate-pulse">
                          <TrendingUp className="w-3 h-3" />
                          <span>Scroll to continue journey →</span>
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

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />
    </section>
  );
}
