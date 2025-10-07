import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'

const ExpenseItemCard = ({item}) => {

  return (
    <View style={tw`bg-white rounded-2xl p-4 mx-5 mb-3 flex-row items-center justify-between shadow-sm`}>
        <View style={tw`flex-row items-center flex-1 mr-3`}>
            <View style={tw`w-12 h-12 rounded-xl bg-gray-100 items-center justify-center mr-4`}>
                <Text>{item.icon}</Text>
            </View>
            <View style={tw`flex-1`}>
                <Text style={tw`text-base font-bold text-gray-800`} numberOfLines={2} ellipsizeMode="tail">{item.title}</Text>
                <View style={[tw`mt-1 px-2 py-1 rounded-lg self-start `, {backgroundColor: item.color}]}>
                    <Text style={tw`text-gray-800 text-xs font-bold`}>{item.category}</Text>
                </View>
            </View>
        </View> 

        <View style={tw`items-end flex-shrink-0`}>
            <Text style={tw`text-base font-bold text-black`}>$ {item.amount.toFixed(2)}</Text>
            <Text style={tw`text-xs text-gray-500 mt-1`}>{item.date}</Text>
        </View>
    </View>
  )
}

export default ExpenseItemCard

const styles = StyleSheet.create({})