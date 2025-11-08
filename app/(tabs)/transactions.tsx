import { MaterialIcons } from '@expo/vector-icons'
import React, { useMemo, useState } from 'react'
import { FlatList, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import EmptyList from '../../components/EmptyList'
import ExpenseItemCard from '../../components/ExpenseItemCard'
import { CATEGORIES } from '../../constants/category'
import { useExpense } from '../../context/ExpenseContext'

type SortOption = 'recent' | 'oldest' | 'highest' | 'lowest'

export default function Transactions() {
  const { expenses } = useExpense()
  const insets = useSafeAreaInsets()
  const [sortOption, setSortOption] = useState<SortOption>('recent')
  const [showSortModal, setShowSortModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  // Calculate bottom padding: tab bar height (~100px) + safe area bottom
  const tabBarHeight = 100
  const bottomPadding = tabBarHeight + Math.max(insets.bottom, 10)

  // Get unique categories from expenses
  const availableCategories = useMemo(() => {
    const categorySet = new Set(expenses.map((exp) => exp.category))
    return CATEGORIES.filter((cat) => categorySet.has(cat.name))
  }, [expenses])

  // Filter and sort expenses based on selected category and sort option
  const filteredAndSortedExpenses = useMemo(() => {
    // First filter by category
    let filtered = expenses
    if (selectedCategory !== 'All') {
      filtered = expenses.filter((exp) => exp.category === selectedCategory)
    }

    // Then sort
    const expensesCopy = [...filtered]
    
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
  }, [expenses, sortOption, selectedCategory])

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
      <View className="px-5 pt-5 pb-5 flex-row justify-between items-center">
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
      
      {/* Category Filter */}
      {expenses.length > 0 && (
        <View className="pb-5">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
          >
            <Pressable
              onPress={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-full flex-row items-center ${
                selectedCategory === 'All' ? 'bg-[#52c1b7]' : 'bg-gray-100'
              }`}
            >
              <Text
                className={`text-sm font-syneSemiBold ${
                  selectedCategory === 'All' ? 'text-white' : 'text-gray-700'
                }`}
              >
                All Transactions
              </Text>
            </Pressable>
            {availableCategories.map((category) => (
              <Pressable
                key={category.name}
                onPress={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-full flex-row items-center ${
                  selectedCategory === category.name
                    ? 'bg-[#52c1b7]'
                    : 'bg-gray-100'
                }`}
                style={
                  selectedCategory === category.name
                    ? { borderWidth: 0 }
                    : { borderWidth: 1, borderColor: category.color }
                }
              >
                <Text className="text-base mr-2">{category.icon}</Text>
                <Text
                  className={`text-sm font-syneSemiBold ${
                    selectedCategory === category.name
                      ? 'text-white'
                      : 'text-gray-700'
                  }`}
                >
                  {category.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}

      {expenses.length === 0 ? (
        <EmptyList title="No transactions yet" message="Add expenses to see them here" />
      ) : filteredAndSortedExpenses.length === 0 ? (
        <EmptyList
          title="No transactions found"
          message={`No expenses found for ${selectedCategory}`}
        />
      ) : (
        <FlatList
          data={filteredAndSortedExpenses}
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
