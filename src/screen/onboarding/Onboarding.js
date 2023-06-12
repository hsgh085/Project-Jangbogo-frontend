import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
    Text,
    View,
    Image,
    StyleSheet,
    Alert, Modal, Pressable
} from "react-native";
import image from '../../../assets/images/Onboarding.png';



const onboardingScreen = (props) => {

    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    const [isPIPPScreenOpen, setIsPIPPScreenOpen] = useState(false);
    const [isTCSScreenOpen, setIsTCSScreenOpen] = useState(false);
    const [isSignUpScreenOpen, setIsSignUpScreenOpen] = useState(false);
    const [isSignInScreenOpen, setIsSignInScreenOpen] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    // const clickTCS = () => {
    //     setIsTCSScreenOpen(true);
    //     setModalVisible(!modalVisible);
    // }

    // const clickPIPP = () => {
    //     setIsPIPPScreenOpen(true);
    //     setModalVisible(!modalVisible);
    // }


    useEffect(() => {
        if (isPIPPScreenOpen) {
            // Open PIPP.js screen
            navigation.navigate("PIPP");
        }
    }, [isPIPPScreenOpen]);

    useEffect(() => {
        if (isTCSScreenOpen) {
            // Open TCS.js screen
            navigation.navigate("TCS");
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
            // Open TCS.js screen
            navigation.navigate("SignIn");
        }
    }, [isSignInScreenOpen]);


    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <Image source={image} />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText1}>다음을 읽고 동의해 주십시오.</Text>
                            <Text style={styles.modalText2}
                             onPress={() => {setIsTCSScreenOpen(true);
                                setModalVisible(!modalVisible);}}>
                                서비스 이용 약관
                            </Text>
                            <Text>및</Text>
                            <Text style={styles.modalText2} onPress={() => {setIsPIPPScreenOpen(true);
                                setModalVisible(!modalVisible);}}>
                                개인정보 처리방침
                            </Text>
                            <Pressable
                                disabled={isDisabled}
                                style={{isDisabled} ? [styles.button, styles.buttonDisable] : [styles.button, styles.buttonOpen]}
                                onPress={() => {setModalVisible(!modalVisible); setIsSignUpScreenOpen(true);}}>
                                <Text style={styles.textStyle}>동의하고 계속하기</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <View style={styles.buttondiv1}>
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setModalVisible(true)}>
                        <Text style={styles.textStyle}>회원가입</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {setModalVisible(!modalVisible); setIsSignInScreenOpen(true);}}>
                        <Text style={styles.textStyle}>로그인</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaProvider>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 3,
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
    },
    buttondiv1: {
        backgroundColor: "#C1F4FF",
        width: '100%',
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
        backgroundColor: 'white',
        padding: 35,
        borderRadius: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 2,
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
        backgroundColor: '#00FF9D',
    },
    buttonClose: {
        backgroundColor: '#FFFFFF',
    },
    buttonDisable: {
        backgroundColor: '#747474',
    },
    textStyle: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        top: '25%',
        fontSize: 18,
    },
    modalText1: {
        fontStyle: 'normal',
        fontWeight: 900,
        fontSize: 21,
        marginBottom: 15,
        textAlign: 'center',

    },
    modalText2: {
        color: '#747474',
        marginBottom: 15,
        flexDirection: 'row',
    },
});


export default onboardingScreen;