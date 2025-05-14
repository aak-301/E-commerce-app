// src/screens/CartScreen.tsx
import React, { JSX } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';
import {useCart} from '../context/CartContext';
import {useSnackbar} from '../context/SnackbarContext';
import CartItem from '../components/CartItem';
import {formatCurrency} from '../utils/formatCurrency';
import {CartItem as CartItemType, RootStackParamList} from '../types';

type CartScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Cart'>;

interface CartScreenProps {
  navigation: CartScreenNavigationProp;
}

/**
 * Cart Screen
 * Displays items in the cart and total amount
 */
const CartScreen: React.FC<CartScreenProps> = ({navigation}) => {
  const {items, totalAmount, clearCart} = useCart();
  const {showSnackbar} = useSnackbar();
  const insets = useSafeAreaInsets();

  /**
   * Handle checkout button press
   */
  const handleCheckout = (): void => {
    // In a real app, this would navigate to a checkout screen or process
    showSnackbar('Checkout functionality would be implemented here', 'info');
  };

  /**
   * Render a cart item
   */
  const renderItem: ListRenderItem<CartItemType> = ({item}) => (
    <CartItem item={item} />
  );

  /**
   * Render empty cart message
   * @returns {JSX.Element} Empty cart view
   */
  const renderEmptyCart = (): JSX.Element => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Your cart is empty</Text>
      <TouchableOpacity
        style={styles.continueShoppingButton}
        onPress={() => navigation.navigate('ProductList')}>
        <Text style={styles.continueShoppingButtonText}>Continue Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      {items.length > 0 ? (
        <>
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={[
              styles.listContent,
              {paddingBottom: 150 + insets.bottom}, // Add bottom inset padding
            ]}
          />

          <View
            style={[
              styles.footer,
              {paddingBottom: Math.max(16, insets.bottom)}, // Ensure footer has enough bottom padding
            ]}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalAmount}>
                {formatCurrency(totalAmount)}
              </Text>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
                <Text style={styles.clearButtonText}>Clear Cart</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={handleCheckout}>
                <Text style={styles.checkoutButtonText}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        renderEmptyCart()
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  listContent: {
    padding: 16,
    paddingBottom: 150, // Space for footer
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  continueShoppingButton: {
    backgroundColor: '#1A73E8',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  continueShoppingButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A73E8',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    borderRadius: 4,
    marginRight: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  checkoutButton: {
    flex: 2,
    backgroundColor: '#1A73E8',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CartScreen;
