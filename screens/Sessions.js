import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ScrollView } from "react-native-gesture-handler";
import { loadData } from "../firebaseConfig";
import { COLORS, ItemComponent } from "../components";
import { SheetManager } from "react-native-actions-sheet";

const Sessions = ({ navigation }) => {
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await loadData({
        setData: setSessions,
        type: "studySessions",
        completed: false,
      });
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView className={` ${COLORS.mainColor} flex-1 p-2`}>
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
      {isLoading && (
        <ActivityIndicator
          size="large"
          className="justify-center items-center flex-1"
        />
      )}
      {!isLoading && (
        <ScrollView className="flex-1" contentContainerStyle={{ gap: 10 }}>
          {sessions.map((session, index) => {
            return (
              <View
                className="space-y-1 bg-gray-400 p-2 rounded-lg"
                key={index}
              >
                <ItemComponent
                  type={"studySessions"}
                  item={session}
                  edit={true}
                />
              </View>
            );
          })}
        </ScrollView>
      )}
      <TouchableOpacity
        className="items-center bg-blue-500 rounded-xl flex-row pr-4 p-2 absolute bottom-5 right-4"
        onPress={() => {
          SheetManager.show("AddEvent", {
            payload: {
              type: "studySessions",
            },
          });
        }}
      >
        <Icon name="add" size={25} style={{ color: "white" }} />
        <Text className="font-bold text-lg text-white">Add Session</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Sessions;
