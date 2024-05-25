import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ScrollView } from "react-native-gesture-handler";
import { deleteData, getUserDetail, loadData } from "../firebaseConfig";
import AddCourses from "../components/AddCourses";
import COLORS from "../components/COLORS";

const Schedules = ({ navigation }) => {
  const [activeModal, setActiveModal] = useState(false);
  const [modalType, setModalType] = useState("Add");
  const [currentItem, setCurrentItem] = useState(null);

  const [courses, setCourses] = useState([]);
  const [term, setTerm] = useState("");

  const deleteComponent = ({ id, type }) => {
    if (type === "courses") {
      deleteData({ id: id, type: "courses" });
    }
  };

  const editComponent = ({ type, item }) => {
    setModalType("Edit");
    setCurrentItem(item);
    if (type === "courses") {
      setActiveModal(true);
    }
  };

  const addComponent = () => {
    setCurrentItem(null);
    setModalType("Add");

    setActiveModal(true);
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      getUserDetail({ type: "currentTerm", setValue: setTerm });
      loadData({ setData: setCourses, type: "courses" });
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView className={` ${COLORS.mainColor} flex-1 p-2`}>
      {activeModal && (
        <AddCourses
          setActiveModal={setActiveModal}
          type={modalType}
          item={currentItem}
        />
      )}

      <View className="flex-row mb-1 items-center">
        <Icon
          name="chevron-left"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text className="text-2xl font-bold flex-auto justify-center text-center pr-6">
          {term}
        </Text>
      </View>
      {isLoading && (
        <ActivityIndicator
          size="large"
          className="justify-center items-center flex-1"
        />
      )}
      {!isLoading && (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ gap: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {courses.map((course, index) => {
            return (
              <View key={index} className="space-y-1">
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("DisplayCourse", { data: course })
                  }
                  className="bg-gray-300 rounded-lg p-2  justify-between"
                >
                  <View>
                    <View className="flex-row justify-between">
                      <Text className="font-semibold text-2xl">
                        {course.code}: {course.name}
                      </Text>
                      <Text className="font-semibold text-base">
                        Section:{" "}
                        <Text className="font-normal text-base">
                          {course.section}
                        </Text>
                      </Text>
                    </View>
                    <Text className="font-semibold text-xl">
                      Location:{" "}
                      <Text className="font-normal text-lg">
                        {course.location}
                      </Text>
                    </Text>
                    <Text className="font-semibold text-xl">
                      StartTime:{" "}
                      <Text className="font-normal text-lg">
                        {course.startTime.toDate().toLocaleTimeString()}
                      </Text>
                    </Text>
                    <Text className="font-semibold text-xl">
                      EndTime:{" "}
                      <Text className="font-normal text-lg">
                        {course.endTime.toDate().toLocaleTimeString()}
                      </Text>
                    </Text>

                    <View className="flex-row justify-between">
                      <View className="flex-row items-center">
                        <Text className="font-semibold text-xl">Days: </Text>
                        <View className="flex-row space-x-2">
                          {course.days.map((e, i) => (
                            <Text className="text-lg" key={i}>
                              {e}
                            </Text>
                          ))}
                        </View>
                      </View>
                      <View className="flex-row items-center">
                        <Icon
                          name="edit-note"
                          size={25}
                          onPress={() =>
                            editComponent({ type: "courses", item: course })
                          }
                        />
                        <Icon
                          name="delete"
                          size={25}
                          onPress={() =>
                            deleteComponent({ id: course.id, type: "courses" })
                          }
                        />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
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

export default Schedules;
