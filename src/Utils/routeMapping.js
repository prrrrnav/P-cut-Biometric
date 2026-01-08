// src/utils/routeMapping.js
// Map product type IDs to their dedicated page routes

export const pageRoutes = {
  // Biometric Products - Add your product IDs here
  'fingerprint': '/fingerprint-products',
  'fingerprint-scanner': '/fingerprint-products',
  'fingerprint-attendance': '/fingerprint-products',
  
  'rfid': '/rfid-reader',
  'rfid-reader': '/rfid-reader',
  'uhf-rfid': '/rfid-reader',
  'uhf-rfid-reader': '/rfid-reader',
  
  'face-recognition': '/face-recognition',
  'face-scanner': '/face-recognition',
  
  'iris-scanner': '/iris-scanner',
  'palm-scanner': '/palm-scanner',
  
  // CCTV Products - Add as you create pages
  'dome-camera': '/dome-camera',
  'bullet-camera': '/bullet-camera',
  'ptz-camera': '/ptz-camera',
  'ip-camera': '/ip-camera',
  'nvr-dvr': '/nvr-dvr',
  'video-door-phone': '/video-door-phone',
  
  // Access Control - Add as you create pages
  'access-control': '/access-control',
  'time-attendance': '/time-attendance',
  
  // Add more product types as you create their pages
};

/**
 * Get the route for a product type
 * Returns dedicated page route if exists, otherwise returns generic product listing route
 */
export const getProductRoute = (categoryId, productTypeId) => {
  // Check if we have a dedicated page for this product type
  if (pageRoutes[productTypeId]) {
    return pageRoutes[productTypeId];
  }
  
  // Fallback to generic product listing page
  return `/products/${categoryId}/${productTypeId}`;
};

/**
 * Check if a product type has a dedicated page
 */
export const hasDedicatedPage = (productTypeId) => {
  return pageRoutes.hasOwnProperty(productTypeId);
};