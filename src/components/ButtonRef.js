import React from 'react';
import { Image, Text, Pressable  } from 'react-native';

const ButtonRef = (props) => {
    return (
        <Pressable onPress={props.onPress}>
            <Image source={props.source}/>
            <Text style={{position:'absolute', top:'70%', paddingHorizontal: 15, fontSize:20,fontWeight:800}}>{props.text}</Text>
        </Pressable>
    );
};

export default ButtonRef;