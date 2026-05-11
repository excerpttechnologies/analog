import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { Features } from "@/components/home/Features";
import { AboutSection } from "@/components/home/About";
import { CTASection } from "@/components/home/Ctasection";

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
        <AboutSection />
        {/* CTA Section */}
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
