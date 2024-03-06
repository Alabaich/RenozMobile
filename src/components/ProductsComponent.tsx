// ProductsComponent.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import client from './shopifyClient';

type Product = {
  id: string;
  title: string;
  handle: string;
};

const ProductsComponent: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      // Query to fetch the first 10 products
      const productsQuery = `
        {
          products(first: 10) {
            edges {
              node {
                id
                title
                handle
              }
            }
          }
        }
      `;
      try {
        const { data } = await client.request(productsQuery);
        if (data.products.edges.length) {
          // Map through the edges to get the product node
          setProducts(data.products.edges.map(({ node }: { node: Product }) => node));
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (products.length === 0) {
    return <Text>No products found</Text>;
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ padding: 10 }}>
          <Text>{item.title}</Text>
        </View>
      )}
    />
  );
};

export default ProductsComponent;
