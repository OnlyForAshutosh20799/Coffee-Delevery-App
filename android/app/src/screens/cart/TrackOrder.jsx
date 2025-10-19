import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import tw from 'twrnc'

const TrackOrder = () => {
  const [orderStatus, setOrderStatus] = useState('preparing') // preparing, on_the_way, delivered

  const orderDetails = {
    orderNumber: 'ORD784239',
    orderDate: 'Dec 15, 2024 - 10:30 AM',
    estimatedDelivery: '11:15 AM - 11:45 AM',
    totalAmount: '₹1,247.50',
    items: [
      {
        id: 1,
        name: 'Caramel Macchiato',
        price: 299,
        quantity: 2,
        size: 'Medium',
        image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80'
      },
      {
        id: 2,
        name: 'Cold Brew Coffee',
        price: 249,
        quantity: 1,
        size: 'Large',
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80'
      },
      {
        id: 3,
        name: 'Blueberry Muffin',
        price: 175,
        quantity: 1,
        size: 'Regular',
        image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80'
      }
    ]
  }

  const deliveryPerson = {
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    vehicle: 'Motorcycle',
    vehicleNumber: 'DL 01 AB 1234',
    rating: 4.8,
    deliveries: 1247,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80'
  }

  const deliveryAddress = {
    type: 'home',
    title: 'Home',
    name: 'Sarah Miller',
    street: '123 Coffee Street',
    apartment: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    phone: '+1 (555) 123-4567'
  }

  const orderTimeline = [
    {
      id: 1,
      status: 'confirmed',
      title: 'Order Confirmed',
      description: 'Your order has been confirmed',
      time: '10:30 AM',
      completed: true,
      active: false
    },
    {
      id: 2,
      status: 'preparing',
      title: 'Preparing Your Order',
      description: 'Our barista is preparing your coffee',
      time: '10:35 AM',
      completed: orderStatus !== 'confirmed',
      active: orderStatus === 'preparing'
    },
    {
      id: 3,
      status: 'on_the_way',
      title: 'Out for Delivery',
      description: 'Your order is on the way',
      time: orderStatus === 'on_the_way' || orderStatus === 'delivered' ? '10:50 AM' : 'Estimated 10:50 AM',
      completed: orderStatus === 'delivered' || orderStatus === 'on_the_way',
      active: orderStatus === 'on_the_way'
    },
    {
      id: 4,
      status: 'delivered',
      title: 'Order Delivered',
      description: 'Your order has been delivered',
      time: orderStatus === 'delivered' ? '11:15 AM' : 'Estimated 11:15 AM',
      completed: orderStatus === 'delivered',
      active: orderStatus === 'delivered'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#059669'
      case 'preparing': return '#d97706'
      case 'on_the_way': return '#2563eb'
      case 'delivered': return '#7c3aed'
      default: return '#6b7280'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return 'check-circle'
      case 'preparing': return 'coffee'
      case 'on_the_way': return 'delivery-dining'
      case 'delivered': return 'done-all'
      default: return 'schedule'
    }
  }

  return (
    <View style={tw`flex-1 bg-amber-50`}>
      {/* Header */}
      <View style={tw`bg-amber-100 pt-5 pb-6 px-6`}>
        <View style={tw`flex-row justify-between items-center`}>
          <View>
            <Text style={tw`text-2xl font-bold text-amber-900`}>Track Order</Text>
            <Text style={tw`text-amber-800 mt-1`}>Order #{orderDetails.orderNumber}</Text>
          </View>
          <TouchableOpacity style={tw`bg-amber-700 px-4 py-2 rounded-full`}>
            <Text style={tw`text-amber-50 font-semibold`}>Help</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={tw`flex-1 px-6`} showsVerticalScrollIndicator={false}>
        {/* Order Status Card */}
        <View style={tw`mt-6`}>
          <View style={tw`bg-white rounded-2xl shadow-lg border border-amber-200 p-6`}>
            <View style={tw`flex-row items-center justify-between mb-4`}>
              <View>
                <Text style={tw`text-lg font-bold text-amber-900`}>
                  {orderStatus === 'preparing' && 'Preparing Your Order'}
                  {orderStatus === 'on_the_way' && 'On The Way'}
                  {orderStatus === 'delivered' && 'Order Delivered'}
                </Text>
                <Text style={tw`text-amber-600 text-sm mt-1`}>
                  Estimated delivery: {orderDetails.estimatedDelivery}
                </Text>
              </View>
            </View>

            {/* Progress Bar */}
            <View style={tw`w-full bg-amber-200 rounded-full h-2 mb-6`}>
              <View 
                style={[
                  tw`h-2 rounded-full`,
                  { 
                    width: orderStatus === 'preparing' ? '33%' : 
                           orderStatus === 'on_the_way' ? '66%' : '100%',
                    backgroundColor: getStatusColor(orderStatus)
                  }
                ]} 
              />
            </View>

            {/* Timeline */}
            <View style={tw`space-y-6`}>
              {orderTimeline.map((step, index) => (
                <View key={step.id} style={tw`flex-row`}>
                  {/* Timeline Line and Dot */}
                  <View style={tw`items-center mr-4`}>
                    <View 
                      style={[
                        tw`w-8 h-8 rounded-full items-center justify-center border-2`,
                        step.completed ? { backgroundColor: getStatusColor(step.status), borderColor: getStatusColor(step.status) } :
                        step.active ? { borderColor: getStatusColor(step.status) } :
                        { borderColor: '#d1d5db' }
                      ]}
                    >
                      {step.completed ? (
                        <Icon name="check" size={16} color="#FFFFFF" />
                      ) : (
                        <Icon 
                          name={getStatusIcon(step.status)} 
                          size={16} 
                          color={step.active ? getStatusColor(step.status) : '#9ca3af'} 
                        />
                      )}
                    </View>
                    {index < orderTimeline.length - 1 && (
                      <View 
                        style={[
                          tw`w-0.5 h-12 mt-2`,
                          step.completed ? { backgroundColor: getStatusColor(step.status) } : { backgroundColor: '#e5e7eb' }
                        ]} 
                      />
                    )}
                  </View>

                  {/* Timeline Content */}
                  <View style={tw`flex-1 pb-6`}>
                    <Text style={tw`text-amber-900 font-bold text-base`}>{step.title}</Text>
                    <Text style={tw`text-amber-600 text-sm mt-1`}>{step.description}</Text>
                    <Text style={tw`text-amber-500 text-xs mt-2`}>{step.time}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Delivery Person Info */}
        {(orderStatus === 'on_the_way' || orderStatus === 'delivered') && (
          <View style={tw`mt-6`}>
            <Text style={tw`text-xl font-bold text-amber-900 mb-4`}>Delivery Partner</Text>
            <View style={tw`bg-white rounded-2xl shadow-sm border border-amber-200 p-5`}>
              <View style={tw`flex-row items-center`}>
                <Image 
                  source={{ uri: deliveryPerson.image }}
                  style={tw`w-16 h-16 rounded-full border-2 border-amber-300`}
                />
                <View style={tw`flex-1 ml-4`}>
                  <Text style={tw`text-lg font-bold text-amber-900`}>{deliveryPerson.name}</Text>
                  <View style={tw`flex-row items-center mt-1`}>
                    <Icon name="star" size={16} color="#FFD700" />
                    <Text style={tw`text-amber-700 text-sm ml-1`}>
                      {deliveryPerson.rating} • {deliveryPerson.deliveries} deliveries
                    </Text>
                  </View>
                  <Text style={tw`text-amber-600 text-sm mt-1`}>
                    {deliveryPerson.vehicle} • {deliveryPerson.vehicleNumber}
                  </Text>
                </View>
              </View>
              
              <View style={tw`flex-row mt-4`}>
                <TouchableOpacity 
                  style={tw`flex-1 bg-amber-100 rounded-xl py-3 items-center mr-2`}
                  onPress={() => console.log('Call delivery person')}
                >
                  <Icon name="phone" size={20} color="#6F4E37" />
                  <Text style={tw`text-amber-900 font-medium text-sm mt-1`}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={tw`flex-1 bg-amber-100 rounded-xl py-3 items-center ml-2`}
                  onPress={() => console.log('Message delivery person')}
                >
                  <Icon name="message" size={20} color="#6F4E37" />
                  <Text style={tw`text-amber-900 font-medium text-sm mt-1`}>Message</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Order Items */}
        <View style={tw`mt-6`}>
          <Text style={tw`text-xl font-bold text-amber-900 mb-4`}>Order Items</Text>
          <View style={tw`bg-white rounded-2xl shadow-sm border border-amber-200 overflow-hidden`}>
            {orderDetails.items.map((item, index) => (
              <View 
                key={item.id} 
                style={tw`flex-row items-center p-4 ${index < orderDetails.items.length - 1 ? 'border-b border-amber-100' : ''}`}
              >
                <Image source={{ uri: item.image }} style={tw`w-16 h-16 rounded-xl`} />
                <View style={tw`flex-1 ml-4`}>
                  <Text style={tw`text-amber-900 font-medium`}>{item.name}</Text>
                  <Text style={tw`text-amber-500 text-sm mt-1`}>
                    {item.size} • Qty: {item.quantity}
                  </Text>
                </View>
                <Text style={tw`text-amber-900 font-bold`}>₹{(item.price * item.quantity).toFixed(2)}</Text>
              </View>
            ))}
            
            {/* Order Total */}
            <View style={tw`p-4 bg-amber-50 border-t border-amber-200`}>
              <View style={tw`flex-row justify-between`}>
                <Text style={tw`text-amber-700`}>Subtotal</Text>
                <Text style={tw`text-amber-900 font-semibold`}>
                  ₹{orderDetails.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                </Text>
              </View>
              <View style={tw`flex-row justify-between mt-2`}>
                <Text style={tw`text-amber-700`}>Delivery Fee</Text>
                <Text style={tw`text-amber-900 font-semibold`}>₹49.00</Text>
              </View>
              <View style={tw`flex-row justify-between mt-2`}>
                <Text style={tw`text-amber-700`}>Tax</Text>
                <Text style={tw`text-amber-900 font-semibold`}>₹24.50</Text>
              </View>
              <View style={tw`h-px bg-amber-200 my-3`} />
              <View style={tw`flex-row justify-between`}>
                <Text style={tw`text-lg font-bold text-amber-900`}>Total</Text>
                <Text style={tw`text-lg font-bold text-amber-900`}>{orderDetails.totalAmount}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Delivery Address */}
        <View style={tw`mt-6 mb-8`}>
          <Text style={tw`text-xl font-bold text-amber-900 mb-4`}>Delivery Address</Text>
          <View style={tw`bg-white rounded-2xl shadow-sm border border-amber-200 p-5`}>
            <View style={tw`flex-row items-center mb-3`}>
              <View style={tw`w-10 h-10 rounded-full bg-amber-100 items-center justify-center mr-3`}>
                <Icon name="location-on" size={20} color="#6F4E37" />
              </View>
              <Text style={tw`text-amber-900 font-bold text-lg`}>{deliveryAddress.title}</Text>
            </View>
            <Text style={tw`text-amber-800`}>{deliveryAddress.name}</Text>
            <Text style={tw`text-amber-700 mt-2`}>
              {deliveryAddress.street}{deliveryAddress.apartment && `, ${deliveryAddress.apartment}`}
            </Text>
            <Text style={tw`text-amber-700`}>
              {deliveryAddress.city}, {deliveryAddress.state} {deliveryAddress.zipCode}
            </Text>
            <Text style={tw`text-amber-600 text-sm mt-3`}>
              <Icon name="phone" size={14} color="#6F4E37" /> {deliveryAddress.phone}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default TrackOrder