import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ApiService from '../services/api.service';
import {
  FileText,
  Wrench,
  BookOpen,
  Video,
  ArrowLeft,
  Check,
  Zap,
  Shield,
  Award,
  Loader2,
  AlertCircle
} from 'lucide-react';
import './ModernProductDetail.css';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Fetch product from backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        console.log('Fetching product with ID/slug:', productId);
        const res = await ApiService.getProduct(productId);
        console.log('API Response:', res);

        if (res?.success) {
          setProduct(res.data);
        } else {
          throw new Error(res?.message || 'Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);


  /* ===========================
     LOADING / ERROR STATES
  ============================ */

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-32">
        <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
        <h2 className="text-xl font-bold">Product Not Found</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  /* ===========================
     RENDER
  ============================ */

  return (
    <div className="modern-product-detail">

      {/* Breadcrumb */}
      <div className="container">
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span>/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </div>

        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeft size={20} />
          Back
        </button>
      </div>

      {/* Product Header */}
      <div className="product-header">
        <div className="container">
          <div className="product-layout">

            {/* Images */}
            <div className="product-gallery">
              <div className="main-image-container">
                <div className="image-badge">
                  <Award size={16} />
                  <span>Premium Quality</span>
                </div>

                <img
                  src={product.image_url ? ApiService.getImageUrl(product.image_url) : '/placeholder.png'}
                  alt={product.name}
                  className="main-image"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="product-info">
              <div className="category-badge">
                <Shield size={14} />
                <span>{product.product_type_name}</span>
              </div>

              <h1 className="product-title">{product.name}</h1>
              <p className="product-tagline">{product.short_description}</p>

              {/* Rating */}
              <div className="rating-section">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(product.rating || 5) ? 'star filled' : 'star'}>
                    ★
                  </span>
                ))}
                <span className="rating-text">{product.rating || 5} / 5</span>
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="key-features">
                  <h3 className="section-title">
                    <Zap size={20} /> Key Features
                  </h3>
                  <div className="features-grid">
                    {product.features.map((f, i) => (
                      <div key={i} className="feature-card">
                        <div className="feature-value">{f.feature_text || f}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Documents (static buttons for now) */}
              <div className="action-buttons">
                <button className="action-btn"><FileText size={20} /> Catalogue</button>
                <button className="action-btn"><Wrench size={20} /> Installation</button>
                <button className="action-btn"><BookOpen size={20} /> Manual</button>
                <button className="action-btn"><Video size={20} /> Videos</button>
              </div>

              {/* Contact */}
              <div className="quick-contact">
                <p>Need assistance with this product?</p>
                <Link to="/contact" className="contact-link">
                  Get Quote →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications */}
      {product.specifications && product.specifications.length > 0 && (
        <div className="product-details-section">
          <div className="container">
            <div className="detail-card">
              <h2 className="detail-title">Specifications</h2>
              <div className="specs-table">
                {product.specifications.map((spec, i) => (
                  <div key={i} className="spec-row">
                    <div className="spec-label">{spec.spec_key || spec.key}</div>
                    <div className="spec-value">{spec.spec_value || spec.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Description */}
      {product.full_description && (
        <div className="product-details-section">
          <div className="container">
            <div className="detail-card">
              <h2 className="detail-title">Description</h2>
              <p className="text-gray-700 leading-relaxed">{product.full_description}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductDetailPage;
