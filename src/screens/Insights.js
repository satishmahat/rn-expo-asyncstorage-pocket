import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { PieChart } from 'react-native-gifted-charts'
import { useExpense } from '../context/ExpenseContext'
import { processedDataForChart } from '../helper'


const Insights = () => {

  const { expenses } = useExpense();
 
  const pieChartData = processedDataForChart(expenses);

  const renderListItem = ({item}) => {
    return (
      <View style={tw`flex-row items-center justify-between p-4 border-b border-gray-200`}>
        <View style={tw`flex-row items-center`}>
          <View style={[tw`w-4 h-4 rounded-full mr-3`, {backgroundColor: item.color}]} />
          <Text style={tw`text-base text-gray-700`}>{item.name}</Text>
        </View>
        <View style={tw`items-end`}>
          <Text style={tw`text-base font-bold text-gray-800`}>$ {item.amount.toFixed(2)}</Text>
          <Text style={tw`text-sm text-gray-500`}>{item.value}%</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <Text style={tw`text-4xl text-center font-bold px-5 pt-5 pb-6`}>Spending Summary</Text>

      <View style={tw`items-center`}>
        <PieChart 
          donut
          data={pieChartData} 
          showText
          textColor={'black'}
          innerRadius={50}
          height={300}
          width={300}
        />
      </View>

      <FlatList 
        data={pieChartData}
        renderItem={renderListItem}
        keyExtractor={(item) => item.name}
        contentContainerStyle={tw`p-4`}
      />    
    </View>
  )
}

export default Insights

const styles = StyleSheet.create({})