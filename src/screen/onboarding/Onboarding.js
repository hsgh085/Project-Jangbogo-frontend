import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useContext } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View, Image, StyleSheet, Alert, Modal, Pressable, TouchableOpacity } from "react-native";
import image from "../../../assets/images/Onboarding.png";
import * as SecureStore from "expo-secure-store";
import { TokenContext } from '../../contexts/TokenContext';

const OnboardingScreen = (props) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [isPIPPScreenOpen, setIsPIPPScreenOpen] = useState(false);
  const [isTCSScreenOpen, setIsTCSScreenOpen] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const [isSignUpScreenOpen, setIsSignUpScreenOpen] = useState(false);
  const [isSignInScreenOpen, setIsSignInScreenOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [token, setToken] = useContext(TokenContext);

  useEffect(() => {
    // 토큰이 있는 경우 자동로그인
    const getToken = async () => {
      let result = await SecureStore.getItemAsync("token");
      if(result){
        console.log(result)
        setToken(result)
        navigation.navigate("BottomTab")
      }
    };
    getToken()
  }, []);

  useEffect(() => {
    if (isPIPPScreenOpen) {
      // Open PIPP.js screen
      navigation.navigate("PIPP");
      //setIsPIPPScreenOpen(false);
    }
  }, [isPIPPScreenOpen]);

  useEffect(() => {
    if (isTCSScreenOpen) {
      // Open TCS.js screen
      navigation.navigate("TCS");
      //setIsTCSScreenOpen(false);
    }
  }, [isTCSScreenOpen]);

  useEffect(() => {
    if (isPIPPScreenOpen && isTCSScreenOpen) {
      // Set Agree to enabled
      setIsDisabled(false);
    } else {
      // Set Agree to disabled
      setIsDisabled(true);
    }
  }, [isPIPPScreenOpen, isTCSScreenOpen]);

  useEffect(() => {
    if (isSignUpScreenOpen) {
      navigation.navigate("SignUp");
    }
  }, [isSignUpScreenOpen]);

  useEffect(() => {
    if (isSignInScreenOpen) {
      navigation.navigate("SignIn");
    }
  }, [isSignInScreenOpen]);

  /** 버튼 활성화 함수 */
  const getButtonStyle = () => {
    return isDisabled ? [styles.button, styles.buttonDisable] : [styles.button, styles.buttonOpen];
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Image source={image} />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <TouchableOpacity style={styles.centeredView} activeOpacity={1} onPress={() => setModalVisible(!modalVisible)}>
            <View style={styles.modalView}>
              <Text style={styles.modalText1}>다음을 읽고 동의해 주십시오.</Text>
              <View style={styles.modalText}>
                <Text
                  style={styles.modalText2}
                  onPress={() => {
                    setIsTCSScreenOpen(true);
                    setModalVisible(!modalVisible);
                  }}
                >
                  서비스 이용 약관
                </Text>
                <Text>및</Text>
                <Text
                  style={styles.modalText2}
                  onPress={() => {
                    setIsPIPPScreenOpen(true);
                    setModalVisible(!modalVisible);
                  }}
                >
                  개인정보 처리방침
                </Text>
              </View>
              <Pressable
                disabled={isDisabled}
                style={getButtonStyle()}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setIsSignUpScreenOpen(true);
                }}
              >
                <Text style={styles.textStyle}>동의하고 계속하기</Text>
              </Pressable>
            </View>
          </TouchableOpacity>
        </Modal>
        <View style={styles.buttondiv1}>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text style={styles.textStyle}>회원가입</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              navigation.navigate("SignIn");
            }}
            // onPress={() => {setModalVisible(!modalVisible); setIsSignUpScreenOpen(true);}}
          >
            <Text style={styles.textStyle}>로그인</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              navigation.navigate("SignUpForm");
            }}
          >
            <Text style={styles.textStyle}>회원가입폼</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttondiv1: {
    backgroundColor: "#C1F4FF",
    width: "100%",
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  image: {
    flex: 1,
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    padding: 35,
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    top: "100%",
  },
  button: {
    width: 315,
    height: 60,
    borderRadius: 16,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#00FF9D",
  },
  buttonClose: {
    backgroundColor: "#FFFFFF",
  },
  buttonDisable: {
    backgroundColor: "#747474",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    top: "25%",
    fontSize: 18,
  },
  modalText: {
    flexDirection: "row",
  },
  modalText1: {
    fontWeight: "bold",
    fontSize: 21,
    marginBottom: 15,
    textAlign: "center",
  },
  modalText2: {
    color: "#747474",
    marginHorizontal: 2,
    marginBottom: 15,
  },
});

export default OnboardingScreen;
