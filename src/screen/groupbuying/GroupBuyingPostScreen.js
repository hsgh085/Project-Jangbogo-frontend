import React, { useEffect, useState } from "react";
import { Alert, TouchableOpacity, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../../../assets/colors/colors";
import Header from "../../components/Header/Header";
import SingleLineInput from "../../components/SingleLineInput";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ROOT_API, TOKEN } from '../../constants/api';

const GroupBuyingPostScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [gb, setGB] = useState({
    name: "",
    kakaoadd: "",
    peoplenum: 0,
    deadline_hour: 0,
    deadline_min: 0,
    place: route.params?.place,
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
    else if (gb.kakaoadd === "") toast("카카오톡 오픈채팅 링크를 입력해주세요");
    else if (gb.peoplenum < 2) toast("공동구매 인원은 최소 2명 이상으로 입력해주세요");
    else if (parseInt(gb.deadline_hour) === 0 && parseInt(gb.deadline_min) === 0) toast("마감까지 타이머 설정을 1분 이상으로 입력해주세요");
    else if (parseInt(gb.deadline_min) > 59) toast("마감까지 타이머 설정의 분 단위를 59분 이하로 입력해주세요");
    else {
      fetch(`${ROOT_API}/grouppurchase/creategp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //TODO: 테스트 후 토큰 바꾸기
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(gb)
      })
        .then(() => {
          Alert.alert("", "등록되었습니다😊", [
            {
              text: "확인",
              onPress: () => {
                navigation.goBack();
              },
            },
          ]);
        })
        .catch((err) => {
          console.log(err);
        });
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
              <SingleLineInput placeholder="카카오톡 오픈채팅 링크 입력" onChangeText={(text) => handleChange("kakaoadd", text)} />
            </View>
          </View>
          <View style={s.inputContainer}>
            <Text style={s.label}>공동구매 인원</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={s.inputNum}>
                <SingleLineInput type="numeric" placeholder="0" onChangeText={(text) => handleChange("peoplenum", text)} />
              </View>
              <Text>명</Text>
            </View>
          </View>
          <View style={s.inputContainer}>
            <Text style={s.label}>마감까지 타이머 설정</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={s.inputNum}>
                <SingleLineInput type="numeric" placeholder="00" onChangeText={(text) => handleChange("deadline_hour", text)} />
              </View>
              <Text style={{ marginRight: 5 }}>시간</Text>
              <View style={s.inputNum}>
                <SingleLineInput type="numeric" placeholder="00" onChangeText={(text) => handleChange("deadline_min", text)} />
              </View>
              <Text>분 후</Text>
            </View>
          </View>
          <View style={s.inputContainer}>
            <Text style={s.label}>장소</Text>
            <View style={s.input}>
              <Text style={s.locText}>{route.params?.place}</Text>
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
