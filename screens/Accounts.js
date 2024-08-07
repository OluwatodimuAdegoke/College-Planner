import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  getUserDetail,
  setUserDetail,
  deleteUserAndData,
  changePassword,
  changeEmail,
  sendVerification,
  uploadImage,
} from "../firebaseConfig";
import { TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";

const Accounts = ({ navigation }) => {
  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [type, setType] = React.useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
    });

    if (!result.canceled) {
      // setProfilePicture(result.assets[0].uri);

      await uploadImage({
        uri: result.assets[0].uri,
        name: "profile_picture",
        setIsLoading: setIsLoading,
      });
    }
  };

  const submitButton = () => {
    if (type === "username") {
      const data = { username: userName };
      setUserDetail({ value: data });
      setShowModal(false);
    } else if (type === "email") {
      changeEmail({ newEmail: email, navigator: navigation });
      setShowModal(false);
    } else if (type === "password") {
      changePassword({ newPassword: password });
      setShowModal(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // setIsLoading(true);
      await getUserDetail({ setValue: setUserName, type: "username" });
      // setIsLoading(false);
    };
    fetchData();
  }, []);
  return (
    <SafeAreaView className="flex-1 ">
      <Modal
        visible={isLoading}
        animationType="fade"
        transparent={true}
        className="justify-center items-center flex-1"
      >
        <View className="flex-1 justify-center items-center">
          <View className="bg-gray-200 w-5/6 h-1/6 rounded-xl p-2 space-y-2 items-center justify-center">
            <Text>Uploading...</Text>
            <ActivityIndicator size="large" color="white" />
          </View>
        </View>
      </Modal>
      <Modal
        visible={showModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View className="flex-1 justify-center items-center">
          <View className="bg-gray-500 w-5/6 rounded-xl p-2 space-y-2">
            <View className="h-10">
              {type === "username" && (
                <TextInput
                  className="bg-gray-100 flex-1 rounded-lg px-2 pr-2"
                  placeholder={userName}
                  value={userName}
                  onChangeText={(text) => setUserName(text)}
                />
              )}
              {type === "email" && (
                <TextInput
                  className="bg-gray-100 flex-1 rounded-lg px-2 pr-2"
                  placeholder={email}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              )}
              {type === "password" && (
                <TextInput
                  className="bg-gray-100 flex-1 rounded-lg px-2 pr-2"
                  placeholder="Enter New Password"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
              )}
            </View>
            <TouchableOpacity
              onPress={() => submitButton()}
              className=" p-2  bg-gray-100 rounded-md items-center w-1/3 self-center"
            >
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View className="flex-row mb-2 items-center justify-between">
        <Icon
          name="chevron-left"
          size={30}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View className="justify-center items-center space-y-6 flex-1">
        <TouchableOpacity
          // onPress={() => deleteUserF({ navigator: navigation })}
          onPress={() => {
            setType("username");
            setShowModal(true);
          }}
          className={` flex-row items-center justify-between gap-2`}
        >
          <Icon name="dns" size={25} />
          <Text className="text-lg font-semibold">Change UserName</Text>
          
        </TouchableOpacity>
        <TouchableOpacity
          onPress={pickImage}
          className={` flex-row items-center justify-between gap-2`}
        >
           <Icon name="person" size={25} />
          <Text className="text-lg font-semibold">Change ProfilePicture</Text>
         
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setType("email");
            setShowModal(true);
          }}
          className={` flex-row items-center justify-between gap-2`}
        >
          <Icon name="mail" size={25} />
          <Text className="text-lg font-semibold">Change Email</Text>
          
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setType("password");
            setShowModal(true);
          }}
          className={` flex-row items-center justify-between gap-2`}
        >
          <Icon name="key" size={25} />
          <Text className="text-lg font-semibold">Change Password</Text>
          
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => sendVerification()}
          className={` flex-row items-center justify-between gap-2` }
        >
          <Icon name="send" size={25} />
          <Text className="text-lg font-semibold">Verify Email</Text>
          
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Alert.alert("Delete Account", "Are you sure?", [
              {
                text: "Cancel",
              },
              {
                text: "OK",
                onPress: () => deleteUserAndData({ navigator: navigation }),
              },
            ]);
          }}
          className={` flex-row items-center justify-between gap-2`}
        >
          <Icon name="delete" size={25} />
          <Text className="text-lg font-semibold">Delete Account</Text>
          
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Accounts;
