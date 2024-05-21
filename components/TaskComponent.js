import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Swipeable } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import { set } from "date-fns";

const TaskComponent = ({ item, deleteComponent, isCompleted }) => {
  let swipeableRef;
  const [data, setData] = useState(item);

  return (
    <View>
      <View className="rounded-lg mb-2 p-2 bg-gray-300 h-16">
        <TouchableOpacity className=" flex-1">
          <View className="flex-row">
            <Text className="text-center font-bold text-sm flex-auto">
              {data.name}
            </Text>
            {data.completed && (
              <Icon name="check-circle" size={15} color={"green"} />
            )}
          </View>

          <View className="self-start">
            <Text className="font-semibold">
              Description:{" "}
              <Text className="font-normal">{data.description}</Text>
            </Text>
            <Text className="font-semibold">
              Due Date:{" "}
              <Text className="font-normal">
                {new Date(data.date).toDateString()}
              </Text>
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskComponent;
