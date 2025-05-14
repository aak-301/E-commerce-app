// src/utils/asyncStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Utility functions for AsyncStorage operations
 */
export const storage = {
  /**
   * Store data in AsyncStorage
   * @param {string} key - Storage key
   * @param {any} value - Value to store (will be stringified)
   * @returns {Promise<boolean>} Success indicator
   */
  set: async (key: string, value: any): Promise<boolean> => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('AsyncStorage Error: ', error);
      return false;
    }
  },

  /**
   * Get data from AsyncStorage
   * @param {string} key - Storage key
   * @returns {Promise<T | null>} Promise with parsed value or null
   */
  get: async <T>(key: string): Promise<T | null> => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) as T : null;
    } catch (error) {
      console.error('AsyncStorage Error: ', error);
      return null;
    }
  },

  /**
   * Remove data from AsyncStorage
   * @param {string} key - Storage key
   * @returns {Promise<boolean>} Success indicator
   */
  remove: async (key: string): Promise<boolean> => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('AsyncStorage Error: ', error);
      return false;
    }
  },

  /**
   * Clear all data from AsyncStorage
   * @returns {Promise<boolean>} Success indicator
   */
  clear: async (): Promise<boolean> => {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('AsyncStorage Error: ', error);
      return false;
    }
  }
};

export default storage;