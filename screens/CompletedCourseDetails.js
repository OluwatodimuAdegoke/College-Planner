import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  deleteData,
  loadData,
  loadForCourse,
  updateData,
} from "../firebaseConfig";
import Icon from "react-native-vector-icons/MaterialIcons";
import AddAssignments from "../modals/AddAssignments";
import AddExams from "../modals/AddExams";
import { Button, Menu } from "react-native-paper";

import ShowDetails from "../modals/ShowDetails";
import ItemComponent from "../components/ItemComponent";
import { tr } from "date-fns/locale";
const CompletedCourseDetails = ({ route, navigation }) => {
  const { data } = route.params;
  const [assignments, setAssignments] = useState([]);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    loadForCourse({
      setData: setAssignments,
      type: "assignments",
      courseId: data.id,
      completed: true,
    });
    loadForCourse({
      setData: setExams,
      type: "exams",
      courseId: data.id,
      completed: true,
    });
  }, []);

  return (
    <SafeAreaView className="p-4 flex-1 space-y-2">
      <Icon name="chevron-left" size={30} onPress={() => navigation.goBack()} />
      <View className="p-2 rounded-md bg-gray-400  ">
        <Text className="text-center font-bold text-2xl">Completed Work</Text>
      </View>

      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 10 }}
        >
          {assignments.map((item) => {
            return (
              <TouchableOpacity
                className=" p-2 rounded-md bg-gray-400"
                key={item.id}
                onPress={() => {
                  setCurrentItem(item);
                  setShowModalType("assignments");
                  setShowModal(true);
                }}
              >
                <ItemComponent item={item} type={"assignments"} edit={true} />
              </TouchableOpacity>
            );
          })}
          {exams.map((item) => {
            return (
              <TouchableOpacity
                className=" p-2 rounded-md bg-gray-400"
                key={item.id}
                onPress={() => {
                  setCurrentItem(item);
                  setShowModalType("exams");
                  setShowModal(true);
                }}
              >
                <ItemComponent item={item} type="exams" edit={true} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CompletedCourseDetails;
