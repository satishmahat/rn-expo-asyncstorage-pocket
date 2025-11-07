import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { useExpense } from '../../context/ExpenseContext'

export default function NameInput() {
  const [name, setName] = useState('')
  const { completeOnboarding } = useExpense()
  const router = useRouter()
  const { width, height } = Dimensions.get('window')

  const handleContinue = () => {
    if (name.trim().length === 0) {
      Alert.alert('Please enter your name')
      return
    }
    
    completeOnboarding(name.trim())
    router.replace('/(tabs)')
  }

  return (
    <ImageBackground 
      source={require('../../assets/images/onboard-bg.png')}
      className="flex-1"
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 items-center justify-center pt-10">
            {/* Top Section - Logo */}
            <View 
              className="items-center justify-center"
              style={{
                width,
                height: height * 0.3,
              }}
            >
              <Text className="text-xl font-syneBold text-white text-center mb-2">
                Get Started With
              </Text>
              <Image
                source={require('../../assets/images/pocket.png')}
                className="w-80 h-14"
                resizeMode="contain"
              />
            </View>

            {/* Bottom White Section */}
            <View 
              className="bg-white justify-center items-center"
              style={{
                width,
                height: height * 0.7,
                borderTopLeftRadius: width,
                borderTopRightRadius: width,
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowOffset: { width: 0, height: -4 },
                shadowRadius: 10,
                elevation: 10,
              }}
            >
              {/* Header */}
              <View className="mb-8 items-center w-full">
                <Text className="text-4xl font-syneBold text-black text-center mb-4 leading-tight">
                  What should we call you?
                </Text>
                <Text className="text-base font-syneSemiBold text-gray-600 text-center leading-6">
                  We'll personalize your experience
                </Text>
              </View>

              {/* Input Field */}
              <View className="w-full mb-6 px-8">
                <TextInput
                  className="bg-gray-50 p-4 rounded-3xl text-black text-center text-3xl font-syneSemiBold border border-gray-200"
                  placeholder="Enter your name"
                  placeholderTextColor="lightgray"
                  value={name}
                  onChangeText={setName}
                  onSubmitEditing={handleContinue}
                />
              </View>

              {/* Continue Button */}
              <View>
                <TouchableOpacity
                  className="bg-[#52c1b7] py-4 px-12 rounded-full shadow-sm"
                  onPress={handleContinue}
                  activeOpacity={0.85}
                >
                  <Text className="text-white text-xl font-syneSemiBold text-center">
                    Start Budgeting →
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

