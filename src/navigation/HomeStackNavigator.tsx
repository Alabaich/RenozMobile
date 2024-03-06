// HomeStackNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../pages/HomeScreen';
import HomeHeader from '../headers/HomeHeader';
import CategoriesScreen from '../pages/CategoriesScreen';
import ProductsComponent from '../components/ProductsComponent';

// Import any other screens you might want to navigate to from the Home tab
// import DetailsScreen from '../pages/DetailsScreen';
// ...

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
        name="Products"
        component={ProductsComponent}
        options={{  }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
