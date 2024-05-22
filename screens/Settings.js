import { View, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  logOutUser,
  deleteUserF,
  auth,
  loadData,
  getUserDetail,
} from "../firebaseConfig";
import React, { useEffect, useState } from "react";
import AddTerm from "../components/AddTerm";
import { Picker } from "@react-native-picker/picker";

const Settings = ({ navigation }) => {
  //TODO: Add a feature to change the current term and also create new ones for the schedule and courses

  const [activeModal, setActiveModal] = useState(false);
  const [modalType, setModalType] = useState("Add");

  const [terms, setTerms] = useState([]);
  const [currentTerm, setCurrentTerm] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  const addComponent = () => {
    setModalType("Add");
    setCurrentItem("");
    setActiveModal(true);
  };

  useEffect(() => {
    getUserDetail({ setValue: setCurrentTerm, type: "currentTerm" });
    loadData({ setData: setTerms, type: "terms" });
  }, []);

  return (
    <View className="flex-1">
      {activeModal && (
        <AddTerm
          type={modalType}
          setActiveModal={setActiveModal}
          item={currentItem}
        />
      )}
      <View className="flex-row space-x-3">
        <TouchableOpacity onPress={() => logOutUser({ navigator: navigation })}>
          <Icon name="logout" size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => deleteUserF({ navigator: navigation })}
        >
          <Icon name="delete" size={25} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => addComponent()}>
          <Icon name="add" size={25} />
        </TouchableOpacity>
      </View>
      <View>
        <Text>Current Term: {currentTerm}</Text>
        <Picker
          mode="dropdown"
          selectedValue={currentTerm}
          // Add the functionality to change the current term
          onValueChange={() => {}}
        >
          {terms.map((term, i) => {
            return <Picker.Item key={i} label={term.name} value={term.name} />;
          })}
        </Picker>
      </View>
    </View>
  );
};

export default Settings;
