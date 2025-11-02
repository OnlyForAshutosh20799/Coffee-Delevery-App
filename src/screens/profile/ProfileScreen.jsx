import React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 360;
const isLargeDevice = width > 420;

const scale = (size) => {
  if (isSmallDevice) return size * 0.85;
  if (isLargeDevice) return size * 1.15;
  return size;
};

const ProfileScreen = () => {
  const navigation = useNavigation();

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
        { icon: 'shopping-bag', label: 'My Orders', color: '#6F4E37' },
        { icon: 'bookmark', label: 'Saved Address', color: '#6F4E37' },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: 'help', label: 'Help', color: '#6F4E37' },
        { icon: 'contact-support', label: 'Contact Us', color: '#6F4E37' },
        { icon: 'info', label: 'About Us', color: '#6F4E37' },
      ],
    },
  ];

  const handleClick = (item) => {
    if (item.label === 'Manage Profile') navigation.navigate('MyProfileScreen');
    else if (item.label === 'Notifications') navigation.navigate('Notification');
    else if (item.label === 'My Orders') navigation.navigate('Order');
    else if (item.label === 'Saved Address') navigation.navigate('SavedAddressList');
    else if (item.label === 'Contact Us') navigation.navigate('ContectUs');
    else if (item.label === 'Help') navigation.navigate('Help');
  };

  return (
    <ScrollView
      style={tw`flex-1 bg-amber-50`}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Section */}
      <View
        style={[
          tw`bg-amber-100 px-6 flex-row items-center pt-12 pb-5`,
          { gap: scale(16) },
        ]}
      >
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=200&h=200&q=80',
          }}
          style={{
            width: scale(80),
            height: scale(80),
            borderRadius: scale(40),
            borderWidth: 4,
            borderColor: '#92400e',
          }}
        />
        <View style={{ flex: 1 }}>
          <Text
            style={[
              tw`font-bold text-amber-800`,
              { fontSize: scale(24) },
            ]}
          >
            {userData.name}
          </Text>
          <Text
            style={[
              tw`text-amber-600 mb-2`,
              { fontSize: scale(14) },
            ]}
          >
            {userData.email}
          </Text>
          <View
            style={[
              tw`flex-row items-center bg-amber-800 px-3 py-1 rounded-full`,
              { alignSelf: 'flex-start' },
            ]}
          >
            <Icon name="star" size={scale(14)} color="#FFD700" />
            <Text
              style={[
                tw`text-amber-100 ml-1`,
                { fontSize: scale(12) },
              ]}
            >
              Member since {userData.memberSince}
            </Text>
          </View>
        </View>
      </View>

      {/* Menu Sections */}
      {menuSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={tw`mx-6 mt-6`}>
          <Text
            style={[
              tw`font-semibold text-amber-900 mb-3`,
              { fontSize: scale(18) },
            ]}
          >
            {section.title}
          </Text>

          <View
            style={tw`bg-white rounded-2xl shadow-sm border border-amber-200 overflow-hidden`}
          >
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                onPress={() => handleClick(item)}
                style={[
                  tw`flex-row justify-between items-center px-5`,
                  {
                    paddingVertical: scale(14),
                    borderBottomWidth:
                      itemIndex < section.items.length - 1 ? 1 : 0,
                    borderBottomColor: '#FCD34D30',
                  },
                ]}
              >
                <View style={tw`flex-row items-center flex-1`}>
                  <View
                    style={[
                      tw`rounded-full bg-amber-100 items-center justify-center mr-3`,
                      {
                        width: scale(40),
                        height: scale(40),
                      },
                    ]}
                  >
                    <Icon name={item.icon} size={scale(22)} color={item.color} />
                  </View>
                  <Text
                    style={[
                      tw`text-amber-900 font-medium flex-1`,
                      { fontSize: scale(15) },
                    ]}
                  >
                    {item.label}
                  </Text>
                  {item.badge && (
                    <View
                      style={[
                        tw`bg-red-500 rounded-full items-center justify-center`,
                        {
                          width: scale(22),
                          height: scale(22),
                        },
                      ]}
                    >
                      <Text
                        style={[
                          tw`text-white font-bold`,
                          { fontSize: scale(10) },
                        ]}
                      >
                        {item.badge}
                      </Text>
                    </View>
                  )}
                </View>
                <Icon name="chevron-right" size={scale(22)} color="#A67B5B" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      {/* Logout Button */}
      <TouchableOpacity
        style={[
          tw`mx-6 my-6 rounded-full flex-row justify-center items-center shadow-lg border border-amber-200`,
          {
            backgroundColor: '#7f1d1d',
            paddingVertical: scale(10),
          },
        ]}
      >
        <Icon name="logout" size={scale(18)} color="#fff" />
        <Text
          style={[
            tw`text-white font-semibold ml-2`,
            { fontSize: scale(15) },
          ]}
        >
          Sign Out
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;
