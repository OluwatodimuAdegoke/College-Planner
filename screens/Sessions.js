import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import database from "../tempDatabase";

const Sessions = () => {
  const sessions = database.users[0].studySessions;
  const loadData = () => {};
  return (
    <SafeAreaView>
      <Text>Sessions</Text>
    </SafeAreaView>
  );
};

export default Sessions;
