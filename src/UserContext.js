import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user data from AsyncStorage when the app starts
  useEffect(() => {
    const loadUserData = async () => {
      const userDataString = await AsyncStorage.getItem('user');
      if (userDataString) {
        setUser(JSON.parse(userDataString));
      }
    };
    loadUserData();
  }, []);

  // Save user data to AsyncStorage whenever it changes
  useEffect(() => {
    if (user) {
      AsyncStorage.setItem('user', JSON.stringify(user));
    } else {
      AsyncStorage.removeItem('user'); // Clear user data if logging out
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
