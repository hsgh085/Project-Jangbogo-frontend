import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import MemoListScreen from '../screen/memo/MemoMainScreen';
import MemoScreen from '../screen/memo/MemoDetailScreen';

const Stack=createNativeStackNavigator();
const MemoStackNavigation = () => {
    return (
        <Stack.Navigator
        initialRouteName='MemoList'
        screenOptions={{
            headerShown:false,
        }}>
            <Stack.Screen name='MemoList' component={MemoListScreen}/>
            <Stack.Screen name='Memo' component={MemoScreen}/>
        </Stack.Navigator>
    );
};

export default MemoStackNavigation;