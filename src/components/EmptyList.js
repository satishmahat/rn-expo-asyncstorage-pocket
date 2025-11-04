import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from '../utils/tw'

const EmptyList = ({title = 'No expenses yet', message = 'Add items to get started'}) => {
  return (
    <View style={tw`flex-1 items-center justify-center p-8 mt-10`}>
      <Text style={tw`text-4xl font-syne mb-2`}>🖊️</Text>
      <Text style={tw`text-lg font-syneBold`}>{title}</Text>
      <Text style={tw`text-base font-syne text-gray-500`}>{message}</Text>
    </View>
  )
}

export default EmptyList

const styles = StyleSheet.create({})