// src/screens/ProductListScreen.tsx
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  ListRenderItem,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSnackbar} from '../context/SnackbarContext';
import {productsApi} from '../api/productsApi';
import ProductCard from '../components/ProductCard';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorComponent from '../components/ErrorComponent';
import {Product, RootStackParamList} from '../types';
import {StackNavigationProp} from '@react-navigation/stack';

type ProductListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductList'
>;

interface ProductListScreenProps {
  navigation: ProductListScreenNavigationProp;
}

/**
 * Product List Screen
 * Displays a grid of products
 */
const ProductListScreen: React.FC<ProductListScreenProps> = ({navigation}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const {showSnackbar} = useSnackbar();

  /**
   * Fetch products from API
   */
  const fetchProducts = useCallback(async (): Promise<void> => {
    try {
      setError(null);
      const response = await productsApi.getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please try again.');
      showSnackbar('Failed to load products', 'error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [showSnackbar]);

  // Load products on initial mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  /**
   * Pull-to-refresh handler
   */
  const handleRefresh = useCallback((): void => {
    setRefreshing(true);
    fetchProducts();
  }, [fetchProducts]);

  /**
   * Navigate to product detail screen
   * @param {Product} product - Selected product
   */
  const handleProductPress = (product: Product): void => {
    navigation.navigate('ProductDetail', {product});
  };

  /**
   * Render a product item
   */
  const renderItem: ListRenderItem<Product> = ({item}) => (
    <ProductCard product={item} onPress={handleProductPress} />
  );

  // Loading state
  if (loading) {
    return <LoadingIndicator text="Loading products..." />;
  }

  // Error state
  if (error) {
    return <ErrorComponent message={error} onRetry={fetchProducts} />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  list: {
    padding: 8,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default ProductListScreen;
