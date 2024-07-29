import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { getAPI } from '../api/ApiService';
import CommonStyles from '../styles/CommonStyles';
import CustomTextInput from '../styles/CustomTextInput';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleLogin = async () => {
        let valid = true;

        // Reset error messages
        setEmailError('');
        setPasswordError('');

        // Validate email
        if (email.trim().length === 0) {
            setEmailError('Email is required');
            valid = false;
        } else if (!validateEmail(email)) {
            setEmailError('Please enter a valid email');
            valid = false;
        }

        // Validate password
        if (password.trim().length === 0) {
            setPasswordError('Password is required');
            valid = false;
        } else if (password.trim().length < 6) {
            setPasswordError('Password must have at least 6 characters');
            valid = false;
        }

        if (valid) {
            try {
                setIsLoading(true); // Show loading indicator

                const endpoint = "/users"; // Endpoint for fetching user data
                const users = await getAPI(endpoint); // Fetch user data using axiosSystemInstance

                // Check if email and password match any user
                const user = users.find(user => user.email === email && user.password === password);

                if (user) {
                    Alert.alert("Success", "Login successful");
                    // Clear form fields
                    setEmail('');
                    setPassword('');
                    navigation.navigate('Home Screen'); // Navigate to Home screen after successful login
                } else {
                    Alert.alert("Error", "Invalid email or password");
                }
            } catch (error) {
                console.error("Error logging in:", error);
                Alert.alert("Error", "An error occurred during login");
            } finally {
                setIsLoading(false); // Hide loading indicator
            }
        }
    };

    return (
        <View style={CommonStyles.container}>
            <Text style={CommonStyles.header}>Login</Text>

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
                <TouchableOpacity onPress={handleLogin} style={CommonStyles.button}>
                    <Text style={CommonStyles.buttonText}>Login</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity onPress={() => navigation.navigate('SignUp Screen')}>
                <Text style={CommonStyles.navigationText}>Don't have an account? Sign up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Password Update Screen')}>
                <Text style={CommonStyles.navigationText}>Forgot Password?</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;
