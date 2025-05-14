// src/components/LoadingIndicator.tsx
import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text, ViewStyle } from 'react-native';

interface LoadingIndicatorProps {
  text?: string;
  color?: string;
  size?: 'small' | 'large';
  style?: ViewStyle;
}

/**
 * Loading Indicator Component
 * Displays a loading spinner with optional text
 */
const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  text = 'Loading...',
  color = '#1A73E8',
  size = 'large',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});

export default LoadingIndicator;