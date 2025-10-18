import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './android/app/src/navigation/BottomTabs';
// import ProfileScreen from './android/app/src/screens/profile/ProfileScreen';
import Header from './android/app/src/components/Header';
import ProfileStack from './android/app/src/navigation/stack/profileStack/ProfileStack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Header /> {/* Global Header */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={BottomTabs} />
        {/* <Stack.Screen name="ProfileScreen" component={ProfileScreen} /> */}
        <Stack.Screen name="ProfileStack" component={ProfileStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
