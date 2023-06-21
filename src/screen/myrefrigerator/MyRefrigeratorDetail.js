import { TokenContext } from "../../contexts/TokenContext";
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useContext, useState, useEffect } from 'react';
import {
    View, Text, Button, StyleSheet,
    TextInput, Image, Pressable, ScrollView
} from 'react-native';

import Header from '../../components/Header/Header';
import DateTimePicker from '@react-native-community/datetimepicker';

import defaultImg from '../../../assets/images/productImg.png';
import minus from '../../../assets/images/minus.png';
import plus from '../../../assets/images/plus.png';
import datepicker from '../../../assets/images/calender_green.png';
import memo from '../../../assets/images/memo_green.png';
import pin from '../../../assets/images/pin_green.png';

const MyRefrigeratorDetail = () => {

    const [token] = useContext(TokenContext);
    const [productDetail, setProductDetail] = useState(null);

    const navigation = useNavigation();
    const route = useRoute();

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await fetch(`http://3.34.24.220/refrigerator/refrigeItem?refrigeId=${route.params.id}`, {
                    method: "GET",
                    headers: {
                        "accept": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProductDetail(data);
                } else {
                    throw new Error(`Request failed with status ${response.status}`);
                }
            } catch (error) {
                console.error("제품 상세 정보를 가져오는 중 오류가 발생했습니다.", error);
            }
        };

        fetchProductDetail();
    }, [route.params.id, token]);

    return (
        <View style={styles.container}>
            {/* 헤더 */}
            <Header>
                <Header.Title size={18}>제품수정</Header.Title>
                <View></View>
            </Header>
            <Text>제품 수정 페이지</Text>
            <Pressable
                style={styles.button}
                onPress={() => {
                    console.log('버튼클릭')
                    console.log(productDetail)
                    // console.log(quantity)
                    // console.log(buttonTitle)
                    // console.log(manufacturer)
                    // console.log(productType)
                    // console.log(barcode)
                    // console.log(prdlstMemo)
                }}
            >
                <Text>제품수정</Text>
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({

});


export default MyRefrigeratorDetail