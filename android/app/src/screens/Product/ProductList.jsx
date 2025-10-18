// src/screens/ProductListScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons';

const ProductList = ({ route }) => {
  const { products, title } = route.params;
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Define main categories (customized for coffee app)
  const categories = [
    'All',
    'Brown Coffee',
    'Blended Coffee',
    'Beverages',
    'Snacks',
    'Cold Coffee',
    'Hot Coffee',
    'Specials',
  ];

  const handleProductPress = product => {
    const relatedProducts = products
      .filter(
        item => item.category === product.category && item.id !== product.id,
      )
      .slice(0, 4); // Max 4 related

    navigation.navigate('ProductDetail', {
      product: product,
      relatedProducts: relatedProducts,
    });
  };

  // Filter by search and selected category
  const filteredProducts = products.filter(item => {
    const matchSearch = item.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchCategory =
      selectedCategory === 'All' ||
      item.category?.toLowerCase() === selectedCategory.toLowerCase();
    return matchSearch && matchCategory;
  });

  return (
    <View style={tw`flex-1 bg-amber-50`}>
      {/* <Text style={tw`text-2xl font-bold text-amber-900 text-center mt-6`}>
        {title}
      </Text> */}

      {/* Search Bar */}
      <View style={tw`px-6 mt-3 mb-4`}>
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
            style={tw`flex-1 text-amber-700 text-base`}
          />
        </View>
      </View>

      {/* Horizontal Scroll Categories */}
      <View style={tw`h-12 justify-center`}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`px-5 items-center`}
        >
          {categories.map((cat, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedCategory(cat)}
              style={tw`mr-5`}
            >
              <Text
                style={tw`text-base font-semibold ${
                  selectedCategory === cat ? 'text-amber-900' : 'text-amber-600'
                }`}
              >
                {cat}
              </Text>
              {selectedCategory === cat && (
                <View style={tw`h-0.5 bg-amber-800 mt-1 rounded-full`} />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Product List */}
      <ScrollView contentContainerStyle={tw`px-5 pb-6 `}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(item => (
            <TouchableOpacity
              key={item.id}
              style={tw`p-3 flex-row    border border-amber-100`}
              onPress={() => handleProductPress(item)}
            >
              <Image
                source={{ uri: item.image }}
                style={tw`w-20 h-20 rounded-2xl`}
                resizeMode="cover"
              />
              <View style={tw`ml-4 flex-1`}>
                <Text style={tw`text-lg font-bold text-amber-900`}>
                  {item.name}
                </Text>
                <Text style={tw`text-amber-600 text-sm mt-1`} numberOfLines={2}>
                  {item.description}
                </Text>
                <Text style={tw`text-amber-800 font-bold mt-2`}>
                  {item.price}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={tw`text-center text-amber-700 mt-8`}>
            No products found 😕
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default ProductList;
