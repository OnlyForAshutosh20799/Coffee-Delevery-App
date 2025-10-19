import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, Alert, Modal } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import tw from 'twrnc'
import { useCart } from '../../context/cartContext'; 
import { useNavigation } from '@react-navigation/native';

const CheckoutScreen = () => {
      const navigation = useNavigation();
  const { cartItems } = useCart();
  console.log("Cart items", cartItems)
  const [orderItems, setOrderItems] = useState(cartItems)
  console.log("dfhlsdf", orderItems)
  const [deliveryAddress, setDeliveryAddress] = useState({
    type: 'home',
    title: 'Home',
    name: 'Aniket',
    street: '123 Coffee Street',
    apartment: 'Apt 4B',
    city: 'Patna',
    state: 'Bihar',
    zipCode: '885469',
    phone: '+91 9876543210'
  })

  const [paymentMethod, setPaymentMethod] = useState('card')
  const [deliveryOption, setDeliveryOption] = useState('delivery')
  const [specialInstructions, setSpecialInstructions] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')

  const deliveryFee = 2.99
  const taxRate = 0.08
  const discount = 1.50 // Example discount

  const calculateSubtotal = () => {
    return orderItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const calculateTax = () => {
    return calculateSubtotal() * taxRate
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    const tax = calculateTax()
    return subtotal + deliveryFee + tax - discount
  }

  const generateOrderNumber = () => {
    return 'ORD' + Math.floor(100000 + Math.random() * 900000)
  }

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: 'credit-card' },
    { id: 'cash', name: 'Cash on Delivery', icon: 'attach-money' }
  ]

  const deliveryOptions = [
    { id: 'delivery', name: 'Home Delivery', time: '25-35 min', price: deliveryFee, icon: 'delivery-dining' },
    { id: 'pickup', name: 'Store Pickup', time: '15-20 min', price: 0, icon: 'store' }
  ]

  const handlePlaceOrder = () => {
    const newOrderNumber = generateOrderNumber()
    setOrderNumber(newOrderNumber)
    setShowConfirmation(true)
  }

  const handleTrackOrder = () => {
    setShowConfirmation(false)
    navigation.navigate('TrackOrder')
  }

  const handleGoBack = () => {
    setShowConfirmation(false)
    // Navigate back to home or previous screen
    console.log('Navigate back to home')
  }

  return (
    <View style={tw`flex-1 bg-amber-50`}>
      <ScrollView style={tw`flex-1 px-6`} showsVerticalScrollIndicator={false}>
        {/* Order Items Summary */}
        <View style={tw`mt-6`}>
          <Text style={tw`text-xl font-bold text-amber-900 mb-4`}>Order Summary</Text>
          <View style={tw`bg-white rounded-2xl shadow-sm border border-amber-200 p-4`}>
            {orderItems.map((item, index) => (
              <View key={item.id} style={tw`flex-row items-center py-2 ${index > 0 ? 'border-t border-amber-100' : ''}`}>
                <Image source={{ uri: item.image }} style={tw`w-12 h-12 rounded-lg`} />
                <View style={tw`flex-1 ml-3`}>
                  <Text style={tw`text-amber-900 font-medium`}>{item.name}</Text>
                  <Text style={tw`text-amber-500 text-xs`}> Qty: {item.quantity}</Text>
                </View>
                <Text style={tw`text-amber-900 font-bold`}>₹{(item.price * item.quantity).toFixed(2)}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Delivery Address */}
        <View style={tw`mt-6`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-xl font-bold text-amber-900`}>Delivery Address</Text>
            <TouchableOpacity>
              <Text style={tw`text-amber-700 font-semibold`}>Change</Text>
            </TouchableOpacity>
          </View>
          <View style={tw`bg-white rounded-2xl shadow-sm border border-amber-200 p-4`}>
            <View style={tw`flex-row items-center mb-2`}>
              <View style={tw`w-8 h-8 rounded-full bg-amber-100 items-center justify-center mr-2`}>
                <Icon name="home" size={16} color="#6F4E37" />
              </View>
              <Text style={tw`text-amber-900 font-bold`}>{deliveryAddress.title}</Text>
              {deliveryAddress.type === 'home' && (
                <View style={tw`bg-amber-600 px-2 py-1 rounded-full ml-2`}>
                  <Text style={tw`text-xs text-white font-semibold`}>DEFAULT</Text>
                </View>
              )}
            </View>
            <Text style={tw`text-amber-800`}>{deliveryAddress.name}</Text>
            <Text style={tw`text-amber-700 mt-1`}>
              {deliveryAddress.street}{deliveryAddress.apartment && `, ${deliveryAddress.apartment}`}
            </Text>
            <Text style={tw`text-amber-700`}>
              {deliveryAddress.city}, {deliveryAddress.state} {deliveryAddress.zipCode}
            </Text>
            <Text style={tw`text-amber-600 text-sm mt-2`}>{deliveryAddress.phone}</Text>
          </View>
        </View>

        {/* Payment Method */}
        <View style={tw`mt-6`}>
          <Text style={tw`text-xl font-bold text-amber-900 mb-4`}>Payment Method</Text>
          <View style={tw`bg-white rounded-2xl shadow-sm border border-amber-200 overflow-hidden`}>
            {paymentMethods.map((method, index) => (
              <TouchableOpacity
                key={method.id}
                style={tw`flex-row items-center justify-between p-4 ${index > 0 ? 'border-t border-amber-100' : ''}`}
                onPress={() => setPaymentMethod(method.id)}
              >
                <View style={tw`flex-row items-center flex-1`}>
                  <View style={tw`w-10 h-10 rounded-full bg-amber-100 items-center justify-center mr-3`}>
                    <Icon name={method.icon} size={20} color="#6F4E37" />
                  </View>
                  <Text style={tw`text-amber-900 font-medium`}>{method.name}</Text>
                </View>
                <View style={tw`w-5 h-5 rounded-full border-2 ${paymentMethod === method.id ? 'bg-amber-700 border-amber-700' : 'border-amber-300'}`}>
                  {paymentMethod === method.id && (
                    <View style={tw`w-2 h-2 rounded-full bg-white m-auto`} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Card Details (if card selected) */}
        {paymentMethod === 'card' && (
          <View style={tw`mt-6`}>
            <Text style={tw`text-xl font-bold text-amber-900 mb-4`}>Card Details</Text>
            <View style={tw`bg-white rounded-2xl shadow-sm border border-amber-200 p-4`}>
              <View style={tw`mb-4`}>
                <Text style={tw`text-amber-700 font-medium mb-2`}>Card Number</Text>
                <TextInput
                  style={tw`border-2 border-amber-200 rounded-xl px-4 py-3 text-amber-900 bg-amber-50`}
                  placeholder="1234 5678 9012 3456"
                  placeholderTextColor="#A67B5B"
                  keyboardType="number-pad"
                />
              </View>
              <View style={tw`flex-row`}>
                <View style={tw`flex-1 mr-3`}>
                  <Text style={tw`text-amber-700 font-medium mb-2`}>Expiry Date</Text>
                  <TextInput
                    style={tw`border-2 border-amber-200 rounded-xl px-4 py-3 text-amber-900 bg-amber-50`}
                    placeholder="MM/YY"
                    placeholderTextColor="#A67B5B"
                  />
                </View>
                <View style={tw`flex-1 ml-3`}>
                  <Text style={tw`text-amber-700 font-medium mb-2`}>CVV</Text>
                  <TextInput
                    style={tw`border-2 border-amber-200 rounded-xl px-4 py-3 text-amber-900 bg-amber-50`}
                    placeholder="123"
                    placeholderTextColor="#A67B5B"
                    keyboardType="number-pad"
                  />
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Special Instructions */}
        <View style={tw`mt-6`}>
          <Text style={tw`text-xl font-bold text-amber-900 mb-4`}>Special Instructions</Text>
          <TextInput
            style={tw`border-2 border-amber-200 rounded-xl px-4 py-3 text-amber-900 bg-white h-20 text-align-vertical-top`}
            placeholder="Any special instructions for your order..."
            placeholderTextColor="#A67B5B"
            multiline
            numberOfLines={4}
            value={specialInstructions}
            onChangeText={setSpecialInstructions}
          />
        </View>

        {/* Order Total */}
        <View style={tw`mt-6 mb-8`}>
          <Text style={tw`text-xl font-bold text-amber-900 mb-4`}>Order Total</Text>
          <View style={tw`bg-white rounded-2xl shadow-sm border border-amber-200 p-6`}>
            <View style={tw`space-y-3`}>
              <View style={tw`flex-row justify-between`}>
                <Text style={tw`text-amber-700`}>Subtotal</Text>
                <Text style={tw`text-amber-900 font-semibold`}>₹{calculateSubtotal().toFixed(2)}</Text>
              </View>
              
              <View style={tw`flex-row justify-between`}>
                <Text style={tw`text-amber-700`}>Delivery Fee</Text>
                <Text style={tw`text-amber-900 font-semibold`}>₹{deliveryFee.toFixed(2)}</Text>
              </View>
              
              <View style={tw`flex-row justify-between`}>
                <Text style={tw`text-amber-700`}>Tax</Text>
                <Text style={tw`text-amber-900 font-semibold`}>₹{calculateTax().toFixed(2)}</Text>
              </View>

              <View style={tw`flex-row justify-between`}>
                <Text style={tw`text-green-600 font-medium`}>Discount</Text>
                <Text style={tw`text-green-600 font-semibold`}>-₹{discount.toFixed(2)}</Text>
              </View>
              
              <View style={tw`h-px bg-amber-200 my-2`} />
              
              <View style={tw`flex-row justify-between`}>
                <Text style={tw`text-lg font-bold text-amber-900`}>Total</Text>
                <Text style={tw`text-lg font-bold text-amber-900`}>₹{calculateTotal().toFixed(2)}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Place Order Button */}
      <View style={tw`px-6 pb-8 pt-4 bg-amber-50 border-t border-amber-200`}>
        <TouchableOpacity 
          style={tw`bg-amber-700 rounded-2xl py-2 shadow-lg`}
          onPress={handlePlaceOrder}
        >
          <Text style={tw`text-white text-center text-md font-bold`}>
            Place Order 
          </Text>
        </TouchableOpacity>
      </View>

      {/* Order Confirmation Modal */}
      <Modal
        visible={showConfirmation}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowConfirmation(false)}
      >
        <View style={tw`flex-1 bg-black bg-opacity-50 justify-center items-center px-8`}>
          <View style={tw`bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl`}>
            {/* Success Icon */}
            <View style={tw`items-center mb-6`}>
              <View style={tw`w-20 h-20 bg-green-100 rounded-full items-center justify-center`}>
                <Icon name="check-circle" size={48} color="#059669" />
              </View>
            </View>

            {/* Order Confirmation Text */}
            <Text style={tw`text-2xl font-bold text-amber-900 text-center mb-2`}>
              Order Confirmed!
            </Text>
            
            <Text style={tw`text-amber-600 text-center text-base mb-1`}>
              Thank you for your order
            </Text>
            
            <Text style={tw`text-amber-900 font-bold text-center text-lg mb-6`}>
              Order #: {orderNumber}
            </Text>

            {/* Order Details */}
            <View style={tw`bg-amber-50 rounded-2xl p-4 mb-6`}>
              <View style={tw`flex-row justify-between mb-2`}>
                <Text style={tw`text-amber-700`}>Total Amount:</Text>
                <Text style={tw`text-amber-900 font-bold`}>₹{calculateTotal().toFixed(2)}</Text>
              </View>
              <View style={tw`flex-row justify-between mb-2`}>
                <Text style={tw`text-amber-700`}>Payment:</Text>
                <Text style={tw`text-amber-900 font-medium`}>
                  {paymentMethod === 'card' ? 'Credit/Debit Card' : 'Cash on Delivery'}
                </Text>
              </View>
              <View style={tw`flex-row justify-between`}>
                <Text style={tw`text-amber-700`}>Delivery:</Text>
                <Text style={tw`text-amber-900 font-medium`}>
                  {deliveryOption === 'delivery' ? 'Home Delivery' : 'Store Pickup'}
                </Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={tw`space-y-3 flex-col gap-3`}>
              <TouchableOpacity 
                style={tw`bg-amber-700 rounded-full py-2 shadow-lg`}
                onPress={handleTrackOrder}
              >
                <Text style={tw`text-white text-center text-md font-bold`}>
                  Track Your Order
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={tw`border-2 border-amber-700 rounded-full py-2`}
                onPress={handleGoBack}
              >
                <Text style={tw`text-amber-900 text-center text-md font-bold`}>
                  Continue Shopping
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default CheckoutScreen