import React from 'react';
import { Text, View, StyleSheet, useWindowDimensions } from 'react-native';
import HeaderMain from '../../components/HeaderMain';
import colors from '../../../assets/colors/colors';
import { TabView, SceneMap } from 'react-native-tab-view';

const ExpenditureScreen = () => {
    return (
        <View style={s.container}>
            <HeaderMain>
                <Text style={s.headerText}>지출내역</Text>
            </HeaderMain>
        </View>
    );
};

export default ExpenditureScreen;

const s=StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.white,
    },
    headerText:{
        fontSize:30,
        fontWeight:800,
        marginVertical:25,
        marginLeft:5,
    }
})