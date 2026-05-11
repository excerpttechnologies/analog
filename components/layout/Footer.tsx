'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Facebook, Linkedin, Twitter, Mail, Github, Send, ArrowUp, Heart, Cpu, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLDivElement | null)[]>([]);

  const footerLinks = {
    Product: [
      { label: 'Features', href: '/products', icon: Zap },
      { label: 'Pricing', href: '/pricing', icon: null },
      { label: 'Silicon IP', href: '/products', icon: Cpu },
      { label: 'Documentation', href: '/docs', icon: null },
    ],
    Company: [
      { label: 'About Us', href: '/about', icon: null },
      { label: 'Blog', href: '/blog', icon: null },
      { label: 'Careers', href: '/careers', icon: null },
      { label: 'Contact', href: '/contact', icon: null },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '/privacy', icon: null },
      { label: 'Terms of Service', href: '/terms', icon: null },
      { label: 'Cookie Policy', href: '/cookies', icon: null },
      { label: 'GDPR Compliance', href: '/gdpr', icon: null },
    ],
    Social: [
      { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
      { label: 'Twitter', href: 'https://twitter.com', icon: Twitter },
      { label: 'Facebook', href: 'https://facebook.com', icon: Facebook },
      { label: 'GitHub', href: 'https://github.com', icon: Github },
    ],
  };

  // Scroll animations
  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      // Newsletter animation
      gsap.fromTo(newsletterRef.current,
        { 
          opacity: 0, 
          y: 50,
          filter: 'blur(8px)'
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: newsletterRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Links staggered animation
      linksRef.current.forEach((linkGroup, index) => {
        if (!linkGroup) return;
        
        gsap.fromTo(linkGroup,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'back.out(0.4)',
            scrollTrigger: {
              trigger: linkGroup,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Copyright animation
      gsap.fromTo('.copyright',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          delay: 0.5,
          scrollTrigger: {
            trigger: '.copyright',
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  // Back to top button
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Hover animation for links
  const handleLinkHover = (element: HTMLElement, isEnter: boolean) => {
    if (isEnter) {
      gsap.to(element, {
        x: 5,
        duration: 0.2,
        ease: 'power2.out',
      });
      gsap.to(element.querySelector('.link-icon'), {
        rotate: 360,
        scale: 1.2,
        duration: 0.3,
        ease: 'back.out(0.5)',
      });
    } else {
      gsap.to(element, {
        x: 0,
        duration: 0.2,
        ease: 'power2.out',
      });
      gsap.to(element.querySelector('.link-icon'), {
        rotate: 0,
        scale: 1,
        duration: 0.2,
        ease: 'power2.out',
      });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-3xl" />
        
        {/* Circuit Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0v30h30M0 30h30v30' stroke='%2300ffff' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Newsletter Section */}
        <div ref={newsletterRef} className="py-16 border-b border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Stay Updated
              </h3>
              <p className="text-slate-300 text-lg mb-2">
                Subscribe to our newsletter for the latest semiconductor innovations.
              </p>
              <p className="text-slate-400 text-sm">
                Get updates about new products, industry insights, and exclusive offers.
              </p>
            </div>
            
            <div>
              <form 
                className="flex flex-col sm:flex-row gap-3" 
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const input = form.querySelector('input') as HTMLInputElement;
                  if (input.value) {
                    alert(`Thanks for subscribing: ${input.value}`);
                    input.value = '';
                  }
                }}
              >
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    placeholder="Your email address"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <button 
                  type="submit"
                  className="group px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <span>Subscribe</span>
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </form>
              
              <p className="text-xs text-slate-400 mt-3">
                No spam, unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16">
          {Object.entries(footerLinks).map(([category, links], idx) => (
            <div
              key={category}
              ref={(el) => { linksRef.current[idx] = el; }}
              className="space-y-4"
            >
              <h4 className="text-lg font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-all duration-300"
                        onMouseEnter={(e) => handleLinkHover(e.currentTarget, true)}
                        onMouseLeave={(e) => handleLinkHover(e.currentTarget, false)}
                      >
                        {Icon && (
                          <Icon className="link-icon w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-all duration-300" />
                        )}
                        <span className="text-sm">{link.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="copyright flex items-center gap-2 text-sm text-slate-400">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>
              &copy; {currentYear} SmartScope Technologies. All rights reserved.
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <a
              href="mailto:info@smartscope.com"
              className="group flex items-center gap-2 text-sm text-slate-300 hover:text-cyan-400 transition-all duration-300"
            >
              <Mail className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>info@smartscope.com</span>
            </a>
            
            <button
              onClick={scrollToTop}
              className="group w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 flex items-center justify-center"
              aria-label="Back to top"
            >
              <ArrowUp className="w-5 h-5 text-slate-300 group-hover:text-white transition-all duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Heart Icon */}
        <div className="text-center pb-8">
          <div className="inline-flex items-center gap-1 text-xs text-slate-500">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-red-400 animate-pulse" />
            <span>for semiconductor excellence</span>
          </div>
        </div>
      </div>
    </footer>
  );
}