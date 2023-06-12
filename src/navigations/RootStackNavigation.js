import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MemoScreen from "../screen/memo/MemoScreen";
import BottomTabNavigation from "./BottomTabNavigation";
import SignStackNavigation from "./SignStackNavigation";
import CameraScreen from '../screen/ripeness/CameraScreen';

const Stack = createNativeStackNavigator();

const RootStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="BottonTab"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
      {<Stack.Screen name="Sign" component={SignStackNavigation} />
      /* Bottom Tab 안보이게 하고 싶은 Screen 여기에 배치 */}
      <Stack.Screen name="Memo" component={MemoScreen} /> 
      <Stack.Screen name="Camera" component={CameraScreen}/>
    </Stack.Navigator>
  );
};

export default RootStackNavigation;
