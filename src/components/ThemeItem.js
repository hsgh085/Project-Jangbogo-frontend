import React from 'react';
import { Image, Text, Pressable  } from 'react-native';

const ThemeItem = (props) => {
    return (
        <Pressable style ={{justifyContent: 'center', alignItems: 'center',
         borderRadius:8, paddingHorizontal:10, paddingVertical:10, marginVertical: 5 }}
                   onPress={props.onPress}
        >
            <Image source={props.source}/>
        </Pressable>
    );
};

export default ThemeItem;