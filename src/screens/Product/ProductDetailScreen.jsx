import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import tw from 'twrnc';
import { useCart } from '../../context/CartContext';
import ComponentHeader from '../../components/ComponentHeader'




const ProductDetailScreen = ({ route, navigation }) => {
  const { product, relatedProducts } = route.params;
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    Alert.alert('Success', `${quantity} ${product.name} added to cart!`);
  };

  const handleRelatedProductPress = relatedProduct => {
    navigation.replace('ProductDetail', {
      product: relatedProduct,
      relatedProducts: relatedProducts,
    });
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <View style={tw`flex-1 bg-amber-50`}>
      {/* 🧭 Header */}
        <ComponentHeader title="Product Details" onBack={() => navigation.goBack()} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 🖼 Product Image */}
        <Image
          source={{ uri: product.image }}
          style={[
            tw`w-full`,
            { height: isTablet ? 400 : 250 },
          ]}
          resizeMode="cover"
        />

        {/* ☕ Product Info */}
        <View style={tw`p-4`}>
          <Text
            style={[
              tw`text-amber-900 font-bold`,
              { fontSize: isTablet ? 28 : 20 },
            ]}
          >
            {product.name}
          </Text>

          <Text
            style={[
              tw`text-amber-800 font-semibold mt-1`,
              { fontSize: isTablet ? 22 : 18 },
            ]}
          >
            ₹{product.price}
          </Text>

          {/* ⭐ Rating */}
          <View style={tw`flex-row items-center mt-2`}>
            {[1, 2, 3, 4, 5].map(star => (
              <Icon
                key={star}
                name="star"
                size={isTablet ? 26 : 20}
                color={star <= (product.rating || 4) ? '#FFD700' : '#E5E7EB'}
              />
            ))}
            <Text
              style={[
                tw`text-amber-600 ml-2`,
                { fontSize: isTablet ? 16 : 13 },
              ]}
            >
              ({product.reviews || 125} reviews)
            </Text>
          </View>

          {/* 📖 Description */}
          <Text
            style={[
              tw`text-amber-700 mt-3 leading-6`,
              { fontSize: isTablet ? 18 : 14 },
            ]}
          >
            {product.fullDescription || product.description}
          </Text>

          {/* 🔢 Quantity Selector */}
          <View style={tw`mt-5`}>
            <Text
              style={[
                tw`font-semibold text-amber-900 mb-3`,
                { fontSize: isTablet ? 18 : 15 },
              ]}
            >
              Quantity
            </Text>

            <View style={tw`flex-row items-center`}>
              <TouchableOpacity
                style={tw`w-9 h-9 bg-amber-200 rounded-full items-center justify-center`}
                onPress={decrementQuantity}
              >
                <Icon name="remove" size={isTablet ? 20 : 16} color="#6F4E37" />
              </TouchableOpacity>

              <Text
                style={[
                  tw`mx-5 font-bold text-amber-900`,
                  { fontSize: isTablet ? 20 : 16 },
                ]}
              >
                {quantity}
              </Text>

              <TouchableOpacity
                style={tw`w-9 h-9 bg-amber-200 rounded-full items-center justify-center`}
                onPress={incrementQuantity}
              >
                <Icon name="add" size={isTablet ? 20 : 16} color="#6F4E37" />
              </TouchableOpacity>
            </View>
          </View>

          {/* 🛒 Add to Cart */}
          <TouchableOpacity
            style={tw`bg-amber-700 rounded-full py-3 mt-8 shadow-lg`}
            onPress={handleAddToCart}
          >
            <Text
              style={[
                tw`text-white text-center font-bold`,
                { fontSize: isTablet ? 18 : 16 },
              ]}
            >
              Add to Cart - ₹{product.price}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 🧃 Related Products */}
        {relatedProducts.length > 0 && (
          <View style={tw`mt-8 px-4`}>
            <Text
              style={[
                tw`font-bold text-amber-900 mb-4`,
                { fontSize: isTablet ? 22 : 18 },
              ]}
            >
              Related Products
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {relatedProducts.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    tw`mr-4 bg-white rounded-xl shadow-sm border border-amber-200`,
                    { width: isTablet ? 180 : 140 },
                  ]}
                  onPress={() => handleRelatedProductPress(item)}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={[
                      tw`rounded-t-xl`,
                      { width: '100%', height: isTablet ? 120 : 90 },
                    ]}
                    resizeMode="cover"
                  />
                  <View style={tw`p-3`}>
                    <Text
                      style={[
                        tw`text-amber-900 font-semibold`,
                        { fontSize: isTablet ? 14 : 12 },
                      ]}
                      numberOfLines={2}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={[
                        tw`text-amber-600 mt-1`,
                        { fontSize: isTablet ? 12 : 10 },
                      ]}
                      numberOfLines={2}
                    >
                      {item.description}
                    </Text>
                    <Text
                      style={[
                        tw`text-amber-800 font-bold mt-1`,
                        { fontSize: isTablet ? 13 : 11 },
                      ]}
                    >
                      ₹{item.price}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ProductDetailScreen;
