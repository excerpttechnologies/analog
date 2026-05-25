"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import {
  ArrowRight,
  Cpu,
  Zap,
  Shield,
  Microchip,
  Target,
  Sparkles,
  CheckCircle,
  Battery,
  Radio,
  GitBranch,
  Layers,
  Wifi,
  Home,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  TrendingUp,
  Clock,
  Thermometer,
  Package,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Product data - Supporting multiple slug variations
const productsData: Record<string, any> = {
  // Boost Converter
  "boost-converter": {
    id: "boost-converter",
    name: "Boost Converter",
    fullName: "Synchronous Boost Converter",
    category: "Power Management",
    description:
      "Compact boost converter for efficient voltage regulation in battery-operated portable electronics",
    longDescription:
      "Our advanced synchronous boost converter delivers exceptional power conversion efficiency for battery-operated portable electronics. Featuring a wide input voltage range of 2.5V to 5.5V and output up to 12V, this device is ideal for applications requiring voltage step-up from single-cell Li-Ion batteries. The integrated synchronous rectification eliminates external Schottky diodes, reducing BOM cost and PCB footprint while achieving up to 95% efficiency. With true shutdown isolation and output disconnect during shutdown, the device prevents battery drain when not in operation. The built-in soft-start feature limits inrush current during startup, and comprehensive protection features include over-current limiting, over-voltage protection, and thermal shutdown.",
    specs: [
      { label: "Input Voltage", value: "2.5V - 5.5V" },
      { label: "Output Voltage", value: "Up to 12V" },
      { label: "Switching Frequency", value: "1.2MHz" },
      { label: "Peak Efficiency", value: "95%" },
      { label: "Quiescent Current", value: "25µA" },
      { label: "Output Current", value: "Up to 2A" },
      { label: "Package", value: "WLCSP-9, QFN-12" },
      { label: "Operating Temp", value: "-40°C to +85°C" },
    ],
    applications: [
      "Portable Medical Devices",
      "Bluetooth Speakers",
      "Battery-Powered IoT Sensors",
      "Handheld Instruments",
      "LED Backlighting",
      "USB Power Banks",
      "Wearable Electronics",
      "Smart Home Devices",
    ],
    features: [
      "Synchronous rectification for high efficiency",
      "True shutdown isolation",
      "Adjustable soft-start",
      "Over-current and over-voltage protection",
      "Thermal shutdown protection",
      "Low quiescent current (25µA)",
      "Power good indicator",
      "Output disconnect during shutdown",
    ],
    image:
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&h=600&fit=crop",
    icon: Zap,
    gradient: "from-blue-500 to-cyan-500",
    lightGradient: "from-blue-50 to-cyan-50",
    color: "blue",
    advantages: [
      { label: "Efficiency", value: "Up to 95%", icon: TrendingUp },
      { label: "IQ", value: "25µA", icon: Battery },
      { label: "Switching", value: "1.2MHz", icon: Clock },
      { label: "Temp Range", value: "-40°C to +85°C", icon: Thermometer },
    ],
  },

  // Buck Regulator
  "buck-regulator": {
    id: "buck-regulator",
    name: "Buck Regulator",
    fullName: "High Vin Synchronous Buck Regulator",
    category: "Power Management",
    description:
      "High input voltage tolerant buck regulator for computing, networking and general electronics",
    longDescription:
      "Our high-input voltage synchronous buck regulator is designed for demanding computing, networking, and industrial applications. With an input voltage range of 4.5V to 40V, it can handle wide input variations while delivering up to 3A of continuous output current. The device utilizes peak current mode control with internal compensation, simplifying design while maintaining excellent line and load regulation. The switching frequency is adjustable from 300kHz to 2.2MHz, allowing optimization between efficiency and component size. Features include power-good flag, enable pin, and programmable soft-start. Protection features include cycle-by-cycle current limiting, frequency foldback, and thermal shutdown with auto-recovery.",
    specs: [
      { label: "Input Voltage", value: "4.5V - 40V" },
      { label: "Output Current", value: "Up to 3A" },
      { label: "Switching Frequency", value: "300kHz - 2.2MHz" },
      { label: "Peak Efficiency", value: "92%" },
      { label: "Quiescent Current", value: "40µA" },
      { label: "Package", value: "QFN-16, SOP-8" },
      { label: "Operating Temp", value: "-40°C to +125°C" },
    ],
    applications: [
      "Networking Equipment",
      "Industrial Automation",
      "Telecom Infrastructure",
      "Consumer Electronics",
      "Automotive Infotainment",
      "Distributed Power Systems",
    ],
    features: [
      "Wide input voltage range (4.5V to 40V)",
      "Adjustable switching frequency",
      "Peak current mode control",
      "Power-good flag output",
      "Programmable soft-start",
      "Cycle-by-cycle current limiting",
      "Frequency foldback protection",
      "Thermal shutdown with auto-recovery",
    ],
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    icon: Battery,
    gradient: "from-purple-500 to-pink-500",
    lightGradient: "from-purple-50 to-pink-50",
    color: "purple",
    advantages: [
      { label: "Vin Range", value: "4.5V-40V", icon: TrendingUp },
      { label: "Iout", value: "3A", icon: Battery },
      { label: "Fsw", value: "Up to 2.2MHz", icon: Clock },
      { label: "Temp Range", value: "-40°C to +125°C", icon: Thermometer },
    ],
  },

  // LDO Regulator
  "ldo-regulator": {
    id: "ldo-regulator",
    name: "LDO Regulator",
    fullName: "Ultra-Low Dropout Linear Regulator",
    category: "Power Management",
    description:
      "Ultra low dropout regulator with high input voltage tolerance for consumer and embedded systems",
    longDescription:
      "Our ultra-low dropout linear regulator provides clean, stable voltage with minimal input-to-output differential. Featuring a dropout voltage of just 200mV at 1A, it's ideal for applications where input voltage is close to output voltage. The device operates from 2.7V to 20V input and delivers up to 1.5A output current with excellent line and load regulation. Ultra-low output noise (30µVrms) makes it perfect for noise-sensitive applications like audio and RF. The regulator is stable with small ceramic output capacitors, reducing board space and cost. Protection features include current limiting, thermal shutdown, and reverse current protection.",
    specs: [
      { label: "Input Voltage", value: "2.7V - 20V" },
      { label: "Output Current", value: "Up to 1.5A" },
      { label: "Dropout Voltage", value: "200mV @ 1A" },
      { label: "Output Noise", value: "30µVrms" },
      { label: "Quiescent Current", value: "65µA" },
      { label: "PSRR", value: "70dB @ 1kHz" },
      { label: "Package", value: "SOT-223, DFN-8" },
    ],
    applications: [
      "Audio Equipment",
      "RF Power Supplies",
      "Sensor Interfaces",
      "Post-Regulation for SMPS",
      "Portable Electronics",
      "Medical Instruments",
    ],
    features: [
      "Ultra-low dropout voltage (200mV @ 1A)",
      "Low output noise (30µVrms)",
      "High PSRR (70dB @ 1kHz)",
      "Stable with ceramic capacitors",
      "Current limiting protection",
      "Thermal shutdown protection",
      "Reverse current protection",
      "Adjustable output voltage option",
    ],
    image:
      "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&h=600&fit=crop",
    icon: Shield,
    gradient: "from-emerald-500 to-teal-500",
    lightGradient: "from-emerald-50 to-teal-50",
    color: "emerald",
    advantages: [
      { label: "Dropout", value: "200mV", icon: TrendingUp },
      { label: "Noise", value: "30µVrms", icon: Battery },
      { label: "PSRR", value: "70dB", icon: Clock },
      { label: "Iout", value: "1.5A", icon: Thermometer },
    ],
  },

  // LED Driver
  "led-driver": {
    id: "led-driver",
    name: "LED Driver",
    fullName: "Linear LED Driver",
    category: "Power Management",
    description:
      "High input voltage linear LED driver for commercial, industrial and decorative lighting with low BOM",
    longDescription:
      "Our high-input voltage linear LED driver provides a simple, cost-effective solution for driving LED strings in commercial and industrial lighting applications. Operating from 6V to 60V input, it can drive up to 350mA per channel with excellent current regulation (±3%). The device features PWM dimming capability with a wide duty cycle range, enabling smooth brightness control from 0% to 100%. Built-in thermal foldback reduces LED current when junction temperature exceeds programmed threshold, ensuring reliable operation. No external inductors or switching noise makes it ideal for EMI-sensitive environments.",
    specs: [
      { label: "Input Voltage", value: "6V - 60V" },
      { label: "Output Current", value: "Up to 350mA/ch" },
      { label: "Current Accuracy", value: "±3%" },
      { label: "Dimming", value: "PWM up to 5kHz" },
      { label: "Dropout Voltage", value: "1.5V" },
      { label: "Package", value: "SOT-89-5, SOP-8" },
      { label: "Channels", value: "1, 3, 4 options" },
    ],
    applications: [
      "Architectural Lighting",
      "Commercial Signage",
      "Automotive Interior Lighting",
      "Display Backlighting",
      "Emergency Lighting",
      "Industrial Illumination",
    ],
    features: [
      "Wide input voltage range (6V to 60V)",
      "No external inductors required",
      "PWM dimming capability",
      "Thermal foldback protection",
      "Open-circuit protection",
      "Short-circuit protection",
      "Low EMI operation",
      "Multiple channel options available",
    ],
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
    icon: Radio,
    gradient: "from-cyan-500 to-blue-500",
    lightGradient: "from-cyan-50 to-blue-50",
    color: "cyan",
    advantages: [
      { label: "Vin Range", value: "6V-60V", icon: TrendingUp },
      { label: "Iout", value: "350mA", icon: Battery },
      { label: "Dimming", value: "5kHz PWM", icon: Clock },
      { label: "Accuracy", value: "±3%", icon: Thermometer },
    ],
  },

  // Ideal Diode Controller
  "ideal-diode-controller": {
    id: "ideal-diode-controller",
    name: "Ideal Diode Controller",
    fullName: "Ideal Diode Controller with Reverse Protection",
    category: "Power Management",
    description:
      "Robust power handling for battery management systems used in computing, automotive and industrial",
    longDescription:
      "Our ideal diode controller replaces conventional Schottky diodes with a low-loss MOSFET solution, reducing power dissipation and voltage drop in battery management and OR-ing applications. The device controls an external N-channel MOSFET to emulate an ideal diode with forward voltage drop as low as 20mV at 10A. Fast reverse current detection (100ns) prevents reverse current flow during input short-circuit or power supply failures. Wide operating voltage range from 4V to 65V accommodates automotive and industrial power buses. Gate drive voltage up to 12V ensures low RDS(on) for standard MOSFETs.",
    specs: [
      { label: "Input Voltage", value: "4V - 65V" },
      { label: "Reverse Detection", value: "100ns" },
      { label: "Forward Drop", value: "20mV @ 10A" },
      { label: "Gate Drive", value: "12V" },
      { label: "Quiescent Current", value: "500µA" },
      { label: "Package", value: "SOT-23-6, SOIC-8" },
      { label: "Enable Pin", value: "Yes" },
    ],
    applications: [
      "Battery Management Systems",
      "Power OR-ing",
      "Input Reverse Polarity Protection",
      "UPS Systems",
      "Automotive Electronics",
      "Redundant Power Supplies",
    ],
    features: [
      "Replaces Schottky diodes with MOSFET",
      "Fast reverse current detection (100ns)",
      "Wide operating voltage range (4V to 65V)",
      "Low forward voltage drop",
      "Enable pin for control",
      "Status indicator output",
      "Low quiescent current",
      "Automotive qualified option available",
    ],
    image:
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&h=600&fit=crop",
    icon: Shield,
    gradient: "from-lime-500 to-emerald-500",
    lightGradient: "from-lime-50 to-emerald-50",
    color: "lime",
    advantages: [
      { label: "Vin Range", value: "4V-65V", icon: TrendingUp },
      { label: "Forward Drop", value: "20mV", icon: Battery },
      { label: "Detection", value: "100ns", icon: Clock },
      { label: "Package", value: "SOT-23-6", icon: Thermometer },
    ],
  },

  // Load Switch
  "load-switch": {
    id: "load-switch",
    name: "Load Switch",
    fullName: "Single N-Channel Load Switch",
    category: "Power Management",
    description:
      "Single N-Channel load switch for controlled power distribution in USB-powered and portable devices",
    longDescription:
      "Our integrated load switch provides a complete power distribution solution in a compact package, featuring an N-channel MOSFET with low RDS(on) of 25mΩ at 5V. Operating from 0.8V to 5.5V input, it supports continuous current up to 2A with minimal voltage drop. The device includes slew rate control to limit inrush current during turn-on, reducing supply droop and EMI. Integrated output discharge resistor ensures quick turn-off and prevents floating outputs. Thermal shutdown protection safeguards the device during overcurrent conditions. Ultra-low quiescent current (1µA) makes it ideal for battery-powered applications.",
    specs: [
      { label: "Input Voltage", value: "0.8V - 5.5V" },
      { label: "Continuous Current", value: "2A" },
      { label: "RDS(on)", value: "25mΩ @ 5V" },
      { label: "Quiescent Current", value: "1µA" },
      { label: "Slew Rate", value: "Adjustable" },
      { label: "Package", value: "WLCSP-4, SOT-23-5" },
      { label: "Output Discharge", value: "200Ω" },
    ],
    applications: [
      "USB Power Distribution",
      "Portable Electronics",
      "Battery-Powered Devices",
      "Peripheral Power Switching",
      "SSD Power Management",
      "IoT Sensor Nodes",
    ],
    features: [
      "Integrated N-channel MOSFET",
      "Low RDS(on) (25mΩ typical)",
      "Ultra-low quiescent current (1µA)",
      "Slew rate control for inrush limiting",
      "Output discharge resistor",
      "Thermal shutdown protection",
      "Under-voltage lockout",
      "Quick output discharge",
    ],
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    icon: Microchip,
    gradient: "from-violet-500 to-indigo-500",
    lightGradient: "from-violet-50 to-indigo-50",
    color: "violet",
    advantages: [
      { label: "RDS(on)", value: "25mΩ", icon: TrendingUp },
      { label: "IQ", value: "1µA", icon: Battery },
      { label: "Iout", value: "2A", icon: Clock },
      { label: "Vin", value: "0.8V-5.5V", icon: Thermometer },
    ],
  },

  // ADC/DAC
  "adc-dac": {
    id: "adc-dac",
    name: "ADC/DAC",
    fullName: "Data Converters",
    category: "Data Conversion",
    description:
      "Precision analog-to-digital and digital-to-analog converters for high-fidelity signal processing.",
    longDescription:
      "Industry-leading ADC/DAC solutions with 16-bit resolution at 10 GSPS, setting new standards for precision and speed in data conversion applications. Our data converters feature ultra-low noise, high linearity, and low power consumption, making them ideal for demanding applications in communications, test and measurement, and defense systems.",
    specs: [
      { label: "Resolution", value: "16-bit" },
      { label: "Sample Rate", value: "10 GSPS" },
      { label: "SNR", value: "78dBFS" },
      { label: "INL", value: "<0.1%" },
      { label: "Power", value: "1.5W" },
      { label: "Interface", value: "JESD204B/C" },
    ],
    applications: [
      "Wireless Communications (5G/6G)",
      "Test & Measurement Equipment",
      "Radar & Electronic Warfare",
      "Medical Imaging",
      "Software Defined Radio",
      "Satellite Communications",
    ],
    features: [
      "16-bit resolution with <0.1% INL",
      "10 GSPS sampling rate",
      "SNR: 78dBFS, SFDR: 85dBc",
      "Low power consumption: 1.5W",
      "JESD204B/C high-speed serial interface",
      "Digital down-conversion (DDC) options",
    ],
    image:
      "https://images.unsplash.com/photo-1581092335871-4d6e2e1b0a5a?w=800&h=600&fit=crop",
    icon: Radio,
    gradient: "from-emerald-500 to-teal-500",
    lightGradient: "from-emerald-50 to-teal-50",
    color: "emerald",
    advantages: [
      { label: "Resolution", value: "16-bit", icon: TrendingUp },
      { label: "Sample Rate", value: "10 GSPS", icon: Battery },
      { label: "SNR", value: "78dBFS", icon: Clock },
      { label: "Power", value: "1.5W", icon: Thermometer },
    ],
  },

  // SERDES
  serdes: {
    id: "serdes",
    name: "SERDES",
    fullName: "Serializer/Deserializer",
    category: "Connectivity",
    description:
      "High-speed serial interface solutions for data communication and video transmission.",
    longDescription:
      "Multi-protocol SERDES IP supporting 3.125 Gbps data rates for high-bandwidth video, networking, and inter-chip communication with low EMI and cable equalization. Our SERDES solutions feature spread spectrum clocking, adaptive equalization, and low power consumption.",
    specs: [
      { label: "Data Rate", value: "3.125 Gbps" },
      { label: "Protocols", value: "Multi-Protocol" },
      { label: "SSC Support", value: "Yes" },
      { label: "Cable EQ", value: "Adaptive" },
      { label: "Power", value: "<100mW" },
      { label: "BER", value: "<1e-12" },
    ],
    applications: [
      "Automotive Camera Systems",
      "Infotainment & Display",
      "Industrial Networking",
      "Video Transmission",
      "High-speed Backplanes",
      "FPGA/ASIC Interfaces",
    ],
    features: [
      "Data rate: 3.125 Gbps per lane",
      "Supports multiple protocols (LVDS, MIPI, HDMI)",
      "Spread Spectrum Clocking (SSC)",
      "Adaptive cable equalization",
      "Low EMI emission",
      "Built-in self-test (BIST)",
    ],
    image:
      "https://images.unsplash.com/photo-1581092335871-4d6e2e1b0a5a?w=800&h=600&fit=crop",
    icon: GitBranch,
    gradient: "from-purple-500 to-pink-500",
    lightGradient: "from-purple-50 to-pink-50",
    color: "purple",
    advantages: [
      { label: "Data Rate", value: "3.125 Gbps", icon: TrendingUp },
      { label: "Power", value: "<100mW", icon: Battery },
      { label: "BER", value: "<1e-12", icon: Clock },
      { label: "SSC", value: "Supported", icon: Thermometer },
    ],
  },

  // Embedded Systems
  "embedded-systems": {
    id: "embedded-systems",
    name: "Embedded Systems",
    fullName: "Embedded Processors",
    category: "Embedded",
    description:
      "ARM Cortex-M based embedded processors with integrated analog peripherals.",
    longDescription:
      "ARM Cortex-M based embedded processors with integrated analog peripherals for industrial control and edge AI applications. Our embedded solutions feature TrustZone security, DSP extensions, and ultra-low power operation, making them ideal for IoT gateways, industrial controllers, and smart sensors.",
    specs: [
      { label: "Core", value: "Cortex-M4/M7" },
      { label: "Frequency", value: "200MHz" },
      { label: "Flash", value: "2MB" },
      { label: "RAM", value: "512KB" },
      { label: "Security", value: "TrustZone" },
      { label: "Power", value: "<100µA/MHz" },
    ],
    applications: [
      "Industrial Control Systems",
      "Edge Computing Devices",
      "IoT Gateways",
      "Smart Sensors",
      "Motor Control",
      "Building Automation",
    ],
    features: [
      "ARM Cortex-M4/M7 core with FPU",
      "Operating frequency up to 200MHz",
      "Flash memory: 2MB, RAM: 512KB",
      "TrustZone security architecture",
      "DSP extensions and SIMD instructions",
      "Ultra-low power: <100µA/MHz",
    ],
    image:
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=600&fit=crop",
    icon: Layers,
    gradient: "from-orange-500 to-red-500",
    lightGradient: "from-orange-50 to-red-50",
    color: "orange",
    advantages: [
      { label: "Core", value: "Cortex-M4/M7", icon: TrendingUp },
      { label: "Frequency", value: "200MHz", icon: Battery },
      { label: "Memory", value: "2MB/512KB", icon: Clock },
      { label: "Power", value: "<100µA/MHz", icon: Thermometer },
    ],
  },

  // RF Solutions
  "rf-solutions": {
    id: "rf-solutions",
    name: "RF Solutions",
    fullName: "RF Front End & Beamformers",
    category: "RF & Wireless",
    description:
      "Advanced RF front-end modules and beamforming solutions for wireless communications.",
    longDescription:
      "Advanced RF front-end modules and beamforming solutions for 5G, radar, and satellite communications. Our RF solutions feature integrated LNAs, PAs, phase shifters, and beamforming networks, providing complete front-end solutions for phased array systems.",
    specs: [
      { label: "Frequency", value: "6-18 GHz" },
      { label: "Channels", value: "32" },
      { label: "Beamforming", value: "Analog/Digital" },
      { label: "NF", value: "<3dB" },
      { label: "Output Power", value: "+30dBm" },
      { label: "Control", value: "SPI" },
    ],
    applications: [
      "5G Infrastructure",
      "Phased Array Radar",
      "Satellite Communications",
      "Defense & Aerospace",
      "Electronic Warfare",
      "Wireless Backhaul",
    ],
    features: [
      "Frequency range: 6-18 GHz coverage",
      "32-channel beamforming capability",
      "Integrated LNA and power amplifier",
      "6-bit phase and amplitude control",
      "SPI digital interface for control",
      "Low noise figure: <3dB",
    ],
    image:
      "https://images.unsplash.com/photo-1581092335871-4d6e2e1b0a5a?w=800&h=600&fit=crop",
    icon: Wifi,
    gradient: "from-indigo-500 to-purple-500",
    lightGradient: "from-indigo-50 to-purple-50",
    color: "indigo",
    advantages: [
      { label: "Frequency", value: "6-18 GHz", icon: TrendingUp },
      { label: "Channels", value: "32", icon: Battery },
      { label: "NF", value: "<3dB", icon: Clock },
      { label: "Output Power", value: "+30dBm", icon: Thermometer },
    ],
  },

  // PMIC
  pmic: {
    id: "pmic",
    name: "PMIC",
    fullName: "Power Management ICs",
    category: "Power Management",
    description:
      "High-efficiency power management ICs with integrated protection for automotive and industrial applications.",
    longDescription:
      "Our PMIC portfolio includes buck/boost converters, LDO regulators, battery management systems, and power sequencing solutions. Designed for automotive (AEC-Q100) and industrial grade applications with 92% peak efficiency. The devices feature wide input voltage ranges, high output current capabilities, and comprehensive protection features including over-voltage, over-current, short-circuit, and thermal shutdown protection.",
    specs: [
      { label: "Efficiency", value: "92% Peak" },
      { label: "Input Voltage", value: "2.7V - 40V" },
      { label: "Output Current", value: "Up to 10A" },
      { label: "Switching Frequency", value: "500kHz - 2MHz" },
      { label: "Protection", value: "OVP, OCP, SCP, Thermal" },
      { label: "Qualification", value: "AEC-Q100" },
    ],
    applications: [
      "Electric Vehicle Power Management",
      "Industrial Automation Systems",
      "Consumer Electronics",
      "Telecom Infrastructure",
      "Medical Devices",
      "Renewable Energy Systems",
    ],
    features: [
      "High-efficiency synchronous buck/boost converters",
      "Low-dropout (LDO) regulators with ultra-low noise",
      "Battery management and charging solutions",
      "Power sequencing and voltage monitoring",
      "I2C/PMBus interface for digital control",
      "Wide temperature range: -40°C to 125°C",
    ],
    image:
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=600&fit=crop",
    icon: Battery,
    gradient: "from-blue-500 to-cyan-500",
    lightGradient: "from-blue-50 to-cyan-50",
    color: "blue",
    advantages: [
      { label: "Efficiency", value: "92%", icon: TrendingUp },
      { label: "Vin Range", value: "2.7V-40V", icon: Battery },
      { label: "Iout", value: "10A", icon: Clock },
      { label: "Qualification", value: "AEC-Q100", icon: Thermometer },
    ],
  },
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = productsData[slug];

  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  if (!product) {
    notFound();
  }

  const Icon = product.icon;

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        specsRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: specsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        featuresRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      <main
        ref={sectionRef}
        className="bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen"
      >
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-200/20 rounded-full blur-3xl" />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgb(14, 165, 233) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          <div
            ref={heroRef}
            className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-16"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 shadow-sm mb-6">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
                    {product.category}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                  {product.fullName}
                </h1>

                <p className="text-lg text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="flex-shrink-0">
                <div
                  className={`w-32 h-32 rounded-2xl bg-gradient-to-r ${product.gradient} flex items-center justify-center shadow-xl`}
                >
                  <Icon className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Image & Description */}
              <div ref={contentRef}>
                <div className="relative h-80 rounded-2xl overflow-hidden mb-6 shadow-xl">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${product.gradient} mix-blend-multiply opacity-30`}
                  />
                </div>
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 leading-relaxed">
                    {product.longDescription}
                  </p>
                </div>
              </div>

              {/* Right Column - Technical Specs */}
              <div ref={specsRef}>
                <Card className="bg-white border-slate-200 shadow-md overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-blue-600" />
                      Technical Specifications
                    </h2>
                    <div className="space-y-3">
                      {product.specs.map((spec: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0"
                        >
                          <span className="text-sm font-medium text-slate-600">
                            {spec.label}
                          </span>
                          <span className="text-sm font-semibold text-slate-900">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Advantages / Key Metrics Section */}
            {product.advantages && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Key Advantages
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {product.advantages.map((adv: any, idx: number) => {
                    const AdvIcon = adv.icon;
                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl bg-gradient-to-r ${product.lightGradient} border border-slate-200 shadow-sm text-center`}
                      >
                        <AdvIcon
                          className={`w-8 h-8 text-${product.color}-600 mx-auto mb-2`}
                        />
                        <div className="text-xl font-bold text-slate-900">
                          {adv.value}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          {adv.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Applications Section */}
            <div ref={featuresRef} className="mt-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Key Applications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.applications.map((app: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700">{app}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Key Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-r ${product.gradient} flex items-center justify-center`}
                    >
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-16 pt-12 border-t border-slate-200">
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Interested in {product.name} Solutions?
                </h3>
                <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                  Contact our sales team for pricing, samples, and technical
                  support
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Request Quote
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    Contact Sales
                    <Mail className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
