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
import ItemComponent from "./ItemComponent";
const Display = ({ route, navigation }) => {
  const { data } = route.params;

  const [modalType, setModalType] = useState("Add");
  const [currentItem, setCurrentItem] = useState(null);

  const [activeModalE, setActiveModalE] = useState(false);
  const [activeModalA, setActiveModalA] = useState(false);

  const [assignments, setAssignments] = useState([]);
  const [exams, setExams] = useState([]);

  const [visible, setVisible] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showModalType, setShowModalType] = useState("");

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

  useEffect(() => {
    loadForCourse({
      setData: setAssignments,
      type: "assignments",
      courseId: data.id,
      completed: false,
    });
    loadForCourse({
      setData: setExams,
      type: "exams",
      courseId: data.id,
      completed: false,
    });
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

      {showModal && (
        <ShowDetails
          editComponent={editComponent}
          setShowModal={setShowModal}
          type={showModalType}
          item={currentItem}
        />
      )}
      {/* <Icon name="chevron-left" size={30} onPress={() => navigation.goBack()} /> */}
      <View className="p-2 rounded-md bg-gray-400  justify-between items-start flex-row">
        <ItemComponent item={data} type="courses" edit={true} />
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <Icon onPress={() => setVisible(true)} name="more-vert" size={25} />
          }
          anchorPosition="bottom"
        >
          <Menu.Item
            onPress={() => {
              navigation.navigate("CompletedCourseDetails", { data: data });
              setVisible(false);
            }}
            title="Completed Work"
          />
        </Menu>
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
