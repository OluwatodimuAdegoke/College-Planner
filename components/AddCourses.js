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
import { addCourses, updateData } from "../firebaseConfig";

const AddCourses = ({ setActiveModal, type, item }) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const [daysPressed, setDaysPressed] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [section, setSection] = useState("");
  const [location, setLocation] = useState("");
  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const checkField = () => {
    const daysChosen = days.filter((e, i) => daysPressed[i]);

    if (
      name === "" ||
      code === "" ||
      location === "" ||
      startTime === endTime
    ) {
      Alert.alert("Empty Fields", "Please fill all the fields");
      return;
    } else if (daysChosen.length === 0) {
      Alert.alert("Empty Fields", "Please chose a least a day");
      return;
    }
    const value = {
      name: name,
      code: code,
      section: section,
      location: location,
      startTime: startTime,
      endTime: endTime,
      days: daysChosen,
    };

    setActiveModal(false);
    if (type === "Edit") {
      updateData({ id: item.id, value: value, type: "courses" });
    } else {
      addCourses({ course: value });
    }
  };

  useEffect(() => {
    if (item) {
      setName(item.name);
      setCode(item.code);
      setSection(item.section);
      setLocation(item.location);
      setStartTime(item.startTime.toDate());
      setEndTime(item.endTime.toDate());
      item.days.forEach((e) => {
        const index = days.indexOf(e);
        daysPressed[index] = true;
      });
      setDaysPressed([...daysPressed]);
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
            <View className="flex-row justify-between">
              <View className="h-10 w-1/2">
                <TextInput
                  className="bg-gray-100 flex-1 rounded-lg px-2 pr-2"
                  maxLength={30}
                  placeholder="Course Name"
                  value={name}
                  onChangeText={(value) => setName(value)}
                />
              </View>
              <View className="h-10 w-1/4">
                <TextInput
                  className="bg-gray-100 flex-1 rounded-lg px-2 pr-2"
                  maxLength={5}
                  placeholder="Course Code"
                  value={code}
                  onChangeText={(value) => setCode(value)}
                />
              </View>
              <View className="h-10">
                <TextInput
                  className="bg-gray-100 flex-1 rounded-lg px-2 pr-2"
                  maxLength={3}
                  placeholder="Section"
                  value={section}
                  onChangeText={(value) => setSection(value)}
                />
              </View>
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

            <View className="flex-row justify-between">
              {days.map((e, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    className={`px-4 py-2 rounded-md ${
                      daysPressed[i] ? "bg-blue-200" : "bg-gray-200 "
                    }`}
                    onPress={() => {
                      daysPressed[i] = !daysPressed[i];
                      setDaysPressed([...daysPressed]);
                    }}
                  >
                    <Text>{e.slice(0, 3)}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              onPress={() => checkField()}
              className="bg-gray-200 w-20 rounded-md h-8 justify-center self-center"
            >
              <Text className="text-center">Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddCourses;
