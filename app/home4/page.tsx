"use client";

import ContactForm from "@/components/Home4/Contactform";
import HeroSection from "@/components/Home4/Hero";
import Newsletter from "@/components/Home4/Newsletter";
import ProductsSection from "@/components/Home4/ProductShowcase";
import TechnologySection from "@/components/Home4/Technologysection";
import { Footer } from "@/components/layout/Footer";
import {Navbar} from "@/components/Home4/Navbar";
import React from "react";

export default function Home() {
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-primary-50 to-white overflow-x-hidden">
      <Navbar />

      <section id="home">
        <HeroSection
          onCtaClick={() => scrollToSection("#newsletter")}
          onLearnMoreClick={() => scrollToSection("#products")}
        />
      </section>

      <section id="products">
        <ProductsSection />
      </section>

     <section id="technology">
        <TechnologySection />
      </section>

      {/* <section id="newsletter">
        <Newsletter />
      </section>   */}

      <section id="contact">
        <ContactForm />
      </section>

      <Footer />
    </main>
  );
}