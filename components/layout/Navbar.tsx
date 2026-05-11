"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
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
  Users,
  Crown,
  Radio,
  Battery,
  Clock,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

// Types
interface NavItem {
  label: string;
  href?: string;
  icon?: any;
  subitems?: SubNavItem[];
}

interface SubNavItem {
  label: string;
  href: string;
  description?: string;
  icon?: any;
}

// Navigation Data
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
      },
      {
        label: "RF Front End Modules",
        href: "/products/rf-front-end",
        description: "Integrated RF solutions",
        icon: Zap,
      },
      {
        label: "Power & Clock Management",
        href: "/products/power-management",
        description: "Efficient power solutions",
        icon: Battery,
      },
      {
        label: "Microcontrollers",
        href: "/products/microcontrollers",
        description: "High-performance MCUs",
        icon: Cpu,
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
      },
      {
        label: "Phase Locked Loop",
        href: "/silicon-ip/pll",
        description: "Ultra-low jitter PLL",
        icon: Clock,
      },
      {
        label: "Analog IPs",
        href: "/silicon-ip/analog",
        description: "Precision analog circuits",
        icon: Shield,
      },
      {
        label: "Digital IPs",
        href: "/silicon-ip/digital",
        description: "DSP and compute cores",
        icon: Cpu,
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
      },
      {
        label: "Leadership",
        href: "/leadership",
        description: "Meet our team",
        icon: Crown,
      },
      {
        label: "Career",
        href: "/careers",
        description: "Join our team",
        icon: Briefcase,
      },
    ],
  },
  { label: "Blogs", href: "/blog", icon: FileText },
  { label: "Contact Us", href: "/contact", icon: Mail },
];

// Dropdown Component - Opens on both hover and click
function Dropdown({
  item,
  isActive,
  index,
}: {
  item: NavItem;
  isActive: boolean;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle hover enter
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsOpen(true);
  };

  // Handle hover leave
  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  // Handle click toggle
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={handleClick}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
          isActive ? "text-orange-500" : "text-slate-600 hover:text-slate-900"
        }`}
        aria-expanded={isOpen}
      >
        <item.icon
          className={`w-4 h-4 transition-all duration-300 ${
            isActive
              ? "text-orange-500"
              : "text-slate-400 group-hover:text-orange-500"
          }`}
        />
        {item.label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50"
          >
            <div className="p-2">
              {item.subitems?.map((subitem, idx) => (
                <Link
                  key={idx}
                  href={subitem.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-orange-50 transition-colors">
                    <subitem.icon className="w-4 h-4 text-slate-500 group-hover:text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700 group-hover:text-orange-500">
                      {subitem.label}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {subitem.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Mobile Accordion Component
function MobileAccordion({
  item,
  isActive,
  index,
  openAccordion,
  setOpenAccordion,
}: any) {
  const isOpen = openAccordion === index;

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setOpenAccordion(isOpen ? null : index)}
        className="w-full flex items-center justify-between px-4 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <item.icon
            className={`w-5 h-5 ${isActive ? "text-orange-500" : "text-slate-500"}`}
          />
          <span
            className={`text-sm font-medium ${isActive ? "text-orange-500" : "text-slate-700"}`}
          >
            {item.label}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && item.subitems && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-4 pl-12 space-y-2">
              {item.subitems.map((subitem: any, idx: number) => (
                <Link
                  key={idx}
                  href={subitem.href}
                  className="block py-2 text-sm text-slate-600 hover:text-orange-500 transition-colors"
                  onClick={() => setOpenAccordion(null)}
                >
                  <div className="flex items-center gap-2">
                    <subitem.icon className="w-3.5 h-3.5" />
                    {subitem.label}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Main Navbar Component
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [logoError, setLogoError] = useState(false);
  const pathname = usePathname();
  const navbarRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    // GSAP animation for navbar on load
    gsap.fromTo(
      navbarRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
    );

    // Stagger animation for nav items
    gsap.fromTo(
      ".nav-item-desktop",
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        delay: 0.3,
        ease: "power2.out",
      },
    );

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
      );
    }
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  const isParentActive = (item: NavItem) => {
    if (item.subitems) {
      return item.subitems.some((sub) => pathname.startsWith(sub.href));
    }
    return false;
  };

  const logoSrc =
    "https://images.seeklogo.com/logo-png/44/1/analogue-logo-png_seeklogo-449641.png";

  return (
    <div className="pt-16">
      <nav
        ref={navbarRef}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[93vw]">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo with Image */}
            <Link
              href="/"
              className="group flex items-center gap-2.5 font-bold text-xl lg:text-2xl"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1.02,
                  duration: 0.2,
                  ease: "power2.out",
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  duration: 0.2,
                  ease: "power2.out",
                });
              }}
            >
              <div className="relative">
                <div className="absolute inset-0  rounded-lg blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-lg overflow-hidden  bg-white flex items-center justify-center">
                  {!logoError ? (
                    <Image
                      src={logoSrc}
                      alt="Analog Company Logo"
                      width={48}
                      height={48}
                      className="object-contain p-1"
                      onError={() => setLogoError(true)}
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              </div>
              <span className="hidden sm:inline bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Analog
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navigationData.map((item, index) => {
                const active = item.href
                  ? isActive(item.href)
                  : isParentActive(item);

                if (item.subitems) {
                  return (
                    <div key={index} className="nav-item-desktop">
                      <Dropdown item={item} isActive={active} index={index} />
                    </div>
                  );
                }

                return (
                  <Link
                    key={index}
                    href={item.href!}
                    className={`nav-item-desktop flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 group relative ${
                      active
                        ? "text-orange-500"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <item.icon
                      className={`w-4 h-4 transition-all duration-300 ${
                        active
                          ? "text-orange-500"
                          : "text-slate-400 group-hover:text-orange-500"
                      }`}
                    />
                    {item.label}
                    {active && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* CTA Button */}
            <Link href={"/admin"} className="hidden md:flex items-center gap-4">
              <Button className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold px-6 py-2 rounded shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 group text-sm">
                <span className="relative z-10 flex items-center gap-2">
                  Login
                  <LogIn className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden relative w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 transition-all duration-300 flex items-center justify-center"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? (
                  <X className="w-5 h-5 text-slate-700" />
                ) : (
                  <Menu className="w-5 h-5 text-slate-700" />
                )}
              </motion.div>
            </button>
          </div>
        </div>

        {/* Animated background gradient */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
        </div>
      </nav>

      {/* Mobile Navigation Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar Menu */}
            <motion.div
              ref={mobileMenuRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-50 md:hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg overflow-hidden bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                    {!logoError ? (
                      <Image
                        src={logoSrc}
                        alt="Analog Company Logo"
                        width={32}
                        height={32}
                        className="object-contain"
                        onError={() => setLogoError(true)}
                        unoptimized
                      />
                    ) : (
                      <Sparkles className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="font-bold text-lg bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    Menu
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="flex-1 overflow-y-auto py-4">
                {navigationData.map((item, index) => {
                  const active = item.href
                    ? isActive(item.href)
                    : isParentActive(item);

                  if (item.subitems) {
                    return (
                      <MobileAccordion
                        key={index}
                        item={item}
                        isActive={active}
                        index={index}
                        openAccordion={openAccordion}
                        setOpenAccordion={setOpenAccordion}
                      />
                    );
                  }

                  return (
                    <Link
                      key={index}
                      href={item.href!}
                      className={`flex items-center gap-3 px-4 py-4 text-sm font-medium transition-all duration-300 ${
                        active
                          ? "bg-gradient-to-r from-orange-50 to-orange-100/50 text-orange-500 border-r-4 border-orange-500"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon
                        className={`w-5 h-5 ${active ? "text-orange-500" : "text-slate-400"}`}
                      />
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {/* Footer */}
              <Link href={"/admin"} className="p-4 border-t border-slate-200">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold py-3 rounded shadow-lg text-sm">
                  <span className="flex items-center justify-center gap-2">
                    Login
                    <LogIn className="w-4 h-4" />
                  </span>
                </Button>
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
