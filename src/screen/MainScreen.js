import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "../../assets/colors/colors";
import banner1 from "../../assets/images/Banner1.png";
import exp from "../../assets/images/ButtonExp.png";
import gb from "../../assets/images/ButtonGB.png";
import memo from "../../assets/images/ButtonMemo.png";
import ripe from "../../assets/images/ButtonRipe.png";
import theme from "../../assets/images/ButtonTheme.png";
import price from "../../assets/images/ButtonPrice.png";
import ref from "../../assets/images/ButtonRef.png";
import icon from "../../assets/icon.png"
import ButtonMain from "../components/ButtonMain";
import HeaderMain from "../components/HeaderMain";
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
const { width } = Dimensions.get("window");

const MainScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={s.container}>
      <SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <View style={{ paddingTop: insets.top }}>
          <View
            style={{
              width: width,
              flexDirection: "row",
              alignItems: "center",
              padding:10,
            }}
          >
            <Image source={icon} style={s.icon}/>
            <Text style={s.logoText}>장보고</Text>
          </View>
        </View>
      )}
    </SafeAreaInsetsContext.Consumer>
      <View>
        <Image source={banner1} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={s.categoryContainer}>
        <Text>카테고리</Text>
        <View style={s.categoryInner1}>
          <ButtonMain
            source={memo}
            text="장보기 메모"
            onPress={() => {
              navigation.navigate("MainStack", { screen: "MemoList" });
            }}
          />
          <ButtonMain
            source={exp}
            text="지출내역"
            onPress={() => {
              navigation.navigate("MainStack", { screen: "Expenditure" });
            }}
          />
          <ButtonMain source={theme} text=" 테마별장보기" onPress={()=>{navigation.navigate("Sign", { screen: "Onboarding" });}} />
        </View>
        <View style={s.categoryInner2}>
          <ButtonMain source={ref} text="나의 냉장고" onPress={() => {navigation.navigate("Refrigerator")}} />
          <ButtonMain source={price} text="가격예측" onPress={() => {navigation.navigate("MainStack", { screen: "Prediction" });}} />
          <ButtonMain
            source={ripe}
            text="후숙도예측"
            onPress={() => {
              navigation.navigate("MainStack", { screen: "RipenessStack" });
            }}
          />
        </View>
        <Pressable onPress={() => navigation.navigate("MainStack", { screen: "GroupBuyingStack" })}>
          <Image source={gb} style={{ marginBottom: 140 }}></Image>
          <Text style={s.bannerGBText1}>공동구매</Text>
          <Text style={s.bannerGBText2}>참여하기</Text>
          <Text style={s.bannerGBText3}>확인하러가기</Text>
        </Pressable>
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
  icon:{
    width:40,
    height:40,
    borderRadius:20,
  },
  logoText:{
    marginLeft:5,
    fontSize:25,
    fontWeight:"900",
    color:colors.green
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
  bannerGBText1:{
    position: "absolute",
    top: 25,
    left: 20,
    fontSize: 30,
    fontWeight: "bold",
  },
  bannerGBText2:{
    position: "absolute",
    top: 65,
    left: 20,
    fontSize: 30,
    fontWeight: "bold",
  },
  bannerGBText3:{
    position: "absolute",
    top: 68,
    left: 180,
    fontSize: 20,
  }
});
