import {
  View,
  Text,
  Modal,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {
  addData,
  addToCourse,
  updateData,
  updateToCourse,
} from "../firebaseConfig";

const AddAssignments = ({ setActiveModal, course }) => {
  const [open, setOpen] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const checkField = () => {
    if (name === "" || description === "") {
      Alert.alert("Empty Fields", "Please fill all the fields");
      return;
    }
    const task = {
      name: name,
      description: description,
      date: dueDate,
      course: course.code,
      completed: false,
      courseId: course.id,
    };

    setActiveModal(false);

    addData({ value: task, type: "assignments" });
  };

  return (
    <Modal
      animationType="fade"
      visible={true}
      transparent={true}
      onRequestClose={() => setActiveModal(false)}
    >
      <View className="flex-1 justify-center items-center">
        <View className="bg-gray-500 w-5/6 rounded-xl p-2">
          <Icon
            name="close"
            size={20}
            style={{ alignSelf: "flex-end" }}
            onPress={() => setActiveModal(false)}
          />
          <View className="p-2 space-y-2">
            <View className="h-10">
              <TextInput
                className="bg-gray-100 flex-1 rounded-lg px-2 pr-2"
                maxLength={30}
                placeholder="Assignment Name"
                value={name}
                onChangeText={(value) => setName(value)}
              />
            </View>

            <View className="h-10">
              <TextInput
                className="bg-gray-100 flex-1 rounded-lg px-2 pr-2"
                maxLength={30}
                placeholder="Assignment Description"
                value={description}
                onChangeText={(value) => setDescription(value)}
              />
            </View>

            <View className="flex-row items-center justify-around">
              <TouchableOpacity
                onPress={() => {
                  setOpen(true);
                  // console.log(open);
                }}
                className="bg-gray-200 w-20 rounded-md h-8 justify-center"
              >
                <Text className="text-center">Date</Text>
              </TouchableOpacity>
              <Text className="font-semibold text-base">
                Due Date: {dueDate.toDateString()}
              </Text>
            </View>

            {open && (
              <RNDateTimePicker
                value={dueDate}
                display="spinner"
                mode="date"
                minimumDate={new Date()}
                onChange={(e, selectedDate) => {
                  if (e.type === "dismissed") {
                    setOpen(false);
                  } else if (e.type === "set") {
                    setOpen(false);
                    setDueDate(selectedDate);
                  }
                }}
              />
            )}
            <TouchableOpacity
              onPress={() => checkField()}
              className="bg-gray-200 w-20 rounded-md h-8 justify-center self-center"
            >
              <Text className="text-center">Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddAssignments;
