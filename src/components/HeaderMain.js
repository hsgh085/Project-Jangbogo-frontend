import React from "react";
import { Text, View, Dimensions, StyleSheet } from "react-native";
import {
  SafeAreaInsetsContext,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import Spacer from '../components/Spacer';
import colors from '../../assets/colors/colors';

const { width } = Dimensions.get("window");
const HeaderMain = (props) => {
    return (
<SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <View style={{paddingTop: insets.top, }}>
          <View
            style={{
              width: width,
              height: 70,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Spacer horizontal={true} space={12} />
            {[props.children]}
          </View>
        </View>
      )}
    </SafeAreaInsetsContext.Consumer>
    );
};

export default HeaderMain;