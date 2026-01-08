import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FileText, 
  Wrench, 
  BookOpen, 
  Video, 
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  Zap,
  Shield,
  Award
} from 'lucide-react';
import './ModernProductDetail.css';

const ModernProductDetail = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);

  // Sample product data - replace with your actual product data
  const product = {
    id: 'x990',
    name: 'FINGER PRINT - X990',
    category: 'Finger-print',
    tagline: 'Advanced Biometric Access Control Solution',
    rating: 4.8,
    reviews: 127,
    images: [
      '/api/placeholder/600/600', // Replace with actual product images
      '/api/placeholder/600/600',
      '/api/placeholder/600/600',
      '/api/placeholder/600/600'
    ],
    features: [
      { label: 'Fingerprint Capacity', value: '10,000' },
      { label: 'Transaction Capacity', value: '100,000' },
      { label: 'Card Capacity', value: '10,000' },
      { label: 'Fingerprint Sensor', value: '500 DPI Optical Sensor' }
    ],
    specifications: [
      { label: 'Display', value: '2.8 inch TFT Screen' },
      { label: 'Communication', value: 'TCP/IP, USB-Host, WiFi (Optional)' },
      { label: 'Verification Speed', value: '< 1 second' },
      { label: 'Operating Temperature', value: '0°C to 45°C' },
      { label: 'Power Supply', value: 'DC 12V 3A' },
      { label: 'Wiegand', value: 'Input & Output' }
    ],
    highlights: [
      'High-precision 500 DPI optical sensor',
      'Large storage capacity for enterprises',
      'Fast verification speed under 1 second',
      'Multiple authentication methods',
      'Built-in access control functions',
      'Compatible with third-party systems'
    ],
    documents: [
      { type: 'catalogue', label: 'PDF Catalogue', icon: FileText },
      { type: 'installation', label: 'Installation Guide', icon: Wrench },
      { type: 'manual', label: 'User Manual', icon: BookOpen },
      { type: 'videos', label: 'Video Tutorials', icon: Video }
    ]
  };

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="modern-product-detail">
      {/* Breadcrumb */}
      <div className="container">
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <Link to="/products" className="breadcrumb-link">Products</Link>
          <span className="breadcrumb-separator">/</span>
          <Link to={`/category/${product.category.toLowerCase()}`} className="breadcrumb-link">
            {product.category}
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </div>

        <Link to="/products" className="back-button">
          <ArrowLeft size={20} />
          <span>Back to Products</span>
        </Link>
      </div>

      {/* Product Header */}
      <div className="product-header">
        <div className="container">
          <div className="product-layout">
            {/* Image Gallery Section */}
            <div className="product-gallery">
              <div className="main-image-container">
                <div className="image-badge">
                  <Award size={16} />
                  <span>Premium Quality</span>
                </div>
                <img 
                  src={product.images[activeImage]} 
                  alt={product.name}
                  className="main-image"
                />
                {product.images.length > 1 && (
                  <>
                    <button className="image-nav prev" onClick={prevImage}>
                      <ChevronLeft size={24} />
                    </button>
                    <button className="image-nav next" onClick={nextImage}>
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>
              
              {/* Thumbnail Gallery */}
              {product.images.length > 1 && (
                <div className="thumbnail-gallery">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      className={`thumbnail ${activeImage === index ? 'active' : ''}`}
                      onClick={() => setActiveImage(index)}
                    >
                      <img src={img} alt={`${product.name} view ${index + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info Section */}
            <div className="product-info">
              <div className="category-badge">
                <Shield size={14} />
                <span>{product.category}</span>
              </div>
              
              <h1 className="product-title">{product.name}</h1>
              
              <p className="product-tagline">{product.tagline}</p>

              <div className="rating-section">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(product.rating) ? 'star filled' : 'star'}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="rating-text">{product.rating} out of 5</span>
                <span className="reviews-count">({product.reviews} reviews)</span>
              </div>

              {/* Key Features */}
              <div className="key-features">
                <h3 className="section-title">
                  <Zap size={20} />
                  Key Features
                </h3>
                <div className="features-grid">
                  {product.features.map((feature, index) => (
                    <div key={index} className="feature-card">
                      <div className="feature-label">{feature.label}</div>
                      <div className="feature-value">{feature.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                {product.documents.map((doc, index) => {
                  const Icon = doc.icon;
                  return (
                    <button key={index} className="action-btn">
                      <Icon size={20} />
                      <span>{doc.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Quick Contact */}
              <div className="quick-contact">
                <p>Need assistance with this product?</p>
                <Link to="/contact" className="contact-link">
                  Contact Our Team →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="product-details-section">
        <div className="container">
          <div className="details-grid">
            {/* Highlights */}
            <div className="detail-card">
              <h2 className="detail-title">Product Highlights</h2>
              <ul className="highlights-list">
                {product.highlights.map((highlight, index) => (
                  <li key={index} className="highlight-item">
                    <Check size={18} className="check-icon" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div className="detail-card">
              <h2 className="detail-title">Technical Specifications</h2>
              <div className="specs-table">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="spec-row">
                    <div className="spec-label">{spec.label}</div>
                    <div className="spec-value">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="related-products-section">
        <div className="container">
          <h2 className="section-heading">Related Products</h2>
          <p className="section-description">
            Explore more products from our {product.category} category
          </p>
          <Link to={`/category/${product.category.toLowerCase()}`} className="view-all-btn">
            View All Products in {product.category}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ModernProductDetail;