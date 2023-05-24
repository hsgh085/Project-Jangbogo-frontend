import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import BottomTabNavigation from './BottomTabNavigation';
import MemoStackNavigation from "./MemoStackNavigation";
import MemoScreen from '../screen/memo/MemoScreen';
import ExpenditureScreen from '../screen/expenditure/ExpenditureScreen';
import RipenessScreen from '../screen/ripeness/RipenessScreen';

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
      <Stack.Screen name="Memo" component={MemoScreen} />
      <Stack.Screen name="Expenditure" component={ExpenditureScreen}/>
      <Stack.Screen name="Ripness" component={RipenessScreen}/>
    </Stack.Navigator>
  );
};

export default RootStackNavigation;
