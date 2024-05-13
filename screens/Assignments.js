import { View, Text, Button, Dimensions, StyleSheet } from "react-native";
import React, { act, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import database from "../tempDatabase";
import TaskComponent from "./TaskComponent";

const Assignments = ({ navigation }) => {
  const [assignment, setAssignment] = useState([]);

  const assignments = database.users[0].assignments;

  const loadData = () => {
    setAssignment(assignments);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <SafeAreaView className="flex-1 p-2">
      <View className="flex-row mb-2 ">
        <Icon
          name="chevron-left"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text className="text-4xl font-bold flex-auto justify-center text-center pr-6">
          Assignments
        </Text>
      </View>

      <View className="flex-1 mt-2">
        <FlatList
          data={assignment}
          renderItem={({ item }) => (
            <View>
              <TaskComponent item={item} />
            </View>
          )}
        />
      </View>
      <View className="justify-center items-center">
        <Icon name="add-box" size={50} style={{ color: "gray" }} />
      </View>
    </SafeAreaView>
  );
};

export default Assignments;
