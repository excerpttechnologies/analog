"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
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
  ArrowUpRight,
  Sparkles,
  MoveRight,
  ChevronRight,
} from "lucide-react";
import gsap from "gsap";

/* ───────────────────────────
   TYPES
─────────────────────────── */
interface SubNavItem {
  label: string;
  href: string;
  description?: string;
  icon?: any;
  tag?: string;
  color?: string;
  bgColor?: string;
}
interface NavItem {
  label: string;
  href?: string;
  icon?: any;
  subitems?: SubNavItem[];
}

/* ───────────────────────────
   DATA
─────────────────────────── */
const navigationData: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  {
    label: "Product",
    icon: Package,
    subitems: [
      {
        label: "RF Beamformers",
        href: "/products/rf-beamformers",
        description: "Advanced phased array solutions",
        icon: Radio,
        tag: "New",
        color: "#2563eb",
        bgColor: "#eff6ff",
      },
      {
        label: "RF Front End Modules",
        href: "/products/rf-front-end",
        description: "Integrated RF solutions",
        icon: Zap,
        color: "#d97706",
        bgColor: "#fffbeb",
      },
      {
        label: "Power & Clock Mgmt",
        href: "/products/power-management",
        description: "Efficient power solutions",
        icon: Battery,
        color: "#16a34a",
        bgColor: "#f0fdf4",
      },
      {
        label: "Microcontrollers",
        href: "/products/microcontrollers",
        description: "High-performance MCUs",
        icon: Cpu,
        tag: "Pro",
        color: "#7c3aed",
        bgColor: "#f5f3ff",
      },
    ],
  },
  {
    label: "Silicon IP",
    icon: Microchip,
    subitems: [
      {
        label: "Multi-Protocol SERDES",
        href: "/silicon-ip/serdes",
        description: "112G PAM4 SerDes",
        icon: Zap,
        tag: "Hot",
        color: "#dc2626",
        bgColor: "#fef2f2",
      },
      {
        label: "Phase Locked Loop",
        href: "/silicon-ip/pll",
        description: "Ultra-low jitter PLL",
        icon: Clock,
        color: "#0891b2",
        bgColor: "#ecfeff",
      },
      {
        label: "Analog IPs",
        href: "/silicon-ip/analog",
        description: "Precision analog circuits",
        icon: Shield,
        color: "#059669",
        bgColor: "#ecfdf5",
      },
      {
        label: "Digital IPs",
        href: "/silicon-ip/digital",
        description: "DSP and compute cores",
        icon: Cpu,
        color: "#9333ea",
        bgColor: "#faf5ff",
      },
    ],
  },
  {
    label: "Company",
    icon: Building,
    subitems: [
      {
        label: "About Us",
        href: "/about",
        description: "Our story and mission",
        icon: Info,
        color: "#0284c7",
        bgColor: "#f0f9ff",
      },
      {
        label: "Leadership",
        href: "/leadership",
        description: "Meet our team",
        icon: Crown,
        color: "#b45309",
        bgColor: "#fffbeb",
      },
      {
        label: "Career",
        href: "/careers",
        description: "Join our team",
        icon: Briefcase,
        tag: "Hiring",
        color: "#15803d",
        bgColor: "#f0fdf4",
      },
    ],
  },
  { label: "Blogs", href: "/blog", icon: FileText },
  { label: "Contact Us", href: "/contact", icon: Mail },
];

/* ───────────────────────────
   SPOTLIGHT HOOK
─────────────────────────── */
function useSpotlight(ref: React.RefObject<HTMLElement>) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 30 });
  const sy = useSpring(y, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    };
    el.addEventListener("mousemove", move);
    return () => el.removeEventListener("mousemove", move);
  }, [ref, x, y]);

  return { sx, sy };
}

/* ───────────────────────────
   BENTO DROPDOWN (FIXED)
─────────────────────────── */
function BentoDropdown({
  item,
  isActive,
}: {
  item: NavItem;
  isActive: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const enter = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };
  const leave = () => {
    timer.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const subs = item.subitems ?? [];
  const isFour = subs.length === 4;

  return (
    <div
      ref={ref}
      onMouseEnter={enter}
      onMouseLeave={leave}
      className="relative"
    >
      <button
        aria-expanded={open}
        className={`group relative flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[13.5px] font-semibold transition-all duration-200 ${
          isActive
            ? "text-gray-900 bg-gray-900/8"
            : "text-gray-500 hover:text-gray-900"
        }`}
        style={{ letterSpacing: "-0.01em" }}
      >
        {isActive && (
          <motion.span
            layoutId="nav-bg"
            className="absolute inset-0 rounded-full bg-gray-900/6"
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
          />
        )}
        <span className="relative z-10 whitespace-nowrap">{item.label}</span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 w-3.5 h-3.5"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M2 4L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 z-50"
          >
            {/* tip arrow */}
            <div className="flex justify-center mb-[-1px] relative z-10">
              <div
                className="w-2.5 h-2.5 rotate-45 bg-white border-t border-l border-gray-200"
                style={{
                  borderBottom: "none",
                  borderRight: "none",
                }}
              />
            </div>

            <div
              className="rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-2xl"
              style={{
                minWidth: isFour ? 480 : 400,
              }}
            >
              {/* bento grid */}
              <div
                className={`p-3 grid gap-2 ${isFour ? "grid-cols-2" : "grid-cols-2"}`}
              >
                {subs.map((sub, idx) => {
                  return (
                    <Link
                      key={idx}
                      href={sub.href}
                      onClick={() => setOpen(false)}
                      className={`group/tile relative flex flex-col justify-between rounded-xl p-4 transition-all duration-200 overflow-hidden`}
                      style={{
                        background: sub.bgColor ?? "#f8fafc",
                        border: "1px solid rgba(0,0,0,0.06)",
                        minHeight: 108,
                      }}
                    >
                      {/* hover overlay */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover/tile:opacity-100 transition-opacity duration-200"
                        style={{ background: `${sub.color}08` }}
                      />
                      {/* border highlight */}
                      <div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover/tile:opacity-100 transition-opacity duration-200"
                        style={{
                          boxShadow: `inset 0 0 0 1.5px ${sub.color}30`,
                        }}
                      />

                      <div className="relative z-10 flex items-start justify-between mb-3">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 group-hover/tile:scale-110"
                          style={{
                            background: sub.color
                              ? `${sub.color}15`
                              : "#f1f5f9",
                          }}
                        >
                          <sub.icon
                            className="w-4.5 h-4.5"
                            style={{ color: sub.color ?? "#64748b" }}
                          />
                        </div>
                        {sub.tag && (
                          <span
                            className="text-[9px] font-bold tracking-wider px-2 py-1 rounded-full"
                            style={{
                              background: `${sub.color}18`,
                              color: sub.color,
                            }}
                          >
                            {sub.tag}
                          </span>
                        )}
                      </div>

                      <div className="relative z-10">
                        <div className="flex items-center gap-1.5 mb-1">
                          <p
                            className="text-[13px] font-semibold text-gray-800 group-hover/tile:text-gray-900 leading-tight"
                            style={{ letterSpacing: "-0.01em" }}
                          >
                            {sub.label}
                          </p>
                          <ArrowUpRight
                            className="w-3 h-3 opacity-0 group-hover/tile:opacity-100 transition-all duration-200 -translate-x-1 group-hover/tile:translate-x-0"
                            style={{ color: sub.color }}
                          />
                        </div>
                        <p className="text-[11px] text-gray-400 leading-snug">
                          {sub.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* footer */}
              <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
                <p className="text-[11px] text-gray-400">
                  Explore {item.label}
                </p>
                <button className="group/all flex items-center gap-1.5 text-[11px] font-semibold text-gray-600 hover:text-gray-900 transition-colors">
                  View all
                  <MoveRight className="w-3 h-3 group-hover/all:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───────────────────────────
   BOTTOM SHEET - MOBILE (FIXED)
─────────────────────────── */
function BottomSheet({
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
  const sheetRef = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);

  const onDragEnd = () => {
    if (y.get() > 120) onClose();
  };

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
              background: "rgba(0,0,0,0.35)",
              backdropFilter: "blur(6px)",
            }}
          />

          <motion.div
            ref={sheetRef}
            style={{ y }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 240 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 400 }}
            dragElastic={{ top: 0, bottom: 0.3 }}
            onDragEnd={onDragEnd}
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex flex-col bg-white rounded-3xl shadow-2xl"
            style={{
              maxHeight: "85vh",
            }}
          >
            {/* drag pill */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-gray-200" />
            </div>

            {/* header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-gray-900 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-[15px] font-bold text-gray-900">
                  Menu
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* items */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1.5">
              {navigationData.map((item, index) => {
                const active = item.href
                  ? isActive(item.href)
                  : isParentActive(item);
                const isExp = expanded === index;

                if (item.subitems) {
                  return (
                    <div
                      key={index}
                      className="rounded-2xl overflow-hidden border border-gray-100"
                      style={{
                        background: isExp ? "#fafafa" : "#fff",
                      }}
                    >
                      <button
                        onClick={() => setExpanded(isExp ? null : index)}
                        className="w-full flex items-center justify-between px-4 py-3.5"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                              active || isExp ? "bg-gray-900" : "bg-gray-100"
                            }`}
                          >
                            <item.icon
                              className={`w-4 h-4 ${
                                active || isExp ? "text-white" : "text-gray-500"
                              }`}
                            />
                          </div>
                          <span className="text-[14px] font-semibold text-gray-800">
                            {item.label}
                          </span>
                          {active && (
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-900" />
                          )}
                        </div>
                        <motion.div
                          animate={{ rotate: isExp ? 90 : 0 }}
                          transition={{ duration: 0.22 }}
                        >
                          <ChevronRight className="w-4 h-4 text-gray-300" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {isExp && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.26 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-3 pt-1 grid grid-cols-2 gap-2">
                              {item.subitems.map((sub, idx) => (
                                <Link
                                  key={idx}
                                  href={sub.href}
                                  onClick={onClose}
                                  className="group flex flex-col gap-2 p-3 rounded-xl transition-all border border-gray-100"
                                  style={{
                                    background: sub.bgColor ?? "#f8fafc",
                                  }}
                                >
                                  <div className="flex items-center justify-between">
                                    <div
                                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                                      style={{ background: `${sub.color}15` }}
                                    >
                                      <sub.icon
                                        className="w-3.5 h-3.5"
                                        style={{ color: sub.color }}
                                      />
                                    </div>
                                    {sub.tag && (
                                      <span
                                        className="text-[8px] font-bold px-1.5 py-0.5 rounded-full"
                                        style={{
                                          background: `${sub.color}18`,
                                          color: sub.color,
                                        }}
                                      >
                                        {sub.tag}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[11px] font-semibold text-gray-700 leading-tight">
                                    {sub.label}
                                  </p>
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
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all border border-gray-100 ${
                      active
                        ? "bg-gray-900 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        active ? "bg-white/15" : "bg-gray-100"
                      }`}
                    >
                      <item.icon
                        className={`w-4 h-4 ${
                          active ? "text-white" : "text-gray-500"
                        }`}
                      />
                    </div>
                    <span className="text-[14px] font-semibold">
                      {item.label}
                    </span>
                    {active && (
                      <MoveRight className="w-3.5 h-3.5 ml-auto text-white/60" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* CTA */}
            <div className="px-5 pb-8 pt-3 border-t border-gray-100">
              <Link href="/admin" onClick={onClose}>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-gray-900 text-white text-[14px] font-bold transition-all hover:bg-gray-800"
                >
                  <LogIn className="w-4 h-4" />
                  Login to Dashboard
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ───────────────────────────
   MAIN NAVBAR (FIXED)
─────────────────────────── */
export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  /* spotlight */
  const mouseX = useMotionValue(-999);
  const mouseY = useMotionValue(-999);
  const sx = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const sy = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const rect = barRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-999);
    mouseY.set(-999);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);

    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "expo.out", delay: 0.05 },
    );
    gsap.fromTo(
      ".nav-link-item",
      { opacity: 0, y: -6 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.055,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.5,
      },
    );

    const bar = barRef.current;
    if (bar) {
      bar.addEventListener("mousemove", handleMouseMove);
      bar.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (bar) {
        bar.removeEventListener("mousemove", handleMouseMove);
        bar.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [handleMouseMove, handleMouseLeave]);

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);
  const isParentActive = (item: NavItem) =>
    item.subitems?.some((s) => pathname.startsWith(s.href)) ?? false;

  const logoSrc =
    "https://images.seeklogo.com/logo-png/44/1/analogue-logo-png_seeklogo-449641.png";

  return (
    <>
      <div className="pt-[80px]">
        <nav
          ref={navRef}
          className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4"
        >
          <div
            ref={barRef}
            className="relative w-full max-w-[900px] flex items-center justify-between h-[52px] px-3 rounded-2xl transition-all duration-500 bg-white/90 backdrop-blur-xl"
            style={{
              border: "0.5px solid rgba(0,0,0,0.08)",
              boxShadow: scrolled
                ? "0 8px 32px rgba(0,0,0,0.1)"
                : "0 4px 16px rgba(0,0,0,0.06)",
            }}
          >
            {/* mouse spotlight */}
            <motion.div
              className="pointer-events-none absolute rounded-full"
              style={{
                width: 300,
                height: 300,
                left: sx,
                top: sy,
                x: "-50%",
                y: "-50%",
                background:
                  "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
              }}
            />

            {/* LOGO */}
            <Link
              href="/"
              className="nav-link-item group flex items-center gap-2.5 shrink-0 pl-1"
            >
              <div
                className="relative w-8 h-8 rounded-xl overflow-hidden flex items-center justify-center transition-all duration-300 bg-gray-900"
                style={{
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                }}
              >
                {!logoError ? (
                  <Image
                    src={logoSrc}
                    alt="Analog"
                    width={32}
                    height={32}
                    className="object-contain p-1"
                    onError={() => setLogoError(true)}
                    unoptimized
                  />
                ) : (
                  <Sparkles className="w-4 h-4 text-white" />
                )}
              </div>
              <span
                className="hidden sm:block text-[15px] font-bold text-gray-900"
                style={{ letterSpacing: "-0.03em" }}
              >
                Analog
              </span>
            </Link>

            {/* CENTER LINKS */}
            <div className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
              {navigationData.map((item, index) => {
                const active = item.href
                  ? isActive(item.href)
                  : isParentActive(item);

                if (item.subitems) {
                  return (
                    <div key={index} className="nav-link-item">
                      <BentoDropdown item={item} isActive={active} />
                    </div>
                  );
                }

                return (
                  <Link
                    key={index}
                    href={item.href!}
                    className="nav-link-item relative group flex items-center px-3 py-2 rounded-full text-[13.5px] font-semibold transition-all duration-200"
                    style={{
                      color: active ? "#111" : "#6b7280",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-bg"
                        className="absolute inset-0 rounded-full bg-gray-900/6"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 35,
                        }}
                      />
                    )}
                    <span className="relative z-10 whitespace-nowrap">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-2 shrink-0 pr-1">
              <Link href="/admin" className="hidden md:block nav-link-item">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold text-white transition-all bg-gray-900"
                  style={{
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Login
                </motion.button>
              </Link>

              {/* Mobile burger */}
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => setMobileOpen(true)}
                className="md:hidden w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <Menu className="w-4.5 h-4.5 text-gray-700" />
              </motion.button>
            </div>
          </div>
        </nav>

        <BottomSheet
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          isActive={isActive}
          isParentActive={isParentActive}
        />
      </div>
    </>
  );
}
