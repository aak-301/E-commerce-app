// src/api/apiClient.ts
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { ApiError } from '../types';

/**
 * ErrorResponse interface to define expected error response structure
 */
interface ErrorResponse {
  message?: string;
  [key: string]: any;
}

/**
 * Base API client for making HTTP requests
 * Configures axios with default settings and interceptors for request/response
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor for API calls
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    // config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // You can transform response data here if needed
    return response;
  },
  (error: AxiosError<ErrorResponse>) => {
    // Handle common API errors here
    const customError: ApiError = {
      message: error.response?.data?.message || 'Something went wrong',
      status: error.response?.status || 500,
      data: error.response?.data || {},
    };
    return Promise.reject(customError);
  }
);

export default apiClient;