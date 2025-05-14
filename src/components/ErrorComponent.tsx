// src/components/ErrorComponent.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

interface ErrorComponentProps {
  message?: string;
  onRetry?: () => void;
  style?: ViewStyle;
}

/**
 * Error Component
 * Displays an error message with a retry option
 */
const ErrorComponent: React.FC<ErrorComponentProps> = ({ 
  message = 'Something went wrong', 
  onRetry, 
  style 
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.errorText}>{message}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#F44336',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#1A73E8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ErrorComponent;