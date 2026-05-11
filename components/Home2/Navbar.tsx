"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import {
  Menu,
  X,
  Home,
  Info,
  Package,
  FileText,
  Briefcase,
  Mail,
  LogIn,
  Cpu,
  Zap,
  Shield,
  Microchip,
  Crown,
  Radio,
  Battery,
  Clock,
  Building,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import gsap from "gsap";

/* ─────────────────────────────
   TYPES
───────────────────────────── */
interface SubNavItem {
  label: string;
  href: string;
  description?: string;
  icon?: any;
  tag?: string;
  stat?: string;
}
interface NavItem {
  label: string;
  href?: string;
  icon?: any;
  subitems?: SubNavItem[];
  accent?: string;
}

/* ─────────────────────────────
   DATA
───────────────────────────── */
const navigationData: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  {
    label: "Product",
    icon: Package,
    accent: "#f97316",
    subitems: [
      {
        label: "RF Beamformers",
        href: "/products/rf-beamformers",
        description: "Advanced phased array solutions",
        icon: Radio,
        tag: "NEW",
        stat: "5G/6G Ready",
      },
      {
        label: "RF Front End Modules",
        href: "/products/rf-front-end",
        description: "Integrated RF solutions",
        icon: Zap,
        stat: "< 2dB NF",
      },
      {
        label: "Power & Clock Mgmt",
        href: "/products/power-management",
        description: "Efficient power solutions",
        icon: Battery,
        stat: "98% Eff.",
      },
      {
        label: "Microcontrollers",
        href: "/products/microcontrollers",
        description: "High-performance MCUs",
        icon: Cpu,
        tag: "PRO",
        stat: "1GHz+",
      },
    ],
  },
  {
    label: "Silicon IP",
    icon: Microchip,
    accent: "#22d3ee",
    subitems: [
      {
        label: "Multi-Protocol SERDES",
        href: "/silicon-ip/serdes",
        description: "112G PAM4 SerDes",
        icon: Zap,
        tag: "HOT",
        stat: "112Gbps",
      },
      {
        label: "Phase Locked Loop",
        href: "/silicon-ip/pll",
        description: "Ultra-low jitter PLL",
        icon: Clock,
        stat: "< 50fs RMS",
      },
      {
        label: "Analog IPs",
        href: "/silicon-ip/analog",
        description: "Precision analog circuits",
        icon: Shield,
        stat: "16-bit ADC",
      },
      {
        label: "Digital IPs",
        href: "/silicon-ip/digital",
        description: "DSP and compute cores",
        icon: Cpu,
        stat: "TSMC N3E",
      },
    ],
  },
  {
    label: "Company",
    icon: Building,
    accent: "#a78bfa",
    subitems: [
      {
        label: "About Us",
        href: "/about",
        description: "Our story and mission",
        icon: Info,
        stat: "Est. 2018",
      },
      {
        label: "Leadership",
        href: "/leadership",
        description: "Meet our team",
        icon: Crown,
        stat: "12 Leaders",
      },
      {
        label: "Career",
        href: "/careers",
        description: "Join our team",
        icon: Briefcase,
        tag: "HIRING",
        stat: "24 Roles",
      },
    ],
  },
  { label: "Blogs", href: "/blog", icon: FileText },
  { label: "Contact Us", href: "/contact", icon: Mail },
];

/* ─────────────────────────────
   SPLIT-PANEL MEGA MENU
───────────────────────────── */
function SplitMegaMenu({
  item,
  isActive,
}: {
  item: NavItem;
  isActive: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const accent = item.accent ?? "#f97316";

  const enter = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };
  const leave = () => {
    timer.current = setTimeout(() => setOpen(false), 160);
  };

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const activeSub = item.subitems?.[activeIdx];

  return (
    <div
      ref={ref}
      onMouseEnter={enter}
      onMouseLeave={leave}
      className="relative"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group relative flex items-center gap-2 px-4 py-2 text-[12px] font-mono font-semibold tracking-[0.08em] uppercase transition-all duration-200"
        style={{ color: open || isActive ? accent : "rgba(255,255,255,0.65)" }}
      >
        {/* left bracket */}
        <span
          className="text-[14px] font-light transition-all duration-200 opacity-0 group-hover:opacity-100"
          style={{ color: accent }}
        >
          [
        </span>
        {item.label}
        {/* right bracket */}
        <span
          className="text-[14px] font-light transition-all duration-200 opacity-0 group-hover:opacity-100"
          style={{ color: accent }}
        >
          ]
        </span>

        {/* active dot */}
        {isActive && (
          <span
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
            style={{ background: accent }}
          />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scaleY: 0.94 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: 8, scaleY: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              transformOrigin: "top center",
              filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.7))",
            }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-5 z-50 w-[680px]"
          >
            {/* connector line */}
            <div className="flex justify-center">
              <div
                className="w-px h-4"
                style={{
                  background: `linear-gradient(to bottom, transparent, ${accent}60)`,
                }}
              />
            </div>

            <div
              className="relative overflow-hidden"
              style={{
                background: "#0c0f14",
                border: `1px solid ${accent}25`,
                borderRadius: "4px",
              }}
            >
              {/* scan-line top */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background: `linear-gradient(to right, transparent, ${accent}80, transparent)`,
                }}
              />

              {/* corner brackets decoration */}
              <div
                className="absolute top-2 left-2 w-3 h-3"
                style={{
                  borderTop: `1px solid ${accent}60`,
                  borderLeft: `1px solid ${accent}60`,
                }}
              />
              <div
                className="absolute top-2 right-2 w-3 h-3"
                style={{
                  borderTop: `1px solid ${accent}60`,
                  borderRight: `1px solid ${accent}60`,
                }}
              />
              <div
                className="absolute bottom-2 left-2 w-3 h-3"
                style={{
                  borderBottom: `1px solid ${accent}60`,
                  borderLeft: `1px solid ${accent}60`,
                }}
              />
              <div
                className="absolute bottom-2 right-2 w-3 h-3"
                style={{
                  borderBottom: `1px solid ${accent}60`,
                  borderRight: `1px solid ${accent}60`,
                }}
              />

              {/* header bar */}
              <div
                className="flex items-center justify-between px-5 py-3 border-b"
                style={{
                  borderColor: `${accent}18`,
                  background: `${accent}06`,
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-sm flex items-center justify-center"
                    style={{ background: accent }}
                  >
                    <item.icon className="w-3 h-3 text-black" />
                  </div>
                  <span
                    className="font-mono text-[10px] tracking-[0.2em] uppercase"
                    style={{ color: `${accent}99` }}
                  >
                    {item.label} — {item.subitems?.length} modules
                  </span>
                </div>
                <span className="font-mono text-[9px] tracking-wider text-white/15">
                  SYS:OK
                </span>
              </div>

              {/* body: left list + right detail */}
              <div className="flex">
                {/* LEFT — item list */}
                <div
                  className="w-[55%] p-3 space-y-0.5 border-r"
                  style={{ borderColor: `${accent}12` }}
                >
                  {item.subitems?.map((sub, idx) => (
                    <Link
                      key={idx}
                      href={sub.href}
                      onClick={() => setOpen(false)}
                      onMouseEnter={() => setActiveIdx(idx)}
                      className="group/row flex items-center gap-3 px-3 py-3 rounded-sm transition-all duration-150 relative overflow-hidden"
                      style={{
                        background:
                          activeIdx === idx ? `${accent}10` : "transparent",
                        borderLeft:
                          activeIdx === idx
                            ? `2px solid ${accent}`
                            : "2px solid transparent",
                      }}
                    >
                      {/* row number */}
                      <span className="font-mono text-[9px] text-white/15 w-4 shrink-0">
                        {String(idx + 1).padStart(2, "0")}
                      </span>

                      <div
                        className="w-8 h-8 rounded-sm flex items-center justify-center shrink-0 transition-all duration-150"
                        style={{
                          background:
                            activeIdx === idx
                              ? `${accent}20`
                              : "rgba(255,255,255,0.04)",
                          border: `1px solid ${activeIdx === idx ? `${accent}40` : "rgba(255,255,255,0.06)"}`,
                        }}
                      >
                        <sub.icon
                          className="w-3.5 h-3.5 transition-colors"
                          style={{
                            color:
                              activeIdx === idx
                                ? accent
                                : "rgba(255,255,255,0.35)",
                          }}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className="text-[12.5px] font-semibold tracking-tight transition-colors"
                            style={{
                              color:
                                activeIdx === idx
                                  ? "#fff"
                                  : "rgba(255,255,255,0.65)",
                            }}
                          >
                            {sub.label}
                          </span>
                          {sub.tag && (
                            <span
                              className="font-mono text-[8px] font-bold tracking-[0.15em] px-1.5 py-0.5 rounded-sm"
                              style={{
                                background: `${accent}22`,
                                color: accent,
                              }}
                            >
                              {sub.tag}
                            </span>
                          )}
                        </div>
                      </div>

                      <ChevronRight
                        className="w-3 h-3 shrink-0 transition-all duration-150"
                        style={{
                          color: activeIdx === idx ? accent : "transparent",
                          transform:
                            activeIdx === idx
                              ? "translateX(0)"
                              : "translateX(-4px)",
                        }}
                      />
                    </Link>
                  ))}
                </div>

                {/* RIGHT — detail panel */}
                <div className="w-[45%] p-5 flex flex-col justify-between">
                  <AnimatePresence mode="wait">
                    {activeSub && (
                      <motion.div
                        key={activeIdx}
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.15 }}
                        className="flex flex-col gap-4"
                      >
                        {/* icon large */}
                        <div
                          className="w-12 h-12 rounded-sm flex items-center justify-center"
                          style={{
                            background: `${accent}15`,
                            border: `1px solid ${accent}30`,
                          }}
                        >
                          <activeSub.icon
                            className="w-6 h-6"
                            style={{ color: accent }}
                          />
                        </div>

                        {/* label */}
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <h3 className="text-[15px] font-bold text-white tracking-tight">
                              {activeSub.label}
                            </h3>
                            {activeSub.tag && (
                              <span
                                className="font-mono text-[8px] font-bold tracking-[0.15em] px-1.5 py-0.5 rounded-sm"
                                style={{
                                  background: `${accent}22`,
                                  color: accent,
                                }}
                              >
                                {activeSub.tag}
                              </span>
                            )}
                          </div>
                          <p className="text-[12px] leading-relaxed text-white/40">
                            {activeSub.description}
                          </p>
                        </div>

                        {/* stat chip */}
                        {activeSub.stat && (
                          <div
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm w-fit"
                            style={{
                              background: "rgba(255,255,255,0.04)",
                              border: "1px solid rgba(255,255,255,0.08)",
                            }}
                          >
                            <span className="font-mono text-[9px] tracking-[0.12em] text-white/30 uppercase">
                              Spec
                            </span>
                            <span
                              className="font-mono text-[11px] font-bold"
                              style={{ color: accent }}
                            >
                              {activeSub.stat}
                            </span>
                          </div>
                        )}

                        {/* CTA */}
                        <Link
                          href={activeSub.href}
                          onClick={() => setOpen(false)}
                          className="group/cta flex items-center gap-2 mt-auto"
                        >
                          <span
                            className="font-mono text-[10px] tracking-[0.12em] uppercase transition-colors"
                            style={{ color: `${accent}80` }}
                          >
                            Learn more
                          </span>
                          <ArrowUpRight
                            className="w-3 h-3 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                            style={{ color: `${accent}80` }}
                          />
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* scan-line bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{
                  background: `linear-gradient(to right, transparent, ${accent}30, transparent)`,
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────
   MOBILE DRAWER  (dark panel from left)
───────────────────────────── */
function MobileDrawer({
  open,
  onClose,
  isActive,
  isParentActive,
}: {
  open: boolean;
  onClose: () => void;
  isActive: (h: string) => boolean;
  isParentActive: (i: NavItem) => boolean;
}) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 md:hidden"
            style={{
              background: "rgba(0,0,0,0.75)",
              backdropFilter: "blur(4px)",
            }}
          />

          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 250 }}
            className="fixed left-0 top-0 bottom-0 z-50 md:hidden flex flex-col w-[310px]"
            style={{
              background: "#080b10",
              borderRight: "1px solid rgba(255,255,255,0.07)",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {/* top scan line */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(to right, #f9731640, #22d3ee40, transparent)",
              }}
            />

            {/* header */}
            <div className="flex items-center justify-between px-5 py-5 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-sm bg-[#f97316] flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-white tracking-tight">
                    ANALOG
                  </p>
                  <p className="text-[8px] font-mono tracking-[0.2em] text-white/30 uppercase">
                    Navigation
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-sm border border-white/10 flex items-center justify-center hover:border-white/20 transition-all"
              >
                <X className="w-3.5 h-3.5 text-white/50" />
              </button>
            </div>

            {/* status bar */}
            <div className="px-5 py-2 border-b border-white/[0.04] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[9px] tracking-[0.15em] text-white/20 uppercase">
                System operational
              </span>
            </div>

            {/* nav */}
            <div className="flex-1 overflow-y-auto py-3">
              {navigationData.map((item, index) => {
                const active = item.href
                  ? isActive(item.href)
                  : isParentActive(item);
                const isExp = expanded === index;
                const accent = item.accent ?? "#f97316";

                if (item.subitems) {
                  return (
                    <div key={index}>
                      <button
                        onClick={() => setExpanded(isExp ? null : index)}
                        className="w-full flex items-center justify-between px-5 py-3.5 group transition-all duration-150 hover:bg-white/[0.03]"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[9px] text-white/15">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div
                            className="w-7 h-7 rounded-sm flex items-center justify-center transition-all"
                            style={{
                              background:
                                isExp || active
                                  ? `${accent}18`
                                  : "rgba(255,255,255,0.04)",
                              border: `1px solid ${isExp || active ? `${accent}35` : "rgba(255,255,255,0.06)"}`,
                            }}
                          >
                            <item.icon
                              className="w-3.5 h-3.5 transition-colors"
                              style={{
                                color:
                                  isExp || active
                                    ? accent
                                    : "rgba(255,255,255,0.35)",
                              }}
                            />
                          </div>
                          <span
                            className="font-mono text-[11px] tracking-[0.08em] uppercase font-semibold"
                            style={{
                              color:
                                active || isExp
                                  ? "#fff"
                                  : "rgba(255,255,255,0.5)",
                            }}
                          >
                            {item.label}
                          </span>
                        </div>
                        <motion.div
                          animate={{ rotate: isExp ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRight className="w-3.5 h-3.5 text-white/20" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {isExp && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div
                              className="mx-5 mb-2 rounded-sm overflow-hidden"
                              style={{
                                background: "rgba(255,255,255,0.02)",
                                border: `1px solid ${accent}15`,
                              }}
                            >
                              {item.subitems.map((sub, idx) => (
                                <Link
                                  key={idx}
                                  href={sub.href}
                                  onClick={onClose}
                                  className="group flex items-center gap-3 px-4 py-3 border-b last:border-0 transition-all hover:bg-white/[0.04]"
                                  style={{
                                    borderColor: "rgba(255,255,255,0.04)",
                                  }}
                                >
                                  <sub.icon className="w-3.5 h-3.5 shrink-0 text-white/25 group-hover:text-white/60 transition-colors" />
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-[12px] font-medium text-white/55 group-hover:text-white/90 transition-colors">
                                        {sub.label}
                                      </span>
                                      {sub.tag && (
                                        <span
                                          className="font-mono text-[8px] px-1 py-0.5 rounded-sm"
                                          style={{
                                            background: `${accent}20`,
                                            color: accent,
                                          }}
                                        >
                                          {sub.tag}
                                        </span>
                                      )}
                                    </div>
                                    {sub.stat && (
                                      <span className="font-mono text-[9px] text-white/20">
                                        {sub.stat}
                                      </span>
                                    )}
                                  </div>
                                  <ArrowUpRight className="w-3 h-3 text-white/15 group-hover:text-white/40 transition-colors" />
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={index}
                    href={item.href!}
                    onClick={onClose}
                    className="flex items-center gap-3 px-5 py-3.5 transition-all hover:bg-white/[0.03] group"
                    style={{
                      borderLeft: active
                        ? "2px solid #f97316"
                        : "2px solid transparent",
                    }}
                  >
                    <span className="font-mono text-[9px] text-white/15">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div
                      className="w-7 h-7 rounded-sm flex items-center justify-center"
                      style={{
                        background: active
                          ? "rgba(249,115,22,0.15)"
                          : "rgba(255,255,255,0.04)",
                        border: `1px solid ${active ? "rgba(249,115,22,0.3)" : "rgba(255,255,255,0.06)"}`,
                      }}
                    >
                      <item.icon
                        className="w-3.5 h-3.5"
                        style={{
                          color: active ? "#f97316" : "rgba(255,255,255,0.35)",
                        }}
                      />
                    </div>
                    <span
                      className="font-mono text-[11px] tracking-[0.08em] uppercase font-semibold"
                      style={{
                        color: active ? "#fff" : "rgba(255,255,255,0.5)",
                      }}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* footer */}
            <div className="p-5 border-t border-white/[0.06]">
              <Link href="/admin" onClick={onClose}>
                <button
                  className="w-full flex items-center justify-center gap-2.5 py-3 rounded-sm font-mono text-[11px] tracking-[0.1em] uppercase font-bold text-black transition-all hover:brightness-110"
                  style={{
                    background: "linear-gradient(135deg, #f97316, #fb923c)",
                  }}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Login
                </button>
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────
   TICKER
───────────────────────────── */
function Ticker() {
  const items = [
    "112G SERDES",
    "5G BEAMFORMER",
    "N3E PDK",
    "LOW-JITTER PLL",
    "ANALOG IP",
  ];
  return (
    <div
      className="hidden lg:flex items-center gap-3 px-3 py-1.5 rounded-sm border overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.03)",
        borderColor: "rgba(255,255,255,0.07)",
        maxWidth: 200,
      }}
    >
      <span className="font-mono text-[8px] tracking-[0.2em] text-emerald-400 shrink-0">
        LIVE
      </span>
      <div className="overflow-hidden flex-1">
        <motion.div
          animate={{ x: ["0%", "-100%"] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 whitespace-nowrap"
        >
          {[...items, ...items].map((t, i) => (
            <span
              key={i}
              className="font-mono text-[9px] tracking-[0.1em] text-white/30"
            >
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ─────────────────────────────
   MAIN NAVBAR
───────────────────────────── */
export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    const raf = (t: number) => {
      lenis.raf(t);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);

    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power4.out" },
    );
    gsap.fromTo(
      ".nav-mono-item",
      { opacity: 0, y: -8 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.06,
        duration: 0.4,
        ease: "power2.out",
        delay: 0.4,
      },
    );

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);
  const isParentActive = (item: NavItem) =>
    item.subitems?.some((s) => pathname.startsWith(s.href)) ?? false;

  const logoSrc =
    "https://images.seeklogo.com/logo-png/44/1/analogue-logo-png_seeklogo-449641.png";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        .analog-tech { font-family: 'Inter', sans-serif; }
        .mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      <div className="pt-[64px]">
        <nav
          ref={navRef}
          className="analog-tech fixed top-0 left-0 right-0 z-50 transition-all duration-400"
          style={{
            background: scrolled ? "rgba(6,8,12,0.97)" : "rgba(6,8,12,0.85)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.055)",
          }}
        >
          {/* top scan line */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(249,115,22,0.6) 30%, rgba(34,211,238,0.6) 70%, transparent)",
            }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          <div className="max-w-[1400px] mx-auto px-5 md:px-8 h-16 flex items-center justify-between gap-4">
            {/* ── LOGO ── */}
            <Link
              href="/"
              className="group flex items-center gap-3 shrink-0"
              onMouseEnter={(e) =>
                gsap.to(e.currentTarget, {
                  scale: 1.03,
                  duration: 0.2,
                  ease: "power2.out",
                })
              }
              onMouseLeave={(e) =>
                gsap.to(e.currentTarget, {
                  scale: 1,
                  duration: 0.2,
                  ease: "power2.out",
                })
              }
            >
              <div
                className="relative w-9 h-9 flex items-center justify-center transition-all duration-300"
                style={{
                  background: "rgba(249,115,22,0.1)",
                  border: "1px solid rgba(249,115,22,0.35)",
                  borderRadius: "2px",
                }}
              >
                {!logoError ? (
                  <Image
                    src={logoSrc}
                    alt="Analog"
                    width={36}
                    height={36}
                    className="object-contain p-1"
                    onError={() => setLogoError(true)}
                    unoptimized
                  />
                ) : (
                  <Sparkles className="w-4 h-4 text-[#f97316]" />
                )}
                {/* corner ticks */}
                <span
                  className="absolute -top-px -right-px w-1.5 h-1.5"
                  style={{
                    borderTop: "1px solid #f97316",
                    borderRight: "1px solid #f97316",
                  }}
                />
                <span
                  className="absolute -bottom-px -left-px w-1.5 h-1.5"
                  style={{
                    borderBottom: "1px solid #f97316",
                    borderLeft: "1px solid #f97316",
                  }}
                />
              </div>

              <div className="hidden sm:block">
                <p className="mono text-[14px] font-bold text-white tracking-[0.05em] leading-none">
                  ANALOG
                </p>
                <p
                  className="mono text-[8px] font-medium tracking-[0.2em] leading-none mt-1"
                  style={{ color: "rgba(249,115,22,0.7)" }}
                >
                  SEMICONDUCTOR
                </p>
              </div>
            </Link>

            {/* ── CENTER NAV ── */}
            <div className="hidden md:flex items-center">
              {navigationData.map((item, index) => {
                const active = item.href
                  ? isActive(item.href)
                  : isParentActive(item);

                if (item.subitems) {
                  return (
                    <div key={index} className="nav-mono-item">
                      <SplitMegaMenu item={item} isActive={active} />
                    </div>
                  );
                }

                return (
                  <Link
                    key={index}
                    href={item.href!}
                    className="nav-mono-item group relative flex items-center gap-1.5 px-4 py-2 font-mono font-semibold text-[12px] tracking-[0.08em] uppercase transition-all duration-200"
                    style={{ color: active ? "#fff" : "rgba(255,255,255,0.5)" }}
                    onMouseEnter={(e) => {
                      if (!active)
                        (e.currentTarget as HTMLElement).style.color =
                          "rgba(255,255,255,0.85)";
                    }}
                    onMouseLeave={(e) => {
                      if (!active)
                        (e.currentTarget as HTMLElement).style.color =
                          "rgba(255,255,255,0.5)";
                    }}
                  >
                    {active && (
                      <motion.div
                        layoutId="mono-active"
                        className="absolute inset-x-2 -bottom-px h-px"
                        style={{ background: "#f97316" }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 35,
                        }}
                      />
                    )}
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* ── RIGHT ── */}
            <div className="flex items-center gap-3 shrink-0">
              <Ticker />

              <Link href="/admin" className="hidden md:block">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  className="mono flex items-center gap-2 px-4 py-2 text-[11px] font-bold tracking-[0.1em] uppercase text-black transition-all"
                  style={{
                    background: "linear-gradient(135deg, #f97316, #fb923c)",
                    borderRadius: "2px",
                    boxShadow: "0 0 20px rgba(249,115,22,0.25)",
                  }}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Login
                </motion.button>
              </Link>

              {/* mobile burger */}
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => setMobileOpen(true)}
                className="md:hidden w-9 h-9 flex items-center justify-center transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "2px",
                }}
              >
                <Menu className="w-4 h-4 text-white/60" />
              </motion.button>
            </div>
          </div>
        </nav>

        {/* ── MOBILE DRAWER ── */}
        <MobileDrawer
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          isActive={isActive}
          isParentActive={isParentActive}
        />
      </div>
    </>
  );
}
