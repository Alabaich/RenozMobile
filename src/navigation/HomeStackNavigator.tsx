// HomeStackNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../pages/HomeScreen';
import { CategoriesScreen } from '../pages/CategoriesScreen';
import HomeHeader from '../headers/HomeHeader';

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
<Stack.Screen
  name="Home"
  component={HomeScreen}
  options={({ navigation }) => ({
    header: () => <HomeHeader navigation={navigation} />,
    // Other options...
  })}
/>
      {/* Add other screens you want to navigate to from Home here */}
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        // You can specify options for this screen if needed
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
