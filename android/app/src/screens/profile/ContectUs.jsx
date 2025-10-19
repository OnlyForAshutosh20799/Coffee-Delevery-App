import { Text, View, ScrollView, TouchableOpacity, TextInput, Alert, Linking } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import tw from 'twrnc'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      Alert.alert('Error', 'Please fill all fields')
      return
    }
    
    // Handle form submission
    Alert.alert('Success', 'Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const contactMethods = [
    {
      icon: 'phone',
      title: 'Call Us',
      description: '+91 7667411501',
      action: () => Linking.openURL('tel:+917667411501'),
      color: '#059669'
    },
    {
      icon: 'email',
      title: 'Email Us',
      description: 'rohit@bgmail.com',
      action: () => Linking.openURL('mailto:support@abc.com'),
      color: '#2563eb'
    },
    {
      icon: 'location-on',
      title: 'Visit Us',
      description: '86889 Koriari Bihar 802215, India',
      action: () => Linking.openURL('https://maps.app.goo.gl/'),
      color: '#7c3aed'
    },
    {
      icon: 'access-time',
      title: 'Business Hours',
      description: 'Mon-Sun: 6:00 AM - 10:00 PM',
      action: null,
      color: '#dc2626'
    }
  ]

  const faqs = [
    {
      question: 'Do you offer delivery?',
      answer: 'Yes, we offer delivery within 5 miles. Free delivery on orders above $25.'
    },
    {
      question: 'What are your brewing methods?',
      answer: 'We use various brewing methods including pour-over, French press, espresso, and cold brew.'
    },
    {
      question: 'Do you have vegan options?',
      answer: 'Yes, we offer almond, oat, and soy milk alternatives for all our beverages.'
    },
    {
      question: 'Can I reserve a table?',
      answer: 'Yes, you can reserve tables for groups of 4 or more through our app or website.'
    }
  ]

  return (
    <ScrollView style={tw`flex-1 bg-amber-50`} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={tw`bg-amber-200 pt-5 pb-5 px-6 `}>
        <Text style={tw`text-3xl font-bold text-amber-900 text-center mb-2`}>Contact Us</Text>
        <Text style={tw`text-amber-500 text-center text-base`}>
          We'd love to hear from you. Get in touch with our coffee experts!
        </Text>
      </View>

      {/* Contact Methods */}
      <View style={tw`px-6 mt-8`}>
        <Text style={tw`text-2xl font-bold text-amber-900 mb-6 text-center`}>
          Get in Touch
        </Text>
        
        <View style={tw`flex-row flex-wrap justify-between`}>
          {contactMethods.map((method, index) => (
            <TouchableOpacity
              key={index}
              style={tw`bg-white rounded-2xl shadow-sm border border-amber-200 p-5 mb-4 w-48% items-center`}
              onPress={method.action}
              disabled={!method.action}
            >
              <View style={[tw`w-14 h-14 rounded-full items-center justify-center mb-3`, 
                          { backgroundColor: `${method.color}15` }]}>
                <Icon name={method.icon} size={28} color={method.color} />
              </View>
              <Text style={tw`text-amber-900 font-bold text-center text-sm mb-1`}>
                {method.title}
              </Text>
              <Text style={tw`text-amber-600 text-center text-xs`}>
                {method.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Contact Form */}
      <View style={tw`px-6 mt-6`}>
        <Text style={tw`text-2xl font-bold text-amber-900 mb-6 text-center`}>
          Send us a Message
        </Text>
        
        <View style={tw`bg-white rounded-2xl shadow-sm border border-amber-200 p-6`}>
          {/* Name Input */}
          <View style={tw`mb-5`}>
            <Text style={tw`text-amber-700 font-medium mb-2`}>Full Name</Text>
            <TextInput
              style={tw`border-2 border-amber-200 rounded-xl px-4 py-3 text-amber-900 bg-amber-50`}
              placeholder="Enter your full name"
              placeholderTextColor="#A67B5B"
              value={formData.name}
              onChangeText={(text) => handleInputChange('name', text)}
            />
          </View>

          {/* Email Input */}
          <View style={tw`mb-5`}>
            <Text style={tw`text-amber-700 font-medium mb-2`}>Email Address</Text>
            <TextInput
              style={tw`border-2 border-amber-200 rounded-xl px-4 py-3 text-amber-900 bg-amber-50`}
              placeholder="Enter your email"
              placeholderTextColor="#A67B5B"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              keyboardType="email-address"
            />
          </View>

          {/* Subject Input */}
          <View style={tw`mb-5`}>
            <Text style={tw`text-amber-700 font-medium mb-2`}>Subject</Text>
            <TextInput
              style={tw`border-2 border-amber-200 rounded-xl px-4 py-3 text-amber-900 bg-amber-50`}
              placeholder="What is this regarding?"
              placeholderTextColor="#A67B5B"
              value={formData.subject}
              onChangeText={(text) => handleInputChange('subject', text)}
            />
          </View>

          {/* Message Input */}
          <View style={tw`mb-6`}>
            <Text style={tw`text-amber-700 font-medium mb-2`}>Message</Text>
            <TextInput
              style={tw`border-2 border-amber-200 rounded-xl px-4 py-3 text-amber-900 bg-amber-50 h-32 text-align-vertical-top`}
              placeholder="Tell us how we can help you..."
              placeholderTextColor="#A67B5B"
              value={formData.message}
              onChangeText={(text) => handleInputChange('message', text)}
              multiline
              numberOfLines={5}
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity 
            style={tw`bg-amber-700 rounded-full py-2 shadow-lg`}
            onPress={handleSubmit}
          >
            <Text style={tw`text-white text-center text-md font-bold`}>
              Send Message
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Social Media */}
      <View style={tw`px-6 mb-8 mt-4`}>
        <Text style={tw`text-xl font-bold text-amber-900 mb-4 text-center`}>
          Follow Us
        </Text>
        <View style={tw`flex-row justify-center`}>
          {['facebook', 'instagram', 'twitter', 'share'].map((social, index) => (
            <TouchableOpacity
              key={index}
              style={tw`w-12 h-12 rounded-full bg-amber-200 items-center justify-center mx-2`}
            >
              <Icon name={social} size={24} color="#6F4E37" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

export default ContactUs