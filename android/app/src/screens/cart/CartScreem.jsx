import { Text, View, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import tw from 'twrnc';
import { useCart } from '../../context/CartContext'; 
import { useNavigation } from '@react-navigation/native';
const Cart = () => {
    const navigation = useNavigation();
  const { cartItems, removeFromCart, addToCart } = useCart(); // Access cartItems, removeFromCart, and addToCart
  const deliveryFee = 2.99;
  const taxRate = 0.08;

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * taxRate;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + deliveryFee + calculateTax();
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      Alert.alert(
        'Remove Item',
        'Are you sure you want to remove this item from cart?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Remove',
            style: 'destructive',
            onPress: () => {
              removeFromCart(itemId);
              Alert.alert('Success', 'Item removed from cart');
            },
          },
        ]
      );
    } else {
      const item = cartItems.find(i => i.id === itemId);
      if (item) {
        addToCart(item, newQuantity - item.quantity); // Update quantity by calculating difference
      }
    }
  };

  const handleCheckout = () => {
    navigation.navigate('CheckOut')
  };

  if (cartItems.length === 0) {
    return (
      <View style={tw`flex-1 bg-amber-50 justify-center items-center px-8`}>
        <Icon name="shopping-cart" size={50} color="#A67B5B" />
        <Text style={tw`text-2xl font-bold text-amber-900 mt-2 text-center`}>
          Your Cart is Empty
        </Text>
        <Text style={tw`text-amber-600 text-center mt-3 text-base leading-6`}>
          Looks like you haven't added any items to your cart yet. Start exploring our delicious coffee and treats!
        </Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-amber-50`}>
      <ScrollView style={tw`flex-1 px-6`} showsVerticalScrollIndicator={false}>
        <View>
        <Text style={tw`text-xl font-semibold text-amber-900`}>My Cart</Text>
        <View style={tw`flex-row justify-between items-center`}>
          <View>
          <Text style={tw`text-amber-700`}>Delever to:  Ashutohs singh, 275203</Text>
          <Text style={tw`text-amber-700`}>Near Sunsine Collage Jakhanian Ghazipur....</Text>
          </View>
          <View style={tw`border items-center justify-center px-2 py-1 rounded-md border-amber-500`}>
            <Text style={tw`text-[13px] text-amber-800`}>Change</Text>
          </View>
        </View>
        </View>
        <View style={tw`mt-6`}>
          {cartItems.map((item, index) => (
            <View
              key={item.id}
              style={tw`border border-amber-200 p-4 flex-row`}
            >
              <Image
                source={{ uri: item.image }}
                style={tw`w-20 h-20 rounded-xl`}
              />
              <View style={tw`flex-1 ml-4 justify-between`}>
                <View>
                  <Text style={tw`text-lg font-bold text-amber-900`}>{item.name}</Text>
                  <Text style={tw`text-amber-600 text-sm mt-1`} numberOfLines={2}>
                    {item.description}
                  </Text>
                  <Text style={tw`text-amber-500 text-xs mt-1`}>Size: {item.size}</Text>
                </View>
                <Text style={tw`text-amber-800 font-bold text-lg`}>{item.price}</Text>
              </View>
              <View style={tw`items-end justify-between`}>
                <TouchableOpacity
                  style={tw`p-1`}
                  onPress={() => updateQuantity(item.id, 0)}
                >
                  <Icon name="close" size={20} color="#DC2626" />
                </TouchableOpacity>
                <View style={tw`flex-row items-center bg-amber-100 rounded-full px-3 py-1`}>
                  <TouchableOpacity
                    onPress={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Icon name="remove" size={20} color="#6F4E37" />
                  </TouchableOpacity>
                  <Text style={tw`text-amber-900 font-bold mx-3`}>{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Icon name="add" size={20} color="#6F4E37" />
                  </TouchableOpacity>
                </View>
                <Text style={tw`text-amber-900 font-bold mt-2`}>
                  ₹{(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
        </View>
        <View style={tw`bg-white rounded-2xl shadow-sm border border-amber-200 my-4 p-6 mb-6`}>
          <Text style={tw`text-xl font-bold text-amber-900 mb-4`}>Price Detail</Text>
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
            <View style={tw`h-px bg-amber-200 my-2`} />
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-lg font-bold text-amber-900`}>Total</Text>
              <Text style={tw`text-lg font-bold text-amber-900`}>₹{calculateTotal().toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={tw`px-6 pb-3 pt-4 bg-amber-50 border-t border-amber-200`}>
        <TouchableOpacity
          style={tw`bg-amber-700 rounded-full py-2 shadow-lg`}
          onPress={handleCheckout}
        >
          <Text style={tw`text-white text-center text-md font-bold`}>
            Proceed to Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;