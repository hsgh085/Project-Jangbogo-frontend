import { useNavigation } from "@react-navigation/native";
import React from 'react'
import {
    View, Text, Image, StyleSheet,
    Pressable, Button
} from "react-native";

import Header from '../../components/Header/Header';

import * as WebBrowser from 'expo-web-browser';

import ButtonRef from "../../components/ButtonRef";
import button1 from "../../../assets/images/Button_Ref.png";
import button2 from "../../../assets/images/Button_Ref2.png";

const MyRefrigeratorMain = () => {
    const navigation = useNavigation();

    const openWebPage = async () => {
        const result = await WebBrowser.openBrowserAsync('https://wrtn.ai/store/details/646a0a4aecdacbf9742d91a9');
    };
    return (
        <View style={styles.background}>
            {/* 헤더 */}
            <Header>
                <Header.Title size={18}>나의 냉장고</Header.Title>
                <View></View>
            </Header>
            <View style = {styles.container}>
            {/* 메인버튼 */}
            <View style = {styles.button_main}>
                <ButtonRef 
                source={button1}
                text="바코드 스캔하기"
                onPress={() => {
                    navigation.navigate("BarcordTest");
                //   navigation.navigate("BarcordScanner");
                }}
                />
                <ButtonRef 
                source={button2}
                text="   직접 입력하기"
                onPress={() => {
                  navigation.navigate("MainStack", { screen: "MemoList" });
                }}
                />
            </View>
            {/* 냉털버튼 */}
            <View>
                    <Pressable
                        style={styles.button}
                        onPress={() => {openWebPage();}}
                    >
                        <Text style={styles.h2}>요리 추천 받기</Text>
                    </Pressable>
                </View>
            <Text>냉장고</Text>
            {/* <Button title="웹사이트 열기" onPress={openWebPage} /> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'white',
    },
    container: {
        marginHorizontal: 20,
    },
    button_main: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#00FF9D',
        alignItems: 'center',
        padding: 20,
        borderRadius: 16,
        marginBottom: 20,
    },

});


export default MyRefrigeratorMain;