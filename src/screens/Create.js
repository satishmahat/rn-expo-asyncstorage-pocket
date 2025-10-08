import { ScrollView, StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native'
import React, { useState , useEffect} from 'react'
import tw from 'twrnc'
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
    <SafeAreaView>
      <ScrollView contentContainerStyle={tw`p-6`}>
        {/* Header */}
        <Text style={tw`text-3xl font-bold text-black`}>Add New Expense</Text>
        <Text style={tw`text-base text-gray-500 mt-2 mb-8`}>Enter the details of your expense</Text>
      
        {/* Expense Form Section */}
        <View style={tw`mb-5`}>
          <Text style={tw`text-lg text-gray-600 font-semibold mb-2`}>Enter Amount</Text>
          <TextInput 
          style={tw`border-2 border-gray-300 p-4 rounded-xl text-lg`} 
          placeholder='$0.00' 
          value={amount}
          onChangeText={setAmount}
          />
        </View>
        <View style={tw`mb-5`}>
          <Text style={tw`text-lg text-gray-600 font-semibold mb-2`}>Title</Text>
          <TextInput 
          style={tw`border-2 border-gray-300 p-4 rounded-xl text-lg`} 
          placeholder='What was it for ?' 
          value={title}
          onChangeText={setTitle}
          />
        </View>
        
        <View style={tw`mb-5`}>
          <Text style={tw`text-lg text-gray-600 font-semibold mb-2`}>Category</Text>

          <Pressable style={tw`border-2 border-gray-300 p-4 rounded-xl text-lg flex-row justify-between`} onPress={handleCategoryInput}>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-2xl mr-3`}>{category.icon}</Text>
              <Text style={tw`text-lg`}>{category.name}</Text>

            </View>
            <Text style={tw`text-2xl`}>&gt;</Text>
          </Pressable>
        </View>


        {/* Footer Section */}
        <Pressable style={tw`bg-black p-6 rounded-lg mt-8`} onPress={handleAddExpense}>
         <Text style={tw`text-white text-center text-lg font-bold`}>Add Expense</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create

const styles = StyleSheet.create({})