import { View, Text, TouchableOpacity, Alert, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { loginUser, changePassword, forgotPassword } from "../firebaseConfig";
import COLORS from "../components/COLORS";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [modalVisible, setModalVisible] = useState(false);
  const [fEmail, setFEmail] = useState();

  return (
    <SafeAreaView className={` ${COLORS.mainColor} flex-1 p-5 justify-center`}>
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="justify-center align-middle flex-1">
          <View className="bg-gray-200 pt-5 pb-10 m-2 rounded-xl justify-center">
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              className="self-end px-2"
            >
              <Text>Close</Text>
            </TouchableOpacity>
            <Text className="text-center font-bold text-xl">Email Address</Text>
            <View className="h-12 m-2">
              <TextInput
                className="bg-gray-100 flex-1 rounded-lg px-2 pr-2"
                maxLength={30}
                placeholder="Email Address"
                value={fEmail}
                onChangeText={(value) => setFEmail(value)}
              />
            </View>
            <TouchableOpacity
              onPress={async () => {
                await forgotPassword({ navigator: navigation, email: fEmail });
                setModalVisible(!modalVisible);
              }}
              className="bg-gray-400 rounded-lg h-11 w-32 justify-center self-center mt-2"
            >
              <Text className="self-center font-semibold text-xl">
                Reset Password
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View className="space-y-2">
        <View className="h-12">
          <TextInput
            className="bg-gray-100 flex-1 rounded-lg px-2 pr-2"
            maxLength={30}
            placeholder="Email Address"
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
        </View>
        <View className="h-12">
          <TextInput
            className="bg-gray-100 flex-1 rounded-lg px-2 pr-2"
            maxLength={30}
            placeholder="Password"
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
        </View>
      </View>
      <View className="flex-row justify-between">
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text className="underline  mt-2">Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text className="underline mt-2">Register?</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          onPress={() =>
            loginUser({
              email: email,
              password: password,
              navigator: navigation,
            })
          }
          className="bg-gray-200 rounded-lg h-11 w-24 justify-center self-center mt-2"
        >
          <Text className="self-center font-semibold text-xl">Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
