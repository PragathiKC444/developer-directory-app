import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
};

// Developer APIs
export const developerAPI = {
  getAll: (params) => api.get('/developers', { params }),
  getById: (id) => api.get(`/developers/${id}`),
  create: (data) => api.post('/developers', data),
  update: (id, data) => api.put(`/developers/${id}`, data),
  delete: (id) => api.delete(`/developers/${id}`),
  getAnalytics: () => api.get('/developers/analytics'),
};

export default api;
