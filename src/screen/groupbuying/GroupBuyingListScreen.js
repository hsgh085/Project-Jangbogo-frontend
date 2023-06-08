import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import colors from "../../../assets/colors/colors";
import HeaderMain from "../../components/HeaderMain";
import SingleLineInput from "../../components/SingleLineInput";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import banner from "../../../assets/images/GroupBuyingBanner.png";

const GroupBuyingListScreen = () => {
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
          <View>
            <Image source={banner} />
            <Text style={s.bannerText1}>이웃주민들과</Text>
            <Text style={s.bannerText2}>공동구매를 통해</Text>
            <Text style={s.bannerText3}>비용 절감!</Text>
            <Text style={s.bannerText4}>자원 절약!</Text>
          </View>
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
});
