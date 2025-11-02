import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  PixelRatio,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import tw from 'twrnc';
import { useCart } from '../../context/CartContext';
import { useNavigation } from '@react-navigation/native';
import ComponentHeader from '../../components/ComponentHeader';

const { width } = Dimensions.get('window');

// ✅ Responsive scaling function
const scale = width / 375;
const normalize = size => Math.round(PixelRatio.roundToNearestPixel(size * scale));

const Cart = () => {
  const navigation = useNavigation();
  const { cartItems, removeFromCart, addToCart } = useCart();
  const deliveryFee = 2.99;
  const taxRate = 0.08;

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  const calculateTax = () => calculateSubtotal() * taxRate;
  const calculateTotal = () => calculateSubtotal() + deliveryFee + calculateTax();

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      Alert.alert('Remove Item', 'Do you want to remove this item?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => removeFromCart(itemId),
        },
      ]);
    } else {
      const item = cartItems.find(i => i.id === itemId);
      if (item) addToCart(item, newQuantity - item.quantity);
    }
  };

  const handleCheckout = () => {
    navigation.navigate('CheckOut');
  };

  // ✅ Tablet check
  const isTablet = width >= 768;

  if (cartItems.length === 0) {
    return (
      <View style = {tw `flex-1 bg-amber-50`}>
       <ComponentHeader title="My Cart" onBack={() => navigation.goBack()} />  
      <View style={tw`flex-1 bg-amber-50 justify-center items-center px-8`}>
        <Icon
          name="shopping-cart"
          size={isTablet ? 70 : 50}
          color="#A67B5B"
        />
        <Text
          style={{
            fontSize: normalize(isTablet ? 24 : 20),
            fontWeight: 'bold',
            color: '#78350F',
            marginTop: 10,
            textAlign: 'center',
          }}
        >
          Your Cart is Empty
        </Text>
        <Text
          style={{
            fontSize: normalize(isTablet ? 18 : 14),
            color: '#92400E',
            textAlign: 'center',
            marginTop: 8,
            lineHeight: normalize(20),
          }}
        >
          Looks like you haven't added any items yet. Start exploring our delicious coffee and treats!
        </Text>
      </View>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-amber-50`}>
      {/* ✅ Reusable Header */}
      <ComponentHeader title="My Cart" onBack={() => navigation.goBack()} />

      <ScrollView
        style={tw`flex-1`}
        contentContainerStyle={{ paddingHorizontal: isTablet ? 40 : 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 🏠 Delivery Info */}
        <View style={tw`flex-row justify-between items-center mt-4`}>
          <View style={{ flex: 1, paddingRight: 10 }}>
            <Text
              style={{
                color: '#92400E',
                fontSize: normalize(isTablet ? 16 : 13),
              }}
            >
              Deliver to: Ashutosh Singh, 275203
            </Text>
            <Text
              style={{
                color: '#92400E',
                fontSize: normalize(isTablet ? 15 : 12),
              }}
              numberOfLines={1}
            >
              Near Sunshine College, Jakhanian, Ghazipur...
            </Text>
          </View>
          <TouchableOpacity
            style={tw`border border-amber-500 px-3 py-1 rounded-md`}
          >
            <Text
              style={{
                fontSize: normalize(isTablet ? 14 : 12),
                color: '#78350F',
                fontWeight: '500',
              }}
            >
              Change
            </Text>
          </TouchableOpacity>
        </View>

        {/* 🛒 Cart Items */}
        <View style={tw`mt-6`}>
          {cartItems.map(item => (
            <View
              key={item.id}
              style={[
                tw`border border-amber-200 bg-white rounded-2xl flex-row mb-4 shadow-sm`,
                { padding: isTablet ? 20 : 12 },
              ]}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  width: isTablet ? 120 : 80,
                  height: isTablet ? 120 : 80,
                  borderRadius: 15,
                }}
                resizeMode="cover"
              />
              <View style={[tw`flex-1 ml-4 justify-between`]}>
                <View>
                  <Text
                    style={{
                      fontSize: normalize(isTablet ? 18 : 15),
                      fontWeight: 'bold',
                      color: '#78350F',
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: normalize(isTablet ? 15 : 12),
                      color: '#92400E',
                      marginTop: 4,
                    }}
                    numberOfLines={2}
                  >
                    {item.description}
                  </Text>
                  {item.size && (
                    <Text
                      style={{
                        fontSize: normalize(isTablet ? 13 : 11),
                        color: '#B45309',
                        marginTop: 3,
                      }}
                    >
                      Size: {item.size}
                    </Text>
                  )}
                </View>

                <Text
                  style={{
                    fontSize: normalize(isTablet ? 18 : 15),
                    fontWeight: 'bold',
                    color: '#78350F',
                    marginTop: 4,
                  }}
                >
                  ₹{item.price}
                </Text>
              </View>

              {/* Quantity Controller */}
              <View style={tw`items-end justify-between`}>
                <TouchableOpacity
                  style={tw`p-1`}
                  onPress={() => updateQuantity(item.id, 0)}
                >
                  <Icon name="close" size={isTablet ? 26 : 20} color="#DC2626" />
                </TouchableOpacity>

                <View
                  style={[
                    tw`flex-row items-center bg-amber-100 rounded-full`,
                    { paddingVertical: 4, paddingHorizontal: 10 },
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Icon name="remove" size={isTablet ? 24 : 18} color="#6F4E37" />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: normalize(isTablet ? 16 : 13),
                      color: '#78350F',
                      fontWeight: 'bold',
                      marginHorizontal: 8,
                    }}
                  >
                    {item.quantity}
                  </Text>
                  <TouchableOpacity
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Icon name="add" size={isTablet ? 24 : 18} color="#6F4E37" />
                  </TouchableOpacity>
                </View>

                <Text
                  style={{
                    fontSize: normalize(isTablet ? 18 : 14),
                    fontWeight: 'bold',
                    color: '#78350F',
                    marginTop: 4,
                  }}
                >
                  ₹{(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* 💰 Price Summary */}
        <View
          style={[
            tw`bg-white rounded-2xl border border-amber-200 mt-2 mb-6 shadow-sm`,
            { padding: isTablet ? 24 : 16 },
          ]}
        >
          <Text
            style={{
              fontSize: normalize(isTablet ? 20 : 16),
              fontWeight: 'bold',
              color: '#78350F',
              marginBottom: 12,
            }}
          >
            Price Details
          </Text>

          {[
            ['Subtotal', calculateSubtotal()],
            ['Delivery Fee', deliveryFee],
            ['Tax', calculateTax()],
          ].map(([label, value]) => (
            <View
              key={label}
              style={tw`flex-row justify-between py-1`}
            >
              <Text
                style={{
                  fontSize: normalize(isTablet ? 16 : 14),
                  color: '#92400E',
                }}
              >
                {label}
              </Text>
              <Text
                style={{
                  fontSize: normalize(isTablet ? 16 : 14),
                  color: '#78350F',
                  fontWeight: '600',
                }}
              >
                ₹{value.toFixed(2)}
              </Text>
            </View>
          ))}

          <View style={tw`h-px bg-amber-200 my-3`} />

          <View style={tw`flex-row justify-between`}>
            <Text
              style={{
                fontSize: normalize(isTablet ? 18 : 16),
                fontWeight: 'bold',
                color: '#78350F',
              }}
            >
              Total
            </Text>
            <Text
              style={{
                fontSize: normalize(isTablet ? 18 : 16),
                fontWeight: 'bold',
                color: '#78350F',
              }}
            >
              ₹{calculateTotal().toFixed(2)}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* 🧾 Checkout Button */}
      <View
        style={[
          tw`bg-amber-50 border-t border-amber-200`,
          { paddingHorizontal: isTablet ? 40 : 20, paddingVertical: 12 },
        ]}
      >
        <TouchableOpacity
          style={[
            tw`bg-amber-700 rounded-full shadow-lg`,
            { paddingVertical: isTablet ? 14 : 10 },
          ]}
          onPress={handleCheckout}
        >
          <Text
            style={{
              color: '#fff',
              fontSize: normalize(isTablet ? 18 : 15),
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            Proceed to Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;
