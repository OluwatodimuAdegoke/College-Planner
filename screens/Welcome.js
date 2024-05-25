import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { autoLogin } from "../firebaseConfig";
import COLORS from "../components/COLORS";

const Welcome = ({ navigation }) => {
  useEffect(() => autoLogin({ navigator: navigation }));

  return (
    <SafeAreaView className={` ${COLORS.mainColor} flex-1 p-5 justify-center`}>
      <Text className="font-bold text-2xl text-center">Welcome</Text>
    </SafeAreaView>
  );
};

export default Welcome;
