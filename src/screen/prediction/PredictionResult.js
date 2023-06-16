import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
    View, Text, Image, StyleSheet,
    Pressable
} from "react-native";
import Header from '../../components/Header/Header';
import increase from '../../../assets/images/increase.png';
import decrease from '../../../assets/images/increase.png';

const PredictionResult = ({ route }) => {
    const { data, id } = route.params; // 결과 데이터와 이미지 id 가져오기
    const navigation = useNavigation();

    return (
        <View style={styles.background}>
            {/* 헤더 */}
            <Header>
                <Header.Title size={18}>가격 예측</Header.Title>
                <View></View>
            </Header>
            <View style={styles.container}>
                {/* 예측 그래프 */}
                {/* 예측 결과에 따라 이미지를 출력 */}
                <View style={styles.graph_container}>
                    {data === "상승" ? (
                        <Image source={increase} style={styles.graph} />
                    ) : (
                        <Image source={decrease} style={styles.graph} />
                    )}
                </View>
                {/* 예측 결과 텍스트 */}
                <View style= {styles.resultbox} >
                    <Text style= {styles.h1}>가격 예측 결과: {data} </Text>
                    <Text style= {styles.h2}>{id}은(는)</Text>
                    <Text style= {styles.h2}>내일 가격이</Text>
                    <Text style= {styles.h2}>{data}할 확률이 높아요</Text>
                    {data === "상승" ? (
                        <Text style= {styles.h2} >오늘 장보는 것을 추천드려요!</Text>
                    ) : (
                        <Text style= {styles.h2} >내일 장보는 것을 추천드려요!</Text>
                    )}
                </View>
                {/* 다른 품목 예측 버튼 */}
                <View>
                    <Pressable
                        style={styles.button}
                        onPress={() => {navigation.navigate("PredictionMain")}}
                    >
                        <Text style={styles.h2}>다른 품목 예측하기</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'white',
    },
    container: {
        paddingHorizontal: 30,
    },
    graph_container: {
        paddingBottom: 10,
    },
    graph: {
        width: 300,
        height: 200,
        resizeMode: "contain"
    },
    resultbox: {
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginBottom: 15,
        backgroundColor: '#EAF3FF',
    },
    button: {
        backgroundColor: '#00FF9D',
        alignItems: 'center',
        padding: 20,
        borderRadius: 16,
        marginBottom: 20,
    },
    h1: {
        fontSize: 22,
        fontWeight: 'bold',

    },
    h2: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    h3: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PredictionResult;
