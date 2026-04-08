import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5001/api' });

API.interceptors.request.use((req) => {
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

// Added a response interceptor to handle errors globally (optional but helpful)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('profile');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const fetchExplorePosts = () => API.get('/posts/explore');
export const fetchUserProfile = (username) => API.get(`/users/profile/${username}`);
export const fetchConversations = (userId) => API.get(`/messages/conversations/${userId}`);
export const fetchMessages = (userId, otherUserId) => API.get(`/messages/${userId}/${otherUserId}`);
export const sendMessage = (messageData) => API.post('/messages', messageData);
export const likePost = (id) => API.patch(`/posts/${id}/like`);
export const commentPost = (id, comment) => API.post(`/posts/${id}/comment`, { text: comment });
export const deletePost = (id) => API.delete(`/posts/${id}`);

// Stories
export const fetchStories = () => API.get('/stories');
export const createStory = (formData) => API.post('/stories', formData);

// User Profile & Social
export const updateProfile = (formData) => API.put('/users/update', formData);
export const savePost = (postId) => API.patch(`/users/save/${postId}`);
export const searchUsers = (query) => API.get(`/users/search?q=${query}`);
export const followUser = (userId) => API.patch(`/users/follow/${userId}`);

export default API;
