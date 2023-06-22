import { useNavigation } from "@react-navigation/native";
import React from 'react'
import {
    View, Text, Image, StyleSheet,
    Pressable, ScrollView
} from "react-native";

import ThemeItem from "../../components/ThemeItem";

import Theme1 from "../../../assets/images/theme1.png";
import Theme2 from "../../../assets/images/theme2.png";

import ThemeDetail1 from "../../../assets/images/themedetail1.png";
import ThemeDetail2 from "../../../assets/images/themedetail2.png";

import Header from '../../components/Header/Header';


const ThemeMainScreen = () => {
    const navigation = useNavigation();

    const themes = [
        {
            id: 1,
            title: '기념일 장보기',
            detailImage: ThemeDetail1,
            contentTitle: '발렌타인데이에 어울리는 요리쟤료',
            content: '발렌타인데이와 같은 기념일에 집에서 요리를 하는 것은 어떤가요? 레스토랑처럼 북적이는 소리와 다른 손님들의 시선을 신경쓰지 않아도 되므로 더욱 프라이빗한 분위기를 즐길 수 있습니다. 또한 집에서 요리를 하면 함께하는 시간이 늘어나는 장점도 있습니다. 그리고 서로의 취향을 고려하면서 요리를 하고 함께 식사를 하면서 대화를 나눌 수 있어서 더욱 좋은 추억을 만들 수 있습니다.',
            image: Theme1
        },
        {
            id: 2,
            title: '벚꽃놀이 장보기',
            detailImage: ThemeDetail2,
            contentTitle: '벚꽃놀이에 어울리는 요리재료',
            content: '벚꽃놀이의 분위기를 더해줄 또 다른 벚꽃 음식으로는 벚꽃 디저트가 있습니다. 벚꽃 열매를 활용해 만든 젤리, 무스, 케이크 등 다양한 디저트가 있으며, 새콤달콤한 벚꽃 맛과 함께 아름다운 핑크빛으로 선물처럼 예쁜 시각적인 만족감을 줍니다. 벚꽃놀이를 더욱 즐겁게 할 수 있는 벚꽃 요리와 함께 특별한 추억을 만들어 보세요.',
            image: Theme2
        }
    ];

    return (
        <View style={styles.back_container}>
            {/* 헤더 */}
            <Header>
                <Header.Title size={18} style={styles.Header}>테마별장보기</Header.Title>
                <View></View>
            </Header>
            <ScrollView style={styles.container}>
                {themes.map((theme) => (
                        <ThemeItem
                            key={theme.id}
                            source={theme.image}
                            onPress={() => {
                                navigation.navigate("ThemeDetail", { themeId: theme.id, title: theme.title,
                                    detailImg: theme.detailImage, contentTitle: theme.contentTitle, content: theme.content, });
                            }}
                        />
                    ))}
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    back_container: {
        flex:1,
        backgroundColor: 'white',
    },
    container: {
        paddingHorizontal: 30,
    },


});

export default ThemeMainScreen;