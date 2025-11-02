import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import tw from 'twrnc';

// Responsive scaling utility
const scaleSize = (size, width) => (width < 380 ? size * 0.9 : width < 600 ? size : size * 1.2);

const NotificationsScreen = () => {
  const { width, height } = useWindowDimensions();

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order',
      title: 'Order Confirmed!',
      message: 'Your Caramel Macchiato order #ORD784239 has been confirmed',
      time: '2 min ago',
      read: false,
      image:
        'https://images.unsplash.com/photo-1561047029-3000c68339ca?auto=format&fit=crop&w=200&h=200&q=80',
      action: 'track_order',
    },
    {
      id: 2,
      type: 'promotion',
      title: 'Special Offer!',
      message: 'Get 20% off on all cold brews this weekend. Limited time offer!',
      time: '1 hour ago',
      read: false,
      image:
        'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=200&h=200&q=80',
      action: 'view_offer',
    },
    {
      id: 3,
      type: 'delivery',
      title: 'Out for Delivery',
      message: 'Rajesh is on the way with your order. Expected delivery in 15-20 min',
      time: '2 hours ago',
      read: true,
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80',
      action: 'track_order',
    },
    {
      id: 4,
      type: 'order',
      title: 'Order Delivered',
      message:
        'Your order #ORD784238 has been successfully delivered. Enjoy your coffee!',
      time: '5 hours ago',
      read: true,
      image:
        'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=200&h=200&q=80',
      action: 'rate_order',
    },
  ]);

  const [activeTab, setActiveTab] = useState('all');

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order':
        return 'shopping-bag';
      case 'promotion':
        return 'local-offer';
      case 'delivery':
        return 'delivery-dining';
      case 'system':
        return 'info';
      case 'loyalty':
        return 'card-giftcard';
      default:
        return 'notifications';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'order':
        return '#059669'; // Green
      case 'promotion':
        return '#d97706'; // Amber
      case 'delivery':
        return '#2563eb'; // Blue
      case 'system':
        return '#7c3aed'; // Purple
      case 'loyalty':
        return '#dc2626'; // Red
      default:
        return '#6F4E37'; // Brown
    }
  };

  const handleNotificationPress = (notification) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === notification.id ? { ...item, read: true } : item
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  const filteredNotifications =
    activeTab === 'unread'
      ? notifications.filter((item) => !item.read)
      : notifications;

  const unreadCount = notifications.filter((item) => !item.read).length;

  return (
    <View style={tw`flex-1 bg-amber-50`}>
      {/* Header */}
      <View style={tw`bg-amber-100 pt-10 pb-6 px-6`}>
        <View style={tw`flex-row justify-between items-center`}>
          <View>
            <Text
              style={[
                tw`font-bold text-amber-800`,
                { fontSize: scaleSize(22, width) },
              ]}
            >
              Notifications
            </Text>
            <Text
              style={[
                tw`text-amber-700 mt-1`,
                { fontSize: scaleSize(14, width) },
              ]}
            >
              {unreadCount} unread{' '}
              {unreadCount === 1 ? 'message' : 'messages'}
            </Text>
          </View>

          <TouchableOpacity
            style={tw`bg-amber-700 px-3 py-2 rounded-full`}
            onPress={handleMarkAllAsRead}
          >
            <Text
              style={[
                tw`text-amber-50 font-semibold`,
                { fontSize: scaleSize(12, width) },
              ]}
            >
              Mark All Read
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Bar */}
      <View style={tw`flex-row bg-white border-b border-amber-200`}>
        {['all', 'unread'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={tw`flex-1 py-4 items-center ${
              activeTab === tab ? 'border-b-2 border-amber-700' : ''
            }`}
            onPress={() => setActiveTab(tab)}
          >
            <View style={tw`flex-row items-center`}>
              <Text
                style={[
                  tw`font-semibold`,
                  {
                    fontSize: scaleSize(14, width),
                    color:
                      activeTab === tab ? '#78350f' : '#a16207',
                  },
                ]}
              >
                {tab === 'all' ? 'All Notifications' : 'Unread'}
              </Text>
              {tab === 'unread' && unreadCount > 0 && (
                <View
                  style={tw`bg-red-500 w-5 h-5 rounded-full items-center justify-center ml-2`}
                >
                  <Text style={tw`text-white text-xs font-bold`}>
                    {unreadCount}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Notifications List */}
      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        <View style={tw`p-4`}>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                onPress={() => handleNotificationPress(notification)}
                style={[
                  tw`bg-white rounded-2xl shadow-sm border border-amber-200 p-4 mb-3 flex-row items-start`,
                  !notification.read && {
                    borderLeftWidth: 4,
                    borderLeftColor: getNotificationColor(notification.type),
                  },
                ]}
              >
                {/* Icon */}
                <View
                  style={[
                    tw`items-center justify-center mr-3 rounded-full`,
                    {
                      width: scaleSize(50, width),
                      height: scaleSize(50, width),
                      backgroundColor: `${getNotificationColor(notification.type)}15`,
                    },
                  ]}
                >
                  {notification.image ? (
                    <Image
                      source={{ uri: notification.image }}
                      style={{
                        width: scaleSize(45, width),
                        height: scaleSize(45, width),
                        borderRadius: scaleSize(45, width) / 2,
                      }}
                    />
                  ) : (
                    <Icon
                      name={getNotificationIcon(notification.type)}
                      size={scaleSize(22, width)}
                      color={getNotificationColor(notification.type)}
                    />
                  )}
                </View>

                {/* Text Content */}
                <View style={tw`flex-1`}>
                  <View style={tw`flex-row justify-between items-start mb-1`}>
                    <Text
                      style={[
                        tw`font-bold text-amber-900 flex-1`,
                        { fontSize: scaleSize(15, width) },
                      ]}
                    >
                      {notification.title}
                    </Text>
                    {!notification.read && (
                      <View style={tw`w-2 h-2 bg-red-500 rounded-full ml-2`} />
                    )}
                  </View>
                  <Text
                    style={[
                      tw`text-amber-700 leading-5`,
                      { fontSize: scaleSize(13, width) },
                    ]}
                  >
                    {notification.message}
                  </Text>
                  <Text
                    style={[
                      tw`text-amber-400 mt-2`,
                      { fontSize: scaleSize(11, width) },
                    ]}
                  >
                    {notification.time}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={tw`items-center justify-center py-20`}>
              <Icon name="notifications-off" size={scaleSize(80, width)} color="#A67B5B" />
              <Text
                style={[
                  tw`font-bold text-amber-900 mt-6 text-center`,
                  { fontSize: scaleSize(20, width) },
                ]}
              >
                {activeTab === 'unread'
                  ? 'No Unread Notifications'
                  : 'No Notifications'}
              </Text>
              <Text
                style={[
                  tw`text-amber-600 text-center mt-3 px-8`,
                  { fontSize: scaleSize(14, width) },
                ]}
              >
                {activeTab === 'unread'
                  ? "You're all caught up! No unread notifications."
                  : 'Your notifications will appear here when you have order updates, promotions, and more.'}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default NotificationsScreen;
