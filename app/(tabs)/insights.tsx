import React from 'react'
import { Alert, FlatList, Text, View } from 'react-native'
import { PieChart } from 'react-native-gifted-charts'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CategoryCard from '../../components/CategoryCard'
import EmptyList from '../../components/EmptyList'
import { useExpense } from '../../context/ExpenseContext'
import { processedDataForChart } from '../../lib/helper'

export default function Insights() {
  const { expenses } = useExpense()
  const insets = useSafeAreaInsets()
  const pieChartData = processedDataForChart(expenses)

  // Calculate bottom padding: tab bar height (~100px) + safe area bottom
  const tabBarHeight = 100
  const bottomPadding = tabBarHeight + Math.max(insets.bottom, 10)

  // Transform data for react-native-gifted-charts
  // The library expects: { value: number (amount), color: string, text?: string }
  const chartData = pieChartData.map((item) => ({
    value: item.amount, // Use actual amount for chart (not percentage)
    color: item.color,
    text: item.text, // percentage as string for display
  }))

  const handleCategoryPress = (categoryName: string) => {
    Alert.alert(categoryName, `View details for ${categoryName}`)
  }

  if (pieChartData.length === 0) {
    return (
      <View className="flex-1 bg-white">
        <View className="px-5 pt-5 pb-3">
          <Text className="text-3xl text-center font-syneBold text-black">
            Spending Summary
          </Text>
        </View>
        <View className="flex-1">
          <EmptyList
            title="No expenses yet"
            message="Add expenses to see your spending breakdown"
          />
        </View>
      </View>
    )
  }

  // Calculate total spending for display in center of donut chart
  const totalSpending = expenses.reduce((total, expense) => total + expense.amount, 0)

  return (
    <View className="flex-1 bg-white">
      <View className="px-5 pt-5">
        <Text className="text-3xl text-center font-syneBold text-black">
          Spending Summary
        </Text>
        <Text className="text-base font-syneRegular text-gray-500 text-center mt-2">
          Total: ${totalSpending.toFixed(2)}
        </Text>
      </View>

      <View className="items-center py-2">
        <PieChart
          donut={true}
          data={chartData}
          showText={true}
          textColor="black"
          textSize={12}
          innerRadius={60}
          innerCircleColor="#ffffff"
          radius={120}
          focusOnPress={true}
          showGradient={false}
          centerLabelComponent={() => {
            return (
              <View className="items-center justify-center">
                <Text className="text-2xl font-syneBold text-black">
                  ${totalSpending.toFixed(2)}
                </Text>
                <Text className="text-sm font-syneRegular text-gray-500 mt-1">
                  Total Spent
                </Text>
              </View>
            )
          }}
        />
      </View>

      <FlatList
        data={pieChartData}
        renderItem={({ item }) => (
          <CategoryCard item={item} onPress={() => handleCategoryPress(item.name)} />
        )}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{ paddingBottom: bottomPadding, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="pt-3 pb-3 ml-1">
            <Text className="text-2xl font-syneSemiBold text-black">
              Category Breakdown :
            </Text>
          </View>
        }
      />
    </View>
  )
}

