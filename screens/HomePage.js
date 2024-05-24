import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getUserDetail, queryTask } from "../firebaseConfig";
import ShowDetails from "../components/ShowDetails";

const HomePage = ({ navigation }) => {
  const [userName, setUserName] = useState("");

  const [profilePicture, setProfilePicture] = useState("");

  const [activeUpcoming, setActiveUpcoming] = useState("assignments");

  const [taskToday, setTaskToday] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [exams, setExams] = useState([]);
  const [courses, setCourses] = useState([]);
  const [study_sessions, setStudySessions] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showModalType, setShowModalType] = useState("");
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    getUserDetail({ setValue: setUserName, type: "username" });
    getUserDetail({ setValue: setProfilePicture, type: "profile_picture" });
    queryTask({ setData: setTaskToday, type: "tasks" });
    queryTask({ setData: setExams, type: "exams" });
    queryTask({ setData: setAssignments, type: "assignments" });
    queryTask({ setData: setCourses, type: "courses" });
    queryTask({ setData: setStudySessions, type: "studySessions" });
  }, []);

  if (courses.length > 0) {
    schedule = (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 10,
        }}
      >
        {courses.map((item) => {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                navigation.navigate("DisplayCourse", { data: item })
              }
              className="p-2 rounded-md bg-gray-400  justify-around items-start"
            >
              <Text className="font-bold text-lg text-center" numberOfLines={1}>
                {item.code}
                <Text className="font-normal">: {item.name}</Text>
              </Text>

              <Text className="font-bold text-base text-center">
                Location:
                <Text className="font-normal">: {item.location}</Text>
              </Text>
              <Text className="font-bold text-base text-center">
                Start Time:
                <Text className="font-normal">
                  : {item.startTime.toDate().toTimeString()}
                </Text>
              </Text>
              <Text className="font-bold text-base text-center">
                End Time:
                <Text className="font-normal">
                  : {item.endTime.toDate().toTimeString()}
                </Text>
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  } else {
    schedule = <Text>No Upcoming Schedule...</Text>;
  }

  if (taskToday.length > 0) {
    tasks = (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
      >
        {taskToday.map((item) => {
          return (
            <TouchableOpacity
              key={item.id}
              className="flex-row p-2 rounded-md bg-gray-400 justify-between"
              onPress={() => {
                setCurrentItem(item);
                setShowModalType("tasks");
                setShowModal(true);
              }}
            >
              <View className="flex-row items-center">
                <Icon name="add-task" size={20} />
                <View className="pl-2">
                  <Text className="font-semibold">
                    {item.name.slice(0, 30)}...
                  </Text>
                  <Text>{item.description.slice(0, 30)}...</Text>
                </View>
              </View>
              <View className="pl-2 ">
                <Text className="font-semibold">
                  Date: {item.date.toDate().toDateString()}
                </Text>
                <Text>Due Today</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  } else {
    tasks = <Text>No Upcoming Tasks...</Text>;
  }

  if (assignments.length > 0) {
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
              onPress={() => {
                setCurrentItem(item);
                setShowModalType("assignments");
                setShowModal(true);
              }}
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
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  } else {
    ass = <Text>No Upcoming Assignments...</Text>;
  }

  if (exams.length > 0) {
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
              onPress={() => {
                setCurrentItem(item);
                setShowModalType("exams");
                setShowModal(true);
              }}
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
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  } else {
    exam = <Text>No Upcoming Assignments...</Text>;
  }

  if (study_sessions.length > 0) {
    study = (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={{
          gap: 10,
        }}
      >
        {study_sessions.map((item) => {
          return (
            <TouchableOpacity
              key={item.id}
              className="flex p-2 rounded-md bg-gray-400"
              onPress={() => navigation.navigate("StudyPage", { item: item })}
            >
              <Text className="font-bold text-lg text-center">
                {item.name.toUpperCase()}
              </Text>
              <View className="flex-row items-center">
                <Text className="font-semibold text-base">Time: </Text>
                <Text className="text-base">{item.duration} minutes</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  } else {
    study = <Text>No Upcoming Study Sessions...</Text>;
  }

  return (
    <View className="flex-1 justify-between p-2">
      {/* Header */}
      {showModal && (
        <ShowDetails
          editComponent={null}
          setShowModal={setShowModal}
          type={showModalType}
          item={currentItem}
        />
      )}
      <View className="justify-between pt-2 flex-row items-center">
        <View>
          <Text className="text-black font-normal text-l">Good Morning</Text>
          <Text className="text-black font-bold text-xl">
            Hello, {userName}
          </Text>
        </View>

        <View className="h-10 w-10">
          <Image
            className="flex-1 justify-center self-center w-10 object-fill rounded-full border-"
            source={profilePicture}
          />
        </View>
      </View>

      {/* Body */}
      <View className="flex-1 justify-between rounded-lg">
        {/* TODO: Schedule Tab*/}
        <View className=" rounded-md h-36">
          <Text className="font-bold text-xl mb-2">Today's Schedule</Text>
          {schedule}
        </View>

        {/* TODO: My Tasks*/}
        <View className=" rounded-md max-h-48">
          <Text className="font-bold text-xl mb-2">To do Today</Text>
          {/* <View> */}
          {tasks}
          {/* </View> */}
        </View>

        {/* TODO: Upcoming Assignments/ Exams*/}
        <View className=" rounded-md max-h-48">
          <Text className="font-bold text-xl mb-2">Upcoming</Text>
          <View className="flex-row justify-evenly mb-2">
            <TouchableOpacity
              className={`${
                activeUpcoming == "assignments" ? "bg-gray-400" : "bg-gray-200"
              } p-1 rounded-md px-2`}
              onPress={() => setActiveUpcoming("assignments")}
            >
              <Text className="font-semibold text-base">Assignments</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`${
                activeUpcoming == "exams" ? "bg-gray-400" : "bg-gray-200"
              } p-1 rounded-md px-2`}
              onPress={() => setActiveUpcoming("exams")}
            >
              <Text className="font-semibold text-base">Exams</Text>
            </TouchableOpacity>
          </View>
          {activeUpcoming == "assignments" && ass}
          {activeUpcoming == "exams" && exam}
        </View>

        {/* TODO: Study Sessions*/}
        <View className=" rounded-md h-32 mb-2">
          <Text className="font-bold text-xl mb-2">Study Sessions</Text>
          {study}
        </View>
      </View>
    </View>
  );
};

export default HomePage;
