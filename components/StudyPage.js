import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HalfScreenModal from "../modals/AddEvent";

const StudyPage = ({ route, navigation }) => {
  const { item } = route.params;
  return (
    <SafeAreaView className="flex-1">
      <Text>Study Page</Text>
      <HalfScreenModal />
      <Text>{item.name}</Text>
    </SafeAreaView>
  );
};

export default StudyPage;
