import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View ,StyleSheet,} from "react-native";
import colors from "../../../assets/colors/colors";
import Header from "../../components/Header/Header";
import { useRoute } from '@react-navigation/native';

const MemoPostScreen = (props) => {
    const route=useRoute();
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title size={18}>장보기 작성</Header.Title>
        <FontAwesome5 name="trash" size={18} color={colors.red} />
      </Header>
      <View style={s.title}>
        <Text>{route.params?.date}</Text>
      </View>
    </View>
  );
};

export default MemoPostScreen;

const s=StyleSheet.create({
    title:{
        backgroundColor: colors.green
    }
})