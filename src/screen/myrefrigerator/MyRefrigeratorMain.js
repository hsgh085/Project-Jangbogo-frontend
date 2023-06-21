import { TokenContext } from "../../contexts/TokenContext";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useContext, useState, useEffect } from 'react'
import {
    View, Text, Image, StyleSheet,
    Pressable, Button, ScrollView,
} from "react-native";

import Header from '../../components/Header/Header';

import * as WebBrowser from 'expo-web-browser';

import ButtonRef from "../../components/ButtonRef";
import button1 from "../../../assets/images/Button_Ref.png";
import button2 from "../../../assets/images/Button_Ref2.png";

const MyRefrigeratorMain = () => {
    const navigation = useNavigation();
    const [token, setToken] = useContext(TokenContext);
    const [productList, setProductList] = useState([]);
    const isfocused = useIsFocused();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://3.34.24.220/refrigerator/refrigelist", {
                    method: "GET",
                    headers: {
                        "accept": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProductList(data);
                } else {
                    throw new Error(`Request failed with status ${response.status}`);
                }
            } catch (error) {
                console.error("제품 목록을 가져오는 중 오류가 발생했습니다.", error);
            }
        };

        fetchProducts();
    }, [isfocused]);

    const openWebPage = async () => {
        const result = await WebBrowser.openBrowserAsync('https://wrtn.ai/store/details/646a0a4aecdacbf9742d91a9');
    };
    return (
        <View style={styles.background}>
            {/* 헤더 */}
            <Header>
                <Header.Title size={18}>나의 냉장고</Header.Title>
                <View></View>
            </Header>
            <View style={styles.container}>
                {/* 메인버튼 */}
                <View style={styles.button_main}>
                    <ButtonRef
                        source={button1}
                        text="바코드 스캔하기"
                        onPress={() => {
                            // navigation.navigate("BarcodeTest");
                            navigation.navigate("BarcodeScanner");
                        }}
                    />
                    <ButtonRef
                        source={button2}
                        text="  직접 입력하기"
                        onPress={() => {
                            navigation.navigate("MainStack", { screen: "MemoList" });
                        }}
                    />
                </View>
                {/* 냉털버튼 */}
                <View>
                    <Pressable
                        style={styles.button}
                        onPress={() => { openWebPage(); }}
                    >
                        <Text style={styles.h3}>요리 추천 받기</Text>
                    </Pressable>
                </View>
                {/*제품목록*/}
                <View>
                    <Text style={styles.h2}>제품 목록</Text>
                    <ScrollView style={styles.scrollView}>
                        <View>
                            {productList.map((product) => (
                                <Pressable
                                    onPress={() => {
                                        navigation.navigate("MyRefrigeratorDetail", { id: product.id });
                                    }}
                                    key={product.id}
                                >
                                    <View style={styles.product_container}>
                                        <View style={[styles.horizon_container, { justifyContent: 'space-between', }]}>
                                            <Text>{product.BSSH_NM}</Text>
                                            <Text>{product.daysRemaining}일 남음</Text>
                                        </View>
                                        <View style={[styles.horizon_container, { justifyContent: 'space-between', }]}>
                                            <Text style={styles.h3}>{product.PRDLST_NM}</Text>
                                            <Text style={styles.h3_cnt}>{product.CNT}</Text>
                                        </View>
                                        <View style={styles.horizon_container}>
                                            <Text>유통기한 </Text>
                                            <Text>{product.POG_DAYCNT}</Text>
                                        </View>
                                    </View>
                                </Pressable>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'white',
    },
    container: {
        marginHorizontal: 20,
    },
    button_main: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#00FF9D',
        alignItems: 'center',
        padding: 10,
        borderRadius: 16,
        marginBottom: 15,
    },
    scrollView: {
        maxHeight: 350, // 원하는 높이 값으로 조정
    },
    product_container: {
        backgroundColor: "#F2F2F5",
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginBottom: 10,
        borderRadius: 16,
    },
    h2: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 7,
    },
    h3: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 2,
    },
    h3_cnt: {
        backgroundColor: "white",
        paddingVertical: 3,
        paddingHorizontal: 6,
        marginVertical: 2,
    },
    horizon_container: {
        flexDirection: 'row',
        //justifyContent: 'space-between',
    },

});


export default MyRefrigeratorMain;