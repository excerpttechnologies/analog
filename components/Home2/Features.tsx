"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Zap,
  Cpu,
  TrendingUp,
  Shield,
  Globe,
  Award,
  Rocket,
  ArrowUpRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Constants ────────────────────────────────────────────────────────────────
const ACCENT = "#0f62fe";
const ACCENT_RGB = "15,98,254";

// ─── Data ─────────────────────────────────────────────────────────────────────
const features = [
  {
    icon: Zap,
    number: "01",
    title: "High Performance",
    description:
      "Industry-leading speed and efficiency for demanding applications with up to 5× performance boost over competing architectures.",
    stat: "5×",
    statLabel: "Faster",
    metric: "2.5 GHz",
    metricLabel: "Clock Speed",
    tags: ["Low Latency", "High Throughput"],
  },
  {
    icon: Cpu,
    number: "02",
    title: "Advanced Architecture",
    description:
      "State-of-the-art semiconductor design using 3nm process technology with over 100 billion transistors on a single die.",
    stat: "3nm",
    statLabel: "Process Node",
    metric: "100B",
    metricLabel: "Transistors",
    tags: ["3nm CMOS", "EUV Litho"],
  },
  {
    icon: TrendingUp,
    number: "03",
    title: "Scalable Solutions",
    description:
      "From deeply embedded IoT endpoints to enterprise-grade cloud deployments — one architecture, infinite scale.",
    stat: "100%",
    statLabel: "Scalable",
    metric: "Edge",
    metricLabel: "Deployment",
    tags: ["IoT Ready", "Cloud Native"],
  },
  {
    icon: Shield,
    number: "04",
    title: "Enterprise Reliability",
    description:
      "99.999% uptime SLA backed by hardware-rooted security, redundant fabric, and 24 / 7 global support coverage.",
    stat: "99.999%",
    statLabel: "Uptime SLA",
    metric: "24 / 7",
    metricLabel: "Global Support",
    tags: ["ISO 27001", "FIPS 140-3"],
  },
];

const trustItems = [
  { icon: Globe, label: "Global Presence", value: "50+ Countries" },
  { icon: Award, label: "Industry Awards", value: "25+ Awards" },
  { icon: Rocket, label: "Enterprise Clients", value: "500+ Clients" },
  { icon: Shield, label: "Security Certified", value: "ISO 27001" },
];

// ─── Animated counter hook ────────────────────────────────────────────────────
function useCounter(target: string, triggered: boolean) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!triggered) return;
    // Extract numeric part
    const num = parseFloat(target.replace(/[^0-9.]/g, ""));
    const suffix = target.replace(/[0-9.]/g, "");
    if (isNaN(num)) {
      setDisplay(target);
      return;
    }

    let start = 0;
    const step = num / 40;
    const timer = setInterval(() => {
      start = Math.min(start + step, num);
      setDisplay(
        (start % 1 === 0 ? start.toFixed(0) : start.toFixed(3)) + suffix,
      );
      if (start >= num) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [triggered, target]);

  return display;
}

// ─── Feature Card ─────────────────────────────────────────────────────────────
function FeatureCard({
  feature,
  index,
  cardRef,
}: {
  feature: (typeof features)[0];
  index: number;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  const Icon = feature.icon;
  const [hovered, setHovered] = useState(false);
  const lineRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    setHovered(true);
    gsap.to(lineRef.current, { scaleX: 1, duration: 0.45, ease: "power3.out" });
    gsap.to(iconRef.current, {
      y: -4,
      scale: 1.08,
      duration: 0.35,
      ease: "back.out(1.5)",
    });
    gsap.to(badgeRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };
  const handleLeave = () => {
    setHovered(false);
    gsap.to(lineRef.current, { scaleX: 0, duration: 0.35, ease: "power2.in" });
    gsap.to(iconRef.current, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(badgeRef.current, {
      opacity: 0,
      y: 8,
      duration: 0.25,
      ease: "power2.in",
    });
  };

  return (
    <div
      ref={cardRef}
      className="feature-card relative flex flex-col bg-white border border-slate-100 rounded-2xl p-8 cursor-default overflow-hidden transition-shadow duration-300 hover:shadow-[0_8px_40px_rgba(15,98,254,0.10)] hover:border-slate-200"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Number watermark */}
      <span
        className="absolute -top-3 -right-1 select-none pointer-events-none font-black leading-none"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "7rem",
          color: `rgba(${ACCENT_RGB},0.04)`,
          letterSpacing: "-0.05em",
        }}
      >
        {feature.number}
      </span>

      {/* Icon + badge row */}
      <div className="relative flex items-start justify-between mb-7">
        <div
          ref={iconRef}
          className="w-14 h-14 rounded-xl flex items-center justify-center"
          style={{
            background: `rgba(${ACCENT_RGB},0.07)`,
            border: `1.5px solid rgba(${ACCENT_RGB},0.15)`,
          }}
        >
          <Icon size={22} style={{ color: ACCENT }} />
        </div>

        {/* Hover badge */}
        <div
          ref={badgeRef}
          className="opacity-0 translate-y-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-white"
          style={{ background: ACCENT, fontSize: "0.6rem" }}
        >
          {feature.tags[0]}
        </div>
      </div>

      {/* Title */}
      <h3
        className="mb-3 font-bold text-slate-900 leading-tight"
        style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem" }}
      >
        {feature.title}
      </h3>

      {/* Description */}
      <p
        className="text-slate-500 leading-relaxed mb-7 flex-1"
        style={{ fontSize: "0.875rem", fontWeight: 300 }}
      >
        {feature.description}
      </p>

      {/* Metrics row */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { val: feature.stat, lbl: feature.statLabel },
          { val: feature.metric, lbl: feature.metricLabel },
        ].map(({ val, lbl }) => (
          <div
            key={lbl}
            className="rounded-xl px-4 py-3"
            style={{
              background: `rgba(${ACCENT_RGB},0.04)`,
              border: `1px solid rgba(${ACCENT_RGB},0.1)`,
            }}
          >
            <p
              className="font-black leading-none mb-1"
              style={{ color: ACCENT, fontSize: "1.05rem" }}
            >
              {val}
            </p>
            <p className="text-slate-400 text-[10px] tracking-widest uppercase font-medium">
              {lbl}
            </p>
          </div>
        ))}
      </div>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap">
        {feature.tags.map((t) => (
          <span
            key={t}
            className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase"
            style={{
              background: `rgba(${ACCENT_RGB},0.06)`,
              color: `rgba(${ACCENT_RGB},0.85)`,
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Bottom accent line — animates on hover */}
      <div
        ref={lineRef}
        className="absolute bottom-0 left-0 right-0 h-[3px] origin-left"
        style={{ background: ACCENT, transform: "scaleX(0)" }}
      />
    </div>
  );
}

// ─── Features Section ─────────────────────────────────────────────────────────
export function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // ── Heading reveal ──────────────────────────────────────────────────
      const headEls = headRef.current?.querySelectorAll(".h-el");
      if (headEls?.length) {
        gsap.fromTo(
          headEls,
          { y: 40, opacity: 0, filter: "blur(6px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            stagger: 0.09,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // ── Accent line wipe ────────────────────────────────────────────────
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.out",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: headRef.current,
            start: "top 78%",
          },
        },
      );

      // ── Cards stagger ───────────────────────────────────────────────────
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 60, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.08,
          },
        );
      });

      // ── Counter trigger ─────────────────────────────────────────────────
      ScrollTrigger.create({
        trigger: gridRef.current,
        start: "top 75%",
        onEnter: () => setTriggered(true),
      });

      // ── Trust bar ───────────────────────────────────────────────────────
      const trustItems = trustRef.current?.querySelectorAll(".trust-item");
      if (trustItems?.length) {
        gsap.fromTo(
          trustItems,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: {
              trigger: trustRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // ── Parallax background blobs ────────────────────────────────────────
      gsap.to(".blob-tl", {
        y: -60,
        x: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: 1.5,
        },
      });
      gsap.to(".blob-br", {
        y: 60,
        x: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden py-28 md:py-36"
    >
      {/* ── Subtle background decoration ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(${ACCENT_RGB},0.13) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            opacity: 0.55,
          }}
        />
        {/* Blobs */}
        <div
          className="blob-tl absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(${ACCENT_RGB},0.06) 0%, transparent 70%)`,
          }}
        />
        <div
          className="blob-br absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(${ACCENT_RGB},0.05) 0%, transparent 70%)`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-12 xl:px-16">
        {/* ── Heading ── */}
        <div ref={headRef} className="mb-16 md:mb-20 max-w-3xl">
          {/* Eyebrow */}
          <div className="h-el flex items-center gap-3 mb-6">
            <div
              ref={lineRef}
              className="h-[3px] w-14 rounded-full origin-left"
              style={{ background: ACCENT }}
            />
            <span
              className="text-[11px] font-bold tracking-[0.22em] uppercase"
              style={{
                color: ACCENT,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Core Capabilities
            </span>
          </div>

          {/* Main title */}
          <h2
            className="h-el text-slate-900 leading-[1.05] tracking-tight mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
            }}
          >
            Why Engineers Choose <span style={{ color: ACCENT }}>SemiCore</span>
          </h2>

          {/* Subtitle */}
          <p
            className="h-el text-slate-500 leading-relaxed"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 300,
              fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)",
            }}
          >
            Purpose-built semiconductor solutions that deliver measurable
            results — from signal integrity at the die level to system-wide
            reliability in the field.
          </p>
        </div>

        {/* ── Feature cards grid ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-20"
        >
          {features.map((f, i) => (
            <FeatureCard
              key={f.number}
              feature={f}
              index={i}
              cardRef={(el) => {
                cardsRef.current[i] = el;
              }}
            />
          ))}
        </div>

        {/* ── Horizontal rule with label ── */}
        <div className="flex items-center gap-5 mb-12">
          <div className="h-px flex-1 bg-slate-100" />
          <span
            className="text-[10px] font-bold tracking-[0.25em] uppercase text-slate-400 shrink-0"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Trusted Worldwide
          </span>
          <div className="h-px flex-1 bg-slate-100" />
        </div>

        {/* ── Trust indicators ── */}
        <div ref={trustRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trustItems.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="trust-item group relative flex flex-col items-center text-center px-6 py-7 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300 cursor-default overflow-hidden"
            >
              {/* Hover fill */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                style={{ background: `rgba(${ACCENT_RGB},0.03)` }}
              />

              {/* Icon */}
              <div
                className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `rgba(${ACCENT_RGB},0.07)`,
                  border: `1.5px solid rgba(${ACCENT_RGB},0.15)`,
                }}
              >
                <Icon size={18} style={{ color: ACCENT }} />
              </div>

              {/* Value */}
              <p
                className="relative font-black text-slate-900 mb-1 leading-none"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.35rem",
                }}
              >
                {value}
              </p>

              {/* Label */}
              <p
                className="relative text-slate-400 text-[11px] tracking-widest uppercase font-medium"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {label}
              </p>

              {/* Bottom accent */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-12 rounded-full transition-all duration-400"
                style={{ background: ACCENT }}
              />
            </div>
          ))}
        </div>

        {/* ── Bottom CTA strip ── */}
        <div
          className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-5 px-8 py-6 rounded-2xl border border-slate-100"
          style={{ background: `rgba(${ACCENT_RGB},0.03)` }}
        >
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <p
              className="font-bold text-slate-900 mb-1"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.1rem",
              }}
            >
              Ready to evaluate our silicon?
            </p>
            <p className="text-slate-500 text-sm font-light">
              Request samples, datasheets, or a direct call with our
              applications team.
            </p>
          </div>
          <a
            href="/contact"
            className="group inline-flex items-center gap-2 shrink-0 px-7 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            style={{
              background: ACCENT,
              boxShadow: `0 4px 20px rgba(${ACCENT_RGB},0.3)`,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            Contact Applications Team
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>

      {/* ── Google Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;800;900&display=swap');
      `}</style>
    </section>
  );
}

export default Features;
