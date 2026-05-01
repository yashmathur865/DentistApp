import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request interceptor — attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('dentist_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle errors globally
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message || error.message || 'Something went wrong';

    // Auto-logout on 401
    if (error.response?.status === 401) {
      localStorage.removeItem('dentist_token');
      // Only redirect if on admin page
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }

    return Promise.reject({ message, status: error.response?.status });
  }
);

// ---- Auth API ----
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/me'),
};

// ---- Doctor API ----
export const doctorAPI = {
  getProfile: () => api.get('/doctors/profile'),
};

// ---- Service API ----
export const serviceAPI = {
  getAll: () => api.get('/services'),
  getById: (id) => api.get(`/services/${id}`),
};

// ---- Appointment API ----
export const appointmentAPI = {
  getSlots: (date) => api.get(`/appointments/slots/${date}`),
  book: (data) => api.post('/appointments', data),
  getAll: (params) => api.get('/appointments', { params }),
  getToday: () => api.get('/appointments/today'),
  getStats: () => api.get('/appointments/stats'),
  updateStatus: (id, data) => api.patch(`/appointments/${id}/status`, data),
};

// ---- Testimonial API ----
export const testimonialAPI = {
  getVisible: () => api.get('/testimonials'),
  add: (data) => api.post('/testimonials', data),
};

// ---- Gallery API ----
export const galleryAPI = {
  getVisible: () => api.get('/gallery'),
};

export default api;
