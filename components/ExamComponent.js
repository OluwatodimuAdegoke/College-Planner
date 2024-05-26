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

const ExamComponent = ({ route, navigation }) => {
  const { data } = route.params;

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(data.date.toDate());
  const [location, setLocation] = useState(data.location);
  const [startTime, setStartTime] = useState(data.startTime.toDate());
  const [endTime, setEndTime] = useState(data.endTime.toDate());

  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);

  const checkField = () => {
    if (location === "") {
      Alert.alert("Empty Fields", "Please fill all the fields");
      return;
    }
    const task = {
      location: location,
      date: date,
      course: data.course,
      courseId: data.courseId,
      startTime: startTime,
      endTime: endTime,
    };

    updateData({ id: data.id, value: task, type: "exams" });
    navigation.goBack();
  };

  useEffect(() => {
    setLocation(data.location);
    setDate(data.date.toDate());
    setStartTime(data.startTime.toDate());
    setEndTime(data.endTime.toDate());
  }, [data]);

  return (
    <SafeAreaView className="flex-1 p-2">
      <Icon
        name="chevron-left"
        size={30}
        style={{ alignSelf: "flex-start" }}
        onPress={() => navigation.goBack()}
      />
      <Text className="text-center text-2xl">Exam</Text>
      <View className="p-2 space-y-5  justify-center flex-1">
        <View className="h-10 flex-row items-center">
          <Text>Location: </Text>
          <TextInput
            className="bg-gray-100 flex-1 rounded-lg px-2 pr-2"
            maxLength={30}
            placeholder="Location"
            value={location}
            onChangeText={(value) => setLocation(value)}
          />
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

        <TouchableOpacity
          onPress={() => {
            setOpen(true);
          }}
          className="bg-gray-200 rounded-md h-8 justify-center"
        >
          <Text className="font-semibold text-base">
            Due Date: {date.toDateString()}
          </Text>
        </TouchableOpacity>
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

export default ExamComponent;
