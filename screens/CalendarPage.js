import { View, Text, ActivityIndicator } from "react-native";
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
import { getUserDetail, loadData } from "../firebaseConfig";
import { ItemComponent, COLORS } from "../components";
import { SheetManager } from "react-native-actions-sheet";

const CalendarPage = ({ navigation }) => {
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
        date: other[i].date,
        name: other[i].name,
        description: other[i].description,
        completed: other[i].completed,
        type: "tasks",
        id: other[i].id,
      };
      if (!items[eventDetails.date.toDate().toDateString()]) {
        items[eventDetails.date.toDate().toDateString()] = [];
      }
      items[eventDetails.date.toDate().toDateString()].push(eventDetails);
    }

    //Assignments
    const other1 = assignments.filter((assignment) =>
      week_dates.includes(assignment.date.toDate().toDateString())
    );

    for (let i = 0; i < other1.length; i++) {
      let eventDetails = {
        date: other1[i].date,
        name: other1[i].name,
        description: other1[i].description,
        completed: other1[i].completed,
        course: other1[i].course,
        type: "assignments",
        id: other1[i].id,
      };
      if (!items[eventDetails.date.toDate().toDateString()]) {
        items[eventDetails.date.toDate().toDateString()] = [];
      }
      items[eventDetails.date.toDate().toDateString()].push(eventDetails);
    }

    //Exams
    const other2 = exams.filter((exam) =>
      week_dates.includes(exam.date.toDate().toDateString())
    );

    for (let i = 0; i < other2.length; i++) {
      let eventDetails = {
        date: other2[i].date,
        name: other2[i].name,
        location: other2[i].location,
        startTime: other2[i].startTime,
        endTime: other2[i].endTime,
        course: other2[i].course,
        type: "exams",
        id: other2[i].id,
      };
      if (!items[eventDetails.date.toDate().toDateString()]) {
        items[eventDetails.date.toDate().toDateString()] = [];
      }
      items[eventDetails.date.toDate().toDateString()].push(eventDetails);
    }

    setEvents(items);
    // return items;
  };

  //TODO: Work on making the calendar go back to its current week after changing the navigation

  const [currentTerm, setCurrentTerm] = useState(null);

  useEffect(() => {
    loadLocalData(currentWeek);
    // console.log("Also, Here", currentTerm);
  }, [assignments, exams, tasks, currentTerm]);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await loadData({
        setData: setAssignments,
        type: "assignments",
        completed: false,
      });
      await loadData({ setData: setExams, type: "exams", completed: false });
      await loadData({ setData: setTasks, type: "tasks", completed: false });
      setIsLoading(false);
    };
    fetchData();
  }, [currentTerm]);

  useEffect(() => {
    getUserDetail({ setValue: setCurrentTerm, type: "currentTerm" });
  }, []);

  return (
    <SafeAreaView className={` ${COLORS.mainColor} flex-1 p-2`}>
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
          }}
        >
          <Icon name="chevron-right" size={30} />
        </TouchableOpacity>
      </View>

      {isLoading && (
        <ActivityIndicator
          size="large"
          className="justify-center items-center flex-1"
        />
      )}

      {!isLoading && (
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
                          {format(new Date(a[0].date.toDate()), "dd")}
                        </Text>
                      )}
                    </View>
                    <View className="flex-1">
                      {a &&
                        a.map((item, i) => {
                          return (
                            <View
                              className="rounded-lg mb-2 p-2 bg-gray-400 h-18"
                              key={i}
                            >
                              <View className="">
                                <ItemComponent
                                  item={item}
                                  type={item.type}
                                  edit={true}
                                />
                              </View>
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
      )}
      <View className="absolute bottom-5 items-center justify-center w-full">
        <TouchableOpacity
          className=" items-center rounded-full border justify-center w-10 h-10 "
          onPress={() =>
            SheetManager.show("AddEvent", {
              payload: {
                type: "tasks",
              },
            })
          }
        >
          <Icon name="add" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CalendarPage;
