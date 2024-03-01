// BottomTabNavigator.tsx
import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import the screen components
import { HomeScreen } from '../pages/HomeScreen';
import { SearchScreen } from '../pages/SearchScreen';
import { NotificationsScreen } from '../pages/NotificationsScreen';
import { ProfileScreen } from '../pages/ProfileScreen.js';
import { CartScreen } from '../pages/CartScreen.js';


import HomeStackNavigator from './HomeStackNavigator';

// Import icons
import HomeIcon from '../icons/home.png';
import HomeActiveIcon from '../icons/homeActive.png';
import SearchIcon from '../icons/search.png';
import SearchActiveIcon from '../icons/searchActive.png';
import ProfileIcon from '../icons/profile.png';
import ProfileActiveIcon from '../icons/profileActive.png';
import NotificationIcon from '../icons/notification.png';
import NotificationActiveIcon from '../icons/notificationActive.png';
import CartIcon from '../icons/cart.png';
import CartActiveIcon from '../icons/cartActive.png';
// ... and so on for the other icons

// import headers
import HomeHeader from '../headers/HomeHeader';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitle: route.name,
        tabBarShowLabel: false,
        headerTitleAlign: 'center', // Align the header title to center
        headerStyle: {
          backgroundColor: '#fff', // Match the topBar style in your App.tsx
        },
        headerTintColor: '#2c2d2c',
        tabBarIcon: ({ focused }) => {
          let icon;
          switch (route.name) {
            case 'Home':
              icon = focused ? HomeActiveIcon : HomeIcon;
              break;
             case 'Search':
              icon = focused ? SearchActiveIcon : SearchIcon;
               break;
            case 'Notifications':
              icon = focused ? NotificationActiveIcon : NotificationIcon;
              break;
            case 'Profile':
              icon = focused ? ProfileActiveIcon : ProfileIcon;
              break;
            case 'Cart':
              icon = focused ? CartActiveIcon : CartIcon;
              break;
            // Add cases for other icons
          }
          // You can return any component that you like here:
          return <Image source={icon} style={{ width: 25, height: 25 }} />;
        },
      })}
    >
       {/* <Tab.Screen name="HomeStack" component={HomeStackNavigator} options={{ title: 'Home' }} /> */}
      <Tab.Screen name="Home" component={HomeScreen} 
      options={{
          header: () => <HomeHeader />,
          // Other common options can go here
        }} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
