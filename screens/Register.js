import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { registerUser } from "../firebaseConfig";
import { COLORS } from "../components";
import Icon from "react-native-vector-icons/MaterialIcons";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [cPassword, setCPassword] = useState();
  const [username, setUsername] = useState();

  const [seePassword, setSeePassword] = useState(true);
  const [seeCPassword, setSeeCPassword] = useState(true);

  return (
    <SafeAreaView className={` ${COLORS.mainColor} flex-1 p-5 justify-center`}>
      <View className="space-y-2">
        <View className="h-12">
          <TextInput
            className="bg-gray-100 flex-1 rounded-lg px-2 pr-2"
            maxLength={30}
            placeholder="UserName"
            value={username}
            onChangeText={(value) => setUsername(value)}
          />
        </View>
        <View className="h-12">
          <TextInput
            className="bg-gray-100 flex-1 rounded-lg px-2 pr-2"
            maxLength={30}
            placeholder="Email Address"
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
        </View>
        <View className="h-12 flex-row bg-gray-100 items-center px-2 rounded-lg">
          <TextInput
            className=" flex-1 h-10"
            secureTextEntry={seePassword}
            maxLength={30}
            placeholder="Password"
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
          <Icon
            onPress={() => setSeePassword(!seePassword)}
            name={seePassword ? "visibility-off" : "visibility"}
            size={20}
          />
        </View>

        <View className="h-12 flex-row bg-gray-100 items-center px-2 rounded-lg">
          <TextInput
            className=" flex-1 h-10"
            secureTextEntry={seeCPassword}
            maxLength={30}
            placeholder="Confirm Password"
            value={cPassword}
            onChangeText={(value) => setCPassword(value)}
          />
          <Icon
            onPress={() => setSeeCPassword(!seeCPassword)}
            name={seeCPassword ? "visibility-off" : "visibility"}
            size={20}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text className="underline self-end mt-2">Login ?</Text>
      </TouchableOpacity>
      <View>
        <TouchableOpacity
          onPress={() =>
            registerUser({
              email: email,
              password: password,
              cPassword: cPassword,
              userName: username,
              navigator: navigation,
            })
          }
          className="bg-gray-200 rounded-lg h-11 w-24 justify-center self-center mt-2"
        >
          <Text className="self-center font-semibold text-xl">Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Register;
