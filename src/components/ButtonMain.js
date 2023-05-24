import React from 'react';
import { Image, Text, Pressable  } from 'react-native';

const ButtonMain = (props) => {
    return (
        <Pressable onPress={props.onPress}>
            <Image source={props.source}/>
            <Text style={{position:'absolute', top:68, left:15, fontSize:14,fontWeight:400}}>{props.text}</Text>
        </Pressable>
    );
};

export default ButtonMain;