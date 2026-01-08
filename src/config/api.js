// src/config/api.js

const API_CONFIG = {
    // FIX: Force development to use the live Hostinger API instead of localhost:8000
    BASE_URL: 'https://bisque-ferret-748084.hostingersite.com/api',

    ENDPOINTS: {
        HEALTH: '/health',
        PRODUCTS: '/products',
        CATEGORIES: '/categories',
        CONTACT: '/contact',
        CLIENTS: '/clients',
        TESTIMONIALS: '/testimonials',
        SETTINGS: '/settings'
    },
    TIMEOUT: 15000,
    HEADERS: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

export const getApiUrl = (endpoint) => `${API_CONFIG.BASE_URL}${endpoint}`;

// Ensure 'export' is here so api.service.js can find it
export const apiCall = async (endpoint, options = {}) => {
    try {
        const url = getApiUrl(endpoint);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);
        
        const response = await fetch(url, {
            ...options,
            headers: {
                ...API_CONFIG.HEADERS,
                ...options.headers
            },
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        
        // Handle success flag from your PHP ApiResponse
        if (data.success === false) throw new Error(data.message || 'API request failed');
        
        return data;
    } catch (error) {
        console.error('API Call Error:', endpoint, error);
        throw error;
    }
};

export const getImageUrl = (imageUrl) => {
    if (!imageUrl || imageUrl.startsWith('http')) return imageUrl || '/placeholder.png';
    const baseUrl = API_CONFIG.BASE_URL.replace('/api', '');
    return `${baseUrl}${imageUrl}`;
};

export default API_CONFIG;