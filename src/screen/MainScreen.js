import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Alert, BackHandler, Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import colors from "../../assets/colors/colors";
import icon from "../../assets/icon.png";
import banner1 from "../../assets/images/Banner1.png";
import banner2 from "../../assets/images/Banner2.png";
import banner3 from "../../assets/images/Banner3.png";
import exp from "../../assets/images/ButtonExp.png";
import gb from "../../assets/images/ButtonGB.png";
import memo from "../../assets/images/ButtonMemo.png";
import price from "../../assets/images/ButtonPrice.png";
import ref from "../../assets/images/ButtonRef.png";
import ripe from "../../assets/images/ButtonRipe.png";
import theme from "../../assets/images/ButtonTheme.png";
import ButtonMain from "../components/ButtonMain";

const { width } = Dimensions.get("window");

const MainScreen = () => {
  const navigation = useNavigation();
  const bannerLists = [
    { id: 0, src: banner1 },
    { id: 1, src: banner2 },
    { id: 2, src: banner3 },
  ];
  useEffect(()=>{
    const backAction=()=>{
      Alert.alert(
        '종료',
        '앱을 종료하시겠습니까?',
        [
          {
            text: '아니오',
            style: 'cancel',
          },
          {
            text: '예',
            onPress: () => {
              // 예를 선택한 경우 앱 종료
              BackHandler.exitApp();
            },
          },
        ],
        { cancelable: false }
      );
      return true; // 이벤트 처리 완료를 알림
    };

    // 뒤로 가기 이벤트 리스너 등록
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
      backHandler.remove();
    };
  }, []);

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
                padding: 10,
              }}
            >
              <Image source={icon} style={s.icon} />
              <Text style={s.logoText}>장보고</Text>
            </View>
          </View>
        )}
      </SafeAreaInsetsContext.Consumer>
      <View style={{ flex: 0.35 }}>
        <Swiper autoplay showsPagination={true} autoplayTimeout={5} activeDotColor={colors.greenH} dotColor={colors.grayL}>
          {bannerLists.map((banner) => {
            return <Image key={banner.id} source={banner.src} />;
          })}
        </Swiper>
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
          <ButtonMain
            source={theme}
            text=" 테마별장보기"
            onPress={() => {
              navigation.navigate("MainStack", { screen: "Theme"});
              // navigation.navigate("Sign", { screen: "Onboarding" });
            }}
          />
        </View>
        <View style={s.categoryInner2}>
          <ButtonMain
            source={ref}
            text="나의 냉장고"
            onPress={() => {
              navigation.navigate("Refrigerator");
            }}
          />
          <ButtonMain
            source={price}
            text="가격예측"
            onPress={() => {
              navigation.navigate("MainStack", { screen: "Prediction" });
            }}
          />
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
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  logoText: {
    marginLeft: 5,
    fontSize: 25,
    fontWeight: "900",
    color: colors.green,
  },
  categoryContainer: {
    flex: 4,
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
  bannerGBText1: {
    position: "absolute",
    top: 25,
    left: 20,
    fontSize: 30,
    fontWeight: "bold",
  },
  bannerGBText2: {
    position: "absolute",
    top: 65,
    left: 20,
    fontSize: 30,
    fontWeight: "bold",
  },
  bannerGBText3: {
    position: "absolute",
    top: 68,
    left: 180,
    fontSize: 20,
  },
});
