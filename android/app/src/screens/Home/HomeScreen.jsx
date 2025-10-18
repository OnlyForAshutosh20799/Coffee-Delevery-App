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
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState('');
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useState(new Animated.Value(0))[0];

  // Banner images
  const bannerImages = [
    require('../../main/assest/bannerImage/banner1.jpg'),
    require('../../main/assest/bannerImage/banner2.jpg'),
    require('../../main/assest/bannerImage/banner3.webp'),
    require('../../main/assest/bannerImage/banner5.jpg'),
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
      setCurrentIndex(prev => {
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
          style={tw`h-2 w-2 rounded-full mx-1 ${
            index === currentIndex ? 'bg-amber-800' : 'bg-amber-300'
          }`}
        />
      ))}
    </View>
  );

  // Categories
  const categories = [
    { name: 'Espresso', iconName: 'cafe-outline' },
    { name: 'Cold Brew', iconName: 'snow-outline' },
    { name: 'Latte', iconName: 'cafe-outline' },
    { name: 'Cappuccino', iconName: 'coffee-outline' },
    { name: 'Mocha', iconName: 'cafe-outline' },
    { name: 'Americano', iconName: 'cafe-outline' },
    { name: 'Macchiato', iconName: 'cafe-outline' },
    { name: 'Specialty', iconName: 'star-outline' },
  ];

  // Featured coffees
  const featuredCoffees = [
    {
      id: 1,
      name: 'Caramel Macchiato',
      description: 'Rich espresso with vanilla syrup and caramel drizzle',
      price: '$4.99',
      image:
        'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=300&h=300&fit=crop',
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Cold Brew',
      description: 'Smooth cold brew with notes of chocolate',
      price: '$3.99',
      image:
        'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=300&fit=crop',
      rating: 4.6,
    },
    {
      id: 3,
      name: 'Cappuccino',
      description: 'Classic Italian coffee with foamed milk',
      price: '$3.49',
      image:
        'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&h=300&fit=crop',
      rating: 4.7,
    },
  ];

  // Snacks & beverages
  const snacksBeverages = [
    {
      id: 1,
      name: 'Chocolate Muffin',
      description: 'Rich chocolate',
      price: '$2.99',
      image:
        'https://images.unsplash.com/photo-1635952282017-a1d2bf2418be?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hvY29sYXRlJTIwbXVmZmluc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=700',
    },
    {
      id: 2,
      name: 'Cinnamon Roll',
      description: 'Sweet cinnamon swirls with icing',
      price: '$3.49',
      image:
        'https://images.unsplash.com/photo-1578633701951-3a2a5318e2f0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNpbm5hbW9uJTIwcm9sbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=700',
    },
    {
      id: 3,
      name: 'Iced Tea',
      description: 'Refreshing lemon iced tea',
      price: '$1.99',
      image:
        'https://images.unsplash.com/photo-1654923064639-834d2bf32716?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGljZWQlMjB0ZWF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=700',
    },
    {
      id: 4,
      name: 'Cheese Toasties',
      description: 'Buttery, crispy',
      price: '$1.99',
      image:
        'https://plus.unsplash.com/premium_photo-1695127909043-86a3dce3f65e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fENoZWVzZSUyMHRvYXN0aWVzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=700',
    },
    {
      id: 5,
      name: 'Fruit Smoothie',
      description: 'Mixed berry smoothie',
      price: '$4.49',
      image:
        'https://images.unsplash.com/photo-1600718374662-0483d2b9da44?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJ1aXQlMjBzbW9vdGhpZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=700',
    },
    {
      id: 6,
      name: 'Samosas',
      description: 'Spicy, crispy, crunchy',
      price: '$4.49',
      image:
        'https://plus.unsplash.com/premium_photo-1695297516710-854716c51121?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U2Ftb3Nhc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=700',
    },
  ];



  const handleProductPress = (product) => {
  // Example: You can add category field in your data later
  const relatedProducts = featuredCoffees
    .filter(item => item.id !== product.id)
    .slice(0, 4); // Show up to 4 related items

  navigation.navigate('ProductDetail', {
    product: product,
    relatedProducts: relatedProducts,
  });
};


  return (
    <View style={tw`flex-1 bg-amber-50`}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8F0" />

      <ScrollView showsVerticalScrollIndicator={false} style={tw`flex-1`}>
        {/* Search Bar */}
        <View style={tw`px-6 mt-4`}>
          <View
            style={tw`bg-white rounded-full px-4 shadow flex-row items-center`}
          >
            <Icon
              name="search-outline"
              size={20}
              color="#F59E0B"
              style={tw`mr-2`}
            />
            <TextInput
              placeholder="Search your favorite coffee..."
              placeholderTextColor="#D97706"
              value={searchText}
              onChangeText={setSearchText}
              style={tw`flex-1 text-amber-600 text-base`}
            />
          </View>
        </View>

        {/* 🧊 Auto-Scrolling Banner */}
        <View style={tw`my-6`}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            ref={scrollRef}
            scrollEventThrottle={16}
            onScroll={event => {
              const slide = Math.round(
                event.nativeEvent.contentOffset.x / width,
              );
              setCurrentIndex(slide);
            }}
          >
            {bannerImages.map((img, i) => (
              <View key={i} style={{ width }}>
                <View style={tw`px-4`}>
                  <Image
                    source={img}
                    style={tw`w-full h-48 rounded-3xl shadow-xl`}
                    resizeMode="cover"
                  />
                  <View
                    style={tw`absolute bottom-0 left-4 right-4 bg-black bg-opacity-40 p-4 rounded-b-3xl`}
                  >
                    <Text style={tw`text-white font-bold text-lg`}>
                      Special Offer {i + 1}
                    </Text>
                    <Text style={tw`text-white text-sm`}>
                      Get 20% off on your first order
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
          {renderBannerIndicator()}
        </View>

        {/* Categories */}
        <View style={tw` px-6`}>
          <Text style={tw`text-xl font-bold text-amber-900 mb-4`}>
            Categories
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={tw`flex-row`}
          >
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={tw.style(
                  'mb-5 mr-4 bg-white rounded-2xl px-4 py-4 shadow items-center justify-center',
                  { width: 100, height: 120 },
                  index === 0 && 'border-2 border-amber-500',
                )}
              >
                <Icon name={category.iconName} size={28} color="#B45309" />
                <Text style={tw`text-amber-900 font-semibold mt-2 text-center`}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Coffees */}
        <View style={tw`mt-8 px-6`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-xl font-bold text-amber-900`}>
              Featured Coffees
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ProductList', {
                  products: featuredCoffees, // or snacksBeverages
                  title: 'Featured Coffees',
                })
              }
            >
              <Text style={tw`text-amber-700 font-semibold`}>See All</Text>
            </TouchableOpacity>
          </View>
          {featuredCoffees.map(coffee => (
            <TouchableOpacity
              onPress={() => handleProductPress(coffee)}
              key={coffee.id}
              style={tw`bg-white rounded-3xl p-4 mb-4 shadow flex-row`}
            >
              <Image
                source={{ uri: coffee.image }}
                style={tw`w-20 h-20 rounded-2xl`}
              />
              <View style={tw`ml-4 flex-1`}>
                <Text style={tw`text-lg font-bold text-amber-900`}>
                  {coffee.name}
                </Text>
                <Text style={tw`text-amber-600 text-sm mt-1`}>
                  {coffee.description}
                </Text>
                <View style={tw`flex-row justify-between items-center mt-2`}>
                  <Text style={tw`text-amber-800 font-bold text-lg`}>
                    {coffee.price}
                  </Text>
                  <View
                    style={tw`flex-row items-center bg-amber-100 px-2 py-1 rounded-full`}
                  >
                    <Text style={tw`text-amber-700 text-sm`}>
                      ⭐ {coffee.rating}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Snacks & Beverages */}
        <View style={tw`mt-8 px-6`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-xl font-bold text-amber-900`}>
              Snacks & Beverages
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ProductList', {
                  products: snacksBeverages, // or snacksBeverages
                  title: 'Snacks & Beverages',
                })
              }
            >
              <Text style={tw`text-amber-700 font-semibold`}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={tw`flex-row`}
          >
            {snacksBeverages.map(item => (
              <TouchableOpacity
               onPress={() => handleProductPress(item)}
                key={item.id}
                style={tw`mr-4 bg-white rounded-3xl p-4 shadow w-40 mb-5`}
              >
                <Image
                  source={{ uri: item.image }}
                  style={tw`w-full h-28 rounded-2xl mb-3`}
                  resizeMode="cover"
                />
                <Text style={tw`text-lg font-bold text-amber-900`}>
                  {item.name}
                </Text>
                <Text style={tw`text-amber-600 text-sm mt-1`}>
                  {item.description}
                </Text>
                <Text style={tw`text-amber-800 font-bold mt-2`}>
                  {item.price}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={tw`h-8`} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
