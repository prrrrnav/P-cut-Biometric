import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Menu, X, Phone, Mail, MapPin, Fingerprint, ChevronDown, Loader2 } from 'lucide-react';
import { getProductRoute } from '../utils/routeMapping';
import './SimplifiedHeader.css';

// Icons mapping matching the 'icon' column in your database
const iconMap = {
  Fingerprint: Fingerprint,
};

export default function SimplifiedHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Fetch Dynamic Navigation Categories
  useEffect(() => {
    const fetchNavData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://bisque-ferret-748084.hostingersite.com/api/categories");
        
        // Accessing 'data' field from your PHP ApiResponse
        if (response.data.success) {
          setCategories(response.data.data);
        }
      } catch (error) {
        console.error("Header data load failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNavData();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path);

  return (
    <div className="header-wrapper">
      {/* Top Bar remains static as per your original design */}
      <div className="top-bar">
        {/* ... Top bar content ... */}
      </div>

      <nav className={`main-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-content">
            <div onClick={() => navigate('/')} className="logo-wrapper">
              <div className="logo-icon">
                <Fingerprint className="text-white" size={24} />
              </div>
              <span className="logo-text">TST Technologies</span>
            </div>

            <div className="desktop-menu">
              <button onClick={() => navigate('/')} className={`menu-link ${isActive('/home') ? 'active' : ''}`}>
                Home
              </button>

              {loading ? (
                <div className="px-4"><Loader2 className="animate-spin text-emerald-600" size={20} /></div>
              ) : (
                categories.map((category) => (
                  <div 
                    key={category.id}
                    className="dropdown-wrapper"
                    onMouseEnter={() => setOpenDropdown(category.id)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button className={`menu-link dropdown-trigger ${isActive(`/category/${category.id}`) ? 'active' : ''}`}>
                      {category.name}
                      <ChevronDown size={16} className={`dropdown-icon ${openDropdown === category.id ? 'rotate' : ''}`} />
                    </button>

                    {openDropdown === category.id && (
                      <div className="dropdown-menu">
                        <div className="dropdown-content">
                          {category.productTypes.map((productType) => {
                            const IconComponent = iconMap[productType.icon] || Fingerprint;
                            return (
                              <button
                                key={productType.id}
                                onClick={() => {
                                  const route = getProductRoute(category.id, productType.id);
                                  navigate(route);
                                  setOpenDropdown(null);
                                }}
                                className="dropdown-item"
                              >
                                <div className="dropdown-item-icon">
                                  <IconComponent size={20} />
                                </div>
                                <div className="dropdown-item-text">
                                  <div className="dropdown-item-name">{productType.name}</div>
                                  <div className="dropdown-item-desc">{productType.description}</div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}

              <button onClick={() => navigate('/about')} className={`menu-link ${isActive('/about') ? 'active' : ''}`}>
                About
              </button>
              <button onClick={() => navigate('/contact')} className="contact-button">
                Contact Us
              </button>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="mobile-toggle">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}