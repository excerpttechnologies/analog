"use client";

import ContactForm from "@/components/Home3/Contactform";
import HeroSection from "@/components/Home3/Hero";
import Newsletter from "@/components/Home3/Newsletter";
import ProductsSection from "@/components/Home3/ProductShowcase";
import TechnologySection from "@/components/Home3/Technologysection";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import React, { useState } from "react";

export default function Home() {
  const [contactMessage, setContactMessage] = useState("");

  // Sample products data
  const products = [
    {
      id: "analog-front-end",
      title: "Analog Front End",
      description:
        "Precision signal conditioning and filtering for optimal analog-to-digital conversion.",
      icon: "📡",
      features: [
        "Low noise amplification",
        "Advanced filtering",
        "Signal conditioning",
        "Impedance matching",
      ],
      ctaText: "Learn More",
    },
    {
      id: "digital-signal-controller",
      title: "Digital Signal Controller",
      description:
        "Real-time signal processing with high-speed computation and low-latency response.",
      icon: "⚙️",
      features: [
        "Real-time processing",
        "High-speed computation",
        "Low latency",
        "Multi-channel support",
      ],
      ctaText: "Learn More",
    },
    {
      id: "analog-ics",
      title: "Analog ICs",
      description:
        "Industry-leading integrated circuits designed for maximum performance and reliability.",
      icon: "🔌",
      features: [
        "High performance",
        "Low power consumption",
        "Wide temperature range",
        "Reliability tested",
      ],
      ctaText: "Learn More",
    },
  ];

  // Technology features
  const techFeatures = [
    {
      id: "1",
      label: "Precision",
      description: "Ultra-high precision measurement",
    },
    { id: "2", label: "Speed", description: "Lightning-fast processing" },
    { id: "3", label: "Reliability", description: "99.99% uptime guaranteed" },
    { id: "4", label: "Integration", description: "Seamless integration" },
  ];

  // Handle form submission
  const handleContactSubmit = async (data: any) => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setContactMessage(
        "Thank you for your message. We will get back to you soon!",
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    }
  };

  // Handle newsletter submission
  const handleNewsletterSubmit = async (email: string) => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      throw error;
    }
  };

  // Handle product click
  const handleProductClick = (productId: string) => {
    console.log("Product clicked:", productId);
    // Add your product detail navigation here
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-primary-50 to-white overflow-x-hidden">
      {/* Header Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section id="home">
        <HeroSection
          title="Redefining Precision in Analog Signal Chains"
          subtitle="Next Generation Technology"
          description="Experience cutting-edge analog signal processing solutions that deliver unparalleled precision, reliability, and performance for industrial and commercial applications."
          ctaText="Subscribe for Updates"
          learnMoreText="Learn More"
          onCtaClick={() => {
            const element = document.querySelector("#newsletter");
            element?.scrollIntoView({ behavior: "smooth" });
          }}
          onLearnMoreClick={() => {
            const element = document.querySelector("#products");
            element?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      </section>

      {/* Products Section */}
      <section id="products">
        <ProductsSection
          title="Standard IC Products"
          subtitle="Our Product Range"
          products={products}
          onProductClick={handleProductClick}
        />
      </section>

      {/* Technology Section */}
      <section id="technology">
        <TechnologySection
          title="Our Technology"
          subtitle="Advanced Solutions"
          description="Leveraging cutting-edge technology and years of research, we deliver solutions that set new standards in analog signal processing. Our proprietary algorithms and hardware designs ensure maximum performance and reliability."
          features={techFeatures}
          ctaText="Explore Our Technology"
          onCtaClick={() => {
            const element = document.querySelector("#contact");
            element?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      </section>

      {/* Newsletter Section */}
      <section id="newsletter">
        <Newsletter
          title="Stay Updated"
          subtitle="Subscribe to our newsletter for the latest updates and news."
          placeholder="your@email.com"
          buttonText="Subscribe"
          onSubmit={handleNewsletterSubmit}
        />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <ContactForm
          title="Get In Touch"
          subtitle="We'd love to hear from you. Send us a message and we'll respond as soon as possible."
          onSubmit={handleContactSubmit}
        />
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
