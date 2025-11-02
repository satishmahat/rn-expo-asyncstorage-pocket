import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import EmptyList from '../components/EmptyList'
import CategoryCard from '../components/CategoryCard'
import { useExpense } from '../context/ExpenseContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { processedDataForChart } from '../helper'


const Home = () => {
  
  const {expenses} = useExpense();

  const categoryData = processedDataForChart(expenses);

  const totalSpent = expenses.reduce((total, item) => total + item.amount, 0);

  const handleCategoryPress = (categoryName) => {
    Alert.alert(categoryName);
  }

  return (
    
    <SafeAreaView style={tw`flex-1 px-5 pt-5`}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}
      >
        {/* Fixed Header Section */}
        <View style={tw`pb-3`}>
          <Text style={tw`text-4xl font-bold text-black`}>Hello 👋</Text>
          <Text style={tw`text-base text-gray-500 mt-1`}>Start tracking your expenses easily.</Text>
        </View>

        <View style={tw`bg-black rounded-3xl p-6 my-6 items-center shadow-lg`}>
          <Text style={tw`text-base text-gray-400`}> Spent so far</Text>
          <Text style={tw`text-base text-white text-4xl mt-2 font-bold`}> $ {totalSpent.toFixed(2)}</Text>  
        </View>

        {/* Category List Section - Scrollable with Max Height */}
        <View style={tw`mt-3`}>
          <Text style={tw`text-xl font-bold text-black mb-3`}> Expense by Categories:</Text>
          {categoryData.length === 0 ? (
            <EmptyList />
          ) : (
            <ScrollView 
              style={{maxHeight: 320}} // Adjust this height as needed
              showsVerticalScrollIndicator={true}
              nestedScrollEnabled={true}
            >
              {categoryData.map((item) => (
                <CategoryCard 
                  key={item.name} 
                  item={item} 
                  onPress={() => handleCategoryPress(item.name)}
                />
              ))}
            </ScrollView>
          )}
        </View>

        {/* Additional Content Section - Add your future content here */}
        <View style={tw`px-5`}>
          {/* Add your additional content here later */}
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})