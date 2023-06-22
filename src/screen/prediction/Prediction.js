import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
    StyleSheet, View, Text, Image, TextInput,
    Pressable, ScrollView, FlatList
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '../../components/Header/Header';

import item1 from '../../../assets/images/predict1.png'
import item2 from '../../../assets/images/predict2.png'
import item3 from '../../../assets/images/predict3.png'


const Prediction = () => {
    const navigation = useNavigation();

    /** 백엔드와 통신하여 파이썬 코드 실행 시키는 함수 */
    const fetchPrediction = async (id) => {
        const randomCounts = {
            count0: Math.floor(Math.random() * (100 - 3 + 1)) + 3,
            count1: Math.floor(Math.random() * (100 - 3 + 1)) + 3,
            count2: Math.floor(Math.random() * (100 - 3 + 1)) + 3,
        };

        let data;
        if (randomCounts.count0 > randomCounts.count1) {
            data = "상승";
        } else if (randomCounts.count0 < randomCounts.count1) {
            data = "하락";
        } else {
            data = "모름";
        }
        // 백엔드 서버와 통신하는 코드를 여기에 작성하세요.

        // 서버 통신 결과 예시, 실제로는 서버의 응답을 사용해야 합니다.
        const result = {
            success: true,
            data,
            count0: randomCounts.count0,
            count1: randomCounts.count1,
            count2: randomCounts.count2,
        };

        return new Promise((resolve) => {
            setTimeout(() => resolve(result), 5000); // 결과를 5초 후에 반환합니다.
        });
    };


    const handleImageClick = async (id) => {
        navigation.navigate("Loading"); // 로딩 페이지로 이동

        const predictionResult = await fetchPrediction(id); // 백엔드 서버와 통신

        if (predictionResult.success) {
            // console.log(predictionResult.count0)
            // console.log(predictionResult.count1)
            // console.log(predictionResult.count2)
            navigation.navigate("PredictionResult", {
                data: predictionResult.data,
                id,
                count0: predictionResult.count0, // 추가됨
                count1: predictionResult.count1, // 추가됨
                count2: predictionResult.count2, // 추가됨
            }); // 결과 페이지로 이동하고 결과 데이터와 이미지 id를 전달
        } else {
            console.log("Error: Prediction failed");
            // 에러 처리 작성
        }
    };

    return (
        <View style={styles.background}>
            {/* 헤더 */}
            <Header>
                <Header.Title size={18} style={styles.Header}>가격예측</Header.Title>
                <View></View>
            </Header>
            {/* 가격 예측 타이틀 */}
            <View style={styles.title_container}>
                <Text style={styles.h1}>인공지능을 이용해{"\n"}가격을 예측해요</Text>
                <Text style={styles.h4}>예측하고 싶은 품목을 선택하세요!</Text>
            </View>
            {/* 가격 예측 품목 */}
            <ScrollView style={styles.item_container}>
                <Pressable onPress={() => handleImageClick("수박")}>
                    <Image source={item1} style={styles.imageStyle} />
                </Pressable>
                <Pressable onPress={() => handleImageClick("망고")}>
                    <Image source={item2} style={styles.imageStyle} />
                </Pressable>
                <Pressable onPress={() => handleImageClick("양파")}>
                    <Image source={item3} style={styles.imageStyle} />
                </Pressable>
                {/* <Pressable onPress={() => {navigation.navigate("Loading");}}>
                    <Image source={item3} style={styles.imageStyle} />
                </Pressable> */}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'white',
    },
    title_container: {
        marginTop: 10,
        marginHorizontal: 30,
    },
    h1: {
        fontSize: 26,
        fontWeight: "bold",
    },
    h4: {
        marginVertical: 5,
        fontSize: 15,
    },
    item_container: {
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    imageStyle: {
        maxWidth: '100%',
        maxHeight: '100%',
        resizeMode: 'contain',
    },
});

export default Prediction;