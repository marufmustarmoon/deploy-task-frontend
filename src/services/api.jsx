import axios from 'axios';

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: 'https://deployem-of-task-management.onrender.com/api', // Update with your API base URL
});

// Request interceptor to add authentication token to headers
api.interceptors.request.use(
  (config) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    if (userInfo && userInfo.token) {
      config.headers['Authorization'] = `Bearer ${userInfo.token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle error responses here
    if (error.response) {
      // Server responded with a status code that falls out of the range of 2xx
      console.error('API Error:', error.response.data.message);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
