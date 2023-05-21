import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import RootStackNavigation from "./navigations/RootStackNavigation";
import Onboarding from "./screen/onboarding/Onboarding"

const RootApp = () => {
  //NOTE: Onboarding 화면으로 이동
  // const [initialized, setInitialized] = useState(false);
  // if (!initialized) {
  //   return <Onboarding onFinishLoad={() => setInitialized(true)} />;
  // }
  return (
    <NavigationContainer>
      <RootStackNavigation />
    </NavigationContainer>
  );
};

export default RootApp;
