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
import AddAssignments from "./AddAssignments";
import AddExams from "./AddExams";
import { Button, Menu } from "react-native-paper";

const Display = ({ route, navigation }) => {
  const { data } = route.params;

  const [modalType, setModalType] = useState("Add");
  const [currentItem, setCurrentItem] = useState(null);

  const [activeModalE, setActiveModalE] = useState(false);
  const [activeModalA, setActiveModalA] = useState(false);

  const [assignments, setAssignments] = useState([]);
  const [exams, setExams] = useState([]);

  const [visible, setVisible] = useState(false);

  const addComponent = ({ course, type }) => {
    setCurrentItem(null);
    setModalType("Add");
    if (type === "assignments") {
      setActiveModalE(true);
    } else if (type === "exams") {
      setActiveModalA(true);
    }
  };

  const editComponent = ({ type, item }) => {
    setModalType("Edit");
    setCurrentItem(item);
    if (type === "assignments") {
      setActiveModalA(true);
    } else if (type === "exams") {
      setActiveModalE(true);
    }
  };

  const completeTask = ({ item }) => {
    updateData({
      value: { completed: !item.completed },
      id: item.id,
      type: "assignments",
    });
  };

  const deleteComponent = ({ id, type }) => {
    console.log(id, type);
    if (type === "assignments") {
      deleteData({ id: id, type: type });
    } else if (type === "exams") {
      deleteData({ id: id, type: type });
    }
  };

  if (assignments !== null) {
    ass = (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
      >
        {assignments.map((item) => {
          return (
            <TouchableOpacity
              className=" p-2 rounded-md bg-gray-400"
              key={item.id}
            >
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="font-bold text-base">
                    {item.name} : {item.course}
                  </Text>
                  <Text className="text-base w-11/12" numberOfLines={1}>
                    {item.description}
                  </Text>
                </View>
                <View className="">
                  <Text>Due Date: </Text>
                  <Text>{item.date.toDate().toDateString()}</Text>
                </View>
              </View>
              <View className="flex-row justify-end space-x-4">
                {item.completed === true ? (
                  <Icon
                    name="check-box"
                    size={20}
                    onPress={() => completeTask({ item: item })}
                  />
                ) : (
                  <Icon
                    name="check-box-outline-blank"
                    size={20}
                    onPress={() => completeTask({ item: item })}
                  />
                )}

                <Icon
                  name="delete"
                  size={18}
                  onPress={() =>
                    deleteComponent({
                      id: item.id,
                      type: "assignments",
                    })
                  }
                />
                <Icon
                  name="edit"
                  size={18}
                  onPress={() =>
                    editComponent({
                      type: "assignments",
                      item: item,
                    })
                  }
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  } else {
    ass = <Text>No Upcoming Assignments...</Text>;
  }

  if (exams !== null) {
    exam = (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
      >
        {exams.map((item) => {
          return (
            <TouchableOpacity
              className=" p-2 rounded-md bg-gray-400"
              key={item.id}
            >
              <View className="justify-between">
                <View>
                  <Text className="font-semibold text-base">
                    {item.course.toUpperCase()} : {item.name}
                  </Text>
                  <Text
                    className="text-bold font-semibold w-11/12"
                    numberOfLines={1}
                  >
                    Location:{" "}
                    <Text className="font-normal">{item.location}</Text>
                  </Text>
                  <Text
                    className="text-bold font-semibold w-11/12"
                    numberOfLines={1}
                  >
                    Date:{" "}
                    <Text className="font-normal">
                      {item.date.toDate().toDateString()}
                    </Text>
                  </Text>
                  <Text
                    className="text-bold font-semibold w-11/12"
                    numberOfLines={1}
                  >
                    Time:{" "}
                    <Text className="font-normal">
                      {item.startTime.toDate().toTimeString()} -{" "}
                      {item.endTime.toDate().toTimeString()}
                    </Text>
                  </Text>
                </View>
              </View>
              <View className="flex-row justify-end space-x-4">
                <Icon
                  name="delete"
                  size={18}
                  onPress={() =>
                    deleteComponent({
                      id: item.id,
                      type: "exams",
                    })
                  }
                />
                <Icon
                  name="edit"
                  size={18}
                  onPress={() =>
                    editComponent({
                      type: "exams",
                      item: item,
                    })
                  }
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  } else {
    exam = <Text>No Upcoming Assignments...</Text>;
  }

  useEffect(() => {
    loadForCourse({
      setData: setAssignments,
      type: "assignments",
      courseId: data.id,
    });
    loadForCourse({ setData: setExams, type: "exams", courseId: data.id });
  }, []);

  return (
    <SafeAreaView className="p-4 flex-1 space-y-2">
      {activeModalA && (
        <AddAssignments
          setActiveModal={setActiveModalA}
          type={modalType}
          item={currentItem}
          course={data}
        />
      )}
      {activeModalE && (
        <AddExams
          setActiveModal={setActiveModalE}
          type={modalType}
          item={currentItem}
          course={data}
        />
      )}
      <View className="flex-row justify-between">
        <Text
          className="font-bold text-lg text-center flex-auto"
          numberOfLines={1}
        >
          {data.code}
          <Text className="font-normal">: {data.name}</Text>
        </Text>
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <Icon onPress={() => setVisible(true)} name="more-vert" size={30} />
          }
          anchorPosition="bottom"
        >
          <Menu.Item onPress={() => {}} title="Completed" />
        </Menu>
      </View>
      <View className="p-2 rounded-md bg-gray-400  justify-around items-start">
        <Text className="font-bold text-base text-center">
          Location:
          <Text className="font-normal">: {data.location}</Text>
        </Text>
        <Text className="font-bold text-base text-center">
          Start Time:
          <Text className="font-normal">
            : {data.startTime.toDate().toTimeString()}
          </Text>
        </Text>
        <Text className="font-bold text-base text-center">
          End Time:
          <Text className="font-normal">
            : {data.endTime.toDate().toTimeString()}
          </Text>
        </Text>
        <Icon name="edit-note" />
        <Icon name="delete" />
      </View>

      <View>
        <Text className="font-bold text-xl mb-2">Assignments</Text>
        {ass}
      </View>
      <View>
        <Text className="font-bold text-xl mb-2">Exams</Text>
        {exam}
      </View>
      <View className="absolute bottom-24 right-5 flex-row items-center space-x-2">
        <Text>Add Exams</Text>
        <TouchableOpacity
          className=" items-center rounded-full border justify-center  w-10 h-10 "
          onPress={() => addComponent({ data, type: "assignments" })}
        >
          <Icon name="add" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View className="absolute bottom-10 right-5 flex-row items-center space-x-2">
        <Text>Add Assignments</Text>
        <TouchableOpacity
          className=" items-center rounded-full border justify-center  w-10 h-10"
          onPress={() => addComponent({ data, type: "exams" })}
        >
          <Icon name="add" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Display;
