import React from "react";
import { Alert, TouchableOpacity, ScrollView, StyleSheet, View, Text } from "react-native";
import colors from "../../../assets/colors/colors";
import Header from "../../components/Header/Header";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const GroupBuyingDetailScreen = () => {
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
              <Text style={{flex:1}}>작성자</Text>
              <Text>heehee</Text>
            </View>
            <View style={s.creatorInformTextLine}>
              <Text style={{flex:1}}>등급</Text>
              <Text>브론즈</Text>
            </View>
          </View>
          <View style={s.cardContainer}>
            <View style={s.titleContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Text style={s.title}>너구리 2+1</Text>
              </ScrollView>
            </View>
            <View>
              <View style={s.inform}>
                <Ionicons name="person" size={20} color={colors.white} />
                <Text style={s.informText}>공동구매 인원</Text>
                <Text style={s.informText}>1</Text>
                <Text style={s.informText}>/</Text>
                <Text style={s.informText}>3</Text>
              </View>
              <View style={s.inform}>
                <MaterialCommunityIcons name="clock" size={20} color={colors.white} />
                <Text style={s.informText}>종료시각</Text>
                <Text style={s.informText}>2023.02.24 06:05PM</Text>
              </View>
              <View style={s.inform}>
                <MaterialIcons name="location-on" size={20} color={colors.white} />
                <Text style={s.informText}>서울 영등포구</Text>
              </View>
              <View style={s.detail}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Text>
                    gs 슈퍼 00점 너구리 2+1 같이 공구해요! 슈퍼앞에서 만나서 분배했으면 좋겠어요 gs 슈퍼 00점 너구리 2+1 같이 공구해요! 슈퍼앞에서
                    만나서 분배했으면 좋겠어요 gs 슈퍼 00점 너구리 2+1 같이 공구해요! 슈퍼앞에서 만나서 분배했으면 좋겠어요 gs 슈퍼 00점 너구리 2+1
                    같이 공구해요! 슈퍼앞에서 만나서 분배했으면 좋겠어요 gs 슈퍼 00점 너구리 2+1 같이 공구해요! 슈퍼앞에서 만나서 분배했으면 좋겠어요
                    gs 슈퍼 00점 너구리 2+1 같이 공구해요! 슈퍼앞에서 만나서 분배했으면 좋겠어요
                  </Text>
                </ScrollView>
              </View>
              <TouchableOpacity style={s.btnContainer} onPress={handleClickParticipate}>
                <Text>참여신청</Text>
              </TouchableOpacity>
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
    backgroundColor: colors.grayLL,
    borderRadius: 15,
    height: 150,
  },
  btnContainer: {
    alignItems: "center",
    marginTop: 20,
    backgroundColor: colors.greenH,
    padding: 5,
    borderRadius: 20,
  },
  creatorInformTextLine:{
    flexDirection: "row",
    marginBottom: 15,
  },
});
