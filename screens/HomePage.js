import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { getUserDetail, queryTask } from "../firebaseConfig";
import Swiper from "react-native-swiper";
import { differenceInDays } from "date-fns";
import { COLORS, ItemComponent } from "../components";
import { ProfilePic } from "../assets";

const HomePage = ({ navigation }) => {
  const [userName, setUserName] = useState("");

  const [profilePicture, setProfilePicture] = useState("");

  const [taskToday, setTaskToday] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [exams, setExams] = useState([]);
  const [courses, setCourses] = useState([]);
  const [study_sessions, setStudySessions] = useState([]);

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
              <View
                key={item.id}
                className={`${COLORS.secondaryColor} p-2 rounded-md`}
              >
                <ItemComponent item={item} type="courses" edit={false} />
              </View>
            );
          })}
        </Swiper>
      </View>
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
            <View
              key={item.id}
              className={`${COLORS.secondaryColor} p-2 rounded-md`}
            >
              <ItemComponent item={item} type="tasks" edit={false} />
            </View>
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
            <View
              className={`${COLORS.secondaryColor} p-2 rounded-md`}
              key={item.id}
            >
              <ItemComponent item={item} type="assignments" edit={false} />
            </View>
          );
        })}
        {exams.map((item) => {
          return (
            <View
              className={`${COLORS.secondaryColor} p-2 rounded-md`}
              key={item.id}
            >
              <ItemComponent item={item} type="exams" edit={false} />
            </View>
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
              <ItemComponent item={item} type="studySessions" edit={false} />
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
          {profilePicture === "null" ? (
            <ProfilePic />
          ) : (
            <Image
              className="flex-1 justify-center self-center w-10 object-fill rounded-md"
              source={{ uri: profilePicture }}
            />
          )}
        </View>
      </View>

      {/* Body */}
      <View className="flex-1 rounded-lg space-y-4 ">
        {/* TODO: Schedule Tab*/}
        <View className=" rounded-md">
          <View className="flex-row justify-between">
            <Text className="font-bold text-xl mb-2">Today's Schedule</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Courses")}>
              <Text className="text-blue-500">See all courses </Text>
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

        <View className=" rounded-md max-h-48">
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
