import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Modal } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header/Header';

const API_KEY = '2e778ab5ba2240679524';
const API_ENDPOINT = `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/C005/json/1/5/`;

const BarcordTest = () => {

    const navigation = useNavigation();

    /** 카메라 관련 상태변수 */
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    /** 바코드 관련 상태변수 */
    // 예시: 8801019005909
    const [barcord, setBarcord] = useState('8801043034562');
    const [productData, setProductData] = useState({});
    const [modalVisible, setModalVisible] = useState(false);

    /** 카메라 Permission */
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = (e) => {
        setScanned(true);
        setBarcord(e.data);
        fetchBarcord();
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    /** 바코드 API fetch 함수
     *  
     *  요청 인자 : BAR_CD (바코드번호)
     * 
     *  출력 인자 : PRDLST_NM (제품명), BSSH_NM (제조사명), PRDLST_DCNM	(식품 유형), POG_DAYCNT(유통/소비기한)
     *  
     */
    const fetchBarcord = async () => {
        const response = await fetch(
            API_ENDPOINT + 'BAR_CD=' +
            barcord,
            {
                method: 'GET',
            },
        );

        if (response.status === 200) {
            const responseJson = await response.json();
            setProductData(responseJson.C005.row[0]);
            // console.log(responseJson.C005.row[0])
            console.log('===바코드정보===');
            console.log(responseJson.C005.row[0].BAR_CD);
            console.log(responseJson.C005.row[0].PRDLST_NM);
            console.log(responseJson.C005.row[0].BSSH_NM);
            console.log(responseJson.C005.row[0].PRDLST_DCNM);
            console.log(responseJson.C005.row[0].POG_DAYCNT);
            setModalVisible(true);
            return responseJson.C005.row[0];
        } else {
            setModalVisible(false);
            return 0;
            // throw new Error('unable to get');
        }
    };

    return (
        <View style={styles.container}>
            {/* 모달 */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.h1}>다음 제품이 맞나요?</Text>
                        <Text style={styles.modalText}>제품명: {productData.PRDLST_NM}</Text>
                        <Text style={styles.modalText}>제조사명: {productData.BSSH_NM}</Text>
                        <Text style={styles.modalText}>식품 유형: {productData.PRDLST_DCNM}</Text>
                        <Text style={styles.modalText}>유통/소비기한: {productData.POG_DAYCNT}</Text>
                        {/* 재스캔 */}
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                                setScanned(true);
                            }}
                        >
                            <Text style={styles.textStyle}>바코드 재스캔</Text>
                        </Pressable>
                        {/* 성공 */}
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                                setScanned(false);
                                navigation.navigate("MyRefrigeratorResult", {
                                    barcord: BAR_CD,
                                    productName: productData.PRDLST_NM,
                                    manufacturer: productData.BSSH_NM,
                                    productType: productData.PRDLST_DCNM,
                                    expirationDate: productData.POG_DAYCNT
                                });
                            }}
                        >
                            <Text style={styles.textStyle}>제품이 맞아요</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            {/* 헤더 */}
            <Header>
                <Header.Title size={18}>나의 냉장고</Header.Title>
                <View></View>
            </Header>
            {/* 카메라 */}
            <View style={{ flex: 1, justifyContent: 'center', marginVertical: 20 }}>
                <Camera style={{ flex: 1, marginTop: 50, marginBottom: 50 }}
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                />
                <Pressable style={styles.button}
                    onPress={() => setScanned(false)}
                >
                    <Text>바코드 스캔하기</Text>
                </Pressable>
                {/* {scanned && (
                    <Pressable style={styles.button}
                        onPress={() => setScanned(false)}
                    >
                        <Text>바코드 재스캔</Text>
                    </Pressable>
                )} */}
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#00FF9D',
        alignItems: 'center',
        padding: 20,
        borderRadius: 16,
        marginBottom: 20,
    },
    h1: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    h2: {
        fontSize: 22,
        color: '#ffffff',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        //alignItems: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
    buttonClose: {
        backgroundColor: "#00FF9D",
        marginTop: 10,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
})

export default BarcordTest;