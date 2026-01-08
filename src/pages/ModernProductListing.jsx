import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Grid, List, ChevronDown } from 'lucide-react';
import './ModernProductListing.css';

const ModernProductListing = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // Sample products data - replace with your actual data
  const products = [
    {
      id: 'x990',
      name: 'FINGER PRINT - X990',
      category: 'Finger-print',
      image: '/api/placeholder/400/400',
      tagline: 'Advanced Biometric Access Control',
      capacity: '10,000',
      featured: true,
      price: 'Contact for Price'
    },
    {
      id: 'f19',
      name: 'FACE RECOGNITION - F19',
      category: 'Face Recognition',
      image: '/api/placeholder/400/400',
      tagline: 'AI-Powered Face Detection System',
      capacity: '5,000',
      featured: true,
      price: 'Contact for Price'
    },
    {
      id: 'ac100',
      name: 'ACCESS CONTROL - AC100',
      category: 'Access Control',
      image: '/api/placeholder/400/400',
      tagline: 'Smart Door Management System',
      capacity: 'Unlimited',
      featured: false,
      price: 'Contact for Price'
    },
    {
      id: 'tr500',
      name: 'TIME RECORDER - TR500',
      category: 'Time Attendance',
      image: '/api/placeholder/400/400',
      tagline: 'Professional Attendance Tracking',
      capacity: '8,000',
      featured: false,
      price: 'Contact for Price'
    },
    {
      id: 'card200',
      name: 'CARD READER - CR200',
      category: 'Card Reader',
      image: '/api/placeholder/400/400',
      tagline: 'RFID Card Access System',
      capacity: '15,000',
      featured: true,
      price: 'Contact for Price'
    },
    {
      id: 'bio300',
      name: 'BIO LOCK - BL300',
      category: 'Smart Lock',
      image: '/api/placeholder/400/400',
      tagline: 'Keyless Entry Solution',
      capacity: 'N/A',
      featured: false,
      price: 'Contact for Price'
    }
  ];

  const categories = [
    'All Products',
    'Finger-print',
    'Face Recognition',
    'Access Control',
    'Time Attendance',
    'Card Reader',
    'Smart Lock'
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                          product.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="modern-product-listing">
      {/* Header Section */}
      <div className="listing-header">
        <div className="container">
          <div className="header-content">
            <div>
              <h1 className="page-title">Our Products</h1>
              <p className="page-subtitle">
                Discover our comprehensive range of biometric and security solutions
              </p>
            </div>
            <div className="results-count">
              <span className="count-number">{filteredProducts.length}</span>
              <span className="count-label">Products Found</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Filters and Controls */}
        <div className="controls-bar">
          {/* Search */}
          <div className="search-box">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Category Filter */}
          <div className="filter-group">
            <Filter size={18} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map((cat, index) => (
                <option key={index} value={index === 0 ? 'all' : cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="filter-group">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="featured">Featured</option>
              <option value="name">Name (A-Z)</option>
              <option value="category">Category</option>
            </select>
            <ChevronDown size={18} />
          </div>

          {/* View Toggle */}
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={20} />
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        {/* Products Grid/List */}
        <div className={`products-container ${viewMode}-view`}>
          {filteredProducts.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No products found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="product-card"
              >
                {product.featured && (
                  <div className="featured-badge">Featured</div>
                )}
                
                <div className="product-image-container">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-overlay">
                    <span className="view-details">View Details →</span>
                  </div>
                </div>

                <div className="product-card-content">
                  <div className="product-category">{product.category}</div>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-tagline">{product.tagline}</p>
                  
                  <div className="product-meta">
                    <div className="meta-item">
                      <span className="meta-label">Capacity</span>
                      <span className="meta-value">{product.capacity}</span>
                    </div>
                    <div className="meta-item">
                      <span className="price-tag">{product.price}</span>
                    </div>
                  </div>

                  <div className="card-actions">
                    <button className="action-link">Learn More</button>
                    <button className="action-link primary">Get Quote</button>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernProductListing;