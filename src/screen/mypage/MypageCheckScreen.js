import React, { useContext, useEffect, useState } from "react";
import { Alert, Pressable, TextInput, StyleSheet, View, Text } from "react-native";
import Header from "../../components/Header/Header";
import colors from "../../../assets/colors/colors";
import { useNavigation } from "@react-navigation/native";
import { TokenContext } from "../../contexts/TokenContext";
import { ROOT_API } from "../../constants/api";

const MypageCheckScreen = () => {
  const navigation = useNavigation();
  const [token, setToken] = useContext(TokenContext);
  const [password, setPassword] = useState("");
  const [isPasswordSame, setIsPasswordSame] = useState(true);

  const handleClickCheck = async() => {
      try {
        const response = await fetch(`${ROOT_API}/mypage/checkpw`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pw: password,
          }),
        });

        if (response.status === 200) {
          // 성공했을 때 처리
          navigation.navigate("MypageUpdate", { pw: password });
        } else {
          setIsPasswordSame(false)
        }
      } catch (error) {
        // 에러 처리
        setIsPasswordSame(false)
      }
    // fetch(`${ROOT_API}/mypage/checkpw`, {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     pw: password,
    //   }),
    // })
    //   .then(() => {
    //     navigation.navigate("MypageUpdate", { pw: password });
    //     console.log(password);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setIsPasswordSame(false);
    //   });
  };
  return (
    <View style={s.container}>
      <Header>
        <Header.Title size={18}>비밀번호 확인</Header.Title>
        <View />
      </Header>
      <View style={s.mainContainer}>
        <View>
          <View style={s.label_fields}>
            <Text style={s.label}>비밀번호</Text>
            {!isPasswordSame && <Text style={s.error}>비밀번호가 일치하지 않습니다.</Text>}
          </View>
          <TextInput
            style={s.input}
            placeholder="비밀번호 입력"
            maxLength={15}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
        </View>
        <Pressable style={s.button} onPress={handleClickCheck}>
          <Text style={{ fontSize: 16 }}>확인</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MypageCheckScreen;

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  mainContainer: {
    padding: 20,
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
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.greenH,
    alignItems: "center",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  error: {
    color: colors.red,
  },
});
