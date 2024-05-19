import { View, Text, Button, Dimensions, StyleSheet } from "react-native";
import React, { act, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import database from "../tempDatabase";
import TaskComponent from "../components/TaskComponent";
import AddAssignments from "../components/AddAssignments";
import { deleteData, loadData, updateData } from "../firebaseConfig";
import { set } from "date-fns";

const Assignments = ({ navigation }) => {
  const [assignment, setAssignment] = useState([]);
  const [activeModal, setActiveModal] = useState(false);

  const [modalType, setModalType] = useState("Add");
  const [currentItem, setCurrentItem] = useState(null);

  const completeTask = (item) => {
    updateData({
      id: item.id,
      value: { completed: !item.completed },
      type: "assignments",
    });
  };

  const deleteComponent = (id) => {
    deleteData({ id: id, type: "assignments" });
  };

  const editComponent = (item) => {
    setModalType("Edit");
    setCurrentItem(item);
    setActiveModal(true);
  };
  const addComponent = () => {
    setModalType("Add");
    setCurrentItem(null);
    setActiveModal(true);
  };

  useEffect(() => {
    loadData({ setData: setAssignment, type: "assignments" });
  }, []);

  return (
    <SafeAreaView className="flex-1 p-2">
      {activeModal && (
        <AddAssignments
          setActiveModal={setActiveModal}
          type={modalType}
          item={currentItem}
        />
      )}
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
                      onPress={() => completeTask(item)}
                    />
                  ) : (
                    <Icon
                      name="check-box-outline-blank"
                      size={20}
                      onPress={() => completeTask(item)}
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
                    name="edit-note"
                    size={25}
                    onPress={() => editComponent(item)}
                  />
                  <Icon
                    name="delete"
                    size={25}
                    onPress={() => deleteComponent(item.id)}
                  />
                </View>
              </View>
            </View>
          )}
        />
      </View>
      <TouchableOpacity
        className="justify-center items-center"
        onPress={() => addComponent()}
      >
        <Icon name="add-box" size={50} style={{ color: "#6b7280" }} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Assignments;
