// In ./src/screens/LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login, fetchCustomerInfo } from '../components/shopifyAuthService'; // Ensure this path is correct

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const storeCustomerInfo = async (customerInfo) => {
    try {
      const jsonValue = JSON.stringify(customerInfo);
      await AsyncStorage.setItem('@customerInfo', jsonValue);
    } catch (e) {
      console.error('Saving customer info failed', e);
    }
  };

  const handleLoginPress = async () => {
    setIsLoading(true);
    try {
      const response = await login(email, password);
      if (response.success) {
        const customerInfo = await fetchCustomerInfo(response.accessToken);
        let welcomeMessage = 'Welcome back!';
  
        if (customerInfo) {
          welcomeMessage = `Welcome back, ${customerInfo.firstName || ''} ${customerInfo.lastName || ''}!`.trim();
          await storeCustomerInfo(customerInfo);
        } else {
          welcomeMessage = `Welcome back, ${email}!`;
        }
        Alert.alert('Login Successful', welcomeMessage);
        navigation.navigate('Profile'); // Update with your profile screen's route name
      } else {
        // Handle login errors
        const errorMessages = response.errors.map(error => error.message).join('\n');
        Alert.alert('Login Failed', errorMessages);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during the login process.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLoginPress} disabled={isLoading} />
      {isLoading && <ActivityIndicator />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
});

export default LoginScreen;
