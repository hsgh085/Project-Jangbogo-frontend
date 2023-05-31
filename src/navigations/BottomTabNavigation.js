import {
  FontAwesome5,
  Ionicons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../../assets/colors/colors";
import AlarmScreen from "../screen/AlarmScreen";
import LatestMemoScreen from "../screen/LatestMemoScreen";
import MypageMainScreen from "../screen/mypage/MypageMainScreen";
import MainStackNavigation from "./MainStackNavigation";

const Tabs = createBottomTabNavigator();

const BottomTabNavigation = () => {
  const navigation = useNavigation();
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          if (route.name === "MainStack") {
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
          } else if (route.name === "LatestMemo") {
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
      <Tabs.Screen
        name="MainStack"
        component={MainStackNavigation}
        listeners={{
          tabPress: () => {
            navigation.navigate("Main");
          },
        }}
      />
      <Tabs.Screen name="MyPageMain" component={MypageMainScreen} />
      <Tabs.Screen name="LatestMemo" component={LatestMemoScreen} />
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
