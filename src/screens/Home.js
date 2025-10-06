import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

const Home = ({navigation}) => {
  return (
    <View>
      <Text>Home</Text>
      <Button onPress={() => navigation.navigate('Profile')} title='Go to Profile' />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})