import { TokenContext } from "../../contexts/TokenContext";
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useContext, useState, useEffect } from 'react';
import {
  View, Text, Button, StyleSheet,
  TextInput, Image, Pressable, ScrollView
} from 'react-native';

import Header from '../../components/Header/Header';
import DateTimePicker from '@react-native-community/datetimepicker';

import defaultImg from '../../../assets/images/productImg.png';
import minus from '../../../assets/images/minus.png';
import plus from '../../../assets/images/plus.png';
import datepicker from '../../../assets/images/calender_green.png';
import memo from '../../../assets/images/memo_green.png';
import pin from '../../../assets/images/pin_green.png';

const MyRefrigeratorResult = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [token, setToken] = useContext(TokenContext);

  // 테스트용
  // const barcode = '8801115114130';
  // // const productName = '서울우유500';
  // const manufacturer = '서울우유협동조합 안산공장공장장은 강 공장장이고 된장공장 어쩌구는 공장장';
  // const productType = '우유';
  // const expirationDate = '냉장(0~10℃) 12일';

  // 앞서 넘어온 파라미터
  // 바코드, 제조사명, 식품유형, 유통/소비기한
  const { barcode, manufacturer, productType, expirationDate } = route.params;

  const [productName, onChangeProductName] = useState(route.params?.productName,);

  const [quantity, setQuantity] = useState(1);
  const [prdlstMemo, onChangePrdlstMemo] = useState('');


  const increaseQuantity = () => {
    setQuantity((prevQuantity) => {
      return prevQuantity < 99 ? prevQuantity + 1 : prevQuantity;
    });
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => {
      return prevQuantity > 0 ? prevQuantity - 1 : prevQuantity;
    });
  };

  // 제조일자를 저장할 state
  const [manufactureDate, setManufactureDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [buttonTitle, setButtonTitle] = useState(manufactureDate.toISOString().split('T')[0]);

  /** 유통기한 날짜선택 */
  const onChangeManufactureDate = (event, selectedDate) => {
    const currentDate = selectedDate || manufactureDate;
    setShowDatePicker(false);
    setManufactureDate(currentDate);
    setButtonTitle(currentDate.toISOString().split('T')[0]);
  };

  const submitProductInfo = async () => {
    try {
      const response = await fetch('http://3.34.24.220/refrigerator/createitem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          prdlstName: productName,
          cnt: quantity,
          pogDayCnt: buttonTitle,
          bsshName: manufacturer,
          prdlstDcnm: productType,
          barCd: barcode,
          prdlstMemo: prdlstMemo,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        // 성공적으로 제품 정보를 전송한 후 수행할 작업을 여기에 추가하세요.
        console.log("제품 정보가 성공적으로 등록되었습니다.");
        console.log(result);
        navigation.navigate("MyRefrigeratorMain")
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error("제품 정보 등록 중 오류가 발생했습니다.", error);
    }
  };

  return (
    <View>
      {/* 헤더 */}
      <Header>
        <Header.Title size={18}>상품 추가</Header.Title>
        <View></View>
      </Header>
      <ScrollView>
        <View style={styles.container}>
          {/* 넘어온 제품정보 */}
          <View style={styles.productContainer}>
            {/* 제품 이미지 */}
            <View style={styles.productImg}>
              <Pressable
                onPress={() => { alert("해당기능은 아직 준비중입니다");}}>
                <Image source={defaultImg} />
              </Pressable>
              {/* 수량 */}
              <View style={styles.quantityContainer}>
                <Pressable
                  onPress={() => { decreaseQuantity(); }}>
                  <Image source={minus} />
                </Pressable>
                <Text style={{ backgroundColor: 'white', paddingHorizontal: 5 }}>{quantity}</Text>
                <Pressable
                  onPress={() => { increaseQuantity(); }}>
                  <Image source={plus} />
                </Pressable>
              </View>
            </View>
            {/* 제품 기본정보 */}
            <View style={styles.productInfo}>
              {/* 바코드 */}
              <View style={styles.barcode}>
                <Text>{barcode}</Text>
              </View>
              {/* 제조사명 */}
              <Text style={styles.modalText}>제조사명</Text>
              <Text style={{
                borderColor: "#CCCCCC", borderWidth: 1,
                paddingHorizontal: 6, paddingVertical: 6, marginBottom: 4,
              }}>{manufacturer}</Text>
              {/* 제품이름 */}
              <Text style={styles.modalText}>제품명</Text>
              <View style={styles.productName}>
                <TextInput style={styles.h3}
                  onChangeText={onChangeProductName}
                  value={productName}
                />
              </View>
            </View>
          </View>
          {/* 입력 제품 정보 */}
          <View>
            <View>
              <Text style={styles.modalText}>유통/소비기한 정보</Text>
              <Text style={[styles.productName,
              {
                backgroundColor: '#F1F1F1',
                borderColor: "#CCCCCC",
                borderWidth: 1
              }]}>
                {expirationDate}
              </Text>
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
            {/* 제품 유형 */}
            <View>
              <Text style={styles.modalText}>제품 유형</Text>
              <View style={[styles.buttonWithImg, { paddingVertical: 12, }]}>
                <Image
                  source={pin}
                  style={styles.buttonImg}
                />
                <Text style={{ fontSize: 20 }}>{productType}</Text>
              </View>
            </View>
            {/* 메모 */}
            <View>
              <Text style={styles.modalText}>메모</Text>
              <View style={[styles.buttonWithImg, { paddingVertical: 12, }]}>
                <Image
                  source={memo}
                  style={styles.buttonImg}
                />
                <TextInput style={{ fontSize: 20 }}
                  placeholder='메모를 입력해주세요'
                  onChangeText={onChangePrdlstMemo}
                  value={prdlstMemo}>{prdlstMemo}</TextInput>
              </View>
            </View>
          </View>
          {/* 제품 등록 버튼 */}
          <View>
            <Pressable
              style={styles.button}
              onPress={() => {
                submitProductInfo();
                // console.log('=========')
                // console.log('버튼클릭')
                // console.log(productName)
                // console.log(quantity)
                // console.log(buttonTitle)
                // console.log(manufacturer)
                // console.log(productType)
                // console.log(barcode)
                // console.log(prdlstMemo)
              }}
            >
              <Text>제품등록</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
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
    marginBottom: 6,
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
    borderRadius: 12,
    paddingVertical: 6,
    marginBottom: 4,
  },
  buttonImg: {
    marginLeft: 12,
    marginRight: 8,
  },
  button: {
    backgroundColor: "#00FF9D",
    alignItems: "center",
    padding: 20,
    borderRadius: 16,
    marginTop: 12,
    marginBottom: 20,
  },
});

export default MyRefrigeratorResult;
