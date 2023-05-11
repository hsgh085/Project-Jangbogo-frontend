import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MemoPostScreen from "../screen/memo/MemoPostScreen";
import BottomTabNavigation from './BottomTabNavigation';
import MemoStackNavigation from "./MemoStackNavigation";

const Stack = createNativeStackNavigator();

const RootStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="BottomTab"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
      <Stack.Screen name="MemoStack" component={MemoStackNavigation} />
      <Stack.Screen name="MemoPost" component={MemoPostScreen} />
    </Stack.Navigator>
  );
};

export default RootStackNavigation;
