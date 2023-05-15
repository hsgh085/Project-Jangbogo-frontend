import React from "react";
import { Text } from "react-native";

const HeaderTitle = (props) => {
  return (
    <Text style={{ color: props.color, fontSize: props.size }}>
      {props.children}
    </Text>
  );
};

export default HeaderTitle;
