// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useCart } from '../context/CartContext';
import { RootStackParamList } from '../types';

// Import screens
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';

// Create stack navigator
const Stack = createStackNavigator<RootStackParamList>();

/**
 * Main Navigation Component
 * Sets up the navigation structure for the app
 */
const AppNavigator: React.FC = () => {
  const { totalItems } = useCart();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ProductList"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1A73E8',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      >
        <Stack.Screen
          name="ProductList"
          component={ProductListScreen}
          options={({ navigation }) => ({
            title: 'Mini E-Commerce',
            headerRight: () => (
              <TouchableOpacity
                style={styles.cartButton}
                onPress={() => navigation.navigate('Cart')}
              >
                <Text style={styles.cartButtonText}>🛒</Text>
                {totalItems > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{totalItems}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={({ navigation }) => ({
            title: 'Product Details',
            headerRight: () => (
              <TouchableOpacity
                style={styles.cartButton}
                onPress={() => navigation.navigate('Cart')}
              >
                <Text style={styles.cartButtonText}>🛒</Text>
                {totalItems > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{totalItems}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{
            title: 'Shopping Cart',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  cartButton: {
    marginRight: 15,
    position: 'relative',
  },
  cartButtonText: {
    fontSize: 22,
    color: 'white',
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: '#FF5252',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default AppNavigator;