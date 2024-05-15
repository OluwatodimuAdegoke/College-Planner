import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { autoLogin } from '../firebaseConfig'

const Welcome = ({navigation}) => {

  useEffect(() => 
    autoLogin({navigator: navigation}))
  
  return (
    <View className="flex-1 justify-center bg-white p-5">
      <Text className="font-bold text-2xl text-center">Welcome</Text>
    </View>
  )
}

export default Welcome