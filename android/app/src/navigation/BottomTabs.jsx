import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from '../../src/navigation/stack/HomeStack';
import CartStack from '../../src/navigation/stack/CartStack';
import OrderStack from '../../src/navigation/stack/OrderStack';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import { useCart } from '../context/CartContext'; // Import useCart to access cart items

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const { cartItems } = useCart(); // Access cartItems from CartContext
  const cartItemCount = cartItems.length; // Calculate total number of items in cart

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: tw`bg-amber-50 border-t-0 shadow-lg px-4`,
        tabBarActiveTintColor: '#6B4F3D',
        tabBarInactiveTintColor: '#A67C52',
        tabBarShowLabel: true,
        tabBarLabelStyle: tw`text-xs font-semibold mt-4`,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'OrdersTab') {
            iconName = focused ? 'clipboard' : 'clipboard-outline';
          } else if (route.name === 'CartTab') {
            iconName = focused ? 'cart' : 'cart-outline';
          }

          // Icon container with badge for CartTab
          return (
            <View
              style={[
                tw`items-center justify-center rounded-xl mt-4`,
                {
                  width: focused ? 40 : 40,
                  height: focused ? 40 : 40,
                  backgroundColor: focused ? '#DCC6AA' : 'transparent',
                  shadowColor: focused ? '#6B4F3D' : undefined,
                  shadowOffset: focused ? { width: 0, height: 4 } : undefined,
                  shadowOpacity: focused ? 0.3 : 0,
                  shadowRadius: focused ? 5 : 0,
                  elevation: focused ? 5 : 0,
                },
              ]}
            >
              <Icon name={iconName} size={focused ? 24 : 20} color={color} />
              {/* Badge for cart item count */}
              {route.name === 'CartTab' && cartItemCount > 0 && (
                <View
                  style={tw`absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 items-center justify-center`}
                >
                  <Text style={tw`text-white text-xs font-bold`}>
                    {cartItemCount}
                  </Text>
                </View>
              )}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} options={{ title: 'Home' }} />
      <Tab.Screen name="OrdersTab" component={OrderStack} options={{ title: 'Orders' }} />
      <Tab.Screen name="CartTab" component={CartStack} options={{ title: 'Cart' }} />
    </Tab.Navigator>
  );
}