import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Button,
  Alert,
  Modal,
} from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { addData, updateData } from "../firebaseConfig";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const EditEvent = ({ payload }) => {
  type = payload?.type;
  course = payload?.course;
  item = payload?.item;
  const [data, setData] = useState(item);

  const [date, setDate] = useState(item.date.toDate());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [startTime, setStartTime] = useState(
    item.startTime ? item.startTime.toDate() : new Date()
  );
  const [endTime, setEndTime] = useState(
    item.endTime ? item.endTime.toDate() : new Date()
  );
  const [timeType, setTimeType] = useState("start");
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const [daysPressed, setDaysPressed] = useState(
    item.days
      ? days.map((e) => {
          return item.days.includes(e);
        })
      : [false, false, false, false, false]
  );

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    setDate(selectedDate);
    handleChange("date", selectedDate);
  };

  const handeTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (timeType === "start") setStartTime(selectedTime);
    else setEndTime(selectedTime);
  };

  const handleChange = (name, value) => {
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    if (type === "tasks" && data.name && data.description) {
      const localData = {
        name: data.name,
        description: data.description,
        date: date,
        completed: false,
      };
      updateData({ id: data.id, value: localData, type: "tasks" });
      SheetManager.hide("EditEvent");
    } else if (
      type === "courses" &&
      data.name &&
      data.code &&
      data.location &&
      data.section
    ) {
      const daysChosen = days.filter((e, i) => daysPressed[i]);
      if (daysChosen.length === 0) {
        Alert.alert("Empty Fields", "Please chose a least a day");
        return;
      }
      const localData = {
        name: data.name,
        code: data.code,
        location: data.location,
        section: data.section,
        date: date,
        startTime: startTime,
        endTime: endTime,
        image: "null",
        days: daysChosen,
      };
      updateData({ id: data.id, value: localData, type: "courses" });
      SheetManager.hide("EditEvent");
    } else if (type === "assignments" && data.name && data.description) {
      const localData = {
        name: data.name,
        description: data.description,
        date: date,
        completed: false,
      };
      updateData({ id: data.id, value: localData, type: "assignments" });
      SheetManager.hide("EditEvent");
    } else if (type === "exams" && data.name && data.location) {
      const localData = {
        name: data.name,
        location: data.location,
        date: date,
        startTime: startTime,
        endTime: endTime,
      };
      updateData({ id: data.id, value: localData, type: "exams" });
      SheetManager.hide("EditEvent");
    } else if (type === "studySessions" && data.name && data.duration) {
      const localData = {
        name: data.name,
        date: date,
        duration: data.duration,
      };
      updateData({ id: data.id, value: localData, type: "studySessions" });
      SheetManager.hide("EditEvent");
    } else {
      Alert.alert("Empty Fields", "Please fill all the fields");
    }
  };

  const actionSheetRef = useRef();
  const insets = useSafeAreaInsets();
  return (
    <ActionSheet ref={actionSheetRef} safeAreaInsets={insets}>
      <View className="p-4">
        <Text className="mb-4 text-center">Edit World!</Text>

        {type === "tasks" && (
          <View className={styles.form}>
            <TextInput
              className={styles.textInput}
              placeholder="Task Name"
              value={data.name}
              maxLength={30}
              onChangeText={(value) => handleChange("name", value)}
            />
            <TextInput
              className={styles.textDescription}
              placeholder="Task Description"
              value={data.description}
              multiline
              numberOfLines={5}
              editable
              onChangeText={(value) => handleChange("description", value)}
            />
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <TextInput
                className={styles.textInput}
                placeholder="Select Date"
                value={date.toDateString()}
                editable={false}
              />
            </TouchableOpacity>

            {/* Add more fields as needed */}
          </View>
        )}
        {type === "courses" && (
          <View className={styles.form}>
            <View className={styles.formRow}>
              <TextInput
                className={`${styles.textInput} flex-1`}
                maxLength={30}
                value={data.name}
                placeholder="Course Name"
                onChangeText={(value) => handleChange("name", value)}
              />
              <TextInput
                className={styles.textInput}
                maxLength={5}
                value={data.code}
                placeholder="Course Code"
                onChangeText={(value) => handleChange("code", value)}
              />
            </View>
            <View className={styles.formRow}>
              <TextInput
                className={`${styles.textInput} flex-1`}
                maxLength={30}
                value={data.location}
                placeholder="Location"
                onChangeText={(value) => handleChange("location", value)}
              />
              <TextInput
                className={styles.textInput}
                maxLength={3}
                value={data.section}
                placeholder="Section"
                onChangeText={(value) => handleChange("section", value)}
              />
            </View>
            <View className="flex-row justify-between">
              {days.map((e, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    className={`px-4 py-2 rounded-md ${
                      daysPressed[i] ? "bg-blue-200" : "bg-gray-200 "
                    }`}
                    onPress={() => {
                      daysPressed[i] = !daysPressed[i];
                      setDaysPressed([...daysPressed]);
                    }}
                  >
                    <Text>{e.slice(0, 3)}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View className={styles.formRow}>
              <Text className="w-16">Start Time: </Text>
              <TouchableOpacity
                className="flex-1"
                onPress={() => {
                  setTimeType("start");
                  setShowTimePicker(true);
                }}
              >
                <TextInput
                  className={styles.textInput}
                  placeholder="Select Start Time"
                  value={startTime.toLocaleTimeString()}
                  editable={false}
                />
              </TouchableOpacity>
            </View>
            <View className={styles.formRow}>
              <Text className="w-16">End Time: </Text>
              <TouchableOpacity
                className="flex-1"
                onPress={() => {
                  setTimeType("end");
                  setShowTimePicker(true);
                }}
              >
                <TextInput
                  className={styles.textInput}
                  placeholder="Select End Time"
                  value={endTime.toLocaleTimeString()}
                  editable={false}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        {type === "exams" && (
          <View className={styles.form}>
            <TextInput
              className={styles.textInput}
              placeholder="Exam Name"
              value={data.name}
              maxLength={10}
              onChangeText={(value) => handleChange("name", value)}
            />
            <TextInput
              className={styles.textInput}
              placeholder="Location"
              value={data.location}
              maxLength={30}
              onChangeText={(value) => handleChange("location", value)}
            />
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <TextInput
                className={styles.textInput}
                placeholder="Select Date"
                value={date.toDateString()}
                editable={false}
              />
            </TouchableOpacity>
            <View className={styles.formRow}>
              <Text className="w-16">Start Time: </Text>
              <TouchableOpacity
                className="flex-1"
                onPress={() => {
                  setTimeType("start");
                  setShowTimePicker(true);
                }}
              >
                <TextInput
                  className={styles.textInput}
                  placeholder="Select Start Time"
                  value={startTime.toLocaleTimeString()}
                  editable={false}
                />
              </TouchableOpacity>
            </View>
            <View className={styles.formRow}>
              <Text className="w-16">End Time: </Text>
              <TouchableOpacity
                className="flex-1"
                onPress={() => {
                  setTimeType("end");
                  setShowTimePicker(true);
                }}
              >
                <TextInput
                  className={styles.textInput}
                  placeholder="Select End Time"
                  value={endTime.toLocaleTimeString()}
                  editable={false}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        {type === "assignments" && (
          <View className={styles.form}>
            <TextInput
              className={styles.textInput}
              placeholder="Assignment Name"
              maxLength={30}
              value={data.name}
              onChangeText={(value) => handleChange("name", value)}
            />
            <TextInput
              className={styles.textDescription}
              placeholder="Assignment Description"
              multiline
              numberOfLines={5}
              value={data.description}
              editable
              onChangeText={(value) => handleChange("description", value)}
            />
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <TextInput
                className={styles.textInput}
                placeholder="Select Date"
                value={date.toDateString()}
                editable={false}
              />
            </TouchableOpacity>
          </View>
        )}
        {type === "studySessions" && (
          <View className={styles.form}>
            <TextInput
              className={styles.textInput}
              placeholder="Session Name"
              maxLength={30}
              value={data.name}
              onChangeText={(value) => handleChange("name", value)}
            />
            <TextInput
              className={styles.textInput}
              placeholder="Duration"
              value={String(data.duration)}
              keyboardType="number-pad"
              maxLength={3}
              onChangeText={(value) => handleChange("duration", value)}
            />

            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <TextInput
                className={styles.textInput}
                placeholder="Select Date"
                value={date.toDateString()}
                editable={false}
              />
            </TouchableOpacity>
          </View>
        )}

        {/* Add more cases as needed */}

        {/* Time and Date Modal */}
        {showDatePicker && (
          <RNDateTimePicker
            value={date}
            mode="date"
            display="default"
            minimumDate={new Date()}
            onChange={handleDateChange}
          />
        )}
        {showTimePicker && (
          <RNDateTimePicker
            value={timeType === "start" ? startTime : endTime}
            mode="time"
            display="default"
            onChange={handeTimeChange}
          />
        )}
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-gray-400 rounded-lg h-10 w-32 justify-center self-center mt-2"
        >
          <Text className="self-center font-semibold text-xl">Submit</Text>
        </TouchableOpacity>
      </View>
    </ActionSheet>
  );
};

const styles = {
  form: "space-y-2 mb-2",
  formRow: "flex-row justify-between space-x-2 items-center",
  textInput: "bg-gray-100 rounded-md px-2 pr-2 h-10",
  textDescription: "bg-gray-100 rounded-md px-2 pr-2 h-20",
};

export default EditEvent;
