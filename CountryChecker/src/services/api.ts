import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://jsonrest-7d8bc7a.onwireway.online',
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('@access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Token attached:', token);
      } else {
        console.log('No token found.');
      }
      return config;
    } catch (err) {
      console.error('Token read error:', err);
      return config; 
    }
  },
  (error) => Promise.reject(error)
);

export default api;
