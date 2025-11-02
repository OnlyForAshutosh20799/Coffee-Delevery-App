import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import tw from 'twrnc';
import ComponentHeader from '../../components/ComponentHeader';

const SavedAddressScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const isTablet = width > 768; // Tablet breakpoint

  // Responsive helpers
  const scaleSize = size => (isTablet ? size * 1.3 : size);
  const scaleFont = size => (isTablet ? size * 1.2 : size);

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'home',
      title: 'Home',
      name: 'Sarah Miller',
      street: '123 Coffee Street',
      apartment: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      phone: '+1 (555) 123-4567',
      isDefault: true,
    },
    {
      id: 2,
      type: 'work',
      title: 'Office',
      name: 'Sarah Miller',
      street: '456 Business Avenue',
      apartment: 'Suite 1200',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      phone: '+1 (555) 123-4567',
      isDefault: false,
    },
    {
      id: 3,
      type: 'other',
      title: "Mom's Place",
      name: 'Sarah Miller',
      street: '789 Family Road',
      apartment: '',
      city: 'Brooklyn',
      state: 'NY',
      zipCode: '11201',
      phone: '+1 (555) 987-6543',
      isDefault: false,
    },
  ]);

  // Utility functions
  const getTypeIcon = type =>
    type === 'home' ? 'home' : type === 'work' ? 'work' : 'location-on';

  const getTypeColor = type =>
    type === 'home'
      ? '#059669'
      : type === 'work'
      ? '#2563eb'
      : type === 'other'
      ? '#7c3aed'
      : '#6F4E37';

  const getTypeBackground = type =>
    type === 'home'
      ? '#d1fae5'
      : type === 'work'
      ? '#dbeafe'
      : type === 'other'
      ? '#f3e8ff'
      : '#fef3c7';

  const handleSetDefault = addressId => {
    setAddresses(prev =>
      prev.map(a => ({ ...a, isDefault: a.id === addressId })),
    );
    Alert.alert('Success', 'Default address updated successfully!');
  };

  const handleEditAddress = id => console.log('Edit address:', id);
  const handleAddNewAddress = () => console.log('Add new address');
  const handleDeleteAddress = id => {
    Alert.alert('Delete Address', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () =>
          setAddresses(prev => prev.filter(a => a.id !== id)) ||
          Alert.alert('Deleted', 'Address removed!'),
      },
    ]);
  };

  return (
    <View style={tw`flex-1 bg-amber-50`}>
      {/* 🌟 Elegant Header */}
     
      <ComponentHeader title = 'Saved Addresses' onBack={()=> navigation.goBack()} />

      {/* Main Content */}
      <ScrollView
        style={tw`flex-1 px-4`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: scaleSize(100) }}
      >
        {/* Default Address */}
        <View style={tw`mt-6 mb-4`}>
          <Text
            style={[
              tw`font-semibold text-amber-900 mb-3`,
              { fontSize: scaleFont(18) },
            ]}
          >
            Default Address
          </Text>

          {addresses
            .filter(a => a.isDefault)
            .map(address => (
              <View
                key={address.id}
                style={tw`bg-white rounded-2xl shadow-lg border-2 border-amber-300 p-5 mb-4`}
              >
                <View style={tw`flex-row justify-between items-start mb-3`}>
                  <View style={tw`flex-row items-center`}>
                    <View
                      style={[
                        tw`items-center justify-center mr-3 rounded-full`,
                        {
                          backgroundColor: getTypeBackground(address.type),
                          width: scaleSize(40),
                          height: scaleSize(40),
                        },
                      ]}
                    >
                      <Icon
                        name={getTypeIcon(address.type)}
                        size={scaleSize(20)}
                        color={getTypeColor(address.type)}
                      />
                    </View>
                    <View>
                      <View style={tw`flex-row items-center`}>
                        <Text
                          style={[
                            tw`font-bold text-amber-900`,
                            { fontSize: scaleFont(18) },
                          ]}
                        >
                          {address.title}
                        </Text>
                        <View style={tw`bg-amber-600 px-2 py-1 rounded-full ml-2`}>
                          <Text
                            style={[
                              tw`text-white font-semibold`,
                              { fontSize: scaleFont(10) },
                            ]}
                          >
                            DEFAULT
                          </Text>
                        </View>
                      </View>
                      <Text
                        style={[
                          tw`text-amber-600`,
                          { fontSize: scaleFont(13) },
                        ]}
                      >
                        {address.name}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={tw`mb-4`}>
                  <Text
                    style={[
                      tw`text-amber-800 leading-6`,
                      { fontSize: scaleFont(15) },
                    ]}
                  >
                    {address.street}
                    {address.apartment && `, ${address.apartment}`}
                  </Text>
                  <Text
                    style={[
                      tw`text-amber-800`,
                      { fontSize: scaleFont(15) },
                    ]}
                  >
                    {address.city}, {address.state} {address.zipCode}
                  </Text>
                  <Text
                    style={[
                      tw`text-amber-600 mt-1`,
                      { fontSize: scaleFont(12) },
                    ]}
                  >
                    {address.phone}
                  </Text>
                </View>

                <View style={tw`flex-row justify-between`}>
                  <TouchableOpacity
                    style={tw`flex-row items-center`}
                    onPress={() => handleEditAddress(address.id)}
                  >
                    <Icon
                      name="edit"
                      size={scaleSize(18)}
                      color="#6F4E37"
                    />
                    <Text
                      style={[
                        tw`text-amber-700 font-medium ml-1`,
                        { fontSize: scaleFont(13) },
                      ]}
                    >
                      Edit
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={tw`flex-row items-center`}
                    onPress={() => handleDeleteAddress(address.id)}
                  >
                    <Icon
                      name="delete"
                      size={scaleSize(18)}
                      color="#DC2626"
                    />
                    <Text
                      style={[
                        tw`text-red-600 font-medium ml-1`,
                        { fontSize: scaleFont(13) },
                      ]}
                    >
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </View>

        {/* Other Addresses */}
        <View style={tw`mb-8`}>
          <Text
            style={[
              tw`font-semibold text-amber-900 mb-3`,
              { fontSize: scaleFont(18) },
            ]}
          >
            Other Addresses
          </Text>
          {addresses
            .filter(a => !a.isDefault)
            .map(address => (
              <View
                key={address.id}
                style={tw`bg-white rounded-2xl shadow-sm border border-amber-200 p-5 mb-3`}
              >
                <View style={tw`flex-row justify-between items-start mb-3`}>
                  <View style={tw`flex-row items-center flex-1`}>
                    <View
                      style={[
                        tw`items-center justify-center mr-3 rounded-full`,
                        {
                          backgroundColor: getTypeBackground(address.type),
                          width: scaleSize(40),
                          height: scaleSize(40),
                        },
                      ]}
                    >
                      <Icon
                        name={getTypeIcon(address.type)}
                        size={scaleSize(20)}
                        color={getTypeColor(address.type)}
                      />
                    </View>
                    <View style={tw`flex-1`}>
                      <Text
                        style={[
                          tw`font-bold text-amber-900`,
                          { fontSize: scaleFont(16) },
                        ]}
                      >
                        {address.title}
                      </Text>
                      <Text
                        style={[
                          tw`text-amber-600`,
                          { fontSize: scaleFont(13) },
                        ]}
                      >
                        {address.name}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={tw`mb-4`}>
                  <Text
                    style={[
                      tw`text-amber-800 leading-6`,
                      { fontSize: scaleFont(15) },
                    ]}
                  >
                    {address.street}
                    {address.apartment && `, ${address.apartment}`}
                  </Text>
                  <Text
                    style={[
                      tw`text-amber-800`,
                      { fontSize: scaleFont(15) },
                    ]}
                  >
                    {address.city}, {address.state} {address.zipCode}
                  </Text>
                  <Text
                    style={[
                      tw`text-amber-600 mt-1`,
                      { fontSize: scaleFont(12) },
                    ]}
                  >
                    {address.phone}
                  </Text>
                </View>

                <View style={tw`flex-row justify-between items-center`}>
                  <TouchableOpacity
                    style={tw`bg-amber-600 px-4 py-2 rounded-full`}
                    onPress={() => handleSetDefault(address.id)}
                  >
                    <Text
                      style={[
                        tw`text-white font-semibold`,
                        { fontSize: scaleFont(13) },
                      ]}
                    >
                      Set as Default
                    </Text>
                  </TouchableOpacity>

                  <View style={tw`flex-row`}>
                    <TouchableOpacity
                      style={tw`p-2 mx-1`}
                      onPress={() => handleEditAddress(address.id)}
                    >
                      <Icon
                        name="edit"
                        size={scaleSize(20)}
                        color="#6F4E37"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={tw`p-2 mx-1`}
                      onPress={() => handleDeleteAddress(address.id)}
                    >
                      <Icon
                        name="delete"
                        size={scaleSize(20)}
                        color="#DC2626"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>

      {/* Floating Add Button */}
      {addresses.length > 0 && (
        <View style={tw`absolute bottom-6 right-6`}>
          <TouchableOpacity
            style={[
              tw`bg-amber-700 items-center justify-center rounded-full shadow-2xl`,
              {
                width: scaleSize(55),
                height: scaleSize(55),
              },
            ]}
            onPress={handleAddNewAddress}
          >
            <Icon name="add" size={scaleSize(26)} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default SavedAddressScreen;
