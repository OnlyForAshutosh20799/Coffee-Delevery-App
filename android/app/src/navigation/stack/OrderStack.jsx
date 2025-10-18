import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyOrdersScreen from '../../screens/orders/OrderScreen';

const Stack = createNativeStackNavigator();

export default function OrdersStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Orders" component={MyOrdersScreen} />
    </Stack.Navigator>
  );
}
