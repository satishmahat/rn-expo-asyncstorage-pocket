import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useMemo, useState } from 'react'
import { Dimensions, FlatList, Pressable, ScrollView, Text, View } from 'react-native'
import { BarChart } from 'react-native-gifted-charts'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CategoryCard from '../../components/CategoryCard'
import EmptyList from '../../components/EmptyList'
import { useExpense } from '../../context/ExpenseContext'
import {
  calculateStatistics,
  filterExpensesByTimeframe,
  processedDataForBarChart,
  processedDataForChart,
  type Timeframe,
} from '../../lib/helper'

const timeframeOptions: { label: string; value: Timeframe }[] = [
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
  { label: '3 Months', value: '3months' },
  { label: '6 Months', value: '6months' },
  { label: 'Year', value: 'year' },
  { label: 'All Time', value: 'all' },
]

const tabBarHeight = 100

export default function Home() {
  const { expenses, userName } = useExpense()
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>('month')

  // Calculate bottom padding: tab bar height (~100px) + safe area bottom
  const bottomPadding = tabBarHeight + Math.max(insets.bottom, 10)

  const displayName = userName || 'there'

  // Filter expenses by selected timeframe
  const filteredExpenses = useMemo(() => {
    return filterExpensesByTimeframe(expenses, selectedTimeframe)
  }, [expenses, selectedTimeframe])

  // Process data for bar chart and category list
  const barChartData = useMemo(() => {
    return processedDataForBarChart(filteredExpenses)
  }, [filteredExpenses])

  const categoryData = useMemo(() => {
    return processedDataForChart(filteredExpenses)
  }, [filteredExpenses])

  // Calculate statistics
  const stats = useMemo(() => {
    return calculateStatistics(filteredExpenses)
  }, [filteredExpenses])

  const handleCategoryPress = (categoryName: string) => {
    router.push({
      pathname: '/(tabs)/transactions',
      params: { category: categoryName },
    })
  }

  if (expenses.length === 0) {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottomPadding }}
        className="flex-1 px-5 bg-white"
      >
        {/* Fixed Header Section */}
        <View className="pb-3 pt-5">
          <Text className="text-5xl font-syneSemiBold text-black">
            Hello <Text className="text-[#52c1b7]">{displayName}</Text>{' '}
            <MaterialCommunityIcons name="crown-circle" size={34} color="black" />
          </Text>
          <Text className="text-lg font-syneRegular text-gray-500 mt-1">
            Start tracking your expenses easily.
          </Text>
        </View>
        <View className="flex-1">
          <EmptyList title="No expenses yet" message="Add expenses to see your spending insights" />
        </View>
      </ScrollView>
    )
  }

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={categoryData}
        renderItem={({ item }) => (
          <CategoryCard item={item} onPress={() => handleCategoryPress(item.name)} />
        )}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{ paddingBottom: bottomPadding}}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Greetings Section */}
            <View className="px-5 pb-3 pt-5">
              <Text className="text-5xl font-syneSemiBold text-black">
                Hello <Text className="text-[#52c1b7]">{displayName}</Text>{' '}
                <MaterialCommunityIcons name="crown-circle" size={34} color="black" />
              </Text>
              <Text className="text-lg font-syneRegular text-gray-500 mt-1">
                Start tracking your expenses easily.
              </Text>
            </View>

            {/* Timeframe Selector */}
            <View className="pb-6">
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 20, paddingLeft: 20 }}
              >
                {timeframeOptions.map((option) => (
                  <Pressable
                    key={option.value}
                    onPress={() => setSelectedTimeframe(option.value)}
                    className={`px-4 py-2 rounded-full mr-2 ${
                      selectedTimeframe === option.value
                        ? 'bg-[#52c1b7]'
                        : 'bg-gray-100'
                    }`}
                  >
                    <Text
                      className={`text-sm font-syneSemiBold ${
                        selectedTimeframe === option.value
                          ? 'text-white'
                          : 'text-gray-700'
                      }`}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            {/* Total Spending Card - UI like home */}
            {filteredExpenses.length > 0 ? (
              <View className="px-5 mb-6">
                <View className="bg-black rounded-3xl p-6 items-center shadow-sm">
                  <Text className="text-lg font-syneRegular text-gray-400">Spent so far</Text>
                  <Text className="text-white text-5xl font-syneBold">
                    ${stats.totalSpending.toFixed(2)}
                  </Text>
                  <Text className="text-sm font-syneRegular text-gray-400">
                    {stats.totalTransactions} transaction{stats.totalTransactions !== 1 ? 's' : ''}
                  </Text>
                </View>
              </View>
            ) : (
              <View className="px-5 mb-6">
                <View className="bg-black rounded-3xl p-6 items-center shadow-sm">
                  <Text className="text-lg font-syneRegular text-gray-400">Spent so far</Text>
                  <Text className="text-white text-5xl font-syneBold">$0.00</Text>
                  <Text className="text-sm font-syneRegular text-gray-400 mt-1">
                    No expenses in this period
                  </Text>
                </View>
              </View>
            )}

            {/* Bar Chart */}
            {barChartData.length > 0 && (
              <View className="mb-6 px-5">
              <View className="bg-gray-50 rounded-3xl px-4 py-6">
                <View className="overflow-hidden">
                  <BarChart
                    data={barChartData}
                    width={Dimensions.get('window').width - 80}
                    height={220}
                    barWidth={28}
                    spacing={12}
                    roundedTop
                    roundedBottom
                    hideRules={false}
                    xAxisThickness={0}
                    yAxisThickness={0}
                    yAxisTextStyle={{ color: '#6B7280', fontSize: 12 }}
                    xAxisLabelTextStyle={{
                      color: '#6B7280',
                      fontSize: 9,
                      width: 38,
                      textAlign: 'center',
                    }}
                    rotateLabel
                    labelsExtraHeight={20}
                    noOfSections={5}
                    maxValue={
                      barChartData.length > 0
                        ? Math.max(...barChartData.map((d) => d.value)) * 1.2
                        : 100
                    }
                    isAnimated
                    animationDuration={1000}
                  />
                </View>
              </View>
              </View>
            )}

            {/* Average Statistics Cards */}
            {filteredExpenses.length > 0 && (
              <View className="mb-4 px-5">
                <View className="flex-row flex-wrap gap-3">
                  {/* Average Per Day */}
                  <View className="bg-gray-50 rounded-2xl p-4 flex-1 min-w-[48%]">
                    <View className="flex-row items-center mb-2">
                      <MaterialIcons name="today" size={20} color="#52c1b7" />
                      <Text className="text-xs font-syneSemiBold text-gray-500 ml-2">
                        Avg / Day
                      </Text>
                    </View>
                    <Text className="text-2xl font-syneBold text-black">
                      ${stats.averagePerDay.toFixed(2)}
                    </Text>
                  </View>

                  {/* Average Per Week */}
                  <View className="bg-gray-50 rounded-2xl p-4 flex-1 min-w-[48%]">
                    <View className="flex-row items-center mb-2">
                      <MaterialIcons name="date-range" size={20} color="#52c1b7" />
                      <Text className="text-xs font-syneSemiBold text-gray-500 ml-2">
                        Avg / Week
                      </Text>
                    </View>
                    <Text className="text-2xl font-syneBold text-black">
                      ${stats.averagePerWeek.toFixed(2)}
                    </Text>
                  </View>

                  {/* Average Per Month */}
                  <View className="bg-gray-50 rounded-2xl p-4 flex-1 min-w-[48%]">
                    <View className="flex-row items-center mb-2">
                      <MaterialIcons name="calendar-month" size={20} color="#52c1b7" />
                      <Text className="text-xs font-syneSemiBold text-gray-500 ml-2">
                        Avg / Month
                      </Text>
                    </View>
                    <Text className="text-2xl font-syneBold text-black">
                      ${stats.averagePerMonth.toFixed(2)}
                    </Text>
                  </View>

                  {/* Top Category */}
                  {stats.topCategory && (
                    <View className="bg-gray-50 rounded-2xl p-4 flex-1 min-w-[48%]">
                      <View className="flex-row items-center mb-2">
                        <Text className="text-xl">{stats.topCategory.icon}</Text>
                        <Text className="text-xs font-syneSemiBold text-gray-500 ml-2">
                          Top Category
                        </Text>
                      </View>
                      <Text
                        className="text-sm font-syneBold text-gray-700 mb-1"
                        numberOfLines={1}
                      >
                        {stats.topCategory.name}
                      </Text>
                      <Text className="text-xl font-syneBold text-black">
                        ${stats.topCategory.amount.toFixed(2)}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            )}

            {/* Category Breakdown Header */}
            <View className="pt-2 pb-3 px-5">
              <Text className="text-xl font-syneSemiBold text-black">
                Expense by Categories:
              </Text>
            </View>
          </>
        }
        ListEmptyComponent={
          <View className="px-5">
            <EmptyList
              title="No expenses in this period"
              message={`No expenses found for the selected ${timeframeOptions.find((o) => o.value === selectedTimeframe)?.label.toLowerCase()} period`}
            />
          </View>
        }
      />
    </View>
  )
}
