import {
  View,
  Text,
  Button,
  Dimensions,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
} from "react-native";
import React, { act, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import database from "../tempDatabase";
import TaskComponent from "./TaskComponent";
import { add, set } from "date-fns";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { addTasks, loadTasks } from "../firebaseConfig";
import { onSnapshot } from "firebase/firestore";

const Tasks = ({ navigation }) => {
  const [active, setActive] = useState("Ongoing");
  const [ongoing, setOngoing] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [activeModal, setActiveModal] = useState(false);

  const [open, setOpen] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [relatedCourse, setRelatedCourse] = useState("None");

  const [tasks, setTasks] = useState([]);
  // const [tasks, setTasks] = useState(database.users[0].tasks);
  // const tasks = database.users[0].tasks;
  const courses = database.users[0].schedules[0].courses;

  const checkField = () => {
    if (taskName === "" || taskDescription === "") {
      Alert.alert("Empty Fields", "Please fill all the fields");
      return;
    }
    const task = {
      name: taskName,
      description: taskDescription,
      date: dueDate,
      course: relatedCourse,
      completed: false,
    };
    addTasks({ task: task });
  };

  const loadData = () => {
    console.log(tasks);
    let a = [];
    let b = [];
    tasks.map((e, i) => {
      if (e.completed) {
        a.push(e);
      } else {
        b.push(e);
      }
    });

    setOngoing(b);
    setCompleted(a);
  };

  const isCompleted = (data) => {
    console.log(data);
  };

  useEffect(() => {
    loadTasks(setTasks);
  }, []);

  useEffect(() => {
    loadData();
  }, [tasks]);

  return (
    <SafeAreaView className="flex-1 p-2">
      <Modal
        animationType="fade"
        visible={activeModal}
        transparent={true}
        onRequestClose={() => setActiveModal(false)}
      >
        <View className="flex-1 justify-center items-center">
          <View className="bg-gray-500 w-5/6 rounded-xl p-2">
            <Icon
              name="close"
              size={20}
              style={{ alignSelf: "flex-end" }}
              onPress={() => setActiveModal(false)}
            />
            <View className="p-2 space-y-2">
              <View className="h-10">
                <TextInput
                  className="bg-gray-100 flex-1 rounded-lg px-2 pr-2"
                  maxLength={30}
                  placeholder="Task Name"
                  value={taskName}
                  onChangeText={(value) => setTaskName(value)}
                />
              </View>

              <View className="h-10">
                <TextInput
                  className="bg-gray-100 flex-1 rounded-lg px-2 pr-2"
                  maxLength={30}
                  placeholder="Task Description"
                  value={taskDescription}
                  onChangeText={(value) => setTaskDescription(value)}
                />
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="font-semibold text-base">Course</Text>
                <View className="w-2/4">
                  <Picker
                    selectedValue={relatedCourse}
                    onValueChange={(itemValue, itemIndex) =>
                      setRelatedCourse(itemValue)
                    }
                    mode="dropdown"
                  >
                    <Picker.Item label="None" value="None" />
                    {courses.map((e, i) => {
                      const val = e.code;
                      return <Picker.Item label={val} value={val} key={i} />;
                    })}
                  </Picker>
                </View>
              </View>

              <View className="flex-row items-center justify-around">
                <TouchableOpacity
                  onPress={() => {
                    setOpen(true);
                    // console.log(open);
                  }}
                  className="bg-gray-200 w-20 rounded-md h-8 justify-center"
                >
                  <Text className="text-center">Date</Text>
                </TouchableOpacity>
                <Text className="font-semibold text-base">
                  Due Date: {dueDate.toDateString()}
                </Text>
              </View>

              {open && (
                <RNDateTimePicker
                  value={dueDate}
                  display="spinner"
                  mode="date"
                  minimumDate={new Date()}
                  onChange={(e, selectedDate) => {
                    if (e.type === "dismissed") {
                      setOpen(false);
                    } else if (e.type === "set") {
                      setOpen(false);
                      setDueDate(selectedDate);
                    }
                  }}
                />
              )}
              <TouchableOpacity
                onPress={() => checkField()}
                className="bg-gray-200 w-20 rounded-md h-8 justify-center self-center"
              >
                <Text className="text-center">Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View className="flex-row mb-2 items-center">
        <Icon
          name="chevron-left"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text className="text-3xl font-bold flex-auto justify-center text-center pr-7">
          Tasks
        </Text>
      </View>

      <View className="flex-row justify-evenly h-12 items-center px-10 rounded-lg">
        <TouchableOpacity
          className={`${
            active === "Ongoing" ? "bg-gray-200 border border-gray-100" : ""
          } py-2 px-10 rounded-xl`}
          onPress={() => setActive("Ongoing")}
        >
          <Text className="font-semibold text-base">Ongoing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`${
            active === "Completed" ? "bg-gray-200 border border-gray-100" : ""
          } py-2 px-10 rounded-xl`}
          onPress={() => setActive("Completed")}
        >
          <Text className="font-semibold text-base">Completed</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 mt-2">
        <FlatList
          data={active === "Ongoing" ? ongoing : completed}
          renderItem={({ item }) => (
            <View>
              <TaskComponent item={item} isCompleted={isCompleted} />
            </View>
          )}
        />
      </View>
      {active === "Ongoing" && (
        <TouchableOpacity
          className="justify-center items-center"
          onPress={() => setActiveModal(true)}
        >
          <Icon name="add-box" size={50} style={{ color: "#6b7280" }} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default Tasks;
