import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '../../components/Header/Header';

const SignUpForm = () => {
    const navigation = useNavigation();

    const [NickName, setNickName] = useState("");
    const [Password, setPassword] = useState("");
    const [chkPassword, setchkPassword] = useState("");

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedIndexes, setSelectedIndexes] = useState([0, 1]);

    return (
        <View style={styles.container}>
      {/* 회원가입 타이틀 */}
      <View style={styles.container_title}>
        <Text style={styles.h1}>안녕하세요!👋{"\n"}회원가입을 진행합니다</Text>
      </View>
      {/* 회원가입 정보 번호 입력 */}
      <View style={styles.input_fields}>
        {/* 휴대폰 번호(고정값으로 수정 예정) */}
        <View>
          <Text style={styles.h3}>휴대폰 번호</Text>
          <TextInput style={styles.input}
            keyboardType="numeric"
            maxLength={11}
            placeholder='휴대폰 번호 입력' />
        </View>
        {/* 닉네임 입력 */}
        <View>
          <View style={styles.label_fields}>
            <Text>닉네임</Text>
            <Text style={styles.error}>중복된 닉네임입니다.</Text>
          </View>
          <TextInput style={styles.input}
            placeholder="닉네임 입력"
            maxLength={10}
            onChangeText={(text) => setNickName(text)}
          />
        </View>
        {/* 성별 선택 */}
        <View style={styles.label_fields}>
          <Text>성별</Text>
        </View>
        <ButtonGroup
          buttonStyle={styles.buttonGroup}
          selectedButtonStyle={{
            backgroundColor: "#00FF9D",
            fontWeight: 'bold',
          }}
          buttons={['남자', '여자']}
          selectedIndex={selectedIndex}
          onPress={(value) => {
            setSelectedIndex(value);
          }}
          containerStyle={{ fontSize: 18, borderColor: "white", width: 250, height: 60 }}
        />
        {/* 비밀번호 입력 */}
        <View>
          <View style={styles.label_fields}>
            <Text style={styles.label}>비밀번호</Text>
            <Text style={styles.error}>잘못된 비밀번호입니다.</Text>
          </View>
          <View style={styles.input_notice}>
            <Text style = {styles.innertext}>8~12자리, 대문자, 특수문자 포함</Text>
            <TextInput
              placeholder="비밀번호 입력"
              maxLength={12}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
        </View>
        {/* 비밀번호 확인 입력 */}
        <View>
          <View style={styles.label_fields}>
            <Text style={styles.label}>비밀번호 확인</Text>
            <Text style={styles.error}>비밀번호와 다릅니다.</Text>
          </View>
          <TextInput style={styles.input}
            placeholder="확인 비밀번호 입력"
            maxLength={20}
            onChangeText={(text) => setchkPassword(text)}
          />
        </View>
      </View>
      {/* 회원가입 버튼 */}
      <View style={styles.verification_verify}>
        <Pressable
          style={styles._button}
        >
          <Text style={styles.h2}>회원가입</Text>
        </Pressable>
      </View>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
      marginTop: 100,
      marginLeft: 60,
      marginRight: 60,
    },
    container_title: {
      marginBottom: 10,
    },
    h1: {
      fontSize: 30,
      fontWeight: "bold",
    },
    h2: {
      fontSize: 16,
    },
    h3: {
      fontSize: 14,
    },
    innertext: {
      paddingTop: 3,
      paddingBottom: 2,
  
    },
    highlight: {
      color: '#00FF9D',
    },
    error: {
      color: 'red',
    },
    label_fields: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 2,
    },
    buttonGroup: {
      height: 50,
      backgroundColor: "#fff",
      color: "#000",
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 16,
      paddingVertical: 20,
      fontSize: 18,
  
    },
    input: {
      height: 60,
      borderRadius: 16,
      borderColor: "black",
      borderWidth: 1,
      fontSize: 18,
      paddingHorizontal: 15,
      marginBottom: 10,
    },
    input_notice: {
      height: 60,
      borderRadius: 16,
      borderColor: "black",
      borderWidth: 1,
      fontSize: 12,
      paddingHorizontal: 15,
      marginBottom: 10,
      elevation: 2,
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
    _button: {
      backgroundColor: '#00FF9D',
      alignItems: 'center',
      padding: 20,
      borderRadius: 16,
      marginBottom: 20,
    },
  
  });

export default SignUpForm;