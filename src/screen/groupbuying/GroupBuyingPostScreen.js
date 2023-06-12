import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from '../../components/Header/Header';
import colors from '../../../assets/colors/colors';

const GroupBuyingPostScreen = () => {
  return (
    <>
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <Header>
            <View style={s.postBtn}>
                <Text>등록</Text>
            </View>
        </Header>
      </View>
    </>
  );
};

export default GroupBuyingPostScreen;

const s=StyleSheet.create({
    postBtn:{
        paddingVertical:10,
        paddingHorizontal:25,
        backgroundColor: colors.greenH,
        borderRadius:20,
    },
});