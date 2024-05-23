import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { addData, deleteData, loadData, updateData } from "../firebaseConfig";
import AddTask from "../components/AddTask";
import { Button, Menu } from "react-native-paper";
import ShowTask from "../components/ShowTask";

const Tasks = ({ navigation }) => {
  const [active, setActive] = useState("Ongoing");
  const [ongoing, setOngoing] = useState([]);
  // const [completed, setCompleted] = useState([]);

  const [activeModal, setActiveModal] = useState(false);
  const [modalType, setModalType] = useState("Add");
  // Using this
  const [currentItem, setCurrentItem] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [tasks, setTasks] = useState([]);

  const [visible, setVisible] = useState(false);

  const separateData = () => {
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
    // setCompleted(a);
  };

  const completeTask = (item) => {
    updateData({
      id: item.id,
      type: "tasks",
      value: { completed: !item.completed },
    });
    // console.log(item);
  };

  const deleteComponent = (id) => {
    deleteData({ id: id, type: "tasks" });
    // loadData({ setData: setTasks, type: "tasks" });
  };
  const editComponent = (item) => {
    setModalType("Edit");
    setCurrentItem(item);
    setActiveModal(true);
  };

  const addComponent = () => {
    setModalType("Add");
    setCurrentItem(null);
    setActiveModal(true);
  };

  useEffect(() => {
    loadData({ setData: setTasks, type: "tasks" });
  }, []);

  useEffect(() => {
    separateData();
  }, [tasks]);

  return (
    <SafeAreaView className="flex-1 p-2">
      {/* {modal} */}
      {activeModal && (
        <AddTask
          setActiveModal={setActiveModal}
          type={modalType}
          item={currentItem}
        />
      )}
      {showModal && (
        <ShowTask
          editComponent={editComponent}
          setShowModal={setShowModal}
          type={"tasks"}
          item={currentItem}
        />
      )}
      <View className="flex-row mb-2 items-center justify-between">
        <Icon
          name="chevron-left"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text className="text-3xl font-bold justify-center text-center pr-7">
          Tasks
        </Text>

        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <Icon onPress={() => setVisible(true)} name="more-vert" size={30} />
          }
          anchorPosition="bottom"
        >
          <Menu.Item onPress={() => {}} title="Completed" />
        </Menu>
      </View>

      <View className="flex-row justify-evenly items-center  rounded-lg">
        <TouchableOpacity className="bg-gray-200 border border-gray-100 py-2 px-10 rounded-xl">
          <Text className="font-semibold text-base">Ongoing</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 mt-2">
        <FlatList
          data={ongoing}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View className="rounded-lg mb-2 p-2 bg-gray-300 ">
              {/* TouchableOpacity Here */}
              <TouchableOpacity
                onPress={() => {
                  setCurrentItem(item);
                  setShowModal(true);
                }}
              >
                <View className=" flex-1">
                  <View className="flex-row">
                    <Text className="text-center font-bold text-sm flex-auto">
                      {item.name}
                    </Text>

                    {item.completed === true ? (
                      <Icon
                        name="check-box"
                        size={20}
                        onPress={() => completeTask(item)}
                      />
                    ) : (
                      <Icon
                        name="check-box-outline-blank"
                        size={20}
                        onPress={() => completeTask(item)}
                      />
                    )}
                  </View>

                  <View className="self-start">
                    <Text className="font-semibold">
                      Description:{" "}
                      <Text className="font-normal">{item.description}</Text>
                    </Text>
                    <Text className="font-semibold">
                      Due Date:{" "}
                      <Text className="font-normal">
                        {item.date.toDate().toDateString()}
                      </Text>
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      {active === "Ongoing" && (
        <TouchableOpacity
          className="justify-center items-center"
          onPress={() => addComponent()}
        >
          <Icon name="add-box" size={50} style={{ color: "#6b7280" }} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default Tasks;
