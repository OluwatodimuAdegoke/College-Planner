import { View, Text, Button, Dimensions, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import database from "../tempDatabase";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import {
  addDays,
  eachDayOfInterval,
  endOfWeek,
  format,
  startOfWeek,
  subDays,
} from "date-fns";
import TaskComponent from "./TaskComponent";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useIsFocused } from "@react-navigation/native";

const CalendarPage = ({ navigation }) => {
  // const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const tasks = database.users[0].tasks;
  const assignments = database.users[0].assignments;

  const changeFormat = (da) => {
    return (
      da.getFullYear() +
      "-" +
      ("0" + (da.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + da.getDate()).slice(-2)
    );
  };

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

  const loadData = (week) => {
    let items = {};
    const week_dates = week.map((e) => new Date(e).toDateString());
    //Assignment
    const other1 = assignments.filter((task) => week_dates.includes(task.date));

    //Tasks
    const other2 = tasks.filter((task) => week_dates.includes(task.date));
    //Concatenating the two for assignments and tasks
    const other = other1.concat(other2);
    for (let i = 0; i < other.length; i++) {
      let eventDetails = {
        date: other[i].date,
        name: other[i].name,
        description: other[i].description,
        course: other[i].course,
        type: other[i].id,
      };
      if (!items[eventDetails.date]) {
        items[eventDetails.date] = [];
      }
      items[eventDetails.date].push(eventDetails);
    }
    return items;
  };

  const [currentWeek, setCurrentWeek] = useState(getWeekDays(new Date()));
  const [activeDay, setActiveDay] = useState(null);
  const [events, setEvents] = useState(loadData(currentWeek));
  //TODO: Work on making the calendar go back to its current week after changing the navigation
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
            setEvents(loadData(temp));
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
                setEvents(loadData([t]));
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
            setEvents(loadData(temp));
          }}
        >
          <Icon name="chevron-right" size={30} />
        </TouchableOpacity>
      </View>

      <View className="flex-1 mt-2 rounded-lg">
        <View className="flex-1 p-2">
          <ScrollView showsVerticalScrollIndicator={false}>
            {currentWeek.map((e, i) => {
              const a = events[e.toDateString()];
              return (
                <View key={i} className="flex-row flex-1">
                  {/* TODO: Work on Dates */}
                  <View className="pr-4">
                    {a && (
                      <Text className="text-xl font-bold">
                        {format(new Date(a[0].date), "dd")}
                      </Text>
                    )}
                  </View>
                  <View className="flex-1">
                    {a &&
                      a.map((item, i) => {
                        return <TaskComponent item={item} key={i} />;
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
