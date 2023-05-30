import Axios from 'axios'
const axiosInstance  = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
})
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken'); // Retrieve the access token from localStorage
  
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  
    return config;
  });
  export default axiosInstance;

