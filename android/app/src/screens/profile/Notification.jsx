import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import tw from 'twrnc';

const NotificationsScreen = () => {
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
      message:
        'Get 20% off on all cold brews this weekend. Limited time offer!',
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
      message:
        'Rajesh is on the way with your order. Expected delivery in 15-20 min',
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

  const [activeTab, setActiveTab] = useState('all'); // 'all', 'unread'

  const getNotificationIcon = type => {
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

  const getNotificationColor = type => {
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

  const handleNotificationPress = notification => {
    setNotifications(prev =>
      prev.map(item =>
        item.id === notification.id ? { ...item, read: true } : item,
      ),
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(item => ({ ...item, read: true })));
  };


  const filteredNotifications =
    activeTab === 'unread'
      ? notifications.filter(item => !item.read)
      : notifications;

  const unreadCount = notifications.filter(item => !item.read).length;

  return (
    <View style={tw`flex-1 bg-amber-50`}>
      {/* Header */}
      <View style={tw`bg-amber-100 pt-5 pb-6 px-6`}>
        <View style={tw`flex-row justify-between items-center`}>
          <View>
            <Text style={tw`text-2xl font-bold text-amber-800`}>
              Notifications
            </Text>
            <Text style={tw`text-amber-700 mt-1`}>
              {unreadCount} unread {unreadCount === 1 ? 'message' : 'messages'}
            </Text>
          </View>
          <View style={tw`flex-row space-x-2`}>
            <TouchableOpacity
              style={tw`bg-amber-700 px-3 py-2 rounded-full`}
              onPress={handleMarkAllAsRead}
            >
              <Text style={tw`text-amber-50 text-sm font-semibold`}>
                Mark All Read
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Tab Bar */}
      <View style={tw`flex-row bg-white border-b border-amber-200`}>
        <TouchableOpacity
          style={tw`flex-1 py-4 items-center ${
            activeTab === 'all' ? 'border-b-2 border-amber-700' : ''
          }`}
          onPress={() => setActiveTab('all')}
        >
          <Text
            style={tw`text-base font-semibold ${
              activeTab === 'all' ? 'text-amber-900' : 'text-amber-600'
            }`}
          >
            All Notifications
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex-1 py-4 items-center ${
            activeTab === 'unread' ? 'border-b-2 border-amber-700' : ''
          }`}
          onPress={() => setActiveTab('unread')}
        >
          <View style={tw`flex-row items-center`}>
            <Text
              style={tw`text-base font-semibold ${
                activeTab === 'unread' ? 'text-amber-900' : 'text-amber-600'
              }`}
            >
              Unread
            </Text>
            {unreadCount > 0 && (
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
      </View>

      {/* Notifications List */}
      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        <View style={tw`p-4`}>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map(notification => (
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
                    tw`w-12 h-12 rounded-full items-center justify-center mr-3`,
                    {
                      backgroundColor: `${getNotificationColor(
                        notification.type,
                      )}15`,
                    },
                  ]}
                >
                  {notification.image ? (
                    <Image
                      source={{ uri: notification.image }}
                      style={tw`w-10 h-10 rounded-full`}
                    />
                  ) : (
                    <Icon
                      name={getNotificationIcon(notification.type)}
                      size={24}
                      color={getNotificationColor(notification.type)}
                    />
                  )}
                </View>

                {/* Content */}
                <View style={tw`flex-1`}>
                  <View style={tw`flex-row justify-between items-start mb-1`}>
                    <Text style={tw`text-amber-900 font-bold text-base flex-1`}>
                      {notification.title}
                    </Text>
                    {!notification.read && (
                      <View style={tw`w-2 h-2 bg-red-500 rounded-full ml-2`} />
                    )}
                  </View>
                  <Text style={tw`text-amber-600 text-sm leading-5`}>
                    {notification.message}
                  </Text>
                  <Text style={tw`text-amber-400 text-xs mt-2`}>
                    {notification.time}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={tw`items-center justify-center py-16`}>
              <Icon name="notifications-off" size={80} color="#A67B5B" />
              <Text
                style={tw`text-2xl font-bold text-amber-900 mt-6 text-center`}
              >
                {activeTab === 'unread'
                  ? 'No Unread Notifications'
                  : 'No Notifications'}
              </Text>
              <Text
                style={tw`text-amber-600 text-center mt-3 text-base leading-6 px-8`}
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
