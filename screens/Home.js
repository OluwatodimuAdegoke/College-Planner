import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import database from '../tempDatabase'
import { auth } from '../firebaseConfig'
import { SafeAreaView } from 'react-native-safe-area-context';
import HomePage from './HomePage';
import CalendarPage from './CalendarPage';
import Settings from './Settings';
import Categories from './Categories';


const Tab = createBottomTabNavigator();
const Home = ({navigation}) => {

  // const userName = database.users[0].name
  // const profilePicture = database.users[0].profilePicture


  const user = auth.currentUser;
  if(user){
    return (
      <SafeAreaView className = "flex-1 p-2">
      {/* <View className="justify-between pt-2 flex-row items-center">
        <View>
          <Text className="text-black font-normal text-l">Good Morning</Text>
          <Text className="text-black font-bold text-xl">Hello, {userName}</Text>
        </View>
        
        <View className="h-10 w-10">
          <Image className="flex-1 justify-center self-center w-10 object-fill rounded-full border-" source={profilePicture}/>
        </View>
      </View> */}

      <Tab.Navigator
      initialRouteName='HomePage'
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle:{
          backgroundColor: "#9ca3af",
          borderColor: "black",
          borderRadius: 15,
          marginHorizontal: 4
        }
      }}
      >
      <Tab.Screen 
      name="HomePage" 
      component={HomePage}
      options={{
        tabBarIcon: ({focused}) => {
          return (
               <Icon 
               name="home" 
               size={focused ? 32 : 25}
               />
           
          )
        }
      }}
      />
      <Tab.Screen 
      name="Categories" 
      component={Categories}
      options={{
        tabBarIcon: ({focused}) => {
          return (
            <Icon 
            name="category" 
            size={focused ? 32 : 25}
            />
          )
        }
      }}/>
      <Tab.Screen 
      name="CalendarPage" 
      component={CalendarPage}
      options={{
        tabBarIcon: ({focused}) => {
          return (
            <Icon 
            name="event" 
            size={focused ? 32 : 25}
            />
          )
        }
      }}/>
      <Tab.Screen 
      name="Settings" 
      component={Settings}
      options={{
        tabBarIcon: ({focused}) => {
          return (
            <Icon 
            name="settings" 
            size={focused ? 32 : 25}
            />
          )
        }
      }}
      />
      </Tab.Navigator>
      </SafeAreaView>
    )
  }else{
    navigation.replace("Home");
  }
}

export default Home