import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import RootStackNavigation from "./navigations/RootStackNavigation";
import Onboarding from "./screen/onboarding/Onboarding"

const RootApp = () => {

  return (
    <NavigationContainer>
      <RootStackNavigation />
    </NavigationContainer>

  );
};

export default RootApp;