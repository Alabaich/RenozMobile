import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, ActivityIndicator, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/navigation/bottomTabNavigator';
import LoginScreen from './src/pages/LoginScreen';
import { UserProvider, useUser } from './src/UserContext';
import { CartProvider } from './src/CartContext';
import LinearGradient from 'react-native-linear-gradient';
import logoWhite from "./src/images/logoWhite.png";



// Create a new component that will determine which screen to show
const AuthSwitch = () => {
  const { isLoggedIn, isLoading } = useUser();

  if (isLoading) {
    return (
      <LinearGradient
        colors={['#535353', '#000']}
        start={{x: 0, y: 0}} end={{x: 1, y: 1}}
        style={styles.loadingContainer}
      >
        <ActivityIndicator size="large" color="#FFF" />
        <Image source={logoWhite} style={styles.logo} /> 
        <Text style={styles.loadSceenText} >Everything For Your Renovation</Text>
      </LinearGradient>
    );
  }

  return isLoggedIn ? <BottomTabNavigator /> : <LoginScreen />;
};

const App = () => {
  return (
    <UserProvider>
      <CartProvider>
        <SafeAreaView style={styles.container}>
          <NavigationContainer>
            <AuthSwitch />
          </NavigationContainer>
        </SafeAreaView>
      </CartProvider>
    </UserProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  topBarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  bottomBar: {
    padding: 15,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  button: {
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // No need to set background color here since we're using LinearGradient
  },
  logo: {
    width: 100, // Adjust the size as needed
    height: 20, // Adjust the size as needed
    marginBottom: 20, // Adjust spacing as needed
    objectFit: "contain",
    marginTop: 25
  },
  loadSceenText: {
    fontSize: 18,
    fontWeight: "300",
    color: "#fff",
  }
});

export default App;
