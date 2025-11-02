import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Dimensions,
  Animated,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import tw from "twrnc";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Header from "../../components/Header";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState("");
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const bannerImages = [
    require("../../assest/bannerImage/banner1.jpg"),
    require("../../assest/bannerImage/banner2.jpg"),
    require("../../assest/bannerImage/banner3.webp"),
    require("../../assest/bannerImage/banner5.jpg"),
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % bannerImages.length;
        scrollRef.current?.scrollTo({
          x: nextIndex * width,
          animated: true,
        });
        return nextIndex;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const renderBannerIndicator = () => (
    <View style={tw`flex-row justify-center mt-3`}>
      {bannerImages.map((_, index) => (
        <View
          key={index}
          style={{
            height: hp("1%"),
            width: hp("1%"),
            borderRadius: hp("0.5%"),
            marginHorizontal: wp("1%"),
            backgroundColor:
              index === currentIndex ? "#92400E" : "rgba(245,158,11,0.3)",
          }}
        />
      ))}
    </View>
  );

  const categories = [
    { name: "Espresso", iconName: "cafe-outline" },
    { name: "Cold Brew", iconName: "snow-outline" },
    { name: "Latte", iconName: "cafe-outline" },
    { name: "Cappuccino", iconName: "cafe-outline" },
    { name: "Mocha", iconName: "cafe-outline" },
    { name: "Americano", iconName: "cafe-outline" },
    { name: "Macchiato", iconName: "cafe-outline" },
    { name: "Specialty", iconName: "star-outline" },
  ];

  const featuredCoffees = [
    {
      id: 1,
      name: "Caramel Macchiato",
      description: "Rich espresso with vanilla syrup and caramel drizzle",
      price: 499,
      image:
        "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=300&h=300&fit=crop",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Cold Brew",
      description: "Smooth cold brew with notes of chocolate",
      price: 499,
      image:
        "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=300&fit=crop",
      rating: 4.6,
    },
    {
      id: 3,
      name: "Cappuccino",
      description: "Classic Italian coffee with foamed milk",
      price: 100,
      image:
        "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&h=300&fit=crop",
      rating: 4.7,
    },
  ];

  const snacksBeverages = [
    {
      id: 1,
      name: "Chocolate Muffin",
      description: "Rich chocolate",
      price: 99,
      image:
        "https://images.unsplash.com/photo-1635952282017-a1d2bf2418be?auto=format&fit=crop&q=60&w=700",
    },
    {
      id: 2,
      name: "Cinnamon Roll",
      description: "Sweet cinnamon swirls with icing",
      price: 49,
      image:
        "https://images.unsplash.com/photo-1578633701951-3a2a5318e2f0?auto=format&fit=crop&q=60&w=700",
    },
    {
      id: 3,
      name: "Iced Tea",
      description: "Refreshing lemon iced tea",
      price: 199,
      image:
        "https://images.unsplash.com/photo-1654923064639-834d2bf32716?auto=format&fit=crop&q=60&w=700",
    },
  ];

  const handleProductPress = (product) => {
    const relatedProducts = featuredCoffees
      .filter((item) => item.id !== product.id)
      .slice(0, 4);

    navigation.navigate("ProductDetail", {
      product: product,
      relatedProducts: relatedProducts,
    });
  };

  return (
    <View style={[tw`flex-1 bg-amber-50`]}>
      <Header />
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8F0" />

      <ScrollView showsVerticalScrollIndicator={false} style={tw`flex-1`}>
        {/* 🔍 Search Bar */}
        <View style={[tw`px-6 mt-4`]}>
          <View
            style={[
              tw`bg-white rounded-full shadow flex-row items-center px-4 py-2`,
              { elevation: 2 },
            ]}
          >
            <Icon
              name="search-outline"
              size={hp("2.5%")}
              color="#F59E0B"
              style={tw`mr-2`}
            />
            <TextInput
              placeholder="Search your favorite coffee..."
              placeholderTextColor="#D97706"
              value={searchText}
              onChangeText={setSearchText}
              style={{
                flex: 1,
                fontSize: hp("1.8%"),
                color: "#92400E",
              }}
            />
          </View>
        </View>

        {/* 🧊 Auto Scrolling Banner */}
        <View style={[tw`my-6`]}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            ref={scrollRef}
            scrollEventThrottle={16}
            onScroll={(event) => {
              const slide = Math.round(
                event.nativeEvent.contentOffset.x / width
              );
              setCurrentIndex(slide);
            }}
          >
            {bannerImages.map((img, i) => (
              <View key={i} style={{ width }}>
                <View style={[tw`px-4`]}>
                  <Image
                    source={img}
                    style={{
                      width: "100%",
                      height: hp("25%"),
                      borderRadius: 20,
                    }}
                    resizeMode="cover"
                  />
                  <View
                    style={[
                      tw`absolute bottom-0 left-4 right-4 bg-black bg-opacity-40 p-4 rounded-b-3xl`,
                    ]}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: hp("2%"),
                      }}
                    >
                      Special Offer {i + 1}
                    </Text>
                    <Text style={{ color: "white", fontSize: hp("1.6%") }}>
                      Get 20% off on your first order
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
          {renderBannerIndicator()}
        </View>

        {/* ☕ Categories */}
        <View style={tw`px-6`}>
          <Text
            style={[
              tw`font-bold mb-4 text-amber-900`,
              { fontSize: hp("2.2%") },
            ]}
          >
            Categories
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  tw`bg-white rounded-2xl shadow items-center justify-center mr-4 mb-5`,
                  {
                    width: wp("22%"),
                    height: hp("14%"),
                    borderWidth: index === 0 ? 2 : 0,
                    borderColor: "#F59E0B",
                  },
                ]}
              >
                <Icon
                  name={category.iconName}
                  size={hp("3.5%")}
                  color="#B45309"
                />
                <Text
                  style={{
                    color: "#78350F",
                    fontWeight: "600",
                    fontSize: hp("1.6%"),
                    marginTop: hp("0.8%"),
                    textAlign: "center",
                  }}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ☕ Featured Coffees */}
        <View style={tw`mt-8 px-6`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text
              style={[
                tw`font-bold text-amber-900`,
                { fontSize: hp("2.2%") },
              ]}
            >
              Featured Coffees
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProductList", {
                  products: featuredCoffees,
                  title: "Featured Coffees",
                })
              }
            >
              <Text
                style={[
                  tw`text-amber-700 font-semibold`,
                  { fontSize: hp("1.8%") },
                ]}
              >
                See All
              </Text>
            </TouchableOpacity>
          </View>

          {featuredCoffees.map((coffee) => (
            <TouchableOpacity
              onPress={() => handleProductPress(coffee)}
              key={coffee.id}
              style={[
                tw`bg-white rounded-3xl p-4 mb-4 shadow flex-row`,
                { elevation: 3 },
              ]}
            >
              <Image
                source={{ uri: coffee.image }}
                style={{
                  width: wp("20%"),
                  height: hp("10%"),
                  borderRadius: 15,
                }}
              />
              <View style={tw`ml-4 flex-1`}>
                <Text
                  style={[
                    tw`font-bold text-amber-900`,
                    { fontSize: hp("2%") },
                  ]}
                >
                  {coffee.name}
                </Text>
                <Text
                  style={[
                    tw`text-amber-600 mt-1`,
                    { fontSize: hp("1.5%") },
                  ]}
                >
                  {coffee.description}
                </Text>
                <View
                  style={tw`flex-row justify-between items-center mt-2`}
                >
                  <Text
                    style={[
                      tw`font-bold text-amber-800`,
                      { fontSize: hp("2%") },
                    ]}
                  >
                    ₹{coffee.price}
                  </Text>
                  <View
                    style={tw`flex-row items-center bg-amber-100 px-2 py-1 rounded-full`}
                  >
                    <Text
                      style={[
                        tw`text-amber-700`,
                        { fontSize: hp("1.5%") },
                      ]}
                    >
                       {`⭐ ${coffee.rating}`}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* 🥐 Snacks & Beverages */}
        <View style={tw`mt-8 px-6`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text
              style={[
                tw`font-bold text-amber-900`,
                { fontSize: hp("2.2%") },
              ]}
            >
              Snacks & Beverages
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProductList", {
                  products: snacksBeverages,
                  title: "Snacks & Beverages",
                })
              }
            >
              <Text
                style={[
                  tw`text-amber-700 font-semibold`,
                  { fontSize: hp("1.8%") },
                ]}
              >
                See All
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {snacksBeverages.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleProductPress(item)}
                style={[
                  tw`bg-white rounded-3xl p-4 shadow mr-4 mb-5`,
                  { width: wp("40%"), elevation: 3 },
                ]}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: "100%",
                    height: hp("14%"),
                    borderRadius: 15,
                    marginBottom: hp("1%"),
                  }}
                  resizeMode="cover"
                />
                <Text
                  style={[
                    tw`font-bold text-amber-900`,
                    { fontSize: hp("1.8%") },
                  ]}
                >
                  {item.name}
                </Text>
                <Text
                  style={[
                    tw`text-amber-600 mt-1`,
                    { fontSize: hp("1.4%") },
                  ]}
                >
                  {item.description}
                </Text>
                <Text
                  style={[
                    tw`text-amber-800 font-bold mt-2`,
                    { fontSize: hp("1.6%") },
                  ]}
                >
                  ₹{item.price}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={{ height: hp("5%") }} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
