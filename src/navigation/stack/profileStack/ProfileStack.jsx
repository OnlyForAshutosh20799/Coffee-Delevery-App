import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyProfileScreen from '../../../screens/profile/MyProfileScreen'
import ProfileScreen from '../../../screens/profile/ProfileScreen'
import SavedAddressList from '../../../screens/profile/SavedAddressList'
import ContectUs from '../../../screens/profile/ContectUs'
import Order from '../../../screens/profile/Order'
import Notification from '../../../screens/profile/Notification'
import Help from '../../../screens/profile/Help'


const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MyProfileScreen" component={MyProfileScreen} />
     <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
     <Stack.Screen name='SavedAddressList' component={SavedAddressList} />
     <Stack.Screen name='ContectUs' component={ContectUs} />
     <Stack.Screen name='Order' component={Order}/>
     <Stack.Screen name='Notification' component={Notification} />
     <Stack.Screen name='Help' component={Help} />
    </Stack.Navigator>
  );
}