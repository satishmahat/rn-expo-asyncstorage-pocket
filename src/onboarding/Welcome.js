import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image, Dimensions } from 'react-native'
import React from 'react'
import tw from '../utils/tw'
import { SafeAreaView } from 'react-native-safe-area-context'

const Welcome = ({ navigation }) => {
  const { width, height } = Dimensions.get('window')
  return (
    <ImageBackground 
      source={require('../../assets/onboard-bg.png')}
      style={tw`flex-1`}
      resizeMode="cover"
    >
      <View style={tw`flex-1 items-center px-8 pb-10`}>

        {/* top section */}
        <View style={[
            tw`bg-white justify-between items-center pt-16 pb-10`, 
            {
                width,
                height: height * 0.7,
                borderBottomLeftRadius: width,
                borderBottomRightRadius: width,
                overflow: 'hidden',
            }
        ]}>
            <View style={tw`flex-1 justify-center items-center mb-4`}>
                <Text style={tw`text-sm font-syneBold text-black text-center mb-2`}>Welcome To</Text>
                <Image
                    source={require('../../assets/pocket.png')}
                    style={tw`w-80 h-12`}
                    resizeMode="contain"
                />
                <Image
                    source={require('../../assets/welcome-bg.png')}
                    style={tw`h-80 w-72`}
                    resizeMode="contain"
                />
            </View>
        </View>

        {/* Bottom Section - Get Started Button */}
        <View style={tw`flex-1 justify-center items-center`}>
          <TouchableOpacity
            style={tw`bg-white py-4 px-12 rounded-full shadow-lg`}
            onPress={() => navigation.push('NameInput')}
            activeOpacity={0.85}
          >
            <Text style={tw`text-[#52c1b7] text-xl font-syneSemiBold text-center`}>Get Started</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ImageBackground>
  )
}

export default Welcome

const styles = StyleSheet.create({})

