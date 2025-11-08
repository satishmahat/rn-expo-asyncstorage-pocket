import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import type { Expense } from '../../constants/types'
import { useExpense } from '../../context/ExpenseContext'
import { processedDataForChart } from '../../lib/helper'

import CategoryCard from '../../components/CategoryCard'
import EmptyList from '../../components/EmptyList'

export default function Home() {
  const { expenses, userName } = useExpense()
 const router = useRouter()
  const insets = useSafeAreaInsets()

  const categoryData = processedDataForChart(expenses)
  const totalSpent = expenses.reduce((total: number, item: Expense) => total + item.amount, 0)

  const handleCategoryPress = (categoryName: string) => {
    // Navigate to transactions tab with category filter
    router.push({
      pathname: '/(tabs)/transactions',
      params: { category: categoryName }
    })
  }

  const displayName = userName || 'there'

  // Calculate bottom padding: tab bar height (~100px) + safe area bottom
  const tabBarHeight = 100
  const bottomPadding = tabBarHeight + Math.max(insets.bottom, 10)

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: bottomPadding }}
      className="flex-1 px-5 bg-white"
    >
      {/* Fixed Header Section */}
      <View className="pb-3 pt-5">
        <Text className="text-5xl font-syneSemiBold text-black">
          Hello <Text className="text-[#52c1b7]">{displayName}</Text> <MaterialCommunityIcons name="crown-circle" size={34} color="black" />
        </Text>
        <Text className="text-lg font-syneRegular text-gray-500 mt-1">
          Start tracking your expenses easily.
        </Text>
      </View>

      <View className="bg-black rounded-3xl p-6 my-6 items-center shadow-sm">
        <Text className="text-lg font-syneRegular text-gray-400">Spent so far</Text>
        <Text className=" text-white text-5xl font-syneBold">
          $ {totalSpent.toFixed(2)}
        </Text>
      </View>

      {/* Category List Section - Scrollable with Max Height */}
      <View className="mt-3">
        <Text className="text-xl font-syneSemiBold text-black mb-3">
          Expense by Categories:
        </Text>
        {categoryData.length === 0 ? (
          <EmptyList />
        ) : (
          <ScrollView
            // style={{ maxHeight: 320 }}
            showsVerticalScrollIndicator={true}
            nestedScrollEnabled={true}
          >
            {categoryData.map((item) => (
              <CategoryCard
                key={item.name}
                item={item}
                onPress={() => handleCategoryPress(item.name)}
              />
            ))}
          </ScrollView>
        )}
      </View>

      {/* Additional Content Section - Add your future content here */}
      <View className="px-5">
        {/* Add your additional content here later */}
      </View>
    </ScrollView>
  )
}
