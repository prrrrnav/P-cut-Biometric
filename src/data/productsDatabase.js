// This is the central database. In production, this would be replaced with API calls

export const productsDatabase = {
  categories: [
    {
      id: 'biometric-cctv',
      name: 'Biometric & CCTV',
      icon: 'Fingerprint',
      description: 'Advanced biometric authentication and security systems',
      productTypes: [
        {
          id: 'fingerprint',
          name: 'Finger Print',
          icon: 'Fingerprint',
          description: 'High-precision fingerprint authentication devices',
          image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800',
          products: [
            {
              id: 'e3c-wifi',
              name: 'E3C Wi-Fi Fingerprint Device',
              shortName: 'E3C Wi-Fi',
              price: 12500,
              originalPrice: 15000,
              discount: 17,
              currency: '₹',
              rating: 5,
              reviews: 127,
              images: [
                'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800',
                'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800',
                'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800'
              ],
              description: 'Advanced fingerprint authentication device with Wi-Fi connectivity. Perfect for offices, warehouses, and commercial establishments. Features cloud-based attendance management and real-time monitoring.',
              features: [
                'Wi-Fi enabled for cloud sync',
                'Stores up to 3000 fingerprints',
                'Fast recognition in less than 1 second',
                'Built-in battery backup',
                'TCP/IP, USB connectivity',
                'Weather-resistant design'
              ],
              specifications: {
                'Capacity': '3000 users',
                'Fingerprint Sensor': 'Optical sensor',
                'Recognition Speed': '< 1 second',
                'FAR': '< 0.0001%',
                'FRR': '< 0.1%',
                'Communication': 'WiFi, TCP/IP, USB',
                'Display': '2.8" TFT Color Screen',
                'Power Supply': 'DC 12V',
                'Operating Temperature': '-10°C to 45°C',
                'Dimensions': '180 x 135 x 45 mm'
              },
              warranty: {
                period: '2 Years',
                type: 'Manufacturer Warranty'
              },
              applications: [
                'Corporate Offices',
                'Warehouses',
                'Manufacturing Units',
                'Educational Institutions',
                'Retail Stores',
                'Government Buildings'
              ],
              inStock: true
            },
            {
              id: 'f6-biometric',
              name: 'F6 Biometric Scanner',
              shortName: 'F6 Scanner',
              price: 9500,
              originalPrice: 11000,
              discount: 14,
              currency: '₹',
              rating: 4,
              reviews: 89,
              images: [
                'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
                'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800'
              ],
              description: 'Compact and efficient biometric scanner with advanced matching algorithms. Ideal for small to medium businesses.',
              features: [
                'Compact design',
                '1500 fingerprint capacity',
                'USB connectivity',
                'Quick enrollment',
                'Low power consumption',
                'Durable construction'
              ],
              specifications: {
                'Capacity': '1500 users',
                'Fingerprint Sensor': 'Optical',
                'Recognition Speed': '< 1.5 seconds',
                'Communication': 'USB 2.0',
                'Display': 'LED indicators',
                'Power Supply': 'USB powered',
                'Dimensions': '150 x 100 x 35 mm'
              },
              warranty: {
                period: '1 Year',
                type: 'Manufacturer Warranty'
              },
              applications: [
                'Small Offices',
                'Shops',
                'Clinics',
                'Schools'
              ],
              inStock: true
            },
            {
              id: 'k30-pro',
              name: 'K30 PRO Fingerprint System',
              shortName: 'K30 PRO',
              price: 18500,
              originalPrice: 22000,
              discount: 16,
              currency: '₹',
              rating: 5,
              reviews: 156,
              images: [
                'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800',
                'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800'
              ],
              description: 'Professional grade fingerprint system with advanced features for enterprise deployments.',
              features: [
                '5000 user capacity',
                'Advanced AI matching',
                'Multi-factor authentication',
                'Cloud integration',
                'Access control support',
                'Real-time sync'
              ],
              specifications: {
                'Capacity': '5000 users',
                'Fingerprint Sensor': 'Advanced optical',
                'Recognition Speed': '< 0.5 seconds',
                'Communication': 'WiFi, TCP/IP, RS485',
                'Display': '4.3" Touch Screen',
                'Power Supply': 'DC 12V',
                'Dimensions': '200 x 150 x 50 mm'
              },
              warranty: {
                period: '3 Years',
                type: 'Manufacturer Warranty'
              },
              applications: [
                'Large Enterprises',
                'Campuses',
                'Hospitals',
                'Government Facilities'
              ],
              inStock: true
            },
            {
              id: 'x990-enterprise',
              name: 'X990 Enterprise Fingerprint',
              shortName: 'X990',
              price: 15800,
              originalPrice: 18500,
              discount: 15,
              currency: '₹',
              rating: 4,
              reviews: 92,
              images: [
                'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
                'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800'
              ],
              description: 'Enterprise-grade fingerprint solution with robust performance and reliability.',
              features: [
                '4000 user capacity',
                'Dual authentication',
                'Network ready',
                'Battery backup',
                'Tamper alert',
                'Remote management'
              ],
              specifications: {
                'Capacity': '4000 users',
                'Fingerprint Sensor': 'Optical',
                'Recognition Speed': '< 0.8 seconds',
                'Communication': 'TCP/IP, USB',
                'Display': '3.5" LCD',
                'Power Supply': 'DC 12V',
                'Dimensions': '190 x 140 x 48 mm'
              },
              warranty: {
                period: '2 Years',
                type: 'Manufacturer Warranty'
              },
              applications: [
                'Corporate',
                'Industrial',
                'Healthcare',
                'Education'
              ],
              inStock: true
            }
          ]
        },
        {
          id: 'face-recognition',
          name: 'Face Recognition',
          icon: 'Smile',
          description: 'AI-powered facial recognition systems',
          image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
          products: [
            {
              id: 'uface-301',
              name: 'UFACE-301 Recognition System',
              shortName: 'UFACE-301',
              price: 24500,
              originalPrice: 28000,
              discount: 13,
              currency: '₹',
              rating: 5,
              reviews: 143,
              images: [
                'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
                'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800'
              ],
              description: 'Advanced facial recognition with visible light technology and anti-spoofing capabilities.',
              features: [
                'Visible light recognition',
                'Anti-spoofing technology',
                'Touchless authentication',
                'Works with face masks',
                'Temperature detection',
                '5000 face capacity'
              ],
              specifications: {
                'Face Capacity': '5000 faces',
                'Recognition Speed': '< 0.5 seconds',
                'Recognition Distance': '0.3 - 2 meters',
                'Camera': 'Dual camera system',
                'Display': '7" Touch Screen',
                'Communication': 'WiFi, TCP/IP',
                'Power Supply': 'DC 12V'
              },
              warranty: {
                period: '2 Years',
                type: 'Manufacturer Warranty'
              },
              applications: [
                'Smart Buildings',
                'Airports',
                'Hotels',
                'Corporate Offices'
              ],
              inStock: true
            }
          ]
        },
        {
          id: 'rfid-reader',
          name: 'UHF RFID Reader',
          icon: 'Wifi',
          description: 'Long-range RFID readers for access control',
          image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
          products: [
            {
              id: 'uhf-pro-200',
              name: 'UHF Pro 200 RFID Reader',
              shortName: 'UHF Pro 200',
              price: 16500,
              originalPrice: 19000,
              discount: 13,
              currency: '₹',
              rating: 5,
              reviews: 78,
              images: [
                'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800'
              ],
              description: 'Long-range UHF RFID reader for vehicle tracking and access control.',
              features: [
                'Read range up to 10 meters',
                'Multi-tag reading',
                'Wiegand output',
                'Weather-resistant IP65',
                'Vehicle tracking',
                'Parking management'
              ],
              specifications: {
                'Frequency': 'UHF 865-868 MHz',
                'Read Range': 'Up to 10 meters',
                'Tag Protocol': 'ISO 18000-6C',
                'Output': 'Wiegand 26/34',
                'Interface': 'RS485, TCP/IP',
                'Protection': 'IP65'
              },
              warranty: {
                period: '2 Years',
                type: 'Manufacturer Warranty'
              },
              applications: [
                'Parking Systems',
                'Toll Gates',
                'Warehouses',
                'Vehicle Access'
              ],
              inStock: true
            }
          ]
        },
        {
          id: 'canteen-management',
          name: 'Canteen Management',
          icon: 'Utensils',
          description: 'Complete cafeteria management solutions',
          image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800',
          products: []
        },
        {
          id: 'guard-patrol',
          name: 'Guard Patrol',
          icon: 'Shield',
          description: 'GPS-enabled security patrol systems',
          image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800',
          products: []
        }
      ]
    },
    {
      id: 'entrance-control',
      name: 'Entrance Control',
      icon: 'Lock',
      description: 'Access control and barrier systems',
      productTypes: [
        {
          id: 'boom-barrier',
          name: 'Boom Barrier',
          icon: 'Lock',
          description: 'Automatic boom barriers for vehicle control',
          image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
          products: []
        },
        {
          id: 'flap-barrier',
          name: 'Flap Barrier',
          icon: 'ArrowLeftRight',
          description: 'Pedestrian access control barriers',
          image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
          products: []
        }
      ]
    }
  ]
};

// Helper functions to get data
export const getCategory = (categoryId) => {
  return productsDatabase.categories.find(cat => cat.id === categoryId);
};

export const getProductType = (categoryId, productTypeId) => {
  const category = getCategory(categoryId);
  return category?.productTypes.find(pt => pt.id === productTypeId);
};

export const getProduct = (productId) => {
  for (const category of productsDatabase.categories) {
    for (const productType of category.productTypes) {
      const product = productType.products.find(p => p.id === productId);
      if (product) {
        return {
          ...product,
          categoryId: category.id,
          categoryName: category.name,
          productTypeId: productType.id,
          productTypeName: productType.name
        };
      }
    }
  }
  return null;
};

export const getAllCategories = () => {
  return productsDatabase.categories;
};
