import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  View, Text, Button, StyleSheet,
  TextInput, Image, Pressable
} from 'react-native';

import Header from '../../components/Header/Header';
import DateTimePicker from '@react-native-community/datetimepicker';

import defaultImg from '../../../assets/images/productImg.png';
import datepicker from '../../../assets/images/calender_green.png';

const MyRefrigeratorResult = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // 테스트용
  const barcode = '8801115114130';
  // const productName = '서울우유500';
  const manufacturer = '서울우유협동조합 안산공장공장장은 강 공장장이고 된장공장 어쩌구는 공장장';
  const productType = '우유';
  const expirationDate = '냉장(0~10℃) 12일';

  // 앞서 넘어온 파라미터
  // 바코드, 제품명, 제조사명, 식품유형, 유통/소비기한
  // const { barcode, productName, manufacturer, productType, expirationDate } = route.params;

  const [productName, onChangeProductName] = React.useState('서울우유500');


  // 제조일자를 저장할 state
  const [manufactureDate, setManufactureDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [buttonTitle, setButtonTitle] = useState(manufactureDate.toISOString().split('T')[0]);


  const onChangeManufactureDate = (event, selectedDate) => {
    const currentDate = selectedDate || manufactureDate;
    setShowDatePicker(false);
    setManufactureDate(currentDate);
    setButtonTitle(currentDate.toISOString().split('T')[0]);
  };

  return (
    <View>
      {/* 헤더 */}
      <Header>
        <Header.Title size={18}>상품 추가</Header.Title>
        <View></View>
      </Header>
      <View style={styles.container}>
        {/* 넘어온 제품정보 */}
        <View style={styles.productContainer}>
          {/* 제품 이미지 */}
          <View style={styles.productImg}>
            <Pressable
              onPress={() => { }}>
              <Image source={defaultImg} />
            </Pressable>
          </View>
          {/* 제품 기본정보 */}
          <View style={styles.productInfo}>
            {/* 바코드 */}
            <View style={styles.barcode}>
              <Text>{barcode}</Text>
            </View>
            {/* 제조사명 */}
            <Text style={styles.modalText}>제조사명: {manufacturer}</Text>
            <View style={styles.productName}>
              <TextInput style={styles.h3}
                onChangeText={onChangeProductName}
                value={productName}
              />
            </View>
          </View>
        </View>
        <View>
          <View>
            <Text style={styles.modalText}>유통/소비기한 정보</Text>
            <Text style={styles.productName}>{expirationDate}</Text>
          </View>
        </View>
        {/* 유통기한 선택 버튼 */}
        <Text style={styles.modalText}>유통기한 입력</Text>
        <View style={styles.buttonWithImg}>
          <Image
            source={datepicker}
            style={styles.buttonImg}
          />
          <Button title={buttonTitle} onPress={() => setShowDatePicker(true)} />
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={manufactureDate}
            mode="date"
            onChange={onChangeManufactureDate}
            display="spinner"
            textColor='black'
          />
        )}
        <Text style={styles.modalText}>식품 유형: {productType}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
  },
  productContainer: {
    flexDirection: 'row',
    marginTop: 5,
    // borderColor: "black",
    // borderWidth: 1,
  },
  productImg: {
    alignContent: 'center',
    justifyContent: 'center',
    marginRight: 30,
  },
  productInfo: {
    flexShrink: 1,
    paddingRight: 5,
  },
  barcode: {
    borderColor: "black",
    borderWidth: 1,
    paddingHorizontal: 2,
    paddingVertical: 2,
    marginBottom: 4,
  },
  productName: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "white",
    borderRadius: 12,
    fontSize: 20,
    marginBottom: 4,
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 100,
  },
  h3: {
    fontSize: 18,
  },
  modalText: {
    marginBottom: 4,
    //textAlign: "center",
  },
  buttonWithImg: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  buttonImg: {
    marginRight: 8,
  },
});

export default MyRefrigeratorResult;
