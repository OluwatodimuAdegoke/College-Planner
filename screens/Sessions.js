import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import database from "../tempDatabase";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ScrollView } from "react-native-gesture-handler";

const Sessions = ({ navigation }) => {
  const sessions = database.users[0].studySessions;
  const loadData = () => {};

  return (
    <SafeAreaView className="flex-1 p-2">
      <View className="flex-row mb-2 items-center">
        <Icon
          name="chevron-left"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text className="text-3xl font-bold flex-auto justify-center text-center pr-6">
          Study Sessions
        </Text>
      </View>
      <ScrollView className="flex-1" contentContainerStyle={{ gap: 10 }}>
        {sessions.map((session, index) => {
          return (
            <TouchableOpacity
              key={index}
              className="bg-gray-300 rounded-lg p-2 h-52 justify-between"
            >
              <Text className="font-bold text-3xl mb-10">
                {session.course.toUpperCase()}
              </Text>
              <View>
                <Text className="font-semibold text-2xl">
                  Notes:{" "}
                  <Text className="font-normal text-xl">{session.notes}</Text>
                </Text>
                <View className="flex-row space-x-4">
                  <Icon size={30} name="timer" />
                  <Text className="font-semibold text-xl">
                    {session.duration}{" "}
                    <Text className="font-normal">minutes</Text>
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <TouchableOpacity className="justify-center items-center">
        <Icon name="add-box" size={50} style={{ color: "#6b7280" }} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Sessions;
