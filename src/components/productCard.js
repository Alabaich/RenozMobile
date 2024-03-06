import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ProductCard = ({ product, onPress }) => {
  const imageUri = product.images[0].src; // Using optional chaining to avoid errors if images[0] is undefined
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text>${product.variants[0].price.amount}</Text>
    </TouchableOpacity>
  );
};

// Add your styles for the card here
const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'column',
    width: "50%",
    margin: 8
  },
  image: {
    width: "100%", 
    height: 150
  },
  title: {
    // Define your styles for the title
  },
  price: {
    // Define your styles for the price
  },
});

export default ProductCard;
