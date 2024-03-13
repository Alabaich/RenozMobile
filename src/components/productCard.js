import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import defaultImage from '../images/defaultImage.png'

const ProductCard = ({ product, onPress, customCardStyle  }) => {
  const imageSrc = product.images?.[0]?.src ? { uri: product.images[0].src } : defaultImage;

  const truncateTitle = (title) => {
    const wordLimit = 5;
    const wordsArray = title.split(' ');
    if (wordsArray.length > wordLimit) {
      return wordsArray.slice(0, wordLimit).join(' ') + '...';
    }
    return title;
  };

  return (
    <TouchableOpacity onPress={() => onPress(product)} style={[styles.cardContainer, customCardStyle]}>
      <Image source={imageSrc} style={styles.image} />
      <Text style={styles.title}>{truncateTitle(product.title)}</Text>
      <Text style={styles.vendor}>{product.vendor}</Text> 
      <Text style={styles.price}>${product.variants[0].price.amount}</Text>
    </TouchableOpacity>
  );
};

// Add your styles for the card here
const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'column',
    width: "50%",
    margin: 8,
    padding: 10,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: '#fff', // Set the background color to white
  
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
  
    // Elevation for Android
    elevation: 2,
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

  vendor: {
    // Style for vendor text
    fontSize: 14,
    color: 'gray',
  },
});

export default React.memo(ProductCard);

