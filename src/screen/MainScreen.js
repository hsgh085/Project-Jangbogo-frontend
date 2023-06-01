import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import colors from "../../assets/colors/colors";
import banner1 from "../../assets/images/Banner1.png";
import exp from "../../assets/images/ButtonExp.png";
import gb from "../../assets/images/ButtonGB.png";
import memo from "../../assets/images/ButtonMemo.png";
import ripe from "../../assets/images/ButtonRipe.png";
import theme from "../../assets/images/ButtonTheme.png";
import ButtonMain from "../components/ButtonMain";
import HeaderMain from "../components/HeaderMain";
const { width } = Dimensions.get("window");
const MainScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={s.container}>
      <HeaderMain>
        <Text>메인로고</Text>
      </HeaderMain>
      <View>
        <Image source={banner1} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={s.categoryContainer}
      >
        <Text>카테고리</Text>
        <View style={s.categoryInner1}>
          <ButtonMain
            source={memo}
            text="장보기 메모"
            onPress={() => {
              navigation.navigate("MainStack",{ screen: "MemoList" });
            }}
          />
          <ButtonMain
            source={exp}
            text="지출내역"
            onPress={() => {
              navigation.navigate("MainStack", { screen: "Expenditure" });
            }}
          />
          <ButtonMain source={theme} text=" 테마별장보기" onPress={() => {}} />
        </View>
        <View style={s.categoryInner2}>
          <ButtonMain source={memo} text="장보기 메모" onPress={() => {}} />
          <ButtonMain source={memo} text="장보기 메모" onPress={() => {}} />
          <ButtonMain
            source={ripe}
            text="후숙도예측"
            onPress={() => {
              navigation.navigate("MainStack", { screen: "Ripeness" });
            }}
          />
        </View>
        <Image source={gb} style={{ marginBottom: 140 }}></Image>
      </ScrollView>
    </View>
  );
};

export default MainScreen;

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  categoryContainer: {
    padding: 20,
  },
  categoryInner1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  categoryInner2: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});
