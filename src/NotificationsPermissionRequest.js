import React from 'react';
import { View, Text, Button, Linking, Platform } from 'react-native';
import { openSettings } from 'react-native-permissions'; // Use this package to open settings

const NotificationPermissionRequester = ({ onGranted }) => {

  const openNotificationSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      openSettings().catch(() => console.warn('cannot open settings'));
    }
  };

  return (
    <View>
      <Text>We use notifications to keep you updated with important info.</Text>
      <Button title="Enable Notifications" onPress={openNotificationSettings} />
    </View>
  );
};

export default NotificationPermissionRequester;
