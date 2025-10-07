import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import EmptyList from '../components/EmptyList'
import ExpenseItemCard from '../components/ExpenseItemCard'
import { useExpense } from '../context/ExpenseContext'


const Home = () => {
  
  const {expenses} = useExpense();

  const totalSpent = expenses.reduce((total, item) => total + item.amount, 0);

  return (
    
    <View style={tw`flex-1`}>

      <View style={tw`px-5 pt-5 pb-3`}>
        <Text style={tw`text-4xl font-bold text-black`}>Hello 👋</Text>
        <Text style={tw`text-base text-gray-500 mt-1`}>Start tracking your expenses easily.</Text>
      </View>

      <View style={tw`bg-black rounded-3xl p-6 m-5 items-center shadow-lg`}>
        <Text style={tw`text-base text-gray-400`}> Spent so far</Text>
        <Text style={tw`text-base text-white text-4xl mt-2 font-bold`}> $ {totalSpent.toFixed(2)}</Text>  
      </View>

      <FlatList 
        data={expenses} 
        renderItem={({item}) => <ExpenseItemCard item={item}/>}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{paddingBottom: 20}}
        ListEmptyComponent={<EmptyList />}

      />

    </View>
  )
}

export default Home

const styles = StyleSheet.create({})