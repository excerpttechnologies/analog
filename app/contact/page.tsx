'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles,
  Send,
  Clock,
  CheckCircle,
  Globe,
  Linkedin,
  Twitter,
  Facebook,
  ArrowRight,
  User,
  Building,
  MessageSquare
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const offices = [
  {
    location: 'Headquarters - Silicon Valley',
    address: '123 Innovation Drive, San Jose, CA 95110',
    phone: '+1 (408) 555-0100',
    email: 'info@smartscope.com',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    location: 'Europe - Munich',
    address: 'Technologiepark 15, 85748 Garching, Germany',
    phone: '+49 (89) 555-0200',
    email: 'eu@smartscope.com',
    image: 'https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?w=600&h=400&fit=crop',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    location: 'Asia Pacific - Taiwan',
    address: 'Tech Center, Hsinchu Science Park, Hsinchu 30078',
    phone: '+886 (3) 555-0300',
    email: 'apac@smartscope.com',
    image: 'https://images.fastcompany.com/image/upload/f_webp,q_auto,c_fit/wp-cms-2/2025/08/Innovation_starts_with_culture_7_ways_leaders_can_enable_it.jpg',
    gradient: 'from-emerald-500 to-teal-500'
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const officesRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(heroRef.current,
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out',
        }
      );

      // Form and info animations
      gsap.fromTo(formRef.current,
        { opacity: 0, x: -30, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.3,
          ease: 'back.out(0.4)',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(infoRef.current,
        { opacity: 0, x: 30, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.5,
          ease: 'back.out(0.4)',
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Offices staggered animation
      officesRef.current.forEach((office, index) => {
        if (!office) return;
        
        gsap.fromTo(office,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.15,
            ease: 'back.out(0.4)',
            scrollTrigger: {
              trigger: office,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
    <Navbar/>
    <main ref={sectionRef} className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
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
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div ref={heroRef} className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-center py-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 shadow-sm mb-6">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
              Get in Touch
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
            Let's Connect
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Have questions about our semiconductor solutions? Our team is ready to help you find
            the perfect technology for your next-generation products.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div ref={formRef} className="lg:col-span-2">
              <Card className="bg-white border-slate-200 shadow-xl overflow-hidden">
                <div className="p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Send us a Message</h2>
                  <p className="text-slate-600 mb-6">Fill out the form below and we'll get back to you within 24 hours</p>

                  {submitted && (
                    <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 animate-in slide-in-from-top-2">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <p className="text-green-700 font-medium">Thank you! We'll get back to you soon.</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name *</label>
                        <div className={`relative transition-all duration-300 ${focusedField === 'name' ? 'scale-[1.02]' : ''}`}>
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="John Doe"
                            className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Email *</label>
                        <div className={`relative transition-all duration-300 ${focusedField === 'email' ? 'scale-[1.02]' : ''}`}>
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="john@company.com"
                            className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
                        <div className={`relative transition-all duration-300 ${focusedField === 'phone' ? 'scale-[1.02]' : ''}`}>
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('phone')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="+1 (555) 000-0000"
                            className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Company</label>
                        <div className={`relative transition-all duration-300 ${focusedField === 'company' ? 'scale-[1.02]' : ''}`}>
                          <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('company')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="Your Company"
                            className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Message *</label>
                      <div className={`relative transition-all duration-300 ${focusedField === 'message' ? 'scale-[1.02]' : ''}`}>
                        <MessageSquare className="absolute left-3 top-4 w-4 h-4 text-slate-400" />
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Tell us about your project or inquiry..."
                          rows={5}
                          className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                          required
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 group"
                    >
                      <span className="flex items-center justify-center gap-2">
                        Send Message
                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </span>
                    </Button>
                  </form>
                </div>
              </Card>
            </div>

            {/* Contact Info */}
            <div ref={infoRef}>
              <Card className="bg-white border-slate-200 shadow-xl mb-6">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Contact Information</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Phone className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Phone</p>
                        <a href="tel:+14085550100" className="text-slate-900 font-medium hover:text-blue-600 transition-colors">
                          +1 (408) 555-0100
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Email</p>
                        <a href="mailto:info@smartscope.com" className="text-slate-900 font-medium hover:text-blue-600 transition-colors">
                          info@smartscope.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <MapPin className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Address</p>
                        <p className="text-slate-900 font-medium">
                          123 Innovation Drive
                          <br />
                          San Jose, CA 95110
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-white border-slate-200 shadow-xl">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Response Time</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Fast Response</p>
                      <p className="text-sm text-slate-600">Within 24 hours on business days</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-medium text-green-700">Available for immediate inquiries</span>
                  </div>
                </div>
              </Card>

              {/* Social Links */}
              <div className="mt-6 flex gap-3">
                {[
                  { icon: Linkedin, href: '#', color: 'bg-blue-600' },
                  { icon: Twitter, href: '#', color: 'bg-sky-500' },
                  { icon: Facebook, href: '#', color: 'bg-blue-700' },
                  { icon: Globe, href: '#', color: 'bg-emerald-600' },
                ].map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={idx}
                      href={social.href}
                      className={`w-10 h-10 rounded-xl ${social.color} flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 shadow-sm mb-6">
              <Globe className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
                Global Presence
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Global Offices</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We're located in key technology hubs around the world to serve you better
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offices.map((office, idx) => (
              <div
                key={idx}
                ref={(el) => { officesRef.current[idx] = el; }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${office.gradient} rounded-2xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                <Card className="relative overflow-hidden bg-white border-slate-200 hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={office.image}
                      alt={office.location}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${office.gradient} mix-blend-multiply opacity-40`} />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{office.location}</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-600">{office.address}</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <a href={`tel:${office.phone}`} className="text-slate-600 hover:text-blue-600 transition-colors">
                          {office.phone}
                        </a>
                      </div>
                      <div className="flex items-start gap-3">
                        <Mail className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <a href={`mailto:${office.email}`} className="text-slate-600 hover:text-blue-600 transition-colors">
                          {office.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-600">Quick answers to common questions</p>
          </div>

          <div className="space-y-4">
            {[
              { q: 'What is your typical response time?', a: 'We respond to all inquiries within 24 hours during business days (Monday-Friday).' },
              { q: 'Do you offer custom IP development?', a: 'Yes, we provide custom IP development services tailored to your specific requirements.' },
              { q: 'What support options are available?', a: 'We offer email support, phone support, and dedicated account managers for enterprise clients.' },
              { q: 'How do I request a demo?', a: 'Fill out the contact form and mention "Demo Request" in your message.' },
            ].map((faq, idx) => (
              <Card key={idx} className="bg-white border-slate-200 hover:shadow-lg transition-all duration-300">
                <div className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
                  <p className="text-slate-600">{faq.a}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
    <Footer/>
    </>
  );
}