import { View, Text, Button, Dimensions, StyleSheet } from "react-native";
import React, { act, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import database from "../tempDatabase";
import TaskComponent from "../components/TaskComponent";
import AddAssignments from "../components/AddAssignments";
import { loadData } from "../firebaseConfig";

const Assignments = ({ navigation }) => {
  const [assignment, setAssignment] = useState([]);
  const [activeModal, setActiveModal] = useState(false);

  useEffect(() => {
    loadData({ setData: setAssignment, type: "assignments" });
  }, []);

  return (
    <SafeAreaView className="flex-1 p-2">
      <AddAssignments
        activeModal={activeModal}
        setActiveModal={setActiveModal}
      />
      <View className="flex-row mb-2 items-center">
        <Icon
          name="chevron-left"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text className="text-3xl font-bold flex-auto justify-center text-center pr-6">
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
      <TouchableOpacity
        className="justify-center items-center"
        onPress={() => setActiveModal(true)}
      >
        <Icon name="add-box" size={50} style={{ color: "#6b7280" }} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Assignments;
