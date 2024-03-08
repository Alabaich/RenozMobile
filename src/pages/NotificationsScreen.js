// In ./src/pages/HomeScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';
import AllProductsComponent from '../components/shopifyInitialisation';
import LoginScreen from './LoginScreen';

export const NotificationsScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', background: "#fff", }}>
    <Text>Notifications Screen </Text>
    <LoginScreen />
  </View>

);

// Do the same for the other screens: SearchScreen, NotificationsScreen, ProfileScreen, CartScreen
