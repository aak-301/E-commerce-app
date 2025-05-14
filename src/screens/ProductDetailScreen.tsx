// src/screens/ProductDetailScreen.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useCart} from '../context/CartContext';
import {RootStackParamList} from '../types';
import {formatCurrency} from '../utils/formatCurrency';

type ProductDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProductDetail'
>;
type ProductDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductDetail'
>;

interface ProductDetailScreenProps {
  route: ProductDetailScreenRouteProp;
  navigation: ProductDetailScreenNavigationProp;
}

/**
 * Product Detail Screen
 * Displays detailed information about a product
 */
const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const {product} = route.params;
  const {addToCart} = useCart();
  const insets = useSafeAreaInsets();

  /**
   * Render star rating
   * @param {number} rate - Rating value (0-5)
   * @returns {string} Star representation of rating
   */
  const renderRating = (rate: number): string => {
    const fullStars = Math.floor(rate);
    const halfStar = rate - fullStars >= 0.5;

    let stars = '★'.repeat(fullStars);
    if (halfStar) stars += '✭';
    const emptyStars = 5 - stars.length;
    if (emptyStars > 0) stars += '☆'.repeat(emptyStars);

    return stars;
  };

  /**
   * Handle add to cart button press
   */
  const handleAddToCart = (): void => {
    addToCart(product);
    navigation.navigate('Cart');
  };

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          {paddingBottom: 80 + insets.bottom}, // Add bottom inset to padding
        ]}>
        <Image
          source={{uri: product.image}}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{product.title}</Text>

          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>
              {renderRating(product.rating?.rate || 0)}
            </Text>
            <Text style={styles.ratingCount}>
              ({product.rating?.count || 0} reviews)
            </Text>
          </View>

          <Text style={styles.price}>{formatCurrency(product.price)}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.divider} />

          <View style={styles.categoryContainer}>
            <Text style={styles.categoryLabel}>Category:</Text>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{product.category}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          {paddingBottom: Math.max(16, insets.bottom)}, // Ensure footer has enough bottom padding
        ]}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    paddingBottom: 80, // Space for footer
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#f9f9f9',
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rating: {
    color: '#FFB400',
    fontSize: 16,
    marginRight: 8,
  },
  ratingCount: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A73E8',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  categoryLabel: {
    fontSize: 16,
    color: '#555',
    marginRight: 8,
  },
  categoryBadge: {
    backgroundColor: '#E3F2FD',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  categoryText: {
    color: '#1A73E8',
    fontSize: 14,
    fontWeight: '500',
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
  },
  addToCartButton: {
    backgroundColor: '#1A73E8',
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProductDetailScreen;
