import React from "react";
import { Dimensions, View } from "react-native";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";
import Spacer from "../Spacer";
import HeaderTitle from "./HeaderTitle";

const { width } = Dimensions.get("window");
const Header = (props) => {
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
