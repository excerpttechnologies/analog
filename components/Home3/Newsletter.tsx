"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  Send,
  CheckCircle,
  Mail,
  Sparkles,
  ArrowRight,
  Shield,
  Clock,
  Users,
  Bell,
  Gift,
  Rocket,
  Star,
  Zap,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface NewsletterProps {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonText?: string;
  onSubmit?: (email: string) => Promise<void>;
}

export const Newsletter: React.FC<NewsletterProps> = ({
  title = "Stay Updated",
  subtitle = "Get the latest news and updates delivered to your inbox.",
  placeholder = "Enter your email",
  buttonText = "Subscribe",
  onSubmit,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Main container animation
      gsap.fromTo(
        ".newsletter-card",
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(0.4)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Decorative elements animation
      gsap.fromTo(
        ".deco-element",
        { opacity: 0, scale: 0 },
        {
          opacity: 0.15,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.3,
          ease: "back.out(0.5)",
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (onSubmit) {
        await onSubmit(email);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Newsletter subscription:", email);
      }

      setSuccess(true);
      setEmail("");

      gsap.to(".newsletter-success", {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.5)",
      });

      setTimeout(() => {
        gsap.to(".newsletter-success", {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => setSuccess(false),
        });
      }, 3000);
    } catch (err) {
      console.error("Newsletter subscription error:", err);
      gsap.to(".newsletter-form", {
        x: -10,
        duration: 0.1,
        repeat: 3,
        yoyo: true,
        ease: "power2.inOut",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
      {/* Dark Theme Animated Background */}
      <div className="absolute inset-0 -z-10 w-full">
        {/* Gradient Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-3xl" />

        {/* Animated Grid */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.05]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="#fff"
                strokeWidth="0.5"
                strokeDasharray="2 4"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float-particle ${3 + Math.random() * 4}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div
        ref={containerRef}
        className="w-full max-w-5xl mx-auto px-4 md:px-6 lg:px-8 relative z-10"
      >
        {/* Split Layout - Left Content + Right Form */}
        <div className="newsletter-card grid lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 overflow-hidden shadow-2xl">
          {/* Left Side - Content */}
          <div className="p-8 md:p-10 lg:p-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 mb-6">
              <Bell className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wide">
                Never Miss an Update
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {title}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                Exclusive Content
              </span>
            </h2>

            {/* Description */}
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8">
              {subtitle}
            </p>

            {/* Benefits List */}
            <div className="space-y-4 mb-8">
              {[
                {
                  icon: Zap,
                  text: "Early access to new features",
                  color: "blue",
                },
                {
                  icon: Gift,
                  text: "Exclusive discounts & offers",
                  color: "purple",
                },
                {
                  icon: Star,
                  text: "Industry insights & trends",
                  color: "amber",
                },
              ].map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <div key={idx} className="flex items-center gap-3 group">
                    <div
                      className={`w-8 h-8 rounded-full bg-${benefit.color}-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`w-4 h-4 text-${benefit.color}-400`} />
                    </div>
                    <span className="text-white/80 text-sm font-medium">
                      {benefit.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white/20"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">
                  10,000+ subscribers
                </p>
                <p className="text-white/50 text-xs">Join the community</p>
              </div>
            </div>
          </div>

          {/* Right Side - Form Card */}
          <div className="bg-white/5 backdrop-blur-sm p-8 md:p-10 lg:p-12 border-l border-white/10">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Subscribe Now
              </h3>
              <p className="text-white/50 text-sm">
                Get weekly updates straight to your inbox
              </p>
            </div>

            {/* Success Message */}
            {success && (
              <div className="newsletter-success fixed inset-0 flex items-center justify-center z-50 opacity-0 scale-75 pointer-events-none">
                <div className="bg-slate-900 rounded-2xl p-8 text-center shadow-2xl border border-emerald-500/30 max-w-sm mx-4">
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Subscribed! 🎉
                  </h3>
                  <p className="text-slate-400">
                    Thanks for subscribing! Check your inbox for updates.
                  </p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="newsletter-form space-y-4">
              <div className="relative">
                <Mail
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${isFocused ? "text-amber-400" : "text-white/40"}`}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder={placeholder}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-400/20 transition-all duration-300 text-white placeholder:text-white/40"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <>
                    <span>{buttonText}</span>
                    <Rocket className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </>
                )}
              </button>
            </form>

            {/* Privacy Note */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-white/30">
              <Shield className="w-3 h-3" />
              <span>No spam • Unsubscribe anytime</span>
            </div>

            {/* Progress Bar */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between text-xs text-white/30 mb-2">
                <span>Community growth</span>
                <span>+28% this month</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Floating Elements */}
        <div className="deco-element absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-2xl -z-10" />
        <div className="deco-element absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl -z-10" />
        <div className="deco-element absolute top-1/2 -right-20 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl -z-10 animate-pulse" />
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
            opacity: 0.4;
          }
          50% {
            transform: translateY(0px) translateX(30px);
            opacity: 0.6;
          }
          75% {
            transform: translateY(30px) translateX(15px);
            opacity: 0.4;
          }
        }
      `}</style>
    </section>
  );
};

export default Newsletter;
