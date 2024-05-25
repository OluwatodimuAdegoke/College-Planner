import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
  Login,
  Welcome,
  Register,
  Home,
  Assignments,
  Schedules,
  Tasks,
  Sessions,
} from "./screens";
import DisplayCourse from "./components/DisplayCourse";
import { PaperProvider } from "react-native-paper";
import StudyPage from "./components/StudyPage";
import Accounts from "./screens/Accounts";
import CompletedTasks from "./screens/CompletedTasks";
import CompletedCourseDetails from "./screens/CompletedCourseDetails";
const Stack = createStackNavigator();
export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={Home} />

          <Stack.Screen name="Schedules" component={Schedules} />
          <Stack.Screen name="Tasks" component={Tasks} />
          <Stack.Screen name="Sessions" component={Sessions} />
          <Stack.Screen name="DisplayCourse" component={DisplayCourse} />
          <Stack.Screen name="StudyPage" component={StudyPage} />
          <Stack.Screen name="Accounts" component={Accounts} />
          <Stack.Screen name="CompletedTasks" component={CompletedTasks} />
          <Stack.Screen
            name="CompletedCourseDetails"
            component={CompletedCourseDetails}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
