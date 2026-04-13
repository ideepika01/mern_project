import lib from 'axios';

const axios = lib.create({ baseURL: 'http://localhost:5001/api' });

axios.interceptors.request.use((req) => {
  const profile = localStorage.getItem('profile');
  if (profile) {
    try {
      const { token } = JSON.parse(profile);
      if (token) req.headers.Authorization = `Bearer ${token}`;
    } catch (e) {
      console.error('Error parsing profile from localStorage', e);
    }
  }
  return req;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('profile');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axios;



