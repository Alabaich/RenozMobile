import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Button, Dimensions, Image, TouchableOpacity } from 'react-native';
import client from '../components/shopifyInitialisation'; // Ensure this path is correct
import Carousel from 'react-native-snap-carousel';
import defaultImage from "../images/defaultImage.png";
import { useCart } from '../CartContext'; // Make sure to import useCart
import { PanResponder } from 'react-native';
import closeIcon from "../icons/close.png"; 
import Modal from 'react-native-modal';


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ProductDetail = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { addToCart } = useCart();

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


  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => { setSelectedImageIndex(index); setModalVisible(true); }}>
        <Image
          source={{ uri: item.src }}
          style={styles.image}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleAddToCart = () => {
    if (product.variants?.length > 0) {
      const variantId = product.variants[0].id;
      addToCart(variantId, 1);
    }
  };

  if (!product) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <ScrollView style={styles.container}>
      <Carousel
        data={product.images.length > 0 ? product.images : [{ src: defaultImage }]}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        loop={true}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.vendor}>{product.vendor}</Text>
        <Button title="Add to Cart" onPress={handleAddToCart} />
      </View>
        
      <Modal
  isVisible={modalVisible}
  onSwipeComplete={() => setModalVisible(false)}
  swipeDirection={['down']}
  style={styles.modal}
  onBackdropPress={() => setModalVisible(false)}
  onBackButtonPress={() => setModalVisible(false)}
>
<View style={styles.modalContent}>
    <Carousel
      data={product.images}
      renderItem={renderItem}
      sliderWidth={screenWidth}
      itemWidth={screenWidth}
      firstItem={selectedImageIndex}
      style={styles.carousel}
    />
    <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
      <Image source={closeIcon} style={styles.closeButtonIcon} />
    </TouchableOpacity>
  </View>
</Modal>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: screenWidth,
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
  fullScreenImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  fullScreenImage: {
    width: screenWidth,
    height: screenHeight,
  },
  // Additional styles as needed
  closeButton: {
    position: "absolute",
    top: 45,
    right: 20,
    zIndex: 10,
  },
  closeButtonIcon: {
    width: 35, 
    height: 35,
  }, 
  modal: {
    margin: 0, 
    justifyContent: 'flex-end', 
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: "absolute",
    top: 45,
    right: 20,
    zIndex: 10,
  },
  closeButtonIcon: {
    width: 35,
    height: 35,
  },
  carousel: {
    borderWidth: 1, 
    borderColor: 'red',
    flex: 1, 
  },
});

export default ProductDetail;
