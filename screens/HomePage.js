import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getUserDetail, queryTask, updateData } from "../firebaseConfig";
import ShowDetails from "../components/ShowDetails";
// import { ActivityIndicator } from "react-native-paper";
import Swiper from "react-native-swiper";
import COLORS from "../components/COLORS";
import { differenceInDays } from "date-fns";
import { da } from "date-fns/locale";
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

  const [currentTerm, setCurrentTerm] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getUserDetail({ setValue: setUserName, type: "username" });
      await getUserDetail({
        setValue: setProfilePicture,
        type: "profile_picture",
      });
      await queryTask({ setData: setTaskToday, type: "tasks" });
      await queryTask({ setData: setExams, type: "exams" });
      await queryTask({ setData: setAssignments, type: "assignments" });
      await queryTask({ setData: setCourses, type: "courses" });
      await queryTask({ setData: setStudySessions, type: "studySessions" });
      setIsLoading(false);
    };
    fetchData();
  }, [currentTerm]);

  // console.log(currentTerm);
  useEffect(() => {
    getUserDetail({ setValue: setCurrentTerm, type: "currentTerm" });
  }, []);

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        className="justify-center items-center flex-1"
      />
    );
  }

  if (courses.length > 0) {
    schedule = (
      <View className="h-24">
        <Swiper showsPagination={false}>
          {courses.map((item) => {
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  navigation.navigate("DisplayCourse", { data: item })
                }
                className={`${COLORS.secondaryColor} p-2 rounded-md justify-around items-start`}
              >
                <View className="flex-row space-x-2">
                  <View className="rounded-lg w-20 h-20 bg-red-400"></View>
                  <View className="justify-center">
                    <Text className="font-bold text-lg" numberOfLines={1}>
                      {item.code}
                      <Text className="font-normal">: {item.name}</Text>
                    </Text>
                    <Text className="font-normal">{item.location}</Text>
                    <Text className="font-normal">
                      {item.startTime.toDate().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -{" "}
                      {item.endTime.toDate().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </Swiper>
      </View>
    );
  } else {
    schedule = <Text>No Upcoming Schedule...</Text>;
  }
  const completeTask = (item) => {
    updateData({
      id: item.id,
      type: "tasks",
      value: { completed: !item.completed },
    });
    setShowModal(false);
  };
  //  This function is running *inline
  const showDate = (date) => {
    const diffDays = differenceInDays(
      date.toDate(),
      new Date(
        Date.UTC(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          12
        )
      )
    );
    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Tomorrow";
    } else {
      return diffDays + " days";
    }
  };

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
              className={`${COLORS.secondaryColor} p-2 rounded-md justify-between flex-row`}
              onPress={() => {
                setCurrentItem(item);
                setShowModalType("tasks");
                setShowModal(true);
              }}
            >
              <View className="flex-row items-center">
                {item.completed === true ? (
                  <Icon
                    name="check-box"
                    size={20}
                    onPress={() => completeTask(item)}
                  />
                ) : (
                  <Icon
                    name="check-box-outline-blank"
                    size={20}
                    onPress={() => completeTask(item)}
                  />
                )}

                <View className="pl-2">
                  <Text className="font-semibold">
                    {item.name.slice(0, 30)}
                  </Text>
                  <Text>{item.description.slice(0, 40)}</Text>
                </View>
              </View>
              <View className=" ">
                <Text className="font-semibold">{showDate(item.date)}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  } else {
    tasks = <Text>No Upcoming Tasks...</Text>;
  }

  if (assignments.length > 0 || exams.length > 0) {
    assExam = (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
      >
        {assignments.map((item) => {
          return (
            <TouchableOpacity
              className={`${COLORS.secondaryColor} p-2 rounded-md`}
              key={item.id}
              onPress={() => {
                setCurrentItem(item);
                setShowModalType("assignments");
                setShowModal(true);
              }}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center space-x-2">
                  <View className="rounded-md h-8 w-8  bg-gray-300 items-center justify-center">
                    <Icon name="event" size={25} />
                  </View>

                  <View>
                    <Text className="font-bold text-base">
                      Assignment - {item.course}
                    </Text>
                    <Text className="text-base w-11/12" numberOfLines={1}>
                      {item.name} - {item.description}
                    </Text>
                  </View>
                </View>
                <Text className="font-semibold">{showDate(item.date)}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
        {exams.map((item) => {
          return (
            <TouchableOpacity
              className={`${COLORS.secondaryColor} p-2 rounded-md`}
              key={item.id}
              onPress={() => {
                setCurrentItem(item);
                setShowModalType("exams");
                setShowModal(true);
              }}
            >
              <View className="flex-row items-center  space-x-2">
                <View className="rounded-md h-8 w-8  bg-gray-300 items-center justify-center">
                  <Icon name="event" size={25} />
                </View>
                <View>
                  <Text className="font-semibold text-base">
                    Exam - {item.course}
                  </Text>
                  <Text
                    className="text-bold font-semibold w-11/12"
                    numberOfLines={1}
                  >
                    Location:{" "}
                    <Text className="font-normal">{item.location}</Text>
                  </Text>
                  <Text className="text-bold  " numberOfLines={1}>
                    {item.date.toDate().toLocaleDateString([], {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                    {", "}
                    {item.startTime.toDate().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {item.endTime.toDate().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  } else {
    assExam = <Text>No Upcoming Assignments/Exams...</Text>;
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
              className={`${COLORS.secondaryColor} p-2 rounded-md  items-center justify-center`}
              onPress={() => navigation.navigate("StudyPage", { item: item })}
            >
              <View className="flex-row items-center justify-center space-x-2 ">
                <View className="rounded-md h-8 w-8  bg-gray-300 items-center justify-center">
                  <Icon name="book" size={25} />
                </View>
                <View>
                  <Text className="font-bold text-base">
                    {item.name.toUpperCase()}
                  </Text>

                  <Text className="">{item.duration} minutes</Text>
                </View>
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
    <View className={`flex-1 justify-between  ${COLORS.mainColor}`}>
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
          <Text className="text-black font-normal text-l">
            {" "}
            {currentTerm} ,Good Morning
          </Text>
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
      <View className="flex-1 rounded-lg space-y-4 ">
        {/* TODO: Schedule Tab*/}
        <View className=" rounded-md">
          <View className="flex-row justify-between">
            <Text className="font-bold text-xl mb-2">Today's Schedule</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Schedules")}>
              <Text className="text-blue-500">See all schedules </Text>
            </TouchableOpacity>
          </View>
          {schedule}
        </View>

        {/* TODO: My Tasks*/}
        <View className=" rounded-md max-h-48">
          <View className="flex-row justify-between">
            <Text className="font-bold text-xl mb-2">To Do</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Tasks")}>
              <Text className="text-blue-500">See all tasks </Text>
            </TouchableOpacity>
          </View>

          {tasks}
        </View>

        <View className=" rounded-md max-h-40">
          <Text className="font-bold text-xl mb-2">Upcoming</Text>
          {assExam}
        </View>

        {/* TODO: Study Sessions*/}
        <View className=" rounded-md  mb-2 ">
          <View className="flex-row justify-between">
            <Text className="font-bold text-xl mb-2">Study Sessions</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Sessions")}>
              <Text className="text-blue-500">See all sessions </Text>
            </TouchableOpacity>
          </View>

          {study}
        </View>
      </View>
    </View>
  );
};

export default HomePage;
