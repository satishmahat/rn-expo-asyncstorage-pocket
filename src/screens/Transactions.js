import { View, Text, FlatList } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useExpense } from '../context/ExpenseContext'
import ExpenseItemCard from '../components/ExpenseItemCard' 

const Transactions = () => {

  const { expenses } = useExpense();
  
  return (
    <SafeAreaView style={tw`flex-1`}>
        <View style={tw`px-5 pt-5 pb-3`}>
        <Text style={tw`text-4xl font-bold text-black`}>Transactions</Text>
        <Text style={tw`text-base text-gray-500 mt-1`}>View all your transactions here.</Text>
      </View>
      <FlatList
        data={expenses}
        renderItem={({item}) => <ExpenseItemCard item={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  )
}

export default Transactions