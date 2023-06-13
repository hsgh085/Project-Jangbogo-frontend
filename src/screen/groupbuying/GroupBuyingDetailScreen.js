import React from "react";
import { View, Text } from "react-native";
import colors from "../../../assets/colors/colors";
import Header from "../../components/Header/Header";

const GroupBuyingDetailScreen = () => {
  return (
    <>
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <Header>
          <Header.Title size={18}>공동구매 상세보기</Header.Title>
        </Header>
        <Text>GroupBuyingDetailScreen</Text>
      </View>
    </>
  );
};

export default GroupBuyingDetailScreen;
