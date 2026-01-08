// productsData.js
// Sample product data structure for TST Technologies

export const productsData = [
  {
    id: 'x990',
    name: 'FINGER PRINT - X990',
    category: 'Fingerprint Scanner',
    tagline: 'Advanced Biometric Access Control Solution',
    rating: 4.8,
    reviews: 127,
    featured: true,
    price: 'Contact for Price',
    
    // Image paths - update with your actual image paths
    images: [
      '/images/products/x990/main.jpg',
      '/images/products/x990/side.jpg',
      '/images/products/x990/display.jpg',
      '/images/products/x990/installation.jpg'
    ],
    
    // Key features for quick display
    features: [
      { label: 'Fingerprint Capacity', value: '10,000' },
      { label: 'Transaction Capacity', value: '100,000' },
      { label: 'Card Capacity', value: '10,000' },
      { label: 'Fingerprint Sensor', value: '500 DPI Optical Sensor' }
    ],
    
    // Detailed specifications
    specifications: [
      { label: 'Display', value: '2.8 inch TFT Screen' },
      { label: 'Communication', value: 'TCP/IP, USB-Host, WiFi (Optional)' },
      { label: 'Verification Speed', value: '< 1 second' },
      { label: 'Operating Temperature', value: '0°C to 45°C' },
      { label: 'Humidity', value: '20%-80%' },
      { label: 'Power Supply', value: 'DC 12V 3A' },
      { label: 'Wiegand', value: 'Input & Output' },
      { label: 'Dimensions', value: '180 x 140 x 45 mm' },
      { label: 'Weight', value: '500g' }
    ],
    
    // Product highlights
    highlights: [
      'High-precision 500 DPI optical fingerprint sensor',
      'Large storage capacity suitable for enterprise use',
      'Lightning-fast verification under 1 second',
      'Multiple authentication methods: fingerprint, card, password',
      'Built-in access control and time attendance functions',
      'Compatible with third-party access control systems',
      'WiFi connectivity for flexible installation',
      'Easy integration with existing security systems'
    ],
    
    // Document links
    documents: {
      catalogue: '/documents/products/x990/catalogue.pdf',
      installation: '/documents/products/x990/installation-guide.pdf',
      manual: '/documents/products/x990/user-manual.pdf',
      videos: 'https://youtube.com/playlist?list=YOUR_PLAYLIST_ID'
    },
    
    // Additional metadata
    brand: 'eSSL',
    model: 'X990',
    warranty: '1 Year',
    inStock: true,
    
    // SEO metadata
    seo: {
      title: 'FINGER PRINT X990 - Advanced Biometric Access Control | TST Technologies',
      description: 'High-precision fingerprint scanner with 10,000 capacity. Fast verification under 1 second. Perfect for enterprise security solutions.',
      keywords: ['fingerprint scanner', 'biometric device', 'access control', 'eSSL X990', 'time attendance']
    }
  },
  
  {
    id: 'f19',
    name: 'FACE RECOGNITION - F19',
    category: 'Face Recognition',
    tagline: 'AI-Powered Face Detection & Recognition System',
    rating: 4.7,
    reviews: 98,
    featured: true,
    price: 'Contact for Price',
    
    images: [
      '/images/products/f19/main.jpg',
      '/images/products/f19/angle.jpg',
      '/images/products/f19/interface.jpg',
      '/images/products/f19/mounting.jpg'
    ],
    
    features: [
      { label: 'Face Capacity', value: '5,000' },
      { label: 'Transaction Records', value: '100,000' },
      { label: 'Recognition Speed', value: '< 0.5 seconds' },
      { label: 'Camera Resolution', value: '2MP Wide Angle' }
    ],
    
    specifications: [
      { label: 'Display', value: '7 inch Touch Screen' },
      { label: 'Camera', value: '2MP Wide Angle Lens' },
      { label: 'Communication', value: 'TCP/IP, WiFi, 4G (Optional)' },
      { label: 'Recognition Distance', value: '0.3m - 2m' },
      { label: 'Recognition Accuracy', value: '99.7%' },
      { label: 'Anti-Spoofing', value: 'Built-in Liveness Detection' },
      { label: 'Operating Temperature', value: '-10°C to 50°C' },
      { label: 'Power Supply', value: 'DC 12V 2A' }
    ],
    
    highlights: [
      'Advanced AI algorithm for high accuracy face recognition',
      'Built-in liveness detection to prevent spoofing',
      'Works in various lighting conditions',
      'Mask detection capability',
      'Temperature measurement (optional)',
      'Cloud-based management system',
      'Real-time attendance tracking',
      'Contactless and hygienic solution'
    ],
    
    documents: {
      catalogue: '/documents/products/f19/catalogue.pdf',
      installation: '/documents/products/f19/installation-guide.pdf',
      manual: '/documents/products/f19/user-manual.pdf',
      videos: 'https://youtube.com/playlist?list=YOUR_PLAYLIST_ID'
    },
    
    brand: 'ZKTeco',
    model: 'F19',
    warranty: '1 Year',
    inStock: true,
    
    seo: {
      title: 'Face Recognition F19 - AI-Powered Facial Recognition | TST Technologies',
      description: 'Advanced face recognition system with AI and liveness detection. 5,000 face capacity with 99.7% accuracy.',
      keywords: ['face recognition', 'facial recognition system', 'AI biometric', 'ZKTeco F19', 'contactless attendance']
    }
  },
  
  {
    id: 'ac100',
    name: 'ACCESS CONTROL - AC100',
    category: 'Access Control',
    tagline: 'Smart Door Access Management System',
    rating: 4.6,
    reviews: 85,
    featured: false,
    price: 'Contact for Price',
    
    images: [
      '/images/products/ac100/main.jpg',
      '/images/products/ac100/controller.jpg',
      '/images/products/ac100/reader.jpg'
    ],
    
    features: [
      { label: 'User Capacity', value: 'Unlimited' },
      { label: 'Doors Supported', value: '4 Doors' },
      { label: 'Card Types', value: 'RFID, Mifare' },
      { label: 'Communication', value: 'TCP/IP, RS485' }
    ],
    
    specifications: [
      { label: 'Controller Type', value: '4-Door Network Controller' },
      { label: 'Card Reading Distance', value: '3-8 cm' },
      { label: 'Card Frequency', value: '13.56MHz' },
      { label: 'Relay Output', value: '4 Channels' },
      { label: 'Input Voltage', value: '12V DC' },
      { label: 'Operating Temperature', value: '-20°C to 60°C' }
    ],
    
    highlights: [
      'Supports up to 4 doors per controller',
      'Cloud-based or local server management',
      'Real-time door status monitoring',
      'Anti-passback function',
      'Time zone access control',
      'Integration with alarm systems',
      'Audit trail and event logging',
      'Mobile app control available'
    ],
    
    documents: {
      catalogue: '/documents/products/ac100/catalogue.pdf',
      installation: '/documents/products/ac100/installation-guide.pdf',
      manual: '/documents/products/ac100/user-manual.pdf',
      videos: 'https://youtube.com/playlist?list=YOUR_PLAYLIST_ID'
    },
    
    brand: 'TST Technologies',
    model: 'AC100',
    warranty: '2 Years',
    inStock: true,
    
    seo: {
      title: 'Access Control AC100 - Smart Door Management | TST Technologies',
      description: '4-door access control system with RFID/Mifare support. Cloud-based management with real-time monitoring.',
      keywords: ['access control', 'door controller', 'RFID access', 'security system', 'door management']
    }
  }
  
  // Add more products following the same structure...
];

// Categories for filtering
export const categories = [
  {
    id: 'fingerprint',
    name: 'Fingerprint Scanners',
    description: 'High-precision biometric fingerprint recognition devices',
    icon: '👆',
    count: 12
  },
  {
    id: 'face-recognition',
    name: 'Face Recognition',
    description: 'AI-powered facial recognition and detection systems',
    icon: '👤',
    count: 8
  },
  {
    id: 'access-control',
    name: 'Access Control',
    description: 'Smart door and facility access management solutions',
    icon: '🚪',
    count: 15
  },
  {
    id: 'time-attendance',
    name: 'Time Attendance',
    description: 'Employee attendance tracking and management systems',
    icon: '⏰',
    count: 10
  },
  {
    id: 'card-reader',
    name: 'Card Readers',
    description: 'RFID and smart card reading solutions',
    icon: '💳',
    count: 7
  },
  {
    id: 'smart-lock',
    name: 'Smart Locks',
    description: 'Keyless entry and smart locking mechanisms',
    icon: '🔐',
    count: 9
  }
];

// Helper function to get product by ID
export const getProductById = (id) => {
  return productsData.find(product => product.id === id);
};

// Helper function to get products by category
export const getProductsByCategory = (category) => {
  if (category === 'all') return productsData;
  return productsData.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
};

// Helper function to search products
export const searchProducts = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return productsData.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.tagline.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
};

// Helper function to get featured products
export const getFeaturedProducts = () => {
  return productsData.filter(product => product.featured);
};

export default productsData;