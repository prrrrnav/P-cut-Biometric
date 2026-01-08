import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/SimplifiedHeader";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CategoryPage from "./pages/CategoryPage";
import ProductListPage from "./pages/ModernProductListing";
import ProductDetailPage from "./pages/ModernProductDetail";
import ContactPage from "./pages/ContactPage";

// Dedicated Product Pages
import FingerprintProductsPage from './pages/FingerprintProductsPage';
import RfidReader from './pages/RfidReader';

// 🧪 TEMPORARY: Test Page (create this file first)
import TestAPI from './pages/TestAPI';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
          <h1 style={{ color: 'red' }}>Something went wrong</h1>
          <p>{this.state.error?.message}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              background: '#0066cc',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading Component
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '20px'
  }}>
    Loading...
  </div>
);

const App = () => {
  return (
    <ErrorBoundary>
      <Router basename="/">
        <div className="min-h-screen bg-white">
          <Navbar />

          <main>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* Main Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />

                {/* 🧪 TEMPORARY: Uncomment to test API */}
                {<Route path="/test-api" element={<TestAPI />} />}

                {/* Dedicated Product Pages */}
                <Route path="/fingerprint-products" element={<FingerprintProductsPage />} />
                <Route path="/rfid-reader" element={<RfidReader />} />

                {/* Category Page */}
                <Route path="/category/:categoryId" element={<CategoryPage />} />

                {/* Generic Product Listing */}
                <Route path="/products/:categoryId/:productTypeId" element={<ProductListPage />} />

                {/* Product Detail Page */}
                <Route path="/product/:productId" element={<ProductDetailPage />} />

                {/* 404 Page */}
                <Route
                  path="*"
                  element={
                    <div className="py-20 text-center">
                      <h1 className="text-4xl font-bold">404 - Not Found</h1>
                      <a href="/" className="text-emerald-600 underline">
                        Back Home
                      </a>
                    </div>
                  }
                />
              </Routes>
            </Suspense>
          </main>

          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;