"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Cpu,
  Zap,
  Shield,
  Microchip,
  Target,
  Sparkles,
  Filter,
  Search,
  TrendingUp,
  Award,
  Clock,
  Battery,
  Radio,
  GitBranch,
  Layers,
  Wifi,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const products = [
  {
    id: "pmic",
    name: "PMIC",
    fullName: "Power Management ICs",
    category: "Power Management",
    description:
      "High-efficiency power management ICs with integrated protection for automotive and industrial applications.",
    longDescription:
      "Our PMIC portfolio includes buck/boost converters, LDO regulators, battery management systems, and power sequencing solutions. Designed for automotive (AEC-Q100) and industrial grade applications with 92% peak efficiency.",
    specs: [
      "92% Efficiency",
      "Buck/Boost",
      "Battery Mgmt",
      "LDO Regulators",
      "AEC-Q100",
    ],
    applications: [
      "Electric Vehicles",
      "Industrial Automation",
      "Consumer Electronics",
      "Telecom Infrastructure",
    ],
    image:
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=600&fit=crop",
    icon: Battery,
    gradient: "from-blue-500 to-cyan-500",
    lightGradient: "from-blue-50 to-cyan-50",
    color: "blue",
    features: [
      "Input voltage range: 2.7V to 40V",
      "Output current: up to 10A",
      "Switching frequency: 500kHz to 2MHz",
      "Protection: OVP, OCP, SCP, Thermal shutdown",
    ],
  },
  {
    id: "adc-dac",
    name: "ADC/DAC",
    fullName: "Data Converters",
    category: "Data Conversion",
    description:
      "Precision analog-to-digital and digital-to-analog converters for high-fidelity signal processing.",
    longDescription:
      "Industry-leading ADC/DAC solutions with 16-bit resolution at 10 GSPS, setting new standards for precision and speed in data conversion applications.",
    specs: ["16-bit Resolution", "10 GSPS", "Low Noise", "High Accuracy"],
    applications: [
      "Wireless Communications",
      "Test & Measurement",
      "Radar Systems",
      "Medical Imaging",
    ],
    image:
      "https://images.unsplash.com/photo-1581092335871-4d6e2e1b0a5a?w=800&h=600&fit=crop",
    icon: Radio,
    gradient: "from-emerald-500 to-teal-500",
    lightGradient: "from-emerald-50 to-teal-50",
    color: "emerald",
    features: [
      "16-bit resolution with <0.1% INL",
      "Sampling rate: 10 GSPS",
      "SNR: 78dBFS",
      "Power consumption: 1.5W",
    ],
  },
  {
    id: "serdes",
    name: "SERDES",
    fullName: "Serializer/Deserializer",
    category: "Connectivity",
    description:
      "High-speed serial interface solutions for data communication and video transmission.",
    longDescription:
      "Multi-protocol SERDES IP supporting 3.125 Gbps data rates for high-bandwidth video, networking, and inter-chip communication with low EMI and cable equalization.",
    specs: ["3.125 Gbps", "Multi-Protocol", "SSC Support", "Cable EQ"],
    applications: [
      "Automotive Camera",
      "Infotainment Systems",
      "Industrial Networking",
      "Video Transmission",
    ],
    image:
      "https://images.unsplash.com/photo-1581092335871-5d4a5d9d6f8c?w=800&h=600&fit=crop",
    icon: GitBranch,
    gradient: "from-purple-500 to-pink-500",
    lightGradient: "from-purple-50 to-pink-50",
    color: "purple",
    features: [
      "Data rate: 3.125 Gbps per lane",
      "Supports multiple protocols",
      "Spread Spectrum Clocking",
      "Low EMI emission",
    ],
  },
  {
    id: "embedded-systems",
    name: "Embedded Systems",
    fullName: "Embedded Processors",
    category: "Embedded",
    description:
      "ARM Cortex-M based embedded processors with integrated analog peripherals.",
    longDescription:
      "ARM Cortex-M based embedded processors with integrated analog peripherals for industrial control and edge AI applications, featuring TrustZone security and DSP extensions.",
    specs: [
      "Cortex-M Series",
      "TrustZone",
      "DSP Extensions",
      "Ultra-Low Power",
    ],
    applications: [
      "Industrial Control",
      "Edge Computing",
      "IoT Gateways",
      "Smart Sensors",
    ],
    image:
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=600&fit=crop",
    icon: Layers,
    gradient: "from-orange-500 to-red-500",
    lightGradient: "from-orange-50 to-red-50",
    color: "orange",
    features: [
      "ARM Cortex-M4/M7 core",
      "Operating frequency: 200MHz",
      "Flash: 2MB, RAM: 512KB",
      "TrustZone security",
    ],
  },
  {
    id: "rf-solutions",
    name: "RF Solutions",
    fullName: "RF Front End & Beamformers",
    category: "RF & Wireless",
    description:
      "Advanced RF front-end modules and beamforming solutions for wireless communications.",
    longDescription:
      "Advanced RF front-end modules and beamforming solutions for 5G, radar, and satellite communications with integrated LNAs, PAs, and phase shifters.",
    specs: ["6-18 GHz", "32 Channels", "Beamforming", "Low Noise"],
    applications: [
      "5G Infrastructure",
      "Phased Array Radar",
      "Satellite Communications",
      "Defense Systems",
    ],
    image:
      "https://images.unsplash.com/photo-1581092335871-4d6e2e1b0a5a?w=800&h=600&fit=crop",
    icon: Wifi,
    gradient: "from-indigo-500 to-purple-500",
    lightGradient: "from-indigo-50 to-purple-50",
    color: "indigo",
    features: [
      "Frequency range: 6-18 GHz",
      "32-channel beamforming",
      "Integrated LNA and PA",
      "6-bit phase and amplitude control",
    ],
  },
];

const categories = [
  "All",
  "Power Management",
  "Data Conversion",
  "Connectivity",
  "Embedded",
  "RF & Wireless",
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
        },
      );

      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.05,
            ease: "back.out(0.4)",
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory, searchTerm]);

  const handleCardHover = (index: number, isEnter: boolean) => {
    setHoveredCard(isEnter ? index : null);
  };

  return (
    <>
      <Navbar />
      <main
        ref={sectionRef}
        className="bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen"
      >
        {/* Hero Section */}
        <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-200/20 rounded-full blur-3xl" />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgb(14, 165, 233) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          <div
            ref={heroRef}
            className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-center py-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 shadow-sm mb-6">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
                Our Portfolio
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
              Products
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive semiconductor solutions spanning power management,
              data conversion, connectivity, embedded systems, and RF
              technologies.
            </p>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            {/* Filters */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                      activeCategory === cat
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25"
                        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
                />
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => {
                const Icon = product.icon;
                const isHovered = hoveredCard === index;

                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    ref={(el) => {
                      if (el) cardsRef.current[index] = el as HTMLDivElement;
                    }}
                    className="group relative block"
                    onMouseEnter={() => handleCardHover(index, true)}
                    onMouseLeave={() => handleCardHover(index, false)}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${product.gradient} rounded-2xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                    />

                    <Card className="relative overflow-hidden bg-white border-slate-200 hover:shadow-xl transition-all duration-500 h-full flex flex-col group-hover:-translate-y-2 cursor-pointer">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${product.gradient} mix-blend-multiply opacity-40`}
                        />

                        <div className="absolute top-4 left-4">
                          <div
                            className={`px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-sm shadow-lg`}
                          >
                            <span className="text-xs font-bold text-slate-800">
                              {product.category}
                            </span>
                          </div>
                        </div>

                        <div
                          className={`absolute bottom-4 right-4 w-12 h-12 rounded-xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg transition-all duration-300 ${isHovered ? "scale-110" : ""}`}
                        >
                          <Icon
                            className={`w-6 h-6 transition-colors duration-300`}
                            style={{
                              color: isHovered ? `#0ea5e9` : "#475569",
                            }}
                          />
                        </div>
                      </div>

                      <div className="p-6 flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-700 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                          {product.name}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                          {product.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {product.specs.slice(0, 3).map((spec, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 rounded-md bg-slate-100 text-xs font-medium text-slate-600"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>

                        <div
                          className={`inline-flex items-center gap-2 font-semibold transition-all duration-300 ${
                            isHovered ? `text-blue-600 gap-3` : "text-slate-700"
                          }`}
                        >
                          Learn More
                          <ArrowRight
                            className={`w-4 h-4 transition-all duration-300 ${isHovered ? "translate-x-1" : ""}`}
                          />
                        </div>
                      </div>

                      <div
                        className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
                      >
                        <div
                          className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${product.gradient} opacity-20`}
                        />
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  No products found
                </h3>
                <p className="text-slate-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}

            {/* CTA Section */}
            <div className="mt-20 pt-12 border-t border-slate-200">
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Need Custom Solutions?
                </h3>
                <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                  Contact our sales team for enterprise implementations and
                  custom IP development
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Get in Touch
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
