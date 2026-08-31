import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 30000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const quizApi = {
  generate: async (payload) => (await api.post('/quiz/generate', payload)).data,
  getOne: async (quizId) => (await api.get(`/quiz/${encodeURIComponent(quizId)}`)).data,
  submit: async (quizId, payload) => (await api.post(`/quiz/${encodeURIComponent(quizId)}/submit`, payload)).data,
  performance: async (params = {}) => (await api.get('/quiz/performance', { params })).data,
};

export default api;
