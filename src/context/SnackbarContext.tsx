// src/context/SnackbarContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { SnackbarContextType, SnackbarType } from '../types';

/**
 * Snackbar Context
 * Manages the global state for displaying snackbar messages
 */
const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

interface SnackbarProviderProps {
  children: ReactNode;
}

/**
 * Snackbar Provider Component
 * Provides snackbar functionality to the entire app
 */
export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [type, setType] = useState<SnackbarType>('info');

  /**
   * Show a snackbar message
   * @param {string} text - Message to display
   * @param {SnackbarType} messageType - Type of message (info, success, error)
   * @param {number} duration - Duration in milliseconds
   */
  const showSnackbar = (
    text: string, 
    messageType: SnackbarType = 'info', 
    duration: number = 3000
  ): void => {
    setMessage(text);
    setType(messageType);
    setIsVisible(true);

    // Hide after duration
    setTimeout(() => {
      setIsVisible(false);
    }, duration);
  };

  /**
   * Hide the snackbar
   */
  const hideSnackbar = (): void => {
    setIsVisible(false);
  };

  return (
    <SnackbarContext.Provider value={{ isVisible, message, type, showSnackbar, hideSnackbar }}>
      {children}
    </SnackbarContext.Provider>
  );
};

/**
 * Custom hook to use the snackbar context
 * @returns {SnackbarContextType} Snackbar context value
 */
export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

export default SnackbarContext;