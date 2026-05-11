import { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/Home1/Hero";
import { ProductShowcase } from "@/components/Home1/ProductShowcase";
import { Features } from "@/components/Home1/Features";
import AboutPage from "@/components/Home1/About";
import { CTASection } from "@/components/Home1/Ctasection";
import { Navbar } from "@/components/Home1/Navbar";

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
        {/* <ProductShowcase /> */}
        <Features />
        <AboutPage />
        {/* CTA Section */}
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
