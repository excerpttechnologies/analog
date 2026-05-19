'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Cpu, Zap, Gauge, Microchip, Bot, Target, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const products = [
  {
    id: 1,
    name: 'SERDES IP',
    category: 'Silicon IP',
    description: 'High-speed SerDes for data communication interfaces up to 112G PAM4',
    icon: Cpu,
    image: 'https://media.finebi.com/strapi/DALL_E_2024_11_05_15_45_59_A_futuristic_and_technical_infographic_showcasing_the_three_stages_of_data_conversion_extraction_transformation_and_loading_The_diagram_should_vis_f6d1a8a16b.webp',
    gradient: 'from-blue-500 to-cyan-500',
    specs: ['112G PAM4', '<1e-12 BER', '0.5pJ/bit'],
  },
  {
    id: 2,
    name: 'PLL Systems',
    category: 'Silicon IP',
    description: 'Ultra-low jitter phase-locked loops for clock generation and synchronization',
    icon: Gauge,
    image: 'https://www.3alphadataentry.com/wp-content/uploads/2018/08/data-conversion-services-1.jpg',
    gradient: 'from-purple-500 to-pink-500',
    specs: ['50fs RMS jitter', '10MHz-40GHz', 'Integrated VCO'],
  },
  {
    id: 3,
    name: 'Analog IP',
    category: 'Silicon IP',
    description: 'Precision analog circuits for sensor and signal processing applications',
    icon: Microchip,
    image: 'https://media.finebi.com/strapi/DALL_E_2024_11_05_15_29_44_A_futuristic_and_technological_image_illustrating_data_being_transformed_from_one_format_to_another_The_image_should_show_digital_representations_of_4d381fc87f.webp',
    gradient: 'from-emerald-500 to-teal-500',
    specs: ['16-bit resolution', '1uV offset', '0.01% INL'],
  },
  {
    id: 4,
    name: 'Digital IP',
    category: 'Silicon IP',
    description: 'Advanced digital signal processing and computation cores for edge AI',
    icon: Zap,
    image: 'https://www.tarento.com/static/2c1015cb6e6c26a30affbd668d278ee6/afa5c/4_001cd4df1f.png',
    gradient: 'from-orange-500 to-red-500',
    specs: ['5 TOPS/W', 'RISC-V cores', 'Hardware accelerators'],
  },
  {
    id: 5,
    name: 'AI Converters',
    category: 'Technology',
    description: 'ML-enhanced ADC/DAC for intelligent signal acquisition and processing',
    icon: Bot,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    gradient: 'from-indigo-500 to-purple-500',
    specs: ['AI-assisted calibration', '40% power saving', 'Real-time adaptation'],
  },
  {
    id: 6,
    name: 'Precision Analog',
    category: 'Technology',
    description: 'Ultra-low noise analog front-ends for precision measurement systems',
    icon: Target,
    image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=600&fit=crop',
    gradient: 'from-rose-500 to-orange-500',
    specs: ['0.5nV/√Hz noise', '140dB CMRR', '±0.5ppm/°C drift'],
  },
];

export function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Smooth scroll animations
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards staggered animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        gsap.fromTo(card,
          { 
            opacity: 0, 
            y: 100,
            rotationX: 15,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'back.out(0.3)',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Hover animation for cards
  const handleCardHover = (index: number, isEnter: boolean) => {
    setHoveredCard(isEnter ? index : null);
    
    const card = cardsRef.current[index];
    if (!card) return;

    if (isEnter) {
      gsap.to(card.querySelector('.card-gradient'), {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(card.querySelector('.card-image'), {
        scale: 1.1,
        duration: 0.5,
        ease: 'power2.out',
      });
      gsap.to(card.querySelector('.card-content'), {
        y: -8,
        duration: 0.3,
        ease: 'power2.out',
      });
    } else {
      gsap.to(card.querySelector('.card-gradient'), {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(card.querySelector('.card-image'), {
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
      });
      gsap.to(card.querySelector('.card-content'), {
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-200/10 rounded-full blur-3xl" />
        </div>
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgb(14, 165, 233) 1px, transparent 1px), linear-gradient(90deg, rgb(14, 165, 233) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Header Section */}
        <div ref={titleRef} className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200/50 shadow-sm mb-6">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
              Our Portfolio
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
            Product Categories
          </h2>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive semiconductor solutions spanning silicon IP, advanced analog systems, 
            and AI-enhanced technologies for next-generation applications.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, index) => {
            const IconComponent = product.icon;
            const isHovered = hoveredCard === index;
            
            return (
              <div
                key={product.id}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group relative"
                onMouseEnter={() => handleCardHover(index, true)}
                onMouseLeave={() => handleCardHover(index, false)}
              >
                <Card className="relative overflow-hidden bg-white/80 backdrop-blur-sm border-slate-200 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 h-full flex flex-col">
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="card-image absolute inset-0 transition-transform duration-500">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    {/* Gradient Overlay */}
                    <div className={`card-gradient absolute inset-0 bg-gradient-to-r ${product.gradient} opacity-0 transition-opacity duration-500 mix-blend-multiply`} />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-white/20 shadow-lg">
                        <span className="text-xs font-bold text-slate-700">{product.category}</span>
                      </div>
                    </div>
                    
                    {/* Icon Overlay */}
                    <div className={`absolute bottom-4 right-4 z-10 transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}>
                      <div className="w-12 h-12 rounded-xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/20">
                        <IconComponent className={`w-6 h-6 transition-colors duration-500 ${isHovered ? `text-${product.gradient.split(' ')[1]}` : 'text-slate-600'}`} />
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="card-content p-6 flex-1 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-700 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {product.name}
                    </h3>
                    
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {product.description}
                    </p>
                    
                    {/* Specs Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.specs.map((spec, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 text-xs font-medium text-slate-600"
                        >
                          <Cpu className="w-3 h-3" />
                          {spec}
                        </span>
                      ))}
                    </div>
                    
                    {/* Learn More Link */}
                    <Link
                      href={`/products/${product.id}`}
                      className={`inline-flex items-center gap-2 font-semibold transition-all duration-300 group/link ${
                        isHovered ? `bg-gradient-to-r ${product.gradient} bg-clip-text text-transparent gap-3` : 'text-slate-700'
                      }`}
                    >
                      Learn More
                      <ArrowRight className={`w-4 h-4 transition-all duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                    </Link>
                  </div>
                  
                  {/* Animated Border */}
                  <div className={`absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${product.gradient} opacity-20 blur-xl`} />
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="mt-16 text-center">
          <div className="inline-block group">
            <Link
              href="/products"
              className="relative inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 overflow-hidden group"
            >
              <span className="relative z-10">View All Products</span>
              <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
              
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            
            {/* Subtle Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}