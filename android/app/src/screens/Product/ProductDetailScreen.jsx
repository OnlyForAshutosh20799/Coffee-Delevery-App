import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import tw from 'twrnc';
import { useCart } from '../../context/CartContext'; // Import useCart to manage cart

const ProductDetailScreen = ({ route, navigation }) => {
  const { product, relatedProducts } = route.params;
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart(); // Access addToCart from CartContext

  const handleAddToCart = () => {
    addToCart(product, quantity); // Add product with selected quantity to cart
    Alert.alert('Success', `${quantity} ${product.name} added to cart!`);
  };

  const handleRelatedProductPress = relatedProduct => {
    navigation.replace('ProductDetail', {
      product: relatedProduct,
      relatedProducts: relatedProducts,
    });
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () =>
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <View style={tw`flex-1 bg-amber-50`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <Image
          source={{ uri: product.image }}
          style={tw`w-full h-50`}
          resizeMode="cover"
        />

        {/* Product Details */}
        <View style={tw`p-3`}>
          <Text style={tw`text-xl font-bold text-amber-900`}>
            {product.name}
          </Text>
          <Text style={tw`text-xl font-bold text-amber-800`}>
            {product.price}
          </Text>

          {/* Rating */}
          <View style={tw`flex-row items-center mt-1`}>
            <View style={tw`flex-row`}>
              {[1, 2, 3, 4, 5].map(star => (
                <Icon
                  key={star}
                  name="star"
                  size={20}
                  color={star <= (product.rating || 4) ? '#FFD700' : '#E5E7EB'}
                />
              ))}
            </View>
            <Text style={tw`text-amber-600 ml-2`}>
              ({product.reviews || 125} reviews)
            </Text>
          </View>

          {/* Description */}
          <Text style={tw`text-amber-700 text-base mt-2 leading-6`}>
            {product.fullDescription || product.description}
          </Text>

          {/* Quantity Selector */}
          <View style={tw`mt-3`}>
            <Text style={tw`text-md font-semibold text-amber-900 mb-3`}>
              Quantity
            </Text>
            <View style={tw`flex-row items-center`}>
              <TouchableOpacity
                style={tw`w-7 h-7 bg-amber-200 rounded-full items-center justify-center`}
                onPress={decrementQuantity}
              >
                <Icon name="remove" size={15} color="#6F4E37" />
              </TouchableOpacity>
              <Text style={tw`text-md font-bold text-amber-900 mx-4`}>
                {quantity}
              </Text>
              <TouchableOpacity
                style={tw`w-7 h-7 bg-amber-200 rounded-full items-center justify-center`}
                onPress={incrementQuantity}
              >
                <Icon name="add" size={15} color="#6F4E37" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Add to Cart Button */}
          <TouchableOpacity
            style={tw`bg-amber-700 rounded-full py-1 mt-8 shadow-lg`}
            onPress={handleAddToCart}
          >
            <Text style={tw`text-white text-center text-lg font-bold`}>
              Add to Cart - {product.price}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <View style={tw`mt-8 px-4`}>
            <Text style={tw`text-lg font-bold text-amber-900 mb-3`}>
              Related Products
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {relatedProducts.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={tw`mr-3 mb-5 bg-white rounded-xl shadow-sm border border-amber-200 w-36`}
                  onPress={() => handleRelatedProductPress(item)}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={tw`w-full h-20 rounded-t-xl`}
                    resizeMode="cover"
                  />
                  <View style={tw`p-2`}>
                    <Text
                      style={tw`text-amber-900 font-semibold text-xs`}
                      numberOfLines={2}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={tw`text-amber-600 text-[10px] mt-1`}
                      numberOfLines={2}
                    >
                      {item.description}
                    </Text>
                    <Text style={tw`text-amber-800 font-bold text-xs mt-1`}>
                      {item.price}
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