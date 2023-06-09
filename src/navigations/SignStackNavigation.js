import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import OnboardingScreen from "../screen/onboarding/Onboarding";
import SignUpScreen from "../screen/onboarding/SignUp";
import SignInWPasswordScreen from "../screen/onboarding/SignInWPassword";
import SignInWCodeNumScreen from "../screen/onboarding/SignInWCodeNum";
import PippScreen from "../screen/onboarding/PIPP";
import TcsScreen from "../screen/onboarding/TCS";

const Stack = createNativeStackNavigator();

const SignStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="TCS" component={TcsScreen} />
      <Stack.Screen name="PIPP" component={PippScreen} />
      <Stack.Screen name="SignInWPW" component={SignInWPasswordScreen} />
      <Stack.Screen name="SignInWCN" component={SignInWCodeNumScreen} />
    </Stack.Navigator>
  );
};

export default SignStackNavigation;