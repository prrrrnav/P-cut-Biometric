// src/services/api.service.js
import API_CONFIG, { apiCall, getImageUrl } from '../config/api';

class ApiService {
    // Get products with optional filters
    async getProducts(filters = {}) {
        // Ensure category is passed as a query parameter
        const params = new URLSearchParams(filters).toString();
        const endpoint = `${API_CONFIG.ENDPOINTS.PRODUCTS}${params ? '?' + params : ''}`;
        return await apiCall(endpoint);
    }

    // Get categories for navigation
    async getCategories() {
        return await apiCall(API_CONFIG.ENDPOINTS.CATEGORIES);
    }

    // Get site stats (for About page)
    async getClientStats() {
        return await apiCall(`${API_CONFIG.ENDPOINTS.CLIENTS}/stats`);
    }

    // Helper to get image URL
    getImageUrl(path) {
        return getImageUrl(path);
    }
}

export default new ApiService();