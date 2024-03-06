
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AllProductsComponent from '../components/shopifyInitialisation';

const CategoriesScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Categories Screen</Text>
      <AllProductsComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Add other styles as needed
});

export default CategoriesScreen;
