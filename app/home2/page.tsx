import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/Home3/Hero";
import { ProductShowcase } from "@/components/Home3/ProductShowcase";
import { Features } from "@/components/Home3/Features";

import { CTASection } from "@/components/Home3/Ctasection";
import { AboutSection } from "@/components/Home3/About";

export const metadata: Metadata = {
  title: "SmartScope - Premium Semiconductor Solutions",
  description:
    "Cutting-edge semiconductor technology for signal processing, data conversion, and AI-enhanced analog systems.",
  openGraph: {
    title: "SmartScope - Premium Semiconductor Solutions",
    description:
      "Cutting-edge semiconductor technology for signal processing, data conversion, and AI-enhanced analog systems.",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProductShowcase />
        <Features />
        <AboutSection />
        {/* CTA Section */}
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
