// src/components/SnackBar.tsx
import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSnackbar} from '../context/SnackbarContext';
import {SnackbarType} from '../types';

/**
 * Snackbar Component
 * Displays temporary messages at the bottom of the screen
 */
const Snackbar: React.FC = () => {
  const {isVisible, message, type, hideSnackbar} = useSnackbar();
  const translateY = useRef(new Animated.Value(100)).current;
  const insets = useSafeAreaInsets();

  // Animation when visibility changes
  useEffect(() => {
    if (isVisible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, translateY]);

  /**
   * Get background color based on message type
   * @returns {string} Background color
   */
  const getBackgroundColor = (): string => {
    switch (type) {
      case 'success':
        return '#4CAF50';
      case 'error':
        return '#F44336';
      case 'info':
      default:
        return '#2196F3';
    }
  };

  if (!isVisible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          transform: [{translateY}],
          bottom: 20 + insets.bottom, // Account for bottom safe area
        },
      ]}>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity onPress={hideSnackbar} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>×</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#333',
    borderRadius: 4,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  message: {
    color: 'white',
    flex: 1,
    fontSize: 14,
  },
  closeButton: {
    marginLeft: 8,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Snackbar;
