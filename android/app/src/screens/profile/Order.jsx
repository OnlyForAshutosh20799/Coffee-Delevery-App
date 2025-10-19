import { Text, View, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import tw from 'twrnc'

const Order = () => {
  const [activeTab, setActiveTab] = useState('current') // 'current' or 'history'

  const currentOrders = [
    {
      id: 'ORD784239',
      date: 'Dec 15, 2024',
      time: '10:30 AM',
      status: 'on_the_way',
      statusText: 'On the way',
      estimatedDelivery: '11:15 AM - 11:45 AM',
      items: [
        {
          id: 1,
          name: 'Caramel Macchiato',
          price: 299,
          quantity: 2,
          image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80'
        },
        {
          id: 2,
          name: 'Cold Brew Coffee',
          price: 249,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80'
        }
      ],
      totalAmount: '₹847.00',
      deliveryAddress: '123 Coffee Street, Apt 4B, New York',
      deliveryPerson: 'Rajesh Kumar'
    },
    {
      id: 'ORD784240',
      date: 'Dec 15, 2024',
      time: '9:15 AM',
      status: 'preparing',
      statusText: 'Preparing',
      estimatedDelivery: '10:00 AM - 10:30 AM',
      items: [
        {
          id: 3,
          name: 'Espresso Shot',
          price: 199,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80'
        }
      ],
      totalAmount: '₹248.00',
      deliveryAddress: '456 Brew Avenue, Office, Mumbai',
      deliveryPerson: 'Amit Sharma'
    }
  ]

  const orderHistory = [
    {
      id: 'ORD784238',
      date: 'Dec 14, 2024',
      time: '4:20 PM',
      status: 'delivered',
      statusText: 'Delivered',
      items: [
        {
          id: 4,
          name: 'Cappuccino',
          price: 279,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80'
        },
        {
          id: 5,
          name: 'Chocolate Croissant',
          price: 175,
          quantity: 2,
          image: 'https://images.unsplash.com/photo-1555507036-ab794f27d2e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80'
        }
      ],
      totalAmount: '₹629.00',
      deliveryAddress: '123 Coffee Street, Apt 4B, New York',
      rating: 5,
      review: 'Excellent coffee and quick delivery!'
    },
    {
      id: 'ORD784237',
      date: 'Dec 13, 2024',
      time: '2:45 PM',
      status: 'delivered',
      statusText: 'Delivered',
      items: [
        {
          id: 6,
          name: 'Iced Americano',
          price: 229,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80'
        }
      ],
      totalAmount: '₹278.00',
      deliveryAddress: '789 Barista Lane, Home, Delhi',
      rating: 4,
      review: 'Good coffee but delivery was slightly delayed'
    },
    {
      id: 'ORD784236',
      date: 'Dec 12, 2024',
      time: '8:30 AM',
      status: 'delivered',
      statusText: 'Delivered',
      items: [
        {
          id: 7,
          name: 'Vanilla Latte',
          price: 319,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80'
        },
        {
          id: 8,
          name: 'Blueberry Muffin',
          price: 175,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80'
        }
      ],
      totalAmount: '₹494.00',
      deliveryAddress: '123 Coffee Street, Apt 4B, New York',
      rating: 5,
      review: 'Perfect start to my morning!'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'preparing': return '#d97706'
      case 'on_the_way': return '#2563eb'
      case 'delivered': return '#059669'
      case 'cancelled': return '#dc2626'
      default: return '#6b7280'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'preparing': return 'coffee'
      case 'on_the_way': return 'delivery-dining'
      case 'delivered': return 'check-circle'
      case 'cancelled': return 'cancel'
      default: return 'schedule'
    }
  }

  const renderOrderItem = ({ item }) => (
    <View style={tw`bg-white rounded-2xl shadow-sm border border-amber-200 mb-4 overflow-hidden`}>
      {/* Order Header */}
      <View style={tw`p-4 border-b border-amber-100`}>
        <View style={tw`flex-row justify-between items-center`}>
          <View>
            <Text style={tw`text-amber-900 font-bold`}>Order #{item.id}</Text>
            <Text style={tw`text-amber-600 text-sm mt-1`}>
              {item.date} • {item.time}
            </Text>
          </View>
          <View style={tw`flex-row items-center`}>
            <View 
              style={[
                tw`px-3 py-1 rounded-full flex-row items-center`,
                { backgroundColor: `${getStatusColor(item.status)}15` }
              ]}
            >
              <Icon 
                name={getStatusIcon(item.status)} 
                size={16} 
                color={getStatusColor(item.status)} 
              />
              <Text 
                style={[
                  tw`ml-1 font-semibold text-sm`,
                  { color: getStatusColor(item.status) }
                ]}
              >
                {item.statusText}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Order Items */}
      <View style={tw`p-4`}>
        {item.items.map((product, index) => (
          <View key={product.id} style={tw`flex-row items-center mb-3`}>
            <Image 
              source={{ uri: product.image }} 
              style={tw`w-16 h-16 rounded-xl`} 
            />
            <View style={tw`flex-1 ml-3`}>
              <Text style={tw`text-amber-900 font-medium`}>{product.name}</Text>
              <Text style={tw`text-amber-500 text-sm mt-1`}>
                Qty: {product.quantity}
              </Text>
            </View>
            <Text style={tw`text-amber-900 font-bold`}>
              ₹{(product.price * product.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      {/* Order Footer */}
      <View style={tw`p-4 bg-amber-50 border-t border-amber-100`}>
        <View style={tw`flex-row justify-between items-center mb-3`}>
          <Text style={tw`text-amber-700`}>Total Amount</Text>
          <Text style={tw`text-amber-900 font-bold text-lg`}>{item.totalAmount}</Text>
        </View>

        {/* Delivery Info for Current Orders */}
        {activeTab === 'current' && item.status !== 'delivered' && (
          <View style={tw`mb-3`}>
            <Text style={tw`text-amber-600 text-sm`}>
              <Icon name="schedule" size={14} color="#6F4E37" /> 
              Estimated delivery: {item.estimatedDelivery}
            </Text>
            <Text style={tw`text-amber-600 text-sm mt-1`}>
              <Icon name="person" size={14} color="#6F4E37" /> 
              Delivery partner: {item.deliveryPerson}
            </Text>
          </View>
        )}

        {/* Review for Delivered Orders */}
        {activeTab === 'history' && item.rating && (
          <View style={tw`mb-3`}>
            <View style={tw`flex-row items-center`}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Icon
                  key={star}
                  name="star"
                  size={16}
                  color={star <= item.rating ? "#FFD700" : "#E5E7EB"}
                />
              ))}
            </View>
            {item.review && (
              <Text style={tw`text-amber-600 text-sm mt-1`}>{item.review}</Text>
            )}
          </View>
        )}

        {/* Action Buttons */}
        <View style={tw`flex-row space-x-3 gap-2`}>
          {activeTab === 'current' ? (
            <>
              <TouchableOpacity 
                style={tw`flex-1 border-2 border-amber-700 rounded-xl py-2`}
                onPress={() => console.log('Track order', item.id)}
              >
                <Text style={tw`text-amber-900 text-center font-semibold`}>Track Order</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={tw`flex-1 border-2 border-amber-700 rounded-xl py-2`}
                onPress={() => console.log('Need help', item.id)}
              >
                <Text style={tw`text-amber-900 text-center font-semibold`}>Need Help?</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity 
                style={tw`flex-1 border-2 border-amber-700 rounded-xl py-2`}
                onPress={() => console.log('Reorder', item.id)}
              >
                <Text style={tw`text-amber-900 text-center font-semibold`}>Reorder</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={tw`flex-1 border-2 border-amber-700 rounded-xl py-2`}
                onPress={() => console.log('Rate order', item.id)}
              >
                <Text style={tw`text-amber-900 text-center font-semibold`}>Rate & Review</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  )

  return (
    <View style={tw`flex-1 bg-amber-50`}>
      {/* Header */}
      <View style={tw`bg-amber-100 pt-5 pb-6 px-6`}>
        <Text style={tw`text-2xl font-bold text-amber-900 text-center`}>My Orders</Text>
      </View>

      {/* Tab Bar */}
      <View style={tw`flex-row bg-white border-b border-amber-200`}>
        <TouchableOpacity
          style={tw`flex-1 py-4 items-center ${activeTab === 'current' ? 'border-b-2 border-amber-700' : ''}`}
          onPress={() => setActiveTab('current')}
        >
          <Text style={tw`text-base font-semibold ${activeTab === 'current' ? 'text-amber-900' : 'text-amber-600'}`}>
            Current Orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex-1 py-4 items-center ${activeTab === 'history' ? 'border-b-2 border-amber-700' : ''}`}
          onPress={() => setActiveTab('history')}
        >
          <Text style={tw`text-base font-semibold ${activeTab === 'history' ? 'text-amber-900' : 'text-amber-600'}`}>
            Order History
          </Text>
        </TouchableOpacity>
      </View>

      {/* Orders List */}
      <FlatList
        data={activeTab === 'current' ? currentOrders : orderHistory}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`p-4`}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={tw`items-center justify-center py-12`}>
            <Icon name="inventory" size={64} color="#A67B5B" />
            <Text style={tw`text-2xl font-bold text-amber-900 mt-6 text-center`}>
              {activeTab === 'current' ? 'No Current Orders' : 'No Order History'}
            </Text>
            <Text style={tw`text-amber-600 text-center mt-3 text-base leading-6 px-8`}>
              {activeTab === 'current' 
                ? 'You don\'t have any active orders. Start exploring our delicious coffee collection!'
                : 'Your order history will appear here once you place an order.'
              }
            </Text>
            <TouchableOpacity 
              style={tw`bg-amber-700 rounded-2xl px-8 py-4 mt-8 shadow-lg`}
              onPress={() => console.log('Browse menu')}
            >
              <Text style={tw`text-white text-lg font-bold`}>
                {activeTab === 'current' ? 'Browse Menu' : 'Start Shopping'}
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  )
}

export default Order