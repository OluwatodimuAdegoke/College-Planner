import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ScrollView } from "react-native-gesture-handler";
import { loadCourses } from "../firebaseConfig";
import AddCourses from "../components/AddCourses";

const Schedules = ({ navigation }) => {
  // const schedules = database.users[0].schedules;
  // const courses = schedules[0].courses;

  const [activeModal, setActiveModal] = useState(false);

  const [courses, setCourses] = useState([]);
  const [term, setTerm] = useState("");

  useEffect(() => {
    loadCourses({ setCourse: setCourses, setTerm: setTerm });
  }, []);

  return (
    <SafeAreaView className="flex-1 p-2">
      <AddCourses activeModal={activeModal} setActiveModal={setActiveModal} />
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

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ gap: 10 }}
        showsVerticalScrollIndicator={false}
      >
        {courses.map((course, index) => {
          return (
            <TouchableOpacity
              key={index}
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
                  <Text className="font-normal text-lg">{course.location}</Text>
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
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <TouchableOpacity
        className="justify-center items-center"
        onPress={() => setActiveModal(true)}
      >
        <Icon name="add-box" size={50} style={{ color: "#6b7280" }} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Schedules;
