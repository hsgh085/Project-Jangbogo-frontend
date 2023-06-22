import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ThemeMainScreen from "../screen/theme/ThemeMainScreen";
import ThemeDetailScreen from "../screen/theme/ThemeDetailScreen";


const Stack = createNativeStackNavigator();

const ThemeStackNavigation = () => {

    return (
        <Stack.Navigator
          initialRouteName="ThemeMain"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="ThemeMain" component={ThemeMainScreen} />
          <Stack.Screen name="ThemeDetail" component={ThemeDetailScreen} />
        </Stack.Navigator>
      );
}

export default ThemeStackNavigation