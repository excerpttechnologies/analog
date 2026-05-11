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
  ArrowRight,
  Globe,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

// Types (same as before)
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

// Navigation Data (same)
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

// Modern Dropdown Component
function ModernDropdown({
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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-300 rounded-xl ${
          isActive
            ? "text-purple-600 bg-purple-50"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        }`}
      >
        <item.icon className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-purple-600" : "text-gray-400 group-hover:text-purple-500"}`} />
        {item.label}
        <ChevronDown className={`w-3.5 h-3.5 transition-all duration-300 ${isOpen ? "rotate-180 text-purple-500" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
            className="absolute top-full left-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
          >
            <div className="p-3">
              <div className="grid grid-cols-1 gap-1">
                {item.subitems?.map((subitem, idx) => (
                  <Link
                    key={idx}
                    href={subitem.href}
                    onClick={() => setIsOpen(false)}
                    className="group relative flex items-start gap-4 p-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <subitem.icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                        {subitem.label}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {subitem.description}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                ))}
              </div>
            </div>
            <div className="px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 border-t border-gray-100">
              <p className="text-xs text-gray-600 text-center">
                🚀 Explore all {item.label} solutions
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Modern Mobile Accordion
function ModernMobileAccordion({
  item,
  isActive,
  index,
  openAccordion,
  setOpenAccordion,
}: any) {
  const isOpen = openAccordion === index;

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpenAccordion(isOpen ? null : index)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg ${isActive ? "bg-purple-100" : "bg-gray-100"} flex items-center justify-center`}>
            <item.icon className={`w-4 h-4 ${isActive ? "text-purple-600" : "text-gray-500"}`} />
          </div>
          <span className={`text-base font-medium ${isActive ? "text-purple-600" : "text-gray-800"}`}>
            {item.label}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
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
            <div className="pb-4 px-6 space-y-2">
              {item.subitems.map((subitem: any, idx: number) => (
                <Link
                  key={idx}
                  href={subitem.href}
                  className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-purple-50 transition-all group"
                  onClick={() => setOpenAccordion(null)}
                >
                  <div className="w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center group-hover:bg-purple-100">
                    <subitem.icon className="w-3.5 h-3.5 text-gray-500 group-hover:text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 group-hover:text-purple-600 font-medium">
                      {subitem.label}
                    </p>
                    <p className="text-xs text-gray-400">{subitem.description}</p>
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

// Main Navbar Component - Redesigned
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [logoError, setLogoError] = useState(false);
  const pathname = usePathname();
  const navbarRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    // GSAP animation
    gsap.fromTo(
      navbarRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const logoSrc = "https://images.seeklogo.com/logo-png/44/1/analogue-logo-png_seeklogo-449641.png";

  return (
    <>
      {/* Announcement Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 text-center text-sm">
        <div className="container mx-auto px-4">
          <span className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            🚀 New: Advanced RF Beamformers Series 2025
            <Globe className="w-4 h-4" />
          </span>
        </div>
      </div>

      <div className="pt-8">
        <nav
          ref={navbarRef}
          className={`fixed top-8 left-4 right-4 z-50 transition-all duration-500 ${
            scrolled
              ? "top-2 left-2 right-2 bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl"
              : "bg-white/90 backdrop-blur-md rounded-2xl shadow-lg"
          }`}
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between h-16 lg:h-20">
              {/* Logo Section - Redesigned */}
              <Link
                href="/"
                className="group relative flex items-center gap-3"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-xl overflow-hidden bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                    {!logoError ? (
                      <Image
                        src={logoSrc}
                        alt="Logo"
                        width={48}
                        height={48}
                        className="object-contain p-1 brightness-0 invert"
                        onError={() => setLogoError(true)}
                        unoptimized
                      />
                    ) : (
                      <Sparkles className="w-6 h-6 text-white" />
                    )}
                  </div>
                </div>
                <div>
                  <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Analog
                  </span>
                  <div className="text-[10px] font-mono text-gray-400 tracking-tight">
                    SEMICONDUCTOR
                  </div>
                </div>
              </Link>

              {/* Desktop Navigation - Horizontal Center */}
              <div className="hidden lg:flex items-center gap-1 bg-gray-50/50 rounded-full p-1">
                {navigationData.map((item, index) => {
                  const active = item.href ? isActive(item.href) : isParentActive(item);

                  if (item.subitems) {
                    return (
                      <ModernDropdown
                        key={index}
                        item={item}
                        isActive={active}
                        index={index}
                      />
                    );
                  }

                  return (
                    <Link
                      key={index}
                      href={item.href!}
                      className={`relative px-4 py-2.5 text-sm font-medium transition-all duration-300 rounded-full ${
                        active
                          ? "text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-md"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <span className="flex items-center gap-2">
                        <item.icon className={`w-4 h-4 ${active ? "text-white" : "text-gray-400"}`} />
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Right Section - Redesigned */}
              <div className="flex items-center gap-3">
                {/* Language Selector */}
                
                {/* Star Button */}
                <button className="hidden md:flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-yellow-500 transition-colors">
                  <Star className="w-4 h-4" />
                </button>

                {/* Login Button - Modern */}
                <Link href="/admin">
                  <Button className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 group">
                    <span className="relative z-10 flex items-center gap-2">
                      <LogIn className="w-4 h-4 transition-transform group-hover:scale-110" />
                      Access
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                  </Button>
                </Link>

                {/* Mobile Menu Toggle - Redesigned */}
                <button
                  className="lg:hidden relative w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label="Toggle menu"
                >
                  <motion.div
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isOpen ? (
                      <X className="w-5 h-5 text-white" />
                    ) : (
                      <Menu className="w-5 h-5 text-white" />
                    )}
                  </motion.div>
                </button>
              </div>
            </div>
          </div>

          {/* Animated Background Effects */}
          <div className="absolute inset-0 -z-10 pointer-events-none rounded-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl" />
          </div>
        </nav>

        {/* Mobile Sidebar - Redesigned */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setIsOpen(false)}
              />

              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 lg:hidden flex flex-col rounded-l-3xl"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                      {!logoError ? (
                        <Image
                          src={logoSrc}
                          alt="Logo"
                          width={40}
                          height={40}
                          className="object-contain p-1 brightness-0 invert"
                          onError={() => setLogoError(true)}
                          unoptimized
                        />
                      ) : (
                        <Sparkles className="w-5 rounded-lg h-5 text-white" />
                      )}
                    </div>
                    <div>
                      <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Menu
                      </span>
                      <div className="text-[10px] text-gray-400">Navigation</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto py-4">
                  {navigationData.map((item, index) => {
                    const active = item.href ? isActive(item.href) : isParentActive(item);

                    if (item.subitems) {
                      return (
                        <ModernMobileAccordion
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
                        className={`flex items-center gap-3 px-6 py-4 text-base font-medium transition-all duration-300 ${
                          active
                            ? "bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 border-r-4 border-purple-600"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <div className={`w-8 h-8 rounded-lg ${active ? "bg-purple-100" : "bg-gray-100"} flex items-center justify-center`}>
                          <item.icon className={`w-4 h-4 ${active ? "text-purple-600" : "text-gray-500"}`} />
                        </div>
                        {item.label}
                        {active && (
                          <motion.div
                            layoutId="activeMobile"
                            className="ml-auto w-1 h-1 rounded-full bg-purple-600"
                          />
                        )}
                      </Link>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 space-y-3">
                  <Link href="/admin" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl shadow-lg">
                      <span className="flex items-center justify-center gap-2">
                        <LogIn className="w-4 h-4" />
                        Access Account
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </Button>
                  </Link>
                  <div className="flex items-center justify-center gap-4 pt-2">
                    <button className="text-xs text-gray-400 hover:text-purple-600 transition-colors">Privacy</button>
                    <button className="text-xs text-gray-400 hover:text-purple-600 transition-colors">Terms</button>
                    <button className="text-xs text-gray-400 hover:text-purple-600 transition-colors">Support</button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}