import DateTimePicker from '@react-native-community/datetimepicker'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CATEGORIES } from '../../constants/category'
import type { Category } from '../../constants/types'
import { useExpense } from '../../context/ExpenseContext'
import { formatDateToYYYYMMDD } from '../../lib/helper'

export default function Create() {
  const { addExpense } = useExpense()
  const router = useRouter()
  const insets = useSafeAreaInsets()
  
  const [amount, setAmount] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<Category>(CATEGORIES[0])
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showDatePickerModal, setShowDatePickerModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedInput, setFocusedInput] = useState<string | null>(null)

  const handleAddExpense = async () => {
    if (!amount || !title || !category) {
      Alert.alert('Please fill in all fields')
      return
    }

    // Convert amount to number and validate
    const numericAmount = parseFloat(amount)
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert('Please enter a valid amount')
      return
    }

    setIsSubmitting(true)

    try {
      // Format date as YYYY-MM-DD in local timezone
      const formattedDate = formatDateToYYYYMMDD(selectedDate)

      addExpense({
        amount: numericAmount,
        title,
        category,
        date: formattedDate,
      })

      setAmount('')
      setTitle('')
      setCategory(CATEGORIES[0])
      setSelectedDate(new Date())
      router.back()
    } catch (error) {
      Alert.alert('Error', 'Failed to add expense. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatAmount = (text: string) => {
    // Remove all non-numeric characters except decimal point
    const cleaned = text.replace(/[^0-9.]/g, '')
    // Ensure only one decimal point
    const parts = cleaned.split('.')
    if (parts.length > 2) {
      return parts[0] + '.' + parts.slice(1).join('')
    }
    return cleaned
  }

  const isValidForm = () => {
    const numericAmount = parseFloat(amount)
    return (
      amount.trim() !== '' &&
      title.trim() !== '' &&
      !isNaN(numericAmount) &&
      numericAmount > 0
    )
  }

  const handleCategoryInput = () => {
    setShowCategoryModal(true)
  }

  const handleSelectedCategory = (selectedCategory: Category) => {
    setCategory(selectedCategory)
    setShowCategoryModal(false)
  }

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const onDateChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false)
    }
    if (date) {
      const today = new Date()
      today.setHours(23, 59, 59, 999)
      if (date <= today) {
        setSelectedDate(date)
        if (Platform.OS === 'ios') {
          setShowDatePickerModal(false)
        }
      } else {
        Alert.alert('Invalid Date', 'You cannot select a future date')
      }
    }
  }

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
    >
      <ScrollView 
        className="px-5 bg-white pt-5" 
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-syneBold text-black">Add New Expense</Text>
          <Text className="text-base font-syneRegular text-gray-500 mt-2">
            Enter the details of your expense
          </Text>
        </View>

        {/* Expense Form Section */}
        <View className="mb-8">
          <View className="relative">
            <View 
              className="absolute left-4 -top-2.5 px-2 z-10"
              style={{
                backgroundColor: focusedInput === 'amount' ? '#ffffff' : '#F9FAFB',
              }}
            >
              <Text className="text-xs font-syneSemiBold text-gray-600">Amount</Text>
            </View>
            <TextInput
              className="border-2 p-4 rounded-xl text-xl font-syneRegular bg-gray-50 border-gray-300"
              style={{
                borderColor: focusedInput === 'amount' ? '#52c1b7' : '#D1D5DB',
                backgroundColor: focusedInput === 'amount' ? '#ffffff' : undefined,
                shadowColor: focusedInput === 'amount' ? '#000' : undefined,
                shadowOffset: focusedInput === 'amount' ? { width: 0, height: 1 } : undefined,
                shadowOpacity: focusedInput === 'amount' ? 0.1 : undefined,
                shadowRadius: focusedInput === 'amount' ? 2 : undefined,
                elevation: focusedInput === 'amount' ? 2 : undefined,
                paddingTop: 16,
              }}
              placeholder="$0.00"
              placeholderTextColor="#9CA3AF"
              value={amount}
              onChangeText={(text) => setAmount(formatAmount(text))}
              keyboardType="decimal-pad"
              onFocus={() => setFocusedInput('amount')}
              onBlur={() => setFocusedInput(null)}
              accessibilityLabel="Expense amount"
              accessibilityHint="Enter the amount you spent"
            />
            {amount && parseFloat(amount) > 0 && (
              <View className="absolute right-4 top-0 bottom-0 justify-center">
                <Text className="text-lg font-syneSemiBold text-[#52c1b7]">
                  ${parseFloat(amount).toFixed(2)}
                </Text>
              </View>
            )}
          </View>
          {amount && (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) && (
            <Text className="text-sm text-red-500 font-syneRegular mt-2">
              Please enter a valid amount
            </Text>
          )}
        </View>

        <View className="mb-8">
          <View className="relative">
            <View 
              className="absolute left-4 -top-2.5 px-2 z-10"
              style={{
                backgroundColor: focusedInput === 'title' ? '#ffffff' : '#F9FAFB',
              }}
            >
              <Text className="text-xs font-syneSemiBold text-gray-600">Title</Text>
            </View>
            <TextInput
              className="border-2 p-4 rounded-xl text-xl font-syneRegular bg-gray-50 border-gray-300"
              style={{
                borderColor: focusedInput === 'title' ? '#52c1b7' : '#D1D5DB',
                backgroundColor: focusedInput === 'title' ? '#ffffff' : undefined,
                shadowColor: focusedInput === 'title' ? '#000' : undefined,
                shadowOffset: focusedInput === 'title' ? { width: 0, height: 1 } : undefined,
                shadowOpacity: focusedInput === 'title' ? 0.1 : undefined,
                shadowRadius: focusedInput === 'title' ? 2 : undefined,
                elevation: focusedInput === 'title' ? 2 : undefined,
                paddingRight: title.length > 0 ? 60 : undefined,
                paddingTop: 16,
              }}
              placeholder="What was it for?"
              placeholderTextColor="#9CA3AF"
              value={title}
              onChangeText={setTitle}
              onFocus={() => setFocusedInput('title')}
              onBlur={() => setFocusedInput(null)}
              maxLength={50}
              accessibilityLabel="Expense title"
              accessibilityHint="Enter a description for this expense"
            />
            {title.length > 0 && (
              <View className="absolute right-4 top-0 bottom-0 justify-center">
                <Text className="text-xs font-syneRegular text-gray-400">
                  {title.length}/50
                </Text>
              </View>
            )}
          </View>
        </View>

        <View className="mb-8">
          <View className="relative">
            <View 
              className="absolute left-4 -top-2.5 px-2 z-10"
              style={{
                backgroundColor: focusedInput === 'date' ? '#ffffff' : '#F9FAFB',
              }}
            >
              <Text className="text-xs font-syneSemiBold text-gray-600">Date</Text>
            </View>
            <Pressable
              className="border-2 p-4 rounded-xl flex-row justify-between items-center bg-gray-50 border-gray-300"
              style={{
                borderColor: focusedInput === 'date' ? '#52c1b7' : '#D1D5DB',
                backgroundColor: focusedInput === 'date' ? '#ffffff' : undefined,
                shadowColor: focusedInput === 'date' ? '#000' : undefined,
                shadowOffset: focusedInput === 'date' ? { width: 0, height: 1 } : undefined,
                shadowOpacity: focusedInput === 'date' ? 0.1 : undefined,
                shadowRadius: focusedInput === 'date' ? 2 : undefined,
                elevation: focusedInput === 'date' ? 2 : undefined,
                paddingTop: 16,
              }}
              onPress={() => {
                setFocusedInput('date')
                if (Platform.OS === 'ios') {
                  setShowDatePickerModal(true)
                } else {
                  setShowDatePicker(true)
                }
              }}
              accessibilityLabel="Select date"
              accessibilityHint="Tap to choose the date for this expense"
            >
              <Text className="text-xl font-syneRegular text-black">
                {formatDate(selectedDate)}
              </Text>
              <Text className="text-2xl font-syneRegular text-gray-400">›</Text>
            </Pressable>
          </View>
          
          {Platform.OS === 'android' && showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={onDateChange}
              maximumDate={new Date()}
              textColor="black"
            />
          )}

          {Platform.OS === 'ios' && (
            <Modal
              visible={showDatePickerModal}
              transparent={true}
              animationType="slide"
              onRequestClose={() => {
                setShowDatePickerModal(false)
                setFocusedInput(null)
              }}
            >
              <Pressable
                className="flex-1 justify-end"
                onPress={() => {
                  setShowDatePickerModal(false)
                  setFocusedInput(null)
                }}
              >
                <Pressable onPress={(e) => e.stopPropagation()}>
                  <View 
                    className="bg-white rounded-t-3xl p-6"
                    style={{
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: -6 },
                      shadowOpacity: 0.5,
                      shadowRadius: 20,
                      elevation: 25,
                    }}
                  >
                    <View className="flex-row justify-between items-center mb-4">
                      <Pressable 
                        onPress={() => {
                          setShowDatePickerModal(false)
                          setFocusedInput(null)
                        }}
                      >
                        <Text className="text-lg font-syneSemiBold text-[#52c1b7]">Cancel</Text>
                      </Pressable>
                      <Text className="text-2xl font-syneBold text-black">Select Date</Text>
                      <Pressable
                        onPress={() => {
                          setShowDatePickerModal(false)
                          setFocusedInput(null)
                        }}
                      >
                        <Text className="text-lg font-syneSemiBold text-[#52c1b7]">Done</Text>
                      </Pressable>
                    </View>
                    <DateTimePicker
                      value={selectedDate}
                      mode="date"
                      display="spinner"
                      onChange={onDateChange}
                      maximumDate={new Date()}
                      style={{ height: 200, alignSelf: 'center' }}
                      textColor="black"
                    />
                  </View>
                </Pressable>
              </Pressable>
            </Modal>
          )}
        </View>

        <View className="mb-8">
          <View className="relative">
            <View 
              className="absolute left-4 -top-2.5 px-2 z-10"
              style={{
                backgroundColor: focusedInput === 'category' ? '#ffffff' : '#F9FAFB',
              }}
            >
              <Text className="text-xs font-syneSemiBold text-gray-600">Category</Text>
            </View>
            <Pressable
              className="border-2 p-4 rounded-xl flex-row justify-between items-center bg-gray-50 border-gray-300"
              style={{
                borderColor: focusedInput === 'category' ? '#52c1b7' : '#D1D5DB',
                backgroundColor: focusedInput === 'category' ? '#ffffff' : undefined,
                shadowColor: focusedInput === 'category' ? '#000' : undefined,
                shadowOffset: focusedInput === 'category' ? { width: 0, height: 1 } : undefined,
                shadowOpacity: focusedInput === 'category' ? 0.1 : undefined,
                shadowRadius: focusedInput === 'category' ? 2 : undefined,
                elevation: focusedInput === 'category' ? 2 : undefined,
                paddingTop: 16,
              }}
              onPress={() => {
                setFocusedInput('category')
                handleCategoryInput()
              }}
              accessibilityLabel="Select category"
              accessibilityHint="Tap to choose a category for this expense"
            >
              <View className="flex-row items-center flex-1">
                <Text className="text-2xl font-syneRegular mr-3">{category.icon}</Text>
                <Text className="text-lg font-syneRegular text-black">{category.name}</Text>
              </View>
              <Text className="text-2xl font-syneRegular text-gray-400">›</Text>
            </Pressable>
          </View>

          <Modal
            visible={showCategoryModal}
            transparent={true}
            animationType="slide"
            onRequestClose={() => {
              setShowCategoryModal(false)
              setFocusedInput(null)
            }}
          >
            <Pressable
              className="flex-1 justify-end"
              onPress={() => {
                setShowCategoryModal(false)
                setFocusedInput(null)
              }}
            >
              <Pressable 
                onPress={(e) => e.stopPropagation()} 
                className="rounded-t-3xl bg-white"
                style={{ 
                  paddingBottom: Math.max(insets.bottom, 20),
                  maxHeight: '85%',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: -6 },
                  shadowOpacity: 0.5,
                  shadowRadius: 20,
                  elevation: 25,
                }}
              >
                  <View className="p-6">
                    <View className="flex-row justify-between items-center mb-4">
                      <Pressable 
                        onPress={() => {
                          setShowCategoryModal(false)
                          setFocusedInput(null)
                        }}
                      >
                        <Text className="text-lg font-syneSemiBold text-[#52c1b7]">Cancel</Text>
                      </Pressable>
                      <Text className="text-2xl font-syneBold text-black">Select Category</Text>
                      <Pressable 
                        onPress={() => {
                          setShowCategoryModal(false)
                          setFocusedInput(null)
                        }}
                      >
                        <Text className="text-lg font-syneSemiBold text-[#52c1b7]">Done</Text>
                      </Pressable>
                    </View>
                    
                    <Text className="text-base font-syneRegular text-gray-600 text-center mb-6">
                      Select the category that best describes the nature of your expense
                    </Text>

                    <FlatList
                      data={CATEGORIES}
                      renderItem={({ item }) => {
                        const isSelected = category.name === item.name
                        return (
                          <Pressable
                            className="flex-1 items-center justify-center bg-gray-50 rounded-xl p-5 m-2 border-2 border-gray-200"
                            onPress={() => handleSelectedCategory(item)}
                            style={{
                              minHeight: 100,
                              borderColor: isSelected ? '#52c1b7' : undefined,
                              backgroundColor: isSelected ? 'rgba(82, 193, 183, 0.1)' : undefined,
                              shadowColor: isSelected ? '#000' : undefined,
                              shadowOffset: isSelected ? { width: 0, height: 2 } : undefined,
                              shadowOpacity: isSelected ? 0.15 : undefined,
                              shadowRadius: isSelected ? 4 : undefined,
                              elevation: isSelected ? 3 : undefined,
                            }}
                          >
                            <Text className="text-4xl font-syneRegular mb-2">{item.icon}</Text>
                            <Text 
                              className="text-center text-sm font-syneSemiBold"
                              style={{
                                color: isSelected ? '#52c1b7' : undefined,
                              }}
                            >
                              {item.name}
                            </Text>
                          </Pressable>
                        )
                      }}
                      keyExtractor={(item) => item.name}
                      numColumns={2}
                      contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 20) }}
                      showsVerticalScrollIndicator={false}
                    />
                  </View>
              </Pressable>
            </Pressable>
          </Modal>
        </View>

        {/* Footer Section */}
        <View className="mt-4 mb-6">
          <Pressable 
            className="p-5 rounded-xl flex-row items-center justify-center bg-gray-300"
            onPress={handleAddExpense}
            disabled={!isValidForm() || isSubmitting}
            accessibilityLabel="Add expense"
            accessibilityHint={isValidForm() ? "Tap to save this expense" : "Fill in all fields to enable this button"}
            style={{
              backgroundColor: isValidForm() && !isSubmitting ? '#000000' : 'gray',
              opacity: isValidForm() && !isSubmitting ? 1 : 0.7,
            }}
          >
            {isSubmitting ? (
              <View className="flex-row items-center">
                <ActivityIndicator color="white" size="small" style={{ marginRight: 8 }} />
                <Text className="text-white text-center text-lg font-syneBold">
                  Adding...
                </Text>
              </View>
            ) : (
              <Text className="text-white text-center text-lg font-syneBold">
                Add Expense
              </Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
