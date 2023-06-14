import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  StyleSheet, View, Text, TextInput, ScrollView,
  Pressable, FlatList, TouchableOpacity
} from 'react-native';
import Header from '../../components/Header/Header';
import { editable } from "deprecated-react-native-prop-types/DeprecatedTextInputPropTypes";

const GENDER = [
  {
    id: 0,
    title: '남자',
  },
  {
    id: 1,
    title: '여자',
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
    <Text style={[{ fontSize: 20, fontWeight: 'bold' }, { color: textColor }]}>{item.title}</Text>
  </TouchableOpacity>
);

const SignUpForm = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const phoneNumber = route.params?.hp;
  const [NickName, setNickName] = useState("");
  const [editable, setEditable] = useState(true);
  const [selectedGender, setSelectedGender] = useState();
  const [Password, setPassword] = useState("");
  const [chkPassword, setchkPassword] = useState("");

  /** 에러 메세지 상태 변수 */
  const [errorMessage, setErrorMessage] = useState("");
  const [ErrorColor, setErrorColor] = useState('black');

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedGender ? '#00FF9D' : '#fff';
    const color = item.id === selectedGender ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedGender(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };
  /** 닉네임 중복검사 */
  const checkNickname = async (nickname) => {
    //console.log("닉네임 확인: ", NickName)
    try {
      const response = await fetch(
        `http://3.34.24.220/auth/checknickname?nickname=${encodeURIComponent(
          nickname
        )}`
      );
  
      if (response.status === 200) {
        // 성공했을 때 처리
        setErrorMessage("닉네임이 확인되었습니다."); // 혹은 다른 로직
        setErrorColor('#00FF9D');
        setEditable(false)
      } else {
        throw new Error("닉네임이 중복됩니다.");
      }
    } catch (error) {
      // 에러 처리
      setErrorMessage(error.message);
      setErrorColor('red');
    }
  };

  /** 회원가입 */



  return (
    <View>
      {/* 회원가입 헤더 */}
      <Header>
        <Header.Title size={18} style={styles.Header}>회원가입</Header.Title>
        <View></View>
      </Header>
      <View style={styles.container}>
        {/* 회원가입 타이틀 */}
        <View style={styles.container_title}>
          <Text style={styles.h1}>안녕하세요!👋{"\n"}회원가입을 진행합니다</Text>
        </View>
        <ScrollView>
          {/* 회원가입 정보 번호 입력 */}
          <View style={styles.input_fields}>
            {/* 휴대폰 번호 */}
            <View>
              <Text style={styles.h3}>휴대폰 번호</Text>
              <Text style={[styles.input, styles.fixinput]}>{phoneNumber}</Text>
            </View>
            {/* 닉네임 입력 */}
            <View>
              <View style={styles.label_fields}>
                <Text>닉네임</Text>
                <Text style={{ borderColor: ErrorColor }}>{errorMessage}</Text>
              </View>
              <View style={styles.horizon}>
                <TextInput style={styles.input}
                  width={170}
                  placeholder="닉네임 입력"
                  maxLength={10}
                  value={NickName}
                  onChangeText={(text) => setNickName(text)}
                  editable={editable}
                />
                <Pressable style={styles._button}
                  borderWidth={1}
                  onPress={()=>{
                    checkNickname(NickName);
                  }}>
                  <Text style={styles.h2}>중복확인</Text>
                </Pressable>
              </View>
            </View>
            {/* 성별 선택 */}
            <View style={styles.label_fields}>
              <Text>성별</Text>
            </View>
            <FlatList
              data={GENDER}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              extraData={selectedGender}
              horizontal
            />
            {/* 비밀번호 입력 */}
            <View>
              <View style={styles.label_fields}>
                <Text style={styles.label}>비밀번호</Text>
                <Text style={styles.error}>잘못된 비밀번호입니다.</Text>
              </View>
              <View style={styles.input_notice}>
                <Text style={styles.innertext}>8~12자리, 대문자, 특수문자 포함</Text>
                <TextInput
                  placeholder="비밀번호 입력"
                  maxLength={12}
                  value={Password}
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
                value={chkPassword}
                onChangeText={(text) => setchkPassword(text)}
              />
            </View>
          </View>
          {/* 회원가입 버튼 */}
          <View style={styles.verification_verify}>
            <Pressable style={styles._button}
              onPress={()=>{
                
              }}>
              <Text style={styles.h2}>회원가입</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
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
  horizon: {
    flexDirection: 'row',
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
    height: 60,
    padding: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
    //marginVertical: 8,
    marginBottom: 4,
    borderRadius: 16,
    borderWidth: 1,
  },
  fixinput: {
    //backgroundColor: '#DEDEDE',
    color: '#8C8C8C',
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