"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  Send,
  CheckCircle,
  Mail,
  User,
  Building,
  Phone,
  MessageSquare,
  Sparkles,
  MapPin,
  Clock,
  Headphones,
  Award,
  Shield,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ContactFormProps {
  title?: string;
  subtitle?: string;
  onSubmit?: (data: any) => Promise<void>;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  title = "Get In Touch",
  subtitle = "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  onSubmit,
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate left side content
      gsap.fromTo(
        leftContentRef.current,
        { opacity: 0, x: -80, filter: "blur(8px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "back.out(0.4)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Animate left side items with stagger
      gsap.fromTo(
        ".left-item",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.3,
          ease: "power3.out",
        },
      );

      // Animate form container
      gsap.fromTo(
        ".form-container",
        { opacity: 0, x: 80, filter: "blur(8px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "back.out(0.4)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Animate form groups
      gsap.fromTo(
        ".form-group-animate",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          delay: 0.5,
          ease: "power2.out",
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Form submitted:", formData);
      }

      setSuccess(true);

      gsap.to(".form-success", {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.5)",
      });

      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: "",
      });

      setTimeout(() => {
        gsap.to(".form-success", {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => setSuccess(false),
        });
      }, 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      gsap.to(formRef.current, {
        x: -10,
        duration: 0.1,
        repeat: 5,
        yoyo: true,
        ease: "power2.inOut",
      });
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { icon: Headphones, label: "24/7 Support", value: "Always Available" },
    { icon: Clock, label: "Avg Response", value: "< 2 Hours" },
    { icon: Award, label: "Happy Clients", value: "500+" },
    { icon: Shield, label: "Secure", value: "ISO 27001" },
  ];

  return (
    <section className="relative py-20 md:py-28 lg:py-32 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-100/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-100/20 rounded-full blur-3xl" />

        {/* Diagonal Pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.02]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="diagonal"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="40"
                stroke="#1e293b"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonal)" />
        </svg>
      </div>

      <div
        ref={containerRef}
        className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl relative z-10"
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Content with Animations */}
          <div ref={leftContentRef} className="space-y-8">
            {/* Header */}
            <div className="left-item">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200/50 shadow-sm mb-6">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-semibold bg-gradient-to-r from-indigo-700 to-blue-700 bg-clip-text text-transparent">
                  Let's Connect
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                  {title}
                </span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {subtitle}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 left-item">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">{stat.label}</p>
                      <p className="text-sm font-semibold text-slate-800">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-3 left-item">
              <div className="flex items-center gap-3 p-3 bg-white/60 rounded-xl border border-slate-100">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-sm text-slate-600">
                  123 Innovation Drive, San Francisco, CA
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/60 rounded-xl border border-slate-100">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm text-slate-600">
                  hello@smartscope.com
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/60 rounded-xl border border-slate-100">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm text-slate-600">
                  +1 (555) 123-4567
                </span>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="left-item flex items-center gap-4 pt-4 border-t border-slate-200">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Trusted by 500+ companies
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-3 h-3 text-amber-400 fill-amber-400"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                  <span className="text-xs text-slate-500 ml-1">4.9/5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="form-container">
            {/* Success Message */}
            {success && (
              <div className="form-success fixed inset-0 flex items-center justify-center z-50 opacity-0 scale-75 pointer-events-none">
                <div className="bg-white rounded-2xl p-8 text-center shadow-2xl border border-emerald-200 max-w-sm mx-4">
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Message Sent! 🎉
                  </h3>
                  <p className="text-slate-600">
                    Thank you for reaching out. We'll get back to you within 24
                    hours.
                  </p>
                </div>
              </div>
            )}

            {/* Form Card */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-slate-200"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 flex items-center justify-center shadow-lg">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Send us a Message
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Fill out the form and we'll respond shortly
                </p>
              </div>

              <div className="space-y-4">
                {/* Name */}
                <div className="form-group-animate">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <User
                      className={`w-4 h-4 transition-colors duration-300 ${focusedField === "name" ? "text-indigo-500" : "text-slate-400"}`}
                    />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div className="form-group-animate">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <Mail
                      className={`w-4 h-4 transition-colors duration-300 ${focusedField === "email" ? "text-indigo-500" : "text-slate-400"}`}
                    />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Company & Phone Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group-animate">
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                      <Building className="w-4 h-4 text-slate-400" />
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                      placeholder="Your Company"
                    />
                  </div>
                  <div className="form-group-animate">
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                      <Phone className="w-4 h-4 text-slate-400" />
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="form-group-animate">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <MessageSquare className="w-4 h-4 text-slate-400" />
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all duration-300 resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="form-submit w-full py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-200 transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </>
                  )}
                </button>

                {/* Response Time Note */}
                <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-1">
                  <Clock className="w-3 h-3" />
                  Usually responds within 2 hours
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
