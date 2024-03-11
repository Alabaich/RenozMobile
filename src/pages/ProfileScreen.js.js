import React from 'react';
import { View, Text } from 'react-native';
import { useUser } from '../UserContext';

export const ProfileScreen = () => {
  const { user } = useUser(); // Access the user information from context

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {user ? (
        <>
          <Text>Name: {user.firstName} {user.lastName}</Text>
          <Text>Email: {user.email}</Text>
        </>
      ) : (
        <Text>Please login to see this information.</Text>
      )}
    </View>
  );
};
