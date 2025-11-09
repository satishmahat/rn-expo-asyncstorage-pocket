import DateTimePicker from '@react-native-community/datetimepicker'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
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

  const handleAddExpense = () => {
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
      <ScrollView className="px-5 bg-white pt-5" contentContainerStyle={{ paddingBottom: insets.top + 40}}>
        {/* Header */}
        <Text className="text-3xl font-syneBold text-black">Add New Expense</Text>
        <Text className="text-base font-syneRegular text-gray-500 mt-2 mb-8">
          Enter the details of your expense
        </Text>

        {/* Expense Form Section */}
        <View className="mb-5">
          <Text className="text-lg text-gray-600 font-syneSemiBold mb-2">Enter Amount</Text>
          <TextInput
            className="border-2 border-gray-300 p-4 rounded-xl text-xl font-syneRegular"
            placeholder="$0.00"
            placeholderTextColor="gray"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
        </View>

        <View className="mb-5">
          <Text className="text-lg text-gray-600 font-syneSemiBold mb-2">Title</Text>
          <TextInput
            className="border-2 border-gray-300 p-4 rounded-xl text-xl font-syneRegular"
            placeholder="What was it for?"
            placeholderTextColor="gray"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View className="mb-5">
          <Text className="text-lg text-gray-600 font-syneSemiBold mb-2">Date</Text>
          <Pressable
            className="border-2 border-gray-300 p-4 rounded-xl flex-row justify-between items-center"
            onPress={() => {
              if (Platform.OS === 'ios') {
                setShowDatePickerModal(true)
              } else {
                setShowDatePicker(true)
              }
            }}
          >
            <Text className="text-xl font-syneRegular text-black">{formatDate(selectedDate)}</Text>
            <Text className="text-2xl font-syneRegular">&gt;</Text>
          </Pressable>
          
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
              onRequestClose={() => setShowDatePickerModal(false)}
            >
              <Pressable
                className="flex-1 justify-end"
                onPress={() => setShowDatePickerModal(false)}
              >
                <Pressable onPress={(e) => e.stopPropagation()}>
                  <View className="bg-gray-300 rounded-t-3xl p-6">
                    <View className="flex-row justify-between items-center mb-4">
                      <Pressable onPress={() => setShowDatePickerModal(false)}>
                        <Text className="text-lg font-syneSemiBold text-[#52c1b7]">Cancel</Text>
                      </Pressable>
                      <Text className="text-2xl font-syneBold text-black">Select Date</Text>
                      <Pressable
                        onPress={() => {
                          setShowDatePickerModal(false)
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

        <View className="mb-5">
          <Text className="text-lg text-gray-600 font-syneSemiBold mb-2">Category</Text>
          <Pressable
            className="border-2 border-gray-300 p-4 rounded-xl flex-row justify-between items-center"
            onPress={handleCategoryInput}
          >
            <View className="flex-row items-center">
              <Text className="text-2xl font-syneRegular mr-3">{category.icon}</Text>
              <Text className="text-lg font-syneRegular">{category.name}</Text>
            </View>
            <Text className="text-2xl font-syneRegular">&gt;</Text>
          </Pressable>

          <Modal
            visible={showCategoryModal}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setShowCategoryModal(false)}
          >
            <Pressable
              className="flex-1 justify-end"
              onPress={() => setShowCategoryModal(false)}
            >
              <Pressable onPress={(e) => e.stopPropagation()} className="rounded-t-3xl bg-gray-300"
                style={{ 
                  paddingBottom: Math.max(insets.bottom, 90),
                  maxHeight: '80%'
                }}>
                  <View className="p-6">
                    <View className="flex-row justify-between items-center mb-4">
                      <Pressable onPress={() => setShowCategoryModal(false)}>
                        <Text className="text-lg font-syneSemiBold text-[#52c1b7]">Cancel</Text>
                      </Pressable>
                      <Text className="text-2xl font-syneBold text-black">Select Category</Text>
                      <Pressable onPress={() => setShowCategoryModal(false)}>
                        <Text className="text-lg font-syneSemiBold text-[#52c1b7]">Done</Text>
                      </Pressable>
                    </View>
                    
                    <Text className="text-base font-syneRegular text-gray-600 text-center mb-4">
                      Select the category that best describes the nature of your expense
                    </Text>

                    <FlatList
                      data={CATEGORIES}
                      renderItem={({ item }) => (
                        <Pressable
                          className={`flex-1 items-center bg-white rounded-xl p-4 m-2 shadow-sm border ${
                            category.name === item.name ? 'border-[#52c1b7] border-2' : 'border-gray-200'
                          }`}
                          onPress={() => handleSelectedCategory(item)}
                        >
                          <Text className="text-4xl font-syneRegular">{item.icon}</Text>
                          <Text className="mt-2 text-center text-sm font-syneRegular text-gray-700">
                            {item.name}
                          </Text>
                        </Pressable>
                      )}
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
        <Pressable className="bg-black p-6 rounded-lg mt-8" onPress={handleAddExpense}>
          <Text className="text-white text-center text-lg font-syneBold">Add Expense</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
