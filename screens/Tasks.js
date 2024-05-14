import { View, Text, Button, Dimensions, StyleSheet } from "react-native";
import React, { act, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import database from "../tempDatabase";
import TaskComponent from "./TaskComponent";

const Tasks = ({ navigation }) => {
  const [active, setActive] = useState("Ongoing");
  const [ongoing, setOngoing] = useState([]);
  const [completed, setCompleted] = useState([]);

  const tasks = database.users[0].tasks;

  const loadData = () => {
    let a = [];
    let b = [];
    tasks.map((e, i) => {
      if (e.completed) {
        a.push(e);
      } else {
        b.push(e);
      }
    });

    setOngoing(b);
    setCompleted(a);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <SafeAreaView className="flex-1 p-2">
      <View className="flex-row mb-2 items-center">
        <Icon
          name="chevron-left"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text className="text-3xl font-bold flex-auto justify-center text-center pr-7">
          Tasks
        </Text>
      </View>

      <View className="flex-row justify-evenly h-12 items-center px-10 rounded-lg">
        <TouchableOpacity
          className={`${
            active === "Ongoing" ? "bg-gray-200 border border-gray-100" : ""
          } py-2 px-10 rounded-xl`}
          onPress={() => setActive("Ongoing")}
        >
          <Text className="font-semibold text-base">Ongoing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`${
            active === "Completed" ? "bg-gray-200 border border-gray-100" : ""
          } py-2 px-10 rounded-xl`}
          onPress={() => setActive("Completed")}
        >
          <Text className="font-semibold text-base">Completed</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 mt-2">
        <FlatList
          data={active === "Ongoing" ? ongoing : completed}
          renderItem={({ item }) => (
            <View>
              <TaskComponent item={item} />
            </View>
          )}
        />
      </View>
      {active === "Ongoing" && (
        <TouchableOpacity className="justify-center items-center">
          <Icon name="add-box" size={50} style={{ color: "#6b7280" }} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default Tasks;
