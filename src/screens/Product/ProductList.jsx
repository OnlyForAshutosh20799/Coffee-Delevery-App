// src/screens/ProductListScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  PixelRatio,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons';
import ComponentHeader from '../../components/ComponentHeader';

const { width, height } = Dimensions.get('window');

// ✅ Scale function for consistent sizing
const scale = width / 375;
const normalize = size => Math.round(PixelRatio.roundToNearestPixel(size * scale));

const ProductList = ({ route }) => {
  const { products, title } = route.params;
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // ✅ Tablet detection
  const isTablet = width >= 768;

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
      .slice(0, 4);

    navigation.navigate('ProductDetail', {
      product: product,
      relatedProducts: relatedProducts,
    });
  };

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
      {/* ✅ Responsive Header */}
      <ComponentHeader title={title} onBack={() => navigation.goBack()} />

      {/* ✅ Search Bar */}
      <View style={[tw`px-6 mt-3 mb-4`, { paddingHorizontal: isTablet ? 40 : 20 }]}>
        <View
          style={[
            tw`bg-white rounded-full shadow flex-row items-center`,
            { paddingVertical: isTablet ? 10 : 8, paddingHorizontal: isTablet ? 20 : 12 },
          ]}
        >
          <Icon
            name="search-outline"
            size={isTablet ? 28 : 20}
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
              fontSize: normalize(isTablet ? 18 : 14),
              color: '#78350F',
            }}
          />
        </View>
      </View>

      {/* ✅ Horizontal Scroll Categories */}
      <View style={tw`h-12 justify-center`}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            tw`items-center`,
            { paddingHorizontal: isTablet ? 40 : 20 },
          ]}
        >
          {categories.map((cat, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedCategory(cat)}
              style={{ marginRight: isTablet ? 25 : 15 }}
            >
              <Text
                style={{
                  fontSize: normalize(isTablet ? 18 : 14),
                  fontWeight: '600',
                  color:
                    selectedCategory === cat ? '#78350F' : '#B45309',
                }}
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

      {/* ✅ Product List */}
      <ScrollView
        contentContainerStyle={[
          tw`pb-8`,
          { paddingHorizontal: isTablet ? 40 : 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map(item => (
            <TouchableOpacity
              key={item.id}
              style={[
                tw`flex-row bg-white border border-amber-100 rounde-sm mb-0`,
                {
                  padding: isTablet ? 20 : 12,
                  shadowColor: '#000',
                  shadowOpacity: 0.1,
                  shadowRadius: 5,
                  elevation: 3,
                },
              ]}
              onPress={() => handleProductPress(item)}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  width: isTablet ? 120 : 80,
                  height: isTablet ? 120 : 80,
                  borderRadius: 20,
                }}
                resizeMode="cover"
              />
              <View style={[tw`ml-4 flex-1`, { justifyContent: 'center' }]}>
                <Text
                  style={{
                    fontSize: normalize(isTablet ? 20 : 16),
                    fontWeight: 'bold',
                    color: '#78350F',
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: normalize(isTablet ? 16 : 13),
                    color: '#92400E',
                    marginTop: 4,
                  }}
                  numberOfLines={2}
                >
                  {item.description}
                </Text>
                <Text
                  style={{
                    fontSize: normalize(isTablet ? 18 : 15),
                    color: '#92400E',
                    fontWeight: '600',
                    marginTop: 6,
                  }}
                >
                  {item.price}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text
            style={{
              textAlign: 'center',
              fontSize: normalize(isTablet ? 18 : 14),
              color: '#92400E',
              marginTop: 30,
            }}
          >
            No products found 😕
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default ProductList;
