import React from 'react';
import { View, TextInput } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CommonStyles from './CommonStyles';

const CustomTextInput = ({
    iconName,
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    keyboardType = 'default',
    error,
    rightIcon
}) => {
    return (
        <View style={[CommonStyles.inputContainer, error ? CommonStyles.inputError : null]}>
            <FontAwesome5 name={iconName} size={20} color="black" style={CommonStyles.icon} />
            <TextInput
                placeholder={placeholder}
                style={CommonStyles.input}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
            />
            {rightIcon && <View style={CommonStyles.eyeIcon}>{rightIcon}</View>}
        </View>
    );
};

export default CustomTextInput;
