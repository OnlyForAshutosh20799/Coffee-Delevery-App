import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Modal,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import tw from "twrnc";
import { useCart } from "../../context/CartContext";
import { useNavigation } from "@react-navigation/native";
import ComponentHeader from "../../components/ComponentHeader";

const CheckoutScreen = () => {
   const { width } = useWindowDimensions();
  const navigation = useNavigation();
 
  const isTablet = width >= 768;

  const { cartItems } = useCart();
  const [orderItems, setOrderItems] = useState(cartItems);
  const [deliveryAddress, setDeliveryAddress] = useState({
    type: "home",
    title: "Home",
    name: "Aniket",
    street: "123 Coffee Street",
    apartment: "Apt 4B",
    city: "Patna",
    state: "Bihar",
    zipCode: "885469",
    phone: "+91 9876543210",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [deliveryOption, setDeliveryOption] = useState("delivery");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const deliveryFee = 2.99;
  const taxRate = 0.08;
  const discount = 1.5;

  const calculateSubtotal = () => {
    return orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  const calculateTax = () => calculateSubtotal() * taxRate;
  const calculateTotal = () =>
    calculateSubtotal() + deliveryFee + calculateTax() - discount;

  const generateOrderNumber = () =>
    "ORD" + Math.floor(100000 + Math.random() * 900000);

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: "credit-card" },
    { id: "cash", name: "Cash on Delivery", icon: "attach-money" },
  ];

  const handlePlaceOrder = () => {
    const newOrderNumber = generateOrderNumber();
    setOrderNumber(newOrderNumber);
    setShowConfirmation(true);
  };

  const handleTrackOrder = () => {
    setShowConfirmation(false);
    navigation.navigate("TrackOrder");
  };

  const handleGoBack = () => {
    setShowConfirmation(false);
    navigation.navigate("HomeTab");
  };

  // Dynamic font scaling
  const fs = (base) => (isTablet ? base * 1.4 : base);

  return (
    <View style={tw`flex-1 bg-amber-50`}>
      <ComponentHeader title="Order Summary" onBack={() => navigation.goBack()} />

      <ScrollView
        style={tw`flex-1 px-6`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: isTablet ? 40 : 20 }}
      >
        {/* Order Items */}
        <View style={tw`mt-6`}>
          <View style={tw`bg-white rounded-2xl shadow-sm border border-amber-200 p-4`}>
            {orderItems.map((item, index) => (
              <View
                key={item.id}
                style={tw`flex-row items-center py-2 ${
                  index > 0 ? "border-t border-amber-100" : ""
                }`}
              >
                <Image
                  source={{ uri: item.image }}
                  style={[
                    tw`rounded-lg`,
                    { width: isTablet ? 80 : 48, height: isTablet ? 80 : 48 },
                  ]}
                />
                <View style={tw`flex-1 ml-3`}>
                  <Text
                    style={[
                      tw`text-amber-900 font-medium`,
                      { fontSize: fs(14) },
                    ]}
                  >
                    {item.name}
                  </Text>
                  <Text style={tw`text-amber-500 text-xs`}>
                    Qty: {item.quantity}
                  </Text>
                </View>
                <Text
                  style={[
                    tw`text-amber-900 font-bold`,
                    { fontSize: fs(14) },
                  ]}
                >
                  ₹{(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Address */}
        <View style={tw`mt-6`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={[tw`font-bold text-amber-900`, { fontSize: fs(18) }]}>
              Delivery Address
            </Text>
            <TouchableOpacity>
              <Text style={tw`text-amber-700 font-semibold`}>Change</Text>
            </TouchableOpacity>
          </View>
          <View style={tw`bg-white rounded-2xl border border-amber-200 p-4`}>
            <View style={tw`flex-row items-center mb-2`}>
              <View
                style={tw`w-8 h-8 rounded-full bg-amber-100 items-center justify-center mr-2`}
              >
                <Icon name="home" size={fs(16)} color="#6F4E37" />
              </View>
              <Text
                style={[tw`text-amber-900 font-bold`, { fontSize: fs(14) }]}
              >
                {deliveryAddress.title}
              </Text>
            </View>
            <Text style={[tw`text-amber-800`, { fontSize: fs(13) }]}>
              {deliveryAddress.name}
            </Text>
            <Text style={[tw`text-amber-700`, { fontSize: fs(13) }]}>
              {deliveryAddress.street}, {deliveryAddress.city}
            </Text>
            <Text style={[tw`text-amber-700`, { fontSize: fs(13) }]}>
              {deliveryAddress.state} {deliveryAddress.zipCode}
            </Text>
            <Text style={tw`text-amber-600 text-sm mt-2`}>
              {deliveryAddress.phone}
            </Text>
          </View>
        </View>

        {/* Payment Method */}
        <View style={tw`mt-6`}>
          <Text style={[tw`font-bold text-amber-900 mb-4`, { fontSize: fs(18) }]}>
            Payment Method
          </Text>
          <View style={tw`bg-white rounded-2xl border border-amber-200`}>
            {paymentMethods.map((method, index) => (
              <TouchableOpacity
                key={method.id}
                style={tw`flex-row items-center justify-between p-4 ${
                  index > 0 ? "border-t border-amber-100" : ""
                }`}
                onPress={() => setPaymentMethod(method.id)}
              >
                <View style={tw`flex-row items-center flex-1`}>
                  <View
                    style={tw`w-10 h-10 rounded-full bg-amber-100 items-center justify-center mr-3`}
                  >
                    <Icon name={method.icon} size={fs(20)} color="#6F4E37" />
                  </View>
                  <Text style={[tw`text-amber-900`, { fontSize: fs(14) }]}>
                    {method.name}
                  </Text>
                </View>
                <View
                  style={tw`w-5 h-5 rounded-full border-2 ${
                    paymentMethod === method.id
                      ? "bg-amber-700 border-amber-700"
                      : "border-amber-300"
                  }`}
                >
                  {paymentMethod === method.id && (
                    <View style={tw`w-2 h-2 rounded-full bg-white m-auto`} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Special Instructions */}
        <View style={tw`mt-6`}>
          <Text style={[tw`font-bold text-amber-900 mb-4`, { fontSize: fs(18) }]}>
            Special Instructions
          </Text>
          <TextInput
            style={[
              tw`border-2 border-amber-200 rounded-xl px-4 py-3 text-amber-900 bg-white h-20`,
              { fontSize: fs(13) },
            ]}
            placeholder="Any special instructions for your order..."
            placeholderTextColor="#A67B5B"
            multiline
            numberOfLines={4}
            value={specialInstructions}
            onChangeText={setSpecialInstructions}
          />
        </View>

        {/* Order Summary */}
        <View style={tw`mt-6 mb-8`}>
          <Text style={[tw`font-bold text-amber-900 mb-4`, { fontSize: fs(18) }]}>
            Order Total
          </Text>
          <View style={tw`bg-white rounded-2xl border border-amber-200 p-6`}>
            <View style={tw`space-y-3`}>
              <View style={tw`flex-row justify-between`}>
                <Text style={tw`text-amber-700`}>Subtotal</Text>
                <Text style={tw`text-amber-900 font-semibold`}>
                  ₹{calculateSubtotal().toFixed(2)}
                </Text>
              </View>
              <View style={tw`flex-row justify-between`}>
                <Text style={tw`text-amber-700`}>Delivery Fee</Text>
                <Text style={tw`text-amber-900 font-semibold`}>
                  ₹{deliveryFee.toFixed(2)}
                </Text>
              </View>
              <View style={tw`flex-row justify-between`}>
                <Text style={tw`text-amber-700`}>Tax</Text>
                <Text style={tw`text-amber-900 font-semibold`}>
                  ₹{calculateTax().toFixed(2)}
                </Text>
              </View>
              <View style={tw`flex-row justify-between`}>
                <Text style={tw`text-green-600 font-medium`}>Discount</Text>
                <Text style={tw`text-green-600 font-semibold`}>
                  -₹{discount.toFixed(2)}
                </Text>
              </View>
              <View style={tw`h-px bg-amber-200 my-2`} />
              <View style={tw`flex-row justify-between`}>
                <Text
                  style={[tw`font-bold text-amber-900`, { fontSize: fs(16) }]}
                >
                  Total
                </Text>
                <Text
                  style={[tw`font-bold text-amber-900`, { fontSize: fs(16) }]}
                >
                  ₹{calculateTotal().toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Place Order */}
      <View style={tw`px-6 pb-8 pt-4 bg-amber-50 border-t border-amber-200`}>
        <TouchableOpacity
          style={tw`bg-amber-700 rounded-full py-3 shadow-lg`}
          onPress={handlePlaceOrder}
        >
          <Text
            style={[tw`text-white text-center font-bold`, { fontSize: fs(15) }]}
          >
            Place Order
          </Text>
        </TouchableOpacity>
      </View>

      {/* Confirmation Modal */}
      <Modal
        visible={showConfirmation}
        transparent
        animationType="fade"
        onRequestClose={() => setShowConfirmation(false)}
      >
        <View style={tw`flex-1 bg-black bg-opacity-50 justify-center items-center px-8`}>
          <View style={tw`bg-white rounded-3xl p-8 w-full max-w-sm`}>
            <View style={tw`items-center mb-6`}>
              <View
                style={tw`w-20 h-20 bg-green-100 rounded-full items-center justify-center`}
              >
                <Icon name="check-circle" size={fs(48)} color="#059669" />
              </View>
            </View>
            <Text
              style={[
                tw`font-bold text-amber-900 text-center mb-2`,
                { fontSize: fs(20) },
              ]}
            >
              Order Confirmed!
            </Text>
            <Text style={tw`text-amber-600 text-center mb-1`}>
              Thank you for your order
            </Text>
            <Text style={tw`text-amber-900 font-bold text-center mb-6`}>
              Order #: {orderNumber}
            </Text>
            <TouchableOpacity
              style={tw`bg-amber-700 rounded-full py-3 mb-3`}
              onPress={handleTrackOrder}
            >
              <Text
                style={[
                  tw`text-white text-center font-bold`,
                  { fontSize: fs(14) },
                ]}
              >
                Track Your Order
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`border-2 border-amber-700 rounded-full py-3`}
              onPress={handleGoBack}
            >
              <Text
                style={[
                  tw`text-amber-900 text-center font-bold`,
                  { fontSize: fs(14) },
                ]}
              >
                Continue Shopping
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CheckoutScreen;
