import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { auth } from "../firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import HomePage from "./HomePage";
import CalendarPage from "./CalendarPage";
import Settings from "./Settings";
import Categories from "./Categories";

const Tab = createBottomTabNavigator();
const Home = ({ navigation }) => {
  const user = auth.currentUser;
  if (user) {
    return (
      <SafeAreaView className="flex-1 p-2">
        <Tab.Navigator
          initialRouteName="HomePage"
          screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,

            tabBarStyle: {
              // backgroundColor: "#9ca3af",
              // borderColor: "black",
              // marginHorizontal: 4,
              backgroundColor: "#f3f4f6",
              elevation: 0,
              borderColor: "#f3f4f6",
            },
          }}
        >
          <Tab.Screen
            name="HomePage"
            component={HomePage}
            options={{
              tabBarIcon: ({ focused }) => {
                return <Icon name="home" size={focused ? 32 : 25} />;
              },
            }}
          />
          <Tab.Screen
            name="Categories"
            component={Categories}
            options={{
              tabBarIcon: ({ focused }) => {
                return <Icon name="category" size={focused ? 32 : 25} />;
              },
            }}
          />
          <Tab.Screen
            name="CalendarPage"
            component={CalendarPage}
            options={{
              tabBarIcon: ({ focused }) => {
                return <Icon name="event" size={focused ? 32 : 25} />;
              },
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              tabBarIcon: ({ focused }) => {
                return <Icon name="settings" size={focused ? 32 : 25} />;
              },
            }}
          />
        </Tab.Navigator>
      </SafeAreaView>
    );
  } else {
    navigation.replace("Home");
  }
};

export default Home;
