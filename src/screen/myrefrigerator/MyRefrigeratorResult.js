import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyRefrigeratorResult = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // 앞서 넘어온 파라미터에 접근
  const { productName, manufacturer, productType, expirationDate } = route.params;

  return (
    <View>
      {/* 헤더 */}
      <Header>
        <Header.Title size={18}>상품 추가</Header.Title>
        <View></View>
      </Header>
      <View>
        <Text style={styles.h1}>바코드 정보</Text>
        <Text style={styles.modalText}>제품명: {productName}</Text>
        <Text style={styles.modalText}>제조사명: {manufacturer}</Text>
        <Text style={styles.modalText}>식품 유형: {productType}</Text>
        <Text style={styles.modalText}>유통/소비기한: {expirationDate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 100,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default MyRefrigeratorResult;
