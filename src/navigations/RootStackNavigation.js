import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MemoScreen from "../screen/memo/MemoScreen";
import BottomTabNavigation from "./BottomTabNavigation";
import SignStackNavigation from "./SignStackNavigation";
import CameraScreen from '../screen/ripeness/CameraScreen';
import GroupBuyingPostScreen from '../screen/groupbuying/GroupBuyingPostScreen';
import LoadingScreen from '../screen/prediction/Loading';
import BarcodeScanner from "../screen/myrefrigerator/BarcordScanner";
import BarcodeTest from "../screen/myrefrigerator/BarcordTest";

const Stack = createNativeStackNavigator();

const RootStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Sign"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
      {/* Bottom Tab 안보이게 하고 싶은 Screen 여기에 배치 */}
      <Stack.Screen name="Sign" component={SignStackNavigation} />
      <Stack.Screen name="Memo" component={MemoScreen} /> 
      <Stack.Screen name="Camera" component={CameraScreen}/>
      <Stack.Screen name="BarcordScanner" component={BarcodeScanner} />
      <Stack.Screen name="BarcordTest" component={BarcodeTest} />
      <Stack.Screen name="GBPost" component={GroupBuyingPostScreen}/>
      <Stack.Screen name="Loading" component={LoadingScreen} />
    </Stack.Navigator>
  );
};

export default RootStackNavigation;
