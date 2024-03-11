// In ./src/pages/HomeScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';
import LoginScreen from './LoginScreen';

export const NotificationsScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', background: "#fff", }}>
    <Text>Notifications Screen </Text>
    <LoginScreen />
  </View>

);

