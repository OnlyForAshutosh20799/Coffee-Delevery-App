import React from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import tw from 'twrnc';

const ComponentHeader = ({ title, onBack, rightIcon, onRightPress }) => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  return (
    <View
      style={tw`flex-row items-center justify-between bg-amber-100 px-4 pt-12 pb-4 shadow-sm`}
    >
      {/* Back Button */}
      <TouchableOpacity
        onPress={onBack}
        style={tw`w-10 h-10 rounded-full bg-amber-200 items-center justify-center`}
      >
        <Icon name="arrow-back" size={isTablet ? 28 : 22} color="#6F4E37" />
      </TouchableOpacity>

      {/* Title */}
      <Text
        style={[
          tw`text-amber-900 font-bold text-center`,
          { fontSize: isTablet ? 22 : 18, flex: 1 },
        ]}
      >
        {title}
      </Text>

      {/* Optional Right Icon */}
      {rightIcon ? (
        <TouchableOpacity
          onPress={onRightPress}
          style={tw`w-10 h-10 rounded-full bg-amber-200 items-center justify-center`}
        >
          <Icon name={rightIcon} size={isTablet ? 26 : 22} color="#6F4E37" />
        </TouchableOpacity>
      ) : (
        <View style={tw`w-10`} />
      )}
    </View>
  );
};

export default ComponentHeader;
