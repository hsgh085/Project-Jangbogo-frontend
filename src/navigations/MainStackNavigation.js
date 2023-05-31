import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MainScreen from "../screen/MainScreen";
import ExpenditureNavigation from "./ExpenditureNavigation";
import MemoStackNavigation from './MemoStackNavigation';
import MemoListScreen from '../screen/memo/MemoListScreen';
const Stack = createNativeStackNavigator();

const MainStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="MemoList" component={MemoListScreen}/>
      <Stack.Screen name="Expenditure" component={ExpenditureNavigation} />
    </Stack.Navigator>
  );
};

export default MainStackNavigation;
