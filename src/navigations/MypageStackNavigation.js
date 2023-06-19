import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MypageMainScreen from "../screen/mypage/MypageMainScreen";
import MypageGBTabNavigation from './MypageGBTabNavigation';

const Stack = createNativeStackNavigator();
const MypageStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Mypage"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Mypage" component={MypageMainScreen} />
      <Stack.Screen name="MypageGB" component={MypageGBTabNavigation}/>
    </Stack.Navigator>
  );
};

export default MypageStackNavigation;
