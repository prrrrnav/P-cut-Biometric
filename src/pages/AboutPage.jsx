import React, { useEffect, useState } from 'react';
import ApiService from '../services/api.service'; // Integrated singleton service
import { 
  Shield, Target, Users, Award, Zap, Fingerprint, Lightbulb, 
  Heart, Star, Rocket, Database, Settings, Lock, Eye, 
  Handshake, Loader2 
} from 'lucide-react';

const AboutPage = () => {
  const [stats, setStats] = useState({ total_clients: '...', rating: '4.9/5' });
  const [siteSettings, setSiteSettings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // 1. Fetch Client Statistics via service
        const statsRes = await ApiService.getClientStats();
        if (statsRes.success) {
          setStats(prev => ({ 
            ...prev, 
            total_clients: `${statsRes.data.total_clients}+` 
          }));
        }

        // 2. Fetch Site Settings (Mission, Year established, etc.)
        const settingsRes = await ApiService.getSettings();
        if (settingsRes.success) {
          setSiteSettings(settingsRes.data);
        }
      } catch (error) {
        console.error("Failed to load about page data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-emerald-600" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg">
              <Fingerprint size={20} />
              {/* Fallback to static if setting not in DB */}
              {siteSettings.years_experience || '15+'} Years of Excellence
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
              About <span className="text-emerald-600">TST Technologies</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {siteSettings.about_tagline || 'Leading provider of biometric security solutions and automated fingerprint identification systems'}
            </p>
          </div>

          {/* Dynamic Stats Row populated from Database */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Users, number: stats.total_clients, label: 'Active Clients' },
              { icon: Award, number: `${siteSettings.years_experience || '15'}+`, label: 'Years Experience' },
              { icon: Target, number: siteSettings.uptime_sla || '99.9%', label: 'Uptime SLA' },
              { icon: Star, number: stats.rating, label: 'Client Rating' }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-lg text-center">
                <div className="w-14 h-14 bg-emerald-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <stat.icon className="text-white" size={28} />
                </div>
                <div className="text-3xl font-black text-gray-900 mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement pulled from site_settings table */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-12 text-center text-white mb-20 relative overflow-hidden">
            <div className="relative z-10 max-w-4xl mx-auto">
              <Rocket className="mx-auto mb-6" size={56} />
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl leading-relaxed opacity-95">
                {siteSettings.mission_statement || 'We are committed to providing quality Biometrics and RFID solutions to give technology leverage in enhancing business and security.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;