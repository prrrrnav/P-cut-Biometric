import React, { useState } from 'react';
import { Star, Eye, ArrowRight, Filter, Zap, Shield, Database, CheckCircle } from 'lucide-react';
import Image1 from '../assets/iClock-990-1-300x300.png';
import Image2 from '../assets/F6-300x300.png';
import Image3 from '../assets/K30-300x300.png';
import Image4 from '../assets/x990.png';
import Image5 from '../assets/F22-300x300.png';
import Image6 from '../assets/F18-300x300.png';
import Image7 from '../assets/LP400-300x300.png';
import Image8 from '../assets/P160-300x300.png';
import Image9 from '../assets/SilkFP-101TA-300x300.png';
import Image10 from '../assets/u460-300x300.png';
import Image11 from '../assets/ua300-300x300.png';
import Image12 from '../assets/WL20-300x300.png';
import Image13 from '../assets/WL20-300x300.png';
import Image14 from '../assets/x7-300x300.png';
import Image15 from '../assets/iClock-990-300x300.png';
import Image16 from '../assets/MA500-300x300.png';
import Image17 from '../assets/k21-300x300.png';
import Image18 from '../assets/LP400-300x300.png';
import Image19 from '../assets/K30-300x300.png';

const FingerprintProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const products = [
    {
      id: 1,
      name: 'E9C WI-FI',
      category: 'Finger Print',
      image: Image1,
      rating: 4.5,
      features: ['WiFi Enabled', 'Color Display', 'TCP/IP', '10K Templates'],
      badges: ['WiFi', 'Premium']
    },
    {
      id: 2,
      name: 'F6',
      category: 'Finger Print',
      image: Image2,
      rating: 4.8,
      features: ['Standalone', 'Slim Design', 'Fast Scanning', 'RFID Support'],
      badges: ['Compact', 'Popular']
    },
    {
      id: 3,
      name: 'FINGER PRINT - K30 PRO',
      category: 'Finger Print',
      image: Image3,
      rating: 4.7,
      features: ['Professional', 'Large Display', 'Multi-Auth', 'High Capacity'],
      badges: ['Pro Series', 'Enterprise']
    },
    {
      id: 4,
      name: 'FINGER PRINT - X990',
      category: 'Finger Print',
      image: Image4,
      rating: 4.6,
      features: ['Advanced', 'Touch Screen', 'Anti-Spoofing', 'Cloud Ready'],
      badges: ['Latest', 'Premium']
    },
    {
      id: 5,
      name: 'eSSL F22',
      category: 'Finger Print',
      image: Image5,
      rating: 4.5,
      features: ['Full Keypad', 'LCD Display', 'Reliable', 'Easy Setup'],
      badges: ['Popular']
    },
    {
      id: 6,
      name: 'Identix Slim',
      category: 'Finger Print',
      image: Image6,
      rating: 4.7,
      features: ['Touchscreen', 'Sleek Design', 'Fast Auth', 'Multiple Modes'],
      badges: ['Modern']
    },
    {
      id: 7,
      name: 'Access Mini',
      category: 'Finger Print',
      image: Image7,
      rating: 4.4,
      features: ['Compact', 'RFID + Bio', 'Door Control', 'Low Power'],
      badges: ['Compact']
    },
    {
      id: 8,
      name: 'eSSL K40',
      category: 'Finger Print',
      image: Image8,
      rating: 4.6,
      features: ['Large Screen', 'High Speed', 'Durable', 'Network Ready'],
      badges: ['Enterprise']
    },
    {
      id: 9,
      name: 'Identix iClock',
      category: 'Finger Print',
      image: Image9,
      rating: 4.5,
      features: ['Time Track', 'Multi User', 'Reports', 'Cloud Sync'],
      badges: ['Pro']
    },
    {
      id: 10,
      name: 'Printer Combo',
      category: 'Finger Print',
      image: Image10,
      rating: 4.8,
      features: ['Built-in Printer', 'Receipt Gen', 'Full Featured', 'Industrial'],
      badges: ['Premium', 'Printer']
    },
    {
      id: 11,
      name: 'Access Pro',
      category: 'Finger Print',
      image: Image11,
      rating: 4.7,
      features: ['Metal Body', 'Outdoor', 'Weatherproof', 'Heavy Duty'],
      badges: ['Durable']
    },
    {
      id: 12,
      name: 'eSSL Multi-Modal',
      category: 'Finger Print',
      image: Image12,
      rating: 4.6,
      features: ['RFID Card', 'Fingerprint', 'Multi Auth', 'Flexible'],
      badges: ['Multi-Modal']
    },
    {
      id: 13,
      name: 'Identix Wall',
      category: 'Finger Print',
      image: Image13,
      rating: 4.5,
      features: ['Wall Mount', 'Touchscreen', 'Modern UI', 'Easy Access'],
      badges: ['Wall Mount']
    },
    {
      id: 14,
      name: 'eSSL S001P',
      category: 'Finger Print',
      image: Image14,
      rating: 4.7,
      features: ['Face Display', 'Smart UI', 'Fast Process', 'Secure'],
      badges: ['Smart']
    },
    {
      id: 15,
      name: 'eSSL K50',
      category: 'Finger Print',
      image: Image15,
      rating: 4.6,
      features: ['Navigation Keys', 'Clear Display', 'Robust', 'Professional'],
      badges: ['Professional']
    },
    {
      id: 16,
      name: 'eSSL Silver Series',
      category: 'Finger Print',
      image: Image16,
      rating: 4.8,
      features: ['Color Icons', 'Premium Build', 'Fast Scan', 'Reliable'],
      badges: ['Premium']
    },
    {
      id: 17,
      name: 'eSSL Ultra',
      category: 'Finger Print',
      image: Image17,
      rating: 4.9,
      features: ['Large Sensor', 'HD Display', 'Multi Bio', 'Advanced'],
      badges: ['Ultra', 'Latest']
    },
    {
      id: 18,
      name: 'eSSL Ultra Pro',
      category: 'Finger Print',
      image: Image18,
      rating: 4.9,
      features: ['Pro Features', 'Enterprise', 'High Capacity', 'Premium'],
      badges: ['Ultra', 'Pro']
    },
    {
      id: 19,
      name: 'Compact Access',
      category: 'Finger Print',
      image: Image19,
      rating: 4.3,
      features: ['Ultra Compact', 'Simple Setup', 'Reliable', 'Budget'],
      badges: ['Compact']
    }
  ];

  const categories = ['all', 'WiFi Enabled', 'Professional', 'Compact', 'Enterprise', 'Premium'];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.badges.includes(selectedCategory));

  return (
    <div className="min-h-screen" style={{ background: '#f8f9fa' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        /* Product Card Animation - Matching CSS theme */
        .product-card {
          transition: all 0.3s ease;
        }

        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        /* Image Scale Animation */
        .product-image {
          transition: transform 0.3s ease;
        }

        .product-card:hover .product-image {
          transform: scale(1.05);
        }

        /* FadeInUp Animation from CSS */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in-up {
          animation: fadeInUp 0.6s ease forwards;
        }

        /* Staggered Animation Delays */
        .product-card:nth-child(1) { animation-delay: 0.1s; }
        .product-card:nth-child(2) { animation-delay: 0.2s; }
        .product-card:nth-child(3) { animation-delay: 0.3s; }
        .product-card:nth-child(4) { animation-delay: 0.4s; }
        .product-card:nth-child(5) { animation-delay: 0.5s; }
        .product-card:nth-child(6) { animation-delay: 0.6s; }
        .product-card:nth-child(7) { animation-delay: 0.7s; }
        .product-card:nth-child(8) { animation-delay: 0.8s; }
        .product-card:nth-child(9) { animation-delay: 0.1s; }
        .product-card:nth-child(10) { animation-delay: 0.2s; }
        .product-card:nth-child(11) { animation-delay: 0.3s; }
        .product-card:nth-child(12) { animation-delay: 0.4s; }
        .product-card:nth-child(13) { animation-delay: 0.5s; }
        .product-card:nth-child(14) { animation-delay: 0.6s; }
        .product-card:nth-child(15) { animation-delay: 0.7s; }
        .product-card:nth-child(16) { animation-delay: 0.8s; }
        .product-card:nth-child(17) { animation-delay: 0.1s; }
        .product-card:nth-child(18) { animation-delay: 0.2s; }
        .product-card:nth-child(19) { animation-delay: 0.3s; }

        /* Button Hover Effect */
        .action-button {
          transition: all 0.3s ease;
        }

        .action-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 102, 204, 0.3);
        }

        .action-button:active {
          transform: translateY(0);
        }

        /* Category Button */
        .category-btn {
          transition: all 0.3s ease;
        }

        .category-btn:hover {
          transform: translateY(-2px);
        }

        /* Hero Section Animations */
        .hero-badge {
          animation: fadeInUp 0.6s ease forwards;
          animation-delay: 0.1s;
          opacity: 0;
        }

        .hero-title {
          animation: fadeInUp 0.6s ease forwards;
          animation-delay: 0.2s;
          opacity: 0;
        }

        .hero-description {
          animation: fadeInUp 0.6s ease forwards;
          animation-delay: 0.3s;
          opacity: 0;
        }

        .hero-features {
          animation: fadeInUp 0.6s ease forwards;
          animation-delay: 0.4s;
          opacity: 0;
        }

        /* Feature Badge */
        .feature-badge {
          backdrop-filter: blur(8px);
        }
      `}</style>

      {/* Hero Header - Updated Blue Theme */}
      <div className="relative text-white py-20 overflow-hidden" style={{ 
        background: 'linear-gradient(135deg, #212529 0%, #343a40 50%, #212529 100%)'
      }}>
        <div className="absolute inset-0" style={{ opacity: 0.1 }}>
          <div className="absolute top-20 left-20 rounded-full filter blur-3xl" style={{
            width: '288px',
            height: '288px',
            background: '#0066cc'
          }}></div>
          <div className="absolute bottom-20 right-20 rounded-full filter blur-3xl" style={{
            width: '384px',
            height: '384px',
            background: '#667eea'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center">
            <div className="hero-badge inline-flex items-center gap-2 px-5 py-2 font-semibold mb-6" style={{
              background: 'rgba(0, 102, 204, 0.2)',
              border: '1px solid rgba(0, 102, 204, 0.3)',
              borderRadius: '20px',
              color: '#6eb8ff'
            }}>
              <CheckCircle size={18} />
              19 Premium Models Available
            </div>
            <h1 className="hero-title text-5xl lg:text-6xl font-bold mb-6">
              Fingerprint Attendance Systems
            </h1>
            <p className="hero-description text-xl max-w-3xl mx-auto mb-8" style={{ color: '#adb5bd' }}>
              Enterprise-grade fingerprint authentication devices with advanced features, high-capacity storage, and seamless integration
            </p>
            <div className="hero-features flex items-center justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 px-6 py-3 rounded-lg" style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(8px)'
              }}>
                <Shield size={20} style={{ color: '#6eb8ff' }} />
                <span className="font-semibold">Secure Authentication</span>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 rounded-lg" style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(8px)'
              }}>
                <Zap size={20} style={{ color: '#6eb8ff' }} />
                <span className="font-semibold">Fast Recognition</span>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 rounded-lg" style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(8px)'
              }}>
                <Database size={20} style={{ color: '#6eb8ff' }} />
                <span className="font-semibold">High Capacity</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section - Updated Theme */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white p-6" style={{
          borderRadius: '16px',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
          border: '1px solid #dee2e6'
        }}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <Filter style={{ color: '#0066cc' }} size={24} />
              <h3 className="text-lg font-semibold" style={{ color: '#212529' }}>Filter Products</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="category-btn px-5 py-2.5 font-medium"
                  style={{
                    borderRadius: '8px',
                    background: selectedCategory === cat 
                      ? 'linear-gradient(135deg, #0066cc 0%, #004c99 100%)' 
                      : '#f8f9fa',
                    color: selectedCategory === cat ? 'white' : '#495057',
                    boxShadow: selectedCategory === cat 
                      ? '0 4px 12px rgba(0, 102, 204, 0.2)' 
                      : 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== cat) {
                      e.currentTarget.style.background = '#e9ecef';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== cat) {
                      e.currentTarget.style.background = '#f8f9fa';
                    }
                  }}
                >
                  {cat === 'all' ? 'All Products' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid - Updated Cards */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card fade-in-up bg-white overflow-hidden group"
              style={{
                borderRadius: '16px',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
                border: '1px solid #dee2e6',
                opacity: 0
              }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Image */}
              <div className="relative overflow-hidden flex items-center justify-center" style={{
                height: '256px',
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
              }}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="product-image w-full h-full object-contain p-6"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0" style={{
                  background: 'linear-gradient(to top, rgba(33, 37, 41, 0.3), transparent)'
                }}></div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.badges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="feature-badge px-3 py-1.5 text-xs font-bold"
                      style={{
                        borderRadius: '20px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                      }}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                {/* Category */}
                <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{
                  color: '#0066cc'
                }}>
                  {product.category}
                </div>

                {/* Product Name */}
                <h3 className="text-xl font-bold mb-3 transition-colors" style={{
                  color: hoveredProduct === product.id ? '#0066cc' : '#212529'
                }}>
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      style={{ color: i < Math.floor(product.rating) ? '#ffc107' : '#dee2e6' }}
                    />
                  ))}
                  <span className="text-sm ml-2" style={{ color: '#6c757d' }}>
                    {product.rating.toFixed(1)}
                  </span>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {product.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm" style={{ color: '#495057' }}>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        background: '#0066cc',
                        borderRadius: '50%'
                      }}></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <button className="action-button w-full text-white px-6 py-3 font-semibold flex items-center justify-center gap-2" style={{
                  background: 'linear-gradient(135deg, #0066cc 0%, #004c99 100%)',
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0, 102, 204, 0.2)',
                  cursor: 'pointer'
                }}>
                  Read more
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" style={{
                    transition: 'transform 0.3s ease'
                  }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FingerprintProductsPage;