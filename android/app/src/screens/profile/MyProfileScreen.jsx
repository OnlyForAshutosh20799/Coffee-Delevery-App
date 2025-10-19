import { Text, View, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import tw from 'twrnc'

const MyProfileScreen = () => {
  const [userData, setUserData] = useState({
    firstName: 'Tarun',
    lastName: 'Singh',
    email: 'tarun@example.com',
    phone: '+91 987654321',
    dateOfBirth: '1990-05-15',
    gender: 'Male'
  })

  const [address, setAddress] = useState({
    street: 'Near St. Johns School',
    apartment: 'Apt 4B',
    city: 'Patna',
    state: 'Bihar',
    zipCode: '802215',
    country: 'India',
    isDefault: true
  })

  const [isEditing, setIsEditing] = useState(false)
  const [isEditingAddress, setIsEditingAddress] = useState(false)

  const handleSaveProfile = () => {
    // Save profile logic here
    setIsEditing(false)
    Alert.alert('Success', 'Profile updated successfully!')
  }

  const handleSaveAddress = () => {
    // Save address logic here
    setIsEditingAddress(false)
    Alert.alert('Success', 'Address updated successfully!')
  }

  const handleChangeProfile = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleChangeAddress = (field, value) => {
    setAddress(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <ScrollView style={tw`flex-1 bg-amber-50`} showsVerticalScrollIndicator={false}>
  

      {/* Profile Photo Section */}
      <View style={tw`items-center  mb-6`}>
        <View style={tw`relative`}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80' }}
            style={tw`w-24 h-24 rounded-full border-4 border-amber-700 bg-white`}
          />
          <TouchableOpacity style={tw`absolute bottom-0 right-0 bg-amber-600 w-10 h-10 rounded-full items-center justify-center border-2 border-amber-50 shadow-lg`}>
            <Icon name="camera-alt" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <Text style={tw`text-amber-900 text-sm mt-2`}>Tap to change photo</Text>
      </View>

      {/* Personal Information Section */}
      <View style={tw`mx-6 mb-4`}>
        <View style={tw`flex flex-row itmes-center justify-between`}>
        <Text style={tw`text-xl font-bold text-amber-900 mb-2`}>Personal Information</Text>
        <TouchableOpacity 
            onPress={() => setIsEditing(!isEditing)}
            style={tw`text-amber-700 px-4 py-2 rounded-full flex-row items-center`}
          >
            <Icon 
              name={isEditing ? "close" : "edit"} 
              size={20} 
              color="#6F4E37" 
            />
            <Text style={tw`text-amber-800 font-semibold ml-1`}>
              {isEditing ? 'Cancel' : 'Edit'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={tw`bg-white rounded-2xl shadow-sm border border-amber-200 p-5`}>
          {/* Name Row */}
          <View style={tw`flex-row mb-0`}>
            <View style={tw`flex-1 mr-3`}>
              <Text style={tw`text-amber-700 font-medium mb-2`}>First Name</Text>
              {isEditing ? (
                <TextInput
                  style={tw`border-2 border-amber-200 rounded-xl px-4 py-2 text-amber-900 bg-amber-50`}
                  value={userData.firstName}
                  onChangeText={(text) => handleChangeProfile('firstName', text)}
                />
              ) : (
                <Text style={tw`text-amber-900 `}>{userData.firstName}</Text>
              )}
            </View>
            <View style={tw`flex-1 ml-3`}>
              <Text style={tw`text-amber-700 font-medium mb-2`}>Last Name</Text>
              {isEditing ? (
                <TextInput
                  style={tw`border-2 border-amber-200 rounded-xl px-4 py-2 text-amber-900 bg-amber-50`}
                  value={userData.lastName}
                  onChangeText={(text) => handleChangeProfile('lastName', text)}
                />
              ) : (
                <Text style={tw`text-amber-900 `}>{userData.lastName}</Text>
              )}
            </View>
          </View>

          {/* Email */}
          <View style={tw`mb-4 mt-4`}>
            <Text style={tw`text-amber-700 font-medium mb-2`}>Email Address</Text>
            {isEditing ? (
              <TextInput
                style={tw`border-2 border-amber-200 rounded-xl px-4 py-2 text-amber-900 bg-amber-50`}
                value={userData.email}
                onChangeText={(text) => handleChangeProfile('email', text)}
                keyboardType="email-address"
              />
            ) : (
              <Text style={tw`text-amber-900 `}>{userData.email}</Text>
            )}
          </View>

          {/* Phone */}
          <View style={tw`mb-4`}>
            <Text style={tw`text-amber-700 font-medium mb-2`}>Phone Number</Text>
            {isEditing ? (
              <TextInput
                style={tw`border-2 border-amber-200 rounded-xl px-4 py-2 text-amber-900 bg-amber-50`}
                value={userData.phone}
                onChangeText={(text) => handleChangeProfile('phone', text)}
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={tw`text-amber-900 `}>{userData.phone}</Text>
            )}
          </View>

          {/* Date of Birth & Gender Row */}
          <View style={tw``}>
            <View style={tw`flex-1`}>
              <Text style={tw`text-amber-700 font-medium mb-2`}>Gender</Text>
              {isEditing ? (
                <View style={tw`border-2 border-amber-200 rounded-xl bg-amber-50`}>
                  <TextInput
                    style={tw`px-4 py-2 text-amber-900`}
                    value={userData.gender}
                    onChangeText={(text) => handleChangeProfile('gender', text)}
                    placeholder="Gender"
                  />
                </View>
              ) : (
                <Text style={tw`text-amber-900 `}>{userData.gender}</Text>
              )}
            </View>
          </View>

          {/* Save Button */}
          {isEditing && (
            <TouchableOpacity 
              style={tw`bg-amber-700 rounded-full py-2 mt-6 shadow-lg`}
              onPress={handleSaveProfile}
            >
              <Text style={tw`text-white text-center text-md font-bold`}>
                Save Changes
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Address Section */}
      <View style={tw`mx-6 mb-8`}>
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <Text style={tw`text-xl font-bold text-amber-900`}>My Address</Text>
          <TouchableOpacity 
            onPress={() => setIsEditingAddress(!isEditingAddress)}
            style={tw`flex-row items-center`}
          >
            <Icon 
              name={isEditingAddress ? "close" : "edit"} 
              size={20} 
              color="#6F4E37" 
            />
            <Text style={tw`text-amber-700 font-semibold ml-1`}>
              {isEditingAddress ? 'Cancel' : 'Edit'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={tw`bg-white rounded-2xl shadow-sm border border-amber-200 p-5`}>
          {/* Default Address Badge */}
          {address.isDefault && (
            <View style={tw`flex-row items-center mb-4`}>
              <Icon name="star" size={16} color="#D4AF37" />
              <Text style={tw`text-amber-700 font-semibold ml-1`}>Default Address</Text>
            </View>
          )}

          {/* Street Address */}
          <View style={tw`mb-4`}>
            <Text style={tw`text-amber-700 font-medium mb-2`}>Street Address</Text>
            {isEditingAddress ? (
              <TextInput
                style={tw`border-2 border-amber-200 rounded-xl px-4 py-2 text-amber-900 bg-amber-50`}
                value={address.street}
                onChangeText={(text) => handleChangeAddress('street', text)}
                placeholder="Street address"
              />
            ) : (
              <Text style={tw`text-amber-900 text-md`}>{address.street}</Text>
            )}
          </View>

          {/* Apartment/Unit */}
          <View style={tw`mb-4`}>
            <Text style={tw`text-amber-700 font-medium mb-2`}>Apartment/Unit</Text>
            {isEditingAddress ? (
              <TextInput
                style={tw`border-2 border-amber-200 rounded-xl px-4 py-2 text-amber-900 bg-amber-50`}
                value={address.apartment}
                onChangeText={(text) => handleChangeAddress('apartment', text)}
                placeholder="Apt, suite, unit, etc."
              />
            ) : (
              <Text style={tw`text-amber-900 text-md`}>{address.apartment}</Text>
            )}
          </View>

          {/* City, State, ZIP Row */}
          <View style={tw`flex-row mb-4`}>
            <View style={tw`flex-1 mr-3`}>
              <Text style={tw`text-amber-700 font-medium mb-2`}>City</Text>
              {isEditingAddress ? (
                <TextInput
                  style={tw`border-2 border-amber-200 rounded-xl px-4 py-2 text-amber-900 bg-amber-50`}
                  value={address.city}
                  onChangeText={(text) => handleChangeAddress('city', text)}
                />
              ) : (
                <Text style={tw`text-amber-900 text-md`}>{address.city}</Text>
              )}
            </View>
            <View style={tw`w-20 mr-3`}>
              <Text style={tw`text-amber-700 font-medium mb-2`}>State</Text>
              {isEditingAddress ? (
                <TextInput
                  style={tw`border-2 border-amber-200 rounded-xl px-4 py-2 text-amber-900 bg-amber-50`}
                  value={address.state}
                  onChangeText={(text) => handleChangeAddress('state', text)}
                />
              ) : (
                <Text style={tw`text-amber-900 text-md`}>{address.state}</Text>
              )}
            </View>
            <View style={tw`flex-1 ml-3`}>
              <Text style={tw`text-amber-700 font-medium mb-2`}>ZIP Code</Text>
              {isEditingAddress ? (
                <TextInput
                  style={tw`border-2 border-amber-200 rounded-xl px-4 py-2 text-amber-900 bg-amber-50`}
                  value={address.zipCode}
                  onChangeText={(text) => handleChangeAddress('zipCode', text)}
                  keyboardType="number-pad"
                />
              ) : (
                <Text style={tw`text-amber-900 text-md`}>{address.zipCode}</Text>
              )}
            </View>
          </View>

          {/* Country */}
          <View style={tw`mb-6`}>
            <Text style={tw`text-amber-700 font-medium mb-2`}>Country</Text>
            {isEditingAddress ? (
              <TextInput
                style={tw`border-2 border-amber-200 rounded-xl px-4 py-2 text-amber-900 bg-amber-50`}
                value={address.country}
                onChangeText={(text) => handleChangeAddress('country', text)}
              />
            ) : (
              <Text style={tw`text-amber-900 text-md `}>{address.country}</Text>
            )}
          </View>

          {/* Set as Default Checkbox */}
          {isEditingAddress && (
            <TouchableOpacity 
              style={tw`flex-row items-center mb-6`}
              onPress={() => handleChangeAddress('isDefault', !address.isDefault)}
            >
              <View style={tw`w-6 h-6 rounded-md border-2 border-amber-700 mr-3 items-center justify-center ${
                address.isDefault ? 'bg-amber-700' : 'bg-white'
              }`}>
                {address.isDefault && <Icon name="check" size={16} color="#FFFFFF" />}
              </View>
              <Text style={tw`text-amber-800 font-medium`}>Set as default address</Text>
            </TouchableOpacity>
          )}

          {/* Save Address Button */}
          {isEditingAddress && (
            <TouchableOpacity 
              style={tw`bg-amber-700 rounded-full py-2 shadow-lg`}
              onPress={handleSaveAddress}
            >
              <Text style={tw`text-white text-center text-md font-bold`}>
                Save Address
              </Text>
            </TouchableOpacity>
          )}

          {/* Add New Address Button */}
          {!isEditingAddress && (
            <TouchableOpacity 
              style={tw`border-2 border-amber-700 rounded-full py-2 mt-4 flex-row justify-center items-center`}
            >
              <Icon name="add" size={20} color="#6F4E37" />
              <Text style={tw`text-amber-900 text-md font-semibold ml-2`}>
                Add New Address
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Additional Options */}
      <View style={tw`mx-6 mb-8`}>
        <Text style={tw`text-xl font-bold text-amber-900 mb-4`}>Account Settings</Text>
        <View style={tw`bg-white rounded-2xl shadow-sm border border-amber-200 overflow-hidden`}>
          <TouchableOpacity style={tw`flex-row justify-between items-center py-4 px-5 border-b border-amber-100`}>
            <Text style={tw`text-amber-900 text-base font-medium`}>Change Password</Text>
            <Icon name="chevron-right" size={22} color="#A67B5B" />
          </TouchableOpacity>
          <TouchableOpacity style={tw`flex-row justify-between items-center py-4 px-5`}>
            <Text style={tw`text-amber-900 text-base font-medium`}>Delete Account</Text>
            <Icon name="chevron-right" size={22} color="#A67B5B" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default MyProfileScreen