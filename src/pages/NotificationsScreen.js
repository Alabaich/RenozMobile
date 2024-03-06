// In ./src/pages/HomeScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';
import AllProductsComponent from '../components/shopifyInitialisation';

export const NotificationsScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', background: "#fff", }}>
    <AllProductsComponent />
  </View>
);

// Do the same for the other screens: SearchScreen, NotificationsScreen, ProfileScreen, CartScreen
