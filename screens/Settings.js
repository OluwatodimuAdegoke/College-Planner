import { View, TouchableOpacity, Text, Modal, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  logOutUser,
  deleteUserF,
  auth,
  loadData,
  getUserDetail,
  setUserDetail,
  deleteData,
} from "../firebaseConfig";
import React, { useEffect, useState } from "react";
import AddTerm from "../components/AddTerm";
import { Picker } from "@react-native-picker/picker";
import { FlatList } from "react-native-gesture-handler";

const Settings = ({ navigation }) => {
  //TODO: Add a feature to change the current term and also create new ones for the schedule and courses

  const [activeModal, setActiveModal] = useState(false);
  const [modalType, setModalType] = useState("Add");

  const [modalVisible, setModalVisible] = useState(false);

  const [terms, setTerms] = useState([]);
  const [currentTerm, setCurrentTerm] = useState(null);
  const [editCurrentTerm, setEditCurrentTerm] = useState(false);
  // Used for the edit term name method
  const [currentItem, setCurrentItem] = useState(null);

  const [value, setValue] = useState(currentTerm);

  const addComponent = () => {
    setModalType("Add");
    setCurrentItem(null);
    setActiveModal(true);
  };

  const editComponent = (item) => {
    if (item.name === currentTerm) {
      setEditCurrentTerm(true);
    } else {
      setEditCurrentTerm(false);
    }
    setModalType("Edit");
    setCurrentItem(item);
    setActiveModal(true);
  };
  const deleteComponent = ({ item }) => {
    if (item.name === currentTerm) {
      Alert.alert("Current Term", "You cannot delete the current term");
      console.log("Error");
    } else {
      deleteData({ id: id, type: "terms" });
    }
  };

  const changeTerm = (value) => {
    // setValue(value.name);
    setUserDetail({
      value: { currentTerm: value.name, currentTermId: value.id },
    });
    setModalVisible(false);
  };

  useEffect(() => {
    getUserDetail({ setValue: setCurrentTerm, type: "currentTerm" });
    // setValue(currentTerm);
    loadData({ setData: setTerms, type: "terms" });
  }, []);

  return (
    <View className="flex-1">
      {activeModal && (
        <AddTerm
          type={modalType}
          setActiveModal={setActiveModal}
          item={currentItem}
          editCurrentTerm={editCurrentTerm}
        />
      )}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center">
          <View className="bg-gray-300 rounded-md p-2 mb-3 w-1/2 space-y-2">
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="bg-gray-400 w-8 h-8 rounded-xl items-center justify-center"
            >
              <Icon name="cancel" size={25} />
            </TouchableOpacity>
            <FlatList
              data={terms}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ gap: 10 }}
              renderItem={({ item }) => (
                <View className="flex-row space-x-2">
                  <TouchableOpacity
                    className="p-2 bg-gray-500 rounded-md flex-1"
                    onPress={() => {
                      changeTerm(item);
                    }}
                  >
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => editComponent(item)}
                    className="bg-gray-400 w-8 h-8 rounded-xl items-center justify-center"
                  >
                    <Icon name="edit-note" size={25} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => deleteComponent({ item: item })}
                    className="bg-gray-400 w-8 h-8 rounded-xl items-center justify-center"
                  >
                    <Icon name="delete" size={25} />
                  </TouchableOpacity>
                </View>
              )}
            />
            <TouchableOpacity
              className="mt-2 justify-center items-center rounded-full bg-gray-500 w-8 h-8 self-end"
              onPress={() => addComponent()}
            >
              <Icon name="add" size={25} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View className="flex-row space-x-3">
        <TouchableOpacity onPress={() => logOutUser({ navigator: navigation })}>
          <Icon name="logout" size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => deleteUserF({ navigator: navigation })}
        >
          <Icon name="delete" size={25} />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          className="bg-gray-400 items-center py-4  w-20 rounded-lg"
          onPress={() => setModalVisible(true)}
        >
          <Text>{currentTerm ? currentTerm : "Select a term"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;
