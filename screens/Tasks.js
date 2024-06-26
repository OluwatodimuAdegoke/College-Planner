import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { loadData } from "../firebaseConfig";
import { AddEvent } from "../modals";
import { Menu } from "react-native-paper";
import { COLORS, ItemComponent } from "../components";
import { SheetManager } from "react-native-actions-sheet";

const Tasks = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  //For the menu
  const [visible, setVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await loadData({ setData: setTasks, type: "tasks", completed: false });
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView className={` ${COLORS.mainColor} flex-1 p-2`}>
      <View className="flex-row mb-2 items-center justify-between">
        <Icon
          name="chevron-left"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text className="text-3xl font-bold justify-center text-center ">
          Tasks - To Do
        </Text>

        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <Icon onPress={() => setVisible(true)} name="more-vert" size={25} />
          }
          anchorPosition="bottom"
        >
          <Menu.Item
            onPress={() => {
              navigation.navigate("CompletedTasks");
              setVisible(false);
            }}
            title="Completed"
          />
        </Menu>
      </View>

      {isLoading && (
        <ActivityIndicator
          size="large"
          className="justify-center items-center flex-1"
        />
      )}
      {!isLoading && (
        <View className="flex-1 mt-2">
          <FlatList
            data={tasks}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View className="rounded-lg mb-2 p-2 bg-gray-400 ">
                <ItemComponent item={item} type="tasks" edit={true} />
              </View>
            )}
          />
        </View>
      )}

      <TouchableOpacity
        className="justify-center items-center"
        onPress={() => {
          SheetManager.show("AddEvent", {
            payload: {
              type: "tasks",
            },
          });
        }}
      >
        <Icon name="add-box" size={50} style={{ color: "#6b7280" }} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Tasks;
