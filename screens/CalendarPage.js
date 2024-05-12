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

const CalendarPage = () => {
  // const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const tasks = database.users[0].tasks;
  const d = new Date();

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
    const week_dates = week.map((e) => changeFormat(new Date(e)));
    const other = tasks.filter((task) => week_dates.includes(task.dueDate));
    for (let i = 0; i < other.length; i++) {
      let eventDetails = {
        date: other[i].dueDate,
        name: other[i].name,
        description: other[i].description,
        course: other[i].course,
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

  return (
    <SafeAreaView className="flex-1 p-2">
      <Text className="text-center text-3xl font-bold mb-1">Calendar</Text>
      <View className="flex-row justify-between mb-2">
        <TouchableOpacity
          onPress={() => {
            const temp = getPrevWeek(currentWeek);
            setCurrentWeek(temp);
            setEvents(loadData(temp));
          }}
          className=" py-2 px-4 bg-gray-200 rounded-e-md"
        >
          <Text className="text-lg font-bold">Prev</Text>
        </TouchableOpacity>

        <Text className="text-center text-xl font-bold">
          {format(currentWeek[0], "MMM")}
        </Text>

        <TouchableOpacity
          onPress={() => {
            const temp = getNextWeek(currentWeek);
            setCurrentWeek(temp);
            setEvents(loadData(temp));
          }}
          className=" py-2 px-4 bg-gray-200 rounded-e-md"
        >
          <Text className="text-lg font-bold">Next</Text>
        </TouchableOpacity>
      </View>

      <View className=" justify-between px-1 flex-row">
        {currentWeek.map((date, key) => {
          const t = new Date(date);
          return (
            <TouchableOpacity
              onPress={() => {
                setActiveDay(t);
                setEvents(loadData([t]));
              }}
              key={key}
              className={`w-10 py-1 rounded-lg ${
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
      </View>

      <View className="flex-1 mt-2 rounded-lg">
        <View className="flex-1 p-2">
          <ScrollView showsVerticalScrollIndicator={false}>
            {currentWeek.map((e, i) => {
              const a = events[changeFormat(e)];
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
                      a.map((item, key) => {
                        return <TaskComponent item={item} key={key} />;
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
