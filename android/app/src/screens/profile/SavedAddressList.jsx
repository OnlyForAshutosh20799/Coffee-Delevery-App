import { Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import tw from 'twrnc';

const SavedAddressScreen = () => {
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
    {
      id: 4,
      type: 'home',
      title: 'Weekend Home',
      name: 'Sarah Miller',
      street: '321 Mountain View',
      apartment: 'Unit 5',
      city: 'Albany',
      state: 'NY',
      zipCode: '12201',
      phone: '+1 (555) 123-4567',
      isDefault: false,
    },
    {
      id: 5,
      type: 'other',
      title: 'Coffee Shop Branch',
      name: 'Sarah Miller',
      street: '654 Brewery Lane',
      apartment: 'First Floor',
      city: 'Queens',
      state: 'NY',
      zipCode: '11355',
      phone: '+1 (555) 456-7890',
      isDefault: false,
    },
  ]);

  const getTypeIcon = type => {
    switch (type) {
      case 'home':
        return 'home';
      case 'work':
        return 'work';
      case 'other':
        return 'location-on';
      default:
        return 'location-on';
    }
  };

  const getTypeColor = type => {
    switch (type) {
      case 'home':
        return '#059669'; // Green
      case 'work':
        return '#2563eb'; // Blue
      case 'other':
        return '#7c3aed'; // Purple
      default:
        return '#6F4E37'; // Brown
    }
  };

  const getTypeBackground = type => {
    switch (type) {
      case 'home':
        return '#d1fae5'; // Light green
      case 'work':
        return '#dbeafe'; // Light blue
      case 'other':
        return '#f3e8ff'; // Light purple
      default:
        return '#fef3c7'; // Light amber
    }
  };

  const handleSetDefault = addressId => {
    setAddresses(prevAddresses =>
      prevAddresses.map(address => ({
        ...address,
        isDefault: address.id === addressId,
      })),
    );
    Alert.alert('Success', 'Default address updated successfully!');
  };

  const handleEditAddress = addressId => {
    // Navigate to edit address screen
    console.log('Edit address:', addressId);
  };

  const handleDeleteAddress = addressId => {
    Alert.alert(
      'Delete Address',
      'Are you sure you want to delete this address?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setAddresses(prevAddresses =>
              prevAddresses.filter(address => address.id !== addressId),
            );
            Alert.alert('Success', 'Address deleted successfully!');
          },
        },
      ],
    );
  };

  const handleAddNewAddress = () => {
    // Navigate to add new address screen
    console.log('Add new address');
  };

  return (
    <View style={tw`flex-1 bg-amber-50`}>
      {/* Header */}
      <ScrollView style={tw`flex-1 px-6`} showsVerticalScrollIndicator={false}>
        {/* Default Address Section */}
        <View style={tw`mt-6 mb-4`}>
          <Text style={tw`text-lg font-semibold text-amber-900 mb-3`}>
            Default Address
          </Text>
          {addresses
            .filter(address => address.isDefault)
            .map(address => (
              <View
                key={address.id}
                style={tw`bg-white rounded-2xl shadow-lg border-2 border-amber-300 p-5 mb-4`}
              >
                <View style={tw`flex-row justify-between items-start mb-3`}>
                  <View style={tw`flex-row items-center`}>
                    <View
                      style={[
                        tw`w-10 h-10 rounded-full items-center justify-center mr-3`,
                        { backgroundColor: getTypeBackground(address.type) },
                      ]}
                    >
                      <Icon
                        name={getTypeIcon(address.type)}
                        size={20}
                        color={getTypeColor(address.type)}
                      />
                    </View>
                    <View>
                      <View style={tw`flex-row items-center`}>
                        <Text style={tw`text-lg font-bold text-amber-900`}>
                          {address.title}
                        </Text>
                        <View
                          style={tw`bg-amber-600 px-2 py-1 rounded-full ml-2`}
                        >
                          <Text style={tw`text-xs text-white font-semibold`}>
                            DEFAULT
                          </Text>
                        </View>
                      </View>
                      <Text style={tw`text-amber-600 text-sm`}>
                        {address.name}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={tw`mb-4`}>
                  <Text style={tw`text-amber-800 text-base leading-6`}>
                    {address.street}
                    {address.apartment && `, ${address.apartment}`}
                  </Text>
                  <Text style={tw`text-amber-800 text-base`}>
                    {address.city}, {address.state} {address.zipCode}
                  </Text>
                  <Text style={tw`text-amber-600 text-sm mt-1`}>
                    {address.phone}
                  </Text>
                </View>

                <View style={tw`flex-row justify-between`}>
                  <TouchableOpacity
                    style={tw`flex-row items-center`}
                    onPress={() => handleEditAddress(address.id)}
                  >
                    <Icon name="edit" size={18} color="#6F4E37" />
                    <Text style={tw`text-amber-700 font-medium ml-1`}>
                      Edit
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={tw`flex-row items-center`}
                    onPress={() => handleDeleteAddress(address.id)}
                  >
                    <Icon name="delete" size={18} color="#DC2626" />
                    <Text style={tw`text-red-600 font-medium ml-1`}>
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </View>

        {/* Other Addresses Section */}
        <View style={tw`mb-8`}>
          <Text style={tw`text-lg font-semibold text-amber-900 mb-3`}>
            Other Addresses
          </Text>
          {addresses
            .filter(address => !address.isDefault)
            .map((address, index) => (
              <View
                key={address.id}
                style={tw`bg-white rounded-2xl shadow-sm border border-amber-200 p-5 mb-3`}
              >
                <View style={tw`flex-row justify-between items-start mb-3`}>
                  <View style={tw`flex-row items-center flex-1`}>
                    <View
                      style={[
                        tw`w-10 h-10 rounded-full items-center justify-center mr-3`,
                        { backgroundColor: getTypeBackground(address.type) },
                      ]}
                    >
                      <Icon
                        name={getTypeIcon(address.type)}
                        size={20}
                        color={getTypeColor(address.type)}
                      />
                    </View>
                    <View style={tw`flex-1`}>
                      <Text style={tw`text-lg font-bold text-amber-900`}>
                        {address.title}
                      </Text>
                      <Text style={tw`text-amber-600 text-sm`}>
                        {address.name}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={tw`mb-4`}>
                  <Text style={tw`text-amber-800 text-base leading-6`}>
                    {address.street}
                    {address.apartment && `, ${address.apartment}`}
                  </Text>
                  <Text style={tw`text-amber-800 text-base`}>
                    {address.city}, {address.state} {address.zipCode}
                  </Text>
                  <Text style={tw`text-amber-600 text-sm mt-1`}>
                    {address.phone}
                  </Text>
                </View>

                <View style={tw`flex-row justify-between items-center`}>
                  <TouchableOpacity
                    style={tw`bg-amber-600 px-4 py-2 rounded-full`}
                    onPress={() => handleSetDefault(address.id)}
                  >
                    <Text style={tw`text-white text-sm font-semibold`}>
                      Set as Default
                    </Text>
                  </TouchableOpacity>

                  <View style={tw`flex-row`}>
                    <TouchableOpacity
                      style={tw`p-2 mx-1`}
                      onPress={() => handleEditAddress(address.id)}
                    >
                      <Icon name="edit" size={20} color="#6F4E37" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={tw`p-2 mx-1`}
                      onPress={() => handleDeleteAddress(address.id)}
                    >
                      <Icon name="delete" size={20} color="#DC2626" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
        </View>

        {/* Empty State (if no addresses) */}
        {addresses.length === 0 && (
          <View style={tw`items-center justify-center py-12`}>
            <Icon name="location-off" size={64} color="#A67B5B" />
            <Text style={tw`text-amber-900 text-xl font-bold mt-4`}>
              No Addresses Saved
            </Text>
            <Text style={tw`text-amber-600 text-center mt-2 px-8`}>
              You haven't saved any addresses yet. Add your first address to get
              started!
            </Text>
            <TouchableOpacity
              style={tw`bg-amber-700 rounded-2xl px-8 py-4 mt-6 shadow-lg`}
              onPress={handleAddNewAddress}
            >
              <Text style={tw`text-white text-lg font-bold`}>
                Add Your First Address
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Add New Address Floating Button */}
      {addresses.length > 0 && (
        <View style={tw`absolute bottom-6 right-6`}>
          <TouchableOpacity
            style={tw`bg-amber-700 w-12 h-12 rounded-full items-center justify-center shadow-2xl`}
            onPress={handleAddNewAddress}
          >
            <Icon name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default SavedAddressScreen;
