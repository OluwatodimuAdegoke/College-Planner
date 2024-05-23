import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ScrollView } from "react-native-gesture-handler";
import { deleteData, getUserDetail, loadData } from "../firebaseConfig";
import AddCourses from "../components/AddCourses";
import AddAssignments from "../components/AddAssignments";
import AddExams from "../components/AddExams";

const Schedules = ({ navigation }) => {
  // const schedules = database.users[0].schedules;
  // const courses = schedules[0].courses;

  const [activeModal, setActiveModal] = useState(false);
  const [modalType, setModalType] = useState("Add");
  const [currentItem, setCurrentItem] = useState(null);
  const [currentCourse, setCurrentCourse] = useState(null);

  const [courses, setCourses] = useState([]);
  const [term, setTerm] = useState("");
  // const [assignments, setAssignments] = useState([]);
  // const [exams, setExams] = useState([]);

  const [activeModalE, setActiveModalE] = useState(false);
  const [activeModalA, setActiveModalA] = useState(false);

  const deleteComponent = ({ id, type, courseId }) => {
    if (type === "courses") {
      deleteData({ id: id, type: "courses" });
    }
    // } else if (type === "assignments") {
    //   // deleteFromCourse({ id: id, type: "assignments", courseId: courseId });
    // } else if (type === "exams") {
    //   // deleteFromCourse({ id: id, type: "exams", courseId: courseId });
    // }
  };

  const editComponent = ({ type, item, course }) => {
    setModalType("Edit");
    setCurrentItem(item);
    if (type === "courses") {
      setActiveModal(true);
    }
    // } else if (type === "assignments") {
    //   setCurrentCourse(course);
    //   setActiveModalA(true);
    // } else if (type === "exams") {
    //   setCurrentCourse(course);
    //   setActiveModalE(true);
    // }
  };

  const addComponent = ({ course, type }) => {
    setCurrentItem(null);
    setModalType("Add");
    if (type === "courses") {
      setActiveModal(true);
    }
    // } else if (type === "assignments") {
    //   setCurrentCourse(course);
    //   setActiveModalE(true);
    // } else if (type === "exams") {
    //   setCurrentCourse(course);
    //   setActiveModalA(true);
    // }
  };

  const completeAssignment = ({ item, courseId }) => {
    updateToCourse({
      value: { completed: !item.completed },
      id: item.id,
      type: "assignments",
      courseId: courseId,
    });
  };

  useEffect(() => {
    getUserDetail({ type: "currentTerm", setValue: setTerm });
    loadData({ setData: setCourses, type: "courses" });
    // loadData({ setData: setAssignments, type: "assignments" });
    // loadData({ setData: setExams, type: "exams" });
  }, []);

  return (
    <SafeAreaView className="flex-1 p-2">
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
      <TouchableOpacity
        className="justify-center items-center"
        onPress={() => addComponent({ type: "courses" })}
      >
        <Icon name="add-box" size={50} style={{ color: "#6b7280" }} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Schedules;
