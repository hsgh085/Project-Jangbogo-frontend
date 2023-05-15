import React from "react";
import { Dimensions, View, Pressable } from "react-native";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";
import Spacer from "../Spacer";
import HeaderTitle from "./HeaderTitle";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get("window");
const Header = (props) => {
    const navigate=useNavigation();
    const onPressBack=()=>{
        navigate.goBack();
    }
  return (
    <SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <View style={{ paddingTop: insets.top }}>
          <View
            style={{
              width: width,
              height: 70,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Spacer horizontal={true} space={12} />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Pressable onPress={onPressBack}>
                <MaterialCommunityIcons
                  name="keyboard-backspace"
                  size={24}
                  color="black"
                />
              </Pressable>
              {props.children}
            </View>
            <Spacer horizontal={true} space={12} />
          </View>
        </View>
      )}
    </SafeAreaInsetsContext.Consumer>
  );
};

export default Header;

Header.Title = HeaderTitle;
