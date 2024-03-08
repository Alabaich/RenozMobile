import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import client from '../components/shopifyInitialisation';
import defaultImage from "../images/defaultImage.png"

const ProductDetail = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Using the correct function according to the documentation
        const productDetails = await client.product.fetch(productId);
        setProduct(productDetails);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (!product) {
    return <ActivityIndicator size="large" />;
  }

  const imageSrc = product.images?.[0]?.src ? { uri: product.images[0].src } : defaultImage;



  return (
    <ScrollView style={styles.container}>
      <Image source={imageSrc} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.vendor}>{product.vendor}</Text> 
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300, // You can adjust the height as needed
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 15,
  },
  vendor: {
    fontSize: 14,
    color: 'gray',
    margin: 15,
  },
});

export default ProductDetail;
