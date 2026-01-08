import React, { useState, useEffect } from 'react';
import ApiService from '../services/api.service';
import { Star, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

const FingerprintProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

// src/pages/FingerprintProductsPage.jsx
useEffect(() => {
  const loadProducts = async () => {
    try {
      setLoading(true);
      // FIX: Use 'product_type' filter instead of 'category' 
      // to match the ID in your JSON data
      const response = await ApiService.getProducts({ product_type: 'fingerprint' });
      
      console.log("Product Response:", response); // Debug to see the 19 products

      if (response.success) {
        // Correctly target response.data.products
        setProducts(response.data.products || []); 
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  loadProducts();
}, []);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin" size={48} /></div>;

  if (error) return (
    <div className="text-center py-20">
      <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
      <h2 className="text-xl font-bold">Error Loading Products</h2>
      <p className="text-gray-600">{error}</p>
      <button onClick={() => window.location.reload()} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg">Try Again</button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Fingerprint Attendance Systems</h1>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="h-64 bg-gray-50 flex items-center justify-center">
              <img 
                src={product.image_url || '/placeholder.png'} 
                alt={product.name} 
                className="max-h-full p-6 object-contain" 
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold mb-2">{product.name}</h3>
              <div className="flex items-center gap-1 mb-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(product.rating || 5) ? "currentColor" : "none"} />
                ))}
              </div>
              <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
                View Details <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FingerprintProductsPage;