import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { loadData } from "../firebaseConfig";
import { ItemComponent, COLORS } from "../components";

const CompletedTasks = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await loadData({ setData: setTasks, type: "tasks", completed: true });
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
      </View>
      <View className="p-2 rounded-md bg-gray-400  ">
        <Text className="text-center font-bold text-2xl">Completed Tasks</Text>
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
                <View>
                  <ItemComponent item={item} type="tasks" edit={true} />
                </View>
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default CompletedTasks;
