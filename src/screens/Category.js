// Modal Screen
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { CATEGORIES } from '../constants'

const Category = ({navigation}) => {

    const handleSelectedCategory = (category) => {
        // console.log(category);
        navigation.popTo("BottomTabs",{
            screen: "Create",
            params: {category}
        });
    }

    const renderItem = ({item}) => {
        return (
            <Pressable 
            style={tw`flex-1 items-center bg-white rounded-xl p-4 m-2 shadow-sm border border-gray-200`}
            onPress={() => handleSelectedCategory(item)}
            >
                <Text style={tw`text-4xl`}>{item.icon}</Text>
                <Text style={tw`mt-2 text-center text-sm text-gray-700`}>{item.name}</Text>
            </Pressable>
        )
    }
  return (
    <View style={tw`flex-1`}>
        <View style={tw`p-5`}>
            <Pressable onPress={() => navigation.goBack()}>
                <Text style={tw`text-2xl font-bold`}>X</Text>
            </Pressable>
            <Text style={tw`text-3xl font-bold mt-4`}>Select Category</Text>
            <Text style={tw`text-base text-gray-500 mb-4 mt-2`}>Select the category that best describes the nature of your expense</Text>
        </View> 

        <FlatList 
            data={CATEGORIES} 
            renderItem={renderItem} 
            keyExtractor={(item) => item.name}
            numColumns={2}
            contentContainerStyle={tw`p-4`}
        />   
    </View>
  )
}

export default Category

const styles = StyleSheet.create({})