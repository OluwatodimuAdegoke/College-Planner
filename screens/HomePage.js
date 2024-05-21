import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import database from "../tempDatabase";
import Icon from "react-native-vector-icons/MaterialIcons";

const HomePage = () => {
  const userName = database.users[0].name;

  const checkStatus = (status) => {
    if (status["completed"] == false) {
      return true;
    }
    return false;
  };

  // const tasks = database.users[0].tasks;
  const incomplete_tasks = database.users[0].tasks.filter(checkStatus);
  // Only shows the tasks that are due today
  const today_tasks = incomplete_tasks.filter((e, index) => {
    return e.date == new Date().toDateString();
  });

  const loadData = () => {
    // LoadData: Here
  };

  const [profilePicture, setProfilePicture] = useState(
    database.users[0].profilePicture
  );
  const [study_sessions, setStudySessions] = useState(
    database.users[0].studySessions
  );
  const [assignments, setAssignments] = useState(database.users[0].assignments);
  const [schedules, setSchedules] = useState(database.users[0].schedules);
  //TODO: Make it so that I can change the current term here
  const [courses, setCourses] = useState(schedules[0].courses);
  const [exams, setExams] = useState(database.users[0].exams);
  const [activeUpcoming, setActiveUpcoming] = useState("assignments");

  if (courses !== null) {
    schedule = (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 10,
        }}
      >
        {courses.slice(0, 3).map((item) => {
          return (
            <TouchableOpacity
              key={item.id}
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
                <Text className="font-normal">: {item.startTime}</Text>
              </Text>
              <Text className="font-bold text-base text-center">
                End Time:
                <Text className="font-normal">: {item.endTime}</Text>
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  } else {
    schedule = <Text>No Upcoming Schedule...</Text>;
  }

  if (today_tasks.length > 0) {
    tasks = (
      <ScrollView>
        {today_tasks.map((item) => {
          return (
            <TouchableOpacity
              key={item.id}
              className="flex-row mb-2 p-2 rounded-md bg-gray-400 justify-between"
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
                <Text className="font-semibold">Date: {item.date}</Text>
                <Text>In Progress</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  } else {
    tasks = <Text>No Upcoming Tasks...</Text>;
  }

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
                  <Text>{item.date}</Text>
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
                    Date: <Text className="font-normal">{item.date}</Text>
                  </Text>
                  <Text
                    className="text-bold font-semibold w-11/12"
                    numberOfLines={1}
                  >
                    Time:{" "}
                    <Text className="font-normal">
                      {item.startTime} - {item.endTime}
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

  if (study_sessions !== null) {
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
            >
              <Text className="font-bold text-lg text-center">
                {item.course.toUpperCase()}
              </Text>
              <View className="flex-row items-center">
                <Text className="font-semibold text-base">Time: </Text>
                <Text className="text-base">{item.duration} minutes</Text>
              </View>
              <View className="flex-row items-start">
                <Text className="font-semibold text-base">Notes: </Text>
                <Text className="text-base w-36" numberOfLines={3}>
                  {item.notes}
                </Text>
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
          <Text className="font-bold text-xl mb-2">Schedule</Text>
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
