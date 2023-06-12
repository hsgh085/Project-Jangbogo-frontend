import React, { useState } from "react";
import {ScrollView, KeyboardAvoidingView, TextInput, StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header/Header";
import colors from "../../../assets/colors/colors";
import SingleLineInput from "../../components/SingleLineInput";

const GroupBuyingPostScreen = () => {
  return (
    <>
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <Header>
          <View style={s.postBtn}>
            <Text>등록</Text>
          </View>
        </Header>
        <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
          <View style={s.inputContainer}>
            <Text style={s.label}>상품명</Text>
            <View style={s.input}>
              <SingleLineInput placeholder="상품명 입력" />
            </View>
          </View>
          <View style={s.inputContainer}>
            <Text style={s.label}>카카오톡 오픈채팅 링크</Text>
            <View style={s.input}>
              <SingleLineInput placeholder="카카오톡 오픈채팅 링크 입력" />
            </View>
          </View>
          <View style={s.inputContainer}>
            <Text style={s.label}>공동구매 인원</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={s.inputNum}>
                <SingleLineInput keyboardType="number-pad" placeholder="0" />
              </View>
              <Text>명</Text>
            </View>
          </View>
          <View style={s.inputContainer}>
            <Text style={s.label}>마감까지 타이머 설정</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={s.inputNum}>
                <SingleLineInput keyboardType="number-pad" placeholder="00" />
              </View>
              <Text style={{marginRight:5,}}>시간</Text>
              <View style={s.inputNum}>
                <SingleLineInput keyboardType="number-pad" placeholder="00" />
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
            <TextInput style={s.inputMulti} placeholder="직거래할 장소 및 수량정보 등등을 적어주세요~" multiline={true} />
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
