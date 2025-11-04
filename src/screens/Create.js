import { ScrollView, StyleSheet, Text, View, TextInput, Pressable, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState , useEffect} from 'react'
import tw from '../utils/tw'
import { useExpense } from '../context/ExpenseContext'
import { CATEGORIES } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context'

const Create = ({navigation, route}) => {
  
  const {addExpense} = useExpense();
  const [amount, setAmount] = useState(null);
  const [title, setTitle] = useState(null);
  const [category, setCategory] = useState(CATEGORIES[0]); // Set Food as default

  useEffect(() => {
    if(route.params?.category) {
      setCategory(route.params.category);
    }
  }, [route.params?.category]);

  const handleAddExpense = () => {
    if(!amount || !title || !category) {
      Alert.alert('Please fill in all fields');
      return;
    }
    addExpense({amount, title, category});
    setAmount(null);
    setTitle(null);
    setCategory(CATEGORIES[0]); // Reset to Food after adding expense
    navigation.navigate('Home');
  }

  const handleCategoryInput = () => {
    navigation.navigate('Category');
  }

  return (
    <SafeAreaView style={tw`flex-1`}>
    <KeyboardAvoidingView 
      style={tw`flex-1`}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView contentContainerStyle={tw`p-6`}>
        {/* Header */}
        <Text style={tw`text-3xl font-syneBold text-black`}>Add New Expense</Text>
        <Text style={tw`text-base font-syne text-gray-500 mt-2 mb-8`}>Enter the details of your expense</Text>
      
        {/* Expense Form Section */}
        <View style={tw`mb-5`}>
          <Text style={tw`text-lg text-gray-600 font-syneSemiBold mb-2`}>Enter Amount</Text>
          <TextInput 
          style={tw`border-2 border-gray-300 p-4 rounded-xl text-lg font-syne`} 
          placeholder='$0.00' 
          value={amount}
          onChangeText={setAmount}
          />
        </View>
        <View style={tw`mb-5`}>
          <Text style={tw`text-lg text-gray-600 font-syneSemiBold mb-2`}>Title</Text>
          <TextInput 
          style={tw`border-2 border-gray-300 p-4 rounded-xl text-lg font-syne`} 
          placeholder='What was it for ?' 
          value={title}
          onChangeText={setTitle}
          />
        </View>
        
        <View style={tw`mb-5`}>
          <Text style={tw`text-lg text-gray-600 font-syneSemiBold mb-2`}>Category</Text>

          <Pressable style={tw`border-2 border-gray-300 p-4 rounded-xl text-lg flex-row justify-between`} onPress={handleCategoryInput}>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-2xl font-syne mr-3`}>{category.icon}</Text>
              <Text style={tw`text-lg font-syne`}>{category.name}</Text>

            </View>
            <Text style={tw`text-2xl font-syne`}>&gt;</Text>
          </Pressable>
        </View>


        {/* Footer Section */}
        <Pressable style={tw`bg-black p-6 rounded-lg mt-8`} onPress={handleAddExpense}>
         <Text style={tw`text-white text-center text-lg font-syneBold`}>Add Expense</Text>
        </Pressable>
      </ScrollView>
    
    </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Create

const styles = StyleSheet.create({})