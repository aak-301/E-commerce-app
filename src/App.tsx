// src/App.tsx
import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';
import {CartProvider} from './context/CartContext';
import {SnackbarProvider} from './context/SnackbarContext';
import Snackbar from './components/SnackBar';

/**
 * Main App Component
 * Root component that sets up providers and navigation
 */
const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <SnackbarProvider>
        <CartProvider>
          <StatusBar backgroundColor="#1565C0" barStyle="light-content" />
          <AppNavigator />
          <Snackbar />
        </CartProvider>
      </SnackbarProvider>
    </SafeAreaProvider>
  );
};

export default App;
