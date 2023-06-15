import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MemoListScreen from "../screen/memo/MemoListScreen";
import MemoScreen from "../screen/memo/MemoScreen";

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
      {/* <Stack.Screen
        name="Memo"
        component={MemoScreen}
        options={{ tabBarStyle: { display: "none" } }}
      /> */}
    </Stack.Navigator>
  );
};

export default MemoStackNavigation;
