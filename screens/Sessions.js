import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Icon from "react-native-vector-icons/MaterialIcons";
import { ScrollView } from "react-native-gesture-handler";
import { deleteData, loadData } from "../firebaseConfig";
import AddSessions from "../modals/AddSessions";
import COLORS from "../components/COLORS";

const Sessions = ({ navigation }) => {
  const [sessions, setSessions] = useState([]);
  const [activeModal, setActiveModal] = useState(false);

  const [modalType, setModalType] = useState("Add");
  const [currentItem, setCurrentItem] = useState(null);

  const deleteComponent = (id) => {
    deleteData({ id: id, type: "studySessions" });
  };
  const editComponent = (item) => {
    setModalType("Edit");
    setCurrentItem(item);
    setActiveModal(true);
  };
  const addComponent = () => {
    setModalType("Add");
    setCurrentItem(null);
    setActiveModal(true);
  };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await loadData({ setData: setSessions, type: "studySessions" });
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView className={` ${COLORS.mainColor} flex-1 p-2`}>
      {activeModal && (
        <AddSessions
          type={modalType}
          item={currentItem}
          setActiveModal={setActiveModal}
        />
      )}
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
              <TouchableOpacity
                key={index}
                className="bg-gray-300 rounded-lg p-2 h-28 justify-between"
              >
                <View className="flex-row items-center justify-between">
                  <Text className="font-bold text-3xl ">
                    {/* {session.course.toUpperCase()} */}
                  </Text>
                  <TouchableOpacity className="h-10 w-10 bg-gray-500 items-center justify-center rounded-full">
                    <Text>Start</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <Text className="font-semibold text-2xl">
                    Name:{" "}
                    <Text className="font-normal text-xl">{session.name}</Text>
                  </Text>
                  <View className="flex-row justify-between">
                    <View className="flex-row space-x-4 items-center">
                      <Icon size={25} name="timer" />
                      <Text className="font-semibold text-xl">
                        {session.duration}{" "}
                        <Text className="font-normal">minutes</Text>
                      </Text>
                    </View>
                    <View className="flex-row items-center space-x-4">
                      <Icon
                        name="edit-note"
                        size={25}
                        onPress={() => editComponent(session)}
                      />
                      <Icon
                        name="delete"
                        size={25}
                        onPress={() => deleteComponent(session.id)}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}

      <TouchableOpacity
        className="justify-center items-center"
        onPress={() => addComponent()}
      >
        <Icon name="add-box" size={50} style={{ color: "#6b7280" }} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Sessions;
