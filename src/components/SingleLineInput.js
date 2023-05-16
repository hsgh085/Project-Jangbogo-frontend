import React from 'react';
import { TextInput } from 'react-native';

const SingleLineInput = (props) => {
    return (
        <TextInput
            value={props.value}
            onChangeText={props.onChangeText}
            placeholder={props.placeholder}
            style={props.style}
        />
    );
};

export default SingleLineInput;