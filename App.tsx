// App.tsx
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/navigation/bottomTabNavigator';
import { UserProvider } from './src/UserContext';

const App = () => {
  return (
    <UserProvider>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <BottomTabNavigator />
        </NavigationContainer>
      </SafeAreaView>
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
