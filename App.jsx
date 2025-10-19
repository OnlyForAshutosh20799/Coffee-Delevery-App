import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './android/app/src/navigation/BottomTabs';
import Header from './android/app/src/components/Header';
import ProfileStack from './android/app/src/navigation/stack/profileStack/ProfileStack';
import {CartProvider } from './android/app/src/context/CartContext'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CartProvider>
    <NavigationContainer>
      <Header /> {/* Global Header */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={BottomTabs} />
        <Stack.Screen name="ProfileStack" component={ProfileStack} />
      </Stack.Navigator>
    </NavigationContainer>
    </CartProvider>
  );
}
