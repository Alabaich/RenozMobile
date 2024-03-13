// HomeScreen.tsx
import React from 'react';
import { ScrollView, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types'; // Adjust the import path as necessary
import CollectionImage from '../components/collectionImage';
import CollectionSlider from '../components/CollectionsSlider';
import ProductsSlider from '../components/productsSlider';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container} >
      <CollectionSlider navigation={navigation}
        collectionsList="main_sale, plumbing" />
      {/* <Button
        title="Go to Products"
        onPress={() => navigation.navigate('Collections')}
      /> 
      <CollectionImage collectionName="main_sale" navigation={navigation} />
      */}
      <ProductsSlider collectionName="main_sale" navigation={navigation} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "auto",
  },
});

export default HomeScreen;
