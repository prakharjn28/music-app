import axios from 'axios';

// Create an Axios instance with custom configuration
const axiosInstance = axios.create({
  baseURL: 'https://itunes.apple.com',
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers needed for authentication or other purposes
  },
});

export default axiosInstance;