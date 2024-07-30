import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { getAPI } from '../api/ApiService';
import CommonStyles from '../styles/CommonStyles';
import CustomTextInput from '../styles/CustomTextInput';
import { AuthContext } from '../AuthContext'; // Import the context
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../styles/CustomButton';

const LoginScreen = ({ navigation }) => {
    const { login } = useContext(AuthContext); // is using object destructuring to extract the login function from the context value returned by useContext(AuthContext). This means that login is now a function that can be used directly within the component to log in a user.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleLogin = async () => {
        let valid = true;

        setEmailError('');
        setPasswordError('');

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
                const users = await getAPI(endpoint);

                const user = users.find(user => user.email === email && user.password === password);

                if (user) {
                    Alert.alert("Success", "Login successful");
                    // Store userId in AsyncStorage
                    await AsyncStorage.setItem('userId', user.id.toString());   // persistent userId
                    await AsyncStorage.setItem('userName', user.username); // persistent userName
                    console.log('userId stored in AsyncStorage:', user.id);

                    login(user); // Call the login function with user data

                    setEmail('');
                    setPassword('');
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Home Screen' }],
                    });
                } else {
                    Alert.alert("Error", "Invalid email or password");
                }
            } catch (error) {
                console.error("Error logging in:", error);
                Alert.alert("Error", "An error occurred during login");
            } finally {
                setIsLoading(false);
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
                <CustomButton onPress={handleLogin} title="Login" />
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
