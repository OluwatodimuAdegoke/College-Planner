import { View, Text, TouchableOpacity, Modal } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  logOutUser,
  deleteUserF,
  getUserDetail,
  setUserDetail,
  deleteUserAndData,
  changePassword,
  changeEmail,
  sendVerification,
} from "../firebaseConfig";
import { TextInput } from "react-native";

const Accounts = ({ navigation }) => {
  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [type, setType] = React.useState("");

  const submitButton = () => {
    if (type === "username") {
      const data = { username: userName };
      setUserDetail({ value: data });
      setShowModal(false);
    } else if (type === "email") {
      changeEmail({ newEmail: email });
      setShowModal(false);
    } else if (type === "password") {
      changePassword({ newPassword: password });
      setShowModal(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getUserDetail({ setValue: setUserName, type: "username" });
      await getUserDetail({ setValue: setEmail, type: "email" });
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return (
    <SafeAreaView className="flex-1 ">
      <Modal
        visible={showModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View className="flex-1 justify-center items-center">
          <View className="bg-gray-500 w-5/6 rounded-xl p-2 space-y-2">
            <View className="h-10">
              {type === "username" && (
                <TextInput
                  className="bg-gray-100 flex-1 rounded-lg px-2 pr-2"
                  placeholder={userName}
                  value={userName}
                  onChangeText={(text) => setUserName(text)}
                />
              )}
              {type === "email" && (
                <TextInput
                  className="bg-gray-100 flex-1 rounded-lg px-2 pr-2"
                  placeholder={email}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              )}
              {type === "password" && (
                <TextInput
                  className="bg-gray-100 flex-1 rounded-lg px-2 pr-2"
                  placeholder="Enter New Password"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
              )}
            </View>
            <TouchableOpacity
              onPress={() => submitButton()}
              className=" p-2  bg-gray-100 rounded-md items-center w-1/3 self-center"
            >
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View className="flex-row mb-2 items-center justify-between">
        <Icon
          name="chevron-left"
          size={30}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View className="justify-center items-center space-y-6 flex-1">
        <TouchableOpacity
          // onPress={() => deleteUserF({ navigator: navigation })}
          onPress={() => {
            setType("username");
            setShowModal(true);
          }}
          className={` flex-row items-center justify-between`}
        >
          <Text className="text-lg font-semibold">Change UserName</Text>
          <Icon name="dns" size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setType("profile_picture");
            setShowModal(true);
          }}
          className={` flex-row items-center justify-between`}
        >
          <Text className="text-lg font-semibold">Change ProfilePicture</Text>
          <Icon name="person" size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setType("email");
            setShowModal(true);
          }}
          className={` flex-row items-center justify-between`}
        >
          <Text className="text-lg font-semibold">Change Email</Text>
          <Icon name="mail" size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setType("password");
            setShowModal(true);
          }}
          className={` flex-row items-center justify-between`}
        >
          <Text className="text-lg font-semibold">Change Password</Text>
          <Icon name="key" size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => sendVerification()}
          className={` flex-row items-center justify-between`}
        >
          <Text className="text-lg font-semibold">Verify Email</Text>
          <Icon name="send" size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => deleteUserAndData({ navigator: navigation })}
          className={` flex-row items-center justify-between`}
        >
          <Text className="text-lg font-semibold">Delete Account</Text>
          <Icon name="delete" size={25} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Accounts;
