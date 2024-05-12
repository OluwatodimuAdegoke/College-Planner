import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { logOutUser, deleteUserF, auth } from "../firebaseConfig";
import React from "react";
import WeekSlider from "./Test";

const Settings = ({ navigation }) => {
  return (
    <View className="flex-1">
      <View className="flex-row space-x-3">
        <TouchableOpacity onPress={() => logOutUser({ navigator: navigation })}>
          <Icon name="logout" size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => deleteUserF({ navigator: navigation })}
        >
          <Icon name="delete" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;
