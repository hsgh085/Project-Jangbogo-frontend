import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import PredictionScreen from "../screen/prediction/Prediction";
// import LoadingScreen from "../screen/prediction/Loading";
import PredictionResultScreen from "../screen/prediction/PredictionResult";


const Stack = createNativeStackNavigator();

const PredictionStackNavigation = () => {
  
  return (
    <Stack.Navigator
      initialRouteName="PredictionMain"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="PredictionMain" component={PredictionScreen} />
      {/* <Stack.Screen name="Loading" component={LoadingScreen} /> */}
      <Stack.Screen name="PredictionResult" component={PredictionResultScreen} />
    </Stack.Navigator>
  );
};

export default PredictionStackNavigation;