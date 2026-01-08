import React, { useEffect, useState } from 'react';
import ApiService from '../services/api.service'; // Use the established singleton service
import Breadcrumb from '../components/Breadcrumb';
import { Fingerprint, Smile, Wifi, Utensils, Shield, Loader2 } from 'lucide-react';

// Icons mapping matching the 'icon' column in your database
const iconMap = {
  Fingerprint, Smile, Wifi, Utensils, Shield
};

const CategoryPage = ({ categoryId, navigate }) => {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        // Using the service method to fetch category by ID
        const response = await ApiService.getCategoryById(categoryId);
        
        if (response.success) {
          setCategory(response.data);
        } else {
          setError(response.message || "Category not found");
        }
      } catch (err) {
        setError("Failed to load category details. Please try again later.");
        console.error("Category fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchCategoryData();
    }
  }, [categoryId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-emerald-600" size={48} />
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="py-20 text-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-900">{error || "Category not found"}</h2>
        <button 
          onClick={() => navigate('home')} 
          className="mt-4 text-emerald-600 font-semibold hover:underline"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Home', onClick: () => navigate('home') },
    { label: category.name }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Breadcrumb items={breadcrumbItems} />

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{category.name}</h1>
          <p className="text-xl text-gray-600 leading-relaxed">{category.description}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Mapping through productTypes fetched dynamically */}
          {category.productTypes && category.productTypes.map((productType) => {
            const IconComponent = iconMap[productType.icon] || Fingerprint;
            
            return (
              <button
                key={productType.id}
                onClick={() => navigate('product-list', categoryId, productType.id)}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 text-left group"
              >
                <div className="h-48 bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center group-hover:from-emerald-100 group-hover:to-blue-100 transition-colors">
                  <IconComponent className="text-emerald-600" size={80} />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{productType.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{productType.description}</p>
                  <div className="flex items-center text-emerald-600 font-bold uppercase text-xs tracking-widest group-hover:gap-2 transition-all">
                    Explore Products
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;