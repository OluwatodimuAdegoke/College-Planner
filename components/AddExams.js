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

const AddExams = ({ setActiveModal, type, item, course }) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const checkField = () => {
    if (name === "" || location === "") {
      Alert.alert("Empty Fields", "Please fill all the fields");
      return;
    }
    const task = {
      name: name,
      location: location,
      date: date,
      course: course.code,
      startTime: startTime,
      endTime: endTime,
    };
    setActiveModal(false);
    if (type === "Edit") {
      updateToCourse({
        value: task,
        id: item.id,
        type: "exams",
        courseId: course.id,
      });
      // updateData({ id: item.id, value: task, type: "assignments" });
    } else {
      addToCourse({ value: task, type: "exams", courseId: course.id });
    }
  };

  useEffect(() => {
    if (item) {
      setName(item.name);
      setLocation(item.location);
      setDate(item.date.toDate());
      setStartTime(item.startTime.toDate());
      setEndTime(item.endTime.toDate());
    }
  }, [item]);

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
                placeholder="Exam Type"
                value={name}
                onChangeText={(value) => setName(value)}
              />
            </View>

            <View className="h-10">
              <TextInput
                className="bg-gray-100 flex-1 rounded-lg px-2 pr-2"
                maxLength={30}
                placeholder="Location"
                value={location}
                onChangeText={(value) => setLocation(value)}
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
                Due Date: {date.toDateString()}
              </Text>
            </View>
            <View className="h-10 flex-row items-center">
              <Text>Start Time: </Text>
              <TextInput
                className="bg-gray-100 flex-1 rounded-md px-2 pr-2"
                placeholder={`${startTime.toLocaleTimeString()}`}
                editable={true}
                onPress={() => setOpenStart(true)}
                on
              />
            </View>

            {openStart && (
              <RNDateTimePicker
                value={startTime}
                display="spinner"
                mode="time"
                onChange={(e, selectedDate) => {
                  if (e.type === "dismissed") {
                    setOpenStart(false);
                  } else if (e.type === "set") {
                    setOpenStart(false);
                    setStartTime(selectedDate);
                  }
                }}
              />
            )}

            <View className="h-10 flex-row items-center">
              <Text>End Time: </Text>
              <TextInput
                className="bg-gray-100 flex-1 rounded-md px-2 pr-2"
                placeholder={`${endTime.toLocaleTimeString()}`}
                editable={true}
                onPress={() => setOpenEnd(true)}
                on
              />
            </View>

            {openEnd && (
              <RNDateTimePicker
                value={endTime}
                display="spinner"
                mode="time"
                onChange={(e, selectedDate) => {
                  if (e.type === "dismissed") {
                    setOpenEnd(false);
                  } else if (e.type === "set") {
                    setOpenEnd(false);
                    setEndTime(selectedDate);
                  }
                }}
              />
            )}
            {open && (
              <RNDateTimePicker
                value={date}
                display="spinner"
                mode="date"
                minimumDate={new Date()}
                onChange={(e, selectedDate) => {
                  s;
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
        </View>
      </View>
    </Modal>
  );
};

export default AddExams;
