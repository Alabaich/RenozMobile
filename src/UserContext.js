import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext({
  user: null,
  setUser: () => {},
  loginUser: () => {},
  logoutUser: () => {},
  isLoggedIn: false, // Add this line
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to log in the user and save the user's data
  const loginUser = async (userData) => {
    setUser(userData);
    setIsLoggedIn(true); // Add this line
    await AsyncStorage.setItem('user', JSON.stringify(userData));
  };

  // Function to log out the user and clear the user's data
  const logoutUser = async () => {
    setUser(null);
    setIsLoggedIn(false); // Add this line
    await AsyncStorage.removeItem('user');
  };

  // Load user data from AsyncStorage when the app starts
  useEffect(() => {
    const loadUserData = async () => {
      const userDataString = await AsyncStorage.getItem('user');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        setUser(userData);
      }
    };
    
    loadUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loginUser, logoutUser, isLoggedIn }}> 
      {children}
    </UserContext.Provider>
  );
};

// Hook to use the user context
export const useUser = () => {
  return useContext(UserContext);
};
