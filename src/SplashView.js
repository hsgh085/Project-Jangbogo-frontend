import React, { useEffect } from "react";
import { Text, View } from "react-native";

const SplashView = (props) => {
  useEffect(() => {
    setTimeout(() => {
      props.onFinishLoad();
    }, 2000);
  }, []);
  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
      <Text>Splash</Text>
    </View>
  );
};

export default SplashView;
