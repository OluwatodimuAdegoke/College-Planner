import { View, Text, Dimensions } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import COLORS from "../components/COLORS";
import Icon from "react-native-vector-icons/MaterialIcons";
const Categories = ({ navigation }) => {
  const width = Dimensions.get("screen").width / 2 - 25;
  const width2 = Dimensions.get("screen").width / 1.5 - 25;

  return (
    <View className={`${COLORS.mainColor} flex-1 space-y-4`}>
      <Text className="text-2xl font-bold mb-5 text-center">
        Explore Categories
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("Schedules")}
        className={` flex-row items-center justify-between`}
      >
        <Text className="text-2xl font-semibold">Schedules</Text>
        <Icon name={"chevron-right"} size={25} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Tasks")}
        className={` flex-row items-center justify-between`}
      >
        <Text className="text-2xl font-semibold">Tasks</Text>
        <Icon name={"chevron-right"} size={25} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Sessions")}
        className={` flex-row items-center justify-between`}
      >
        <Text className="text-2xl font-semibold">Study Sessions</Text>
        <Icon name={"chevron-right"} size={25} />
      </TouchableOpacity>
      {/* <TouchableOpacity
          onPress={() => navigation.navigate("Assignments")}
          className="bg-gray-300 p-4 rounded-br-xl rounded-tr-xl h-36 border "
          style={{
            width: width + 10,
          }}
        >
          <Text>Assignments</Text>
        </TouchableOpacity> */}
    </View>
  );
};

export default Categories;
