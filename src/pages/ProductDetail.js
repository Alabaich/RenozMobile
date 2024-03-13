import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, Button } from 'react-native';
import client from '../components/shopifyInitialisation';
import defaultImage from "../images/defaultImage.png";
import { useCart } from '../CartContext'; // Make sure to import useCart

const ProductDetail = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart(); // Use the useCart hook

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
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

  const handleAddToCart = () => {
    if(product.variants?.length > 0) {
      const variantId = product.variants[0].id; // Using the first variant for simplicity
      addToCart(variantId, 1); // Assuming we are adding 1 quantity
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={imageSrc} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.vendor}>{product.vendor}</Text>
        {/* Additional product details */}
        <Button title="Add to Cart" onPress={handleAddToCart} />
      </View>
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
    height: 300,
  },
  infoContainer: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  vendor: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 15,
  },
  // Add styles for your button if needed
});

export default ProductDetail;
