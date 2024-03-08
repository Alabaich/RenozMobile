
import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import client from './shopifyInitialisation';
import ProductCard from './productCard';

const keyExtractor = item => item.id.toString();

const CollectionProductsScreen = ({ route, navigation }) => {
  const { collectionId } = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPageProducts, setNextPageProducts] = useState(null);

  useEffect(() => {
    client.collection.fetchWithProducts(collectionId).then((collection) => {
      setProducts(collection.products);
      setNextPageProducts(collection.products);
      setLoading(false);
    }).catch(error => {
      console.error('Error fetching products:', error);
      setLoading(false);
    });
  }, [collectionId]);

  const fetchMoreProducts = () => {
    if (nextPageProducts) {
      setLoading(true);
      client.fetchNextPage(nextPageProducts).then((nextPage) => {
        const newProducts = nextPage.model.filter(newItem => !products.find(existingItem => existingItem.id === newItem.id));
        setProducts(prevProducts => [...prevProducts, ...newProducts]);
        setNextPageProducts(nextPage.model);
        setLoading(false);
      }).catch(error => {
        console.error('Error fetching next page of products:', error);
        setLoading(false);
      });
    }
  };

  const navigateToProductDetail = (productId) => {
    navigation.navigate('ProductDetail', { productId: productId });
  };
  

  const renderItem = useCallback(({ item }) => (
    <ProductCard product={item} onPress={() => navigateToProductDetail(item.id)} />
  ), [navigateToProductDetail]);

  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        numColumns={2} 
        style={styles.flatList}
        onEndReached={fetchMoreProducts}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    
  },
  flatList: {
    backgroundColor: '#fff',
    padding: 7,
  },
});

export default CollectionProductsScreen;
