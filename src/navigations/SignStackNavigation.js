import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import onboardingScreen from "../screen/onboarding/Onboarding";
import signUpScreen from "../screen/onboarding/SignUp";
import singInScreen from "../screen/onboarding/SignIn";
const Stack = createNativeStackNavigator();

const SignStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Onboarding" component={onboardingScreen} />
      <Stack.Screen name="SignUp" component={signUpScreen} />
      <Stack.Screen name="TC" component={ExpenditureNavigation} />
      <Stack.Screen name="PIPP" component={RipenessScreen} />
      <Stack.Screen name="SignIn" component={singInScreen} />
    </Stack.Navigator>
  );
};

export default SignStackNavigation;