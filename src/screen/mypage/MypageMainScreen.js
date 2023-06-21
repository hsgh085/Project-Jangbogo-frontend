import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, Pressable, View, Text } from "react-native";
import Header from "../../components/Header/Header";
import colors from "../../../assets/colors/colors";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { TokenContext } from "../../contexts/TokenContext";
import * as SecureStore from "expo-secure-store";
import { ROOT_API } from "../../constants/api";

const MypageMainScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [token, setToken] = useContext(TokenContext);
  const [userInfo, setUserInfo] = useState({});
  const calcRankText = () => {
    if (userInfo.grade === 0) return "브론즈";
    else if (userInfo.grade === 1) return "실버";
    else if (userInfo.grade === 2) return "골드";
  };
  const calcRankColor = () => {
    if (userInfo.grade === 0) return colors.bronze;
    else if (userInfo.grade === 1) return colors.silver;
    else if (userInfo.grade === 2) return colors.gold;
  };
  const handleClickLogout = () => {
    Alert.alert(
      "주의",
      "로그아웃 하시겠습니까?",
      [
        {
          text: "예",
          // 토큰 삭제
          onPress: async () => {
            console.log(token);
            await SecureStore.deleteItemAsync("token")
              .then(() => {
                setToken(null);
              })
              .then(
                fetch(`${ROOT_API}/auth/signout`, {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
                  .then(() => {
                    Alert.alert("", "로그아웃 되었습니다😊", [
                      {
                        text: "확인",
                        onPress: () => {
                          navigation.navigate("Onboarding");
                        },
                      },
                    ]);
                  })
                  .catch((err) => {
                    console.log(err);
                  })
              );
          },
        },
        {
          text: "아니오",
          style: "cancle",
        },
      ],
      { cancelable: false }
    );
  };
  const handleClickWithdrawal = () => {
    Alert.alert(
      "주의",
      "정말로 회원탈퇴를 하시겠습니까? 정보는 복구되지 않습니다.",
      [
        {
          text: "예",
          // 토큰 삭제
          onPress: async () => {
            console.log(token);
            await SecureStore.deleteItemAsync("token")
              .then(() => {
                setToken(null);
              })
              .then(
                fetch(`${ROOT_API}/auth/deleteauth`, {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
                  .then(() => {
                    Alert.alert("", "탈퇴되었습니다. 그동안 앱을 이용해주셔서 감사합니다😊", [
                      {
                        text: "확인",
                        onPress: () => {
                          navigation.navigate("Onboarding");
                        },
                      },
                    ]);
                  })
                  .catch((err) => {
                    console.log(err);
                  })
              );
          },
        },
        {
          text: "아니오",
          style: "cancle",
        },
      ],
      { cancelable: false }
    );
  };
  useEffect(() => {
    fetch(`${ROOT_API}/mypage/info`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isFocused]);
  return (
    <>
      <View style={s.headerContainer}>
        <Header>
          <Header.Title size={18} color={colors.white}>
            마이페이지
          </Header.Title>
          <View />
        </Header>
        <View style={s.userContainer}>
          <Text style={s.text1}>안녕하세요</Text>
          <View style={s.userInfo}>
            <View style={{ flexDirection: "row" }}>
              <Text style={s.text1}>{userInfo.nickname}</Text>
              <Text style={s.text1}>님</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ marginRight: 20 }}>등급</Text>
              <Text style={{ marginRight: 5 }}>{calcRankText()}</Text>
              <Ionicons name="ribbon" size={20} color={calcRankColor()} />
            </View>
          </View>
        </View>
      </View>
      <View style={s.mainContainer}>
        <Pressable onPress={handleClickLogout}>
          <Text style={s.text2}>로그아웃</Text>
        </Pressable>
        <Pressable onPress={handleClickWithdrawal}>
          <Text style={s.text2}>회원탈퇴</Text>
        </Pressable>
      </View>
      <View style={s.btnContainer}>
        <Pressable style={s.btn}>
          <Ionicons name="person-outline" size={35} color="black" />
          <Text style={{ marginTop: 5 }}>내 정보 수정</Text>
        </Pressable>
        <Pressable
          style={s.btn}
          onPress={() => {
            navigation.navigate("MypageGB");
          }}
        >
          <Ionicons name="md-document-text-outline" size={35} color="black" />
          <Text style={{ marginTop: 5 }}>공동구매 확인</Text>
        </Pressable>
        <Pressable
          style={s.btn}
          onPress={() => {
            navigation.navigate("MypageAsk");
          }}
        >
          <AntDesign name="questioncircleo" size={35} color="black" />
          <Text style={{ marginTop: 5 }}>문의</Text>
        </Pressable>
      </View>
    </>
  );
};

export default MypageMainScreen;

const s = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.greenH,
    paddingBottom: 50,
  },
  userContainer: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text1: {
    fontSize: 20,
  },
  btnContainer: {
    position: "absolute",
    top: 190,
    left: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 30,
    width: "90%",
    backgroundColor: colors.white,
    borderRadius: 20,
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
        elevation: 1,
      },
    }),
  },
  mainContainer: {
    flex: 1,
    paddingTop: 80,
    alignItems: "center",
    backgroundColor: colors.white,
  },
  btn: {
    alignItems: "center",
  },
  text2: {
    margin: 10,
    color: colors.gray,
    fontWeight: "500",
  },
});
