import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '../../components/Header/Header';
import Verification from "./Verification";

const SignIn = () => {
  const navigation = useNavigation();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  /** 백엔드와 통신하여 로그인 하는 함수 */
  const signin = async (phoneNumber, Password) => {
    // console.log("phoneNumber 값: ", phoneNumber);
    try {
      const response = await fetch(
        'http://3.34.24.220/auth/send-verification-code',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ hp: phoneNumber }),
        }
      );

      if (response.status === 200) {
        navigation.navigate("Verify", { hp: phoneNumber });
      } else {
        console.error('Error requesting verification code: ', response.status);
      }
    } catch (error) {
      console.error('Error requesting verification code:', error);
    }
  };

  // useEffect(() => {
  //   if (isVerifyScreenOpen) {
  //     // Verification.js screen 열기
  //     navigation.navigate("Verify");
  //   }
  // }, [isVerifyScreenOpen]);

  return (
    <View>
      {/* 회원가입 헤더 */}
      <Header>
        <Header.Title size={18} style={styles.Header}>로그인</Header.Title>
        <View></View>
      </Header>
      <View style={styles.container}>
        {/* 인증번호 타이틀 */}
        <View style={styles.container_title}>
          <Text style={styles.h1}>안녕하세요!👋{"\n"}반가워요🥰</Text>
        </View>
        {/* 휴대폰 번호 입력칸 */}
        <View style={styles.inputContainer}>
          <TextInput style={styles.input}
            keyboardType="numeric"
            maxLength={11}
            placeholder='휴대폰 번호 입력'
            value={phoneNumber}
            onChangeText={(text) => { setPhoneNumber(text); }} />
        </View>
        <View style={styles.label_fields}>
                <Text style={styles.label}>비밀번호</Text>
                <Text style={styles.error}>잘못된 비밀번호입니다.</Text>
              </View>
              <View style={styles.input_notice}>
                <Text style={styles.innertext}>8~12자리, 대문자, 특수문자 포함</Text>
                <TextInput
                  placeholder="비밀번호 입력"
                  maxLength={12}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
              </View>
        {/* 로그인 버튼 */}
        <View style={styles.verification_verify}>
          <Pressable
            style={styles.verification_button}
            onPress={() => {
              // console.log("이전: ",phoneNumber)
              // navigation.navigate("Verify", {hp: phoneNumber})
              signin(phoneNumber, password)
            }}
          >
            <Text style={styles.h2}>로그인</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  

});

export default SignIn;