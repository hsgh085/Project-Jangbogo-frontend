import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  StyleSheet, View, Text, Image, TextInput,
  Pressable, ScrollView, FlatList
} from 'react-native';
import LottieView from 'lottie-react-native';

const Loading = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.lottieContainer}>
        <LottieView
          autoPlay
          loop
          source={require('../../../assets/images/loading.json')}
        />
        <Text style={styles.text}>인공지능이 {'\n'}분석 중이에요</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>어떻게 분석하나요?</Text>
        <Text style={styles.text}>해당 식자재와 관련된 당일 뉴스 기사들을 크롤링하여 모든 문장들에 대해 Bert 기반의 사전학습된 딥러닝 모델이 클래스(긍정,부정,무관) 분류 작업을 수행하여,
         가격 예측 결과를 알려줘요!</Text>
      </View>
      <Pressable
                        style={styles.button}
                        onPress={() => {navigation.navigate("PredictionMain")}}
                    >
                        <Text style={styles.h2}>다른 품목 예측하기</Text>
                    </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  lottieContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  textContainer: {
    marginBottom: 10,
    backgroundColor: 'blue',
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default Loading;
