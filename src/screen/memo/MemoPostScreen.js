import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  Button,
} from "react-native";
import colors from "../../../assets/colors/colors";
import Header from "../../components/Header/Header";
import { useRoute } from "@react-navigation/native";
import Spacer from "../../components/Spacer";
import SingleLineInput from "../../components/SingleLineInput";

const MemoPostScreen = (props) => {
  const route = useRoute();
  const [memo, setMemo] = useState({
    date: route.params?.date,
    title: "무제",
    totalPrice: 0,
  });
  const handleChange = (title) => {
    setMemo({ ...memo, ["title"]: title });
  };
  const handleDelte = () => {
    Alert.alert(
      "주의",
      "전체 삭제하시겠습니까?",
      [
        { text: "예", onPress: () => console.log("yes") },
        {
          text: "아니오",
          onPress: () => console.log("no"),
          style: "cancle",
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title size={18}>장보기 작성</Header.Title>
        <Pressable onPress={handleDelte}>
          <FontAwesome5 name="trash" size={18} color={colors.red} />
        </Pressable>
      </Header>
      <View style={s.title}>
        <Text style={s.text1}>{memo.date}</Text>
        <SingleLineInput
          style={s.text2}
          value={memo.title}
          onChangeText={handleChange}
        />
        <Spacer space={15} />
        <View style={s.priceContainer}>
          <Text style={s.text1}>총 금액</Text>
          <Text style={s.text2}>{memo.totalPrice}원</Text>
        </View>
      </View>
      <View style={{ flex:1,padding: 20 }}>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <Text>장보기 리스트</Text>
          <Pressable style={{flexDirection:'row', alignItems:'center'}}>
          <AntDesign name="pluscircleo" size={18} color={colors.greenH} />
          <Spacer horizontal={true} space={5}/>
            <Text>추가</Text>
          </Pressable>
        </View>
        <View>

        </View>
        <Pressable style={s.btnSave}>
            <Text style={s.textSave}>저장하기</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MemoPostScreen;

const s = StyleSheet.create({
  title: {
    padding: 15,
    backgroundColor: colors.green,
    ...Platform.select({
      ios: {
        shadowColor: "#ECECEC",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0,
        },
      },
      android: {
        elevation: 10,
      },
    }),
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnSave:{
    alignItems: 'center',
    justifyContent: 'center',
    position:'absolute',
    left:30,
    right:30,
    bottom:30,
    paddingVertical: 12,
    borderRadius: 50,
    backgroundColor:colors.greenH,
  },
  text1: {
    fontSize: 20,
    fontWeight: 300,
    color: colors.white,
  },
  text2: {
    fontSize: 30,
    color: colors.white,
  },
  textSave:{
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
  }
});
