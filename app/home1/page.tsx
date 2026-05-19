import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/Home2/Hero";
import { ProductShowcase } from "@/components/Home2/ProductShowcase";
import { Features } from "@/components/Home2/Features";
import AboutPage from "@/components/Home2/About";
import { CTASection } from "@/components/Home2/Ctasection";

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
