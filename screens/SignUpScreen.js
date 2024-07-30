import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, Alert, Text, ActivityIndicator } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { postAPI } from '../api/ApiService';
import CommonStyles from '../styles/CommonStyles';
import CustomTextInput from '../styles/CustomTextInput';
import { AuthContext } from '../AuthContext';
import CustomButton from '../styles/CustomButton';

const SignUpScreen = ({ navigation }) => {
    const { login } = useContext(AuthContext); // Use the context
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSignUp = async () => {
        let valid = true;

        setUsernameError('');
        setEmailError('');
        setPasswordError('');

        if (username.trim().length === 0) {
            setUsernameError('Username is required');
            valid = false;
        }

        if (email.trim().length === 0) {
            setEmailError('Email is required');
            valid = false;
        } else if (!validateEmail(email)) {
            setEmailError('Please enter a valid email');
            valid = false;
        }

        if (password.trim().length === 0) {
            setPasswordError('Password is required');
            valid = false;
        } else if (password.trim().length < 6) {
            setPasswordError('Password must have at least 6 characters');
            valid = false;
        }

        if (valid) {
            try {
                setIsLoading(true);

                const endpoint = "/users";
                const body = { username, email, password };

                const result = await postAPI(endpoint, body);

                if (result) {
                    console.log("User created successfully:", result);
                    Alert.alert("Success", "User created successfully");

                    login(result);

                    setUsername('');
                    setEmail('');
                    setPassword('');
                    navigation.navigate('Login Screen');
                } else {
                    console.warn("Failed to create user:", result);
                    Alert.alert("Error", "Failed to create user");
                }
            } catch (error) {
                console.error("Error creating user:", error);
                Alert.alert("Error", "An error occurred during signup");
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <View style={CommonStyles.container}>
            <Text style={CommonStyles.header}>Sign Up</Text>

            <CustomTextInput
                iconName="user"
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            {usernameError ? <Text style={CommonStyles.errorText}>{usernameError}</Text> : null}

            <CustomTextInput
                iconName="envelope"
                placeholder="Email ID"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            {emailError ? <Text style={CommonStyles.errorText}>{emailError}</Text> : null}

            <CustomTextInput
                iconName="lock"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                rightIcon={
                    <TouchableOpacity onPress={() => setShowPassword(prev => !prev)} style={CommonStyles.eyeIcon}>
                        <FontAwesome5 name={showPassword ? "eye-slash" : "eye"} size={20} color="black" />
                    </TouchableOpacity>
                }
            />
            {passwordError ? <Text style={CommonStyles.errorText}>{passwordError}</Text> : null}

            {isLoading ? (
                <ActivityIndicator size="large" color="#007BFF" />
            ) : (
                <CustomButton onPress={handleSignUp} title="Signup" />
            )}

            <TouchableOpacity onPress={() => navigation.navigate('Login Screen')}>
                <Text style={CommonStyles.navigationText}>Already have an account? Log in</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SignUpScreen;
