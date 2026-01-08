import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, CheckCircle2, Calendar, Package, Phone, Mail, MapPin, Clock, Star, Shield, Fingerprint, Smile, Wifi, Utensils, User, Route, DoorOpen, ArrowLeftRight, ArrowRight, ArrowUp, AlertTriangle, Briefcase, Magnet, Building2, DoorClosed, Hotel, Lock, Database, Zap, Users, Building, GraduationCap, Factory, Award, CheckCircle, Headphones, Plug, DollarSign, ShieldHalf, Send, Eye, Hand, Gauge, Cloud, Layers, Landmark } from 'lucide-react';
import TestimonialSection from "../components/TestimonialSection";
import Image8 from '../assets/P160-300x300.png';

const HomePage = () => {
  
   const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    interest: '',
    message: ''
  });

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }
    alert(`Thank you for your inquiry, ${formData.name}! Our team will contact you within 24 hours.`);
    setFormData({ name: '', email: '', phone: '', company: '', interest: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .smooth-shadow {
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .hover-lift {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
        }

        .nav-blur {
          backdrop-filter: blur(12px);
          background: rgba(255, 255, 255, 0.95);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .hero-pattern {
          background-image: 
            radial-gradient(circle at 10% 20%, rgba(16, 185, 129, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 90% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 50%);
        }

        .image-overlay {
          position: relative;
          overflow: hidden;
        }

        .image-overlay::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(255,255,255,0.95) 0%, transparent 100%);
        }

        .floating-badge {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>


      {/* Hero Section with Background Image */}
            <section id="home" className="pt-32 pb-20 relative overflow-hidden">
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/80 z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1920&q=80" 
                  alt="Security Technology"
                  className="w-full h-full object-cover opacity-40"
                />
              </div>
      
              <div className="max-w-7xl mx-auto px-6 relative z-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div className="text-white">
                    <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 text-emerald-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                      <CheckCircle size={16} />
                      Trusted by 580+ Organizations
                    </div>
                    
                    <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                      Advanced Security Solutions for Modern Enterprises
                    </h1>
                    
                    <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                      Hardware-agnostic biometric and RFID systems with proprietary algorithms. Serving government, Fortune 500, and industrial sectors across India.
                    </p>
                    
                    <div className="flex flex-wrap gap-4">
                      <button 
                        onClick={() => scrollToSection('contact')}
                        className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors inline-flex items-center gap-2"
                      >
                        <Calendar size={20} />
                        Schedule Demo
                      </button>
                      <button 
                        onClick={() => scrollToSection('products')}
                        className="border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors inline-flex items-center gap-2"
                      >
                        <Package size={20} />
                        View Products
                      </button>
                    </div>
      
                    <div className="flex items-center gap-8 mt-12 pt-8 border-t border-white/20">
                      <div>
                        <div className="text-3xl font-bold">15+</div>
                        <div className="text-sm text-gray-300">Years Experience</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold">580+</div>
                        <div className="text-sm text-gray-300">Active Clients</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold">99.9%</div>
                        <div className="text-sm text-gray-300">Uptime SLA</div>
                      </div>
                    </div>
                  </div>
      
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { icon: Fingerprint, title: 'Fingerprint Systems', desc: 'AFIS & Authentication' },
                      { icon: Smile, title: 'Face Recognition', desc: 'AI-Powered & Touchless' },
                      { icon: Wifi, title: 'RFID Solutions', desc: 'Access & Tracking' },
                      { icon: Shield, title: 'Security Hardware', desc: 'Scanners & Detectors' }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl hover-lift">
      
                        <item.icon className="text-emerald-400 mb-4" size={40} />
                        <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                        <p className="text-sm text-gray-300">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
      
            {/* Why Choose with Side Image */}
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                  <div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose TST Technologies</h2>
                    <p className="text-xl text-gray-600 mb-8">
                      Enterprise-grade security solutions with flexibility, reliability, and expert support
                    </p>
      
                    <div className="space-y-6">
                      {[
                        { icon: Plug, title: 'Hardware Agnostic', desc: 'Use your preferred hardware with our proprietary software and algorithms.' },
                        { icon: Zap, title: 'High Performance', desc: 'Sub-second authentication with 10K+ template capacity and fast matching.' },
                        { icon: Shield, title: 'Enterprise Security', desc: 'AES-256 encryption, GDPR compliance, and multi-factor authentication.' },
                        { icon: Headphones, title: '24/7 Support', desc: 'Round-the-clock technical assistance with rapid deployment support.' }
                      ].map((feature, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <feature.icon className="text-emerald-600" size={24} />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">{feature.title}</h3>
                            <p className="text-gray-600">{feature.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
      
                  <div className="relative">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                      <img 
                        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80" 
                        alt="Technology Solutions"
                        className="w-full h-[600px] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                      
                      {/* Floating Badges */}
                      <div className="absolute top-8 left-8 bg-white/95 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg floating-badge">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="text-emerald-600" size={24} />
                          <div>
                            <div className="font-bold text-gray-900">ISO Certified</div>
                            <div className="text-sm text-gray-600">Quality Assured</div>
                          </div>
                        </div>
                      </div>
      
                      <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg" style={{animationDelay: '3s'}}>
                        <div className="flex items-center gap-3">
                          <Award className="text-emerald-600" size={24} />
                          <div>
                            <div className="font-bold text-gray-900">580+ Clients</div>
                            <div className="text-sm text-gray-600">Trust Us Daily</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
      
            {/* About with Background Pattern */}
            <section id="about" className="py-20 relative overflow-hidden">
              <div className="absolute inset-0 hero-pattern"></div>
              <div className="absolute inset-0 bg-gray-50/80"></div>
              
              <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div className="relative order-2 lg:order-1">
                    <img 
                      src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80" 
                      alt="Biometric Security"
                      className="rounded-2xl shadow-2xl"
                    />
                    <div className="absolute -bottom-8 -right-8 bg-emerald-600 text-white p-8 rounded-2xl shadow-xl max-w-xs">
                      <div className="text-4xl font-bold mb-2">15+</div>
                      <div className="text-emerald-100">Years of Excellence in Biometric Security Solutions</div>
                    </div>
                  </div>
      
                  <div className="order-1 lg:order-2">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">About TST Technologies</h2>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      With over 15 years of excellence, TST Technologies has established itself as a trusted partner for government agencies, Fortune 500 companies, educational institutions, and industrial facilities across India.
                    </p>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      We specialize in AFIS (Automated Fingerprint Identification Systems), facial recognition, RFID, and comprehensive access control solutions with proprietary matching algorithms.
                    </p>
      
                    <div className="bg-white rounded-xl p-6 border-l-4 border-emerald-600 shadow-lg">
                      <div className="flex items-start gap-4">
                        <Shield className="text-emerald-600 flex-shrink-0 mt-1" size={28} />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2 text-lg">Data Privacy Commitment</h4>
                          <p className="text-gray-600">
                            All biometric data is encrypted end-to-end using AES-256 encryption, stored securely with multi-layer protection, and handled in full compliance with GDPR and Indian data privacy standards.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
      {/* Products */}
<section id="products" className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Product Portfolio</h2>
      <p className="text-xl text-gray-600">Industry-leading solutions for every security need</p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, idx) => (
        <div key={idx} className="group relative">
          {/* Glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
          
          {/* Card */}
          <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-200 overflow-hidden hover-lift group-hover:border-emerald-400 transition-all duration-300">
            {/* Icon container */}
            <div className="h-48 bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center border-b border-gray-200 group-hover:from-emerald-100 group-hover:to-blue-100 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 group-hover:scale-110 transition-all duration-300">
                <product.icon className="text-white" size={40} />
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-2">
                {product.category}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                {product.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {product.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.features.map((feature, fidx) => (
                  <span 
                    key={fidx} 
                    className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-all duration-300"
                  >
                    <feature.icon size={12} />
                    {feature.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
      
            {/* Technology with Split Background */}
            <section className="py-20 relative overflow-hidden">
              <div className="absolute inset-0">
                <div className="absolute left-0 top-0 w-1/2 h-full bg-gray-900"></div>
                <div className="absolute right-0 top-0 w-1/2 h-full">
                  <img 
                    src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80" 
                    alt="Technology"
                    className="w-full h-full object-cover opacity-20"
                  />
                  <div className="absolute inset-0 bg-gray-900/80"></div>
                </div>
              </div>
      
              <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16 text-white">
                  <h2 className="text-4xl font-bold mb-4">Advanced Technology Features</h2>
                  <p className="text-xl text-gray-300">Cutting-edge capabilities powering our solutions</p>
                </div>
      
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    { icon: Shield, title: 'Anti-Spoofing', desc: 'Multi-layered liveness detection prevents photo, video, and mask attacks.' },
                    { icon: Eye, title: 'Visible Light', desc: 'Works in various lighting conditions using standard visible light cameras.' },
                    { icon: Gauge, title: 'Real-Time Analytics', desc: 'Live dashboards with instant alerts and comprehensive tracking.' },
                    { icon: Cloud, title: 'Flexible Deployment', desc: 'Cloud, on-premise, or hybrid architectures to suit your needs.' },
                    { icon: Layers, title: 'Multi-Factor Auth', desc: 'Combine biometrics, RFID, PIN codes, and mobile credentials.' },
                    { icon: Database, title: 'High Capacity', desc: 'Support for 10K+ templates with sub-second matching speed.' }
                  ].map((tech, idx) => (
                    <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl text-white hover-lift">
                      <tech.icon className="text-emerald-400 mb-4" size={32} />
                      <h3 className="text-lg font-semibold mb-2">{tech.title}</h3>
                      <p className="text-gray-300">{tech.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
      {/* Clients */}
            <section id="clients" className="py-20 bg-white relative overflow-hidden">
              {/* Subtle Background Pattern */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-100 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-100 rounded-full filter blur-3xl"></div>
              </div>

              <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-5 py-2.5 rounded-full text-sm font-bold mb-6 shadow-lg shadow-emerald-500/30">
                    <Star size={16} fill="currentColor" />
                    580+ Happy Clients
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Trusted Across Industries</h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">Leading organizations across India trust our security solutions to protect their assets and people</p>
                </div>
      
                <div className="space-y-16">
                  {clientSegments.map((segment, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-center gap-4 mb-10">
                        <div className="h-px w-16 bg-gradient-to-r from-transparent via-emerald-300 to-emerald-500"></div>
                        <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-blue-50 border-2 border-emerald-200 px-6 py-3 rounded-full shadow-sm">
                          <segment.icon className="text-emerald-600" size={24} />
                          <h3 className="text-xl font-bold text-gray-900">{segment.title}</h3>
                        </div>
                        <div className="h-px w-16 bg-gradient-to-l from-transparent via-emerald-300 to-emerald-500"></div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {segment.clients.map((client, cidx) => (
                          <div key={cidx} className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
                            <div className="relative bg-gradient-to-br from-sky-50 to-gray-50 border-2 border-gray-200 p-6 rounded-2xl text-center font-semibold text-gray-800 hover-lift h-full flex items-center justify-center group-hover:border-emerald-400 group-hover:shadow-xl transition-all duration-300">
                              <span className="text-base group-hover:text-emerald-600 transition-colors">{client}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <TestimonialSection />

                    </div>
            </section>

            {/* Contact with Background */}
            <section id="contact" className="py-20 relative overflow-hidden">
              <div className="absolute inset-0">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80" 
                  alt="Contact"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-white/95"></div>
              </div>
      
              <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
                  <p className="text-xl text-gray-600">Ready to secure your organization? Contact us today</p>
                </div>
      
                <div className="grid lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-8 space-y-6 shadow-xl">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name *</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleFormChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-2">Phone Number *</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleFormChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
                            placeholder="+91 XXXXX XXXXX"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
                          placeholder="john@company.com"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Company</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleFormChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
                          placeholder="Your organization"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Product Interest</label>
                        <select
                          name="interest"
                          value={formData.interest}
                          onChange={handleFormChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
                        >
                          <option value="">Select a solution</option>
                          <option value="fingerprint">Fingerprint Systems</option>
                          <option value="face">Face Recognition</option>
                          <option value="rfid">RFID Solutions</option>
                          <option value="access">Access Control</option>
                          <option value="security">Security Equipment</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Message *</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleFormChange}
                          rows="4"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none resize-none"
                          placeholder="Tell us about your requirements..."
                          required
                        />
                      </div>
                      
                      <button type="submit" className="w-full bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors inline-flex items-center justify-center gap-2">
                        <Send size={20} />
                        Send Message
                      </button>
                    </form>
                  </div>
      
                  <div className="space-y-6">
                    {contactInfo.map((info, idx) => (
                      <div key={idx} className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg hover-lift">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <info.icon className="text-emerald-600" size={24} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                            <p className="text-sm text-gray-600 whitespace-pre-line">{info.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
   
         {/* Footer */}
         <footer className="bg-slate-900 text-white py-16">
           <div className="max-w-7xl mx-auto px-6">
             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
               <div>
                 <div className="flex items-center gap-3 text-white font-bold text-2xl mb-6">
                   <Fingerprint className="text-emerald-400" size={32} />
                   <span>TST Technologies</span>
                 </div>
                 <p className="text-slate-400 leading-relaxed mb-6">
                   Leading provider of biometric security and RFID solutions in Delhi/NCR. Trusted by 580+ organizations for 15+ years.
                 </p>
               </div>
   
               <div>
                 <h3 className="text-emerald-400 font-bold text-lg mb-6">Products</h3>
                 <ul className="space-y-3">
                   {['Fingerprint Systems', 'Face Recognition', 'RFID Solutions', 'Access Control', 'Security Equipment'].map((item, idx) => (
                     <li key={idx}>
                       <button onClick={() => scrollToSection('products')} className="text-slate-400 hover:text-emerald-400 transition-colors">{item}</button>
                     </li>
                   ))}
                 </ul>
               </div>
   
               <div>
                 <h3 className="text-emerald-400 font-bold text-lg mb-6">Company</h3>
                 <ul className="space-y-3">
                   {[
                     { text: 'About Us', section: 'about' },
                     { text: 'Our Clients', section: 'clients' },
                     { text: 'Contact', section: 'contact' }
                   ].map((item, idx) => (
                     <li key={idx}>
                       <button onClick={() => scrollToSection(item.section)} className="text-slate-400 hover:text-emerald-400 transition-colors">{item.text}</button>
                     </li>
                   ))}
                 </ul>
               </div>
   
               <div>
                 <h3 className="text-emerald-400 font-bold text-lg mb-6">Support</h3>
                 <ul className="space-y-3">
                   {['Documentation', 'FAQs', 'Privacy Policy', 'Terms of Service', 'Technical Support'].map((item, idx) => (
                     <li key={idx}>
                       <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">{item}</a>
                     </li>
                   ))}
                 </ul>
               </div>
             </div>
   
             <div className="border-t border-slate-800 pt-8 text-center text-slate-500">
               <p>&copy; 2025 TST Technologies. All rights reserved. | Designed for security, built with trust.</p>
             </div>
           </div>
         </footer>
       </div>
     );
   };
   
   // Helper Components
   const NavLink = ({ onClick, children }) => (
     <button
       onClick={onClick}
       className="px-4 py-2.5 text-slate-700 font-medium rounded-lg hover:bg-slate-100 hover:text-blue-500 transition-all"
     >
       {children}
     </button>
   );
   
   const DropdownMenu = ({ title, items }) => (
     <div className="relative dropdown-parent">
       <button className="flex items-center gap-1 px-4 py-2.5 text-slate-700 font-medium rounded-lg hover:bg-slate-100 hover:text-blue-500 transition-all">
         {title}
         <ChevronDown size={16} />
       </button>
       <div className="dropdown-content absolute top-full left-0 mt-2 bg-white min-w-[280px] rounded-xl shadow-2xl border border-slate-200 py-2 z-50">
         {items.map((item, idx) => (
           <button
             key={idx}
             className="w-full flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-500 transition-all"
           >
             <item.icon size={20} className="text-blue-500" />
             <span>{item.text}</span>
           </button>
         ))}
       </div>
     </div>
   );
   
   const ProductCard = ({ icon: Icon, category, title, description, features }) => (
     <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200 card-hover hover:shadow-2xl hover:border-blue-500">
       <div className="h-56 bg-gradient-to-br from-slate-50 to-slate-200 flex items-center justify-center relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-500/10" />
         <Icon className="text-blue-500 relative z-10" size={80} />
       </div>
       <div className="p-6">
         <span className="inline-block bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide mb-4">
           {category}
         </span>
         <h3 className="text-2xl font-bold text-slate-900 mb-3 leading-tight">{title}</h3>
         <p className="text-slate-600 mb-6 leading-relaxed">{description}</p>
         <div className="flex flex-wrap gap-2">
           {features.map((feature, idx) => (
             <span key={idx} className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 border border-slate-200">
               <feature.icon size={16} className="text-blue-500" />
               {feature.text}
             </span>
           ))}
         </div>
       </div>
     </div>
   );
   
   // Data
   const products = [
     {
       icon: Fingerprint,
       category: 'Biometric',
       title: 'Fingerprint Attendance Systems',
       description: 'Advanced fingerprint authentication with high-capacity storage and multi-connectivity options for seamless workforce management.',
       features: [
         { icon: Database, text: '10K+ Templates' },
         { icon: Wifi, text: 'TCP/IP, WiFi' },
         { icon: Zap, text: 'Fast Matching' }
       ]
     },
     {
       icon: Smile,
       category: 'Biometric',
       title: 'Face Recognition (UFACE-301)',
       description: 'Visible light facial recognition with anti-spoofing technology, touchless authentication, and multi-factor verification.',
       features: [
         { icon: Shield, text: 'Anti-Spoofing' },
         { icon: Hand, text: 'Touchless' },
         { icon: Eye, text: 'Visible Light' }
       ]
     },
     {
       icon: Wifi,
       category: 'RFID',
       title: 'UHF RFID Reader',
       description: 'Long-range UHF RFID readers for vehicle tracking, asset management, and access control with Wiegand support.',
       features: [
         { icon: Wifi, text: 'Long Range' },
         { icon: Package, text: 'Vehicle Tracking' },
         { icon: Plug, text: 'Wiegand' }
       ]
     },
     {
       icon: ArrowLeftRight,
       category: 'Access Control',
       title: 'Flap Barriers',
       description: 'Premium pedestrian access control with bi-directional flow management, emergency release, and anti-tailgating detection.',
       features: [
         { icon: ArrowRight, text: 'Bi-Directional' },
         { icon: Users, text: 'Anti-Tailgate' },
         { icon: DoorOpen, text: 'Emergency Open' }
       ]
     },
     {
       icon: Shield,
       category: 'Access Control',
       title: 'Boom Barriers',
       description: 'Heavy-duty vehicle access control for parking lots, toll gates, and industrial premises with variable boom lengths.',
       features: [
         { icon: Package, text: 'Vehicle Control' },
         { icon: Gauge, text: 'Fast Operation' },
         { icon: Shield, text: 'Heavy Duty' }
       ]
     },
     {
       icon: Briefcase,
       category: 'Security',
       title: 'X-Ray Baggage Scanners',
       description: 'High-resolution X-ray inspection systems for airports, government buildings, and high-security facilities.',
       features: [
         { icon: Eye, text: 'High Resolution' },
         { icon: Shield, text: 'Color Imaging' },
         { icon: Shield, text: 'Threat Detection' }
       ]
     },
     {
       icon: Magnet,
       category: 'Security',
       title: 'Walk-Through Metal Detectors',
       description: 'Multi-zone metal detection with adjustable sensitivity, visitor counting, and alarm customization.',
       features: [
         { icon: Layers, text: 'Multi-Zone' },
         { icon: Gauge, text: 'Adjustable' },
         { icon: Shield, text: 'Smart Alarms' }
       ]
     },
     {
       icon: Hotel,
       category: 'Smart Lock',
       title: 'Smart Hotel Locks',
       description: 'RFID-based hotel lock systems with master key support, audit trails, and energy-saving features.',
       features: [
         { icon: Shield, text: 'RFID Cards' },
         { icon: Clock, text: 'Audit Trail' },
         { icon: Zap, text: 'Low Power' }
       ]
     },
     {
       icon: User,
       category: 'Management',
       title: 'Guard Patrol Systems',
       description: 'GPS-enabled guard tour monitoring with checkpoint validation, real-time tracking, and comprehensive reporting.',
       features: [
         { icon: MapPin, text: 'GPS Tracking' },
         { icon: Route, text: 'Route Planning' },
         { icon: Shield, text: 'Reports' }
       ]
     }
   ];
   
   const clientSegments = [
     {
       icon: Landmark,
       title: 'Government & Public Sector',
       clients: ['BSNL', 'GAIL India', 'IFFCO', 'Delhi Metro', 'Indian Railways']
     },
     {
       icon: Building,
       title: 'Corporate & Enterprise',
       clients: ['Samsung', 'Spark Minda', 'Havells', 'Hero MotoCorp', 'Maruti Suzuki', 'Dabur']
     },
     {
       icon: GraduationCap,
       title: 'Education & Healthcare',
       clients: ['DPS Schools', 'Amity University', 'Fortis Healthcare', 'Max Hospitals']
     },
     {
       icon: Factory,
       title: 'Manufacturing & Industry',
       clients: ['Rico Auto', 'JBM Group', 'Motherson Sumi', 'Eicher Motors']
     }
   ];
   const certifications = [
     { icon: CheckCircle, title: 'ISO Certified', desc: 'ISO 9001:2015 certified for quality management systems' },
     { icon: Award, title: 'Quality Checked', desc: 'All products undergo rigorous quality assurance testing' },
     { icon: Star, title: 'Customer Rated', desc: '4.8/5 average rating from 500+ satisfied clients' },
     { icon: ShieldHalf, title: 'Data Secure', desc: 'AES-256 encryption & GDPR compliant security' },
     { icon: Headphones, title: '24/7 Support', desc: 'Round-the-clock technical assistance and maintenance' },
     { icon: Zap, title: 'Rapid Deployment', desc: 'Quick implementation with minimal disruption' },
     { icon: Plug, title: 'Easy Integration', desc: 'Seamless compatibility with existing systems' },
     { icon: DollarSign, title: 'Cost Effective', desc: 'Competitive pricing with excellent ROI' }
   ];
   
   const contactInfo = [
     {
       icon: MapPin,
       title: 'Our Office',
       content: 'TST Technologies\nGhaziabad, Delhi/NCR\nUttar Pradesh, India'
     },
     {
       icon: Phone,
       title: 'Call Us',
       content: '+91 XXXXX XXXXX\nMon-Sat: 9:00 AM - 6:00 PM\n24/7 Emergency Support'
     },
     {
       icon: Mail,
       title: 'Email Us',
       content: 'info@tsttechnologies.com\nsales@tsttechnologies.com\nsupport@tsttechnologies.com'
     },
     {
       icon: Clock,
       title: 'Business Hours',
       content: 'Monday - Friday: 9 AM - 6 PM\nSaturday: 9 AM - 2 PM\nSunday: Closed'
     }
];

export default HomePage;