import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Button } from 'react-native';
import Client from 'shopify-buy';
import ProductCard from './productCard';

const client = Client.buildClient({
  domain: 'renozcentre.myshopify.com',
  storefrontAccessToken: '9e2b15437b50c2e5ea05d717f72b129b'
});

const AllProductsComponent = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Start with 0 for the initial page
  const [lastPage, setLastPage] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProducts = (page) => {
    const pageSize = 20; // Set the number of products per page
    client.product.fetchQuery({
      first: pageSize,
      after: page * pageSize, // Calculate the correct 'after' value based on the current page
    }).then((fetchedProducts) => {
      if (fetchedProducts.length > 0) {
        setProducts(prevProducts => [...prevProducts, ...fetchedProducts]);
        setCurrentPage(currentPage + 1);
      } else {
        setLastPage(true);
      }
      setLoading(false);
    }).catch(error => {
      console.error('Failed to fetch products:', error);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, []);

  const handleLoadMore = () => {
    if (!lastPage && !loading) {
      setLoading(true);
      fetchProducts(currentPage);
    }
  };

  return (
    <>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
        numColumns={2}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <Button title="Load More" onPress={handleLoadMore} /> : null}
        style={styles.list}
      />
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    width: '100%',
    padding: 7,
    backgroundColor: '#fff'
  },
});

export default AllProductsComponent;
