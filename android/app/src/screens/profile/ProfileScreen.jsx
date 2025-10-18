import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation(); // <-- get navigation

  const userData = {
    name: 'Ashu Singh',
    email: 'abc@example.com',
    bio: 'Regular coffee lover ☕ | Favorite order: Vanilla Latte | Always exploring new coffee shops in town!',
    memberSince: '2023',
    loyaltyPoints: 1250,
    stats: {
      orders: 28,
      favorites: 12,
      reviews: 8,
    },
  };

  const menuSections = [
    {
      title: 'My Account',
      items: [
        { icon: 'person', label: 'Manage Profile', color: '#6F4E37' },
        { icon: 'notifications', label: 'Notifications', color: '#6F4E37', badge: 2 },
        { icon: 'favorite', label: 'My Wishlist', color: '#6F4E37' },
        { icon: 'shopping-bag', label: 'My Orders', color: '#6F4E37' },
        { icon: 'bookmark', label: 'Saved Address', color: '#6F4E37' },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: 'help', label: 'Help & FAQ', color: '#6F4E37' },
        { icon: 'contact-support', label: 'Contact Us', color: '#6F4E37' },
        { icon: 'info', label: 'About Us', color: '#6F4E37' },
        { icon: 'settings', label: 'App Settings', color: '#6F4E37' },
      ],
    },
  ];

  const handleClick = (item) => {
    if (item.label === 'Manage Profile') {
      navigation.navigate('MyProfileScreen'); 
    } else if (item.label === 'Notifications') {
      navigation.navigate('NotificationsScreen'); 
    } else if (item.label === 'My Wishlist') {
      navigation.navigate('Wishlist'); 
    } else if (item.label === 'My Orders'){
      navigation.navigate('Orders')
    } else if(item.label === 'Saved Address'){
      navigation.navigate('SavedAddressList')
    } else if(item.label === 'Contact Us'){
      navigation.navigate('ContectUs')
    }
  
  };

  return (
    <ScrollView style={tw`flex-1 bg-amber-50`} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={tw`bg-amber-100 pt-5 pb-3 px-6`}>
        <View style={tw`items-center flex-row justify-start gap-4`}>
          <View style={tw`relative mb-2`}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
              }}
              style={tw`w-20 h-20 rounded-full border-4 border-amber-700`}
            />
          </View>
          <View>
            <Text style={tw`text-xl font-bold text-amber-800`}>{userData.name}</Text>
            <Text style={tw`text-md text-amber-600 mb-2`}>{userData.email}</Text>
            <View style={tw`flex-row items-center bg-amber-800 px-3 py-1 rounded-full mb-4`}>
              <Icon name="star" size={16} color="#FFD700" />
              <Text style={tw`text-amber-100 text-sm ml-1`}>
                Member since {userData.memberSince}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Menu Sections */}
      {menuSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={tw`mx-6 mt-6`}>
          <Text style={tw`text-lg font-semibold text-amber-900 mb-3`}>{section.title}</Text>
          <View style={tw`bg-white rounded-2xl shadow-sm border border-amber-200 overflow-hidden`}>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                onPress={() => handleClick(item)} // <-- fix here: wrap in arrow function
                style={tw`flex-row justify-between items-center py-4 px-5 ${
                  itemIndex < section.items.length - 1 ? 'border-b border-amber-100' : ''
                }`}
              >
                <View style={tw`flex-row items-center flex-1`}>
                  <View style={tw`w-10 h-10 rounded-full bg-amber-100 items-center justify-center mr-3`}>
                    <Icon name={item.icon} size={22} color={item.color} />
                  </View>
                  <Text style={tw`text-amber-900 text-base font-medium flex-1`}>{item.label}</Text>
                  {item.badge && (
                    <View style={tw`bg-red-500 w-6 h-6 rounded-full items-center justify-center`}>
                      <Text style={tw`text-white text-xs font-bold`}>{item.badge}</Text>
                    </View>
                  )}
                </View>
                <Icon name="chevron-right" size={22} color="#A67B5B" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      {/* Logout Button */}
      <TouchableOpacity style={tw`mx-6 my-6 bg-red-900 rounded-full py-2 flex-row justify-center items-center shadow-lg border border-amber-200`}>
        <Icon name="logout" size={20} color="#fff" />
        <Text style={tw`text-white text-md font-semibold ml-2`}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;
