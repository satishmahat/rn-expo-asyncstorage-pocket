import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import EmptyList from '../../components/EmptyList'
import ExpenseItemCard from '../../components/ExpenseItemCard'
import { useExpense } from '../../context/ExpenseContext'

export default function Transactions() {
  const { expenses } = useExpense()
  const insets = useSafeAreaInsets()

  // Calculate bottom padding: tab bar height (~100px) + safe area bottom
  const tabBarHeight = 100
  const bottomPadding = tabBarHeight + Math.max(insets.bottom, 10)

  return (
    <View className="flex-1 bg-white">
      <View className="px-5 pt-5 pb-3">
        <Text className="text-3xl font-syneBold text-black">Transactions</Text>
        <Text className="text-base font-syneRegular text-gray-500 mt-1">
          View all your transactions here.
        </Text>
      </View>
      {expenses.length === 0 ? (
        <EmptyList title="No transactions yet" message="Add expenses to see them here" />
      ) : (
        <FlatList
          data={expenses}
          renderItem={({ item }) => <ExpenseItemCard item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: bottomPadding }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({})
