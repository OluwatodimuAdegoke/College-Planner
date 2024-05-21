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
  const [duration, setDuration] = useState(0);
  const [name, setName] = useState("");

  const checkField = () => {
    const durationInt = parseInt(duration);
    if (name === "" || duration === 0 || duration === NaN) {
      Alert.alert("Empty Fields", "Please fill all the fields");
      return;
    }
    const task = {
      duration: durationInt,
      name: name,
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
      setName(item.name);
      setDuration(item.duration);
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
                placeholder="Notes"
                value={name}
                onChangeText={(value) => setName(value)}
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
