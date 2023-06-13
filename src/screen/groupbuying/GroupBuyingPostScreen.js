import React, { useState } from "react";
import { Alert, TouchableOpacity, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../../../assets/colors/colors";
import Header from "../../components/Header/Header";
import SingleLineInput from "../../components/SingleLineInput";
import { useNavigation } from "@react-navigation/native";

const GroupBuyingPostScreen = () => {
  const navigation = useNavigation();
  const [gb, setGB] = useState({
    name: "",
    link: "",
    peopleNum: 0,
    timerHour: 0,
    timerMin: 0,
    location: "",
    content: "",
  });
  const handleChange = (key, value) => {
    setGB({ ...gb, [key]: value });
    console.log(gb);
  };
  const toast = (message) => {
    Alert.alert("", `${message}`, [
      {
        text: "확인",
      },
    ]);
  };
  const handlePost = () => {
    if (gb.name === "") toast("상품명을 입력해주세요");
    else if (gb.link === "") toast("카카오톡 오픈채팅 링크를 입력해주세요");
    else if (gb.peopleNum < 2) toast("공동구매 인원은 최소 2명 이상으로 입력해주세요");
    else if (parseInt(gb.timerHour) === 0 && parseInt(gb.timerMin) === 0) toast("마감까지 타이머 설정을 1분 이상으로 입력해주세요");
    else if (parseInt(gb.timerMin) > 59) toast("마감까지 타이머 설정의 분 단위를 59분 이하로 입력해주세요");
    else{
      Alert.alert("", "등록되었습니다😊", [
        {
          text: "확인",
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    }
  };
  return (
    <>
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <Header>
          <TouchableOpacity style={s.postBtn} onPress={handlePost}>
            <Text>등록</Text>
          </TouchableOpacity>
        </Header>
        <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
          <View style={s.inputContainer}>
            <Text style={s.label}>상품명</Text>
            <View style={s.input}>
              <SingleLineInput placeholder="상품명 입력" onChangeText={(text) => handleChange("name", text)} />
            </View>
          </View>
          <View style={s.inputContainer}>
            <Text style={s.label}>카카오톡 오픈채팅 링크</Text>
            <View style={s.input}>
              <SingleLineInput placeholder="카카오톡 오픈채팅 링크 입력" onChangeText={(text) => handleChange("link", text)} />
            </View>
          </View>
          <View style={s.inputContainer}>
            <Text style={s.label}>공동구매 인원</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={s.inputNum}>
                <SingleLineInput type="numeric" placeholder="0" onChangeText={(text) => handleChange("peopleNum", text)} />
              </View>
              <Text>명</Text>
            </View>
          </View>
          <View style={s.inputContainer}>
            <Text style={s.label}>마감까지 타이머 설정</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={s.inputNum}>
                <SingleLineInput type="numeric" placeholder="00" onChangeText={(text) => handleChange("timerHour", text)} />
              </View>
              <Text style={{ marginRight: 5 }}>시간</Text>
              <View style={s.inputNum}>
                <SingleLineInput type="numeric" placeholder="00" onChangeText={(text) => handleChange("timerMin", text)} />
              </View>
              <Text>분 후</Text>
            </View>
          </View>
          <View style={s.inputContainer}>
            <Text style={s.label}>장소</Text>
            <View style={s.input}>
              <Text style={s.locText}>서울 영등포구</Text>
            </View>
          </View>
          <View style={s.inputContainer}>
            <Text style={s.label}>상세내용</Text>
            <TextInput
              style={s.inputMulti}
              placeholder="직거래할 장소 및 수량정보 등등을 적어주세요~"
              multiline={true}
              onChangeText={(text) => handleChange("content", text)}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default GroupBuyingPostScreen;

const s = StyleSheet.create({
  postBtn: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: colors.greenH,
    borderRadius: 20,
  },
  container: {
    marginHorizontal: 20,
  },
  label: {
    fontWeight: 500,
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.greenH,
    borderRadius: 15,
    padding: 7,
  },
  locText: {
    padding: 5,
    fontWeight: "bold",
    color: colors.gray,
  },
  inputMulti: {
    padding: 10,
    height: 150,
    textAlignVertical: "top",
    backgroundColor: colors.grayLL,
    borderRadius: 15,
  },
  inputNum: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginRight: 5,
    borderRadius: 5,
    backgroundColor: colors.grayLL,
  },
});
