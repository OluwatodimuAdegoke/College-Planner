import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import database from "../tempDatabase";
import Icon from "react-native-vector-icons/MaterialIcons";

const HomePage = () => {
  const userName = database.users[0].name;
  const profilePicture = database.users[0].profilePicture;

  const checkStatus = (status) => {
    if (status["completed"] == false) {
      return true;
    }
    return false;
  };

  const changeFormat = (da) => {
    return (
      da.getFullYear() +
      "-" +
      ("0" + (da.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + da.getDate()).slice(-2)
    );
  };

  // const tasks = database.users[0].tasks;
  const incomplete_tasks = database.users[0].tasks.filter(checkStatus);
  // Only shows the tasks that are due today
  const today_tasks = incomplete_tasks.filter(
    (e, index) =>
      new Date(e.dueDate).toDateString() === new Date().toDateString()
  );

  const study_sessions = database.users[0].studySessions;
  const assignments = database.users[0].assignments[0];
  const schedules = database.users[0].schedules;
  const courses = schedules[0].courses;

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
              className="p-2 rounded-md bg-gray-400  w-36 justify-around items-start"
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
    tasks = today_tasks.map((item) => {
      return (
        <TouchableOpacity
          key={item.id}
          className="flex-row mb-2 p-2 rounded-md bg-gray-400 justify-between"
        >
          <View className="flex-row items-center">
            <Icon name="add-task" size={20} />
            <View className="pl-2">
              <Text className="font-semibold">{item.name.slice(0, 30)}...</Text>
              <Text>{item.description.slice(0, 30)}...</Text>
            </View>
          </View>
          <View className="pl-2 ">
            <Text className="font-semibold">Date: {item.dueDate}</Text>
            <Text>In Progress</Text>
          </View>
        </TouchableOpacity>
      );
    });
  } else {
    tasks = <Text>No Upcoming Tasks...</Text>;
  }

  if (assignments !== null) {
    ass = (
      <TouchableOpacity className=" p-2 rounded-md bg-gray-400">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="font-bold text-base">
              {assignments.name} : {assignments.course}
            </Text>
            <Text className="text-base w-11/12" numberOfLines={1}>
              {assignments.description}
            </Text>
          </View>
          <View className="">
            <Text>Due Date: </Text>
            <Text>{assignments.dueDate}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  } else {
    ass = <Text>No Upcoming Assignments...</Text>;
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
              <Text className="font-bold text-xl text-center">
                {item.course.toUpperCase()}
              </Text>
              <View className="flex-row items-center justify-between">
                <Icon name="schedule" size={20} />
                <Text className="text-base">{item.duration} minutes</Text>
              </View>
              <Text numberOfLines={3} className="w-24">
                {item.notes}
              </Text>
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

      {/* TODO: Schedule Tab*/}
      <View className=" rounded-md h-40">
        <Text className="font-bold text-xl mb-2">Schedule</Text>
        {schedule}
      </View>

      {/* TODO: My Tasks*/}
      <View className=" rounded-md max-h-50">
        <Text className="font-bold text-xl mb-2">To do Today</Text>
        {/* <View> */}
        {tasks}
        {/* </View> */}
      </View>

      {/* TODO: Study Sessions*/}
      <View className=" rounded-md h-36 mb-2">
        <Text className="font-bold text-xl mb-2">Study Sessions</Text>
        {study}
      </View>

      {/* TODO: Assignments*/}
      <View className=" rounded-md mb-2">
        <Text className="font-bold text-xl mb-2">Assignment</Text>
        {ass}
      </View>
    </View>
  );
};

export default HomePage;
