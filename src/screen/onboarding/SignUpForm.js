import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, View, Text, TextInput, ScrollView, Pressable, FlatList, TouchableOpacity, Platform, KeyboardAvoidingView } from "react-native";
import Header from "../../components/Header/Header";
import colors from "../../../assets/colors/colors";
import * as Location from "expo-location";

const GENDER = [
  {
    id: 0,
    title: "남자",
  },
  {
    id: 1,
    title: "여자",
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
    <Text style={[{ fontSize: 18, fontWeight: "bold" }, { color: textColor }]}>{item.title}</Text>
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
  const [location, setLocation] = useState(null);

  /** 에러 메세지 상태 변수 */
  const [errorMessage, setErrorMessage] = useState("");
  const [errorPMessage, setPErrorMessage] = useState("");
  const [ErrorColor, setErrorColor] = useState("black");

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedGender ? "#00FF9D" : "#fff";
    const color = item.id === selectedGender ? "white" : "black";

    return <Item item={item} onPress={() => setSelectedGender(item.id)} backgroundColor={backgroundColor} textColor={color} />;
  };

  // 위치 찾기 클릭
  const handleClickLocation = async() => {
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      Alert.alert("", "권한을 허용한 사용자만 이용할 수 있는 기능입니다. 휴대폰 설정에서 수동으로 해당 앱에 대해 위치 권한을 허용해주세요.", [
        {
          text: "확인",
        },
      ]);
    } else {
      const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync({ accuracy: 5 });
      const loc=await Location.reverseGeocodeAsync({latitude,longitude},{useGoogleMaps:false})
      const address=loc[0].region+" "+loc[0].city+" "+loc[0].street
      setLocation(address)
    }
  };
  useEffect(()=>{

  },[location,errorMessage])
  /** 닉네임 중복검사 */
  const checkNickname = async (nickname) => {
    //console.log("닉네임 확인: ", nickname)
    if (nickname !== "") {
      try {
        const response = await fetch(`http://3.34.24.220/auth/checknickname?nickname=${encodeURIComponent(nickname)}`);

        if (response.status === 200) {
          // 성공했을 때 처리
          setErrorMessage("닉네임이 확인되었습니다."); // 혹은 다른 로직
          setErrorColor("#00FF9D");
          setEditable(false);
        } else {
          throw new Error("닉네임이 중복됩니다.");
        }
      } catch (error) {
        // 에러 처리
        setErrorMessage(error.message);
      }
    } else {
      setErrorMessage("닉네임을 입력해 주세요.");
      setErrorColor("red");
    }
  };

  /** 비밀번호 유효성 검사 함수 */
  const isValidPassword = (password) => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/;
    return passwordPattern.test(password);
  };
  const [isPasswordSame, setIsPasswordSame] = useState(false);
  const [passwordBorderColor, setPasswordBorderColor] = useState("black");
  const [chkPasswordBorderColor, setChkPasswordBorderColor] = useState("black");

  useEffect(() => {
    if (Password === "") {
      setPasswordBorderColor("black");
    } else if (isValidPassword(Password)) {
      setPasswordBorderColor("blue");
    } else {
      setPasswordBorderColor("red");
    }
  }, [Password]);

  useEffect(() => {
    if (!isPasswordSame) {
      setChkPasswordBorderColor("red");
    } else {
      setChkPasswordBorderColor("blue");
    }
  }, [isPasswordSame]);

  useEffect(() => {
    if (Password === chkPassword) {
      setIsPasswordSame(true);
    } else {
      setIsPasswordSame(false);
    }
  }, [Password, chkPassword]);
  /** 회원가입 버튼 활성화 */
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    if (!editable && passwordBorderColor === "blue" && isPasswordSame && location!==null) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [editable, passwordBorderColor, isPasswordSame,location]);

  /** 회원가입 백엔드 */
  const signUp = async () => {
    try {
      const response = await fetch("http://3.34.24.220/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname: NickName,
          hp: phoneNumber,
          pw: Password,
          gender: selectedGender,
          location: location,
        }),
      });

      if (response.status === 200) {
        const message = await response.text();
        alert(message);
        navigation.navigate("SignIn");
      } else {
        throw new Error("잘못된 요청");
      }
    } catch (error) {
      // 에러 처리
      alert(error.message);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      {/* 회원가입 헤더 */}
      <Header>
        <Header.Title size={18} style={styles.Header}>
          회원가입
        </Header.Title>
        <View></View>
      </Header>
      <View style={styles.container}>
        {/* 회원가입 타이틀 */}
        <View style={styles.container_title}>
          <Text style={styles.h1}>안녕하세요!👋{"\n"}회원가입을 진행합니다</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* 회원가입 정보 번호 입력 */}
          <View style={styles.input_fields}>
            {/* 휴대폰 번호 */}
            <View>
              <Text style={styles.h3}>휴대폰 번호</Text>
              {/* <Text style={[styles.input, styles.fixinput]}>{testhp}</Text> */}
              <Text style={[styles.input, styles.fixinput]}>{phoneNumber}</Text>
            </View>
            {/* 닉네임 입력 */}
            <View>
              <View style={styles.label_fields}>
                <Text>닉네임</Text>
                <Text style={{ borderColor: ErrorColor }}>{errorMessage}</Text>
              </View>
              <View style={styles.horizon}>
                <TextInput
                  style={styles.input}
                  width={170}
                  placeholder="닉네임 입력"
                  maxLength={10}
                  value={NickName}
                  onChangeText={(text) => {
                    setNickName(text); //console.log(text)
                  }}
                  editable={editable}
                />
                <Pressable
                  style={styles._button}
                  borderWidth={1}
                  onPress={() => {
                    checkNickname(NickName);
                  }}
                >
                  <Text style={styles.h2}>중복확인</Text>
                </Pressable>
              </View>
            </View>
            {/* 성별 선택 */}
            <View style={styles.label_fields}>
              <Text>성별</Text>
            </View>
            <FlatList data={GENDER} renderItem={renderItem} keyExtractor={(item) => item.id} extraData={selectedGender} horizontal />
            {/* 비밀번호 입력 */}
            <View>
              <View style={styles.label_fields}>
                <Text style={styles.label}>비밀번호</Text>
                {!isValidPassword(Password) && Password !== "" && <Text style={styles.error}>잘못된 비밀번호입니다.</Text>}
              </View>
              <Text style={styles.innertext}>8~12자리, 문자, 특수문자 포함</Text>
              <TextInput
                style={[styles.input, { borderColor: passwordBorderColor }]}
                placeholder="확인 비밀번호 입력"
                maxLength={15}
                value={Password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
            {/* 비밀번호 확인 입력 */}
            <View>
              <View style={styles.label_fields}>
                <Text style={styles.label}>비밀번호 확인</Text>
                {!isPasswordSame && <Text style={styles.error}>비밀번호가 다릅니다.</Text>}
              </View>
              <TextInput
                style={[styles.input, { borderColor: chkPasswordBorderColor }]}
                placeholder="확인 비밀번호 입력"
                maxLength={15}
                value={chkPassword}
                onChangeText={(text) => setchkPassword(text)}
              />
            </View>
            {/* 위치 가져오기 */}
            <View>
              <View style={styles.label_fields}>
                <Text>현재 위치</Text>
              </View>
              <View style={styles.horizon}>
                <View style={styles.input}>{location ? <Text style={styles.textLoc}>{location}</Text> : <Text style={styles.textLoc}>위치 찾기를 눌러주세요</Text>}</View>
                <Pressable style={styles._button} borderWidth={1} onPress={handleClickLocation}>
                  <Text style={styles.h2}>위치찾기</Text>
                </Pressable>
              </View>
            </View>
          </View>
          {/* 회원가입 버튼 */}
          <View>
            <Pressable
              style={[styles._button, { backgroundColor: isButtonEnabled ? "#00FF9D" : "#747474" }]}
              disabled={!isButtonEnabled}
              onPress={() => {
                signUp();
              }}
            >
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
    flex: 1,
    marginTop: 10,
    marginHorizontal: 30,
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
    color: "#00FF9D",
  },
  error: {
    color: "red",
  },
  label_fields: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  horizon: {
    flexDirection: "row",
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
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
    color: "#8C8C8C",
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
  _button: {
    backgroundColor: "#00FF9D",
    alignItems: "center",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  textLoc: {
    fontSize: 18,
    color: colors.gray,
  },
});

export default SignUpForm;
