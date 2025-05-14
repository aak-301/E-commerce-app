// src/api/productsApi.ts
import { AxiosResponse } from 'axios';
import apiClient from './apiClient';
import { Product } from '../types';

/**
 * Products API module
 * Contains all API calls related to products
 */
export const productsApi = {
  /**
   * Get all products
   * @returns {Promise<AxiosResponse<Product[]>>} Promise object with product data
   */
  getAllProducts: (): Promise<AxiosResponse<Product[]>> => {
    return apiClient.get<Product[]>('/products');
  },

  /**
   * Get a single product by ID
   * @param {number} id - Product ID
   * @returns {Promise<AxiosResponse<Product>>} Promise object with product data
   */
  getProductById: (id: number): Promise<AxiosResponse<Product>> => {
    return apiClient.get<Product>(`/products/${id}`);
  },

  /**
   * Get products by category
   * @param {string} category - Product category
   * @returns {Promise<AxiosResponse<Product[]>>} Promise object with filtered products
   */
  getProductsByCategory: (category: string): Promise<AxiosResponse<Product[]>> => {
    return apiClient.get<Product[]>(`/products/category/${category}`);
  },

  /**
   * Get all product categories
   * @returns {Promise<AxiosResponse<string[]>>} Promise object with categories
   */
  getCategories: (): Promise<AxiosResponse<string[]>> => {
    return apiClient.get<string[]>('/products/categories');
  }
};

export default productsApi;