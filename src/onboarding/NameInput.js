import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ImageBackground, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import tw from '../utils/tw'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useExpense } from '../context/ExpenseContext'

const NameInput = ({ navigation }) => {
  const [name, setName] = useState('')
  const { completeOnboarding } = useExpense()

  const handleContinue = () => {
    if (name.trim().length === 0) {
      Alert.alert('Please enter your name')
      return
    }
    
    completeOnboarding(name.trim())
  }

  return (
    <ImageBackground 
      source={require('../../assets/onboard-bg.png')}
      style={tw`flex-1`}
      resizeMode="cover"
    >
      <SafeAreaView style={tw`flex-1`}>
        <KeyboardAvoidingView
          style={tw`flex-1`}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={tw`flex-1 justify-center items-center px-8`}>
            {/* Header Content */}
            <View style={tw`mb-12 items-center w-full`}>
              <Text style={tw`text-5xl font-syneBold text-white text-center mb-4 leading-tight`}>
                What should we call you?
              </Text>
              <Text style={tw`text-lg font-syne text-white/80 text-center px-4 leading-6`}>
                We'll personalize your experience
              </Text>
            </View>

            {/* Input Section */}
            <View style={tw`w-full mb-8`}>
              <TextInput
                style={tw`bg-white p-5 rounded-3xl text-gray-800 text-lg font-syne shadow-lg border-0`}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
                // returnKeyType="done"
                onSubmitEditing={handleContinue}
              />
            </View>

            {/* Continue Button */}
            <TouchableOpacity
              style={tw`bg-white p-6 rounded-3xl items-center shadow-xl w-full`}
              onPress={handleContinue}
              activeOpacity={0.85}
            >
              <Text style={tw`text-[#52c1b7] text-xl font-syneSemiBold`}>Continue</Text>
            </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default NameInput

const styles = StyleSheet.create({})

