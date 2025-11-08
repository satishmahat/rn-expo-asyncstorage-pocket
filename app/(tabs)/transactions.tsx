import { MaterialIcons } from '@expo/vector-icons'
import React, { useMemo, useState } from 'react'
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import EmptyList from '../../components/EmptyList'
import ExpenseItemCard from '../../components/ExpenseItemCard'
import { useExpense } from '../../context/ExpenseContext'

type SortOption = 'recent' | 'oldest' | 'highest' | 'lowest'

export default function Transactions() {
  const { expenses } = useExpense()
  const insets = useSafeAreaInsets()
  const [sortOption, setSortOption] = useState<SortOption>('recent')
  const [showSortModal, setShowSortModal] = useState(false)

  // Calculate bottom padding: tab bar height (~100px) + safe area bottom
  const tabBarHeight = 100
  const bottomPadding = tabBarHeight + Math.max(insets.bottom, 10)

  // Sort expenses based on selected option
  const sortedExpenses = useMemo(() => {
    const expensesCopy = [...expenses]
    
    switch (sortOption) {
      case 'recent':
        // Most recent first (descending date)
        return expensesCopy.sort((a, b) => b.date.localeCompare(a.date))
      case 'oldest':
        // Oldest first (ascending date)
        return expensesCopy.sort((a, b) => a.date.localeCompare(b.date))
      case 'highest':
        // Highest amount first (descending amount)
        return expensesCopy.sort((a, b) => b.amount - a.amount)
      case 'lowest':
        // Lowest amount first (ascending amount)
        return expensesCopy.sort((a, b) => a.amount - b.amount)
      default:
        return expensesCopy
    }
  }, [expenses, sortOption])

  const handleSortOption = (option: SortOption) => {
    setSortOption(option)
    setShowSortModal(false)
  }

  const sortOptions: { label: string; value: SortOption }[] = [
    { label: 'Recent First', value: 'recent' },
    { label: 'Oldest First', value: 'oldest' },
    { label: 'Highest', value: 'highest' },
    { label: 'Lowest', value: 'lowest' },
  ]

  return (
    <View className="flex-1 bg-white">
      <View className="px-5 pt-5 pb-6 flex-row justify-between items-center">
        <View className="flex-1">
          <Text className="text-3xl font-syneBold text-black">Transactions</Text>
          <Text className="text-base font-syneRegular text-gray-500 mt-1">
            View all your transactions here.
          </Text>
        </View>
        <Pressable
          onPress={() => setShowSortModal(true)}
          className="w-10 h-10 items-center justify-center"
        >
          <MaterialIcons name="swap-vert" size={28} color="black"/>
        </Pressable>
      </View>
      {expenses.length === 0 ? (
        <EmptyList title="No transactions yet" message="Add expenses to see them here" />
      ) : (
        <FlatList
          data={sortedExpenses}
          renderItem={({ item }) => <ExpenseItemCard item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: bottomPadding }}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Sort Options Modal */}
      <Modal
        visible={showSortModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowSortModal(false)}
      >
        <Pressable
          className="flex-1 justify-end"
          onPress={() => setShowSortModal(false)}
        >
          <Pressable
            onPress={(e) => e.stopPropagation()}
            className="rounded-t-3xl bg-gray-300"
            style={{
              paddingBottom: Math.max(insets.bottom, 20),
            }}
          >
            <View className="p-6">
              <View className="flex-row justify-between items-center mb-4">
                <Pressable onPress={() => setShowSortModal(false)}>
                  <Text className="text-lg font-syneSemiBold text-[#52c1b7]">Cancel</Text>
                </Pressable>
                <Text className="text-2xl font-syneBold text-black">Sort By</Text>
                <Pressable onPress={() => setShowSortModal(false)}>
                  <Text className="text-lg font-syneSemiBold text-[#52c1b7]">Done</Text>
                </Pressable>
              </View>

              {sortOptions.map((option) => (
                <Pressable
                  key={option.value}
                  onPress={() => handleSortOption(option.value)}
                  className={`py-4 px-4 rounded-xl mb-3 bg-white border ${
                    sortOption === option.value ? 'border-[#52c1b7] border-2' : 'border-gray-200'
                  }`}
                >
                  <Text className="text-lg font-syneSemiBold text-gray-800">
                    {option.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({})
