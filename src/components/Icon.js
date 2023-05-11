import React from 'react';
import { Ionicons } from "@expo/vector-icons";

const Icon = (props) => {
    return <Ionicons name={props.name} size={props.size} color={props.color} />;
};

export default Icon;