import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MemoListScreen from "../screen/memo/MemoListScreen";

const Stack = createNativeStackNavigator();
const MemoStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="MemoList"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MemoList" component={MemoListScreen} />
    </Stack.Navigator>
  );
};

export default MemoStackNavigation;
