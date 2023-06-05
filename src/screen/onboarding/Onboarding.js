// import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
    Text,
    View,
    Image,
    StyleSheet,
    Alert, Modal, Pressable
} from "react-native";
import ColorButton from '../../components/ColorButton';
import image from '../../../assets/images/Onboarding.png';



const onboardingScreen = () => {
    // const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
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
                            <Pressable
                                style={[styles.button, styles.buttonOpen]}
                                onPress={() => setModalVisible(!modalVisible)}>
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
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}>로그인</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaProvider>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
    },
    buttondiv1: {
        backgroundColor: "#C1F4FF",
        width: '100%',
        flex: 1,
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
    // button: {
    //     width: "100%",
    //     height: 30,
    //     margin: 5,
    // },
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
        height: 63,
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
    textStyle: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 5,
        fontSize: 18,
    },
    modalText1: {
        marginBottom: 15,
        textAlign: 'center',
    },
    modalText2: {
        marginBottom: 15,
        textAlign: 'center',
    },
});


export default onboardingScreen;