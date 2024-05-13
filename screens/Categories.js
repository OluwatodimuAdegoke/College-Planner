import { View, Text, Dimensions } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const Categories = ({ navigation }) => {
  const width = Dimensions.get("screen").width / 2 - 25;
  const width2 = Dimensions.get("screen").width / 1.5 - 25;

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold mb-5 text-center">
        Explore Categories
      </Text>

      <View className="flex-row items-end mr-10">
        <TouchableOpacity
          onPress={() => navigation.navigate("Schedules")}
          className="bg-gray-300 p-4 rounded-l-xl  h-36 border"
          style={{
            width: width + 10,
          }}
        >
          <Text>Schedules</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Tasks")}
          className="bg-gray-300 p-4 rounded-tr-xl rounded-tl-xl h-60 border"
          style={{
            width: width - 20,
          }}
        >
          <Text>Tasks</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row items-start ml-10">
        <TouchableOpacity
          onPress={() => navigation.navigate("Sessions")}
          className="bg-gray-300 p-4 rounded-b-xl h-60 border"
          style={{
            width: width - 20,
          }}
        >
          <Text>Study Sessions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Assignments")}
          className="bg-gray-300 p-4 rounded-br-xl rounded-tr-xl h-36 border "
          style={{
            width: width + 10,
          }}
        >
          <Text>Assignments</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Categories;
