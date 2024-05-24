import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const StudyPage = ({ route, navigation }) => {
  const { item } = route.params;
  return (
    <SafeAreaView>
      <Text>{item.name}</Text>
    </SafeAreaView>
  );
};

export default StudyPage;
