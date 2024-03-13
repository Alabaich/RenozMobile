import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/navigation/bottomTabNavigator';
import LoginScreen from './src/pages/LoginScreen';
import { UserProvider, useUser } from './src/UserContext';
import { CartProvider } from './src/CartContext';

// Create a new component that will determine which screen to show
const AuthSwitch = () => {
  const { isLoggedIn } = useUser(); // Use the hook inside this component

  // Based on the isLoggedIn state, decide what to render
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
});

export default App;
