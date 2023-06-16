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
        <Text style={styles.text}>분석 중이에요</Text>
      </View>
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
