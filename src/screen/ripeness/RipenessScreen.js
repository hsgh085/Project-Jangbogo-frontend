import React from "react";
import {
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import HeaderMain from "../../components/HeaderMain";
import colors from "../../../assets/colors/colors";
import { AntDesign } from "@expo/vector-icons";
import fruit1 from "../../../assets/images/SelectFruit1.png";
const RipenessScreen = () => {
  // const {status, requestPermission}= ImagePicker.useCameraPermissions();
  const handleClick = () => {};
  // const getPermission=async()=>{
  //   if(Platform.OS!=='web'){
  //       const {status}=await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //   }
  // }
  return (
    <>
      <View style={s.title}>
        <HeaderMain style={{ flexDirection: "column" }}>
          <View>
            <Text style={s.titleText}>후숙도</Text>
            <Text style={s.titleText}>예측</Text>
          </View>
          <View />
        </HeaderMain>
      </View>
      <View style={s.container}>
        <View style={s.textContainer}>
          <Text style={{ fontSize: 18, marginRight: 5 }}>품목 종류 선택</Text>
          <AntDesign name="checksquare" size={22} color={colors.greenH} />
        </View>
        <ScrollView>
          <Pressable onPress={handleClick}>
            <Image source={fruit1} />
            <Text
              style={{
                position: "absolute",
                top: 34,
                left: 25,
                fontSize: 20,
                fontWeight: 800,
              }}
            >
              아보카도
            </Text>
          </Pressable>
          <Text style={s.noticeText}>
            해당 과일이 아닐 경우, 잘못된 결과가 추출되니 주의하시길 바랍니다.
          </Text>
        </ScrollView>
      </View>
    </>
  );
};

export default RipenessScreen;

const s = StyleSheet.create({
  title: {
    backgroundColor: colors.white,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 800,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
    backgroundColor: colors.white,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  noticeText: {
    paddingVertical: 30,
    paddingHorizontal: 30,
    color: colors.gray,
    fontSize: 13,
  },
});
