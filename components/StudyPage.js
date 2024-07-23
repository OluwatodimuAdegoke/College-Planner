import { View, Text, Alert, AppState } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { differenceInMinutes, formatDistanceToNow, set } from "date-fns";
import { addData, deleteData, loadByParent } from "../firebaseConfig";

const StudyPage = ({ route, navigation }) => {
  const { item } = route.params;

  const initialHour = Math.floor(item.duration / 60);
  const initialMinute = item.duration % 60;
  const [hour, setHour] = useState(initialHour);
  const [minute, setMinute] = useState(initialMinute);
  const [second, setSecond] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [history, setHistory] = useState([]);

  const stop = () => {
    setIsRunning(false);
    const diff = differenceInMinutes(
      new Date(0, 0, 0, initialHour, initialMinute, 0),
      new Date(0, 0, 0, hour, minute, second)
    );
    setHour(initialHour);
    setMinute(initialMinute);
    setSecond(0);
    const data = {
      date: new Date(),
      duration: diff,
      sessionId: item.id,
    };
    if (data.duration > 0) {
      addData({ value: data, type: "studyHistory" });
    }
  };
  const pause = () => {
    setIsRunning(false);
  };
  const start = () => {
    setIsRunning(true);
  };

  let timer;
  useEffect(() => {
    if (isRunning) {
      timer = setInterval(() => {
        if (second > 0) {
          setSecond(second - 1);
        } else if (minute > 0) {
          setMinute(minute - 1);
          setSecond(59);
        } else if (hour > 0) {
          setHour(hour - 1);
          setMinute(59);
          setSecond(59);
        } else {
          stop();
          Alert.alert("Time's up!");
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  });

  useEffect(() => {
    loadByParent({
      setData: setHistory,
      type: "studyHistory",
      parentId: item.id,
    });
  }, []);

  return (
    <SafeAreaView className="p-4 flex-1 space-y-2">
      <View className="flex-row mb-2 items-center">
        <Icon
          name="chevron-left"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text className="text-3xl font-bold flex-auto justify-center text-center pr-6">
          Study Timer
        </Text>
      </View>
      <Text className="text-center pr-2 font-bold text-2xl">{item.name}</Text>
      <View className="flex-row justify-between space-x-2 mb-5">
        <View className="flex-1 h-20">
          <View className="bg-gray-200  flex-1 rounded-lg justify-center items-center">
            <Text className="font-bold text-2xl">{hour}</Text>
          </View>
          <Text className="text-center font-semibold">Hours</Text>
        </View>
        <View className="flex-1 h-20">
          <View className="bg-gray-200  flex-1 rounded-lg justify-center items-center">
            <Text className="font-bold text-2xl">{minute}</Text>
          </View>
          <Text className="text-center font-semibold">Minutes</Text>
        </View>
        <View className="flex-1 h-20">
          <View className="bg-gray-200  flex-1 rounded-lg justify-center items-center">
            <Text className="font-bold text-2xl">{second}</Text>
          </View>
          <Text className="text-center font-semibold">Seconds</Text>
        </View>
      </View>

      <View className="flex-row justify-between space-x-2">
        <TouchableOpacity
          onPress={() => start()}
          className=" justify-center bg-gray-200 rounded-xl px-8 py-4"
        >
          <Text className="font-bold text-2xl">Start</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => pause()}
          className=" justify-center bg-gray-200 rounded-xl px-8 py-4"
        >
          <Text className="font-bold text-2xl">Pause</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => stop()}
          className=" justify-center bg-gray-200 rounded-xl px-8 py-4"
        >
          <Text className="font-bold text-2xl">Stop</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-xl font-bold">History</Text>
      <View className="space-y-2">
        {history.map((hist, index) => {
          const timeSinceCompletion = formatDistanceToNow(hist.date.toDate(), {
            addSuffix: true,
          });
          return (
            <View
              key={index}
              className="flex-row justify-between bg-gray-200 p-2 rounded-lg items-center"
            >
              <View>
                <Text>{item.name}</Text>
                <Text>{hist.duration} minutes</Text>
              </View>
              <Text>{timeSinceCompletion}</Text>
              <Icon
                name="delete"
                size={25}
                onPress={() =>
                  deleteData({ id: hist.id, type: "studyHistory" })
                }
              />
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default StudyPage;
