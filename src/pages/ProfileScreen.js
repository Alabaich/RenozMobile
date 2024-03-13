import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useUser } from '../UserContext'; // Adjust the path as necessary
import AsyncStorage from '@react-native-async-storage/async-storage'; // Make sure this is imported

export const ProfileScreen = () => {
  const { user, logoutUser } = useUser();

  const handleLogout = async () => {
    // Optionally clear the stored token
    await AsyncStorage.removeItem('userToken');
    logoutUser();
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.userInfo}>Name: {user.firstName} {user.lastName}</Text>
          <Text style={styles.userInfo}>Email: {user.email}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </>
      ) : (
        <Text>Please login to see this information.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ProfileScreen;
