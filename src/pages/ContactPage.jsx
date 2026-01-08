import React, { useState } from 'react';
import ApiService from '../services/api.service'; // Integrated singleton service
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  // State for handling submission status and UI feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset status and start loading
    setSubmitStatus({ type: null, message: '' });
    setIsSubmitting(true);

    try {
      // 1. Submit form data via the API Service
      const result = await ApiService.submitContact(formData);

      if (result.success) {
        setSubmitStatus({ 
          type: 'success', 
          message: `Thank you, ${formData.name}! Your inquiry has been submitted successfully.` 
        });
        // Clear form on success
        setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: error.message || 'Something went wrong. Please try again or call us directly.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Office Location',
      content: 'Ghaziabad, Delhi/NCR\nUttar Pradesh, India',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      borderColor: 'border-emerald-100'
    },
    {
      icon: Phone,
      title: 'Phone Number',
      content: '+91 XXXXX XXXXX',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-100'
    },
    {
      icon: Mail,
      title: 'Email Address',
      content: 'info@tsttechnologies.com',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-100'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      content: 'Mon-Fri: 9 AM - 6 PM\nSat: 9 AM - 2 PM',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      borderColor: 'border-orange-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-emerald-50/30 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-white text-emerald-600 px-6 py-2 rounded-full text-sm font-semibold shadow-sm border border-emerald-100">
              Get in Touch
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Let's Connect &{' '}<span className="text-emerald-600">Collaborate</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form Container */}
          <div className="lg:col-span-2">
            <div className="relative bg-white rounded-3xl border border-gray-200 p-8 md:p-10 shadow-sm">
              
              {/* Submission Status Alerts */}
              {submitStatus.type && (
                <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                  submitStatus.type === 'success' 
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
                  : 'bg-red-50 border border-red-200 text-red-800'
                }`}>
                  {submitStatus.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                  <span className="font-medium">{submitStatus.message}</span>
                </div>
              )}

              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Send us a Message</h2>
                <p className="text-gray-600">We typically respond within 24 hours</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all disabled:opacity-50"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all disabled:opacity-50"
                      placeholder="+91 XXXXX XXXXX"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all disabled:opacity-50"
                    placeholder="john@company.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all disabled:opacity-50"
                    placeholder="Your Organization"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    rows="5"
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none resize-none transition-all disabled:opacity-50"
                    placeholder="Tell us about your requirements..."
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="group/btn relative w-full overflow-hidden bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 rounded-xl transition-all duration-300 shadow-sm"
                >
                  <div className="relative flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold">
                    {isSubmitting ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <Send size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                    )}
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  </div>
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info Cards Sidebar */}
          <div className="space-y-6">
            {contactInfo.map((info, idx) => (
              <div key={idx} className="relative bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 ${info.bgColor} rounded-xl flex items-center justify-center`}>
                    <info.icon className={info.iconColor} size={22} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-2">{info.title}</h3>
                    <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">{info.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;