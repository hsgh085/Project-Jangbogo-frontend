import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../../assets/colors/colors";
import Header from "../../components/Header/Header";
import { ROOT_API } from "../../constants/api";
import { TokenContext } from "../../contexts/TokenContext";
import * as WebBrowser from "expo-web-browser";
import { Pressable } from 'react-native';

const GroupBuyingDetailScreen = () => {
  const [token, setToken] = useContext(TokenContext);
  const isFocused = useIsFocused();
  const route = useRoute();
  const id = route.params?.id;
  const type = route.params?.type;
  const navigation = useNavigation();
  const [gb, setGB] = useState({});
  const openWebPage = async () => {
    try {
      await WebBrowser.openBrowserAsync(gb.kakaoadd);
      // 성공적으로 링크를 열었을 때 수행할 작업
    } catch (error) {
      // 잘못된 링크에 대한 에러 처리
      Alert.alert("", "올바르지 않은 링크입니다🥲", [
        {
          text: "확인",
        },
      ]);
    }
  };
  const toast = (message) => {
    Alert.alert("", `${message}`, [
      {
        text: "확인",
      },
    ]);
  };
  const handleClickParticipate = () => {
    fetch(`${ROOT_API}/grouppurchase/participategp?gpId=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        Alert.alert("참여완료", "공동구매 인원 모집이 마감되면 알람을 통해 알려드릴께요😊", [
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
  };
  const handleClickCancle = () => {
    fetch(`${ROOT_API}/grouppurchase/dparticipategp?gpId=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        Alert.alert("", "참여를 취소하셨습니다😢", [
          {
            text: "확인",
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleClickDelete = () => {
    fetch(`${ROOT_API}/grouppurchase/deletegp?gpId=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        toast("공동구매 글이 성공적으로 삭제되었습니다😊");
        navigation.navigate("GBList");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (type === "alarm") {
      fetch(`${ROOT_API}/notice/noticeitem?gpId=${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setGB(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      fetch(`${ROOT_API}/grouppurchase/gpitem?gpId=${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setGB(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isFocused]);
  return (
    <>
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <Header>
          <Header.Title size={18}>공동구매 상세보기</Header.Title>
          <View />
        </Header>
        <View style={s.container}>
          <View style={s.creatorInform}>
            <View style={s.creatorInformTextLine}>
              <Text style={{ flex: 1 }}>작성자</Text>
              <Text>{gb.nickname}</Text>
            </View>
            <View style={s.creatorInformTextLine}>
              <Text style={{ flex: 1 }}>등급</Text>
              <Text>{gb.grade}</Text>
            </View>
          </View>
          <View style={s.cardContainer}>
            <View style={s.titleContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Text style={s.title}>{gb.name}</Text>
              </ScrollView>
            </View>
            <View>
              {(type === "alarm"||type==="done") && (
                <Pressable onPress={openWebPage}>
                  <View style={{flexDirection:"row"}}>
                  <Ionicons name="chatbubble-sharp" size={20} color={colors.greenLL} />
                    <Text style={[s.informText, {color:colors.greenLL}]}>카카오톡 오픈채팅 링크 바로가기</Text>
                  </View>
                  <Text style={[s.informText, {marginLeft:27, marginBottom:10, color:colors.greenLL}]}>{gb.kakaoadd}</Text>
                </Pressable>
              )}
              <View style={s.inform}>
                <Ionicons name="person" size={20} color={colors.white} />
                <Text style={s.informText}>공동구매 인원</Text>
                <Text style={s.informText}>{gb.participantCount}</Text>
                <Text style={s.informText}>/</Text>
                <Text style={s.informText}>{gb.peoplenum}</Text>
              </View>
              <View style={s.inform}>
                <MaterialCommunityIcons name="clock" size={20} color={colors.white} />
                <Text style={s.informText}>종료시각</Text>
                <Text style={s.informText}>{gb.endTime}</Text>
              </View>
              <View style={s.inform}>
                <MaterialIcons name="location-on" size={20} color={colors.white} />
                <Text style={s.informText}>{gb.place}</Text>
              </View>
              <View style={s.detail}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Text>{gb.content === "" ? "상세 내용이 없습니다." : gb.content}</Text>
                </ScrollView>
              </View>
              {type === undefined && gb.authorization === null && (
                <TouchableOpacity style={s.btnContainer} onPress={handleClickParticipate}>
                  <Text>참여하기</Text>
                </TouchableOpacity>
              )}
              {type === undefined && gb.authorization === 0 && (
                <>
                  <TouchableOpacity
                    style={s.btnContainer}
                    onPress={() => {
                      navigation.navigate("GBPost", { type: "update", gb: gb });
                    }}
                  >
                    <Text>수정하기</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ ...s.btnContainer, backgroundColor: colors.red }} onPress={handleClickDelete}>
                    <Text style={{ color: colors.white }}>삭제하기</Text>
                  </TouchableOpacity>
                </>
              )}
              {type === undefined && gb.authorization === 1 && (
                <TouchableOpacity style={s.btnContainer} onPress={handleClickCancle}>
                  <Text>참여취소</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default GroupBuyingDetailScreen;

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingBottom: 110,
  },
  cardContainer: {
    padding: 20,
    position: "absolute",
    top: 0,
    bottom: 30,
    left: 20,
    right: 20,
    height: 450,
    backgroundColor: colors.green,
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
        elevation: 3,
      },
    }),
  },
  creatorInform: {
    flex: 1,
    paddingTop: 470,
    paddingHorizontal: 20,
    backgroundColor: colors.grayLL,
    borderRadius: 20,
  },
  titleContainer: {
    marginTop: 10,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    color: colors.white,
  },
  inform: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  informText: {
    color: colors.white,
    marginLeft: 5,
  },
  detail: {
    padding: 20,
    marginBottom: 20,
    backgroundColor: colors.grayLL,
    borderRadius: 15,
    height: 150,
  },
  btnContainer: {
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: colors.greenH,
    padding: 5,
    borderRadius: 20,
  },
  creatorInformTextLine: {
    flexDirection: "row",
    marginBottom: 15,
  },
});
