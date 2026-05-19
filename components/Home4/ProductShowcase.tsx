"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  ArrowRight,
  Sparkles,
  CheckCircle,
  Cpu,
  Shield,
  Globe,
  Zap,
  Target,
  Award,
  Rocket,
  Star,
  TrendingUp,
  Clock,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  ctaText?: string;
  gradient?: string;
  tag?: string;
  popularity?: number;
}

interface ProductsSectionProps {
  title: string;
  subtitle: string;
  products: Product[];
  onProductClick?: (productId: string) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  title,
  subtitle,
  products,
  onProductClick,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const categories = [
    "all",
    ...new Set(products.map((p) => p.tag || "featured")),
  ];

  const filteredProducts =
    activeFilter === "all"
      ? products
      : products.filter((p) => (p.tag || "featured") === activeFilter);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate header
      gsap.fromTo(
        headerRef.current?.querySelectorAll(".animate-header"),
        { opacity: 0, y: 50, filter: "blur(8px)" },
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

      // Animate filter buttons
      gsap.fromTo(
        ".filter-btn",
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(0.4)",
          scrollTrigger: {
            trigger: ".filter-bar",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate products when filter changes
  useEffect(() => {
    const cards = document.querySelectorAll(".product-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
      },
    );
  }, [activeFilter]);

  const getGradient = (index: number) => {
    const gradients = [
      "from-indigo-500 to-blue-500",
      "from-purple-500 to-pink-500",
      "from-emerald-500 to-teal-500",
      "from-amber-500 to-orange-500",
      "from-rose-500 to-red-500",
      "from-cyan-500 to-blue-500",
    ];
    return gradients[index % gradients.length];
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-32 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-100/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-100/20 rounded-full blur-3xl" />

        {/* Diagonal Lines Pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.02]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="diagonal"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="60"
                stroke="#1e293b"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonal)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-12">
          <div className="animate-header inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200/50 shadow-sm mb-6">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-semibold bg-gradient-to-r from-indigo-700 to-blue-700 bg-clip-text text-transparent">
              Innovative Solutions
            </span>
          </div>

          <h2 className="animate-header text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
              {title}
            </span>
          </h2>

          <p className="animate-header text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`filter-btn px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === category
                  ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-200"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Products Grid - Bento Grid Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => {
            const gradient = product.gradient || getGradient(index);
            const isSelected = selectedProduct === product.id;

            return (
              <div
                key={product.id}
                className="product-card group relative cursor-pointer"
                onClick={() => {
                  setSelectedProduct(isSelected ? null : product.id);
                  onProductClick?.(product.id);
                }}
              >
                {/* Main Card */}
                <div
                  className={`relative bg-white rounded-2xl transition-all duration-500 overflow-hidden ${
                    isSelected
                      ? "ring-2 ring-indigo-400 shadow-2xl"
                      : "shadow-md hover:shadow-xl"
                  }`}
                >
                  {/* Featured Tag */}
                  {product.tag && (
                    <div className="absolute top-4 left-4 z-20">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wider">
                        <Star className="w-3 h-3" />
                        {product.tag}
                      </span>
                    </div>
                  )}

                  {/* Popularity Badge */}
                  {product.popularity && (
                    <div className="absolute top-4 right-4 z-20">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-semibold">
                        <TrendingUp className="w-3 h-3" />
                        {product.popularity}+
                      </span>
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Icon with Animated Gradient */}
                    <div className="relative mb-5">
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}
                      >
                        <div className="text-white text-2xl">
                          {product.icon}
                        </div>
                      </div>
                      <div
                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse`}
                      />
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-xl font-bold mb-2 transition-colors duration-300 group-hover:bg-gradient-to-r group-hover:${gradient} group-hover:bg-clip-text group-hover:text-transparent`}
                    >
                      {product.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-500 text-sm leading-relaxed mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Expandable Features */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        isSelected
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="pt-3 border-t border-slate-100 space-y-2">
                        {product.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 text-sm"
                          >
                            <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-500" />
                            <span className="text-slate-600">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      {product.ctaText && (
                        <button
                          className={`w-full mt-4 py-2.5 bg-gradient-to-r ${gradient} text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2 group/btn`}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onProductClick?.(product.id);
                          }}
                        >
                          <span>{product.ctaText}</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </button>
                      )}
                    </div>

                    {/* Expand Hint */}
                    {!isSelected && (
                      <div className="mt-3 flex items-center justify-center gap-1 text-xs text-slate-400">
                        <Clock className="w-3 h-3" />
                        <span>Click to explore</span>
                      </div>
                    )}
                  </div>

                  {/* Decorative Bottom Bar */}
                  <div
                    className={`h-1 bg-gradient-to-r ${gradient} transition-all duration-500 ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:gap-3 transition-all duration-300 group">
            <span>View all solutions</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Floating Stats Bar */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-slate-200 hidden lg:flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-slate-600">
            500+ Active Deployments
          </span>
        </div>
        <div className="w-px h-4 bg-slate-300" />
        <div className="flex items-center gap-2">
          <Award className="w-3 h-3 text-amber-500" />
          <span className="text-xs text-slate-600">ISO 27001 Certified</span>
        </div>
        <div className="w-px h-4 bg-slate-300" />
        <div className="flex items-center gap-2">
          <Globe className="w-3 h-3 text-blue-500" />
          <span className="text-xs text-slate-600">Global Coverage</span>
        </div>
      </div>
    </section>
  );
};

// Example usage with default products
export const defaultProducts: Product[] = [
  {
    id: "1",
    title: "SERDES IP",
    description:
      "High-speed SerDes for data communication interfaces up to 112G PAM4",
    icon: <Cpu />,
    features: ["112G PAM4", "<1e-12 BER", "0.5pJ/bit", "Low Power Consumption"],
    ctaText: "Learn More",
    tag: "Popular",
    popularity: 128,
  },
  {
    id: "2",
    title: "PLL Systems",
    description: "Ultra-low jitter phase-locked loops for clock generation",
    icon: <Zap />,
    features: [
      "50fs RMS jitter",
      "10MHz-40GHz",
      "Integrated VCO",
      "Wide Range",
    ],
    ctaText: "Explore",
    tag: "New",
    popularity: 89,
  },
  {
    id: "3",
    title: "Analog IP",
    description: "Precision analog circuits for sensor and signal processing",
    icon: <Target />,
    features: [
      "16-bit resolution",
      "1uV offset",
      "0.01% INL",
      "High Precision",
    ],
    ctaText: "View Details",
    popularity: 56,
  },
  {
    id: "4",
    title: "Digital IP",
    description: "Advanced digital signal processing cores for edge AI",
    icon: <Rocket />,
    features: [
      "5 TOPS/W",
      "RISC-V cores",
      "Hardware accelerators",
      "AI Optimized",
    ],
    ctaText: "Discover",
    tag: "Featured",
    popularity: 234,
  },
  {
    id: "5",
    title: "Security Solutions",
    description: "Hardware-grade security for mission-critical applications",
    icon: <Shield />,
    features: [
      "Hardware Encryption",
      "Secure Boot",
      "Trusted Execution",
      "Quantum Ready",
    ],
    ctaText: "Learn More",
    popularity: 67,
  },
  {
    id: "6",
    title: "Global Services",
    description: "24/7 enterprise support and deployment worldwide",
    icon: <Globe />,
    features: [
      "Global Coverage",
      "24/7 Support",
      "Rapid Deployment",
      "Expert Consulting",
    ],
    ctaText: "Get Started",
    tag: "New",
    popularity: 45,
  },
];

export default ProductsSection;
