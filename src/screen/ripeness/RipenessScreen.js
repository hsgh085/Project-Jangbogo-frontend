import React, { useState } from "react";
import { TouchableOpacity, Modal, Text, View, ScrollView, Pressable, Image, StyleSheet, Dimensions } from "react-native";
import HeaderMain from "../../components/HeaderMain";
import colors from "../../../assets/colors/colors";
import { AntDesign } from "@expo/vector-icons";
import fruit1 from "../../../assets/images/SelectFruit1.png";
import fruit2 from "../../../assets/images/SelectFruit2.png";
import fruit3 from "../../../assets/images/SelectFruit3.png";
import fruit4 from "../../../assets/images/SelectFruit4.png";

const RipenessScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const handleClick = () => {
    setModalVisible(true);
  };

  return (
    <>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={s.modalContainer}>
          <TouchableOpacity style={s.modalButton}>
            <Text style={s.modalButtonText}>사진 촬영하기</Text>
            <View style={s.underline} />
          </TouchableOpacity>
          <TouchableOpacity style={s.modalButton}>
            <Text style={s.modalButtonText}>갤러리에서 이미지 가져오기</Text>
            <View style={s.underline} />
          </TouchableOpacity>
          <TouchableOpacity style={s.modalButton} onPress={() => setModalVisible(false)}>
            <Text style={s.modalButtonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
          <View>
            <Image source={fruit4} style={s.image} />
            <Text
              style={{
                position: "absolute",
                top: 34,
                left: 25,
                fontSize: 20,
                fontWeight: 800,
              }}
            >
              토마토
            </Text>
          </View>
          <View>
            <Image source={fruit2} style={s.image} />
            <Text
              style={{
                position: "absolute",
                top: 34,
                left: 25,
                fontSize: 20,
                fontWeight: 800,
              }}
            >
              망고
            </Text>
          </View>
          <View>
            <Image source={fruit3} style={s.image} />
            <Text
              style={{
                position: "absolute",
                top: 34,
                left: 25,
                fontSize: 20,
                fontWeight: 800,
              }}
            >
              바나나
            </Text>
          </View>
          <Pressable onPress={handleClick}>
            <Image source={fruit1} style={s.image} />
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
          <Text style={s.noticeText}>해당 과일이 아닐 경우, 잘못된 결과가 추출되니 주의하시길 바랍니다.</Text>
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
    marginBottom: 90,
    backgroundColor: colors.white,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  noticeText: {
    // paddingVertical: 30,
    paddingHorizontal: 30,
    color: colors.gray,
    fontSize: 13,
  },
  image: {
    marginBottom: 15,
  },
  modalContainer: {
    height: "22%",
    width: "100%",
    backgroundColor: colors.green,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    position: "absolute",
    bottom: 0,
  },
  modalButton: {
    marginHorizontal: 20,
    paddingTop: 20,
  },
  modalButtonText: {
    marginBottom:10,
    color: colors.white,
    fontSize: 17,
    textAlign: "center",
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: colors.grayL,
  },
});
