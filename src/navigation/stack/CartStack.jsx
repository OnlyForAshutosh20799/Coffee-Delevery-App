import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartScreen from '../../screens/cart/CartScreem';
import CheckOut from '../../screens/cart/CheckOut'
import TrackOrder from '../../screens/cart/TrackOrder'

const Stack = createNativeStackNavigator();

export default function OrdersStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="CheckOut" component={CheckOut} />
      <Stack.Screen name= "TrackOrder" component={TrackOrder}/>
    </Stack.Navigator>
  );
}