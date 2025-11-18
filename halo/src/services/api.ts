import axios from 'axios';
import { Platform } from 'react-native';

const baseURL = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

export const api = axios.create({
  baseURL,
  timeout: 10000,
});

export const setAuthToken = (token?: string) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};
