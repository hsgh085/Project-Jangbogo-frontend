import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import colors from "../../../assets/colors/colors";
import Header from "../../components/Header/Header";

const MemoPostScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <MaterialCommunityIcons
          name="keyboard-backspace"
          size={24}
          color="black"
        />
        <Header.Title size={18}>장보기 작성</Header.Title>
        <FontAwesome5 name="trash" size={18} color={colors.red} />
      </Header>
      <Text>메모 작성화면입니다.</Text>
    </View>
  );
};

export default MemoPostScreen;
