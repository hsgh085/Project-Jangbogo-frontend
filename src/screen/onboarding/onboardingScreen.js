import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View } from "react-native";

const onboardingScreen = () => {
    return(
        <SafeAreaProvider>
            <Text>Onboarding화면입니다</Text>
        </SafeAreaProvider>
    )
};

export default onboardingScreen;