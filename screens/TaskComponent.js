import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Swipeable } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import { set } from "date-fns";

const TaskComponent = ({ item, deleteComponent, isCompleted }) => {
  let swipeableRef;
  deleteComponent = false;
  const [data, setData] = useState(item);

  const upddateData = () => {
    item.completed = !item.completed;
    setData(item);
  };
  const renderLeftActions = (progress, dragX) => {
    return (
      <TouchableOpacity className=" justify-center pr-2">
        <Icon name="delete" size={25} style={{ color: "red" }} />
      </TouchableOpacity>
    );
  };

  //TODO: Change completed property to completed
  const renderRightActions = (progress, dragX) => {
    return (
      <TouchableOpacity className="justify-center px-2">
        <Icon name="check-circle" size={25} style={{ color: "green" }} />
      </TouchableOpacity>
    );
  };
  const onSwipeableOpen = (direction) => {
    if (direction == "right") {
      isCompleted("HHererer");
    }
    setTimeout(() => {
      if (swipeableRef) {
        swipeableRef.close();
      }
    }, 10);
  };
  return (
    <View>
      <Swipeable
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}
        ref={(ref) => (swipeableRef = ref)}
        onSwipeableOpen={(direction) => onSwipeableOpen(direction)}
      >
        <View className="rounded-lg mb-2 p-2 bg-gray-300">
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
      </Swipeable>
    </View>
  );
};

export default TaskComponent;
