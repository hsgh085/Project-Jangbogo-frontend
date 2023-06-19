import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View,Text } from 'react-native';

const MypageGBScreen = () => {
    const route=useRoute()
    const type=route.params?.type
    return (
        <>
            <View>
                {type==="self"&&(
                    <Text>self</Text>
                )}
                {type==="participate"&&(
                    <Text>participate</Text>
                )}
                {type==="done"&&(
                    <Text>done</Text>
                )}
            </View>
        </>
    );
};

export default MypageGBScreen;