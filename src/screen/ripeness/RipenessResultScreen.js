import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import HeaderMain from "../../components/HeaderMain";
import colors from "../../../assets/colors/colors";
import { useRoute } from "@react-navigation/native";

const RipenessResultScreen = () => {
  const route = useRoute();
  const imageUri = route.params?.imageUri;
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
        <View style={s.imageContainer}>{imageUri && <Image source={{ uri: imageUri }} style={s.image} />}</View>
        <Text style={s.text}>아보카도의 후숙도는</Text>
        <View style={s.textRackContainer}>
          <Text style={s.textRank}>A등급 </Text>
          <Text style={s.text}>입니다.</Text>
        </View>
      </View>
    </>
  );
};

export default RipenessResultScreen;

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
    alignItems: "center",
    padding: 20,
    paddingTop: 0,
    backgroundColor: colors.white,
  },
  imageContainer: {
    marginTop: 50,
    marginBottom: 50,
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  textRackContainer:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  textRank:{
    fontSize: 30,
    color: colors.red,
  },
  text:{
    fontSize: 20,
  }
});
