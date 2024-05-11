import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Categories = ({navigation}) => {

  const width = Dimensions.get("screen").width/2 - 25;

  return (
    <View className="flex-1 p-2">
      <Text className="text-2xl font-bold  mb-5"> Explore Categories</Text>

      <View className="flex-row justify-between  mb-2">

    
        <TouchableOpacity onPress={() => navigation.navigate("Schedules")} className="bg-gray-300 p-4 rounded-xl  h-60" style={{width: width}}>
          <Text>Schedules</Text>   
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Tasks")} className="bg-gray-300 p-4 rounded-xl h-60"  style={{width: width}}>
          <Text>Tasks</Text>   
        </TouchableOpacity>

      </View>

      <View className="flex-row justify-between mb-2">

    
        <TouchableOpacity onPress={() => navigation.navigate("Sessions")} className="bg-gray-300 p-4 rounded-xl  h-60" style={{width: width}}>
          <Text>Study Sessions</Text>   
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Assignments")} className="bg-gray-300 p-4 rounded-xl h-60"  style={{width: width}}>
          <Text>Assignments</Text>   
        </TouchableOpacity>

      </View>


    </View>
  )
}

export default Categories