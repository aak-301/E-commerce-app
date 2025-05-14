// src/components/CartItem.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { formatCurrency } from '../utils/formatCurrency';
import { useCart } from '../context/CartContext';
import { CartItem as CartItemType } from '../types';

interface CartItemProps {
  item: CartItemType;
}

/**
 * CartItem Component
 * Displays a product in the cart with quantity controls
 */
const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  /**
   * Increase item quantity
   */
  const incrementQuantity = (): void => {
    updateQuantity(item.id, item.quantity + 1);
  };

  /**
   * Decrease item quantity
   */
  const decrementQuantity = (): void => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
      
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.price}>{formatCurrency(item.price)}</Text>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButton} 
            onPress={decrementQuantity}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          
          <Text style={styles.quantity}>{item.quantity}</Text>
          
          <TouchableOpacity 
            style={styles.quantityButton} 
            onPress={incrementQuantity}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
          
          <Text style={styles.itemTotal}>
            {formatCurrency(item.price * item.quantity)}
          </Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => removeFromCart(item.id)}
      >
        <Text style={styles.removeButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  quantity: {
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 12,
    minWidth: 40,
    textAlign: 'center',
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A73E8',
    marginLeft: 'auto',
  },
  removeButton: {
    marginLeft: 8,
  },
  removeButtonText: {
    fontSize: 24,
    color: '#F44336',
    fontWeight: 'bold',
  },
});

export default CartItem;