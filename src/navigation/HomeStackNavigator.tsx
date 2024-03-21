// HomeStackNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../pages/HomeScreen';
import HomeHeader from '../headers/HomeHeader';
import CategoriesScreen from '../pages/CategoriesScreen';
import CollectionsListScreen from '../components/collectionListScreen';
import CollectionProductsScreen from '../components/CollectionProductsScreen';
import ProductDetail from '../pages/ProductDetail';
import CollectionProductsHeader from '../headers/CollectionHeader';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import ProductDetailHeader from '../headers/ProductDetailHeader';

const HomeStack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({ // This function provides you with the navigation prop
          header: () => <HomeHeader navigation={navigation} />, // Now you can pass it to HomeHeader
        })}
      />

      <HomeStack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{ /* options for CategoriesScreen */ }}
      />

      <HomeStack.Screen
        name="Collections"
        component={CollectionsListScreen}
        options={{ /* options for CategoriesScreen */ }}
      />

<HomeStack.Screen
  name="CollectionProducts"
  component={CollectionProductsScreen}
  options={({ route, navigation }) => {

    const typedRoute = route as RouteProp<RootStackParamList, 'CollectionProducts'>;
    return {
      header: () => (
        <CollectionProductsHeader
          navigation={navigation}
          route={typedRoute} // Use the asserted route
        />
      ),
    };
  }}
/>

<HomeStack.Screen
  name="ProductDetail"
  component={ProductDetail}
  options={({ navigation }) => ({ // This function provides you with the navigation prop
    headerTransparent: true,
    header: () => <ProductDetailHeader navigation={navigation} />, // Now you can pass it to HomeHeader
  })}
/>

    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
