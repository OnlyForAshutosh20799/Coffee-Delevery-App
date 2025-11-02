import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  PixelRatio,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import tw from "twrnc";
import ComponentHeader from "../../components/ComponentHeader";
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get("window");
const scale = width / 375; // Base iPhone 11 width for scaling

const normalize = (size) => Math.round(PixelRatio.roundToNearestPixel(size * scale));

const Order = () => {
   const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("current");

  // Dummy Data
  const currentOrders = [
    {
      id: "ORD784239",
      date: "Dec 15, 2024",
      time: "10:30 AM",
      status: "on_the_way",
      statusText: "On the way",
      estimatedDelivery: "11:15 AM - 11:45 AM",
      items: [
        {
          id: 1,
          name: "Caramel Macchiato",
          price: 299,
          quantity: 2,
          image:
            "https://images.unsplash.com/photo-1561047029-3000c68339ca?auto=format&fit=crop&w=200&h=200&q=80",
        },
        {
          id: 2,
          name: "Cold Brew Coffee",
          price: 249,
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=200&h=200&q=80",
        },
      ],
      totalAmount: "₹847.00",
      deliveryAddress: "123 Coffee Street, Apt 4B, New York",
      deliveryPerson: "Rajesh Kumar",
    },
  ];

  const orderHistory = [
    {
      id: "ORD784236",
      date: "Dec 12, 2024",
      time: "8:30 AM",
      status: "delivered",
      statusText: "Delivered",
      items: [
        {
          id: 7,
          name: "Vanilla Latte",
          price: 319,
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1561047029-3000c68339ca?auto=format&fit=crop&w=200&h=200&q=80",
        },
        {
          id: 8,
          name: "Blueberry Muffin",
          price: 175,
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?auto=format&fit=crop&w=200&h=200&q=80",
        },
      ],
      totalAmount: "₹494.00",
      deliveryAddress: "123 Coffee Street, Apt 4B, New York",
      rating: 5,
      review: "Perfect start to my morning!",
    },
  ];

  // Helper functions
  const getStatusColor = (status) => {
    switch (status) {
      case "preparing":
        return "#d97706";
      case "on_the_way":
        return "#2563eb";
      case "delivered":
        return "#059669";
      case "cancelled":
        return "#dc2626";
      default:
        return "#6b7280";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "preparing":
        return "coffee";
      case "on_the_way":
        return "delivery-dining";
      case "delivered":
        return "check-circle";
      case "cancelled":
        return "cancel";
      default:
        return "schedule";
    }
  };

  const renderOrderItem = ({ item }) => (
    <View
      style={[
        tw`bg-white rounded-2xl border border-amber-200 mb-4 overflow-hidden shadow-sm`,
        { padding: normalize(10) },
      ]}
    >
      {/* Header */}
      <View style={tw`flex-row justify-between items-center pb-2 border-b border-amber-100`}>
        <View>
          <Text style={[tw`font-bold text-amber-900`, { fontSize: normalize(16) }]}>
            Order #{item.id}
          </Text>
          <Text style={[tw`text-amber-600 mt-1`, { fontSize: normalize(12) }]}>
            {item.date} • {item.time}
          </Text>
        </View>
        <View
          style={[
            tw`px-2 py-1 rounded-full flex-row items-center`,
            { backgroundColor: `${getStatusColor(item.status)}15` },
          ]}
        >
          <Icon
            name={getStatusIcon(item.status)}
            size={normalize(14)}
            color={getStatusColor(item.status)}
          />
          <Text
            style={[
              tw`ml-1 font-semibold`,
              { color: getStatusColor(item.status), fontSize: normalize(12) },
            ]}
          >
            {item.statusText}
          </Text>
        </View>
      </View>

      {/* Items */}
      <View style={{ marginTop: normalize(8) }}>
        {item.items.map((product) => (
          <View key={product.id} style={tw`flex-row items-center mb-3`}>
            <Image
              source={{ uri: product.image }}
              style={{
                width: normalize(60),
                height: normalize(60),
                borderRadius: normalize(12),
              }}
            />
            <View style={tw`flex-1 ml-3`}>
              <Text style={[tw`font-medium text-amber-900`, { fontSize: normalize(14) }]}>
                {product.name}
              </Text>
              <Text style={[tw`text-amber-600 mt-1`, { fontSize: normalize(12) }]}>
                Qty: {product.quantity}
              </Text>
            </View>
            <Text style={[tw`font-bold text-amber-900`, { fontSize: normalize(14) }]}>
              ₹{(product.price * product.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      {/* Footer */}
      <View
        style={[
          tw`border-t border-amber-100 bg-amber-50 mt-3`,
          { paddingVertical: normalize(8), paddingHorizontal: normalize(4) },
        ]}
      >
        <View style={tw`flex-row justify-between mb-2`}>
          <Text style={[tw`text-amber-700`, { fontSize: normalize(13) }]}>
            Total Amount
          </Text>
          <Text style={[tw`font-bold text-amber-900`, { fontSize: normalize(15) }]}>
            {item.totalAmount}
          </Text>
        </View>

        {/* Review or Delivery Info */}
        {activeTab === "history" && item.rating ? (
          <View style={tw`mt-2`}>
            <View style={tw`flex-row`}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Icon
                  key={star}
                  name="star"
                  size={normalize(14)}
                  color={star <= item.rating ? "#FFD700" : "#E5E7EB"}
                />
              ))}
            </View>
            <Text style={[tw`text-amber-600 mt-1`, { fontSize: normalize(12) }]}>
              {item.review}
            </Text>
          </View>
        ) : (
          activeTab === "current" && (
            <Text style={[tw`text-amber-600 mt-2`, { fontSize: normalize(12) }]}>
              Estimated delivery: {item.estimatedDelivery}
            </Text>
          )
        )}

        {/* Action Buttons */}
        <View style={tw`flex-row mt-3`}>
          <TouchableOpacity
            style={[
              tw`flex-1 border-2 border-amber-700 rounded-xl py-2 mr-2`,
              { paddingVertical: normalize(6) },
            ]}
          >
            <Text
              style={[tw`text-center text-amber-900 font-semibold`, { fontSize: normalize(13) }]}
            >
              {activeTab === "current" ? "Track Order" : "Reorder"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              tw`flex-1 border-2 border-amber-700 rounded-xl py-2`,
              { paddingVertical: normalize(6) },
            ]}
          >
            <Text
              style={[tw`text-center text-amber-900 font-semibold`, { fontSize: normalize(13) }]}
            >
              {activeTab === "current" ? "Need Help?" : "Rate & Review"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={tw`flex-1 bg-amber-50`}>
      {/* Header */}
      <ComponentHeader title = 'My Orders' onBack={()=> navigation.goBack()} />

      {/* Tabs */}
      <View style={tw`flex-row bg-white border-b border-amber-200`}>
        {["current", "history"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              tw`flex-1 py-3 items-center`,
              activeTab === tab ? tw`border-b-2 border-amber-700` : null,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                tw`font-semibold`,
                {
                  color: activeTab === tab ? "#78350f" : "#a16207",
                  fontSize: normalize(14),
                },
              ]}
            >
              {tab === "current" ? "Current Orders" : "Order History"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Orders */}
      <FlatList
        data={activeTab === "current" ? currentOrders : orderHistory}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`p-4`}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Order;
