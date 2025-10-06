import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import EmptyList from '../components/EmptyList'
import ExpenseItemCard from '../components/ExpenseItemCard'

export const expenseData = [
    {
      id: '1',
      icon: '🍕',
      title: 'Pizza Delivery',
      category: 'Food',
      amount: 25.99,
      date: '2024-01-15',
      color: '#FF6B6B'
    },
    {
      id: '2',
      icon: '⛽',
      title: 'Gas Station',
      category: 'Transportation',
      amount: 45.50,
      date: '2024-01-14',
      color: '#4ECDC4'
    },
    {
      id: '3',
      icon: '🛒',
      title: 'Grocery Shopping',
      category: 'Food',
      amount: 89.75,
      date: '2024-01-13',
      color: '#45B7D1'
    },
    {
      id: '4',
      icon: '🎬',
      title: 'Movie Tickets',
      category: 'Entertainment',
      amount: 32.00,
      date: '2024-01-12',
      color: '#96CEB4'
    },
    {
      id: '5',
      icon: '☕',
      title: 'Coffee Shop',
      category: 'Food',
      amount: 8.50,
      date: '2024-01-11',
      color: '#FFEAA7'
    },
    {
      id: '6',
      icon: '🏥',
      title: 'Doctor Visit',
      category: 'Healthcare',
      amount: 120.00,
      date: '2024-01-10',
      color: '#DDA0DD'
    },
    {
      id: '7',
      icon: '👕',
      title: 'Clothing Store',
      category: 'Shopping',
      amount: 75.25,
      date: '2024-01-09',
      color: '#98D8C8'
    },
    {
      id: '8',
      icon: '📚',
      title: 'Book Purchase',
      category: 'Education',
      amount: 18.99,
      date: '2024-01-08',
      color: '#F7DC6F'
    }
];

const Home = () => {
  
  const totalSpent = expenseData.reduce((total, item) => total + item.amount, 0);

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
        data={expenseData} 
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