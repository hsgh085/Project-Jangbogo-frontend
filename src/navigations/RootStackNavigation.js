import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MemoScreen from "../screen/memo/MemoScreen";
import BottomTabNavigation from "./BottomTabNavigation";

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
      {/* Bottom Tab 안보이게 하고 싶은 Screen 여기에 배치 */}
      <Stack.Screen name="Memo" component={MemoScreen} /> 
    </Stack.Navigator>
  );
};

export default RootStackNavigation;
