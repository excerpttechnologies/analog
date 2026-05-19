"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Zap,
  Cpu,
  TrendingUp,
  Shield,
  Sparkles,
  Rocket,
  Globe,
  Award,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────────────────── */

const features = [
  {
    icon: Zap,
    title: "High Performance",
    description:
      "Industry-leading speed and efficiency for demanding applications with up to 5× performance boost over previous generation.",
    accent: "#F59E0B",
    accentDim: "#92400E",
    stats: "5× Faster",
    metric: "2.5 GHz",
    metricLabel: "Clock speed",
    tag: "Speed",
  },
  {
    icon: Cpu,
    title: "Advanced Architecture",
    description:
      "State-of-the-art semiconductor design and fabrication using industry-leading 3 nm process technology.",
    accent: "#3B82F6",
    accentDim: "#1E3A8A",
    stats: "3 nm",
    metric: "100B",
    metricLabel: "Transistors",
    tag: "Precision",
  },
  {
    icon: TrendingUp,
    title: "Scalable Solutions",
    description:
      "From tiny embedded systems to enterprise-grade cloud deployments with seamless, zero-downtime integration.",
    accent: "#10B981",
    accentDim: "#064E3B",
    stats: "100% Scalable",
    metric: "Edge → Cloud",
    metricLabel: "Deployment range",
    tag: "Flexibility",
  },
  {
    icon: Shield,
    title: "Enterprise Reliability",
    description:
      "99.999 % uptime SLA backed by enterprise-grade security architecture and 24/7 global technical support.",
    accent: "#A855F7",
    accentDim: "#4C1D95",
    stats: "99.999%",
    metric: "24 / 7",
    metricLabel: "Global support",
    tag: "Trust",
  },
];

const trustItems = [
  { icon: Globe, label: "Global presence", value: "50+ countries" },
  { icon: Award, label: "Industry awards", value: "25+ awards" },
  { icon: Rocket, label: "Happy clients", value: "500+ clients" },
  { icon: Shield, label: "Certified security", value: "ISO 27001" },
];

const particles = [
  { top: "12%", left: "8%", d: 5.2, delay: 0 },
  { top: "22%", left: "82%", d: 7.1, delay: 1.1 },
  { top: "44%", left: "18%", d: 6.4, delay: 2.0 },
  { top: "58%", left: "72%", d: 8.3, delay: 0.5 },
  { top: "74%", left: "12%", d: 5.7, delay: 1.6 },
  { top: "88%", left: "88%", d: 7.8, delay: 2.4 },
  { top: "8%", left: "48%", d: 6.1, delay: 0.8 },
  { top: "33%", left: "62%", d: 5.9, delay: 1.3 },
  { top: "52%", left: "38%", d: 7.4, delay: 1.9 },
  { top: "68%", left: "28%", d: 6.6, delay: 2.2 },
  { top: "18%", left: "66%", d: 8.0, delay: 0.3 },
  { top: "78%", left: "55%", d: 5.5, delay: 0.7 },
  { top: "40%", left: "92%", d: 7.2, delay: 1.5 },
  { top: "62%", left: "5%", d: 6.9, delay: 2.7 },
  { top: "95%", left: "42%", d: 5.3, delay: 1.0 },
];

/* ─── Hooks ─────────────────────────────────────────────────── */

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.12) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

function useCardInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold: 0.1 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function useCounter(target: number, active: boolean, duration = 1300) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const raf = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [active, target, duration]);
  return val;
}

/* ─── Feature card ──────────────────────────────────────────── */

interface FeatureCardProps {
  f: (typeof features)[0];
  index: number;
}

function FeatureCard({ f, index }: FeatureCardProps) {
  const { ref, inView } = useCardInView();
  const [hovered, setHovered] = useState(false);
  const Icon = f.icon;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? "translateY(0) scale(1)"
          : "translateY(40px) scale(0.95)",
        transition: `opacity 0.6s cubic-bezier(.4,0,.2,1) ${index * 100}ms,
                     transform 0.6s cubic-bezier(.4,0,.2,1) ${index * 100}ms`,
      }}
    >
      {/* Outer glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-all duration-500"
        style={{
          boxShadow: hovered ? `0 0 40px ${f.accent}35` : "none",
        }}
      />

      {/* Card */}
      <div
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border bg-slate-900/80 backdrop-blur-sm transition-all duration-500"
        style={{
          borderColor: hovered ? `${f.accent}50` : "rgba(255,255,255,0.07)",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
        }}
      >
        {/* Animated top bar */}
        <div
          className="h-[2px] w-full transition-all duration-500"
          style={{
            background: `linear-gradient(90deg, ${f.accentDim}00, ${f.accent}, ${f.accentDim}00)`,
            opacity: hovered ? 1 : 0.25,
          }}
        />

        {/* Radial bg wash */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(ellipse at top left, ${f.accent}12 0%, transparent 65%)`,
            opacity: hovered ? 1 : 0,
          }}
        />

        <div className="relative flex flex-1 flex-col p-6">
          {/* Tag + stats badge row */}
          <div className="mb-5 flex items-start justify-between">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-xl border transition-all duration-400"
              style={{
                background: hovered
                  ? `linear-gradient(135deg, ${f.accentDim}cc, ${f.accent}cc)`
                  : `${f.accent}15`,
                borderColor: hovered ? `${f.accent}60` : `${f.accent}25`,
                boxShadow: hovered ? `0 8px 24px ${f.accent}40` : "none",
                transform: hovered
                  ? "scale(1.08) rotate(-3deg)"
                  : "scale(1) rotate(0deg)",
              }}
            >
              <Icon
                className="h-7 w-7 transition-colors duration-300"
                style={{ color: hovered ? "#fff" : f.accent }}
              />
            </div>

            {/* Floating stats badge */}
            <div
              className="flex flex-col items-end gap-0.5 transition-all duration-400"
              style={{
                opacity: hovered ? 1 : 0,
                transform: hovered ? "translateY(0)" : "translateY(8px)",
              }}
            >
              <span
                className="rounded-lg px-2.5 py-1 text-xs font-bold"
                style={{
                  background: `linear-gradient(135deg, ${f.accentDim}cc, ${f.accent}cc)`,
                  color: "#fff",
                }}
              >
                {f.stats}
              </span>
            </div>
          </div>

          {/* Tag pill */}
          <div className="mb-3">
            <span
              className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest"
              style={{
                background: `${f.accent}15`,
                color: f.accent,
                border: `1px solid ${f.accent}30`,
              }}
            >
              {f.tag}
            </span>
          </div>

          {/* Title */}
          <h3
            className="mb-2 text-xl font-bold transition-colors duration-300"
            style={{ color: hovered ? f.accent : "#F1F5F9" }}
          >
            {f.title}
          </h3>

          {/* Description */}
          <p className="mb-5 flex-1 text-sm leading-relaxed text-slate-400">
            {f.description}
          </p>

          {/* Metric row */}
          <div
            className="mt-auto flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-300"
            style={{
              background: hovered ? `${f.accent}12` : "rgba(255,255,255,0.03)",
              border: `1px solid ${hovered ? f.accent + "30" : "rgba(255,255,255,0.06)"}`,
            }}
          >
            <span className="text-xs text-slate-500">{f.metricLabel}</span>
            <span
              className="text-sm font-bold transition-colors duration-300"
              style={{ color: hovered ? f.accent : "#94A3B8" }}
            >
              {f.metric}
            </span>
          </div>

          {/* Animated bottom bar */}
          <div
            className="absolute bottom-0 left-0 h-[2px] rounded-full transition-all duration-500"
            style={{
              width: hovered ? "100%" : "0%",
              background: `linear-gradient(90deg, ${f.accentDim}, ${f.accent})`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Trust item ────────────────────────────────────────────── */

function TrustItem({
  item,
  inView,
  delay,
}: {
  item: (typeof trustItems)[0];
  inView: boolean;
  delay: number;
}) {
  const num = parseInt(item.value.replace(/\D/g, ""), 10);
  const suffix = item.value.replace(/[0-9]/g, "");
  const counted = useCounter(num, inView, 1200);
  const Icon = item.icon;

  return (
    <div
      className="group flex flex-col items-center gap-2 text-center"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-cyan-500/40 group-hover:bg-cyan-500/10">
        <Icon className="h-5 w-5 text-slate-400 transition-colors duration-300 group-hover:text-cyan-400" />
      </div>
      <p className="text-xs text-slate-500">{item.label}</p>
      <p className="text-sm font-bold text-white">
        {inView ? counted : 0}
        {suffix}
      </p>
    </div>
  );
}

/* ─── Main ──────────────────────────────────────────────────── */

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(sectionRef, 0.08);
  const trustInView = useInView(trustRef as React.RefObject<HTMLElement>, 0.3);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <section
      ref={sectionRef}
      className="relative font-['Instrument_Sans',sans-serif] overflow-hidden bg-slate-950 py-12 md:py-36"
    >
      {/* ── Background ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(56,189,248,1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(56,189,248,1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Color orbs */}
        <div className="absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-3xl" />

        {/* Floating particles */}
        {mounted && (
          <div className="absolute inset-0 overflow-hidden">
            {particles.map((p, i) => (
              <div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-cyan-400/60"
                style={{
                  top: p.top,
                  left: p.left,
                  animation: `featFloat ${p.d}s ease-in-out infinite`,
                  animationDelay: `${p.delay}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        {/* ── Header ── */}
        <div
          className="mb-20 text-center"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(30px)",
            filter: headerInView ? "blur(0px)" : "blur(6px)",
            transition:
              "opacity 0.8s ease, transform 0.8s ease, filter 0.8s ease",
          }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan-400 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Core capabilities
            <ChevronRight className="h-3 w-3 text-white/30" />
          </div>

          <h2 className="mb-5 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            Why choose{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Analogchips
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
            Experience the future of semiconductor technology — built for
            performance, engineered for scale, trusted by enterprises worldwide.
          </p>
        </div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <FeatureCard key={f.title} f={f} index={i} />
          ))}
        </div>

        {/* ── Trust bar ── */}
        <div
          ref={trustRef}
          className="mt-16 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm"
        >
          {/* Top stripe */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

          <div className="grid grid-cols-2 gap-6 px-8 py-10 md:grid-cols-4">
            {trustItems.map((item, i) => (
              <TrustItem
                key={item.label}
                item={item}
                inView={trustInView}
                delay={i * 100}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes featFloat {
          0%, 100% { transform: translate(0, 0); }
          25%  { transform: translate(10px, -18px); }
          50%  { transform: translate(20px, 0); }
          75%  { transform: translate(10px, 18px); }
        }
      `}</style>
    </section>
  );
}
