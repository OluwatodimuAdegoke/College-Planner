import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { logOutUser, deleteUserF, auth } from "../firebaseConfig";
import React, { useState } from "react";
import WeekSlider from "./Test";
import AddTerm from "../components/AddTerm";

const Settings = ({ navigation }) => {
  //TODO: Add a feature to change the current term and also create new ones for the schedule and courses

  const [activeModal, setActiveModal] = useState(false);
  const [modalType, setModalType] = useState("Add");

  const [terms, setTerms] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);

  const addComponent = () => {
    setModalType("Add");
    setCurrentItem("");
    setActiveModal(true);
  };

  // useEffect(() => {
  //   loadData({ setData: setTerms, type: "terms" });
  // }, []);

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
    </View>
  );
};

export default Settings;
