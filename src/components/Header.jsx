import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

// Get device width
const { width } = Dimensions.get('window');

// Define responsive font sizes
const isSmallDevice = width < 360;
const isLargeDevice = width > 420;

export default function Header() {
  const navigation = useNavigation();

  // Dynamic font sizes
  const greetingFont = isSmallDevice ? 13 : isLargeDevice ? 17 : 15;
  const nameFont = isSmallDevice ? 20 : isLargeDevice ? 26 : 22;
  const iconSize = isSmallDevice ? 20 : isLargeDevice ? 26 : 24;
  const paddingTop = isSmallDevice ? 8 : isLargeDevice ? 14 : 10;

  return (
    <View
      style={[
        tw`flex-row justify-between items-center px-4 py-4 bg-amber-50`,
        { paddingTop: paddingTop * 4 },
      ]}
    >
      {/* 👋 Left Side */}
      <View>
        <Text
          style={[
            tw`text-[#6B4F3D] font-medium`,
            { fontSize: greetingFont },
          ]}
        >
          Good Morning! 👋
        </Text>
        <Text
          style={[
            tw`text-[#4B3621] font-bold`,
            { fontSize: nameFont },
          ]}
        >
          Ashutosh
        </Text>
      </View>

      {/* 🛍️ Right Side */}
      <View style={tw`flex-row items-center`}>
        {/* 👤 Profile Icon */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate('ProfileStack', { screen: 'ProfileScreen' })
          }
          style={tw`bg-[#DCC6AA] w-10 h-10 rounded-xl items-center justify-center shadow-md`}
        >
          <Icon name="person-outline" size={iconSize} color="#6B4F3D" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
