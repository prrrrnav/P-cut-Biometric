import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Menu,
  X,
  Fingerprint,
  ChevronDown,
  Loader2
} from 'lucide-react';
import { getProductRoute } from '../utils/routeMapping';
import './SimplifiedHeader.css';

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

  // ✅ Fetch categories safely
  useEffect(() => {
    const fetchNavData = async () => {
      try {
        const res = await axios.get(
          'https://bisque-ferret-748084.hostingersite.com/api/categories'
        );

        if (res?.data?.success && Array.isArray(res.data.data)) {
          setCategories(res.data.data);
        } else {
          setCategories([]);
        }
      } catch (err) {
        console.error('Header data load failed:', err);
        setCategories([]);
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

  const isActive = (path) =>
    location.pathname === path ||
    location.pathname.startsWith(path);

  return (
    <div className="header-wrapper">
      <nav className={`main-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-content">

            {/* LOGO */}
            <div onClick={() => navigate('/')} className="logo-wrapper">
              <div className="logo-icon">
                <Fingerprint className="text-white" size={24} />
              </div>
              <span className="logo-text">TST Technologies</span>
            </div>

            {/* DESKTOP MENU */}
            <div className="desktop-menu">
              <button
                onClick={() => navigate('/')}
                className={`menu-link ${isActive('/') ? 'active' : ''}`}
              >
                Home
              </button>

              {/* LOADING */}
              {loading && (
                <div className="px-4">
                  <Loader2
                    className="animate-spin text-emerald-600"
                    size={20}
                  />
                </div>
              )}

              {/* CATEGORIES */}
              {!loading &&
                Array.isArray(categories) &&
                categories.map((category) => (
                  <div
                    key={category.id}
                    className="dropdown-wrapper"
                    onMouseEnter={() => setOpenDropdown(category.id)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button className="menu-link dropdown-trigger">
                      {category.name}
                      <ChevronDown
                        size={16}
                        className={`dropdown-icon ${openDropdown === category.id ? 'rotate' : ''
                          }`}
                      />
                    </button>

                    {/* DROPDOWN */}
                    {openDropdown === category.id &&
                      Array.isArray(category.productTypes) && (
                        <div className="dropdown-menu">
                          <div className="dropdown-content">
                            {category.productTypes.map((productType) => {
                              const Icon =
                                iconMap[productType.icon] || Fingerprint;

                              return (
                                <button
                                  key={productType.id}
                                  className="dropdown-item"
                                  onClick={() => {
                                    navigate(
                                      getProductRoute(category.id, productType.id),
                                      {
                                        state: {
                                          pageTitle: productType.name,
                                          productTypeId: productType.id // ✅ THIS is the key line
                                        },
                                      }
                                    );
                                    setOpenDropdown(null);
                                  }}

                                >
                                  <div className="dropdown-item-icon">
                                    <Icon size={20} />
                                  </div>
                                  <div className="dropdown-item-text">
                                    <div className="dropdown-item-name">
                                      {productType.name}
                                    </div>
                                    <div className="dropdown-item-desc">
                                      {productType.description}
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                  </div>
                ))}

              <button
                onClick={() => navigate('/about')}
                className={`menu-link ${isActive('/about') ? 'active' : ''}`}
              >
                About
              </button>

              <button
                onClick={() => navigate('/contact')}
                className="contact-button"
              >
                Contact Us
              </button>
            </div>

            {/* MOBILE */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-toggle"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
