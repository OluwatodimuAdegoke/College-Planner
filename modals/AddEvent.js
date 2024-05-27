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
import { addData } from "../firebaseConfig";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";

const AddEvent = ({ payload }) => {
  type = payload?.type;
  course = payload?.course;
  const [data, setData] = useState({});

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [timeType, setTimeType] = useState("start");
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const [daysPressed, setDaysPressed] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    setDate(selectedDate);
    handleChange("date", selectedDate);
  };

  const handeTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (timeType === "start") setStartTime(selectedTime);
    else setEndTime(selectedTime);
    // setEndTime(selectedTime);
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
      addData({ value: localData, type: "tasks" });
      SheetManager.hide("AddEvent");
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
      addData({ value: localData, type: "courses" });
      SheetManager.hide("AddEvent");
    } else if (type === "assignments" && data.name && data.description) {
      const localData = {
        name: data.name,
        description: data.description,
        date: date,
        course: course.code,
        completed: false,
        courseId: course.id,
      };
      addData({ value: localData, type: "assignments" });
      SheetManager.hide("AddEvent");
    } else if (type === "exams" && data.name && data.location) {
      const localData = {
        name: data.name,
        location: data.location,
        date: date,
        startTime: startTime,
        endTime: endTime,
        course: course.code,
        courseId: course.id,
      };
      addData({ value: localData, type: "exams" });
      SheetManager.hide("AddEvent");
    } else if (type === "studySessions" && data.name && data.duration) {
      const localData = {
        name: data.name,
        date: date,
        duration: data.duration,
      };
      addData({ value: localData, type: "studySessions" });
      SheetManager.hide("AddEvent");
    } else {
      Alert.alert("Empty Fields", "Please fill all the fields");
    }
  };

  const actionSheetRef = useRef();

  return (
    // <View className="flex-1 items-center justify-center mt-6  ">
    //   <Button
    //     title="Open Action Sheet"
    //     onPress={() => actionSheetRef.current?.show()}
    //   />
    //   <Modal
    //     animationType="slide"
    //     transparent={true}
    //     visible={true}
    //     onRequestClose={() => {
    //       setModalVisible(false);
    //     }}
    //   >
    //     <TouchableOpacity
    //       className="flex-1 items-center justify-center"
    //       activeOpacity={1}
    //       onPress={() => setModalVisible(false)}
    //     >
    //       <TouchableOpacity
    //         activeOpacity={1}
    //         className="bg-white rounded-xl p-5 shadow-md absolute bottom-0 w-full"
    //       >
    <ActionSheet ref={actionSheetRef}>
      <Text className="mb-4 text-center">Hello World!</Text>

      {type === "tasks" && (
        <View className={styles.form}>
          <TextInput
            className={styles.textInput}
            placeholder="Task Name"
            maxLength={30}
            onChangeText={(value) => handleChange("name", value)}
          />
          <TextInput
            className={styles.textDescription}
            placeholder="Task Description"
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
              placeholder="Course Name"
              onChangeText={(value) => handleChange("name", value)}
            />
            <TextInput
              className={styles.textInput}
              maxLength={5}
              placeholder="Course Code"
              onChangeText={(value) => handleChange("code", value)}
            />
          </View>
          <View className={styles.formRow}>
            <TextInput
              className={`${styles.textInput} flex-1`}
              maxLength={30}
              placeholder="Location"
              onChangeText={(value) => handleChange("location", value)}
            />
            <TextInput
              className={styles.textInput}
              maxLength={3}
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
            maxLength={10}
            onChangeText={(value) => handleChange("name", value)}
          />
          <TextInput
            className={styles.textInput}
            placeholder="Location"
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
            onChangeText={(value) => handleChange("name", value)}
          />
          <TextInput
            className={styles.textDescription}
            placeholder="Assignment Description"
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
        </View>
      )}
      {type === "studySessions" && (
        <View className={styles.form}>
          <TextInput
            className={styles.textInput}
            placeholder="Session Name"
            maxLength={30}
            onChangeText={(value) => handleChange("name", value)}
          />
          <TextInput
            className={styles.textInput}
            placeholder="Duration"
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
      <Button title="Submit" onPress={handleSubmit} />
      {/* </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
        </View>
        </View> */}
    </ActionSheet>
  );
};

const styles = {
  form: "space-y-2 mb-2",
  formRow: "flex-row justify-between space-x-2 items-center",
  textInput: "bg-gray-100 rounded-md px-2 pr-2 h-10",
  textDescription: "bg-gray-100 rounded-md px-2 pr-2 h-20",
};

export default AddEvent;
