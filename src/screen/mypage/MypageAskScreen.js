import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Header from "../../components/Header/Header";
import colors from "../../../assets/colors/colors";

const MypageAskScreen = () => {
  return (
    <>
      <View style={s.container}>
        <Header>
          <Header.Title size={18}>문의하기</Header.Title>
          <View />
        </Header>
        <View style={s.mainContainer}>
            <Text>📢 문의는 아래 메일로 메일 보내주세요. </Text>
            <Text style={s.text1}>yonsei2nt@gmail.com</Text>
        </View>
      </View>
    </>
  );
};

export default MypageAskScreen;

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  mainContainer:{
    padding:30,
    alignItems:"center",
  },
  text1:{
    marginTop:20,
    fontSize:20,
    fontWeight:"500",
  }
});
