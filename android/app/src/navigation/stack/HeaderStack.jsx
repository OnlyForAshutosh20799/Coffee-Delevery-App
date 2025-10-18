import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../../components/Header'
import ProfileScreen from '../../screens/profile/ProfileScreen';
const Stack = createNativeStackNavigator();

export default function HeaderStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Header"  component={Header} options={{ headerShown: false }} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
}