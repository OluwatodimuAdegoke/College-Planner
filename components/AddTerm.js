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
  loadData,
  setUserDetail,
  updateData,
} from "../firebaseConfig";

const AddTerm = ({ setActiveModal, type, item, editCurrentTerm }) => {
  const [name, setName] = useState("");

  const checkField = () => {
    if (name === "") {
      Alert.alert("Empty Fields", "Please fill all the fields");
      return;
    }
    const task = {
      name: name,
    };

    setActiveModal(false);
    if (type === "Edit") {
      updateData({ id: item.id, type: "terms", value: task });
      if (editCurrentTerm) {
        console.log(task.name);
        setUserDetail({
          value: { currentTerm: task.name },
        });
      }
    } else {
      addData({ value: task, type: "terms" });
    }
  };

  useEffect(() => {
    if (item) {
      setName(item.name);
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
                placeholder="Term Name"
                value={name}
                onChangeText={(value) => setName(value)}
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

export default AddTerm;
