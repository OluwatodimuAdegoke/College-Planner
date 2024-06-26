import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  deleteData,
  getCourseImages,
  getUserDetail,
  loadCourse,
  loadData,
  loadByParent,
  loadImages,
  updateData,
} from "../firebaseConfig";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Menu } from "react-native-paper";
import ItemComponent from "./ItemComponent";
import { SheetManager } from "react-native-actions-sheet";

const Display = ({ route, navigation }) => {
  const { data } = route.params;

  const [course, setCourse] = useState(data);
  const [assignments, setAssignments] = useState([]);
  const [exams, setExams] = useState([]);

  //For the menu
  const [visible, setVisible] = useState(false);

  //For the image modal
  const [images, setImages] = useState([]);
  const [imageModal, setImageModal] = useState(false);

  const handleOpenModal = (type) => {
    SheetManager.show("AddEvent", {
      payload: {
        type: type,
        course: course,
      },
    });
  };

  const changeCourseImage = ({ url }) => {
    updateData({ id: course.id, type: "courses", value: { image: url } });
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadCourse({ setData: setCourse, courseId: course.id });
      await loadByParent({
        setData: setAssignments,
        type: "assignments",
        parentId: course.id,
        completed: false,
      });
      await loadByParent({
        setData: setExams,
        type: "exams",
        parentId: course.id,
        completed: false,
      });
      await getCourseImages({ setValue: setImages });
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView className="p-4 flex-1 space-y-2">
      <Modal
        visible={imageModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setImageModal(false)}
      >
        <View className="flex-1 justify-center items-center">
          <View className="bg-gray-500 rounded-xl p-2 max-h-56">
            <FlatList
              data={images}
              numColumns={4}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index}
              contentContainerStyle={{ gap: 5, padding: 2 }}
              columnWrapperStyle={{ gap: 5 }}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    className="rounded-lg bg-gray-100 w-16 h-16"
                    key={index}
                    onPress={() => {
                      changeCourseImage({ url: item });
                      setImageModal(false);
                    }}
                  >
                    <Image
                      source={{ uri: item }}
                      alt="Image"
                      className="flex-1 justify-center self-center w-full object-fill rounded-md"
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </Modal>

      <View className="p-2 rounded-md bg-gray-400  justify-between items-start flex-row">
        <ItemComponent item={course} type="courses" edit={true} />
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
              navigation.navigate("CompletedCourseDetails", { data: course });
              setVisible(false);
            }}
            title="Completed Work"
          />
          <Menu.Item
            onPress={async () => {
              setImageModal(true);
              setVisible(false);
            }}
            title="Change Image"
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

      <View className="absolute bottom-24 right-5 flex-row items-center space-x-2">
        <Text>Add Exams</Text>
        <TouchableOpacity
          className=" items-center rounded-full border justify-center  w-10 h-10 "
          onPress={() => handleOpenModal("exams")}
        >
          <Icon name="add" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View className="absolute bottom-10 right-5 flex-row items-center space-x-2">
        <Text>Add Assignments</Text>
        <TouchableOpacity
          className=" items-center rounded-full border justify-center  w-10 h-10"
          onPress={() => handleOpenModal("assignments")}
        >
          <Icon name="add" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Display;
