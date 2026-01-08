export default function SubcategoryPage({ category, subcategory: subcategoryId, navigate }) {
  const subcategory = category.subcategories.find(sub => sub.id === subcategoryId);
  
  if (!subcategory) return <div>Subcategory not found</div>;

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button onClick={() => navigate('home')} className="hover:text-red-600">Home</button>
            <span>›</span>
            <button onClick={() => navigate(category.id)} className="hover:text-red-600">{category.name}</button>
            <span>›</span>
            <span className="text-gray-800 font-semibold">{subcategory.name}</span>
          </div>
        </div>
      </div>

      {/* Subcategory Header */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2 text-gray-800">{subcategory.name}</h1>
          <p className="text-gray-600 mb-6">{subcategory.description}</p>
          
          {/* Results count and sorting */}
          <div className="flex justify-between items-center py-4 border-t border-b">
            <p className="text-sm text-gray-600">
              Showing 1 - {subcategory.products.length} of {subcategory.products.length} results
            </p>
            <select className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600">
              <option>Default sorting</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
            </select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {subcategory.products.length > 0 ? (
            <div className="grid md:grid-cols-4 gap-6">
              {subcategory.products.map(product => (
                <div 
                  key={product.id} 
                  onClick={() => navigate(category.id, subcategory.id, product.id)}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer"
                >
                  <div className="relative">
                    <div className="h-64 bg-gray-50 flex items-center justify-center p-4">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <p className="text-xs text-gray-500 mb-2">{subcategory.name}</p>
                    <h3 className="font-bold text-gray-800 mb-3 min-h-[3rem]">{product.name}</h3>
                    
                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      {product.rating > 0 ? (
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < product.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                          ))}
                        </div>
                      ) : (
                        <div className="flex gap-1 text-gray-300">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>☆</span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Price */}
                    {product.price && (
                      <p className="text-xl font-bold text-red-600 mb-3">₹{product.price.toLocaleString()}</p>
                    )}
                    
                    <button className="w-full px-4 py-2 bg-purple-700 text-white rounded font-semibold hover:bg-purple-800 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Products Available</h3>
              <p className="text-gray-600">Products for this category are coming soon.</p>
              <button 
                onClick={() => navigate(category.id)}
                className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Back to {category.name}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}