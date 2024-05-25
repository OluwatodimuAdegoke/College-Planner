import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { addData, deleteData, loadData, updateData } from "../firebaseConfig";
import AddTask from "../modals/AddTask";
import { Button, Menu } from "react-native-paper";
import ShowDetails from "../modals/ShowDetails";
import COLORS from "../components/COLORS";
import ItemComponent from "../components/ItemComponent";

const Tasks = ({ navigation }) => {
  const [active, setActive] = useState("Ongoing");

  const [activeModal, setActiveModal] = useState(false);
  const [modalType, setModalType] = useState("Add");
  // Using this
  const [currentItem, setCurrentItem] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [tasks, setTasks] = useState([]);

  const [visible, setVisible] = useState(false);

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
      {/* {modal} */}
      {activeModal && (
        <AddTask
          setActiveModal={setActiveModal}
          type={modalType}
          item={currentItem}
        />
      )}
      {showModal && (
        <ShowDetails
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
                {/* TouchableOpacity Here */}
                <TouchableOpacity
                  onPress={() => {
                    setCurrentItem(item);
                    setShowModal(true);
                  }}
                >
                  <ItemComponent item={item} type="tasks" edit={true} />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}

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
