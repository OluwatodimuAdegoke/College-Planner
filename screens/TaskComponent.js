import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Swipeable } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";

const TaskComponent = ({ item, deleteComponent, isCompleted }) => {
  let swipeableRef;
  deleteComponent = false;
  //TODO: Delete the component
  const renderLeftActions = (progress, dragX) => {
    deleteComponent = true;
    return (
      <TouchableOpacity className=" justify-center pr-2">
        <Icon name="delete" size={25} style={{ color: "red" }} />
      </TouchableOpacity>
    );
  };

  //TODO: Change completed property to completed
  const renderRightActions = (progress, dragX) => {
    isCompleted = !isCompleted;
    return (
      <TouchableOpacity className="justify-center px-2">
        <Icon name="check-circle" size={25} style={{ color: "green" }} />
      </TouchableOpacity>
    );
  };
  const onSwipeableOpen = () => {
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
        onSwipeableOpen={onSwipeableOpen}
      >
        <View className="rounded-lg mb-2 p-2 bg-gray-300">
          <TouchableOpacity className=" flex-1">
            <Text className="text-center font-bold text-sm">{item.name}</Text>

            <View className="self-start">
              <Text className="font-semibold">
                Description:{" "}
                <Text className="font-normal">{item.description}</Text>
              </Text>
              <Text className="font-semibold">
                Due Date: <Text className="font-normal">{item.date}</Text>
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Swipeable>
    </View>
  );
};

export default TaskComponent;
