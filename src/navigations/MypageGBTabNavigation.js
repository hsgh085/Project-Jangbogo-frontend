import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import HeaderMain from "../components/HeaderMain";
import { View, Text, StyleSheet } from "react-native";
import MypageGBScreen from "../screen/mypage/MypageGBScreen";
import colors from "../../assets/colors/colors";
import Header from "../components/Header/Header";

const Tab = createMaterialTopTabNavigator();
const MypageGBTabNavigation = () => {
  return (
    <>
      <View style={s.container}>
        <Header>
          <Header.Title size={18}>공동구매 확인</Header.Title>
          <View />
        </Header>
      </View>
      <Tab.Navigator
        initialRouteName="Self"
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: colors.green,
          },
          tabBarActiveTintColor: colors.green,
          tabBarInactiveTintColor: colors.gray,
        }}
        sceneContainerStyle={{ backgroundColor: "white" }}
      >
        <Tab.Screen name="Self" component={MypageGBScreen} initialParams={{ type: "self" }} options={{ tabBarLabel: "작성글" }} />
        <Tab.Screen name="Participate" component={MypageGBScreen} initialParams={{ type: "participate" }} options={{ tabBarLabel: "참여완료" }} />
        <Tab.Screen name="Done" component={MypageGBScreen} initialParams={{ type: "done" }} options={{ tabBarLabel: "모집완료" }} />
      </Tab.Navigator>
    </>
  );
};

export default MypageGBTabNavigation;

const s = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 800,
  },
});
