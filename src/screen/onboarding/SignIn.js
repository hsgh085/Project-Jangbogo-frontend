import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '../../components/Header/Header';
import Verification from "./Verification";
import { TokenContext } from '../../contexts/TokenContext';

const SignIn = () => {
  const navigation = useNavigation();
  const[token, setToken]=useContext(TokenContext);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  /** 백엔드와 통신하여 로그인 하는 함수 */
  const signin = async () => {
    // console.log("phoneNumber 값: ", phoneNumber);
    try {
      const response = await fetch(
        'http://3.34.24.220/auth/signin',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ hp: phoneNumber, pw: password, }),
        }
      );

      if (response.status === 200) {
        const responseBody = await response.json();
        if (responseBody.loginSucess) {
          // 로그인 성공 시 인증 토큰 저장 및 페이지 이동
          setToken(responseBody.token);
          navigation.navigate("BottomTab")
          //navigation.navigate("Verification", { token: token }); // 필요하다면 다른 페이지로 이동하세요
        } else {
          console.error('Error logging in: ', response.status);
        }
      } else {
        console.error('Error logging in: ', response.status);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

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
        <View>
          <View style={styles.label_fields}>
            <Text style={styles.label}>휴대폰 번호</Text>
          </View>
          <TextInput style={styles.input}
            keyboardType="numeric"
            maxLength={11}
            placeholder='휴대폰 번호 입력'
            value={phoneNumber}
            onChangeText={(text) => { setPhoneNumber(text); }} />
        </View>
        {/* 비밀번호 입력 */}
        <View>
          <View style={styles.label_fields}>
            <Text style={styles.label}>비밀번호</Text>
          </View>
          <Text style={styles.innertext}>8~12자리, 대문자, 특수문자 포함</Text>
          <TextInput style={[styles.input,]}
            placeholder="비밀번호 입력"
            maxLength={15}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        {/* 로그인 버튼 */}
        <View>
          <Pressable
            style={styles._button}
            onPress={() => {
              signin();
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
  container: {
    marginTop: 10,
    marginHorizontal: 30,
    // marginLeft: 60,
    // marginRight: 60,
  },
  container_title: {
    marginBottom: 30,
  },
  h1: {
    fontSize: 30,
    fontWeight: "bold",
  },
  h2: {
    fontSize: 16,
  },
  innertext: {
    paddingTop: 3,
    paddingBottom: 2,
  },
  input: {
    height: 60,
    borderRadius: 16,
    borderColor: "black",
    borderWidth: 1,
    fontSize: 18,
    paddingHorizontal: 15,
    paddingVertical: 18,
    marginBottom: 10,
  },
  label_fields: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  _button: {
    backgroundColor: '#00FF9D',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },


});

export default SignIn;