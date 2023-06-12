import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import Header from '../../components/Header/Header';

const SignInWPassword = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Check if the user is already logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      // Redirect to the home screen
      navigate("Home");
    }
  }, []);

  const onSignIn = async () => {
    try {
      if (phoneNumber.trim() === '' || password.trim() === '') {
        return;
      }
      const response = await fetch('http://localhost:8001/auth/signin', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hp: phoneNumber,
          pw: password,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        // 로그인 성공 시 사용자의 ID를 로컬 저장소에 저장하고
        // Home 화면으로 이동(navigate)하게 됩니다.
      } else {
        // 로그인 실패 시, 에러 메시지 출력
      }
    } catch (error) {
      console.error('로그인 실패', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header>
          <Header.Title size={18} style={styles.Header}>로그인</Header.Title>
        </Header>
      <Text style={styles.title}>안녕하세요!👋{"\n"}반가워요🥰</Text>
      <Text style={styles.subtitle}>비밀번호로 로그인</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>휴대폰 번호</Text>
        <TextInput
          placeholder="휴대폰 번호 입력"
          keyboardType="numeric"
          maxLength={11}
          onChangeText={(text) => setPhone(text)}
          style={styles.input}
        />
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          placeholder="비밀번호 입력"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          style={styles.input}
        />
      </View>
      <Pressable
        style={styles.button}
        onPress={onSignIn}
        >
        <Text style={styles.textStyle}>로그인</Text>
      </Pressable>
      <Text style={styles.labels} onPress={() => {
        setIsPIPPScreenOpen(true);
      }}>
        인증번호로 로그인
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 250,
    marginTop: 100,
    marginLeft: 50,
    justifyContent: "start",
    alignItems: "stretch",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
  },
  inputContainer: {
    backgroundColor: "skyblue",
    width: "100%",
    marginTop: 10,
    marginBottom: 20,
    justifyContent: "center",
  },
  label: {
    fontSize: 14,
    marginTop: 20,
    marginBottom: 2,
  },
  labels: {
    fontSize: 14,
    marginTop: 15,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 16,
    borderColor: "black",
    borderWidth: 1,
    fontSize: 18,
    paddingHorizontal: 15,
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 16,
    padding: 10,
    elevation: 2,
    backgroundColor: '#00FF9D',
    marginBottom : 10,
  },
  textStyle: {
    color: 'black',
    textAlign: 'center',
    top: '25%',
    fontSize: 16,
  },
});

export default SignInWPassword;