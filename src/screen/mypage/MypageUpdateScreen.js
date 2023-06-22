import React, { useContext, useEffect, useState } from "react";
import { Alert, ScrollView, TouchableOpacity, FlatList, Pressable, Text, TextInput, StyleSheet, View } from "react-native";
import Header from "../../components/Header/Header";
import { ROOT_API } from "../../constants/api";
import { TokenContext } from "../../contexts/TokenContext";
import colors from "../../../assets/colors/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Location from "expo-location";

const MypageUpdateScreen = () => {
  const route = useRoute();
  const pw = route.params?.pw;
  const navigation = useNavigation();
  const [token, setToken] = useContext(TokenContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [ErrorColor, setErrorColor] = useState("black");
  const [editable, setEditable] = useState(true);
  const [isPasswordSame, setIsPasswordSame] = useState(true);
  const [chkPassword, setChkPassword] = useState("");
  const [isPassword, setIsPassword] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [originNick, setOriginNick] = useState("");
  const [userInfo, setUserInfo] = useState({
    hp: "",
    nickname: "",
    gender: 0,
    pw: "",
    location: "",
  });
  const isValidPassword = (password) => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/;
    return passwordPattern.test(password);
  };
  const handleChange = (key, value) => {
    setUserInfo({ ...userInfo, [key]: value });
  };
  const handleCheckNickname = async () => {
    if (userInfo.nickname !== "") {
      try {
        const response = await fetch(`${ROOT_API}/mypage/checknickname?nickname=${userInfo.nickname}`);

        if (response.status === 200) {
          // 성공했을 때 처리
          setErrorMessage("닉네임이 확인되었습니다."); // 혹은 다른 로직
          setErrorColor(colors.green);
          setEditable(false);
        } else {
          setErrorMessage("닉네임이 중복됩니다.");
          setErrorColor(colors.red);
          setEditable(true);
        }
      } catch (error) {
        // 에러 처리
        setErrorMessage(error.message);
      }
    } else {
      setErrorMessage("닉네임을 입력해 주세요.");
      setErrorColor(colors.red);
    }
  };
  const handleClickLocation = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      Alert.alert("", "권한을 허용한 사용자만 이용할 수 있는 기능입니다. 휴대폰 설정에서 수동으로 해당 앱에 대해 위치 권한을 허용해주세요.", [
        {
          text: "확인",
        },
      ]);
    } else {
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({ accuracy: 5 });
      const loc = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false });
      const address = loc[0].region + " " + loc[0].city + " " + loc[0].street;
      handleChange("location", address);
    }
  };
  const handleClickUpdate = () => {
    fetch(`${ROOT_API}/mypage/updateinfo`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickname: userInfo.nickname,
        pw: userInfo.pw,
        location: userInfo.location,
      }),
    })
      .then(() => {
        Alert.alert("", "수정되었습니다😊", [
          {
            text: "확인",
            onPress: () => {
              navigation.navigate("BottomTab", { screen: "MypageStack" });
            },
          },
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {}, [userInfo.location, errorMessage]);
  useEffect(() => {
    fetch(`${ROOT_API}/mypage/userinfo`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserInfo({
          hp: data.hp,
          nickname: data.nickname,
          gender: data.gender,
          pw: pw,
          location: data.location,
        });
        setOriginNick(data.nickname);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (isValidPassword(userInfo.pw)) {
      setIsPassword(true);
    } else {
      setIsPassword(false);
    }
  }, [userInfo.pw]);

  useEffect(() => {
    if (userInfo.pw === chkPassword) {
      setIsPasswordSame(true);
    } else {
      setIsPasswordSame(false);
    }
  }, [userInfo.pw, chkPassword]);

  useEffect(() => {
    if (isPassword && isPasswordSame && (!editable || userInfo.nickname === originNick)) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [isPassword, isPasswordSame, editable, userInfo.nickname]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <Header>
        <Header.Title size={18}>내 정보 수정</Header.Title>
        <View />
      </Header>
      <ScrollView style={s.mainContainer} showsVerticalScrollIndicator={false}>
        <View style={s.inputContainer}>
          <View style={s.label_fields}>
            <Text style={s.label}>휴대폰 번호</Text>
          </View>
          <View style={s.input}>
            <Text style={s.defaultText}>{userInfo.hp}</Text>
          </View>
        </View>
        <View style={s.inputContainer}>
          <View style={s.label_fields}>
            <Text>닉네임</Text>
            <Text style={{ color: ErrorColor }}>{errorMessage}</Text>
          </View>
          <View style={s.horizon}>
            <TextInput
              style={s.input}
              width={220}
              maxLength={10}
              value={userInfo.nickname}
              onChangeText={(text) => {
                handleChange("nickname", text);
              }}
              editable={editable}
            />
            <Pressable style={s.button} borderWidth={1} onPress={handleCheckNickname}>
              <Text style={s.h2}>중복확인</Text>
            </Pressable>
          </View>
        </View>
        <View style={s.inputContainer}>
          <View style={s.label_fields}>
            <Text>성별</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={[s.item, { backgroundColor: userInfo.gender === 0 ? colors.grayL : colors.white }]}>
              <Text style={[{ fontSize: 18, fontWeight: "bold" }, { color: userInfo.gender === 0 ? colors.white : colors.black }]}>남자</Text>
            </View>
            <View style={[s.item, { backgroundColor: userInfo.gender === 0 ? colors.white : colors.grayL }]}>
              <Text style={[{ fontSize: 18, fontWeight: "bold" }, { color: userInfo.gender === 0 ? colors.black : colors.white }]}>여자</Text>
            </View>
          </View>
        </View>
        <View style={s.inputContainer}>
          <View style={s.label_fields}>
            <Text style={s.label}>비밀번호</Text>
            {!isPassword && <Text style={s.error}>잘못된 비밀번호입니다.</Text>}
          </View>
          <TextInput
            style={[s.input, { borderColor: isPassword ? colors.green : colors.red }]}
            maxLength={15}
            value={userInfo.pw}
            onChangeText={(text) => {
              handleChange("pw", text);
            }}
          />
          <Text style={s.innertext}>8~12자리, 문자, 특수문자 포함</Text>
        </View>
        <View style={s.inputContainer}>
          <View style={s.label_fields}>
            <Text style={s.label}>비밀번호 확인</Text>
            {isPasswordSame ? (
              <Text style={{ color: colors.green }}>비밀번호가 일치합니다.</Text>
            ) : (
              <Text style={s.error}>비밀번호가 일치하지 않습니다.</Text>
            )}
          </View>
          <TextInput
            style={[s.input, { borderColor: isPasswordSame ? colors.green : colors.red }]}
            placeholder="확인 비밀번호 입력"
            maxLength={15}
            value={chkPassword}
            onChangeText={(text) => setChkPassword(text)}
          />
        </View>
        <View style={s.inputContainer}>
          <View style={s.label_fields}>
            <Text>현재 위치</Text>
          </View>
          <View style={s.horizon}>
            <View style={s.input}>
              <Text style={s.textLoc}>{userInfo.location}</Text>
            </View>
            <Pressable style={s.button} borderWidth={1} onPress={handleClickLocation}>
              <Text style={s.h2}>위치변경</Text>
            </Pressable>
          </View>
        </View>
        <View style={s.inputContainer}>
          <Pressable
            style={[s.button, { backgroundColor: isButtonEnabled ? "#00FF9D" : "#747474" }]}
            disabled={!isButtonEnabled}
            onPress={handleClickUpdate}
          >
            <Text style={s.h2}>수정하기</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default MypageUpdateScreen;

const s = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 20,
  },
  label_fields: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  input: {
    height: 60,
    borderRadius: 16,
    borderColor: "black",
    borderWidth: 1,
    fontSize: 18,
    paddingHorizontal: 15,
    paddingVertical: 18,
  },
  button: {
    backgroundColor: colors.greenH,
    alignItems: "center",
    padding: 20,
    borderRadius: 16,
  },
  error: {
    color: colors.red,
  },
  defaultText: {
    color: colors.gray,
    fontSize: 17,
  },
  h2: {
    fontSize: 16,
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
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 4,
    borderRadius: 16,
    borderWidth: 1,
  },
  inputContainer: {
    marginBottom: 10,
  },
  innertext: {
    paddingTop: 3,
    paddingBottom: 2,
    fontSize: 11,
  },
  textLoc: {
    fontSize: 18,
    color: colors.gray,
  },
});
