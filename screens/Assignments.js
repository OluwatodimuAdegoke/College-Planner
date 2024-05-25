import { View, Text, Button, Dimensions, StyleSheet } from "react-native";
import React, { act, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

import { deleteData, loadData, updateData } from "../firebaseConfig";

const Assignments = ({ navigation }) => {
  const [assignment, setAssignment] = useState([]);
  const [exam, setExam] = useState([]);

  const completeTask = ({ item }) => {
    updateData({
      value: { completed: !item.completed },
      id: item.id,
      type: "assignments",
    });
  };

  const deleteComponent = ({ id, type }) => {
    deleteData({ id: id, type: type });
  };

  useEffect(() => {
    loadData({ setData: setAssignment, type: "assignments", completed: false });
    loadData({ setData: setExam, type: "exams", completed: false });
  }, []);

  return (
    <SafeAreaView className="flex-1 p-2">
      <View className="flex-row mb-2 items-center">
        <Icon
          name="chevron-left"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text className="text-3xl font-bold flex-auto justify-center text-center pr-6">
          Assignments / Exams
        </Text>
      </View>
      <View className="flex-1 mt-2 justify-evenly">
        <FlatList
          data={assignment}
          renderItem={({ item }) => (
            <View className="rounded-lg mb-2 p-2 bg-gray-300 ">
              {/* TouchableOpacity Here */}
              <View className=" flex-1">
                <View className="flex-row">
                  <Text className="text-center font-bold text-sm flex-auto">
                    {item.name}
                  </Text>

                  {item.completed === true ? (
                    <Icon
                      name="check-box"
                      size={20}
                      onPress={() => completeTask({ item: item })}
                    />
                  ) : (
                    <Icon
                      name="check-box-outline-blank"
                      size={20}
                      onPress={() =>
                        completeTask({ item: item, courseId: item.courseId })
                      }
                    />
                  )}
                </View>

                <View className="self-start">
                  <Text className="font-semibold">
                    Description:{" "}
                    <Text className="font-normal">{item.description}</Text>
                  </Text>
                  <Text className="font-semibold">
                    Due Date:{" "}
                    <Text className="font-normal">
                      {item.date.toDate().toDateString()}
                    </Text>
                  </Text>
                </View>
                <View className="flex-row justify-end space-x-4">
                  <Icon
                    name="delete"
                    size={25}
                    onPress={() =>
                      deleteComponent({
                        id: item.id,
                        courseId: item.courseId,
                        type: "assignments",
                      })
                    }
                  />
                </View>
              </View>
            </View>
          )}
        />
        <FlatList
          data={exam}
          renderItem={({ item }) => (
            <View className="rounded-lg mb-2 p-2 bg-gray-300 ">
              {/* TouchableOpacity Here */}
              <View className=" flex-1">
                <View className="flex-row">
                  <Text className="text-center font-bold text-sm flex-auto">
                    {item.name}
                  </Text>
                </View>

                <View className="self-start">
                  <Text className="font-semibold">
                    Description:{" "}
                    <Text className="font-normal">{item.location}</Text>
                  </Text>
                  <Text className="font-semibold">
                    Due Date:{" "}
                    <Text className="font-normal">
                      {item.date.toDate().toDateString()}
                    </Text>
                  </Text>
                </View>
                <View className="flex-row justify-end space-x-4">
                  <Icon
                    name="delete"
                    size={25}
                    onPress={() =>
                      deleteComponent({
                        id: item.id,
                        courseId: item.courseId,
                        type: "exams",
                      })
                    }
                  />
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Assignments;
