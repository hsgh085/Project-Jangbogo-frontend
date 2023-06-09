import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
// import PhoneAuth from "react-native-phone-auth";

const SignUp = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // useEffect(() => {
  //   PhoneAuth.initialize();
  // }, []);

  const onPhoneNumberChange = (event) => {
    setPhoneNumber(event.nativeEvent.text);
  };

  // const onVerificationCodeChange = (event) => {
  //   setVerificationCode(event.nativeEvent.text);
  // };

  // 
  // const onSubmit = () => {
  //   PhoneAuth.requestVerificationCode(phoneNumber, (error, data) => {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       setVerificationCode(data.verificationCode);
  //     }
  //   });
  // };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>안녕하세요!👋{"\n"}반가워요🥰</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="휴대폰 번호 입력"
          onChangeText={onPhoneNumberChange}
        />
      </View>
      {/* <View style={styles.inputContainer}>
        <Text style={styles.label}>Verification Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your verification code"
          onChangeText={onVerificationCodeChange}
        />
      </View> */}
      <Pressable
        style={styles.button}
        // onPress={() => setModalVisible(true)}
        >
        <Text style={styles.textStyle}>인증번호 받기</Text>
      </Pressable>
      {isVerified ? null : (
        <Text style={styles.error}>잘못입력하셨습니다</Text>
      )}
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
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: "skyblue",
    width: "100%",
    marginTop: 10,
    justifyContent: "center",
  },

  input: {
    width: '100%',
    height: 50,
    borderRadius: 16,
    borderColor: "black",
    borderWidth: 1,
    fontSize: 18,
    paddingHorizontal: 15,
    keyboardType: "number-pad",
    // keyboardType: "numeric"
  },

  button: {
    width: 315,
    height: 60,
    borderRadius: 16,
    padding: 10,
    elevation: 2,
},
  error: {
    color: "red",
    fontSize: 20,
  },
});

export default SignUp;