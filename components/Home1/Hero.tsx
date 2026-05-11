"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import gsap from "gsap";

// ─── Constants ────────────────────────────────────────────────────────────────
const ACCENT = "#0f62fe";
const ACCENT_RGB = "15,98,254";
const INTERVAL = 6800;

// ─── Slide Data ───────────────────────────────────────────────────────────────
interface Slide {
  id: number;
  index: string;
  category: string;
  title: string;
  titleLines: string[];
  subtitle: string;
  tag: string;
  cta: string;
  ctaHref: string;
  image: string;
  imageFocal?: string;
  spec: { label: string; value: string }[];
}

const slides: Slide[] = [
  {
    id: 1,
    index: "01",
    category: "Phased Array · 5G · Satcom",
    title: "RF Beamformers",
    titleLines: ["RF Beam-", "formers"],
    subtitle:
      "Quad-channel TDD beamformers with SPI control for phase and gain in radar, Satcom and 5G phased array systems.",
    tag: "ADAR Series",
    cta: "Explore Products",
    ctaHref: "/products",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1000&q=85&fit=crop",
    imageFocal: "center center",
    spec: [
      { label: "Channels", value: "4-Ch TDD" },
      { label: "Interface", value: "SPI / I²C" },
      { label: "Band", value: "24–40 GHz" },
    ],
  },
  {
    id: 2,
    index: "02",
    category: "Active Antenna · Wireless",
    title: "RF Front End Modules",
    titleLines: ["RF Front", "End Modules"],
    subtitle:
      "High-linearity FEMs for active antenna systems — ultra-low noise, wide bandwidth, seamless next-gen integration.",
    tag: "ADRF Series",
    cta: "View FEM Lineup",
    ctaHref: "/products/fem",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&q=85&fit=crop",
    imageFocal: "center 40%",
    spec: [
      { label: "Noise Figure", value: "< 1.8 dB" },
      { label: "P1dB", value: "+28 dBm" },
      { label: "Bandwidth", value: "0.5–6 GHz" },
    ],
  },
  {
    id: 3,
    index: "03",
    category: "Power Management · Timing",
    title: "Power & Clock Management",
    titleLines: ["Power &", "Clock Mgmt"],
    subtitle:
      "Ultra-low noise LDOs and precision XOs for timing and power-sensitive applications across communications and aerospace.",
    tag: "ADM / HMC Series",
    cta: "See Specifications",
    ctaHref: "/products/power",
    image:
      "https://img3.wallspic.com/crops/5/7/1/8/6/168175/168175-the_merchandise_mart-management-ernst_young-management_consulting-business-1471x2943.jpg",
    imageFocal: "center center",
    spec: [
      { label: "Noise", value: "< 1 µV rms" },
      { label: "Jitter", value: "< 1 ps RMS" },
      { label: "PSRR", value: "80 dB" },
    ],
  },
  {
    id: 4,
    index: "04",
    category: "Embedded Control · IoT",
    title: "Microcontrollers",
    titleLines: ["Micro-", "controllers"],
    subtitle:
      "32-bit general-purpose MCUs for real-time edge control — ultra-low power, rich peripherals, industrial-grade reliability.",
    tag: "ADUCM Series",
    cta: "Explore MCUs",
    ctaHref: "/products/mcu",
    image:
      "https://images.unsplash.com/photo-1591405351990-4726e331f141?w=1000&q=85&fit=crop",
    imageFocal: "center 30%",
    spec: [
      { label: "Core", value: "32-bit ARM" },
      { label: "Sleep", value: "< 900 nA" },
      { label: "Flash", value: "Up to 1 MB" },
    ],
  },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────
export function Hero() {
  const wrapRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const progRef = useRef<HTMLDivElement>(null);

  const [idx, setIdx] = useState(0);
  const [busy, setBusy] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const slide = slides[idx];

  // ── navigate ──────────────────────────────────────────────────────────────
  const goTo = useCallback(
    (next: number) => {
      if (busy || next === idx) return;
      setBusy(true);

      const textEls = textRef.current?.querySelectorAll(".t");
      const imgEl = imgRef.current;

      gsap
        .timeline({
          onComplete: () => {
            setIdx(next);
            setBusy(false);
          },
        })
        .to(
          textEls ?? [],
          {
            y: -16,
            opacity: 0,
            filter: "blur(4px)",
            stagger: 0.03,
            duration: 0.25,
            ease: "power2.in",
          },
          0,
        )
        .to(
          imgEl ?? [],
          {
            scale: 1.05,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
          },
          0,
        );
    },
    [busy, idx],
  );

  const goNext = useCallback(
    () => goTo((idx + 1) % slides.length),
    [goTo, idx],
  );
  const goPrev = useCallback(
    () => goTo((idx - 1 + slides.length) % slides.length),
    [goTo, idx],
  );

  // ── auto-advance ──────────────────────────────────────────────────────────
  useEffect(() => {
    timerRef.current = setInterval(goNext, INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [goNext]);

  // ── reveal ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const textEls = textRef.current?.querySelectorAll(".t");
    const imgEl = imgRef.current;
    const prog = progRef.current;

    const ctx = gsap.context(() => {
      if (textEls?.length) {
        gsap.fromTo(
          textEls,
          { y: 24, opacity: 0, filter: "blur(6px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            stagger: 0.055,
            duration: 0.65,
            ease: "power3.out",
          },
        );
      }
      if (imgEl) {
        gsap.fromTo(
          imgEl,
          { scale: 1.07, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
        );
      }
      if (prog) {
        gsap.fromTo(
          prog,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: INTERVAL / 1000,
            ease: "none",
            transformOrigin: "left center",
          },
        );
      }
    });
    return () => ctx.revert();
  }, [idx]);

  // ── mount ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".m", {
        opacity: 0,
        y: 28,
        duration: 0.85,
        stagger: 0.07,
        ease: "power3.out",
        delay: 0.1,
      });
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrapRef}
      className="relative w-full min-h-screen bg-white flex flex-col overflow-hidden"
    >
      {/* ── Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@700;800;900&display=swap');
        @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .hero-body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .hero-display { font-family: 'Playfair Display', Georgia, serif; }
      `}</style>

      {/* ── Split grid ── */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_560px] min-h-screen hero-body">
        {/* ══ LEFT PANEL ══════════════════════════════════════════════════════ */}
        <div className="relative flex flex-col justify-between px-8 md:px-14 xl:px-20 py-12 lg:py-14 border-r border-slate-100">
          {/* Index + category */}
          <div className="m flex items-center gap-4">
            <span
              className="text-[11px] font-bold tracking-[0.22em] uppercase"
              style={{ color: ACCENT }}
            >
              {slide.index}
            </span>
            <div className="h-px w-8 bg-slate-300" />
            <span className="text-[11px] text-slate-400 tracking-[0.15em] uppercase font-medium">
              {slide.category}
            </span>
          </div>

          {/* ── Text block ── */}
          <div
            ref={textRef}
            className="flex-1 flex flex-col justify-center py-10 lg:py-0 lg:mt-10 lg:mb-8"
          >
            {/* Headline — Playfair Display, editorial serif */}
            <h1
              className="hero-display mb-6 leading-[1.0] tracking-tight"
              style={{ fontSize: "clamp(3rem, 7.5vw, 6rem)", fontWeight: 900 }}
            >
              {slide.titleLines.map((line, i) => (
                <div key={i} className="t block text-slate-900">
                  {line}
                </div>
              ))}
              {/* Accent rule */}
              <div
                className="t mt-3 h-1 w-16 rounded-full"
                style={{ background: ACCENT }}
              />
            </h1>

            {/* Tag */}
            <div className="t mb-5">
              <span
                className="inline-block px-3 py-1 text-[10px] font-bold tracking-[0.22em] uppercase rounded-full"
                style={{
                  background: `rgba(${ACCENT_RGB},0.08)`,
                  color: ACCENT,
                }}
              >
                {slide.tag}
              </span>
            </div>

            {/* Subtitle */}
            <p
              className="t text-slate-500 leading-[1.75] mb-10 max-w-[480px]"
              style={{
                fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
                fontWeight: 300,
              }}
            >
              {slide.subtitle}
            </p>

            {/* Specs */}
            <div className="t grid grid-cols-3 gap-5 mb-10 max-w-[480px]">
              {slide.spec.map(({ label, value }) => (
                <div key={label}>
                  <div className="h-px bg-slate-200 mb-3" />
                  <p className="text-[10px] text-slate-400 tracking-[0.18em] uppercase mb-1.5 font-medium">
                    {label}
                  </p>
                  <p
                    className="font-bold text-slate-900"
                    style={{ fontSize: "0.88rem" }}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="t flex flex-wrap gap-3">
              <Link
                href={slide.ctaHref}
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
                style={{
                  background: ACCENT,
                  boxShadow: `0 4px 22px rgba(${ACCENT_RGB},0.3)`,
                  fontSize: "0.875rem",
                }}
              >
                {slide.cta}
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-lg font-semibold text-sm text-slate-600 border border-slate-200 hover:border-slate-400 hover:text-slate-900 transition-all duration-200"
                style={{ fontSize: "0.875rem" }}
              >
                All Products
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>

          {/* ── Bottom nav ── */}
          <div className="m flex items-center justify-between">
            {/* Dot pills */}
            <div className="flex items-center gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => goTo(i)}
                  aria-label={`Slide ${i + 1}`}
                  className="transition-all duration-500 rounded-full"
                  style={{
                    width: i === idx ? 28 : 8,
                    height: 8,
                    background: i === idx ? ACCENT : "#e2e8f0",
                  }}
                />
              ))}
            </div>

            {/* Counter + arrows */}
            <div className="flex items-center gap-2">
              <span
                className="text-[11px] font-mono text-slate-400 mr-1 tabular-nums"
                style={{ letterSpacing: "0.05em" }}
              >
                {String(idx + 1).padStart(2, "0")} /{" "}
                {String(slides.length).padStart(2, "0")}
              </span>
              {[
                { fn: goPrev, Icon: ChevronLeft, label: "Prev" },
                { fn: goNext, Icon: ChevronRight, label: "Next" },
              ].map(({ fn, Icon, label }) => (
                <button
                  key={label}
                  onClick={fn}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-slate-900 hover:text-slate-900 transition-all duration-200 hover:scale-110"
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ══ RIGHT PANEL — Photo ═════════════════════════════════════════════ */}
        <div className="relative overflow-hidden bg-slate-100 min-h-[400px] lg:min-h-0">
          {/* Full-bleed image */}
          <div ref={imgRef} className="absolute inset-0">
            <img
              key={slide.id}
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              style={{ objectPosition: slide.imageFocal ?? "center center" }}
            />
            {/* Left-edge fade to white — blends into left panel */}
            <div
              className="absolute inset-y-0 left-0 w-28 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.55) 0%, transparent 100%)",
              }}
            />
            {/* Bottom dark scrim for overlay text */}
            <div
              className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
              style={{
                background:
                  "linear-gradient(0deg, rgba(0,0,0,0.55) 0%, transparent 100%)",
              }}
            />
          </div>

          {/* Slide number badge — top right */}
          <div
            className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white hero-body"
            style={{
              background: ACCENT,
              boxShadow: `0 4px 16px rgba(${ACCENT_RGB},0.45)`,
            }}
          >
            {slide.index}
          </div>

          {/* Bottom label */}
          <div className="absolute bottom-6 left-6 z-10 hero-body">
            <p
              className="text-white/55 mb-1 font-medium tracking-[0.15em] uppercase"
              style={{ fontSize: "0.65rem" }}
            >
              {slide.category}
            </p>
            <p
              className="text-white font-bold leading-tight hero-display"
              style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)" }}
            >
              {slide.title}
            </p>
          </div>

          {/* Vertical branding strip */}
          <div
            className="absolute right-0 top-0 bottom-0 w-9 z-10 flex items-center justify-center"
            style={{
              background: "rgba(0,0,0,0.18)",
              backdropFilter: "blur(2px)",
            }}
          >
            <span
              className="text-white/40 font-medium tracking-[0.28em] uppercase hero-body"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                fontSize: "0.6rem",
              }}
            >
              SemiCore Technologies
            </span>
          </div>
        </div>
      </div>

      {/* ── Ticker strip ── */}
      <div
        className="relative z-20 border-t border-slate-100 overflow-hidden flex items-stretch hero-body"
        style={{ height: 38 }}
      >
        {/* Label tab */}
        <div
          className="shrink-0 flex items-center px-5 text-[10px] font-bold tracking-[0.22em] uppercase text-white"
          style={{ background: ACCENT }}
        >
          Products
        </div>

        {/* Scrolling text */}
        <div className="flex-1 overflow-hidden flex items-center">
          <div
            className="flex whitespace-nowrap"
            style={{ animation: "ticker 30s linear infinite" }}
          >
            {[...slides, ...slides].map((s, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-3 px-8 text-[10px] tracking-[0.18em] text-slate-400 uppercase font-medium"
              >
                <span
                  className="w-1 h-1 rounded-full inline-block flex-shrink-0"
                  style={{ background: ACCENT }}
                />
                {s.tag} — {s.category}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div className="h-[2px] bg-slate-100 relative overflow-hidden">
        <div
          ref={progRef}
          className="absolute inset-y-0 left-0 w-full origin-left"
          style={{ background: ACCENT }}
        />
      </div>
    </section>
  );
}

export default Hero;
