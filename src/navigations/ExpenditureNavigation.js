import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import colors from "../../assets/colors/colors";
import ExpenditureMonthScreen from "../screen/expenditure/ExpenditureMonthScreen";
import ExpenditureYearScreen from "../screen/expenditure/ExpenditureYearScreen";
import { Text, View,StyleSheet } from "react-native";
import HeaderMain from "../components/HeaderMain";

const Tab = createMaterialTopTabNavigator();

const ExpenditureNavigation = () => {
  return (
    <>
      <View style={s.container}>
        <HeaderMain>
          <Text style={s.headerText}>지출내역</Text>
        </HeaderMain>
      </View>
      <Tab.Navigator
        initialRouteName="Year"
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: colors.green,
          },
          tabBarActiveTintColor: colors.green,
          tabBarInactiveTintColor: colors.gray,
        }}
        sceneContainerStyle={{ backgroundColor: "white" }}
      >
        <Tab.Screen
          name="Year"
          component={ExpenditureYearScreen}
          options={{ tabBarLabel: "월 별통계" }}
        />
        <Tab.Screen
          name="Month"
          component={ExpenditureMonthScreen}
          options={{ tabBarLabel: "일 별통계" }}
        />
      </Tab.Navigator>
    </>
  );
};

export default ExpenditureNavigation;

const s=StyleSheet.create({
    container:{
        backgroundColor: colors.white,
    },
    headerText:{
        fontSize:30,
        fontWeight:800,
        marginLeft:5,
        marginTop:20,
        marginBottom:5,
    }
})