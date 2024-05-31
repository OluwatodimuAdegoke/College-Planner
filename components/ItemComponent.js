import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { deleteParent, deleteData, updateData } from "../firebaseConfig";
import { differenceInDays, formatDistanceToNow, startOfDay } from "date-fns";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { SheetManager } from "react-native-actions-sheet";
import { CourseDefault } from "../assets";

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
    if (type === "courses" || type === "studySessions") {
      deleteParent({ id: id, type: type });
    } else {
      deleteData({ id: id, type: type });
    }
  };
  //  This function is running *inline
  const showDate = (date) => {
    const diffDays = differenceInDays(
      startOfDay(date.toDate()),
      startOfDay(new Date())
    );
    if (diffDays < 0) {
      return "Overdue";
    } else if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Tomorrow";
    } else {
      return formatDistanceToNow(startOfDay(date.toDate()));
    }
  };

  if (type === "courses") {
    return (
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <TouchableOpacity
            onPress={() => navigation.navigate("DisplayCourse", { data: item })}
            className="flex-row items-center space-x-2  flex-auto "
          >
            <View className="rounded-lg w-20 h-20 bg-gray-200">
              {item.image === "null" ? (
                <CourseDefault className="h-14 w-14 self-center flex-1" />
              ) : (
                <Image
                  className="flex-1 justify-center self-center w-full object-fill rounded-md"
                  source={{
                    uri: item.image,
                  }}
                />
              )}
            </View>

            <View className="flex-1">
              <View className="flex-row justify-between">
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
                <View className="flex-row items-center space-x-2 bg-gray-500 rounded-md p-1.5 justify-center">
                  <Text className="font-normal text-center" numberOfLines={2}>
                    {item.days.map((e, i) => {
                      return e + "  ";
                    })}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View className="self-end">
          {edit && (
            <View className="">
              <Icon
                name="tune"
                size={24}
                onPress={() =>
                  SheetManager.show("EditEvent", {
                    payload: {
                      type: "courses",
                      item: item,
                    },
                  })
                }
              />
              <Icon
                name="delete"
                size={25}
                onPress={() =>
                  deleteComponent({ id: item.id, type: "courses" })
                }
              />
            </View>
          )}
        </View>
      </View>
    );
  } else if (type === "exams") {
    return (
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <TouchableOpacity
            onPress={() => {
              SheetManager.show("EditEvent", {
                payload: {
                  type: "exams",
                  item: item,
                },
              });
            }}
            className="flex-row items-center space-x-2  flex-auto"
          >
            <View className="flex-row items-center space-x-2">
              <View className="rounded-md h-8 w-8  bg-gray-300 items-center justify-center">
                <Icon name="library-books" size={25} />
              </View>
              <View>
                <Text className="font-semibold text-base">
                  Exam - {item.course}
                </Text>
                <Text
                  className="text-bold font-semibold w-11/12"
                  numberOfLines={1}
                >
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
          </TouchableOpacity>
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
      </View>
    );
  } else if (type === "tasks") {
    return (
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <TouchableOpacity
            className="flex-row items-center space-x-2  flex-auto "
            onPress={() => {
              SheetManager.show("EditEvent", {
                payload: {
                  type: "tasks",
                  item: item,
                },
              });
            }}
          >
            <View className="flex-row items-center">
              <View className="rounded-md h-8 w-8  bg-gray-300 items-center justify-center">
                <Icon name="splitscreen" size={25} />
              </View>

              <View className="flex-row items-center">
                <View className="pl-2">
                  <Text className="font-semibold">
                    {item.name.slice(0, 30)}
                  </Text>
                  <Text>{item.description.slice(0, 40)}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
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
              <View className="self-end flex-row">
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
    );
  } else if (type === "assignments") {
    return (
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <TouchableOpacity
            className="flex-row items-center space-x-2  flex-auto"
            onPress={() => {
              SheetManager.show("EditEvent", {
                payload: {
                  type: "assignments",
                  item: item,
                },
              });
            }}
          >
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
          </TouchableOpacity>
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
      </View>
    );
  } else if (type === "studySessions") {
    const hour = Math.floor(item.duration / 60);
    const minute = item.duration % 60;
    return (
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <TouchableOpacity
            onPress={() => navigation.navigate("StudyPage", { item: item })}
          >
            <View className="flex-row items-center space-x-2 ">
              <View className="rounded-md h-8 w-8  bg-gray-300 items-center justify-center">
                <Icon name="chevron-right" size={25} />
              </View>
              <View>
                <Text className="font-bold text-base">
                  {item.name.toUpperCase()}
                </Text>
                <Text className="">
                  {hour > 0 ? `${hour}h` : ""} {minute}m
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          {edit && (
            <View className="self-end flex-row">
              <Icon
                name="tune"
                size={24}
                onPress={() =>
                  SheetManager.show("EditEvent", {
                    payload: {
                      type: "studySessions",
                      item: item,
                    },
                  })
                }
              />
              <Icon
                name="delete"
                size={25}
                onPress={() =>
                  deleteComponent({ id: item.id, type: "studySessions" })
                }
              />
            </View>
          )}
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
