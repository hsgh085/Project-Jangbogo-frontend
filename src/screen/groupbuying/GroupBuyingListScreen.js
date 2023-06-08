import { Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useCallback, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../../../assets/colors/colors";
import banner from "../../../assets/images/GroupBuyingBanner.png";
import HeaderMain from "../../components/HeaderMain";
import SingleLineInput from "../../components/SingleLineInput";

const GroupBuyingListScreen = () => {
  const [data, setData] = useState([
    { id: 0, name: "너구리 2+1", currPeople: 1, people: 3, endTime: "2023-06-12" },
    { id: 1, name: "세제 공구해여", currPeople: 1, people: 3, endTime: "2023-06-12" },
    { id: 2, name: "롤휴지 한박스 공구", currPeople: 1, people: 3, endTime: "2023-06-12" },
    { id: 3, name: "test3", currPeople: 1, people: 3, endTime: "2023-06-12" },
    { id: 4, name: "test4", currPeople: 1, people: 3, endTime: "2023-06-12" },
    { id: 5, name: "test5", currPeople: 1, people: 3, endTime: "2023-06-12" },
    { id: 6, name: "test6", currPeople: 1, people: 3, endTime: "2023-06-12" },
    { id: 7, name: "test7", currPeople: 1, people: 3, endTime: "2023-06-12" },
    { id: 8, name: "test8", currPeople: 1, people: 3, endTime: "2023-06-12" },
    { id: 9, name: "test9", currPeople: 1, people: 3, endTime: "2023-06-12" },
  ]);
  const handleClickPost = () => {};
  const handleClickDetail = useCallback((item) => {});
  return (
    <>
      <View style={s.container}>
        <View style={s.header}>
          <HeaderMain>
            <Text style={s.headerText}>공동구매</Text>
            <View>
              <Text>동네위치</Text>
              <View style={s.locationContainer}>
                <Text style={s.locationText}>서울 영등포구</Text>
                <MaterialIcons name="location-on" size={20} color={colors.greenH} />
              </View>
            </View>
          </HeaderMain>
          <View style={s.searchContainer}>
            <Feather name="search" size={20} color="black" />
            <SingleLineInput placeholder="상품명을 입력해주세요." />
          </View>
        </View>
        <View>
          <Image source={banner} />
          <Text style={s.bannerText1}>이웃주민들과</Text>
          <Text style={s.bannerText2}>공동구매를 통해</Text>
          <Text style={s.bannerText3}>비용 절감!</Text>
          <Text style={s.bannerText4}>자원 절약!</Text>
        </View>
        <View style={s.mainContainer}>
          <Pressable onPress={handleClickPost} style={s.btnSave}>
            <MaterialCommunityIcons name="pencil" size={24} color={colors.white} />
            <Text style={s.textSave}>등록하기</Text>
          </Pressable>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({ item }) => {
              return (
                  <View style={s.listContainer}>
                    <Text>{item.name}</Text>
                    <View>
                      <View>
                        <Text>공동구매인원</Text>
                      </View>
                      <View>
                        <Text>마감까지</Text>
                      </View>
                    </View>
                    <Pressable onPress={() => handleClickDetail(item)}>
                      <Text>상세보기</Text>
                    </Pressable>
                  </View>
              );
            }}
          />
        </View>
      </View>
    </>
  );
};

export default GroupBuyingListScreen;

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    alignItems: "center",
  },
  headerText: {
    flex: 1,
    fontSize: 30,
    fontWeight: 800,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
    backgroundColor: colors.grayLL,
    borderRadius: 10,
    width: "90%",
  },
  locationContainer: {
    flexDirection: "row",
  },
  locationText: {
    fontWeight: "bold",
  },
  bannerText1: {
    position: "absolute",
    top: 30,
    left: 180,
    fontSize: 13,
  },
  bannerText2: {
    position: "absolute",
    top: 50,
    left: 200,
    fontSize: 13,
  },
  bannerText3: {
    position: "absolute",
    top: 90,
    left: 200,
    fontSize: 25,
    fontWeight: 500,
  },
  bannerText4: {
    position: "absolute",
    top: 120,
    left: 230,
    fontSize: 25,
    fontWeight: 500,
  },
  btnSave: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 5,
    borderRadius: 50,
    backgroundColor: colors.greenH,
  },
  textSave: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
  },
  mainContainer: {
    flex:1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginBottom: 90,
  },
  listContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLL,
    // width:"100%", 상세보기 text가 보이지 않음.
  },
});
