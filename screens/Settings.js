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
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../components/COLORS";

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
    <SafeAreaView className={` ${COLORS.mainColor} flex-1 p-2 space-y-4`}>
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
          <View className="bg-gray-700 rounded-2xl p-2 mb-3 w-1/2 space-y-2">
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

      <TouchableOpacity
        onPress={() => navigation.navigate("Accounts")}
        className={` flex-row items-center justify-between`}
      >
        <Text className="text-lg font-semibold">Accounts</Text>
        <Icon name={"chevron-right"} size={20} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className={` flex-row items-center justify-between`}
      >
        <Text className="text-lg font-semibold">
          {currentTerm ? currentTerm : "Select a term"}
        </Text>
        <Icon name={"chevron-right"} size={20} />
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-gray-400 items-center  rounded-lg h-10 justify-center"
        onPress={() => logOutUser({ navigator: navigation })}
      >
        <Text className="font-semibold text-xl">Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Settings;
