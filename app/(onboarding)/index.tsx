import { useRouter } from 'expo-router'
import React from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native'

export default function Welcome() {
  const router = useRouter()
  const { width, height } = Dimensions.get('window')

  return (
    <ImageBackground 
      source={require('../../assets/images/onboard-bg.png')}
      className="flex-1"
      resizeMode="cover"
    >
      <View className="flex-1 items-center px-8 pb-10">
        {/* top section */}
        <View 
          className="bg-white items-center"
          style={{
            width,
            height: height * 0.7,
            borderBottomLeftRadius: width,
            borderBottomRightRadius: width,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 10,
            elevation: 10,
          }}
        >
          <View className="flex-1 justify-center items-center gap-4">
            <Text className="text-xl font-syneBold text-black text-center">Welcome To</Text>
            <Image
              source={require('../../assets/images/pocket.png')}
              className="w-80 h-14"
              resizeMode="contain"
            />
            <Image
              source={require('../../assets/images/welcome-bg.png')}
              className="h-80 w-76"
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Bottom Section - Get Started Button */}
        <View className="flex-1 justify-center items-center">
          <TouchableOpacity
            className="bg-white py-4 px-12 rounded-full shadow-lg"
            onPress={() => router.push('/(onboarding)/name-input' as any)}
            activeOpacity={0.85}
          >
            <Text className="text-[#52c1b7] text-xl font-syneBold text-center">Get Started →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  )
}

