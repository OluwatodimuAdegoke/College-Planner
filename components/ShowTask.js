import {
  View,
  Text,
  Modal,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { addData, loadData, updateData, deleteData } from "../firebaseConfig";
import AddTask from "../components/AddTask";

const ShowTask = ({ setShowModal, type, item, editComponent }) => {
  const [activeModal, setActiveModal] = useState(false);

  const completeTask = (item) => {
    updateData({
      id: item.id,
      type: type,
      value: { completed: !item.completed },
    });
    setShowModal(false);
  };

  const deleteComponent = (id) => {
    deleteData({ id: id, type: type });
    setShowModal(false);
  };
  //   const editComponent = (item) => {
  //     // setShowModal(false);
  //     setActiveModal(true);
  //   };

  useEffect(() => {});

  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={() => setShowModal(false)}
    >
      {activeModal && (
        <AddTask
          visible={activeModal}
          setActiveModal={setActiveModal}
          type={"Edit"}
          item={item}
        />
      )}

      <View className="flex-1 justify-center items-center">
        <View className="bg-gray-500 w-5/6 rounded-xl p-2 space-y-2">
          <Icon
            name="close"
            size={20}
            style={{ alignSelf: "flex-end" }}
            onPress={() => setShowModal(false)}
          />
          {type === "tasks" && (
            <View>
              <Text>Name: {item.name}</Text>
              <Text>Description: {item.description}</Text>
              <Text>Due Date: {item.date.toDate().toDateString()}</Text>
              <Text>{item.completed ? "Completed" : "Not Completed"}</Text>
            </View>
          )}
          {type === "assignments" && (
            <View>
              <Text>Name: {item.name}</Text>
              <Text>Course: {item.course}</Text>
              <Text>Description: {item.description}</Text>
              <Text>Due Date: {item.date.toDate().toDateString()}</Text>
              <Text>{item.completed ? "Completed" : "Not Completed"}</Text>
            </View>
          )}

          <View className="flex-row justify-between space-x-4">
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
            <Icon
              name="edit-note"
              size={25}
              onPress={() => {
                if (type == "tasks") {
                  editComponent(item);
                } else {
                  editComponent({ type: type, item: item });
                }
                setShowModal(false);
              }}
            />
            <Icon
              name="delete"
              size={25}
              onPress={() => deleteComponent(item.id)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ShowTask;
