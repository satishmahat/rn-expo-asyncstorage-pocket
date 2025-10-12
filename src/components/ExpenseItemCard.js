import { StyleSheet, Text, View, Pressable, Alert} from 'react-native'
import React from 'react'
import tw from 'twrnc'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Ionicons } from '@expo/vector-icons';
import { useExpense } from '../context/ExpenseContext';

const ExpenseItemCard = ({item}) => {
    const { deleteExpense } = useExpense();

    const handleDelete = () => {
        Alert.alert(
            'Delete Expense',
            `Are you sure you want to delete "${item.title}"?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => deleteExpense(item.id),
                },
            ]
        );
    };

    const LeftSwipeActions = () => {
    return (
        <View style={tw`w-20 bg-blue-500 justify-center items-center rounded-2xl ml-5 -mr-3 mb-3`}>
            <View style={tw`w-12 h-12 bg-white rounded-full items-center justify-center`}>
                <Ionicons name="create-outline" size={24} color="#3B82F6" />
            </View>
        </View>
    )
    }
    const rightSwipeActions = () => {
    return (
        <Pressable 
            style={({ pressed }) => [
                tw`w-20 bg-red-500 justify-center items-center rounded-2xl mr-5 -ml-3 mb-3`,
                pressed && tw`opacity-70`
            ]}
            onPress={handleDelete}
        >
            <View style={tw`w-12 h-12 bg-white rounded-full items-center justify-center`}>
                <Ionicons name="trash-outline" size={24} color="#EF4444" />
            </View>
        </Pressable>
    )
    }
  return (
    <Swipeable
        renderLeftActions={LeftSwipeActions}
        renderRightActions={rightSwipeActions}
        leftThreshold={80}
        rightThreshold={80}
        friction={2}
    >
    <View style={[tw`bg-white rounded-2xl p-4 mx-5 mb-3 flex-row items-center justify-between shadow-sm`, {borderLeftWidth: 0.5, borderLeftColor: '#3B82F6', borderRightWidth: 0.5, borderRightColor: '#EF4444'}]}>
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
    </Swipeable>
  )
}

export default ExpenseItemCard

const styles = StyleSheet.create({})