import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import type { ExpenseItemCardProps } from '../constants/types'
import { useExpense } from '../context/ExpenseContext'

export default function ExpenseItemCard({ item }: ExpenseItemCardProps) {
  const { deleteExpense } = useExpense()

  const handleDelete = () => {
    Alert.alert(
      'Delete Expense',
      `Are you sure you want to delete "${item.title}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteExpense(item.id),
        },
      ]
    )
  }

  const LeftSwipeActions = () => {
    return (
      <View className="w-20 bg-blue-500 justify-center items-center rounded-2xl ml-5 -mr-3 mb-3">
        <View className="w-12 h-12 bg-white rounded-full items-center justify-center">
          <Ionicons name="create-outline" size={24} color="#3B82F6" />
        </View>
      </View>
    )
  }

  const rightSwipeActions = () => {
    return (
      <Pressable
        className="w-20 bg-red-500 justify-center items-center rounded-2xl mr-5 -ml-3 mb-3"
        style={({ pressed }) => [
          pressed && { opacity: 0.7 }
        ]}
        onPress={handleDelete}
      >
        <View className="w-12 h-12 bg-white rounded-full items-center justify-center">
          <Ionicons name="trash-outline" size={24} color="#EF4444" />
        </View>
      </Pressable>
    )
  }

  return (
    <Swipeable
      renderLeftActions={LeftSwipeActions}
      renderRightActions={rightSwipeActions}
      leftThreshold={80}
      rightThreshold={80}
      friction={2}
    >
      <View
        className="bg-white rounded-2xl p-4 mx-5 mb-3 flex-row items-center justify-between"
        style={{
          borderLeftWidth: 0.5,
          borderLeftColor: '#3B82F6',
          borderRightWidth: 0.5,
          borderRightColor: '#EF4444',
          borderTopWidth: 0.5,
          borderTopColor: '#E5E7EB',
          borderBottomWidth: 0.5,
          borderBottomColor: '#E5E7EB',

        }}
      >
        <View className="flex-row items-center flex-1 mr-3">
          <View className="w-14 h-14 rounded-2xl bg-gray-100 items-center justify-center mr-4">
            <Text className="text-3xl font-syneRegular">{item.icon}</Text>
          </View>
          <View className="flex-1">
            <Text
              className="text-lg font-syneBold text-gray-800"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {item.title}
            </Text>
            <View
              className="mt-1 px-2 py-1 rounded-lg self-start"
              style={{ backgroundColor: item.color }}
            >
              <Text className="text-gray-800 text-xs font-syneBold">{item.category}</Text>
            </View>
          </View>
        </View>
        <View className="items-end flex-shrink-0">
          <Text className="text-xl font-syneBold text-black">$ {item.amount.toFixed(2)}</Text>
          <Text className="text-md font-syneRegular text-gray-500 mt-1">{item.date}</Text>
        </View>
      </View>
    </Swipeable>
  )
}

const styles = StyleSheet.create({})
