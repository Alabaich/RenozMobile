// ProductsComponent.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import client from './shopifyClient';


type Product = {
    id: string;
    title: string;
    // ... add other product properties you expect to receive
  };


  const ProductsComponent: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          // Use the correct method to fetch products from Shopify
          // This code assumes there is a method to fetch all products. You will need to
          // check the actual documentation or package to see how to perform this action.
          const productsData = await client.products.fetchAll();
          setProducts(productsData);
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
  
    return (
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    );
  };
  
  export default ProductsComponent;