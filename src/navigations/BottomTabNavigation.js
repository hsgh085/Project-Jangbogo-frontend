import {
  FontAwesome5,
  Ionicons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../../assets/colors/colors";
import AlarmScreen from "../screen/AlarmScreen";
import MainScreen from "../screen/MainScreen";
import MemoMainScreen from "../screen/memo/MemoMainScreen";
import MypageMainScreen from "../screen/mypage/MypageMainScreen";

const Tabs = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          if (route.name === "Main") {
            if (focused) {
              return (
                <View style={styles.icons}>
                  <MaterialIcons
                    name="home-filled"
                    size={25}
                    color={colors.greenH}
                  />
                  <Octicons name="dot-fill" size={10} color={colors.greenL} />
                </View>
              );
            }
            return (
              <MaterialIcons name="home-filled" size={25} color={colors.gray} />
            );
          } else if (route.name === "MyPageMain") {
            if (focused) {
              return (
                <View style={styles.icons}>
                  <Ionicons name="person" size={23} color={colors.greenH} />
                  <Octicons name="dot-fill" size={10} color={colors.greenL} />
                </View>
              );
            }
            return <Ionicons name="person" size={23} color={colors.gray} />;
          } else if (route.name === "MemoMain") {
            if (focused) {
              return (
                <View style={styles.icons}>
                  <FontAwesome5
                    name="shopping-bag"
                    size={20}
                    color={colors.greenH}
                  />
                  <Octicons name="dot-fill" size={10} color={colors.greenL} />
                </View>
              );
            }
            return (
              <FontAwesome5 name="shopping-bag" size={20} color={colors.gray} />
            );
          } else if (route.name === "Alarm") {
            if (focused) {
              return (
                <View style={styles.icons}>
                  <Octicons name="bell-fill" size={20} color={colors.greenH} />
                  <Octicons name="dot-fill" size={10} color={colors.greenL} />
                </View>
              );
            }
            return <Octicons name="bell-fill" size={20} color={colors.gray} />;
          }
        },
        tabBarStyle: styles.container,
      })}
    >
      <Tabs.Screen name="Main" component={MainScreen} />
      <Tabs.Screen name="MyPageMain" component={MypageMainScreen} />
      <Tabs.Screen name="MemoMain" component={MemoMainScreen} />
      <Tabs.Screen name="Alarm" component={AlarmScreen} />
    </Tabs.Navigator>
  );
};

export default BottomTabNavigation;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: 100,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: colors.white,
  },
  icons: {
    alignItems: "center",
  },
});