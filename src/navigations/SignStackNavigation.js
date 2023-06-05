import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import OnboardingScreen from "../screen/onboarding/Onboarding";
// import signUpScreen from "../screen/onboarding/SignUp";
import SignInScreen from "../screen/onboarding/SignIn";
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
      {/* <Stack.Screen name="SignUp" component={signUpScreen} /> */}
      <Stack.Screen name="TCS" component={TcsScreen} />
      <Stack.Screen name="PIPP" component={PippScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
    </Stack.Navigator>
  );
};

export default SignStackNavigation;