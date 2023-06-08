import React from "react";
import { Text, View, StyleSheet } from "react-native";
import colors from "../../../assets/colors/colors";
import HeaderMain from "../../components/HeaderMain";
import SingleLineInput from "../../components/SingleLineInput";
import { Feather, MaterialIcons } from "@expo/vector-icons";

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
    flex:1,
    fontSize: 30,
    fontWeight: 800,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
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
});
