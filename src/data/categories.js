export const categories = {
  biometric: {
    id: 'biometric',
    name: 'Biometric & CCTV',
    description: 'Advanced biometric authentication and surveillance solutions',
    subcategories: [
      {
        id: 'finger-print',
        name: 'Finger Print',
        description: 'High-precision fingerprint authentication devices',
        products: [
          {
            id: 'e3c-wifi',
            name: 'E3C Wi-Fi Fingerprint Device',
            image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&h=400&fit=crop',
            images: [
              'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&h=400&fit=crop',
              'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400&h=400&fit=crop',
              'https://images.unsplash.com/photo-1585504198199-20277593b94f?w=400&h=400&fit=crop'
            ],
            rating: 5,
            reviews: 127,
            price: 12500,
            originalPrice: 15000,
            warranty: '2 Years Warranty',
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
              'Model': 'E3C Wi-Fi',
              'Fingerprint Capacity': '3000',
              'Transaction Capacity': '100,000',
              'Verification Speed': '< 1 second',
              'False Acceptance Rate': '< 0.001%',
              'Communication': 'TCP/IP, Wi-Fi, USB',
              'Display': '2.8" TFT LCD',
              'Power Supply': 'DC 12V',
              'Dimensions': '180 x 135 x 40 mm'
            }
          },
          {
            id: 'f6',
            name: 'F6 Biometric Scanner',
            image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400&h=400&fit=crop',
            images: [
              'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400&h=400&fit=crop',
              'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&h=400&fit=crop'
            ],
            rating: 4,
            reviews: 89,
            price: 9500,
            originalPrice: 11000,
            warranty: '2 Years Warranty',
            description: 'Compact and efficient fingerprint scanner designed for small to medium businesses. Easy installation and user-friendly interface.',
            features: [
              'Compact design',
              'USB connectivity',
              'Stores up to 2000 fingerprints',
              'LED indicators',
              'Low power consumption',
              'Free software included'
            ],
            specifications: {
              'Model': 'F6',
              'Fingerprint Capacity': '2000',
              'Transaction Capacity': '50,000',
              'Verification Speed': '< 1.5 seconds',
              'Communication': 'USB',
              'Display': '2.4" LCD',
              'Power Supply': 'DC 5V (USB)',
              'Dimensions': '150 x 120 x 35 mm'
            }
          },
          {
            id: 'finger-print-k30-pro',
            name: 'K30 PRO Fingerprint System',
            image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&h=400&fit=crop',
            rating: 5,
            reviews: 245,
            price: 18500,
            originalPrice: 22000,
            warranty: '2 Years Warranty',
            description: 'Professional-grade fingerprint attendance system with advanced features. Ideal for large organizations and enterprises.',
            features: [
              'High-capacity storage (5000 users)',
              'Multi-verification modes',
              'Access control integration',
              'Mobile app support',
              'Cloud backup',
              'Tamper alarm'
            ],
            specifications: {
              'Model': 'K30 PRO',
              'Fingerprint Capacity': '5000',
              'Transaction Capacity': '200,000',
              'Verification Speed': '< 0.5 seconds',
              'Communication': 'TCP/IP, Wi-Fi, USB, RS485',
              'Display': '3.5" Color TFT',
              'Power Supply': 'DC 12V',
              'Dimensions': '200 x 150 x 45 mm'
            }
          },
          {
            id: 'finger-print-x990',
            name: 'X990 Enterprise Fingerprint',
            image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400&h=400&fit=crop',
            rating: 4,
            reviews: 156,
            price: 15800,
            originalPrice: 18500,
            warranty: '2 Years Warranty',
            description: 'Enterprise-level fingerprint device with excellent accuracy and reliability. Supports multiple authentication methods.',
            features: [
              'Multi-modal authentication',
              'ADMS (Advanced Data Management System)',
              'Webserver integration',
              'SDK available',
              'Wiegand output',
              'POE support'
            ],
            specifications: {
              'Model': 'X990',
              'Fingerprint Capacity': '4000',
              'Transaction Capacity': '150,000',
              'Verification Speed': '< 0.8 seconds',
              'Communication': 'TCP/IP, USB, POE',
              'Display': '3" TFT',
              'Power Supply': 'DC 12V / POE',
              'Dimensions': '190 x 140 x 42 mm'
            }
          }
        ]
      },
      {
        id: 'face',
        name: 'Face Recognition',
        description: 'AI-powered facial recognition systems',
        products: [
          {
            id: 'face-recognition-pro',
            name: 'Face Recognition Pro',
            image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&h=400&fit=crop',
            rating: 5,
            reviews: 312,
            price: 28500,
            originalPrice: 35000,
            warranty: '2 Years Warranty',
            description: 'Advanced AI-powered face recognition system with high accuracy. Works in various lighting conditions and supports mask detection.',
            features: [
              'AI deep learning algorithm',
              'Mask detection support',
              'Temperature screening',
              'Face capacity: 10,000',
              'Anti-spoofing technology',
              'Night vision support'
            ],
            specifications: {
              'Model': 'FR-PRO',
              'Face Capacity': '10,000',
              'Recognition Speed': '< 0.3 seconds',
              'Accuracy': '99.7%',
              'Camera': '2MP Wide-angle',
              'Display': '7" Touch Screen',
              'Temperature Range': '30°C - 45°C',
              'Communication': 'TCP/IP, Wi-Fi'
            }
          },
          {
            id: 'thermal-face-scanner',
            name: 'Thermal Face Scanner',
            image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400&h=400&fit=crop',
            rating: 4,
            reviews: 198,
            price: 32000,
            originalPrice: 38000,
            warranty: '2 Years Warranty',
            description: 'Thermal imaging face recognition device with temperature screening. Perfect for health and safety compliance.',
            features: [
              'Thermal temperature detection',
              'Fever alarm system',
              'Contactless operation',
              'Real-time alerts',
              'QR code support',
              'Access control integration'
            ],
            specifications: {
              'Model': 'TFS-200',
              'Face Capacity': '6000',
              'Recognition Speed': '< 0.5 seconds',
              'Temperature Accuracy': '±0.3°C',
              'Detection Distance': '0.3m - 1.5m',
              'Display': '8" HD Display',
              'Communication': 'TCP/IP, Wi-Fi, 4G',
              'Power Supply': 'DC 12V'
            }
          }
        ]
      },
      {
        id: 'uhf-rfid-reader',
        name: 'UHF RFID Reader',
        description: 'Long-range RFID reading solutions',
        products: []
      },
      {
        id: 'canteen-management',
        name: 'Canteen Management',
        description: 'Complete canteen automation systems',
        products: []
      },
      {
        id: 'guard-patrol',
        name: 'Guard Patrol',
        description: 'Security guard monitoring systems',
        products: []
      }
    ]
  },
  entrance: {
    id: 'entrance',
    name: 'Entrance Control',
    description: 'Sophisticated entrance management systems',
    subcategories: [
      {
        id: 'flap-barriers',
        name: 'Flap Barriers',
        description: 'Automatic flap barrier systems',
        products: []
      },
      {
        id: 'tripod-turnstile',
        name: 'Tripod Turnstile',
        description: 'Tripod turnstile gates',
        products: []
      }
    ]
  },
  inspection: {
    id: 'inspection',
    name: 'Inspection Products',
    description: 'Security screening and inspection equipment',
    subcategories: [
      {
        id: 'baggage-scanner',
        name: 'Baggage Scanner',
        description: 'X-ray baggage inspection systems',
        products: []
      },
      {
        id: 'metal-detector',
        name: 'Metal Detector',
        description: 'Walk-through and handheld metal detectors',
        products: []
      }
    ]
  },
  access: {
    id: 'access',
    name: 'Access Controller',
    description: 'Intelligent access control systems',
    subcategories: [
      {
        id: 'standalone-controller',
        name: 'Standalone Controller',
        description: 'Single door access controllers',
        products: []
      },
      {
        id: 'network-controller',
        name: 'Network Controller',
        description: 'Network-based access control',
        products: []
      }
    ]
  },
  smartlock: {
    id: 'smartlock',
    name: 'Smart Lock',
    description: 'Next-generation smart locking solutions',
    subcategories: [
      {
        id: 'digital-locks',
        name: 'Digital Locks',
        description: 'Electronic digital door locks',
        products: []
      },
      {
        id: 'hotel-locks',
        name: 'Hotel Locks',
        description: 'RFID hotel lock systems',
        products: []
      }
    ]
  }
};