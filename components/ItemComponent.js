import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  deleteData,
  getUserDetail,
  loadImages,
  queryTask,
  updateData,
} from "../firebaseConfig";
import { differenceInDays } from "date-fns";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AddTask, ShowDetails } from "../modals";
import { useNavigation } from "@react-navigation/native";

const ItemComponent = ({ item, type, edit }) => {
  const navigation = useNavigation();
  const completeTask = ({ item, type }) => {
    updateData({
      id: item.id,
      type: type,
      value: { completed: !item.completed },
    });
  };

  const deleteComponent = ({ id, type }) => {
    deleteData({ id: id, type: type });
  };
  //  This function is running *inline
  const showDate = (date) => {
    const diffDays = differenceInDays(
      date.toDate(),
      new Date(
        Date.UTC(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          12
        )
      )
    );
    if (diffDays < 0) {
      return "Overdue";
    } else if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Tomorrow";
    } else {
      return diffDays + " days";
    }
  };

  const [activeModal, setActiveModal] = useState(false);
  const [activeModalType, setActiveModalType] = useState("tasks");
  const [modalType, setModalType] = useState("Add");
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const editComponent = (item) => {
    setModalType("Edit");
    setCurrentItem(item);
    setActiveModal(true);
  };

  if (type === "courses") {
    return (
      <View>
        <View className="flex-row space-x-2 ">
          <View className="rounded-lg w-20 h-20 bg-gray-100">
            <Image
              className="flex-1 justify-center self-center w-full object-fill rounded-md"
              source={{
                uri: item.image,
              }}
            />
          </View>
          <View className="justify-center">
            <View className="flex-row justify-between ">
              <Text className="font-bold text-lg" numberOfLines={1}>
                {item.code}
                <Text className="font-normal">: {item.name}</Text>
              </Text>

              <Text className="">{item.section}</Text>
            </View>
            <Text className="font-normal">{item.location}</Text>
            <Text className="font-normal">
              {item.startTime.toDate().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              -{" "}
              {item.endTime.toDate().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
            {edit && (
              <View className="flex-row items-center space-x-2 bg-gray-500 rounded-md p-1 ">
                {item.days.map((e, i) => {
                  return (
                    <Text key={i} className="font-normal">
                      {e}
                    </Text>
                  );
                })}
              </View>
            )}
          </View>
        </View>
      </View>
    );
  } else if (type === "exams") {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ExamComponent", { data: item });
        }}
        className="flex-row items-center space-x-2 justify-between"
      >
        <View className="flex-row items-center space-x-2">
          <View className="rounded-md h-8 w-8  bg-gray-300 items-center justify-center">
            <Icon name="library-books" size={25} />
          </View>
          <View>
            <Text className="font-semibold text-base">
              Exam - {item.course}
            </Text>
            <Text className="text-bold font-semibold w-11/12" numberOfLines={1}>
              Location: <Text className="font-normal">{item.location}</Text>
            </Text>
            <Text className="text-bold  " numberOfLines={1}>
              {item.date.toDate().toLocaleDateString([], {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
              {", "}
              {item.startTime.toDate().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              -{" "}
              {item.endTime.toDate().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
        </View>
        <View className="">
          {edit && (
            <View className="self-end">
              <Icon
                name="delete"
                size={25}
                onPress={() => deleteComponent({ id: item.id, type: "exams" })}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  } else if (type === "tasks") {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("TaskComponent", { data: item });
        }}
      >
        <View className={`rounded-md justify-between flex-row`}>
          <View className="flex-row items-center">
            <View className="rounded-md h-8 w-8  bg-gray-300 items-center justify-center">
              <Icon name="splitscreen" size={25} />
            </View>
            <View className="flex-row items-center">
              <View className="pl-2">
                <Text className="font-semibold">{item.name.slice(0, 30)}</Text>
                <Text>{item.description.slice(0, 40)}</Text>
              </View>
            </View>
          </View>
          <View className=" ">
            <Text className="font-semibold">{showDate(item.date)}</Text>
            <View className="flex-row items-center self-end space-x-2">
              {item.completed === true ? (
                <Icon
                  name="check-box"
                  size={20}
                  onPress={() => completeTask({ item: item, type: "tasks" })}
                />
              ) : (
                <Icon
                  name="check-box-outline-blank"
                  size={20}
                  onPress={() => completeTask({ item: item, type: "tasks" })}
                />
              )}
              {edit && (
                <View className="self-end">
                  <Icon
                    name="delete"
                    size={25}
                    onPress={() =>
                      deleteComponent({ id: item.id, type: "tasks" })
                    }
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  } else if (type === "assignments") {
    return (
      <TouchableOpacity
        className="flex-row items-center justify-between"
        onPress={() => {
          navigation.navigate("AssignmentComponent", { data: item });
        }}
      >
        <View className="flex-row items-center space-x-2">
          <View className="rounded-md h-8 w-8  bg-gray-300 items-center justify-center">
            <Icon name="event" size={25} />
          </View>

          <View>
            <Text className="font-bold text-base">
              Assignment - {item.course}
            </Text>
            <Text className="text-base w-11/12" numberOfLines={1}>
              {item.name} - {item.description}
            </Text>
          </View>
        </View>
        <View>
          <Text className="font-semibold">{showDate(item.date)}</Text>
          <View className="flex-row justify-center items-center space-x-2">
            {item.completed === true ? (
              <Icon
                name="check-box"
                size={20}
                onPress={() =>
                  completeTask({ item: item, type: "assignments" })
                }
              />
            ) : (
              <Icon
                name="check-box-outline-blank"
                size={20}
                onPress={() =>
                  completeTask({ item: item, type: "assignments" })
                }
              />
            )}
            {edit && (
              <View className="self-end">
                <Icon
                  name="delete"
                  size={25}
                  onPress={() =>
                    deleteComponent({ id: item.id, type: "assignments" })
                  }
                />
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  } else if (type === "studySessions") {
    return (
      <View className="flex-row items-center justify-center space-x-2 ">
        <View className="rounded-md h-8 w-8  bg-gray-300 items-center justify-center">
          <Icon name="book" size={25} />
        </View>
        <View>
          <Text className="font-bold text-base">{item.name.toUpperCase()}</Text>

          <Text className="">{item.duration} minutes</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <Text>{item.name}</Text>
      </View>
    );
  }
};

export default ItemComponent;
