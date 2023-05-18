import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View } from "react-native";

const onboardingScreen = () => {
    return(
        <SafeAreaProvider>
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Text>Onboarding화면입니다</Text>
            </View>
        </SafeAreaProvider>
    )
};

export default onboardingScreen;