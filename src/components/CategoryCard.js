import { View, Text, Pressable } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

const CategoryCard = ({ item, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: '#e5e7eb' }}
      style={({ pressed }) => [
        tw`mx-5 mb-3 rounded-2xl overflow-hidden`,
        { transform: [{ scale: pressed ? 0.96 : 1 }] },
      ]}
    >
      <LinearGradient
        colors={[`#ffffff`, `${item.color}33`, `${item.color}66`]} 
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.3, 0.6]} 
        style={tw`rounded-2xl p-4 flex-row items-center justify-between shadow-md`}
      >
        {/* Left Section */}
        <View style={tw`flex-row items-center flex-1 mr-3`}>
          <View
            style={[
              tw`w-12 h-12 rounded-2xl items-center justify-center mr-4 shadow-sm`,
              { backgroundColor: item.color || '#f3f4f6' },
            ]}
          >
            <Text style={tw`text-2xl`}>{item.icon}</Text>
          </View>

          <View style={tw`flex-1`}>
            <Text
              style={tw`text-base font-bold text-gray-800`}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {item.name}
            </Text>
            <View style={tw`flex-row items-center mt-1`}>
            <Ionicons name="aperture-outline" size={12} color="black" />
            <Text style={tw`text-xs text-gray-700 ml-1`}>{item.text}</Text>
          </View>
          </View>
        </View>

        {/* Right Section */}
        <View style={tw`items-end flex-shrink-0 flex-row items-center`}>
            <Text style={tw`text-lg font-bold text-black mr-1`}>
                ${item.amount.toFixed(2)}
            </Text>
            <Ionicons name="chevron-forward-outline" size={16} color="#4B5563" />
        </View>

      </LinearGradient>
    </Pressable>
  )
}

export default CategoryCard
