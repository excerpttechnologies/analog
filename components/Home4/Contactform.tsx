"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
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
  Shield,
  Calendar,
  Linkedin,
  Twitter,
  Instagram,
  Heart,
  Coffee,
  Smile,
  Star,
  ThumbsUp,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const ContactForm: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const testimonials = [
    {
      name: "Emily Watson",
      role: "CTO at TechFlow",
      image: "/avatar1.jpg",
      text: "Outstanding support and innovative solutions!",
      rating: 5,
    },
    {
      name: "David Chen",
      role: "Product Director",
      image: "/avatar2.jpg",
      text: "The team delivered beyond our expectations.",
      rating: 5,
    },
  ];

  const officeHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-card",
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".info-card",
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(0.4)",
          scrollTrigger: {
            trigger: ".info-section",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".form-group",
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".form-section",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSuccess(true);
    setFormData({ name: "", email: "", company: "", phone: "", message: "" });
    setTimeout(() => setSuccess(false), 5000);
    setLoading(false);
  };

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden bg-white">
      
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-orange-100/50 to-red-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-yellow-100/50 to-orange-100/50 rounded-full blur-3xl" />
        
        {/* Dot Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(234, 88, 12) 1px, transparent 1px)`,
            backgroundSize: "32px 32px"
          }}
        />
      </div>

      <div className="contact-card container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* LEFT SIDE - Brand & Info with Image */}
          <div className="info-section space-y-6">
            {/* Hero Image Card */}
            <div className="info-card relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="relative h-64 bg-gradient-to-br from-orange-500 to-red-500">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl backdrop-blur-sm flex items-center justify-center mb-4">
                    <Coffee className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold">Let's Create Together</h3>
                  <p className="text-white/90 mt-2">We'd love to hear from you</p>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              
              {/* Stats overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between gap-2">
                <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-xl p-2 text-center">
                  <div className="text-lg font-bold text-orange-600">500+</div>
                  <div className="text-xs text-gray-600">Clients</div>
                </div>
                <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-xl p-2 text-center">
                  <div className="text-lg font-bold text-orange-600">99%</div>
                  <div className="text-xs text-gray-600">Satisfaction</div>
                </div>
                <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-xl p-2 text-center">
                  <div className="text-lg font-bold text-orange-600">24/7</div>
                  <div className="text-xs text-gray-600">Support</div>
                </div>
              </div>
            </div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="info-card p-4 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email Us</p>
                    <p className="text-sm font-semibold text-gray-800">hello@creativelab.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Call Us</p>
                    <p className="text-sm font-semibold text-gray-800">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>

              <div className="info-card p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Visit Us</p>
                    <p className="text-sm font-semibold text-gray-800">Creative District, NYC</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Response Time</p>
                    <p className="text-sm font-semibold text-gray-800">Within 2 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="info-card space-y-3">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-semibold text-gray-700">What our clients say</span>
              </div>
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">{testimonial.name}</p>
                      <p className="text-xs text-gray-500">{testimonial.role}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">{testimonial.text}</p>
                </div>
              ))}
            </div>

            {/* Office Hours */}
            <div className="info-card p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-semibold text-gray-800">Office Hours</span>
              </div>
              <div className="space-y-1">
                {officeHours.map((schedule, idx) => (
                  <div key={idx} className="flex justify-between text-xs">
                    <span className="text-gray-600">{schedule.day}</span>
                    <span className="text-gray-800 font-medium">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Contact Form */}
          <div className="form-section">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-100"
            >
              {/* Form Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Send a Message</h3>
                <p className="text-gray-500 text-sm">We'll get back to you within 24 hours</p>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div className="form-group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <User className="w-4 h-4 text-orange-500" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setActiveField("name")}
                    onBlur={() => setActiveField(null)}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none ${
                      activeField === "name"
                        ? "border-orange-400 ring-4 ring-orange-100"
                        : "border-gray-200 focus:border-orange-400"
                    }`}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Mail className="w-4 h-4 text-orange-500" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Building className="w-4 h-4 text-orange-500" />
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all"
                      placeholder="Your Company"
                    />
                  </div>

                  <div className="form-group">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Phone className="w-4 h-4 text-orange-500" />
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <MessageSquare className="w-4 h-4 text-orange-500" />
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all resize-none"
                    placeholder="Tell us about your project..."
                    required
                  />
                </div>

                {/* Social Connect */}
                <div className="flex items-center justify-center gap-3 pt-2">
                  <span className="text-xs text-gray-500">Connect with us:</span>
                  <button type="button" className="p-1.5 rounded-lg bg-gray-100 hover:bg-orange-100 transition-colors">
                    <Twitter className="w-4 h-4 text-gray-600 hover:text-orange-500" />
                  </button>
                  <button type="button" className="p-1.5 rounded-lg bg-gray-100 hover:bg-orange-100 transition-colors">
                    <Linkedin className="w-4 h-4 text-gray-600 hover:text-orange-500" />
                  </button>
                  <button type="button" className="p-1.5 rounded-lg bg-gray-100 hover:bg-orange-100 transition-colors">
                    <Instagram className="w-4 h-4 text-gray-600 hover:text-orange-500" />
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-orange-200 transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
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

                {/* Trust Badge */}
                <div className="flex items-center justify-center gap-2 pt-2">
                  <Shield className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-gray-500">Your information is secure</span>
                  <ThumbsUp className="w-3 h-3 text-orange-500" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {success && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-8 text-center shadow-2xl max-w-sm mx-4 transform animate-slide-up">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle className="w-10 h-10 text-orange-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Message Sent! 🎉</h3>
            <p className="text-orange-100 mb-4">
              Thank you for reaching out. Our team will respond within 24 hours.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="px-6 py-2 bg-white text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition-all"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
      `}</style>
    </section>
  );
};

export default ContactForm;