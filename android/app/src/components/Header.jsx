import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

export default function Header() {

    const navigation = useNavigation();

  return (
    <View
      style={tw`flex-row justify-between items-center px-4 py-4 bg-amber-50 pt-10`}
    >
      {/* 👋 Left Side */}
      <View>
        <Text style={tw`text-[#6B4F3D] text-base font-medium`}>
          Good Morning! 👋
        </Text>
        <Text style={tw`text-[#4B3621] text-2xl font-bold`}>Ashutosh</Text>
      </View>

      {/* 🛍️ Right Side */}
      <View style={tw`flex-row items-center`}>
        {/* 👤 Profile Icon */}
        <TouchableOpacity
          activeOpacity={0.7}
         onPress={() => navigation.navigate('ProfileStack', { screen: 'ProfileScreen' })}
          style={tw`bg-[#DCC6AA] w-10 h-10 rounded-xl items-center justify-center shadow-md`}
        >
          <Icon name="person-outline" size={24} color="#6B4F3D" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
