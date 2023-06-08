import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import RipenessScreen from '../screen/ripeness/RipenessScreen';
import RipenessResultScreen from '../screen/ripeness/RipenessResultScreen';

const Stack = createNativeStackNavigator();

const RipenessStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Ripeness"
      screenOptions={{
        headerShown: false,
      }}
    >
        <Stack.Screen name="Ripeness" component={RipenessScreen}/>
        <Stack.Screen name="RipenessResult" component={RipenessResultScreen}/>

    </Stack.Navigator>
  );
};

export default RipenessStackNavigation;
