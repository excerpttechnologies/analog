//////////////////////////

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  ChevronLeft,
  ChevronRight,
  Shield,
  Cpu,
  CircuitBoard,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

// Slider content array with background images
const sliderContent = [
  {
    id: 1,
    title: "Design in India. Make in India.",
    title2: "Deliver worldwide.",
    subtitle:
      "Delivering globally competitive Analog IPs and semiconductor solutions that serve customers across India and international markets.",

    ctaText: "Explore Products",
    ctaLink: "/products",
    secondaryCta: "Contact Us",
    backgroundImage: "/images/slider-1.png",
    // backgroundImage: "/images/banner.png",
    gradient: "from-blue-600 to-cyan-500",
    gradientLight: "from-blue-500 to-cyan-400",

    features: ["Power Management", "Analog ICs", "Domestic & Overseas"],
  },
  {
    id: 2,
    title: "Advancing India's Semiconductor",
    title2: "Self-Reliance.",
    subtitle:
      "Building indigenous Analog IPs and products that strengthen the domestic ecosystem and contribute to India's growing semiconductor capabilities.",

    ctaText: "About Us",
    ctaLink: "/about",
    secondaryCta: "Contact Us",
    backgroundImage: "/images/slider-2.png",
    gradient: "from-orange-600 to-red-500",
    gradientLight: "from-orange-500 to-red-400",

    features: ["Fabless Design", "Indian Owned IPs", "Global Deployment"],
  },

  {
    id: 3,
    title: "Engineering Analog Excellence",
    subtitle:
      "Delivering high-performance Analog and Mixed-Signal Product and IPs that enable automotive, industrial and consumer applications.",

    ctaText: "Leadership",
    ctaLink: "/leadership",
    secondaryCta: "Contact Us",
    backgroundImage: "/images/slider-3.png",
    gradient: "from-green-600 to-green-500",
    gradientLight: "from-orange-500 to-red-400",

    features: ["Fabless Design", "Indian Owned IPs", "Global Deployment"],
  },

  {
    id: 4,
    title: "From Concept to Silicon.",
    title2: "From Silicon to Solutions.",
    subtitle:
      "We partner with semiconductor and system companies to transform complex analog challenges into production-ready silicon and real-world solutions.",

    ctaText: "Markets",
    ctaLink: "/market",
    secondaryCta: "Contact Us",
    backgroundImage: "/images/slider-4.png",
    gradient: "from-red-600 to-[#001635]",
    gradientLight: "from-orange-500 to-red-400",

    features: ["Fabless Design", "Indian Owned IPs", "Global Deployment"],
  },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

  const currentSlide = sliderContent[activeIndex];
  const nextSlide = sliderContent[(activeIndex + 1) % sliderContent.length];

  // Auto-slide functionality
  const startAutoSlide = () => {
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    autoSlideRef.current = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 6000);
  };

  const stopAutoSlide = () => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
      autoSlideRef.current = null;
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [activeIndex, isAnimating]);

  const handlePrev = () => {
    if (isAnimating) return;
    setDirection("prev");
    setIsAnimating(true);
    setActiveIndex((prev) =>
      prev === 0 ? sliderContent.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    if (isAnimating) return;
    setDirection("next");
    setIsAnimating(true);
    setActiveIndex((prev) =>
      prev === sliderContent.length - 1 ? 0 : prev + 1,
    );
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    setDirection(index > activeIndex ? "next" : "prev");
    setIsAnimating(true);
    setActiveIndex(index);
  };

  // GSAP animations for background and content
  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        onComplete: () => setIsAnimating(false),
      });

      const directionValue = direction === "next" ? 30 : -30;

      // Animate background image transition
      timeline
        .to(".bg-slider-image", {
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
        })
        .set(".bg-slider-image", {
          backgroundImage: `url(${currentSlide.backgroundImage})`,
        })
        .to(".bg-slider-image", {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        });

      // Animate gradient overlay
      timeline.to(
        ".gradient-overlay",
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        },
        "-=0.5",
      );
      timeline.set(".gradient-overlay", {
        background: `linear-gradient(135deg, rgba(0, 0, 0, 0.92) 0%,transparent 100%)`,
      });
      timeline.to(
        ".gradient-overlay",
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3",
      );

      // Animate content elements
      timeline
        .to(".content-wrapper > *", {
          opacity: 0,
          y: -directionValue,
          stagger: 0.05,
          duration: 0.25,
          ease: "power2.in",
        })
        .set(".content-wrapper", { clearProps: "all" })
        .fromTo(
          ".hero-badge",
          { opacity: 0, y: directionValue, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "back.out(0.4)",
          },
          "-=0.1",
        )
        .fromTo(
          ".hero-title",
          { opacity: 0, y: directionValue, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.35",
        )
        .fromTo(
          ".hero-subtitle",
          { opacity: 0, y: directionValue * 0.7, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .fromTo(
          ".feature-tag",
          { opacity: 0, scale: 0.8, stagger: 0.05 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.35,
            stagger: 0.05,
            ease: "back.out(0.3)",
          },
          "-=0.3",
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          "-=0.25",
        )
        .fromTo(
          ".hero-stats .stat-item",
          { opacity: 0, y: 15, stagger: 0.08 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.2",
        );
    }, containerRef);

    return () => ctx.revert();
  }, [activeIndex, direction, currentSlide]);

  // Initial load animation
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline();

      timeline
        .fromTo(
          ".bg-slider-image",
          { opacity: 0, scale: 1.1 },
          { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
        )
        .fromTo(
          ".gradient-overlay",
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.8",
        )
        .fromTo(
          ".hero-badge",
          { opacity: 0, y: -30, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(0.5)" },
          "-=0.3",
        )
        .fromTo(
          ".hero-title",
          { opacity: 0, y: 50, filter: "blur(12px)" },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            filter: "blur(0px)",
            ease: "power3.out",
          },
          "-=0.4",
        )
        .fromTo(
          ".hero-subtitle",
          { opacity: 0, y: 30, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            filter: "blur(0px)",
            ease: "power3.out",
          },
          "-=0.5",
        )
        .fromTo(
          ".feature-tag",
          { opacity: 0, scale: 0.8, stagger: 0.05 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.05,
            ease: "back.out(0.3)",
          },
          "-=0.4",
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.3",
        )
        .fromTo(
          ".hero-stats .stat-item",
          { opacity: 0, y: 20, stagger: 0.1 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
          "-=0.2",
        )
        .fromTo(
          ".slider-dots .dot",
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.05,
            ease: "back.out(0.6)",
          },
          "-=0.1",
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
      className="relative md:min-h-[65vh] h-[40vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Slider Image */}
      <div
        className="bg-slider-image absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url(${currentSlide.backgroundImage})`,
        }}
      />

      {/* Gradient Overlay */}
      <div className="gradient-overlay absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />

      {/* Animated particles overlay */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float-particle ${3 + Math.random() * 5}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div
        ref={contentRef}
        className="relative z-10 container  float-left px-4  max-w-8xl  py-16 md:py-20"
      >
        <div className="content-wrapper  md:max-w-8xl max-w-[85vw] mr-auto">
          {/* Badge */}

          {/* Title */}
          <h1 className="hero-title text-2xl md:text-4xl lg:text-5xl  whitespace-nowrap font-bold text-white mb-3.5 leading-[1.1] tracking-tight">
            {currentSlide.title}
          </h1>
          <h1 className="hero-title text-2xl whitespace-nowrap md:text-4xl lg:text-5xl  font-bold text-white mb-4 leading-[1.1] tracking-tight">
            {currentSlide.title2}
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-md md:text-xl text-white/80 md:leading-8 leading-6 mb-7 max-w-[80vw] md:max-w-3xl ">
            {currentSlide.subtitle}
          </p>

          {/* Feature Tags */}
          {/* <div className="flex flex-wrap gap-2 mb-6">
            {currentSlide.features.map((feature, idx) => (
              <span
                key={idx}
                className="feature-tag px-3 py-1 text-xs font-medium rounded-full bg-white/10 backdrop-blur-sm text-white/90 border border-white/20"
              >
                {feature}
              </span>
            ))}
          </div> */}

          {/* CTA Buttons */}
          <div className="hero-cta flex flex-col sm:flex-row gap-4">
            {/* <Button
              asChild
              className={`bg-gradient-to-r ${currentSlide.gradient} hover:opacity-90 text-white font-semibold py-6 px-8 rounded shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 group`}
            >
              <Link href={currentSlide.ctaLink}>
                {currentSlide.ctaText}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button> */}
            <Button
              variant="outline"
              className="border-white/30 bg-white/10 backdrop-blur-sm w-fit hover:bg-white/20 text-white md:py-6 py-5  px-8 font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            >
              <Link href="/contact">{currentSlide.secondaryCta}</Link>
            </Button>
          </div>

          {/* Stats */}
          {/* <div className="hero-stats mt-10 flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
            {currentSlide.stats.map((stat, idx) => {
              const IconComponent = stat.icon;
              return (
                <div key={idx} className="stat-item flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg bg-gradient-to-r ${currentSlide.gradientLight} bg-opacity-20 flex items-center justify-center`}
                  >
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-xl text-white">{stat.value}</p>
                    <p className="text-white/60 text-xs">{stat.label}</p>
                  </div>
                  {idx < currentSlide.stats.length - 1 && (
                    <div className="h-8 w-px bg-white/20 hidden sm:block" />
                  )}
                </div>
              );
            })}
          </div> */}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute hidden left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 md:flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 group z-20"
        disabled={isAnimating}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 text-white group-hover:text-cyan-300" />
      </button>
      <button
        onClick={handleNext}
        className="absolute  hidden right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 md:flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 group z-20"
        disabled={isAnimating}
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 text-white group-hover:text-cyan-300" />
      </button>

      {/* Slide Indicators */}
      <div className="slider-dots absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3">
        {sliderContent.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className="group relative"
            aria-label={`Go to slide ${idx + 1}`}
          >
            <div
              className={`dot h-1.5 rounded-full transition-all duration-500 ${
                idx === activeIndex
                  ? `w-8 md:w-10 bg-gradient-to-r ${currentSlide.gradient}`
                  : "w-1.5 bg-white/40 group-hover:bg-white/60 group-hover:w-3"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-4 md:right-8 text-xs text-white/60 font-medium">
        {String(activeIndex + 1).padStart(2, "0")} /{" "}
        {String(sliderContent.length).padStart(2, "0")}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-60">
        <span className="text-xs text-white/60">Scroll</span>
        <div className="w-4 h-6 border border-white/30 rounded-full flex justify-center">
          <div className="w-0.5 h-1.5 bg-white/50 rounded-full mt-1 animate-bounce" />
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float-particle {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          25% {
            transform: translateY(-30px) translateX(15px);
            opacity: 0.5;
          }
          50% {
            transform: translateY(0px) translateX(30px);
            opacity: 0.8;
          }
          75% {
            transform: translateY(30px) translateX(15px);
            opacity: 0.5;
          }
        }
      `}</style>
    </section>
  );
}
