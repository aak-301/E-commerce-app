// src/components/ProductCard.tsx
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {formatCurrency} from '../utils/formatCurrency';
import {Product} from '../types';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
}

/**
 * ProductCard Component
 * Displays a product card in a grid
 */
const ProductCard: React.FC<ProductCardProps> = ({product, onPress}) => {
  if (!product) return null;

  const {title, price, image, rating} = product;

  /**
   * Render the star rating
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

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(product)}>
      <Image source={{uri: image}} style={styles.image} resizeMode="contain" />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.price}>{formatCurrency(price)}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{renderRating(rating?.rate || 0)}</Text>
          <Text style={styles.ratingCount}>({rating?.count || 0})</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    margin: 8,
    flex: 1,
    maxWidth: '45%', // For 2 columns
  },
  image: {
    height: 150,
    width: '100%',
    backgroundColor: '#f9f9f9',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
    height: 40, // Fixed height for title
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A73E8',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    color: '#FFB400',
    marginRight: 4,
    fontSize: 14,
  },
  ratingCount: {
    fontSize: 12,
    color: '#666',
  },
});

export default ProductCard;
