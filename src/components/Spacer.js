import React from "react";
import { View } from "react-native";

const Spacer = (props) => {
  if (props.horizontal) {
    return <View style={{ marginLeft: props.space }} />;
  }
  return <View style={{ marginTop: props.space }} />;
};

export default Spacer;
