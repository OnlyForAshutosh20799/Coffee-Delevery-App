import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyProfileScreen from '../../../screens/profile/MyProfileScreen'
import ProfileScreen from '../../../screens/profile/ProfileScreen'
import SavedAddressList from '../../../screens/profile/SavedAddressList'
import ContectUs from '../../../screens/profile/ContectUs'


const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MyProfileScreen" component={MyProfileScreen} />
     <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
     <Stack.Screen name='SavedAddressList' component={SavedAddressList} />
     <Stack.Screen name='ContectUs' component={ContectUs} />
    </Stack.Navigator>
  );
}