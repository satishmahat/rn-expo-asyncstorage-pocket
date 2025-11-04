import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  KeyboardAvoidingView, 
  Platform, 
  ImageBackground, 
  TouchableWithoutFeedback, 
  Keyboard, 
  Dimensions 
} from 'react-native'
import React, { useState } from 'react'
import tw from '../utils/tw'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useExpense } from '../context/ExpenseContext'

const NameInput = ({ navigation }) => {
  const [name, setName] = useState('')
  const { completeOnboarding } = useExpense()
  const { width, height } = Dimensions.get('window')

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
        <KeyboardAvoidingView
          style={tw`flex-1`}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={tw`flex-1 items-center px-8 pt-10 justify-center`}>
              {/* Top Section - Logo */}
              <View style={[tw`items-center justify-center`,
                {
                  width,
                  height: height * 0.25,
                }
              ]}>
                <Text style={tw`text-sm font-syneBold text-white text-center mb-2`}>
                  Get Started With
                </Text>
                <Image
                  source={require('../../assets/pocket.png')}
                  style={tw`w-80 h-12`}
                  resizeMode="contain"
                />
              </View>

              {/* Bottom White Section */}
              <View 
                style={[
                  tw` bg-white justify-center items-center`, 
                  {
                    width,
                    height: height * 0.75,
                    borderTopLeftRadius: width,
                    borderTopRightRadius: width,
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowOffset: { width: 0, height: -4 },
                    shadowRadius: 10,
                    elevation: 10,
                  },
                ]}
              >
                  {/* Header */}
                  <View style={tw`mb-8 items-center w-full`}>
                    <Text style={tw`text-4xl font-syneBold text-black text-center mb-4 leading-tight`}>
                      What should we call you?
                    </Text>
                    <Text style={tw`text-base font-syne text-gray-600 text-center leading-6`}>
                      We'll personalize your experience
                    </Text>
                  </View>

                  {/* Input Field */}
                  <View style={tw`w-full mb-6 px-6`}>
                    <TextInput
                      style={tw` bg-gray-50 p-5 rounded-3xl text-black text-lg font-syne shadow-sm border border-gray-200`}
                      placeholder="Enter your name"
                      value={name}
                      onChangeText={setName}
                      onSubmitEditing={handleContinue}
                    />
                  </View>
                  {/* Continue Button */}
                  <View style={tw`px-6`}>
                    <TouchableOpacity
                      style={tw`bg-[#52c1b7] py-4 px-8 rounded-full shadow-sm`}
                      onPress={handleContinue}
                      activeOpacity={0.85}
                    >
                      <Text style={tw`text-white text-xl font-syneSemiBold text-center`}>
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

export default NameInput

const styles = StyleSheet.create({})
