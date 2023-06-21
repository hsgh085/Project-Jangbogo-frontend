import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MyRefrigeratorMain from "../screen/myrefrigerator/MyRefrigeratorMain";
// import BarcodeScanner from "../screen/myrefrigerator/BarcodeScanner";
import MyRefrigeratorResult from "../screen/myrefrigerator/MyRefrigeratorResult";


const Stack = createNativeStackNavigator();

const RefrigeratorStackNavigation = () => {
  
  return (
    <Stack.Navigator
      initialRouteName="MyRefrigeratorMain"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MyRefrigeratorMain" component={MyRefrigeratorMain} />
      {/* <Stack.Screen name="BarcodeScanner" component={BarcodeScanner} /> */}
      <Stack.Screen name="MyRefrigeratorResult" component={MyRefrigeratorResult} />
    </Stack.Navigator>
  );
};

export default  RefrigeratorStackNavigation;