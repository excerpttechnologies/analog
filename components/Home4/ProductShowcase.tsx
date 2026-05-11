"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  ArrowRight,
  Radio,
  Zap,
  Battery,
  Cpu,
  CheckCircle,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const ProductsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const products = [
    {
      id: "rf-beamformers",
      title: "RF Beamformers",
      description: "Beamformers for Active Antenna Systems",
      icon: Radio,
      gradient: "from-blue-500 to-cyan-500",
      features: [
        "Phased array control",
        "8-channel support",
        "Low phase noise",
        "Fast beam steering",
      ],
    },
    {
      id: "rf-front-end",
      title: "RF Front End Modules",
      description: "FEMs for Active Antenna Systems",
      icon: Zap,
      gradient: "from-purple-500 to-pink-500",
      features: [
        "Integrated LNA + PA",
        "High linearity",
        "Low power consumption",
        "Wide bandwidth",
      ],
    },
    {
      id: "power-clock",
      title: "Power & Clock Management",
      description: "Low Noise LDOs and XOs",
      icon: Battery,
      gradient: "from-emerald-500 to-teal-500",
      features: [
        "Ultra-low noise LDOs",
        "High precision XOs",
        "Thermal protection",
        "Efficient regulation",
      ],
    },
    {
      id: "microcontrollers",
      title: "Microcontrollers",
      description: "General Purpose MCUs",
      icon: Cpu,
      gradient: "from-orange-500 to-red-500",
      features: [
        "ARM Cortex-M core",
        "Low power modes",
        "Rich peripherals",
        "Industrial grade",
      ],
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate header
      gsap.fromTo(
        headerRef.current?.querySelectorAll(".animate-header"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
        },
      );

      // Animate cards
      gsap.fromTo(
        ".product-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(0.4)",
          scrollTrigger: {
            trigger: ".products-grid",
            start: "top 80%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-gradient-to-br from-slate-50 via-white to-slate-100"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <div className="animate-header inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-sm font-semibold text-blue-700">
              Our Products
            </span>
          </div>

          <h2 className="animate-header text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Advanced Solutions
            </span>
          </h2>

          <p className="animate-header text-lg text-slate-600 max-w-2xl mx-auto">
            Cutting-edge semiconductor solutions for modern applications
          </p>
        </div>

        {/* Products Grid - 4 Cards */}
        <div className="products-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <div
                key={product.id}
                className="product-card group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
              >
                {/* Gradient Top Bar */}
                <div className={`h-1.5 bg-gradient-to-r ${product.gradient}`} />

                <div className="p-6">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-r ${product.gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 mb-5`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    {product.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">
                    {product.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2 mb-6">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span className="text-xs text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    className="w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 bg-slate-100 text-slate-700 hover:shadow-md group/btn"
                    onClick={() => console.log(`View ${product.id}`)}
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>

                {/* Hover Effect Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${product.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all hover:gap-3 group">
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;