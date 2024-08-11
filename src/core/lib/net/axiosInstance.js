import axios from 'axios';
import { getBaseUrlFromEnv } from '@/src/core/utils/getBaseUrlFromEnv.js';

export const defaultAxiosInstance = axios.create({
  baseURL: getBaseUrlFromEnv(),
  headers: {
    'Content-Type': 'application/json',
  },
});

export const countriesAxiosInstance = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
});

export default defaultAxiosInstance;
