import { Text, View, ScrollView, TouchableOpacity, TextInput, Linking, Alert } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import tw from 'twrnc'

const HelpScreen = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFaq, setExpandedFaq] = useState(null)

  const helpCategories = [
    {
      id: 1,
      title: 'Order Issues',
      description: 'Track orders, cancellations, refunds',
      icon: 'shopping-bag',
      color: '#059669',
      items: [
        'How to track my order?',
        'Can I modify my order?',
        'Order cancellation policy',
        'Missing items in order'
      ]
    },
    {
      id: 2,
      title: 'Payment & Pricing',
      description: 'Billing, payments, pricing issues',
      icon: 'payment',
      color: '#2563eb',
      items: [
        'Payment methods accepted',
        'Refund processing time',
        'Coupon code issues',
        'Price discrepancy'
      ]
    },
    {
      id: 3,
      title: 'Delivery',
      description: 'Shipping, delivery times, tracking',
      icon: 'delivery-dining',
      color: '#d97706',
      items: [
        'Delivery areas & charges',
        'Delivery time estimates',
        'Track delivery partner',
        'Reschedule delivery'
      ]
    },
    {
      id: 4,
      title: 'Account & Profile',
      description: 'Login, profile, account settings',
      icon: 'person',
      color: '#7c3aed',
      items: [
        'Reset password',
        'Update profile information',
        'Delete account',
        'Loyalty points'
      ]
    },
    {
      id: 5,
      title: 'Coffee & Products',
      description: 'Product info, brewing, quality',
      icon: 'coffee',
      color: '#dc2626',
      items: [
        'Coffee brewing guides',
        'Product quality issues',
        'Allergy information',
        'Storage instructions'
      ]
    },
    {
      id: 6,
      title: 'App & Technical',
      description: 'App issues, features, updates',
      icon: 'smartphone',
      color: '#475569',
      items: [
        'App not working',
        'Update app version',
        'Notification issues',
        'Feature requests'
      ]
    }
  ]

  const faqs = [
    {
      id: 1,
      question: 'How long does delivery take?',
      answer: 'Delivery typically takes 25-45 minutes depending on your location and order volume. You can track your order in real-time through the app.',
      category: 'Delivery'
    },
    {
      id: 2,
      question: 'Can I modify my order after placing it?',
      answer: 'You can modify your order within 5 minutes of placing it. After that, please contact our support team immediately. Once preparation starts, changes may not be possible.',
      category: 'Order Issues'
    },
    {
      id: 3,
      question: 'What payment methods do you accept?',
      answer: 'We accept credit/debit cards, UPI, net banking, and cash on delivery. All digital payments are secure and encrypted.',
      category: 'Payment & Pricing'
    },
    {
      id: 4,
      question: 'How do I earn loyalty points?',
      answer: 'You earn 10 points for every ₹100 spent. Points can be redeemed for discounts and free items. 100 points = ₹50 discount.',
      category: 'Account & Profile'
    },
    {
      id: 5,
      question: 'What is your refund policy?',
      answer: 'Full refunds are provided for cancelled orders before preparation. For quality issues, we offer replacement or refund within 24 hours of delivery.',
      category: 'Payment & Pricing'
    },
    {
      id: 6,
      question: 'Do you have vegan options?',
      answer: 'Yes! We offer almond milk, oat milk, and soy milk alternatives. All our plant-based options are clearly marked in the menu.',
      category: 'Coffee & Products'
    }
  ]

  const contactMethods = [
    {
      icon: 'phone',
      title: 'Call Us',
      description: '24/7 Customer Support',
      details: '+91 7667411501',
      action: () => Linking.openURL('tel:+917667411501'),
      color: '#059669'
    },
    {
      icon: 'email',
      title: 'Email Us',
      description: 'Quick response guaranteed',
      details: 'rohit@gmail.com',
      action: () => Linking.openURL('mailto:support@brewbean.com'),
      color: '#2563eb'
    }
  ]

  const toggleFaq = (faqId) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId)
  }

  const handleContactSupport = () => {
    Alert.alert(
      'Contact Support',
      'Choose your preferred contact method',
      [
        { text: 'Call', onPress: () => Linking.openURL('tel:+15551234567') },
        { text: 'Email', onPress: () => Linking.openURL('mailto:support@brewbean.com') },
        { text: 'Live Chat', onPress: () => console.log('Open live chat') },
        { text: 'Cancel', style: 'cancel' }
      ]
    )
  }

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <View style={tw`flex-1 bg-amber-50`}>
      {/* Header */}
      <View style={tw`bg-amber-100 pt-11 pb-5 px-6`}>
        <Text style={tw`text-2xl font-bold text-amber-800 text-center`}>Help & Support</Text>
        <Text style={tw`text-amber-700 text-center text-base`}>
          We're here to help you with any questions
        </Text>
      </View>

      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>

        {/* Quick Help Categories */}
        <View style={tw`px-6 mt-8`}>
          <Text style={tw`text-xl font-bold text-amber-900 mb-4`}>Quick Help</Text>
          <View style={tw`flex-row flex-wrap justify-between`}>
            {helpCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={tw`bg-white rounded-2xl shadow-sm border border-amber-200 p-4 mb-4 w-48% items-center`}
                onPress={() => console.log('Open category', category.title)}
              >
                <View 
                  style={[
                    tw`w-14 h-14 rounded-full items-center justify-center mb-3`,
                    { backgroundColor: `${category.color}15` }
                  ]}
                >
                  <Icon name={category.icon} size={28} color={category.color} />
                </View>
                <Text style={tw`text-amber-900 font-bold text-center text-sm mb-1`}>
                  {category.title}
                </Text>
                <Text style={tw`text-amber-600 text-center text-xs`}>
                  {category.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Contact Methods */}
        <View style={tw`px-6 mt-6`}>
          <Text style={tw`text-xl font-bold text-amber-900 mb-4`}>Get in Touch</Text>
          <View style={tw`bg-white rounded-2xl shadow-sm border border-amber-200 p-5`}>
            <View style={tw`flex-row flex-wrap justify-between`}>
              {contactMethods.map((method, index) => (
                <TouchableOpacity
                  key={index}
                  style={tw`items-center mb-4 w-48%`}
                  onPress={method.action}
                >
                  <View 
                    style={[
                      tw`w-12 h-12 rounded-full items-center justify-center mb-2`,
                      { backgroundColor: `${method.color}15` }
                    ]}
                  >
                    <Icon name={method.icon} size={24} color={method.color} />
                  </View>
                  <Text style={tw`text-amber-900 font-bold text-sm text-center`}>
                    {method.title}
                  </Text>
                  <Text style={tw`text-amber-600 text-xs text-center mt-1`}>
                    {method.description}
                  </Text>
                  <Text style={tw`text-amber-700 text-xs text-center mt-1 font-medium`}>
                    {method.details}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {/* Quick Support Button */}
            <TouchableOpacity 
              style={tw`bg-amber-700 rounded-full py-2 mt-2 shadow-lg`}
              onPress={handleContactSupport}
            >
              <Text style={tw`text-white text-center text-md font-bold`}>
                Get Quick Support
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FAQ Section */}
        <View style={tw`px-6 mt-6 mb-5`}>
          <Text style={tw`text-xl font-bold text-amber-900 mb-4`}>
            Frequently Asked Questions
          </Text>
          
          <View style={tw`bg-white rounded-2xl shadow-sm border border-amber-200 overflow-hidden`}>
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <View key={faq.id}>
                  <TouchableOpacity
                    style={tw`p-5 flex-row justify-between items-center`}
                    onPress={() => toggleFaq(faq.id)}
                  >
                    <View style={tw`flex-1 pr-4`}>
                      <Text style={tw`text-amber-900 font-medium text-base`}>
                        {faq.question}
                      </Text>
                      <Text style={tw`text-amber-500 text-xs mt-1`}>
                        {faq.category}
                      </Text>
                    </View>
                    <Icon 
                      name={expandedFaq === faq.id ? 'expand-less' : 'expand-more'} 
                      size={24} 
                      color="#6F4E37" 
                    />
                  </TouchableOpacity>
                  
                  {expandedFaq === faq.id && (
                    <View style={tw`px-5 pb-5`}>
                      <Text style={tw`text-amber-700 text-sm leading-6`}>
                        {faq.answer}
                      </Text>
                      <TouchableOpacity 
                        style={tw`mt-3`}
                        onPress={() => console.log('Helpful', faq.id)}
                      >
                        <Text style={tw`text-amber-600 text-xs font-medium`}>
                          Was this helpful? 👍 👎
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  
                  {index < filteredFaqs.length - 1 && expandedFaq !== faq.id && (
                    <View style={tw`h-px bg-amber-100 mx-5`} />
                  )}
                </View>
              ))
            ) : (
              <View style={tw`p-8 items-center`}>
                <Icon name="search-off" size={48} color="#A67B5B" />
                <Text style={tw`text-amber-900 font-bold text-lg mt-4 text-center`}>
                  No results found
                </Text>
                <Text style={tw`text-amber-600 text-center mt-2`}>
                  Try searching with different keywords
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default HelpScreen