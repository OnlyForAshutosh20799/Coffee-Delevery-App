import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './stack/HomeStack';
import CartStack from './stack/CartStack';
import OrderStack from './stack/OrderStack';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import { useCart } from '../context/CartContext';

const Tab = createBottomTabNavigator();

// Get screen width for responsive sizing
const { width } = Dimensions.get('window');
const isSmallDevice = width < 360;
const isLargeDevice = width > 420;

export default function BottomTabs() {
  const { cartItems } = useCart();
  const cartItemCount = cartItems.length;

  // Dynamic responsive sizes
  const iconSize = isSmallDevice ? 20 : isLargeDevice ? 28 : 24;
  const labelFontSize = isSmallDevice ? 10 : isLargeDevice ? 13 : 11;
  const tabPadding = isSmallDevice ? 4 : isLargeDevice ? 8 : 6;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: [
          tw`bg-amber-50 border-t-0 shadow-lg`,
          {
            paddingBottom: tabPadding,
            height: isSmallDevice ? 60 : isLargeDevice ? 75 : 68,
          },
        ],
        tabBarActiveTintColor: '#6B4F3D',
        tabBarInactiveTintColor: '#A67C52',
        tabBarShowLabel: true,
        tabBarLabelStyle: [
          tw`font-semibold mt-4`,
          { fontSize: labelFontSize },
        ],
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'OrdersTab') {
            iconName = focused ? 'clipboard' : 'clipboard-outline';
          } else if (route.name === 'CartTab') {
            iconName = focused ? 'cart' : 'cart-outline';
          }

          return (
            <View
              style={[
                tw`items-center justify-center rounded-xl mt-4`,
                {
                  width: focused ? 42 : 40,
                  height: focused ? 42 : 40,
                  backgroundColor: focused ? '#DCC6AA' : 'transparent',
                  shadowColor: focused ? '#6B4F3D' : undefined,
                  shadowOffset: focused ? { width: 0, height: 3 } : undefined,
                  shadowOpacity: focused ? 0.25 : 0,
                  shadowRadius: focused ? 4 : 0,
                  elevation: focused ? 4 : 0,
                },
              ]}
            >
              <Icon name={iconName} size={iconSize} color={color} />

              {/* 🔴 Cart badge */}
              {route.name === 'CartTab' && cartItemCount > 0 && (
                <View
                  style={tw`absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 items-center justify-center`}
                >
                  <Text
                    style={[
                      tw`text-white font-bold`,
                      { fontSize: isSmallDevice ? 9 : 10 },
                    ]}
                  >
                    {cartItemCount}
                  </Text>
                </View>
              )}
            </View>
          );
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ title: 'Home' }}
      />
      {/* Uncomment when you need Orders */}
      {/* <Tab.Screen
        name="OrdersTab"
        component={OrderStack}
        options={{ title: 'Orders' }}
      /> */}
      <Tab.Screen
        name="CartTab"
        component={CartStack}
        options={{ title: 'Cart' }}
      />
    </Tab.Navigator>
  );
}
