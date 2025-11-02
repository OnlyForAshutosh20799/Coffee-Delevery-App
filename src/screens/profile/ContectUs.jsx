import { Text, View, ScrollView, TouchableOpacity, TextInput, Alert, Linking, Image, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import tw from 'twrnc'

const ContactUs = () => {
   const { width } = useWindowDimensions()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

 
  const isTablet = width >= 768 // 📱 Tablet breakpoint

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
      answer: 'Yes, we offer delivery within 5 miles. Free delivery on orders above ₹200.'
    },
    {
      question: 'What are your brewing methods?',
      answer: 'We use pour-over, French press, espresso, and cold brew methods.'
    },
    {
      question: 'Do you have vegan options?',
      answer: 'Yes! We offer almond, oat, and soy milk alternatives for all our beverages.'
    },
    {
      question: 'Can I reserve a table?',
      answer: 'Yes, for groups of 4+ via our app or website.'
    }
  ]

  return (
    <ScrollView style={tw`flex-1 bg-amber-50`} showsVerticalScrollIndicator={false}>
      {/* 🟤 Header Section */}
      <View style={tw`bg-amber-200 pt-10 pb-6 px-6`}>
        <Text
          style={[
            tw`font-bold text-amber-900 text-center mb-2`,
            { fontSize: isTablet ? 34 : 26 }
          ]}
        >
          Contact Us
        </Text>
        <Text
          style={[
            tw`text-amber-600 text-center`,
            { fontSize: isTablet ? 18 : 14, lineHeight: isTablet ? 24 : 20 }
          ]}
        >
          We'd love to hear from you. Get in touch with our coffee experts!
        </Text>
      </View>

      {/* ☕ Contact Methods */}
      <View style={tw`px-6 mt-8`}>
        <Text
          style={[
            tw`font-bold text-amber-900 mb-6 text-center`,
            { fontSize: isTablet ? 28 : 22 }
          ]}
        >
          Get in Touch
        </Text>

        <View
          style={[
            tw`flex-row flex-wrap justify-between`,
            { gap: isTablet ? 20 : 10 }
          ]}
        >
          {contactMethods.map((method, index) => (
            <TouchableOpacity
              key={index}
              style={[
                tw`bg-white rounded-2xl shadow-sm border border-amber-200 p-5 mb-4 items-center`,
                { width: isTablet ? '47%' : '48%' }
              ]}
              onPress={method.action}
              disabled={!method.action}
            >
              <View
                style={[
                  tw`w-14 h-14 rounded-full items-center justify-center mb-3`,
                  { backgroundColor: `${method.color}15` }
                ]}
              >
                <Icon name={method.icon} size={isTablet ? 36 : 28} color={method.color} />
              </View>
              <Text
                style={[
                  tw`text-amber-900 font-bold text-center mb-1`,
                  { fontSize: isTablet ? 18 : 14 }
                ]}
              >
                {method.title}
              </Text>
              <Text
                style={[
                  tw`text-amber-600 text-center`,
                  { fontSize: isTablet ? 14 : 12 }
                ]}
              >
                {method.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 📝 Contact Form */}
      <View style={tw`px-6 mt-6`}>
        <Text
          style={[
            tw`font-bold text-amber-900 mb-6 text-center`,
            { fontSize: isTablet ? 28 : 22 }
          ]}
        >
          Send us a Message
        </Text>

        <View style={tw`bg-white rounded-2xl shadow-sm border border-amber-200 p-6`}>
          {['name', 'email', 'subject', 'message'].map((field, index) => (
            <View key={index} style={tw`mb-5`}>
              <Text style={tw`text-amber-700 font-medium mb-2 capitalize`}>
                {field === 'email' ? 'Email Address' : field}
              </Text>
              <TextInput
                style={[
                  tw`border-2 border-amber-200 rounded-xl px-4 py-3 text-amber-900 bg-amber-50`,
                  field === 'message' && { height: isTablet ? 150 : 100, textAlignVertical: 'top' }
                ]}
                placeholder={
                  field === 'name'
                    ? 'Enter your full name'
                    : field === 'email'
                    ? 'Enter your email'
                    : field === 'subject'
                    ? 'What is this regarding?'
                    : 'Tell us how we can help you...'
                }
                placeholderTextColor="#A67B5B"
                value={formData[field]}
                onChangeText={(text) => handleInputChange(field, text)}
                keyboardType={field === 'email' ? 'email-address' : 'default'}
                multiline={field === 'message'}
              />
            </View>
          ))}

          {/* 📤 Submit */}
          <TouchableOpacity
            style={tw`bg-amber-700 rounded-full py-3 shadow-lg`}
            onPress={handleSubmit}
          >
            <Text style={tw`text-white text-center font-bold text-base`}>
              Send Message
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 🌐 Social Media */}
      <View style={tw`px-6 mb-10 mt-8`}>
        <Text
          style={[
            tw`font-bold text-amber-900 mb-4 text-center`,
            { fontSize: isTablet ? 24 : 18 }
          ]}
        >
          Follow Us
        </Text>
        <View
          style={[
            tw`flex-row justify-center`,
            { gap: isTablet ? 20 : 10 }
          ]}
        >
          {['facebook', 'instagram', 'twitter', 'share'].map((social, index) => (
            <TouchableOpacity
              key={index}
              style={tw`w-12 h-12 rounded-full bg-amber-200 items-center justify-center`}
            >
              <Icon name={social} size={isTablet ? 26 : 22} color="#6F4E37" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

export default ContactUs
