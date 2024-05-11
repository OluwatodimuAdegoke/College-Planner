import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import {
  startOfWeek,
  endOfWeek,
  addDays,
  subDays,
  format,
  isToday,
} from 'date-fns';

const WeekSlider = () => {
  const [currentWeek, setCurrentWeek] = useState(getWeekDays(new Date()));

  const handleNextWeek = () => {
    setCurrentWeek(getNextWeek(currentWeek));
  };

  const handlePreviousWeek = () => {
    setCurrentWeek(getPreviousWeek(currentWeek));
  };

  const renderDayItem = ({ item }) => (
    <View className="px-2">
      <Text
        className={`text-center text-lg font-bold ${
          isToday(item.date) ? 'text-blue-500' : 'text-gray-800'
        }`}
      >
        {item.date.getDate()}
      </Text>
      <Text className="text-center text-gray-500">{format(item.date, 'EEE')}</Text>
    </View>
  );

  return (
    <View className="flex-1 items-center">
      <View className="flex-row justify-between w-full px-4 mb-4">
        <TouchableOpacity
          onPress={handlePreviousWeek}
          className="py-2 px-4 bg-gray-200 rounded-md"
        >
          <Text className="text-lg font-bold">Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNextWeek}
          className="py-2 px-4 bg-gray-200 rounded-md"
        >
          <Text className="text-lg font-bold">Next</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={currentWeek}
        renderItem={renderDayItem}
        keyExtractor={(item) => item.date.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </View>
  );
};

const getWeekDays = (date) => {
  const weekStart = startOfWeek(date, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(date, { weekStartsOn: 0 });
  const weekDays = [];

  for (let day = weekStart; day <= weekEnd; day = addDays(day, 1)) {
    weekDays.push({ date: new Date(day) });
  }

  return weekDays;
};

const getNextWeek = (currentWeek) => {
  const nextWeekStart = addDays(currentWeek[currentWeek.length - 1].date, 1);
  return getWeekDays(nextWeekStart);
};

const getPreviousWeek = (currentWeek) => {
  const prevWeekStart = subDays(currentWeek[0].date, 1);
  return getWeekDays(prevWeekStart);
};

export default WeekSlider;