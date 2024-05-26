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
import { SafeAreaView } from "react-native-safe-area-context";
import { da } from "date-fns/locale";

const AssignmentComponent = ({ route, navigation }) => {
  const { data } = route.params;

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(data.date.toDate());
  const [name, setName] = useState(data.name);
  const [description, setDescription] = useState(data.description);

  const checkField = () => {
    if (name === "" || description === "") {
      Alert.alert("Empty Fields", "Please fill all the fields");
      return;
    }
    const task = {
      name: name,
      description: description,
      date: date,
      course: data.course,
      completed: false,
      courseId: data.courseId,
    };

    updateData({ id: data.id, value: task, type: "assignments" });
    navigation.goBack();
  };

  useEffect(() => {
    setName(data.name);
    setDescription(data.description);
    setDate(data.date.toDate());
  }, [data]);

  return (
    <SafeAreaView className="flex-1 p-2">
      <Icon
        name="chevron-left"
        size={30}
        style={{ alignSelf: "flex-start" }}
        onPress={() => navigation.goBack()}
      />
      <Text className="text-center text-2xl">Assignment</Text>
      <View className="p-2 space-y-5  justify-center flex-1">
        <View className="h-10 flex-row items-center">
          <Text>Name: </Text>
          <TextInput
            className="bg-gray-100 flex-1 rounded-lg px-2 pr-2"
            maxLength={30}
            placeholder="Assignment Name"
            value={name}
            onChangeText={(value) => setName(value)}
          />
        </View>

        <View className="h-10 flex-row items-center">
          <Text>Description: </Text>
          <TextInput
            className="bg-gray-100 flex-1 rounded-lg px-2 pr-2"
            maxLength={30}
            placeholder="Assignment Description"
            value={description}
            onChangeText={(value) => setDescription(value)}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            setOpen(true);
            // console.log(open);
          }}
          className="bg-gray-200  rounded-md h-8 justify-center"
        >
          <Text className="font-semibold text-base">
            Due Date: {date.toDateString()}
          </Text>
        </TouchableOpacity>

        {open && (
          <RNDateTimePicker
            value={date}
            display="spinner"
            mode="date"
            minimumDate={new Date()}
            onChange={(e, selectedDate) => {
              if (e.type === "dismissed") {
                setOpen(false);
              } else if (e.type === "set") {
                setOpen(false);
                setDate(selectedDate);
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
    </SafeAreaView>
  );
};

export default AssignmentComponent;
