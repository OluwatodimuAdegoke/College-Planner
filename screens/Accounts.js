import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  logOutUser,
  deleteUserF,
  getUserDetail,
  setUserDetail,
} from "../firebaseConfig";

const Accounts = () => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center space-y-6">
      <TouchableOpacity
        // onPress={() => deleteUserF({ navigator: navigation })}
        className={` flex-row items-center justify-between`}
      >
        <Text className="text-lg font-semibold">Change UserName</Text>
        <Icon name="dns" size={25} />
      </TouchableOpacity>
      <TouchableOpacity
        // onPress={() => deleteUserF({ navigator: navigation })}
        className={` flex-row items-center justify-between`}
      >
        <Text className="text-lg font-semibold">Change ProfilePicture</Text>
        <Icon name="person" size={25} />
      </TouchableOpacity>
      <TouchableOpacity
        // onPress={() => deleteUserF({ navigator: navigation })}
        className={` flex-row items-center justify-between`}
      >
        <Text className="text-lg font-semibold">Change Email</Text>
        <Icon name="mail" size={25} />
      </TouchableOpacity>
      <TouchableOpacity
        // onPress={() => deleteUserF({ navigator: navigation })}
        className={` flex-row items-center justify-between`}
      >
        <Text className="text-lg font-semibold">Change Password</Text>
        <Icon name="key" size={25} />
      </TouchableOpacity>
      <TouchableOpacity
        // onPress={() => deleteUserF({ navigator: navigation })}
        className={` flex-row items-center justify-between`}
      >
        <Text className="text-lg font-semibold">Delete Account</Text>
        <Icon name="delete" size={25} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Accounts;
