import { ScrollView, StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'

const Create = () => {
  
  const [amount, setAmount] = useState(null);
  const [title, setTitle] = useState(null);
  
  const handleAddExpense = () => {
    if(!amount || !title) {
      Alert.alert('Please fill in all fields');
      return;
    }
    console.log('Add Expense', amount, title);
  }

  return (
    <View>
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
          <Pressable style={tw`border-2 border-gray-300 p-4 rounded-xl text-lg flex-row justify-between`}>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-2xl mr-3`}>🍕</Text>
              <Text style={tw`text-lg`}>Food</Text>

            </View>
            <Text style={tw`text-2xl`}>&gt;</Text>
          </Pressable>
        </View>


        {/* Footer Section */}
        <Pressable style={tw`bg-black p-6 rounded-lg mt-8`} onPress={handleAddExpense}>
         <Text style={tw`text-white text-center text-lg font-bold`}>Add Expense</Text>
        </Pressable>
      </ScrollView>
    </View>
  )
}

export default Create

const styles = StyleSheet.create({})