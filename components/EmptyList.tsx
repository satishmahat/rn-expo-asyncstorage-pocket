import React from 'react'
import { Text, View } from 'react-native'
import type { EmptyListProps } from '../constants/types'

const EmptyList = ({ title = 'No expenses yet', message = 'Add items to get started' }: EmptyListProps) => {
  return (
    <View className="flex-1 items-center justify-center p-8 mt-10">
      <Text className="text-4xl font-syneRegular mb-2">🖊️</Text>
      <Text className="text-lg font-syneBold">{title}</Text>
      <Text className="text-base font-syneRegular text-gray-500">{message}</Text>
    </View>
  )
}

export default EmptyList

