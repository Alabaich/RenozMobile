import React from 'react';
import { View, Text, Button } from 'react-native';
import PushNotification from 'react-native-push-notification';

const TestNotification = ({ onGranted }) => {
  
  const sendTestNotification = () => {
    PushNotification.localNotification({
      title: "Test Notification",
      message: "This is a test notification",
      playSound: false,
      soundName: 'default',
      userInteraction: false, // BOOLEAN : If the notification was opened by the user from the notification area or not
    });
  };

  return (
    <View>
      <Text>We use notifications to keep you updated with important info.</Text>
      <Button title="Send Test Notification" onPress={sendTestNotification} />
    </View>
  );
};

export default TestNotification;
