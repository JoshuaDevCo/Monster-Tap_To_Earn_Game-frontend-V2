import axios from 'axios';
const api = axios.create({
    baseURL: `https://109.237.99.151:5000/api`,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  export default api;