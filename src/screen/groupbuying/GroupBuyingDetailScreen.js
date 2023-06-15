import React, { useEffect, useState } from "react";
import { Alert, TouchableOpacity, ScrollView, StyleSheet, View, Text } from "react-native";
import colors from "../../../assets/colors/colors";
import Header from "../../components/Header/Header";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ROOT_API, TOKEN } from "../../constants/api";

const GroupBuyingDetailScreen = () => {
  const route = useRoute();
  const id = route.params?.id;
  const navigation=useNavigation();
  const [gb, setGB] = useState({});
  const toast = (message) => {
    Alert.alert("", `${message}`, [
      {
        text: "확인",
      },
    ]);
  };
  const handleClickParticipate = () => {
    toast("참여되었습니다😊");
  };
  useEffect(() => {
    fetch(`${ROOT_API}/grouppurchase/gpitem?gpId=${id}`, {
      method: "GET",
      headers: {
        //TODO: 테스트 끝낸 후 token으로 바꾸기
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setGB(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
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
              {gb.authorization === null && (
                <TouchableOpacity style={s.btnContainer} onPress={handleClickParticipate}>
                  <Text>참여신청</Text>
                </TouchableOpacity>
              )}
              {gb.authorization === 0 && (
                <>
                  <TouchableOpacity style={s.btnContainer} onPress={()=>{navigation.navigate("GBPost", {type:'update',place:gb.place})}}>
                    <Text>수정하기</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ ...s.btnContainer, backgroundColor: colors.red }} onPress={handleClickParticipate}>
                    <Text style={{ color: colors.white }}>삭제하기</Text>
                  </TouchableOpacity>
                </>
              )}
              {gb.authorization === 1 &&(
                <TouchableOpacity style={s.btnContainer} onPress={handleClickParticipate}>
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
