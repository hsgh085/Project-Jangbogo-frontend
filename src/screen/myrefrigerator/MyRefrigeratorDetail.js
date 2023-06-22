import { TokenContext } from "../../contexts/TokenContext";
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useContext, useState, useEffect } from 'react';
import {
    View, Text, Button, StyleSheet,
    TextInput, Image, Pressable, ScrollView, KeyboardAvoidingView,
} from 'react-native';

import Header from '../../components/Header/Header';
import DateTimePicker from '@react-native-community/datetimepicker';

import defaultImg from '../../../assets/images/productImg.png';
import minus from '../../../assets/images/minus.png';
import plus from '../../../assets/images/plus.png';
import datepicker from '../../../assets/images/calender_green.png';
import memo from '../../../assets/images/memo_green.png';
import pin from '../../../assets/images/pin_green.png';

const MyRefrigeratorDetail = () => {

    const [token] = useContext(TokenContext);
    const [productDetail, setProductDetail] = useState(null);

    const navigation = useNavigation();
    const route = useRoute();

    /** 백엔드에서 제품 수정할 정보를 가져오는 함수 */
    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await fetch(`http://3.34.24.220/refrigerator/refrigeItem?refrigeId=${route.params.id}`, {
                    method: "GET",
                    headers: {
                        "accept": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProductDetail(data);
                } else {
                    throw new Error(`Request failed with status ${response.status}`);
                }
            } catch (error) {
                console.error("제품 상세 정보를 가져오는 중 오류가 발생했습니다.", error);
            }
        };

        fetchProductDetail();
    }, [route.params.id, token]);

    // 제품명
    const [productName, onChangeProductName] = useState(null);
    // 수량
    const [quantity, setQuantity] = useState(null);
    // 바코드
    const [barcode, setBarcode] = useState(null);
    // 제조사명
    const [manufacturer, setManufacture] = useState(null);
    // 유통/소비기한 정보(예: 제조일로부터 7개월)
    // const [expirationDate, setExpirationDate] = useState(route.params?.expirationDate);
    // 제품 유형
    const [productType, setProductType] = useState(null);

    /** 유통기한 */
    const [manufactureDate, setManufactureDate] = useState(new Date('2023-06-22'));
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [buttonTitle, setButtonTitle] = useState(route.params?.buttonTitle);

    // 제품 메모
    const [prdlstMemo, onChangePrdlstMemo] = useState(null);

    useEffect(() => {
        if (productDetail) {
            setQuantity(productDetail.CNT);
            onChangeProductName(productDetail.PRDLST_NM);
            setBarcode(productDetail.BAR_CD);
            setManufacture(productDetail.BSSH_NM);
            setManufactureDate(new Date(productDetail.POG_DAYCNT));
            setProductType(productDetail.PRDLST_DCNM);
            onChangePrdlstMemo(productDetail.PRDLST_MEMO);
        }
    }, [productDetail]);

    // useEffect(() => {
    //     if (manufactureDate) {
    //         setButtonTitle(manufactureDate.toISOString().split('T')[0]);
    //     }
    // }, [manufactureDate]);


    /** 수량 증가 함수 */
    const increaseQuantity = () => {
        setQuantity((prevQuantity) => {
            return prevQuantity < 99 ? prevQuantity + 1 : prevQuantity;
        });
    };

    /** 수량 감소 함수 */
    const decreaseQuantity = () => {
        setQuantity((prevQuantity) => {
            return prevQuantity > 0 ? prevQuantity - 1 : prevQuantity;
        });
    };

    /** 유통기한 날짜선택 */
    const onChangeManufactureDate = (event, selectedDate) => {
        const currentDate = selectedDate || manufactureDate;
        setShowDatePicker(false);
        setManufactureDate(currentDate);
        setButtonTitle(currentDate.toISOString().split('T')[0]);
    };

    /** 백엔드과 통신하여 제품수정 */
    const submitProductUpdate = async () => {
        const requestOptions = {
            method: "PUT",
            headers: {
                "accept": "application/json",
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prdlstName: productName,
                cnt: quantity,
                pogDayCnt: manufactureDate.toISOString().split('T')[0],
                bsshName: manufacturer,
                prdlstDcnm: productType,
                barCd: barcode,
                prdlstMemo: prdlstMemo
            })
        };

        try {
            const response = await fetch(`http://3.34.24.220/refrigerator/updateitem?refrigeId=${route.params.id}`, requestOptions);

            if (response.ok) {
                const data = await response.json();
                console.log("냉장고 정보가 성공적으로 업데이트 되었습니다.");
                alert("냉장고 정보가 성공적으로 수정 되었습니다.");
            } else {
                throw new Error(`Request failed with status ${response.status}`);
            }
        } catch (error) {
            console.error("제품 수정 중 오류가 발생했습니다.", error);
        }
    };

    /** 백엔드과 통신하여 제품삭제 */
    const submitProductDeletion = async () => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        };

        try {
            const response = await fetch(`http://3.34.24.220/refrigerator/deleteitem?refrigeId=${route.params.id}`, requestOptions);

            if (response.ok) {
                const data = await response.json();
                console.log("물품이 성공적으로 삭제되었습니다.");
                alert("물품이 성공적으로 삭제되었습니다.");
                navigation.navigate("MyRefrigeratorMain")
            } else {
                throw new Error(`Request failed with status ${response.status}`);
            }
        } catch (error) {
            console.error("제품 삭제 중 오류가 발생했습니다.", error);
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
            <View>
                {/* 헤더 */}
                <Header>
                    <Header.Title size={18}>제품수정</Header.Title>
                    <View></View>
                </Header>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.productContainer}>
                            <View style={styles.productImg}>
                                <Pressable
                                    onPress={() => {alert("해당기능은 아직 준비중입니다"); }}>
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
                            {/* 제품 기본정보(바코드, 제조사명, 제품이름) */}
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
                        {/* 입력 제품 정보(유통/소비기한 정보, 유통기한, 메모) */}
                        <View>
                            {/* <View>
                            <Text style={styles.modalText}>유통/소비기한 정보</Text>
                            <Text style={[styles.productName,
                            {
                                backgroundColor: '#F1F1F1',
                                borderColor: "#CCCCCC",
                                borderWidth: 1
                            }]}>
                                {expirationDate}
                            </Text>
                        </View> */}
                            {/* 유통기한 선택 버튼 */}
                            <Text style={styles.modalText}>유통기한 입력</Text>
                            <View style={styles.buttonWithImg}>
                                <Image
                                    source={datepicker}
                                    style={styles.buttonImg}
                                />
                                <Button title={buttonTitle} onPress={() => { setShowDatePicker(true); console.log(buttonTitle) }} />
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
                                    <TextInput style={{ fontSize: 20, flexShrink: 1, }}
                                        placeholder='메모를 입력해주세요'
                                        onChangeText={onChangePrdlstMemo}
                                        value={prdlstMemo}>{prdlstMemo}</TextInput>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.container}>
                        {/* 제품 수정 버튼 */}
                        <Pressable
                            style={[styles.button, { marginTop: 10 }]}
                            onPress={() => {
                                submitProductUpdate();
                                // console.log('수정버튼')
                                // console.log(quantity)
                                // console.log(buttonTitle)
                                // console.log(manufacturer)
                                // console.log(productType)
                                // console.log(barcode)
                                // console.log(prdlstMemo)
                                // console.log(productName)
                            }}

                        >
                            <Text>제품수정</Text>
                        </Pressable>
                        {/* 제품 삭제 버튼 */}
                        <Pressable
                            style={[styles.button, { backgroundColor: '#EB4335' }]}
                            onPress={() => {
                                submitProductDeletion();
                                // console.log('수정버튼')
                                // console.log(quantity)
                                // console.log(buttonTitle)
                                // console.log(manufacturer)
                                // console.log(productType)
                                // console.log(barcode)
                                // console.log(prdlstMemo)
                                // console.log(productName)
                            }}

                        >
                            <Text>제품삭제</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    )
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
        //marginTop: 12,
        marginBottom: 5,
    },
});



export default MyRefrigeratorDetail;