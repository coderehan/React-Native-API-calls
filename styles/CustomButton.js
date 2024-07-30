import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import CommonStyles from './CommonStyles';

const CustomButton = ({ onPress, title }) => {
    return (
        <TouchableOpacity onPress={onPress} style={CommonStyles.button}>
            <Text style={CommonStyles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;
