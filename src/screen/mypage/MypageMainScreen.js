import { useNavigation } from '@react-navigation/native';
import React from "react";
import { Pressable, View, Text } from "react-native";

const MypageMainScreen = () => {
    const navigation=useNavigation()
  return (
    <View>
      <Text>마이페이지 메인화면입니다.</Text>
      <Pressable onPress={()=>{navigation.navigate("MypageGB")}}>
        <Text>공동구매 확인</Text>
      </Pressable>
    </View>
  );
};

export default MypageMainScreen;
