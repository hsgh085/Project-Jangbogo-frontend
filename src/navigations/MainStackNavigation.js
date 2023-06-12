import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MainScreen from "../screen/MainScreen";
import MemoListScreen from "../screen/memo/MemoListScreen";
import ExpenditureNavigation from "./ExpenditureNavigation";
import GroupBuyingStackNavigation from "./GroupBuyingStackNavigation";
import RipenessStackNavigation from "./RipenessStackNavigation";

const Stack = createNativeStackNavigator();

const MainStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="MemoList" component={MemoListScreen} />
      <Stack.Screen name="Expenditure" component={ExpenditureNavigation} />
      <Stack.Screen name="RipenessStack" component={RipenessStackNavigation} />
      <Stack.Screen name="GroupBuyingStack" component={GroupBuyingStackNavigation} />
    </Stack.Navigator>
  );
};

export default MainStackNavigation;
