import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import type { CategoryCardProps } from '../constants/types'

const CategoryCard = ({ item, onPress }: CategoryCardProps) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: '#e5e7eb' }}
      style={({ pressed }) => [
        {
          transform: [{ scale: pressed ? 0.96 : 1 }],
        },
      ]}
      className="mb-3 rounded-2xl overflow-hidden px-5"
    >
      <LinearGradient
        colors={[`${item.color}33`, `${item.color}44`, `${item.color}66`]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.3, 0.6]}
        style={{
          borderRadius: 16,
          padding: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        }}
      >
        {/* Left Section */}
        <View className="flex-row items-center flex-1 mr-3">
          <View
            className="w-14 h-14 rounded-2xl items-center justify-center mr-4 shadow-sm"
            style={{ backgroundColor: item.color || '#f3f4f6' }}
          >
            <Text className="text-3xl font-syneRegular">{item.icon}</Text>
          </View>

          <View className="flex-1">
            <Text
              className="text-lg font-syneBold text-gray-800"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {item.name}
            </Text>
            <View className="flex-row items-center mt-1">
              <Ionicons name="aperture-outline" size={14} color="black" />
              <Text className="text-sm font-syneRegular text-gray-700 ml-1">{item.text}</Text>
            </View>
          </View>
        </View>

        {/* Right Section */}
        <View className="items-end flex-shrink-0 flex-row">
          <Text className="text-xl font-syneBold text-black mr-1">
            ${item.amount.toFixed(2)}
          </Text>
          <Ionicons name="chevron-forward-outline" size={18} color="#4B5563" />
        </View>
      </LinearGradient>
    </Pressable>
  )
}

export default CategoryCard

