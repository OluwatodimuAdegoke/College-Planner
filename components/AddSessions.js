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
import { Picker } from "@react-native-picker/picker";
import database from "../tempDatabase";
import { addData, loadData, updateData } from "../firebaseConfig";
import { update } from "firebase/database";

const AddSessions = ({ setActiveModal, type, item }) => {
  const courses = database.users[0].schedules[0].courses;

  const [duration, setDuration] = useState(0);
  const [notes, setNotes] = useState("");
  const [relatedCourse, setRelatedCourse] = useState("None");

  const checkField = () => {
    const durationInt = parseInt(duration);
    if (
      notes === "" ||
      duration === 0 ||
      duration === NaN ||
      relatedCourse === "None"
    ) {
      Alert.alert("Empty Fields", "Please fill all the fields");
      return;
    }
    const task = {
      course: relatedCourse,
      duration: durationInt,
      notes: notes,
    };

    setActiveModal(false);
    if (type === "Edit") {
      updateData({ id: item.id, value: task, type: "studySessions" });
    } else {
      addData({ value: task, type: "studySessions" });
    }
  };

  useEffect(() => {
    if (item) {
      setNotes(item.notes);
      setDuration(item.duration);
      setRelatedCourse(item.course);
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
            <View className="flex-row justify-between items-center">
              <Text className="font-semibold text-base">Course</Text>
              <View className="w-2/4">
                <Picker
                  selectedValue={relatedCourse}
                  onValueChange={(itemValue, itemIndex) =>
                    setRelatedCourse(itemValue)
                  }
                  mode="dropdown"
                >
                  <Picker.Item label="None" value="None" />
                  {courses.map((e, i) => {
                    const val = e.code;
                    return <Picker.Item label={val} value={val} key={i} />;
                  })}
                </Picker>
              </View>
            </View>

            <View className="h-10">
              <TextInput
                className="bg-gray-100 flex-1 rounded-lg px-2 pr-2"
                maxLength={30}
                placeholder="Notes"
                value={notes}
                onChangeText={(value) => setNotes(value)}
              />
            </View>
            <View className="h-10">
              <TextInput
                className="bg-gray-100 flex-1 rounded-lg px-2 pr-2"
                maxLength={30}
                keyboardType="number-pad"
                placeholder="Duration"
                value={duration}
                onChangeText={(value) => setDuration(value)}
              />
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

export default AddSessions;
