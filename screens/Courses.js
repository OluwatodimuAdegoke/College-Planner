import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ScrollView } from "react-native-gesture-handler";
import { deleteCourse, getUserDetail, loadData } from "../firebaseConfig";
import { COLORS, ItemComponent } from "../components";
import { SheetManager } from "react-native-actions-sheet";

const Courses = ({ navigation }) => {
  const [courses, setCourses] = useState([]);
  const [term, setTerm] = useState("");

  const deleteComponent = ({ item }) => {
    deleteCourse({ id: item.id });
  };

  const editComponent = ({ type, item }) => {
    // setModalType("Edit");
    // setCurrentItem(item);
    // if (type === "courses") {
    //   setActiveModal(true);
    // }
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      getUserDetail({ type: "currentTerm", setValue: setTerm });
      loadData({ setData: setCourses, type: "courses", completed: false });
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView className={` ${COLORS.mainColor} flex-1 p-2`}>
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
              <View
                key={index}
                className="space-y-1 bg-gray-400 p-2 rounded-lg"
              >
                {/* <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("DisplayCourse", { data: course })
                  }
                  className="bg-gray-400 rounded-lg p-2  justify-between"
                > */}
                <ItemComponent item={course} type="courses" edit={true} />
                {/* <View className="flex-row items-center justify-end">
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
                        deleteComponent({ item: course, type: "courses" })
                      }
                    />
                  </View>
                </TouchableOpacity> */}
              </View>
            );
          })}
        </ScrollView>
      )}

      <TouchableOpacity
        className="justify-center items-center "
        onPress={() => {
          SheetManager.show("AddEvent", {
            payload: {
              type: "courses",
            },
          });
        }}
      >
        <Icon name="add-box" size={50} style={{ color: "#6b7280" }} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Courses;
