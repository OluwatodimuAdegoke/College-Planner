import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ScrollView } from "react-native-gesture-handler";
import {
  addToCourse,
  deleteData,
  loadCourses,
  loadToCourse,
  updateToCourse,
  deleteFromCourse,
} from "../firebaseConfig";
import AddCourses from "../components/AddCourses";
import AddAssignments from "../components/AddAssignments";
import AddExams from "../components/AddExams";

const Schedules = ({ navigation }) => {
  // const schedules = database.users[0].schedules;
  // const courses = schedules[0].courses;

  const [activeModal, setActiveModal] = useState(false);
  const [modalType, setModalType] = useState("Add");
  const [currentItem, setCurrentItem] = useState(null);

  const [courses, setCourses] = useState([]);
  const [term, setTerm] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [exams, setExams] = useState([]);

  const [activeModalE, setActiveModalE] = useState(false);
  const [currentItemE, setCurrentItemE] = useState(null);
  const [currentCourseE, setCurrentCourseE] = useState(null);

  const [activeModalA, setActiveModalA] = useState(false);
  const [currentItemA, setCurrentItemA] = useState(null);
  const [currentCourseA, setCurrentCourseA] = useState(null);

  const deleteComponent = ({ id, type, courseId }) => {
    if (type === "courses") {
      deleteData({ id: id, type: "courses" });
    } else if (type === "assignments") {
      deleteFromCourse({ id: id, type: "assignments", courseId: courseId });
    } else if (type === "exams") {
      deleteFromCourse({ id: id, type: "exams", courseId: courseId });
    }
  };

  const editComponent = ({ type, item, course }) => {
    setModalType("Edit");
    setCurrentItem(item);
    if (type === "courses") {
      setActiveModal(true);
    } else if (type === "assignments") {
      setCurrentCourseA(course);
      setActiveModalA(true);
    } else if (type === "exams") {
      setCurrentCourseE(course);
      setActiveModalE(true);
    }
  };

  const addComponent = ({ course, type }) => {
    setCurrentItem(null);
    setModalType("Add");
    if (type === "courses") {
      setActiveModal(true);
    } else if (type === "assignments") {
      setCurrentCourseE(course);
      setActiveModalE(true);
    } else if (type === "exams") {
      setCurrentCourseA(course);
      setActiveModalA(true);
    }
  };

  const completeA = ({ item, courseId }) => {
    updateToCourse({
      value: { completed: !item.completed },
      id: item.id,
      type: "assignments",
      courseId: courseId,
    });
  };

  useEffect(() => {
    loadCourses({ setCourse: setCourses, setTerm: setTerm });
    loadToCourse({ setData: setAssignments, type: "assignments" });
    loadToCourse({ setData: setExams, type: "exams" });
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
      {activeModalA && (
        <AddAssignments
          setActiveModal={setActiveModalA}
          type={modalType}
          item={currentItem}
          course={currentCourseA}
        />
      )}
      {activeModalE && (
        <AddExams
          setActiveModal={setActiveModalE}
          type={modalType}
          item={currentItem}
          course={currentCourseE}
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
              <TouchableOpacity className="bg-gray-300 rounded-lg p-2  justify-between">
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
                        onPress={() => deleteComponent(course.id)}
                      />
                    </View>
                    <View className="flex-row items-center">
                      <Icon
                        name="assignment"
                        size={25}
                        onPress={() =>
                          addComponent({ course, type: "assignments" })
                        }
                      />
                      <Icon
                        name="book"
                        size={25}
                        onPress={() => addComponent({ course, type: "exams" })}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              {assignments[course.id] &&
                assignments[course.id].map((item, i) => (
                  <View
                    className="rounded-lg ml-10 p-2 bg-gray-300 h-24"
                    key={i}
                  >
                    {/* TouchableOpacity Here */}
                    <View className=" flex-1">
                      <View className="flex-row">
                        <Text className="text-center font-bold text-sm flex-auto">
                          Assignment: {item.name}
                        </Text>

                        {item.completed === true ? (
                          <Icon
                            name="check-box"
                            size={20}
                            onPress={() =>
                              completeA({
                                item: item,
                                courseId: course.id,
                              })
                            }
                          />
                        ) : (
                          <Icon
                            name="check-box-outline-blank"
                            size={20}
                            onPress={() =>
                              completeA({
                                item: item,
                                courseId: course.id,
                              })
                            }
                          />
                        )}
                      </View>

                      <View className="self-start">
                        <Text className="font-semibold">
                          Description:{" "}
                          <Text className="font-normal">
                            {item.description}
                          </Text>
                        </Text>
                        <Text className="font-semibold">
                          Due Date:{" "}
                          <Text className="font-normal">
                            {item.date.toDate().toDateString()}
                          </Text>
                        </Text>
                      </View>
                      <View className="flex-row justify-end space-x-4">
                        <Icon
                          name="edit-note"
                          size={25}
                          onPress={() =>
                            editComponent({
                              type: "assignments",
                              item: item,
                              course: course,
                            })
                          }
                        />
                        <Icon
                          name="delete"
                          size={25}
                          onPress={() =>
                            deleteComponent({
                              id: item.id,
                              type: "assignments",
                              courseId: course.id,
                            })
                          }
                        />
                      </View>
                    </View>
                  </View>
                ))}
              {exams[course.id] &&
                exams[course.id].map((item, i) => (
                  <View
                    className="rounded-lg ml-10 p-2 bg-gray-300 h-28"
                    key={i}
                  >
                    {/* TouchableOpacity Here */}
                    <View className=" flex-1">
                      <View className="flex-row">
                        <Text className="text-center font-bold text-sm flex-auto">
                          Exams: {item.name}
                        </Text>
                      </View>

                      <View className="self-start">
                        <Text className="font-semibold">
                          Location:{" "}
                          <Text className="font-normal">{item.location}</Text>
                        </Text>
                        <Text className="font-semibold">
                          Exam Date:{" "}
                          <Text className="font-normal">
                            {item.date.toDate().toDateString()}
                          </Text>
                        </Text>
                        <Text className="font-semibold">
                          StartTime:{" "}
                          <Text className="font-normal ">
                            {item.startTime.toDate().toLocaleTimeString()}
                          </Text>
                        </Text>
                        <Text className="font-semibold ">
                          EndTime:{" "}
                          <Text className="font-normal ">
                            {item.endTime.toDate().toLocaleTimeString()}
                          </Text>
                        </Text>
                      </View>
                      <View className="flex-row justify-end space-x-4">
                        <Icon
                          name="edit-note"
                          size={25}
                          onPress={() =>
                            editComponent({
                              type: "exams",
                              item: item,
                              course: course,
                            })
                          }
                        />
                        <Icon
                          name="delete"
                          size={25}
                          onPress={() =>
                            deleteComponent({
                              id: item.id,
                              type: "exams",
                              courseId: course.id,
                            })
                          }
                        />
                      </View>
                    </View>
                  </View>
                ))}
              {/* {exams && console.log(exams)} */}
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
