import React from 'react';
import { TextInput } from 'react-native';

const SingleLineInput = (props) => {
    return (
        <TextInput
            value={props.value}
            onChangeText={props.onChangeText}
            placeholder={props.placeholder}
            keyboardType={props.type}
            style={props.style}
        />
    );
};

export default SingleLineInput;