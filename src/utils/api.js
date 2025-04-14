import axios from 'axios';

// Base API configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * QR Code API functions
 */
export const qrCodeAPI = {
  // Track QR code scan (for analytics)
  trackScan: async (qrId, metadata = {}) => {
    try {
      const response = await api.post('/qr/track', {
        qrId,
        timestamp: new Date().toISOString(),
        ...metadata,
      });
      return response.data;
    } catch (error) {
      console.error('Error tracking QR scan:', error);
      throw error;
    }
  },

  // Get analytics for a QR code
  getAnalytics: async (qrId) => {
    try {
      const response = await api.get(`/qr/analytics/${qrId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching QR analytics:', error);
      throw error;
    }
  },

  // Save a QR code to user account
  saveQR: async (qrData) => {
    try {
      const response = await api.post('/qr/save', qrData);
      return response.data;
    } catch (error) {
      console.error('Error saving QR code:', error);
      throw error;
    }
  },

  // Update a dynamic QR code
  updateDynamicQR: async (qrId, newData) => {
    try {
      const response = await api.put(`/qr/dynamic/${qrId}`, newData);
      return response.data;
    } catch (error) {
      console.error('Error updating dynamic QR:', error);
      throw error;
    }
  },
};

/**
 * User API functions
 */
export const userAPI = {
  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      // Store token in localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Register user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  },

  // Get user profile
  getProfile: async () => {
    try {
      const response = await api.get('/user/profile');
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },
};

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
