import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { loadByParent } from "../firebaseConfig";
import Icon from "react-native-vector-icons/MaterialIcons";

import { ItemComponent } from "../components";

const CompletedCourseDetails = ({ route, navigation }) => {
  const { data } = route.params;
  const [assignments, setAssignments] = useState([]);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    loadByParent({
      setData: setAssignments,
      type: "assignments",
      parentId: data.id,
      completed: true,
    });
    loadByParent({
      setData: setExams,
      type: "exams",
      parentId: data.id,
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
              <View className=" p-2 rounded-md bg-gray-400" key={item.id}>
                <ItemComponent item={item} type={"assignments"} edit={true} />
              </View>
            );
          })}
          {exams.map((item) => {
            return (
              <View className=" p-2 rounded-md bg-gray-400" key={item.id}>
                <ItemComponent item={item} type="exams" edit={true} />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CompletedCourseDetails;
