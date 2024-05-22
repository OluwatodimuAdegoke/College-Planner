import { View, Text, Button, Dimensions, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import {
  addDays,
  eachDayOfInterval,
  endOfWeek,
  format,
  startOfWeek,
  subDays,
} from "date-fns";
import Icon from "react-native-vector-icons/MaterialIcons";
import { loadData } from "../firebaseConfig";

const CalendarPage = ({ navigation }) => {
  // const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  // const tasks = database.users[0].tasks;
  // const assignments = database.users[0].assignments;

  const [assignments, setAssignments] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [exams, setExams] = useState([]);

  const getWeekDays = (date) => {
    const dates = eachDayOfInterval(
      {
        start: startOfWeek(date, { weekStartsOn: 0 }),
        end: endOfWeek(date, { weekStartsOn: 0 }),
      },
      {
        weekStartsOn: 0,
      }
    );
    return dates;
  };

  const getNextWeek = (cWeek) => {
    const nextWeekStart = addDays(cWeek[cWeek.length - 1], 1);
    setActiveDay(null);
    return getWeekDays(nextWeekStart);
  };

  const getPrevWeek = (cWeek) => {
    const prevWeekEnd = subDays(cWeek[0], 1);
    setActiveDay(null);
    return getWeekDays(prevWeekEnd);
  };

  const [currentWeek, setCurrentWeek] = useState(getWeekDays(new Date()));
  const [activeDay, setActiveDay] = useState(null);
  const [events, setEvents] = useState({});

  const loadLocalData = (week) => {
    let items = {};

    const week_dates = week.map((e) => new Date(e).toDateString());
    //Tasks
    const other = tasks.filter((task) =>
      week_dates.includes(task.date.toDate().toDateString())
    );

    for (let i = 0; i < other.length; i++) {
      let eventDetails = {
        date: other[i].date.toDate().toDateString(),
        name: other[i].name,
        description: other[i].description,
        completed: other[i].completed,
        type: "task",
      };
      if (!items[eventDetails.date]) {
        items[eventDetails.date] = [];
      }
      items[eventDetails.date].push(eventDetails);
    }

    //Assignments
    const other1 = assignments.filter((assignment) =>
      week_dates.includes(assignment.date.toDate().toDateString())
    );

    for (let i = 0; i < other1.length; i++) {
      let eventDetails = {
        date: other1[i].date.toDate().toDateString(),
        name: other1[i].name,
        description: other1[i].description,
        completed: other1[i].completed,
        course: other1[i].course,
        type: "assignment",
      };
      if (!items[eventDetails.date]) {
        items[eventDetails.date] = [];
      }
      items[eventDetails.date].push(eventDetails);
    }

    //Exams
    const other2 = exams.filter((exam) =>
      week_dates.includes(exam.date.toDate().toDateString())
    );

    for (let i = 0; i < other2.length; i++) {
      let eventDetails = {
        date: other2[i].date.toDate().toDateString(),
        name: other2[i].name,
        location: other2[i].location,
        startTime: other2[i].startTime.toDate(),
        endTime: other2[i].endTime.toDate(),
        course: other2[i].course,
        type: "exam",
      };
      if (!items[eventDetails.date]) {
        items[eventDetails.date] = [];
      }
      items[eventDetails.date].push(eventDetails);
    }

    setEvents(items);
    // return items;
  };

  //TODO: Work on making the calendar go back to its current week after changing the navigation

  useEffect(() => {
    loadLocalData(currentWeek);
  }, [assignments, exams, tasks]);

  useEffect(() => {
    loadData({ setData: setAssignments, type: "assignments" });
    loadData({ setData: setExams, type: "exams" });
    loadData({ setData: setTasks, type: "tasks" });
  }, []);

  return (
    <SafeAreaView className="flex-1 p-2">
      <View className="flex-row items-start justify-center mb-2">
        <Text className="text-4xl font-bold ">Calendar, </Text>
        <Text className="text-base font-bold">
          {format(currentWeek[0], "MMM, yyyy")}
        </Text>
      </View>

      <View className=" justify-between flex-row items-center">
        <TouchableOpacity
          onPress={() => {
            const temp = getPrevWeek(currentWeek);
            setCurrentWeek(temp);
            loadLocalData(temp);
            // setEvents(loadLocalData(temp));
          }}
        >
          <Icon name="chevron-left" size={30} />
        </TouchableOpacity>
        {currentWeek.map((date, key) => {
          const t = new Date(date);
          return (
            <TouchableOpacity
              onPress={() => {
                setActiveDay(t);
                loadLocalData([t]);
                // setEvents(loadLocalData([t]));
              }}
              key={key}
              className={`w-9 py-1 rounded-lg ${
                activeDay && activeDay.toISOString() === t.toISOString()
                  ? "bg-gray-400"
                  : "bg-gray-200"
              }`}
            >
              <Text className="text-center text-lg font-bold ">
                {t.getDate()}
              </Text>
              <Text className="text-center text-gray-500">
                {format(t, "EEE")}
              </Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          onPress={() => {
            const temp = getNextWeek(currentWeek);
            setCurrentWeek(temp);
            loadLocalData(temp);
            // setEvents(loadLocalData(temp));
          }}
        >
          <Icon name="chevron-right" size={30} />
        </TouchableOpacity>
      </View>

      <View className="flex-1 rounded-lg">
        <View className="flex-1 p-2">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 5 }}
          >
            {currentWeek.map((e, i) => {
              const a = events[e.toDateString()];
              return (
                <View key={i} className="flex-row flex-1">
                  <View className="pr-2">
                    {a && (
                      <Text className="text-xl font-bold">
                        {format(new Date(a[0].date), "dd")}
                      </Text>
                    )}
                  </View>
                  <View className="flex-1">
                    {a &&
                      a.map((item, i) => {
                        return (
                          <View
                            className="rounded-lg mb-2 p-2 bg-gray-300 h-18"
                            key={i}
                          >
                            <TouchableOpacity className=" ">
                              <View className="flex-row">
                                <Text className="text-center font-bold text-sm flex-auto">
                                  {item.name}
                                </Text>
                                {item.completed && (
                                  <Icon
                                    name="check-circle"
                                    size={15}
                                    color={"green"}
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
                                    {new Date(item.date).toDateString()}
                                  </Text>
                                </Text>
                                <Text className="font-semibold">
                                  Type:{" "}
                                  <Text className="font-normal">
                                    {item.type}
                                  </Text>
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CalendarPage;
