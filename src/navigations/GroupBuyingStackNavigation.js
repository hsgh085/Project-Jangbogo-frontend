import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import GroupBuyingListScreen from "../screen/groupbuying/GroupBuyingListScreen";
import GroupBuyingDetailScreen from '../screen/groupbuying/GroupBuyingDetailScreen';

const Stack = createNativeStackNavigator();

const GroupBuyingStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="GBList"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="GBList" component={GroupBuyingListScreen} />
      <Stack.Screen name="GBDetail" component={GroupBuyingDetailScreen} />
    </Stack.Navigator>
  );
};

export default GroupBuyingStackNavigation;
