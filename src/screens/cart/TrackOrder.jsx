import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import tw from "twrnc";

const TrackOrder = () => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  // Helper for responsive font and spacing
  const scale = (size) => (isTablet ? size * 1.4 : size);

  const [orderStatus, setOrderStatus] = useState("preparing");

  const orderDetails = {
    orderNumber: "ORD784239",
    orderDate: "Dec 15, 2024 - 10:30 AM",
    estimatedDelivery: "11:15 AM - 11:45 AM",
    totalAmount: "₹1,247.50",
    items: [
      {
        id: 1,
        name: "Caramel Macchiato",
        price: 299,
        quantity: 2,
        size: "Medium",
        image:
          "https://images.unsplash.com/photo-1561047029-3000c68339ca?auto=format&fit=crop&w=200&h=200&q=80",
      },
      {
        id: 2,
        name: "Cold Brew Coffee",
        price: 249,
        quantity: 1,
        size: "Large",
        image:
          "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=200&h=200&q=80",
      },
      {
        id: 3,
        name: "Blueberry Muffin",
        price: 175,
        quantity: 1,
        size: "Regular",
        image:
          "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?auto=format&fit=crop&w=200&h=200&q=80",
      },
    ],
  };

  const deliveryPerson = {
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    vehicle: "Motorcycle",
    vehicleNumber: "DL 01 AB 1234",
    rating: 4.8,
    deliveries: 1247,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80",
  };

  const deliveryAddress = {
    type: "home",
    title: "Home",
    name: "Sarah Miller",
    street: "123 Coffee Street",
    apartment: "Apt 4B",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    phone: "+1 (555) 123-4567",
  };

  const orderTimeline = [
    {
      id: 1,
      status: "confirmed",
      title: "Order Confirmed",
      description: "Your order has been confirmed",
      time: "10:30 AM",
      completed: true,
      active: false,
    },
    {
      id: 2,
      status: "preparing",
      title: "Preparing Your Order",
      description: "Our barista is preparing your coffee",
      time: "10:35 AM",
      completed: orderStatus !== "confirmed",
      active: orderStatus === "preparing",
    },
    {
      id: 3,
      status: "on_the_way",
      title: "Out for Delivery",
      description: "Your order is on the way",
      time:
        orderStatus === "on_the_way" || orderStatus === "delivered"
          ? "10:50 AM"
          : "Estimated 10:50 AM",
      completed: orderStatus === "delivered" || orderStatus === "on_the_way",
      active: orderStatus === "on_the_way",
    },
    {
      id: 4,
      status: "delivered",
      title: "Order Delivered",
      description: "Your order has been delivered",
      time:
        orderStatus === "delivered" ? "11:15 AM" : "Estimated 11:15 AM",
      completed: orderStatus === "delivered",
      active: orderStatus === "delivered",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "#059669";
      case "preparing":
        return "#d97706";
      case "on_the_way":
        return "#2563eb";
      case "delivered":
        return "#7c3aed";
      default:
        return "#6b7280";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return "check-circle";
      case "preparing":
        return "coffee";
      case "on_the_way":
        return "delivery-dining";
      case "delivered":
        return "done-all";
      default:
        return "schedule";
    }
  };

  return (
    <View style={tw`flex-1 bg-amber-50`}>
      {/* Header */}
      <View
        style={[
          tw`bg-amber-100 flex-row justify-between items-center`,
          { paddingTop: isTablet ? 60 : 44, paddingHorizontal: scale(20), paddingBottom: scale(20) },
        ]}
      >
        <View>
          <Text
            style={[
              tw`font-bold text-amber-900`,
              { fontSize: scale(22) },
            ]}
          >
            Track Order
          </Text>
          <Text
            style={[
              tw`text-amber-800`,
              { fontSize: scale(13) },
            ]}
          >
            Order #{orderDetails.orderNumber}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            tw`bg-amber-700 rounded-full`,
            { paddingVertical: scale(6), paddingHorizontal: scale(14) },
          ]}
        >
          <Text
            style={[
              tw`text-amber-50 font-semibold`,
              { fontSize: scale(13) },
            ]}
          >
            Help
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={[tw`flex-1`, { paddingHorizontal: scale(20) }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Order Status Card */}
        <View style={tw`mt-6`}>
          <View
            style={[
              tw`bg-white rounded-2xl border border-amber-200 shadow-lg`,
              { padding: scale(20) },
            ]}
          >
            {/* Header */}
            <View style={tw`flex-row items-center justify-between mb-4`}>
              <View>
                <Text
                  style={[
                    tw`font-bold text-amber-900`,
                    { fontSize: scale(16) },
                  ]}
                >
                  {orderStatus === "preparing" && "Preparing Your Order"}
                  {orderStatus === "on_the_way" && "On The Way"}
                  {orderStatus === "delivered" && "Order Delivered"}
                </Text>
                <Text
                  style={[
                    tw`text-amber-600 mt-1`,
                    { fontSize: scale(12) },
                  ]}
                >
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
                    width:
                      orderStatus === "preparing"
                        ? "33%"
                        : orderStatus === "on_the_way"
                        ? "66%"
                        : "100%",
                    backgroundColor: getStatusColor(orderStatus),
                  },
                ]}
              />
            </View>

            {/* Timeline */}
            <View style={tw`space-y-6`}>
              {orderTimeline.map((step, index) => (
                <View key={step.id} style={tw`flex-row`}>
                  {/* Dot + Line */}
                  <View style={tw`items-center mr-4`}>
                    <View
                      style={[
                        tw`w-8 h-8 rounded-full items-center justify-center border-2`,
                        step.completed
                          ? {
                              backgroundColor: getStatusColor(step.status),
                              borderColor: getStatusColor(step.status),
                            }
                          : step.active
                          ? { borderColor: getStatusColor(step.status) }
                          : { borderColor: "#d1d5db" },
                      ]}
                    >
                      {step.completed ? (
                        <Icon name="check" size={scale(14)} color="#fff" />
                      ) : (
                        <Icon
                          name={getStatusIcon(step.status)}
                          size={scale(14)}
                          color={
                            step.active
                              ? getStatusColor(step.status)
                              : "#9ca3af"
                          }
                        />
                      )}
                    </View>
                    {index < orderTimeline.length - 1 && (
                      <View
                        style={[
                          tw`w-0.5 h-12 mt-2`,
                          {
                            backgroundColor: step.completed
                              ? getStatusColor(step.status)
                              : "#e5e7eb",
                          },
                        ]}
                      />
                    )}
                  </View>

                  {/* Text */}
                  <View style={tw`flex-1 pb-6`}>
                    <Text
                      style={[
                        tw`font-bold text-amber-900`,
                        { fontSize: scale(14) },
                      ]}
                    >
                      {step.title}
                    </Text>
                    <Text
                      style={[
                        tw`text-amber-600 mt-1`,
                        { fontSize: scale(12) },
                      ]}
                    >
                      {step.description}
                    </Text>
                    <Text
                      style={[
                        tw`text-amber-500 mt-2`,
                        { fontSize: scale(10) },
                      ]}
                    >
                      {step.time}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Delivery Person Section */}
        {(orderStatus === "on_the_way" || orderStatus === "delivered") && (
          <View style={tw`mt-6`}>
            <Text
              style={[
                tw`font-bold text-amber-900 mb-4`,
                { fontSize: scale(18) },
              ]}
            >
              Delivery Partner
            </Text>
            <View
              style={[
                tw`bg-white rounded-2xl border border-amber-200 shadow-sm`,
                { padding: scale(20) },
              ]}
            >
              <View style={tw`flex-row items-center`}>
                <Image
                  source={{ uri: deliveryPerson.image }}
                  style={{
                    width: scale(60),
                    height: scale(60),
                    borderRadius: scale(30),
                  }}
                />
                <View style={tw`flex-1 ml-4`}>
                  <Text
                    style={[
                      tw`font-bold text-amber-900`,
                      { fontSize: scale(16) },
                    ]}
                  >
                    {deliveryPerson.name}
                  </Text>
                  <View style={tw`flex-row items-center mt-1`}>
                    <Icon
                      name="star"
                      size={scale(14)}
                      color="#FFD700"
                    />
                    <Text
                      style={[
                        tw`text-amber-700 ml-1`,
                        { fontSize: scale(12) },
                      ]}
                    >
                      {deliveryPerson.rating} • {deliveryPerson.deliveries}{" "}
                      deliveries
                    </Text>
                  </View>
                  <Text
                    style={[
                      tw`text-amber-600 mt-1`,
                      { fontSize: scale(12) },
                    ]}
                  >
                    {deliveryPerson.vehicle} • {deliveryPerson.vehicleNumber}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default TrackOrder;
