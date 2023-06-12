import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';

const Verification = () => {
  /** 커서 이동 변수 */
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  /** 타이머 변수 */
  const [timer, setTimer] = useState(180);

  /** 커서 이동 함수 */
  const onChangeText1 = (value) => {
    if (value.length === 1) {
      input2Ref.current.focus();
    }
  }
  /** 커서 이동 함수 */
  const onChangeText2 = (value) => {
    if (value.length === 1) {
      input3Ref.current.focus();
    }
  }
  /** 커서 이동 함수 */
  const onChangeText3 = (value) => {
    if (value.length === 1) {
      input4Ref.current.focus();
    }
  }

  /** 타이머 관련 함수 */
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    const timerExpired = timer === 0;

    if (timerExpired) {
      navigation.replace('APP');
    }
  }, [timer]);

  const minute = Math.floor(timer / 60);
  const second = Math.floor(timer % 60);


  return (
    <View style={styles.container}>
      {/* 인증번호 타이틀 */}
      <View style={styles.container_title}>
        <Text style = {styles.h1}>인증번호 입력</Text>
        <Text style = {styles.h2}>인증번호 4자리가 발송되었습니다</Text>
      </View>
      {/* 인증번호 타이머 */}
      <View style = {styles.verification_time}>
        <Text style = {[styles.h2, styles.highlight]} >{`${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`}</Text>
      </View>
      {/* 인증번호 입력칸 */}
      <View style={styles.verification_fields}>
        <TextInput style={styles.verification_input}
          ref={input1Ref}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={onChangeText1}
          placeholder='-' />
        <TextInput style={styles.verification_input}
          ref={input2Ref}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={onChangeText2}
          placeholder='-' />
        <TextInput style={styles.verification_input}
          ref={input3Ref}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={onChangeText3}
          placeholder='-' />
        <TextInput style={styles.verification_input}
          ref={input4Ref}
          keyboardType="numeric"
          maxLength={1}
          placeholder='-' />
      </View>
      {/* 인증번호 버튼 */}
      <View style = {styles.verification_verify}>
        <Pressable
         style={styles.verification_button}
        >
          <Text style = {styles.h2}>인증하기</Text>
        </Pressable>
      </View>
      {/* 인증번호 재전송 */}
      <View style = {styles.verification_retry}>
        <Text style = {styles.h2}>인증번호가 오지 않아요!</Text>
        <Text style = {[styles.highlight, styles.h2]}> 재전송</Text>

      </View>
    </View>

  )
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    marginLeft: 60,
    marginRight: 60,
  },
  container_title: {

  },
  h1: {
    fontSize: 30,
    fontWeight: "bold",
  },
  h2: {
    fontSize: 16,
  },
  
  highlight: {
    color: '#00FF9D',
  },
  verification_fields: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  verification_input: {
    width: 55,
    height: 60,
    marginHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1,
    padding: 10,
    textAlign: 'center',
    fontSize: 24,
  },
  verification_verify: {
    
  },
  verification_button: {
    backgroundColor: '#00FF9D',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },

  verification_time: {
    margintop: 10,
    marginLeft: 'auto',
    marginBottom: 5,
  },
  verification_retry: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

  }

});

export default Verification;
